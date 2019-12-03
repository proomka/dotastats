function getParm(dataParse) {
    let parm = [];
    for (var val in dataParse) {
        parm.push(dataParse[val]);
    }
    return parm
}

module.exports = getParm;
