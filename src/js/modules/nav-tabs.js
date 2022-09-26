export default function navTabsEvent(
	navBtnSelector,
	navBodySelector,
	wrapperSelector
) {
	let navItem = document.getElementById(navBtnSelector)
	let navBody = document.getElementById(navBodySelector)
	let wrapper = document.getElementById(wrapperSelector)

	if (navItem) {
		navItem.addEventListener('click', (e) => {
			e.preventDefault()

			navItem
				.closest('ul')
				.querySelectorAll('li')
				.forEach((item) => {
					item.classList.remove('active')
				})
			navItem.closest('li').classList.add('active')

			wrapper.querySelectorAll('section').forEach((element) => {
				element.classList.add('d-none')
			})
			navBody.classList.remove('d-none')
		})
	}
}
