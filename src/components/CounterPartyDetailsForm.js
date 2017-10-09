import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import TextField from 'react-md/lib/TextFields';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import '../assets/stylesheets/CounterPartyDetailsForm.scss';
import { validatePresence } from '../utils/inputValidations';

const CounterPartyDetailsForm = ({
  counterPartyEinOrVatin,
  handleSearch,
  onFormChange,
  error,
  spinner,
}) => {
  const formValid = () => {
    return validatePresence(counterPartyEinOrVatin);
  };

  const renderSpinner = () => {
    if (spinner) {
      return <CircularProgress key="progress" id="progressId" />;
    }
  };

  return (
    <div className="counter-party-details-form">
      <div className="counter-party-details-form__container md-cell--6 md-cell--3-desktop-offset">
        <form className="counter-party-details-form__search-form">
          <div className="counter-party-details-form__search-form-container">
            <h3 className="counter-party-details-form__secondary-header">
              enter ein/vat id of the counter-party
            </h3>
            <TextField
              className="counter-party-details-form__text-input"
              inputClassName="font_size__normal"
              id="buyer-search"
              label="Counter-party's EIN/VAT ID"
              onChange={value => onFormChange('counterPartyEinOrVatin', value)}
              value={counterPartyEinOrVatin}
            />
          </div>

          <Button
            className="btn counter-party-details-form__submit"
            disabled={!formValid() || !!spinner}
            label="Continue"
            onClick={handleSearch}
            primary
            flat
            type="submit"
          />
        </form>
        {renderSpinner()}
        <div className="counter-party-details-form__error">
          {error}
        </div>
      </div>
    </div>
  );
};

CounterPartyDetailsForm.propTypes = {
  counterPartyEinOrVatin: PropTypes.string,
  handleSearch: PropTypes.func,
  onFormChange: PropTypes.func,
  error: PropTypes.string,
  spinner: PropTypes.bool,
};

export default CounterPartyDetailsForm;
