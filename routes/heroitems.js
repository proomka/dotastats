const table_request = require('../lib/table_request.js');
const postgreSQL = require('../db/postgreSQL.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');
const render = require('../lib/render.js');

function hero_items(req, res){req.setEncoding('utf-8');
    if (req.method == 'POST'){
        table_request(req, (body) => {
            const dataParse = parseBody(body);
            const sql = 'INSERT INTO heroitem (id_match, id_hero, id_item) VALUES ($1, $2, $3);';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'UPDATE heroitem SET id_item = $3 WHERE id_match = $1 and id_hero = $2;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'DELETE FROM heroitem WHERE id_match = $1 and id_hero = $2 and id_item = $3;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        });
    }

    var eddit = true;
    const data = {
        header: ['Match Id', 'Hero Id', 'Item Id'],
        formAdd: ['Match Id', 'Hero Id', 'Item Id'],
        formEddit: ['Item Id']
    };
    const sql = '';
    render('heroitem.html', eddit, data, sql, (error, html) => {
        if (error) {
            res.writeHead(500, {'Cotent-Type': 'text/plain'});
            return res.end(error.message);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
}

module.exports = hero_items;
