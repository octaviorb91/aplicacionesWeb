import { navBarComponent } from "../pages/components/navBar.js"

window.addEventListener("load", () => {
  // Navbar
  const navBarContainer = document.querySelector("header")
  if (navBarContainer) navBarContainer.innerHTML = navBarComponent

  // Formulario
  const form = document.getElementById("loginForm")
  const alertBox = document.getElementById("loginAlert")

  form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const email = document.getElementById("email").value.trim()
    const password = document.getElementById("password").value.trim()

    try {
      const response = await fetch("../data/users.json")
      const users = await response.json()

      const user = users.find(u => u.email === email && u.password === password)

      if (user) {
        sessionStorage.setItem("user", JSON.stringify(user))
        window.location.href = "../privatePages/user.html"
      } else {
        // Mostrar error
        const message = "Usuario o contraseña incorrectos. Por favor, verificá los datos e intentá nuevamente.";
        if (alertBox) {
          alertBox.innerHTML = `
            <div class="alert alert-danger d-flex align-items-center" role="alert">
              <i class="bi bi-exclamation-triangle-fill me-2"></i>
              <div>${message}</div>
            </div>`;
        } else {
          alert(message)
        }
      }
    } catch (error) {
      console.error("Error cargando usuarios:", error);
      const message = "No se pudo procesar el inicio de sesión. Intentá más tarde.";
      if (alertBox) {
        alertBox.innerHTML = `
          <div class="alert alert-warning d-flex align-items-center" role="alert">
            <i class="bi bi-exclamation-circle me-2"></i>
            <div>${message}</div>
          </div>`
      } else {
        alert(message)
      }
    }
  })
})

window.logout = () => {
  sessionStorage.clear()
  window.location.href = "../pages/InicioSesion.html"
}
