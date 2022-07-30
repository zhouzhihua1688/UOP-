const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').awardSetting.typeSetting;
module.exports = function (app) {
    //查询列表
    app.post('/awardMgmt/awardSetting/typeSetting/getTableData.ajax', (req, res, next) => {
        let params = {};
        req.body.id && (params.id = req.body.id);
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/typeSetting/getTableData.ajax',
            req: req,
            url: apiUrlList.getTable,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0 && Array.isArray(result.body.rows)) {
                let resultData = {};
                resultData.page = result.body.pageNum;
                resultData.total = result.body.pages;
                resultData.tableData = result.body.rows;
                res.send({error: 0, msg: '查询成功', data: resultData});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //新增
    app.post('/awardMgmt/awardSetting/typeSetting/add.ajax', (req, res, next) => {
        let params = {};
        params.typeNm = req.body.typeNm;
        params.typeDesc = req.body.typeDesc;
        params.remark = req.body.remark;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/typeSetting/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '添加成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '添加失败'});
            }
        });
    });
    //修改
    app.post('/awardMgmt/awardSetting/typeSetting/update.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        params.typeNm = req.body.typeNm;
        params.typeDesc = req.body.typeDesc;
        params.remark = req.body.remark;
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/typeSetting/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                res.send({error: 0, msg: '修改成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '修改失败'});
            }
        });
    });
    //删除
    app.post('/awardMgmt/awardSetting/typeSetting/delete.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        let option = {
            pageUrl: '/awardMgmt/awardSetting/typeSetting/delete.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            let result = typeof body == 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
};
