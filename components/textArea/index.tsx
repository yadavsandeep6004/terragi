import React from "react";
import {
    TextArea as SemanticTextArea,
    TextAreaProps as SemanticInputProps,
    Popup,
} from "semantic-ui-react";
import cx from "classnames";

import styles from "./textArea.module.scss";
import { Label } from "../label";

type InputProps = Omit<SemanticInputProps, "size" | "fluid"> & {
    className?: string;
    wrapperClassName?: string;
    labelClassName?: string;
    name: string;
    value: string | number;
    placeholder?: string;
    label?: string;
    required?: boolean;
    errorMessage?: string;
};

const TextAreaNonMemo: React.FC<InputProps> = (props) => {
    const {
        className,
        labelClassName,
        wrapperClassName,
        name,
        value,
        rows,
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
                    <SemanticTextArea
                        className={cx(className, styles.input__primary)}
                        data-error={isError}
                        name={name}
                        default
                        value={value}
                        placeholder={placeholder}
                        required={required}
                        {...rest}
                    />
                }
            />
        </div>
    );
};

export const TextArea = React.memo(TextAreaNonMemo);
