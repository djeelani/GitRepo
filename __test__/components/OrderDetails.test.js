import { shallow } from 'enzyme';
import React from 'react';

import OrderDetails from '../../src/components/OrderDetails';

describe('Component: OrderDetails', () => {
  const props = { deliveryDate: '2018-04-25', purchaseOrderNumber: '1' };
  const spy = jest.fn();
  const wrapper = shallow(
    <OrderDetails
      deliveryDate={props.deliveryDate}
      purchaseOrderNumber={props.purchaseOrderNumber}
      handlePurchaseEdit={spy}
    />
  );

  it('renders the order details title', () => {
    expect(wrapper.find('.divCenter-h2Class').text()).toBe('Order Details');
  });

  it('renders the order details', () => {
    expect(wrapper.find('.divCenter-h3Class').text())
      .toBe(`Order Number ${props.purchaseOrderNumber} is scheduled to be delivered by ${props.deliveryDate}.`);
  });

  it('calls handlePurchaseEdit when edit is clicked', () => {
    wrapper.find('.order-details__edit-button').simulate('click');
    expect(spy.mock.calls.length).toEqual(1);
  });
});
