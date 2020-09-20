import React, {useEffect, useRef} from 'react';
import Togglable from './Togglable';
import studentsService from '../services/students'
import StudentTable from './StudentTable'
import StudentForm from './StudentForm';

const StudentsPage = (props) => {
	const students = props.students;
	const setStudents = props.setStudents;
	const handleReturnHomePage = props.handleReturnHomePage;
	const togglableRef = useRef()

	useEffect(() => {
		async function fetchdata(){ 
			const fetchedStudent = await studentsService.getAll();
			setStudents(fetchedStudent);
		}
		fetchdata();
	}, [])

	const handleInsertStudent = async(studentObj) => {
		const newstudent = await studentsService.create(studentObj);
		// setStudents(students.concat(newstudent));
	}

	return (
		<div>
			<div className='title'>
				<h2>Students Information</h2>
			</div>
			<div>
				<Togglable ref={togglableRef} buttonLabel='Insert Student' type='studentform'>
					<StudentForm handleInsertStudent={handleInsertStudent} togglableRef={togglableRef} />
				</Togglable>
			</div>
			<div>
				<button onClick={() => handleReturnHomePage()} >return</button>
			</div>
			<div>
				<StudentTable students={students} />
			</div>
		</div>
	);
}

export default StudentsPage;