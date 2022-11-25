import axios from 'axios'
export default function openHouse(id) {
	if (id) {
		let houseTitle = document.querySelector('.product-info-title')
		let houseSubTitle = document.querySelector('.product-info-par')
		let housePrice = document.querySelector('.plashka strong')
		let houseTel = document.querySelector('.plashka a')

		let houseTitleBig = document.querySelector('.info-product-title')
		let houseTags = document.querySelectorAll('.tags-list li')
		let houseComfortTags = document.querySelector('.comfort-tags-list')
		let housePar = document.querySelector('.product-par')
		let houseAddress = document.querySelector('.show-on-map-address span')
		let images = document.querySelectorAll('.slider__right ul li img')
		let slider = document.querySelector('.swiper-wrapper')

		axios.get(`http://193.162.143.210/api/v1/houses/${id}`).then((response) => {
			const item = response.data
			houseTitleBig.innerHTML = item.title
			houseTitle.innerHTML = item.category.title
			housePar.innerHTML = item.descriptions
			housePrice.innerHTML = item.price
			houseAddress.innerHTML = item.address.addressName
			houseSubTitle.innerHTML = item.address.addressName

			// house tags
			houseTags[0].querySelector('p').innerHTML = item.type
			houseTags[1].querySelector('p').innerHTML = item.rental_type
			houseTags[2].querySelector('p').innerHTML = item.object
			houseTags[3].querySelector('p').innerHTML = item.general
			houseTags[4].querySelector('p').innerHTML = item.residential
			houseTags[5].querySelector('p').innerHTML = item.number_of_rooms
			houseTags[6].querySelector('p').innerHTML = item.number_of_rooms
			houseTags[7].querySelector('p').innerHTML = item.floor
			houseTags[8].querySelector('p').innerHTML = item.floor_from
			houseTags[9].querySelector('p').innerHTML = item.building_type
			houseTags[10].querySelector('p').innerHTML = item.floor_from

			// amenities
			item.amenities.forEach((item) => {
				houseComfortTags.innerHTML += `
					<li class="comfort-tags-item"><span>${item.title}</span>
					</li>
				`
			})

			item.image.forEach((img, i) => {
				if (i < 4) {
					images[i].src = img.image
				}
				slider.innerHTML += `
					<div class="swiper-slide"> 
						<img src="${img.image}" alt="Картинка слайдера">
					</div>
				`
			})
			var swiper = new Swiper('.swiper', {
				pagination: {
					el: '.swiper-pagination',
					type: 'fraction',
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
				scrollbar: {
					el: '.swiper-scrollbar',
					hide: false,
				},
			})
		})
	}
}
