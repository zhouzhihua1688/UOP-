const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').monitoring.fundInfo;
module.exports = function (app) {

    // 获取  平台
    app.post('/productIndexes/monitoring/fundInfo/labels.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/labels.ajax',
            session: req.session,
            qs: params,
            url: apiUrl.labels,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 平台下所有考核赛道
    app.post('/productIndexes/monitoring/fundInfo/getEvalInvestAreaList.ajax', (req, res, next) => {
        let params = {
            parentPlatform:req.body.parentPlatform,
            salePlatform:req.body.salePlatform
        };
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/getEvalInvestAreaList.ajax',
            session: req.session,
            qs: params,
            url: apiUrl.getEvalInvestAreaList,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

    // 获取当前平台的已有专区赛道
    app.post('/productIndexes/monitoring/fundInfo/getHasData.ajax', (req, res, next) => {
        let params = {
            parentPlatform:req.body.parentPlatform,
            salePlatform:req.body.salePlatform
        };
        let url = req.body.type==1? apiUrl.queryPosition:apiUrl.queryInvestArea;//1专区2赛道
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/getHasData.ajax',
            session: req.session,
            qs: params,
            url,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {

                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  基金列表真分页
    app.post('/productIndexes/monitoring/fundInfo/fundList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/fundList.ajax',
            url: apiUrl.fundList,
            qs: params,
            timeout: 15000,
            json: true
        };

        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '调用失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //   查询上架平台和渠道码
    app.post('/productIndexes/monitoring/fundInfo/channelAll.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/channelAll.ajax',
            url: apiUrl.channelAll,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '上架平台和渠道码查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '上架平台和渠道码查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '上架平台和渠道码查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    //   新增
    app.post('/productIndexes/monitoring/fundInfo/add.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/add.ajax',
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.add,
            body: params,
            timeout: 15000,
            json: true
        };

        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '新增失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  修改
    app.post('/productIndexes/monitoring/fundInfo/modify.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/modify.ajax',
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.modify,
            body: params,
            timeout: 15000,
            json: true
        };

        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 获取  弹窗内查询
    app.post('/productIndexes/monitoring/fundInfo/queryDetail.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/queryDetail.ajax',
            url: apiUrl.queryDetail,
            qs: params,
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
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 删除
    app.post('/productIndexes/monitoring/fundInfo/del.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            req,
            pageUrl: '/productIndexes/monitoring/fundInfo/del.ajax',
            url: apiUrl.del,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            qs: params,
            timeout: 15000,
            json: true
        };

        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0' && result.body) {
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

};