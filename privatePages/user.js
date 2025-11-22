import { userCardComponent } from "../pages/components/cards.js"
import { navBarComponent } from "../pages/components/navBar.js"

window.addEventListener('load', async () => {
  // Navbar
  const navBarContainer = document.querySelector('header')
  if (navBarContainer) {
    navBarContainer.innerHTML = navBarComponent
  }

  // Datos de usuario
  const userData = JSON.parse(sessionStorage.getItem("user"))
  const container = document.getElementById("userCardContainer")

  if (userData && container) {
    container.innerHTML = userCardComponent(userData)
  } else {
    container.innerHTML = "<p>No hay sesión activa.</p>"
  }
})

window.logout = () => {
  sessionStorage.clear();
  window.location.href = "../pages/InicioSesion.html"
}