/* eslint-disable no-nested-ternary */
/* eslint-disable react/no-array-index-key */
import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";

import styles from "./caraousel.module.scss";
import ArrowIcon from "../../assets/icon/arrow.svg";

const SCROLL_DISTANCE = 500;
const HIDE_THRESHOLD = 30;

export const Caraousel = ({ slides }: { slides: any }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [disableRightButton, setDisableRight] = useState(true);
    const [disbaleLeftButton, setDisableLeft] = useState(true);

    const rightSlide = () => {
        if (!ref.current) return;
        ref.current.scrollBy({ left: SCROLL_DISTANCE, behavior: "smooth" });
    };

    const leftSlide = () => {
        if (!ref.current) return;
        ref.current.scrollBy({ left: -SCROLL_DISTANCE, behavior: "smooth" });
    };

    const onScrollHandler = () => {
        if (!ref.current) return;
        setDisableLeft(ref.current.scrollLeft < HIDE_THRESHOLD);
        setDisableRight(
            ref.current.offsetWidth + ref.current.scrollLeft >
                ref.current.scrollWidth - HIDE_THRESHOLD
        );
    };

    useEffect(() => {
        if (ref.current) onScrollHandler();
    }, [ref.current]);

    return (
        <div
            className={cx(styles.mainContainer)}
            ref={ref}
            onScroll={onScrollHandler}
        >
            {!disbaleLeftButton && (
                <div className={cx(styles.left_button)} onClick={leftSlide}>
                    <ArrowIcon />
                </div>
            )}
            <div className={cx(styles.slider)}>
                {slides.map((slide: any, index: number) => (
                    <div className={styles.card} key={index}>
                        {slide}
                    </div>
                ))}
            </div>
            {!disableRightButton && (
                <div className={cx(styles.right_button)} onClick={rightSlide}>
                    <ArrowIcon />
                </div>
            )}
        </div>
    );
};
