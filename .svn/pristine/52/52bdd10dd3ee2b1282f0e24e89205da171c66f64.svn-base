const request = require('./../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').investmentStrategy.alternativePoolMgmt;
const XLSX = require('xlsx');
const node_xlsx = require('node-xlsx');
const formidable = require('formidable');
const fs = require('fs');
const investTableName = 'uop_log_invest';
module.exports = function (app) {
    // 获取初始数据和查询
    app.post('/investmentMgmt/investmentStrategy/alternativePoolMgmt/getTableData.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/alternativePoolMgmt/getTableData.ajax',
            req,
            url: apiUrlList.getTableData,
            qs: req.body,
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
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                result.body.forEach(item => item.check = false);
                return res.send({
                    error: 0,
                    msg: '查询成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '查询失败'
                });
            }
        });
    });
    // 获取所有组合
    app.post('/investmentMgmt/investmentStrategy/alternativePoolMgmt/fundGroups.ajax', (req, res, next) => {
        let params = {}
        params.groupId = "ALL";
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/alternativePoolMgmt/fundGroups.ajax',
            req,
            url: apiUrlList.fundGroups,
            qs: params,
            timeout: 15000,
            json: true
        };
        request(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '操作失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '获取成功',
                    data: result
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '获取失败'
                });
            }
        });
    });
    //文件上传
     app.post('/investmentMgmt/investmentStrategy/alternativePoolMgmt/uploadXls.ajax', (req, res, next) => {
        let form = new formidable.IncomingForm();
        form.keepExtensions = true; //保留文件后缀名

        form.parse(req, (err, fields, files) => {
            console.log('参数表管理页面表单接收完毕:', fields);
            console.log('参数表管理页面表单文件接收完毕:', files);
            if (files.file.path) {
                let cosFrozenCustInfos = node_xlsx.parse(files.file.path)[0].data.map((item, index, arr) => {
                    if (index > 0 && item.length > 0) {
                        return {
                            fundid: item[0],
                            // fundName: item[1],
                            // fundType: item[2],
                            // taNo: item[3],
                            // groupName: item[4],
                            groupid: item[1],
                            fundType:item[2]
                        };
                    }
                }).filter(item => {
                    return item;
                })
                cosFrozenCustInfos.forEach((item)=>{
                    switch(item.fundType){
                        case '固收类':
                            item.fundType = 'F';
                            break;
                        case '货币类':
                            item.fundType = 'V';
                            break;
                        case '权益类':
                            item.fundType = 'R';
                            break;
                        case '其他':
                            item.fundType = 'O';
                            break;
                        default :
                            item.fundType = '';
                    }
                })
                console.log(cosFrozenCustInfos)
                let checkFlag = cosFrozenCustInfos.every((item)=>{
                    return item.fundid&&item.fundType&&item.groupid
                })
                fs.unlink(files.file.path, function (err) {
                    if (err) {
                        console.log('文件删除失败', err)
                    }
                }) //删除文件
                // 校验不通过
                if(!checkFlag){
                    return res.send({
                        error: 1,
                        msg: `上传内容的所有项不能为空，请检查基金ID，组合ID，基金类型是否为空，或基金类型填写错误`
                    });
                }
                
                let option = {
                    // session: req.session,
                    pageUrl: '/investmentMgmt/investmentStrategy/alternativePoolMgmt/uploadXls.ajax',
                    req,
                    operateType: 1, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
                    url: `${apiUrlList.importAlls}`,
                    body: cosFrozenCustInfos,
                    // headers: {
                    //     operator: req.session.loginInfo.userid
                    // },
                    timeout: 120000,
                    json: true,
                    investBody:cosFrozenCustInfos,
                    mappingKeyWords:'alternativePoolMgmt'
                };
                console.log('/investmentMgmt/investmentStrategy/alternativePoolMgmt/uploadXls.ajax option:', {
                    ...option,
                    req: '#'
                });
                request.post(option, (error, response, body) => {
                    sysLogger(option.operateType, req, option, body, investTableName);
                    console.log('/investmentMgmt/investmentStrategy/alternativePoolMgmt/uploadXls.ajax error:', error);
                    console.log('/investmentMgmt/investmentStrategy/alternativePoolMgmt/uploadXls.ajax statusCode:', response && response.statusCode);
                    console.log('/investmentMgmt/investmentStrategy/alternativePoolMgmt/uploadXls.ajax body:', {
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
    // 批量删除
    app.post('/investmentMgmt/investmentStrategy/alternativePoolMgmt/deleteList.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/investmentMgmt/investmentStrategy/alternativePoolMgmt/deleteList.ajax',
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            req,
            url: apiUrlList.deleteList,
            body: req.body.deleteIdList,
            timeout: 15000,
            json: true,
            investBody:{deleteIdList:req.body.recordList},
            mappingKeyWords:'alternativePoolMgmt'
        };
        console.log(req.body.recordList);
        // return;
        request.post(option, (error, response, body) => {
            sysLogger(option.operateType, req, option, body, investTableName);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == '0') {
                return res.send({
                    error: 0,
                    msg: '删除成功',
                    data: null
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.returnMsg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '删除失败'
                });
            }
        });
    });
};
