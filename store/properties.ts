import { createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { CONFIGS_INITIAL_STATE } from "../utils/constants";
import { ConfigKeys, ConfigKeysType } from "../utils/types";

export const properties = createSlice({
    name: "properties",
    initialState: {
        configs: CONFIGS_INITIAL_STATE,
        configsFetched: false,
    },
    reducers: {
        setFilterConfigs: (state: any, action: any) => {
            const configs = action.payload;
            state.configs = configs;
            state.configsFetched = true;
        },
        setSocietiesConfig: (state: any, action: any) => {
            const configs = action.payload;
            state.configs[ConfigKeys.SOCIETY_NAME] = configs;
        },
    },
});

export const { setFilterConfigs, setSocietiesConfig } = properties.actions;

export const getFilterConfigs = (s: RootState) =>
    s.properties.configs as ConfigKeysType;

export const isConfigsFetched = (s: RootState) =>
    s.properties.configsFetched as boolean;

export default properties.reducer;
