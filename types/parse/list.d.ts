/**
 * Loads a list of strings from the default apache2 directory listing.
 *
 * @param html Html of the directory list.
 * @return List of page entries
 */
declare const parseList: (html: string) => string[];
export { parseList };
