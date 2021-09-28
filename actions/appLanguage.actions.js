import { languageConstants } from "../constants";

export const appLanguageActions = {
  setLanguage,
};

function setLanguage(language) {
  return {
    type: languageConstants.SET_LANGUAGE,
    language,
  };
}
