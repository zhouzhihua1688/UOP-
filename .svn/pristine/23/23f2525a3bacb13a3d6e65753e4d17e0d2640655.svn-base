const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').awardSetting.phoneSetting;
module.exports = function (app) {
    //查询列表
    app.post('/awardMgmt/awardSetting/phoneSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.mobilePrefix && (params.mobilePrefix = req.body.mobilePrefix);
        req.body.operator && (params.operator = req.body.operator);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/phoneSetting/getTableData.ajax',
            req: req,
            url: apiUrlList.getTable,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.rows)) {
                console.log('result111111111', result)
                let resultData = {};
                resultData.page = result.body.pageNum;
                resultData.total = result.body.pages;
                resultData.tableData = result.body.rows;
                resultData.tableData.forEach(item => {
                    let showOperator = '';
                    let showHandleType = '';
                    if (item.operator == 1) {
                        showOperator = '移动';
                    }
                    if (item.operator == 2) {
                        showOperator = '联通';
                    }
                    if (item.operator == 3) {
                        showOperator = '电信';
                    }
                    if (item.handleType == 1) {
                        showHandleType = '红包';
                    }
                    if (item.handleType == 2) {
                        showHandleType = '礼券';
                    }
                    if (item.handleType == 3) {
                        showHandleType = '流量卡';
                    }
                    if (item.handleType == 4) {
                        showHandleType = '话费';
                    }
                    if (item.handleType == 5) {
                        showHandleType = '视频vip';
                    }
                    if (item.handleType == 6) {
                        showHandleType = '积分';
                    }
                    if (item.handleType == 7) {
                        showHandleType = '流量';
                    }
                    item.showOperator = showOperator;
                    item.showHandleType = showHandleType;
                });
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    //新增
    app.post('/awardMgmt/awardSetting/phoneSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.mobilePrefix = req.body.mobilePrefix;
        params.operator = req.body.operator;
        params.handleType = req.body.handleType;
        params.val = req.body.val;
        params.pid = req.body.pid;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/phoneSetting/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '添加成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '添加失败'
                });
            }
        });
    });
    //修改
    app.post('/awardMgmt/awardSetting/phoneSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.mobilePrefix = req.body.mobilePrefix;
        params.operator = req.body.operator;
        params.handleType = req.body.handleType;
        params.val = req.body.val;
        params.pid = req.body.pid;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/phoneSetting/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    //删除
    app.post('/awardMgmt/awardSetting/phoneSetting/delete.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/phoneSetting/delete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '删除成功'
                });
            } else if (result && result.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });



    // 查询操作类型
    app.post('/awardMgmt/awardSetting/phoneSetting/awardType.ajax', (req, res, next) => {
        // let params = req.body;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/phoneSetting/awardType.ajax',
            req: req,
            url: apiUrlList.awardType,
            // qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });

};