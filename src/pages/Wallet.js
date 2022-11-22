import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

class Wallet extends React.Component {
  componentDidMount() {
    const { history } = this.props;
    if (!localStorage.getItem('loginWallet')) {
      history.push('/');
    }
  }

  render() {
    return (
      <main className="main-container">
        <Header />
        <WalletForm />
        <Table />
      </main>
    );
  }
}

Wallet.propTypes = {
  history: PropTypes.object,
}.isRequired;

export default Wallet;
