import { isNil } from "lodash";
import { joinFormatDataLine } from "../parse/smogon/format";
import { joinTimeframeDataLine, } from "../parse/smogon/timeframe";
import { urlJoin } from "../util/httpUtil";
import { SubFolder } from "./SubFolder";
import { DEFAULT_BASE_URL } from "./urlBase";
/**
 * Builder for smogon stat URLs.
 *
 * @private
 * @class
 */
class UrlBuilder {
    setCustomBaseUrl(customBaseUrl) {
        this.customBaseUrl = customBaseUrl;
        return this;
    }
    setSubFolder(subFolder) {
        this.subFolder = subFolder;
        return this;
    }
    setExtension(extension) {
        this.extension = extension;
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
        let folderUrl = DEFAULT_BASE_URL;
        if (!isNil(this.customBaseUrl)) {
            // We use string addition instead of urlJoin
            // To give more flexibility over how one wants to prefix
            folderUrl = this.customBaseUrl + folderUrl;
        }
        if (!isNil(this.timeframe)) {
            folderUrl = urlJoin(folderUrl, joinTimeframeDataLine(this.timeframe));
        }
        if (!isNil(this.format) && !isNil(this.format.monotype)) {
            folderUrl = urlJoin(folderUrl, SubFolder.MONOTYPE);
        }
        if (!isNil(this.subFolder)) {
            folderUrl = urlJoin(folderUrl, this.subFolder);
        }
        if (!isNil(this.format)) {
            let fileName = joinFormatDataLine(this.format);
            if (!isNil(this.extension)) {
                fileName += "." + this.extension;
            }
            return urlJoin(folderUrl, fileName);
        }
        return folderUrl;
    }
}
export { UrlBuilder };
//# sourceMappingURL=UrlBuilder.js.map