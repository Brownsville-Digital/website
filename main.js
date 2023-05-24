if (portfolio) {
  console.log('portfolio');
  console.log(portfolio);
}

const tl = gsap.timeline();
tl.from('#whatsthestory path', {duration: 0.4, stagger: 0.2, fill: "var(--brand-secondary)", opacity: 0, y: "random(-150, 150)", ease: "bounce"});
tl.to('#whoneedstohearit path', {duration: 0.2, stagger: 0.1, fill: "var(--brand-primary)", opacity: 1, ease: "bounce"});
tl.from('#downarrow', {duration: 2, fill: "var(--brand-secondary)", opacity: 0, y: "-150", ease: "expo"});

// gsap.to("#themap path, #themap circle", {duration: 1, stagger: 1, opacity: 1});
tl.from('#budget', {duration: 1, stagger: 0.3, opacity: 0.5, x: "100%", ease: "bounce"});

var tl2 = new gsap.timeline();

const mapCircles = document.querySelectorAll('#themap circle');
const mapPaths = document.querySelectorAll('#themap path');

const interleave = ([x, ...xs], ys) =>
  x ? [x, ...interleave(ys, xs)] : ys

const mapped = interleave(mapCircles, mapPaths);

mapped.forEach(item => tl2.add(createLineTween(item)));

//this function creates a single tween that animates the stroke of an svg
function createLineTween(svg) {
  var pathObject = {length: 0, pathLength: svg.getTotalLength()};
  var color = svg.style.fill;
  var tween = TweenLite.to(
    pathObject,
    0.6,
    {
      length: pathObject.pathLength,
      onUpdate: drawLine,
      onUpdateParams: [pathObject, svg, color],
      immediateRender: true
    });
   return tween;
};

 //update stroke
 function drawLine(obj, svg, color) {
   svg.style.strokeDasharray = [obj.length, obj.pathLength].join(' ');
   svg.style.fill = (Math.floor(obj.length) == Math.floor(obj.pathLength)) ? color : "none";
};

// Original Source: https://codepen.io/PointC/pen/YRzRyM
console.clear();
const colorArray = [
  "#683A5E",
  "#262626",
  "#426F42",
  "#8B814C",
  "#36648B",
  "#36648B"
];
const slides = document.querySelectorAll(".slide");
const container = document.querySelector("#slider");
console.log(container);
let dur = 0.5;
let offsets = [];
let oldSlide = 0;
let activeSlide = 0;
let dots = document.querySelector(".dots");
let navDots = [];
let iw = window.innerWidth;
const mouseAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const handAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const cursorAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });
const arrowAnim = gsap.timeline({ repeat: -1, repeatDelay: 1 });

document.querySelector("#leftArrow").addEventListener("click", slideAnim);
document.querySelector("#rightArrow").addEventListener("click", slideAnim);

// set slides background colors and create the nav dots
for (let i = 0; i < slides.length; i++) {
  gsap.set(slides[i], { backgroundColor: colorArray[i] });
  let newDot = document.createElement("div");
  newDot.className = "dot";
  newDot.index = i;
  navDots.push(newDot);
  newDot.addEventListener("click", slideAnim);
  dots.appendChild(newDot);
}


// get elements positioned
gsap.set(".dots, .titleWrap", { xPercent: -50 });
gsap.set(".arrow", { yPercent: -50 });
gsap.set(".title", { y: 30 });

// lower screen animation with nav dots and rotating titles
const dotAnim = gsap.timeline({ paused: true });
dotAnim.to(
  ".dot",
  {
    stagger: { each: 1, yoyo: true, repeat: 1 },
    scale: 2.1,
    rotation: 0.1,
    ease: "none"
  },
  0.5
);
dotAnim.to(
  ".title",
  slides.length + 1,
  { y: -(slides.length * 30), rotation: 0.01, ease: "none" },
  0
);
dotAnim.time(1);

// make the whole thing draggable
let dragMe = Draggable.create(container, {
  type: "x",
  edgeResistance: 1,
  snap: offsets,
  inertia: true,
  bounds: "#slides",
  onDrag: tweenDot,
  onThrowUpdate: tweenDot,
  onDragEnd: slideAnim,
  allowNativeTouchScrolling: false,
  zIndexBoost: false
});

dragMe[0].id = "dragger";
sizeIt();

// main action check which of the 4 types of interaction called the function
function slideAnim(e) {
  oldSlide = activeSlide;
  // dragging the panels
  if (this.id === "dragger") {
    activeSlide = offsets.indexOf(this.endX);
  } else {
    if (gsap.isTweening(container)) {
      return;
    }
    // arrow clicks
    if (this.id === "leftArrow" || this.id === "rightArrow") {
      activeSlide =
        this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
      // click on a dot
    } else if (this.className === "dot") {
      activeSlide = this.index;
      // scrollwheel
    } else {
      activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
    }
  }
  // make sure we're not past the end or beginning slide
  activeSlide = activeSlide < 0 ? 0 : activeSlide;
  activeSlide = activeSlide > slides.length - 1 ? slides.length - 1 : activeSlide;
  if (oldSlide === activeSlide) {
    return;
  }
  // if we're dragging we don't animate the container
  if (this.id != "dragger") {
    gsap.to(container, dur, { x: offsets[activeSlide], onUpdate: tweenDot });
  }
}

// update the draggable element snap points
function sizeIt() {
  offsets = [];
  iw = window.innerWidth;
  gsap.set("#slides", { width: slides.length * iw });
  gsap.set(slides, { width: iw });
  for (let i = 0; i < slides.length; i++) {
    offsets.push(-slides[i].offsetLeft);
  }
  gsap.set(container, { x: offsets[activeSlide] });
  dragMe[0].vars.snap = offsets;
}

gsap.set(".hideMe", { opacity: 1 });
window.addEventListener("wheel", slideAnim);
window.addEventListener("resize", sizeIt);

// update dot animation when dragger moves
function tweenDot() {
  gsap.set(dotAnim, {
    time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
  });
}
