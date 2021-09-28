import { userConstants } from "../constants";

const initialState = {
  userDetails: null,
  isRegistering: false,
  userRegistered: false,
  isLoadingUserDetails: false,
  errorMessageOnRegister: false
};

export function user(state = initialState, action) {
  switch (action.type) {
    case userConstants.SET_USER_DETAILS:
      return {
        ...state,
        userDetails: action.userDetails,
      };

    case userConstants.REGISTER_USER:
      return {
        ...state,
        isRegistering: true,
        userRegistered: false,
        errorMessageOnRegister: false
      };
    case userConstants.REGISTER_USER_ON_SUCCESS:
      return {
        ...state,
        isRegistering: false,
        userDetails: action.user,
        userRegistered: true,
        errorMessageOnRegister: false
      };
    case userConstants.REGISTER_USER_ON_FAILURE:
      return {
        ...state,
        isRegistering: false,
        userRegistered: false,
        errorMessageOnRegister: true
      };

    case userConstants.GET_USER_DETAILS_BY_ID:
      return {
        ...state,
        isLoadingUserDetails: true,
      };

    case userConstants.GET_USER_DETAILS_BY_ID_ON_SUCCESS:
      return {
        ...state,
        isLoadingUserDetails: false,
      };

    case userConstants.GET_USER_DETAILS_BY_ID_ON_FAILURE:
      return {
        ...state,
        isLoadingUserDetails: false,
      };
      
    default:
      return state;
  }
}
