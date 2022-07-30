


var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '123456789',
//   database : 'uop'
// });
var connection = mysql.createConnection({
  host     : '10.50.115.115',
  user     : 'uop',
  password : 'Uop@201903_',
  database : 'uop'
});


var CURRENT_TIMESTAMP = mysql.raw('CURRENT_TIMESTAMP()');

// connection.connect();

// connection.connect(function(err) {
//   if (err) {
//     console.error('error connecting: ' + err.stack);
//     return;
//   }

//   console.log('connected as id ' + connection.threadId);
// });
// var connection = mysql.createConnection('mysql://user:pass@host/db?debug=true&charset=BIG5_CHINESE_CI&timezone=-0700');


// connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
//   if (error) throw error;
//   console.log('error=', error);
//   console.log('results=', results);
//   console.log('fields=', fields);
//   console.log('The solution is: ', results[0].solution);
// });


// connection.query('show tables', function (error, results, fields) {
//   if (error) throw error;
//   console.log('error=', error);
//   console.log('results=', results);
//   console.log('fields=', fields);
// });

// // connection.destroy();
// // connection.end();
// connection.end(function(err) {
//   if (err) {
//     console.error('error connection end: ' + err.stack);
//     return;
//   }
//   console.log('connection end failed, id= ' + connection.threadId);
// });

console.log(Object.assign({ connectionLimit: 10}, connection));
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});

connection.query('select t.content from ticket t, operation op where op.ticket_id = t.id and t.type="基金限额"; ', function (error, results, fields) {
  if (error) throw error;
  console.log('error=', error);
  console.log('results=', results);
  console.log('fields=', fields);
});


// var sql = `
// UPDATE uop.ticket op SET op.status = ?, op.update_timestamp = now(),
// op.content = '{
//         "id": ?,
//         "startTimeStr": null,
//         "endTimeStr": null,
//         "remark": "g",
//         "custNo": "*",
//         "custType": "s",
//         "product": "g",
//         "branchCode": "1",
//         "channel": "1",
//         "apkind": "1",
//         "bankNo": "1",
//         "displayDiscount": 0,
//         "tradeDiscount": 0
//       }'
// WHERE op.id = ?;
// `
// var sqlParam = [4, 433, 2]

// connection.query(sql, sqlParam, function (error, results, fields) {
//   if (error) throw error;
//   console.log('error=', error);
//   console.log('results=', results);
//   console.log('fields=', fields);
// });


// var content = `{
//         "id": 4332,
//         "startTimeStr": null,
//         "endTimeStr": null,
//         "remark": "g",
//         "custNo": "*",
//         "custType": "s",
//         "product": "g",
//         "branchCode": "1",
//         "channel": "1",
//         "apkind": "1",
//         "bankNo": "1",
//         "displayDiscount": 0,
//         "tradeDiscount": 0
//       }`;

// connection.query('insert into ticket set ?', {content: content, status: 5}, function (error, results, fields) {
//   if (error) throw error;
//   console.log('error=', error);
//   console.log('results=', results);
//   console.log('fields=', fields);
// });

// connection.end(function(err) {
//   if (err) {
//     console.error('error connection end: ' + err.stack);
//     return;
//   }
//   console.log('connection end, id= ' + connection.threadId);
// });