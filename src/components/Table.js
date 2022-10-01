import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import { eraseExpense } from '../redux/actions';

class Table extends Component {
  handleDelete = (id) => {
    const { expenses, deleteExpense } = this.props;
    const newExpensesArray = expenses.filter((expense) => expense.id !== id);
    deleteExpense(newExpensesArray);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        <tbody>
          {expenses.map((expense) => {
            const conversion = Number(expense.exchangeRates[expense.currency].ask)
            * Number(expense.value);
            const fixedConversion = Number(conversion.toFixed(2));
            const fixedValue = Number(expense.value).toFixed(2);
            const fixedExchange = Number(expense.exchangeRates[expense.currency].ask)
              .toFixed(2);
            return (
              <tr key={ uuid() }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{fixedValue}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{fixedExchange}</td>
                <td>{fixedConversion}</td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.handleDelete(expense.id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deleteExpense: (newExpensesArray) => dispatch(eraseExpense(newExpensesArray)),
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
