import { SearchConfigType } from "../../../utils/types";

export type CreatePostModalPropsType = {
    isOpen: boolean;
    onClose: (flag: boolean) => void;
    refreshData: () => void;
};

export enum CommunityPostFormKeys {
    PROPERTY_SEGMENT = "propertySegment",
    PROPERTY_FOR = "propertyFor",
    PROPERTY_TYPE = "propertyType",
    SOCIETY_NAME = "societyName",
    BHK = "bedrooms",
    EXPECTED_RENT = "price",
    LOCATION = "locality",
    AVAILABLE_FROM = "availableFrom",
    FURNISHING = "furnishing",
    SUPER_AREA = "superArea",
    TENANT_PREFERRED = "preferredTenant",
    FLOORS = "floor",
    REMARKS = "remarks",
}

export type CommunityFormResultType = {
    [CommunityPostFormKeys.PROPERTY_SEGMENT]: SearchConfigType[];
    [CommunityPostFormKeys.PROPERTY_FOR]: SearchConfigType[];
    [CommunityPostFormKeys.PROPERTY_TYPE]: SearchConfigType[];
    [CommunityPostFormKeys.BHK]: SearchConfigType[];
    [CommunityPostFormKeys.FURNISHING]: SearchConfigType[];
    [CommunityPostFormKeys.TENANT_PREFERRED]: SearchConfigType[];
    [CommunityPostFormKeys.FLOORS]: SearchConfigType[];
    [CommunityPostFormKeys.LOCATION]: any[];
    [CommunityPostFormKeys.SOCIETY_NAME]: any[];
    [CommunityPostFormKeys.SUPER_AREA]: any[];
    [CommunityPostFormKeys.EXPECTED_RENT]: any[];
};

export type CommunityPostFormType = {
    [key in CommunityPostFormKeys]: string | number;
};

export type CommunityPostFormRequestType = Partial<CommunityPostFormType> & {
    floor?: number | string;
};

export type CommunityPostFormResponseType = [];
