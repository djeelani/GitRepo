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
});
