import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

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
    expenses: [{
      id: 0,
      value: '1',
      description: 'um dólar',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: mockData,
    }],
    editor: false,
    idToEdit: 0,
  },
};

describe('testes do componente Table', () => {
  it('testa se o valor e a descrição do despesa salva no estado global são exibidos na tabela', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const valueCell = screen.getByRole('cell', { name: /1\.00/i });
    expect(valueCell).toBeInTheDocument();

    const descriptionCell = screen.getByRole('cell', { name: /um dólar/i });
    expect(descriptionCell).toBeInTheDocument();
  });

  it('testa se o botão de excluir despesa retira as informações dela da tabela', () => {
    renderWithRouterAndRedux(<Wallet />, { initialState });

    const deleteButton = screen.getByRole('button', { name: /excluir/i });
    expect(deleteButton).toBeInTheDocument();
    userEvent.click(deleteButton);
    expect(deleteButton).not.toBeInTheDocument();
  });
});
