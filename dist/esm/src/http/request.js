import axios from "axios";
import { FileType } from "./UrlBuilder";
const request = (url, responseType) => {
    const requestConfig = {
        timeout: 10000,
    };
    if (responseType == FileType.JSON) {
        requestConfig.responseType = "json";
    }
    else if (responseType === FileType.TEXT) {
        requestConfig.responseType = "text";
    }
    return axios.get(url, requestConfig);
};
export { request };
//# sourceMappingURL=request.js.map