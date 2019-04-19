import { isNil } from "lightdash";
import { IFormatData, joinFormatLineData } from "../parse/smogon/format";
import {
    ITimeframeData,
    joinTimeframeLineData
} from "../parse/smogon/timeframe";
import { urlJoin } from "../util/httpUtil";
import { Extension } from "./Extension";
import { SubFolder } from "./SubFolder";
import { URL_STATS } from "./urlBase";

/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    private subFolder?: SubFolder;
    private extension?: Extension;
    private timeframe?: ITimeframeData;
    private format?: IFormatData;

    public setSubFolder(subFolder: SubFolder): UrlBuilder {
        this.subFolder = subFolder;
        return this;
    }

    public setExtension(extension: Extension): UrlBuilder {
        this.extension = extension;
        return this;
    }

    public setTimeframe(timeframe: ITimeframeData): UrlBuilder {
        this.timeframe = timeframe;
        return this;
    }

    public setFormat(format: IFormatData): UrlBuilder {
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
        let folderUrl = URL_STATS;
        if (!isNil(this.timeframe)) {
            folderUrl = urlJoin(
                folderUrl,
                joinTimeframeLineData(this.timeframe)
            );
        }
        if (!isNil(this.format) && !isNil(this.format.monotype)) {
            folderUrl = urlJoin(folderUrl, SubFolder.MONOTYPE);
        }
        if (!isNil(this.subFolder)) {
            folderUrl = urlJoin(folderUrl, this.subFolder);
        }

        let fileName: string = "";
        if (!isNil(this.format)) {
            fileName = joinFormatLineData(this.format);
        }
        if (!isNil(this.extension)) {
            fileName += "." + this.extension;
        }

        return urlJoin(folderUrl, fileName);
    }
}

export { UrlBuilder };
