import React from 'react';

const HomePage = (props) => {
	const handlePage = props.handlePage;
	
	return (
		<div>
			<div className='title'>
				<h1>School Management System</h1>
			</div>
			<div>
				<button onClick={() => handlePage('StudentsPage')}>Students Info</button>
			</div>
			<div>
				<button onClick={() => handlePage('TeachersPage')}>Teachers Info</button>
			</div>
			<div>
				<button onClick={() => handlePage('ClassSelectionPage')}>Class Selection Info</button>
			</div>
		</div>
	);
}

export default HomePage;