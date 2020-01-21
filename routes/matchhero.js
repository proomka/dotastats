const table_request = require('../lib/table_request.js');
const postgreSQL = require('../db/postgreSQL.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');
const render = require('../lib/render.js');

function match_hero(req, res){
    req.setEncoding('utf-8');
    if (req.method == 'POST'){
        table_request(req, (body) => {
            const dataParse = parseBody(body);
            const sql = 'INSERT INTO matchhero (id_match, id_hero, steam_id, kills, deaths, assists, total_value, last_hits, denays, gold_per_min, exp_per_min, damage, heals, line, side, result) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'UPDATE matchhero SET kills = $4, deaths = $5, assists = $6, total_value = $7, last_hits = $8, denays = $9, gold_per_min = $10, exp_per_min = $11, damage = $12, heals = $13, line = $14, side = $15, result = $16 WHERE id_match = $1 and id_hero = $2 and steam_id = $3;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'DELETE FROM matchhero WHERE id_match = $1 and id_hero = $2 and steam_id = $3;';
            const parm = getParm(dataParse);
            console.log(parm);
            postgreSQL(sql, parm, () => {});
        });
    }

    var eddit = true;
    const data = {
        header: ['Match Id', 'Hero Id', 'Steam Id', 'Kills', 'Deaths', 'Assists', 'Total value', 'Last hits', 'Denays', 'Gold/min', 'Experience/min', 'Damage', 'Heals', 'line', 'Side', 'Result'],
        formAdd: ['Match Id', 'Hero Id', 'Steam Id', 'Kills', 'Deaths', 'Assists', 'Total value', 'Last hits', 'Denays', 'Gold/min', 'Experience/min', 'Damage', 'Heals', 'line', 'Side', 'Result'],
        formEddit: ['Kills', 'Deaths', 'Assists', 'Total value', 'Last hits', 'Denays', 'Gold/min', 'Experience/min', 'Damage', 'Heals', 'line', 'Side', 'Result']
    };
    const sql = '';
    render('matchhero.html', eddit, data, sql, (error, html) => {
        if (error) {
            res.writeHead(500, {'Cotent-Type': 'text/plain'});
            return res.end(error.message);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
}

module.exports = match_hero;
