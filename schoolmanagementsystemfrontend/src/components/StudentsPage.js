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
		try {
			await studentsService.create(studentObj);
			setStudents(students.concat(studentObj));
		}
		catch(err) {
			console.log(err.response)
			console.log("insert failed", err.response.data.error);
			const error = JSON.parse(err.response.data.error);
			console.log(error);
			const message = error[0].message;
			console.log(message);
			window.alert(`insert failed\nError: ${message}`);
		}
		
	}
	const handleDeleteStudent = async(student_id) => {
		try {
			await studentsService.remove(student_id);
			const newStudentTable = await students.filter(student => {
				return student.student_id !== student_id;
			});
			setStudents(newStudentTable);
		}
		catch(err) {
			const error = JSON.parse(err.response.data.error);
			const message = error[0].message;
			window.alert(`delete failed\nError: ${message}`);
		}
	}
	const handleUpdateStudent = async(oriStudentId, studentObj) => {
		try {
			console.log('studentObj', studentObj);
			await studentsService.update(oriStudentId, studentObj);
			const newStudentTable = await students.map(student => {
				return student.student_id !== oriStudentId ? student : studentObj;
			});
			console.log('newStudentTable',newStudentTable);
			setStudents(newStudentTable);
			return true;
		}
		catch(err) {
			console.log("update failed", err.response.data.error);
			const error = JSON.parse(err.response.data.error);
			const message = error[0].message;
			window.alert(`update failed\nError: ${message}`);
			return false;
		}
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
				<StudentTable students={students} handleDeleteStudent={handleDeleteStudent} handleUpdateStudent={handleUpdateStudent}/>
			</div>
		</div>
	);
}

export default StudentsPage;