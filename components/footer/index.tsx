/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import cx from "classnames";
import Image from "next/image";

import { ColorType, FontType, Text } from "../text";
import styles from "./footer.module.scss";
import logo from "../../assets/images/logo.png";
import FacebookI from "../../assets/icon/fb.svg";
import TweetI from "../../assets/icon/tweet.svg";
import LinkedinI from "../../assets/icon/linkedin.svg";
import InstaI from "../../assets/icon/insta.svg";
import Youtube from "../../assets/icon/youtube_black.svg";
import Whatsapp from "../../assets/icon/whatsapp_black.svg";
import { ROUTES } from "../../utils/routes";
import { ContactUsPage } from "../../containers/contactuspage";

export const Footer = () => {
    const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
    const openContactUsModal = () =>
        setIsContactUsModalOpen(!isContactUsModalOpen);
    return (
        <>
            <div className={styles.footerSec}>
                <div className={styles.footer}>
                    <div className={styles.logo}>
                        <Image src={logo} alt="logo" />
                        <Text
                            className={styles.text}
                            font={FontType.BODY}
                            weight={400}
                        >
                            Terragi, India's 1st B2B inventory platform,
                            connects brokers directly with the builders,
                            eliminating the need to hire surveyors and share
                            commission payout with fellow brokers resulting in
                            savings of lacs of rupees every year
                        </Text>
                    </div>

                    <div className={styles.pages}>
                        <Text font={FontType.SUBHEADING_L} weight={400}>
                            Pages
                        </Text>
                        <Text
                            font={FontType.TITLE}
                            color={ColorType.BLACK}
                            weight={400}
                        >
                            <ul className={styles.pageElement}>
                                <li>
                                    <a href={ROUTES.general.about_us}>
                                        <a>About us</a>
                                    </a>
                                </li>
                                {/* <li>
                                <a href="#">
                                    <a>Community</a>
                                </a>
                            </li> */}
                                <li>
                                    <a href={ROUTES.general.faq}>
                                        <a>FAQs</a>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        onClick={openContactUsModal}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <a>Contact us</a>
                                    </a>
                                </li>
                            </ul>
                        </Text>
                    </div>

                    <div className={styles.pages}>
                        <Text font={FontType.SUBHEADING_L} weight={400}>
                            Learn More
                        </Text>
                        <Text
                            font={FontType.TITLE}
                            color={ColorType.BLACK}
                            weight={400}
                        >
                            <ul className={cx(styles.learnMoreElement)}>
                                <li>
                                    <a href={ROUTES.general.privacy_policy}>
                                        <a>Privacy Policy</a>
                                    </a>
                                </li>
                                <li>
                                    <a href={ROUTES.general.terms_of_service}>
                                        <a>Terms of Use</a>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://wa.me/+919810467661"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Whatsapp
                                    </a>
                                </li>
                            </ul>
                        </Text>
                    </div>

                    <div className={styles.socialLinks}>
                        <Text font={FontType.SUBHEADING_L} weight={400}>
                            Social links
                        </Text>

                        <ul className={styles.socialElements}>
                            <li>
                                <a
                                    href="https://m.facebook.com/Terragi-108060905324369/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <FacebookI width="16px" height="16px" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://instagram.com/terragi?igshid=YmMyMTA2M2Y="
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <InstaI width="16px" height="16px" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/Terragi_Ind"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <TweetI width="16px" height="16px" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.linkedin.com/company/terragi/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <LinkedinI width="16px" height="16px" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/channel/UCV6XEntUIkaIMLjEpkAEKhg"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Youtube width="16px" height="16px" />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://wa.me/9810467661"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <Whatsapp width="16px" height="16px" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className={styles.copyright}>
                    <Text font={FontType.LABEL_L}>Copyright © 2022 </Text>
                </div>
            </div>

            {isContactUsModalOpen && (
                <ContactUsPage
                    isOpen={isContactUsModalOpen}
                    onClose={openContactUsModal}
                />
            )}
        </>
    );
};
