/**
 * Loads a list of strings from the default apache2 directory listing.
 *
 * @private
 * @param html Html of the directory list.
 * @return List of page entries
 */
declare const parseApacheDirectoryListing: (html: string) => string[];
export { parseApacheDirectoryListing };
