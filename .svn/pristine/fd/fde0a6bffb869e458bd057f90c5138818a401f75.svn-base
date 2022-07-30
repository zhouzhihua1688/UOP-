const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').blackListMgmt.amlMgmt;
module.exports = function (app) {
    // 获取  初始数据和查询
    app.post('/messageCenter/blackListMgmt/amlMgmt/getTableData.ajax', (req, res, next) => {
        // 获取初始数据表
        let getTableData=new Promise((resolve, reject) => {
                let params = req.body;
                params.pageNo = parseInt(params.pageNo);
                params.pageSize = parseInt(params.pageSize);
                let option = {
                    // pageUrl: '/messageCenter/blackListMgmt/amlMgmt/getTableData.ajax',
                    req: req,
                    url: apiUrlList.getTableData,
                    body: params,
                    timeout: 15000,
                    json: true
                };
                console.log(`/messageCenter/blackListMgmt/amlMgmt/getTableData.ajax option:`, option.req ? {...option, req: '#'} : option);
                request.post(option, (error, response, body) => {
                    console.log(`/messageCenter/blackListMgmt/amlMgmt/getTableData.ajax error:`, error);
                    console.log(`/messageCenter/blackListMgmt/amlMgmt/getTableData.ajax statusCode:`, response && response.statusCode);
                    console.log(`/messageCenter/blackListMgmt/amlMgmt/getTableData.ajax body: ******`);
                    if (error) {
                        reject({
                            message: '数据获取失败'
                        });
                    }
                    if (body && body.returnCode == 0) {
                        let data = body.body;
                        data.pages = Math.ceil(data.total / params.pageSize); //最大页码
                        data.pageNum = params.pageNo; //当前页
                        data.amlBlacks.forEach(function (item) {  
                            item.fundAcct='';
                        })
                        resolve(data);
                    } else if (body && body.returnCode != 0 && body.returnCode != 9999) {
                        reject({
                            message: body.returnMsg
                        });
                    } else {
                        reject({
                            message: '数据获取失败'
                        });
                    }
                });
            });
        

        //获取客户基金账号
        function getUserfundAcctByCustNo(item) {
            return new Promise((resolve, reject) => {
                let option = {
                    pageUrl: '/messageCenter/blackListMgmt/amlMgmt/getUserfundAcctByCustNo.ajax',
                    req: req,
                    url: apiUrlList.queryFundAccts,
                    qs: {
                        custNo: item.custNo
                    },
                    timeout: 15000,
                    json: true
                };
                request(option, (error, response, body) => {
                    if (error) {
                        resolve(false);
                    }
                    if (body && body.returnCode == 0) {
                        var str='';
                        if(body.body&&Array.isArray(body.body)){
                            body.body.forEach(function(item){
                                str+=item.fundAcct+'|';
                            })
                            item.fundAcct = str.substring(0,str.length-1);
                        }
                        // console.log('234234',item); 
                        resolve();
                    } else {
                        resolve(false);
                    }
                });
            });
        }

        getTableData.then((resultArr) => {
            Promise.all(resultArr.amlBlacks.map(item => 
                getUserfundAcctByCustNo(item)
            )).then(() => {
                res.send({
                    error: 0,
                    msg: '请求成功',
                    data: resultArr
                });
            }).catch(error => {
                res.send({
                    error: 0,
                    msg: "请求成功",
                    data: resultArr
                });
            });
          
        }).catch((error) => {
            res.send({
                error: 1,
                msg: error.message,
                data: null
            });
        });

    });

    //删除数据
    app.post('/messageCenter/blackListMgmt/amlMgmt/deleteParam.ajax', (req, res, next) => {
        let option = {
            pageUrl: '/messageCenter/blackListMgmt/amlMgmt/deleteParam.ajax',
            req: req,
            operateType: 3, // operateType:操作类型 0:登录 1:新增 2:修改 3:删除 4:修改密码
            url: apiUrlList.deleteParam,
            qs: req.body,
            timeout: 15000,
            json: true
        };
        request.delete(option, (error, response, body) => {
            if (error) {
                return res.send({
                    error: 1,
                    msg: '解除失败'
                });
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.returnCode == 0) {
                return res.send({
                    error: 0,
                    msg: '解除成功'
                });
            } else if (result && result.returnCode != 9999) {
                return res.send({
                    error: 1,
                    msg: result.msg
                });
            } else {
                return res.send({
                    error: 1,
                    msg: '解除失败'
                });
            }
        });
    });
};