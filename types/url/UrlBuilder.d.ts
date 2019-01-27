import { SubFolder } from "./SubFolder";
import { Extension } from "./Extension";
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
    private rank?;
    private monotype?;
    constructor();
    setSubFolder(subFolder: SubFolder): UrlBuilder;
    setExtension(extension: Extension): UrlBuilder;
    setTimeframe(timeframe: string): UrlBuilder;
    setFormat(format: string): UrlBuilder;
    setRank(rank?: string): UrlBuilder;
    setMonotype(monotype?: string): UrlBuilder;
    /**
     * Builds the current instance and returns the URL.
     *
     * @public
     * @return Built URL.
     */
    build(): string;
}
export { UrlBuilder };
