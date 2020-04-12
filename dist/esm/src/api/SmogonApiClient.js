import { defaults } from "lodash";
import { ApiPath, FileType, UrlBuilder } from "./UrlBuilder";
import { parseFormatsPage } from "../parse/smogon/page/formats";
import { parseLeadsPage } from "../parse/smogon/page/leads";
import { parseMetagamePage } from "../parse/smogon/page/metagame";
import { parseTimeframesPage } from "../parse/smogon/page/timeframes";
import { parseUsagePage } from "../parse/smogon/page/usage";
import axios from "axios";
class SmogonApiClient {
    constructor(config = {}) {
        this.config = defaults(config, {
            customBaseUrl: null,
        });
    }
    /**
     * Loads a list of all available timeframes.
     *
     * @public
     * @return List of timeframe names.
     */
    async fetchTimeframes() {
        const url = this.createUrlBuilder().build();
        return parseTimeframesPage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads a list of all available formats for a given timeframe.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param useMonotype Optional, If monotype formats should be loaded instead of "normal" formats, defaults to false.
     * @return List of formats.
     */
    async fetchFormats(timeframe, useMonotype = false) {
        const urlBuilder = this.createUrlBuilder();
        urlBuilder.setTimeframe(timeframe);
        if (useMonotype) {
            urlBuilder.setPath(ApiPath.MONOTYPE);
        }
        const url = urlBuilder.build();
        return parseFormatsPage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads usage data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Usage data.
     */
    async fetchUsage(timeframe, format) {
        const url = this.createUrlBuilder()
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseUsagePage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads leads data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Leads data.
     */
    async fetchLeads(timeframe, format) {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.LEADS)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseLeadsPage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads metagame data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Metagame data.
     */
    async fetchMetagame(timeframe, format) {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.METAGAME)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseMetagamePage(await this.request(url, FileType.TEXT));
    }
    /**
     * Loads the chaos data for a given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Object containing chaos data.
     */
    async fetchChaos(timeframe, format) {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.CHAOS)
            .setFileType(FileType.JSON)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return await this.request(url, FileType.JSON);
    }
    /**
     * Loads moveset data for the given timeframe and format.
     *
     * This is identical to {@link fetchChaos}, as the data they contain are the same, just in different formats.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Moveset data.
     */
    async fetchMoveset(timeframe, format) {
        return this.fetchChaos(timeframe, format);
    }
    createUrlBuilder() {
        var _a;
        const urlBuilder = new UrlBuilder();
        urlBuilder.setBaseUrl((_a = this.config.customBaseUrl) !== null && _a !== void 0 ? _a : SmogonApiClient.API_BASE_URL);
        return urlBuilder;
    }
    async request(url, responseType) {
        const requestConfig = {
            timeout: 10000,
        };
        if (responseType == FileType.JSON) {
            requestConfig.responseType = "json";
        }
        else if (responseType === FileType.TEXT) {
            requestConfig.responseType = "text";
        }
        const response = await axios.get(url, requestConfig);
        return response.data;
    }
}
SmogonApiClient.API_BASE_URL = "https://www.smogon.com/stats";
export { SmogonApiClient };
//# sourceMappingURL=SmogonApiClient.js.map