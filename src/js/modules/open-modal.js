export default function openModal(selectorBtn, selectorBody) {
	const btn = document.querySelector(selectorBtn)

	if (btn) {
		const modalBody = document.querySelector(selectorBody)
		btn.addEventListener('click', function () {
			modalBody.classList.add('active')
			btn.classList.add('active')
		})

		modalBody.addEventListener('click', (e) => {
			let target = e.target

			if (target && target.classList.contains('modal')) {
				modalBody.classList.remove('active')
			}
		})

		modalBody.querySelector('.close-btn').addEventListener('click', (e) => {
			e.preventDefault()
			modalBody.classList.remove('active')
		})
	}
}
