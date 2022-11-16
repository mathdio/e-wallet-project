import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GiTwoCoins } from 'react-icons/gi';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
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
          <h1>E-Wallet</h1>
          <h1 data-testid="total-field" className="header-expenses">
            <GiTwoCoins style={ { fontSize: '2rem' } } className="expenses-icon" />
            Expenses:
            {' '}
            {totalField}
            {' '}
            BRL
          </h1>
          {/* <span data-testid="header-currency-field">BRL</span> */}
          <h1 data-testid="email-field">{email}</h1>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Header);
