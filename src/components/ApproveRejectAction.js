import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import RenderSpinner from './RenderSpinner';

const ApproveRejectAction = ({
  info,
  transactionApplicationId,
  handleOnClick,
  approveRejectAction,
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
          dltAction={approveRejectAction.approve.dltAction}
          postDltAction={approveRejectAction.approve.postDltAction}
          text={approveRejectAction.approve.text}
          className="dashboard_transaction-btn"
          divclassName="dashboard_transaction-approve-button--width"
          transactionApplicationId={transactionApplicationId}
          handleOnClick={handleOnClick}
          disabled={disabled}
          actionType={actionType}
        />
        <ActionButton
          dltAction={approveRejectAction.reject.dltAction}
          postDltAction={approveRejectAction.reject.postDltAction}
          text={approveRejectAction.reject.text}
          className="dashboard_transaction-btn"
          divclassName="dashboard_transaction-reject-button--width"
          transactionApplicationId={transactionApplicationId}
          handleOnClick={handleOnClick}
          disabled={disabled}
          actionType={actionType}
        />
        <RenderSpinner
          spinner={disabled}
          className="dashboard_transaction-two-button-spinner"
        />
      </div>
    </div>
  );
};

ApproveRejectAction.propTypes = {
  info: PropTypes.string,
  handleOnClick: PropTypes.func,
  approveRejectAction: PropTypes.object,
  transactionApplicationId: PropTypes.number,
  actionType: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ApproveRejectAction;
