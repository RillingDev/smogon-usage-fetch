import { IFormatData } from "../parse/smogon/format";
import { ITimeframeData } from "../parse/smogon/timeframe";
import { Extension } from "./Extension";
import { SubFolder } from "./SubFolder";
/**
 * Build for smogon stat URLs.
 *
 * @private
 * @class
 */
declare class UrlBuilder {
    private subFolder?;
    private extension?;
    private timeframe?;
    private format?;
    setSubFolder(subFolder: SubFolder): UrlBuilder;
    setExtension(extension: Extension): UrlBuilder;
    setTimeframe(timeframe: ITimeframeData): UrlBuilder;
    setFormat(format: IFormatData): UrlBuilder;
    /**
     * Builds the current instance and returns the URL.
     *
     * @public
     * @return Built URL.
     */
    build(): string;
}
export { UrlBuilder };
