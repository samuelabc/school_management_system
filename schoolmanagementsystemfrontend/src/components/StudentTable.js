import React, {useState} from 'react'

const StudentTable = (props) => {
	const students = props.students;
	const handleDeleteStudent = props.handleDeleteStudent;
	const handleUpdateStudent = props.handleUpdateStudent;
	const [updateRow, setUpdateRow] = useState('');
	const [updateStudentId, setUpdateStudentId] = useState('');
	const [updateName, setUpdateName] = useState('');
	const [updateClassId, setUpdateClassId] = useState('');
	const [searctText, setSearchText] = useState('');

	const DeleteStudent = async (event) => {
		const student_id = event.target.parentNode.parentNode.childNodes[0].textContent;
		event.preventDefault();
		if (window.confirm("confirm delete?")) {
			handleDeleteStudent(student_id);
		}
	}
	const UpdateStudent = async(event) => {
		var student_id = event.target.parentNode.parentNode.childNodes[0].textContent
		var name = event.target.parentNode.parentNode.childNodes[1].textContent
		var class_id = event.target.parentNode.parentNode.childNodes[2].textContent
		event.preventDefault();
		setUpdateRow(student_id);
		setUpdateStudentId(student_id);
		setUpdateName(name);
		setUpdateClassId(class_id);
	}
	const CancelUpdate = async(event) => {
		event.preventDefault();
		setUpdateRow('');
		setUpdateStudentId('');
		setUpdateName('');
		setUpdateClassId('');
	}
	const ConfirmUpdate = async(event) => {
		event.preventDefault();
		if (window.confirm('confirm update?')) {
			const oriStudentId = updateRow;
			const student_id = updateStudentId;
			const class_id = updateClassId;
			const name = updateName;
			event.preventDefault();
			const success = await handleUpdateStudent(oriStudentId, {student_id, name, class_id});
			console.log('success', success);
			if (success === true) {
				setUpdateRow('');
				setUpdateStudentId('');
				setUpdateName('');
				setUpdateClassId('');
			}
		}
	}
	const mapStudent = () => {
		return (
			students.map(student => {
				if (student.student_id === updateRow) {
					return (
						<tr key={student.student_id}>
							<td>
								<input type='text'
									value={updateStudentId}
									onChange={({target}) => setUpdateStudentId(target.value)}
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
									value={updateClassId}
									onChange={({target}) => setUpdateClassId(target.value)}
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
							<tr key={student.student_id}>
								<td>{student.student_id}</td>
								<td>{student.name}</td>
								<td>{student.class_id}</td>
								<td>
									<button onClick={DeleteStudent}>delete</button>
								</td>
								<td>
									<button onClick={UpdateStudent}>update</button>
								</td>
							</tr>
						)
					}
					else {
						if (student.student_id.includes(searctText) || student.name.includes(searctText) || student.class_id.includes(searctText)) {
							return (
								<tr key={student.student_id}>
									<td>{student.student_id}</td>
									<td>{student.name}</td>
									<td>{student.class_id}</td>
									<td>
										<button onClick={DeleteStudent}>delete</button>
									</td>
									<td>
										<button onClick={UpdateStudent}>update</button>
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
						<th>StudentID</th>
						<th>Name</th>
						<th>ClassID</th>
						<th></th>
						<th></th>
					</tr>
					{mapStudent()}
				</tbody>
			</table>
		</div>
	)
}

export default StudentTable;