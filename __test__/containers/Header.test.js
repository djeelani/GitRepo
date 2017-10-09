import { mount } from 'enzyme';
import React from 'react';
import { Header } from '../../src/containers/Header';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';
import { Provider } from 'react-redux';
import {
  BUYER,
  SELLERBANK,
  BUYERBANK,
  SELLER,
  SELLERBANKER,
  BUYERBANKER,
} from '../../src/config/envConfig';

describe('Component: Header', () => {
  sessionStorage.setItem('user', JSON.stringify({}));
  const props = { location: { pathname: '/dashboard' } };
  let wrapper;
  beforeEach(() => {
    process.env.REACT_APP_ROLE = BUYERBANKER;

    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <Header history={props} />
      </Provider>
    );
  });

  afterEach(() => {
    delete process.env.REACT_APP_ROLE;
  });

  it('renders a Toolbar', () => {
    expect(wrapper.find('Toolbar').exists()).toBe(true);
  });

  it('renders three buttons', () => {
    expect(wrapper.find('.header__nav-button').length).toBe(3);
  });

  it('renders the buyer bank role', () => {
    expect(wrapper.find('.header__user-role').text()).toBe('Buyer Bank');
  });

  it('renders the seller bank role', () => {
    process.env.REACT_APP_ROLE = SELLERBANKER;
    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <Header history={props} />
      </Provider>
    );
    expect(wrapper.find('.header__user-role').text()).toBe('Seller Bank');
  });

  it('renders the seller role', () => {
    process.env.REACT_APP_ROLE = SELLER;
    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <Header history={props} />
      </Provider>
    );
    expect(wrapper.find('.header__user-role').text()).toBe('Seller');
  });

  it('renders the buyer role', () => {
    process.env.REACT_APP_ROLE = BUYER;
    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <Header history={props} />
      </Provider>
    );
    expect(wrapper.find('.header__user-role').text()).toBe('Buyer');
  });

  it('only renders two buttons if the user is a buyer', () => {
    process.env.REACT_APP_ROLE = BUYER;
    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <Header history={props} />
      </Provider>
    );
    expect(wrapper.find('.header__nav-button-hide').length).toBe(1);
  });

  it('renders the correct toolbar class name depending on the bank', () => {
    process.env.REACT_APP_BANK_CODE = SELLERBANK;
    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <Header history={props} />
      </Provider>
    );
    expect(wrapper.find('.header__toolbar.seller').length).toBe(1);
    expect(wrapper.find('.header__toolbar.buyer').length).toBe(0);
  });

  it('renders the correct toolbar class name depending on the bank', () => {
    process.env.REACT_APP_BANK_CODE = BUYERBANK;
    wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <Header history={props} />
      </Provider>
    );
    expect(wrapper.find('.header__toolbar.seller').length).toBe(0);
    expect(wrapper.find('.header__toolbar.buyer').length).toBe(1);
  });
});
