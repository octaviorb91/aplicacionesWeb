import { navBarComponent } from "../pages/components/navBar.js"

window.addEventListener("load", () => {
  // Navbar
  const navBarContainer = document.querySelector("header")
  if (navBarContainer) {
    navBarContainer.innerHTML = navBarComponent
  }

  // Formulario
  const form = document.querySelector("form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const nombre = document.getElementById("txtNombre").value.trim()
    const email = document.getElementById("txtEmail").value.trim()
    const password = document.getElementById("txtPass").value.trim()

    // Crear objeto usuario
    const newUser = {
      name: nombre,
      email: email,
      password: password,
      photoUrl: "../images/gollum.jpg" // imagen por defecto
    }

    // Guardar en sessionStorage
    sessionStorage.setItem("user", JSON.stringify(newUser))

    // Redirigir a user.html
    window.location.href = "../privatePages/user.html"
  })
})
