const mysql = require('mysql');
let config = {
    mysql: {
        connectionLimit: 500,
        host: "bg2x7ko501glnhvtvrkt-mysql.services.clever-cloud.com",
        user: "uuzslkcgyrx5mxvl",
        password: "kiQ4LrHva6FaslbuZWvL",
        database: "bg2x7ko501glnhvtvrkt",
    },
};
let mysql_conn;

function query(sql, args={}) {
    mysql_conn = mysql_conn ? mysql_conn : mysql.createConnection(config.mysql);
    return new Promise((resolve, reject) => {
        if (!mysql_conn) return reject("Mysql client is not ready", "E101");
        mysql_conn.query(sql, args, (error, results, fields) => {
            // mysql_conn.destroy();
            // mysql_conn = undefined;
            if (error) return reject(error);
            resolve(results);
        });
    });
}
module.exports = {
    config,
    query,
};