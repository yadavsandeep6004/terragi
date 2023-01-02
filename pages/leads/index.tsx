import React from "react";
import { NextPage } from "next";

import { Layout } from "../../components/layout";
import { ProtectedPage } from "../../components/protected-page";
import { withAuth } from "../../hoc/withAuth";
import { Leads as LeadsComponent } from "../../containers/leads";
import { BrokerPage } from "../../hoc/BrokerPage";

const Leads: NextPage = () => (
    <Layout>
        <LeadsComponent />
    </Layout>
);

export default withAuth(ProtectedPage(BrokerPage(Leads)));
