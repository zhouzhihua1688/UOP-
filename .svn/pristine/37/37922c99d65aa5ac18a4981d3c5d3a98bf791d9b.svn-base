const request = require('../../../local_data/requestWrapper');
const apiUrlList = require('../apiConfig').products;
module.exports = function (app) {
    //查询 
    app.get('/thirdPartyOperation/products/library/search.ajax', (req, res, next) => {
        
        let params = {};
      
        if (req.query.fundid) {
            params.fundid= req.query.fundid;
        } 
        if (req.query.fundnm) {
            params.fundnm = req.query.fundnm;
        }
        if (req.query.tano) {
            params.tano= req.query.tano;
        } 
        let option = {
            session:req.session,
            url: apiUrlList.library.search,
            qs: params,
            timeout: 15000,
            json: true
        };
        console.log('/thirdPartyOperation/products/library/search.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/library/search.ajax error:', error);
            console.log('/thirdPartyOperation/products/library/search.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/library/search.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({ 
                	error: 1,
                	msg: '数据获取失败' 
                	});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
            if (result && result.responseCode === '0000') {
                res.send({
                	error: 0, 
                	msg: '数据获取成功', 
                	data:result.data 
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
    //刷新产品列表
    app.get('/thirdPartyOperation/products/library/refreshProduct.ajax', (req, res, next) => {
         let params = {};
         if (req.query.taskDate) {
            params.taskDate= req.query.taskDate;
        } 
         console.log((params))
       
        let option = {
            session:req.session,
            url: apiUrlList.library.refreshProduct,
            qs:params,
            timeout: 150000,
            json: true
        };
        console.log('/thirdPartyOperation/products/library/refreshProduct.ajax option:', option);
        request(option, (error, response, body) => {
            console.log('/thirdPartyOperation/products/library/refreshProduct.ajax error:', error);
            console.log('/thirdPartyOperation/products/library/refreshProduct.ajax statusCode:', response && response.statusCode);
            console.log('/thirdPartyOperation/products/library/refreshProduct.ajax body:', body);
            // return res.send(body);
            if (error) {
                return res.send({ 
                	error: 1,
                	msg: '数据获取失败' 
                	});
            }
            let result = typeof body === 'string' ? JSON.parse(body) : body;
           
            if (result && result.responseCode === '0000') {
                res.send({
                	error: 0, 
                	msg: '数据获取成功', 
                    data:result.data 
                    
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
      //刷新净值
      app.get('/thirdPartyOperation/products/library/refreshValue.ajax', (req, res, next) => {
          let params = {};
          let option = {
              session:req.session,
              url: apiUrlList.library.refreshValue,
              qs:params,
              timeout: 15000,
              json: true
          };
          console.log('/thirdPartyOperation/products/library/refreshValue.ajax option:', option);
          request(option, (error, response, body) => {
              console.log('/thirdPartyOperation/products/library/refreshValue.ajax error:', error);
              console.log('/thirdPartyOperation/products/library/refreshValue.ajax statusCode:', response && response.statusCode);
              console.log('/thirdPartyOperation/products/library/refreshValue.ajax body:', body);
              // return res.send(body);
              if (error) {
                  return res.send({ 
                      error: 1,
                      msg: '数据获取失败' 
                      });
              }
              let result = typeof body === 'string' ? JSON.parse(body) : body;
             
              if (result && result.responseCode === '0000') {
                  res.send({
                      error: 0, 
                      msg: '数据获取成功', 
                      data:result.data 
                      
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