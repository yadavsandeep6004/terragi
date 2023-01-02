/* eslint-disable no-underscore-dangle */
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import cx from "classnames";

import { useApi } from "../../hooks/useApi";
import { getFilterConfigs, isConfigsFetched } from "../../store/properties";
import { CreateLead } from "./create-lead";
import { CreateFormKeys, CreateLeadFormType } from "./create-lead/types";
import { IntegrateLeadModal as IntegrateLead } from "./integrate-leads/integrate-leads";
import { ColorType, FontType, Text } from "../../components/text";
import {
    IntegrateFormType,
    IntegrateLeadKeys,
    LeadType,
} from "./integrate-leads/types";
import { NoLeadsCards } from "./no-leads";
import { getLeads } from "../../services/leadService";
import styles from "./styles.module.scss";
import LinkIcon from "../../assets/icon/link.svg";
import PlusIcon from "../../assets/icon/plus.svg";
import { ConfigKeysType } from "../../utils/types";
import {
    CONNECT_99ACRES,
    CREATE_LEAD,
    DELETE_LEAD,
    GET_LEADS,
    UPDATE_LEAD,
} from "../../api/url";
import {
    CONFIGS_INITIAL_STATE,
    MOBILE_PHONE_REGEX,
} from "../../utils/constants";
import { LeadCardPropType, LeadsCard } from "../../components/leads-card";
import { Loader } from "../../components/loader";
import { ToastVariant, useToast } from "../../hooks/useToast";
import { SortBy } from "../home-section/sortby-container";

const initialLeadFormState: CreateLeadFormType = {
    [CreateFormKeys.BUDGET_MIN]: 1,
    [CreateFormKeys.BUDGET_MAX]: 250000000,
    [CreateFormKeys.BHK_TYPE]: [],
    [CreateFormKeys.LEAD_SOURCE]: "Facebook",
    [CreateFormKeys.NAME]: "",
    [CreateFormKeys.LOCALITY]: [],
    [CreateFormKeys.PROPERTY_TYPE]: "",
    [CreateFormKeys.MOBILE]: "",
};

const initialIntegrateormState: IntegrateFormType = {
    [IntegrateLeadKeys.PLATFORM_TYPE]: LeadType.MAGICBRICKS,
    [IntegrateLeadKeys.EMAIL]: "",
    [IntegrateLeadKeys.PASSWORD]: "",
};

