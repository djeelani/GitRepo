import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from 'react-md/lib/TextFields';
import Dialog from 'react-md/lib/Dialogs';
import Button from 'react-md/lib/Buttons/Button';
import moment from 'moment';

import ItemDetailsForm from '../components/ItemDetailsForm';
import TradeConditionsForm from '../components/TradeConditionsForm';
import CounterPartyDetailsForm from '../components/CounterPartyDetailsForm';
import ApplicationHeader from '../components/ApplicationHeader';
import {
  validatePresence,
  validPositiveNumber,
} from '../utils/inputValidations';
import PurchaseOrderForm from '../components/PurchaseOrderForm';
import CounterPartyDetails from '../components/CounterPartyDetails';
import OrderDetails from '../components/OrderDetails';

import {
  searchUser,
  saveTransaction,
  editSearchUserSuccess,
  setItemDetailsActive,
  setOrderDetailsActive,
  setTradeConditionsActive,
  setCounterPartyDetailsActive,
  showFailureTransactionFalse,
  saveTransactionAsDraft,
  draftDialogFalse,
  clearUploadedDocuments,
  updateUnitPrice,
  updateQuantity,
} from '../actions/tradeTransactions';
import { spinnerTrue } from '../actions/auth';
import { SELLER } from '../config/envConfig';

import '../assets/stylesheets/TradeTransactionPage.scss';

class TradeTransactionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tradeTransaction: {
        id: props.id || '',
        counterPartyEinOrVatin: props.counterPartyEinOrVatin || '',
        purchaseOrderNumber: props.purchaseOrderNumber || '',
        billOfLadingNumber: props.billOfLadingNumber || '',
        creationDate: props.creationDate || '',
        deliveryDate: props.deliveryDate || '',
        price: props.price || '',
        currency: props.currency || '',
        incoterms: props.incoterms || '',
        deliveryAddress: props.deliveryAddress || '',
        paymentGuaranteeRequested: props.paymentGuaranteeRequested || false,
        invoiceFinancingRequested: props.invoiceFinancingRequested || false,
        items: [
          {
            name: '',
            price: '',
            type: '',
            quantity: '',
            total: '',
          },
        ],
        documents: props.documents || [
          {
            name: '',
            url: '',
            hash: '',
          },
        ],
      },
      itemName: props.itemName || [],
      unitPrice: props.unitPrice || [],
      type: props.type || [],
      quantity: props.quantity || [],
      total: props.total || [],
      showNewItemForm: props.showNewItemForm || [],
      count: props.count || 1,
      totalPrice: props.totalPrice || '',
      totalAmount: props.totalAmount || '',
      minDeliveryDate: new Date(),
      itemDetailsValidation: false,
    };
  }

  validatePOForm() {
    return (
      validatePresence(this.state.tradeTransaction.purchaseOrderNumber) &&
      validatePresence(this.state.tradeTransaction.billOfLadingNumber) &&
      validatePresence(this.state.tradeTransaction.deliveryDate) &&
      validatePresence(this.state.tradeTransaction.price) &&
      validatePresence(this.state.tradeTransaction.currency) &&
      validatePresence(this.state.tradeTransaction.incoterms) &&
      validatePresence(this.state.tradeTransaction.deliveryAddress)
    );
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(setItemDetailsActive());
  }

  handlePurchaseEdit() {
    this.props.dispatch(setOrderDetailsActive());
  }

  handleChange(i, stateObject, stateName, event) {
    let value = stateObject.slice();
    value[i] = event;
    this.setState({ [stateName]: value });
  }

  handleChangeForTotal(i, stateObject, stateName, event, updatedValue) {
    let value = stateObject.slice();
    let unitPrice = this.state.unitPrice;
    let quantity = this.state.quantity;
    value[i] = event;
    this.setState({ [stateName]: value });
    let changedValue = parseInt(value[i], 10);
    if (stateName === 'unitPrice') {
      this.props.dispatch(updateUnitPrice(changedValue));
      if (validPositiveNumber(updatedValue)) {
        unitPrice[i] = updatedValue;
      } else {
        unitPrice[i] = '';
      }
      this.setState({ unitPrice });
    } else {
      this.props.dispatch(updateQuantity(changedValue));
      if (validPositiveNumber(updatedValue)) {
        quantity[i] = updatedValue;
      } else {
        quantity[i] = '';
      }
      this.setState({ quantity });
    }
    if (quantity[i] !== undefined && unitPrice[i] !== undefined) {
      let total = this.state.total;
      total[i] = this.state.unitPrice[i] * this.state.quantity[i];
      this.setState({ total });
    }
  }

  handleSubmit() {
    var shipments = [];
    var ship = {};
    var totalQuantity = 0;
    var totalAmount = 0;
    var validation = false;
    for (let i = 0; i < this.state.count; i++) {
      var shipment = {};
      var nameBoolean = false;
      var priceBoolean = false;
      var typeBoolean = false;
      var quantityBoolean = false;
      var totalBoolean = false;

      shipment.name =
        this.state.itemName[i] !== undefined ? this.state.itemName[i] : '';

      nameBoolean = shipment.name === '' ? false : true;

      shipment.price =
        this.state.unitPrice[i] !== undefined ? this.state.unitPrice[i] : '';

      priceBoolean = shipment.price === '' ? false : true;

      shipment.type =
        this.state.type[i] !== undefined ? this.state.type[i] : '';

      typeBoolean = shipment.type === '' ? false : true;

      shipment.quantity =
        this.state.quantity[i] !== undefined ? this.state.quantity[i] : '';

      quantityBoolean = shipment.quantity === '' ? false : true;

      totalQuantity +=
        shipment.quantity === '' ? 0 : parseInt(shipment.quantity, 10);
      shipment.total =
        this.state.total[i] !== undefined ? this.state.total[i] : '';

      totalAmount += shipment.total === '' ? 0 : parseInt(shipment.total, 10);

      totalBoolean = shipment.total === '' ? false : true;
      if (
        nameBoolean &&
        priceBoolean &&
        typeBoolean &&
        quantityBoolean &&
        totalBoolean
      ) {
        validation = true;
        shipments.push(shipment);
      } else {
        validation = false;
        break;
      }
    }
    ship.items = shipments;
    if (validation) {
      var newSelected = Object.assign({}, this.state.tradeTransaction);
      newSelected.items = ship.items;
      if (typeof totalQuantity === typeof float) {
        totalQuantity = totalQuantity.toFixed(2);
      }
      if (typeof totalAmount === typeof float) {
        totalAmount = totalAmount.toFixed(2);
      }
      this.setState({
        tradeTransaction: newSelected,
        totalPrice: totalQuantity,
        totalAmount: totalAmount,
      });
      this.props.dispatch(setTradeConditionsActive());
    } else {
      this.setState({ itemDetailsValidation: true });
    }
  }

  closeDialog() {
    this.setState({ itemDetailsValidation: false });
  }

  _updateItemDetails() {
    var shipments = [];
    var ship = {};
    for (let i = 0; i < this.state.count; i++) {
      var shipment = {};
      var priceBoolean = false;
      var totalBoolean = false;
      shipment.name =
        this.state.itemName[i] !== undefined ? this.state.itemName[i] : '';
      shipment.price =
        this.state.unitPrice[i] !== undefined ? this.state.unitPrice[i] : '';

      priceBoolean = shipment.price === '' ? false : true;

      shipment.type =
        this.state.type[i] !== undefined ? this.state.type[i] : '';
      shipment.quantity =
        this.state.quantity[i] !== undefined ? this.state.quantity[i] : '';
      shipment.total =
        this.state.total[i] !== undefined ? this.state.total[i] : '';

      totalBoolean = shipment.total === '' ? false : true;
      if (priceBoolean && totalBoolean) {
        shipments.push(shipment);
      }
    }
    ship.items = shipments;
    return shipments;
  }

  addClick() {
    let showNewItemForm = this.state.showNewItemForm.slice();
    showNewItemForm[this.state.count - 1] = true;
    this.setState({
      count: this.state.count + 1,
      showNewItemForm: showNewItemForm,
    });
  }

  removeClick(i) {
    let itemName = this.state.itemName.slice();
    itemName.splice(i, 1);
    let unitPrice = this.state.unitPrice.slice();
    unitPrice.splice(i, 1);
    let type = this.state.type.slice();
    type.splice(i, 1);
    let quantity = this.state.quantity.slice();
    quantity.splice(i, 1);
    let total = this.state.total.slice();
    total.splice(i, 1);
    let showNewItemForm = this.state.showNewItemForm.slice();
    showNewItemForm[this.state.count - 2] = false;
    this.setState({
      count: this.state.count - 1,
      itemName,
      unitPrice,
      type,
      quantity,
      total,
      showNewItemForm,
    });
  }

  createUI(updatedUnitPrice, updatedQuantity) {
    let uiItems = [];
    let className;
    for (let i = 0; i < this.state.count; i++) {
      if (i === 0) {
        className = 'hrHide';
      } else {
        className = 'hrShow';
      }

      uiItems.push(
        <div className="mainDiv" key={i}>
          <hr className={className} />
          <div className="md-grid item-details-form__container">
            <div className="md-cell--4">
              <TextField
                id="itemName"
                label="Item name"
                lineDirection="center"
                onChange={this.handleChange.bind(
                  this,
                  i,
                  this.state.itemName,
                  'itemName'
                )}
                type="text"
                value={
                  this.state.itemName[i] !== undefined
                    ? this.state.itemName[i]
                    : ''
                }
                className="md-cell md-cell--bottom"
                required
              />
            </div>
            <div className="md-cell--1 devide-space" />
            <div className="md-cell--4">
              <TextField
                id="unitPrice"
                label="Unit Price"
                lineDirection="center"
                onChange={this.handleChangeForTotal.bind(
                  this,
                  i,
                  this.state.unitPrice,
                  'unitPrice',
                  updatedUnitPrice
                )}
                type="text"
                value={
                  this.state.unitPrice[i] !== undefined
                    ? this.state.unitPrice[i]
                    : ''
                }
                className="md-cell md-cell--bottom"
                required
              />
            </div>
            <div className="md-cell--4">
              <TextField
                id="type"
                label="Type"
                lineDirection="center"
                onChange={this.handleChange.bind(
                  this,
                  i,
                  this.state.type,
                  'type'
                )}
                type="text"
                value={
                  this.state.type[i] !== undefined ? this.state.type[i] : ''
                }
                className="md-cell md-cell--bottom"
                required
              />
            </div>
            <div className="md-cell--1 devide-space" />
            <div className="md-cell--4">
              <TextField
                id="quantity"
                label="Quantity"
                lineDirection="center"
                onChange={this.handleChangeForTotal.bind(
                  this,
                  i,
                  this.state.quantity,
                  'quantity',
                  updatedQuantity
                )}
                type="text"
                value={
                  this.state.quantity[i] !== undefined
                    ? this.state.quantity[i]
                    : ''
                }
                className="md-cell md-cell--bottom"
                required
              />
            </div>
            <div className="md-cell--4">
              <div
                className={
                  this.state.showNewItemForm[i] === true
                    ? 'removeItem'
                    : 'hideDiv'
                }
              >
                <a
                  className="item-details__remove-link"
                  onClick={this.removeClick.bind(this, i)}
                >
                  Remove this item
                </a>
              </div>
            </div>
            <div className="md-cell--1 devide-space" />
            <div className="md-cell--4">
              <TextField
                id="total"
                label="Total"
                lineDirection="center"
                onChange={this.handleChange.bind(
                  this,
                  i,
                  this.state.total,
                  'total'
                )}
                type="text"
                value={
                  this.state.total[i] !== undefined
                    ? this.state.unitPrice[i] * this.state.quantity[i]
                    : ''
                }
                className="md-cell md-cell--bottom"
                required
              />
            </div>
          </div>
        </div>
      );
    }
    return uiItems || null;
  }

  handleInputChange(name, value) {
    var newSelected = Object.assign({}, this.state.tradeTransaction);
    if (name !== 'price') {
      newSelected[name] = value;
      this.setState({
        tradeTransaction: newSelected,
      });
    } else {
      if (validPositiveNumber(value)) {
        newSelected[name] = value;
        this.setState({
          tradeTransaction: newSelected,
        });
      } else {
        newSelected[name] = '';
        this.setState({
          tradeTransaction: newSelected,
        });
      }
    }
    if (name === 'creationDate') {
      var creationDate = new Date(value);
      var minDeliveryDate = moment(creationDate).add(1, 'days').toDate();
      var minDeliveryDateStateName = 'deliveryDate';
      newSelected[minDeliveryDateStateName] = '';
      this.setState({
        minDeliveryDate: minDeliveryDate,
        tradeTransaction: newSelected,
      });
    }
  }

  handleCancel(e) {
    e.preventDefault();
    this.props.history.push('/dashboard');
  }

  handleSaveAndSubmit(e) {
    e.preventDefault();
    const { dispatch, buyer, documents } = this.props;
    const itemDetails = this._updateItemDetails();
    var newSelected = Object.assign({}, this.state.tradeTransaction);
    newSelected.documents = documents;
    newSelected.items = itemDetails;
    newSelected.totalAmount = this.state.totalAmount;
    dispatch(spinnerTrue());
    dispatch(saveTransaction(newSelected, buyer));
  }

  handleSaveAsDraft(e) {
    e.preventDefault();
    const { dispatch, documents } = this.props;
    const itemDetails = this._updateItemDetails();
    var newSelected = Object.assign({}, this.state.tradeTransaction);
    newSelected.documents = documents;
    newSelected.items = itemDetails;
    dispatch(spinnerTrue());
    dispatch(saveTransactionAsDraft(newSelected));
  }

  handleShipmentEdit() {
    this.props.dispatch(setItemDetailsActive());
  }

  handleTransactionDetailsEdit() {
    const { dispatch } = this.props;
    const { counterPartyEinOrVatin } = this.state.tradeTransaction;
    dispatch(editSearchUserSuccess(counterPartyEinOrVatin));
  }

  handleSearch() {
    const { dispatch } = this.props;
    dispatch(spinnerTrue());
    dispatch(searchUser(this.state.tradeTransaction.counterPartyEinOrVatin));
  }

  redirectDashBoard() {
    const { dispatch } = this.props;
    dispatch(draftDialogFalse());
    this.props.dispatch(clearUploadedDocuments());
    this.props.history.push('/dashboard');
  }

  remainSamePage() {
    const { dispatch } = this.props;
    dispatch(showFailureTransactionFalse());
  }

  componentWillMount() {
    const pathname = this.props.history.location.pathname;
    const { dispatch } = this.props;

    if (!sessionStorage.getItem('jwt')) {
      this.props.history.push('/login');
    } else if (
      (pathname === '/applications/new' &&
        process.env.REACT_APP_ROLE !== SELLER) ||
      (pathname === '/applications/edit' &&
        process.env.REACT_APP_ROLE !== SELLER)
    ) {
      this.props.history.push('/dashboard');
    } else if (
      pathname === '/applications/new' &&
      process.env.REACT_APP_ROLE === SELLER
    ) {
      dispatch(setCounterPartyDetailsActive());
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.counterPartyEinOrVatin !== nextProps.counterPartyEinOrVatin
    ) {
      const tradeTransaction = Object.assign({}, this.state.tradeTransaction);
      const uploadDocument = Object.assign({}, this.state.uploadDocument);
      tradeTransaction.itemDetailsActive = false;
      tradeTransaction.counterPartyDetailsActive = true;
      tradeTransaction.orderDetailsActive = false;
      tradeTransaction.tradeConditionsActive = false;
      tradeTransaction.id = '';
      tradeTransaction.counterPartyEinOrVatin = '';
      tradeTransaction.purchaseOrderNumber = '';
      tradeTransaction.billOfLadingNumber = '';
      tradeTransaction.creationDate = '';
      tradeTransaction.deliveryDate = '';
      tradeTransaction.price = '';
      tradeTransaction.currency = '';
      tradeTransaction.incoterms = '';
      tradeTransaction.deliveryAddress = '';
      tradeTransaction.paymentGuaranteeRequested = false;
      tradeTransaction.invoiceFinancingRequested = false;
      uploadDocument.document = [];
      uploadDocument.applicationId = undefined;
      this.setState({
        tradeTransaction: Object.assign({}, tradeTransaction),
        itemName: Object.assign([]),
        unitPrice: Object.assign([]),
        type: Object.assign([]),
        quantity: Object.assign([]),
        total: Object.assign([]),
        showNewItemForm: Object.assign([]),
        count: Object.assign(1),
        buyer: Object.assign({}),
        totalPrice: Object.assign(''),
        totalAmount: Object.assign(''),
        uploadDocument: Object.assign({}, uploadDocument),
      });
    }
  }

  renderDialog() {
    const {
      showSuccessTransaction,
      showFailureTransaction,
      successMessage,
      failureMessage,
    } = this.props;

    if (showSuccessTransaction) {
      return (
        <Dialog
          id="transactionSuccessDialog"
          className="dialogButton"
          visible={showSuccessTransaction}
          title="New Application"
          onHide={this.redirectDashBoard.bind(this)}
          aria-labelledby="transactionDialogDescription"
          modal
          actions={[
            {
              onClick: this.redirectDashBoard.bind(this),
              primary: true,
              label: 'Ok',
            },
          ]}
        >
          <p
            id="transactionDialogDescription"
            className="md-color--secondary-text"
          >
            {successMessage}
          </p>
        </Dialog>
      );
    } else if (showFailureTransaction) {
      return (
        <Dialog
          id="transactionFailureDialog"
          className="dialogButton"
          visible={showFailureTransaction}
          title="New Application"
          onHide={this.remainSamePage.bind(this)}
          aria-labelledby="transactionDialogDescription"
          modal
          actions={[
            {
              onClick: this.redirectDashBoard.bind(this),
              primary: true,
              label: 'Ok',
            },
          ]}
        >
          <p
            id="transactionDialogDescription"
            className="md-color--secondary-text"
          >
            {failureMessage}
          </p>
        </Dialog>
      );
    }
  }

  render() {
    const {
      counterPartyDetailsActive,
      error,
      orderDetailsActive,
      itemDetailsActive,
      tradeConditionsActive,
      buyer,
      spinner,
      updatedUnitPrice,
      updatedQuantity,
    } = this.props;
    const {
      tradeTransaction,
      itemName,
      unitPrice,
      quantity,
      type,
      total,
    } = this.state;
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (counterPartyDetailsActive) {
      return (
        <div className="trade-txn-page">
          <ApplicationHeader activeTab={'counterPartyDetails'} />
          <div className="trade-txn-page__container">
            <CounterPartyDetailsForm
              onFormChange={(name, value) =>
                this.handleInputChange(name, value)}
              counterPartyEinOrVatin={tradeTransaction.counterPartyEinOrVatin}
              handleSearch={this.handleSearch.bind(this)}
              error={error}
              spinner={!!spinner}
            />
          </div>
        </div>
      );
    } else if (orderDetailsActive) {
      return (
        <div className="trade-txn-page">
          <ApplicationHeader activeTab={'orderDetails'} />
          <div className="trade-txn-page__container">
            <div className="divCenter">
              <CounterPartyDetails
                seller={currentUser}
                buyer={buyer}
                handleTransactionDetailsEdit={this.handleTransactionDetailsEdit.bind(
                  this
                )}
              />
              <PurchaseOrderForm
                state={tradeTransaction}
                formValid={this.validatePOForm.bind(this)}
                handleChange={this.handleInputChange.bind(this)}
                onSubmit={this._handleSubmit.bind(this)}
                minDeliveryDate={this.state.minDeliveryDate}
              />
            </div>
          </div>
        </div>
      );
    } else if (itemDetailsActive) {
      return (
        <div className="trade-txn-page">
          <ApplicationHeader activeTab={'itemDetails'} />
          <div className="trade-txn-page__container">
            <div>
              <div className="divCenter">
                <CounterPartyDetails
                  buyer={buyer}
                  handleTransactionDetailsEdit={this.handleTransactionDetailsEdit.bind(
                    this
                  )}
                  seller={currentUser}
                />
                <OrderDetails
                  handlePurchaseEdit={this.handlePurchaseEdit.bind(this)}
                  purchaseOrderNumber={tradeTransaction.purchaseOrderNumber}
                  deliveryDate={tradeTransaction.deliveryDate}
                />
              </div>
              <ItemDetailsForm
                addClick={this.addClick.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                createUI={this.createUI(updatedUnitPrice, updatedQuantity)}
                itemName={itemName}
                unitPrice={unitPrice}
                type={type}
                quantity={quantity}
                total={total}
              />
              <Dialog
                id="myDialog"
                className="myDialog"
                visible={this.state.itemDetailsValidation}
                title="Item Details"
                onHide={this.closeDialog.bind(this)}
                aria-labelledby="itemDetailsValidationDialogDescription"
                modal
                actions={[
                  {
                    onClick: this.closeDialog.bind(this),
                    primary: true,
                    label: 'Ok',
                  },
                ]}
              >
                <p
                  id="itemDetailsValidationDialogDescription"
                  className="myDialog-pClass"
                >
                  Please provide valid inputs.
                </p>
              </Dialog>
            </div>
          </div>
        </div>
      );
    } else if (tradeConditionsActive) {
      return (
        <div className="trade-txn-page">
          <ApplicationHeader activeTab={'tradeConditions'} />
          <div className="trade-txn-page__container">
            <div>
              <div className="divCenter">
                <CounterPartyDetails
                  buyer={buyer}
                  handleTransactionDetailsEdit={this.handleTransactionDetailsEdit.bind(
                    this
                  )}
                  seller={currentUser}
                />
                <OrderDetails
                  handlePurchaseEdit={this.handlePurchaseEdit.bind(this)}
                  purchaseOrderNumber={tradeTransaction.purchaseOrderNumber}
                  deliveryDate={tradeTransaction.deliveryDate}
                />
                <h2 className="divCenter-h2Class">Shipment Details</h2>
                <h3 className="ship-info divCenter-h3Class">
                  {`${this.state.totalPrice} units priced at a total of
                    $${this.state.totalAmount} USD.`}
                </h3>
                <div className="conditions">
                  <Button
                    label="Edit"
                    onClick={this.handleShipmentEdit.bind(this)}
                    primary
                    flat
                    className="btn counter-party-details__edit-button"
                  />
                </div>
                <hr className="hrBottom" />
              </div>
              <TradeConditionsForm
                onCancel={e => this.handleCancel(e)}
                onSubmit={e => this.handleSaveAndSubmit(e)}
                onSaveAsDraft={e => this.handleSaveAsDraft(e)}
                paymentGuaranteeRequested={
                  tradeTransaction.paymentGuaranteeRequested
                }
                invoiceFinancingRequested={
                  tradeTransaction.invoiceFinancingRequested
                }
                handleInputChange={(name, value) =>
                  this.handleInputChange(name, value)}
                spinner={!!spinner}
              />
              {this.renderDialog()}
            </div>
          </div>
        </div>
      );
    }
  }
}

