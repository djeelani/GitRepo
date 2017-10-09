import React from 'react';
import PropTypes from 'prop-types';
import FontIcon from 'react-md/lib/FontIcons';
import Button from 'react-md/lib/Buttons/Button';

import { SELLER } from '../config/envConfig';

const CounterPartyDetails = ({
  buyer,
  handleTransactionDetailsEdit,
  seller,
}) => {
  const role = process.env.REACT_APP_ROLE;
  const renderTraderRole = role => {
    if (role === SELLER) {
      return 'Seller';
    } else {
      return 'Buyer';
    }
  };

  return (
    <div>
      <h2 className="divCenter-h2Class">Counter-party Details</h2>
      <h3 className="divCenter-h3Class">
        <span className="counter-party-details__seller-company-name">
          {seller.companyName} ({renderTraderRole(role)})
        </span>
        <FontIcon className="confirm-buyer__arrow">
          trending_flat
        </FontIcon>
        <span className="counter-party-details__buyer-company-name">
          {buyer.companyName} ({renderTraderRole()})
        </span>
      </h3>
      <div className="conditions">
        <Button
          label="Edit"
          onClick={handleTransactionDetailsEdit}
          primary
          flat
          className="btn counter-party-details__edit-button"
        />
      </div>
      <hr className="hrBottom" />
    </div>
  );
};

CounterPartyDetails.propTypes = {
  buyer: PropTypes.object,
  handleTransactionDetailsEdit: PropTypes.func,
  seller: PropTypes.object,
};

export default CounterPartyDetails;
