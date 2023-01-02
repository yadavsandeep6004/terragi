import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import cx from "classnames";

import Link from "next/link";

import { Img } from "../img";
import { Button } from "../button";
// import { Text } from "../text";

import styles from "./header.module.scss";

import Logo from "../../assets/images/logo.png";
import { SignIn } from "../../containers/sign-in";
import { SignUp } from "../../containers/sign-up";
import { ROUTES } from "../../utils/routes";

import { ContactUsPage } from "../../containers/contactuspage";
import { useToast } from "../../hooks/useToast";

export const Header: React.FC = () => {
    const { ToasterElement } = useToast();
    // const [isContactUsModalOpen, setIsContactUsModalOpen] = useState(false);
    const [dummyBlockHeight, setDummyBlockHeight] = useState<number>(0);

    const router = useRouter();
    const dummyBlock = useRef<HTMLDivElement | null>(null);
    const header = useRef<HTMLDivElement | null>(null);

    const setSignUpModal = (isOpen: boolean) => {
        if (isOpen) {
            const path = ROUTES.auth.signup;
            router.replace(path, undefined, { shallow: true });
        } else {
            delete router.query.auth;
            router.replace(router, undefined, { shallow: true });
        }
    };

    const setSignInModal = (isOpen: boolean) => {
        if (isOpen) {
            const path = ROUTES.auth.signin;
            router.replace(path, undefined, { shallow: true });
        } else {
            delete router.query.auth;
            router.replace(router, undefined, { shallow: true });
        }
    };

    const setContactUsModal = (isOpen: boolean) => {
        if (isOpen) {
            const path = ROUTES.general.contact;
            router.replace(path, undefined, { shallow: true });
        } else {
            delete router.query.general;
            router.replace(router, undefined, { shallow: true });
        }
    };

    useEffect(() => {
        setDummyBlockHeight(header.current?.offsetHeight || 0);
    }, []);

    const openSignUpModal = () => setSignUpModal(true);
    const openSignInModal = () => setSignInModal(true);
    const openContactUsModal = () => {
        setContactUsModal(true);
    };

    const signUpModal = router.query.auth === "signup";
    const signInModal = router.query.auth === "signin";
    const contactUs = router.query.general === "contact";

    return (
        <>
            <div className="flex justify-center fixed bg-white w-full z-10">
                <header
                    ref={header}
                    className={cx(
                        styles.wrapper,
                        "flex items-center justify-between"
                    )}
                >
                    <Link href="/">
                        <Img
                            className={styles.left__wrapper__logo}
                            src={Logo.src}
                            alt="logo"
                        />
                    </Link>

                    <nav>
                        <div
                            className={cx(
                                styles.right_wrapper,
                                "flex items-center"
                            )}
                        >
                            <ul className={cx(styles.nav_list, "flex")}>
                                <li>
                                    <a
                                        href={ROUTES.general.about_us}
                                        style={{ cursor: "pointer" }}
                                    >
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href={ROUTES.general.faq}
                                        style={{ cursor: "pointer" }}
                                    >
                                        FAQs
                                    </a>
                                </li>
                                <li>
                                    <button
                                        onClick={openContactUsModal}
                                        style={{ cursor: "pointer" }}
                                        type="button"
                                    >
                                        Contact Us - 8178343142
                                    </button>
                                    {/* Prop Tally
                                    <Text type="span">FREE</Text> */}
                                </li>
                            </ul>
                            <>
                                <Button
                                    className={styles.sing_up_btn}
                                    onClick={openSignInModal}
                                    type="button"
                                >
                                    Sign In
                                </Button>
                                <Button onClick={openSignUpModal} type="button">
                                    Sign Up
                                </Button>
                            </>
                        </div>
                    </nav>
                </header>
            </div>

            <div
                ref={dummyBlock}
                className={styles.dummy__block}
                style={{
                    width: "100%",
                    height: dummyBlockHeight,
                }}
            />

            {signUpModal && (
                <SignUp
                    isOpen={signUpModal}
                    onClose={(isOpen: boolean) => setSignUpModal(isOpen)}
                />
            )}

            {signInModal && (
                <SignIn
                    isOpen={signInModal}
                    onClose={(isOpen: boolean) => setSignInModal(isOpen)}
                />
            )}

            {contactUs && (
                <ContactUsPage
                    isOpen={contactUs}
                    onClose={(isOpen: boolean) => setContactUsModal(isOpen)}
                />
            )}

            <ToasterElement />
        </>
    );
};
