import { combineReducers } from "redux";
import { items } from "./items.reducer";
import { appLanguage } from "./language.reducer";
import { cart } from "./cart.reducer";
import { order } from "./order.reducer";
import { user } from "./user.reducer";
import { address } from "./address.reducer";

const rootReducer = combineReducers({
  items,
  appLanguage,
  cart,
  order,
  user,
  address,
});

export default rootReducer;
