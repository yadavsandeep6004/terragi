/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

import styles from "./sidebar-button.module.scss";

import { Text, FontType, ColorType } from "../text";

type SidebarButtonProps = {
    checked: boolean;
    icon: any;
    disabled: boolean;
    children?: React.ReactNode;
};

export const SidebarButton: React.FC<SidebarButtonProps> = ({
    icon,
    disabled = false,
    checked = false,
    children,
}) => {
    const Icon = icon;
    const finalCheck = disabled ? false : checked || false;

    let textColor = finalCheck ? ColorType.WHITE : ColorType.COOL_BLACK;
    textColor = disabled ? ColorType.GREY100 : textColor;

    return (
        <div
            data-disable={disabled}
            data-checked={finalCheck}
            className={styles.wrapper}
        >
            <Icon width="18" height="18" />
            <Text
                font={FontType.LABEL_L}
                color={textColor}
                weight={finalCheck ? 600 : 400}
            >
                {children}
            </Text>
        </div>
    );
};
