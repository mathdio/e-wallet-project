import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

class Wallet extends React.Component {
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

export default Wallet;
