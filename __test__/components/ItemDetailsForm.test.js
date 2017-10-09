import { shallow } from 'enzyme';
import React from 'react';
import ItemDetailsForm from '../../src/components/ItemDetailsForm';

describe('Component: ShipmentDetailsForm', () => {
  const spy = jest.fn();

  function shipmentDetailsWrapper(event) {
    if (event === 'submit') {
      const wrapper = shallow(
        <ItemDetailsForm
          handleSubmit={spy}
          createUI={[]}
          itemName={['name']}
          unitPrice={['2']}
          quantity={['2']}
          type={['type']}
          total={['12']}
        />
      );
      return wrapper;
    }
  }

  const mockedEvent = {
    preventDefault: () => {},
  };

  it('should call add Item when the addItem link is clicked', () => {
    const submitButton = shipmentDetailsWrapper('submit').find(
      '.item-details-form__submit'
    );
    submitButton.simulate('click', mockedEvent);
    expect(spy.mock.calls.length).toEqual(1);
  });
});
