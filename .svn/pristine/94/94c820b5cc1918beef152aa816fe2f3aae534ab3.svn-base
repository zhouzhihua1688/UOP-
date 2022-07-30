const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').alipayConfig.miniConfig;
module.exports = function (app) {
    // 导入
    app.post('/publicConfig/alipayConfig/miniConfig/inputData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/alipayConfig/miniConfig/inputData.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.inputData,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({ error: 1, msg: '调用失败' });
            }
            if (body && body.returnCode == 0) {
                res.send({error: 0, msg: '导入成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '导入失败'});
            }
        });
    });
};
