import { addressActions } from "./address.actions";
import { userConstants } from "../constants";
import { userService } from "../services";

export const userActions = {
  registerUser,
  setUserDetails,
  getUserDetails,
};

function registerUser(requestObject) {
  return (dispatch) => {
    dispatch(request());
    userService.registerUser(requestObject).then(
      () => {
       
      },
      (er) => {
        if (er.status === 201) {
          dispatch(success(er.response));
        } else {
          dispatch(failure(er));
        }
      }
    );
  };

  function request() {
    return { type: userConstants.REGISTER_USER };
  }
  function success(user) {
    return {
      type: userConstants.REGISTER_USER_ON_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: userConstants.REGISTER_USER_ON_FAILURE,
      error,
    };
  }
}

function setUserDetails(userDetails) {
  return {
    type: userConstants.SET_USER_DETAILS,
    userDetails,
  };
}

function getUserDetails(id) {
  return (dispatch) => {
    dispatch(request());
    userService.getUserDetails(id).then(
      (response) => {
        dispatch(success(response));
        dispatch(setUserDetails(response));
        if (response?.customer_address?.length) {
          dispatch(addressActions.setAddress(response?.customer_address[0]));
        }
      },
      (er) => {
        dispatch(failure(er));
      }
    );
  };

  function request() {
    return { type: userConstants.GET_USER_DETAILS_BY_ID };
  }
  function success(user) {
    return {
      type: userConstants.GET_USER_DETAILS_BY_ID_ON_SUCCESS,
      user,
    };
  }
  function failure(error) {
    return {
      type: userConstants.GET_USER_DETAILS_BY_ID_ON_FAILURE,
      error,
    };
  }
}
