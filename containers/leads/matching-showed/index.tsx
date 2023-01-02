/* eslint-disable no-underscore-dangle */
import React, { useEffect, useRef, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";

import BackIcon from "../../../assets/icon/Shape.svg";

import { FontType, Text } from "../../../components/text";
import {
    PropertiesCard,
    PropertiesCardDataKeys,
    PropertyDataType,
} from "../../../components/properties-card";
import { Layout } from "../../../components/layout";
import { NumberModal } from "../../../components/number-modal";

import styles from "./matching-showed.module.scss";
import { GetShowedPropertyResponse } from "../../../pages/leads/properties/showed";
import { GetPropertyResponseType } from "../../home-section/types";
import { useApi } from "../../../hooks/useApi";
import { POST_EVENTS } from "../../../api/url";
import { EventType } from "../../../utils/types";
import { SortBy } from "../../home-section/sortby-container";

type MatchingShowedPropsType = {
    getPropertyHelper: () => Promise<
        GetShowedPropertyResponse | GetPropertyResponseType
    >;
    heading: string;
    showLeadTime?: boolean;
    handleFilterChange?: Function;
    onClickShownToLead?: (
        propertyId: string,
        isShownToLead: string
    ) => Promise<any>;
};

const MatchingShowed: React.FC<MatchingShowedPropsType> = ({
    getPropertyHelper,
    heading,
    onClickShownToLead,
    handleFilterChange,
    showLeadTime = false,
}) => {
    const [propertiesData, setPropertiesData] = useState<PropertyDataType[]>(
        []
    );
    const [viewNumberModalData, setViewNumberModalData] =
        useState<PropertyDataType>();

    const [totalPages, setTotalPages] = useState(0);
    const [totalDocs, setTotalDocs] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastElement, setLastElement] = useState(null);

    const router = useRouter();
    const clientApi = useApi();

    const observer = useRef(
        new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setCurrentPage((p) => p + 1);
            }
        })
    );

    const addQueryToPath = (query = {}) => {
        router.query = {
            page: "1",
            pageSize: "10",
            ...query,
        };
        Object.entries(router.query).forEach(([k, v]) => {
            if (Array.isArray(v)) {
                if (v.length === 0) delete router.query[k];
                else router.query[k] = JSON.stringify(v);
            }
        });
        router.replace(router, undefined, { shallow: true, scroll: false });
    };

    const getProperty = async () => {
        setIsLoading(true);
        const response = await getPropertyHelper();

        const pageSize = +(router.query.pageSize || 10);
        const totalPagesCalculated = Math.ceil(response.totalDocs / pageSize);

        setTotalPages(totalPagesCalculated);
        if ((response as GetShowedPropertyResponse).docs[0]?.propertyData)
            setPropertiesData((p) => [
                ...p,
                ...(response as GetShowedPropertyResponse).docs.map(
                    (e) => e.propertyData
                ),
            ]);
        else
            setPropertiesData((p) => [
                ...p,
                ...(response as GetPropertyResponseType).docs,
            ]);

        setTotalDocs(response.totalDocs);
        setIsLoading(false);
    };

    const sendViewNumberEvent = (id: string) => {
        clientApi.post({
            url: POST_EVENTS,
            body: {
                eventType: EventType.VIEW_NUMBER,
                metadata: {
                    propertyId: id,
                },
            },
        });

        clientApi.post({
            url: POST_EVENTS,
            body: {
                eventType: EventType.PROPERTY_VIEWED,
                metadata: {
                    propertyId: id,
                },
            },
        });

        const newData = [...propertiesData].map((e) => {
            if (e[PropertiesCardDataKeys._ID] === id) {
                e[PropertiesCardDataKeys.VIEWS] = `${
                    (+e[PropertiesCardDataKeys.VIEWS] || 0) + 1
                }`;
            }
            return e;
        });

        setPropertiesData(newData);
    };

    const updateViewNumberModal = (propertyData: PropertyDataType) => {
        setViewNumberModalData(propertyData);
        sendViewNumberEvent(propertyData._id as string);
    };

    useEffect(() => {
        getProperty();
    }, [router]);

    useEffect(() => {
        if (+(router.query.page || 0) !== currentPage) {
            addQueryToPath({
                ...router.query,
                page: currentPage,
            });
        }
    }, [currentPage]);

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    return (
        <Layout>
            <div className="flex flex-col pb-[36px]">
                <div>
                    <div
                        className={cx(
                            "flex justify-between w-full",
                            styles.heading_frame
                        )}
                    >
                        <div className={cx("flex", styles.heading_wrapper)}>
                            <BackIcon
                                className={styles.image_icon}
                                onClick={() => router.back()}
                            />

                            <Text
                                className="ml-8"
                                weight={500}
                                font={FontType.HEADING_M}
                            >
                                {heading} ({totalDocs})
                            </Text>
                        </div>

                        <div className={cx("my-auto", styles.sort_by_wrapper)}>
                            {handleFilterChange && (
                                <SortBy onChange={handleFilterChange} />
                            )}
                        </div>
                    </div>
                </div>

                <div
                    className={cx(
                        styles.main_frame,
                        "flex flex-col gap-[16px] items-center"
                    )}
                >
                    {propertiesData.map((e, idx) => (
                        <PropertiesCard
                            key={e.id as string}
                            data={e}
                            onClickShownToLead={
                                onClickShownToLead
                                    ? async (propertyId) => {
                                          const response =
                                              await onClickShownToLead?.(
                                                  propertyId,
                                                  e.shownToLeadId as string
                                              );

                                          const { leadId } = router.query;
                                          e.shownToLeadId =
                                              leadId?.toString() || "";

                                          if (response) {
                                              const newData: PropertyDataType[] =
                                                  [...propertiesData];

                                              newData[idx].shownToLeadId =
                                                  e.shownToLeadId
                                                      ? response._id
                                                      : null;
                                              setPropertiesData(newData);
                                          }
                                      }
                                    : undefined
                            }
                            showLeadTime={showLeadTime}
                            viewNumberModalHandler={updateViewNumberModal}
                        />
                    ))}
                    {currentPage < totalPages && totalPages !== 0 && (
                        <div ref={setLastElement as any} />
                    )}
                </div>
            </div>

            <NumberModal
                onClose={() => setViewNumberModalData(undefined)}
                data={viewNumberModalData}
                isOpen={viewNumberModalData !== undefined}
            />
        </Layout>
    );
};

export default MatchingShowed;
