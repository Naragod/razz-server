module.exports = {
  trim: (str) => str.replace(/(^,)|(,$)/g, ''),

  promify(callback) {
    return new Promise((resolve, reject) => {
      callback(resolve, reject);
    });
  },
};
