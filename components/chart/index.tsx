import React, { PropsWithChildren } from "react";

import cx from "classnames";

import styles from "./chart-container.module.scss";
import { FontType, Text } from "../text";

type ChartContainerProps = PropsWithChildren<{
    title: string;
    className?: string;
}>;

export const ChartContainer: React.FC<ChartContainerProps> = ({
    title,
    className,
    children,
}) => (
    <div className={cx(styles.wrapper, className)}>
        <Text
            type="h6"
            weight={500}
            className={styles.title}
            font={FontType.SUBHEADING_M}
        >
            {title}
        </Text>
        <div className={styles.content}>{children}</div>
    </div>
);
