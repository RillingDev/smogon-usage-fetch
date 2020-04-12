import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { FileType } from "./UrlBuilder";

const request = <TResponse>(
    url: string,
    responseType?: FileType
): Promise<AxiosResponse<TResponse>> => {
    const requestConfig: AxiosRequestConfig = {
        timeout: 10000,
    };
    if (responseType == FileType.JSON) {
        requestConfig.responseType = "json";
    } else if (responseType === FileType.TEXT) {
        requestConfig.responseType = "text";
    }
    return axios.get(url, requestConfig);
};

export { request };
