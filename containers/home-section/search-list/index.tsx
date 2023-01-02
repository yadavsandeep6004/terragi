/* eslint-disable @typescript-eslint/default-param-last */
import React, { useCallback, useState } from "react";
import cx from "classnames";
import { Checkbox, Popup, Dropdown } from "semantic-ui-react";
import { useRouter } from "next/router";

import FilterIcon from "../../../assets/icon/filters.svg";
import { SearchBar } from "../../../components/search-bar";

import styles from "./search-list.module.scss";
import { ColorType, FontType, Text } from "../../../components/text";
import { ConfigKeys, SearchConfigType } from "../../../utils/types";
import { FilterFormKeys } from "../search-modal/types";
import Drop from "../../../assets/icon/dropdown.svg";
import { CONSTRUCTION_STATUS, FACING } from "../../../utils/constants";
import { HomeSectionsBasePropType } from "../types";
import {
    convertConfigDataToSemanticLanguage,
    formatMoneyToInr,
} from "../../../utils/helpers";
import { BudgetInput } from "../../../components/budget-input";

export type CheckboxDropdownPropType = {
    className?: string;
    name: string;
    format: (values: any) => JSX.Element;
    alreadyCheckedResults: string[] | number[];
    applyFilter: (data: any) => void;
    itemList: SearchConfigType[];
};

