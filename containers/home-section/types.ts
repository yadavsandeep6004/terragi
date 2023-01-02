import { DropdownProps } from "semantic-ui-react";

import { PropertyDataType } from "../../components/properties-card";
import {
    FilterFormKeys,
    FilterFormSearchResultsType,
} from "./search-modal/types";

export type PropertiesBaseResponse<T> = {
    docs: T;
    totalDocs: number;
};

export type GetPropertyResponseType = PropertiesBaseResponse<
    PropertyDataType[]
>;

export type HomeSectionsBasePropType = {
    searchQueryResults: FilterFormSearchResultsType;
    searchHandler: (e: any, data: any) => void;
    onLocationSelect: (e: any, data: DropdownProps) => void;
    searchProperty: (e: any) => void;
    openFilterModalHandler: () => void;
    filteredValues: { [key in FilterFormKeys]: string[] | number[] };
    headingSortByContainer: any;
};
