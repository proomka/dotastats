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
            done(data, result);
            // console.log(result);
        });
    });
}

module.exports = dotaApi;
