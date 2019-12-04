const postgreSQL = require('../../db/postgreSQL.js');
const getParm = require('../getParm.js');

function dataToDB(data, table, dataTable, args) {
    switch (table) {
        case 'heroes':
            for (var hero in data) {
                let sql = 'INSERT INTO hero (id_hero, hero_name, primary_attr, attack_type) VALUES ($1, $2, $3, $4);';
                let parm = getParm(data[hero]);
                parm = [parm[0], parm[2], parm[3], parm[4]];
                postgreSQL(sql, parm, () => {
                    console.log('200: DB INSERT INTO heros');
                });
            }
            break;

        case 'players/':
            let sql = 'INSERT INTO users (steam_id, nick_name, rating, discord, youtube, twich) VALUES ($1, $2, $3, $4, $5, $6);';
            parm = [data.profile.account_id, data.profile.personaname, data.mmr_estimate.estimate];
            parm = parm.concat(args);
            postgreSQL(sql, parm, () => {
                console.log('200: DB INSERT INTO users');
            });
            break;

        case 'match':
            // в data хранятся данные о матче. нужно данные по своим таблицам
            break;

        default:
            console.log('400');
    }
}

module.exports = dataToDB;
