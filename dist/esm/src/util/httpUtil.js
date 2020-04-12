/**
 * Simple helper to throw exceptions for non-success status codes.
 *
 * @private
 * @param res Fetch Response
 * @return Fetch response.
 */
const checkStatus = (res) => {
    if (!res.ok) {
        throw new Error(`Error while fetching '${res.url}': ${res.statusText} (${res.status}).`);
    }
    return res;
};
export { checkStatus };
//# sourceMappingURL=httpUtil.js.map