const ROOT = "";

const PATH_PAGE = {
    HOME: "/home",
    DASHBOARD: "/dashboard",
    LEADS: "/leads",
    COMMUNITY: "/prop-tally",
    PROFILE: "/profile",
    SETTING: "/setting",
    REFERRAL: "/referral",
    BOOKMARK: "/bookmarks",
    RESET: "/reset-password",
    BUILDER_HOME: "/builder/home",
    ADD_PROPERTY: "/builder/add",
    SHOWED_PROPERTIES: "/leads/properties/showed",
    MATCHING_PROPERTIES: "/leads/properties/matching",
    PRIVACY_POLICY: "/privacy-policy",
    TERMSOFSERVICE: "/terms-of-service",
    ABOUT_US: "/aboutus",
    EDIT_PROPERTY: "/builder/edit",
    FAQ: "/faq",
    CONTACT_US: "?general=contact",
};

const AUTH_PAGE = {
    signin: "?auth=signin",
    signup: "?auth=signup",
};

const path = (root: string, sublink: string) => `${root}${sublink}`;

export const ROUTES = {
    root: ROOT,
    auth: {
        signin: path(ROOT, AUTH_PAGE.signin),
        signup: path(ROOT, AUTH_PAGE.signup),
    },
    general: {
        home: path(ROOT, PATH_PAGE.HOME),
        dashboard: path(ROOT, PATH_PAGE.DASHBOARD),
        bookmarks: path(ROOT, PATH_PAGE.BOOKMARK),
        leads: path(ROOT, PATH_PAGE.LEADS),
        community: path(ROOT, PATH_PAGE.COMMUNITY),
        profile: path(ROOT, PATH_PAGE.PROFILE),
        setting: path(ROOT, PATH_PAGE.SETTING),
        referral: path(ROOT, PATH_PAGE.REFERRAL),
        reset: path(ROOT, PATH_PAGE.RESET),
        builder_home: path(ROOT, PATH_PAGE.BUILDER_HOME),
        showed_properties: path(ROOT, PATH_PAGE.SHOWED_PROPERTIES),
        matching_properties: path(ROOT, PATH_PAGE.MATCHING_PROPERTIES),
        add_property: path(ROOT, PATH_PAGE.ADD_PROPERTY),
        privacy_policy: path(ROOT, PATH_PAGE.PRIVACY_POLICY),
        terms_of_service: path(ROOT, PATH_PAGE.TERMSOFSERVICE),
        about_us: path(ROOT, PATH_PAGE.ABOUT_US),
        edit: path(ROOT, PATH_PAGE.EDIT_PROPERTY),
        faq: path(ROOT, PATH_PAGE.FAQ),
        contact: path(ROOT, PATH_PAGE.CONTACT_US),
    },
};

export const protectedRoutes: string[] = Object.values(ROUTES.general).map(
    (c) => c.substring(1)
);
