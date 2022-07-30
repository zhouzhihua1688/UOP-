//代销尾佣汇总
const fs = require('fs');
const path = require('path');
const request = require('../../../local_data/requestWrapper');
let apiUrlList=require('../apiConfig').expenseMgmt;
const formidable = require('formidable');
module.exports = function (app) {
    //主页面表格数据请求
    app.post('/thirdPartyOperation/expenseMgmt/trailingSum/getList.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.trailingSum.list,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/trailingSum/getList.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum/getList.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum/getList.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum/getList.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '数据获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == 0) {
                if(result.data&&Array.isArray(result.data)){
                    for(var i=0;i<result.data.length;i++){
                        result.data[i].inserttime=formatTime(result.data[i].inserttime);
                        result.data[i].ymonth=insertStr(result.data[i].ymonth,4,'年')+'月';
                    }
                }
                res.send({ error: 0, msg: '数据获取成功', data: result.data});
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
    //查询
    app.post('/thirdPartyOperation/expenseMgmt/trailingSum/queryYmonth.ajax', (req, res, next) => {
        var params=req.query.ymonth;
        if(params==''){
            var urls=apiUrlList.trailingSum.list;
        }else {
            var urls=apiUrlList.trailingSum.list+'?ymonth='+params
        }
        let option = {
            session: req.session,
            url: urls,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/trailingSum/queryYmonth.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum/queryYmonth.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum/queryYmonth.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum/queryYmonth.ajax body:', body);
            if (error) {
                return res.send({ error: 1, msg: '数据获取失败' });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            console.log(result);
            if (result && result.responseCode == '0000'&&Array.isArray(result.data)) {
                if(result.data&&Array.isArray(result.data)){
                    for(var i=0;i<result.data.length;i++){
                        result.data[i].inserttime=formatTime(result.data[i].inserttime);
                        result.data[i].ymonth=insertStr(result.data[i].ymonth,4,'年')+'月';
                    }
                }
                res.send({ error: 0, msg: '数据获取成功', data: result.data});
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
    //上传
    app.post('/thirdPartyOperation/expenseMgmt/trailingSum/upload.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            let formData = {
                userid:req.session.loginInfo.userid,
                ymonth: fields.uploadYmonth,
                operater: req.session['loginInfo'].username,
                fileName: files.file.name,
                inputstream: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                session: req.session,
                url: apiUrlList.trailingSum.upload,
                timeout: 30000,
                formData: formData
            };
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum/upload.ajax option:', option);
            // res.send({error: 0, msg: '上传成功'});
            request.post(option, (error, response, body) => {
                console.log('/thirdPartyOperation/expenseMgmt/trailingSum/upload.ajax error:', error);
                console.log('/thirdPartyOperation/expenseMgmt/trailingSum/upload.ajax statusCode:', response && response.statusCode);
                console.log('/thirdPartyOperation/expenseMgmt/trailingSum/upload.ajax body:', body);
                if (error) {
                    return res.send({ error: 1, msg: '上传失败' });
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.responseCode === '0000') {
                    res.send({error: 0, msg: '上传成功'});
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
    });
    //导入更新
    app.post('/thirdPartyOperation/expenseMgmt/trailingSum/update.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            let formData = {
                userid:req.session.loginInfo.userid,
                ymonth: fields.ymonth,
                operater: req.session['loginInfo'].username,
                fileName: files.file.name,
                inputstream: fs.createReadStream(path.resolve(files.file.path))
            };
            let option = {
                session: req.session,
                url:apiUrlList.trailingSum.upload,
                timeout: 30000,
                formData: formData
            };
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum/update.ajax option:', option);
            // res.send({error: 0, msg: '上传成功'});
            request.post(option, (error, response, body) => {
                console.log('/thirdPartyOperation/expenseMgmt/trailingSum/update.ajax error:', error);
                console.log('/thirdPartyOperation/expenseMgmt/trailingSum/update.ajax statusCode:', response && response.statusCode);
                console.log('/thirdPartyOperation/expenseMgmt/trailingSum/update.ajax body:', body);
                if (error) {
                    return  res.send({error: 1, msg: '更新失败'});
                }
                let result = typeof body === 'string' ? JSON.parse(body) : body;
                if (result && result.responseCode === '0000') {
                    res.send({error: 0, msg: '更新成功'});
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
    });
    //下载
    app.get('/thirdPartyOperation/expenseMgmt/trailingSum/download.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: `${apiUrlList.trailingSum.download}?filepath=${encodeURI(req.query.filepath)}`,
            timeout: 30000,
            json: true
        };

        console.log('/thirdPartyOperation/expenseMgmt/trailingSum/download.ajax option:', option);
        request(option).pipe(res);
    });
};


function formatTime(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y + M + D + h + m + s;
}

function insertStr(str1,n,str2){
    if(str1.length<n){
        return str1+str2;
        }
    else{
        s1 = str1.substring(0,n);
        s2 = str1.substring(n,str1.length);
        return s1+str2+s2;
    }
}

