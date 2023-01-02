import React from "react";
import cx from "classnames";

import { StaticImageData } from "next/image";

import { QuickSearchCard } from "../../../components/quick-search-card";
import { ColorType, FontType, Text } from "../../../components/text";

import styles from "./quick-search.module.scss";

type QuickSearchType = {
    listingDetails: ListingDetailsType[];
    filterHandler: Function;
};

export type ListingDetailsType = {
    title: string;
    value: string | number | string[];
    type: string;
    label: string;
    picTitle: StaticImageData;
};

const QuickSearchNonMemo: React.FC<QuickSearchType> = ({
    listingDetails,
    filterHandler,
}) => (
    <div className={styles.wrapper}>
        <Text font={FontType.HEADING_S} color={ColorType.BLACK} weight={500}>
            Quick Search
        </Text>
        <div className={cx(styles.scroll_container, "flex  flex-wrap")}>
            {listingDetails.map((ld,idx) => (
                <QuickSearchCard
                    // key={Math.random()}
                    key={idx}
                    data={ld}
                    onClick={filterHandler}
                />
            ))}
        </div>
    </div>
);

export const QuickSearch = React.memo(QuickSearchNonMemo);
