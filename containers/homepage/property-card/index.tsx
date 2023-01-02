import React from "react";
import cx from "classnames";

import { Text, ColorType, FontType } from "../../../components/text";
import EyeIcon from "../../../assets/icon/eye.svg";

import styles from "./styles.module.scss";
import {
    PropertiesCardDataKeys,
    PropertyDataType,
} from "../../../components/properties-card";

const PropertyCardNonMemo: React.FC<{ data: PropertyDataType }> = ({
    data,
}) => {
    const imgUrl = `https://terragi.s3.ap-south-1.amazonaws.com/images/${
        data[PropertiesCardDataKeys.IMAGES]
    }`;
    return (
        <div className={cx(styles.wrapper)}>
            <div
                className={cx(styles.backgroundImg, "relative")}
                style={{
                    background: `url(${imgUrl}) no-repeat`,
                    backgroundSize: "cover",
                    height: "188px",
                    width: "262px",
                    backgroundRepeat: "no-repeat",
                    borderRadius: "4px",
                }}
            >
                <div className={styles.image_hidden_div} />
                <div
                    className={cx(
                        styles.view_wrapper,
                        "flex absolute justify-evenly items-center"
                    )}
                >
                    <div className={cx(styles.viewIcon)}>
                        <EyeIcon width="15" height="10" />
                    </div>
                    <Text font={FontType.LABEL_S} color={ColorType.WHITE}>
                        {`${
                            data[PropertiesCardDataKeys.VIEWS] || 61
                        } Brokers in last 20 hours`}
                    </Text>
                </div>
            </div>
            <div className={styles.text}>
                <Text font={FontType.SUBHEADING_M} weight={500}>
                    {`${
                        data[PropertiesCardDataKeys.BEDROOM] || 1
                    } BHK Builder floor in ${
                        data[PropertiesCardDataKeys.LOCATION_NAME]
                    }`}
                </Text>
                <Text
                    font={FontType.LABEL_M}
                    color={ColorType.LABEL}
                    weight={500}
                    className="mt-[2px]"
                >
                    {`Builder name: ${
                        data[PropertiesCardDataKeys.BUILDER_NAME]
                    }`}
                </Text>
            </div>
        </div>
    );
};

export const PropertyCard = React.memo(PropertyCardNonMemo);
