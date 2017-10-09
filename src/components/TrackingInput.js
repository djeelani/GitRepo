import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'react-md/lib/TextFields';

const TrackingInput = ({
  text,
  className,
  divclassName,
  handleOnChange,
  trackingInputId,
  disabled,
}) => {
  return (
    <div className={divclassName}>
      <TextField
        id={trackingInputId}
        label={text}
        inputClassName={className}
        onChange={handleOnChange.bind(this)}
        disabled={disabled}
      />
    </div>
  );
};

TrackingInput.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string,
  divclassName: PropTypes.string,
  handleOnChange: PropTypes.func,
  trackingInputId: PropTypes.string,
  disabled: PropTypes.bool,
};

export default TrackingInput;
