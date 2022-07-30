const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').businessParamConfig.nonsupport;

module.exports = function (app) {
    // 查询基金列表数据
    app.post('/businessMgmt/businessParamConfig/nonsupport/tableData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/nonsupport/tableData.ajax',
            req,
            url: apiUrl.tableData,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取列表数据失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0) {
                if (body.body && Array.isArray(body.body) && body.body[0]) {
                    let id = body.body[0].id;
                    let data = body.body[0].privilegeFundId.split(',').map(item => {
                        return {
                            fundId: item,
                            id
                        }
                    })
                    res.send({
                        error: 0,
                        msg: '调用成功',
                        data
                    });
                } else {
                    res.send({
                        error: 0,
                        msg: '调用成功',
                        data: []
                    });
                }

            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取列表数据失败',
                    data: null
                });
            }
        });
    });


    // 获取基金id数据
    app.post('/businessMgmt/businessParamConfig/nonsupport/fundIdList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/nonsupport/fundIdList.ajax',
            req,
            url: apiUrl.fundIdList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取基金ID列表数据失败',
                    data: null
                });
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body)) {
                res.send({
                    error: 0,
                    msg: '调用成功',
                    data: body.body
                });
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取基金ID列表数据失败',
                    data: null
                });
            }
        });
    });


    // 新增
    app.post('/businessMgmt/businessParamConfig/nonsupport/add.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/nonsupport/add.ajax',
            req: req,
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
                    msg: '新增失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
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


    // 修改
    app.post('/businessMgmt/businessParamConfig/nonsupport/modifyData.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/businessMgmt/businessParamConfig/nonsupport/modifyData.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrl.modifyData,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败',
                    data: null
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
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

};