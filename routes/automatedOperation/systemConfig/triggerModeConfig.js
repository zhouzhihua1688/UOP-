const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').automatedOperation.systemConfig.triggerModeConfig;
module.exports = function (app) {
    //查询
    app.post('/automatedOperation/systemConfig/triggerModeConfig/queryInfo.ajax', (req, res, next) => {
        let params = req.body;
        params.pageNo=parseInt(params.pageNo);
        params.pageSize=parseInt(params.pageSize);
        let userId= req.session.loginInfo.userid;
        let option = {
            pageUrl: '/automatedOperation/systemConfig/triggerModeConfig/queryInfo.ajax',
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
    // 新增
    app.post('/automatedOperation/systemConfig/triggerModeConfig/add.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/automatedOperation/systemConfig/triggerModeConfig/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '新增失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '新增成功', data: '新增成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '新增失败'});
            }
        });
    });
     // 修改
     app.post('/automatedOperation/systemConfig/triggerModeConfig/update.ajax', (req, res, next) => {
        // 
        let option = {
            pageUrl: '/automatedOperation/systemConfig/triggerModeConfig/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '修改失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '修改成功', data: '修改成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
     // 删除
     app.post('/automatedOperation/systemConfig/triggerModeConfig/delete.ajax', (req, res, next) => {
        // 
        let option = {
            pageUrl: '/automatedOperation/systemConfig/triggerModeConfig/delete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delete,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: '删除成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
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