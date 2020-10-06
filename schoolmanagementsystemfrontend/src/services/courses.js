import axios from 'axios';
const baseUrl = '/api/courses';

const getAll = async() => {
	const response = await axios.get(baseUrl);
	return response.data;
}

const create = async(newCourse) => {
	const response = await axios.post(baseUrl, newCourse);
	console.log('response',response.data);
	return response.data;
}

const remove = async(course_id, teacher_id) => {
	console.log("remove",course_id, teacher_id);
	const response = await axios.delete(`${baseUrl}/${course_id}/${teacher_id}`);
	console.log("response.data",response.data)
	return response.data;
}

const update = async(oriCourseId, oriTeacherId, newCourse) => {
	console.log(oriCourseId);
	console.log(oriTeacherId);
	console.log(newCourse);
	const response = await axios.put(`${baseUrl}/${oriCourseId}/${oriTeacherId}`, newCourse);
	return response.data;
}

export default {
	getAll,
	create,
	remove,
	update,
}