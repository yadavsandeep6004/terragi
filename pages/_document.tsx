/* eslint-disable @next/next/next-script-for-ga */
/* eslint-disable react/no-danger */
import Document, { Html, Head, Main, NextScript } from "next/document";

class WebDocument extends Document {
    render() {
        return (
            <Html lang="en-US">
                <Head>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-LWJRK5L2YW"
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', 'G-LWJRK5L2YW', {
                                page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
export default WebDocument;
