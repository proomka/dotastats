const public = require('./public');
const home = require('./home');
const users = require('./users');

const heroitems = require('./heroitems');
const hero = require('./hero');
const matchhero = require('./matchhero');
const match = require('./match');
const items = require('./items');
const item = require('./item');
const sql = require('./sql');
const post = require('./post');

const notFound = require('./notFound');

module.exports = {
    public,
    home,
    users,
    items,
    item,
    match,
    hero,
    heroitems,
    matchhero,
    notFound,
    sql,
    post
};
