const {getUser} = require('../lib/dotaApi/getDataDota.js');
const table_request = require('../lib/table_request.js');
const postgreSQL = require('../db/postgreSQL.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');
const render = require('../lib/render.js');

function users(req, res){
    req.setEncoding('utf-8');
    console.log(req.method);
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
            const sql = 'UPDATE users SET nick_name=$2, rating=$3, discord=$4, youtube=$5, twich=$6 WHERE steam_id = $1;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'DELETE FROM users WHERE steam_id = $1;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        });
    }

    let eddit = false;
    let sql = '';
    data = {
        header: [],
        formAdd: [],
        formEddit: []
    };

    if (req.url.endsWith('/view')) {
        eddit = false;
        sql = "SELECT nick_name, rating, (SELECT COUNT(result) FROM matchhero WHERE matchhero.steam_id=users.steam_id and result = 'win') as wins, (SELECT COUNT(result) FROM matchhero WHERE matchhero.steam_id=users.steam_id and result = 'lose') as losses FROM users";
        data = {
            header: ['Nick name', 'Rating', 'Wins', 'Losses', 'Get Statistics'],
            formAdd: [],
            formEddit: []
        };
    } else {
        eddit = true;
        sql = '';
        data = {
            header: ['Steam ID', 'Nick name', 'Rating', 'Discord', 'Youtube', 'Twich'],
            formAdd: ['Steam ID', 'Discord', 'Youtube', 'Twich'],
            formEddit: ['Nick name', 'Rating', 'Discord', 'Youtube', 'Twich']
        };
    }

    render('users.html', eddit, data, sql, (error, html) => {
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
