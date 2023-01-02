import React, { useMemo } from "react";
import cx from "classnames";

import { Dropdown } from "semantic-ui-react";

import { DropdownLabel } from "../dropdown";
import { Button } from "../button";

import SearchIcon from "../../assets/icon/search.svg";
import CompassIcon from "../../assets/icon/compass.svg";
import styles from "./search.module.scss";
import { convertConfigDataToSemanticLanguage } from "../../utils/helpers";
import { SearchConfigType } from "../../utils/types";

type SearchBarProps = {
    name?: string;
    className?: string;
    isLoading?: boolean;
    isRounded?: boolean;
    searchQueryResults?: SearchConfigType[];
    searchHandler?: (e: any, data: any) => void;
    onItemSelect?: (e: any, data: any) => void;
    onSubmit: (e: any) => void;
    values?: string[] | number[];
    onClickOfbar?: () => void;
};

export const SearchBar: React.FC<SearchBarProps> = ({
    className,
    name,
    searchQueryResults = [],
    searchHandler,
    onSubmit,
    onItemSelect,
    values = [],
    isLoading = false,
    isRounded = false,
    onClickOfbar,
}) => {
    const normalizedOptions = useMemo(
        () => convertConfigDataToSemanticLanguage(searchQueryResults || []),
        [searchQueryResults]
    );

    const searchComponent = (
        <Dropdown
            name={name}
            onClick={onClickOfbar}
            className={cx(className, styles.search__input)}
            onSearchChange={searchHandler}
            onChange={onItemSelect}
            placeholder="Enter locality, project, landmark"
            options={normalizedOptions}
            renderLabel={(label) => DropdownLabel(label)}
            value={values}
            // eslint-disable-next-line react/no-children-prop
            children={<div />}
            multiple
            selection
            // search
            icon={
                <>
                    <Button
                        onClick={onSubmit}
                        as="div"
                        type="button"
                        loading={isLoading}
                        className={styles.search__input__icon__wrapper_right}
                    >
                        <SearchIcon />
                    </Button>
                    <div className={styles.search__input__icon__wrapper_left}>
                        <CompassIcon width="14" height="14" />
                    </div>
                </>
            }
        />
    );

    if (isRounded)
        return (
            <div className={cx(styles.rounded_wrapper)}>{searchComponent}</div>
        );

    return (
        <div className={cx(styles.non_rounded_wrapper, "flex-1")}>
            {searchComponent}
        </div>
    );
};
