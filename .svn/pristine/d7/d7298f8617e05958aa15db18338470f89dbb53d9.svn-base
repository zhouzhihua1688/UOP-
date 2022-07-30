const request = require('../../../local_data/requestWrapper');
let apiUrlList = require('../apiConfig').expenseMgmt;
const qs = require("qs");
module.exports = function (app) {

    //  导出汇总 / 全量
    app.get('/thirdPartyOperation/expenseMgmt/export/exportAll.ajax', (req, res, next) => {
        var params = {};
        params.ymonth = req.query.ymonth;
        params.type = req.query.type;
        params.faretype = req.query.faretype;
        params.groupnm = req.query.groupnm;
        let option = {
            session: req.session,
            url: apiUrlList.export.exportAll,
            qs: params,
            // qs:req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/procedureSum/exportAll.ajax option:', option);
        request(option).pipe(res);
    });

    app.get('/thirdPartyOperation/expenseMgmt/export/expByBranch.ajax', (req, res, next) => {
        var params = {};
        params.ymonth = req.query.ymonth;
        params.type = req.query.type;
        params.faretype = req.query.faretype;
        ;
        params.branchs = req.query.branchs;
        console.log(params);
        let option = {
            session: req.session,
            url: apiUrlList.export.expByBranch,
            qs: params,
            // qs:req.body,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/expByBranch.ajax option:', option);
        request(option).pipe(res);
    });
    //查询
    app.get('/thirdPartyOperation/expenseMgmt/export/search.ajax', (req, res, next) => {
        let params = req.query;
        params.ymonth = req.query.ymonth;
        params.faretype = req.query.faretype;
        let option = {
            session: req.session,
            url: apiUrlList.export.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/search.ajaxoption:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/export/search.ajaxerror:', error);
            console.log('/thirdPartyOperation/expenseMgmt/export/search.ajaxstatusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/export/search.ajaxbody:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });

    //删除
    app.get('/thirdPartyOperation/expenseMgmt/export/deleteGroup.ajax', (req, res, next) => {
        let params = req.query;
        console.log("del req>>", req.query);
        params.groupnm = req.query.groupnm;
        let option = {
            session: req.session,
            url: apiUrlList.export.deleteGroup,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/deleteGroup.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/export/deleteGroup.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/export/deleteGroup.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/export/deleteGroup.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });

    //新增查询渠道集合
    app.get('/thirdPartyOperation/expenseMgmt/export/queryBranchs.ajax?', (req, res, next) => {
        let params = req.query;
        params.faretype = req.query.faretype;
        let option = {
            session: req.session,
            url: apiUrlList.export.queryBranchs,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/queryBranchs.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/export/queryBranchs.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/export/queryBranchs.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/export/queryBranchs.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });

    //导出前检查费用计算是否完成
    app.get('/thirdPartyOperation/expenseMgmt/export/exportCheck.ajax?', (req, res, next) => {
        let params = req.query;
        let option = {
            session: req.session,
            url: apiUrlList.export.exportCheck,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/exportCheck.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/export/exportCheck.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/export/exportCheck.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/export/exportCheck.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });

    //查询渠道明细
    app.get('/thirdPartyOperation/expenseMgmt/export/qryGroupDetail.ajax?', (req, res, next) => {
        let params = req.query;
        params.groupnm = req.query.groupnm;
        let option = {
            session: req.session,
            url: apiUrlList.export.qryGroupDetail,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/qryGroupDetail.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/export/qryGroupDetail.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/export/qryGroupDetail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/export/qryGroupDetail.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //新增分组查询直、代销渠道
    app.get('/thirdPartyOperation/expenseMgmt/export/qryAllBranch.ajax?', (req, res, next) => {
        let params = req.query;
        params.faretype = req.query.faretype;
        let option = {
            session: req.session,
            url: apiUrlList.export.qryAllBranch,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/qryAllBranch.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/export/qryAllBranch.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/export/qryAllBranch.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/export/qryAllBranch.ajax body:', body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data
                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });

    //保存分组
    app.post('/thirdPartyOperation/expenseMgmt/export/saveGroup.ajax', (req, res, next) => {
        console.log("req.body", req.body);
        let params = qs.parse(req.body);
        params.groupnm = req.body.groupnm;
        params.faretype = req.body.faretype;
        params.branchDetails = req.body.branchDetails;
        console.log(params);
        let option = {
            session: req.session,
            url: apiUrlList.export.saveGroup,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/saveGroup.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/export/saveGroup.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/export/saveGroup.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/export/saveGroup.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data

                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage

                });
            }
        });
    });
    //更新分组
    app.post('/thirdPartyOperation/expenseMgmt/export/updateGroup.ajax', (req, res, next) => {
        console.log("req.body", req.body);
        let params = qs.parse(req.body);
        params.groupnm = req.body.groupnm;
        params.faretype = req.body.faretype;
        params.branchDetails = req.body.branchDetails;
        console.log(params);
        let option = {
            session: req.session,
            url: apiUrlList.export.updateGroup,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/export/updateGroup.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/export/updateGroup.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/export/updateGroup.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/export/updateGroup.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data: result.data

                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage

                });
            }
        });
    });
};