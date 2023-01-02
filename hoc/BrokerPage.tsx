import { NextPage } from "next";
import Router from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { Loader } from "semantic-ui-react";

import { getUserDetails } from "../store/user";
import { USER_TYPE } from "../utils/constants";
import { ROUTES } from "../utils/routes";

// eslint-disable-next-line react/display-name
export const BrokerPage = (WrapperComponent: NextPage) => () => {
    const user = useSelector(getUserDetails);

    if (!user) return <Loader />;

    if (user?.userType === USER_TYPE.BROKER) return <WrapperComponent />;

    Router.push(ROUTES.general.builder_home);

    return <></>;
};
