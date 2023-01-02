/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from "react";

import {
    PropertyDataType,
    PropertiesCard,
    PropertiesCardDataKeys,
} from "../../../components/properties-card";
import { PropertiesListType } from "./types";

import { NumberModal } from "../../../components/number-modal";
import { useApi } from "../../../hooks/useApi";
import { POST_BOOKMARKS, POST_EVENTS, REMOVE_BOOKMARK } from "../../../api/url";
import { EventType } from "../../../utils/types";
import { EmptyResults } from "../../../components/empty-results";
import { Loader } from "../../../components/loader";

const PropertiesListNonMemo: React.FC<PropertiesListType> = ({
    data,
    currentPage,
    setCurrentPage,
    totalPages,
    setData,
    isLoading,
}) => {
    const [viewNumberModalData, setViewNumberModalData] = useState<
        undefined | PropertyDataType
    >(undefined);
    const [lastElement, setLastElement] = useState(null);

    const clientApi = useApi();

    useEffect(() => {
        const currentElement = lastElement;

        const observer = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setCurrentPage((p: any) => p + 1);
            }
        });

        const currentObserver = observer;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

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

        setData((p: PropertyDataType[]) => {
            const newData = [...p].map((e) => {
                if (e[PropertiesCardDataKeys._ID] === id)
                    e[PropertiesCardDataKeys.VIEWS] = `${
                        (+e[PropertiesCardDataKeys.VIEWS] || 0) + 1
                    }`;

                return e;
            });

            return newData;
        });
    };

    const updateViewNumberModal = (propertyData: PropertyDataType) => {
        setViewNumberModalData(propertyData);
        sendViewNumberEvent(propertyData._id as string);
    };

    const bookmarkProperty = async (propertyId: string, bookmarkId: string) => {
        if (!bookmarkId) {
            const response = await clientApi.post<
                { propertyId: string },
                { _id: string }
            >({
                url: POST_BOOKMARKS,
                body: {
                    propertyId,
                },
            });

            if (response.isSuccessful)
                setData((p: PropertyDataType[]) => {
                    const newData = [...p].map((e) => {
                        if (e[PropertiesCardDataKeys._ID] === propertyId)
                            e[PropertiesCardDataKeys.IS_BOOKMARKED] =
                                response.data._id || "";

                        return e;
                    });

                    return newData;
                });
        } else {
            const response = await clientApi.delete<{}>({
                url: `${REMOVE_BOOKMARK}/${bookmarkId}`,
            });

            if (response.isSuccessful)
                setData((p: PropertyDataType[]) => {
                    const newData = [...p].map((e) => {
                        if (e[PropertiesCardDataKeys._ID] === propertyId)
                            e[PropertiesCardDataKeys.IS_BOOKMARKED] = "";

                        return e;
                    });

                    return newData;
                });
        }
    };

    return (
        <>
            <div
                className={`flex flex-col gap-[16px] items-center ${
                    !isLoading && (data || []).length === 0 ? "h-full" : ""
                }`}
            >
                {(data || []).length > 0 ? (
                    <>
                        {data?.map((e) => (
                            <PropertiesCard
                                key={e.id as string}
                                data={e}
                                viewNumberModalHandler={updateViewNumberModal}
                                bookmarkProperty={bookmarkProperty}
                                isBookmarkEnabled
                            />
                        ))}
                        {currentPage < totalPages && totalPages !== 0 && (
                            <div ref={setLastElement as any} />
                        )}
                    </>
                ) : isLoading ? (
                    <Loader />
                ) : (
                    <EmptyResults />
                )}
            </div>

            <NumberModal
                onClose={() => setViewNumberModalData(undefined)}
                data={viewNumberModalData}
                isOpen={viewNumberModalData !== undefined}
            />
        </>
    );
};

export const PropertiesList = React.memo(PropertiesListNonMemo);
