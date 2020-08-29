import { defaults } from "lodash";
import { Timeframe } from "../parsing/timeframe";
import { Format } from "../parsing/format";
import { Chaos, mapChaosData, RawChaos } from "../parsing/chaos";
import { ApiPath, FileType, SmogonUrlBuilder } from "./SmogonUrlBuilder";
import { parseFormatsPage } from "../parsing/html/formats";
import { Leads, leadsFromString } from "../parsing/leads";
import { Metagame, metagameFromString } from "../parsing/metagame";
import { parseTimeframesPage } from "../parsing/html/timeframes";
import { usageFromString, Usages } from "../parsing/usages";
import axios, { AxiosRequestConfig } from "axios";

/**
 * API Client config.
 *
 * @public
 */
interface SmogonApiClientConfig {
    /**
     * Optional base URL to use instead of the default smogon stats URL.
     * Useful for CORS-related proxies.
     */
    customBaseUrl: URL;
}

/**
 * API client to load data from Smogon API.
 *
 * @public
 */
class SmogonApiClient {
    private static readonly API_BASE_URL = new URL(
        "https://www.smogon.com/stats/"
    );

    readonly #config: SmogonApiClientConfig;

    /**
     * Creates a new instance.
     *
     * @param config Client config. See {@link SmogonApiClientConfig}.
     */
    constructor(config: Partial<SmogonApiClientConfig> = {}) {
        this.#config = defaults(config, {
            customBaseUrl: SmogonApiClient.API_BASE_URL,
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
            urlBuilder.setSubPath(ApiPath.MONOTYPE);
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
     * @return Usages data.
     */
    public async fetchUsage(
        timeframe: Timeframe,
        format: Format
    ): Promise<Usages> {
        const url = this.createUrlBuilder()
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return usageFromString(await this.request<string>(url, FileType.TEXT));
    }

    /**
     * Loads lead data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Leads data.
     */
    public async fetchLeads(
        timeframe: Timeframe,
        format: Format
    ): Promise<Leads> {
        const url = this.createUrlBuilder()
            .setSubPath(ApiPath.LEADS)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return leadsFromString(await this.request<string>(url, FileType.TEXT));
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
    ): Promise<Metagame> {
        const url = this.createUrlBuilder()
            .setSubPath(ApiPath.METAGAME)
            .setFileType(FileType.TEXT)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return metagameFromString(
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
    ): Promise<Chaos> {
        const url = this.createUrlBuilder()
            .setSubPath(ApiPath.CHAOS)
            .setFileType(FileType.JSON)
            .setTimeframe(timeframe)
            .setFormat(format)
            .build();
        return mapChaosData(await this.request<RawChaos>(url, FileType.JSON));
    }

    /**
     * Loads moveset data for the given timeframe and format.
     *
     * This is an alias to {@link fetchChaos}, as the data they contain are the same, just in different data formats.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Moveset data.
     */
    public async fetchMoveset(
        timeframe: Timeframe,
        format: Format
    ): Promise<Chaos> {
        return this.fetchChaos(timeframe, format);
    }

    private createUrlBuilder(): SmogonUrlBuilder {
        return new SmogonUrlBuilder(this.#config.customBaseUrl);
    }

    private async request<TResponse>(
        url: URL,
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
        const response = await axios.get<TResponse>(
            url.toString(),
            requestConfig
        );
        return response.data;
    }
}

export { SmogonApiClientConfig, SmogonApiClient };
