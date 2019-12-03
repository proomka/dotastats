const render = require('../lib/render.js');
const postgreSQL = require('../db/postgreSQL.js');
const table_request = require('../lib/table_request.js');
const parseBody = require('../lib/parseBody.js');
const getParm = require('../lib/getParm.js');

function item(req, res){
    req.setEncoding('utf-8');

    const data = {};
    // const sql = "SELECT items.item_name, Count(heroitems.id_item = items.id_item) as n, Count(items.id_item = heroitems.id_item and heroitems.id_match = matchhero.id_match and matchhero.result = 'win') from items, heroitems, matchhero GROUP BY items.id_item";
    const sql = "SELECT hi.id_item, Count(matchhero.result) FROM heroitems hi LEFT JOIN matchhero on hi.id_hero=matchhero.id_hero WHERE matchhero.result='win' group by id_item";
    render('item.html', data, sql, (error, html) => {
        if (error) {
            res.writeHead(500, {'Cotent-Type': 'text/plain'});
            return res.end(error.message);
        }

        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(html);
    });
}

module.exports = item;
