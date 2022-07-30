const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').alipayConfig.miniConfig;
module.exports = function (app) {
    // 导入
    // app.post('/publicConfig/alipayConfig/miniConfig/inputData.ajax', (req, res, next) => {
    //     let option = {
    //         session: req.session,
    //         url: apiUrlList.inputData,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log('/publicConfig/alipayConfig/miniConfig/inputData.ajax option=', option);
    //     request.post(option, (error, response, body) => {
    //         console.log('/publicConfig/alipayConfig/miniConfig/inputData.ajax error:', error);
    //         console.log('/publicConfig/alipayConfig/miniConfig/inputData.ajax statusCode:', response && response.statusCode);
    //         console.log('/publicConfig/alipayConfig/miniConfig/inputData.ajax body:', body);
    //         if (error) {
    //             return res.send({ error: 1, msg: '调用失败' });
    //         }
    //         if (body && body.returnCode == 0) {
    //             res.send({error: 0, msg: '导入成功'});
    //         }
    //         else if (body && body.returnCode != 9999) {
    //             res.send({error: 1, msg: body.returnMsg});
    //         }
    //         else {
    //             res.send({error: 1, msg: '导入失败'});
    //         }
    //     });
    // });
};
