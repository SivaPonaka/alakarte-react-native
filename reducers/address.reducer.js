import { addressConstants } from "../constants";

const initialState = {
  addressList: [],
  isLoadingAddress: false,
  isAddingAddress: false,
  addressAdded: false,
  selectedAddress: false,
  isDeletingAddress: false,
  isDeletedAddress: false
};

export function address(state = initialState, action) {
  switch (action.type) {
    case addressConstants.GET_ADDRESS:
      return {
        ...state,
        isLoadingAddress: true,
      };
    case addressConstants.GET_ADDRESS_ON_SUCCESS:
      return {
        ...state,
        isLoadingAddress: false,
        addressList: action.address,
      };
    case addressConstants.GET_ADDRESS_ON_FAILURE:
      return {
        ...state,
        isLoadingAddress: false,
      };
    case addressConstants.ADD_ADDRESS:
      return {
        ...state,
        isAddingAddress: true,
        addressAdded: false,
      };

    case addressConstants.ADD_ADDRESS_ON_SUCCESS:
      return {
        ...state,
        isAddingAddress: false,
        addressAdded: true,
      };

    case addressConstants.ADD_ADDRESS_ON_FAILURE:
      return {
        ...state,
        isAddingAddress: false,
        addressAdded: false,
      };

    case addressConstants.SET_SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: action.address,
      };

    case addressConstants.REMOVE_ADDRESS:
      return {
        ...state,
        isDeletingAddress: true,
        isDeletedAddress: false
      };
    case addressConstants.REMOVE_ADDRESS_ON_SUCCESS:
      return {
        ...state,
        isDeletingAddress: false,
        isDeletedAddress: true
        // addressList: state.addressList.filter((ele) => ele.id !== action.id),
      };

    case addressConstants.REMOVE_ADDRESS_ON_FAILURE:
      return {
        ...state,
        isDeletingAddress: false,
        isDeletedAddress: false
      };

    default:
      return state;
  }
}
