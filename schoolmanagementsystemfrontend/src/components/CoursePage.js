import React, {useEffect, useRef} from 'react';
import Togglable from './Togglable';
import courseService from '../services/courses'
import CourseTable from './CourseTable'
import CourseForm from './CourseForm';

const CoursePage = (props) => {
	const courses = props.courses;
	const setCourses = props.setCourses;
	const handleReturnHomePage = props.handleReturnHomePage;
	const togglableRef = useRef()

	useEffect(() => {
		async function fetchdata(){ 
			const fetchedCourse = await courseService.getAll();
			setCourses(fetchedCourse);
		}
		fetchdata();
	}, [])

	const handleInsertCourse = async(courseObj) => {
		try {
			await courseService.create(courseObj);
			setCourses(courses.concat(courseObj));
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
	const handleDeleteCourse = async(course_id, teacher_id) => {
		try {
			await courseService.remove(course_id, teacher_id);
			const newCourseTable = await courses.filter(course => {
				return (course.course_id !== course_id || course.teacher_id !== teacher_id);
			});
			setCourses(newCourseTable);
		}
		catch(err) {
			console.log("delete failed", err.response.data.error);
			const error = JSON.parse(err.response.data.error);
			const message = error[0].message;
			window.alert(`delete failed\nError: ${message}`);
		}
	}
	const handleUpdateCourse = async(oriCourseId, oriTeacherId, courseObj) => {
		try {
			console.log('courseObj', courseObj);
			await courseService.update(oriCourseId, oriTeacherId, courseObj);
			const newCourseTable = await courses.map(course => {
				return (course.course_id !== oriCourseId || course.teacher_id !== oriTeacherId) ? course : courseObj;
			});
			console.log('newCourseTable',newCourseTable);
			setCourses(newCourseTable);
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
				<h2>Courses Information</h2>
			</div>
			<div>
				<Togglable ref={togglableRef} buttonLabel='Insert Course' type='courseform'>
					<CourseForm handleInsertCourse={handleInsertCourse} togglableRef={togglableRef} />
				</Togglable>
			</div>
			<div>
				<button onClick={() => handleReturnHomePage()} >return</button>
			</div>
			<div>
				<CourseTable courses={courses}
					handleDeleteCourse={handleDeleteCourse}
					handleUpdateCourse={handleUpdateCourse}/>
			</div>
		</div>
	);
}

export default CoursePage;