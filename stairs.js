
console.log("stairs.js loaded");
import {choc, set_content, on, DOM} from './factory.js';
const {"svg:a": SVGA, "svg:g": GROUP, "svg:circle": CIRCLE, "svg:path": PATH, "svg:svg": SVG} = choc; //autoimport
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

function renderWalkingPerson(node) {

  return node.appendChild(
    SVG({
      fill: 'none',
      viewBox: '0 0 1600 900',
      stroke: 'black',
      'stroke-width': '4',
      style: 'width: 800px; height: 450px; border: 1px solid black;',
    }, [
      PATH({
        d: 'M -180, 200 ' + Array(Math.ceil(900/40)).join(' h' + 60 + ' v' + 40),
        id: 'escalator',
      }),
      GROUP({id: 'person'},
        [SVGA({title:"happiness", href: '#'}, CIRCLE({
          fill: 'none',
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
        PATH({
          d: 'M 790,275 l 30, 75 ',
          id: 'right-leg-thigh',
          stroke: 'red',
        }),
        PATH({
          d: 'M 820, 350 l 0, 75 ',
          id: 'right-leg-calf',
          stroke: 'blue',
        })]
    )
    ])
  );
}

renderWalkingPerson(DOM('main'));
