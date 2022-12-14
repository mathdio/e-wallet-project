import { ADD_EXPENSE, CURRENCY, ERASE_EXPENSE, ID_EDIT, SEND_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCY:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  case ERASE_EXPENSE:
    return {
      ...state,
      expenses: action.payload,
    };
  case ID_EDIT:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };
  case SEND_EDIT:
    return {
      ...state,
      expenses: action.payload,
      editor: false,
    };
  default:
    return state;
  }
};

export default wallet;
