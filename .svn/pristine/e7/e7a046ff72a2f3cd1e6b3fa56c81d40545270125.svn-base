
const Redis = require('ioredis');
// const redis = new Redis();
// const redis = new Redis(6379, '192.168.1.1')

// redis.set('foo', 'bar');
// redis.get('foo', function (err, result) {
//   console.log(result);
// });

// // Or using a promise if the last argument isn't a function
// redis.get('foo').then(function (result) {
//   console.log(result);
// });

// // Arguments to commands are flattened, so the following are the same:
// redis.sadd('set', 1, 3, 5, 7);
// redis.sadd('set', [1, 3, 5, 7]);

// // All arguments are passed directly to the redis server:
// redis.set('key', 100, 'EX', 10);


const cluster = new Redis.Cluster([{
	port: 7000,
	host: '10.50.115.71'
}, {
	port: 7001,
	host: '10.50.115.71'
}, {
	port: 7003,
	host: '10.50.115.72'
}, {
	port: 7004,
	host: '10.50.115.72'
}, {
	port: 7005,
	host: '10.50.115.73'
}, {
	port: 7006,
	host: '10.50.115.73'
}]);

// cluster.set('uop:sess:foo2', 'test');
// sss = cluster.get('uop:sess:CN-AliKRS8GVNW8upVS1xN1LsFqf-vmw', function (err, res) {
// 	// res === 'bar'
// 	console.log('res=', res);
// });
// console.log(sss);
// return 
cluster.keys('uop*', function (err, keys) {
	console.log('keys=', keys);
	// for (var i = 0; i < keys.length; i++) {
	// 	let key = keys[i]
	// 	cluster.get(key, function (err, value) {
	// 		console.log(key + ':', value);
	// 	});
	// }

	// Promise.all(keys.map(function (key) {
	// 	return cluster.get(key, function (err, value) {
	// 		console.log(key + ':', value);
	// 	});
	// })).then(function (err, data) {
	// 	console.log('then err=', err);
	// 	console.log('then data=', data);
	// });

	// // console.log(cluster.quit());
	// // console.log(cluster.disconnect());
	// cluster.quit(function (err, data) {
	// 	console.log('err=', err);
	// 	console.log('data=', data);
	// })
});



