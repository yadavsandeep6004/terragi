import React, { PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./text.module.scss";

export enum FontType {
    HEADING_XXL = "heading_xxl",
    HEADING_XL = "heading_xl",
    HEADING_L = "heading_lg",
    HEADING_M = "heading_md",
    HEADING_S = "heading_sm",
    SUBHEADING_L = "subheading_lg",
    SUBHEADING_M = "subheading_md",
    SUBHEADING_S = "subheading_sm",
    TITLE = "title",
    BODY = "body",
    LABEL_L = "label_lg",
    LABEL_M = "label_md",
    LABEL_S = "label_sm",
}

export enum ColorType {
    WHITE = "white",
    BLACK = "black", // #000
    COOL_BLACK = "cool_black", // #000
    HEADING_PRIMARY = "heading_primary",
    HEADING_SECONDARY = "heading_secondary",
    LABEL = "label",
    BODY = "body_primary",
    TITLE = "title_primary",
    SECONDARY = "secondary",
    PRIMARY = "primary",
    BLUE_500 = "blue_500",
    GREY100 = "grey100",
    GREY500 = "grey500",
    GREY2 = "grey2",
}

export enum FontFamily {
    POPPINS = "poppins",
    ROBOTO = "roboto",
}

type TagType = keyof Pick<
    JSX.IntrinsicElements,
    "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label"
>;

type TextProps = {
    className?: string;
    color?: ColorType;
    font?: FontType;
    weight?: number | string;
    type?: TagType;
    onClick?: (e: any) => void;
    htmlFor?: string;
    family?: string;
    style?: any;
};

export const Text: React.FC<PropsWithChildren<TextProps>> = ({
    type: Element = "p",
    color,
    font = FontType.BODY,
    weight = 400,
    className,
    children,
    onClick,
    htmlFor,
    family = FontFamily.POPPINS,
    style,
}) => (
    <Element
        className={cx(
            className,
            styles[`text__${font}`],
            styles[`text__${color}`],
            styles[`text__${weight}`],
            styles[`text__${family}`]
        )}
        onClick={onClick}
        htmlFor={htmlFor}
        style={style}
    >
        {children}
    </Element>
);
