
import {choc, set_content, on, DOM} from './factory.js';
const {H1, "svg:a": SVGA, "svg:g": GROUP, "svg:circle": CIRCLE, "svg:path": PATH, "svg:svg": SVG, "svg:text": SVGTEXT} = choc; //autoimport

function renderWalkingPerson(node) {

  return node.appendChild(
    SVG({
      fill: 'none',
      viewBox: '0 0 1600 900',
      stroke: 'var(--brand-primary)',
      'stroke-width': '4',
      style: 'max-width: 100%; height: auto;',
      id: 'walkingPerson',
    }, [
      PATH({
        d: 'M -180, 200 ' + Array(Math.ceil(900/40)).join(' h' + 60 + ' v' + 40),
        id: 'escalator',
      }),
      GROUP({id: 'person'},
        [SVGA({title:"happiness", href: '#'}, CIRCLE({
          cx: '810',
          cy: '100',
          r: '40',
        })),
        PATH({
          d: 'M 800,140 l -10 135',
          id: 'torso',
        }),
        PATH({
          d: 'M 797,170 l -30, 45 l 20, 45',
          id: 'left-arm',
        }),
        PATH({
          d: 'M 797,170 l 15, 45 l 30, 45 ',
          id: 'right-arm',
        }),
        GROUP({id: 'left-leg'}, [
          PATH({
            d: 'M 790,275 l 0, 75 ',
            id: 'left-thigh',
          }),
          PATH({
            d: 'M 790, 350 l 0, 65 ',
            id: 'left-calf',
          }),
        ]),
        GROUP({id: 'right-leg'}, [
          PATH({
            d: 'M 790,275 l 0, 75 ',
            id: 'right-thigh',
          }),
          PATH({
            d: 'M 790, 350 l 0, 65 ',
            id: 'right-calf',
          })
        ]),
      ]),
      SVGTEXT({x:'50%', y: 100, style: 'font: 50px monospace;', 'stroke-width': 0, fill: 'var(--brand-primary)', 'max-width': '50%'}, "Enjoy an experiment in"),
      SVGTEXT({x:'50%', y: 150, style: 'font: 50px monospace;', 'stroke-width': 0, fill: 'var(--brand-primary)', 'max-width': '50%'}, "animating scalable vector "),
      SVGTEXT({x:'50%', y: 200, style: 'font: 50px monospace;', 'stroke-width': 0, fill: 'var(--brand-primary)', 'max-width': '50%'}, "graphics with CSS.")]) // End SVG
  );
}

renderWalkingPerson(document.querySelector("#walkingPerson"));

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

const colorArray = [
  "#4B7C8E",
  "#F3F5D6",
  "#0A2134",
  "#CBBB9D",
  "#4B7C8E",
];
const slides = document.querySelectorAll("#slider section");
const container = document.querySelector("#slides");
if (container) {
  console.log("container exists");
  let dur = 0.5;
  let offsets = [];
  let oldSlide = 0;
  let activeSlide = 0;
  console.log({"activeSlide": activeSlide});
  let dots = document.querySelector(".dots");
  let navDots = [];
  let iw = window.innerWidth;
  const leftArrow = document.querySelector("#leftArrow");
  const rightArrow = document.querySelector("#rightArrow");

  leftArrow && leftArrow.addEventListener("click", slideAnim);
  rightArrow && rightArrow.addEventListener("click", slideAnim);

  // set slides background colors and create the nav dots
  for (let i = 0; i < slides.length; i++) {
    gsap.set(slides[i], {backgroundColor: colorArray[i]});
    let newDot = document.createElement("div");
    newDot.className = "dot";
    newDot.index = i;
    navDots.push(newDot);
    newDot.addEventListener("click", slideAnim);
    dots.appendChild(newDot);
  }

  // get elements positioned
  gsap.set(".dots, .titleWrap", {xPercent: -50});
  gsap.set(".arrow", {yPercent: -50});
  gsap.set(".title", {y: 30});

  // lower screen animation with nav dots and rotating titles
  const dotAnim = gsap.timeline({paused: true});
  dotAnim.to(
    ".dot",
    {
      stagger: {each: 1, yoyo: true, repeat: 1},
      scale: 2.1,
      rotation: 0.1,
      ease: "none"
    },
    0.5
  );
  dotAnim.to(
    ".title",
    slides.length + 1,
    {y: -(slides.length * 30), rotation: 0.01, ease: "none"},
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
  })[0];

  dragMe.id = "dragger";
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
        activeSlide = this.id === "rightArrow" ? (activeSlide += 1) : (activeSlide -= 1);
        // click on a dot
      } else if (this.className === "dot") {
        activeSlide = this.index;
        // scrollwheel
      } else {
        // activeSlide = e.deltaY > 0 ? (activeSlide += 1) : (activeSlide -= 1);
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
      gsap.to(container, dur, {x: offsets[activeSlide], onUpdate: tweenDot});
    }
  }


  // update the draggable element snap points
  function sizeIt() {
    offsets = [];
    iw = window.innerWidth;
    gsap.set("#slides", {width: slides.length * iw});
    gsap.set(slides, {width: iw});
    for (let i = 0; i < slides.length; i++) {
      offsets.push(-slides[i].offsetLeft);
    }
    gsap.set(container, {x: offsets[activeSlide]});
    dragMe.vars.snap = offsets;
  }

  gsap.set(".hideMe", {opacity: 1});
  window.addEventListener("wheel", slideAnim);
  window.addEventListener("resize", sizeIt);

  // update dot animation when dragger moves
  function tweenDot() {
    gsap.set(dotAnim, {
      time: Math.abs(gsap.getProperty(container, "x") / iw) + 1
    });
  }
} // End if container
