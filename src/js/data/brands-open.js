import axios from 'axios'
export default function openBrands(id) {
	if (id) {
		let brandsLogo = document.querySelector('.open-info-profile .logo img')
		let brandsTitle = document.querySelector('.open-info-profile h5')
		let brandsPosition = document.querySelector('.open-position')
		let brandsTags = document.querySelectorAll('.open-tags')
		let brandsAddress = document.querySelector('.open-address')
		let images = document.querySelectorAll('.slider__right ul li img')
		let slider = document.querySelector('.swiper-wrapper')
		let brandsContacts = document.querySelectorAll('.open-info-contacts a')
		let brandsDescription = document.querySelector('.open-info__right p')
		axios.get(`http://193.162.143.210/api/v1/store/${id}`).then((response) => {
			const item = response.data
			brandsLogo.src = item.brand_image
			brandsPosition.innerHTML = item.use_for
			brandsTitle.innerHTML = item.name
			brandsContacts[0].innerHTML = '+' + item.phoneNumber
			brandsContacts[0].href = `tel:${item.phoneNumber}`
			brandsContacts[1].innerHTML = item.email
			brandsContacts[1].href = `mailto:${item.email}`
			brandsDescription.innerHTML = item.descriptions
			brandsAddress.innerHTML = item.address
			// brands tags
			item.profession.forEach((item) => {
				brandsTags.innerHTML += `
					<li>
					${item}
					</li>
				`
			})

			item.images.forEach((img, i) => {
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
