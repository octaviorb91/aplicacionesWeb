const url = window.location.origin + "/";

const navElements = [
    {title:'Home', link: `${url}index.html`},
    {title:'Marvel', link: `${url}pages/Marvel.html`},
    {title:'Lord of rings', link: `${url}pages/LordOfRings.html`},
    {title:'Back to the future', link: `${url}pages/BackToFuture.html`}
]

export const navBarComponent = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary px-4 mb-4">
    <div class="container-fluid">
      <!-- Logo redondo -->
      <img src="${url}images/iconEmporio.png" 
           alt="Logo" 
           style="height: 40px; width: 40px; object-fit: cover;" 
           class="me-2 rounded-circle">

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav">
          ${navElements.map(e => `
            <li class="nav-item">
              <a class="nav-link" href="${e.link}">${e.title}</a>
            </li>
          `).join(" ")}
        </ul>

        <div class="ms-auto d-flex">
          <!-- Botón carrito primero -->
          <button class="btn btn-warning rounded-pill d-flex justify-content-center align-items-center me-2" 
            style="width: 40px; height: 40px;" 
            onclick="window.location.href='${url}pages/Carrito.html'">
            <img src="${url}images/cartIcon.png" alt="Carrito" style="height: 20px; width: 20px;">
          </button>

          <!-- Botón usuario -->
          <button class="btn btn-success rounded-pill me-2" onclick="window.location.href='${url}pages/InicioSesion.html'">
            <i class="bi bi-person-circle"></i>
          </button>

          <!-- Botón logout -->
            <button class="btn btn-danger rounded-pill me-2" onclick="logout()">
                <i class="bi bi-box-arrow-left"></i>
            </button>

        </div>
      </div>
    </div>
  </nav>
`

