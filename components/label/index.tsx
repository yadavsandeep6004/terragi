import React from "react";
import cx from "classnames";

import { FontType, Text } from "../text";
import styles from "./label.module.scss";

export type LabelProps = {
    className?: string;
    label: string;
    required?: boolean;
};

export const Label: React.FC<LabelProps> = ({
    label,
    className,
    required = false,
}) => (
    <Text font={FontType.LABEL_L} className={cx(styles.label, className)}>
        {label}
        {required && (
            <Text type="span" font={FontType.LABEL_L} className={className}>
                {" *"}
            </Text>
        )}
    </Text>
);
