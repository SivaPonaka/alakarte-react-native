import { itemsConstants } from "../constants";
import { itemsService } from "../services";

export const itemsActions = {
  getItems,
};

function getItems() {
  return (dispatch) => {
    dispatch(request());
    itemsService.getItems().then(
      (response) => {
        dispatch(success(response.product));
      },
      (er) => {
        dispatch(failure(er));
      }
    );
  };

  function request() {
    return { type: itemsConstants.GET_ITEMS };
  }
  function success(items) {
    return {
      type: itemsConstants.GET_ITEMS_ON_SUCCESS,
      items,
    };
  }
  function failure(error) {
    return {
      type: itemsConstants.GET_ITEMS_ON_FAILURE,
      error,
    };
  }
}
