import React from "react";

import NoResults from "../../assets/images/no-results.svg";
import { FontType, Text } from "../text";

type EmptyResultsProps = {
    title?: string;
};
export const EmptyResults: React.FC<EmptyResultsProps> = ({
    title = "No results",
}) => (
    <div className="flex  h-full w-full justify-center items-center flex-col">
        <div className="mb-[40px]">
            <NoResults height="300px" />
        </div>
        <Text weight={500} font={FontType.HEADING_M}>
            {title}
        </Text>
    </div>
);
