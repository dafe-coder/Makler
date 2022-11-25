import axios from 'axios'
export default function showMore(selectorButton) {
	let button = document.querySelector(selectorButton)
	let i = 2
	if (button) {
		button.addEventListener('click', () => {
			getNextPage(i, 'houses').then((res) => {
				let housesBody = document.querySelector('#houses-list')
				if (housesBody) {
					res.results.forEach((item) => {
						housesBody.innerHTML += `
				<li class="cards-item"> 
					<a href="/product.html"> 
						<div class="cards-item__top"> 
						<button class="btn-save">
							<svg class="svg-sprite-icon icon-save">
							<use xlink:href="img/symbol/sprite.svg#save"></use>
							</svg>
						</button><img src="${item.image}" alt="">
						</div>
						<div class="cards-item__bottom">
						<div class="cards-item-info"> 
							<div class="cards-item-info__top">
							<p>${item.title}</p><span>${item.title}</span>
							</div>
							<div class="cards-item-info__bottom"> 
							<p>${item.address.addressName}</p><span>22:52</span>
							</div>
						</div>
						</div>
					</a>
				</li>
			`
					})
				}
				if (res.next === null) {
					button.style.display = 'none'
				}
			})
			i++
		})
	}
}

async function getNextPage(num, product) {
	let data = await axios
		.get(`http://193.162.143.210/api/v1/${product}/?page=${num}`)
		.then((response) => {
			console.log(response.data)
			return response.data
		})
		.catch((error) => console.log(error))
	return data
}
