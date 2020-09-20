import axios from 'axios';
const baseUrl = '/api/students';

const getAll = async() => {
	const response = await axios.get(baseUrl)
	return response.data
}

const create = async(newStudent) => {
	const response = await axios.post(baseUrl, newStudent);
	return response.data
}

export default {
	getAll,
	create
}