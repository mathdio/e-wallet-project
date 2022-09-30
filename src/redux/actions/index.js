export const LOGIN = 'LOGIN';
export const CURRENCY = 'CURRENCY';
export const ADD_EXPENSE = 'ADD_EXPENSE';

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
    const exchangeRates = data[currency].high;
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
