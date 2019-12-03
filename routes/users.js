const render = require('../lib/render.js');
const postgreSQL = require('../db/postgreSQL.js');
const table_request = require('../lib/table_request.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');

function users(req, res){
    req.setEncoding('utf-8');
    if (req.method == 'POST'){
        table_request(req, (body) => {
            // Добавить добавление через Dota2API
            const dataParse = parseBody(body);
            const sql = 'INSERT INTO users (nick_name, rating_single, rating_group, discord, youtube, twich) VALUES ($1, $2, $3, $4, $5, $6);';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'UPDATE users SET nick_name=$2, rating_single=$3, rating_group=$4, discord=$5, youtube=$6, twich=$7 WHERE steam_id = $1;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = ';';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        });
    }


    const data = {
        header: [],
        formAdd: [],
        formEddit: []
    }; // хранятся данные для замены
    const sql = undefined; // sql запрос для замены
    render('users.html', data, sql, (error, html) => {
        if (error) {
            res.writeHead(500, {'Cotent-Type': 'text/plain'});
            return res.end(error.message);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
}

module.exports = users;
