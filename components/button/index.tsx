import React, { PropsWithChildren } from "react";
import {
    Button as SemanticButton,
    ButtonProps as SemanticButtonProps,
} from "semantic-ui-react";

import cx from "classnames";

import styles from "./button.module.scss";

export enum VariantType {
    SOLID = "solid",
    OUTLINED = "outline",
}
export enum SizeType {
    S = "small",
    M = "medium",
    L = "large",
}

type ButtonProps = Omit<SemanticButtonProps, "size"> & {
    className?: string;
    variant?: VariantType;
    type: "submit" | "reset" | "button";
    size?: SizeType;
};

export const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
    className,
    children,
    variant = VariantType.SOLID,
    type = "button",
    size = SizeType,
    ...rest
}) => (
    <SemanticButton
        type={type}
        className={cx(
            styles.btn,
            styles[`btn_${variant}`],
            styles[`btn_${size}`],
            className
        )}
        {...rest}
        icon="heart"
    >
        {children}
    </SemanticButton>
);
