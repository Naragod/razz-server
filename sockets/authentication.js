

module.exports = function(socket) {
    socket.on("authenticate", (key) => {
        if(key.token !== "secret_key"){
            socket.emit("unauthorized", "Invalid Key.");
            return;
        }
        // console.log("User is valid.");
    });

};