export const Leads = () => {
    const [leadFormValues, setLeadFormValues] = useState(initialLeadFormState);
    const [integrateFormValues, setIntegrateFormValues] = useState(
        initialIntegrateormState
    );
    const [isConnectOpen, setConnectOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [leadsModalOpenStatus, setLeadsModalStatus] = useState(false);
    const [totalPages, setTotalPages] = useState(10);
    const [isLeadInEditMode, setEditMode] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingAtMount, setIsLoadingAtMount] = useState(true);
    const [configs, setConfigs] = useState<ConfigKeysType>(
        CONFIGS_INITIAL_STATE
    );
    const [errorMessages, setErrorMessages] = useState<any>({});
    const [currentPage, setCurrentPage] = useState(1);
    const [leadsData, setLeadsData] = useState<any>([]);
    const [lastElement, setLastElement] = useState(null);
    const [totalDocs, setTotalDocs] = useState(0);
    const [totalOriginalDocs, setTotalOriginalDocs] = useState(false);
    const pageSize = 10;

    const router = useRouter();
    const configsFetched = useSelector(isConfigsFetched);
    const createLeadsConfig = useSelector(getFilterConfigs);
    const clientApi = useApi();
    const { ToasterElement, toast } = useToast();

    const addQueryToPath = (query = {}) => {
        router.query = {
            page: "1",
            pageSize: "10",
            ...query,
        };

        router.push(router, undefined, { shallow: true, scroll: false });
    };

    const observer = useRef(
        new IntersectionObserver((entries) => {
            const first = entries[0];
            if (first.isIntersecting) {
                setCurrentPage((p) => p + 1);
            }
        })
    );

    const handleFormInputValuesForCreateForm = (e?: any, e2?: any) => {
        const rightEvent = e2 || e.target;
        const { name } = rightEvent;
        const { value } = rightEvent;

        if (name === "budget") {
            setLeadFormValues((p) => ({
                ...p,
                [CreateFormKeys.BUDGET_MAX]: value[1],
                [CreateFormKeys.BUDGET_MIN]: value[0],
            }));
        } else {
            setLeadFormValues((p) => ({ ...p, [name]: value }));
        }
    };

    const handleFormInputValuesForConnectForm = (e?: any, e2?: any) => {
        const rightEvent = e2 || e.target;
        const { name } = rightEvent;
        const { value } = rightEvent;
        setIntegrateFormValues((p) => ({ ...p, [name]: value }));
    };

    const onCreateLeadClose = () => {
        setLeadsModalStatus(false);
        setLeadFormValues(initialLeadFormState);
        setEditMode(null);
    };

    const onCreateLeadOpen = () => {
        setLeadsModalStatus(true);
    };

    const onConnectLeadOpen = () => {
        setConnectOpen(true);
    };

    const onConnectLeadClose = () => {
        setConnectOpen(false);
        setIntegrateFormValues(initialIntegrateormState);
    };

    const getLeadsList = async () => {
        setIsLoading(true);
        const res = await getLeads(router.query);

        if (res.isSuccessful) {
            const totalPagesCalculated = Math.ceil(
                res.data.totalDocs / pageSize
            );

            const activePage = +(router.query.page || 1);
            setTotalDocs(res.data.totalDocs);
            const getAllLeadsData = new Set([
                ...(activePage === 1 ? [] : leadsData),
                ...res.data.docs,
            ]);
            setLeadsData([...getAllLeadsData]);
            setTotalPages(totalPagesCalculated);
            if (res.data.docs.length > 0) setTotalOriginalDocs(true);
        }

        setIsLoading(false);
        return res;
    };

    const handleValidation = () => {
        let flag = true;
        const errorMessage: any = {};
        if (leadFormValues[CreateFormKeys.NAME] === "") {
            errorMessage[CreateFormKeys.NAME] = "Name can't be empty.";
            flag = false;
        }

        if (!MOBILE_PHONE_REGEX.test(leadFormValues[CreateFormKeys.MOBILE])) {
            errorMessage[CreateFormKeys.MOBILE] =
                "Please enter a valid phone number.";
            flag = false;
        }

        setErrorMessages(errorMessage);
        return flag;
    };

    const onCreateEditLead = async (e: any) => {
        e.preventDefault();

        if (!handleValidation()) return;

        setIsSubmitting(true);
        let response;
        const body = { ...leadFormValues };

        body[CreateFormKeys.BUDGET_MAX] =
            +leadFormValues[CreateFormKeys.BUDGET_MAX];

        body[CreateFormKeys.BUDGET_MIN] =
            +leadFormValues[CreateFormKeys.BUDGET_MIN];

        if (isLeadInEditMode !== null) {
            response = await clientApi.update({
                url: `${UPDATE_LEAD}/${isLeadInEditMode}`,
                body: { ...body, status: "ACTIVE" },
            });
        } else {
            response = await clientApi.post({
                url: CREATE_LEAD,
                body: { ...body, status: "ACTIVE" },
            });
        }

        if (response.isSuccessful) {
            addQueryToPath({ page: 1 });
            onCreateLeadClose();
        } else {
            toast({ variant: ToastVariant.ERROR, message: response.message });
        }

        setIsSubmitting(false);
    };

    const onDeleteLead = async (id: string) => {
        const response = await clientApi.delete({
            url: `${DELETE_LEAD}/${id}`,
        });

        if (response.isSuccessful) {
            addQueryToPath({ page: 1 });
        } else {
            console.log("Lead creation failed");
        }
    };

    const onEditLeadOpen = (d: CreateLeadFormType & { _id: string }) => {
        setEditMode(d._id);
        setLeadFormValues({
            ...d,
            [CreateFormKeys.MOBILE]: d[CreateFormKeys.MOBILE]?.slice(-10) || "",
        });
        onCreateLeadOpen();
    };

    const onConnectLead = async (
        platform: string,
        username: string,
        password: string
    ) => {
        const response = await clientApi.post({
            url: CONNECT_99ACRES,
            body: {
                platform,
                username,
                password,
            },
        });

        if (response.isSuccessful) {
            addQueryToPath({ page: "1", pageSize: "10" });
            toast({
                variant: ToastVariant.SUCCESS,
                message: "Leads Integrated",
            });
            setConnectOpen(false);
        }
    };

    const onWon = async (leadId: string, name: string) => {
        const response = await clientApi.update({
            url: `${GET_LEADS}/${leadId}`,
            body: {
                status: "WON",
                name,
            },
        });

        if (response) {
            toast({
                message: "Lead won successfully",
                variant: ToastVariant.SUCCESS,
            });
        }
    };

    const onLost = async (leadId: string, name: string) => {
        const response = await clientApi.update({
            url: `${GET_LEADS}/${leadId}`,
            body: {
                status: "LOST",
                name,
            },
        });

        if (response) {
            toast({
                message: "Lead lost successfully",
                variant: ToastVariant.SUCCESS,
            });
        }
    };

    const sortLeadList = (_: any, { value }: { value: string }) => {
        addQueryToPath({ status: value, page: 1, pageSize: 10 });
    };

    useEffect(() => {
        if (configsFetched) {
            setConfigs(createLeadsConfig);
            setLeadFormValues((p) => ({
                ...p,
                [CreateFormKeys.BUDGET_MAX]: 1000000000,
                [CreateFormKeys.BUDGET_MIN]: 0,
            }));
        }
    }, [createLeadsConfig, configsFetched]);

    useEffect(() => {
        (async () => {
            await getLeadsList();
            setIsLoadingAtMount(false);
        })();
    }, [router]);

    useEffect(() => {
        if (+(router.query.page || 0) !== currentPage) {
            addQueryToPath({
                ...router.query,
                page: currentPage,
            });
        }
    }, [currentPage]);

    useEffect(() => {
        const currentElement = lastElement;
        const currentObserver = observer.current;

        if (currentElement) {
            currentObserver.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                currentObserver.unobserve(currentElement);
            }
        };
    }, [lastElement]);

    if (isLoadingAtMount) return <Loader />;

    const defaultValueForSort = router.query.status || "ACTIVE";

    return (
        <>
            <div className={cx(styles.main_noleads, "pb-[36px]")}>
                <div className="md:p-10 p-4 h-full">
                    <div className="flex justify-between items-end mb-5 pt-1">
                        <Text weight={500} font={FontType.HEADING_M}>
                            Leads ({totalDocs})
                        </Text>
                        {!!totalDocs && (
                            <div className="flex">
                                <div className="flex items-center mr-6">
                                    <LinkIcon
                                        width="16"
                                        height="12"
                                        className="mr-1"
                                    />
                                    <Text
                                        className="cursor-pointer"
                                        color={ColorType.PRIMARY}
                                        onClick={onConnectLeadOpen}
                                    >
                                        Connect
                                    </Text>
                                </div>
                                <div className="flex items-center">
                                    <PlusIcon
                                        width="16"
                                        height="12"
                                        className="mr-1"
                                    />
                                    <Text
                                        className="cursor-pointer"
                                        color={ColorType.PRIMARY}
                                        onClick={onCreateLeadOpen}
                                    >
                                        Create Lead
                                    </Text>
                                </div>
                            </div>
                        )}
                    </div>

                    {totalOriginalDocs && (
                        <div className="ml-auto">
                            <SortBy
                                options={[
                                    { key: 1, value: "ACTIVE", text: "Active" },
                                    { key: 2, value: "WON", text: "Won" },
                                    { key: 3, value: "LOST", text: "Lost" },
                                ]}
                                onChange={sortLeadList}
                                defaultValue={defaultValueForSort as string}
                            />
                        </div>
                    )}

                    {totalOriginalDocs ? (
                        <div className="flex flex-col gap-[16px]">
                            {leadsData?.map((doc: LeadCardPropType["data"]) => (
                                <LeadsCard
                                    key={doc._id}
                                    data={doc}
                                    onEditLead={onEditLeadOpen}
                                    onDeleteLead={onDeleteLead}
                                    onLost={onLost}
                                    onWon={onWon}
                                />
                            ))}

                            {currentPage < totalPages && (
                                <div ref={setLastElement as any} />
                            )}
                            {isLoading && <Loader />}
                        </div>
                    ) : (
                        <NoLeadsCards
                            onConnectLeadOpen={onConnectLeadOpen}
                            onCreateLeadOpen={onCreateLeadOpen}
                        />
                    )}

                    <CreateLead
                        isEditMode={isLeadInEditMode}
                        leadFormValues={leadFormValues}
                        searchResults={configs}
                        onSubmit={onCreateEditLead}
                        onChange={handleFormInputValuesForCreateForm}
                        isOpen={leadsModalOpenStatus}
                        onClose={onCreateLeadClose}
                        isLoading={isSubmitting}
                        onSearchingQuery={() => {}}
                        errorMessages={errorMessages}
                    />

                    <IntegrateLead
                        isOpen={isConnectOpen}
                        formValues={integrateFormValues}
                        onSubmit={onConnectLead}
                        onChange={handleFormInputValuesForConnectForm}
                        onClose={onConnectLeadClose}
                    />
                </div>
            </div>
            <ToasterElement />
        </>
    );
};
