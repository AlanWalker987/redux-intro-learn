import { combineReducers, createStore } from "redux";
const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
};

const initialStateCustomer = {
  fullName: "",
  nationalID: "",
  createdAt: "",
};

function AccountReducer(state = initialState, action) {
  switch (action.type) {
    case "account/deposit":
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case "account/withdraw":
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        balance: state.balance + action.payload.amount,
        loanPurpose: action.payload.purpose,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}

function CustomerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/usercreate":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalID: action.payload.nationalID,
        createdAt: action.payload.createdAt,
      };

    case "customer/userupdate":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ AccountReducer, CustomerReducer });
const store = createStore(rootReducer);

/*
store.dispatch({ type: "account/deposit", payload: 500 });
console.log(store.getState());

store.dispatch({ type: "account/withdraw", payload: 100 });
console.log(store.getState());

store.dispatch({
  type: "account/requestLoan",
  payload: { amount: 3000, purpose: "Buy Iphone" },
});

console.log(store.getState());

store.dispatch({ type: "account/payLoan" });
console.log(store.getState());
*/

// action creatores - account

function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}

function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: "account/requestLoan", payload: { amount, purpose } };
}

function payLoan() {
  return { type: "account/payLoan" };
}

store.dispatch(deposit(1000));
console.log(store.getState());
store.dispatch(withdraw(500));
console.log(store.getState());
store.dispatch(requestLoan(5000, "buy iphone"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

// action creatores - customer

function createCustomer(fullName, nationalID) {
  return {
    type: "customer/usercreate",
    payload: { fullName, nationalID, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName) {
  return {
    type: "customer/userupdate",
    payload: fullName,
  };
}

store.dispatch(createCustomer("Rocky Bhai", "KGF"));
console.log(store.getState());

store.dispatch(updateCustomer("Terran"));
console.log(store.getState());
