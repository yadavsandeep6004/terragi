import React from "react";
import Questions from "../../components/questions";

import { FontType, Text, ColorType } from "../../components/text";
import styles from "./faqpage.module.scss";

const FaqPage = () => {
    return (
        <div
            style={{
                width: "80%",
                margin: "auto",
                padding: "10px",
                textAlign: "justify",
            }}
            className={styles.container}
        >
            <Text
                font={FontType.HEADING_L}
                style={{ textAlign: "center", paddingBottom: "20px" }}
            >
                Frequently Asked Questions
            </Text>

            <Questions
                content={"1. What does terragi.in do?"}
                contentType={true}
            />

            <Questions
                content={`Terragi, India’s first B2B inventory platform, helps brokers
                connect directly with the builders thereby eliminating the need
                to hire a team of surveyors on monthly salary to fetch you
                builder floors to match the requirements of their clients and
                the need to share the commission pay-outs with fellow brokers by
                connecting you directly with the builders`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`2. What kind of properties are listed currently on your website?`}
                contentType={true}
            />

            <Questions
                content={`We already have all the ready to move in and under construction
                builder floors in Gurgoan listed on our platform. We will also
                be increasing our coverage in terms of (kinds of) properties and
                footprint to Delhi NCR soon and will keep you posted on such
                developments.`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`3. How accurate and updated is the information on the properties
                listed on your website?`}
                contentType={true}
            />

            <Questions
                content={` We have a three layered process before any listing is made live.
                On top it, every listed property is updated every fortnight by
                our dedicated customer care team, until it is marked sold. We
                also recommend that you may check the availability and the price
                directly with the builder once you zero down on a particular
                property for a client.`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`4. How many builders can I reach out to during my subscription
                period?`}
                contentType={true}
            />

            <Questions
                content={`You may reach out to as many builders as your need be under the
                annual inventory subscription.`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`5. Can I login through more than one device using my login
                credentials?`}
                contentType={true}
            />

            <Questions
                content={`No, you will be able to login on one device only at a time with
                your login credentials.`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`6. Do I have to pay extra for using your CRM feature?`}
                contentType={true}
            />

            <Questions
                content={`No. The current CRM features are free along with our annual
                inventory subscription.`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`7. How safe and secure are my leads in your CRM?`}
                contentType={true}
            />

            <Questions
                content={`All your leads, and any other data as well, are absolutely safe
                and secure. We don’t share the same with anyone else.`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`8. Can I integrate all my leads, other than Magicbricks and
                99acres leads, into your platform?`}
                contentType={true}
            />

            <Questions
                content={`Currently leads feed from Magicbricks and 99acres is integrated.
                You can manage leads from both these platforms on our platform.`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`9. Can I create my own leads in the CRM section?`}
                contentType={true}
            />

            <Questions
                content={`Yes, you may create as many leads in the CRM section in your
                login on our platform and also mention the source of these leads
                being created by you and/or your team.`}
                contentType={false}
                className={styles.website}
            />

            <Questions
                content={`10. Whom should I get in touch with in case if I face any
                issues?`}
                contentType={true}
            />

            <Text
                style={{ paddingBottom: "20px", paddingLeft: "15px" }}
                font={FontType.BODY}
                color={ColorType.BLACK}
                className={styles.website}
            >
                We have dedicated team customer care team to address your
                queries and resolve your concerns. You may reach them at
                XXXXXXXXX between 10 am to 5 pm on Monday to Saturday or drop us
                an email on{" "}
                <a
                    className={styles.url}
                    href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=feedback@terragi.in"
                >
                    feedback@terragi.in
                </a>{" "}
                /{" "}
                <a
                    className={styles.url}
                    href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=customerservice@terragi.in"
                >
                    customerservice@terragi.in
                </a>{" "}
                and we will revert back or arrange a call back to you within 24
                working hours
            </Text>
        </div>
    );
};

export default FaqPage;
