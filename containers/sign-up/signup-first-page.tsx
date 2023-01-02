import React, { useMemo } from "react";
import cx from "classnames";

import { SelectorButton } from "../../components/selector-button";
import { Input } from "../../components/input";
import { Dropdown } from "../../components/dropdown";
import { Label } from "../../components/label";
import { SignUpGenericPage } from "./signup-generic-page";

import styles from "./signup.module.scss";
// import { EXPERIENCE_OPTIONS, GENDER_OPTIONS } from "./constants";
import { GENDER_OPTIONS } from "./constants";
import { SignUpFormKeys, SignUpFormFirstPageType } from "./types";
import { COUNTRY_CODES } from "../../utils/constants";
// import { DobInput } from "../../components/dob-input";

export const SignupFirstPage: React.FC<SignUpFormFirstPageType> = ({
    handleFormInputValues,
    formValues,
    onSubmit,
    errorMessages,
}) => {
    const countryCodes = useMemo(() => COUNTRY_CODES, []);
    // const router = useRouter();
    // const { referralCode } = router.query;
    const BENEFITS_DATA = [
        'Convenience – Get access to over 5000 plus builder floors of Gurugram at the click of a button.',

        'Direct Connection – Directly connect with as many builders as per your requirement, thereby eliminating to associate with fellow brokers',

        'Cost Effective – Save 75% costs over the traditional way of aggregating builder floors. No need to hire a team of surveyors anymore. ',

        'Accurate – We have a three layered process to make a property live, making our listings precise and accurate. ',

        'Updated – Every listed property is updated every fortnight by our dedicated builder care team, until it is marked sold'

    ]

    return (
        <SignUpGenericPage
            heading="Sign Up"
            signUpDesc=" New to the platform fill your details to sign up"
            onSubmit={onSubmit}
            buttonText="Next"
            BENEFITS_DATA={BENEFITS_DATA}
        >
            <div className="flex flex-col gap-8">
                <SelectorButton
                    name={SignUpFormKeys.PROFESSION}
                    label="I am"
                    required
                    options={["Broker", "Builder"]}
                    value={formValues[SignUpFormKeys.PROFESSION]}
                    onChange={handleFormInputValues}
                    errorMessage={errorMessages[SignUpFormKeys.PROFESSION]}
                />

                <Input
                    name={SignUpFormKeys.FULL_NAME}
                    label="Full Name"
                    value={formValues[SignUpFormKeys.FULL_NAME]}
                    onChange={handleFormInputValues}
                    errorMessage={errorMessages[SignUpFormKeys.FULL_NAME]}
                    required
                />

                <div
                    className={cx(
                        styles.signup__side_left_mobile_input_container,
                        "flex flex-wrap gap-8"
                    )}
                >
                    <div className="flex-1">
                        <Label label="Mobile Number" required />
                        <div
                            className={cx(
                                styles.signup__side_left_mobile_input,
                                "flex flex-1"
                            )}
                            style={{ gap: 12 }}
                        >
                            <Dropdown
                                name={SignUpFormKeys.COUNTRY_CODE}
                                wrapperClassName="flex-1"
                                search
                                options={countryCodes}
                                value={formValues[SignUpFormKeys.COUNTRY_CODE]}
                                onChange={handleFormInputValues}
                                errorMessage={
                                    errorMessages[SignUpFormKeys.COUNTRY_CODE]
                                }
                                disabled
                                required
                            />

                            <Input
                                name={SignUpFormKeys.MOBILE}
                                wrapperClassName="flex-1"
                                value={formValues[SignUpFormKeys.MOBILE]}
                                onChange={handleFormInputValues}
                                errorMessage={
                                    errorMessages[SignUpFormKeys.MOBILE]
                                }
                                required
                            />
                        </div>
                    </div>

                    <Dropdown
                        name={SignUpFormKeys.GENDER}
                        label="Gender"
                        wrapperClassName="flex-1"
                        onChange={handleFormInputValues}
                        value={formValues[SignUpFormKeys.GENDER]}
                        options={GENDER_OPTIONS}
                        errorMessage={errorMessages[SignUpFormKeys.GENDER]}
                        required
                    />
                </div>

                <Input
                    name={SignUpFormKeys.EMAIL}
                    label="Email Id"
                    value={formValues[SignUpFormKeys.EMAIL]}
                    onChange={handleFormInputValues}
                    errorMessage={errorMessages[SignUpFormKeys.EMAIL]}
                />

                {/* <div
                    className={cx(
                        styles.signup__side_left_dob_input_container,
                        "flex gap-8 flex-wrap"
                    )}
                > */}
                <Input
                    name={SignUpFormKeys.REFERRAL_CODE}
                    label="Referral Code"
                    value={formValues[SignUpFormKeys.REFERRAL_CODE]}
                    onChange={handleFormInputValues}
                />
                {/* <DobInput
                        name={SignUpFormKeys.DOB}
                        label="Date of Birth"
                        value={formValues[SignUpFormKeys.DOB]}
                        required
                        onChange={(e: any) => {
                            handleFormInputValues(undefined, e);
                        }}
                        errorMessage={errorMessages[SignUpFormKeys.DOB]}
                    />

                    <Dropdown
                        name={SignUpFormKeys.EXPERIENCE}
                        wrapperClassName={cx(
                            "flex-1",
                            styles.signup__side_left_dob_input
                        )}
                        label="Since how long you are in Business"
                        options={EXPERIENCE_OPTIONS}
                        value={formValues[SignUpFormKeys.EXPERIENCE]}
                        onChange={handleFormInputValues}
                        errorMessage={errorMessages[SignUpFormKeys.EXPERIENCE]}
                        required
                    /> */}
                {/* </div> */}
            </div>
        </SignUpGenericPage>
    );
};
