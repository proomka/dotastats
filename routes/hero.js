const table_request = require('../lib/table_request.js');
const postgreSQL = require('../db/postgreSQL.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');
const render = require('../lib/render.js');

// добваить для каждого предмета свою страницу
function hero(req, res){
    req.setEncoding('utf-8');
    if (req.method == 'POST'){
        table_request(req, (body) => {
            const dataParse = parseBody(body);
            const sql = 'INSERT INTO hero (id_hero, hero_name, primary_attr, attack_type) VALUES ($1, $2, $3, $4);';
            const parm = getParm(dataParse);
            postgreSQL('SELECT MAX(id_hero) FROM hero', null, (res) => {
                let max_id = res.rows[0].max+1;
                parm.unshift(max_id);
                console.log(parm);
                postgreSQL(sql, parm, () => {});
            });
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'UPDATE hero SET hero_name=$2, primary_attr=$3, attack_type=$4 WHERE id_hero = $1;';
            const parm = getParm(dataParse);
            postgreSQL(sql, parm, () => {});
        }, (body) => {
            const dataParse = parseBody(body);
            const sql = 'DELETE FROM hero WHERE id_hero = $1;';
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
        sql = "SELECT hero_name, primary_attr, attack_type , (SELECT COUNT(result) FROM matchhero WHERE matchhero.id_hero=hero.id_hero and result = 'win') as wins, (SELECT COUNT(result) FROM matchhero WHERE matchhero.id_hero=hero.id_hero and result = 'lose') as losses FROM hero";
        data = {
            header: ['Name', 'Basic attribute', 'Type attack', 'Wins', 'Losses'],
            formAdd: [],
            formEddit: []
        };
    } else {
        eddit = true;
        sql = '';
        data = {
            header: ['Hero Id', 'Name', 'Basic attribute', 'Type attack'],
            formAdd: ['Name', 'Basic attribute', 'Type attack'],
            formEddit: ['Name', 'Basic attribute', 'Type attack']
        };
    }

    render('hero.html', eddit, data, sql, (error, html) => {
        if (error) {
            res.writeHead(500, {'Cotent-Type': 'text/plain'});
            return res.end(error.message);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
}

module.exports = hero;
