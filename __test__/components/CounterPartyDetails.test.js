import { shallow } from 'enzyme';
import React from 'react';

import CounterPartyDetails from '../../src/components/CounterPartyDetails';

describe('Component: CounterPartyDetails', () => {
  const props = {
    location: { pathname: '/applications/new' },
    buyer: {
      companyName: 'Buyer Company',
    },
    currentUser: {
      companyName: 'Seller Company',
    },
  };
  const spy = jest.fn();
  const wrapper = shallow(
    <CounterPartyDetails
      history={props.location}
      buyer={props.buyer}
      handleTransactionDetailsEdit={spy}
      seller={props.currentUser}
    />
  );

  it('renders the counter party details title', () => {
    expect(wrapper.find('.divCenter-h2Class').text()).toBe(
      'Counter-party Details'
    );
  });

  it('renders the correct buyer company name', () => {
    expect(
      wrapper.find('.counter-party-details__buyer-company-name').text()
    ).toContain(props.buyer.companyName);
  });

  it('calls handleTransactionDetailsEdit when edit is clicked', () => {
    wrapper.find('.counter-party-details__edit-button').simulate('click');
    expect(spy.mock.calls.length).toEqual(1);
  });
});
