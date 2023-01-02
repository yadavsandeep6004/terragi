import { createSlice } from "@reduxjs/toolkit";

import { RootState } from ".";
import { UserResponseType } from "../api/helpers";

export const user = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: "",
        isLoggedIn: false,
    },
    reducers: {
        setUserDetails: (state: any, action: any) => {
            const userDetails = action.payload;
            state.user = userDetails;
        },
        loginSuccess: (state: any, action: any) => {
            const token = action.payload;
            localStorage.setItem("token", token);
            state.token = token;
            state.isLoggedIn = true;
        },
        logoutSuccess: (state: any) => {
            state.user = null;
            state.isLoggedIn = false;
            state.token = "";
            localStorage.clear();
        },
    },
});


export const { loginSuccess, logoutSuccess, setUserDetails } = user.actions;

export const getUserDetails = (state: RootState): UserResponseType | null =>
    state.user.user;
export const getToken = (state: RootState) => state.user.token;
export const getLoggedInStatus = (state: RootState) => state.user.isLoggedIn;

export default user.reducer;
