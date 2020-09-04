import { formatToString } from "../parsing/format";
import { timeframeToString } from "../parsing/timeframe";
import type { Format } from "../model/format";
import type { Timeframe } from "../model/timeframe";

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
 * Note: No validation for an existing URL are made, callers have to ensure their access to this class is sane.
 *
 * @private
 */
class SmogonUrlBuilder {
    private readonly baseUrl: URL;
    private subPath?: ApiPath;
    private fileType?: FileType;
    private timeframe?: Timeframe;
    private format?: Format;

    /**
     * Creates a new instance.
     *
     * @param baseUrl Base URL to use.
     */
    constructor(baseUrl: URL) {
        this.baseUrl = baseUrl;
    }

    public setTimeframe(timeframe: Timeframe): SmogonUrlBuilder {
        this.timeframe = timeframe;
        return this;
    }

    public setFormat(format: Format): SmogonUrlBuilder {
        this.format = format;
        return this;
    }

    public setSubPath(path: ApiPath): SmogonUrlBuilder {
        this.subPath = path;
        return this;
    }

    public setFileType(fileType: FileType): SmogonUrlBuilder {
        this.fileType = fileType;
        return this;
    }

    /**
     * Builds the current instance and returns the URL.
     *
     * @return Built URL.
     */
    public build(): URL {
        const pathParts: string[] = [];
        if (this.timeframe != null) {
            pathParts.push(timeframeToString(this.timeframe));
        }
        if (this.format?.monotype != null) {
            pathParts.push(ApiPath.MONOTYPE);
        }
        if (this.subPath != null) {
            pathParts.push(this.subPath);
        }

        if (this.format != null) {
            let fileName: string = formatToString(this.format);

            if (this.fileType != null) {
                fileName += "." + this.fileType;
            }

            pathParts.push(fileName);
        }

        const path = pathParts.join("/");
        return new URL(path, this.baseUrl);
    }
}

export { SmogonUrlBuilder, ApiPath, FileType };
