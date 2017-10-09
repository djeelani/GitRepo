import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons';
import Toolbar from 'react-md/lib/Toolbars';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import {
  setTradeTransactionForNewApplication,
} from '../actions/tradeTransactions';
import { setUploadDocumentForNewApplication } from '../actions/documentUpload';
import {
  SELLER,
  BUYER,
  SELLERBANK,
  BUYERBANK,
  SELLERBANKER,
  BUYERBANKER,
} from '../config/envConfig';

import '../assets/stylesheets/Header.scss';

export class Header extends Component {
  dashboardNavButtonActive() {
    const { history } = this.props;
    const pathname = history.location.pathname;

    if (pathname === '/dashboard') {
      return 'header__nav-button active';
    } else {
      return 'header__nav-button';
    }
  }

  applicationNavButtonActive() {
    var appRole = process.env.REACT_APP_ROLE;
    const { history } = this.props;
    const pathname = history.location.pathname;

    if (
      appRole === SELLER &&
      (pathname === '/applications/new' || pathname === '/applications/edit')
    ) {
      return 'header__nav-button active';
    } else if (appRole !== SELLER) {
      return 'header__nav-button header__nav-button-hide';
    } else {
      return 'header__nav-button';
    }
  }

  setTradeTransactionForNewApplication(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(setTradeTransactionForNewApplication());
    dispatch(setUploadDocumentForNewApplication());
    this.props.history.push('/applications/new');
  }

  renderActions() {
    const { history } = this.props;
    const pathname = history.location.pathname;
    let userName;
    const currentUser = JSON.parse(sessionStorage.getItem('user'));
    if (currentUser !== null) {
      if (
        currentUser.firstName !== undefined &&
        currentUser.lastName !== undefined
      ) {
        userName = currentUser.firstName + ' ' + currentUser.lastName;
      }
    }

    // TODO: check for current user rather than matching pathname
    if (
      pathname === '/dashboard' ||
      pathname === '/applications/new' ||
      pathname === '/applications/edit'
    ) {
      return [
        <Button
          className={this.dashboardNavButtonActive()}
          flat
          key="dashboard"
          label="Dashboard"
          onClick={() => history.push('/dashboard')}
        />,
        <Button
          className={this.applicationNavButtonActive()}
          flat
          key="note_add"
          label="Application"
          onClick={e => this.setTradeTransactionForNewApplication(e)}
        />,
        <Button
          className="header__nav-button not-clickable"
          flat
          key="account_circle"
          label={userName || 'Username'}
        >
          account_circle
        </Button>,
      ];
    } else if (pathname === '/login' || pathname === '/') return [];
  }

  renderNav() {
    let userRole;
    switch (process.env.REACT_APP_ROLE) {
      case SELLER:
        userRole = 'Seller';
        break;
      case BUYER:
        userRole = 'Buyer';
        break;
      case SELLERBANKER:
        userRole = 'Seller Bank';
        break;
      case BUYERBANKER:
        userRole = 'Buyer Bank';
        break;
      default:
        userRole = '';
        break;
    }
    return <h2 className="header__user-role">{userRole}</h2>;
  }

  headerClassName() {
    if (process.env.REACT_APP_BANK_CODE === SELLERBANK) {
      return 'header__toolbar seller';
    } else if (process.env.REACT_APP_BANK_CODE === BUYERBANK) {
      return 'header__toolbar buyer';
    }
  }

  render() {
    return (
      <div className="header">
        <Toolbar
          actions={this.renderActions()}
          colored
          className={this.headerClassName()}
          nav={this.renderNav()}
        />
      </div>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

export default withRouter(connect(null)(Header));
