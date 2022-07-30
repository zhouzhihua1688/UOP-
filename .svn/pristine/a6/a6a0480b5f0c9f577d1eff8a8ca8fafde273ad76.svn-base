const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').badgeManagement.badgeGroupManagement;

module.exports = function (app) {
    // 根据名称和状态获取初始数据和查询
    app.post('/clientMgmt/badgeManagement/badgeGroupManagement/getTableData.ajax', (req, res, next) => {
       
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeGroupManagement/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            qs: req.body,
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
            console.log(result, '---result----');
            if (result && result.returnCode == '0') {
                let resultData = {};
                resultData.tableData = result.body
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: resultData
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

    //新增数据
    app.post('/clientMgmt/badgeManagement/badgeGroupManagement/addBadgeGroup.ajax', (req, res, next) => {
        let params = {};
        params.badgeGrpDes = req.body.badgeGrpDes; //描述
        params.badgeGrpNm = req.body.badgeGrpNm; //名称
        params.iconImageDark = req.body.iconImageDark; //
        params.iconImageLight = req.body.iconImageLight; //
        params.lightCondition = req.body.lightCondition; //
        params.badgeGrpSt = req.body.badgeGrpSt; //
        params.terminal = req.body.terminal; //
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeGroupManagement/addBadgeGroup.ajax',
            req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.addBadgeGroup,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '保存成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '保存失败'
                });
            }
        });
    });

    //修改数据
    app.post('/clientMgmt/badgeManagement/badgeGroupManagement/updateBadgeGrp.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeGroupManagement/updateBadgeGrp.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.updateBadgeGrp  + req.body.badgeGrpId ,
            body:  req.body,
            timeout: 15000,
            json: true
        };
        console.log( ' req.body req.body',req.body)
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
    //删除徽章组明细
    app.post('/clientMgmt/badgeManagement/badgeGroupManagement/delBadge.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeGroupManagement/delBadge.ajax',
            req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.delBadge[0] + req.body.badgeGrpId + apiUrlList.delBadge[1]+req.body.badgeId,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                // let resultData = {};
                // resultData.tableData = result.body
                return res.send({
                    // data: resultData,
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
    // 修改排序 putBadgeSeqNo
    app.post('/clientMgmt/badgeManagement/badgeGroupManagement/putBadgeSeqNo.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/clientMgmt/badgeManagement/badgeGroupManagement/putBadgeSeqNo.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.putBadgeSeqNo[0] + req.body.badgeGrpId + apiUrlList.putBadgeSeqNo[1]+req.body.badgeId,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                // let resultData = {};
                // resultData.tableData = result.body
                return res.send({
                    // data: resultData,
                    error: 0,
                    msg: '操作成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
};