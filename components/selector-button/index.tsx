import React from "react";
import { Popup } from "semantic-ui-react";

import styles from "./selector.module.scss";
import { Label } from "../label";
import { FontType, Text } from "../text";

type SelectorButtonProps = {
    options: string[];
    value: string;
    onChange: (e: React.FormEvent<HTMLInputElement>, value: any) => void;
    name: string;
    labelClassName?: string;
    label?: string;
    required?: boolean;
    errorMessage?: string;
    withExclamationIcon?: boolean;
};

export const SelectorButton: React.FC<SelectorButtonProps> = (props) => {
    const {
        options = [],
        onChange,
        value,
        name,
        required = false,
        label,
        labelClassName,
        errorMessage,
        withExclamationIcon = false,
    } = props;
    const isError = typeof errorMessage === "string";

    return (
        <>
            <div>
                {label && (
                    <Label
                        label={label}
                        className={labelClassName}
                        required={required}
                    />
                )}
                <Popup
                    style={{ fontSize: 12, fontWeight: 500 }}
                    content={errorMessage}
                    position="bottom left"
                    open={isError}
                    trigger={
                        <div className={styles.wrapper}>
                            <div className={styles["wrapper-child"]}>
                                {options?.map((e) => (
                                    <button
                                        className={styles["radio-button"]}
                                        type="button"
                                        key={Math.random()}
                                        name={name}
                                        value={e}
                                        data-checked={value === e}
                                        onClick={() =>
                                            onChange(
                                                {
                                                    target: { name, value: e },
                                                } as any,
                                                { name, value: e }
                                            )
                                        }
                                    >
                                        <Text
                                            type="label"
                                            font={FontType.TITLE}
                                            weight={500}
                                        >
                                            {withExclamationIcon && null}
                                            {e}
                                        </Text>
                                    </button>
                                ))}
                            </div>
                        </div>
                    }
                />
            </div>
        </>
    );
};
