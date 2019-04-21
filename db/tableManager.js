const { Observable } = require('rxjs');
const dbHandler = require('../db/dbHandler');
const TableModel = require('../models/tableModel');

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
let connection = dbHandler.setClientConnection(configDb);
module.exports = {
    getTable(table, onCompletetion){
        dbHandler.query(connection, "select * from " + table)
        .then(r => {
            if(onCompletetion)
                onCompletetion(r);
        }).catch(err => err);
    },

    saveToTable: (data, onCompletetion) => {
        let obj = new TableModel(data.table, data.raffleid, data.data).model;
        if(obj === null)
            return;
        let insertInto = `insert into "${obj.table}" (${obj.columns.join(',')}) ` +
                        `VALUES (${obj.columns.map((e, i) => "$" + (i + 1)).join(',')}) RETURNING *`;

        dbHandler.insert(connection, insertInto, obj.values).catch(err => err);
        if(onCompletetion)
            onCompletetion();
        console.log("Obj:", obj.values);
    },
};