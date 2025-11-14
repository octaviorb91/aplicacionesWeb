import { navBarComponent } from "./pages/components/navBar.js"
import { cardComponent } from "./pages/components/cards.js"



// Index
const indexProducts = [
  {
    title: "Anillo único",
    imageUrl: "./images/anillo.jpg",
    price: "$2.666.999,60",
    oldPrice: "$3.000.000",
    installments: "9 cuotas sin interés de $296.333,28",
    shipping: "Envío gratis"
  },
  {
    title: "Condensador de flujo",
    imageUrl: "./images/condensadorDeFlujo.jpg",
    price: "$523.170",
    oldPrice: "$556.000",
    installments: "9 cuotas sin interés de $58.130",
    shipping: "Envío gratis"
  },
  {
    title: "Mjolnir",
    imageUrl: "./images/mjolnir.jpg",
    price: "$125.999",
    oldPrice: "$150.000",
    installments: "6 cuotas sin interés de $20.999,83",
    shipping: "Envío gratis"
  }
]

// Marvel
const marvelProducts = [
  {
    title: "Teseracto",
    imageUrl: "../images/teseract.jpg",
    price: "$15.825.999,50",
    oldPrice: "$16.000.000",
    installments: "9 cuotas sin interés de $1.758.444,38",
    shipping: "Envío gratis"
  },
  {
    title: "Guante del infinito",
    imageUrl: "../images/guanteInfinito.jpg",
    price: "$256.999,99",
    oldPrice: "", // no tiene precio tachado
    installments: "18 cuotas sin interés de $14.277,77",
    shipping: "Envío gratis"
  },
  {
    title: "Mjolnir",
    imageUrl: "../images/mjolnir.jpg",
    price: "$125.999",
    oldPrice: "$150.000",
    installments: "6 cuotas sin interés de $20.999,83",
    shipping: "Envío gratis"
  }
]

// Lord of the Rings
const lotrProducts = [
  {
    title: "Anillo único",
    imageUrl: "../images/anillo.jpg",
    price: "$2.666.999,60",
    oldPrice: "$3.000.000",
    installments: "9 cuotas sin interés de $296.333,28",
    shipping: "Envío gratis"
  },
  {
    title: "Bastón de Gandalf el gris",
    imageUrl: "../images/bastonGandalf.jpg",
    price: "$109.200",
    oldPrice: "", // no tiene precio tachado
    installments: "12 cuotas sin interés de $9.100",
    shipping: "Envío gratis"
  },
  {
    title: "Luz de Eärendil",
    imageUrl: "../images/frascoGaladriel.jpg",
    price: "$58.600",
    oldPrice: "$65.000",
    installments: "9 cuotas sin interés de $6.511,11",
    shipping: "Envío gratis"
  }
]

// Back to the Future
const backToFutureProducts = [
  {
    title: "Hoverboard",
    imageUrl: "../images/hoverBoard.png",
    price: "$12.170",
    oldPrice: "$14.950",
    installments: "9 cuotas sin interés de $1.352,22",
    shipping: "Envío gratis"
  },
  {
    title: "Almanaque deportivo",
    imageUrl: "../images/sportsAlmanac.jpg",
    price: "$64.999",
    oldPrice: "", // no tiene precio tachado
    installments: "12 cuotas sin interés de $5.416,58",
    shipping: "Envío gratis"
  },
  {
    title: "Condensador de flujo",
    imageUrl: "../images/condensadorDeFlujo.jpg",
    price: "$523.170",
    oldPrice: "$556.000",
    installments: "9 cuotas sin interés de $58.130",
    shipping: "Envío gratis"
  }
]


window.addEventListener('load', () => {
  // Navbar
  const navBarContainer = document.querySelector('header')
  if (navBarContainer) {
    navBarContainer.innerHTML = navBarComponent
  }

const path = window.location.pathname
let products = []

if (path.endsWith("index.html") || path === "/") {
  products = indexProducts
} else if (path.endsWith("Marvel.html")) {
  products = marvelProducts
} else if (path.endsWith("LordOfRings.html")) {
  products = lotrProducts
} else if (path.endsWith("BackToFuture.html")) {
  products = backToFutureProducts
}

const container = document.getElementById("cardsContainer")
if (container && products.length > 0) {
  container.innerHTML = products.map(p => cardComponent(p)).join("")
}})
