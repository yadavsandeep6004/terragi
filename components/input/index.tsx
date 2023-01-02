import React from "react";
import {
    Input as SemanticInput,
    InputProps as SemanticInputProps,
    Popup,
} from "semantic-ui-react";
import cx from "classnames";

import styles from "./input.module.scss";
import { Label } from "../label";

export enum SizeType {
    L = "large",
    M = "medium",
    S = "small",
}

type InputProps = Omit<SemanticInputProps, "size" | "fluid"> & {
    className?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    name: string;
    size?: SizeType;
    value?: string | number | string[];
    placeholder?: string;
    label?: string;
    required?: boolean;
    errorMessage?: string;
};

const InputNonMemo: React.FC<InputProps> = (props) => {
    const {
        className,
        labelClassName,
        wrapperClassName,
        name,
        size,
        value,
        placeholder,
        label,
        required = false,
        errorMessage,
        ...rest
    } = props;

    const isError = typeof errorMessage === "string";

    return (
        <div className={wrapperClassName}>
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
                    <SemanticInput
                        className={cx(
                            className,
                            styles.input__primary,
                            styles[`input__${size}`]
                        )}
                        data-error={isError}
                        name={name}
                        default
                        value={value}
                        placeholder={placeholder}
                        required={required}
                        error={isError}
                        {...rest}
                    />
                }
            />
        </div>
    );
};

export const Input = React.memo(InputNonMemo);
