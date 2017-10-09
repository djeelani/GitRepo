import { shallow } from 'enzyme';
import React from 'react';
import LoginForm from '../../src/components/LoginForm';

describe('Component: LoginForm', () => {
  const spy = jest.fn();

  function loginWrapper(event) {
    if (event === 'change') {
      const wrapper = shallow(
        <LoginForm userName="user" password="password" onChange={spy} />
      );
      return wrapper;
    } else if (event === 'submit') {
      const wrapper = shallow(
        <LoginForm userName="user" password="password" onSubmit={spy} />
      );
      return wrapper;
    }
  }

  it('should enable the submit button when a valid email and password are provided', () => {
    const submitButton = loginWrapper('change').find('.login-form__submit');
    expect(submitButton.props().disabled).toEqual(false);
  });

  it('should call onSubmit when the login button is clicked', () => {
    const submitButton = loginWrapper('submit').find('.login-form__submit');
    submitButton.simulate('click');
    expect(spy).toHaveBeenCalled();
  });
});
