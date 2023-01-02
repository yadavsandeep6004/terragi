import React, { useRef } from "react";
import cx from "classnames";
import { useSelector } from "react-redux";

import { Button } from "../../components/button";
import { getUserDetails } from "../../store/user";
import { ColorType, FontType, Text } from "../../components/text";
import ReferIcon from "../../assets/images/refer.png";
// import Facebook from "../../assets/icon/facebook.svg";
// import Instagram from "../../assets/icon/instagram.svg";
// import Twitter from "../../assets/icon/twitter.svg";
// import Youtube from "../../assets/icon/youtube.svg";
import WhatsApp from "../../assets/icon/whatsapp.svg";
import Message from "../../assets/icon/message.svg";

import styles from "./referral.module.scss";
import { ToastVariant, useToast } from "../../hooks/useToast";

const ReferralContainer = () => {
    const copyReferralCode = useRef<HTMLInputElement>(null);
    const user = useSelector(getUserDetails);
    const { toast, ToasterElement } = useToast();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(
            `https://www.terragi.in?auth=singup&r=${user!.referralCode}`
        );
        toast({
            variant: ToastVariant.SUCCESS,
            message: "Copied",
        });
    };
    return (
        <div className={styles.referral_main_wrapper}>
            <div className="md:p-10 p-4">
                <Text
                    weight={500}
                    font={FontType.HEADING_M}
                    color={ColorType.COOL_BLACK}
                >
                    Referral
                </Text>
                <div
                    className={cx(
                        styles.refer_wrapper,
                        "flex justify-center flex-col items-center my-20"
                    )}
                >
                    <img
                        className={styles.refer_img}
                        src={ReferIcon.src}
                        alt="refer"
                    />
                    <Text
                        className="pt-5"
                        weight={500}
                        font={FontType.HEADING_M}
                        color={ColorType.COOL_BLACK}
                    >
                        Invite friends & Businesses
                    </Text>
                    <Text className="pb-4" font={FontType.LABEL_L}>
                        Copy your code and share it with your friends
                    </Text>

                    {user?.referralCode && (
                        <div className="flex">
                            <input
                                value={user?.referralCode}
                                className={styles.refer_code_input}
                                readOnly
                                ref={copyReferralCode}
                            />
                            <Button
                                type="button"
                                className={styles.refer_code_copy_btn}
                                onClick={copyToClipboard}
                            >
                                Copy
                            </Button>
                        </div>
                    )}

                    <Text
                        className="pt-4 pb-5"
                        weight={500}
                        font={FontType.SUBHEADING_L}
                        color={ColorType.COOL_BLACK}
                    >
                        OR
                    </Text>

                    <div className="flex gap-14	">
                        {/* <a
                            href="https://m.facebook.com/Terragi-108060905324369/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Facebook
                                className="cursor-pointer"
                                width={27.91}
                                height={27.91}
                            />
                        </a> */}
                        {/* <a
                            href="https://instagram.com/terragi?igshid=YmMyMTA2M2Y="
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Instagram
                                className="cursor-pointer"
                                width={27.98}
                                height={27.98}
                            />
                        </a> */}
                        {/* <a
                            href={`https://twitter.com/intent/tweet?source=tweetbutton&text=${user?.referralCode}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Twitter
                                className="cursor-pointer"
                                width={27.81}
                                height={27.81}
                            />
                        </a> */}
                        <a
                            href={`https://api.whatsapp.com/send/?text=Hi, I am using Terragi, India's 1st B2B Builder Floors Inventory Platform connecting brokers directly with builders. Use my code and get access to all the Builder Floors of Gurgaon - https://terragi.in/?auth=signup%26referralCode=${user?.referralCode}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <WhatsApp
                                className="cursor-pointer"
                                width={26.53}
                                height={26.53}
                            />
                        </a>

                        <a
                            href={`sms:?&body=Hi, I am using Terragi, India's 1st B2B Builder Floors Inventory Platform connecting brokers directly with builders. Use my code and get access to all the Builder Floors of Gurgaon - https://terragi.in/?auth=signup%26referralCode=${user?.referralCode}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Message
                                className="cursor-pointer"
                                width={26.53}
                                height={26.53}
                            />
                        </a>

                        {/* <a
                            href="https://www.youtube.com/channel/UCV6XEntUIkaIMLjEpkAEKhg"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Youtube
                                className="cursor-pointer"
                                width={26.53}
                                height={26.53}
                            />
                        </a> */}
                    </div>
                </div>
            </div>
            <ToasterElement />
        </div>
    );
};

export default ReferralContainer;
