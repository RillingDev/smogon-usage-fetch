import { AxiosResponse } from "axios";
import { FileType } from "./UrlBuilder";
declare const request: <TResponse>(url: string, responseType?: FileType | undefined) => Promise<AxiosResponse<TResponse>>;
export { request };
//# sourceMappingURL=request.d.ts.map