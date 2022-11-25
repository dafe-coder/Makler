import axios from 'axios'

async function getAllMasters() {
	let data = await axios
		.get('http://193.162.143.210/api/v1/maklers/')
		.then((response) => {
			return response.data.results
		})
		.catch((error) => console.log(error))
	return data
}

export default function getAllMastersInit(selector) {
	getAllMasters().then((res) => {
		let mastersBody = document.querySelector(selector)
		if (mastersBody) {
			res.forEach((item, i) => {
				mastersBody.innerHTML += `
					<li class="masters-item"><a href="/master-open.html"> 
                    <div class="masters-item-logo"> <img src="${
											item.avatar
										}" alt="аватар"></div>
                    <div class="masters-item-info"> 
                      <h5>${item.name}</h5>
                      <p></p>
                    </div>
                    <ul class="open-tags"> 
						${item.profession.map((item) => `<li>${item.title}</li>`)}
                    </ul>
                    <p class="masters-item-address">${
											item.address.addressName
										}</p></a></li>
				`
			})
		}
	})
}
