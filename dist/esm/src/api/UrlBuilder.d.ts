import { IndividualFormatData } from "../parse/smogon/format";
import { IndividualTimeframeData } from "../parse/smogon/timeframe";
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
    private baseUrl?;
    private path?;
    private fileType?;
    private timeframe?;
    private format?;
    setBaseUrl(baseUrl: string): UrlBuilder;
    setPath(path: ApiPath): UrlBuilder;
    setFileType(fileType: FileType): UrlBuilder;
    setTimeframe(timeframe: IndividualTimeframeData): UrlBuilder;
    setFormat(format: IndividualFormatData): UrlBuilder;
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