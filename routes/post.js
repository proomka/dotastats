const {getLastGames} = require('../lib/dotaApi/getDataDota.js');
const postgreSQL = require('../db/postgreSQL.js');
const pdfCreate = require('../lib/pdfCreate');
const fs = require("fs");

function post(req, res) {
    let postAction = req.url.split('/')[2];
    let name = req.url.split('/')[3].split('=')[1];
    name = decodeURIComponent(name);
    switch (postAction) {
        case 'new_data':
            console.log('new_data');
            sql = "SELECT steam_id FROM users WHERE nick_name = '" + name + "'";
            let parm = '';
            postgreSQL(sql, parm, (res) => {
                console.log(res.rows[0].steam_id);
                getLastGames(res.rows[0].steam_id);
            });
            res.end();
            break;
        case 'pdf_file_user':
            console.log('pdf_file');
            pdfCreate(name, 'user', () => {
                var filePath = 'zip.pdf'
                fs.readFile(filePath, (error, data) => {
                    if (error) {
                        res.statusCode = 404;
                        res.end("Resourse not found!");
                    } else {
                        res.end(data);
                    }
                });
            });
            break;
        case 'pdf_file_hero':
            console.log('pdf_file_hero');
            pdfCreate(name, 'hero', () => {
                var filePath = 'zip.pdf'
                fs.readFile(filePath, (error, data) => {
                    if (error) {
                        res.statusCode = 404;
                        res.end("Resourse not found!");
                    } else {
                        res.end(data);
                    }
                });
            });
            break;
        default:
    }
}

module.exports = post;
