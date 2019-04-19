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
    private rank?;
    private monotype?;
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
