import { api, apiEndPoints } from "../../api";

export const getShops = async (search) => {
  const res = await api.get(apiEndPoints.getShops, { params: search });
  return res?.data;
};
export const getShopById = async (id) => {
  const res = await api.get(apiEndPoints.getShop(id));
  return res?.data;
};
export const deleteShopById = async (id) => {
  const res = await api.delete(apiEndPoints.deleteShop(id));
  return res?.data;
};
export const addShopData = async (data) => {
  const res = await api.post(apiEndPoints.addShop, data);
  return res?.data;
};
export const updateShopById = async (data) => {
  const res = await api.put(apiEndPoints.updateShop(data?.id), data);
  return res?.data;
};
