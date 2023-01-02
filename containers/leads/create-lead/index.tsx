import React, { useMemo } from "react";
import cx from "classnames";

import { Button, VariantType } from "../../../components/button";
import { Dropdown } from "../../../components/dropdown";
import { Input } from "../../../components/input";
import { Modal } from "../../../components/modal";
import { SearchDropDown } from "../../../components/search-dropdown";
import { ColorType, FontType, Text } from "../../../components/text";

import styles from "./create-lead.module.scss";
import { BudgetInput } from "../../../components/budget-input";
import { convertConfigDataToSemanticLanguage } from "../../../utils/helpers";
import { CreateFormKeys, CreateLeadPropType } from "./types";
import { ConfigKeys } from "../../../utils/types";
import { Label } from "../../../components/label";
import { COUNTRY_CODES } from "../../../utils/constants";

const CreateLeadNonMemo: React.FC<CreateLeadPropType> = ({
    isOpen = true,
    onClose,
    onSubmit,
    leadFormValues,
    searchResults,
    onChange,
    isEditMode,
    isLoading,
    onSearchingQuery,
    errorMessages,
}) => {
    const countryCodes = useMemo(() => COUNTRY_CODES, []);

    return (
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
                {isEditMode ? "Edit" : "Create"} Lead
            </Text>
            <form onSubmit={onSubmit}>
                <div className={styles.form_wrapper}>
                    <Input
                        type="text"
                        label="Name"
                        name={CreateFormKeys.NAME}
                        onChange={onChange}
                        value={leadFormValues[CreateFormKeys.NAME]}
                        errorMessage={errorMessages[CreateFormKeys.NAME]}
                        required
                    />

                    <Dropdown
                        label="Property Type"
                        name={CreateFormKeys.PROPERTY_TYPE}
                        onChange={onChange}
                        value={leadFormValues[CreateFormKeys.PROPERTY_TYPE]}
                        options={convertConfigDataToSemanticLanguage(
                            searchResults[ConfigKeys.PROPERTY_TYPE] || []
                        )}
                    />

                    <SearchDropDown
                        name={CreateFormKeys.BHK_TYPE}
                        label="BHK Type"
                        onSelect={onChange}
                        searchResults={searchResults[ConfigKeys.BHK_TYPE] || []}
                        onChange={() => {}}
                        defaultValue={leadFormValues[CreateFormKeys.BHK_TYPE]}
                    />

                    <SearchDropDown
                        name={CreateFormKeys.LOCALITY}
                        label="Location"
                        onChange={onSearchingQuery}
                        searchResults={searchResults[ConfigKeys.LOCALITY]}
                        defaultValue={leadFormValues[CreateFormKeys.LOCALITY]}
                        onSelect={onChange}
                    />

                    <div className={styles.budget_input}>
                        <BudgetInput
                            label="Budget"
                            required={false}
                            name={ConfigKeys.BUDGET}
                            onChange={onChange}
                            globalValue={[
                                leadFormValues[CreateFormKeys.BUDGET_MIN],
                                leadFormValues[CreateFormKeys.BUDGET_MAX],
                            ]}
                        />
                    </div>

                    <Dropdown
                        name={CreateFormKeys.LEAD_SOURCE}
                        label="Source of Lead"
                        options={convertConfigDataToSemanticLanguage(
                            searchResults[ConfigKeys.LEAD_SOURCE]
                        )}
                        defaultValue={
                            leadFormValues[CreateFormKeys.LEAD_SOURCE]
                        }
                        onChange={onChange}
                        required
                    />

                    <div>
                        <Label label="Mobile Number" required />
                        <div className="flex flex-1" style={{ gap: 12 }}>
                            <Dropdown
                                name={CreateFormKeys.COUNTRY_CODE}
                                search
                                options={countryCodes}
                                value="+91"
                                onChange={onChange}
                                errorMessage={undefined}
                                disabled
                                required
                            />

                            <Input
                                type="number"
                                name={CreateFormKeys.MOBILE}
                                wrapperClassName="flex-1"
                                value={leadFormValues[CreateFormKeys.MOBILE]}
                                onChange={(e: any) => {
                                    if (e.target.value.length > 10) return;
                                    (onChange as any)(e);
                                }}
                                errorMessage={
                                    errorMessages[CreateFormKeys.MOBILE]
                                }
                                required
                            />
                        </div>
                    </div>
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
                        loading={isLoading}
                        className={cx("h-full", styles.btn)}
                        type="submit"
                    >
                        Apply
                    </Button>
                </div>
            </form>
        </Modal>
    );
};
export const CreateLead = React.memo(CreateLeadNonMemo);
