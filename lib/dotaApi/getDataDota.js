const dataToDB = require('./dataToDB.js');
const dotaApi = require('./dotaApi.js');

function getHeros(){
    const table = 'heroes';
    dotaApi(table, (data, result) => {
        dataToDB(result, data, 'hero', []);
    });
}

function getUser(account_id, args) {
    const table = 'players/';
    dotaApi(table + account_id, (data, result) => {
        dataToDB(result, table, 'users', args);
    });
}

function getLastGames(account_id) {
    dotaApi('players/' + account_id + '/recentMatches', (data, result) => {
        for (var i = 0; i < result.length; i++) {
            let match_id = result[i].match_id;
            let args = [];
            dotaApi('matches/' + match_id, (data, result) => {
                dataToDB(result, 'match', 'match', []);
                for (var j = 0; j < 10; j++) {
                    console.log(j);
                    let ac_id = result.players[j].account_id;
                    if (ac_id !== null || ac_id !== undefined) {
                        getUser(ac_id, ['', '', '']);
                    }
                    dataToDB(result, 'matchhero', 'matchhero', j);
                    let res1 = result.players[j];
                    dataToDB(res1, 'heroitems', 'heroitems', []);
                }
            });
        }
    });
}

module.exports = {
    getHeros,
    getUser,
    getLastGames
};
