const namespace = "components/shop/";
export const SET_SHOP_ITEM = `${namespace}SET_SHOP_ITEM`;
export const SINGLE_SHOP_ITEM = `${namespace}SINGLE_SHOP_ITEM`;

export const setShop = (payload) => ({
  type: SET_SHOP_ITEM,
  payload,
});
export const setSingleShopData = (payload) => ({
  type: SINGLE_SHOP_ITEM,
  payload,
});