TradeTransactionPage.propTypes = {
  buyer: PropTypes.object,
  counterPartyDetailsActive: PropTypes.bool,
  dispatch: PropTypes.func,
  documents: PropTypes.arrayOf(PropTypes.object),
  error: PropTypes.string,
  failureMessage: PropTypes.string,
  history: PropTypes.object,
  itemDetailsActive: PropTypes.bool,
  orderDetailsActive: PropTypes.bool,
  showFailureTransaction: PropTypes.bool,
  showSuccessTransaction: PropTypes.bool,
  spinner: PropTypes.bool,
  successMessage: PropTypes.string,
  tradeConditionsActive: PropTypes.bool,
  tradeTransaction: PropTypes.object,
  counterPartyEinOrVatin: PropTypes.string,
  total: PropTypes.array,
  type: PropTypes.array,
  quantity: PropTypes.array,
  unitPrice: PropTypes.array,
  itemName: PropTypes.array,
  purchaseOrderNumber: PropTypes.string,
  billOfLadingNumber: PropTypes.string,
  creationDate: PropTypes.string,
  deliveryDate: PropTypes.string,
  price: PropTypes.number,
  currency: PropTypes.string,
  incoterms: PropTypes.string,
  deliveryAddress: PropTypes.string,
  paymentGuaranteeRequested: PropTypes.bool,
  invoiceFinancingRequested: PropTypes.bool,
  showNewItemForm: PropTypes.array,
  count: PropTypes.number,
  totalPrice: PropTypes.number,
  totalAmount: PropTypes.number,
  id: PropTypes.number,
  updatedUnitPrice: PropTypes.number,
  updatedQuantity: PropTypes.number,
};

