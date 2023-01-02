import React, { useEffect } from "react";
import cx from "classnames";

import { useRouter } from "next/router";

import { Modal } from "../../../components/modal";
import { ColorType, FontType, Text } from "../../../components/text";

import styles from "./search-modal.module.scss";
import { Button, VariantType } from "../../../components/button";
import { SearchDropDown } from "../../../components/search-dropdown";
import {
    CommunityFormResultType,
    CommunityPostFormKeys,
} from "../CreatePostModal/types";
import { Input } from "../../../components/input";
import { Label } from "../../../components/label";
import { BudgetInput } from "../../../components/budget-input";

type CommunitySearchModalPropsType = {
    isOpen: boolean;
    onClose: () => void;
    searchResults: CommunityFormResultType;
    formValues: any;
    setFormValues: any;
    applyFilters: (data: CommunityFormResultType) => void;
};

export const CommunitySearchModal: React.FC<CommunitySearchModalPropsType> = ({
    isOpen,
    onClose,
    applyFilters,
    searchResults,
    formValues,
    setFormValues,
}) => {
    const router = useRouter();

    const onSearchingQuery = () => {};

    const onSelectingItem = (
        _: any,
        { name, value }: { name: string; value: string | string[] }
    ) => {
        if (name === "maxSuperArea") {
            setFormValues((p: any) => ({
                ...p,
                [CommunityPostFormKeys.SUPER_AREA]: [
                    p[CommunityPostFormKeys.SUPER_AREA][0],
                    value,
                ],
            }));
        } else if (name === "minSuperArea") {
            setFormValues((p: any) => ({
                ...p,
                [CommunityPostFormKeys.SUPER_AREA]: [
                    value,
                    p[CommunityPostFormKeys.SUPER_AREA][1],
                ],
            }));
        } else {
            setFormValues((p: any) => ({
                ...p,
                [name]: value,
            }));
        }
    };

    const onExpectedRentChange = ({ value }: { value: any }) => {
        setFormValues((p: any) => ({
            ...p,
            [CommunityPostFormKeys.EXPECTED_RENT]: value,
        }));
    };

    const applyFiltersHelper = () => {
        applyFilters(formValues);
    };

    useEffect(() => {
        const defaultValues: any = {};
        Object.entries(router.query).forEach(([k, v]: any) => {
            if (k !== "page" && k !== "pageSize" && v) {
                v = JSON.parse(v as string);
                if (Array.isArray(v)) defaultValues[k] = v;
                else if (!Number.isNaN(v)) defaultValues[k] = +(v as string);
            }
        });

        const proSegment = defaultValues[
            CommunityPostFormKeys.PROPERTY_SEGMENT
        ] || ["Residential"];

        const propFor = defaultValues[CommunityPostFormKeys.PROPERTY_FOR] || [
            "Sell",
        ];

        const price = defaultValues.maxPrice
            ? [defaultValues.minPrice, defaultValues.maxPrice]
            : [0, 1000000000];

        const area = defaultValues.minSuperArea
            ? [defaultValues.minSuperArea, defaultValues.maxSuperArea]
            : [];

        setFormValues({
            ...defaultValues,
            [CommunityPostFormKeys.PROPERTY_SEGMENT]: proSegment,
            [CommunityPostFormKeys.PROPERTY_FOR]: propFor,
            [CommunityPostFormKeys.EXPECTED_RENT]: price,
            [CommunityPostFormKeys.SUPER_AREA]: area,
        });
    }, [router.query]);

    const defaultValues: any = formValues;

    return (
        <>
            <Modal
                className={styles.modal_wrapper}
                isOpen={isOpen}
                onClose={onClose}
                isCloseButtonDark
            >
                <Text
                    className="mb-5"
                    font={FontType.HEADING_M}
                    color={ColorType.HEADING_PRIMARY}
                    weight={500}
                >
                    Advance Search
                </Text>
                <div className={cx(styles.form_wrapper, "grid")}>
                    <SearchDropDown
                        label="Locality"
                        name={CommunityPostFormKeys.LOCATION}
                        onChange={onSearchingQuery}
                        required
                        defaultValue={
                            defaultValues[CommunityPostFormKeys.LOCATION]
                        }
                        searchResults={
                            searchResults[CommunityPostFormKeys.LOCATION]
                        }
                        onSelect={onSelectingItem}
                    />
                    <SearchDropDown
                        label="BHK Type"
                        name={CommunityPostFormKeys.BHK}
                        onChange={onSearchingQuery}
                        defaultValue={defaultValues[CommunityPostFormKeys.BHK]}
                        searchResults={searchResults[CommunityPostFormKeys.BHK]}
                        onSelect={onSelectingItem}
                    />
                    <SearchDropDown
                        name={CommunityPostFormKeys.PROPERTY_FOR}
                        onChange={onSearchingQuery}
                        label="Property For"
                        searchResults={
                            searchResults[CommunityPostFormKeys.PROPERTY_FOR]
                        }
                        defaultValue={
                            defaultValues[CommunityPostFormKeys.PROPERTY_FOR]
                        }
                        onSelect={onSelectingItem}
                    />
                    <SearchDropDown
                        name={CommunityPostFormKeys.PROPERTY_SEGMENT}
                        onChange={onSearchingQuery}
                        label="Property Segment"
                        searchResults={
                            searchResults[
                                CommunityPostFormKeys.PROPERTY_SEGMENT
                            ]
                        }
                        defaultValue={
                            defaultValues[
                                CommunityPostFormKeys.PROPERTY_SEGMENT
                            ]
                        }
                        onSelect={onSelectingItem}
                    />

                    <SearchDropDown
                        name={CommunityPostFormKeys.FURNISHING}
                        onChange={onSearchingQuery}
                        label="Furnishing"
                        searchResults={
                            searchResults[CommunityPostFormKeys.FURNISHING]
                        }
                        defaultValue={
                            defaultValues[CommunityPostFormKeys.FURNISHING]
                        }
                        onSelect={onSelectingItem}
                    />

                    <SearchDropDown
                        name={CommunityPostFormKeys.PROPERTY_TYPE}
                        onChange={onSearchingQuery}
                        label="Property Type"
                        searchResults={
                            searchResults[CommunityPostFormKeys.PROPERTY_TYPE]
                        }
                        defaultValue={
                            defaultValues[CommunityPostFormKeys.PROPERTY_TYPE]
                        }
                        onSelect={onSelectingItem}
                    />

                    <SearchDropDown
                        name={CommunityPostFormKeys.TENANT_PREFERRED}
                        onChange={onSearchingQuery}
                        label="Tenant Preferred"
                        searchResults={
                            searchResults[
                                CommunityPostFormKeys.TENANT_PREFERRED
                            ]
                        }
                        defaultValue={
                            defaultValues[
                                CommunityPostFormKeys.TENANT_PREFERRED
                            ]
                        }
                        onSelect={onSelectingItem}
                    />

                    <SearchDropDown
                        name={CommunityPostFormKeys.FLOORS}
                        onChange={onSearchingQuery}
                        label="Floors"
                        searchResults={
                            searchResults[CommunityPostFormKeys.FLOORS]
                        }
                        defaultValue={
                            defaultValues[CommunityPostFormKeys.FLOORS]
                        }
                        onSelect={onSelectingItem}
                    />

                    <SearchDropDown
                        name={CommunityPostFormKeys.SOCIETY_NAME}
                        onChange={onSearchingQuery}
                        label="Society Name"
                        searchResults={
                            searchResults[CommunityPostFormKeys.SOCIETY_NAME]
                        }
                        defaultValue={
                            defaultValues[CommunityPostFormKeys.SOCIETY_NAME]
                        }
                        onSelect={onSelectingItem}
                    />

                    <div>
                        <Label label="Super area (sq ft/sq yd)" />
                        <div className="flex gap-4 items-center">
                            <Input
                                name="minSuperArea"
                                type="text"
                                placeholder="Min"
                                onChange={onSelectingItem}
                                value={
                                    formValues[
                                        CommunityPostFormKeys.SUPER_AREA
                                    ][0]
                                }
                            />
                            -
                            <Input
                                name="maxSuperArea"
                                type="text"
                                placeholder="Max"
                                onChange={onSelectingItem}
                                value={
                                    formValues[
                                        CommunityPostFormKeys.SUPER_AREA
                                    ][1]
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className="w-full mt-8">
                    <BudgetInput
                        name={CommunityPostFormKeys.EXPECTED_RENT}
                        label="Price"
                        required={false}
                        globalValue={
                            formValues[CommunityPostFormKeys.EXPECTED_RENT]
                        }
                        onChange={onExpectedRentChange}
                    />
                </div>
                <div className={styles.button_wrapper}>
                    <Button
                        onClick={onClose}
                        variant={VariantType.OUTLINED}
                        className={cx("h-full", styles.btn, styles.btn_cancel)}
                        type="button"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={applyFiltersHelper}
                        className={cx("h-full", styles.btn)}
                        type="button"
                    >
                        Apply
                    </Button>
                </div>
            </Modal>
        </>
    );
};
