/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\nvar nav = document.querySelector(\"#nav\");\nvar navBtn = document.querySelector(\"#nav-btn\");\nvar navBtnImg = document.querySelector(\"#nav-btn-img\");\n\n// document.getElementById('theme-toggle').addEventListener('click', function () {\n//   document.body.classList.toggle('dark-theme');\n// });\n\nnavBtn.onclick = function () {\n  if (nav.classList.toggle(\"open\")) {\n    navBtnImg.innerHTML = '<use href=\"#close\" />';\n  } else {\n    navBtnImg.innerHTML = '<use href=\"#open\" />';\n  }\n};\ndocument.getElementById('toggle_checkbox').addEventListener('click', function () {\n  var currentTheme = document.body.className;\n  if (currentTheme === 'light-theme') {\n    document.body.className = 'dark-theme';\n  } else {\n    document.body.className = 'light-theme';\n  }\n});\ndocument.querySelectorAll('a[href^=\"#\"]').forEach(function (anchor) {\n  anchor.addEventListener('click', function (e) {\n    e.preventDefault();\n    navBtn.click();\n    document.querySelector(this.getAttribute('href')).scrollIntoView({\n      behavior: 'smooth',\n      block: 'start',\n      inline: \"nearest\"\n    });\n  });\n});\nAOS.init({\n  // disable: 'phone'\n  // once: true\n});\n\n//# sourceURL=webpack://portfolio/./src/js/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/main.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;