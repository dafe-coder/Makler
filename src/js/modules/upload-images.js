// ************************ Drag and drop ***************** //
export default function dropImages(selector) {
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
		let uploadProgress = []
		let progressBar = document.getElementById('progress-bar')

		function initializeProgress(numFiles) {
			progressBar.value = 0
			uploadProgress = []

			for (let i = numFiles; i > 0; i--) {
				uploadProgress.push(0)
			}
		}

		function updateProgress(file, fileNumber, percent) {
			const nameFile = file.name
			document.querySelector('.files-name span').innerHTML =
				nameFile.length >= 20 ? nameFile.slice(-20) : nameFile

			uploadProgress[fileNumber] = percent
			let total =
				uploadProgress.reduce((tot, curr) => tot + curr, 0) /
				uploadProgress.length
			progressBar.value = total
		}

		function handleFiles(files) {
			document.querySelector('.image-progress').style.display = 'flex'

			files = [...files]
			initializeProgress(files.length)
			files.forEach(uploadFile)
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
		}

		function uploadFile(file, i) {
			var url = 'https://api.cloudinary.com/v1_1/joezimim007/image/upload'
			var xhr = new XMLHttpRequest()
			var formData = new FormData()
			xhr.open('POST', url, true)
			xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

			// Update progress (can be used to show progress indicator)
			xhr.upload.addEventListener('progress', function (e) {
				updateProgress(file, i, (e.loaded * 100.0) / e.total || 100)
			})

			xhr.addEventListener('readystatechange', function (e) {
				if (xhr.readyState == 4 && xhr.status == 200) {
					updateProgress(file, i, 100) // <- Add this
				} else if (xhr.readyState == 4 && xhr.status != 200) {
				}
			})

			formData.append('upload_preset', 'ujpu6gyk')
			formData.append('file', file)
			xhr.send(formData)
		}
	}
}
