export const propertySegmentOptions = ["Residential", "Commercial"].map(
    (e, idx) => ({
        _id: `${idx}`,
        label: e,
        value: e,
    })
);

export const propertyTypeOptionsForResidential = [
    "Apartment",
    "Builder floor",
    "Independent House",
    "Plot",
].map((e, idx) => ({
    _id: `${idx}-${e}`,
    label: e,
    value: e,
}));

export const propertyTypeOptionsForCommercial = [
    "Retail",
    "Shop",
    "Office",
    "Warehouse",
    "Industrial",
].map((e, idx) => ({
    _id: `${idx}-${e}`,
    label: e,
    value: e,
}));

export const bhkTypeOptions = [
    "1 BHK",
    "2 BHK",
    "3 BHK",
    "4 BHK",
    "5 BHK",
    "6 BHK",
    "Studio Apartment",
    "1 RK",
].map((e, idx) => ({
    _id: `${idx}`,
    label: e,
    value: e,
}));

export const furnishingOptionsForResidential = [
    "Bare shell",
    "Warm shell",
    "Semi furnished",
    "Furnished",
].map((e, idx) => ({
    _id: `${idx}`,
    label: e,
    value: e,
}));

export const furnishingOptionsForCommercial = ["Bare shell", "Furnished"].map(
    (e, idx) => ({
        _id: `${idx}`,
        label: e,
        value: e,
    })
);
