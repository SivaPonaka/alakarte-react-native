import { cartConstants } from "../constants";

const initialState = {
  cartList: [],
};

export function cart(state = initialState, action) {
  switch (action.type) {
    case cartConstants.ADD_ITEMS:
      let newItem = [{ ...action.item, orderQuantity: 1 }];
      return {
        ...state,
        cartList: [...state.cartList, ...newItem],
      };
    case cartConstants.INCREASE_ORDER_QUANTITY:
      return {
        ...state,
        cartList: state.cartList.map((ele) =>
          ele.id === action.id
            ? { ...ele, orderQuantity: parseInt(ele.orderQuantity) + 1 }
            : ele
        ),
      };
    case cartConstants.DECREASE_ORDER_QUANTITY:
      return {
        ...state,
        cartList: state.cartList.map((ele) =>
          ele.id === action.id
            ? { ...ele, orderQuantity: parseInt(ele.orderQuantity) - 1 }
            : ele
        ),
      };
    
      case cartConstants.SET_QUANTITY:
        return {
          ...state,
          cartList: state.cartList.map((ele) =>
            ele.id === action.id
              ? { ...ele, orderQuantity: action.value}
              : ele
          ),
        };
    case cartConstants.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cartList: state.cartList.filter((ele) => ele.id !== action.id),
      };

    case cartConstants.CLEAR_CART:
      return {
        ...state,
        cartList: [],
      };
    default:
      return state;
  }
}
