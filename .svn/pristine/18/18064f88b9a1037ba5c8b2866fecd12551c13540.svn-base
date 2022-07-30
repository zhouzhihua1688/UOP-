const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').automatedOperation.taskTrackerQuery.taskTrackerRecordQuery;
module.exports = function (app) {
    //查询
    app.post('/automatedOperation/taskTrackerQuery/taskTrackerRecordQuery/searchList.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo=parseInt(params.pageNo);
        params.pageSize=parseInt(params.pageSize);
        let userId= req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/taskTrackerQuery/taskTrackerRecordQuery/searchList.ajax',
            req: req,
            url: apiUrlList.queryInfo,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode == 0) {
                let data = body.body;
                data.userId=userId;
                data.pages = Math.ceil(data.total / params.pageSize);//最大页码
                data.pageNum = params.pageNo;//当前页
                res.send({error: 0, msg: '查询成功', data: data});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //查询子块list
    app.post('/automatedOperation/taskTrackerQuery/taskTrackerRecordQuery/searchBlockList.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo=parseInt(params.pageNo);
        params.pageSize=parseInt(params.pageSize);
        let option = {
            pageUrl: '/automatedOperation/taskTrackerQuery/taskTrackerRecordQuery/searchBlockList.ajax',
            req: req,
            url: apiUrlList.queryInfoBlock,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode == 0) {
                let data = body.body;
                data.pages = Math.ceil(data.total / params.pageSize);//最大页码
                data.pageNum = params.pageNo;//当前页
                res.send({error: 0, msg: '查询成功', data: data});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};
function formatTime(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    function fixZero(n) {
        return n < 10 ? '0' + n : n;
    }

    return [year, month, day].map(fixZero).join('-') + ' ' + [hour, minute, second].map(fixZero).join(':');
}