const postgreSQL = require('../../db/postgreSQL.js');
const getParm = require('../getParm.js');

let sql = '';

function dataToDB(data, table, dataTable, args) {
    switch (table) {
        case 'heroes':
            for (var hero in data) {
                sql = 'INSERT INTO hero (id_hero, hero_name, primary_attr, attack_type) VALUES ($1, $2, $3, $4);';
                let parm = getParm(data[hero]);
                parm = [parm[0], parm[2], parm[3], parm[4]];
                postgreSQL(sql, parm, () => {
                    console.log('200: DB INSERT INTO heros');
                });
            }
            break;

        case 'players/':
            sql = 'INSERT INTO users (steam_id, nick_name, rating, discord, youtube, twich) VALUES ($1, $2, $3, $4, $5, $6);';
            try {
                parm = [data.profile.account_id, data.profile.personaname, data.mmr_estimate.estimate];
            } catch (e) {
                break;
            }

            if ('account_id' in data.profile) {
                parm = [data.profile.account_id, data.profile.personaname, data.mmr_estimate.estimate];
                parm = parm.concat(args);
                postgreSQL(sql, parm, () => {
                    console.log('200: DB INSERT INTO users');
                });
            }
            break;

        case 'match':
            sql = 'INSERT INTO match (id_match, skill_bracket, lobby_type, game_mode, region, duration, match_ended, patch) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);';
            parm = [data.match_id, data.skill, data.lobby_type, data.game_mode,
                    data.region, data.duration, data.start_time, data.patch];
            postgreSQL(sql, parm, () => {
                console.log('200: DB INSERT INTO match');
            });
            break;
        case 'matchhero':
            sql = 'INSERT INTO matchhero (id_match, id_hero, steam_id, kills, deaths, assists, total_value, last_hits, denays, gold_per_min, exp_per_min, damage, heals, line, side, result) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);';
            parm = [data.players[args].match_id, data.players[args].hero_id,
                    data.players[args].account_id, data.players[args].hero_kills,
                    data.players[args].deaths, data.players[args].assists,
                    data.players[args].gold, data.players[args].neutral_kills,
                    data.players[args].denies, data.players[args].gold_per_min,
                    data.players[args].xp_per_min, data.players[args].hero_damage,
                    data.players[args].hero_healing, data.players[args].lane,
                    data.players[args].isRadiant, (data.players[args].isRadiant == data.players[args].radiant_win) ? 'win' : 'lose'];
            postgreSQL(sql, parm, () => {
                console.log('200: DB INSERT INTO matchhero');
            });
            break;
        case 'heroitems':
            sql = 'INSERT INTO heroitems (id_match, id_hero, id_item) VALUES ($1, $2, $3);';
            parms = [data.match_id, data.hero_id];
            for (var i = 0; i < 6; i++) {
                parms.push(data["item_" + i]);
                console.log(parms);
                postgreSQL(sql, parms, () => {
                    console.log('200: DB INSERT INTO heroitems');
                });
            }
            break;
        default:
            console.log(404);
            break;
    }
}

module.exports = dataToDB;
