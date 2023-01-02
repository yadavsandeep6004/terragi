import React from "react";
import { Popup } from "semantic-ui-react";

import { OptionType } from "../../utils/types";

import { Dropdown } from "../dropdown";

import { Label } from "../label";

export const DobInput: React.FC<{
    name: string;
    value: string;
    onChange: Function;
    label: string;
    required: boolean;
    errorMessage: string;
}> = ({ name, value, onChange, label, required, errorMessage }) => {
    const monthOption = [
        "Janaury",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ].map((e) => ({ key: e, text: e, value: e }));

    const dateSpl = value.split("-");
    const dayOption = Array(
        new Date(
            +dateSpl[0],
            monthOption.findIndex((f) => f.value === dateSpl[1]) + 1,
            0
        ).getDate()
    )
        .fill(1)
        .map((e, i) => ({ key: i + 1, text: i + 1, value: i + 1 }));

    const year13 = new Date().getFullYear() - 13;

    const yearOptions: OptionType[] = [];

    for (let i = 1901; i <= year13; i += 1) {
        yearOptions.push({ key: i, text: i, value: +i });
    }

    const onDateChange = (e: any, e2: any) => {
        const { name: na, value: v } = e2;
        let idx = 0;
        if (na === "day") idx = 2;
        else if (na === "month") idx = 1;

        const va = value.split("-");
        va[idx] = v;

        onChange({ name, value: va.join("-") });
    };
    const isError = typeof errorMessage === "string";

    return (
        <div className="flex flex-col flex-1">
            <Label label={label} required={required} />

            <Popup
                style={{ fontSize: 12, fontWeight: 500 }}
                content={errorMessage}
                position="bottom left"
                open={isError}
                trigger={
                    <div className="flex gap-[2px]">
                        <Dropdown
                            className="max-h-[40px]"
                            name="day"
                            options={dayOption}
                            value={+dateSpl[2]}
                            onChange={onDateChange}
                        />
                        <Dropdown
                            className="max-h-[40px]"
                            wrapperClassName="w-full"
                            name="month"
                            options={monthOption}
                            value={dateSpl[1]}
                            onChange={onDateChange}
                        />
                        <Dropdown
                            className="max-h-[40px]"
                            name="year"
                            options={yearOptions}
                            value={+dateSpl[0]}
                            onChange={onDateChange}
                        />
                    </div>
                }
            />
        </div>
    );
};
