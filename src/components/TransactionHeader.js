import React from 'react';

import '../assets/stylesheets/TransactionHeader.scss';

const TransactionHeader = () => {
  return (
    <div className="md-panel-header transaction-header" aria-pressed="false">
      <div className="transaction-header__column--status-icon" />
      <div className="transaction-header__column">
        <section className="transaction-header__section">Application</section>
      </div>
      <div className="transaction-header__column trade transaction-row__column--padding-right">
        <section className="transaction-header__section">Order No.</section>
      </div>
      <div className="transaction-header__column--role transaction-header__column--padding-right">
        <section className="transaction-header__section">Role</section>
      </div>
      <div className="transaction-header__column--company-name transaction-row__column--padding-right">
        <section className="transaction-header__section">Counter-party</section>
      </div>
      <div className="transaction-header__column">
        <section className="transaction-header__section">Start Date</section>
      </div>
      <div className="transaction-header__column transaction-header__column--padding-right">
        <section className="transaction-header__section">Status</section>
      </div>
      <div className="transaction-header__column">
        <section className="transaction-header__section">Date Modified</section>
      </div>
    </div>
  );
};

export default TransactionHeader;
