import { formatToString, Format } from "../parsing/format";
import { Timeframe, timeframeToString } from "../parsing/timeframe";

/**
 * @private
 */
const enum ApiPath {
    MONOTYPE = "monotype",
    CHAOS = "chaos",
    METAGAME = "metagame",
    LEADS = "leads",
}

/**
 * @private
 */
const enum FileType {
    TEXT = "txt",
    JSON = "json",
}

/**
 * Builder for smogon stat URLs.
 *
 * @private
 */
class UrlBuilder {
    private baseUrl?: string;
    private path?: ApiPath;
    private fileType?: FileType;
    private timeframe?: Timeframe;
    private format?: Format;

    public setBaseUrl(baseUrl: string): UrlBuilder {
        this.baseUrl = baseUrl;
        return this;
    }

    public setPath(path: ApiPath): UrlBuilder {
        this.path = path;
        return this;
    }

    public setFileType(fileType: FileType): UrlBuilder {
        this.fileType = fileType;
        return this;
    }

    public setTimeframe(timeframe: Timeframe): UrlBuilder {
        this.timeframe = timeframe;
        return this;
    }

    public setFormat(format: Format): UrlBuilder {
        this.format = format;
        return this;
    }

    /**
     * Builds the current instance and returns the URL.
     *
     * @return Built URL.
     */
    public build(): string {
        const urlParts: string[] = [];
        if (this.baseUrl != null) {
            urlParts.push(this.baseUrl);
        }
        if (this.timeframe != null) {
            urlParts.push(timeframeToString(this.timeframe));
        }
        if (this.format?.monotype != null) {
            urlParts.push(ApiPath.MONOTYPE);
        }
        if (this.path != null) {
            urlParts.push(this.path);
        }

        if (this.format != null) {
            let fileName: string = formatToString(this.format);

            if (this.fileType != null) {
                fileName += "." + this.fileType;
            }

            urlParts.push(fileName);
        }

        return urlParts.join("/");
    }
}

export { UrlBuilder, ApiPath, FileType };
