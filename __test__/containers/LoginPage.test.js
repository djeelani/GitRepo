import React from 'react';
import { Provider } from 'react-redux';
import LoginPage from '../../src/containers/LoginPage';
import { mount } from 'enzyme';
import { mockInitialState, mockStore } from '../__mocks__/mockInitialState';

describe('Component: LoginPage', () => {
  let loginPage;
  beforeEach(() => {
    const wrapper = mount(
      <Provider store={mockStore(mockInitialState)}>
        <LoginPage />
      </Provider>
    );
    loginPage = wrapper.find(LoginPage);
  });

  it('renders without crashing', () => {
    expect(loginPage.exists()).toBe(true);
  });

  it('renders the login form', () => {
    expect(loginPage.find('.login-form').exists()).toBe(true);
  });
});
