const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').mails.sent;
module.exports = function (app) {
    //查询（条件查询）
    app.post('/thirdPartyOperation/mails/sent/searchCondition.ajax', (req, res, next) => {
        let params = {};
        req.body.title && (params.title = req.body.title);
        req.body.address && (params.address = req.body.address);
        req.body.status && (params.status = req.body.status);
        req.body.sendtime && (params.sendtime = req.body.sendtime);
        req.body.emailid && (params.emailid = req.body.emailid);
        let option = {
            session: req.session,
            url: apiUrlList.searchCondition,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/mails/sent/searchCondition.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/sent/searchCondition.ajax error:', error);
            console.log('/thirdPartyOperation/mails/sent/searchCondition.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/sent/searchCondition.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data)) {
                formatData(result.data);
                res.send({error: 0, msg: '查询成功', data: result.data});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    //查询(全部历史)
    app.post('/thirdPartyOperation/mails/sent/search.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.search,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/mails/sent/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/sent/search.ajax error:', error);
            console.log('/thirdPartyOperation/mails/sent/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/sent/search.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '查询失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000' && Array.isArray(result.data)) {
                formatData(result.data);
                res.send({error: 0, msg: '查询成功', data: result.data});
            }
            else {
                res.send({error: 1, msg: '查询失败'});
            }
        });
    });
    // 发送邮件
    app.post('/thirdPartyOperation/mails/send/sendEmail.ajax', (req, res, next) => {
        let params = {};
        req.body.title && (params.title = req.body.title);
        req.body.content && (params.content = req.body.content);
        req.body.attach1 && (params.attach1 = req.body.attach1);
        req.body.emailid && (params.emailid = req.body.emailid);
        //req.body.receiverList && (params.receiverList = req.body.receiverList);
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
        console.log('/thirdPartyOperation/mails/send/sendEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/send/sendEmail.ajax error:', error);
            console.log('/thirdPartyOperation/mails/send/sendEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/send/sendEmail.ajax body:', body);
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
    app.post('/thirdPartyOperation/mails/send/saveEmail.ajax', (req, res, next) => {
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
        console.log('/thirdPartyOperation/mails/send/saveEmail.ajax option:', option);
        request.post(option, (error, response, body) => {
            console.log('/thirdPartyOperation/mails/send/saveEmail.ajax error:', error);
            console.log('/thirdPartyOperation/mails/send/saveEmail.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/mails/send/saveEmail.ajax body:', body);
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
function formatData(result) {
    result.forEach(function (item) {
        let recvList = [];
        let recipient = [];
        let copy = [];
        let encryption = [];
        let excel = [];
        let i = 1;
        while (item['filepath' + i]) {
            let arr = item['filepath' + i].split('/');
            let name = arr[arr.length - 1];
            excel.push({
                filename: name,
                filepath: item['filepath' + i]
            });
            i++;
        }
        if (item.status == 'D') {
            item.status = '草稿';
        }
        if (item.status == 'N') {
            item.status = '未发送';
        }
        if (item.status == 'S') {
            item.status = '已发送';
        }
        if (item.status == 'F') {
            item.status = '发送失败';
        }
        if (item.status == 'E') {
            item.status = '发送异常';
        }
        if (item.status == '已发送') {
            item.showSend = false;
        }
        else {
            item.showSend = true;
        }
        item.recvList.forEach((item) => {
            recvList.push({
                address: item.address
            });
            if (item.addresstype == 1) {
                recipient.push(item);
            }
            if (item.addresstype == 2) {
                copy.push(item);
            }
            if (item.addresstype == 3) {
                encryption.push(item);
            }
        });
        item.showRecvList = recvList;
        item.recipient = recipient;
        item.copy = copy;
        item.encryption = encryption;
        item.excel = excel;
        item.orderTime = item.sendtime;
        item.sendtime = timestamp2Time(item.sendtime, '-');
    });
}
function timestamp2Time(timestamp) {
    if (!timestamp) {
        return '-';
    }
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
    if (result.slice(0, 4) == '1970') {
        result = '-';
    }
    return result;
}