const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').recommendSystem.recommendSystemGroupMgmt.groupAudit;
module.exports = function (app) {
    //查询
    app.post('/recommendSystem/recommendSystemGroupMgmt/groupAudit/search.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        params.groupName = req.body.groupName;
        params.groupType = req.body.groupType;
        params.status = req.body.status;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupAudit/search.ajax',
            req: req,
            url: apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode === 0 && Array.isArray(body.body)) {
                body.body.forEach(item => {
                    item.groupName_desc = item.groupName&&item.groupName.length > 20 ? item.groupName + '...' : item.groupName;
                    item.groupDesc_desc = item.groupDesc&&item.groupDesc.length > 20 ? item.groupDesc + '...' : item.groupDesc;
                    item.filePath_desc = item.filePath&&item.filePath.length > 20 ? item.filePath + '...' : item.filePath;
                    item.groupType_desc =item.groupType&& item.groupType.length > 20 ? item.groupType + '...' : item.groupType;
                    item.groupType_desc = item.groupType;
                    if (item.groupType == 1) {
                        item.groupType_desc = '实时客群';
                    }
                    if (item.groupType == 2) {
                        item.groupType_desc = '非实时客群';
                    }
                    item.status_desc = item.status;
                    if (item.status == 0) {
                        item.status_desc = '未审核';
                    }
                    if (item.status == 1) {
                        item.status_desc = '审核通过';
                    }
                    if (item.status == 2) {
                        item.status_desc = '待审核';
                    }
                    item.createTime = formatTime(item.createTime);
                    item.updateTime = formatTime(item.updateTime);
                });
                res.send({error: 0, msg: '查询成功', data: body.body});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //审核
    app.post('/recommendSystem/recommendSystemGroupMgmt/groupAudit/audit.ajax', (req, res, next) => {
        let params = {};
        params.groupId = req.body.groupId;
        params.groupName = req.body.groupName;
        params.groupType = req.body.groupType;
        req.body.groupUserValidateDay && (params.groupUserValidateDay = Number(req.body.groupUserValidateDay));
        params.groupDesc = req.body.groupDesc;
        params.filePath = req.body.filePath;
        params.status = req.body.status;
        params.modifyBy = req.session.loginInfo.userid;
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupAudit/audit.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            timeout: 30000,
            body: params,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '更改成功', data: null});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '更改失败', data: null});
            }
        });
    });
    //发布
    app.post('/recommendSystem/recommendSystemGroupMgmt/groupAudit/release.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/recommendSystem/recommendSystemGroupMgmt/groupAudit/release.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.release,
            timeout: 30000,
            qs: req.body,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode === 0) {
                res.send({error: 0, msg: '发布成功', data: null});
            }
            else if (result && result.returnCode != 9999) {
                res.send({error: 1, msg: result.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '发布失败', data: null});
            }
        });
    });

};
function formatTime(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    function fixZero(n) {
        return n < 10 ? '0' + n : n;
    }

    return [year, month, day].map(fixZero).join('-') + ' ' + [hour, minute, second].map(fixZero).join(':');
}