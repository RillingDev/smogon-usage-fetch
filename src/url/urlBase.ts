import { urlJoin } from "../util/httpUtil";

const URL_BASE = "https://www.smogon.com";
const URL_PATH_STATS = "stats";
const DEFAULT_BASE_URL = urlJoin(URL_BASE, URL_PATH_STATS);

export { URL_BASE, URL_PATH_STATS, DEFAULT_BASE_URL };
