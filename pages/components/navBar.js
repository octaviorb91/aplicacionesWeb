const url = 'http://127.0.0.1:5500/'

const navElements = [
    {title:'Home', link: `${url}index.html`},
    {title:'Marvel', link: `${url}pages/Marvel.html`},
    {title:'Lord of rings', link: `${url}pages/LordOfRings.html`},
    {title:'Back to the future', link: `${url}pages/BackToFuture.html`}
]

export const navBarComponent = `
    <nav class="navbar navbar-expand-lg bg-body-tertiary px-4 mb-4">
        <div class="container-fluid">
            <img src="${url}images/iconEmporio.png" alt="Logo" style="height: 40px;" class="me-2">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbar-collapse" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarCollapse">
                <ul class="navbar-nav">
                    ${
                        navElements.map(e => {
                            return `
                                <li class="nav-item">
                                    <a class="nav-link" href=${e.link}>${e.title}</a>
                                </li>
                            `
                        }).join(' ')
                            
                    }
                </ul>
                <div class="ms-auto d-flex">
                    <button class="btn btn-success rounded-pill me-2" onclick="window.location.href='/pages/InicioSesion.html'"><i class="bi bi-person-circle"></i></button>
                    <button class="btn btn-danger"><i class="bi bi-box-arrow-left" onclick="window.location.href='/pages/InicioSesion.html'"></i></button>
                </div>
            </div>
        </div>
    </nav>
`