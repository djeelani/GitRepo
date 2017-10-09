import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import LoginForm from '../components/LoginForm';

import * as loginAction from '../actions/auth';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      role: process.env.REACT_APP_ROLE,
      bankCode: process.env.REACT_APP_BANK_CODE,
      message: '',
    };
  }

  componentWillMount() {
    if (sessionStorage.getItem('jwt')) {
      this.props.history.push('/dashboard');
    }
  }

  handleLogin(e) {
    e.preventDefault();
    const { userName, password, role, bankCode } = this.state;
    const creds = { userName, password, role, bankCode };
    this.props.actions.spinnerTrue();
    this.props.actions.loginUser(creds).then(() => {
      if (sessionStorage.getItem('jwt')) {
        this.props.actions.getCurrentUser().then(() => {
          if (sessionStorage.getItem('user')) {
            this.redirectToDashboard();
          }
        });
      }
    });
  }

  redirectToDashboard() {
    this.props.actions.authSuccess();
    this.props.history.push('/dashboard');
  }

  renderForm() {
    const { message, spinner } = this.props;
    return (
      <LoginForm
        userName={this.state.userName}
        password={this.state.password}
        handleChange={(name, value) => this.setState({ [name]: value })}
        onSubmit={e => this.handleLogin(e)}
        message={message}
        spinner={!!spinner}
      />
    );
  }

  render() {
    return (
      <div className="page-container">
        {this.renderForm()}
      </div>
    );
  }
}

LoginPage.propTypes = {
  actions: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  message: PropTypes.string,
  spinner: PropTypes.bool,
  history: PropTypes.object,
};

function mapState(state) {
  return {
    message: state.message.message,
    spinner: state.message.spinner,
  };
}

function mapDispatch(dispatch) {
  return {
    actions: bindActionCreators(loginAction, dispatch),
  };
}

export default connect(mapState, mapDispatch)(LoginPage);
