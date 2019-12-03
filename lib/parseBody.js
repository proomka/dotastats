function parseBody(body){
    const result = {};
    const keyValuePairs = body.split('&');
    keyValuePairs.forEach(keyValue => {
        const [key, value] = keyValue.split('=');
        result[key] = value;
    });
    return result;
}

module.exports = parseBody;
