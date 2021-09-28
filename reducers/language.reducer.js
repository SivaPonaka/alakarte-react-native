import { languageConstants } from "../constants";

const initialState = {
  selectedLanguage: "EN",
};

export function appLanguage(state = initialState, action) {
  switch (action.type) {
    case languageConstants.SET_LANGUAGE:
      return {
        ...state,
        selectedLanguage: action.language,
      };

    default:
      return state;
  }
}
