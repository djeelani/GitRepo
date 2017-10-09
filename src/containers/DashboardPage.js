import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import scrollToElement from 'scroll-to-element';
import Dialog from 'react-md/lib/Dialogs';

import Dashboard from '../components/Dashboard';
import BankerDashboard from '../components/BankerDashboard';

import { SELLERBANKER, BUYERBANKER } from '../config/envConfig';
import {
  fetchTradeTransactionsByUser,
  approveRejectAction,
  fetchTransactionHistoryDLT,
  dialogFalse,
  trackingAction,
  shipmentAction,
  paymentAction,
  fetchTransactionFailure,
} from '../actions/tradeTransactions';
import { sortTransaction, expandTransaction } from '../actions/dashboard';
import {
  APPROVE_REJECT_ACTION__TYPE,
  TRACKING_ACTION__TYPE,
  SHIPMENT_ACTION__TYPE,
  PAYMENT_ACTION__TYPE,
} from '../utils/constants';
import { spinnerTrue } from '../actions/auth';

class DashboardPage extends Component {
  componentWillMount() {
    const { dispatch, history } = this.props;

    if (!sessionStorage.getItem('jwt')) {
      history.push('/login');
    } else {
      const user = JSON.parse(sessionStorage.getItem('user'));
      this.state = {
        transactions: [],
        trackingInputActionValue: '',
      };
      dispatch(spinnerTrue());
      dispatch(fetchTradeTransactionsByUser(user.id));
    }
  }

  handleOnClickAction(
    dltAction,
    postDltAction,
    transactionApplicationId,
    actionType
  ) {
    const { dispatch, transactions } = this.props;
    dispatch(spinnerTrue());
    if (actionType === APPROVE_REJECT_ACTION__TYPE) {
      dispatch(
        approveRejectAction(
          dltAction,
          postDltAction,
          transactions,
          transactionApplicationId,
          actionType
        )
      );
    } else if (actionType === TRACKING_ACTION__TYPE) {
      dispatch(
        trackingAction(
          dltAction,
          postDltAction,
          transactions,
          transactionApplicationId,
          this.state.trackingInputActionValue,
          actionType
        )
      );
    } else if (actionType === SHIPMENT_ACTION__TYPE) {
      dispatch(
        shipmentAction(
          dltAction,
          postDltAction,
          transactions,
          transactionApplicationId,
          actionType
        )
      );
    } else if (actionType === PAYMENT_ACTION__TYPE) {
      dispatch(
        paymentAction(
          dltAction,
          postDltAction,
          transactions,
          transactionApplicationId,
          actionType
        )
      );
    }
  }

  handleOnTextChangeAction(value) {
    this.setState({ trackingInputActionValue: value });
  }

  handleOnChangeSort(event) {
    const { dispatch, transactions } = this.props;
    dispatch(sortTransaction(event, transactions));
  }

  onExpandToggle(applicationId) {
    const { dispatch, transactions } = this.props;
    dispatch(expandTransaction(applicationId, transactions));
    scrollToElement('#transaction-row' + applicationId, {
      offset: 0,
      ease: 'out-bounce',
      duration: 10,
    });
  }

  openDialog(transactionAppId) {
    const { dispatch } = this.props;
    dispatch(fetchTransactionHistoryDLT(transactionAppId));
  }

  closeDialog() {
    const { dispatch } = this.props;
    dispatch(dialogFalse());
  }

  isBanker() {
    const role = process.env.REACT_APP_ROLE;
    return role === SELLERBANKER || role === BUYERBANKER;
  }

  closeErrorDialog() {
    const { dispatch } = this.props;
    dispatch(fetchTransactionFailure(''));
  }

  renderDialog() {
    const { failureMessage } = this.props;
    return (
      <Dialog
        id="transactionSuccessDialog"
        className="dialogButton"
        visible={failureMessage !== '' ? true : false}
        title="Error"
        onHide={this.closeErrorDialog.bind(this)}
        aria-labelledby="transactionDialogDescription"
        modal
        actions={[
          {
            onClick: this.closeErrorDialog.bind(this),
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

  render() {
    const { transactions, spinner, visible } = this.props;
    let dashboardCmpt = null;
    if (!this.isBanker()) {
      dashboardCmpt = (
        <Dashboard
          spinner={spinner}
          tradeTransactions={transactions}
          handleOnExpandToggle={this.onExpandToggle.bind(this)}
          openDialog={this.openDialog.bind(this)}
          closeDialog={this.closeDialog.bind(this)}
          visible={visible}
          disabled={spinner}
          handleOnChangeSort={this.handleOnChangeSort.bind(this)}
          handleOnClickAction={this.handleOnClickAction.bind(this)}
          handleOnChangeAction={this.handleOnTextChangeAction.bind(this)}
          history={this.props.history}
          dispatch={this.props.dispatch}
        />
      );
    } else {
      dashboardCmpt = (
        <BankerDashboard
          openDialog={this.openDialog.bind(this)}
          closeDialog={this.closeDialog.bind(this)}
          visible={visible}
          spinner={spinner}
          disabled={spinner}
          role={process.env.REACT_APP_ROLE}
          tradeTransactions={transactions}
          handleOnExpandBankerToggle={this.onExpandToggle.bind(this)}
          handleOnChangeBankerSort={this.handleOnChangeSort.bind(this)}
          handleOnClickBankerAction={this.handleOnClickAction.bind(this)}
          handleOnChangeBankerAction={this.handleOnTextChangeAction.bind(this)}
        />
      );
    }
    return (
      <div className="dashboard-page">
        {dashboardCmpt}
        {this.renderDialog()}
      </div>
    );
  }
}

DashboardPage.propTypes = {
  history: PropTypes.object,
  transactions: PropTypes.array,
  successMessage: PropTypes.string,
  failureMessage: PropTypes.string,
  dispatch: PropTypes.func,
  visible: PropTypes.bool,
  spinner: PropTypes.bool,
};

function mapState(state) {
  return {
    transactions: state.tradeTransaction.transactions,
    successMessage: state.tradeTransaction.successMessage,
    visible: state.tradeTransaction.visible,
    failureMessage: state.tradeTransaction.failureMessage,
    spinner: state.tradeTransaction.spinner,
  };
}

export default connect(mapState)(DashboardPage);
