import { isNil } from "lodash";
import { FormatData, joinFormatDataLine } from "../parse/smogon/format";
import {
    joinTimeframeDataLine,
    TimeframeData,
} from "../parse/smogon/timeframe";
import { urlJoin } from "../util/httpUtil";
import { Extension } from "./Extension";
import { SubFolder } from "./SubFolder";
import { DEFAULT_BASE_URL } from "./urlBase";

/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    private customBaseUrl?: string;
    private subFolder?: SubFolder;
    private extension?: Extension;
    private timeframe?: TimeframeData;
    private format?: FormatData;

    public setCustomBaseUrl(customBaseUrl: string): UrlBuilder {
        this.customBaseUrl = customBaseUrl;
        return this;
    }

    public setSubFolder(subFolder: SubFolder): UrlBuilder {
        this.subFolder = subFolder;
        return this;
    }

    public setExtension(extension: Extension): UrlBuilder {
        this.extension = extension;
        return this;
    }

    public setTimeframe(timeframe: TimeframeData): UrlBuilder {
        this.timeframe = timeframe;
        return this;
    }

    public setFormat(format: FormatData): UrlBuilder {
        this.format = format;
        return this;
    }

    /**
     * Builds the current instance and returns the URL.
     *
     * @public
     * @return Built URL.
     */
    public build(): string {
        let folderUrl = DEFAULT_BASE_URL;
        if (!isNil(this.customBaseUrl)) {
            // We use string addition instead of urlJoin
            // To give more flexibility over how one wants to prefix
            folderUrl = this.customBaseUrl + folderUrl;
        }
        if (!isNil(this.timeframe)) {
            folderUrl = urlJoin(
                folderUrl,
                joinTimeframeDataLine(this.timeframe)
            );
        }
        if (!isNil(this.format) && !isNil(this.format.monotype)) {
            folderUrl = urlJoin(folderUrl, SubFolder.MONOTYPE);
        }
        if (!isNil(this.subFolder)) {
            folderUrl = urlJoin(folderUrl, this.subFolder);
        }

        if (!isNil(this.format)) {
            let fileName: string = joinFormatDataLine(this.format);

            if (!isNil(this.extension)) {
                fileName += "." + this.extension;
            }

            return urlJoin(folderUrl, fileName);
        }

        return folderUrl;
    }
}

export { UrlBuilder };
