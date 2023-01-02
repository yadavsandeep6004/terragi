import React from "react";
import cx from "classnames";
import Image from "next/image";

import { ColorType, FontType, Text } from "../../../components/text";

import styles from "./status-module.module.scss";
import { PaymentStatusType } from "./types";
import { Button } from "../../../components/button";

export const PaymentStatusLayout: React.FC<PaymentStatusType> = ({
    buttonText,
    bodyText,
    headingText,
    imageSrc,
    onClick,
}) => (
    <div className={cx(styles.card_main, "flex flex-col items-center ")}>
        <div className={cx(styles.image)}>
            <Image
                src={imageSrc}
                alt="Payment Failed"
                width="153"
                height="136"
            />
        </div>

        <div className="mt-8 text-center">
            <Text
                color={ColorType.COOL_BLACK}
                font={FontType.HEADING_S}
                weight={500}
            >
                {headingText}
            </Text>{" "}
            <Text
                className="mt-2 "
                color={ColorType.COOL_BLACK}
                weight={500}
                font={FontType.LABEL_L}
            >
                {bodyText}
            </Text>
        </div>

        <div className={cx(styles.button, "mt-10")}>
            <Button fluid type="button" onClick={onClick}>
                {buttonText}
            </Button>
        </div>
    </div>
);
