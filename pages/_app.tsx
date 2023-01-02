import React, { useEffect } from "react";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import "../styles/_index.scss";

import store from "../store";
import { pageview } from "../utils/helpers";

function MyApp({ Component, pageProps }: AppProps) {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return (
        <Provider store={store}>
            <Head>
                <link rel="manifest" href="/manifest.json" />

                <link type="image/png" href="/images/icon_128.png" />

                <link
                    type="image/png"
                    rel="shortcut icon"
                    href="/images/favicon.ico"
                />

                <title>Terragi - B2B Inventory platform</title>
                <meta
                    name="description"
                    content="India's 1st B2B inventory platform, connects brokers directly with the builders, and broker community."
                />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
