import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons/Button';
import SelectField from 'react-md/lib/SelectFields';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';

import '../assets/stylesheets/PurchaseOrderForm.scss';

const selectCurrency = [
  {
    type: 'USD',
    value: 'USD',
  },
  {
    type: 'INR',
    value: 'INR',
  },
];

const selectIncoTerms = [
  {
    type: 'CFR',
    value: 'CFR',
  },
  {
    type: 'FOB',
    value: 'FOB',
  },
];

const currency = [''].concat(selectCurrency);
const incoTerms = [''].concat(selectIncoTerms);

const PurchaseOrderForm = ({
  state,
  handleChange,
  formValid,
  onSubmit,
  minDeliveryDate,
}) => {
  return (
    <form className="purchase-order-form">
      <h3 className="purchase-order-form__header">
        PLEASE COMPLETE ORDER DETAIL INFORMATION
      </h3>
      <div className="md-grid purchase-order-form__container">
        <TextField
          id="purchaseOrderNumber"
          label="PO No."
          onChange={value => handleChange('purchaseOrderNumber', value)}
          value={state.purchaseOrderNumber || ''}
          lineDirection="center"
          className="md-cell md-cell--bottom purchase-order-form__input"
          inputClassName="font_size__normal"
          required
        />
        <TextField
          id="billOfLadingNumber"
          label="B/L No."
          onChange={value => handleChange('billOfLadingNumber', value)}
          value={state.billOfLadingNumber || ''}
          lineDirection="center"
          className="md-cell md-cell--bottom purchase-order-form__input"
          inputClassName="font_size__normal"
          required
        />
      </div>
      <div className="md-grid purchase-order-form__container">
        <DatePicker
          id="creationDate"
          label="Creation Date"
          onChange={value => handleChange('creationDate', value)}
          value={state.creationDate || null}
          lineDirection="center"
          className="md-cell md-cell--bottom purchase-order-form__input"
          inputClassName="font_size__normal"
          autoOk={true}
          inline
          required
        />
        <DatePicker
          id="deliveryDate"
          label="Delivery Date"
          onChange={value => handleChange('deliveryDate', value)}
          value={state.deliveryDate || null}
          lineDirection="center"
          className="md-cell md-cell--bottom purchase-order-form__input"
          inputClassName="font_size__normal"
          minDate={minDeliveryDate}
          autoOk={true}
          inline
          required
        />
      </div>
      <div className="md-grid purchase-order-form__container">
        <TextField
          id="price"
          label="Amount"
          onChange={value => handleChange('price', value)}
          value={state.price || ''}
          lineDirection="center"
          type="text"
          className="md-cell md-cell--bottom purchase-order-form__input"
          inputClassName="font_size__normal"
          required
        />
        <SelectField
          id="currency"
          label="Currency"
          menuItems={currency}
          onChange={value => handleChange('currency', value)}
          value={state.currency || ''}
          className="md-cell md-cell--bottom purchase-order-form__input"
          inputClassName="font_size__normal"
          required
          itemLabel="type"
          itemValue="value"
        />
      </div>
      <div className="md-grid purchase-order-form__container">
        <SelectField
          id="incoterms"
          label="Incoterms"
          menuItems={incoTerms}
          onChange={value => handleChange('incoterms', value)}
          value={state.incoterms || ''}
          className="md-cell md-cell--4 purchase-order-form__input"
          inputClassName="font_size__normal"
          required
          itemLabel="type"
          itemValue="value"
        />
        <TextField
          id="deliveryAddress"
          label="Delivery Address"
          onChange={value => handleChange('deliveryAddress', value)}
          value={state.deliveryAddress || ''}
          rows={3}
          lineDirection="center"
          className="md-cell md-cell--bottom purchase-order-form__input"
          inputClassName="font_size__normal"
          required
        />
      </div>
      <div className="md-grid purchase-order-form__container purchase-order-form__button-container">
        <Button
          disabled={!formValid()}
          label="Continue"
          onClick={onSubmit}
          primary
          flat
          className="btn purchase-order-form__submit"
        />
      </div>
    </form>
  );
};

PurchaseOrderForm.propTypes = {
  state: PropTypes.object,
  handleChange: PropTypes.func,
  formValid: PropTypes.func,
  onSubmit: PropTypes.func,
  minDeliveryDate: PropTypes.object,
};

export default PurchaseOrderForm;
