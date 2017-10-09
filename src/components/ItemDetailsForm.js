import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

import { validatePresence } from '../utils/inputValidations';

import '../assets/stylesheets/ItemDetailsForm.scss';

const ItemDetailsForm = ({
  addClick,
  handleSubmit,
  createUI,
  itemName,
  unitPrice,
  quantity,
  type,
  total,
}) => {
  const formValid = () => {
    return (
      validatePresence(itemName) &&
      validatePresence(unitPrice) &&
      validatePresence(quantity) &&
      validatePresence(type) &&
      validatePresence(total)
    );
  };

  return (
    <form className="item-details-form">
      <h3 className="item-details-form__header">
        PLEASE COMPLETE ITEM DETAIL INFORMATION
      </h3>
      {createUI}
      <div>
        <a className="item-details__add-link" onClick={addClick}>
          Add item
        </a>
      </div>
      <Button
        className="btn item-details-form__submit"
        disabled={!formValid()}
        label="Continue"
        onClick={handleSubmit}
        primary
        flat
      />
    </form>
  );
};

ItemDetailsForm.propTypes = {
  addClick: PropTypes.func,
  handleSubmit: PropTypes.func,
  createUI: PropTypes.array,
  itemName: PropTypes.array,
  unitPrice: PropTypes.array,
  quantity: PropTypes.array,
  type: PropTypes.array,
  total: PropTypes.array,
};

export default ItemDetailsForm;
