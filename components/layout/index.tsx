import React, { PropsWithChildren } from "react";
import cx from "classnames";

import { Navbar } from "../navbar";

import styles from "./layout.module.scss";
import { isCurrentPathProtected } from "../../utils/helpers";

export const Layout: React.FC<PropsWithChildren<any>> = (props) => {
    const isProtected = isCurrentPathProtected();

    const isDesktop = window.screen.width > 992;
    const classes = isProtected && isDesktop ? "flex-row " : "flex-col";

    return (
        <div className={cx(styles.wrapper, "flex  h-full", classes)}>
            <Navbar />
            {isProtected ? (
                <div className={cx(styles.header_container, "w-full h-full")}>
                    {props.children}
                    <div />
                </div>
            ) : (
                <> {props.children}</>
            )}
        </div>
    );
};
