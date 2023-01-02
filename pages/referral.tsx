import React from "react";

import { Layout } from "../components/layout";
import { ProtectedPage } from "../components/protected-page";
import ReferralContainer from "../containers/referral";
import { BrokerPage } from "../hoc/BrokerPage";
import { withAuth } from "../hoc/withAuth";

const Referral = () => (
    <Layout>
        <ReferralContainer />
    </Layout>
);

export default withAuth(ProtectedPage(BrokerPage(Referral)));
