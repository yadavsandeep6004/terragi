import React from "react";
import { useSelector } from "react-redux";
import { Loader } from "semantic-ui-react";

import { Layout } from "../components/layout";

import { HomeSection } from "../containers/home-section";
import { Payments } from "../containers/payment";
import { BrokerPage } from "../hoc/BrokerPage";
import { withAuth } from "../hoc/withAuth";
import { getUserDetails } from "../store/user";
import { PLAN_TYPE } from "../utils/constants";

const Home = () => {
    const user = useSelector(getUserDetails);

    if (user?.planId === undefined) return <Loader />;

    if (user?.planId !== PLAN_TYPE.PRO)
        return (
            <Layout>
                <Payments />
            </Layout>
        );
    return (
        <Layout>
            <HomeSection />
        </Layout>
    );
};

export default withAuth(BrokerPage(Home));
