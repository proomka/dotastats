const https = require('https');
const path = require('path');

function dotaApi(data, done) {
    const options = 'https://api.opendota.com/api/' + data;

    https.get(options, res => {
        res.setEncoding('utf-8');
        let body = '';
        res.on('data', data => body += data);
        res.on('end', () => {
            const result = JSON.parse(body);
            console.log(result);
            // done(data, result);
        });
    });
}

dotaApi('players/260548956/recentMatches'); ///players/{account_id}/recentMatches
// module.exports = dotaApi;
