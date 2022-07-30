
const request = require('request')

// let params = {};
// params.nd = '1535455667173';
// params._search='false';
// params.nd='1535457739931';
// params.rows='10';
// params.page='1';
// params.sidx='companyId';
// params.sord='asc';
// params.searchField='';
// params.districtCodeSearch = '022';
// console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax params:', params);



let option= { 
    headers: { Authorization: 'Basic dW9wOjEyMzQ1Ng==' },
  // url: 'http://10.50.115.163:8037/inner-uaa/v1/oauth/token',
  // url: 'http://10.50.110.182:8089/inner-uaa/v1/oauth/token',
  url: 'http://10.50.115.125:8089/inner-uaa/v1/oauth/token',
  form:
   { grant_type: 'password',
     scope: 'all',
     loginName: 'admin',
     password: 'admin' },
  timeout: 15000 }


request.post(option, (error, response, body) => {
    console.log('test_token error:', error);
    console.log('test_token statusCode:', response && response.statusCode);
    var result = JSON.parse(body);
    result.loginUserDto = undefined
    console.log('test_token result:', result);
    // if (error) {
    //     next();
    //     return;
    // }
    // let result = typeof result === 'string' ? JSON.parse(result) : result;
    // console.log(result);
    // if (response.statusCode==200) {
    //     // res.send({error: 0, msg: '获取成功', result});
    //     res.send(result);
    // }
    // else {
    //     res.send({error: 1, msg: '获取失败'});
    // }
});
return

let req = {};
// req.session = {result};
req.session = {};
req.session['access_token'] = 'fa10ce8d-bf2a-4e48-9b28-1ef415fbc1cc';

let option2 = {
    headers: {
        'Authorization': req.session['access_token'],
    },
    // url: apiUrlList.roleUrl,
    url: 'http://10.50.115.125:8089/inner-uaa/v1/role',
    json: true,
    timeout: 15000
};

request.get(option2, (error2, response2, body2) => {
    console.log('test_token error2:', error2);
    console.log('test_token statusCode2:', response2 && response2.statusCode);
    console.log('test_token body2:', body2);
    // let result2 = JSON.parse(body2);
    let result = typeof body2 == 'string' ? JSON.parse(body2) : body2;
})