var urlencode = require('urlencode');

function table_request(req, done_add, done_eddit, done_filter) {
    const postAction = req.url.split('/')[2];
    let body = '';
    switch (postAction) {
        case 'add':
            req.setEncoding('utf-8');
            req.on('data', data => body += data);
            req.on('end', () => {
                done_add(body.replace(/\+/g, " ").replace(/\%2/g, ""));
            });
            break;
        case 'eddit':
            req.setEncoding('utf-8');
            req.on('data', data => body += data);
            req.on('end', () => {
                urlencode.decode(body);
                done_eddit(body.replace(/\+/g, " ").replace(/\%2/g, ""));
            });
            break;
        case 'filter':
            req.setEncoding('utf-8');
            req.on('data', data => body += data);
            req.on('end', () => {
                done_filter(body.replace(/\+/g, " ").replace(/\%2/g, ""));
            });
            break;
        default:
            break;
    }
}

module.exports = table_request;
