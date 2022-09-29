import { isWebp } from './modules/functions.js'
isWebp()
import { showAlert, openChooseBody, chooseRoom } from './modules/main-page.js'
import renderMap from './modules/map.js'
import dropImages from './modules/upload-images.js'
import navTabsEvent from './modules/nav-tabs.js'
import uploadImages from './modules/upload-images.js'
import multiSelect from './modules/multi-select.js'
import openChooseBodyAll from './modules/choose-all.js'
document.addEventListener('DOMContentLoaded', () => {
	showAlert('#alert-home', 1000)

	openChooseBody('#choose-how', '.select-choose')
	openChooseBody('#choose-type', '.select-choose')
	openChooseBody('#work-years', '.select')
	openChooseBodyAll('.btn-settings', '.advert-settings')
	multiSelect('#select-career', '.select')

	chooseRoom('#choose-room')

	renderMap()

	dropImages('.image-outer')

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

	document.querySelector('.hamburger').addEventListener('click', function (e) {
		e.preventDefault()
		this.classList.toggle('is-active')
		document.querySelector('.header-nav-list').classList.toggle('active')
	})

	try {
		navTabsEvent('settings-link', 'settings', 'cabinet')
		navTabsEvent('product-link', 'product', 'cabinet')
		navTabsEvent('archive-link', 'archive', 'cabinet')
		navTabsEvent('draft-link', 'draft', 'cabinet')
		navTabsEvent('notifications-link', 'chat', 'cabinet')
		navTabsEvent('photos-work-link', 'photos-work', 'cabinet')
	} catch (error) {
		console.log(error)
	}

	try {
		uploadImages('upload-images')
	} catch (error) {
		console.log(error)
	}
})
