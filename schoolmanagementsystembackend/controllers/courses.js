const coursesRouter = require('express').Router()

const odbc = require('odbc');

coursesRouter.get('/', async (req, res) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const connection = await odbc.connect(connectionConfig);
	const result = await connection.query('SELECT * FROM course');
	res.send(JSON.stringify(result));
})

coursesRouter.post('/', async(request, response) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const course = request.body;
	console.log(course);
	try {
		const connection = await odbc.connect(connectionConfig);
		await connection.query(`INSERT INTO course VALUES('${course.course_id}', '${course.name}', '${course.teacher_id}')`);
		const result = await connection.query(`SELECT ROW_COUNT()`);
		if (result.count === 1) {
			response.status(204).end();
		}
		else {
			console.log("error result", result)
			response.status(404).json({error: `${JSON.stringify(result)}`});
		}
	}
	catch(err) {
		console.log("error", err.odbcErrors)
		response.status(404).json({error: `${JSON.stringify(err.odbcErrors)}`});
	}
})

coursesRouter.delete('/:coid/:tcid', async (request, response) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const connection = await odbc.connect(connectionConfig);
	try {
		console.log(request.params);
		const course_id = request.params.coid;
		const teacher_id = request.params.tcid;
		console.log('courseid', course_id);
		console.log('teacherid', teacher_id);
		await connection.query(`DELETE FROM course WHERE course_id='${course_id}' AND teacher_id='${teacher_id}';`);
		const result = await connection.query(`SELECT ROW_COUNT()`);
		console.log("result.count",result.count)
		if (result.count === 1) {
			response.status(204).end();
		}
		else {
			console.log('delete error', err);
			response.status(404).json({error: `${JSON.stringify(result)}`});
		}
	}
	catch(err) {
		console.log('delete error', err);
		response.status(404).json({error: `${JSON.stringify(err)}`});
	}
})

coursesRouter.put('/:coid/:tcid', async(request, response) => {
	const connectionConfig = {
		connectionString: process.env.ODBC_CONNECTION_STRING,
	};
	const connection = await odbc.connect(connectionConfig);
	try {
		const course = request.body;
		const oriCourseId = request.params.coid;
		const oriTeacherId = request.params.tcid;
		console.log('updateCourse',course);
		console.log('id',oriCourseId, oriTeacherId);
		await connection.query
			(`UPDATE course
				SET course_id='${course.course_id}', name='${course.name}', teacher_id='${course.teacher_id}'
				WHERE course_id='${oriCourseId}' AND teacher_id='${oriTeacherId}';`
			);
		const result = await connection.query(`SELECT ROW_COUNT()`);
		console.log(result.count);
		if (result.count === 1) {
			response.status(204).end();
		}
		else {
			response.status(404).json({error: `${JSON.stringify(result)}`});
		}
	}
	catch(err) {
		response.status(404).json({error: `${JSON.stringify(err)}`});
	}
})

module.exports = coursesRouter
