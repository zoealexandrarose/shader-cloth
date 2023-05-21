const cloths = [
  { title: "Print #1", src: "images/image1.jpg" },
  { title: "Print #2", src: "images/image2.jpg" },
  { title: "Print #3", src: "images/image3.jpg" },
  { title: "Print #4", src: "images/image4jpg" },
  { title: "Print #5", src: "images/image5.jpg" }
]

const image = document.querySelector("section img")
const description = document.querySelector("div.description")
const prevTag = document.querySelector("nav a.prev")
const nextTag = document.querySelector("nav a.next")

// where are we in the slideshow
let currentSlide = 0
const next = () => {
  currentSlide += 1
  if (currentSlide > cloths.length - 1) {
    currentSlide = 0
  }
  update()
}

const prev = () => {
  currentSlide -= 1
  update()
}

const update = () => {
  description.innerHTML = cloths[currentSlide].title
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
