const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').daoLeWechatRedPackeMgmt.redPacketType;
module.exports = function (app) {
    // 查询
    app.post('/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/query.ajax', (req, res, next) => {
        let params = {};
        params.pageNo = req.body.pageNo;
        params.pageSize = req.body.pageSize;
        let userId= req.session.loginInfo.userid;
        let option = {
            pageUrl: '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/query.ajax',
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
            if (body.returnCode == 0 && Array.isArray(body.body.rows)) {
                let resultArr = body.body.rows.map(item => {
                    let obj = {};
                    obj.envelopNo = item.envelopNo;
                    obj.envelopName = item.envelopName;
                    obj.envelopDesc = item.envelopDesc;
                    obj.envelopType = item.envelopType;
                    switch (item.envelopType) {
                        case '00':
                            obj.envelopType_show = '固定金额';
                            obj.value_show = item.envelopValue;
                            break;
                        case '01':
                            obj.envelopType_show = '随机金额';
                            obj.value_show = item.minValue + '-' + item.maxValue;
                            break;
                        case '02':
                            obj.envelopType_show = '外部传入';
                            obj.value_show = '-';
                            break;
                        default:
                            obj.envelopType_show = item.grantMode;
                    }
                    obj.envelopValue = item.envelopValue;
                    obj.maxValue = item.maxValue;
                    obj.minValue = item.minValue;
                    obj.modifyBy = item.modifyBy;
                    obj.updateTime = item.updateTime;
                    return obj;
                });
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: {
                        total: body.body.total,
                        pages: body.body.pages,
                        body: resultArr,
                        userId:userId
                    }
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
    app.post('/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/add.ajax', (req, res, next) => {
        let params = {};
        params.envelopName = req.body.envelopName;
        params.envelopDesc = req.body.envelopDesc;
        params.envelopType = req.body.envelopType;
        // if(params.envelopType === '02' && req.body.envelopNo){
        //     params.envelopNo = req.body.envelopNo;
        // }
        params.envelopValue = Number(req.body.envelopValue);
        params.minValue = Number(req.body.minValue);
        params.maxValue = Number(req.body.maxValue);
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
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
    app.post('/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/update.ajax', (req, res, next) => {
        let params = {};
        params.envelopNo = req.body.envelopNo;
        params.envelopName = req.body.envelopName;
        params.envelopDesc = req.body.envelopDesc;
        params.envelopType = req.body.envelopType;
        params.envelopValue = Number(req.body.envelopValue);
        params.minValue = Number(req.body.minValue);
        params.maxValue = Number(req.body.maxValue);
        params.modifyBy = req.session.loginInfo.username;
        let option = {
            pageUrl: '/awardMgmt/daoLeWechatRedPackeMgmt/redPacketType/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.update,
            body: params,
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
};