import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { DropdownProps } from "semantic-ui-react";
import { useSelector } from "react-redux";
import cx from "classnames";

import { PropertiesList } from "./propoties-list";
import { HomeSectionLanding } from "./home-section-landing";
import { SearchList } from "./search-list";
import { ListingDetails } from "../../components/quick-search-card/constants";
import { SearchModal } from "./search-modal";
import { PropertyDataType } from "../../components/properties-card";

import { getFilterConfigs, isConfigsFetched } from "../../store/properties";
import {
    ConfigKeys,
    ConfigKeysType,
    EventType,
    SearchConfigType,
} from "../../utils/types";
import { PropertiesBaseResponse, GetPropertyResponseType } from "./types";
import { useApi } from "../../hooks/useApi";
import { GET_BUILDERS, GET_PROPERTIES, POST_EVENTS } from "../../api/url";
import {
    FilterFormKeys,
    FilterFormKeysType,
    FilterFormSearchResultsType,
    FilterFormValuesType,
} from "./search-modal/types";
import { ColorType, FontType, Text } from "../../components/text";
import { SortBy } from "./sortby-container";
import propertyStyles from "./propoties-list/properties-list.module.scss";
import { sendTagEvent } from "../../utils/helpers";
import { ToastVariant, useToast } from "../../hooks/useToast";

const initialFilterFormValues = {
    [ConfigKeys.BUDGET]: [],
    [ConfigKeys.BHK_TYPE]: [],
    [ConfigKeys.BUILDER_NAME]: [],
    [ConfigKeys.CONSTRUCTION_STATUS]: [],
    [ConfigKeys.FACING]: [],
    [ConfigKeys.FLOORS]: [],
    [ConfigKeys.LOCALITY]: [],
    [ConfigKeys.PLOT_SIZE]: [],
};

