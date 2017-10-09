import React from 'react';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import UploadDocument from '../containers/UploadDocument';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import '../assets/stylesheets/TradeConditionsForm.scss';

const CounterPartyForm = ({
  onCancel,
  paymentGuaranteeRequested,
  invoiceFinancingRequested,
  onSubmit,
  handleInputChange,
  spinner,
  onSaveAsDraft,
}) => {
  const renderSpinner = () => {
    if (spinner) {
      return <CircularProgress key="progress" id="progressId" />;
    }
  };

  return (
    <form className="trade-condition-form">
      <h3 className="trade-condition-form__header">
        SELECT THE TRADE CONDITIONS THAT MUST BE FULFILLED
      </h3>
      <div className="md-grid trade-condition-form__checkbox-container">
        <Checkbox
          id="paymentChecked"
          name="paymentChecked"
          label="Payment Guarantee"
          onChange={value =>
            handleInputChange('paymentGuaranteeRequested', value)}
          checked={paymentGuaranteeRequested}
          inline
          className="md-cell md-cell--bottom trade-condition-form__checkbox"
        />
        <Checkbox
          id="invoiceChecked"
          name="invoiceChecked"
          label="Invoice Financing"
          onChange={value =>
            handleInputChange('invoiceFinancingRequested', value)}
          checked={invoiceFinancingRequested}
          inline
          className="md-cell md-cell--bottom trade-condition-form__checkbox"
        />
      </div>
      <div className="trade-condition-form__upload-document">
        <UploadDocument />
      </div>
      {renderSpinner()}
      <div className="md-grid trade-condition-form__button-style">
        <Button
          id="draft"
          raised
          disabled={!!spinner}
          label="Save as Draft"
          onClick={onSaveAsDraft}
          className="md-cell md-cell--bottom trade-condition-form__button"
        />
        <Button
          id="submit"
          raised
          disabled={!!spinner}
          label="Submit"
          onClick={onSubmit}
          type="submit"
          className="md-cell md-cell--bottom trade-condition-form__button"
        />
        <Button
          id="cancel"
          raised
          disabled={!!spinner}
          label="Cancel Order"
          onClick={onCancel}
          className="md-cell md-cell--bottom trade-condition-form__button"
        />
      </div>
    </form>
  );
};

CounterPartyForm.propTypes = {
  paymentGuaranteeRequested: PropTypes.bool,
  invoiceFinancingRequested: PropTypes.bool,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  onSaveAsDraft: PropTypes.func,
  handleInputChange: PropTypes.func,
  spinner: PropTypes.bool,
};

export default CounterPartyForm;
