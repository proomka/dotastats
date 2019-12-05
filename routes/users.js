const render = require('../lib/render.js');
const postgreSQL = require('../db/postgreSQL.js');
const table_request = require('../lib/table_request.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');
const {getUser} = require('../lib/dotaApi/getDataDota.js');

function users(req, res){
    req.setEncoding('utf-8');
    if (req.method == 'POST'){
        table_request(req, (body) => {
            const dataParse = parseBody(body);
            let args = [];
            for (var i = 1; i < Object.keys(dataParse).length; i++) {
                args.push(dataParse[Object.keys(dataParse)[i]]);
            }
            getUser(dataParse[Object.keys(dataParse)[0]], args);
        }, (body) => {
            const dataParse = parseBody(body);
            console.log(dataParse);
            const sql = 'UPDATE users SET nick_name=$2, rating=$3, discord=$4, youtube=$5, twich=$6 WHERE steam_id = $1;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            console.log(dataParse);
            const sql = 'DELETE FROM users WHERE steam_id = $1;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        });
    }


    const data = {
        header: [],
        formAdd: ['Steam ID', 'Discord', 'Youtube', 'Twich'],
        formEddit: ['Discord', 'Youtube', 'Twich']
    }; // хранятся данные для замены
    const sql = undefined;
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
