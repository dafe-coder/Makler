export default function multiSelect(selectorBtn, selectorWrapper) {
	let btnOpen = document.querySelector(selectorBtn)
	let arrCareerChoose = []
	if (btnOpen) {
		let bodyChoose = btnOpen
			.closest(selectorWrapper)
			.querySelector('.nav-body-choose')

		let careerChooseBody = btnOpen
			.closest(selectorWrapper)
			.querySelector('button ul')

		arrCareerChoose.push(careerChooseBody.querySelector('li').innerHTML)
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
				if (!target.classList.contains('active')) {
					target.classList.add('active')
					arrCareerChoose.push(target.innerHTML)
					arrCareerChoose = arrCareerChoose.map((item) => item)
				} else {
					target.classList.remove('active')
					arrCareerChoose = arrCareerChoose.filter(
						(itemCareer) => itemCareer !== target.innerHTML
					)
				}
				careerChooseBody.innerHTML = ''
				arrCareerChoose.forEach((text) => {
					const li = document.createElement('li')
					li.innerHTML = text
					careerChooseBody.append(li)
				})
			})
		})
	}
}
