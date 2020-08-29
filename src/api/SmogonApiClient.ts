import { defaults } from "lodash";
import { Timeframe } from "../parse/smogon/timeframe";
import { Format } from "../parse/smogon/format";
import {
    ChaosData,
    mapChaosData,
    RawChaosData,
} from "../parse/smogon/page/chaos";
import { ApiPath, FileType, UrlBuilder } from "./UrlBuilder";
import { parseFormatsPage } from "../parse/smogon/page/formats";
import { LeadsData, parseLeadsPage } from "../parse/smogon/page/leads";
import { MetagameData, parseMetagamePage } from "../parse/smogon/page/metagame";
import { parseTimeframesPage } from "../parse/smogon/page/timeframes";
import { parseUsagePage, UsageData } from "../parse/smogon/page/usage";
import axios, { AxiosRequestConfig } from "axios";

interface SmogonApiClientConfig {
    customBaseUrl?: string | null;
}

class SmogonApiClient {
    private static readonly API_BASE_URL = "https://www.smogon.com/stats";

    private readonly config: SmogonApiClientConfig;

    constructor(config: SmogonApiClientConfig = {}) {
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
    public async fetchTimeframes(): Promise<Timeframe[]> {
        const url = this.createUrlBuilder().build();
        return parseTimeframesPage(
            await this.request<string>(url, FileType.TEXT)
        );
    }

    /**
     * Loads a list of all available formats for a given timeframe.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param useMonotype Optional, If monotype formats should be loaded instead of "normal" formats, defaults to false.
     * @return List of formats.
     */
    public async fetchFormats(
        timeframe: Timeframe,
        useMonotype = false
    ): Promise<Format[]> {
        const urlBuilder = this.createUrlBuilder();
        urlBuilder.setTimeframe(timeframe);
        if (useMonotype) {
            urlBuilder.setPath(ApiPath.MONOTYPE);
        }
        const url = urlBuilder.build();
        return parseFormatsPage(await this.request<string>(url, FileType.TEXT));
    }

    /**
     * Loads usage data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Usage data.
     */
    public async fetchUsage(
        timeframe: Timeframe,
        format: Format
    ): Promise<UsageData> {
        const url = this.createUrlBuilder()
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseUsagePage(await this.request<string>(url, FileType.TEXT));
    }

    /**
     * Loads leads data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Leads data.
     */
    public async fetchLeads(
        timeframe: Timeframe,
        format: Format
    ): Promise<LeadsData> {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.LEADS)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseLeadsPage(await this.request<string>(url, FileType.TEXT));
    }

    /**
     * Loads metagame data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Metagame data.
     */
    public async fetchMetagame(
        timeframe: Timeframe,
        format: Format
    ): Promise<MetagameData> {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.METAGAME)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return parseMetagamePage(
            await this.request<string>(url, FileType.TEXT)
        );
    }

    /**
     * Loads the chaos data for a given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Object containing chaos data.
     */
    public async fetchChaos(
        timeframe: Timeframe,
        format: Format
    ): Promise<ChaosData> {
        const url = this.createUrlBuilder()
            .setPath(ApiPath.CHAOS)
            .setFileType(FileType.JSON)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return mapChaosData(
            await this.request<RawChaosData>(url, FileType.JSON)
        );
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
    public async fetchMoveset(
        timeframe: Timeframe,
        format: Format
    ): Promise<ChaosData> {
        return this.fetchChaos(timeframe, format);
    }

    private createUrlBuilder(): UrlBuilder {
        const urlBuilder = new UrlBuilder();
        urlBuilder.setBaseUrl(
            this.config.customBaseUrl ?? SmogonApiClient.API_BASE_URL
        );
        return urlBuilder;
    }

    private async request<TResponse>(
        url: string,
        responseType?: FileType
    ): Promise<TResponse> {
        const requestConfig: AxiosRequestConfig = {
            timeout: 10000,
        };
        if (responseType == FileType.JSON) {
            requestConfig.responseType = "json";
        } else if (responseType === FileType.TEXT) {
            requestConfig.responseType = "text";
        }
        const response = await axios.get<TResponse>(url, requestConfig);
        return response.data;
    }
}

export { SmogonApiClientConfig, SmogonApiClient };
