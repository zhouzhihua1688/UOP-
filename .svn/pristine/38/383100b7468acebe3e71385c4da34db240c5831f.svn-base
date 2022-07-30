const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').paramsMaintain.maintain;
module.exports = function (app) {
    // select选项
    app.post('/publicConfig/paramsMaintain/maintain/initSelect.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/paramsMaintain/maintain/initSelect.ajax',
            req: req,
            url: apiUrlList.initSelect,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                console.log(error)
                return res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                return res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            } else {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 表格数据
    app.post('/publicConfig/paramsMaintain/maintain/tableList.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/paramsMaintain/maintain/tableList.ajax',
            req: req,
            url: apiUrlList.tableList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '调用成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                return res.send({
                    error: 1,
                    msg: '获取数据失败'
                });
            } else {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 修改
    app.post('/publicConfig/paramsMaintain/maintain/modify.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/paramsMaintain/maintain/modify.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.modify,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                console.log(error)
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '修改成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            } else {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 删除
    app.post('/publicConfig/paramsMaintain/maintain/delete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/paramsMaintain/maintain/delete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delete,
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
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '删除成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            } else {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
    // 新增
    app.post('/publicConfig/paramsMaintain/maintain/add.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/publicConfig/paramsMaintain/maintain/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '新增成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            } else {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });
};
