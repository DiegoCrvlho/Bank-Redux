import { combineReducers, createStore } from "redux";

const initialAccount = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
};

const initialCustomer = {
  fullName: "",
  nationalId: "",
  createdAt: "",
};

function AccountReducer(state = initialAccount, action) {
  switch (action.type) {
    case "account/deposit": {
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    }
    case "account/withdraw": {
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    }
    case "requestLoan": {
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    }
    case "account/payloan": {
      return {
        ...state,
        loan: 0,
        loanPurpose: "",
        balance: state.balance - state.loan,
      };
    }
    default: {
      return state;
    }
  }
}

function customerReducer(state = initialCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer": {
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };
    }
    case "customer/update": {
      return {
        ...state,
        fullName: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}

const rootReducer = combineReducers({
  account: AccountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

function createCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() },
  };
}

function updateCustomer(fullName) {
  return {
    type: "customer/update",
    payload: fullName,
  };
}

function deposit(amount) {
  store.dispatch({ type: "account/deposit", payload: amount });
}

function withdraw(amount) {
  store.dispatch({ type: "account/withdraw", payload: amount });
}

function requestLoan(amount, purpose) {
  store.dispatch({ type: "requestLoan", payload: { amount, purpose } });
}

function payLoan() {
  store.dispatch({ type: "account/payloan" });
}

// console.log(store.getState(deposit(500)));

// console.log(store.getState(withdraw(200)));

// console.log(store.getState(requestLoan(1000, "Personal Loan")));

// console.log(store.getState(payLoan()));

store.dispatch(createCustomer("John Doe", "1234567890"));

console.log(store.getState());
