import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import languageDetector from "i18next-browser-languagedetector";
import dictionary  from "./dictionary.json";

const lngDetectorOptions = {
    // order of detection matters
    order: ["cookie", "navigator", "localStorage","path"],
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    lookupFromPathIndex: 0,
    // user language caching
    caches: ["cookie", "localStorage"],
}

// detector will use the options aboe
const lngDetector = new languageDetector();


export const initI18n = () => {
    void i18n
        .use(lngDetector)
        .use(initReactI18next)
        .init({
            resources:dictionary,
            keySeparator: ".",
            detection: lngDetectorOptions,
            fallbackLng:"translations",
            load: "languageOnly", // no region
            ns: ["en","it"], // more to be added as we add support for other languages
            interpolation:{
                escapeValue: false,
            },
            fallbackNS:"en", // if there's no translation in a specific language config, translation defaults to english - can be toggled during dev to see default behavior
            debug: false
        })
}
export default i18n;