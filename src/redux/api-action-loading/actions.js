export const ADD_LOADER = "ADD_LOADER";
export const REMOVE_LOADER = "REMOVE_LOADER";

export const addLoader = (payload) => ({
  type: ADD_LOADER,
  payload,
});

export const removeLoader = (payload) => ({
  type: REMOVE_LOADER,
  payload,
});
