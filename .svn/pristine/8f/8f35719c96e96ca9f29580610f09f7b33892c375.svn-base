const request = require('../../../local_data/requestWrapper');
let apiUrlList = require('../apiConfig').expenseMgmt;
module.exports = function (app) {
    //主页面表格数据请求
    app.post('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/list.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.trailingDetails.list,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        console.log(option.url);
        console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/list.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/list.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/list.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/list.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '数据获取失败'});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == "0000") {
                let tableData = [];  // 存放内容的数据
                let thData = result.data[0];//存放头部数据
                let fundids = thData.map(item => item.fundid);
                let bankData = [];   // 存放银行数据
                let thirdData = [];  // 存放第三方数据
                let dataInfo = result.data[1];
                let dataList = result.data[2];
                let dataType=result.data[3];

                for (let prop in dataInfo) {
                    if (dataType[prop]) {
                        let item = {
                            type: dataType[prop],
                            code: prop,
                            name: dataInfo[prop],
                            dataList: dataList[prop] ? fundids.map(fundid => dataList[prop][fundid]) : []
                        };
                        item.dataList.push(dataList[prop]['合计']);
                        if (item.type == 1) {
                            item.typeName = '银行';
                            bankData.push(item);
                        }
                        if (item.type == 3) {
                            item.typeName = '第三方销售';
                            thirdData.push(item);
                        }
                    }
                }
                bankData.push({
                    type: '1',
                    code: '',
                    name: '合计',
                    dataList: dataList['银行'] ? fundids.map(fundid => dataList['银行'][fundid]) : [],
                    typeName: '银行'
                });
                bankData[bankData.length - 1].dataList.push(dataList['银行']['合计']);
                thirdData.push({
                    type: '3',
                    code: '',
                    name: '合计',
                    dataList: dataList['第三方销售'] ? fundids.map(fundid => dataList['第三方销售'][fundid]) : [],
                    typeName: '第三方销售'
                });
                thirdData[thirdData.length - 1].dataList.push(dataList['第三方销售']['合计']);
                tableData = tableData.concat(bankData, thirdData);
                res.send({error: 0, msg: '数据获取成功', data: {thData, tableData}});
                // res.send({ error: 0, msg: '数据获取成功', data: result.data});
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
    // 查询
    app.post('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/search.ajax', (req, res, next) => {
        let option = {
            session: req.session,
            url: apiUrlList.trailingDetails.list,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        var searchCode = req.body.branchcode;

        console.log(option.url);
        console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/search.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/search.ajax body:', body);
            if (error) {
                return res.send({error: 1, msg: '数据获取失败'});
            }
            // console.log("------------------------------------------" + searchCode);
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == "0000") {
                let tableData = [];  // 存放内容的数据
                let thData = result.data[0];//存放头部数据
                let fundids = thData.map(item => item.fundid);
                let bankData = [];   // 存放银行数据
                let thirdData = [];  // 存放第三方数据
                let dataInfo = result.data[1];
                let dataList = result.data[2];
                let dataType=result.data[3];

                for (let prop in dataInfo) {
                    if (dataType[prop]) {
                        let item = {
                            type: dataType[prop],
                            code: prop,
                            name: dataInfo[prop],
                            dataList: dataList[prop] ? fundids.map(fundid => dataList[prop][fundid]) : []
                        };
                        if(dataList[prop]&&dataList[prop]["合计"]){
                            item.dataList.push(dataList[prop]['合计']);
                        }
                        // item.dataList.push(dataList[prop]['合计']);
                        if (item.type == 1&&item.code==searchCode) {
                            item.typeName = '银行';
                            bankData.push(item);
                        }
                        if (item.type == 3&&item.code==searchCode) {
                            item.typeName = '第三方销售';
                            thirdData.push(item);
                        }
                    }
                }
                if(dataList['银行']){
                    bankData.push({
                        type: '1',
                        code: '',
                        name: '合计',
                        dataList: dataList['银行'] ? fundids.map(fundid => dataList['银行'][fundid]) : [],
                        typeName: '银行'
                    });
                    bankData[bankData.length - 1].dataList.push(dataList['银行']['合计']);
                }
                if(dataList['第三方销售']){
                    thirdData.push({
                        type: '3',
                        code: '',
                        name: '合计',
                        dataList: dataList['第三方销售'] ? fundids.map(fundid => dataList['第三方销售'][fundid]) : [],
                        typeName: '第三方销售'
                    });
                    thirdData[thirdData.length - 1].dataList.push(dataList['第三方销售']['合计']);
                }

                tableData = tableData.concat(bankData, thirdData);
                res.send({error: 0, msg: '数据获取成功', data: {thData, tableData}});
                // res.send({ error: 0, msg: '数据获取成功', data: result.data});
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
    //下载
    app.get('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/downloads.ajax', (req, res, next) => {
        var url='';
        if(!req.query.branchcode){
            url=`${apiUrlList.trailingDetails.downloads}?ymonth=${req.query.ymonth}`
        }else{
            url=`${apiUrlList.trailingDetails.downloads}?ymonth=${req.query.ymonth}&&branchcode=${req.query.branchcode}`
        }
        let option = {
            session: req.session,
            url: url,
            timeout: 30000,
            json: true
        };

        console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/downloads.ajax option:', option);
        request(option).pipe(res);
    });
    //对比无误
    app.post('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/checkData.ajax', (req, res, next) => {

        let option = {
            session: req.session,
            url: apiUrlList.trailingDetails.checkData,
            qs:req.query,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/checkData.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/checkData.ajax error:', error);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/checkData.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/expenseMgmt/trailingSum~feedbackSum/checkData.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({
                    error: 1,
                    msg: '数据获取失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode == '0000') {
                res.send({
                    error: 0,
                    msg: result.responseMessage,
                    data: result.data
                });
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