import { formatToString } from "../parse/smogon/format";
import { timeframeToString, } from "../parse/smogon/timeframe";
/**
 * @private
 */
var ApiPath;
(function (ApiPath) {
    ApiPath["MONOTYPE"] = "monotype";
    ApiPath["CHAOS"] = "chaos";
    ApiPath["METAGAME"] = "metagame";
    ApiPath["LEADS"] = "leads";
})(ApiPath || (ApiPath = {}));
/**
 * @private
 */
var FileType;
(function (FileType) {
    FileType["TEXT"] = "txt";
    FileType["JSON"] = "json";
})(FileType || (FileType = {}));
/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
        return this;
    }
    setPath(path) {
        this.path = path;
        return this;
    }
    setFileType(fileType) {
        this.fileType = fileType;
        return this;
    }
    setTimeframe(timeframe) {
        this.timeframe = timeframe;
        return this;
    }
    setFormat(format) {
        this.format = format;
        return this;
    }
    /**
     * Builds the current instance and returns the URL.
     *
     * @public
     * @return Built URL.
     */
    build() {
        var _a;
        const urlParts = [];
        if (this.baseUrl != null) {
            urlParts.push(this.baseUrl);
        }
        if (this.timeframe != null) {
            urlParts.push(timeframeToString(this.timeframe));
        }
        if (((_a = this.format) === null || _a === void 0 ? void 0 : _a.monotype) != null) {
            urlParts.push(ApiPath.MONOTYPE);
        }
        if (this.path != null) {
            urlParts.push(this.path);
        }
        if (this.format != null) {
            let fileName = formatToString(this.format);
            if (this.fileType != null) {
                fileName += "." + this.fileType;
            }
            urlParts.push(fileName);
        }
        return urlParts.join("/");
    }
}
export { UrlBuilder, ApiPath, FileType };
//# sourceMappingURL=UrlBuilder.js.map