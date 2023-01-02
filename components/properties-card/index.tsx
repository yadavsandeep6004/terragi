/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @next/next/no-img-element */
import React, { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import cx from "classnames";

import { ColorType, FontType, Text } from "../text";
import { Button } from "../button";
import { Card } from "../card";

import {
    CONSTRUCTION_STATUS,
    FACING as FACING_VALUE,
} from "../../utils/constants";
import Bookmark from "../../assets/icon/bookmark.svg";
import ShownToLeadTickImage from "../../assets/icon/blue_tick.svg";
import {
    sendTagEvent,
    formatMoneyToInr,
    getOrdinalSuffix,
} from "../../utils/helpers";
import styles from "./properties.module.scss";
import Eye from "../../assets/icon/eye.svg";
import { Modal } from "../modal";
import Location from "../../assets/icon/location.svg";

export enum PropertiesCardDataKeys {
    BASEMENT = "Basement",
    VIEWS = "last20HoursViewCount",
    NUMBER_OF_IMAGES = "numberOfImages",
    IMAGES = "picture",
    BATHROOM = "bathroom",
    BEDROOM = "bedroom",
    BUILDER_MAIL = "builderEmail",
    BUILDER_NAME = "builderName",
    BUILDER_PHONE = "builderPhone",
    ALTERNATE_BUILDER_PHONE = "alternateBuilderPhone",
    FACING = "facing",
    FLOOR = "floornum",
    TOTAL_FLOORS = "floors",
    LOCATION_NAME = "locality",
    ID = "id",
    _ID = "_id",
    LAT = "lat",
    LIFT = "lift",
    LONG = "long",
    PICTURE = "picture",
    PLOT_NUM = "plotNum",
    PLOTSIZE = "plotSize",
    POSSESSION = "possession",
    REMARK = "remark",
    ROAD = "road",
    SPECIALITY = "speciality",
    STATUS = "status",
    STILT = "stilt",
    PRICE = "price",
    IS_BOOKMARKED = "bookmarkId",
    IS_SHOWN_TO_LEAD = "shownToLeadId",
    CREATED_AT = "createdAt",
    USER_ID = "userId",
    IS_DELETED = "isDeleted",
}

export type PropertiesCardProps = {
    data: {
        [key in PropertiesCardDataKeys]: string | string[] | number;
    };
    onClickShownToLead?: (propertyId: string) => void;
    viewNumberModalHandler: (data: PropertyDataType) => void;
    bookmarkProperty?: (id: string, bookmarkId: string) => void;
    isBookmarkEnabled?: boolean;
    showLeadTime?: boolean;
    showViewNumber?: boolean;
    showViews?: boolean;
    showStatus?: boolean;
    builder?: boolean;
    onClickMarkAsSold?: () => void;
};
export type PropertyDataType = PropertiesCardProps["data"];

const Detail: React.FC<{
    value: ReactNode;
    label: string;
    className?: string;
}> = (props) => (
    <div className={cx(styles.details_card, props.className)}>
        <Text
            className={styles.detail_value}
            weight={500}
            color={ColorType.COOL_BLACK}
            font={FontType.SUBHEADING_M}
        >
            {props.value}
        </Text>
        <Text
            className={styles.detail_label}
            font={FontType.LABEL_S}
            color={ColorType.LABEL}
        >
            {props.label}
        </Text>
    </div>
);

export const PropertiesCard: React.FC<PropertiesCardProps> = ({
    data,
    viewNumberModalHandler,
    bookmarkProperty,
    isBookmarkEnabled,
    onClickShownToLead,
    builder = false,
    showLeadTime = false,
    showViewNumber = true,
    showViews = true,
    showStatus = false,
    onClickMarkAsSold,
}) => {
    const [openGallery, setGallery] = useState(false);
    const router = useRouter();

    const handleEditPropertiesClick = (e: any, id: string) => {
        e.preventDefault();
        const name = "edit";
        router.push({ pathname: name, query: { id } }, undefined, {
            shallow: true,
            scroll: true,
        });
    };
    const handleBookmark = () => {
        bookmarkProperty?.(
            // eslint-disable-next-line no-underscore-dangle
            data[PropertiesCardDataKeys._ID] as string,
            data[PropertiesCardDataKeys.IS_BOOKMARKED] as string
        );
    };

    const imgUrl = `https://terragi.s3.ap-south-1.amazonaws.com/images/${
        data[PropertiesCardDataKeys.IMAGES]
    }`;
    const mapUrl = `https://www.google.com/maps/place/${
        data[PropertiesCardDataKeys.LAT]
    },${data[PropertiesCardDataKeys.LONG]}`;

    return (
        <Card className={styles.card_style}>
            <div className={cx(styles.wrapper, "md:flex ")}>
                <div
                    onClick={() => setGallery(true)}
                    className={cx(
                        styles.img_wrapper,
                        "relative cursor-pointer"
                    )}
                    style={{
                        height: "300px",
                        background: `url(${imgUrl})`,
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <div className={styles.image_hidden_div} />
                    {/* <div
                        className={cx(
                            styles.gallery_wrapper,
                            "flex absolute justify-evenly items-center"
                        )}
                    >
                        <Gallery width="14" height="14" />
                        <Text
                            color={ColorType.WHITE}
                            font={FontType.LABEL_M}
                            type="span"
                        >
                            {data[PropertiesCardDataKeys.NUMBER_OF_IMAGES] ||
                                10}
                            +
                        </Text>
                    </div> */}
                    {showViews && (
                        <div
                            className={cx(
                                styles.view_wrapper,
                                "flex absolute justify-evenly items-center"
                            )}
                        >
                            <Eye width="15" height="10" />
                            <Text
                                className={styles.view_wrapper_text}
                                font={FontType.LABEL_S}
                                color={ColorType.WHITE}
                                type="span"
                            >
                                {data[PropertiesCardDataKeys.VIEWS] || 0}
                                {"  "}
                                brokers in last 20 hours
                            </Text>
                        </div>
                    )}
                </div>

                <div
                    className={cx(
                        styles.details_wrapper,
                        "flex justify-between"
                    )}
                >
                    <div className={styles.details_content_wrapper}>
                        <div
                            className={cx(
                                "flex justify-between",
                                styles.name_wrapper
                            )}
                        >
                            <div className="flex flex-col gap-5">
                                <div className=" flex gap-3">
                                    <Text
                                        className={styles.detail_title}
                                        color={ColorType.COOL_BLACK}
                                        font={FontType.SUBHEADING_M}
                                        weight={700}
                                    >
                                        {`${
                                            data[PropertiesCardDataKeys.BEDROOM]
                                        } `}
                                        BHK
                                        {data[
                                            PropertiesCardDataKeys.LOCATION_NAME
                                        ] && (
                                            <>
                                                {" "}
                                                in{" "}
                                                <Text
                                                    font={FontType.SUBHEADING_M}
                                                    weight={700}
                                                    type="span"
                                                >{` ${(
                                                    data[
                                                        PropertiesCardDataKeys
                                                            .LOCATION_NAME
                                                    ] as string
                                                )?.replaceAll(
                                                    "-",
                                                    " "
                                                )}, Gurgaon`}</Text>
                                            </>
                                        )}
                                    </Text>
                                    <div
                                        className="ml-2 flex items-baseline"
                                        onClick={() => {
                                            window.open(mapUrl);
                                        }}
                                    >
                                        <Location
                                            className="cursor-pointer"
                                            height={20}
                                            width={20}
                                        />
                                        <span
                                            className="whitespace-nowrap ml-1 cursor-pointer underline"
                                            style={{
                                                fontSize: "12px",
                                                color: "#737373",
                                            }}
                                        >
                                            View on map
                                        </span>
                                    </div>
                                </div>

                                <Text
                                    font={FontType.LABEL_M}
                                    color={ColorType.LABEL}
                                >
                                    Builder name:
                                    {` ${
                                        data[
                                            PropertiesCardDataKeys.BUILDER_NAME
                                        ]
                                    }`}
                                </Text>

                                <div
                                    className={cx(
                                        "flex items-center px-[8px] mb-auto ",
                                        styles.lead_show_box2
                                    )}
                                >
                                    <Text
                                        font={FontType.LABEL_M}
                                        color={ColorType.PRIMARY}
                                    >
                                        Lead shown on: 22-05-2022
                                    </Text>
                                </div>
                            </div>

                            {isBookmarkEnabled && (
                                <span
                                    className="cursor-pointer"
                                    onClick={handleBookmark}
                                >
                                    <Bookmark
                                        className={styles.bookmark_icon}
                                        data-checked={
                                            data[
                                                PropertiesCardDataKeys
                                                    .IS_BOOKMARKED
                                            ] !== undefined &&
                                            data[
                                                PropertiesCardDataKeys
                                                    .IS_BOOKMARKED
                                            ] !== ""
                                        }
                                    />
                                </span>
                            )}
                        </div>

                        <div className={styles.grid}>
                            <Detail
                                value={
                                    +data[PropertiesCardDataKeys.PRICE] === -1
                                        ? "Price on request"
                                        : formatMoneyToInr(
                                              +data[
                                                  PropertiesCardDataKeys.PRICE
                                              ]
                                          )
                                }
                                label="Price"
                            />
                            <Detail
                                value={data[PropertiesCardDataKeys.PLOT_NUM]}
                                label="Plot Number"
                            />
                            <Detail
                                value={
                                    <>
                                        {data[
                                            PropertiesCardDataKeys.PLOTSIZE
                                        ] || 100}
                                        <Text
                                            font={FontType.LABEL_M}
                                            color={ColorType.COOL_BLACK}
                                            type="span"
                                        >
                                            sq yd
                                        </Text>
                                    </>
                                }
                                label="Area"
                            />
                            <Detail
                                value={
                                    <>
                                        <Text
                                            font={FontType.SUBHEADING_M}
                                            type="span"
                                        >
                                            {data[
                                                PropertiesCardDataKeys.FLOOR
                                            ] || 1}
                                            <Text
                                                font={FontType.LABEL_M}
                                                color={ColorType.COOL_BLACK}
                                                type="span"
                                            >
                                                {getOrdinalSuffix(
                                                    +data[
                                                        PropertiesCardDataKeys
                                                            .FLOOR
                                                    ] || 1
                                                )}
                                            </Text>
                                        </Text>{" "}
                                        of{" "}
                                        <Text
                                            font={FontType.SUBHEADING_M}
                                            type="span"
                                        >
                                            {
                                                data[
                                                    PropertiesCardDataKeys
                                                        .TOTAL_FLOORS
                                                ]
                                            }{" "}
                                            <Text
                                                font={FontType.LABEL_M}
                                                color={ColorType.COOL_BLACK}
                                                type="span"
                                            >
                                                Floors
                                            </Text>
                                        </Text>
                                    </>
                                }
                                label="Floor Number"
                            />
                            <Detail
                                value={
                                    CONSTRUCTION_STATUS[
                                        data[
                                            PropertiesCardDataKeys.POSSESSION
                                        ] as string
                                    ]
                                }
                                label="Building Status"
                            />
                            <Detail
                                className={styles.facing_field}
                                value={
                                    FACING_VALUE[
                                        data[
                                            PropertiesCardDataKeys.FACING
                                        ] as string
                                    ]
                                }
                                label="Facing"
                            />
                        </div>
                        {data.isDeleted && (
                            <Text
                                className={styles.rejected_text}
                                font={FontType.LABEL_L}
                                color={ColorType.BLACK}
                            >
                                {" "}
                                Regret to inform you that your property could
                                not be made live. Please contact our Inventory
                                Manager at +91-95992 54826 for the same, Thank
                                you.
                            </Text>
                        )}
                        <Text
                            className={styles.note}
                            font={FontType.LABEL_M}
                            color={ColorType.LABEL}
                        >
                            <span>
                                {!builder &&
                                    data[PropertiesCardDataKeys.REMARK]}{" "}
                            </span>
                            <br />
                            {!builder &&
                                "* Please contact builder before the visit for updated availability and price"}
                        </Text>
                    </div>
                    <div className="flex  flex-col gap-2 items-end justify-end">
                        {showLeadTime && (
                            <div
                                className={cx(
                                    "flex items-center px-[8px] mb-auto ",
                                    styles.lead_show_box
                                )}
                            >
                                <Text
                                    font={FontType.LABEL_M}
                                    color={ColorType.PRIMARY}
                                >
                                    Lead shown on:{" "}
                                    {new Date(
                                        data[
                                            PropertiesCardDataKeys.CREATED_AT
                                        ] as string
                                    ).toDateString()}
                                </Text>
                            </div>
                        )}
                        {onClickShownToLead && (
                            <Button
                                className={cx(styles.shown_number)}
                                type="button"
                                onClick={() => {
                                    // eslint-disable-next-line no-underscore-dangle
                                    onClickShownToLead(data._id as string);
                                }}
                            >
                                Shown to Lead
                                {data.shownToLeadId !== undefined &&
                                    data.shownToLeadId !== null && (
                                        <ShownToLeadTickImage
                                            src={ShownToLeadTickImage.src}
                                            width="16px"
                                            height="16px"
                                        />
                                    )}
                            </Button>
                        )}
                        {showViewNumber && (
                            <Button
                                className={cx(styles.view_number_btn)}
                                type="button"
                                onClick={() => {
                                    viewNumberModalHandler(data);
                                    sendTagEvent({
                                        action: "view_number",
                                        params: { ...data, id: data._id },
                                    });
                                }}
                            >
                                View Number
                            </Button>
                        )}

                        {showStatus && (
                            <Button disabled type="button">
                                {(data.status === 0 || data.status === 1) &&
                                    !data.isDeleted &&
                                    "Pending"}
                                {(data.status === 0 || data.status === 1) &&
                                    data.isDeleted &&
                                    "Rejected"}
                                {data.status === 2 && !data.isDeleted && "Live"}
                                {data.status === 2 &&
                                    data.isDeleted &&
                                    "Rejected"}
                                {data.status === 3 && "Sold"}
                            </Button>
                        )}

                        {showStatus && data.status === 2 && (
                            <Button type="button" onClick={onClickMarkAsSold}>
                                Mark as Sold
                            </Button>
                        )}

                        {builder && (
                            <Button
                                type="button"
                                onClick={(e: any) =>
                                    handleEditPropertiesClick(
                                        e,
                                        data[
                                            PropertiesCardDataKeys._ID
                                        ] as string
                                    )
                                }
                            >
                                Edit
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                className={styles.gallery_modal}
                isCloseButtonDark
                isOpen={openGallery}
                onClose={() => setGallery(false)}
            >
                <img className="m-auto" src={imgUrl} alt="Property Image" />
            </Modal>
        </Card>
    );
};
