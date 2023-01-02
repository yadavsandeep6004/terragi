import React from "react";

import { AddPropertyForm } from "../../components/add-property-form";

type AppProps = {
    isAppSmith?: boolean;
};

export const BuilderHome = ({ isAppSmith }: AppProps) => (
    <div className="bg-white">
        <AddPropertyForm isAppSmith className="max-w-screen-lg mx-auto pb-24" />
    </div>
);
