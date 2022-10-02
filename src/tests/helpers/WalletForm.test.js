import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Wallet from '../../pages/Wallet';
import { renderWithRouterAndRedux } from './renderWith';
import mockData from './mockData';

const initialState = {
  wallet: {
    currencies: [
      'USD',
      'CAD',
      'GBP',
      'ARS',
      'BTC',
      'LTC',
      'EUR',
      'JPY',
      'CHF',
      'AUD',
      'CNY',
      'ILS',
      'ETH',
      'XRP',
      'DOGE',
    ],
    expenses: [
      {
        id: 0,
        value: '1',
        description: 'um dólar',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
      {
        id: 1,
        value: '3',
        description: 'três dólares',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      }],
    editor: false,
    idToEdit: 0,
  },
};

describe('testes do componente WalletForm', () => {
  it('testa se o valor da despesa é exibido quando editado', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const valueCell = screen.getByRole('cell', { name: /1\.00/i });
    const descriptionCell = screen.getByRole('cell', { name: /um dólar/i });
    expect(valueCell && descriptionCell).toBeInTheDocument();

    const editButton = screen.getAllByRole('button', { name: /editar/i });
    expect(editButton[0]).toBeInTheDocument();
    userEvent.click(editButton[0]);

    const valueInput = screen.getByTestId('value-input');
    expect(valueInput).toBeInTheDocument();
    userEvent.type(valueInput, '2');

    const descriptionInput = screen.getByTestId('description-input');
    expect(descriptionInput).toBeInTheDocument();
    userEvent.type(descriptionInput, 'dois dólares');

    const editExpenseButton = screen.getByRole('button', { name: /editar despesa/i });
    expect(editExpenseButton).toBeInTheDocument();
    userEvent.click(editExpenseButton);

    const editedExpenseValue = screen.getByRole('cell', { name: /2\.00/i });
    const editedExpenseDescription = screen.getByRole('cell', { name: /dois dólares/i });
    expect(editedExpenseValue && editedExpenseDescription).toBeInTheDocument();
  });
});
