export default function openChooseBodyAll(selector, selectorWrap) {
	const btnOpen = document.querySelectorAll(selector)
	if (btnOpen) {
		btnOpen.forEach((btn) => {
			const bodyChoose = btn.closest(selectorWrap).querySelector('.choose-body')
			btn.addEventListener('click', (e) => {
				e.preventDefault()
				if (!btn.classList.contains('active')) {
					document.querySelectorAll('.choose-body').forEach((item) => {
						item.classList.remove('active')
					})
					btnOpen.forEach((item) => {
						item.classList.remove('active')
					})
					btn.classList.add('active')
					bodyChoose.classList.add('active')
				} else {
					btn.classList.remove('active')
					bodyChoose.classList.remove('active')
				}
			})
		})
	}
}
