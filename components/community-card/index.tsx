import cx from "classnames";

import { getOrdinalSuffix, postedAgo, toLakhsCr } from "../../utils/helpers";

import { Button, VariantType } from "../button";

import { ColorType, FontType, Text } from "../text";
import { MemoUserIcon } from "../user-icon";

import styles from "./communityCard.module.scss";
import { TagConfigs, PropertiesConfigs, TagsKey, PropertiesKey } from "./types";

type CommunityCardInfoType = {
    property: string;
    value?: string | number;
};

const CommunityCardInfo: React.FC<CommunityCardInfoType> = ({
    property,
    value,
}) => {
    const getProperty = PropertiesConfigs[property as `${PropertiesKey}`];

    return (
        <div className={cx(styles.info, "flex flex-col justify-items-center")}>
            <Text
                font={FontType.SUBHEADING_S}
                color={ColorType.BLACK}
                weight={500}
                className={styles.info_value}
                type="span"
            >
                {value}{" "}
                <Text
                    font={FontType.LABEL_M}
                    color={ColorType.COOL_BLACK}
                    type="span"
                >
                    {getProperty.suffix}
                </Text>
            </Text>
            <Text
                font={FontType.LABEL_M}
                color={ColorType.GREY2}
                weight={500}
                className={styles.info_property}
            >
                {getProperty.title}
            </Text>
        </div>
    );
};

type TagType = {
    label: string;
    value: any;
};
const Tag: React.FC<TagType> = ({ label, value }) => {
    const getLabel = TagConfigs[label as `${TagsKey}`];
    return (
        <Text
            color={ColorType.PRIMARY}
            font={FontType.LABEL_M}
            className={cx(
                styles.card_tag,
                "flex items-center justify-center mr-3"
            )}
        >
            {getLabel.title}: {value}
        </Text>
    );
};

type UserDetails = {
    id: string;
    fullName: string;
    mobileNumber: string;
    email: string;
    profileImage?: string;
};

export type PostResponseType = {
    _id: string;
    userDetails: UserDetails;
    societyName: string;
    remarks?: string;
    createdAt?: string;
    bedrooms: string;
    propertyFor: string;
    propertySegment: string;
    propertyType: string;
    locality: string;
    preferredTenant: string;
    price: number | string;
    availableFrom: string;
    furnishing: string;
    superArea: number;
    floor: string | number;
};
export type CommunityCardType = PostResponseType & {
    showModal: (data: UserDetails) => void;
};

export const CommunityCard: React.FC<CommunityCardType> = ({
    showModal,
    remarks,
    userDetails,
    createdAt,
    societyName,
    bedrooms,
    propertySegment,
    propertyType,
    locality,
    preferredTenant,
    propertyFor,
    price,
    availableFrom,
    furnishing,
    superArea,
    floor,
}) => {
    if (availableFrom) {
        const options: Intl.DateTimeFormatOptions = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const date = new Date(availableFrom);
        availableFrom = new Intl.DateTimeFormat("en-UK", options).format(date);
    }

    if (floor) {
        floor += getOrdinalSuffix(floor);
    }

    if (price) {
        price = toLakhsCr(price as number);
    }

    if (createdAt) {
        createdAt = postedAgo(createdAt);
    }

    const tags: any = { preferredTenant, propertyFor, createdAt };
    const location: any = { bedrooms, propertySegment, propertyType, locality };
    const details: any = { price, superArea, floor, availableFrom, furnishing };

    return (
        <div className={cx(styles.card, "flex flex-col self-stretch")}>
            <div
                className={cx(
                    styles.card_header,
                    "flex items-center flex-wrap"
                )}
            >
                <MemoUserIcon
                    profileImage={userDetails?.profileImage}
                    name={userDetails?.fullName || ""}
                />
                <div className={cx(styles.heading, "flex flex-col")}>
                    <Text
                        font={FontType.SUBHEADING_S}
                        color={ColorType.GREY2}
                        className={styles.dataValue}
                    >
                        {Object.values(location).map((value: any) => (
                            <Text key={value} type="span">
                                {value}{" "}
                            </Text>
                        ))}
                    </Text>
                    <Text
                        font={FontType.SUBHEADING_M}
                        color={ColorType.BLACK}
                        weight={600}
                    >
                        {societyName}
                    </Text>
                </div>
                <div className={cx(styles.tags, "flex justify-end flex-wrap")}>
                    {Object.keys(tags).map(
                        (key: any) =>
                            tags[key] && (
                                <Tag key={key} label={key} value={tags[key]} />
                            )
                    )}
                </div>
            </div>
            <div className={cx(styles.card_data, "flex flex-wrap")}>
                {Object.keys(details).map((key: any) =>
                    details[key] ? (
                        <CommunityCardInfo
                            key={key}
                            property={key}
                            value={details[key]}
                        />
                    ) : (
                        <></>
                    )
                )}
            </div>
            <div
                className={cx(
                    styles.card_footer,
                    "flex justify-between items-center"
                )}
            >
                <div>
                    <Text
                        className="mb-4"
                        font={FontType.LABEL_M}
                        color={ColorType.GREY2}
                        weight={400}
                    >
                        * Please contact broker before the visit for updated
                        availability and price
                    </Text>
                    {(remarks as string)?.length > 0 && (
                        <Text
                            font={FontType.LABEL_M}
                            color={ColorType.GREY2}
                            weight={400}
                        >
                            * {remarks}
                        </Text>
                    )}
                </div>
                <div className={styles.button}>
                    <Button
                        variant={VariantType.OUTLINED}
                        type="button"
                        onClick={() => showModal(userDetails)}
                    >
                        View Number
                    </Button>
                </div>
            </div>
        </div>
    );
};
