import cx from "classnames";

import React, { ChangeEvent, useEffect, useState } from "react";

import { Dimmer, Loader, Modal } from "semantic-ui-react";

import { useRouter } from "next/router";

import Link from "next/link";

import { useSelector } from "react-redux";

import { ColorType, FontType, Text } from "../text";
import { Dropdown } from "../dropdown";
import { Input } from "../input";
import { useApi } from "../../hooks/useApi";
import { ToastVariant, useToast } from "../../hooks/useToast";
import { ConfigKeys } from "../../utils/types";
import { LocationState, Map, MapWrapper, Marker } from "../map";
import { Button, VariantType } from "../button";
import {
    postISProperty,
    postProperty,
    updateProperty,
    uploadPropertyImage,
} from "../../containers/builder-home/builder-service";
import { getUserDetails } from "../../store/user";

enum FormKeys {
    FE_NAME = "feName",
    LOCALITY = "locality",
    PLOT_NO = "plotNum",
    PLOT_SIZE = "plotSize",
    BEDROOMS = "bedroom",
    BATHROOMS = "bathroom",
    FACING = "facing",
    TOTAL_FLOORS = "floors",
    BUILDER_NAME = "builderName",
    BUILDER_NUMBER = "builderPhone",
    BUILDER_EMAIL = "builderEmail",
    POSSESSION = "possession",
    LAT = "lat",
    LONG = "long",
    PICTURE = "picture",
    LIFT = "lift",
    STILT = "stilt",
    BASEMENT = "Basement",
    ROAD = "road",
    SPECIALITY = "speciality",
    REMARKS = "remark",
    STATUS = "status",
    USER_ID = "userId",
}

const YesNoOptions = [
    { text: "Yes", value: "Y" },
    { text: "No", value: "N" },
];

const RoadOptions = [9, 10, 12, 18, 24, 30].map((r) => ({
    text: `${r} meter(s)`,
    value: r,
}));

const FloorOptions = [2, 3, 4, 5].map((r) => ({
    text: r,
    value: r,
}));

const SpecialityOptions = [
    { text: "Wide Road", value: "Wide Road" },
    { text: "Park Facing", value: "Park Facing" },
    { text: "Corner", value: "Corner" },
];

const PossessionStatusOptions = [
    { text: "Ready to move", value: "rtm" },
    { text: "Under construction - 2 Months to ready", value: "uc2" },
    { text: "Under construction - 6 Months to ready", value: "uc6" },
    { text: "For booking", value: "forBooking" },
];

const BedroomOptions = [
    { text: 3, value: 3 },
    { text: 4, value: 4 },
    { text: 5, value: 5 },
    { text: 6, value: 6 },
];

const BathroomOptions = [
    { text: 3, value: 3 },
    { text: 4, value: 4 },
    { text: 5, value: 5 },
    { text: 6, value: 6 },
];

export type AddPropertyFormProps = {
    className?: string;
    isAppSmith?: boolean;
    isEdit?: boolean;
};

