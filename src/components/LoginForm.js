import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';
import Card from 'react-md/lib/Cards/Card';
import TextField from 'react-md/lib/TextFields';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

import { SELLERBANKER, BUYERBANKER } from '../config/envConfig';
import { validatePresence } from '../utils/inputValidations';

import '../assets/stylesheets/LoginForm.scss';

const LoginForm = ({
  userName,
  password,
  handleChange,
  onSubmit,
  message,
  spinner,
}) => {
  const formValid = () => {
    return validatePresence(userName) && validatePresence(password);
  };

  const renderSpinner = () => {
    if (spinner) {
      return <CircularProgress key="progress" id="progressId" />;
    }
  };

  const renderLoginText = () => {
    const role = process.env.REACT_APP_ROLE;
    const isBanker = role === BUYERBANKER || role === SELLERBANKER;

    if (isBanker) {
      return 'Bank User Login';
    } else {
      return 'Customer Login';
    }
  };

  return (
    <Card className="login-form">
      <form className="login-form__container" onSubmit={onSubmit}>
        <h2 className="login-form__title">
          {renderLoginText()}
        </h2>
        <div className="login-form__content">
          <TextField
            id="userName"
            onChange={value => handleChange('userName', value)}
            placeholder="Username"
            value={userName}
            required
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
          />
          <TextField
            id="password"
            onChange={value => handleChange('password', value)}
            placeholder="Password"
            type="password"
            value={password}
            required
            className="md-cell md-cell--bottom login-form__input"
            inputClassName="font_size__normal"
          />

          <div className="login-form__buttons">
            <Button
              className="login-form__submit"
              disabled={!formValid() || !!spinner}
              label="Login"
              onClick={onSubmit}
              raised
              primary
              type="submit"
            />
            {renderSpinner()}
          </div>
        </div>
      </form>
      <span className="login-form__message">
        {message}
      </span>
    </Card>
  );
};

LoginForm.propTypes = {
  userName: PropTypes.string,
  password: PropTypes.string,
  handleChange: PropTypes.func,
  onSubmit: PropTypes.func,
  message: PropTypes.string,
  spinner: PropTypes.bool,
};

export default LoginForm;
