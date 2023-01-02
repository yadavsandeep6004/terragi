import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { GET_SAVED_PROPERTIES } from "../api/url";

import { Layout } from "../components/layout";
import {
    PropertyDataType,
    PropertiesCardDataKeys,
} from "../components/properties-card";
import { ProtectedPage } from "../components/protected-page";
import { ColorType, FontType, Text } from "../components/text";
import { PropertiesList } from "../containers/home-section/propoties-list";
import { BrokerPage } from "../hoc/BrokerPage";
import { withAuth } from "../hoc/withAuth";
import { useApi } from "../hooks/useApi";

const Bookmark: NextPage = () => {
    const [cards, setCards] = useState<PropertyDataType[] | undefined>();
    const [pageNumber, setPageNumber] = useState(1);
    const [totalDocs, setTotalDocs] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const api = useApi();
    const router = useRouter();

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            const { page } = router.query;
            const response = await api.get<any>({
                url: GET_SAVED_PROPERTIES,
                query: {
                    page: page || 1,
                    pageSize: 10,
                },
            });

            setCards((p) => [
                ...(p || []),
                ...response.data.docs.map((e: any) => ({
                    ...e.propertyData,
                    [PropertiesCardDataKeys.IS_BOOKMARKED]: e._id,
                })),
            ]);
            setTotalDocs(response.data.totalDocs);
            setIsLoading(false);
        })();
    }, [router.query]);

    useEffect(() => {
        if (+(router.query.page || 1) !== pageNumber) {
            router.query.page = `${pageNumber}`;
            router.query.pageSize = "10";
            router.push(router, undefined, { shallow: true, scroll: false });
        }
    }, [pageNumber]);

    const setCurrentPage = () => {
        setPageNumber((p) => p + 1);
    };

    const currentPage = router.query.page || 1;

    return (
        <Layout>
            <div className="md:px-[40px] px-[16px] pb-[36px] h-full">
                <div className="pb-[16px] md:pb-[16px] pt-[20px] md:pt-[40px]">
                    <Text
                        weight={500}
                        font={FontType.HEADING_M}
                        color={ColorType.COOL_BLACK}
                    >
                        Bookmarks
                    </Text>
                </div>

                <PropertiesList
                    data={cards as any}
                    currentPage={+currentPage}
                    isInSearchMode
                    setData={setCards}
                    setCurrentPage={setCurrentPage}
                    totalPages={Math.floor(totalDocs / 10)}
                    isLoading={isLoading}
                />
            </div>
        </Layout>
    );
};

export default withAuth(ProtectedPage(BrokerPage(Bookmark)));
