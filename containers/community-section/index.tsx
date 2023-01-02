/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import cx from "classnames";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import { Button } from "../../components/button";
import {
    CommunityCard,
    PostResponseType,
} from "../../components/community-card";
import { Layout } from "../../components/layout";
import { NumberModal } from "../../components/number-modal";
import { ColorType, FontType, Text } from "../../components/text";
import { CreatePostModal } from "./CreatePostModal";
import styles from "./communitySection.module.scss";
import { useApi } from "../../hooks/useApi";
import { GET_COMMUNITY_POSTS } from "../../api/url";
import { CommunitySearchModal } from "./community-search";
import { CommunityPostFormKeys } from "./CreatePostModal/types";
import { SearchBar } from "../../components/search-bar";
import { ConfigKeys } from "../../utils/types";
import { bhkTypeOptions } from "./constants";
import { getFilterConfigs, isConfigsFetched } from "../../store/properties";
import { EmptyResults } from "../../components/empty-results";
import { Loader } from "../../components/loader";

const initialValues = {
    [CommunityPostFormKeys.PROPERTY_SEGMENT]: ["Residential"],
    [CommunityPostFormKeys.PROPERTY_FOR]: ["Sell"],
    [CommunityPostFormKeys.PROPERTY_TYPE]: [],
    [CommunityPostFormKeys.BHK]: [],
    [CommunityPostFormKeys.FURNISHING]: [],
    [CommunityPostFormKeys.TENANT_PREFERRED]: [],
    [CommunityPostFormKeys.FLOORS]: [],
    [CommunityPostFormKeys.SOCIETY_NAME]: [],
    [CommunityPostFormKeys.LOCATION]: [],
    [CommunityPostFormKeys.EXPECTED_RENT]: [],
    [CommunityPostFormKeys.SUPER_AREA]: [],
};

