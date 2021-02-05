// var mongodb = require('mongodb');
// var MongoClient = mongodb.MongoClient;
// var url = 'mongodb://localhost:27017';
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog_something', {useNewUrlParser: true, useNewUrlParser: true,  useUnifiedTopology: true});
var db = mongoose.connection;
//Bắt sự kiện error
db.on('error', function(err) {
  if (err) console.log(err)
});
//Bắt sự kiện open
db.once('open', function() {
  console.log("Kết nối thành công !");
});
// module.exports = {
//     connectDb: function () {
//         MongoClient.connect(url, function (err, client) {
//             if (err) {
//                 console.log('Unable to connect to the mongoDB server. Error:', err);
//             } else {
//                 console.log('Connection established to', url);
//                 var db = client.db('blog_something');
        
//                 var collection = db.collection('blog');
        
//                 var user1 = { name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user'] };
//                 var user2 = { name: 'modulus user', age: 22, roles: ['user'] };
//                 var user3 = { name: 'modulus super admin', age: 92, roles: ['super-admin', 'admin', 'moderator', 'user'] };
        
//                 collection.insert([user1, user2, user3], function (err, result) {
//                     if (err) {
//                         console.log(err);
//                     } else {
//                         console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
//                     }
//                     client.close();
//                 });
//             }
//         });
//     }
// }

