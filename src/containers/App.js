import React, { Component } from 'react';
import { Route, withRouter } from 'react-router';
import Header from './Header';
import LoginPage from './LoginPage';
import DashboardPage from '../containers/DashboardPage';
import NotFound from '../components/NotFound';
import { Switch } from 'react-router-dom';
import TradeTransactionPage from './TradeTransactionPage';
import {
  SELLER,
  BUYER,
  SELLERBANKER,
  BUYERBANKER,
} from '../config/envConfig';

export class App extends Component {
  constructor(props) {
    super(props);
    var appRole = process.env.REACT_APP_ROLE;
    switch (appRole) {
    case SELLER:
      document.title = 'Seller - Trade & Supply Finance';
      break;
    case BUYER:
      document.title = 'Buyer - Trade & Supply Finance';
      break;
    case SELLERBANKER:
      document.title = 'Admin (Seller) - Trade & Supply Finance';
      break;
    case BUYERBANKER:
      document.title = 'Admin (Buyer) - Trade & Supply Finance';
      break;
    default: 
      document.title = 'Trade & Supply Finance';    
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route
            exact
            path="/applications/new"
            component={TradeTransactionPage}
          />
          <Route
            exact
            path="/applications/edit"
            component={TradeTransactionPage}
          />
          <Route exact path="*" component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
