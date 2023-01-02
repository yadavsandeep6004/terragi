import { NextPage } from "next";
import React from "react";
import { useSelector } from "react-redux";

import { getUserDetails } from "../../store/user";
import { PLAN_TYPE } from "../../utils/constants";

// eslint-disable-next-line react/display-name
export const ProtectedPage = (WrapperComponent: NextPage) => () => {
    const user = useSelector(getUserDetails);

    if (user?.planId === PLAN_TYPE.PRO) return <WrapperComponent />;
    return <></>;
};
