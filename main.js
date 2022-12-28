if (portfolio) {
  console.log('portfolio');
  console.log(portfolio);
}

const tl = gsap.timeline();
tl.from('#whatsthestory path', {duration: 0.4, stagger: 0.2, fill: "var(--brand-secondary)", opacity: 0, y: "random(-150, 150)", ease: "bounce"});
tl.to('#whoneedstohearit path', {duration: 0.2, stagger: 0.1, fill: "var(--brand-primary)", opacity: 1, ease: "bounce"});
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
