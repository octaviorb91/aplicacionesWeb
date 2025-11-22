import { getCart, saveCart } from "../utils/localStorage.controller.js"
import { navBarComponent } from "../pages/components/navBar.js"

// Navbar
const navBarContainer = document.querySelector("header")
if (navBarContainer) {
  navBarContainer.innerHTML = navBarComponent
}

// Contador del carrito
const updateCartCount = () => {
  const cart = getCart()
  const countElement = document.getElementById("cart-count")
  if (countElement) {
    countElement.textContent = cart.reduce((acc, item) => acc + item.quantity, 0)
  }
}

const cartContainer = document.getElementById("cartContainer")
const totalElement = document.getElementById("total")
const clearButton = document.getElementById("clear-cart")

const formatPrice = (price) => `$${price.toLocaleString("es-AR")}`

const renderCart = () => {
  const cart = getCart();
  cartContainer.innerHTML = ""
  let total = 0

  if (cart.length === 0) {
    cartContainer.innerHTML = `<p class="text-center">Tu carrito está vacío 🛒</p>`
    totalElement.textContent = ""
    updateCartCount() // Actualizar contador cuando está vacío
    return
  }

  cart.forEach((item, index) => {
    const subtotal = item.price * item.quantity
    total += subtotal

    const card = document.createElement("div")
card.classList.add("col");
card.innerHTML = `
  <div class="card h-100 shadow-sm">
    <img src="${item.imageUrl}" 
         class="card-img-top img-fluid" 
         style="height: 300px; object-fit: stretch;" 
         alt="${item.title}">
    <div class="card-body">
      <h5 class="card-title">${item.title}</h5>
      <p class="card-text text-danger fw-bold">
        ${formatPrice(item.price)} 
        ${item.oldPrice ? `<span class="text-muted text-decoration-line-through">${formatPrice(item.oldPrice)}</span>` : ""}
      </p>
      <p class="text-success">Cantidad: ${item.quantity}</p>
      <p class="text-info">Subtotal: ${formatPrice(subtotal)}</p>
      <button class="btn btn-danger w-100 remove-item" data-index="${index}">
        Eliminar
      </button>
    </div>
  </div>
`

    cartContainer.appendChild(card)
  })

  totalElement.textContent = `Total: ${formatPrice(total)}`
  updateCartCount(); // Actualizar contador
}

// Eliminar producto
cartContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("remove-item")) {
    const index = e.target.getAttribute("data-index")
    let cart = getCart()
    cart.splice(index, 1)
    saveCart(cart)
    renderCart() //Actualizar contador
  }
})

// Vaciar carrito
if (clearButton) {
  clearButton.addEventListener("click", () => {
    localStorage.removeItem("cart")
    renderCart()
  })
}

// Render inicial
renderCart()


