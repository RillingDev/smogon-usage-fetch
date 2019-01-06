/**
 * Loads a list of all available formats for a given timeframe.
 *
 * @public
 * @return List of format names.
 */
declare const fetchFormats: (timeframe: string) => Promise<string[]>;
export { fetchFormats };
