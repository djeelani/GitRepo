import { mount } from 'enzyme';
import React from 'react';

import Dashboard from '../../src/components/Dashboard';

describe('Component: Dashboard', () => {
  const spy = jest.fn();
  const noTxs = [];
  const txs = [
    {
      id: 1,
      seller: { companyName: 'Diode Seller, LLC' },
      buyer: { companyName: 'Diode Buyer, Inc.' },
      status: { code: 'DRAFT', displayText: 'Draft' },
      context: { actionRequired: false },
    },
  ];
  const emptyDashboard = mount(
    <Dashboard tradeTransactions={noTxs} handleOnExpandToggle={spy} />
  );
  const dashboard = mount(
    <Dashboard tradeTransactions={txs} handleOnExpandToggle={spy} />
  );

  it('renders dashboard', () => {
    expect(emptyDashboard.find('.dashboard').length).toBe(1);
    expect(dashboard.find('.dashboard').length).toBe(1);
  });

  it('renders empty dashboard when no transactions', () => {
    expect(
      emptyDashboard.find('.dashboard__transaction-header-text').text()
    ).toBe('TRANSACTIONS');
  });

  it('renders the dashboard when transactions are available', () => {
    expect(dashboard.find('.dashboard__transaction-header-text').text()).toBe(
      'TRANSACTIONS'
    );
  });
});
