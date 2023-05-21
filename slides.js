const cloths = [
  { title: "Print #1", src: "images/image1.jpg", theme: "" },
  { title: "Print #2", src: "images/image2.jpg", theme: "" },
  { title: "Print #3", src: "images/image3.jpg", theme: "light" },
  { title: "Print #4", src: "images/image4.jpg", theme: "dark" },
  { title: "Print #5", src: "images/image5.jpg", theme: "dark" }
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
  if (currentSlide < 0) {
    currentSlide = cloths.length + 1
  }
  update()
}

const update = () => {
  description.innerHTML = cloths[currentSlide].title
  image.setAttribute("src", cloths[currentSlide].src)
  document.body.className = cloths[currentSlide].theme
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
