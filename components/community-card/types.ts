export enum TagsKey {
    TENANT = "preferredTenant",
    FOR = "propertyFor",
    CREATED = "createdAt",
}

export type Tags = {
    title: string;
};

export const TagConfigs: Record<TagsKey, Tags> = {
    [TagsKey.FOR]: {
        title: "For",
    },
    [TagsKey.TENANT]: {
        title: "Tenant",
    },
    [TagsKey.CREATED]: {
        title: "Posted",
    },
};

export enum PropertiesKey {
    PRICE = "price",
    AVAILABLE_FROM = "availableFrom",
    FURNISHING = "furnishing",
    AREA = "superArea",
    FLOOR = "floor",
}

export type PropertiesConfig = {
    title: string;
    suffix?: string;
};

export const PropertiesConfigs: Record<PropertiesKey, PropertiesConfig> = {
    [PropertiesKey.PRICE]: {
        title: "Price",
    },
    [PropertiesKey.AREA]: {
        title: "Area",
        suffix: "sq yd",
    },
    [PropertiesKey.AVAILABLE_FROM]: {
        title: "Available From",
    },
    [PropertiesKey.FLOOR]: {
        title: "Floor Number",
        // suffix: "th floor",
    },
    [PropertiesKey.FURNISHING]: {
        title: "Furnishing",
    },
};
