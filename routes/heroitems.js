const render = require('../lib/render.js');
const postgreSQL = require('../db/postgreSQL.js');
const table_request = require('../lib/table_request.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');

function hero_items(req, res){req.setEncoding('utf-8');
    if (req.method == 'POST'){
        table_request(req, (body) => {
            const dataParse = parseBody(body);
            const sql = 'INSERT INTO heroitem (id_match, id_hero, id_item) VALUES ($1, $2, $3);';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            // const dataParse = parseBody(body);
            // const sql = 'UPDATE heroitem SET item_name=$2, item_cost=$3, category=$4, description=$5 WHERE id_item = $1;';
            // const parm = getParm(dataParse);
            // postgreSQL(sql, parm, () => {});
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
    };
    const sql = '';
    render('heroitem.html', data, sql, (error, html) => {
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
