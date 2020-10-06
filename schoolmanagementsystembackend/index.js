const app = require('./app') // the actual Express application
const http = require('http')
require('dotenv').config()


const server = http.createServer(app)
const PORT = 3001;
server.listen(PORT, () => {
  	console.log(`Server running on port ${PORT}`);
})

// db.open(cn, function (err) {
//   if (err) return console.log(err);
  
//   db.query('select * from student', [42], function (err, data) {
//     if (err) console.log(err);
    
//     console.log(data);

//     db.close(function () {
//       console.log('done');
//     });
//   });
// });