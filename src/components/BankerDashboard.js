import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dashboard from './Dashboard';
import map from 'lodash/map';

import { SELLERBANKER, BUYERBANKER } from '../config/envConfig';
import RenderSpinner from './RenderSpinner';

class BankerDashboard extends Component {
  renderTxForSME() {
    const { tradeTransactions, role, spinner } = this.props;

    let smeTxs = {};
    let smes = [];

    tradeTransactions.forEach(function(tx) {
      let _tx;
      let _sme;
      if (role === SELLERBANKER) {
        _sme = tx.seller;
      } else if (role === BUYERBANKER) {
        _sme = tx.buyer;
      }

      if (smeTxs[_sme.companyName] === undefined) {
        _tx = [];
        smes.push(_sme.companyName);
      } else {
        _tx = smeTxs[_sme.companyName];
      }
      _tx.push(tx);
      smeTxs[_sme.companyName] = _tx;
    });

    if (smes.length > 0) {
      return map(smes, sme => {
        return (
          <Dashboard
            openDialog={this.props.openDialog}
            closeDialog={this.props.closeDialog}
            visible={this.props.visible}
            spinner={spinner}
            disabled={spinner}
            key={sme}
            company={sme}
            tradeTransactions={smeTxs[sme]}
            handleOnExpandToggle={this.props.handleOnExpandBankerToggle}
            handleOnChangeSort={this.props.handleOnChangeBankerSort}
            handleOnClickAction={this.props.handleOnClickBankerAction}
            handleOnChangeAction={this.props.handleOnChangeBankerAction}
          />
        );
      });
    } else {
      return (
        <Dashboard
          openDialog={this.props.openDialog}
          closeDialog={this.props.closeDialog}
          visible={this.props.visible}
          spinner={spinner}
          disabled={spinner}
          tradeTransactions={tradeTransactions}
          handleOnExpandToggle={this.props.handleOnExpandBankerToggle}
          handleOnChangeSort={this.props.handleOnChangeBankerSort}
          handleOnClickAction={this.props.handleOnClickBankerAction}
          handleOnChangeAction={this.props.handleOnChangeBankerAction}
        />
      );
    }
  }

  render() {
    const { spinner, tradeTransactions } = this.props;
    return (
      <div className="bankerDashBoard">
        <RenderSpinner
          spinner={tradeTransactions.length > 0 ? false : spinner}
        />
        {this.renderTxForSME()}
      </div>
    );
  }
}

BankerDashboard.propTypes = {
  handleOnClickBankerAction: PropTypes.func,
  handleOnChangeBankerAction: PropTypes.func,
  handleOnChangeBankerSort: PropTypes.func,
  handleOnExpandBankerToggle: PropTypes.func,
  role: PropTypes.string,
  tradeTransactions: PropTypes.array,
  openDialog: PropTypes.func,
  visible: PropTypes.bool,
  closeDialog: PropTypes.func,
  spinner: PropTypes.bool,
};

export default BankerDashboard;
