import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import RenderSpinner from './RenderSpinner';

const ShipmentAction = ({
  info,
  transactionApplicationId,
  handleOnClick,
  shipmentAction,
  actionType,
  disabled,
}) => {
  return (
    <div className="dashboard__transaction-row-action">
      <div className="dashboard__transaction-row-h4">
        {ReactHtmlParser(info)}
      </div>
      <div className="dashboard__transaction-row-buttons">
        <ActionButton
          dltAction={shipmentAction.dltAction}
          postDltAction={shipmentAction.postDltAction}
          text={shipmentAction.text}
          className="dashboard_transaction-btn"
          transactionApplicationId={transactionApplicationId}
          handleOnClick={handleOnClick}
          actionType={actionType}
          disabled={disabled}
        />
        <RenderSpinner
          spinner={disabled}
          className="dashboard_transaction-one-button-spinner"
        />
      </div>
    </div>
  );
};

ShipmentAction.propTypes = {
  info: PropTypes.string,
  handleOnClick: PropTypes.func,
  shipmentAction: PropTypes.object,
  transactionApplicationId: PropTypes.number,
  actionType: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ShipmentAction;
