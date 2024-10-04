import { applyMiddleware, combineReducers, createStore } from "redux";
import { thunk } from "redux-thunk";
import AccountReducer from "./features/accounts/accountsSlice";
import CustomerReducer from "./features/customers/customerSlice";

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: CustomerReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
