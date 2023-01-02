import React from "react";
import { StaticImageData } from "next/image";

import styles from "./leads-source.module.scss";

import Facebook from "../../assets/images/facebook.png";
import _99acres from "../../assets/images/99acres.png";
import Instagram from "../../assets/images/instagram.png";
import Magicbrics from "../../assets/images/magicbrics.png";
import WhatsApp from "../../assets/images/whatsapp.png";

export enum LeadSourceKeys {
    FACEBOOK = "Facebook",
    INSTAGRAM = "Instagram",
    WHATSAPP = "WhatsApp",
    _99ACRES = "99Acres",
    MAGIC_BRICKS = "MagicBricks",
    OTHER = "Others",
}

export type LeadConfigType = {
    title?: string;
    subtitle?: string;
    color?: string;
    background?: string;
    icon?: StaticImageData;
};

export type LeadCardPropType = {
    leadConfig: `${LeadSourceKeys}`;
};

export const LeadConfigs: Record<LeadSourceKeys, LeadConfigType> = {
    [LeadSourceKeys.OTHER]: {
        title: "O",
        background: "#deea39",
        color: "#fff",
    },
    [LeadSourceKeys.WHATSAPP]: {
        icon: WhatsApp,
        title: "WA",
    },
    [LeadSourceKeys.FACEBOOK]: {
        icon: Facebook,
        title: "Fb",
    },
    // eslint-disable-next-line no-underscore-dangle
    [LeadSourceKeys._99ACRES]: {
        icon: _99acres,
        title: "99",
    },
    [LeadSourceKeys.INSTAGRAM]: {
        icon: Instagram,
        title: "In",
    },
    [LeadSourceKeys.MAGIC_BRICKS]: {
        icon: Magicbrics,
        title: "Mb",
    },
};

export const LeadsCardIcon: React.FC<LeadCardPropType> = ({ leadConfig }) => {
    const leadStyle = LeadConfigs[leadConfig];

    return (
        <>
            {leadConfig === "Others" ? (
                <div
                    className={styles.lead_source_wrapper}
                    style={{
                        background: leadStyle.background,
                    }}
                >
                    <p
                        style={{
                            color: leadStyle.color,
                            fontSize: "32px",
                            fontWeight: "700",
                        }}
                        className="flex justify-center items-center"
                    >
                        {leadStyle.title}
                    </p>
                </div>
            ) : (
                <div className={styles.lead_source_wrapper}>
                    <img src={leadStyle.icon?.src} alt={leadStyle.title} />
                </div>
            )}
        </>
    );
};
