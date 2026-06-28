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
const camera = new THREE.PerspectiveCamera( 55, section.clientWidth / section.clientHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
renderer.setClearColor(0xff0000, 0)
renderer.setSize( section.clientWidth, section.clientHeight );
section.appendChild( renderer.domElement );

let currentSlide = 0;
let currentRotationY = 0;
let aimRotationY = 0;

const loader = new THREE.TextureLoader();
const clock = new THREE.Clock();
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const arc = Math.PI * 2  / cloths.length

cloths.forEach((cloth, index) => {
  cloth.uniforms = {
    image: { value: loader.load(cloth.src) },
    time: { value: clock.getElapsedTime() },
    mouse: { value: mouse },
    touchUv: { value: new THREE.Vector2(0.5, 0.5) }
  }

  const dpi = 100;
  // hold state of where we are, and then add things
  const geometry = new THREE.PlaneGeometry(4, 6, dpi, dpi * 1.5);
  const material = new THREE.ShaderMaterial({
    uniforms: cloth.uniforms,
    vertexShader: vert,
    fragmentShader: frag
  });
  const shape = new THREE.Mesh( geometry, material );

  const group = new THREE.Group();
  group.rotation.set(0, index * arc, 0);
  shape.position.set(0, 0, -10);

  cloth.shape = shape;

  group.add( shape );
  scene.add(group)
})



const next = () => {
  currentSlide += 1
  aimRotationY -= arc
  if (currentSlide > cloths.length - 1) {
    currentSlide = 0
  }
  update();
}

const prev = () => {
  currentSlide -= 1
  aimRotationY += arc
  if (currentSlide < 0) {
    currentSlide = cloths.length + 1
  }
  update();
}

const update = () => {
  description.innerHTML = cloths[currentSlide].title
  document.body.className = cloths[currentSlide].theme
}

const animate = () => {
  const diffY = (aimRotationY - currentRotationY) * 0.025;
  currentRotationY += diffY;
  camera.rotation.set(0, currentRotationY, 0);

  raycaster.setFromCamera(mouse, camera)

  cloths.forEach(cloth => {
    cloth.uniforms.time = { value: clock.getElapsedTime() }
    cloth.uniforms.mouse = { value: mouse }

    const intersects = raycaster.intersectObject(cloth.shape)
    if (intersects.length > 0) {
      cloth.uniforms.touchUv = { value: intersects[0].uv }
    } else {

    }
  })

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

window.addEventListener('mousemove', function (event) {
  mouse.x = event.clientX / section.clientWidth * 2 - 1;
  mouse.y = event.clientY / section.clientHeight * -2 + 1;
})
