import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FontIcon from 'react-md/lib/FontIcons';
import Paper from 'react-md/lib/Papers';
import Toolbar from 'react-md/lib/Toolbars';
import { ExpansionList, ExpansionPanel } from 'react-md/lib/ExpansionPanels';
import SelectField from 'react-md/lib/SelectFields';
import map from 'lodash/map';
import moment from 'moment';

import TransactionRow from './TransactionRow';
import TransactionHeader from './TransactionHeader';
import UploadDocument from '../containers/UploadDocument';
import TransactionDeeperView from './TransactionDeeperView';
import RequiredAction from './RequiredAction';
import { SELLER, BUYER, SELLERBANKER, BUYERBANKER } from '../config/envConfig';
import '../assets/stylesheets/Dashboard.scss';
import RenderSpinner from './RenderSpinner';
import { setTradeTransactionForDraftApplication } from '../actions/tradeTransactions';
import { dashboardFileUploadOnDraft } from '../actions/documentUpload';
import { STATUS_CODES } from '../utils/constants';

const status = [
  {
    name: 'Action Required',
    value: 'Action Required',
  },
  {
    name: 'Counter-Party',
    value: 'Counter-Party',
  },
  {
    name: 'Date Modified',
    value: 'Date Modified',
  },
];
const statusItems = status;

class Dashboard extends Component {
  renderTitle() {
    if (this.props.company === undefined) {
      return 'TRANSACTIONS';
    } else {
      return `TRANSACTIONS FOR ${this.props.company}`.toUpperCase();
    }
  }

  presentRole() {
    const role = process.env.REACT_APP_ROLE;

    if (role === SELLER) {
      return 'Seller';
    } else if (role === BUYER) {
      return 'Buyer';
    } else if (role === SELLERBANKER) {
      return 'Seller Banker';
    } else if (role === BUYERBANKER) {
      return 'Buyer Banker';
    }
  }

  counterParty(txn) {
    const role = process.env.REACT_APP_ROLE;

    if (role === SELLER || role === SELLERBANKER) {
      return txn.buyer.companyName;
    } else if (role === BUYER || role === BUYERBANKER) {
      return txn.seller.companyName;
    }
  }

  formatDate(date) {
    return moment(date).format('L');
  }

  renderStatusIcon(statusCode, actionRequired, status) {
    if (actionRequired !== undefined && actionRequired === true) {
      return <FontIcon className="dashboard__draft-icon">warning</FontIcon>;
    } else {
      if (statusCode === 'REJECTED') {
        return <FontIcon className="dashboard__draft-icon">cancel</FontIcon>;
      } else {
        return (
          <img src={STATUS_CODES[status].src} alt={STATUS_CODES[status].alt} />
        );
      }
    }
  }

  handleOnClickManageApp(e, appId) {
    e.preventDefault();
    const { dispatch } = this.props;
    const { tradeTransactions } = this.props;
    const formatDate = date => {
      return moment(date).format('L');
    };
    var application;
    for (var i = 0; i < tradeTransactions.length; i++) {
      var app = tradeTransactions[i];
      if (app.id === appId) {
        application = app;
        application.poCreationDate = formatDate(application.poCreationDate);
        application.poDeliveryDate = formatDate(application.poDeliveryDate);
      }
    }
    var itemName = [];
    var unitPrice = [];
    var itemType = [];
    var quantity = [];
    var total = [];
    var totalUnits = 0;
    var totalAmount = 0;
    var itemsSize = application.shipmentDetails.length;
    var showNewItemForm = [];
    for (var j = 0; j < itemsSize; j++) {
      itemName[j] = application.shipmentDetails[j].name;
      unitPrice[j] = application.shipmentDetails[j].price;
      itemType[j] = application.shipmentDetails[j].type;
      quantity[j] = application.shipmentDetails[j].quantity;
      total[j] = application.shipmentDetails[j].total;
      totalUnits +=
        application.shipmentDetails[j].quantity === undefined
          ? 0
          : parseInt(application.shipmentDetails[j].quantity, 10);
      totalAmount +=
        application.shipmentDetails[j].total === undefined
          ? 0
          : parseInt(application.shipmentDetails[j].total, 10);
      if (j < itemsSize - 1) {
        showNewItemForm[j] = true;
      }
    }
    dispatch(
      setTradeTransactionForDraftApplication(
        application,
        itemName,
        unitPrice,
        itemType,
        quantity,
        total,
        itemsSize,
        totalUnits,
        totalAmount,
        showNewItemForm
      )
    );
    dispatch(dashboardFileUploadOnDraft(application.documents));
    this.props.history.push('/applications/edit');
  }

