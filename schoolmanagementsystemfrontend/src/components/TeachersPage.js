import React, {useEffect, useRef} from 'react';
import Togglable from './Togglable';
import teachersService from '../services/teachers'
import TeacherForm from './TeachersForm';
import TeacherTable from './TeachersTable';

const TeachersPage = (props) => {
	const teachers = props.teachers;
	const setTeachers = props.setTeachers;
	const handleReturnHomePage = props.handleReturnHomePage;
	const togglableRef = useRef()

	useEffect(() => {
		async function fetchdata(){ 
			const fetchedTeacher = await teachersService.getAll();
			setTeachers(fetchedTeacher);
		}
		fetchdata();
	}, [])

	const handleInsertTeacher = async(teacherObj) => {
		try {
			await teachersService.create(teacherObj);
			setTeachers(teachers.concat(teacherObj));
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
	const handleDeleteTeacher = async(teacher_id) => {
		try {
			await teachersService.remove(teacher_id);
			const newTeacherTable = await teachers.filter(teacher => {
				return teacher.teacher_id !== teacher_id;
			});
			setTeachers(newTeacherTable);
		}
		catch(err) {
			console.log("delete failed", err.response.data.error);
			window.alert(`delete failed\nError: ${err.response.data.error}`)
		}
	}
	const handleUpdateTeacher = async(oriTeacherId, teacherObj) => {
		try {
			console.log('teacherObj', teacherObj);
			await teachersService.update(oriTeacherId, teacherObj);
			const newTeacherTable = await teachers.map(teacher => {
				return teacher.teacher_id !== oriTeacherId ? teacher : teacherObj;
			});
			console.log('newTeacherTable',newTeacherTable);
			setTeachers(newTeacherTable);
			return true;
		}
		catch(err) {
			console.log("update failed", err.response);
			window.alert(`update failed\nError: ${err.response.data.error}`);
			return false;
		}
	}

	return (
		<div>
			<div className='title'>
				<h2>Teachers Information</h2>
			</div>
			<div>
				<Togglable ref={togglableRef} buttonLabel='Insert Teacher' type='teacherform'>
					<TeacherForm handleInsertTeacher={handleInsertTeacher} togglableRef={togglableRef} />
				</Togglable>
			</div>
			<div>
				<button onClick={() => handleReturnHomePage()} >return</button>
			</div>
			<div>
				<TeacherTable teachers={teachers}
					handleDeleteTeacher={handleDeleteTeacher}
					handleUpdateTeacher={handleUpdateTeacher}/>
			</div>
		</div>
	);
}

export default TeachersPage;