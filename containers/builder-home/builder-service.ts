import { useApi } from "../../hooks/useApi";

const api = useApi();
export const uploadPropertyImage = (body: any) => {
    return api.post({ url: "properties/image/upload", body });
};

export const postProperty = (body: any) => {
    return api.post({ url: "properties", body });
};

export const postISProperty = (body: any) => {
    return api.post({ url: "properties/fieldBoy", body });
};

export const updateProperty = (body : any ,id : string ) => {
    return api.update({ url: `properties/${id}`, body })
}; 
