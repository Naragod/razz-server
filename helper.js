


module.exports = {
    trim: (str) => str.replace(/(^,)|(,$)/g, ""),

    promify: function(callback) {
        return new Promise((resolve, reject) => {
            callback(resolve, reject);
        });
    },
};