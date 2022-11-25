import axios from 'axios'

export default async function getAllCategories() {
	let data = await axios
		.get('http://193.162.143.210/api/v1/categories/')
		.then((response) => {
			return response.data.results
		})
		.catch((error) => console.log(error))
	return data
}
