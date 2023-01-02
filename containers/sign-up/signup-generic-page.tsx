import React, { PropsWithChildren } from "react";
import cx from "classnames";

import { Button } from "../../components/button";
import { ColorType, FontType, Text } from "../../components/text";

import styles from "./signup.module.scss";
import { SignUpGenericPageType } from "./types";
import { Item } from "semantic-ui-react";

export const SignUpGenericPage: React.FC<
    PropsWithChildren<SignUpGenericPageType>
> = ({
    children,
    onSubmit,
    signUpDesc,
    buttonText,
    heading,
    buttonDesc,
    isLoading,
    BENEFITS_DATA
}) => {
        const submitHandler = (e: any) => {
            e.preventDefault();
            onSubmit();
        };



        return (
            <form onSubmit={submitHandler}>
                <div className="flex">
                    <div
                        className={cx(
                            styles.signup__side_left,
                            "flex flex-col flex-1 min-w-0"
                        )}
                    >
                        <div className="flex flex-col gap-5">
                            <Text font={FontType.HEADING_L} weight={600}>
                                {heading}
                            </Text>
                            <Text
                                font={FontType.SUBHEADING_S}
                                color={ColorType.LABEL}
                                weight={400}
                            >
                                {signUpDesc}
                            </Text>
                        </div>

                        {children}

                        <div className="mt-8">
                            <Button
                                className={styles.submit__button}
                                fluid
                                type="submit"
                                loading={isLoading}
                            >
                                {buttonText}
                            </Button>
                        </div>
                        {buttonDesc}
                    </div>

                    <div className={cx("flex flex-col", styles.signup__side_right)}>
                        <div className={styles.signup__background} />
                        <div className={styles.signup__text_container}>
                            <Text
                                font={FontType.SUBHEADING_M}
                                color={ColorType.WHITE}
                            >
                                {heading} your account to unlock these benefits
                            </Text>
                            <ul className={styles.benefitlist}>
                                {
                                    BENEFITS_DATA && BENEFITS_DATA.map(Item => <li key={Item}>
                                        <Text
                                            font={FontType.LABEL_L}
                                            color={ColorType.WHITE}
                                        >
                                            {Item}
                                        </Text>
                                    </li>)
                                }

                            </ul>
                        </div>
                    </div>


                    {/* <div className={cx("flex flex-col", styles.signup__side_right)}>
                    <div className={styles.signup__background} />
                    <div className={styles.signup__text_container}>
                        <Text
                            font={FontType.SUBHEADING_M}
                            color={ColorType.WHITE}
                        >
                          {heading} your account to unlock these benefits
                        </Text>
                        <ul className={styles.benefitlist}>
                            <li>
                                <Text
                                    font={FontType.LABEL_L}
                                    color={ColorType.WHITE}
                                >
                                    Accuracy - We have a Our three layered
                                    process before any property listing is made
                                    live, makes our data accurate.
                                </Text>
                            </li>
                            <li>
                                <Text
                                    font={FontType.LABEL_L}
                                    color={ColorType.WHITE}
                                >
                                    Updated - Every listed property is updated
                                    every fortnight by our dedicated customer
                                    care team, until it is marked sold.
                                </Text>
                            </li>
                            <li>
                                <Text
                                    font={FontType.LABEL_L}
                                    color={ColorType.WHITE}
                                >
                                    Convenience - Access to over 95% builder
                                    floor inventory in Gurugram available at the
                                    click of a button
                                </Text>
                            </li>
                            <li>
                                <Text
                                    font={FontType.LABEL_L}
                                    color={ColorType.WHITE}
                                >
                                    Connecting Broker to Builder - Directly
                                    connect with Builders as per your
                                    requirement, thereby eliminating sub-brokers
                                </Text>
                            </li>
                            <li>
                                <Text
                                    font={FontType.LABEL_L}
                                    color={ColorType.WHITE}
                                >
                                    Cost Saving - Helps you save over 75% costs
                                    as compared to traditional yet
                                    unsatisfactory way of hiring surveyor on
                                    per annum basis.
                                </Text>
                            </li>
                        </ul>
                    </div>
                </div> */}
                </div>
            </form>
        );
    };
