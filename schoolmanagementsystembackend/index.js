require('dotenv').config()
const express = require('express')
const app = express()
const odbc = require('odbc');
const connectionConfig = {
	connectionString: process.env.ODBC_CONNECTION_STRING,
};

app.use(express.json())

async function GetStudentDB() {
	const connection = await odbc.connect(connectionConfig);
	const result = await connection.query('SELECT * FROM student');
	console.log(JSON.stringify(result));
	return JSON.stringify(result);
}
async function InsertStudentDB(student) {
	const connection = await odbc.connect(connectionConfig);
	console.log(student)
	try {	
		const result = await connection.query(`INSERT INTO student VALUES(${student.student_id}, '${student.name}', ${student.class_id})`);
		console.log(JSON.stringify(result));
		return JSON.stringify(result);
	}
	catch(err) {
		console.log(err)
	}
}

app.get('/api/students', async (req, res) => {
	const result = await GetStudentDB();
	res.send(result);
})

app.post('/api/students', async(req, res) => {
	const body = req.body;
	// console.log(body)
	const result = await InsertStudentDB(body);
	res.send(result);
})

const PORT = 3001;
app.listen(PORT, () => {
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