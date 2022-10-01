export const LOGIN = 'LOGIN';
export const CURRENCY = 'CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ERASE_EXPENSE = 'ERASE_EXPENSE';
export const ID_EDIT = 'ID_EDIT';
export const SEND_EDIT = 'SEND_EDIT';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const apiAction = (payload) => ({
  type: CURRENCY,
  payload,
});

export const addExpense = (payload) => ({
  type: ADD_EXPENSE,
  payload,
});

export const eraseExpense = (payload) => ({
  type: ERASE_EXPENSE,
  payload,
});

export const idEdit = (payload) => ({
  type: ID_EDIT,
  payload,
});

export const sendEdit = (payload) => ({
  type: SEND_EDIT,
  payload,
});

export function fetchAPI() {
  return async (dispatch) => {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await resolve.json();
    const filteredCurrencies = Object.keys(data)
      .filter((currency) => currency !== 'USDT');
    dispatch(apiAction(filteredCurrencies));
  };
}

export function fetchCurrency(state, id) {
  const { value, description, currency, method, tag } = state;
  return async (dispatch) => {
    const resolve = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await resolve.json();
    const exchangeRates = data;
    dispatch(addExpense({
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    }));
  };
}
