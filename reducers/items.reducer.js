import { itemsConstants } from "../constants";

const initialState = {
  isLoadingItems: false,
  itemList: [],
};

export function items(state = initialState, action) {
  switch (action.type) {
    case itemsConstants.GET_ITEMS:
      return {
        ...state,
        isLoadingItems: true,
      };
    case itemsConstants.GET_ITEMS_ON_SUCCESS:
      return {
        ...state,
        isLoadingItems: false,
        itemList: action.items,
      };
    case itemsConstants.GET_ITEMS_ON_FAILURE:
      return {
        ...state,
        isLoadingItems: false,
      };

    default:
      return state;
  }
}
