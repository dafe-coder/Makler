import axios from 'axios'

async function getAllBrands() {
	let data = await axios
		.get('http://193.162.143.210/api/v1/store/')
		.then((response) => {
			return response.data.results
		})
		.catch((error) => console.log(error))
	return data
}
export default function getAllBrandsInit(selector) {
	getAllBrands().then((res) => {
		let brandsBody = document.querySelector(selector)
		if (brandsBody) {
			res.forEach((item, i) => {
				brandsBody.innerHTML += `
					<li class="brands-item"> <a href="/brands-open.html"> 
                    <div class="brands-item-header"> 
                      <div class="brands-item-logo"> 
					  <img src="${item.brand_image}" alt="Лого бренда">
					  </div>
                      <h5 class="brands-item-title">${item.brand}</h5>
                    </div>
                    <div class="brands-item-body"> 
                      <div class="brands-item-image"> <img src="${item.image}" alt="Картинка товара"></div>
                      <div class="brands-item-info"> 
                        <h5>${item.name}</h5>
                        <p>${item.use_for}</p><span>$${item.price}</span>
                      </div>
                    </div></a></li>
				`
			})
		}
	})
}
