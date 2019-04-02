const { Client } = require('pg');
 

promify = function(callback) {
    return new Promise((resolve, reject) => {
        callback(resolve, reject);
    });
};

module.exports = {
    setClientConnection: (config) => {
        let client = new Client(config);
        client.connect();
        return client;
    },
 
    query: (client, query) => {
        return promify((resolve, reject) => {
            client.query(query, (err, res) => {
                if(err){
                    console.log("Could not perform query:", err);
                    reject(err);
                }
                resolve(res);
            });
        });
    },

    insert: (client, into, values) => {
        return promify((resolve, reject) => {
            client.query(into, values, (err, res) => {
                if(err){
                    console.log("Cound not insert:", err);
                    reject(err)
                }
                resolve(res)
            });
        });
    },
 
    endConnection: (connection) => {
        connection.end();
    }
}