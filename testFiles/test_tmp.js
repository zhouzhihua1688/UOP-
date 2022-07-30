

const request = require('request')


console.log(request);

// request.get = function (argument) {
// 	console.log(1111);
// }

// request.get()

// function request (uri, options, callback) {
//   if (typeof uri === 'undefined') {
//     throw new Error('undefined is not a valid uri or options object.')
//   }

//   var params = initParams(uri, options, callback)

//   if (params.method === 'HEAD' && paramsHaveRequestBody(params)) {
//     throw new Error('HTTP HEAD requests MUST NOT include a request body.')
//   }

//   return new request.Request(params)
// }


// let uri = 'https://www.baidu.com';
// let options = {}
// callback = function (error, response, body) {
// 	console.log('error=', error);
// 	console.log('response.statusCode=', response.statusCode);
// 	console.log('body=', body.slice(0,100));
// }
// request(uri, options, callback)

// return
let options = {
    headers: {
        'Authorization': 'fa10ce8d-bf2a-4e48-9b28-1ef415fbc1cc',
    },
    url: 'http://10.50.115.125:8089/inner-uaa/v1/role',
    json: true,
    timeout: 15000
};


let requestWrapper = function (uri, options, callback) {

  	// request(uri, options, callback)
  	request(uri, options, (error, response, body)=>{
  		console.log('test_tmp error:', error);
	    console.log('test_tmp statusCode:', response && response.statusCode);
	    console.log('test_tmp body:', body);
	    // let result = JSON.parse(body);
	    let result = typeof body == 'string' ? JSON.parse(body) : body;
  	})
}

requestWrapper.get = request.get
requestWrapper.post = request.post

requestWrapper.post(options, (error2, response2, body2) => {
    console.log('test_token error2:', error2);
    console.log('test_token statusCode2:', response2 && response2.statusCode);
    console.log('test_token body2:', body2);
    // let result2 = JSON.parse(body2);
    let result = typeof body2 == 'string' ? JSON.parse(body2) : body2;
})


// for(var p in request) {
// 	console.log(p);
// 	requestWrapper[p] = request[p]
// }
