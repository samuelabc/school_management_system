import React from 'react';

const TeachersPage = (props) => {
	const handleReturnHomePage = props.handleReturnHomePage;
	const handleInsertTeacher = async() => {
		// TODO
	}
	return (
		<div>
			<div className='title'>
				<h2>Teachers Information</h2>
			</div>
			<div>
				<button onClick={() => handleInsertTeacher()}>Insert Teacher</button>
			</div>
			<div>
				<button onClick={() => handleReturnHomePage()}>return</button>
			</div>
		</div>
	);
}

export default TeachersPage;