import { Response } from "node-fetch";

/**
 * Off-brand path.join().
 *
 * @private
 * @param args URL paths to join.
 * @return Joined URL.
 */
const urlJoin = (...args: string[]): string => args.join("/");

/**
 * Simple helper to throw exceptions for non-success status codes.
 *
 * @private
 * @param res Fetch Response
 * @return Fetch response.
 */
const checkStatus = (res: Response): Response => {
    if (!res.ok) {
        throw new Error(
            `Error while fetching '${res.url}': ${res.statusText} (${
                res.status
            }).`
        );
    }

    return res;
};

export { urlJoin, checkStatus };
