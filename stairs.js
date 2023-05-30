console.clear();
const main = document.createElement('main');
/* const walkingPerson = document.createElement('svg');
walkingPerson.setAttribute("viewBox", "0 0 1600 900");
walkingPerson.setAttribute("xmlns", "http://www.w3.org/2000/svg");
walkingPerson.style.width = "800px";
walkingPerson.style.height = "450px";
walkingPerson.style.border = "1px solid black";
walkingPerson.style.stroke = 'black';
walkingPerson.style.strokeWidth = '3px';
walkingPerson.style.fill = 'none';
const personHead = document.createElement('circle');
personHead.style.fill = 'none';
personHead.style.cx = '800';
personHead.style.cy = '100';
personHead.style.r = '40';
personHead.style.display = 'block';
const torso = document.createElement('path');
torso.style.stroke = 'black';
torso.setAttribute('d', 'M 800,140 v 120');
const stairs = document.createElement('path');
stairs.setAttribute('name', 'stairs');
stairs.setAttribute('d', 'M 0,100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100');
const btn = document.createElement('button');
btn.id = 'btn';
btn.innerText = 'Click me';
btn.style.display = 'block';
btn.onclick = (e) => {
  console.log(e.target);
};
setTimeout(function(){
  stairs.setAttribute('transform', "translate(0,100) rotate(0.5)");
  stairs.setAttribute('stroke', "green");
  stairs.setAttribute('name', "escalator");
    console.log({"stairs": stairs.getAttribute('name')});
    setTimeout( () => {
        stairs.removeAttribute('transform');
    }, 500)
}, 2500);
walkingPerson.append(personHead, torso, stairs);
main.appendChild(btn);
main.appendChild(walkingPerson); */
document.body.innerHTML = '';
document.body.appendChild(main);

function renderWalkingPerson(node) {
  const walkingPersonSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const stairsPath = document.createElementNS(
    'http://www.w3.org/2000/svg',
    'path'
  );

  walkingPersonSvg.setAttribute('fill', 'none');
  walkingPersonSvg.setAttribute('viewBox', '0 0 1600 900');
  walkingPersonSvg.setAttribute('stroke', 'black');
  walkingPersonSvg.style.width = '800px';
  walkingPersonSvg.style.height = '450px';
  walkingPersonSvg.classList.add('walking-person');

  stairsPath.setAttribute(
    'd',
    'M -100, 0, h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100 h 100, v 100'
  );
  stairsPath.setAttribute('stroke-width', '4');
  const personHead = document.createElementNS('http://www.w3.org/2000/svg','circle');
  personHead.style.fill = 'none';
  personHead.style.cx = '800';
  personHead.style.cy = '100';
  personHead.style.r = '40';
  personHead.style.display = 'block';
  personHead.setAttribute('stroke-width', '4');
  const torso = document.createElementNS('http://www.w3.org/2000/svg','path');
  torso.style.stroke = 'black';
  torso.setAttribute('d', 'M 800,140 v 120');
  torso.setAttribute('stroke-width', '4');

  walkingPersonSvg.append(stairsPath, personHead, torso);

  setInterval(function(){
    stairsPath.removeAttribute('transform');
    stairsPath.style.transition = 'none';
    setTimeout(() => {
      stairsPath.setAttribute('transform', "translate(100,100)");
      stairsPath.style.transition = 'all 1s linear';
    }, 0);
  }, 1000);

  return node.appendChild(walkingPersonSvg);
}

renderWalkingPerson(main);
