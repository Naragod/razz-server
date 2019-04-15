

module.exports = function(io){
    return {
        establishConnection: (req, res, next) => {
            io.on('connection', (socket) => {
                console.log("User Connected.");
                
            });
            next();
        }
    };
};