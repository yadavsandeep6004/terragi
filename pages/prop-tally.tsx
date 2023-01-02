import React from "react";

import { withAuth } from "../hoc/withAuth";

import { CommunitySection } from "../containers/community-section";
import { ProtectedPage } from "../components/protected-page";
import { BrokerPage } from "../hoc/BrokerPage";

const Community = () => <CommunitySection />;

export default withAuth(ProtectedPage(BrokerPage(Community)));
