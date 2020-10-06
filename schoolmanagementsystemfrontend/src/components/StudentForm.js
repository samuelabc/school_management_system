import React, {useState} from 'react';

const StudentForm = (props) => {
	const togglableRef = props.togglableRef;
	const handleInsertStudent = props.handleInsertStudent;
	const [studentId, setStudentId] = useState('');
	const [name, setName] = useState('');
	const [classId, setClassId] = useState('');

	const InsertStudent = async (event) => {
		const student_id = studentId;
		const class_id = classId;
		event.preventDefault();
		handleInsertStudent({student_id, name, class_id})
		setStudentId('');
		setName('');
		setClassId('');
	}

	return (
		<div className='container'>
			<strong className='formtitle'>Insert Student</strong>
			<form onSubmit={InsertStudent} >
				<div>
					<p className='formattr'>StudentID</p>
					<input type='text'
						value={studentId}
						onChange={({target}) => setStudentId(target.value)}
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
					<p className='formattr'>ClassID</p>
					<input type='text'
						value={classId}
						onChange={({target}) => setClassId(target.value)}
					/>
				</div>
				<button className='cancelbutton' type="button" onClick={() => togglableRef.current.toggleVisibility()} >Cancel</button>
				<button className='confirmbutton' type="submit">Confirm</button>
			</form>
		</div>
	)
}

export default StudentForm;