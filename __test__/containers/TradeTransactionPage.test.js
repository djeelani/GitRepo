import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';

import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';
import TradeTransactionPage from '../../src/containers/TradeTransactionPage';

describe('Container: TradeTransactionPage', () => {
  let tradeTransactionPage;

  beforeEach(() => {
    sessionStorage.setItem('user', JSON.stringify({}));
    const history = {
      location: { pathname: '' },
      push: () => {},
    };
    const wrapper = shallow(
      <Provider store={mockStore(mockInitialState)}>
        <TradeTransactionPage history={history} itemDetailsActive={true} />
      </Provider>
    );
    tradeTransactionPage = wrapper.find(TradeTransactionPage);
  });

  it('renders without crashing', () => {
    expect(tradeTransactionPage.exists()).toBe(true);
  });
});
