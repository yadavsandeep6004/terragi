import React, { useMemo } from "react";
import cx from "classnames";

import { Modal } from "../../../components/modal";
import { ColorType, FontType, Text } from "../../../components/text";

import styles from "./search-modal.module.scss";
import { Button, VariantType } from "../../../components/button";
import { FilterModalPropsType } from "./types";
import { BudgetInput } from "../../../components/budget-input";
import { SearchDropDown } from "../../../components/search-dropdown";
import { ConfigKeys } from "../../../utils/types";

export const SearchModal: React.FC<FilterModalPropsType> = ({
    isOpen,
    onClose,
    applyFilters,
    onSearchingQuery,
    searchResults,
    onSelectingItem,
    defaultValues,
}) => {
    const floorsOptions = useMemo(
        () => searchResults[ConfigKeys.FLOORS].slice(0, 4),
        [searchResults[ConfigKeys.FLOORS]]
    );

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
                        name={ConfigKeys.LOCALITY}
                        onChange={onSearchingQuery}
                        required
                        defaultValue={defaultValues[ConfigKeys.LOCALITY]}
                        searchResults={searchResults[ConfigKeys.LOCALITY]}
                        onSelect={onSelectingItem}
                    />
                    <SearchDropDown
                        label="BHK Type"
                        name={ConfigKeys.BHK_TYPE}
                        onChange={onSearchingQuery}
                        defaultValue={defaultValues[ConfigKeys.BHK_TYPE]}
                        searchResults={searchResults[ConfigKeys.BHK_TYPE]}
                        onSelect={onSelectingItem}
                    />
                    <SearchDropDown
                        name={ConfigKeys.PLOT_SIZE}
                        onChange={onSearchingQuery}
                        label="Plot Size"
                        searchResults={searchResults[ConfigKeys.PLOT_SIZE]}
                        defaultValue={defaultValues[ConfigKeys.PLOT_SIZE]}
                        onSelect={onSelectingItem}
                    />
                    {/* <SearchDropDown
                        name={ConfigKeys.BUILDER_NAME}
                        onChange={onSearchingQuery}
                        label="Builder Name"
                        searchResults={searchResults[ConfigKeys.BUILDER_NAME]}
                        defaultValue={defaultValues[ConfigKeys.BUILDER_NAME]}
                        onSelect={onSelectingItem}
                    /> */}
                    <div className={styles.budget_input}>
                        <BudgetInput
                            label="Budget"
                            required={false}
                            name={ConfigKeys.BUDGET}
                            onChange={onSelectingItem}
                            globalValue={defaultValues[ConfigKeys.BUDGET]}
                        />
                    </div>
                    <SearchDropDown
                        name={ConfigKeys.FLOORS}
                        onChange={onSearchingQuery}
                        label="Floors"
                        defaultValue={defaultValues[ConfigKeys.FLOORS]}
                        searchResults={floorsOptions}
                        onSelect={onSelectingItem}
                    />
                    <SearchDropDown
                        name={ConfigKeys.FACING}
                        onChange={onSearchingQuery}
                        label="Facing"
                        searchResults={searchResults[ConfigKeys.FACING]}
                        defaultValue={defaultValues[ConfigKeys.FACING]}
                        onSelect={onSelectingItem}
                    />
                    <SearchDropDown
                        name={ConfigKeys.CONSTRUCTION_STATUS}
                        onChange={onSearchingQuery}
                        label="Property Construction Status"
                        searchResults={
                            searchResults[ConfigKeys.CONSTRUCTION_STATUS]
                        }
                        onSelect={onSelectingItem}
                        defaultValue={
                            defaultValues[ConfigKeys.CONSTRUCTION_STATUS]
                        }
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
                        onClick={applyFilters}
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
