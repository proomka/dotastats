const table_request = require('../lib/table_request.js');
const postgreSQL = require('../db/postgreSQL.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');
const render = require('../lib/render.js');

function match(req, res) {
    req.setEncoding('utf-8');
    if (req.method == 'POST') {
        table_request(req, (body) => {
            const dataParse = parseBody(body);
            const sql = 'INSERT INTO match (id_match, skill_bracket, lobby_type, game_mode, region, duration, match_ended, patch) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
            const parm = getParm(dataParse);
            parm[5] = parm[5].replace(/%3A/g, ':');
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'UPDATE match SET skill_bracket = $2, lobby_type = $3, game_mode = $4, region = $5, duration = $6, match_ended = $7, patch = $8 WHERE id_match = $1;';
            const parm = getParm(dataParse);
            parm[5] = parm[5].replace(/%3A/g, ':');
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'DELETE FROM match WHERE id_match = $1;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        });
    }

    var eddit = true;
    const data = {
        header: ['Match ID', 'Skill bracket', 'Type of lobby', 'Game mod', 'Region', 'Duration', 'Was played', 'Patch'],
        formAdd: ['Match ID', 'Skill bracket', 'Type of lobby', 'Game mod', 'Region', 'Duration', 'Was played', 'Patch'],
        formEddit: ['Skill bracket', 'Type of lobby', 'Game mod', 'Region', 'Duration', 'Was played', 'Patch']
    };
    const sql = '';
    render('match.html', eddit, data, sql, (error, html) => {
        if (error) {
            res.writeHead(500, {'Cotent-Type': 'text/plain'});
            return res.end(error.message);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
}

module.exports = match;
