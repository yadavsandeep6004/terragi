import React from "react";
import cx from "classnames";
import { Sidebar } from "semantic-ui-react";
import { useRouter } from "next/router";

import { Img } from "../img";
import MenuIcon from "../../assets/icon/menu.svg";

import { ColorType, FontType, Text } from "../text";
import Logo from "../../assets/images/logo.png";

import styles from "./slider.module.scss";

type SliderProps = {
    tabs: {
        name: string;
        href: any;
        icon: React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
        > | null;
        isEnabled?: boolean;
    }[];
    isOpen: boolean;
    setSidebarClose: (p: any) => void;
};

export const Slider: React.FC<SliderProps> = (props) => {
    const router = useRouter();
    const redirectTo = (path: string) => {
        router.replace(path, undefined, { shallow: true });
    };

    const handleButtonAction = (
        heading: string,
        href: string | Function,
        isEnabled?: boolean
    ) => {
        if (!isEnabled) return;
        if (typeof href === "string") redirectTo(href as string);
        else (href as Function)();

        props.setSidebarClose(false);
    };

    return (
        <>
            <div className={cx(styles.header, "items-center gap-5")}>
                <MenuIcon
                    className={styles.header__menu}
                    width="28"
                    height="28"
                    onClick={() => props.setSidebarClose((p: boolean) => !p)}
                />
                <Img
                    className={styles.header__logo}
                    src={Logo.src}
                    alt="logo"
                />
            </div>

            <Sidebar
                animation="push"
                className={styles.custom__sidebar}
                visible={props.isOpen}
            >
                {props.tabs.map((b) => (
                    <>
                        <Text
                            onClick={() =>
                                handleButtonAction(b.name, b.href, b.isEnabled)
                            }
                            font={FontType.SUBHEADING_M}
                            color={
                                b.isEnabled
                                    ? ColorType.HEADING_PRIMARY
                                    : ColorType.GREY100
                            }
                            weight={500}
                        >
                            {b.name}
                        </Text>
                        <div
                            className="my-6"
                            style={{
                                width: "100%",
                                height: "1px",
                                background: "#E0E0E0",
                            }}
                        />
                    </>
                ))}
            </Sidebar>
        </>
    );
};
