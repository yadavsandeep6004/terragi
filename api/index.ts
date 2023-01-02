import axios, { AxiosInstance } from "axios";

import store from "../store";
import { logoutSuccess } from "../store/user";

import { BASE_URL } from "./url";

type PostParams<T> = {
    url: string;
    query?: Record<string, any>;
    body?: T;
};

type GetParams = {
    url: string;
    query?: Record<string, any>;
};

type UpdateParams<T> = {
    url: string;
    query?: Record<string, any>;
    body?: T;
};

type DeleteParams = {
    url: string;
    query?: Record<string, any>;
};

export type BaseResponse<T> = {
    code: number;
    message: string;
    isSuccessful: boolean;
    data: T;
};

interface HttpClient {
    get: <R = any>(params: GetParams) => Promise<BaseResponse<R>>;
    post: <T = any, R = any>(params: PostParams<T>) => Promise<BaseResponse<R>>;
    update: <T = any, R = any>(
        params: UpdateParams<T>
    ) => Promise<BaseResponse<R>>;
    delete: <R = any>(params: DeleteParams) => Promise<BaseResponse<R>>;
}

export class AxiosClient implements HttpClient {
    private readonly client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: BASE_URL,
            timeout: 30000,
            headers: {
                Authorization: "",
            },
        });

        this.client.interceptors.request.use((value) => {
            const token = localStorage.getItem("token");
            const basicAuth = `Basic ${btoa(
                `${process.env.NEXT_PUBLIC_BASIC_USER}:${process.env.NEXT_PUBLIC_BASIC_PASS}`
            )}`;
            value.headers = {
                Authorization: token || basicAuth,
                Basic: basicAuth,
            };
            return value;
        });
    }

    static createInstance() {
        return new AxiosClient();
    }

    async get<R = any>(params: GetParams): Promise<BaseResponse<R>> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (res) => {
            let response: BaseResponse<R>;

            try {
                let r;
                if (params.query)
                    r = await this.client.get(params.url, {
                        params: params.query,
                    });
                else {
                    r = await this.client.get(params.url);
                }

                response = {
                    data: r.data.data,
                    code: r.data.code,
                    message: r.data.message,
                    isSuccessful: true,
                };
            } catch (e: any) {
                response = {
                    data: {} as R,
                    code: e.response.data?.code || 500,
                    message: e.response.data?.message || "Something went wrong",
                    isSuccessful: false,
                };
            }
            res(response);
        });
    }

    async post<T = any, R = any>(
        params: PostParams<T>
    ): Promise<BaseResponse<R>> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (res) => {
            let response: BaseResponse<R>;

            try {
                const r = await this.client.post(params.url, params.body, {
                    params: params.query,
                });

                response = {
                    data: r.data.data,
                    code: r.data.code,
                    message: r.data.message,
                    isSuccessful: true,
                };
            } catch (e: any) {
                if (e.response.status === 403) {
                    store.dispatch(logoutSuccess());
                    window.location.replace("/");
                }

                response = {
                    data: {} as R,
                    code: e.response.data?.code || 500,
                    message: e.response.data?.message || "Something went wrong",
                    isSuccessful: false,
                };
            }
            res(response);
        });
    }

    async delete<R = any>(params: DeleteParams): Promise<BaseResponse<R>> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (res) => {
            let response: BaseResponse<R>;

            try {
                const r = await this.client.delete(params.url, {
                    params: params.query,
                });

                response = {
                    data: r.data.data,
                    code: r.data.code,
                    message: r.data.message,
                    isSuccessful: true,
                };
            } catch (e: any) {
                response = {
                    data: {} as R,
                    code: e.response.data?.code || 500,
                    message: e.response.data?.message || "Something went wrong",
                    isSuccessful: false,
                };
            }
            res(response);
        });
    }

    update<T = any, R = any>(
        params: UpdateParams<T>
    ): Promise<BaseResponse<R>> {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (res) => {
            let response: BaseResponse<R>;

            try {
                const r = await this.client.put(params.url, params.body, {
                    params: params.query,
                });

                response = {
                    data: r.data.data,
                    code: r.data.code,
                    message: r.data.message,
                    isSuccessful: true,
                };
            } catch (e: any) {
                response = {
                    data: {} as R,
                    code: e.response.data?.code || 500,
                    message: e.response.data?.message || "Something went wrong",
                    isSuccessful: false,
                };
            }
            res(response);
        });
    }
}

export default HttpClient;
