const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').integralSettingMgmt.integralType;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/integralSettingMgmt/integralType/getList.ajax', (req, res, next) => {
        let params = {};
        params.pointNo = req.body.pointNo;
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralType/getList.ajax',
            req: req,
            url: apiUrlList.query,
            qs: params,
            timeout: 15000,
            json: true
        };
        request.get(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0 && Array.isArray(body.body)) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body.map(item => {
                        item.pointType_show = item.pointType;
                        if (item.pointType == 0) {
                            item.pointType_show = '固定积分';
                        }
                        else if (item.pointType == 1) {
                            item.pointType_show = '外部传入';
                        }
                        switch (item.validType) {
                            case 2:
                                item.validType_show = '相对时间';
                                item.validDuration_show = item.validDuration == -1 ? '长期有效' : item.validDuration;
                                break;
                            case 1:
                                item.validType_show = '绝对时间';
                                item.validDuration_show = '-';
                                break;
                            default:
                                item.validType_show = item.validType;
                                item.validDuration_show = item.validDuration;
                        }
                        return item;
                    })
                });
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '查询失败', data: null});
            }
        });
    });
    // 新增
    app.post('/awardMgmt/integralSettingMgmt/integralType/add.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralType/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '添加成功', data: null});
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '添加失败', data: null});
            }
        });
    });
    // 修改
    app.post('/awardMgmt/integralSettingMgmt/integralType/update.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralType/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: req.body,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '修改成功', data: null});
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '修改失败', data: null});
            }
        });
    });
    // 删除
    app.post('/awardMgmt/integralSettingMgmt/integralType/del.ajax', (req, res, next) => {
        let params = {};
        params.id = req.body.id;
        let option = {
            pageUrl: '/awardMgmt/integralSettingMgmt/integralType/del.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.del,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '操作失败', data: null});
            }
            if (body.returnCode == 0) {
                res.send({error: 0, msg: '删除成功', data: null});
            }
            else if (body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '删除失败', data: null});
            }
        });
    });
};