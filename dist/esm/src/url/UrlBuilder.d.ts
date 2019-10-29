import { FormatData } from "../parse/smogon/format";
import { TimeframeData } from "../parse/smogon/timeframe";
import { Extension } from "./Extension";
import { SubFolder } from "./SubFolder";
/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
declare class UrlBuilder {
    private customBaseUrl?;
    private subFolder?;
    private extension?;
    private timeframe?;
    private format?;
    setCustomBaseUrl(customBaseUrl: string): UrlBuilder;
    setSubFolder(subFolder: SubFolder): UrlBuilder;
    setExtension(extension: Extension): UrlBuilder;
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
export { UrlBuilder };
//# sourceMappingURL=UrlBuilder.d.ts.map