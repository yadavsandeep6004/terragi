import React, { PropsWithChildren } from "react";

import { Text, ColorType, FontType } from "../text";

type TextProps = {
    content: string;
    contentType: boolean;
    className?: string;
};

const Questions: React.FC<PropsWithChildren<TextProps>> = ({
    content,
    contentType,
    className,
}) => (
    <>
        {contentType && (
            <Text font={FontType.SUBHEADING_M} color={ColorType.BLACK}>
                {content}
            </Text>
        )}
        {!contentType && (
            <Text
                style={{
                    paddingBottom: "20px",
                    paddingLeft: "15px",
                }}
                font={FontType.BODY}
                color={ColorType.BLACK}
                className={className}
            >
                {content}
            </Text>
        )}
    </>
);

export default Questions;
