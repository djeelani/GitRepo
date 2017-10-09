import React from 'react';
import PropTypes from 'prop-types';

import '../assets/stylesheets/ApplicationHeader.scss';

const ApplicationHeader = ({ activeTab }) => {
  const className = tabName => {
    if (tabName === activeTab) {
      return 'application-header__button active';
    } else {
      return 'application-header__button';
    }
  };

  return (
    <div className="application-header">
      <div className="application-header__container">
        <div className={className('counterPartyDetails')}>
          Counter-party Details
        </div>
        <div className={className('orderDetails')}>
          Order Details
        </div>
        <div className={className('itemDetails')}>
          Item Details
        </div>
        <div className={className('tradeConditions')}>
          Trade Conditions
        </div>
      </div>
    </div>
  );
};

ApplicationHeader.propTypes = {
  activeTab: PropTypes.string,
};

export default ApplicationHeader;
