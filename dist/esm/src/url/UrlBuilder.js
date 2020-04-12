import { joinFormatDataLine } from "../parse/smogon/format";
import { joinTimeframeDataLine, } from "../parse/smogon/timeframe";
/**
 * @private
 */
const DEFAULT_BASE_URL = "https://www.smogon.com/stats";
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
 * Off-brand path.join().
 *
 * @private
 * @param args URL paths to join.
 * @return Joined URL.
 */
const urlJoin = (...args) => args.join("/");
/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    setCustomBaseUrl(customBaseUrlPrefix) {
        this.customBaseUrlPrefix = customBaseUrlPrefix;
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
        let url = DEFAULT_BASE_URL;
        if (this.customBaseUrlPrefix != null) {
            // We use string addition instead of urlJoin
            // To give more flexibility over how one wants to prefix
            url = this.customBaseUrlPrefix + url;
        }
        if (this.timeframe != null) {
            url = urlJoin(url, joinTimeframeDataLine(this.timeframe));
        }
        if (((_a = this.format) === null || _a === void 0 ? void 0 : _a.monotype) != null) {
            url = urlJoin(url, ApiPath.MONOTYPE);
        }
        if (this.path != null) {
            url = urlJoin(url, this.path);
        }
        if (this.format != null) {
            let fileName = joinFormatDataLine(this.format);
            if (this.fileType != null) {
                fileName += "." + this.fileType;
            }
            return urlJoin(url, fileName);
        }
        return url;
    }
}
export { UrlBuilder, ApiPath, FileType };
//# sourceMappingURL=UrlBuilder.js.map