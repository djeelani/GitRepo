import React from 'react';
import PropTypes from 'prop-types';
import ApproveRejectAction from './ApproveRejectAction';
import NoAction from './NoAction';
import ShipmentAction from './ShipmentAction';
import TrackingAction from './TrackingAction';
import PaymentAction from './PaymentAction';

import {
  APPROVE_REJECT_ACTION__TYPE,
  TRACKING_ACTION__TYPE,
  SHIPMENT_ACTION__TYPE,
  PAYMENT_ACTION__TYPE,
  SHIPPED,
  ACTION_REQUIRED,
  IN_TRANSIT,
} from '../utils/constants';

const RequiredAction = ({
  transactionContext,
  transactionApplicationId,
  handleOnClick,
  handleOnChange,
  handleOnClickManageApp,
  disabled,
}) => {
  const renderActionRequired = transactionContext => {
    if (
      transactionContext.actionRequired &&
      transactionContext.actionType === APPROVE_REJECT_ACTION__TYPE
    ) {
      return (
        <ApproveRejectAction
          info={transactionContext.info}
          transactionApplicationId={transactionApplicationId}
          handleOnClick={handleOnClick}
          approveRejectAction={transactionContext.approveRejectAction}
          actionType={transactionContext.actionType}
          disabled={disabled}
        />
      );
    } else if (
      transactionContext.actionRequired &&
      transactionContext.actionType === TRACKING_ACTION__TYPE
    ) {
      return (
        <TrackingAction
          info={transactionContext.info}
          transactionApplicationId={transactionApplicationId}
          handleOnClick={handleOnClick}
          handleOnChange={handleOnChange}
          trackingAction={transactionContext.trackingAction}
          actionType={transactionContext.actionType}
          disabled={disabled}
        />
      );
    } else if (
      transactionContext.actionRequired &&
      transactionContext.actionType === SHIPMENT_ACTION__TYPE
    ) {
      return (
        <ShipmentAction
          info={transactionContext.info}
          transactionApplicationId={transactionApplicationId}
          handleOnClick={handleOnClick}
          shipmentAction={transactionContext.shipmentAction}
          actionType={transactionContext.actionType}
          disabled={disabled}
        />
      );
    } else if (
      transactionContext.actionRequired === true &&
      transactionContext.actionType === PAYMENT_ACTION__TYPE
    ) {
      return (
        <PaymentAction
          info={transactionContext.info}
          transactionApplicationId={transactionApplicationId}
          handleOnClick={handleOnClick}
          paymentAction={transactionContext.paymentAction}
          actionType={transactionContext.actionType}
          disabled={disabled}
        />
      );
    } else {
      return (
        <NoAction
          info={transactionContext.info}
          divClassName="dashboard__transaction-row-action"
          textClassName="dashboard__transaction-row-h4"
          handleOnClickManageApp={handleOnClickManageApp}
        />
      );
    }
  };

  const renderInfoHeader = transactionContext => {
    if (transactionContext.currentStatusCode === SHIPPED) {
      return IN_TRANSIT;
    } else {
      return ACTION_REQUIRED;
    }
  };

  return (
    <div className="dashboard__required-action">
      <h3 className="dashboard__transaction-row-h3">
        {renderInfoHeader(transactionContext)}
      </h3>
      {renderActionRequired(transactionContext)}
    </div>
  );
};

RequiredAction.propTypes = {
  transactionContext: PropTypes.object,
  handleOnClick: PropTypes.func,
  handleOnChange: PropTypes.func,
  transactionApplicationId: PropTypes.number,
  handleOnClickManageApp: PropTypes.func,
  disabled: PropTypes.bool,
};

export default RequiredAction;
