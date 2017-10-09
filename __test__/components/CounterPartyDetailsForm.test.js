import { shallow } from 'enzyme';
import React from 'react';
import CounterPartyDetailsForm
  from '../../src/components/CounterPartyDetailsForm';
import { mount } from 'enzyme';

describe('Component: CounterPartyDetailsForm', () => {
  it('renders the correct title', () => {
    const wrapper = mount(
      <CounterPartyDetailsForm counterPartyEinOrVatin="VAT125789" />
    );

    expect(
      wrapper.find('.counter-party-details-form__secondary-header').text()
    ).toBe('enter ein/vat id of the counter-party');
  });

  it('should call handleSearch when the Search button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <CounterPartyDetailsForm
        handleSearch={spy}
        counterPartyEinOrVatin="VAT125789"
      />
    );

    const cancelButton = wrapper.find('.counter-party-details-form__submit');
    cancelButton.simulate('click');
    expect(spy.mock.instances.length).toEqual(1);
  });
});
