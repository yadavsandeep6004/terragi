import React from "react";
import {
    Dropdown as SemanticDropDown,
    DropdownProps as SemanticDropdownProps,
    LabelProps,
    Popup,
} from "semantic-ui-react";
import cx from "classnames";

import styles from "./dropdown.module.scss";
import Drop from "../../assets/icon/dropdown.svg";
import { Label } from "../label";

import CrossIcon from "../../assets/icon/cross.svg";
import { ColorType, FontType, Text } from "../text";

type DropdownProps = Omit<SemanticDropdownProps, "fluid"> & {
    className?: string;
    labelClassName?: string;
    wrapperClassName?: string;
    label?: string;
    required?: boolean;
    placeholder?: string;
    options?: Record<string, any>[];
    errorMessage?: string;
    isOnlyIcon?: boolean;
    isSimpleDropdown?: boolean;
};

const DropdownNonMemo: React.FC<DropdownProps> = (props) => {
    const {
        className,
        placeholder,
        options,
        required,
        label,
        labelClassName,
        wrapperClassName,
        errorMessage,
        isOnlyIcon,
        isSimpleDropdown,
        ...rest
    } = props;

    const dropdownIcon = (
        <Drop
            className={styles.dropdown__icon}
            width={10}
            height={10}
            alt="dropdownIcon"
        />
    );

    const isError = typeof errorMessage === "string";
    const isSelection = isSimpleDropdown ? "" : "selection";
    return (
        <div className={cx(styles.wrapper, wrapperClassName)}>
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
                    <SemanticDropDown
                        className={cx(
                            isOnlyIcon
                                ? styles.dropdown_items
                                : styles.select__primary,
                            className
                        )}
                        selection={isSelection}
                        options={options}
                        icon={dropdownIcon}
                        placeholder={placeholder}
                        direction="right"
                        error={isError}
                        {...rest}
                    />
                }
            />
        </div>
    );
};

export const Dropdown = React.memo(DropdownNonMemo);

export const DropdownLabel = (label: any): LabelProps => ({
    as: "div",
    className: styles.dropdown__label__wrapper,
    removeIcon: (
        <span>
            <CrossIcon width="8" height="8" />
        </span>
    ),
    content: (
        <Text font={FontType.LABEL_M} weight={500} color={ColorType.COOL_BLACK}>
            {label.text}
        </Text>
    ),
});
