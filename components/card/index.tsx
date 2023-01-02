import React, { PropsWithChildren } from "react";
import cx from "classnames";

import styles from "./card.module.scss";

type CardPropsType = {
    className?: string;
};

export const Card: React.FC<PropsWithChildren<CardPropsType>> = ({
    className,
    children,
}) => <div className={cx(styles.card_style, className)}>{children}</div>;
