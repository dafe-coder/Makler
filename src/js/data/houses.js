import axios from 'axios'

export default async function getAllHouses() {
	let data = await axios
		.get('http://193.162.143.210/web/api/v1/web-houses')
		.then((response) => {
			return response.data.results
		})
		.catch((error) => console.log(error))
	return data
}
