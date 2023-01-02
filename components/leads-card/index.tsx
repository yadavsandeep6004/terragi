/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useMemo, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";

import { Dropdown, DropdownProps } from "semantic-ui-react";

import { Button, VariantType } from "../button";
import { ColorType, FontType, Text } from "../text";
import { LeadsCardIcon, LeadSourceKeys } from "../lead-source";

import styles from "./leads.module.scss";
import Dots from "../../assets/icon/dots.svg";
import { toLakhsCr } from "../../utils/helpers";
import Logout from "../logout";

export type LeadCardPropType = {
    data: {
        name: string;
        localities: string[];
        budgetMax: number;
        budgetMin: number;
        createdAt: string;
        leadSource: `${LeadSourceKeys}`;
        updatedAt: string;
        bhkType: string[];
        _id: string;
    };
    onEditLead: (data: any) => void;
    onDeleteLead: (data: any) => void;
    onWon: (data: any, name: any) => void;
    onLost: (data: any, name: any) => void;
};

const options = [
    {
        key: "edit",
        text: "Edit",
        value: "edit",
    },
    { key: "delete", text: "Delete", value: "delete" },
    { key: "won", text: "Marked as Closed - Won", value: "won" },
    { key: "lost", text: "Marked as Closed - Lost", value: "lost" },
];

export const LeadsCard: React.FC<LeadCardPropType> = ({
    data,
    onEditLead,
    onDeleteLead,
    onWon,
    onLost,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const { name, localities, budgetMax, budgetMin, leadSource, bhkType, _id } =
        data;
    const router = useRouter();

    const redirectToShowedProperties = () => {
        router.query = {
            page: "1",
            pageSize: "10",
            leadId: _id,
        };
        router.pathname = "leads/properties/showed";

        router.push(router, undefined, { shallow: true, scroll: true });
    };

    const redirectToMatchingProperties = () => {
        const queryParams = {
            localities,
            bhk: JSON.stringify(bhkType),
            budget: JSON.stringify({ max: budgetMax, min: budgetMin }),
            minPrice: budgetMin.toString(),
            maxPrice: budgetMax.toString(),
            leadId: _id,
            // sortBy: name,
        };

        router.query = {
            page: "1",
            pageSize: "10",
            ...queryParams,
        };

        Object.entries(router.query).forEach(([k, v]) => {
            if (Array.isArray(v)) {
                if (v.length === 0) delete router.query[k];
                else router.query[k] = JSON.stringify(v);
            }
        });

        router.pathname = "leads/properties/matching";

        router.push(router, undefined, { shallow: true, scroll: true });
    };

    const dropdownHelper = (_: any, d: DropdownProps) => {
        switch (d.value) {
            case "edit":
                onEditLead(data);
                break;
            case "delete":
                setIsOpen(true);
                break;
            case "won":
                onWon(data._id, data.name);
                break;
            case "lost":
                onLost(data._id, data.name);
                break;
            default:
                break;
        }
    };

    const localityText = useMemo(() => localities?.join(", "), [localities]);

    return (
        <div className={cx(styles.wrapper, "flex justify-between")}>
            <div
                className={cx(
                    styles.lead_details,
                    "border-r md:pr-4 flex justify-between w-full"
                )}
            >
                <div className="flex justify-between md:flex-row flex-col w-full">
                    <div className="flex">
                        <div className="pr-3">
                            <div
                                className={cx(
                                    styles.custom_img,
                                    "flex items-center justify-center"
                                )}
                            >
                                <LeadsCardIcon leadConfig={leadSource} />
                            </div>
                        </div>

                        <div className="pr-8">
                            {localityText && (
                                <Text
                                    className={cx(
                                        styles.locality_text_wrapper,
                                        "mb-1.5",
                                        "capitalize"
                                    )}
                                    color={ColorType.LABEL}
                                    weight={500}
                                >
                                    Looking in {localityText}
                                </Text>
                            )}
                            <Text
                                font={FontType.SUBHEADING_S}
                                color={ColorType.HEADING_PRIMARY}
                                weight={500}
                                className="mb-1 mt-4"
                            >
                                {name}
                            </Text>
                            {budgetMax && budgetMin && (
                                <Text color={ColorType.LABEL}>
                                    Budget:{" "}
                                    <Text
                                        type="span"
                                        color={ColorType.HEADING_PRIMARY}
                                    >
                                        &#8377; {toLakhsCr(budgetMin)} to
                                        &#8377; {toLakhsCr(budgetMax)}
                                    </Text>
                                </Text>
                            )}
                        </div>
                    </div>

                    <div className={cx(styles.tags_wrapper, "flex")}>
                        {bhkType?.map((tag: string) => (
                            <Text
                                color={ColorType.PRIMARY}
                                font={FontType.LABEL_M}
                                className={cx(
                                    styles.tags,
                                    "flex items-center justify-center mr-3"
                                )}
                                key={tag}
                            >
                                {tag} BHK
                            </Text>
                        ))}

                        <Dropdown
                            className={cx(styles.lead_dropdown, "icon")}
                            floating
                            options={options}
                            onChange={dropdownHelper}
                            onClose={() => {
                                console.log("oko");
                            }}
                            value=""
                            icon={<Dots width="28" height="28" />}
                            direction="left"
                            isOnlyIcon
                            selectOnBlur={false}
                            isSimpleDropdown
                        />
                    </div>
                </div>
            </div>
            <div className={cx(styles.btn_wrapper, "flex flex-col pl-5")}>
                <Button
                    className={styles.showed_properties_btn}
                    type="button"
                    variant={VariantType.OUTLINED}
                    onClick={redirectToShowedProperties}
                >
                    Showed Properties
                </Button>

                <Button
                    className={styles.matching_properties_btn}
                    type="button"
                    onClick={redirectToMatchingProperties}
                >
                    Matching Properties
                </Button>
            </div>

            <Logout
                title="Delete Lead"
                description="Are you sure you want to delete this lead?"
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                onLogout={() => onDeleteLead(data._id)}
            />
        </div>
    );
};
