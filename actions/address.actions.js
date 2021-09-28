import { addressConstants } from "../constants";
import { addressService } from "../services";
export const addressActions = {
  addAddress,
  setAddress,
  getAddress,
  deleteAddress,
};

function addAddress(requestObject) {
  return (dispatch) => {
    dispatch(request());
    addressService.addAddress(requestObject).then(
      () => {},
      (er) => {
        if (er.status === 201) {
          dispatch(success());
        

        } else {
          dispatch(failure(er));
        }
      }
    );
  };

  function request() {
    return { type: addressConstants.ADD_ADDRESS };
  }
  function success() {
    return {
      type: addressConstants.ADD_ADDRESS_ON_SUCCESS
    };
  }
  function failure(error) {
    return {
      type: addressConstants.ADD_ADDRESS_ON_FAILURE,
      error,
    };
  }
}

function setAddress(address) {
  return {
    type: addressConstants.SET_SELECTED_ADDRESS,
    address,
  };
}

function getAddress(id) {
  return (dispatch) => {
    dispatch(request());
    addressService.getAddress(id).then(
      (response) => {
        dispatch(success(response));
      },
      (er) => {
        dispatch(failure(er));
      }
    );
  };

  function request() {
    return { type: addressConstants.GET_ADDRESS };
  }
  function success(address) {
    return {
      type: addressConstants.GET_ADDRESS_ON_SUCCESS,
      address,
    };
  }
  function failure(error) {
    return {
      type: addressConstants.GET_ADDRESS_ON_FAILURE,
      error,
    };
  }
}

function deleteAddress(id) {
  return (dispatch) => {
    dispatch(request());
    addressService.deleteAddress(id).then(
      () => {
        dispatch(success(id));
      },
      (er) => {
        dispatch(failure(er));
      }
    );
  };

  function request() {
    return { type: addressConstants.REMOVE_ADDRESS };
  }
  function success(id) {
    return {
      type: addressConstants.REMOVE_ADDRESS_ON_SUCCESS,
      id,
    };
  }
  function failure(error) {
    return {
      type: addressConstants.REMOVE_ADDRESS_ON_FAILURE,
      error,
    };
  }
}
