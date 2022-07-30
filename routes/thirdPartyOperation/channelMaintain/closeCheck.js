const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').channelMaintain;
module.exports = function (app) {

    //查询 
    app.get('/thirdPartyOperation/channelMaintain/closeCheck/search.ajax', (req, res, next) => {

        let params = {};
        params.workDate = req.query.workDate;
        let option = {
            session:req.session,
            url: apiUrlList.closeCheck.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/closeCheck/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/search.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/search.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data:result.data
                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });
    //收市检查
    app.get('/thirdPartyOperation/channelMaintain/closeCheck/tradeCloseCheck.ajax', (req, res, next) => {

        let params = {};
        params.workDate = req.query.workDate;
        console.log(params);
        let option = {
            session:req.session,
            url: apiUrlList.closeCheck.tradeCloseCheck,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeCloseCheck.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeCloseCheck.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeCloseCheck.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeCloseCheck.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data:result.data
                });
            }
            else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage
                });
            }
        });
    });

    //收市
    app.post('/thirdPartyOperation/channelMaintain/closeCheck/tradeClose.ajax', (req, res, next) => {
        console.log("req.body", req.body);
        let params = req.body;
        let closeDto = params.closeDto;
        closeDto.operater = req.session.loginInfo.userid;
        params.closeDto = JSON.stringify(closeDto);
        console.log("收市：",params);
        let option = {
            session: req.session,
            url: apiUrlList.closeCheck.tradeClose,
            qs: params,
            body: JSON.parse(req.body.closeDto),
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeClose.ajax option:', option);
        request.put(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeClose.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeClose.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeClose.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data:result.data

                });

            }
            else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage

                });
            }
        });
    });
    //交易确认
    app.post('/thirdPartyOperation/channelMaintain/closeCheck/tradeCheck.ajax', (req, res, next) => {
        console.log("req.body", req.body);
        let params = req.body;
        let tradeUpdateDto = params.tradeUpdateDto;
        tradeUpdateDto.operater = req.session.loginInfo.userid;
        console.log("closeDto",tradeUpdateDto);
        params.tradeUpdateDto = JSON.stringify(tradeUpdateDto);
        console.log("文件确认：",params);
        let option = {
            session: req.session,
            url: apiUrlList.closeCheck.tradeCheck,
            qs: params,
            body: JSON.parse(req.body.tradeUpdateDto),
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeCheck.ajax option:', option);
        request.put(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeCheck.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeCheck.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/tradeCheck.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data:result.data

                });

            }
            else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage

                });
            }
        });
    });
    //文件确认
    app.post('/thirdPartyOperation/channelMaintain/closeCheck/fileCheck.ajax', (req, res, next) => {
        console.log("req.body", req.body);
        let params = req.body;
        let fileUpdateDto = params.fileUpdateDto;
        fileUpdateDto.operater = req.session.loginInfo.userid;
        console.log("closeDto1",fileUpdateDto);

        params.fileUpdateDto = JSON.stringify(fileUpdateDto);
        console.log("文件确认：",params);
        let option = {
            session: req.session,
            url: apiUrlList.closeCheck.fileCheck,
            qs: params,
            body: JSON.parse(req.body.fileUpdateDto),
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/channelMaintain/closeCheck/fileCheck.ajax option:', option);
        request.put(option, (error, response, body) => {
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/fileCheck.ajax error:', error);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/fileCheck.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/channelMaintain/closeCheck/fileCheck.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.responseCode === '0000') {
                res.send({
                    error: 0,
                    msg: '数据获取成功',
                    data:result.data

                });

            }
            else if (result && result.responseCode != '9999') {
                res.send({ error: 1, msg: result.responseMessage });
            }
            else {
                res.send({
                    error: 1,
                    msg: result.responseMessage

                });
            }
        });
    });



};