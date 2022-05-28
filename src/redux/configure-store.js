import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "redux-logger";
import createReducer from "./reducers";

const reducers = createReducer();

const middlewares = [thunk];

if (process.env.NODE_ENV === "development") {
  middlewares.push(logger);
}
const initialState = {
  
};
export default createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
