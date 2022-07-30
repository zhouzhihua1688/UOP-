
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

let req = {}
req.body = {};

req.body.nd = '1535455667173';
req.body._search='false';
req.body.nd='1535457739931';
req.body.rows='10';
req.body.page='1';
req.body.sidx='companyId';
req.body.sord='asc';
req.body.searchField='';
req.body.districtCodeSearch = '022';
params = req.body
console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax params:', params);


let option = {
    // url: apiUrlList.list,
    url: 'http://10.50.115.163:8040/company/list',
    timeout: 15000,
    json: true,
    formData: params
};
console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax option:', option);
request.post(option, (error, response, body) => {
    console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax error:', error);
    console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax statusCode:', response && response.statusCode);
    console.log('/cashMgmt/livingPay/companyMgmt/getList.ajax body:', body);
    // if (error) {
    //     next();
    //     return;
    // }
    // let result = typeof body === 'string' ? JSON.parse(body) : body;
    // console.log(result);
    // if (response.statusCode==200) {
    //     // res.send({error: 0, msg: '获取成功', result});
    //     res.send(result);
    // }
    // else {
    //     res.send({error: 1, msg: '获取失败'});
    // }
});