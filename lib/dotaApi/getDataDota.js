const dotaApi = require('./dotaApi.js');
const dataToDB = require('./dataToDB.js');

function getHeros(){
    const table = 'heroes';
    dotaApi(table, (data, result) => {
        dataToDB(result, data, 'hero', []);
    });
}

function getUser(account_id, args){
    const table = 'players/';
    dotaApi(table + account_id, (data, result) => {
        dataToDB(result, table, 'users', args);
    });
}

function getLastGames(account_id) {
    // взять id матча с '/players/{account_id}/recentMatches' (последние матчи)
    //                  '/players/{account_id}/matches/items?limit=20' (последние 20 матчмей)
    // взять всю статистику из '/matches/{match_id}'
}

// getHeros();
getUser('170577216', ['nnn', 'aaa', 'qqq']);
// module.exports = getDataDota;
