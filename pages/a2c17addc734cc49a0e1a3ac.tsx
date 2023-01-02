import { NextPage } from "next";

import React from "react";

import Link from "next/link";

import { BuilderHome } from "../containers/builder-home";
import { Button, VariantType } from "../components/button";

const Form: NextPage = () => (
    <div className="bg-white p-5">
        <div className="max-w-screen-lg mx-auto pb-24">
            <div className="flex mb-14 mt-14">
                <Link href="https://im.terragi.in/app/inventory-specialist/view-draft-data-628e5fb132292b76809f270f">
                    <Button
                        variant={VariantType.OUTLINED}
                        className="gap-8"
                        type="button"
                    >
                        View Draft Data
                    </Button>
                </Link>
            </div>
            <BuilderHome isAppSmith />
        </div>
    </div>
);

export default Form;
