import React from "react";
import cx from "classnames";

import { NoLeadsCard } from "./no-leads-card";
import styles from "./noleads.module.scss";
import { NoLeadsPropType } from "./type";

export const NoLeadsCards: React.FC<NoLeadsPropType> = ({
    onConnectLeadOpen,
    onCreateLeadOpen,
}) => (
    <div className={cx(styles.card_frame)}>
        <NoLeadsCard
            headingText="Integrate Lead"
            bodyText="Integrate Magicbricks and 99 acres leads with your terragi account in real-time. And Match properties from a pool of 10000 + builder floors. Save and show to clients at the site visit."
            buttonText="Integrate Lead"
            onClick={onConnectLeadOpen}
        />
        <NoLeadsCard
            headingText="Create Lead"
            bodyText="Create leads on your Terragi account from various leads sources like Youtube, Instagram , Personal reference , word of mouth etc and choose best / trending builder floors from a pool of 10000 + inventory for your clients."
            buttonText="Create Lead"
            onClick={onCreateLeadOpen}
        />
    </div>
);
