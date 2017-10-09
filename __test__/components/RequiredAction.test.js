import { mount } from 'enzyme';
import React from 'react';

import RequiredAction from '../../src/components/RequiredAction';

describe('Component: RequiredAction', () => {
  const spy = jest.fn();
  const txContextApproveRejectActionRequired = {
    currentStatusCode: 'PND_CP_APR',
    role: 'SELLER-SME',
    statusDisplay: 'Pending Counter-party Approval',
    actionRequired: true,
    actionType: 'approveRejectAction',
    info: 'No action required at this moment. Pending with counter-party for approval',
    approveRejectAction: {
      approve: {
        text: 'Approve',
      },
      reject: {
        text: 'Reject',
      },
    },
  };

  const txContextTrackingActionRequired = {
    currentStatusCode: 'READY_SHIP',
    role: 'SELLER-SME',
    statusDisplay: 'Ready For Shipment',
    actionRequired: true,
    info: 'Please provide Tracking ID for the shipment.',
    actionType: 'trackingAction',
    trackingAction: {
      trackingId: {
        type: 'textbox',
        label: 'Tracking ID',
      },
      shipped: {
        type: 'button',
        text: 'Ready For Shipment',
        dltAction: 'api/trade/5/status/shipped',
        postDltAction: 'api/applications/5/status/SHIPPED',
      },
    },
  };

  const txContextInTransitAfterShipped = {
    currentStatusCode: 'SHIPPED',
    role: 'SELLER-SME',
    statusDisplay: 'Shipped',
    actionRequired: false,
    info: "Your shipment is currently in transit to it's destination. Your Tracking ID is <span class='dashboard-transaction-action__info'>TRACK01</span>",
  };

  const txContextNoActionRequired = {
    currentStatusCode: 'PND_CP_APR',
    role: 'SELLER-SME',
    statusDisplay: 'Pending Counter-party Approval',
    actionRequired: false,
    info: 'No action required at this moment. Pending with counter-party for approval',
  };

  const txContextShipmentActionRequired = {
    currentStatusCode: 'STARTED',
    role: 'SELLER-SME',
    statusDisplay: 'Started',
    actionRequired: true,
    info: 'Trade-application is in progress. You may specify for shipment when ready.',
    actionType: 'shipmentAction',
    shipmentAction: {
      text: 'Ready For Shipment',
    },
  };

  const txContextPaymentActionRequired = {
    currentStatusCode: 'DELIVERED',
    role: 'BUYER-SME',
    statusDisplay: 'Delivered',
    actionRequired: true,
    info: 'Once payment has been initiated, please update transaction.',
    actionType: 'paymentAction',
    paymentAction: {
      text: 'Payment Initiated',
    },
  };

  const approveRejectActionRequired = mount(
    <RequiredAction
      transactionContext={txContextApproveRejectActionRequired}
      transactionApplicationId={1}
      handleOnClick={spy}
    />
  );

  const noRequiredAction = mount(
    <RequiredAction
      transactionContext={txContextNoActionRequired}
      transactionApplicationId={1}
      handleOnClick={spy}
    />
  );

  const trackingActionRequired = mount(
    <RequiredAction
      transactionContext={txContextTrackingActionRequired}
      transactionApplicationId={5}
      handleOnClick={spy}
      handleOnChange={spy}
    />
  );

  const inTransitSection = mount(
    <RequiredAction
      transactionContext={txContextInTransitAfterShipped}
      transactionApplicationId={1}
      handleOnClick={spy}
    />
  );

  const shipmentActionRequired = mount(
    <RequiredAction
      transactionContext={txContextShipmentActionRequired}
      transactionApplicationId={1}
      handleOnClick={spy}
    />
  );

  const paymentRequiredAction = mount(
    <RequiredAction
      transactionContext={txContextPaymentActionRequired}
      transactionApplicationId={1}
      handleOnClick={spy}
    />
  );

  it('renders when approveRejectActionRequired is true', () => {
    expect(
      approveRejectActionRequired
        .find('ApproveRejectAction')
        .find('ActionButton').nodes[0].props.text
    ).toEqual('Approve');

    expect(
      approveRejectActionRequired
        .find('ApproveRejectAction')
        .find('ActionButton').nodes[1].props.text
    ).toEqual('Reject');
  });

  it('renders when trackingActionRequired is true', () => {
    expect(
      trackingActionRequired
        .find('TrackingAction')
        .find('TrackingInput')
        .exists()
    ).toEqual(true);
    expect(
      trackingActionRequired
        .find('TrackingAction')
        .find('ActionButton')
        .exists()
    ).toEqual(true);
  });

  it('renders when noRequiredAction is true', () => {
    expect(noRequiredAction.find('NoAction').exists()).toEqual(true);
  });

  it('renders In Transit section when the status is shipped', () => {
    expect(inTransitSection.find('.dashboard__transaction-row-h3').text()).toBe(
      'IN TRANSIT'
    );
  });

  it('renders when shipmentActionRequired is true', () => {
    expect(
      shipmentActionRequired
        .find('ShipmentAction')
        .find('ActionButton')
        .exists()
    ).toEqual(true);
  });

  it('renders when paymentRequiredAction is true', () => {
    expect(
      paymentRequiredAction.find('PaymentAction').find('ActionButton').exists()
    ).toEqual(true);
  });
});
