const dbhandler = require('../db/dbhandler');
// configuration
// ****************************************************************************
let user = "postgres";
let password = "pass";
let host = "localhost";
let port = "5432";
let db = "raffle";
let configDb = {
    connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}`
};
 
let connection = dbhandler.setClientConnection(configDb);

module.exports = function(socket){
    socket.on("saveToTable", (data) => {
        let table = data.table;
        let columns = data.columns;
        let dData = data.data;
        let insertInto = `insert into ${table} (${columns.join(',')}) ` +
                        `VALUES (${columns.map((e, i) => "$" + (i + 1)).join(',')}) RETURNING *`;

        dbhandler.insert(connection, insertInto, dData[0].values);
        socket.emit("savedToTable", table);
    });

    socket.on('getTable', (data) => {
        let table = data.table;
        let response = dbhandler.query(connection, "select * from " + table);
        response.then(r => {
            console.log(r.rows);
            socket.emit("tableReturned", r.rows);
        });
    });
};