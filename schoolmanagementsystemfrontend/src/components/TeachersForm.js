import React, {useState} from 'react';

const TeacherForm = (props) => {
	const togglableRef = props.togglableRef;
	const handleInsertTeacher = props.handleInsertTeacher;
	const [teacherId, setTeacherId] = useState('');
	const [name, setName] = useState('');
	const [department, setDepartment] = useState('');

	const InsertTeacher = async (event) => {
		const teacher_id = teacherId;
		event.preventDefault();
		handleInsertTeacher({teacher_id, name, department})
		setTeacherId('');
		setName('');
		setDepartment('');
	}

	return (
		<div className='container'>
			<strong className='formtitle'>Insert Teacher</strong>
			<form onSubmit={InsertTeacher} >
				<div>
					<p className='formattr'>TeacherID</p>
					<input type='text'
						value={teacherId}
						onChange={({target}) => setTeacherId(target.value)}
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
					<p className='formattr'>Department</p>
					<input type='text'
						value={department}
						onChange={({target}) => setDepartment(target.value)}
					/>
				</div>
				<button className='cancelbutton' type="button" 
					onClick={() => togglableRef.current.toggleVisibility()} >Cancel</button>
				<button className='confirmbutton' type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default TeacherForm;