const CheckboxDropdown: React.FC<CheckboxDropdownPropType> = ({
    name,
    format,
    itemList,
    applyFilter,
    className,
    alreadyCheckedResults = [],
}) => {
    // State is maintained because we can't change Home state at every checkbox click.
    const [checkedValues, setCheckedValues] = useState<(string | number)[]>([]);

    const handleTriggerOfComp = () => {
        setCheckedValues(alreadyCheckedResults);
    };

    const handleCloseOfComp = () => {
        let flag = true;

        if (checkedValues.length === alreadyCheckedResults.length) {
            const set = new Set(checkedValues);
            alreadyCheckedResults.forEach((e) => {
                set.delete(`${e}`);
            });
            flag = set.size > 0;
        }

        if (flag) applyFilter({ name, value: checkedValues });
    };

    const checkValueHandler = useCallback((e: any, data: string | number) => {
        e.stopPropagation();
        setCheckedValues((p) => {
            if (p.includes(data)) return p.filter((d) => data !== d);
            return [...p, data];
        });
    }, []);

    const text = format?.(alreadyCheckedResults);
    const normalizedOptions = convertConfigDataToSemanticLanguage(itemList);

    // if (!alreadyCheckedResults || alreadyCheckedResults.length === 0)
    //     return <></>;

    return (
        <Dropdown
            className={cx(styles.mini_filter_dropdown, className)}
            onOpen={handleTriggerOfComp}
            onClose={handleCloseOfComp}
            button
            text={text as any}
            icon={
                <Drop
                    className="ml-auto"
                    width={10}
                    height={10}
                    alt="dropdownIcon"
                />
            }
            multiple
        >
            <Dropdown.Menu>
                {normalizedOptions.map((e) => (
                    <Dropdown.Item
                        key={e.value}
                        onClick={(evt: any) => checkValueHandler(evt, e.value)}
                    >
                        <div className="flex justify-between">
                            <Text
                                font={FontType.LABEL_M}
                                weight={500}
                                color={ColorType.COOL_BLACK}
                            >
                                {e.text}
                            </Text>
                            <Checkbox
                                checked={checkedValues?.includes(e.value)}
                            />
                        </div>
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export const SearchList: React.FC<
    HomeSectionsBasePropType & {
        applyFilters: (data: any) => void;
        clearFilters: Function;
    }
> = ({
    searchQueryResults,
    searchHandler,
    onLocationSelect,
    searchProperty,
    openFilterModalHandler,
    filteredValues,
    applyFilters,
    headingSortByContainer,
    clearFilters,
}) => {
    const router = useRouter();
    const checkboxDropTextGenerator = useCallback(
        (
            values: (string | number)[],
            mapCallback: (x: any) => any,
            additionalPrefix = "",
            defaultvalue = ""
        ) => {
            const value1 = values?.[0] || "";
            const value2 = values?.[1] || "";

            const text = [value1, value2]
                .map((x: string | number) => mapCallback(x))
                .filter(Boolean)
                .join(", ");

            const prefix = values?.length <= 2 ? "" : "..";

            return (
                <Text className="!mr-4" font={FontType.TITLE} weight={500}>
                    {text === "" ? (
                        defaultvalue
                    ) : (
                        <>
                            {text}
                            {additionalPrefix}
                            {prefix}
                        </>
                    )}
                </Text>
            );
        },
        []
    );

    const bhkDropdownTextFormatter = (values: (string | number)[]) => {
        const cb = (x: string | number) =>
            x && !Number.isNaN(Number(x)) ? `${x} BHK` : x;
        return checkboxDropTextGenerator(values, cb, "", "BHK Type");
    };

    const facingDropdownTextFormatter = (values: (string | number)[]) => {
        const cb = (x: string) => FACING[x];
        return checkboxDropTextGenerator(values, cb, "", "Facing Type");
    };

    const areaDropdownTextFormatter = (values: (string | number)[]) => {
        const cb = (x: string) => (x ? `${x} sq yd` : null);
        return checkboxDropTextGenerator(values, cb, "", "Plot area");
    };

    const constructionStatusTextFormatter = (values: (string | number)[]) => {
        const cb = (x: string) => (x ? `${CONSTRUCTION_STATUS[x]}` : null);
        return checkboxDropTextGenerator(
            values,
            cb,
            "",
            "Property construction status"
        );
    };

    const floorsDropdownTextFormatter = (values: (string | number)[]) => {
        const cb = (x: string) => (x ? `${x}` : null);
        return checkboxDropTextGenerator(
            values,
            cb,
            ` ${values?.length > 1 ? "Floors" : "Floor"}`,
            "Floor Type"
        );
    };

    const clearFilterModal = () => {
        clearFilters();
    };

    const numberOfFilters = Object.keys(router.query).filter(
        (e) => e !== "page" && e !== "pageSize"
    ).length;

    const budget = filteredValues[FilterFormKeys.BUDGET];

    return (
        <>
            <div className={cx("sticky top-0 w-full", styles.wrapper)}>
                <div
                    className={cx(
                        styles.search_wrapper,
                        "flex b-0 w-full items-center"
                    )}
                >
                    {/* <Text weight={500} font={FontType.HEADING_M}> */}
                    {/*    Home */}
                    {/* </Text> */}
                    <SearchBar
                        className={styles.search_bar}
                        searchQueryResults={
                            searchQueryResults[FilterFormKeys.LOCALITY]
                        }
                        searchHandler={searchHandler}
                        onItemSelect={onLocationSelect}
                        onSubmit={searchProperty}
                        name={FilterFormKeys.LOCALITY}
                        values={filteredValues[FilterFormKeys.LOCALITY]}
                        isLoading={false}
                        isRounded={false}
                        onClickOfbar={openFilterModalHandler}
                    />
                </div>
                <div
                    className={cx(
                        styles.filters_wrapper,
                        "flex justify-between items-center gap-8 flex-wrap"
                    )}
                >
                    <div
                        className={cx(
                            "flex gap-6 grow flex-wrap",
                            styles.mini_filter_wrapper
                        )}
                    >
                        <CheckboxDropdown
                            name={FilterFormKeys.BHK_TYPE}
                            format={bhkDropdownTextFormatter}
                            alreadyCheckedResults={
                                filteredValues[FilterFormKeys.BHK_TYPE]
                            }
                            itemList={
                                searchQueryResults[FilterFormKeys.BHK_TYPE]
                            }
                            applyFilter={applyFilters}
                        />

                        <CheckboxDropdown
                            name={FilterFormKeys.FACING}
                            format={facingDropdownTextFormatter}
                            alreadyCheckedResults={
                                filteredValues[FilterFormKeys.FACING]
                            }
                            itemList={searchQueryResults[FilterFormKeys.FACING]}
                            applyFilter={applyFilters}
                        />

                        <CheckboxDropdown
                            className={styles.hide_dropdown}
                            name={FilterFormKeys.FLOORS}
                            format={floorsDropdownTextFormatter}
                            alreadyCheckedResults={
                                filteredValues[FilterFormKeys.FLOORS]
                            }
                            itemList={searchQueryResults[FilterFormKeys.FLOORS]}
                            applyFilter={applyFilters}
                        />

                        <CheckboxDropdown
                            className={cx(
                                styles.hide_dropdown,
                                styles.area_dropdown
                            )}
                            name={FilterFormKeys.PLOT_SIZE}
                            format={areaDropdownTextFormatter}
                            alreadyCheckedResults={
                                filteredValues[FilterFormKeys.PLOT_SIZE]
                            }
                            itemList={
                                searchQueryResults[FilterFormKeys.PLOT_SIZE]
                            }
                            applyFilter={applyFilters}
                        />

                        <CheckboxDropdown
                            className={styles.hide_dropdown}
                            name={FilterFormKeys.CONSTRUCTION_STATUS}
                            format={constructionStatusTextFormatter}
                            alreadyCheckedResults={
                                filteredValues[
                                    FilterFormKeys.CONSTRUCTION_STATUS
                                ]
                            }
                            itemList={
                                searchQueryResults[
                                    FilterFormKeys.CONSTRUCTION_STATUS
                                ]
                            }
                            applyFilter={applyFilters}
                        />

                        <Popup
                            content={
                                <BudgetInput
                                    required={false}
                                    name={ConfigKeys.BUDGET}
                                    onChange={onLocationSelect}
                                    globalValue={
                                        filteredValues[ConfigKeys.BUDGET]
                                    }
                                />
                            }
                            on="click"
                            onClose={() =>
                                applyFilters({
                                    name: ConfigKeys.BUDGET,
                                    value: filteredValues[ConfigKeys.BUDGET],
                                })
                            }
                            popper={{
                                className: styles.popper,
                                id: "popper-container",
                            }}
                            trigger={
                                <Dropdown
                                    className={cx(
                                        styles.mini_filter_dropdown,
                                        styles.budget_input_dropdown,
                                        styles.hide_dropdown
                                    )}
                                    value="budget"
                                    icon={
                                        <Drop
                                            className="ml-4"
                                            width={10}
                                            height={10}
                                            alt="dropdownIcon"
                                        />
                                    }
                                    options={[
                                        {
                                            key: "1",
                                            value: "budget",
                                            text:
                                                budget.length === 2
                                                    ? `${formatMoneyToInr(
                                                          budget[0]
                                                      )} - ${formatMoneyToInr(
                                                          budget[1]
                                                      )}`
                                                    : "Budget",
                                        },
                                    ]}
                                />
                            }
                        />
                    </div>

                    {numberOfFilters > 0 && (
                        <Text
                            className={cx(
                                "cursor-pointer mr-auto",
                                styles.more_filters_text
                            )}
                            color={ColorType.PRIMARY}
                            font={FontType.BODY}
                            type="p"
                            weight={500}
                            onClick={openFilterModalHandler}
                        >
                            +{numberOfFilters} More filters applied
                        </Text>
                    )}

                    <Text
                        className={cx("cursor-pointer", styles.apply_filter)}
                        color={ColorType.PRIMARY}
                        font={FontType.BODY}
                        type="p"
                        weight={500}
                        onClick={clearFilterModal}
                    >
                        <Text className="inline-block mr-3" type="span">
                            <FilterIcon width="16px" />
                        </Text>
                        Clear Filters
                    </Text>

                    <Text
                        className={cx("cursor-pointer", styles.apply_filter)}
                        color={ColorType.PRIMARY}
                        font={FontType.BODY}
                        type="p"
                        weight={500}
                        onClick={openFilterModalHandler}
                    >
                        <Text className="inline-block mr-3" type="span">
                            <FilterIcon width="16px" />
                        </Text>
                        Apply Filters
                    </Text>
                </div>
                {headingSortByContainer}
            </div>
        </>
    );
};
