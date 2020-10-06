import React, {useState} from 'react';

const CourseForm = (props) => {
	const togglableRef = props.togglableRef;
	const handleInsertCourse = props.handleInsertCourse;
	const [courseId, setCourseId] = useState('');
	const [name, setName] = useState('');
	const [teacherId, setTeacherId] = useState('');

	const InsertCourse = async (event) => {
		const course_id = courseId;
		const teacher_id = teacherId;
		event.preventDefault();
		handleInsertCourse({course_id, name, teacher_id})
		setCourseId('')
		setName('');
		setTeacherId('');
	}

	return (
		<div className='container'>
			<strong className='formtitle'>Insert Course</strong>
			<form onSubmit={InsertCourse} >
				<div>
					<p className='formattr'>CourseID</p>
					<input type='text'
						value={courseId}
						onChange={({target}) => setCourseId(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>Name</p>
					<input type='text'
						value={name}
						onChange={({target}) => setName(target.value)}
					/>
				</div>
				<div>
					<p className='formattr'>TeacherID</p>
					<input type='text'
						value={teacherId}
						onChange={({target}) => setTeacherId(target.value)}
					/>
				</div>
				<button className='cancelbutton' type="button" 
					onClick={() => togglableRef.current.toggleVisibility()} >Cancel</button>
				<button className='confirmbutton' type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default CourseForm;