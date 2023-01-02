import { PropertyDataType } from "../../../components/properties-card";

export type PropertiesListType = {
    data: PropertyDataType[];
    currentPage: string | number;
    totalPages: string | number;
    isInSearchMode: boolean;
    isLoading: boolean;
    setCurrentPage: Function;
    setData: Function;
};
