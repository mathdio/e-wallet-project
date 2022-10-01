import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

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
      <header>
        <span data-testid="email-field">{email}</span>
        <span data-testid="total-field">
          {totalField}
        </span>
        <span data-testid="header-currency-field">BRL</span>
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
