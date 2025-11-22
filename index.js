import { navBarComponent } from "./pages/components/navBar.js"
import { cardComponent } from "./pages/components/cards.js"
import { addToCart, getCart } from "./utils/localStorage.controller.js"

// Función global para actualizar el contador del carrito
const updateCartCount = () => {
  const cart = getCart()
  const countElement = document.getElementById("cart-count")
  if (countElement) {
    countElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0)
  }
}

window.addEventListener('load', async () => {
  // Navbar
  const navBarContainer = document.querySelector('header')
  if (navBarContainer) {
    navBarContainer.innerHTML = navBarComponent
    updateCartCount()

    // Detectar usuario en sesión y actualizar botón
    const userData = JSON.parse(sessionStorage.getItem("user"))
    const userButtonContainer = document.getElementById("user-button-container")

    if (userButtonContainer) {
      if (userData && userData.photoUrl) {
        // Mostrar foto de perfil
        userButtonContainer.innerHTML = `
          <button class="btn btn-success rounded-pill me-2" 
                  onclick="window.location.href='${window.location.origin}/privatePages/user.html'">
            <img src="${userData.photoUrl}" 
                 alt="${userData.name}" 
                 class="rounded-circle" 
                 style="height: 30px; width: 30px; object-fit: cover;">
          </button>
        `
      } else {
        userButtonContainer.innerHTML = `
          <button class="btn btn-success rounded-pill me-2" 
                  onclick="window.location.href='${window.location.origin}/pages/InicioSesion.html'">
            <i class="bi bi-person-circle"></i>
          </button>
        `
      }
    }
  }

  const path = window.location.pathname
  let products = []

  const baseUrl = window.location.origin

  if (path.endsWith("index.html") || path === "/") {
    const marvel = await (await fetch(`${baseUrl}/data/marvel.json`)).json()
    const lotr = await (await fetch(`${baseUrl}/data/lotr.json`)).json()
    const backToFuture = await (await fetch(`${baseUrl}/data/backToFuture.json`)).json()
    products = [...marvel, ...lotr, ...backToFuture]
  } else if (path.endsWith("Marvel.html")) {
    products = await (await fetch(`${baseUrl}/data/marvel.json`)).json()
  } else if (path.endsWith("LordOfRings.html")) {
    products = await (await fetch(`${baseUrl}/data/lotr.json`)).json()
  } else if (path.endsWith("BackToFuture.html")) {
    products = await (await fetch(`${baseUrl}/data/backToFuture.json`)).json()
  }

  window.logout = () => {
    sessionStorage.clear()
    window.location.href = "../pages/InicioSesion.html"
  }

  // Búsqueda
  const searchInput = document.getElementById("searchInput")
  const searchButton = document.getElementById("searchButton")

  const handleSearch = async () => {
    const query = searchInput.value.trim().toLowerCase()
    if (!query) return

    // Guardar búsqueda en sessionStorage
    sessionStorage.setItem("searchQuery", query)

    const marvel = await (await fetch(`${baseUrl}/data/marvel.json`)).json()
    const lotr = await (await fetch(`${baseUrl}/data/lotr.json`)).json()
    const backToFuture = await (await fetch(`${baseUrl}/data/backToFuture.json`)).json()

    const allProducts = [
      ...marvel.map(p => ({ ...p, page: "pages/Marvel.html" })),
      ...lotr.map(p => ({ ...p, page: "pages/LordOfRings.html" })),
      ...backToFuture.map(p => ({ ...p, page: "pages/BackToFuture.html" }))
    ]

    const found = allProducts.find(p => p.title.toLowerCase().includes(query))

    if (found) {
      // Redirigir a la página donde está el producto
      window.location.href = `${baseUrl}/${found.page}`
    } else {
      // Si no encuentra coincidencia, redirigir a index.html
      window.location.href = `${baseUrl}/index.html`
    }
  };

  if (searchButton) searchButton.addEventListener("click", handleSearch)
  if (searchInput) searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch()
  })

  // Renderizar cards
  const container = document.getElementById("cardsContainer")
  if (container && products.length > 0) {
    // Verificar si hay búsqueda guardada
    const searchQuery = sessionStorage.getItem("searchQuery")
    let filteredProducts = products;

    if (searchQuery) {
      filteredProducts = products.filter(p =>
        p.title.toLowerCase().includes(searchQuery)
      );
      sessionStorage.removeItem("searchQuery")
    }

    if (filteredProducts.length > 0) {
      container.innerHTML = filteredProducts.map(p => cardComponent(p)).join("")
    } else {
      container.innerHTML = `<p class="text-center fw-bold">No se encontraron resultados 😕</p>`
    }

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
      if (e.target.classList.contains("add-to-cart")) {
        const cardBody = e.target.closest(".card-body")
        const cantidad = parseInt(cardBody.querySelector(".cantidad").value)
        const title = cardBody.querySelector(".card-title").textContent
        const product = products.find(p => p.title === title)

        addToCart(product, cantidad)
        updateCartCount()
        alert(`${product.title} agregado al carrito`)
      }
    })
  }
})





