const image = document.querySelector("section img")
const description = document.querySelector("div.description")
const prevTag = document.querySelector("nav a.prev")
const nextTag = document.querySelector("nav a.next")

// where are we in the slideshow
let currentSlide = 0
const next = () => {
  currentSlide += 1
  update()
}

const prev = () => {
  currentSlide -= 1
  update()
}

const update = () => {
  description.innerHTML = currentSlide
}
update()

prevTag.addEventListener("click", (event) => {
  event.preventDefault()
  prev()
})
nextTag.addEventListener("click", (event) => {
  event.preventDefault()
  next()
})
