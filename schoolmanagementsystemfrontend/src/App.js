import React, {useState} from 'react';
import CoursePage from './components/CoursePage';
import FootNote from './components/FootNote';
import HomePage from './components/HomePage';
import StudentsPage from './components/StudentsPage';
import TeachersPage from './components/TeachersPage';

const App = () => {
	const [page, setPage] = useState('HomePage');
	const [students, setStudents] = useState([]);
	const [teachers, setTeachers] = useState([]);
	const [courses, setCourses] = useState([]);

	const handlePage = async(newpage) => {
		await setPage(newpage);
	}
	const handleReturnHomePage = async() => {
		await setPage('HomePage');
	}

	if (page === 'HomePage') {
		return (
			<div>
				<HomePage handlePage={handlePage} />
				<FootNote />
			</div>
		);
	}
	else if (page === 'StudentsPage') {
		return (
			<div>
				<StudentsPage handleReturnHomePage={handleReturnHomePage} 
					students={students} setStudents={setStudents} />
				<FootNote />
			</div>
		);
	}
	else if (page === 'TeachersPage') {
		return (
			<div>
				<TeachersPage handleReturnHomePage={handleReturnHomePage}
					teachers={teachers} setTeachers={setTeachers} />
				<FootNote />
			</div>
			);
	}
	else if (page === 'CoursePage') {
		return (
			<div>
				<CoursePage handleReturnHomePage={handleReturnHomePage} 
					courses={courses} setCourses={setCourses} />
				<FootNote />
			</div>
		);
	}
}

export default App;