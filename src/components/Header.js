import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginAction } from '../redux/actions';
import './Header.css';

class Header extends Component {
  componentDidMount() {
    const { handleLogin } = this.props;
    if (localStorage.getItem('loginWallet')) {
      const loginEmail = JSON.parse(localStorage.getItem('loginWallet'));
      handleLogin(loginEmail);
    }
  }

  render() {
    const { email, expenses } = this.props;
    let totalField = 0;
    expenses.forEach((expense) => {
      const conversion = Number(expense.exchangeRates[expense.currency].ask)
      * Number(expense.value);
      const fixedConversion = conversion.toFixed(2);
      totalField += Number(fixedConversion);
    });
    if (totalField === 0) {
      totalField = '0.00';
    }
    return (
      <header className="header">
        <div className="header-container">
          <span>E-Wallet</span>
          <span data-testid="total-field" className="header-expenses">
            Total de despesas:
            {' '}
            {totalField}
            {' '}
            BRL
          </span>
          <span data-testid="email-field">{email}</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  handleLogin: (email) => dispatch(loginAction(email)),
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
