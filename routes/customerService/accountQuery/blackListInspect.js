const request = require('./../../../local_data/requestWrapper');
const apiUrl = require('../apiConfig').accountQuery.blackListInspect;
const node_xlsx = require('node-xlsx');
const formidable = require('formidable');
const fs = require('fs');
module.exports = function (app) {

    //文件上传
    app.post('/customerService/accountQuery/blackListInspect/uploadXls.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true; //保留文件后缀名

        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            if (files.file.path) {
                let cosFrozenCustInfos = node_xlsx.parse(files.file.path)[0].data.map((item, index, arr) => {
                    if (index > 0 && item.length > 0) {
                        return {
                            allowUnfreezeSelf: item[1],
                            idNo: item[0]
                        };
                    }
                }).filter(item => {
                    return item;
                })
                console.log(cosFrozenCustInfos)
                fs.unlink(files.file.path, function (err) {
                    if (err) {
                        console.log('文件删除失败', err)
                    }
                }) //删除文件

                let option = {
                    session: req.session,
                    url: `${apiUrl.uploadXls}?pageNo=1&pageSize=9999`,
                    body: cosFrozenCustInfos,
                    req,
                    headers: {
                        operator: req.session.loginInfo.userid
                    },
                    timeout: 120000,
                    json: true
                };
                console.log('/businessMgmt/accountQuery/blackListInspect/uploadXls.ajax option:', {
                    ...option,
                    req: '#'
                });
                request.post(option, (error, response, body) => {
                    console.log('/businessMgmt/accountQuery/blackListInspect/uploadXls.ajax error:', error);
                    console.log('/businessMgmt/accountQuery/blackListInspect/uploadXls.ajax statusCode:', response && response.statusCode);
                    console.log('/businessMgmt/accountQuery/blackListInspect/uploadXls.ajax body:', {
                        ...body,
                        ['body']: '*****'
                    });
                    if (error) {
                        console.log(error)
                        return res.send({
                            error: 1,
                            msg: `查询失败`
                        });

                    }
                    let result = typeof body === 'string' ? JSON.parse(body) : body;
                    if (result && result.returnCode == 0) {
                        res.send({
                            error: 0,
                            msg: '查询成功',
                            data: result.body
                        });
                    } else if (result && result.returnCode == 9999) {
                        return res.send({
                            error: 1,
                            msg: `查询失败`
                        });
                    } else {
                        return res.send({
                            error: 1,
                            msg: result.returnMsg
                        });
                    }
                });

            } else {
                return res.send({
                    error: 1,
                    msg: `上传失败,读取文件失败`
                });
            }


        });
    });
    //批量冻结
    app.post('/customerService/accountQuery/blackListInspect/freezeList.ajax', (req, res, next) => {
        let params = req.body.params
        console.log(params)
        let option = {
            session: req.session,
            url: `${apiUrl.freezeList}?operator=${req.session.loginInfo.userid}`,
            body: params,
            req,
            headers: {
                operator: req.session.loginInfo.userid
            },
            timeout: 120000,
            json: true
        };
        console.log('/businessMgmt/accountQuery/blackListInspect/freezeList.ajax option:', {
            ...option,
            req: '#'
        });
        request.post(option, (error, response, body) => {
            console.log('/businessMgmt/accountQuery/blackListInspect/freezeList.ajax error:', error);
            console.log('/businessMgmt/accountQuery/blackListInspect/freezeList.ajax statusCode:', response && response.statusCode);
            console.log('/businessMgmt/accountQuery/blackListInspect/freezeList.ajax body:', body);
            if (error) {
                console.log(error)
                return res.send({
                    error: 1,
                    msg: `查询失败`
                });

            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result.body
                });
            } else if (result && result.returnCode == 9999) {
                return res.send({
                    error: 1,
                    msg: `查询失败`
                });
            } else {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            }
        });
    });

};