const http = require('http');

const {public, home, users, items, item, match, hero, heroitems, matchhero, notFound, sql} = require('./routes/index.js');

http.createServer((req, res) => {
    if (req.url.match(/\.(html|css|js|png)$/)){
        public(req, res);
    } else if (req.url == '/') {
        home(req, res);
    } else if (req.url.startsWith('/users')) {
        users(req, res);
    } else if (req.url.startsWith('/heroitems')) {
        heroitems(req, res);
    } else if (req.url.startsWith('/matchhero')) {
        matchhero(req, res);
    } else if (req.url.startsWith('/items')) {
        items(req, res);
    } else if (req.url.startsWith('/item')) {
        item(req, res);
    } else if (req.url.startsWith('/match')) {
        match(req, res);
    } else if (req.url.startsWith('/hero')) {
        hero(req, res);
    } else if (req.url.startsWith('/sql')) {
        sql(req, res);
    } else {
        // console.log(req.url);
        // notFound(req, res);
    }
    }).listen(3000, () => {
        console.log('Server worked!');
    });
