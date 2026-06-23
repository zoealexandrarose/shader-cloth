const cloths = [
  { title: "Print #1", src: "images/image1.jpg", theme: "" },
  { title: "Print #2", src: "images/image2.jpg", theme: "" },
  { title: "Print #3", src: "images/image3.jpg", theme: "light" },
  { title: "Print #4", src: "images/image4.jpg", theme: "dark" },
  { title: "Print #5", src: "images/image5.jpg", theme: "dark" }
]

const section = document.querySelector("section");
const description = document.querySelector("div.description");
const prevTag = document.querySelector("nav a.prev");
const nextTag = document.querySelector("nav a.next");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, section.clientWidth / section.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setClearColor(0xff0000, 0)
renderer.setSize( section.clientWidth, section.clientHeight );
section.appendChild( renderer.domElement );

// where are we in the slideshow
let currentSlide = 0

// hold state of where we are, and then add things
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;


const next = () => {
  currentSlide += 1
  if (currentSlide > cloths.length - 1) {
    currentSlide = 0
  }
  update();
}

const prev = () => {
  currentSlide -= 1
  if (currentSlide < 0) {
    currentSlide = cloths.length + 1
  }
  update();
}

const update = () => {
  description.innerHTML = cloths[currentSlide].title
  document.body.className = cloths[currentSlide].theme
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}

animate();
update();

prevTag.addEventListener("click", (event) => {
  event.preventDefault();
  prev();
})
nextTag.addEventListener("click", (event) => {
  event.preventDefault();
  next();
})
