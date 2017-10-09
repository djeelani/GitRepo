import React from 'react';
import PropTypes from 'prop-types';

import '../assets/stylesheets/TransactionRow.scss';

const TransactionRow = ({
  statusIcon,
  applicationId,
  poNumber,
  presentRole,
  companyName,
  poCreationDatecreatedAt,
  status,
  updatedAt,
}) => {
  return (
    <div
      role="button"
      className="md-panel-header transaction-row"
      aria-pressed="false"
    >
      <div className="transaction-row__column--status-icon">
        <section>
          {statusIcon}
        </section>
      </div>
      <div className="transaction-row__column">
        <section>
          {applicationId}
        </section>
      </div>
      <div className="transaction-row__column transaction-row__column--padding-right">
        <section className="transaction-row__section--nowrap">
          {poNumber}
        </section>
      </div>
      <div className="transaction-row__column--role transaction-row__column--padding-right">
        <section>
          {presentRole}
        </section>
      </div>
      <div className="transaction-row__column--company-name transaction-row__column--padding-right">
        <section className="transaction-row__section--nowrap">
          {companyName}
        </section>
      </div>
      <div className="transaction-row__column">
        <section>
          {poCreationDatecreatedAt}
        </section>
      </div>
      <div className="transaction-row__column transaction-row__column--padding-right">
        <section>
          {status}
        </section>
      </div>
      <div className="transaction-row__column">
        <section>
          {updatedAt}
        </section>
      </div>
    </div>
  );
};

TransactionRow.propTypes = {
  statusIcon: PropTypes.object,
  applicationId: PropTypes.number,
  poNumber: PropTypes.string,
  presentRole: PropTypes.string,
  companyName: PropTypes.string,
  poCreationDatecreatedAt: PropTypes.string,
  status: PropTypes.string,
  updatedAt: PropTypes.string,
};

export default TransactionRow;
