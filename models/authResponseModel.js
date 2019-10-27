module.exports = (
  success = false,
  message = 'Authentication Failed.',
  token = null,
) => {
  console.log(message, 'Token:', token);
  return {
    success,
    message,
    token,
  };
};
