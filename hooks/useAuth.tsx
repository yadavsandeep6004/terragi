/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useRouter } from "next/router";

import {
    getLoggedInStatus,
    getUserDetails,
    loginSuccess,
    logoutSuccess,
    setUserDetails,
} from "../store/user";
import { getPath } from "../utils/helpers";
import { getUser } from "../api/helpers";
import {
    isConfigsFetched,
    setFilterConfigs,
    setSocietiesConfig,
} from "../store/properties";
import { useApi } from "./useApi";
import { GET_CONFIGS, GET_SOCIETIES } from "../api/url";
import { ConfigKeys, SearchConfigType } from "../utils/types";

const activeLocalities = new Set([
    "DLF Phase 3",
    "DLF Phase 4",
    "DLF Phase 1",
    "DLF Phase 2",
    "DLF Phase 5",
    "Nirvana Country",
    "Palam Vihar",
    "Sector 22",
    "Sector 23",
    "Sector 23A",
    "Sector 27",
    "Sector 28",
    "Sector 31",
    "Sector 38",
    "Sector 39",
    "Sector 40",
    "Sector 41",
    "Sector 42",
    "Sector 43",
    "Sector 44",
    "Sector 45",
    "Sector 46",
    "Sector 47",
    "Sector 48",
    "Sector 49",
    "Sector 51",
    "Sector 53",
    "Sector 50",
    "Sector 52",
    "Sector 54",
    "Sector 55",
    "Sector 56",
    "Sector 57",
    "Sector 58",
    "Sushant Lok I",
    "Sushant Lok II",
    "Sushant Lok IV",
    "Sushant Lok III",
    "Ardee City",
    "South City II",
    "South City I",
    "Sun City",
    "Greenwood City",
    "Malibu Town",
    "Mayfield",
    "Rosewood City",
    "Uppal Southend",
    "Vipul World",
]);

export const useAuth = () => {
    const [isLoading, setLoading] = useState(true);

    const isLoggedIn = useSelector(getLoggedInStatus);
    const userDetails = useSelector(getUserDetails);
    const isConfigsFetch = useSelector(isConfigsFetched);
    const dispatch = useDispatch();
    const router = useRouter();
    const clientApi = useApi();

    const userDetailsHandler = async () => {
        const res = await getUser();
        dispatch(setUserDetails(res.data));
        return res;
    };

    const getConfigs = () => {
        let filterConfigs = {};

        (async () => {
            if (isConfigsFetch) return;

            const response = await clientApi.get({
                url: GET_CONFIGS,
                query: {
                    include: JSON.stringify(["localities"]),
                },
            });

            if (response.isSuccessful) {
                response.data[ConfigKeys.LOCALITY] = response.data[
                    ConfigKeys.LOCALITY
                ]
                    .filter((e: SearchConfigType) =>
                        activeLocalities.has(e.label)
                    )
                    .map((e: SearchConfigType) => ({
                        ...e,
                        label: `${e.label}, Gurgaon`,
                    }));

                response.data[ConfigKeys.LOCALITY].sort(
                    ({ label: a }: any, { label: b }: any) => {
                        if (a > b) return 1;
                        if (a < b) return -1;
                        return 0;
                    }
                );
                dispatch(setFilterConfigs(response.data));
            } else console.log("error");
        })();

        (async () => {
            const response = await clientApi.get({
                url: GET_SOCIETIES,
            });

            if (response.isSuccessful) {
                filterConfigs = {
                    ...filterConfigs,
                    societyName: response.data,
                };

                dispatch(setSocietiesConfig(response.data));
            } else console.log("error");
        })();
    };

    const initialProcedure = async () => {
        if (isLoggedIn) {
            if (!userDetails) await userDetailsHandler();
            if (!isConfigsFetch) getConfigs();

            setLoading(false);
            return;
        }

        const token = localStorage.getItem("token");
        const path = getPath().split("/")[1];

        if (!token) {
            if (path !== "") router.replace("/");
            setLoading(false);
            return;
        }

        (async () => {
            const res = await userDetailsHandler();
            if (res.isSuccessful) {
                dispatch(setUserDetails(res.data));
                dispatch(loginSuccess(token));
                if (path === "") {
                    await router.replace("/home");
                }
            } else if (path !== "") {
                await router.replace("/");
                dispatch(logoutSuccess());
            }
            setLoading(false);
        })();

        getConfigs();
    };

    useEffect(() => {
        initialProcedure();
    }, []);

    return { isLoggedIn, isLoading };
};
