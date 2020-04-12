import { Response } from "node-fetch";
/**
 * Simple helper to throw exceptions for non-success status codes.
 *
 * @private
 * @param res Fetch Response
 * @return Fetch response.
 */
declare const checkStatus: (res: Response) => Response;
export { checkStatus };
//# sourceMappingURL=httpUtil.d.ts.map