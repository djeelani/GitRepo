export function validateEmail(value) {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
  return emailRegex.test(value);
}

export function validatePresence(value) {
  return value.toString().length > 0;
}

export function validPositiveNumber(value) {
  if (value !== '' && value !== undefined) {
    return value.toString().match(/^\d+$/) && parseInt(value, 10) > 0;
  } else {
    return false;
  }
}
