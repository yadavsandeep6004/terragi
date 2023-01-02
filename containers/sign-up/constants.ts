import { OptionType } from "../../utils/types";

export const GENDER_OPTIONS: OptionType[] = [
    { key: 1, value: "male", text: "Male" },
    { key: 2, value: "female", text: "Female" },
];

export const EXPERIENCE_OPTIONS: OptionType[] = new Array(31)
    .fill(31)
    .map((_, i) => ({ key: i, value: i, text: `${i} Years` }));
