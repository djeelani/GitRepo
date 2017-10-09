import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import map from 'lodash/map';
import TextField from 'react-md/lib/TextFields';
import DatePicker from 'react-md/lib/Pickers/DatePickerContainer';
import SelectionControl from 'react-md/lib/SelectionControls/SelectionControl';
import Dialog from 'react-md/lib/Dialogs';
import FontIcon from 'react-md/lib/FontIcons';
import TrackStatusDataTable from '../components/TrackStatusDataTable';

import '../assets/stylesheets/PurchaseOrderForm.scss';
import '../assets/stylesheets/ItemDetailsForm.scss';
import '../assets/stylesheets/TradeConditionsForm.scss';
import '../assets/stylesheets/TrackStatus.scss';

const TransactionDeeperView = ({
  transaction,
  openDialog,
  closeDialog,
  visible,
}) => {
  const disableTrue = () => {
    return true;
  };

  const formatDate = date => {
    return moment(date).format('L');
  };

  const renderIndex = shipmentDetails => {
    let newShipmentDetails = [];
    for (var i = 0; i < shipmentDetails.length; i++) {
      var newItem = {};
      newItem.name = shipmentDetails[i].name;
      newItem.price = shipmentDetails[i].price;
      newItem.type = shipmentDetails[i].type;
      newItem.quantity = shipmentDetails[i].quantity;
      newItem.total = shipmentDetails[i].total;
      newItem.index = i;
      newShipmentDetails.push(newItem);
    }
    return newShipmentDetails;
  };

  const renderShipmentDetails = shipmentDetails => {
    let className;
    let newShipmentDetails = renderIndex(shipmentDetails);
    return map(newShipmentDetails, item => {
      if (item.index === 0) {
        className = 'hrHide';
      } else {
        className = 'hrShow';
      }
      return (
        <div className="mainDiv" key={item.index}>
          <hr className={className} />
          <div className="md-grid item-details-form__container">
            <div className="md-cell--4">
              <TextField
                id="itemName"
                label="Item name"
                defaultValue={item.name}
                lineDirection="center"
                type="text"
                disabled={disableTrue()}
                className="md-cell md-cell--bottom"
                inputClassName="font_size__normal"
              />
            </div>
            <div className="md-cell--1 devide-space" />
            <div className="md-cell--4">
              <TextField
                id="unitPrice"
                label="Unit Price"
                defaultValue={item.price}
                lineDirection="center"
                type="number"
                disabled={disableTrue()}
                className="md-cell md-cell--bottom"
                inputClassName="font_size__normal"
              />
            </div>
            <div className="md-cell--4">
              <TextField
                id="type"
                label="Type"
                defaultValue={item.type}
                lineDirection="center"
                type="text"
                disabled={disableTrue()}
                className="md-cell md-cell--bottom"
                inputClassName="font_size__normal"
              />
            </div>
            <div className="md-cell--1 devide-space" />
            <div className="md-cell--4">
              <TextField
                id="quantity"
                label="Quantity"
                defaultValue={item.quantity}
                lineDirection="center"
                type="number"
                disabled={disableTrue()}
                className="md-cell md-cell--bottom"
                inputClassName="font_size__normal"
              />
            </div>
            <div className="md-cell--4" />
            <div className="md-cell--1 devide-space" />
            <div className="md-cell--4">
              <TextField
                id="total"
                label="Total"
                defaultValue={item.total}
                lineDirection="center"
                type="number"
                disabled={disableTrue()}
                className="md-cell md-cell--bottom"
                inputClassName="font_size__normal"
              />
            </div>
          </div>
        </div>
      );
    });
  };

  const renderDialogTitle = () => {
    return (
      <div>
        <span className="track-status__dialog-title">
          {`Order NO. ${transaction.poNumber}`}
        </span>
        <FontIcon className="track-status__close-button" onClick={closeDialog}>
          close
        </FontIcon>
      </div>
    );
  };

  return (
    <div className="dashboard__transaction-row">
      <div className="dashboard__transaction-row-container">
        <h3 className="dashboard__transaction-row-h3">ORDER DETAILS</h3>
        <a
          className={
            transaction.status.displayText === 'Draft'
              ? 'track-status-disable-link'
              : 'track-status-link'
          }
          onClick={
            transaction.status.displayText === 'Draft'
              ? false
              : openDialog.bind(this, transaction.id)
          }
        >
          TRACK STATUS
        </a>
        <Dialog
          id="track-status-data-table"
          visible={visible}
          title={renderDialogTitle()}
          dialogClassName="track-status-dialog"
          onHide={closeDialog}
          initialFocus="#history-table"
        >
          <TrackStatusDataTable />
        </Dialog>
      </div>
      <form className="purchase-order-form purchase-order-form__deeper-view">
        <div className="md-grid purchase-order-form__container">
          <TextField
            id="purchaseOrderNumber"
            label="PO No."
            defaultValue={transaction.poNumber}
            lineDirection="center"
            className="md-cell md-cell--bottom purchase-order-form__input"
            inputClassName="font_size__normal"
            disabled={disableTrue()}
          />
          <TextField
            id="billOfLadingNumber"
            label="B/L No."
            defaultValue={transaction.billOfLadingNum}
            lineDirection="center"
            className="md-cell md-cell--bottom purchase-order-form__input"
            inputClassName="font_size__normal"
            disabled={disableTrue()}
          />
        </div>
        <div className="md-grid purchase-order-form__container">
          <DatePicker
            id="creationDate"
            label="Creation Date"
            defaultValue={formatDate(transaction.poCreationDate)}
            lineDirection="center"
            className="md-cell md-cell--bottom purchase-order-form__input"
            inputClassName="font_size__normal"
            disabled={disableTrue()}
          />
          <DatePicker
            id="deliveryDate"
            label="Delivery Date"
            defaultValue={formatDate(transaction.poDeliveryDate)}
            lineDirection="center"
            className="md-cell md-cell--bottom purchase-order-form__input"
            inputClassName="font_size__normal"
            disabled={disableTrue()}
          />
        </div>
        <div className="md-grid purchase-order-form__container">
          <TextField
            id="price"
            label="Amount"
            defaultValue={transaction.price}
            lineDirection="center"
            type="number"
            className="md-cell md-cell--bottom purchase-order-form__input"
            inputClassName="font_size__normal"
            disabled={disableTrue()}
          />
          <TextField
            id="currency"
            label="Currency"
            defaultValue={transaction.currency}
            className="md-cell md-cell--bottom purchase-order-form__input"
            inputClassName="font_size__normal"
            disabled={disableTrue()}
          />
        </div>
        <div className="md-grid purchase-order-form__container">
          <TextField
            id="incoterms"
            label="Incoterms"
            defaultValue={transaction.incoterms}
            className="md-cell md-cell--4 purchase-order-form__input"
            inputClassName="font_size__normal"
            disabled={disableTrue()}
          />
          <TextField
            id="deliveryAddress"
            label="Delivery Address"
            defaultValue={transaction.deliveryAddress}
            rows={3}
            lineDirection="center"
            className="md-cell md-cell--bottom purchase-order-form__input"
            inputClassName="font_size__normal"
            disabled={disableTrue()}
          />
        </div>
      </form>
      <h3 className="dashboard__transaction-row-h3">ITEM DETAILS</h3>
      <form className="item-details-form item-details-form__deeper-view">
        {renderShipmentDetails(transaction.shipmentDetails)}
      </form>
      <h3 className="dashboard__transaction-row-h3">TRADE CONDITIONS</h3>
      <form className="trade-condition-form dashboard__transaction-trade-conditions">
        <div className="md-grid">
          <SelectionControl
            id="paymentChecked"
            name="paymentChecked"
            label="Payment Guarantee"
            inline
            checked={transaction.paymentGuarantee}
            className="md-cell md-cell--bottom trade-condition-form__checkbox"
            type="radio"
            disabled={disableTrue()}
            checkedRadioIconClassName="material-icons dashboard__transaction-checkbox"
            uncheckedRadioIconClassName="material-icons dashboard__transaction-checkbox"
          />
          <SelectionControl
            id="invoiceChecked"
            name="invoiceChecked"
            label="Invoice Financing"
            checked={transaction.invoiceFinancing}
            className="md-cell md-cell--bottom trade-condition-form__checkbox"
            type="radio"
            disabled={disableTrue()}
            checkedRadioIconClassName="material-icons dashboard__transaction-checkbox"
            uncheckedRadioIconClassName="material-icons dashboard__transaction-checkbox"
          />
        </div>
      </form>
    </div>
  );
};
TransactionDeeperView.propTypes = {
  transaction: PropTypes.object,
  openDialog: PropTypes.func,
  closeDialog: PropTypes.func,
  visible: PropTypes.bool,
};

export default TransactionDeeperView;
