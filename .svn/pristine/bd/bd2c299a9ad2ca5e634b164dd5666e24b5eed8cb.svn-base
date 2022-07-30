const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').fundTag.filterMgmtDetails;

module.exports = function (app) {
    // 获取标签或滑轴默认值// ?optionCode=12'
    app.post('/businessMgmt/fundTag/filterMgmt/getDefaults.ajax', (req, res, next) => {
        let params = {};
        params = req.body
        let option = {
            pageUrl: '/businessMgmt/fundTag/filterMgmt/getDefaults.ajax',
            req,
            url: apiUrlList.getDefaults,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('获取标签或滑轴默认值',option.url)
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
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
    // PUT 修改条件选项upOption
    app.post('/businessMgmt/fundTag/filterMgmt/upOption.ajax', (req, res, next) => {
        let params = {};
        req.body && (params = req.body);

        let option = {
            pageUrl: '/businessMgmt/fundTag/filterMgmt/upOption.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            type: 'PUT',
            url: apiUrlList.upOption,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('putputput',option.body)
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '修改成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '修改失败'
                });
            }
        });
    });
    // POST /v1/manger/uop/option  新增条件选项
    app.post('/businessMgmt/fundTag/filterMgmt/addOption.ajax', (req, res, next) => {
        let params = {};
        req.body && (params = req.body);
        let option = {
            pageUrl: '/businessMgmt/fundTag/filterMgmt/addOption.ajax',
            req,
            url: apiUrlList.addOption,
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
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '新增成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '新增失败'
                });
            }
        });
    });
    // GET 获取条件选项列表
    app.post('/businessMgmt/fundTag/filterMgmt/getOption.ajax', (req, res, next) => {
        let params = {};
        req.body && (params = req.body);
        let option = {
            pageUrl: '/businessMgmt/fundTag/filterMgmt/getOption.ajax',
            req,
            url: apiUrlList.getOption+'?labelCode='+params.labelCode,
            // body: params,
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
    // 删除条件选项/ess/v1/manger/uop/option?optionCode=11
    app.post('/businessMgmt/fundTag/filterMgmt/deleteOption.ajax', (req, res, next) => {
        let params = {};
        req.body && (params = req.body);
        let option = {
            pageUrl: '/businessMgmt/fundTag/filterMgmt/deleteOption.ajax',
            req,
            url: apiUrlList.deleteOption+'?optionCode='+params.optionCode,
            // body: params,
            timeout: 15000,
            json: true
        };
        console.log('deleteOption',option.url)
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '删除成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
};