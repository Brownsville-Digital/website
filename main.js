if (portfolio) {
  console.log('portfolio');
  console.log(portfolio);
}

const tl = gsap.timeline();
tl.from('#whatsthestory path', {duration: 0.4, stagger: 0.2, opacity: 0, y: "random(-150, 150)", ease: "bounce"});
tl.to('#whoneedstohearit path', {duration: 0.2, stagger: 0.1, opacity: 1, ease: "bounce"});
tl.to(".box", {rotation: 27, x: 30, duration: 1, opacity: 1});
tl.from('#budget', {duration: 1, stagger: 0.3, opacity: 0.5, x: "100%", ease: "bounce"});
