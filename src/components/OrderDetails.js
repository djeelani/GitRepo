import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

const OrderDetails = ({
  deliveryDate,
  purchaseOrderNumber,
  handlePurchaseEdit,
}) => {
  return (
    <div>
      <h2 className="divCenter-h2Class">Order Details</h2>
      <h3 className="divCenter-h3Class">
        {`Order Number ${purchaseOrderNumber} is scheduled to be delivered by ${deliveryDate}.`}
      </h3>
      <div className="conditions">
        <Button
          label="Edit"
          onClick={handlePurchaseEdit}
          primary
          flat
          className="btn order-details__edit-button"
        />
      </div>
      <hr className="hrTop" />
    </div>
  );
};

OrderDetails.propTypes = {
  purchaseOrderNumber: PropTypes.string,
  deliveryDate: PropTypes.string,
  handlePurchaseEdit: PropTypes.func,
};

export default OrderDetails;
