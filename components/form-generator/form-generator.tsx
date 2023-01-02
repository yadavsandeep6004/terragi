import React from "react";

import { Input } from "../input";
import { Dropdown } from "../dropdown";

export enum InputType {
    TEXT,
    SINGLE_DROPDOWN,
}

export type InputConfig = {
    name: string;
    value: any;
    label?: string;
    options?: any[];
    placeholder?: string;
    inputType: InputType;
    onChange: Function;
    dependentIds: string[];
    validation: [];
};

type FormGeneratorProps = {
    fields: InputConfig[];
};

export const FormGenerator: React.FC<FormGeneratorProps> = ({ fields }) => (
    <div>
        {fields.map((field) => {
            switch (field.inputType) {
                case InputType.TEXT:
                    return (
                        <Input
                            name={field.name}
                            value={field.value}
                            label={field.label}
                            placeholder={field.placeholder}
                            onChange={field.onChange}
                        />
                    );

                case InputType.SINGLE_DROPDOWN:
                    return (
                        <Dropdown
                            name={field.name}
                            label={field.label}
                            placeholder={field.placeholder}
                            options={field.options}
                            onChange={field.onChange}
                        />
                    );

                default:
                    <></>;
            }
            return <></>;
        })}
    </div>
);
