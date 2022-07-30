const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').mobileMgmt.systemRefresh;
module.exports = function (app) {
    // 刷新
    app.post('/publicConfig/mobileMgmt/systemRefresh/refresh.ajax', (req, res, next) => {
        let params = {};
        params.reddotName = req.body.reddotName;
        let option = {
            pageUrl: '/publicConfig/mobileMgmt/systemRefresh/refresh.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.refresh,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({error: 1, msg: '数据获取失败'});
            }
            if (body && body.returnCode == 0 && body.body && body.body[params.reddotName]) {
                res.send({error: 0, msg: '刷新成功', data: null});
            }
            else if (body && body.returnCode == 0 && body.body && !body.body[params.reddotName]) {
                res.send({error: 0, msg: '当前已是最新,无需刷新', data: null});
            }
            else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg, data: null});
            }
            else {
                res.send({error: 1, msg: '刷新失败', data: null});
            }
        });
    });
};
