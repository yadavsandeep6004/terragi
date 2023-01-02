/* eslint-disable consistent-return */
/* eslint-disable react/display-name */
import React from "react";
import { Loader } from "semantic-ui-react";

import { useAuth } from "../hooks/useAuth";

export const withAuth = (WrapperComponent: React.FC) => (props: any) => {
    const { isLoading } = useAuth();

    if (isLoading) return <Loader active />;
    return <WrapperComponent {...props} />;
};
