(function () {
  "use strict";

  var carousel = document.getElementsByClassName("carousel")[0],
    slider = carousel.getElementsByClassName("carousel__slider")[0],
    items = carousel.getElementsByClassName("carousel__slider__item"),
    prevBtn = carousel.getElementsByClassName("arrow-button")[0],
    nextBtn = carousel.getElementsByClassName("arrow-button")[1],
    maxWidth = window.innerWidth;

  console.log(maxWidth);
  var margin = 0;
  var totalWidth = 0,
    currIndex = 0,
    interval,
    intervalTime = 4000;

  var width = 964;
  var height = 404;

  function getSize(mW) {
    if (mW <= 767) {
      width = 288;
      height = 411;
    } else if (mW <= 1023) {
      width = 700;
      height = 290;
    }
    else {
      width = 964;
      height = 404;
    }
    return width, height;
  }


  function init() {
    resize();
    move(Math.floor(items.length / 2));
    bindEvents();

    timer();
  }

  function resize() {
    maxWidth = window.innerWidth;
    width, height = getSize(maxWidth);
    totalWidth = width * items.length;

    slider.style.width = totalWidth + "px";

    for (var i = 0; i < items.length; i++) {
      let item = items[i];
      item.style.width = width + "px";
      item.style.height = height + "px";
    }
  }

  function move(index) {
    if (index < 1) index = items.length;
    if (index > items.length) index = 1;
    currIndex = index;

    for (var i = 0; i < items.length; i++) {
      let item = items[i],
        box = item.getElementsByClassName("item__3d-frame")[0];
      if (i == index - 1) {
        item.classList.add("carousel__slider__item--active");
        box.style.transform = "perspective(1000px)";
      } else {
        item.classList.remove("carousel__slider__item--active");
        box.style.transform =
          "perspective(1000px) rotateY(" + (i < index - 1 ? 30 : -30) + "deg)";
      }
    }

    slider.style.transform =
      "translate3d(" +
      (index * -width + width / 2 + window.innerWidth / 2) +
      "px, 0px, 0px)";
  }

  function timer() {
    clearInterval(interval);
    interval = setInterval(() => {
      move(++currIndex);
    }, intervalTime);
  }

  function prev() {
    move(--currIndex);
    timer();
  }

  function next() {
    move(++currIndex);
    timer();
  }

  function bindEvents() {
    window.onresize = resize;
    prevBtn.addEventListener("click", () => {
      prev();
    });
    nextBtn.addEventListener("click", () => {
      next();
    });
  }

  init();
})();
