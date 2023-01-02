import React from "react";

import { Button } from "../../../components/button";
import { ColorType, FontType, Text } from "../../../components/text";

import { NoLeadsCardPropType } from "./type";
import { Card } from "../../../components/card";

import styles from "./noleads.module.scss";

export const NoLeadsCard: React.FC<NoLeadsCardPropType> = ({
    headingText,
    bodyText,
    buttonText,
    onClick,
}) => (
    <>
        <Card className={styles.card}>
            <Text
                font={FontType.HEADING_M}
                weight={500}
                color={ColorType.COOL_BLACK}
            >
                {headingText}
            </Text>
            <Text
                className="mb-10"
                font={FontType.BODY}
                weight={400}
                color={ColorType.COOL_BLACK}
            >
                {bodyText}
            </Text>
            <div className="mt-auto">
                <Button
                    className={styles.btn_resize}
                    fluid
                    type="button"
                    onClick={onClick}
                >
                    {buttonText}
                </Button>
            </div>
        </Card>
    </>
);
