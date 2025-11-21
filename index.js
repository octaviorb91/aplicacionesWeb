import { navBarComponent } from "./pages/components/navBar.js"
import { cardComponent } from "./pages/components/cards.js"

window.addEventListener('load', async () => {
  // Navbar
  const navBarContainer = document.querySelector('header')
  if (navBarContainer) {
    navBarContainer.innerHTML = navBarComponent
  }

  const path = window.location.pathname
  let products = []

  if (path.endsWith("index.html") || path === "/") {
    // Cargar todas las categorías y concatenar
    const marvel = await (await fetch("./data/marvel.json")).json()
    const lotr = await (await fetch("./data/lotr.json")).json()
    const backToFuture = await (await fetch("./data/backToFuture.json")).json()
    products = [...marvel, ...lotr, ...backToFuture]
  } else if (path.endsWith("Marvel.html")) {
    products = await (await fetch("../data/marvel.json")).json()
  } else if (path.endsWith("LordOfRings.html")) {
    products = await (await fetch("../data/lotr.json")).json()
  } else if (path.endsWith("BackToFuture.html")) {
    products = await (await fetch("../data/backToFuture.json")).json()
  }

  window.agregarAlCarrito = (title) => {
  alert(`Producto agregado: ${title}`)
}

window.logout = () => {
  sessionStorage.clear();
  window.location.href = "../pages/InicioSesion.html";
};



  // Renderizar cards
  const container = document.getElementById("cardsContainer")
  if (container && products.length > 0) {
    container.innerHTML = products.map(p => cardComponent(p)).join("")

    container.addEventListener("click", (e) => {
      if (e.target.classList.contains("sumar")) {
        const input = e.target.parentElement.querySelector(".cantidad")
        input.value = parseInt(input.value) + 1
      }
      if (e.target.classList.contains("restar")) {
        const input = e.target.parentElement.querySelector(".cantidad")
        if (parseInt(input.value) > 1) {
          input.value = parseInt(input.value) - 1
        }
      }
    })
  }
})



