const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').shortLink.linkConfig;
module.exports = function (app) {
    //查询
    app.post('/publicConfig/shortLink/linkConfig/search.ajax', (req, res, next) => {
        let params = {};
        if (req.body.appCode) {
            params.appCodeMatch = req.body.appCode;
        }
        if (req.body.shortLinkUri) {
            params.shortLinkUriMatch = req.body.shortLinkUri;
        }
        let option = {
            pageUrl: '/publicConfig/shortLink/linkConfig/search.ajax',
            req: req,
            url: apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({ error: 1, msg: '查询失败' });
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '查询成功', data: body.body.shortLinkMappings});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    // 添加
    app.post('/publicConfig/shortLink/linkConfig/add.ajax', (req, res, next) => {
        let params = {};
        params.appCode = req.body.appCode;
        params.appName = req.body.appName;
        params.longLinkUrl = req.body.longLinkUrl;
        params.longSchemaUrl  = req.body.longSchemaUrl ;
        params.creator = req.session['loginInfo'].username;
        let option = {
            pageUrl: '/publicConfig/shortLink/linkConfig/add.ajax',
            req: req,
            operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.add,
            body: params,
            timeout: 15000,
            json: true
        };
        request.post(option, (error, response, body) => {
            if (error) {
                return res.send({ error: 1, msg: '保存失败' });
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '保存成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '保存失败'});
            }
        });
    });
    //更新
    app.post('/publicConfig/shortLink/linkConfig/update.ajax', (req, res, next) => {
        let params = {};
        params.appCode = req.body.appCode;
        params.appName = req.body.appName;
        params.longLinkUrl = req.body.longLinkUrl;
        params.longSchemaUrl  = req.body.longSchemaUrl ;
        params.updater = req.session['loginInfo'].username;
        let option = {
            pageUrl: '/publicConfig/shortLink/linkConfig/update.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: `${apiUrlList.update}/${req.body.serialNo}`,
            body: params,
            timeout: 15000,
            json: true
        };
        request.put(option, (error, response, body) => {
            if (error) {
                return res.send({ error: 1, msg: '保存失败' });
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '保存成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '保存失败'});
            }
        });
    });
    //删除
    app.post('/publicConfig/shortLink/linkConfig/deleteData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/publicConfig/shortLink/linkConfig/deleteData.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: `${apiUrlList.del}/${req.body.serialNo}`,
            timeout: 15000,
            json: true
        };
        request.del(option, (error, response, body) => {
            if (error) {
                return res.send({ error: 1, msg: '删除失败' });
            }
            if (body.returnCode === 0) {
                res.send({error: 0, msg: '删除成功'});
            }
            else if (body && body.returnCode != 9999) {
                res.send({error: 1, msg: body.returnMsg});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
};
