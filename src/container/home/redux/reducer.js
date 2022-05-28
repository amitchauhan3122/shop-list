import { SET_SHOP_ITEM, SINGLE_SHOP_ITEM } from "./action";

const initialState = {
  shop: [],
  singleShop: {},
};

export const shopItemReducer = (state = initialState?.shop, action) => {
  switch (action.type) {
    case SET_SHOP_ITEM:
      return { ...state, shop: action.payload };
    default:
      return state;
  }
};
export const singleShopItemReducer = (
  state = initialState?.singleShop,
  action
) => {
  console.log(initialState, action, "actionactionactionaction");
  switch (action.type) {
    case SINGLE_SHOP_ITEM:
      return { ...state, singleShop: action.payload };
    default:
      return state;
  }
};
