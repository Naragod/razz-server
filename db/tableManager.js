const { Observable } = require('rxjs');
const dbHandler = require('../db/dbHandler');
const TableModel = require('../models/tableModel');

// configuration
// ****************************************************************************
const user = 'postgres';
const password = 'pass';
const host = 'localhost';
const port = '5432';
const db = 'raffle';
const configDb = {
  connectionString: `postgresql://${user}:${password}@${host}:${port}/${db}`,
};
const connection = dbHandler.setClientConnection(configDb);
// ****************************************************************************

module.exports = {
  getTable(table, onCompletetion) {
    dbHandler
      .query(connection, `select * from ${table}`)
      .then((r) => {
        if (onCompletetion) onCompletetion(r);
      })
      .catch((err) => err);
  },

  saveToTable: (data, onCompletetion) => {
    const obj = new TableModel(data.table, data.raffleid, data.data).model;
    if (obj === null) return;
    const insertInto = `insert into "${obj.table}" (${obj.columns.join(',')}) `
      + `VALUES (${obj.columns
        .map((e, i) => `$${i + 1}`)
        .join(',')}) RETURNING *`;

    dbHandler
      .insert(connection, insertInto, obj.values)
      .then(() => {
        if (onCompletetion) onCompletetion();
        console.log('Obj:', obj.values);
      })
      .catch((err) => err);
  },
};
