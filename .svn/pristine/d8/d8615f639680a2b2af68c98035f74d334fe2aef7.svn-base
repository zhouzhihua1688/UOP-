
const request = require('request')

// let url1 = 'http://10.50.115.187:8085/uaa/user/list'
let url1 = 'https://www.baidu.com'

request(url1, (req, res, body)=>{
	console.log('body=', body);
})

let url2 = 'http://10.50.115.187:8085/uaa/user/login'

request.post({ url: url2, json:{"loginName":"admin", "passWord":"test"}}, (req, res, body)=>{
	console.log('body=', body);
})
