export type OptionType = { key: any; value: any; text: any };
export type SearchConfigType = {
    _id: string;
    label: string;
    value: string | number;
};

export enum ConfigKeys {
    BHK_TYPE = "bhk",
    PLOT_SIZE = "plotSize",
    BUDGET = "budget",
    FLOORS = "floors",
    FACING = "facing",
    BUILDER_NAME = "builderName",
    LOCALITY = "localities",
    CONSTRUCTION_STATUS = "constructionStatus",
    PROPERTY_FOR = "propertyFor",
    PROPERTY_SEGMENT = "propertySegment",
    FURNISHING = "furnishing",
    TENANT_PREFERRED = "preferredTenant",
    LEAD_SOURCE = "leadSources",
    LOCATIONS = "location",
    PROPERTY_TYPE = "propertyType",
    FIELD_AGENTS = "fieldAgents",
    SOCIETY_NAME = "societyName",
}

export enum EventType {
    CALL_BUILDER = "CALL_BUILDER",
    VIEW_NUMBER = "VIEW_NUMBER",
    PROPERTY_SEARCH = "PROPERTY_SEARCH",
    POST_SEARCH = "POST_SEARCH",
    PROPERTY_VIEWED = "PROPERTY_VIEWED",
}

export type BudegtConfigDataType = { max: number; min: number };

export type ConfigKeysType = {
    [ConfigKeys.BHK_TYPE]: SearchConfigType[];
    [ConfigKeys.PLOT_SIZE]: SearchConfigType[];
    [ConfigKeys.FACING]: SearchConfigType[];
    [ConfigKeys.FLOORS]: SearchConfigType[];
    [ConfigKeys.BUILDER_NAME]: SearchConfigType[];
    [ConfigKeys.LOCATIONS]: SearchConfigType[];
    [ConfigKeys.LOCALITY]: SearchConfigType[];
    [ConfigKeys.CONSTRUCTION_STATUS]: SearchConfigType[];
    [ConfigKeys.PROPERTY_FOR]: SearchConfigType[];
    [ConfigKeys.PROPERTY_SEGMENT]: SearchConfigType[];
    [ConfigKeys.LEAD_SOURCE]: SearchConfigType[];
    [ConfigKeys.FURNISHING]: SearchConfigType[];
    [ConfigKeys.TENANT_PREFERRED]: SearchConfigType[];
    [ConfigKeys.PROPERTY_TYPE]: SearchConfigType[];
    [ConfigKeys.BUDGET]: BudegtConfigDataType;
    [ConfigKeys.SOCIETY_NAME]?: any[];
};
