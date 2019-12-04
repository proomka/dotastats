const render = require('../lib/render.js');
const postgreSQL = require('../db/postgreSQL.js');
const table_request = require('../lib/table_request.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');

function sql(req, res){
    req.setEncoding('utf-8');
    if (req.method == 'POST'){
        table_request(req, (body) => {
            const dataParse = parseBody(body);
            const data = {
                header: [],
                formAdd: [],
                formEddit: []
            };
            const sql = dataParse.search;
            render('sql.html', data, sql, (error, html) => {
                if (error) {
                    res.writeHead(500, {'Cotent-Type': 'text/plain'});
                    return res.end(error.message);
                }

                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                res.end(html);
            });
        });
    } else {
        const data = {
            header: [],
            formAdd: [],
            formEddit: []
        };
        const sql = undefined;
        render('sql.html', data, sql, (error, html) => {
            if (error) {
                res.writeHead(500, {'Cotent-Type': 'text/plain'});
                return res.end(error.message);
            }

            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/html');
            res.end(html);
        });
    }
}

module.exports = sql;
