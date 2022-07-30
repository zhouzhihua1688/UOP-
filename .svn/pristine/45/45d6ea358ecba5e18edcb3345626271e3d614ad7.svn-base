const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').products.open;
module.exports = function (app) {
    //查询
    app.post('/thirdPartyOperation/products/open/search.ajax', (req, res, next) => {
        let params = {};
     
        params.insertby = req.session.loginInfo.userid;
        req.body.fundnm && (params.fundnm = req.body.fundnm);
        req.body.opentime && (params.opentime = req.body.opentime.replace(/-/g, ''));
        req.body.status && (params.status = req.body.status);
        let option = {
            session: req.session,
            url: apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/search.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/search.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data)) {
                result.data.forEach((item) => {
                    item.remind = item.remind == 1 ? '提醒成功' : item.remind == 2 ? '提醒失败' : '否';
                    item.status = item.status == 0 ? '待下发' : item.status == 1 ? '反馈中' : '已完结';
                    item.orderTime = item.inserttime;
                    item.inserttime = timestamp2Time(item.inserttime);
                    item.attach1 = formatChannelPerson(item.attach1);
                    item.check = false;
                });
                res.send({error: 0, msg: '查询成功', data: result.data});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //下载
    app.get('/thirdPartyOperation/products/open/download.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: `${apiUrlList.download}?noticeId=${req.query.noticeId}`,
            timeout: 30000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/download.ajax option:', option);
        request(option).pipe(res);
    });
    //查看邮件发送状态
    app.post('/thirdPartyOperation/products/open/result.ajax', (req, res, next) => {
        let params = {};
        req.body.noticeid && (params.noticeid = req.body.noticeid);
        let option = {
            session: req.session,
            url: apiUrlList.result,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/result.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/result.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/result.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/result.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取状态信息失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data)) {
                res.send({error: 0, msg: '查询成功', data: body.data});
            }
            else {
                res.send({error: 1, msg: '获取状态信息失败'});
            }
        });
    });
    //保存
    app.post('/thirdPartyOperation/products/open/save.ajax', (req, res, next) => {
        let params = {};
        params.insertby = req.session.loginInfo.userid;
        req.body.noticenm && (params.noticenm = req.body.noticenm);
        req.body.noticetype && (params.noticetype = req.body.noticetype);
        req.body.apkinds && (params.apkinds = req.body.apkinds);
        req.body.fundid && (params.fundid = req.body.fundid);
        req.body.fundnm && (params.fundnm = req.body.fundnm);
        req.body.thirdpartner && (params.thirdpartner = req.body.thirdpartner);
        req.body.remindtime && (params.remindtime = req.body.remindtime.replace(/-/g, ''));
        req.body.resulttime && (params.resulttime = req.body.resulttime.replace(/-/g, ''));
        req.body.opentime && (params.opentime = req.body.opentime.replace(/-/g, ''));
        let option = {
            session: req.session,
            url: apiUrlList.save,
            qs: params,
            json: true,
            timeout: 15000
        };
        console.log('/thirdPartyOperation/products/open/save.ajax option=', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/save.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/save.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/save.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '保存失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({error: 0, msg: '保存成功', data: result.data});
            }
            else {
                res.send({error: 1, msg: '保存失败'});
            }
        });
    });
    //更新邮件状态
    app.post('/thirdPartyOperation/products/open/updateEmail.ajax', (req, res, next) => {
        let params = {};
        req.body.noticeid && (params.noticeid = req.body.noticeid);
        req.body.status && (params.status = req.body.status);
        let option = {
            session: req.session,
            url: apiUrlList.update,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/updateEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/updateEmail.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/updateEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/updateEmail.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '更新邮件状态失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({error: 0, msg: '更新邮件状态成功'});
            }
            else {
                res.send({error: 1, msg: '更新邮件状态失败'});
            }
        });
    });
    //修改
    app.post('/thirdPartyOperation/products/open/update.ajax', (req, res, next) => {
        let params = {};
        req.body.noticeid && (params.noticeid = req.body.noticeid);
        req.body.noticenm && (params.noticenm = req.body.noticenm);
        req.body.noticetype && (params.noticetype = req.body.noticetype);
        req.body.apkinds && (params.apkinds = req.body.apkinds);
        req.body.fundid && (params.fundid = req.body.fundid);
        req.body.fundnm && (params.fundnm = req.body.fundnm);
        req.body.thirdpartner && (params.thirdpartner = req.body.thirdpartner);
        req.body.remindtime && (params.remindtime = req.body.remindtime.replace(/-/g, ''));
        req.body.resulttime && (params.resulttime = req.body.resulttime.replace(/-/g, ''));
        req.body.opentime && (params.opentime = req.body.opentime.replace(/-/g, ''));
        let option = {
            session: req.session,
            url: apiUrlList.update,
            qs: params,
            json: true,
            timeout: 15000
        };
        console.log('/thirdPartyOperation/products/open/update.ajax option=', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/update.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/update.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/update.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '更改失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({error: 0, msg: '更改成功', data: result.data});
            }
            else {
                res.send({error: 1, msg: '更改失败'});
            }
        });
    });
    //获取所有三方机构名称
    app.post('/thirdPartyOperation/products/open/getChannel.ajax', (req, res, next) => {
        let params = {};
        req.body.shortnm && (params.shortnm = req.body.shortnm);
        let option = {
            session: req.session,
            url: apiUrlList.channelAndPerson,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/getChannel.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/getChannel.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/getChannel.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/getChannel.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取代销机构数据失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data['infoList']['list1']) && Array.isArray(result.data['infoList']['list2']) && Array.isArray(result.data.partnerOPList)) {
                result.data.partnerOPList.forEach((item) => {
                    item.contactorid = item.userid;
                    item.channelId = item.branchcode;
                    item.channelName = item.shortnm;
                    item.check = false;
                });
                let channel1 = makeChannelTree(result.data['infoList']['list1']);
                let channel2 = makeChannelTree(result.data['infoList']['list2']);
                let orgData = {
                    channel: [].concat(channel1, channel2),
                    contacts: result.data.partnerOPList
                };
                res.send({error: 0, msg: '调用成功', data: orgData});
            }
            else {
                res.send({error: 1, msg: '获取代销机构数据失败'});
            }
        });
    });
    //获取开放类型列表
    app.post('/thirdPartyOperation/products/open/getTypeList.ajax', (req, res, next) => {
        let params = {};
        req.body.originType && (params.originType = req.body.originType);
        let option = {
            session: req.session,
            url: apiUrlList.getTypeList,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/getTypeList.ajax option=', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/getTypeList.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/getTypeList.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/getTypeList.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取开放类型列表失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data)) {
                res.send({error: 0, msg: '调用成功', data: result.data});
            }
            else {
                res.send({error: 1, msg: '获取开放类型列表失败'});
            }
        });
    });
    //获取apkinds列表
    app.post('/thirdPartyOperation/products/open/getApkinds.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getApkinds,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/getApkinds.ajax option=', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/getApkinds.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/getApkinds.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/getApkinds.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取开放业务列表失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data)) {
                res.send({error: 0, msg: '调用成功', data: result.data});
            }
            else {
                res.send({error: 1, msg: '获取开放业务列表失败'});
            }
        });
    });
    // 自动提示数据
    app.post('/thirdPartyOperation/products/open/filter.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.filter,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/filter.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/filter.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/filter.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/filter.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取基金信息失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Object.prototype.toString.call(result.data) === '[object Object]') {
                let productList = result.data;
                let productCode = Object.keys(result.data);
                let productName = Object.values(result.data);
                let filterData = {
                    productCode,
                    productName,
                    productList
                };
                res.send({error: 0, msg: '调用成功', data: filterData});
            }
            else {
                res.send({error: 1, msg: '获取基金信息失败'});
            }
        });
    });
    // 获取员工信息
    app.post('/thirdPartyOperation/products/open/getContact.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getContact,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/getContact.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/getContact.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/getContact.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/getContact.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取员工数据失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data.employees) && Array.isArray(result.data.depts)) {
                let employee = result.data.employees;
                employee.forEach((item) => {
                    item.check = false
                });
                let dept = makeDeptTree(result.data.depts);
                let contactData = {
                    employee: employee,
                    dept: dept
                };
                res.send({error: 0, msg: '调用成功', data: contactData});
            }
            else {
                res.send({error: 1, msg: '获取员工数据失败'});
            }
        });
    });
    // 获取代销机构信息
    app.post('/thirdPartyOperation/products/open/getOrgData.ajax', (req, res, next) => {
        let params = {};
        req.body.shortnm && (params.shortnm = req.body.shortnm);
        let option = {
            session: req.session,
            url: apiUrlList.channelAndPerson,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/getOrgData.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/getOrgData.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/getOrgData.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/getOrgData.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取代销机构数据失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data['infoList']['list1']) && Array.isArray(result.data['infoList']['list2']) && Array.isArray(result.data.partnerOPList)) {
                result.data.partnerOPList.forEach((item) => {
                    item.contactorid = item.userid;
                    delete item.userid;
                    item.check = false;
                });
                let channel1 = makeEmailChannelTree(result.data['infoList']['list1']);
                let channel2 = makeEmailChannelTree(result.data['infoList']['list2']);
                let orgData = {
                    channel: [].concat(channel1, channel2),
                    contacts: result.data.partnerOPList
                };
                res.send({error: 0, msg: '调用成功', data: orgData});
            }
            else {
                res.send({error: 1, msg: '获取代销机构数据失败'});
            }
        });
    });
    // 获取邮件标题信息
    app.post('/thirdPartyOperation/products/open/getThemeContent.ajax', (req, res, next) => {
        let params = {};
        params.FUNDNM = req.body.FUNDNM;
        params.FUNDID = req.body.FUNDID;
        if (req.body.moduleType == 'open') {
            params.THIRDPARTNER = req.body.THIRDPARTNER;
            params.APKINDS = req.body.APKINDS;
            params.OPENTIME = req.body.OPENTIME;
            params.RESULTTIME = req.body.RESULTTIME;
        }
        let option = {
            session: req.session,
            url: `${apiUrlList.theme}?moduleType=${req.body.moduleType}`,
            body: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/getThemeContent.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/getThemeContent.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/getThemeContent.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/getThemeContent.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取邮件标题内容失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && result.data) {
                res.send({error: 0, msg: '调用成功', data: result.data});
            }
            else {
                res.send({error: 1, msg: '获取邮件标题内容失败'});
            }
        });
    });
    // 发送邮件
    app.post('/thirdPartyOperation/products/open/sendEmail.ajax', (req, res, next) => {
        let params = {};
        req.body.title && (params.title = req.body.title);
        req.body.content && (params.content = req.body.content);
        req.body.attach1 && (params.attach1 = req.body.attach1);
        req.body.emailid && (params.emailid = req.body.emailid);
        let i = 1;
        while (req.body['filepath' + i]) {
            params['filepath' + i] = req.body['filepath' + i];
            i++;
        }
        params.operators = req.session['loginInfo'].username;
        let option = {
            session: req.session,
            url: apiUrlList.sendEmail,
            qs: params,
            body: JSON.parse(req.body.receiverList),
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/sendEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/sendEmail.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/sendEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/sendEmail.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '发送邮件失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.responseCode === '0000' && result.data) {
                res.send({error: 0, msg: '发送邮件成功'});
            }
            else {
                res.send({error: 1, msg: '发送邮件失败'});
            }
        });
    });
    // 保存邮件
    app.post('/thirdPartyOperation/products/open/saveEmail.ajax', (req, res, next) => {
        let params = {};
        req.body.title && (params.title = req.body.title);
        req.body.content && (params.content = req.body.content);
        req.body.attach1 && (params.attach1 = req.body.attach1);
        req.body.emailid && (params.emailid = req.body.emailid);
        let i = 1;
        while (req.body['filepath' + i]) {
            params['filepath' + i] = req.body['filepath' + i];
            i++;
        }
        params.operators = req.session['loginInfo'].username;
        let option = {
            session: req.session,
            url: apiUrlList.saveEmail,
            qs: params,
            body: JSON.parse(req.body.receiverList),
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/open/saveEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/open/saveEmail.ajax error:', error);
            console.log('/thirdPartyOperation/products/open/saveEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/open/saveEmail.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '保存邮件失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.responseCode === '0000' && result.data) {
                res.send({error: 0, msg: '保存邮件成功'});
            }
            else {
                res.send({error: 1, msg: '保存邮件失败'});
            }
        });
    });
};
function makeChannelTree(channel) {
    let arr = [];
    channel.forEach((item) => {
        if (item.branchtype === '0') {
            arr.push({
                channelId: item.branchcode,
                channelName: item.shortnm,
                child: []
            });
        }
        else {
            arr[0].child.push({
                channelId: item.branchcode,
                channelName: item.shortnm
            });
        }
    });
    return arr;
}
function formatChannelPerson(str) {
    if (!str) {
        return [];
    }
    let result = [];
    let channelList = str.split(',');
    channelList.forEach((item) => {
        let personInfo = item.split('|');
        result.push({
            channelName: personInfo[0],
            channelId: personInfo[1],
            contatorName: personInfo[2],
            contatorId: personInfo[3],
            email: personInfo[4],
        });
    });
    return result;
}
function timestamp2Time(timestamp) {
    var result = '';
    var d = new Date();
    d.setTime(timestamp);
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var min = d.getMinutes();
    var sec = d.getSeconds();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    hour = hour < 10 ? '0' + hour : hour;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    result = `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    return result;
}

function makeDeptTree(depts) {
    let arr = [];
    depts.forEach((item) => {
        if (!item.parentCode) {
            item.child = [];
            arr.push(item);
        }
    });
    depts.forEach((item) => {
        if (item.parentCode) {
            findParent(item.parentCode, arr, item);
        }
    });
    return arr;
}

function makeEmailChannelTree(channel) {
    let arr = [];
    channel.forEach((item) => {
        if (item.branchtype === '0') {
            arr.push({
                channelno: item.branchcode,
                channelname: item.shortnm,
                child: []
            });
        } else {
            arr[0].child.push({
                channelno: item.branchcode,
                channelname: item.shortnm
            });
        }
    });
    return arr;
}

function findParent(id, arr, listdata) {
    for (let item of arr) {
        if (item.deptOACode === id) {
            if (!item.child) {
                item.child = [];
            }
            item.child.push(listdata);
            return;
        }
        if (Array.isArray(item.child)) {
            findParent(id, item.child, listdata);
        }
    }
}