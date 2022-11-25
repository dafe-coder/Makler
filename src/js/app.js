import { isWebp } from './modules/functions.js'
isWebp()
import { showAlert, openChooseBody, chooseRoom } from './modules/main-page.js'
import renderMap from './modules/map.js'
import navTabsEvent from './modules/nav-tabs.js'
import multiSelect from './modules/multi-select.js'
import openChooseBodyAll from './modules/choose-all.js'
import openModal from './modules/open-modal.js'
import getAllCategories from './data/categories.js'
import getAllHouses from './data/houses.js'
import openHouse from './data/house-open.js'
import openMaster from './data/master-open.js'
import getAllMastersInit from './data/masters.js'
import getAllBrandsInit from './data/brands.js'
import openBrands from './data/brands-open.js'
import showMore from './data/show-more.js'

import { createHouse, createHouseInitialize } from './create/index.js'

document.addEventListener('DOMContentLoaded', () => {
	showAlert('#alert-home', 1000)
	if (
		document.querySelector('body').classList.contains('create-product-page')
	) {
		createHouse()
	}
	if (document.querySelector('body').classList.contains('open-product-page')) {
		openHouse(1)
	}

	if (document.querySelector('body').classList.contains('master-page')) {
		openMaster(1)
	}
	if (document.querySelector('body').classList.contains('brands-open-page')) {
		openBrands(1)
	}

	if (document.querySelector('#masters-list')) {
		getAllMastersInit('#masters-list')
	}
	if (document.querySelector('#brands-list')) {
		getAllBrandsInit('#brands-list')
	}
	// Инициализация страницы создания товара (Удобства)
	createHouseInitialize('#amenities-list')
	showMore('#show-more')

	openChooseBody('#choose-how', '.select-choose')
	openChooseBody('#choose-type', '.select-choose')
	openChooseBody('#work-years', '.select')
	openChooseBody('#sort-link', '.select-sort')
	openChooseBody('#select-currency', '.form-price-choose')

	openChooseBodyAll('.btn-settings', '.advert-settings')
	multiSelect('#select-career', '.select')

	chooseRoom('#choose-room')

	openModal('#login-modal', '.login-modal')
	renderMap()

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

	getAllCategories().then((res) => {
		let catBody = document.querySelector('#categories-list')
		if (catBody) {
			res.forEach((item, i) => {
				catBody.innerHTML += `
				<li>
					<a href="/categories${i + 1}.html"> 
						<div class="info"> 
							<h2>${item.title}</h2>
							<p>Более 1240 новых домов</p>
						</div>
						<div class="img"> 
							<img src="${item.image}" alt="${item.title}">
						</div>
					</a>
				</li>
			`
			})
		}
	})

	getAllHouses().then((res) => {
		console.log(res)
		let housesBody = document.querySelector('#houses-list')
		if (housesBody) {
			res.forEach((item) => {
				housesBody.innerHTML += `
				<li class="cards-item"> 
					<a href="/product.html"> 
						<div class="cards-item__top"> 
						<button class="btn-save">
							<svg class="svg-sprite-icon icon-save">
							<use xlink:href="img/symbol/sprite.svg#save"></use>
							</svg>
						</button><img src="${item.images.length && item.images[0].images}" alt="${
					item.title
				}">
						</div>
						<div class="cards-item__bottom">
						<div class="cards-item-info"> 
							<div class="cards-item-info__top">
							<p>${item.title}</p><span>${item.price}</span>
							</div>
							<div class="cards-item-info__bottom"> 
							</div>
						</div>
						</div>
					</a>
				</li>
			`
			})
		}
	})
})
