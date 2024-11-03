const tabsBox = document.querySelector(".tabs-box"),
allTabs = tabsBox.querySelectorAll(".tab"),
arrowIcons = document.querySelectorAll(".icon i");

let isDragging = false;

const handleIcons = (scrollVal) => {
    let maxScrollableWidth = tabsBox.scrollWidth - tabsBox.clientWidth;
    arrowIcons[0].parentElement.style.display = scrollVal <= 0 ? "none" : "flex";
    arrowIcons[1].parentElement.style.display = maxScrollableWidth - scrollVal <= 1 ? "none" : "flex";
}

arrowIcons.forEach(icon => {
    icon.addEventListener("click", () => {
        // if clicked icon is left, reduce 350 from tabsBox scrollLeft else add
        let scrollWidth = tabsBox.scrollLeft += icon.id === "left" ? -340 : 340;
        handleIcons(scrollWidth);
    });
});

allTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabsBox.querySelector(".active").classList.remove("active");
        tab.classList.add("active");
    });
});

const dragging = (e) => {
    if(!isDragging) return;
    tabsBox.classList.add("dragging");
    tabsBox.scrollLeft -= e.movementX;
    handleIcons(tabsBox.scrollLeft)
}

const dragStop = () => {
    isDragging = false;
    tabsBox.classList.remove("dragging");
}

tabsBox.addEventListener("mousedown", () => isDragging = true);
tabsBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);



// ----------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll('.slider__slide');
    const indicators = document.querySelector('.slider__indicators');
  
    for (let i = 1; i <= slides.length; i++) {
      const indicator = document.createElement('div');
      indicator.classList.add('slider__indicator');
      indicator.setAttribute('data-slide', i);
      indicators.appendChild(indicator);
    }
  
    setTimeout(function () {
      document.querySelectorAll('.slider__wrap').forEach((wrap) => {
        wrap.classList.add('slider__wrap--hacked');
      });
    }, 1000);
  });
  
  function goToSlide(number) {
    document.querySelectorAll('.slider__slide').forEach((slide) => {
      slide.classList.remove('slider__slide--active');
    });
    document.querySelector(`.slider__slide[data-slide="${number}"]`).classList.add('slider__slide--active');
  }
  
  document.querySelectorAll('.slider__next, .go-to-next').forEach((button) => {
    button.addEventListener('click', function () {
      const currentSlide = Number(document.querySelector('.slider__slide--active').getAttribute('data-slide'));
      const totalSlides = document.querySelectorAll('.slider__slide').length;
      let nextSlide = currentSlide + 1;
  
      if (nextSlide > totalSlides) {
        nextSlide = 1;
      }
  
      goToSlide(nextSlide);
    });
  });
  