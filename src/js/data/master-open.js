import axios from 'axios'
export default function openMaster(id) {
	if (id) {
		let masterLogo = document.querySelector('.open-info-profile .logo img')
		let masterTitle = document.querySelector('.open-info-profile h5')
		let masterPosition = document.querySelector('.open-position span')
		let masterTags = document.querySelectorAll('.open-tags')
		let masterAddress = document.querySelector('.open-address')
		let images = document.querySelectorAll('.slider__right ul li img')
		let slider = document.querySelector('.swiper-wrapper')
		let masterContacts = document.querySelectorAll('.open-info-contacts a')
		let masterDescription = document.querySelector('.open-info__right p')
		axios
			.get(`http://193.162.143.210/api/v1/maklers/${id}`)
			.then((response) => {
				const item = response.data
				masterLogo.src = item.avatar
				masterPosition.innerHTML = item.experience
				masterTitle.innerHTML = item.name
				masterAddress.innerHTML = item.address.addressName
				masterContacts[0].innerHTML = '+' + item.phone
				masterContacts[0].href = `tel:${item.phone}`
				masterContacts[1].innerHTML = item.email
				masterContacts[1].href = `mailto:${item.email}`
				masterDescription.innerHTML = item.descriptions
				// master tags
				item.profession.forEach((item) => {
					masterTags.innerHTML += `
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
