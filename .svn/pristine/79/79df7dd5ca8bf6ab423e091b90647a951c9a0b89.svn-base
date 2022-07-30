const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').livingPay;
module.exports = function (app) {
    //公告列表
    app.post('/cashMgmt/livingPay/companyNotice/list.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrlList.noticeList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyNotice/list.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyNotice/list.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyNotice/list.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyNotice/list.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '获取公告列表失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                res.send({
                    error: 0,
                    msg: '获取停运机构成功',
                    data: data
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取停运机构失败'
                });
            }
        });
    });
    //公告新增选择
    app.post('/cashMgmt/livingPay/companyNotice/selectlist.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrlList.companyPauseScheduleList,
            qs: params,
            timeout: 15000,
            json: true
        };

        console.log('/cashMgmt/livingPay/companyNotice/selectlist.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyNotice/selectlist.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyNotice/selectlist.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyNotice/selectlist.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '获取公告列表失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                res.send({
                    error: 0,
                    msg: '获取停运机构成功',
                    data: data
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取停运机构失败'
                });
            }
        });
    });

    //公告删除
    app.post('/cashMgmt/livingPay/companyNotice/delete.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            session: req.session,
            url: apiUrlList.noticeDelete,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyNoticee/delete.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyNoticee/delete.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyNoticee/delete.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyNoticee/delete.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                res.send({
                    error: 0,
                    msg: '删除成功',
                    data: data
                });
            } else {
                res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
    //公告添加和修改
    app.post('/cashMgmt/livingPay/companyNotice/compile.ajax', (req, res, next) => {
        let params = req.body;
        console.log(11111111111)
        console.log(params)
        try {
            params.companyPauseIds = JSON.parse(params.companyPauseIds)
        } catch (error) {
            return res.send({
                error: -1,
                msg: '请求参数出错'
            });
        }
        let option = {
            session: req.session,
            url: apiUrlList.noticeAdd,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyNoticee/compile.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyNoticee/compile.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyNoticee/compile.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyNoticee/compile.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: data
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    //公告单个数据查询
    app.post('/cashMgmt/livingPay/companyNotice/queryOne.ajax', (req, res, next) => {
        let params = req.body;
        console.log(params)
        let option = {
            session: req.session,
            url: apiUrlList.noticeQueryOne,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyNoticee/queryOne.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyNoticee/queryOne.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyNoticee/queryOne.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyNoticee/queryOne.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: data
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
};