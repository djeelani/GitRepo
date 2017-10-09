import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import Button from 'react-md/lib/Buttons/Button';

import '../assets/stylesheets/NoAction.scss';

const NoAction = ({
  info,
  divClassName,
  textClassName,
  handleOnClickManageApp,
}) => {
  return (
    <div className="no-action">
      <div className={divClassName}>
        <div className={textClassName}>
          {ReactHtmlParser(info)}
          {info === 'Pending submission'
            ? <div>
                <Button
                  id="manage-application"
                  raised
                  label="Manage Application"
                  onClick={handleOnClickManageApp}
                  className="md-cell md-cell--bottom no-action__button"
                />
              </div>
            : ''}
        </div>
      </div>
    </div>
  );
};

NoAction.propTypes = {
  info: PropTypes.string,
  divClassName: PropTypes.string,
  textClassName: PropTypes.string,
  handleOnClickManageApp: PropTypes.func,
};

export default NoAction;
