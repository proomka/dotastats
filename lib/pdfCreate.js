const postgreSQL = require('../db/postgreSQL.js');
const PDFDocument = require('pdfkit');
const fs = require('fs');

function pdfCreate(name, table, done) {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('zip.pdf'));
    if (table == 'user') {
        sql = "SELECT  *, (SELECT COUNT(result) FROM matchhero WHERE matchhero.steam_id=users.steam_id and result = 'win') as wins, (SELECT COUNT(result) FROM matchhero WHERE matchhero.steam_id=users.steam_id and result = 'lose') as losses FROM users WHERE nick_name = '" + name + "'";
        let parm = '';
        postgreSQL(sql, parm, (res) => {
            doc
            .fontSize(14)
            .text(`Name - ${res.rows[0].nick_name}
                Stream id - ${res.rows[0].steam_id}

                Statistics:
                Rating - ${res.rows[0].rating} MMR
                Wins -   ${res.rows[0].wins};
                Losses - ${res.rows[0].losses};
                `, 100, 100);

                doc.end();
                setTimeout(done, 1500);
            });
    } else if (table == 'hero') {
        sql = "SELECT hero_name, primary_attr, attack_type , (SELECT COUNT(result) FROM matchhero WHERE matchhero.id_hero=hero.id_hero and result = 'win') as wins, (SELECT COUNT(result) FROM matchhero WHERE matchhero.id_hero=hero.id_hero and result = 'lose') as losses FROM hero WHERE hero_name = '" + name + "'";
        let parm = '';
        postgreSQL(sql, parm, (res) => {
            console.log(res.rows[0]);
            doc
            .fontSize(14)
            .text(`
                Name - ${res.rows[0].hero_name}

                    Statistics:
                    Prymary attrybute - ${res.rows[0].prymary_attr};
                    Type of attack - ${res.rows[0].attack_type};
                    Wins -   ${res.rows[0].wins};
                    Losses - ${res.rows[0].losses};
                `, 100, 100);

                doc.end();
                setTimeout(done, 1500);
            });
    }
}

module.exports = pdfCreate;
