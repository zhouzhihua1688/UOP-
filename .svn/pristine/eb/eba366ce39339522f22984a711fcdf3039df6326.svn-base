const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').appSearchConfig.searchHotWordsConfig;
module.exports = function (app) {
    // 获取热词列表
    app.post('/publicConfig/appSearchConfig/searchHotWordsConfig/queryList.ajax', (req, res, next) => {
        let params = {};
        params.pmst = 'SYSTEM';
        params.pmkey = 'HOTWORDGROUP';
        let option = {
            pageUrl: '/publicConfig/appSearchConfig/searchHotWordsConfig/queryList.ajax',
            req: req,
            url: apiUrlList.queryList,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
            if (body.returnCode === 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg,
                    data: null
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败',
                    data: null
                });
            }
        });
    });
    //查询
    app.post('/publicConfig/appSearchConfig/searchHotWordsConfig/query.ajax', (req, res, next) => {
    	let params = {};
    	req.body.hotwordGroup && (params.hotwordGroup = req.body.hotwordGroup);
    	let option = {
            pageUrl: '/publicConfig/appSearchConfig/searchHotWordsConfig/query.ajax',
            req: req,
    		url: apiUrlList.query,
    		qs: params,
    		timeout: 15000,
    		json: true
    	};
    	request(option, (error, response, body) => {
    		if (error) {
    			return res.send({
    				error: 1,
    				msg: '查询失败'
    			});
    		}
    		if (body.returnCode === 0) {
                body.body.hotWordConfigs.forEach(item => {
                	item.hotwordgroup = body.body.hotwordGroup;
				});
    			res.send({
    				error: 0,
    				msg: '查询成功',
    				data: body.body
    			});
    		} else if (body && body.returnCode != 9999) {
    			res.send({
    				error: 1,
    				msg: body.returnMsg,
    				data: null
    			});
    		} else {
    			res.send({
    				error: 1,
    				msg: '查询失败',
    				data: null
    			});
    		}
    	});
    });
    // 添加以及修改
    app.post('/publicConfig/appSearchConfig/searchHotWordsConfig/add.ajax', (req, res, next) => {
    	let option = {
            pageUrl: '/publicConfig/appSearchConfig/searchHotWordsConfig/add.ajax',
            req: req,
            operateType: 2, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
    		url: apiUrlList.add,
    		body: req.body,
    		timeout: 15000,
    		json: true
    	};
    	request.post(option, (error, response, body) => {
    		if (error) {
    			return res.send({
    				error: 1,
    				msg: '保存失败',
    				data: null
    			});
    		}
    		if (body.returnCode === 0) {
    			res.send({
    				error: 0,
    				msg: '保存成功',
    				data: null
    			});
    		} else if (body && body.returnCode != 9999) {
    			res.send({
    				error: 1,
    				msg: body.returnMsg,
    				data: null
    			});
    		} else {
    			res.send({
    				error: 1,
    				msg: '保存失败',
    				data: null
    			});
    		}
    	});
    });
};
