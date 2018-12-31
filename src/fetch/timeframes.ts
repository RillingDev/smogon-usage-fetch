import fetch from "node-fetch";
import { STAT_URL } from "../constants";
import { parseList } from "../parse/list";

/**
 * Loads a list of all available timeframes.
 *
 * @return List of timeframe names.
 */
const fetchTimeframes = (): Promise<string[]> =>
    fetch(STAT_URL)
        .then(res => res.text())
        .then(parseList);

export { fetchTimeframes };
