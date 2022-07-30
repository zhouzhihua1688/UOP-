// archive log file, default logPath:'/opt/logs/uop/uop_access.log'
// using redis archive flag for multiple process/thread, key:'uop:schedule:logArchive', value: 0/1  (0:not running/1:running)
const RedisClient = require('ioredis');
const redisCluster = global.envConfig.redisCluster;
const client = new RedisClient.Cluster(redisCluster);
const scheduleRuningFlag = 'uop:schedule:logArchive'; //需要加本机标识符，ip之类

// client.set("foo", "bar");
// client.get("foo", function (err, res) {
//   // res === 'bar'
// });

const {execSync} = require('child_process');

module.exports = function () {
    const fs = require('fs');

    // if(String(process.env.NODE_ENV).toLowerCase().indexOf( ['undefined', 'devlopment'])){
    //     console.log('logArchiveSchedule NODE_ENV=' + process.env.NODE_ENV + ', logArchiveSchedule不执行')
    //     return;
    // }

    let logFilename = 'uop_access.log';
    // let logDir = 'D:\\';
    let logDir = '/opt/logs/uop/';

    let logPath = logDir + logFilename;
    // let logPath = '/opt/logs/uop/uop_access.log';

    if(!fs.existsSync(logPath)){
        console.log('logArchiveSchedule logPath日志文件不存在，logArchiveSchedule不执行')
        return;
    }

    // return;
    console.log('logArchiveSchedule------加载开始------', currentCST());

    try{
        let logFileStats = fs.statSync(logPath);
        console.log('logArchiveSchedule 当前log文件大小size=', logFileStats.size);
        if(logFileStats.size > 1024*1024*100){
            // client.get(scheduleRuningFlag, function (err, res) {
            //     if(err) {
            //         console.log('logArchiveSchedule ------------------------------' + currentCST()+ ' redis get scheduleRuningFlag error=', e);
            //         return;
            //     }
            //     if(res === 1) return;
            //     client.set(scheduleRuningFlag, 1);
                console.log('logArchiveSchedule 当前log文件超过100M，直接备份，后缀为当前时间戳', currentCST());
                let newLogPath = logPath.slice(0, -4) + '_' + currentCST().replace(/:/g, "_") + '.log';
                fs.renameSync(logPath, newLogPath);
                let pm2ReloadLogs = execSync('pm2 reloadLogs');
                console.log('pm2ReloadLogs=', String(pm2ReloadLogs));
                // fs.copyFileSync(logPath, newLogPath);
                // fs.writeFileSync(logPath, "");
                console.log('logArchiveSchedule 原log文件备份结束 ' + currentCST()+ '，newLogPath=', newLogPath);
            //     client.set(scheduleRuningFlag, 0);
            // });
              
        }
    }catch(e){
        console.log('logArchiveSchedule ------------------------------' + currentCST()+ ' fs.statSync error=', e);
    }
    

    try{
        const schedule = require('node-schedule');

        // let job_write2log = schedule.scheduleJob('*/5 * * * * *', function(){
        //     for (let i = 0; i < 10; i++) {
        //         let mockLogLine =  currentCST() + 'request...一行log...200\n';
        //         console.log(mockLogLine);
        //         // fs.appendFileSync(logPath, mockLogLine)
        //         fs.appendFile(logPath, mockLogLine, (err) => {
        //           if (err) throw err;
        //           console.log('appendFile complete!');
        //         })
        //     }
        // });
        
        
        // let j = schedule.scheduleJob('0 */2 * * * *', function(){
        //     let newLogPath = logPath.slice(0, -4) + '_' + currentCST().replace(/:/g, "_") + '.log';
        //     console.log('logArchiveSchedule 文件归档，newLogPath=', newLogPath);
        //     // fs.renameSync(logPath, newLogPath);
        //     // fs.rename(logPath, newLogPath, (err) => {
        //     //   if (err) throw err;
        //     //   console.log('logArchiveSchedule 文件归档，complete!!!');
        //     // });
        //     fs.copyFileSync(logPath, newLogPath);
        //     fs.writeFileSync(logPath, "");
        // });
        
        let j = schedule.scheduleJob('0 0 0 * * *', function(){
            // client.get(scheduleRuningFlag, function (err, res) {
            //     if(err) {
            //         console.log('logArchiveSchedule ------------------------------' + currentCST()+ ' redis get scheduleRuningFlag error=', e);
            //         return;
            //     }
            //     if(res === 1) return;
            //     client.set(scheduleRuningFlag, 1);
                let newLogPath = logPath.slice(0, -4) + '_' + lastDayCST() + '.log';
                console.log('logArchiveSchedule 文件归档开始 ' + currentCST()+ '，newLogPath=', newLogPath);
                fs.renameSync(logPath, newLogPath);
                let pm2ReloadLogs = execSync('pm2 reloadLogs');
                console.log('pm2ReloadLogs=', String(pm2ReloadLogs));
                // fs.copyFileSync(logPath, newLogPath);
                // fs.writeFileSync(logPath, "");
                console.log('logArchiveSchedule 文件归档结束 ' + currentCST()+ '，newLogPath=', newLogPath);
            //     client.set(scheduleRuningFlag, 0);
            // });
        });

    }catch(e){
        console.log('logArchiveSchedule ------------------------------' + currentCST()+ ' scheduleJob error=', e);
    }

    console.log('logArchiveSchedule------加载结束------', currentCST());

    function currentCST() {
        // GMT+0800 (CST)
        var d = new Date();
        var timezoneOffset = d.getTimezoneOffset(); //minutes, -480
        var ddd = new Date(d.getTime() - timezoneOffset * 60000);   //local date.
        return ddd.toJSON() + " GMT+0800 (CST)";
    }

    function lastDayCST() {
        // GMT+0800 (CST)
        var d = new Date();
        var timezoneOffset = d.getTimezoneOffset(); //minutes, -480
        var ddd = new Date(d.getTime() -1000*3600*24 - timezoneOffset * 60000);   //local date. last day.
        return ddd.toJSON().slice(0, 10);  // 类似于 2020-05-13
        // return ddd.toJSON().replace(/:/g, "_");  // 类似于 2020-05-13
    }
}
