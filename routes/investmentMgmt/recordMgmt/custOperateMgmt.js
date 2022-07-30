const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').recordMgmt.custOperateMgmt;
module.exports = function (app) {
    // 查询列表
    app.post('/investmentMgmt/recordMgmt/custOperateMgmt/getTableData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/recordMgmt/custOperateMgmt/getTableData.ajax',
            req,
            qs: Object.assign(req.body, {
                pageNo: Number(req.body.pageNo),
                itemPerPage: Number(req.body.itemPerPage)
            }),
            url: apiUrl.tableData,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body && body.returnCode == 0 && Array.isArray(body.body.list)) {
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: {
                        pageNum: req.body.pageNo - 1,
                        pages: Math.ceil(body.body.totalItem / req.body.itemPerPage),
                        rows: body.body.list
                    }
                });
            } else if (body && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg});
            } else {
                return res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    // 查详情
    app.post('/investmentMgmt/recordMgmt/custOperateMgmt/detail.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/recordMgmt/custOperateMgmt/detail.ajax',
            req,
            qs: req.body,
            url: apiUrl.detail,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            if (body && body.returnCode == 0) {
                return res.send({error: 0, msg: '查询成功', data: body.body});
            } else if (body && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg});
            } else {
                return res.send({error: 1, msg: '查询失败'});
            }
        });
    });
};