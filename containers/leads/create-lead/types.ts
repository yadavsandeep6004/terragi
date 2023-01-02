import { ConfigKeysType } from "../../../utils/types";

export enum CreateFormKeys {
    BUDGET_MAX = "budgetMax",
    BUDGET_MIN = "budgetMin",
    BHK_TYPE = "bhkType",
    NAME = "name",
    LEAD_SOURCE = "leadSource",
    LOCALITY = "localities",
    PROPERTY_TYPE = "propertyType",
    COUNTRY_CODE = "countryCode",
    MOBILE = "mobileNumber",
}

export type CreateLeadPropType = {
    isOpen: boolean;
    isLoading: boolean;
    isEditMode: string | null;
    errorMessages: any;
    searchResults: ConfigKeysType;
    leadFormValues: CreateLeadFormType;
    onSubmit: (e: any) => void;
    onChange: () => void;
    onClose: () => void;
    onSearchingQuery: () => void;
};

export type CreateLeadFormType = {
    [CreateFormKeys.BUDGET_MAX]: number;
    [CreateFormKeys.BUDGET_MIN]: number;
    [CreateFormKeys.BHK_TYPE]: string[];
    [CreateFormKeys.LEAD_SOURCE]: string;
    [CreateFormKeys.NAME]: string;
    [CreateFormKeys.LOCALITY]: string[];
    [CreateFormKeys.PROPERTY_TYPE]: string;
    [CreateFormKeys.MOBILE]: string;
};
