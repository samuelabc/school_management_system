const studentsRouter = require('express').Router()
const odbc = require('odbc');

async function GetStudentDB() {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const connection = await odbc.connect(connectionConfig);
	const result = await connection.query('SELECT * FROM student');
	console.log(JSON.stringify(result));
	return JSON.stringify(result);
}
studentsRouter.get('/', async (req, res) => {
	const result = await GetStudentDB();
	res.send(result);
})

studentsRouter.post('/', async(req, res) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const student = req.body;
	try {
		const connection = await odbc.connect(connectionConfig);
		var queryStr = 'INSERT INTO student VALUES(';
		if (student.student_id === '') {
			queryStr += ('NULL,');
		}
		else {
			queryStr += (`'${student.student_id}',`);
		}
		if (student.name === '') {
			queryStr += ('NULL,');
		}
		else {
			queryStr += (`'${student.name}',`);
		} 
		if (student.class_id === '') {
			queryStr += ('NULL');
		}
		else {
			queryStr += (`'${student.class_id}'`);
		} 
		queryStr += (')')
		console.log(queryStr);
		// await connection.query(`INSERT INTO student VALUES('${student.student_id}', '${student.name}', '${student.class_id}')`);
		await connection.query(queryStr);
		const result = await connection.query(`SELECT ROW_COUNT()`);
		if (result.count === 1) {
			res.status(204).end();
		}
		else {
			console.log("error result", result)
			res.status(404).json({error: `${JSON.stringify(result)}`});
		}
	}
	catch(err) {
		console.log("error", err.odbcErrors)
		res.status(404).json({error: `${JSON.stringify(err.odbcErrors)}`});
	}
})

studentsRouter.delete('/:id', async (request, response) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	console.log(request.params.id)
	const connection = await odbc.connect(connectionConfig);
	try {
		const id = request.params.id;
		await connection.query(`DELETE FROM student WHERE student_id='${id}';`);
		const result = await connection.query(`SELECT ROW_COUNT()`);
		console.log("result.count",result.count)
		if (result.count === 1) {
			response.status(204).end();
		}
		else {
			response.status(404).json({error: `${JSON.stringify(result)}`});
		}
	}
	catch(err) {
		response.status(404).json({error: `${JSON.stringify(err.odbcErrors)}`});
	}
})

studentsRouter.put('/:id', async(request, response) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const connection = await odbc.connect(connectionConfig);
	try {
		const student = request.body;
		const id = request.params.id;
		console.log('updatestudent',student);
		console.log('id',id);
		var queryStr = 'UPDATE student SET ';
		if (student.student_id === '') {
			queryStr += ('student_id=NULL, ');
		}
		else {
			queryStr += (`student_id='${student.student_id}',`);
		}
		if (student.name === '') {
			queryStr += ('name=NULL, ');
		}
		else {
			queryStr += (`name='${student.name}',`);
		} 
		if (student.class_id === '') {
			queryStr += ('class_id=NULL ');
		}
		else {
			queryStr += (`class_id='${student.class_id}' `);
		} 
		queryStr += (`WHERE student_id='${id}';`)
		console.log(queryStr);
		await connection.query(queryStr);
		// await connection.query
		// 	(`UPDATE student
		// 		SET student_id='${student.student_id}', name='${student.name}', class_id='${student.class_id}'
		// 		WHERE student_id='${id}';`
		// 	);
		const result = await connection.query(`SELECT ROW_COUNT()`);
		console.log(result.count);
		if (result.count === 1) {
			response.status(204).end();
		}
		else {
			// response.status(404).send({ error:`${result}`});
			response.status(404).json({error: `${JSON.stringify(result)}`});
		}
	}
	catch(err) {
		// response.status(404).send({ error:`${err}`})
		response.status(404).json({error: `${JSON.stringify(err.odbcErrors)}`});
	}
})

module.exports = studentsRouter