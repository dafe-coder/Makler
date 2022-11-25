import axios from 'axios'
// ************************ Drag and drop ***************** //
let filesList = []
export function currencyInitialize() {
	axios.get('http://193.162.143.210/api/v1/amenities/').then((res) => {
		res.data.results.forEach((item) => {
			wrap.innerHTML += `
				<li class="checkbox-btn">
					<input type="checkbox" id="comfort-${item.title}" name="amenities" value="${item.title}">
					<label for="comfort-${item.title}">
						<img src="${item.image}"/> 
						<span>${item.title}</span>
					</label>
				</li>
			`
		})
	})
}
export function dropImages(selector) {
	const dropArea = document.querySelector(selector)
	if (dropArea) {
		let input = dropArea.querySelector('input')
		let clear = dropArea.querySelector('.cancel-actions')

		if (clear) {
			clear.addEventListener(
				'click',
				function () {
					input.value = ''
				},
				false
			)
		}

		let actions1 = ['dragenter', 'dragover', 'dragleave', 'drop']
		let actions2 = ['dragenter', 'dragover']
		let actions3 = ['dragleave', 'drop']

		if (input) {
			input.addEventListener('change', function (e) {
				handleFiles(this.files)
			})
		}
		actions1.forEach((eventName) => {
			dropArea.addEventListener(eventName, preventDefaults, false)
			document.body.addEventListener(eventName, preventDefaults, false)
		})

		actions2.forEach((eventName) => {
			dropArea.addEventListener(eventName, highlight, false)
		})
		actions3.forEach((eventName) => {
			dropArea.addEventListener(eventName, unhighlight, false)
		})

		// Handle dropped files
		dropArea.addEventListener('drop', handleDrop, false)

		function preventDefaults(e) {
			e.preventDefault()
			e.stopPropagation()
		}

		function highlight(e) {
			dropArea.classList.add('highlight')
		}

		function unhighlight(e) {
			dropArea.classList.remove('highlight')
		}

		function handleDrop(e) {
			var dt = e.dataTransfer
			var files = dt.files
			handleFiles(files)
		}

		function handleFiles(files) {
			files = [...files]
			files.forEach(previewFile)
		}

		function previewFile(file) {
			let reader = new FileReader()
			reader.readAsDataURL(file)
			reader.onloadend = function () {
				let li = document.createElement('li')
				let img = document.createElement('img')
				img.src = reader.result
				li.appendChild(img)
				document.getElementById('gallery').appendChild(li)
			}
			filesList.push(file)
		}
	}
}
dropImages('.image-outer')

export function createHouseInitialize(wrapList) {
	let wrap = document.querySelector(wrapList)

	if (wrap) {
		axios.get('http://193.162.143.210/api/v1/amenities/').then((res) => {
			res.data.results.forEach((item) => {
				wrap.innerHTML += `
					<li class="checkbox-btn">
						<input type="checkbox" id="comfort-${item.title}" name="amenities" value="${item.title}">
						<label for="comfort-${item.title}">
							<img src="${item.image}"/> 
							<span>${item.title}</span>
						</label>
					</li>
				`
			})
		})
	}
}

export function createHouse() {
	if (document.querySelector('#create-product')) {
		console.log(filesList)

		document
			.querySelector('#create-product')
			.addEventListener('submit', (e) => {
				e.preventDefault()
				console.log(filesList)

				let titleProduct = document.querySelector('#title-product').value
				let descriptionProduct = document.querySelector(
					'#description-product'
				).value
				let typeProduct = document.querySelector(
					'input[name="type-product"]:checked'
				).value
				let timeProduct = document.querySelector(
					'input[name="time"]:checked'
				).value
				let objectProduct = document.querySelector(
					'input[name="object"]:checked'
				).value
				let sizeInputGeneral = document.querySelector('#general').value
				let residentialProduct = document
					.querySelector('input[name="type"]:checked')
					.getAttribute('id')

				let buildingTypeProduct = document
					.querySelector('input[name="type-building"]:checked')
					.getAttribute('id')
				let amenitiesProduct = document.querySelectorAll(
					'input[name="amenities"]'
				)
				let floor = document.querySelector('input[name="floor"]').value
				let floorOf = document.querySelector('input[name="floor_of"]').value
				let numberOfRooms = document.querySelector(
					'input[name="number_of_rooms"]'
				).value
				let priceProduct = document.querySelector(
					'input[name="product-price"]'
				).value

				let amenitiesArr = []
				amenitiesProduct.forEach((item) => {
					if (item.checked) {
						amenitiesArr.push(item.value)
					}
				})
				// console.log(amenitiesArr)
				const formData = new FormData()
				formData.append('title', titleProduct)
				formData.append('descriptions', descriptionProduct)
				formData.append('price', priceProduct)
				formData.append('type', typeProduct)
				formData.append('rental_type', timeProduct)
				formData.append('object', objectProduct)
				formData.append('general', sizeInputGeneral)
				formData.append('residential', residentialProduct)
				formData.append('number_of_rooms', numberOfRooms)
				formData.append('floor', floor)
				formData.append('floor_from', floorOf)
				// formData.append('building_type', buildingTypeProduct)
				// formData.append('amenities', amenitiesProduct)
				filesList.forEach((img) => {
					formData.append('uploaded_images', img)
				})
				// for (const value of formData.values()) {
				// 	console.log(value)
				// }
				axios({
					method: 'post',
					url: 'http://193.162.143.210/api/v1/houses/create/',
					data: formData,
					headers: {
						'Content-Type':
							'multipart/form-data; boundary=----WebKitFormBoundary1MeH5wJoIUtjI2fx',
					},
				}).then((res) => console.log(res))
			})
	}
}

// data: {
// 	title: titleProduct,
// 	descriptions: descriptionProduct,
// 	price: 200,
// 	type: typeProduct,
// 	rental_type: timeProduct,
// 	object: objectProduct,
// 	general: 2,
// 	residential: residentialProduct,
// 	number_of_rooms: numberOfRooms,
// 	floor: floor,
// 	floor_from: floorOf,
// 	building_type: buildingTypeProduct,
// 	amenities: amenitiesProduct,
// 	images: [],
// },

// headers: {
// 						'Content-Type':
// 							'multipart/form-data; boundary=----WebKitFormBoundary1MeH5wJoIUtjI2fx',
// 					},
