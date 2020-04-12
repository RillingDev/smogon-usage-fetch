import { FormatData } from "../parse/smogon/format";
import { TimeframeData } from "../parse/smogon/timeframe";
/**
 * @private
 */
declare enum ApiPath {
    MONOTYPE = "monotype",
    CHAOS = "chaos",
    METAGAME = "metagame",
    LEADS = "leads"
}
/**
 * @private
 */
declare enum FileType {
    TEXT = "txt",
    JSON = "json"
}
/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
declare class UrlBuilder {
    private customBaseUrlPrefix?;
    private path?;
    private fileType?;
    private timeframe?;
    private format?;
    setCustomBaseUrl(customBaseUrlPrefix: string): UrlBuilder;
    setPath(path: ApiPath): UrlBuilder;
    setFileType(fileType: FileType): UrlBuilder;
    setTimeframe(timeframe: TimeframeData): UrlBuilder;
    setFormat(format: FormatData): UrlBuilder;
    /**
     * Builds the current instance and returns the URL.
     *
     * @public
     * @return Built URL.
     */
    build(): string;
}
export { UrlBuilder, ApiPath, FileType };
//# sourceMappingURL=UrlBuilder.d.ts.map