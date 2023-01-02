import React from "react";

import { Layout } from "../components/layout";
import Settings from "../containers/settings ";

import { withAuth } from "../hoc/withAuth";

const Setting = () => (
    <Layout>
        <Settings />
    </Layout>
);

export default withAuth(Setting);
