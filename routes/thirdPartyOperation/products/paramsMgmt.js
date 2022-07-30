const fs = require('fs');
const path = require('path');
const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').products.paramsMgmt;
const formidable = require('formidable');
module.exports = function (app) {
    //查询
    app.post('/thirdPartyOperation/products/paramsMgmt/search.ajax', (req, res, next) => {
        let params = {};
        req.body.fundid && (params.fundid = req.body.fundid);
        req.body.fundnm && (params.fundnm = req.body.fundnm);
        let option = {
            session: req.session,
            url: apiUrlList.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/paramsMgmt/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/paramsMgmt/search.ajax error:', error);
            console.log('/thirdPartyOperation/products/paramsMgmt/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/paramsMgmt/search.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(body.data)) {
                result.data.forEach((item) => {
                    item.check = false;
                    let formatTime = timestamp2Time(item.updatetime);
                    item.updatetime = formatTime.slice(0, 3) === 'NaN' ? '1970-01-01 08:00:00' : formatTime;
                });
                res.send({error: 0, msg: '查询成功', data: result.data});
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //上传
    app.post('/thirdPartyOperation/products/paramsMgmt/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            let formData = {
                fundid: fields.fundid,
                fundnm: fields.fundnm,
                operater: req.session['loginInfo'].username,
                filename: files.file.name,
                inputstream: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                session: req.session,
                url: apiUrlList.upload,
                timeout: 30000,
                formData: formData
            };
            console.log('/thirdPartyOperation/products/paramsMgmt/upload.ajax option:', option);
            request.post(option, (error, response, body) => {
                console.log('/thirdPartyOperation/products/paramsMgmt/upload.ajax error:', error);
                console.log('/thirdPartyOperation/products/paramsMgmt/upload.ajax statusCode:', response && response.statusCode);
                console.log('/thirdPartyOperation/products/paramsMgmt/upload.ajax body:', body);
                if (error) {
                    return res.send({error: 1, msg: '上传失败'});;
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.responseCode === '0000') {
                    res.send({error: 0, msg: '上传成功'});
                }
                else if (result && result.responseCode != '9999') {
                    res.send({error: 1, msg: result.responseMessage});
                }
                else {
                    res.send({error: 1, msg: '上传失败'});
                }
            });
        });
    });
    //更新
    app.post('/thirdPartyOperation/products/paramsMgmt/update.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            let formData = {
                fundid: fields.fundid,
                fundnm: fields.fundnm,
                operater: req.session['loginInfo'].username,
                filename: files.file.name,
                inputstream: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                session: req.session,
                url: apiUrlList.update,
                timeout: 30000,
                formData: formData
            };
            console.log('/thirdPartyOperation/products/paramsMgmt/update.ajax option:', option);
            request.post(option, (error, response, body) => {
                console.log('/thirdPartyOperation/products/paramsMgmt/update.ajax error:', error);
                console.log('/thirdPartyOperation/products/paramsMgmt/update.ajax statusCode:', response && response.statusCode);
                console.log('/thirdPartyOperation/products/paramsMgmt/update.ajax body:', body);
                if (error) {
                    return res.send({error: 1, msg: '更新失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.responseCode === '0000') {
                    res.send({error: 0, msg: '更新成功'});
                }
                else if (result && result.responseCode != '9999') {
                    res.send({error: 1, msg: result.responseMessage});
                }
                else {
                    res.send({error: 1, msg: '更新失败'});
                }
            });
        });
    });
    //删除
    app.post('/thirdPartyOperation/products/paramsMgmt/deleteData.ajax', (req, res, next) => {
        let params = {};
        req.body.fundid && (params.fundid = req.body.fundid);
        let option = {
            session: req.session,
            url: apiUrlList.deleteData,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/paramsMgmt/deleteData.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/paramsMgmt/deleteData.ajax error:', error);
            console.log('/thirdPartyOperation/products/paramsMgmt/deleteData.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/paramsMgmt/deleteData.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '删除失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({error: 0, msg: '删除成功'});
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({error: 1, msg: '删除失败'});
            }
        });
    });
    //下载
    app.get('/thirdPartyOperation/products/paramsMgmt/download.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: `${apiUrlList.download}?fundid=${req.query.fundid}`,
            timeout: 30000,
            json: true
        };
        console.log('/thirdPartyOperation/products/paramsMgmt/download.ajax option:', option);
        request(option).pipe(res);
    });
    // 自动提示数据
    app.post('/thirdPartyOperation/products/paramsMgmt/filter.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.filter,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/paramsMgmt/filter.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/paramsMgmt/filter.ajax error:', error);
            console.log('/thirdPartyOperation/products/paramsMgmt/filter.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/paramsMgmt/filter.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取基金信息失败'});;
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
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({error: 1, msg: '获取基金信息失败'});
            }
        });
    });
    // 获取员工信息
    app.post('/thirdPartyOperation/products/paramsMgmt/getContact.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getContact,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/paramsMgmt/getContact.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/paramsMgmt/getContact.ajax error:', error);
            console.log('/thirdPartyOperation/products/paramsMgmt/getContact.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/paramsMgmt/getContact.ajax body:', body);
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
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({error: 1, msg: '获取员工数据失败'});
            }
        });
    });
    // 获取代销机构信息
    app.post('/thirdPartyOperation/products/paramsMgmt/getOrgData.ajax', (req, res, next) => {
        let params = {};
        req.body.shortnm && (params.shortnm = req.body.shortnm);
        let option = {
            session: req.session,
            url: apiUrlList.channelAndPerson,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/paramsMgmt/getOrgData.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/paramsMgmt/getOrgData.ajax error:', error);
            console.log('/thirdPartyOperation/products/paramsMgmt/getOrgData.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/paramsMgmt/getOrgData.ajax body:', body);
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
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({error: 1, msg: '获取代销机构数据失败'});
            }
        });
    });
    // 获取邮件标题信息
    app.post('/thirdPartyOperation/products/paramsMgmt/getThemeContent.ajax', (req, res, next) => {
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
        console.log('/thirdPartyOperation/products/paramsMgmt/getThemeContent.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/paramsMgmt/getThemeContent.ajax error:', error);
            console.log('/thirdPartyOperation/products/paramsMgmt/getThemeContent.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/paramsMgmt/getThemeContent.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '获取邮件标题内容失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && result.data) {
                res.send({error: 0, msg: '调用成功', data: result.data});
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({error: 1, msg: '获取邮件标题内容失败'});
            }
        });
    });
    // 发送邮件
    app.post('/thirdPartyOperation/products/paramsMgmt/sendEmail.ajax', (req, res, next) => {
        let params = {};
        params.title = req.body.title;
        params.content = req.body.content;
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
        console.log('/thirdPartyOperation/products/paramsMgmt/sendEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/paramsMgmt/sendEmail.ajax error:', error);
            console.log('/thirdPartyOperation/products/paramsMgmt/sendEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/paramsMgmt/sendEmail.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '发送邮件失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.responseCode === '0000' && result.data) {
                res.send({error: 0, msg: '发送邮件成功'});
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({error: 1, msg: '发送邮件失败'});
            }
        });
    });
    // 保存邮件
    app.post('/thirdPartyOperation/products/paramsMgmt/saveEmail.ajax', (req, res, next) => {
        let params = {};
        params.title = req.body.title;
        params.content = req.body.content;
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
        console.log('/thirdPartyOperation/products/paramsMgmt/saveEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/paramsMgmt/saveEmail.ajax error:', error);
            console.log('/thirdPartyOperation/products/paramsMgmt/saveEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/paramsMgmt/saveEmail.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '保存邮件失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.responseCode === '0000' && result.data) {
                res.send({error: 0, msg: '保存邮件成功'});
            }
            else if (result && result.responseCode != '9999') {
                res.send({error: 1, msg: result.responseMessage});
            }
            else {
                res.send({error: 1, msg: '保存邮件失败'});
            }
        });
    });
};
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

function makeChannelTree(channel) {
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
