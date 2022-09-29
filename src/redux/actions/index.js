export const LOGIN = 'LOGIN';
export const CURRENCY = 'CURRENCY';

export const loginAction = (payload) => ({
  type: LOGIN,
  payload,
});

export const apiAction = (payload) => ({
  type: CURRENCY,
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
