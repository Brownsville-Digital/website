if (portfolio) {
  console.log('portfolio');
  console.log(portfolio);
}

const tl = gsap.timeline();
tl.from('#whatsthestory path', {duration: 0.4, stagger: 0.2, fill: "var(--brand-secondary)", opacity: 0, y: "random(-150, 150)", ease: "bounce"});
tl.to('#whoneedstohearit path', {duration: 0.2, stagger: 0.1, fill: "var(--brand-primary)", opacity: 1, ease: "bounce"});
gsap.to("#themap path, #themap circle", {duration: 1, stagger: 1, opacity: 1});
tl.from('#budget', {duration: 1, stagger: 0.3, opacity: 0.5, x: "100%", ease: "bounce"});
/*
var svg1 = document.querySelector('#themap path');
var svg2 = document.querySelector('#svg'+2);
var tl2 = new TimelineMax({repeat:-1, yoyo:true});

//create a timeline with 2 tweens that draw 2 separate strokes
tl2.add(createLineTween(svg1))
  .add(createLineTween(svg2),  "-=1");

//this function creates a single tween that animates the stroke of an svg
function createLineTween(svg) {
   var pathObject = {length:0, pathLength:svg.getTotalLength()};
   var tween = TweenLite.to(pathObject, 2, {length:pathObject.pathLength, onUpdate:drawLine, onUpdateParams:[pathObject, svg], immediateRender:true});
   return tween;
};


 //update stroke
 function drawLine(obj, svg) {
  svg.style.strokeDasharray = [obj.length, obj.pathLength].join(' ');
 }; */
