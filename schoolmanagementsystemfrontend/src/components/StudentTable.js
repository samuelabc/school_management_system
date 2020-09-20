import React from 'react'

const StudentTable = (props) => {
	const students = props.students;
	const mapStudent = () => {
		return (
			students.map(student => {
				return (
					<tr key={student.student_id}>
						<td>{student.student_id}</td>
						<td>{student.name}</td>
						<td>{student.class_id}</td>
						<td>
							<button>delete</button>
						</td>
						<td>
							<button>update</button>
						</td>
					</tr>
				)
			})
		)
	}
	return (
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
	)
}

export default StudentTable;