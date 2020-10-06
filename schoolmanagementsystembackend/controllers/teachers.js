const teachersRouter = require('express').Router()

const odbc = require('odbc');

teachersRouter.get('/', async (req, res) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const connection = await odbc.connect(connectionConfig);
	const result = await connection.query('SELECT * FROM teacher');
	res.send(JSON.stringify(result));
})

teachersRouter.post('/', async(req, res) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const teacher = req.body;
	console.log(teacher);
	try {
		const connection = await odbc.connect(connectionConfig);
		await connection.query(`INSERT INTO teacher VALUES('${teacher.teacher_id}', '${teacher.name}', '${teacher.department}')`);
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

teachersRouter.delete('/:id', async (request, response) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	console.log(request.params.id)
	const connection = await odbc.connect(connectionConfig);
	try {
		const id = request.params.id;
		await connection.query(`DELETE FROM teacher WHERE teacher_id='${id}';`);
		const result = await connection.query(`SELECT ROW_COUNT()`);
		console.log("result.count",result.count)
		if (result.count === 1) {
			response.status(204).end();
		}
		else {
			response.status(404).send({ error:`${result}`});
		}
	}
	catch(err) {
		response.status(404).send({ error:`${err}`})
	}
})

teachersRouter.put('/:id', async(request, response) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const connection = await odbc.connect(connectionConfig);
	try {
		const teacher = request.body;
		const id = request.params.id;
		console.log('updateteacher',teacher);
		console.log('id',id);
		await connection.query
			(`UPDATE teacher
				SET teacher_id='${teacher.teacher_id}', name='${teacher.name}', department='${teacher.department}'
				WHERE teacher_id='${id}';`
			);
		const result = await connection.query(`SELECT ROW_COUNT()`);
		console.log(result.count);
		if (result.count === 1) {
			response.status(204).end();
		}
		else {
			response.status(404).send({ error:`${result}`});
		}
	}
	catch(err) {
		response.status(404).send({ error:`${err}`})
	}
})

module.exports = teachersRouter
