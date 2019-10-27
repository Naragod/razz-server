const { Client } = require('pg');

const promify = (callback) => new Promise((resolve, reject) => {
  callback(resolve, reject);
});

module.exports = {
  setClientConnection: (config) => {
    const client = new Client(config);
    client
      .connect()
      .then(() => console.log('Connected to DB.'))
      .catch((error) => {
        console.log('Could not connect to DB');
        return error;
      });
    return client;
  },

  query: (client, query) => promify((resolve, reject) => {
    client.query(query, (err, res) => {
      if (err) {
        console.log('Could not perform query:', err);
        reject(err);
      }
      resolve(res);
    });
  }),

  insert: (client, into, values) => promify((resolve, reject) => {
    client.query(into, values, (err, res) => {
      if (err) {
        console.log('Cound not insert:', err);
        reject(err);
      }
      resolve(res);
    });
  }),

  endConnection: (connection) => {
    connection.end();
  },
};