function mapState(state) {
  return {
    buyer: state.tradeTransaction.buyer,
    counterPartyDetailsActive: state.tradeTransaction.counterPartyDetailsActive,
    documents: state.uploadDocument.document,
    error: state.tradeTransaction.error,
    failureMessage: state.tradeTransaction.failureMessage,
    itemDetailsActive: state.tradeTransaction.itemDetailsActive,
    orderDetailsActive: state.tradeTransaction.orderDetailsActive,
    showFailureTransaction: state.tradeTransaction.showFailureTransaction,
    showSuccessTransaction: state.tradeTransaction.showSuccessTransaction,
    spinner: state.tradeTransaction.spinner,
    successMessage: state.tradeTransaction.successMessage,
    tradeConditionsActive: state.tradeTransaction.tradeConditionsActive,
    counterPartyEinOrVatin: state.tradeTransaction.counterPartyEinOrVatin,
    purchaseOrderNumber: state.tradeTransaction.purchaseOrderNumber,
    billOfLadingNumber: state.tradeTransaction.billOfLadingNumber,
    creationDate: state.tradeTransaction.creationDate,
    deliveryDate: state.tradeTransaction.deliveryDate,
    price: state.tradeTransaction.price,
    currency: state.tradeTransaction.currency,
    incoterms: state.tradeTransaction.incoterms,
    deliveryAddress: state.tradeTransaction.deliveryAddress,
    paymentGuaranteeRequested: state.tradeTransaction.paymentGuaranteeRequested,
    invoiceFinancingRequested: state.tradeTransaction.invoiceFinancingRequested,
    itemName: state.tradeTransaction.itemName,
    unitPrice: state.tradeTransaction.unitPrice,
    type: state.tradeTransaction.type,
    quantity: state.tradeTransaction.quantity,
    total: state.tradeTransaction.total,
    count: state.tradeTransaction.count,
    totalPrice: state.tradeTransaction.totalPrice,
    totalAmount: state.tradeTransaction.totalAmount,
    applicationId: state.uploadDocument.applicationId,
    id: state.tradeTransaction.id,
    updatedUnitPrice: state.tradeTransaction.updatedUnitPrice,
    updatedQuantity: state.tradeTransaction.updatedQuantity,
    showNewItemForm: state.tradeTransaction.showNewItemForm,
  };
}

export default connect(mapState)(TradeTransactionPage);
