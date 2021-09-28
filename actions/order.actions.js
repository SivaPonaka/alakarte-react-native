import { orderConstants } from "../constants";
import { orderService } from "../services";

export const orderActions = {
  makeOrder,
  getOrders,
  setSpecialInstruction,
};

function getOrders(id) {
  
  return (dispatch) => {
    dispatch(request(id));
    orderService.getOrders(id).then(
      (response) => {
        dispatch(success(response.order));
      },
      (er) => {
        dispatch(failure(er));
      }
    );
  };

  function request() {
    return { type: orderConstants.GET_ORDERS };
  }
  function success(orders) {
    return {
      type: orderConstants.GET_ORDERS_ON_SUCCESS,
      orders,
    };
  }
  function failure(error) {
    return {
      type: orderConstants.GET_ORDERS_ON_FAILURE,
      error,
    };
  }
}

function makeOrder(requestObject) {
  alert("sss")
  return (dispatch) => {
    dispatch(request());
    orderService.makeOrder(requestObject).then(
      () => {},
      (er) => {
        if (er.status === 201) {
          alert("sssssss")
          dispatch(success());
          dispatch(getOrders(requestObject.customer_id));
        }
        alert("sssssss")
        dispatch(failure(er));
      }
    );
  };

  function request() {
    return { type: orderConstants.MAKE_AN_ORDER };
  }
  function success(order) {
    return {
      type: orderConstants.MAKE_AN_ORDER_ON_SUCCESS,
      order,
    };
  }
  function failure(error) {
    return {
      type: orderConstants.MAKE_AN_ORDER_ON_FAILURE,
      error,
    };
  }
}

function setSpecialInstruction(instruction) {
  return {
    type: orderConstants.SET_SPECIAL_INSTRUCTION,
    instruction,
  };
}
