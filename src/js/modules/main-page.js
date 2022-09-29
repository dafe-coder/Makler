export function showAlert(selector, delay) {
	const alert = document.querySelector(selector)
	if (alert) {
		alert.querySelector('#close-alert').addEventListener('click', (e) => {
			e.preventDefault()
			alert.classList.remove('active')
		})
		let timer = setTimeout(() => {
			alert.classList.add('active')
			clearTimeout(timer)
		}, delay)
	}
}

export function openChooseBody(selector) {
	const btnOpen = document.querySelector(selector)
	if (btnOpen) {
		const bodyChoose = btnOpen.closest('li').querySelector('.nav-body-choose')
		btnOpen.addEventListener('click', (e) => {
			e.preventDefault()

			if (!btnOpen.classList.contains('active')) {
				document.querySelectorAll('.nav-body-choose').forEach((item) => {
					item.classList.remove('active')
				})
				document.querySelectorAll('.choose-btn').forEach((item) => {
					item.classList.remove('active')
				})
				btnOpen.classList.add('active')
				bodyChoose.classList.add('active')
			} else {
				btnOpen.classList.remove('active')
				bodyChoose.classList.remove('active')
			}
		})
		bodyChoose.querySelectorAll('li a').forEach((item) => {
			item.addEventListener('click', (e) => {
				const target = e.target
				bodyChoose.querySelectorAll('li a').forEach((item) => {
					item.classList.remove('active')
				})
				target.classList.add('active')
				btnOpen.querySelector('span').innerHTML = target.innerHTML
				bodyChoose.classList.remove('active')
				btnOpen.classList.remove('active')
			})
		})
	}
}

export function chooseRoom(wrapSelector) {
	const wrap = document.querySelector(wrapSelector)
	if (wrap) {
		wrap.addEventListener('click', (e) => {
			let target = e.target
			if (target && target.closest('a')) {
				wrap.querySelectorAll('li a').forEach((item) => {
					item.classList.remove('active')
				})
				target.classList.add('active')
			}
		})
	}
}
