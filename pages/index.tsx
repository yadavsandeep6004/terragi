import React from "react";
import Head from "next/head";
import type { NextPage } from "next";

import { withAuth } from "../hoc/withAuth";
import { Layout } from "../components/layout";
import { Homepage } from "../containers/homepage";

const Home: NextPage = () => (
    <Layout>
        <>
            <Head>
                <title>Terragi</title>
            </Head>
            <Homepage />
        </>
    </Layout>
);

export default withAuth(Home);
