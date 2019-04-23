const tableManager = require('../db/tableManager');

module.exports = function(socket){
    socket.on("saveToTable", (data) => {
        tableManager.saveToTable(data.table, data, () => {
            socket.emit("tableReturned", data.table);
        });
    });

    socket.on('getTable', (data) => {
        tableManager.getTable(data.table, (r) => {
            console.log(r.rows);
            socket.emit("tableReturned", r.rows);
        });
    });
};