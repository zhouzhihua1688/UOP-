const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').userMgmt.userList;
const baseUrl = '/advertising/userMgmt/userList';
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/advertising/userMgmt/userList/getTableData.ajax', (req, res, next) => {
        let params = {};
        params.userType = req.body.userType; //用户类型
        params.channel = req.body.channel; //一级渠道
        params.searchMaterial = req.body.searchMaterial; //访问内容
        params.searchName = req.body.searchName; //姓名
        params.page = req.body.page;
        params.size = req.body.size;
        params.startTime = req.body.startTime;
        params.endTime = req.body.endTime;
        let option = {
            pageUrl: '/advertising/userMgmt/userList/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //获取用户类型列表
    app.post('/advertising/userMgmt/userList/getUserParam.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/advertising/userMgmt/userList/getUserParam.ajax',
            req,
            url: apiUrlList.getUserParam,
            // body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询用户类型失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询用户类型成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询用户类型失败'
                });
            }
        });
    });

    //获取渠道
    app.post('/advertising/userMgmt/userList/getChannel.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/advertising/userMgmt/userList/getChannel.ajax',
            req,
            url: apiUrlList.getChannel,
            // body: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询渠道失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询渠道成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询渠道失败'
                });
            }
        });
    });

    //点击查邀请的数据
    app.post('/advertising/userMgmt/userList/getInvitationData.ajax', (req, res, next) => {
        let params = {};
        params.page = req.body.page;
        params.size = req.body.size;
        params.unionId = req.body.unionId;
        let option = {
            pageUrl: '/advertising/userMgmt/userList/getInvitationData.ajax',
            req,
            url: apiUrlList.getInvitationData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log("body==", body);
            console.log("result==", result);
            if (result && result.returnCode === 0) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
}