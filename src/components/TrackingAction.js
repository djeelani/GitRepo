import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import TrackingInput from './TrackingInput';
import RenderSpinner from './RenderSpinner';

const TrackingAction = ({
  info,
  transactionApplicationId,
  handleOnClick,
  trackingAction,
  handleOnChange,
  actionType,
  disabled,
}) => {
  return (
    <div className="dashboard__transaction-row-action">
      <div className="dashboard__transaction-row-h4">
        {ReactHtmlParser(info)}
      </div>
      <div className="dashboard__transaction-row-buttons">
        <TrackingInput
          text={trackingAction.trackingId.label}
          trackingInputId={'trackingInputId' + transactionApplicationId}
          divclassName="dashboard_transaction-approve-button--width"
          className="font_size__normal"
          handleOnChange={handleOnChange}
          disabled={disabled}
        />
        <br />
        <ActionButton
          dltAction={trackingAction.shipped.dltAction}
          postDltAction={trackingAction.shipped.postDltAction}
          text={trackingAction.shipped.text}
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

TrackingAction.propTypes = {
  info: PropTypes.string,
  handleOnClick: PropTypes.func,
  handleOnChange: PropTypes.func,
  trackingAction: PropTypes.object,
  transactionApplicationId: PropTypes.number,
  actionType: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TrackingAction;
