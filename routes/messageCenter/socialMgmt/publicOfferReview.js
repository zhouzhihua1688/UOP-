const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').socialMgmt.publicOfferReview;
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/messageCenter/socialMgmt/publicOfferReview/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.groupId && (params.groupId = req.body.groupId);
        req.body.groupName && (params.groupName = req.body.groupName);
        req.body.custNo && (params.custNo = req.body.custNo);
        req.body.status && (params.status = req.body.status);
        req.body.pageNo && (params.pageNo = req.body.pageNo);
        req.body.pageSize && (params.pageSize = req.body.pageSize);
        let option = {
            pageUrl: '/messageCenter/socialMgmt/publicOfferReview/getTableData.ajax',
            req: req,
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
            if (result.returnCode == 0 && Array.isArray(result.body.rows)) {
                let resultData = {};
                // resultData.pageNo = result.body.pageNo; //页数
                resultData.pageNum = result.body.pageNum; //页数
                resultData.totalSize = Math.ceil(result.body.total / req.body.pageSize);//总页数d;//总页数
                resultData.tableData = result.body.rows;
                return res.send({error: 0, msg: '查询成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            }
            else {
                return res.send({error: 1, msg: '查询失败'});
            }
        });

    });
    // 查看实盘
    app.post('/messageCenter/socialMgmt/publicOfferReview/checkParams.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/publicOfferReview/checkParams.ajax',
            req: req,
            url: apiUrlList.checkParams,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '获取成功', data: result});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            }
            else {
                return res.send({error: 1, msg: '获取失败'});
            }
        });
    });

    // 公开实盘
    app.post('/messageCenter/socialMgmt/publicOfferReview/publicStatus.ajax', (req, res, next) => {
        let params = {};
        params.audit = req.body.audit;
        params.groupId = req.body.groupId;
        params.refuseReason=req.body.refuseReason;
        params.auditor = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/messageCenter/socialMgmt/publicOfferReview/publicStatus.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.publicStatus,
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
            if (result && result.returnCode == 0) {
                return res.send({error: 0, msg: '操作成功'});
            }
            else if (result && result.returnCode != 9999) {
                return res.send({error: 1, msg: result.returnMsg});
            }
            else {
                return res.send({error: 1, msg: '操作失败'});
            }
        });
    });
};

