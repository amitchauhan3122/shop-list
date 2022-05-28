import { combineReducers } from "redux";
import {
  shopItemReducer,
  singleShopItemReducer,
} from "../container/home/redux/reducer";
console.log(
  singleShopItemReducer,
  "singleShopItemReducersingleShopItemReducer"
);
const createReducer = () => {
  const comnbinedAppReducer = combineReducers({
    shop: shopItemReducer,
    singleShop: singleShopItemReducer,
  });

  const rootReducer = (state, action) => {
    return comnbinedAppReducer(state, action);
  };
  return rootReducer;
};

export default createReducer;
