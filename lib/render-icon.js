const path = require('path');

function render_icon(name) {
    name = name.replace(/ /g, "_");
    let html_icon = `
        <img style="height: 50px; widows: 70px;" src="../img/icons/${name}.png" alt="icon ${name}"></img>
    `;

    return html_icon
}

module.exports = render_icon;
