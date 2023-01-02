/* eslint-disable import/no-cycle */
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";

import user from "./user";
import leads from "./leads";
import properties from "./properties";

const reducer = combineReducers({
    user,
    properties,
    leads,
});

const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
