export default function dropImages(selector) {
	const dropArea = document.querySelector(selector)

	if (dropArea) {
		;['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
			dropArea.addEventListener(eventName, preventDefaults, false)
		})
		;['dragenter', 'dragover'].forEach((eventName) => {
			dropArea.addEventListener(eventName, highlight, false)
		})
		;['dragleave', 'drop'].forEach((eventName) => {
			dropArea.addEventListener(eventName, unhighlight, false)
		})

		function highlight(e) {
			dropArea.classList.add('highlight')
		}

		function unhighlight(e) {
			dropArea.classList.remove('highlight')
		}

		dropArea.addEventListener('drop', handleDrop, false)

		function handleDrop(e) {
			let dt = e.dataTransfer
			let files = dt.files

			document.querySelector('.image-progress').style.display = 'block'

			handleFiles(files)
		}
	}
}

let filesDone = 0
let filesToDo = 0
let progressBar = document.getElementById('progress-bar')
let uploadProgress = []

function preventDefaults(e) {
	e.preventDefault()
	e.stopPropagation()
}

function uploadFile(file, i) {
	var url = 'YOUR URL HERE'
	var xhr = new XMLHttpRequest()
	var formData = new FormData()
	xhr.open('POST', url, true)

	// Add following event listener
	xhr.upload.addEventListener('progress', function (e) {
		updateProgress(file, i, (e.loaded * 100.0) / e.total || 100)
	})

	xhr.addEventListener('readystatechange', function (e) {
		if (xhr.readyState == 4 && xhr.status == 200) {
			// Done. Inform the user
		} else if (xhr.readyState == 4 && xhr.status != 200) {
			// Error. Inform the user
		}
	})
	xhr.send(formData)
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

function handleFiles(files) {
	files = [...files]
	initializeProgress(files.length)
	files.forEach(uploadFile)
	files.forEach(previewFile)
}

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
		uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length
	progressBar.value = total
}
