import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import cx from "classnames";

import { LANDING } from "../../api/url";
import { PropertyDataType } from "../../components/properties-card";
import { ListingDetails } from "../../components/quick-search-card/constants";
import { ColorType, FontType, Text } from "../../components/text";
import { useApi } from "../../hooks/useApi";
import { ROUTES } from "../../utils/routes";
import { QuickSearch } from "../home-section/quick-search";
import { PropertyCard } from "./property-card";

import styles from "./homepage.module.scss";
import { SearchBar } from "../../components/search-bar";
import { Footer } from "../../components/footer";
import { Caraousel } from "../../components/caraousel";
import HeaderPoster from "../../components/header-poster";
import { DEFAULT_COORDINATES } from "../../utils/constants";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../store/user";

type LandingSectionDataType = {
    title: string;
    properties: PropertyDataType[];
};

export const Homepage = () => {
    const [sections, setSections] = useState<LandingSectionDataType[]>([]);

    const api = useApi();
    const router = useRouter();
    const dispatch = useDispatch();

    const getData = async (
        lat = DEFAULT_COORDINATES.LAT,
        lng = DEFAULT_COORDINATES.LNG
    ) => {
        dispatch(logoutSuccess());
        if (typeof window !== "undefined" && document) {
            window.localStorage.clear();
        }
        const response = await api.get<{
            sections: LandingSectionDataType[];
        }>({
            url: LANDING,
            query: {
                lat,
                lng,
            },
        });

        if (response.isSuccessful) {
            setSections(response.data.sections);
        }
    };

    const showPosition = (position: GeolocationPosition) => {
        getData(position.coords.latitude, position.coords.longitude);
    };

    useEffect(() => {
        getData();
        navigator.geolocation.getCurrentPosition(showPosition);
    }, []);

    const openLoginPage = () => {
        router.push(`/${ROUTES.auth.signin}`, undefined, {
            shallow: true,
            scroll: false,
        });
    };

    return (
        <div className={styles.wrapper}>
            <div
                className={cx(
                    "flex justify-center relative",
                    styles.top_section
                )}
            >
                <HeaderPoster />
                <div className={cx(styles.search_wrapper, "absolute b-0")}>
                    <SearchBar
                        searchQueryResults={[]}
                        searchHandler={() => {}}
                        onItemSelect={() => {}}
                        onSubmit={() => {}}
                        name="Search"
                        values={[]}
                        isLoading={false}
                        onClickOfbar={openLoginPage}
                        isRounded
                    />
                </div>
            </div>
            <div
                className={styles.quick_search_wrapper}
                onClick={openLoginPage}
            >
                <QuickSearch
                    listingDetails={ListingDetails}
                    filterHandler={openLoginPage}
                />
            </div>
            <div className="flex flex-col gap-[90px]">
                {sections.map((e) => (
                    <div key={e.title} className={styles.list_wrapper}>
                        <Text
                            className="mb-[16px]"
                            weight={600}
                            font={FontType.HEADING_S}
                            color={ColorType.COOL_BLACK}
                        >
                            {e.title}
                        </Text>
                        <div className="flex gap-[32px] relative">
                            <Caraousel
                                slides={e.properties.map((data) => (
                                    <div
                                        className="cursor-pointer"
                                        key={data._id as string}
                                        onClick={openLoginPage}
                                    >
                                        <PropertyCard data={data} />
                                    </div>
                                ))}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};
