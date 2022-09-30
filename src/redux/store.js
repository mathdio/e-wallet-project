import { composeWithDevTools } from '@redux-devtools/extension/';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

if (window.Cypress) {
  window.store = store;
}

// store.subscribe(() => {
//   console.log(store.getState());
// });

export default store;