export const CommunitySection = () => {
    const [formValues, setFormValues] = useState<any>(initialValues);
    const [totalDocs, setTotalDocs] = useState<number>(0);
    const [searchModalOpen, setSearchModalOpen] = useState(false);
    const [propertiesData, setPropertiesData] = useState<PostResponseType[]>();
    const [totalPages, setTotalPages] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [newPostModalState, setNewPostModalState] = useState(false);
    const [numberModalData, setNumberModalData] = useState<any | undefined>();
    const [searchResults, setSearchResults] = useState<any>({
        [CommunityPostFormKeys.PROPERTY_SEGMENT]: [],
        [CommunityPostFormKeys.PROPERTY_FOR]: [],
        [CommunityPostFormKeys.PROPERTY_TYPE]: [],
        [CommunityPostFormKeys.BHK]: [],
        [CommunityPostFormKeys.FURNISHING]: [],
        [CommunityPostFormKeys.TENANT_PREFERRED]: [],
        [CommunityPostFormKeys.FLOORS]: [],
        [CommunityPostFormKeys.SOCIETY_NAME]: [],
        [CommunityPostFormKeys.LOCATION]: [],
        [CommunityPostFormKeys.SUPER_AREA]: [],
        [CommunityPostFormKeys.EXPECTED_RENT]: [22000, 250000000],
    });
    const [lastElement, setLastElement] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const clientApi = useApi();
    const router = useRouter();
    const configs = useSelector(getFilterConfigs);
    const isConfigsFetch = useSelector(isConfigsFetched);

    const showNumberModal = (data: any) => {
        setNumberModalData(data);
    };

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

        router.push(router, undefined, { shallow: true, scroll: false });
    };

    const getProperty = async () => {
        setIsLoading(true);
        const body: any = {};
        Object.entries(router.query).forEach(([k, v]) => {
            if (k !== "page" && k !== "pageSize" && v) {
                v = JSON.parse(v as string);
                if (Array.isArray(v)) body[k] = v;
                else if (!Number.isNaN(v)) body[k] = +(v as string);
            }
        });

        if (body[CommunityPostFormKeys.FLOORS])
            body[CommunityPostFormKeys.FLOORS] = body[
                CommunityPostFormKeys.FLOORS
            ].map((e: string) => +e);

        const response = await clientApi.post({
            url: GET_COMMUNITY_POSTS,
            query: {
                page: router.query.page || 1,
                pageSize: router.query.pageSize || 10,
            },
            body: {
                filters: Object.keys(body).length === 0 ? null : body,
            },
        });

        const pageSize = +(router.query.pageSize || 10);
        const totalPagesCalculated = Math.ceil(
            response.data.totalDocs / pageSize
        );
        const activePage = +(router.query.page || "1");

        setTotalDocs(response.data.totalDocs || 0);
        setTotalPages(totalPagesCalculated);
        setPropertiesData((p) => [
            ...((activePage === 1 ? [] : p || []) as any),
            ...(response.data.docs || []),
        ]);
        setIsLoading(false);
    };

    const applyFilters = (filters: any) => {
        const { price, superArea, ...modifiedValues }: any = filters;

        router.query = {
            page: "1",
            pageSize: "10",
        };

        if (
            (modifiedValues[CommunityPostFormKeys.LOCATION] || []).length === 0
        ) {
            router.push(router, undefined, { shallow: true, scroll: true });
        } else {
            const budget = price;
            if (budget) {
                modifiedValues.maxPrice = +budget[1];
                modifiedValues.minPrice = +budget[0];
            }

            const area = superArea;
            if (area.length) {
                modifiedValues.maxSuperArea = +area[1];
                modifiedValues.minSuperArea = +area[0];
            }

            addQueryToPath(modifiedValues);
        }

        setSearchModalOpen(false);
    };

    const getSocietyDataInSemanticLanguage = (societiesAndLocations: any) => {
        const societyNames: any = [];
        const societyNamesId: any = {};

        societiesAndLocations.forEach((e: any) => {
            societyNames.push({
                _id: `${e.localityId}-${Math.random()}`,
                value: e.name,
                label: e.name,
            });

            societyNamesId[e.name] = e.localityId;
        });

        return { societyNames };
    };

    useEffect(() => {
        if (!isConfigsFetch) return;
        if (configs.societyName) {
            const names = getSocietyDataInSemanticLanguage(configs.societyName);
            setSearchResults((p: any) => ({
                ...p,
                [CommunityPostFormKeys.PROPERTY_FOR]:
                    configs[ConfigKeys.PROPERTY_FOR],
                [CommunityPostFormKeys.TENANT_PREFERRED]:
                    configs[ConfigKeys.TENANT_PREFERRED],
                [CommunityPostFormKeys.FLOORS]: configs[ConfigKeys.FLOORS],
                [CommunityPostFormKeys.LOCATION]: configs[ConfigKeys.LOCALITY],
                [CommunityPostFormKeys.FURNISHING]:
                    configs[ConfigKeys.FURNISHING],
                [CommunityPostFormKeys.PROPERTY_SEGMENT]:
                    configs[ConfigKeys.PROPERTY_SEGMENT],
                [CommunityPostFormKeys.PROPERTY_TYPE]:
                    configs[ConfigKeys.PROPERTY_TYPE] || [],
                [CommunityPostFormKeys.BHK]: bhkTypeOptions,
                [CommunityPostFormKeys.SOCIETY_NAME]: names.societyNames || [],
            }));
        }
    }, [configs]);

    useEffect(() => {
        getProperty();
    }, [router.query]);

    useEffect(() => {
        const currentElement = lastElement;

        const currentObserver = new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setPageNumber((p: any) => p + 1);
            }
        });

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    useEffect(() => {
        if (+(router.query.page || 0) !== pageNumber) {
            router.query.page = `${pageNumber}`;
            router.query.pageSize = "10";
            router.push(router, undefined, { shallow: true, scroll: false });
        }
    }, [pageNumber]);

    const localityValues = formValues[CommunityPostFormKeys.LOCATION];
    const currentPage = router.query.page || 1;

    return (
        <Layout>
            <div className="relative h-full ">
                <div
                    className={cx(
                        styles.header,
                        "flex sticky  items-center gap-8 "
                    )}
                >
                    <Text
                        font={FontType.HEADING_M}
                        color={ColorType.COOL_BLACK}
                        weight={500}
                    >
                        Prop Tally
                    </Text>

                    <SearchBar
                        className={styles.search_bar}
                        searchQueryResults={
                            searchResults[CommunityPostFormKeys.LOCATION]
                        }
                        searchHandler={() => {}}
                        onItemSelect={(e, data) => {
                            if (data.value.length === 0)
                                addQueryToPath({ page: "1", pageSize: "10" });
                            else {
                                router.query[CommunityPostFormKeys.LOCATION] =
                                    JSON.stringify(data.value);

                                router.push(router, undefined, {
                                    shallow: true,
                                    scroll: true,
                                });

                                setFormValues((p: any) => ({
                                    ...p,
                                    [CommunityPostFormKeys.LOCATION]:
                                        data.value,
                                }));
                            }
                        }}
                        onSubmit={applyFilters}
                        name={CommunityPostFormKeys.LOCATION}
                        values={localityValues}
                        isLoading={false}
                        isRounded={false}
                        onClickOfbar={() => setSearchModalOpen(true)}
                    />

                    <div className={cx(styles.create_post_button)}>
                        <Button
                            className={styles.button}
                            type="button"
                            onClick={() => {
                                setFormValues(initialValues);
                                router.query = { page: "1", pageSize: "10" };
                                router.push(router, undefined, {
                                    shallow: true,
                                });
                            }}
                        >
                            - Clear Filter
                        </Button>
                    </div>

                    <div className={cx(styles.create_post_button)}>
                        <Button
                            className={styles.button}
                            type="button"
                            onClick={() => setNewPostModalState(true)}
                        >
                            + Create Post
                        </Button>
                    </div>
                </div>

                {!isLoading ? (
                    <div className="pb-[36px]">
                        <Text
                            font={FontType.HEADING_S}
                            weight={500}
                            className="pl-16 mb-4"
                        >
                            Choose from {totalDocs} properties from prop tally
                        </Text>

                        {(propertiesData || [])?.length > 0 ? (
                            <>
                                {propertiesData?.map((e) => (
                                    <div
                                        key={e._id}
                                        ref={setLastElement as any}
                                        className="flex flex-col gap-[16px] items-center"
                                    >
                                        <CommunityCard
                                            key={e._id}
                                            showModal={showNumberModal}
                                            {...e}
                                        />
                                    </div>
                                ))}
                                {currentPage < totalPages &&
                                    totalPages !== 0 && (
                                        <div ref={setLastElement as any} />
                                    )}
                            </>
                        ) : (
                            <EmptyResults />
                        )}
                    </div>
                ) : (
                    <Loader />
                )}

                {newPostModalState && (
                    <CreatePostModal
                        isOpen={newPostModalState}
                        onClose={(isOpen: boolean) =>
                            setNewPostModalState(isOpen)
                        }
                        refreshData={() => {
                            router.query = { page: "1", pageSize: "10" };
                            router.push(router, undefined, { shallow: true });
                        }}
                    />
                )}

                <CommunitySearchModal
                    isOpen={searchModalOpen}
                    onClose={() => setSearchModalOpen(false)}
                    applyFilters={applyFilters}
                    searchResults={searchResults}
                    formValues={formValues}
                    setFormValues={setFormValues}
                />

                <NumberModal
                    isOpen={numberModalData !== undefined}
                    onClose={() => setNumberModalData(undefined)}
                    data={
                        numberModalData
                            ? ({
                                  builderName: numberModalData.fullName,
                                  builderPhone: numberModalData.mobileNumber,
                                  builderEmail: numberModalData.email,
                                  alternateBuilderPhone:
                                      numberModalData.alternateNumber,
                              } as any)
                            : undefined
                    }
                />
            </div>
        </Layout>
    );
};
