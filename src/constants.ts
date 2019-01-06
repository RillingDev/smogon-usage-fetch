import { urlJoin } from "./util/httpUtil";

const URL_BASE = "http://www.smogon.com";
const URL_PATH_STATS = "stats";

const URL_STATS = urlJoin(URL_BASE, URL_PATH_STATS);

export { URL_BASE, URL_PATH_STATS, URL_STATS };
