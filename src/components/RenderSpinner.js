import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'react-md/lib/Progress/CircularProgress';

const RenderSpinner = ({ spinner, className }) => {
  if (spinner)
    return (
      <CircularProgress className={className} key="progress" id="progressId" />
    );
  else return <div />;
};

RenderSpinner.propTypes = {
  spinner: PropTypes.bool,
  className: PropTypes.string,
};

export default RenderSpinner;
