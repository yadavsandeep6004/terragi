import React from "react";

import { Layout } from "../components/layout";
import { withAuth } from "../hoc/withAuth";
import ProfileContainer from "../containers/profile";

const Profile = () => (
    <Layout>
        <ProfileContainer />
    </Layout>
);

export default withAuth(Profile);