export const AddPropertyForm: React.FC<AddPropertyFormProps> = ({
    className,
    isAppSmith = false,
    isEdit = false,
}) => {
    const [formState, setFormState] = useState<Partial<Record<FormKeys, any>>>(
        {}
    );
    const [isLoading, setLoading] = useState(false);
    const [config, setConfig] = useState<Record<ConfigKeys, any>>();
    const [isSuccess, setSuccess] = useState(false);
    const apiClient = useApi();
    const { toast, ToasterElement } = useToast({ position: "top-center" });
    const commonClasses = "mt-8";
    const router = useRouter();
    const user = useSelector(getUserDetails);
    const [isLocating, setLocating] = useState(false);

    const handleChange = (e: any, data: any) => {
        const { name, value } = data || e.target;
        if (name === "builderName" || name === "builderEmail") {
            setFormState((prev) => ({
                ...prev,
                [name]: value.toUpperCase(),
            }));
        } else {
            setFormState((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        const file = e?.target?.files?.[0];
        if (!file) return;

        reader.onload = (x) => {
            if (typeof window !== "undefined" && document) {
                window.document
                    .getElementById("#img")
                    ?.setAttribute("src", x.target?.result?.toString() || "");
            }
        };
        reader.readAsDataURL(file);
        setFormState((prev) => ({
            ...prev,
            [FormKeys.PICTURE]: file,
        }));
    };

    useEffect(() => {
        if (!router.isReady) return;

        const { draftId } = router.query;

        (async () => {
            const res = await apiClient.get({
                url: "config",
                query: { include: '["fieldAgents", "localities"]' },
            });
            if (res.isSuccessful) {
                setConfig(res.data);
            } else {
                toast({
                    message: "Unable to load data",
                    variant: ToastVariant.ERROR,
                });
            }

            if (draftId) {
                const r = await apiClient.get({
                    url: `properties/drafts/${draftId}`,
                });
                if (r.isSuccessful) setFormState(r.data);
                else await router.push({ query: null });
            }
        })();
    }, [router.isReady]);

    const resetForm = () => {
        setFormState({
            [FormKeys.FE_NAME]: null,
            [FormKeys.LOCALITY]: null,
            [FormKeys.PLOT_NO]: "",
            [FormKeys.PLOT_SIZE]: config?.plotSize[0].value,
            [FormKeys.BEDROOMS]: 3,
            [FormKeys.BATHROOMS]: 3,
            [FormKeys.FACING]: "FN",
            [FormKeys.TOTAL_FLOORS]: 2,
            [FormKeys.BUILDER_NAME]: user?._id ? user.fullName : "",
            [FormKeys.BUILDER_NUMBER]: user?._id ? user.mobileNumber : "",
            [FormKeys.BUILDER_EMAIL]: user?._id ? user.email : "",
            [FormKeys.POSSESSION]: PossessionStatusOptions[0].value,
            [FormKeys.LAT]: null,
            [FormKeys.LONG]: null,
            [FormKeys.PICTURE]: null,
            [FormKeys.LIFT]: "Y",
            [FormKeys.STILT]: "Y",
            [FormKeys.BASEMENT]: "Y",
            [FormKeys.ROAD]: 10,
            [FormKeys.SPECIALITY]: [],
            [FormKeys.REMARKS]: "",
        });
    };

    useEffect(() => {
        const { draftId } = router.query;
        if (!draftId && !isEdit) resetForm();
    }, [config]);

    useEffect(() => {
        const { id } = router.query;
        if (id)
            (async () => {
                const res = await apiClient.get({
                    url: `properties/${id}`,
                });
                if (res.isSuccessful) {
                    setFormState(res.data);
                    // resetForm();
                }
            })();
    }, []);

    const toOptions = (arr: []) =>
        arr?.map((a: any) => ({
            text: a.label,
            value: a.value,
            _id: a._id,
        }));

    const validateForm = () => {
        const isNonEmpty = (val: any) => {
            if (typeof val === "string") return val.length > 0;
            if (typeof val === "number") return true;
            if (Array.isArray(val)) return val.length > 0;
            return false;
        };
        const areNonEmpty = (...args: any[]) => args.every(isNonEmpty);

        return !!(
            areNonEmpty(
                formState[FormKeys.LOCALITY],
                formState[FormKeys.PLOT_SIZE],
                formState[FormKeys.BEDROOMS],
                formState[FormKeys.BATHROOMS],
                formState[FormKeys.FACING],
                formState[FormKeys.TOTAL_FLOORS],
                formState[FormKeys.BUILDER_NAME],
                formState[FormKeys.POSSESSION],
                formState[FormKeys.LAT],
                formState[FormKeys.LONG],
                formState[FormKeys.LIFT],
                formState[FormKeys.STILT],
                formState[FormKeys.BASEMENT],
                formState[FormKeys.ROAD]
            ) &&
            formState[FormKeys.PICTURE] &&
            formState[FormKeys.BUILDER_NUMBER]?.length === 10 &&
            (user?._id ? true : formState[FormKeys.FE_NAME])
        );
    };

    const resize = async (file: File) =>
        new Promise((res) => {
            try {
                const max = 3840;
                const img = window.document.getElementById(
                    "#img"
                ) as HTMLImageElement;
                let desiredWidth;
                let desiredHeight;
                const { naturalWidth, naturalHeight } = img;

                if (naturalWidth > naturalHeight) {
                    // landscape
                    if (naturalWidth > max) {
                        desiredWidth = max;
                        desiredHeight =
                            (desiredWidth * naturalHeight) / naturalWidth;
                    } else {
                        desiredWidth = naturalWidth;
                        desiredHeight = naturalHeight;
                    }
                } else {
                    // eslint-disable-next-line no-lonely-if
                    if (naturalHeight > max) {
                        desiredHeight = max;
                        desiredWidth =
                            (desiredHeight * naturalWidth) / naturalHeight;
                    } else {
                        desiredWidth = naturalWidth;
                        desiredHeight = naturalHeight;
                    }
                }

                const canvas = document.createElement("canvas");
                canvas.width = desiredWidth;
                canvas.height = desiredHeight;
                const ctx = canvas.getContext("2d");
                if (ctx) {
                    ctx.drawImage(img, 0, 0, desiredWidth, desiredHeight);
                    canvas.toBlob(
                        (blob) => {
                            if (blob) {
                                res(new File([blob], `${file.name}.jpeg`));
                            } else {
                                res(file);
                            }
                        },
                        "image/jpeg",
                        0.9
                    );
                } else {
                    res(file);
                }
            } catch (e) {
                res(file);
            }
        });

    const uploadImage = async () => {
        let file = formState[FormKeys.PICTURE];

        if (file?.name) {
            file = await resize(file);
            setLoading(true);
            const formData = new FormData();
            formData.append("image", file);
            const res = await uploadPropertyImage(formData);
            setLoading(false);
            if (res.data.filename) return res.data.filename;

            toast({
                message: "Unable to get uploaded image data",
                variant: ToastVariant.ERROR,
            });
            return null;
        }

        if (typeof file === "string") return file;
        return null;
    };

    const saveAsDraft = async () => {
        const { draftId } = router.query;
        const image = await uploadImage();

        if (!formState[FormKeys.FE_NAME]) {
            return toast({
                message: "Please select field boy name",
                variant: ToastVariant.ERROR,
            });
        }

        setLoading(true);
        const reqBody = {
            ...formState,
            picture: image,
        };
        let res;
        if (draftId) {
            res = await apiClient.update({
                url: `properties/drafts/${draftId}`,
                body: reqBody,
            });
        } else {
            res = await apiClient.post({
                url: "properties/drafts",
                body: reqBody,
            });
        }

        if (res.isSuccessful) {
            toast({
                message: "Draft added successfully",
                variant: ToastVariant.SUCCESS,
            });
            resetForm();
            setSuccess(true);
        } else {
            toast({
                message: "Unable to add draft",
                variant: ToastVariant.ERROR,
            });
        }
        setLoading(false);
    };

    const submit = async () => {
        const { draftId } = router.query;
        const isValid = validateForm();
        if (!isValid) return;

        setLoading(true);
        const uploaded = await uploadImage();
        if (!uploaded) {
            toast({
                message: "Unable to upload image/ No image selected",
                variant: ToastVariant.ERROR,
            });
            setLoading(false);
            return;
        }

        const reqBody = {
            ...formState,
            [FormKeys.PICTURE]: uploaded,
            [FormKeys.USER_ID]: user?._id,
            draftId,
        };

        if (!isEdit) {
            const res = isAppSmith
                ? await postISProperty(reqBody)
                : await postProperty(reqBody);
            if (res.isSuccessful) {
                toast({
                    message: "Property added successfully",
                    variant: ToastVariant.SUCCESS,
                });
                resetForm();
                setSuccess(true);
            } else {
                toast({
                    message: "Unable to submit. Please try again",
                    variant: ToastVariant.ERROR,
                });
            }
        } else {
            const res = await updateProperty(
                reqBody,
                router.query.id as string
            );
            if (res.isSuccessful) {
                toast({
                    message: "Property edited successfully",
                    variant: ToastVariant.SUCCESS,
                });
                router.back();
            } else {
                toast({
                    message: "Unable to Edit. Please try again",
                    variant: ToastVariant.ERROR,
                });
            }
        }

        setLoading(false);
    };

    return (
        <div className={className}>
            <Text font={FontType.HEADING_L} weight={500}>
                {isEdit ? "Edit" : "Add"} property
            </Text>
            <form
                className="mt-8 flex flex-col"
                /* eslint-disable-next-line no-script-url */
                action="javascript:void(0);"
                onSubmit={() => {
                    submit();
                }}
            >
                {!user?._id && (
                    <Dropdown
                        required
                        name={FormKeys.FE_NAME}
                        value={formState[FormKeys.FE_NAME]}
                        label="Field boy"
                        placeholder="Select option"
                        options={toOptions(config?.[ConfigKeys.FIELD_AGENTS])}
                        onChange={handleChange}
                        wrapperClassName={commonClasses}
                    />
                )}
                <Dropdown
                    search
                    required
                    name={FormKeys.LOCALITY}
                    value={formState[FormKeys.LOCALITY]}
                    label="Locality"
                    placeholder="Select option"
                    options={toOptions(config?.[ConfigKeys.LOCALITY])}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Input
                    name={FormKeys.PLOT_NO}
                    label="Plot No."
                    required
                    value={formState[FormKeys.PLOT_NO]}
                    onChange={handleChange}
                    placeholder="Enter plot no."
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.PLOT_SIZE}
                    value={formState[FormKeys.PLOT_SIZE]}
                    label="Plot Size"
                    placeholder="Select option"
                    options={toOptions(config?.[ConfigKeys.PLOT_SIZE])}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.BEDROOMS}
                    value={formState[FormKeys.BEDROOMS]}
                    label="No. of Bedrooms"
                    placeholder="Select option"
                    options={BedroomOptions}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.BATHROOMS}
                    value={formState[FormKeys.BATHROOMS]}
                    label="No. of Bathrooms"
                    placeholder="Select option"
                    options={BathroomOptions}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.FACING}
                    value={formState[FormKeys.FACING]}
                    label="Facing"
                    placeholder="Select option"
                    options={toOptions(config?.[ConfigKeys.FACING])}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.TOTAL_FLOORS}
                    value={formState[FormKeys.TOTAL_FLOORS]}
                    label="Total no. of Floors"
                    placeholder="Select option"
                    options={FloorOptions}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Input
                    required
                    name={FormKeys.BUILDER_NAME}
                    label="Builder Name"
                    value={formState[FormKeys.BUILDER_NAME]}
                    onChange={handleChange}
                    disabled={user?._id}
                    placeholder="Enter builder name"
                    wrapperClassName={commonClasses}
                />
                <Input
                    required
                    name={FormKeys.BUILDER_NUMBER}
                    disabled={user?._id}
                    label="Builder Number"
                    pattern="[0-9]{10}"
                    value={formState[FormKeys.BUILDER_NUMBER]}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const val = e.target.value;
                        if (val.length <= 10) handleChange(e, undefined);
                    }}
                    type="number"
                    placeholder="Enter builder mobile"
                    wrapperClassName={commonClasses}
                />
                <Input
                    name={FormKeys.BUILDER_EMAIL}
                    disabled={user?._id}
                    label="Builder Email"
                    value={formState[FormKeys.BUILDER_EMAIL]}
                    onChange={handleChange}
                    placeholder="Enter builder email"
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.POSSESSION}
                    value={formState[FormKeys.POSSESSION]}
                    label="Possession status"
                    placeholder="Select option"
                    options={PossessionStatusOptions}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <MapWrapper>
                    {isLocating && (
                        <div>
                            <Loader active>
                                <Text font={FontType.HEADING_S}>
                                    Fetching Location
                                </Text>
                            </Loader>
                        </div>
                    )}
                    <Map
                        className={cx("w-full h-[320px] mt-5", commonClasses)}
                        disableDefaultUI={false}
                        draggable
                        scaleControl
                        streetViewControl={false}
                        mapTypeControl={false}
                        keyboardShortcuts={false}
                        onClick={(lat, lng) => {
                            setFormState((prev) => ({
                                ...prev,
                                [FormKeys.LAT]: lat,
                                [FormKeys.LONG]: lng,
                            }));
                        }}
                        locationCallbacks={(s) => {
                            // eslint-disable-next-line default-case
                            switch (s) {
                                case LocationState.FETCHING:
                                    setLocating(true);
                                    break;
                                case LocationState.SUCCESS:
                                    setLocating(false);
                                    break;
                                case LocationState.FAILED:
                                    setLocating(false);
                                    toast({
                                        message:
                                            "Unable to get Location, please try again",
                                        variant: ToastVariant.ERROR,
                                    });
                                    break;
                                case LocationState.UNSUPPORTED:
                                    setLocating(false);
                                    toast({
                                        message: "GPS not supported by browser",
                                        variant: ToastVariant.ERROR,
                                    });
                                    break;
                            }
                        }}
                    >
                        {formState[FormKeys.LAT] && formState[FormKeys.LONG] && (
                            <Marker
                                position={{
                                    lat: formState[FormKeys.LAT],
                                    lng: formState[FormKeys.LONG],
                                }}
                            />
                        )}
                    </Map>
                </MapWrapper>
                <div
                    className={cx(
                        "max-w-sm mx-auto h-auto mt-8",
                        commonClasses
                    )}
                >
                    {formState[FormKeys.PICTURE] && (
                        <img
                            id="#img"
                            src={`https://terragi.s3.ap-south-1.amazonaws.com/images/${
                                formState[FormKeys.PICTURE]
                            }`}
                        />
                    )}
                </div>
                <Input
                    required={!formState[FormKeys.PICTURE]}
                    name={FormKeys.PICTURE}
                    label="Picture"
                    placeholder="Upload Image"
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.LIFT}
                    value={formState[FormKeys.LIFT]}
                    label="Lift"
                    placeholder="Select option"
                    options={YesNoOptions}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.STILT}
                    value={formState[FormKeys.STILT]}
                    label="Stilt"
                    placeholder="Select option"
                    options={YesNoOptions}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.BASEMENT}
                    value={formState[FormKeys.BASEMENT]}
                    label="Basement"
                    placeholder="Select option"
                    options={YesNoOptions}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    required
                    name={FormKeys.ROAD}
                    value={formState[FormKeys.ROAD]}
                    label="Road"
                    placeholder="Select option"
                    options={RoadOptions}
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />
                <Dropdown
                    name={FormKeys.SPECIALITY}
                    label="Speciality"
                    multiple
                    placeholder="Select option"
                    options={SpecialityOptions}
                    onChange={handleChange}
                    value={formState[FormKeys.SPECIALITY]}
                    wrapperClassName={commonClasses}
                />
                <Input
                    name={FormKeys.REMARKS}
                    value={formState[FormKeys.REMARKS]}
                    label="Any special remarks"
                    placeholder="Any special remarks"
                    onChange={handleChange}
                    wrapperClassName={commonClasses}
                />

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4 sm:gap-24">
                    {isEdit && (
                        <Button
                            className="flex-1"
                            type="button"
                            onClick={() => router.back()}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        className="flex-1"
                        type="button"
                        onClick={() => {
                            resetForm();
                        }}
                    >
                        Reset
                    </Button>
                    {!user?._id && (
                        <Button
                            variant={VariantType.OUTLINED}
                            onClick={saveAsDraft}
                            className="flex-1"
                            type="button"
                        >
                            Save as draft
                        </Button>
                    )}
                    <Button
                        disabled={!validateForm()}
                        className="flex-1"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>

            <ToasterElement />
            <Modal
                open={isLoading}
                closeOnDimmerClick={false}
                closeOnEscape={false}
                closeIcon={null}
            >
                <Dimmer active page={false}>
                    <Loader
                        size="massive"
                        inline
                        content={
                            <Text
                                font={FontType.HEADING_L}
                                color={ColorType.WHITE}
                                weight={500}
                            >
                                Saving...
                            </Text>
                        }
                    />
                </Dimmer>
            </Modal>
            <Modal
                open={isSuccess}
                className="p-10"
                closeOnDimmerClick={false}
                closeOnEscape={false}
                closeIcon={null}
            >
                <Text
                    className="mx-auto flex  justify-center mt-8"
                    font={FontType.HEADING_S}
                >
                    {!isAppSmith &&
                        !isEdit &&
                        "Your property details have been uploaded successfully. Our Inventory Manager will get in touch with you to confirm the floor's availability and prices. Thank you."}
                    {(isAppSmith || isEdit) && "Saved successfully"}
                </Text>
                <div className="flex mt-24 gap-5 justify-center">
                    <Button
                        variant={VariantType.OUTLINED}
                        onClick={() => {
                            setSuccess(false);
                            router.push({ query: null }, undefined, {
                                shallow: true,
                            });
                        }}
                        type="button"
                    >
                        OK
                    </Button>
                    {!user?._id && (
                        <Link href="https://im.terragi.in/app/inventory-specialist/view-draft-data-628e5fb132292b76809f270f">
                            <Button type="button">Go to drafts</Button>
                        </Link>
                    )}
                </div>
            </Modal>
        </div>
    );
};
