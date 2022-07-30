const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').livingPay;
module.exports = function (app) {
    //停运列表
    app.post('/cashMgmt/livingPay/companyPause/companyPauseScheduleList.ajax', (req, res, next) => {
        let para = req.body;
        let params = {};
        for (o in para) {
            params[o] = para[o];
        }
        console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleList.ajax params:', params);
        let option = {
            session: req.session,
            url: apiUrlList.companyPauseScheduleList,
            timeout: 15000,
            json: true,
            formData: params
        };
        console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleList.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleList.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleList.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleList.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '获取停运机构失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                console.log(data.formList);
                if (data && Array.isArray(data.formList)) {
                    data.formList.forEach((item) => {
                        item.check = false;
                    });
                    // data.formList.startTime=data.formList.startTime.s
                }
                res.send({
                    error: 0,
                    msg: '获取停运机构成功',
                    data: data
                });
            } else if (result && result.returnCode == 4001) {
                res.send({
                    error: 1,
                    msg: '停运机构时间段重复，请重新设置'
                });
            } else {
                res.send({
                    error: 1,
                    msg: '获取停运机构失败'
                });
            }
        });
    });
    //select选择机构
    app.post('/cashMgmt/livingPay/companyPause/allCompany.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.allCompany,
            timeout: 15000,
            json: true,
        };
        console.log('/cashMgmt/livingPay/companyPause/allCompany.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyPause/allCompany.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyPause/allCompany.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyPause/allCompany.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '获取机构失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;

            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '获取机构成功',
                    data: result.body
                });
                console.log(result.body.formList);
            } else {
                res.send({
                    error: 1,
                    msg: '获取机构失败'
                });
            }
        });
    });
    //新增和修改公用
    app.post('/cashMgmt/livingPay/companyPause/scheduleAdd.ajax', (req, res, next) => {
        let params = req.body;
        // let params={};
        // for(var o in para){
        //     console.log(o + ":" + para[o]);
        //     params[o]=para[o];
        // }

        if (params['startTime'] > params['endTime']) {
            return res.send({
                error: 1,
                msg: '开始时间不能晚于结束时间'
            });
        }

        let option = {
            session: req.session,
            url: apiUrlList.scheduleAdd,
            timeout: 15000,
            json: true,
            body: params
        };
        console.log('/cashMgmt/livingPay/companyPause/scheduleAdd.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyPause/scheduleAdd.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyPause/scheduleAdd.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyPause/scheduleAdd.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '操作机构公告失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '操作机构公告成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作机构公告失败'
                });
            }
        });
    });
    // //修改
    // app.post('/cashMgmt/livingPay/companyPause/companyPauseScheduleDetail.ajax', (req, res, next) => {
    //     var params=req.query.id;
    //     console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleDetail.ajax params:'+params);
    //     let option = {
    //         session: req.session,
    //         url: apiUrlList.scheduleAdd+"?id="+params,
    //         timeout: 15000,
    //         json: true
    //     };
    //     console.log(11111111111)
    //     console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleDetail.ajax option:', option);
    //     request(option, (error, response, body) => {
    //         console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleDetail.ajax error:', error);
    //         console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleDetail.ajax statusCode:', response && response.statusCode);
    //         console.log('/cashMgmt/livingPay/companyPause/companyPauseScheduleDetail.ajax body:', body);
    //         if (error) {
    //             return res.send({ error: -1, msg: '获取数据失败'});
    //         }
    //         let result = typeof body === 'string' ? JSON.parse(body) : body;
    //         if (result && result.returnCode == 0) {
    //             res.send({ error: 0, msg: '获取数据成功', data: result.body});
    //         }
    //         else {
    //             res.send({error: 1, msg: '获取数据失败'});
    //         }
    //     });
    // });
    //删除
    app.post('/cashMgmt/livingPay/companyPause/scheduleDelete.ajax', (req, res, next) => {
        var params = req.query.ids;
        console.log('/cashMgmt/livingPay/companyPause/scheduleDelete.ajax params:' + params);
        let option = {
            session: req.session,
            url: apiUrlList.scheduleDelete + "?ids=" + params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyPause/scheduleDelete.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyPause/scheduleDelete.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyPause/scheduleDelete.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyPause/scheduleDelete.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '删除机构失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '删除机构成功',
                    data: result.body
                });
            } else {
                res.send({
                    error: 1,
                    msg: '删除机构失败'
                });
            }
        });
    });
    app.post('/cashMgmt/livingPay/companyPause/queryOne.ajax', (req, res, next) => {
        let params = req.body;
        console.log(params)
        let option = {
            session: req.session,
            url: apiUrlList.scheduleQueryOne,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/cashMgmt/livingPay/companyPause/queryOne.ajax:', option);
        request(option, (error, response, body) => {
            console.log('/cashMgmt/livingPay/companyPause/queryOne.ajax error:', error);
            console.log('/cashMgmt/livingPay/companyPause/queryOne.ajax statusCode:', response && response.statusCode);
            console.log('/cashMgmt/livingPay/companyPause/queryOne.ajax body:', body);
            if (error) {
                return res.send({
                    error: -1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                let data = result.body;
                res.send({
                    error: 0,
                    msg: '操作成功',
                    data: data
                });
            } else {
                res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
        });
    });
};

