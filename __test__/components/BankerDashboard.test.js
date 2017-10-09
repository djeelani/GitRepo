import { mount } from 'enzyme';
import React from 'react';

import BankerDashboard from '../../src/components/BankerDashboard';
import { SELLERBANKER } from '../../src/config/envConfig';

describe('Component: BankerDashboard', () => {
  const spy = jest.fn();
  const noTxs = [];
  const emptyBankerDashboard = mount(
    <BankerDashboard
      role={SELLERBANKER}
      tradeTransactions={noTxs}
      handleOnExpandBankerToggle={spy}
    />
  );
  const txs = [
    {
      id: 1,
      seller: { companyName: 'Diode Seller, LLC' },
      buyer: { companyName: 'Diode Buyer, Inc.' },
      status: { code: 'DRAFT', displayText: 'Draft' },
      context: { actionRequired: false },
    },
  ];
  const bankerDashboard = mount(
    <BankerDashboard
      role={SELLERBANKER}
      tradeTransactions={txs}
      handleOnExpandBankerToggle={spy}
    />
  );

  it('renders dashboard for banker', () => {
    expect(emptyBankerDashboard.find('.bankerDashBoard').length).toBe(1);
    expect(bankerDashboard.find('.bankerDashBoard').length).toBe(1);
  });

  it('renders empty dashboard when no transactions', () => {
    expect(
      emptyBankerDashboard.find('.dashboard__transaction-header-text').text()
    ).toBe('TRANSACTIONS');
  });

  it('renders the dashboard data for each SME as TRANSACTIONS For', () => {
    expect(
      bankerDashboard.find('.dashboard__transaction-header-text').text()
    ).toContain('TRANSACTIONS FOR');
  });
});
