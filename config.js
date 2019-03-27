
module.exports = {
    local: {
        port: "2200"
    },
    remote: {
        port: process.env.PORT
    },
    time: {
      base: "http://worldtimeapi.org/api/timezone/"
    }
};