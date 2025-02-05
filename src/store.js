import { createStore } from "redux";

const initialAccount = {
  loan: 0,
  balance: 0,
  loanPurpose: "",
};

const initialCustomer = {
  fullName: "",
  nationalId: "",
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
    case "customer/create": {
      return {
        ...state,
        fullName: action.payload,
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

const store = createStore(AccountReducer);

// store.dispatch({ type: "account/deposit", payload: 500 });

// console.log(store.getState());

// store.dispatch({ type: "account/withdraw", payload: 200 });

// console.log(store.getState());

// store.dispatch({
//   type: "requestLoan",
//   payload: {
//     amount: 1000,
//     purpose: "Personal Loan",
//   },
// });

// console.log(store.getState());

// store.dispatch({ type: "account/payloan" });

// console.log(store.getState());

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

console.log(store.getState(deposit(500)));

console.log(store.getState(withdraw(200)));

console.log(store.getState(requestLoan(1000, "Personal Loan")));

console.log(store.getState(payLoan()));
