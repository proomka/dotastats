const render = require('../lib/render.js');

function match_hero(req, res){
    const sql = '';
    render('matchhero.html', 'null', sql, (error, html) => {
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
