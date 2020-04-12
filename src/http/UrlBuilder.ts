import { IndividualFormatData, formatToString } from "../parse/smogon/format";
import {
    timeframeToString,
    IndividualTimeframeData,
} from "../parse/smogon/timeframe";

/**
 * @private
 */
const DEFAULT_BASE_URL = "https://www.smogon.com/stats";

/**
 * @private
 */
enum ApiPath {
    MONOTYPE = "monotype",
    CHAOS = "chaos",
    METAGAME = "metagame",
    LEADS = "leads",
}

/**
 * @private
 */
enum FileType {
    TEXT = "txt",
    JSON = "json",
}

/**
 * Off-brand path.join().
 *
 * @private
 * @param args URL paths to join.
 * @return Joined URL.
 */
const urlJoin = (...args: string[]): string => args.join("/");

/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    private customBaseUrlPrefix?: string;
    private path?: ApiPath;
    private fileType?: FileType;
    private timeframe?: IndividualTimeframeData;
    private format?: IndividualFormatData;

    public setCustomBaseUrl(customBaseUrlPrefix: string): UrlBuilder {
        this.customBaseUrlPrefix = customBaseUrlPrefix;
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

    public setTimeframe(timeframe: IndividualTimeframeData): UrlBuilder {
        this.timeframe = timeframe;
        return this;
    }

    public setFormat(format: IndividualFormatData): UrlBuilder {
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
        let url = DEFAULT_BASE_URL;
        if (this.customBaseUrlPrefix != null) {
            // We use string addition instead of urlJoin
            // To give more flexibility over how one wants to prefix
            url = this.customBaseUrlPrefix + url;
        }
        if (this.timeframe != null) {
            url = urlJoin(url, timeframeToString(this.timeframe));
        }
        if (this.format?.monotype != null) {
            url = urlJoin(url, ApiPath.MONOTYPE);
        }
        if (this.path != null) {
            url = urlJoin(url, this.path);
        }

        if (this.format != null) {
            let fileName: string = formatToString(this.format);

            if (this.fileType != null) {
                fileName += "." + this.fileType;
            }

            return urlJoin(url, fileName);
        }

        return url;
    }
}

export { UrlBuilder, ApiPath, FileType };