  renderNoTransactionRow(spinner) {
    return spinner
      ? <RenderSpinner
          className="dashboard__no-transactions-spinner"
          spinner={spinner}
        />
      : <div className="dashboard__no-transactions">
          No Transactions Found.
        </div>;
  }

  renderTransactionRow(spinner, txn) {
    return spinner && !this.props.disabled
      ? <RenderSpinner
          className="dashboard__no-transactions-spinner"
          spinner={spinner}
        />
      : <TransactionRow
          statusIcon={this.renderStatusIcon(
            txn.status.code,
            txn.context.actionRequired,
            txn.status.displayText
          )}
          applicationId={txn.id}
          poNumber={txn.poNumber}
          presentRole={this.presentRole()}
          companyName={this.counterParty(txn)}
          poCreationDatecreatedAt={this.formatDate(txn.poCreationDate)}
          status={txn.status.displayText}
          updatedAt={this.formatDate(txn.updatedAt)}
        />;
  }

  renderTxnRows() {
    const { tradeTransactions, spinner } = this.props;
    if (tradeTransactions.length > 0) {
      return map(tradeTransactions, txn => {
        return (
          <ExpansionPanel
            contentClassName="dashboard__transaction-content-panel"
            id={'transaction-row' + txn.id}
            key={txn.id}
            className="dashboard__transaction-row-panel"
            headerClassName="dashboard__transaction-row-header"
            expandIconClassName="dashboard__transaction-content-icon"
            expanded={txn.expanded}
            focused={txn.expanded}
            onExpandToggle={this.props.handleOnExpandToggle.bind(this, txn.id)}
            label={this.renderTransactionRow(spinner, txn)}
          >
            <RequiredAction
              transactionContext={txn.context}
              transactionApplicationId={txn.id}
              handleOnClick={this.props.handleOnClickAction}
              handleOnChange={this.props.handleOnChangeAction}
              disabled={this.props.disabled}
              handleOnClickManageApp={e =>
                this.handleOnClickManageApp(e, txn.id)}
            />
            <h3 className="dashboard__transaction-row-h3">DOCUMENTS</h3>
            <div className="dashboard__transaction-row-document">
              <UploadDocument
                uploadedDocuments={txn.documents}
                transactionApplicationId={txn.id}
                disable={txn.status.displayText === 'Draft' ? true : false}
                tradeTransactions={tradeTransactions}
                transactionSpinnerUpload={txn.spinnerUpload}
                transactionSpinnerErrorMessage={txn.errorMessage}
              />
            </div>
            <TransactionDeeperView
              transaction={txn}
              openDialog={this.props.openDialog}
              visible={this.props.visible}
              closeDialog={this.props.closeDialog}
            />
          </ExpansionPanel>
        );
      });
    } else {
      return (
        <ExpansionPanel
          expanded={false}
          onExpandToggle={function() {}}
          expandIconClassName="dashboard__transaction-content-icon"
          label={this.renderNoTransactionRow(spinner)}
        />
      );
    }
  }

  transactionSort() {
    return [
      <SelectField
        id="states"
        placeholder="Sort"
        menuItems={statusItems}
        itemLabel="name"
        itemValue="value"
        onChange={this.props.handleOnChangeSort}
        toolbar={true}
        iconClassName="dashboard__transaction-header-sort--icon"
      />,
    ];
  }

  render() {
    return (
      <div className="dashboard">
        <Paper className="dashboard__transaction-container">
          <Toolbar
            className="dashboard__transaction-header-background--color"
            titleClassName="dashboard__transaction-header-text"
            title={this.renderTitle()}
            actions={this.transactionSort()}
          />

          <ExpansionList label className="dashboard__transaction-header">
            <ExpansionPanel
              contentClassName="dashboard__transaction-content-panel"
              className="dashboard__transaction-header-panel"
              headerClassName="dashboard__transaction-expansion-panel-header"
              expandIconClassName="dashboard__transaction-content-icon"
              label={<TransactionHeader />}
            />
            {this.renderTxnRows()}
          </ExpansionList>
        </Paper>
      </div>
    );
  }
}

Dashboard.propTypes = {
  handleOnClickAction: PropTypes.func,
  handleOnChangeAction: PropTypes.func,
  handleOnChangeSort: PropTypes.func,
  handleOnExpandToggle: PropTypes.func,
  openDialog: PropTypes.func,
  visible: PropTypes.bool,
  company: PropTypes.string,
  tradeTransactions: PropTypes.array,
  closeDialog: PropTypes.func,
  spinner: PropTypes.bool,
  history: PropTypes.object,
  dispatch: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Dashboard;
