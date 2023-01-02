import React from "react";
import cx from "classnames";

import { Button } from "../../../components/button";
import { ColorType, FontType, Text } from "../../../components/text";

import { PlanCardLayoutType } from "./types";
import styles from "./plan-card-layout.module.scss";
import { card } from "./constants";

export const PlanCardLayout: React.FC<PlanCardLayoutType> = ({
    headingText,
    services,
    amount,
    onClick,
}) => (
    <div className={cx(styles.card_main, "flex flex-col")}>
        <Text
            font={FontType.HEADING_M}
            weight={500}
            className="tracking-wide"
            color={ColorType.COOL_BLACK}
        >
            {headingText}
        </Text>
        <div className="mt-6 p-2 ">
            <Text>What you will get at an Introductory Price of</Text>
            <div className="mt-1">
                {amount === card[0].amount ? (
                    <Text
                        font={FontType.HEADING_L}
                        color={ColorType.BLACK}
                        weight={700}
                    >
                        &#8377; {25000} + GST
                    </Text>
                ) : (
                    <Text
                        font={FontType.HEADING_L}
                        color={ColorType.BLACK}
                        weight={700}
                    >
                        &#8377; {amount}
                    </Text>
                )}
            </div>
        </div>
        <div className={cx(styles.card_higlight, "mt-1 flex items-center ")}>
            <Text
                font={FontType.LABEL_M}
                color={ColorType.BLUE_500}
                className=" text-left"
            >
                For multiple account you can reach us at +91-9810157367
            </Text>
        </div>
        <div className="mt-7 mb-5">
            <ul className="list-inside list-disc">
                {services.map((s, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <li key={`${i}$${s}`} className="p-4">
                        {s}
                    </li>
                ))}
            </ul>
        </div>

        <div className="mt-auto">
            <Button fluid type="button" className="mt-5" onClick={onClick}>
                Buy Now
            </Button>
        </div>
    </div>
);
