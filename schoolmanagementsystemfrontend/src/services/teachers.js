import axios from 'axios';
const baseUrl = '/api/teachers';

const getAll = async() => {
	const response = await axios.get(baseUrl);
	return response.data;
}

const create = async(newStudent) => {
	const response = await axios.post(baseUrl, newStudent);
	console.log('response',response.data);
	return response.data;
}

const remove = async(id) => {
	console.log("remove",id);
	const response = await axios.delete(`${baseUrl}/${id}`);
	console.log("response.data",response.data)
	return response.data;
}

const update = async(oriTeacherId, newTeacher) => {
	console.log(oriTeacherId);
	console.log(newTeacher);
	const response = await axios.put(`${baseUrl}/${oriTeacherId}`, newTeacher);
	return response.data;
}

export default {
	getAll,
	create,
	remove,
	update,
}