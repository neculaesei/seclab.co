(function () {
  registerMobileMenu()
})()

function registerMobileMenu () {
  const toggle = document.querySelector('.menu-toggle')
  if (toggle !== null) {
    const header = document.querySelector('.site-header')
    const headerBottom = header.getBoundingClientRect().bottom + window.pageYOffset
    const menu = document.querySelector('.menu')
    menu.style.top = headerBottom + 'px'
    toggle.onclick = function () {
      menu.style.top = headerBottom + 'px'
      if (menu.classList.contains('active')) {
        menu.classList.remove('active')
      } else {
        menu.classList.add('active')
      }
    }
  }
}
