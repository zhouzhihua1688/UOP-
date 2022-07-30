const request = require('../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').investmentInformationDisclosure.matterAnnounce;
const investTableName = 'uop_log_invest';
module.exports = function (app) {
    // 查询组合列表
    app.post('/investmentMgmt/investmentInformationDisclosure/matterAnnounce/getGroupList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/getGroupList.ajax',
            req,
            url: apiUrl.getGroupList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询组合列表失败'});
            }
            if (body.returnCode == 0 && Array.isArray(body.body)) {
                return res.send({error: 0, msg: '查询组合列表成功', data: body.body});
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '查询组合列表失败', data: null});
            }
        });
    });
    // 查询列表
    app.post('/investmentMgmt/investmentInformationDisclosure/matterAnnounce/getTableList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/getTableList.ajax',
            req,
            qs: req.body,
            url: apiUrl.getTableList,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '查询列表失败'});
            }
            if (body.returnCode == 0 && Array.isArray(body.body.announcementVOList)) {
                return res.send({error: 0, msg: '查询列表成功', data: body.body});
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '查询列表失败', data: null});
            }
        });
    });
    // 删除
    app.post('/investmentMgmt/investmentInformationDisclosure/matterAnnounce/del.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/del.ajax',
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            req,
            qs: {
                serialno: req.body.serialno
            },
            url: apiUrl.del,
            timeout: 15000,
            json: true,
            investBody:{title: req.body.title},
            mappingKeyWords:'matterAnnounce'
        };
        request.post(option, (error, response, body) => {
            sysLogger(option.operateType, req, option, body, investTableName);
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '删除成功', data: body.body});
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '删除失败', data: null});
            }
        });
    });
    // 新增&修改
    app.post('/investmentMgmt/investmentInformationDisclosure/matterAnnounce/operate.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentInformationDisclosure/matterAnnounce/operate.ajax',
            req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            body: req.body,
            url: apiUrl.operate,
            timeout: 15000,
            json: true,
            investBody:req.body,
            mappingKeyWords:'matterAnnounce'
        };
        request.post(option, (error, response, body) => {
            sysLogger(option.operateType, req, option, body, investTableName);
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body.returnCode == 0) {
                return res.send({error: 0, msg: '操作成功', data: body.body});
            } else if (body.returnCode != 0 && body.returnCode != 9999) {
                return res.send({error: 1, msg: body.returnMsg, data: null});
            } else {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
        });
    });
};