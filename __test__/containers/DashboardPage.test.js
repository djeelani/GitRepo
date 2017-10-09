import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import DashboardPage from '../../src/containers/DashboardPage';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';
import { create } from '../__mocks__/mockMiddleware';
import { SELLERBANKER, SELLER } from '../../src/config/envConfig';
import { spinnerTrue } from '../../src/actions/auth';
import {
  fetchTradeTransactionsByUser,
} from '../../src/actions/tradeTransactions';

describe('Container: DashboardPage', () => {
  let dashboardPage;

  beforeEach(() => {
    process.env.REACT_APP_ROLE = SELLERBANKER;
    sessionStorage.setItem('user', JSON.stringify({ id: 1 }));
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <DashboardPage history={{ push: () => {} }} />
      </Provider>
    );
    dashboardPage = wrapper.find(DashboardPage);
  });

  afterEach(() => {
    delete process.env.REACT_APP_ROLE;
  });

  it('renders without crashing', () => {
    expect(dashboardPage.exists()).toBe(true);
  });

  it('dashboard-page to contain dashboard component', () => {
    expect(dashboardPage.find('.dashboard-page').length).toBe(1);
  });

  it('renders the correct title', () => {
    expect(
      dashboardPage.find('.dashboard__transaction-header-text').text()
    ).toContain('TRANSACTIONS');
  });

  it('renders the banker Dashboard if it is a banker', () => {
    expect(dashboardPage.find('.bankerDashBoard').exists()).toEqual(true);
  });

  it('renders the customer Dashboard if user is not a banker', () => {
    process.env.REACT_APP_ROLE = SELLER;
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <DashboardPage history={{ push: () => {} }} />
      </Provider>
    );

    expect(wrapper.find('.dashboard').exists()).toEqual(true);
  });

  describe('componentWillMount', () => {
    it('calls history.push if there is no jwt', () => {
      const dispatch = jest.fn();
      const pushFn = jest.fn();
      const wrapper = mount(
        <Provider store={mockStore(mockInitialState)}>
          <DashboardPage history={{ push: pushFn }} dispatch={dispatch} />
        </Provider>
      );

      expect(pushFn).toHaveBeenCalledTimes(1);
      expect(dispatch).toHaveBeenCalledTimes(0);
    });

    it('calls dispatch twice if there is a JWT', () => {
      sessionStorage.setItem('jwt', '1234');
      const dispatch = jest.fn();
      const pushFn = jest.fn();
      const user = sessionStorage.getItem('user');
      const { store, invoke } = create();

      invoke(dispatch => {
        dispatch(spinnerTrue());
        dispatch(fetchTradeTransactionsByUser(user.id));
      });

      const wrapper = mount(
        <Provider store={mockStore(mockInitialState)}>
          <DashboardPage history={{ push: pushFn }} />
        </Provider>
      );

      expect(pushFn).toHaveBeenCalledTimes(0);
      expect(store.dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
