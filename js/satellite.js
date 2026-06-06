function changeMainImage(src, btn) {

  document.getElementById('main-preview-img').src = src;

  const btns = document.querySelectorAll('.gallery-thumb');

  btns.forEach(b => {

    b.classList.remove('ring-2', 'ring-gray-900', 'opacity-100');

    b.classList.add('opacity-70');

  });

  btn.classList.add('ring-2', 'ring-gray-900', 'opacity-100');

  btn.classList.remove('opacity-70');

}

function scrollSlider(direction) {

  const slider = document.getElementById('similar-scroll');

  if (slider) {

    const amount = direction * slider.clientWidth;

    slider.scrollBy({ left: amount, behavior: 'smooth' });

  }

}

document.addEventListener('DOMContentLoaded', () => {

  const slider = document.getElementById('similar-scroll');

  const btnPrev = document.getElementById('slider-prev');

  const btnNext = document.getElementById('slider-next');

  if (slider && btnPrev && btnNext) {

    const updateButtons = () => {

      btnPrev.disabled = slider.scrollLeft <= 10; btnNext.disabled = slider.scrollLeft + slider.clientWidth >= slider.scrollWidth - 10;

    };

    slider.addEventListener('scroll', updateButtons);

    window.addEventListener('resize', updateButtons);

    setTimeout(updateButtons, 150);

  }

});

