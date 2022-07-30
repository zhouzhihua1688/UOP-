const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').auditMgmt.nicknameToReview;

module.exports = function (app) {
    //获取列表
    app.post('/messageCenter/auditMgmt/nicknameToReview/nicknameGetList.ajax', (req, res, next) => {
        let params = req.body;
        let userId= req.session.loginInfo.userid;
        let option = {
            // pageUrl: '/messageCenter/auditMgmt/nicknameToReview/nicknameGetList.ajax',
            req: req,
            url: apiUrlList.nicknameGetList,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log(`/messageCenter/auditMgmt/nicknameToReview/nicknameGetList.ajax option:`, option.req ? {...option, req: '#'} : option);
        request.post(option, (error, response, body) => {
            console.log(`/messageCenter/auditMgmt/nicknameToReview/nicknameGetList.ajax error:`, error);
            console.log(`/messageCenter/auditMgmt/nicknameToReview/nicknameGetList.ajax statusCode:`, response && response.statusCode);
            console.log(`/messageCenter/auditMgmt/nicknameToReview/nicknameGetList.ajax body: ******`);
            if (error) {
                return res.send({error: 1, msg: '操作失败'});
            }
            if (body && body.returnCode == 0) {
                let data = body.body;
                data.userId=userId;
                data.pages = Math.ceil(data.total / params.pageSize);//最大页码
                data.pageNum = params.pageNo;//当前页
                res.send({error: 0, msg: '查询成功', data: data});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    }
    );
    //审核通过
    app.post('/messageCenter/auditMgmt/nicknameToReview/passCheck.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/messageCenter/auditMgmt/nicknameToReview/passCheck.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.nicknameCheck,
                body: params,
                timeout: 15000,
                json: true
            };
            request.put(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    let data = body.body;
                    res.send({error: 0, msg: '查询成功', data: data});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '查询失败'});
                }
            });
        }
    );
    //审核未通过
    app.post('/messageCenter/auditMgmt/nicknameToReview/rejectCheck.ajax', (req, res, next) => {
            let params = req.body;
            let option = {
                pageUrl: '/messageCenter/auditMgmt/nicknameToReview/rejectCheck.ajax',
                req: req,
                operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                url: apiUrlList.nicknameCheck,
                body: params,
                timeout: 15000,
                json: true
            };
            request.put(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '操作失败'});
                }
                if (body && body.returnCode == 0) {
                    let data = body.body;
                    res.send({error: 0, msg: '查询成功', data: data});
                }
                else if (body && body.returnCode != 9999) {
                    res.send({error: 1, msg: body.returnMsg});
                }
                else {
                    res.send({error: 1, msg: '查询失败'});
                }
            });
        }
    );
};
