// Desc: An experiment in animating SVG with CSS
import {choc, set_content, on, DOM} from './factory.js';
const {"svg:a": SVGA, "svg:g": GROUP, "svg:circle": CIRCLE, "svg:path": PATH, "svg:svg": SVG, "svg:text": SVGTEXT} = choc; //autoimport

function renderWalkingPerson(node) {

  return node.appendChild(
    SVG({
      fill: 'none',
      viewBox: '0 0 1600 900',
      stroke: 'var(--brand-primary)',
      'stroke-width': '4',
      style: 'max-width: 100%; height: auto; border: 1px solid black;',
    }, [
      PATH({
        d: 'M -180, 200 ' + Array(Math.ceil(900/40)).join(' h' + 60 + ' v' + 40),
        id: 'escalator',
      }),
      GROUP({id: 'person'},
        [SVGA({title:"happiness", href: '#'}, CIRCLE({
          fill: 'transparent',
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

renderWalkingPerson(DOM('main'));
