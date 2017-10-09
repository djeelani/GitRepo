import { shallow } from 'enzyme';
import React from 'react';
import TradeConditionsForm from '../../src/components/TradeConditionsForm';

describe('Component: CounterPartyForm', () => {
  it('renders the correct title', () => {
    const wrapper = shallow(<TradeConditionsForm />);
    expect(wrapper.find('.trade-condition-form__header').text()).toBe(
      'SELECT THE TRADE CONDITIONS THAT MUST BE FULFILLED'
    );
  });

  it('should call onCancel when the Cancel button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<TradeConditionsForm onCancel={spy} />);

    const cancelButton = wrapper.find('#cancel');
    cancelButton.simulate('click');
    expect(spy.mock.instances.length).toEqual(1);
  });

  it('should call onSaveAsDraft when the Save As Draft button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<TradeConditionsForm onSaveAsDraft={spy} />);

    const saveAsDraftButton = wrapper.find('#draft');
    saveAsDraftButton.simulate('click');
    expect(spy.mock.instances.length).toEqual(1);
  });

  it('should call onSubmit when the Submit button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(<TradeConditionsForm onSubmit={spy} />);

    const submitButton = wrapper.find('#submit');
    submitButton.simulate('click');
    expect(spy.mock.instances.length).toEqual(1);
  });
});
