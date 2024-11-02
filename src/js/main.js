import "../css/reset.css";
import "../css/main.css";
import "../css/slider.css";
import "../css/media.css";

import "./background.js";
import "./slider.js";
import "./scroll.js";
import "./text.js";

import me from '../images/me.png';

import cs from '../images/projects/cs.png';
import pt from '../images/projects/pt.png';
import wvm from '../images/projects/wvm.png';

import js from '../images/icons/js.svg';
import ht from '../images/icons/html.svg';
import ts from '../images/icons/ts.svg';
import react from '../images/icons/react.svg';

import figma from '../images/icons/figma.svg';
import tilda from '../images/icons/tilda.svg';
import ill from '../images/icons/illustrator.svg';
import pro from '../images/icons/procreate.svg';

import qrF from '../images/qr/figma.png';
import qrG from '../images/qr/github.png';


function loadImg(id, source) {
  var idImg = document.getElementById(id);
  idImg.src = source;
}

loadImg('cs', cs);
loadImg('me', me);

loadImg('cs', cs);
loadImg('pt', pt);
loadImg('wvm', wvm);

loadImg('js1', js);
loadImg('js2', js);
loadImg('ht1', ht);
loadImg('ht2', ht);
loadImg('ts1', ts);
loadImg('ts2', ts);
loadImg('r1', react);
loadImg('r2', react);

loadImg('f1', figma);
loadImg('f2', figma);
loadImg('t1', tilda);
loadImg('t2', tilda);
loadImg('ill1', ill);
loadImg('ill2', ill);
loadImg('pr1', pro);
loadImg('pr2', pro);

loadImg('qr-f', qrF);
loadImg('qr-g', qrG);


const nav = document.querySelector("#nav");
const navBtn = document.querySelector("#nav-btn");
const navBtnImg = document.querySelector("#nav-btn-img");

navBtn.onclick = () => {
  if (nav.classList.toggle("open")) {
    navBtnImg.innerHTML = '<use href="#close" />';
  } else {
    navBtnImg.innerHTML = '<use href="#open" />';
  }
};

document
  .getElementById("toggle_checkbox")
  .addEventListener("click", function () {
    const currentTheme = document.body.className;
    if (currentTheme === "light-theme") {
      document.body.className = "dark-theme";
    } else {
      document.body.className = "light-theme";
    }
  });

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    navBtn.click();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  });
});
