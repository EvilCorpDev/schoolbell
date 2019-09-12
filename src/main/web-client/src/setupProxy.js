const proxy = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(proxy('/schedule',
        {target: 'http://localhost:9000/'}
    ), proxy('/exception-days',
        {target: 'http://localhost:9000/'}
    ), proxy('/play',
        {target: 'http://localhost:9000/'}
    ));
};
