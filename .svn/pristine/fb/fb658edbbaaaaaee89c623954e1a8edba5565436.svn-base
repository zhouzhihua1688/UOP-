const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').mails.new;
const path = require('path');
const fs = require('fs');
const formidable = require('formidable');
module.exports = function (app) {
    // 获取员工信息
    app.post('/thirdPartyOperation/mails/new/getContact.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.getContact,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/mails/new/getContact.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/new/getContact.ajax error:', error);
            console.log('/thirdPartyOperation/mails/new/getContact.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/new/getContact.ajax body:', body);
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
                let contactData = {employee, dept};
                res.send({error: 0, msg: '调用成功', data: contactData});
            }
            else {
                res.send({error: 1, msg: '获取员工数据失败'});
            }
        });
    });
    // 获取代销机构信息
    app.post('/thirdPartyOperation/mails/new/getOrgData.ajax', (req, res, next) => {
        let params = {};
        req.body.shortnm && (params.shortnm = req.body.shortnm);
        let option = {
            session: req.session,
            url: apiUrlList.channelAndPerson,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/mails/new/getOrgData.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/new/getOrgData.ajax error:', error);
            console.log('/thirdPartyOperation/mails/new/getOrgData.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/new/getOrgData.ajax body:', body);
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
    app.post('/thirdPartyOperation/mails/new/getThemeContent.ajax', (req, res, next) => {
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
        console.log('/thirdPartyOperation/mails/new/getThemeContent.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/new/getThemeContent.ajax error:', error);
            console.log('/thirdPartyOperation/mails/new/getThemeContent.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/new/getThemeContent.ajax body:', body);
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
    // 文件删除
    app.post('/thirdPartyOperation/mails/new/removeFile.ajax', (req, res, next) => {
        let params = {};
        req.body.filePath && (params.filePath = req.body.filePath);
        let option = {
            session: req.session,
            url: apiUrlList.deleteFile,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/mails/new/removeFile.ajax option:', option);
        request.del(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/new/removeFile.ajax error:', error);
            console.log('/thirdPartyOperation/mails/new/removeFile.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/new/removeFile.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '文件删除失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.responseCode === '0000') {
                res.send({error: 0, msg: '文件删除成功'});
            }
            else {
                res.send({error: 1, msg: '文件删除失败'});
            }
        });
    });
    // 发送邮件
    app.post('/thirdPartyOperation/mails/new/sendEmail.ajax', (req, res, next) => {
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
        console.log('/thirdPartyOperation/mails/new/sendEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/new/sendEmail.ajax error:', error);
            console.log('/thirdPartyOperation/mails/new/sendEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/new/sendEmail.ajax body:', body);
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
    app.post('/thirdPartyOperation/mails/new/saveEmail.ajax', (req, res, next) => {
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
        console.log('/thirdPartyOperation/mails/new/saveEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/new/saveEmail.ajax error:', error);
            console.log('/thirdPartyOperation/mails/new/saveEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/new/saveEmail.ajax body:', body);
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
    //多文件上传
    app.post('/thirdPartyOperation/mails/new/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true; //保留文件后缀名
        form.encoding = 'utf-8'; //
        form.parse(req, (err, fields, filesLise) => {
            let afterFileName = [];
            let files = []; //多个文件流
            let filespath = []; //多个文件路径
            let filesName = '';
            for (const key in filesLise) {
                if (filesLise.hasOwnProperty(key)) {
                    filespath.push(filesLise[key].path); //遍历路径
                    afterFileName.push(filesLise[key].name); //遍历文件名
                }
            }
            for (let i = 0; i < afterFileName.length; i++) {
                afterFileName[i] = afterFileName[i].replace(/__/g, '_') //过滤__双下划线
            }

            for (let i = 0; i < filespath.length; i++) { //遍历文件流
                files.push(fs.createReadStream(path.resolve(filespath[i])))
            }
            filesName = afterFileName.join('#');
            let formData = {
                operater: req.session['loginInfo'].username,
                filesName: filesName,
                files: files //多个读文件流
            };
            let option = {
                session: req.session,
                url: apiUrlList.upload, //正式接口
                timeout: 30000,
                formData: formData
            };
            console.log('/thirdPartyOperation/mails/new/upload.ajax option:', option);
            request.post(option, (error, response, body) => {
                if (error) {
                    return res.send({error: 1, msg: '上传失败', data: result});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                let succeedfile = [];
                if (result.data) {
                    for (let i = 0; i < afterFileName.length; i++) {
                        succeedfile.push({
                            name: afterFileName[i],
                            path: result.data[i]
                        })
                    }
                }
                if (result && result.responseCode === '0000') {
                    res.send({error: 0, msg: '上传成功', data: succeedfile});
                }
                else {
                    res.send({error: 1, msg: '上传失败', data: result});
                }
            });
        });
    });
};

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
        if (item.parentChannelno === '0') {
            arr.push({
                channelno: item.channelno,
                channelname: item.channelname,
                child: []
            });
        } else {
            arr[0].child.push({
                channelno: item.channelno,
                channelname: item.channelname
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