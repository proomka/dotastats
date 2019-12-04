const path = require('path');
const fs = require('fs');
const render_table = require('./render-table.js');

function render(templateName, data, sql, done) {
    console.log(templateName);
    fs.readFile(path.resolve('views', templateName), 'utf-8', (error, template) => {
        if (error) {
            return done(error);
        }

        if (!data) {
            return done(null, template);
        }

        const html = template.replace(/{{([^{}]*)}}/g, (placeholder, property) => {
            const prop = property.split('.');
            if (prop[0] == 'Table') {
                render_table(sql, prop[1], data, (hhtml) => {
                    global[property] = hhtml;
                });
                return global[property];
            } else {
                const match = data[property];
                return match || placeholder;
            }
        });

        done(null, html);;
    });
}

module.exports = render;
