import React from 'react';

const ClassSelectionPage = (props) => {
	const handleReturnHomePage = props.handleReturnHomePage;
	const handleInsertClassSelection = async() => {
		// TODO
	}
	return (
		<div>
			<div className='title'>
				<h2>Class Selection Information</h2>
			</div>
			<div>
				<button onClick={() => handleInsertClassSelection()}>Insert Class Selection</button>
			</div>
			<div>
				<button onClick={() => handleReturnHomePage()}>return</button>
			</div>
		</div>
	);
}

export default ClassSelectionPage;