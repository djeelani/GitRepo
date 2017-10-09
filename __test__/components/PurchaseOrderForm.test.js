import React from 'react';
import { shallow } from 'enzyme';
import PurchaseOrderForm from '../../src/components/PurchaseOrderForm';

describe('Component: PurchaseOrderForm', () => {
  const initialState = {};

  it('should pass data to onChange() when form values are updated', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <PurchaseOrderForm
        state={initialState}
        handleChange={spy}
        formValid={() => {}}
      />
    );

    wrapper.find('#purchaseOrderNumber').simulate('change', 'PO1234');
    wrapper.find('#billOfLadingNumber').simulate('change', 'BLD1234');
    wrapper.find('#creationDate').simulate('change', '6/16/2017');
    wrapper.find('#deliveryDate').simulate('change', '6/30/2017');
    wrapper.find('#price').simulate('change', 300.0);
    wrapper.find('#currency').simulate('change', 'INR');
    wrapper.find('#incoterms').simulate('change', 'CFR');
    wrapper.find('#deliveryAddress').simulate('change', 'Bangalore, IN');

    expect(spy.mock.calls.length).toEqual(8);
    expect(spy.mock.calls[0][0]).toEqual('purchaseOrderNumber');
    expect(spy.mock.calls[0][1]).toEqual('PO1234');
    expect(spy.mock.calls[1][0]).toEqual('billOfLadingNumber');
    expect(spy.mock.calls[1][1]).toEqual('BLD1234');
    expect(spy.mock.calls[2][0]).toEqual('creationDate');
    expect(spy.mock.calls[2][1]).toEqual('6/16/2017');
    expect(spy.mock.calls[3][0]).toEqual('deliveryDate');
    expect(spy.mock.calls[3][1]).toEqual('6/30/2017');
    expect(spy.mock.calls[4][0]).toEqual('price');
    expect(spy.mock.calls[4][1]).toEqual(300.0);
    expect(spy.mock.calls[5][0]).toEqual('currency');
    expect(spy.mock.calls[5][1]).toEqual('INR');
    expect(spy.mock.calls[6][0]).toEqual('incoterms');
    expect(spy.mock.calls[6][1]).toEqual('CFR');
    expect(spy.mock.calls[7][0]).toEqual('deliveryAddress');
    expect(spy.mock.calls[7][1]).toEqual('Bangalore, IN');
  });

  it('should call handleSubmit when the Continue button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <PurchaseOrderForm
        state={initialState}
        formValid={() => {}}
        onSubmit={spy}
      />
    );
    const mockedEvent = {
      preventDefault: () => {},
    };

    wrapper.find('.purchase-order-form__submit').simulate('click', mockedEvent);
    expect(spy.mock.calls.length).toEqual(1);
  });

  it('should call minDeliveryDate when the Continue button is clicked', () => {
    const spy = jest.fn();
    const wrapper = shallow(
      <PurchaseOrderForm
        state={initialState}
        formValid={() => {}}
        onSubmit={spy}
        handleChange={spy}
        minDeliveryDate={new Date('6/16/2017')}
      />
    );
    const mockedEvent = {
      preventDefault: () => {},
    };

    wrapper.find('.purchase-order-form__submit').simulate('click', mockedEvent);
    expect(spy.mock.calls.length).toEqual(1);
    expect(wrapper.find('#deliveryDate').node.props.minDate).toEqual(
      new Date('6/16/2017')
    );
  });
});
