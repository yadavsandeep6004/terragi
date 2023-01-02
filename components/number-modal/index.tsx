import React, { useEffect } from "react";
import cx from "classnames";

import { useRouter } from "next/router";

import { Modal } from "../modal";
import { ColorType, FontType, Text } from "../text";

import styles from "./number.module.scss";

import Contact from "../../assets/images/contact.png";
import PhoneIcon from "../../assets/icon/phone-bg-blue.svg";
import { useApi } from "../../hooks/useApi";
import { POST_EVENTS } from "../../api/url";
import { EventType } from "../../utils/types";
import { PropertyDataType } from "../properties-card";

export type NumberModalProps = {
    isOpen?: boolean;
    onClose: (flag: boolean) => void;
    data?: PropertyDataType;
};

export const NumberModal: React.FC<NumberModalProps> = ({
    isOpen = true,
    onClose,
    data,
}) => {
    const api = useApi();
    const router = useRouter();

    useEffect(() => {
        if (!isOpen) return;
        router.query.id = data!._id.toString();
        router.push(router, undefined, { scroll: false, shallow: true });

        return () => {
            delete router.query.id;
            router.push(router, undefined, { scroll: false, shallow: true });
        };
    }, [isOpen]);

    useEffect(() => {
        if (router.query.id === undefined) onClose(false);
    }, [router.query]);

    const openDialler = (phoneNumber: string) => {
        window.open(`tel:${phoneNumber}`);
        api.post({
            url: POST_EVENTS,
            body: {
                eventType: EventType.CALL_BUILDER,
                metadata: {
                    // eslint-disable-next-line no-underscore-dangle
                    propertyId: data?._id,
                },
            },
        });
    };
    return (
        <>
            <Modal
                className={styles.number_modal}
                isOpen={isOpen && router.query.id !== undefined}
                onClose={onClose}
                isCloseButtonDark
                closeOnOutsideClick
            >
                <div className={styles.wrapper}>
                    <img
                        className={styles.contact_img}
                        src={Contact.src}
                        alt="contact"
                    />
                    <Text
                        className={cx(styles.number_heading, "text-center")}
                        font={FontType.SUBHEADING_L}
                        color={ColorType.COOL_BLACK}
                        weight="500"
                        type="h2"
                    >
                        Builder Contact Details
                    </Text>
                    <>
                        <Text color={ColorType.HEADING_PRIMARY} weight={500}>
                            {data?.builderName}
                        </Text>
                        <Text font={FontType.LABEL_M}>Name</Text>
                    </>
                    <div className="flex justify-between aligns-center mt-8">
                        {data?.builderPhone && (
                            <div>
                                <div className="flex items-center gap-2">
                                    <Text
                                        color={ColorType.HEADING_PRIMARY}
                                        weight={500}
                                    >
                                        {data.builderPhone}
                                    </Text>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                            openDialler(
                                                data.builderPhone as string
                                            )
                                        }
                                    >
                                        <PhoneIcon width="24" height="24" />
                                    </div>
                                </div>

                                <Text font={FontType.LABEL_M} type="label">
                                    Mobile Number
                                </Text>
                            </div>
                        )}
                        {data?.alternateBuilderPhone && (
                            <div>
                                <div className="flex items-center gap-2">
                                    <Text
                                        color={ColorType.HEADING_PRIMARY}
                                        weight={500}
                                    >
                                        {data.alternateBuilderPhone}
                                    </Text>
                                    <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                            openDialler(
                                                data.alternateBuilderPhone as string
                                            )
                                        }
                                    >
                                        <PhoneIcon width="24" height="24" />
                                    </div>
                                </div>

                                <Text font={FontType.LABEL_M}>
                                    Alternate Mobile Number
                                </Text>
                            </div>
                        )}
                    </div>
                    {data?.builderEmail && (
                        <div className="mt-5">
                            <Text
                                color={ColorType.HEADING_PRIMARY}
                                weight={500}
                            >
                                {data.builderEmail}
                            </Text>
                            <Text font={FontType.LABEL_M}>Email Id</Text>
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};
