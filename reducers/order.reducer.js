import { orderConstants } from "../constants";

const initialState = {
  orderList: [],
  isOrderListLoading: false,
  orderListLoaded: false,
  isOrdering: false,
  orderingSuccessful: false,
  specialInstruction: "",
};

export function order(state = initialState, action) {
  switch (action.type) {
    case orderConstants.GET_ORDERS:
      return {
        ...state,
        isOrderListLoading: true,
        orderListLoaded: false,
      };
    case orderConstants.GET_ORDERS_ON_SUCCESS:
      return {
        ...state,
        isOrderListLoading: false,
        orderList: action.orders,
        orderListLoaded: true,
      };
    case orderConstants.GET_ORDERS_ON_FAILURE:
      return {
        ...state,
        isOrderListLoading: false,
        orderListLoaded: false,
      };
    case orderConstants.MAKE_AN_ORDER:
      return {
        ...state,
        isOrdering: true,
        orderingSuccessful: false,
      };

    case orderConstants.MAKE_AN_ORDER_ON_SUCCESS:
      return {
        ...state,
        isOrdering: false,
        orderingSuccessful: true,
      };

    case orderConstants.MAKE_AN_ORDER_ON_FAILURE:
      return {
        ...state,
        isOrdering: false,
        orderingSuccessful: false,
      };

    case orderConstants.SET_SPECIAL_INSTRUCTION:
      return {
        ...state,
        specialInstruction: action.instruction,
      };

    default:
      return state;
  }
}
