import React from "react";
import cx from "classnames";

import { DropdownProps } from "semantic-ui-react";

import { useRouter } from "next/router";

import { SearchBar } from "../../../components/search-bar";

import { ListingDetailsType, QuickSearch } from "../quick-search";
import {
    FilterFormKeys,
    FilterFormSearchResultsType,
} from "../search-modal/types";
import styles from "./landing.module.scss";
import HeaderPoster from "../../../components/header-poster";

type HomeSectionLandingType = {
    searchQueryResults: FilterFormSearchResultsType;
    searchHandler: (e: any, data: any) => void;
    onLocationSelect: (e: any, data: DropdownProps) => void;
    searchProperty: (e: any) => void;
    openFilterModalHandler: () => void;
    listingDetails: any[];
    headingSortByContainer: any;
    filterFormHandler: Function;
    localityValues: string[] | number[];
};

const HomeSectionLandingNonMemo: React.FC<HomeSectionLandingType> = ({
    searchQueryResults,
    searchHandler,
    onLocationSelect,
    searchProperty,
    listingDetails,
    localityValues,
    openFilterModalHandler,
    filterFormHandler,
    headingSortByContainer,
}) => {
    const router = useRouter();
    const filterHandler = (data: ListingDetailsType) => {
        filterFormHandler(null, { name: data.type, value: [data.value] });
        if (data.label === "DLF")
            router.query[data.type] = JSON.stringify(data.value);
        else if (data.title === "Pricing") {
            router.query[data.type] = JSON.stringify(data.value);
            router.query["sortBy"] = "price";
            router.query["sortOrder"] = "1";
        } else router.query[data.type] = JSON.stringify([data.value]);
        router.query.page = "1";
        router.push(router, undefined, { shallow: true });
    };

    const redirectToDlfBuilder = () => {
        router.query.builderName = JSON.stringify([
            "DLF EXCLUSIVE Floors Private Limited",
            "DLF Exclusive FLOORS Private Limited",
            "DLF Exclusive Floors Private Limited",
        ]);
        router.query.page = "1";
        router.query.pageSize = "10";
        console.log("ok");
        router.push(router, undefined, { shallow: true });
    };

    return (
        <>
            <div className={styles.heading__container}>
                <div
                    className={cx(
                        "flex justify-center relative",
                        styles.top_section
                    )}
                >
                    {/* <HeaderPoster onDlfPosterClick={redirectToDlfBuilder} /> */}
                    <HeaderPoster />

                    <div className={cx(styles.search_wrapper, "absolute b-0")}>
                        <SearchBar
                            searchQueryResults={
                                searchQueryResults[FilterFormKeys.LOCALITY]
                            }
                            searchHandler={searchHandler}
                            onItemSelect={onLocationSelect}
                            onSubmit={searchProperty}
                            name={FilterFormKeys.LOCALITY}
                            values={localityValues}
                            isLoading={false}
                            onClickOfbar={openFilterModalHandler}
                            isRounded
                        />
                    </div>
                </div>
                <div className={styles.quick_search_wrapper}>
                    <QuickSearch
                        listingDetails={listingDetails}
                        filterHandler={filterHandler}
                    />
                </div>
            </div>
            {headingSortByContainer}
        </>
    );
};

export const HomeSectionLanding = React.memo(HomeSectionLandingNonMemo);
