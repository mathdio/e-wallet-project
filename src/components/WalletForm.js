import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchAPI, fetchCurrency, sendEdit } from '../redux/actions';
import './WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { apiFetch } = this.props;
    apiFetch();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  addExpense = () => {
    const { expenses, currencyFetch } = this.props;
    currencyFetch(this.state, expenses.length);
    this.setState({
      value: '',
      description: '',
    });
  };

  editExpense = () => {
    const { idToEdit, expenses, sendingEdit } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expensesEditedArray = expenses.map((expense) => {
      if (expense.id === idToEdit) {
        expense.value = value;
        expense.description = description;
        expense.currency = currency;
        expense.method = method;
        expense.tag = tag;
        return expense;
      }
      return expense;
    });
    sendingEdit(expensesEditedArray);
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencies, editor } = this.props;
    return (
      <form className="wallet-form">
        <input
          data-testid="value-input"
          name="value"
          value={ value }
          onChange={ this.handleChange }
        />
        <input
          data-testid="description-input"
          name="description"
          value={ description }
          onChange={ this.handleChange }
        />
        <select
          data-testid="currency-input"
          name="currency"
          onChange={ this.handleChange }
        >
          {currencies.map((coin, index) => (
            <option
              key={ `${coin}-${index}` }
              value={ coin }
            >
              {coin}
            </option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          onChange={ this.handleChange }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          onChange={ this.handleChange }
        >
          <option value="Alimentação">Alimentação</option>
          <option value="Lazer">Lazer</option>
          <option value="Trabalho">Trabalho</option>
          <option value="Transporte">Transporte</option>
          <option value="Saúde">Saúde</option>
        </select>
        {!editor
          ? (
            <button
              type="button"
              onClick={ this.addExpense }
            >
              Adicionar despesa
            </button>)
          : (
            <button
              type="button"
              onClick={ this.editExpense }
            >
              Editar despesa
            </button>)}
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

const mapDispatchToProps = (dispatch) => ({
  apiFetch: () => dispatch(fetchAPI()),
  currencyFetch: (state, id) => dispatch(fetchCurrency(state, id)),
  sendingEdit: (newExpensesArray) => dispatch(sendEdit(newExpensesArray)),
});

WalletForm.propTypes = {
  currencies: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
