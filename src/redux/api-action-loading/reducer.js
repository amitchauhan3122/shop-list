import { ADD_LOADER, REMOVE_LOADER } from "./actions";

const initialState = {
  count: 0,
  actionLoading: {},
};

const actionLoaderReducer = (state = initialState, action) => {
  const { count } = state;
  switch (action.type) {
    case ADD_LOADER: {
      const actionLoading = { ...state.actionLoading };
      if (action.payload) {
        actionLoading[action.payload] = true;
      }
      return { ...state, count: count + 1, actionLoading };
    }
    case REMOVE_LOADER: {
      const apiCount = count - 1;
      const actionLoading = { ...state.actionLoading };
      if (action.payload) {
        actionLoading[action.payload] = false;
      }
      return { ...state, actionLoading, count: apiCount < 0 ? 0 : apiCount };
    }
    default:
      return state;
  }
};

export default actionLoaderReducer;
