const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').automatedOperation.operatePlanMgmt.operatePlanMgmtCheck;
module.exports = function (app) {
    // 获取页面头部数据
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/getTopDataForCheck.ajax', (req, res, next) => {
        let getTopData = new Promise((resolve, reject) => {
            let params = req.body;
            let option = {
                pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getTopDataForCheck.ajax --getTopData',
                req: req,
                url: apiUrlList.getTopDataForCheck,
                qs: params,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({message: '调用失败'});
                }
                if (body && body.returnCode == 0) {
                    return resolve(body.body.rows[0]);
                } else if (body && body.returnCode != 9999) {
                    return reject({message: body.returnMsg});
                } else {
                    return reject({message: '调用失败'});
                }
            });
        });
        let getGroupList = new Promise((resolve, reject) => {
            let option = {
                pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getTopDataForCheck.ajax --getGroupList',
                req: req,
                url: apiUrlList.userGroup,
                timeout: 15000,
                json: true
            };
            request(option, (error, response, body) => {
                if (error) {
                    return reject({message: '调用失败'});
                }
                if (body && body.returnCode == 0) {
                    return resolve(body.body);
                } else if (body && body.returnCode != 9999) {
                    return reject({message: body.returnMsg});
                } else {
                    return reject({message: '调用失败'});
                }
            });
        });
        getTopData.then(topData => {
            getGroupList.then(groupList => {
                topData.showTargetUserGroups = topData.targetUserGroups.split(',').map(groupId => {
                    let groupObj = groupList.filter(item => item.groupId === groupId)[0];
                    return groupObj ? groupObj.groupName : groupId
                }).join(',');
                return res.send({error: 0, msg: '调用成功', data: topData});
            }).catch(error => {
                return res.send({error: 0, msg: '调用成功', data: topData});
            });
        }).catch(error => {
            return res.send({error: 1, msg: error.message});
        });
    });
    // 获取列表数据
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/getListDataForCheck.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getListDataForCheck.ajax',
            req: req,
            url: apiUrlList.getListDataForCheck,
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
            if (body && body.returnCode == 0) {
                body.body.rows.forEach(item => {
                    item.showInsertTime = formatTime(item.insertTime);
                });
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    // 获取图表数据
    app.post('/automatedOperation/operatePlanMgmt/operatePlanMgmt/getChartsDataForCheck.ajax', (req, res, next) => {
        let params = req.body;
        let option = {
            pageUrl: '/automatedOperation/operatePlanMgmt/operatePlanMgmt/getChartsDataForCheck.ajax',
            req: req,
            url: apiUrlList.getChartsDataForCheck,
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
            if (body && body.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: body.body
                });
            } else if (body && body.returnCode != 9999) {
                res.send({
                    error: 1,
                    msg: body.returnMsg
                });
            } else {
                res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
};

function formatTime(date) {
    let d = new Date(date);
    let year = d.getFullYear();
    let month = d.getMonth() + 1;
    let day = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();

    function fixZero(n) {
        return n < 10 ? '0' + n : n;
    }

    return [year, month, day].map(fixZero).join('-') + ' ' + [hour, minute, second].map(fixZero).join(':');
}