export const HomeSection = () => {
    const filterConfigs = useSelector(getFilterConfigs);
    const isConfigsFetch = useSelector(isConfigsFetched);

    const [propertiesData, setpropertiesData] = useState<PropertyDataType[]>(
        []
    );
    const [totalPages, setTotalPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalDocs, setTotalDocs] = useState<string | number>("");
    const [filterModalOpen, setFilterModalOpen] = useState(false);
    const [searchQueryResults, setSearchQuery] =
        useState<FilterFormSearchResultsType>(filterConfigs);
    const [filterFormValues, setFilterFormValues] =
        useState<FilterFormValuesType>(initialFilterFormValues);
    const { toast, ToasterElement } = useToast();

    const pageSize = 10;

    const clientApi = useApi();
    const router = useRouter();

    const openFilterModal = () => setFilterModalOpen(true);

    const addQueryToPath = (query = {}) => {
        const newQuery: any = {
            page: "1",
            pageSize: "10",
            ...query,
        };

        Object.entries(newQuery).forEach(([k, v]) => {
            if (Array.isArray(v)) {
                if (v.length === 0) delete newQuery[k];
                else newQuery[k] = JSON.stringify(v);
            }
        });

        router.query = newQuery;
        router.push(router, undefined, { shallow: true, scroll: false });
    };

    const getProperty = async () => {
        setIsLoading(true);
        setTotalDocs("");
        const activePage = router.query.page || 1;
        const response = await clientApi.get<GetPropertyResponseType>({
            url: GET_PROPERTIES,
            query: {
                page: activePage,
                pageSize: "10",
                ...router.query,
                include: JSON.stringify(["totalDocs"]),
            },
        });

        if (response.isSuccessful) {
            const totalPagesCalculated = Math.ceil(
                response.data.totalDocs / pageSize
            );

            setTotalPages(totalPagesCalculated);
            const getAllPropertiesData = new Set([
                ...(+activePage === 1 ? [] : propertiesData),
                ...response.data.docs,
            ]);
            setpropertiesData([...getAllPropertiesData]);
            setTotalDocs(response.data.totalDocs);
        } else {
            setTotalDocs(0);
            setpropertiesData([]);
            toast({
                message: response.message,
                variant: ToastVariant.ERROR,
            });
        }
        setIsLoading(false);
    };

    const searchHandler = async (e: any, dropData: any) => {
        let response = null;
        const { name }: { name: FilterFormKeysType } = dropData;

        if (name === FilterFormKeys.BUILDER_NAME) {
            response = await clientApi.get<
                PropertiesBaseResponse<{ label: string; value: string }[]>
            >({
                url: GET_BUILDERS,
                query: {
                    q: e.target.value,
                },
            });
        } else {
            return;
        }

        if (!response.isSuccessful) {
            toast({
                message: response.message,
                variant: ToastVariant.ERROR,
            });
            setTotalDocs(0);
            setpropertiesData([]);
            setIsLoading(false);
            return;
        }

        const data = response.data.docs;
        if (data?.length > 0) {
            const searchQuery = data;
            const prevResults = new Set(
                searchQueryResults[name]?.map((el) => el.value)
            );

            const newResults = ([] as SearchConfigType[]).concat(
                searchQueryResults[name] || []
            );

            searchQuery.forEach((el) => {
                if (!prevResults.has(el.value)) {
                    if (name === FilterFormKeys.BUILDER_NAME) {
                        newResults.push({
                            _id: el.value as string,
                            label: el.label,
                            value: el.value,
                        });
                    } else {
                        newResults.push(el as SearchConfigType);
                    }
                }
            });

            setSearchQuery((p) => ({
                ...p,
                [name]: newResults,
            }));
        }
    };

    const getConfigs = async () => {
        const newConfig: ConfigKeysType = filterConfigs;
        setSearchQuery(newConfig as any);
        await searchHandler(
            { target: { value: "" } },
            { name: FilterFormKeys.BUILDER_NAME }
        );
    };

    const handleChangeFilterFormValues = useCallback(
        (_: any, data: DropdownProps) => {
            setFilterFormValues((p) => ({
                ...p,
                [data.name]: data.value,
            }));
        },
        []
    );

    const sendEvent = (filters: any) => {
        clientApi.post({
            url: POST_EVENTS,
            body: {
                eventType: EventType.PROPERTY_SEARCH,
                metadata: {
                    ...filters,
                },
            },
        });
    };

    const applyFilters = () => {
        const modifiedValues: any = { ...filterFormValues };
        const budget = modifiedValues[ConfigKeys.BUDGET];
        modifiedValues.maxPrice = +budget[1] || filterConfigs.budget.max;
        modifiedValues.minPrice = +budget[0] || filterConfigs.budget.min;

        modifiedValues.floors = Object.values(modifiedValues.floors).map(
            (e: any) => +e
        );

        modifiedValues.page = "1";
        addQueryToPath(modifiedValues);
        setFilterModalOpen(false);
        setPageNumber(1);

        sendEvent(modifiedValues);
        router.push(router, undefined, { shallow: true, scroll: true });

        sendTagEvent({
            action: "search",
            params: modifiedValues,
        });
    };

    const searchProperty = (e: any) => {
        e.preventDefault();
        applyFilters();
    };

    const handleSortByFilter = (order: string, type: string) => {
        addQueryToPath({
            ...router.query,
            sortBy: type,
            sortOrder: order,
        });
    };

    const miniFilterHandler = (data: any) => {
        const modifiedQuery: any = { ...router.query };
        if (data.name === ConfigKeys.BUDGET) {
            modifiedQuery.maxPrice = +data.value[1] || filterConfigs.budget.max;
            modifiedQuery.minPrice = +data.value[0] || filterConfigs.budget.min;
        }

        window.scrollTo({ top: 0 });

        modifiedQuery[data.name] = data.value;
        modifiedQuery.page = "1";
        handleChangeFilterFormValues(null, data);
        addQueryToPath(modifiedQuery);
        setPageNumber(1);
    };

    useEffect(() => {
        const newFilterObject: any = {};
        const queries = router.query;
        Object.entries(queries).forEach(([k, v]: [k: string, v: any]) => {
            if (
                k !== "page" &&
                k !== "pageSize" &&
                k !== "sortBy" &&
                k !== "sortOrder"
            )
                newFilterObject[k as `${FilterFormKeys}`] = JSON.parse(v);
        });

        setFilterFormValues((p) => ({ ...p, ...newFilterObject }));
    }, []);

    useEffect(() => {
        if (isConfigsFetch) getConfigs();
    }, [isConfigsFetch]);

    useEffect(() => {
        if (
            Object.keys(router.query).filter(
                (e) => e !== "page" && e !== "pageSize"
            ).length > 0
        ) {
            getProperty();
        } else {
            setFilterFormValues(initialFilterFormValues);
            getProperty();
        }
    }, [router]);

    useEffect(() => {
        if (+(router.query.page || 0) !== pageNumber) {
            addQueryToPath({
                ...router.query,
                page: pageNumber,
            });
        }
    }, [pageNumber]);

    const finalHeading = useMemo(() => {
        const localities = JSON.parse(
            (router.query[FilterFormKeys.LOCALITY] as string) || "[]"
        );

        let finaltext = "";
        if (localities.length > 0) {
            const length = Math.min(2, localities.length);
            finaltext = `${localities.slice(0, length).join(", ")}`;

            if (localities.length - length > 0)
                finaltext += ` and +${localities.length - length} more`;

            finaltext = `| Properties found in ${finaltext} for Sale`;
        }

        finaltext = `${totalDocs} result(s) ${finaltext}`;
        return finaltext;
    }, [router.query, totalDocs]);

    const clearFilters = () => {
        setFilterFormValues(initialFilterFormValues);
        router.query = {
            page: "1",
            pageSize: "10",
        };

        router.push(router, undefined, { shallow: true });
    };

    const currentPage = +(router?.query.page as string) || 1;

    const isInSearchMode = useMemo(
        () =>
            Object.keys(router.query).filter(
                (e) => e !== "page" && e !== "pageSize"
            ).length > 0,
        [router.query]
    );

    const headingSortByContainer = (
        <div className={cx(propertyStyles.heading_wrapper, "pt-8")}>
            <div className="flex w-full justify-between">
                <Text
                    className={propertyStyles.heading_text}
                    font={FontType.HEADING_S}
                    color={ColorType.COOL_BLACK}
                    weight={500}
                    type="p"
                >
                    {isInSearchMode ? finalHeading : "Properties Near You"}
                </Text>
                <SortBy onChange={handleSortByFilter} />
            </div>
        </div>
    );

    return (
        <>
            <div className="flex flex-col pb-[36px]">
                {isInSearchMode ? (
                    <SearchList
                        searchQueryResults={searchQueryResults}
                        onLocationSelect={handleChangeFilterFormValues}
                        searchHandler={searchHandler}
                        searchProperty={searchProperty}
                        openFilterModalHandler={openFilterModal}
                        filteredValues={filterFormValues}
                        applyFilters={miniFilterHandler}
                        headingSortByContainer={headingSortByContainer}
                        clearFilters={clearFilters}
                    />
                ) : (
                    <HomeSectionLanding
                        searchQueryResults={searchQueryResults}
                        onLocationSelect={handleChangeFilterFormValues}
                        searchHandler={searchHandler}
                        searchProperty={searchProperty}
                        openFilterModalHandler={openFilterModal}
                        localityValues={
                            filterFormValues[FilterFormKeys.LOCALITY]
                        }
                        listingDetails={ListingDetails}
                        filterFormHandler={handleChangeFilterFormValues}
                        headingSortByContainer={headingSortByContainer}
                    />
                )}

                <div className="relative h-full">
                    <div className={propertyStyles.wrapper}>
                        <PropertiesList
                            currentPage={currentPage}
                            data={propertiesData}
                            setData={setpropertiesData}
                            totalPages={totalPages}
                            setCurrentPage={setPageNumber}
                            isInSearchMode={isInSearchMode}
                            isLoading={isLoading}
                        />
                    </div>
                </div>
            </div>

            <SearchModal
                isOpen={filterModalOpen}
                onClose={() => setFilterModalOpen(false)}
                applyFilters={applyFilters}
                onSearchingQuery={searchHandler}
                onSelectingItem={handleChangeFilterFormValues}
                searchResults={searchQueryResults}
                defaultValues={filterFormValues}
            />
            <ToasterElement />
        </>
    );
};
