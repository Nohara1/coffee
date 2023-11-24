const slides = document.querySelectorAll('.main__favorite-containe-slider-slide > div');
const controlSpans = document.querySelectorAll('.main__favorite-containe-control-span')
const prevButton = document.getElementById('left');
const nextButton = document.getElementById('right');

let currentIndex = 0;

function updateActiveIndicator(index) {
    controlSpans.forEach((span, i) => {
      if (i === index) {
        span.classList.add('active');
      } else {
        span.classList.remove('active');
      }
    });
  }

function hideAllSlides() {
  slides.forEach(slide => {
    slide.style.display = 'none';
  });
}

function showSlide(index) {
  hideAllSlides();
  slides[index].style.display = 'block';
  updateActiveIndicator(index)
}

function prevSlide() {
  currentIndex = (currentIndex === 0) ? slides.length - 1 : currentIndex - 1;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex === slides.length - 1) ? 0 : currentIndex + 1;
  showSlide(currentIndex);
}

prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);
 

showSlide(currentIndex);
updateActiveIndicator(currentIndex);