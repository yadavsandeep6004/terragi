import { NextPage } from "next";

import { useEffect, useState } from "react";

import { Layout } from "../../components/layout";
import { useApi } from "../../hooks/useApi";
import { withAuth } from "../../hoc/withAuth";
import { ToastVariant, useToast } from "../../hooks/useToast";
import {
    PropertiesCard,
    PropertiesCardDataKeys,
} from "../../components/properties-card";
import { EmptyResults } from "../../components/empty-results";

const Builder: NextPage = () => {
    const api = useApi();
    const [data, setData] = useState<Record<PropertiesCardDataKeys, any>[]>([]);
    // console.log("state ----->",data);
    const { toast, ToasterElement } = useToast();
    // const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            // setLoading(true);
            const res = await api.get({ url: "/properties/me" });
            if (res.isSuccessful && res.data) {
                setData(res.data);
            } else {
                toast({
                    message: "Unable to fetch data",
                    variant: ToastVariant.ERROR,
                });
            }
            // setLoading(false);
        })();
    }, []);

    return (
        <Layout>
            {data.length === 0 ? (
                <>
                    <EmptyResults title="Please add your properties" />
                </>
            ) : (
                <div>
                    {data.map((e) => (
                        <div key={e._id}>
                            <div className="mt-5 mx-8">
                                <PropertiesCard
                                    data={e}
                                    showStatus
                                    builder
                                    showViews={false}
                                    showViewNumber={false}
                                    viewNumberModalHandler={() => {}}
                                    onClickMarkAsSold={async () => {
                                        // api call code
                                        const res = await api.post({
                                            url: `properties/${e._id}/status`,
                                        });
                                        if (!res.isSuccessful) {
                                            toast({
                                                message: res.message,
                                                variant: ToastVariant.ERROR,
                                            });
                                            return;
                                        }
                                        setData((prevState) => {
                                            const element = prevState.find(
                                                (elem) => elem._id === e._id
                                            );
                                            if (element) {
                                                element.status = 3;
                                            }
                                            return [...prevState];
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    ))}

                    <ToasterElement />
                </div>
            )}
        </Layout>
    );
};

export default withAuth(Builder);
