import { cartConstants } from "../constants";

export const cartActions = {
  addItemToUserCart,
  increaseOrderQuantity,
  decreaseOrderQuantity,
  removeItemFromCart,
  clearCart,
  setQuantity
};

function addItemToUserCart(item) {
  return {
    type: cartConstants.ADD_ITEMS,
    item,
  };
}

function increaseOrderQuantity(id) {
  return {
    type: cartConstants.INCREASE_ORDER_QUANTITY,
    id,
  };
}

function decreaseOrderQuantity(id) {
  return {
    type: cartConstants.DECREASE_ORDER_QUANTITY,
    id,
  };
}

function removeItemFromCart(id) {
  return {
    type: cartConstants.REMOVE_ITEM_FROM_CART,
    id,
  };
}

function clearCart() {
  return {
    type: cartConstants.CLEAR_CART,
  }
}

function setQuantity(id, value) {
  return {
    type: cartConstants.SET_QUANTITY,
    id, 
    value
  }
}

