import { isNil, isString } from "lightdash";
import { urlJoin } from "../util/httpUtil";
import { Extension } from "./Extension";
import { SubFolder } from "./SubFolder";
import { URL_STATS } from "./urlBase";

/**
 * Build for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    private subFolder?: SubFolder;
    private extension?: Extension;
    private timeframe?: string;
    private format?: string;
    private rank?: string;
    private monotype?: string;

    public setSubFolder(subFolder: SubFolder): UrlBuilder {
        this.subFolder = subFolder;
        return this;
    }

    public setExtension(extension: Extension): UrlBuilder {
        this.extension = extension;
        return this;
    }

    public setTimeframe(timeframe: string): UrlBuilder {
        this.timeframe = timeframe;
        return this;
    }

    public setFormat(format: string): UrlBuilder {
        this.format = format;
        return this;
    }

    public setRank(rank?: string): UrlBuilder {
        if (isString(rank)) {
            this.rank = rank;
        }
        return this;
    }

    public setMonotype(monotype?: string): UrlBuilder {
        if (isString(monotype)) {
            this.monotype = monotype;
        }
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
            folderUrl = urlJoin(folderUrl, this.timeframe);
        }
        if (!isNil(this.monotype)) {
            folderUrl = urlJoin(folderUrl, SubFolder.MONOTYPE);
        }
        if (!isNil(this.subFolder)) {
            folderUrl = urlJoin(folderUrl, this.subFolder);
        }

        const fileNameParts: string[] = [];
        if (!isNil(this.format)) {
            fileNameParts.push(this.format);
        }
        if (!isNil(this.monotype)) {
            fileNameParts.push(this.monotype);
        }
        if (!isNil(this.rank)) {
            fileNameParts.push(this.rank);
        }

        let fileName = fileNameParts.join("-");
        if (!isNil(this.extension)) {
            fileName += "." + this.extension;
        }

        return urlJoin(folderUrl, fileName);
    }
}

export { UrlBuilder };
