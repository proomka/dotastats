const dotaApi = require('./dotaApi.js');
const dataToDB = require('./dataToDB.js');

function getHeros(){
    const table = 'heroes';
    dotaApi(table, (data, result) => {
        dataToDB(result, data, 'hero', []);
    });
}

// 260548956
function getUser(account_id, args){
    const table = 'players/';
    dotaApi(table + account_id, (data, result) => {
        dataToDB(result, table, 'users', args);
    });
}

function getLastGames(account_id) {
    dotaApi('players/' + account_id + '/recentMatches', (data, result) => {
        for (var i = 0; i < result.length; i++) {
            const match_id = result[i].match_id;
            dotaApi('matches/' + match_id, (data, result) => {
                dataToDB(result, 'match', 'match', []);
            });
        }
    });
}

module.exports = {
    getHeros,
    getUser,
    getLastGames
};
