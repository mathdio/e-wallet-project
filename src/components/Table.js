import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'react-uuid';
import { connect } from 'react-redux';
import editIcon from '../images/editIcon.svg';
import redTrashIcon from '../images/redTrashIcon.svg';
import { eraseExpense, idEdit } from '../redux/actions';
import './Table.css';

class Table extends Component {
  componentDidMount() {
    const { deleteExpense } = this.props;
    const loadExpenses = localStorage.getItem('expenses')
      ? JSON.parse(localStorage.getItem('expenses')) : [];
    deleteExpense(loadExpenses);
    // using this action here to avoid duplicate
  }

  handleDelete = (id) => {
    const { expenses, deleteExpense } = this.props;
    const newExpensesArray = expenses.filter((expense) => expense.id !== id);
    deleteExpense(newExpensesArray);
  };

  handleEdit = (id) => {
    const { editingId } = this.props;
    editingId(id);
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
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
        </thead>
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
                <td>
                  <p>{expense.description}</p>
                </td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{fixedValue}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>{fixedExchange}</td>
                <td>{fixedConversion}</td>
                <td>Real</td>
                <td>
                  <input
                    type="image"
                    alt=""
                    src={ editIcon }
                    className="table-icons"
                    data-testid="edit-btn"
                    onClick={ () => this.handleEdit(expense.id) }
                  />
                  <input
                    type="image"
                    alt=""
                    className="table-icons"
                    data-testid="delete-btn"
                    src={ redTrashIcon }
                    onClick={ () => this.handleDelete(expense.id) }
                  />
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
  editingId: (id) => dispatch(idEdit(id)),
});

Table.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Table);
