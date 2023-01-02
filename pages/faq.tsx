import React, { useState } from "react";

import FaqPage from "../containers/faqpage";
import { Header } from "../components/header";
import { Slider } from "../components/slider";
import { ROUTES } from "../utils/routes";

const Faq = () => {
    const [sidebarClose, setSidebarClose] = useState(false);
    const tabsUnProtected = [
        {
            name: "Sign Up",
            icon: null,
            href: ROUTES.auth.signup,
            isEnabled: true,
        },
        {
            name: "Sign In",
            icon: null,
            href: ROUTES.auth.signin,
            isEnabled: true,
        },
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
    return (
        <>
            <Header />
            <Slider
                tabs={tabsUnProtected}
                isOpen={sidebarClose}
                setSidebarClose={setSidebarClose}
            />
            <FaqPage />
        </>
    );
};

export default Faq;
