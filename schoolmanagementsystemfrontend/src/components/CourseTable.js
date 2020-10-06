import React, {useState} from 'react'

const CourseTable = (props) => {
	const courses = props.courses;
	const handleDeleteCourse = props.handleDeleteCourse;
	const handleUpdateCourse = props.handleUpdateCourse;
	const [updateRowCourseId, setUpdateRowCourseId] = useState('');
	const [updateRowTeacherId, setUpdateRowTeacherId] = useState('');
	const [updateCourseId, setUpdateCourseId] = useState('');
	const [updateName, setUpdateName] = useState('');
	const [updateTeacherId, setUpdateTeacherId] = useState('');
	const [searctText, setSearchText] = useState('');

	const DeleteCourse = async (event) => {
		var course_id = event.target.parentNode.parentNode.childNodes[0].textContent;
		var teacher_id = event.target.parentNode.parentNode.childNodes[2].textContent;
		event.preventDefault();
		if (window.confirm("confirm delete?")) {
			handleDeleteCourse(course_id, teacher_id);
		}
	}
	const UpdateCourse = async(event) => {
		var course_id = event.target.parentNode.parentNode.childNodes[0].textContent
		var name = event.target.parentNode.parentNode.childNodes[1].textContent
		var teacher_id = event.target.parentNode.parentNode.childNodes[2].textContent
		event.preventDefault();
		setUpdateRowCourseId(course_id);
		setUpdateRowTeacherId(teacher_id);

		setUpdateCourseId(course_id);
		setUpdateName(name);
		setUpdateTeacherId(teacher_id);
	}
	const CancelUpdate = async(event) => {
		event.preventDefault();
		setUpdateRowCourseId('');
		setUpdateRowTeacherId('');

		setUpdateCourseId('')
		setUpdateName('');
		setUpdateTeacherId('');
	}
	const ConfirmUpdate = async(event) => {
		event.preventDefault();
		if (window.confirm('confirm update?')) {
			const oriCourseId = updateRowCourseId;
			const oriTeacherId = updateRowTeacherId;

			const course_id = updateCourseId;
			const name = updateName;
			const teacher_id = updateTeacherId;
			
			event.preventDefault();
			const success = await handleUpdateCourse(oriCourseId, oriTeacherId, {course_id, name, teacher_id});
			console.log('success', success);
			if (success === true) {
				setUpdateRowCourseId('');
				setUpdateRowTeacherId('');
				setUpdateCourseId('');
				setUpdateName('');
				setUpdateTeacherId('');
			}
		}
	}
	const mapCourse = () => {
		return (
			courses.map(course => {
				if (course.course_id === updateRowCourseId && course.teacher_id === updateRowTeacherId) {
					return (
						<tr key={course.course_id}>
							<td>
								<input type='text'
									value={updateCourseId}
									onChange={({target}) => setUpdateCourseId(target.value)}
								/>
							</td>
							<td>
								<input type='text'
									value={updateName}
									onChange={({target}) => setUpdateName(target.value)}
								/>
							</td>
							<td>
								<input type='text'
									value={updateTeacherId}
									onChange={({target}) => setUpdateTeacherId(target.value)}
								/>
							</td>
							<td>
								<button onClick={CancelUpdate}>cancel</button>
							</td>
							<td>
								<button onClick={ConfirmUpdate}>comfirm</button>
							</td>
						</tr>
					)
				}
				else {
					if (searctText === '') {
						return (
							<tr key={course.course_id}>
								<td>{course.course_id}</td>
								<td>{course.name}</td>
								<td>{course.teacher_id}</td>
								<td>
									<button onClick={DeleteCourse}>delete</button>
								</td>
								<td>
									<button onClick={UpdateCourse}>update</button>
								</td>
							</tr>
						)
					}
					else {
						if (course.course_id.includes(searctText) || course.name.includes(searctText) || course.teacher_id.includes(searctText)) {
							return (
								<tr key={course.course_id}>
									<td>{course.course_id}</td>
									<td>{course.name}</td>
									<td>{course.teacher_id}</td>
									<td>
										<button onClick={DeleteCourse}>delete</button>
									</td>
									<td>
										<button onClick={UpdateCourse}>update</button>
									</td>
								</tr>
							)
						}
					}
				}
			})
		)
	}
	return (
		<div>
			<input className="searchbox" type="text" placeholder="Search.." 
				value={searctText} 
				onChange={({target}) => setSearchText(target.value)} />
				
			<table>
				<tbody>
					<tr>
						<th>CourseID</th>
						<th>Name</th>
						<th>TeacherID</th>
						<th></th>
						<th></th>
					</tr>
					{mapCourse()}
				</tbody>
			</table>
		</div>
	)
}

export default CourseTable;