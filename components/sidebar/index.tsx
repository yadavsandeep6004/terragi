/* eslint-disable jsx-a11y/anchor-is-valid */
import Image from "next/image";
import React, { useRef } from "react";
import cx from "classnames";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import logoImage from "../../assets/images/logo.png";
import { SidebarButton } from "../sidebar-button";
import { ColorType, FontType, Text } from "../text";
import { MemoUserIcon as UserIcon } from "../user-icon";

import styles from "./sidebar.module.scss";

import { getPath } from "../../utils/helpers";
import { getUserDetails } from "../../store/user";
import { ROUTES } from "../../utils/routes";

type SidebarProps = {
    tabs: {
        name: string;
        href: string | Function;
        icon: React.ReactElement<
            any,
            string | React.JSXElementConstructor<any>
        >;
        isEnabled: boolean;
    }[];
    openLogoutModal: Function;
};

export const Sidebar: React.FC<SidebarProps> = ({ tabs, openLogoutModal }) => {
    const user = useSelector(getUserDetails);
    const router = useRouter();
    const sidebar = useRef<HTMLDivElement | null>(null);

    let path = getPath();
    if (
        path === ROUTES.general.showed_properties ||
        path === ROUTES.general.matching_properties
    )
        path = ROUTES.general.leads;

    const currentTab = path.substring(1);

    const isPageValid =
        tabs.findIndex(
            (e) =>
                typeof e.href === "string" &&
                (e.href as string).substring(1) === currentTab
        ) !== -1;

    const redirectToPage = (name: string) => {
        if (
            `/${currentTab}` === name &&
            currentTab !== ROUTES.general.home.replace("/", "")
        ) {
            return;
        }

        if (
            Object.keys(router.query).filter(
                (e) => e !== "page" && e !== "pageSize"
            ).length > 0 &&
            +(router.query.page || 1) > 1
        ) {
            router.query.page = "1";
            router.push(router, undefined, { shallow: true, scroll: true });
            return;
        }

        router.push(`/${name}`, undefined, { shallow: true, scroll: true });
    };

    if (!isPageValid) return <></>;

    return (
        <>
            <div ref={sidebar} className={styles.wrapper}>
                <div className={cx(styles.wrapper__logo, "cursor-pointer")}>
                    <Link href={ROUTES.general.home}>
                        <Image
                            src={logoImage}
                            width="106px"
                            height="48px"
                            alt="Logo"
                        />
                    </Link>
                </div>

                <Link href={ROUTES.general.profile}>
                    <div className={cx(styles.wrapper__user, "cursor-pointer")}>
                        <UserIcon
                            name={user?.fullName || "A"}
                            profileImage={user?.profileImage}
                        />
                        <div className={styles.wrapper__user__name}>
                            <Text
                                font={FontType.LABEL_L}
                                color={ColorType.COOL_BLACK}
                                weight={500}
                            >
                                {user?.fullName}
                            </Text>
                            <Text
                                font={FontType.LABEL_M}
                                color={ColorType.LABEL}
                                weight={400}
                            >
                                {`${user?.countryCode}-${user?.mobileNumber}`}
                            </Text>
                        </div>
                    </div>
                </Link>

                <div>
                    {tabs.map((e) => {
                        const isDisable = !e.isEnabled;
                        return typeof e.href === "string" ? (
                            <div
                                key={e.name}
                                onClick={
                                    isDisable
                                        ? () => {}
                                        : () => redirectToPage(e.href as string)
                                }
                            >
                                <SidebarButton
                                    key={e.name}
                                    icon={e.icon}
                                    checked={`/${currentTab}` === e.href}
                                    disabled={isDisable}
                                >
                                    {e.name}
                                </SidebarButton>
                            </div>
                        ) : (
                            <div onClick={openLogoutModal as any}>
                                <SidebarButton
                                    key={e.name}
                                    icon={e.icon}
                                    checked={false}
                                    disabled={false}
                                >
                                    {e.name}
                                </SidebarButton>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};
