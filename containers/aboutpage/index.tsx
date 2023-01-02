import Link from "next/link";
import React from "react"

import { FontType,Text,ColorType } from "../../components/text";
import styles from "./aboutpage.module.scss";

const AboutPage = () => {
    return (
        <div
            style={{
                width: "80%",
                margin: "auto",
                padding: "10px",
            }}
            className={styles.container}
        >
            <Text
                font={FontType.HEADING_L}
                weight={"bold"}
                style={{ textAlign: "center", paddingBottom: "20px" }}
            >
                About Us
            </Text>
            <Text
                font={FontType.BODY}
                weight={400}
                style={{ paddingBottom: "25px" }}
                color={ColorType.BLACK}
            >
                Launched in 2022, Terragi.in, India’s No. 1 B2B real estate
                inventory platform, deals with every aspect of the broker’s
                needs in the real estate industry. It is an online forum where
                our technology connects builders and brokers/agents to exchange
                information about real estate properties quickly, effectively
                and inexpensively. At Terragi, you can advertise a property,
                search for a property, browse through properties, and keep
                yourself updated with the latest news and trends making
                headlines in the realty sector. On the other hand, we provide
                brokers with industry specific tools which enable them to engage
                with their client's demand and visit them at the trending and
                suitable budgeted builder floors.We are also a tech solution for
                connecting broker to broker for secondary market renting/sales
                for plots/apartment/builderfloors/commercial space.
            </Text>
            <Text
                font={FontType.HEADING_L}
                weight={"bold"}
                style={{ paddingBottom: "10px" }}
            >
                OUR PROMISE
            </Text>
            <Text
                font={FontType.BODY}
                weight={400}
                style={{ paddingBottom: "15px" }}
                color={ColorType.BLACK}
            >
                To connect brokers directly with the builders, eliminating the
                need to hire surveyors and share commission payout with fellow
                brokers resulting in savings of lacs of rupees every year. At
                present, Terragi prides itself for having around 10000+ builder
                floor inventory spanning across 44+ localities of Gurgaon.
            </Text>

            <Text
                font={FontType.BODY}
                weight={400}
                style={{ padding: "10px" }}
                color={ColorType.BLACK}
            >
                1. Accurate & Updated - We have a three layered process before
                any property listing is made live. On top of it, every listed
                property is updated every fortnight by our dedicated customer
                care team, until it is marked sold. (We also recommend that you
                may check the availability and the price directly with the
                builder once you zero down on a particular property for a
                client.)
            </Text>

            <Text
                font={FontType.BODY}
                weight={400}
                style={{ padding: "10px" }}
                color={ColorType.BLACK}
            >
                2. Convenience at your fingertips – we guarantee you access to
                over 95% builder floor inventory in Gurugram available at the
                click of a button
            </Text>

            <Text
                font={FontType.BODY}
                weight={400}
                style={{ padding: "10px" }}
                color={ColorType.BLACK}
            >
                3. Directly connect with Builders – You may reach out to as many
                builders directly as per your requirement, thereby eliminating
                sub-brokers
            </Text>

            <Text
                font={FontType.BODY}
                weight={400}
                style={{ padding: "10px" }}
                color={ColorType.BLACK}
            >
                4. Huge Savings – We help you save over 75% costs which you
                would otherwise incur to hire a surveyor on per annum basis
            </Text>
            <Text
                font={FontType.HEADING_S}
                weight={400}
                style={{ padding: "10px" }}
                color={ColorType.BLACK}
                className={styles.contactus}
            >
                Please write to us at
                <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=feedback@terragi.in"
                    className={styles.linkmail}
                >
                    {" "}
                    feedback@terragi.in{" "}
                </a>
                or call us at{" "}
                <a href="tel:9599254826" className={styles.linkmail}>
                    95992 54826
                </a>{" "}
                (09:00 AM to 06 :00 PM, Monday to Saturday )
            </Text>
        </div>
    );
}

export default AboutPage