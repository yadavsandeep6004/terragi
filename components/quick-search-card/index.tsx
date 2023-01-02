import React from "react";

import { ListingDetailsType } from "../../containers/home-section/quick-search";
import { ColorType, FontType, Text } from "../text";

import styles from "./searchcard.module.scss";

export type QuickSearchCardType = {
    data: ListingDetailsType;
    onClick: Function;
};

export const QuickSearchCard: React.FC<QuickSearchCardType> = ({
    data,
    onClick,
}) => {
    const onClickHandler = () => {
        onClick(data);
    };

    return (
        <div className={styles.div_container}>
            <div onClick={onClickHandler} className={styles.circular_pic}>
                <img src={data.picTitle.src} />
                <div className={styles.circular_pic_div} />
            </div>

            <div className={styles.text_container}>
                <Text
                    font={FontType.BODY}
                    color={ColorType.LABEL}
                    weight={500}
                    className="text-center"
                >
                    {data.title}
                </Text>
                <Text
                    font={FontType.SUBHEADING_S}
                    color={ColorType.COOL_BLACK}
                    weight={500}
                >
                    {data.label}
                </Text>
            </div>
        </div>
    );
};
