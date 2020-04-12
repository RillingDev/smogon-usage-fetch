import { IndividualTimeframeData, TimeframeData } from "../parse/smogon/timeframe";
import { FormatData, IndividualFormatData } from "../parse/smogon/format";
import { ChaosData } from "../parse/smogon/page/chaos";
import { LeadsData } from "../parse/smogon/page/leads";
import { MetagameData } from "../parse/smogon/page/metagame";
import { UsageData } from "../parse/smogon/page/usage";
interface SmogonApiClientConfig {
    customBaseUrl?: string | null;
}
declare class SmogonApiClient {
    private static readonly API_BASE_URL;
    private readonly config;
    constructor(config?: SmogonApiClientConfig);
    /**
     * Loads a list of all available timeframes.
     *
     * @public
     * @return List of timeframe names.
     */
    fetchTimeframes(): Promise<TimeframeData>;
    /**
     * Loads a list of all available formats for a given timeframe.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param useMonotype Optional, If monotype formats should be loaded instead of "normal" formats, defaults to false.
     * @return List of formats.
     */
    fetchFormats(timeframe: IndividualTimeframeData, useMonotype?: boolean): Promise<FormatData>;
    /**
     * Loads usage data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Usage data.
     */
    fetchUsage(timeframe: IndividualTimeframeData, format: IndividualFormatData): Promise<UsageData>;
    /**
     * Loads leads data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Leads data.
     */
    fetchLeads(timeframe: IndividualTimeframeData, format: IndividualFormatData): Promise<LeadsData>;
    /**
     * Loads metagame data for the given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Metagame data.
     */
    fetchMetagame(timeframe: IndividualTimeframeData, format: IndividualFormatData): Promise<MetagameData>;
    /**
     * Loads the chaos data for a given timeframe and format.
     *
     * @public
     * @param timeframe Timeframe to load.
     * @param format Format to load.
     * @return Object containing chaos data.
     */
    fetchChaos(timeframe: IndividualTimeframeData, format: IndividualFormatData): Promise<ChaosData>;
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
    fetchMoveset(timeframe: IndividualTimeframeData, format: IndividualFormatData): Promise<ChaosData>;
    private createUrlBuilder;
    private request;
}
export { SmogonApiClientConfig, SmogonApiClient };
//# sourceMappingURL=SmogonApiClient.d.ts.map