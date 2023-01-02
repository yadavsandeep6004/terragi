import { ConfigKeysType } from "../../../utils/types";

export enum FilterFormKeys {
    BHK_TYPE = "bhk",
    PLOT_SIZE = "plotSize",
    BUDGET = "budget",
    FLOORS = "floors",
    FACING = "facing",
    BUILDER_NAME = "builderName",
    LOCALITY = "localities",
    CONSTRUCTION_STATUS = "constructionStatus",
}

export type FilterFormSearchResultsType = ConfigKeysType;

export type FilterFormKeysType = `${FilterFormKeys}`;

export type FilterFormValuesType = {
    [key in FilterFormKeysType]: string[] | number[];
};

export type FilterModalPropsType = {
    onClose: () => void;
    applyFilters: () => void;
    onSearchingQuery: (e: any, data: any) => void;
    onSelectingItem: (e: any, data: any) => void;
    searchResults: FilterFormSearchResultsType;
    defaultValues: FilterFormValuesType;
    isOpen: boolean;
};
