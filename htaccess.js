const ncp = require('ncp').ncp;
const path = require('path');

const source = path.join(__dirname, '.htaccess');
const destination = path.join(__dirname, 'build', '.htaccess');

ncp.limit = 16;

ncp(source, destination, function (err) {
    if (err) {
        return console.error('Hiba történt a .htaccess másolása során:', err);
    }
    console.log('.htaccess sikeresen átmásolva a build mappába!');
});