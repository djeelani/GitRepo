import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-md/lib/Buttons';

const ActionButton = ({
  dltAction,
  postDltAction,
  text,
  className,
  divclassName,
  handleOnClick,
  transactionApplicationId,
  actionType,
  disabled,
}) => {
  return (
    <div className={divclassName}>
      <Button
        label={text}
        className={className}
        raised
        disabled={disabled}
        onClick={handleOnClick.bind(
          this,
          dltAction,
          postDltAction,
          transactionApplicationId,
          actionType
        )}
      />
    </div>
  );
};

ActionButton.propTypes = {
  dltAction: PropTypes.string,
  postDltAction: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
  divclassName: PropTypes.string,
  handleOnClick: PropTypes.func,
  transactionApplicationId: PropTypes.number,
  actionType: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ActionButton;
