const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// 20200604 trust proxy setting
app.set('trust proxy', 'loopback');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// add html engine for html page...
app.engine('.html', require('ejs').renderFile);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

// logger handler
// app.use(logger('dev'));
logger.token('user-id', function getUserId(req) {
    if (req.session && req.session.loginInfo) {
        var loginInfo = req.session.loginInfo;
        return loginInfo.userid + ' ' + loginInfo.username
    }
    return '-';
})
logger.token('date-cst', function getDateCST() {
    // GMT+0800 (CST)
    var d = new Date();
    var timezoneOffset = d.getTimezoneOffset(); //minutes, -480
    var ddd = new Date(d.getTime() - timezoneOffset * 60000);   //local date.
    return ddd.toJSON() + " GMT+0800 (CST)";
})
app.use(logger(':remote-addr - :remote-user [:date-cst] ":method :url" :status :res[content-length] - :response-time ms :user-id'));

app.use(bodyParser.json({limit: '20mb'}));
app.use(bodyParser.urlencoded({
    limit: '20mb',
    extended: true
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// NODE_ENV and evnConfig
const NODE_ENV = process.env.NODE_ENV;
console.log('--------process.env.NODE_ENV=', NODE_ENV)
const env_config = require('./env_config');

if (env_config[NODE_ENV]) {
    global.envConfig = env_config[NODE_ENV];
} else {
    global.envConfig = env_config['devlopment'];
}
global.envConfig['notApplySchedule'] = 'SIT';
let tempStr = global.envConfig['inner_uaa']['clientId'] + ':' + global.envConfig['inner_uaa']['clientSecret'];
// tempStr = 'uop:123456';
global.envConfig['inner_uaa']['Authorization'] = 'Basic ' + (new Buffer(tempStr, 'utf8').toString('base64'));
console.log('--------global.envConfig=', global.envConfig)
console.log('------------------------------------------------------------')

if (typeof global.envConfig.mysqlConfig == 'string') {
    try {
        global.envConfig.mysqlConfig = JSON.parse(require('fs').readFileSync(global.envConfig.mysqlConfig));
        global.pool = mysql.createPool(Object.assign({
            connectionLimit: 500           // 允许的最大connection数量
        }, global.envConfig.mysqlConfig));
        pool.on('acquire', function (connection) {
            console.log('Connection %d acquired', connection.threadId);
        });
        pool.on('release', function (connection) {
            console.log('Connection %d released', connection.threadId);
        });
        pool.on('connection', function (connection) {
            connection.query('SET SESSION auto_increment_increment=1')
        });
        pool.on('enqueue', function (data) {
            console.log('Waiting for available connection slot', data);
        });
    } catch (error) {
        global.pool = {
            getConnection: function (callback) {
                callback(new Error('global.pool getConnection error=' + error))
            }
        };
        console.log('--------mysqlConfig error=', error);
    }
}
// console.log('--------global.envConfig2=', global.envConfig)
// console.log('------------------------------------------------------------')
global.sysLogger = require('./local_data/sysLogger');
// router handler functions...
require('./routes/index')(app);
// app.use('/', index);
// app.use('/users', users);

// logArchiveSchedule，按日期归档整理
require('./routes/logArchiveSchedule')();

// process.on("uncaughtException", function (err) {
//     console.log("******process uncaughtException occur, err=", err);
//     // console.log("******process uncaughtException err.stack)=", err.stack);
//     // process.exit(1);
// })

module.exports = app;
