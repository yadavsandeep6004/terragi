/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React from "react";

export type ImgProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const Img: React.FC<ImgProps> = ({ loading = "lazy", ...props }) => (
    <img loading={loading} {...props} />
);
