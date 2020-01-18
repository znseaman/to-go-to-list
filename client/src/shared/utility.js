export const checkValidity = (value, rules) => {
  let isValid = true;

  const { required, minLength, maxLength, isEmail } = rules;
  if (required) {
    isValid = value.trim() !== "" && isValid;
  }

  if (minLength) {
    isValid = value.length >= minLength && isValid;
  }

  if (maxLength) {
    isValid = value.length <= maxLength && isValid;
  }

  if (isEmail) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
};