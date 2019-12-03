'use strict';

const { Pool, Client } = require('pg');

const client = new Client({
    host: '127.0.0.1',
    port: '5432',
    database: 'dotabuff',
    user: 'dotabuff',
    password: 'dotabuff'
});
client.connect();

function postgreSQL(sql, parm, done) {
    client.query(sql, parm, (err, res) => {
        if (err) {
            console.log(err.stack);
        } else {
            return done(res);
        }
    });
}

module.exports = postgreSQL;
