import { useRouter } from "next/router";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getUserDetails, logoutSuccess } from "../../store/user";
import { PLAN_TYPE, USER_TYPE } from "../../utils/constants";
import { isCurrentPathProtected } from "../../utils/helpers";
import { ROUTES } from "../../utils/routes";

import { Header } from "../header";
import { Sidebar } from "../sidebar";
import { Slider } from "../slider";

import HomeIcon from "../../assets/icon/home.svg";
import DashboardIcon from "../../assets/icon/dashboard.svg";
import SettingIcon from "../../assets/icon/settings.svg";
import ReferralIcon from "../../assets/icon/referral.svg";
// import CommunityIcon from "../../assets/icon/community.svg";
import ProfileIcon from "../../assets/icon/profile.svg";
import LeadsIcon from "../../assets/icon/leads.svg";
import LogoutIcon from "../../assets/icon/logout.svg";
import BookmarkIcon from "../../assets/icon/bookmark.svg";
import Logout from "../logout";

const tabsUnProtected = [
    { name: "Sign Up", icon: null, href: ROUTES.auth.signup, isEnabled: true },
    { name: "Sign In", icon: null, href: ROUTES.auth.signin, isEnabled: true },
    {
        name: "Contact Us",
        icon: null,
        href: ROUTES.general.contact,
        isEnabled: true,
    },
    {
        name: "About Us",
        icon: null,
        href: ROUTES.general.about_us,
        isEnabled: true,
    },
    {
        name: "FAQs",
        icon: null,
        href: ROUTES.general.faq,
        isEnabled: true,
    },
];

const availableTabs = {
    [PLAN_TYPE.PRO]: {
        Home: true,
        Leads: true,
        Bookmark: true,
        Dashboard: true,
        Community: true,
        Profile: true,
        Referral: true,
        Setting: true,
        Logout: true,
    },
    [PLAN_TYPE.BASIC]: {
        Home: true,
        Community: true,
        Profile: true,
        Setting: true,
        Logout: true,
    },
    [PLAN_TYPE.FREE]: {
        Home: true,
        Profile: true,
        Setting: true,
        Logout: true,
    },
};

const NavbarNonMemo = () => {
    const [sidebarClose, setSidebarClose] = useState(false);
    // const [disableRoutes, setDisableRoutes] = useState<string[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();
    const user = useSelector(getUserDetails);

    const isCurrentRouteProtected = isCurrentPathProtected();

    const onLogout = useCallback(() => {
        dispatch(logoutSuccess());
        router.replace("/");
    }, [router]);

    const planId = user?.planId || PLAN_TYPE.FREE;
    const isBuilder = user?.userType === USER_TYPE.BUILDER;

    const tabs = useMemo(
        () =>
            isBuilder
                ? [
                      {
                          isEnabled: true,
                          name: "Home",
                          icon: HomeIcon,
                          href: ROUTES.general.builder_home,
                      },
                      {
                          isEnabled: true,
                          name: "Add Property",
                          icon: LeadsIcon,
                          href: ROUTES.general.add_property,
                      },
                      {
                          isEnabled: !!availableTabs[planId].Profile,
                          name: "Profile",
                          icon: ProfileIcon,
                          href: ROUTES.general.profile,
                      },
                      {
                          isEnabled: !!availableTabs[planId].Setting,
                          name: "Setting",
                          icon: SettingIcon,
                          href: ROUTES.general.setting,
                      },
                      {
                          isEnabled: true,
                          name: "Logout",
                          href: () => setIsOpen(true),
                          icon: LogoutIcon,
                      },
                  ]
                : [
                      {
                          isEnabled: !!availableTabs[planId].Home,
                          name: "Home",
                          icon: HomeIcon,
                          href: ROUTES.general.home,
                      },
                      {
                          isEnabled: !!availableTabs[planId].Leads,
                          name: "Leads",
                          icon: LeadsIcon,
                          href: ROUTES.general.leads,
                      },
                      {
                          isEnabled: !!availableTabs[planId].Bookmark,
                          name: "Bookmarks",
                          icon: BookmarkIcon,
                          href: ROUTES.general.bookmarks,
                      },
                      {
                          isEnabled: !!availableTabs[planId].Dashboard,
                          name: "Dashboard",
                          icon: DashboardIcon,
                          href: ROUTES.general.dashboard,
                      },
                      //   {
                      //       isEnabled: !!availableTabs[planId].Community,
                      //       name: "Prop Tally",
                      //       icon: CommunityIcon,
                      //       href: ROUTES.general.community,
                      //   },
                      {
                          isEnabled: !!availableTabs[planId].Profile,
                          name: "Profile",
                          icon: ProfileIcon,
                          href: ROUTES.general.profile,
                      },
                      {
                          isEnabled: !!availableTabs[planId].Referral,
                          name: "Referral",
                          icon: ReferralIcon,
                          href: ROUTES.general.referral,
                      },
                      {
                          isEnabled: !!availableTabs[planId].Setting,
                          name: "Setting",
                          icon: SettingIcon,
                          href: ROUTES.general.setting,
                      },
                      {
                          isEnabled: true,
                          name: "Logout",
                          href: () => setIsOpen(true),
                          icon: LogoutIcon,
                      },
                  ],
        [onLogout, user]
    );

    useEffect(() => {
        const isPro = user?.planId === PLAN_TYPE.PRO;
        const isBasic = user?.planId === PLAN_TYPE.BASIC;
        if (isPro) return;

        const dRoutes: string[] = [];
        tabs.forEach((t) => {
            if (t.name !== "Home") {
                if (isBasic && t.name !== "Prop Tally") dRoutes.push(t.name);
                else if (!isBasic) dRoutes.push(t.name);
            }
        });
        // setDisableRoutes(dRoutes);
    }, [user]);

    return (
        <>
            {!isCurrentRouteProtected ? (
                <Header />
            ) : (
                <Sidebar tabs={tabs} openLogoutModal={() => setIsOpen(true)} />
            )}

            <Slider
                isOpen={sidebarClose}
                setSidebarClose={setSidebarClose}
                tabs={!isCurrentRouteProtected ? tabsUnProtected : tabs}
            />

            <Logout
                title="Logout"
                description="Are you sure, you want to logout ?"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onLogout={onLogout}
            />
        </>
    );
};

export const Navbar = React.memo(NavbarNonMemo);
