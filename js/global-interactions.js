document.addEventListener('DOMContentLoaded', () => {

  console.log('DataOrbit — Home loaded');

  const dragScrollContainers = document.querySelectorAll('.drag-scroll');

  dragScrollContainers.forEach(container => {

    let isDown = false;

    let startX;

    let scrollLeft;

    let isDragging = false;

    container.addEventListener('dragstart', (e) => {

      e.preventDefault();

    });

    container.addEventListener('click', (e) => {

      if (isDragging) {

        e.preventDefault();

      }

    });

    container.addEventListener('mousedown', (e) => {

      isDown = true;

      isDragging = false;

      container.classList.add('cursor-grabbing');

      container.classList.remove('cursor-pointer');

      container.style.scrollSnapType = 'none';

      startX = e.pageX - container.offsetLeft;

      scrollLeft = container.scrollLeft;

    });

    container.addEventListener('mouseleave', () => {

      if (!isDown) return;

      isDown = false;

      container.classList.remove('cursor-grabbing');

      container.style.scrollSnapType = '';

    });

    container.addEventListener('mouseup', () => {

      isDown = false;

      container.classList.remove('cursor-grabbing');

      container.style.scrollSnapType = '';

    });

    container.addEventListener('mousemove', (e) => {

      if (!isDown) return;

      e.preventDefault();

      const x = e.pageX - container.offsetLeft;

      const walk = (x - startX) * 2;

      if (Math.abs(walk) > 5) {

        isDragging = true;

      }

      container.scrollLeft = scrollLeft - walk;

    });

  });

  const catSlider = document.getElementById('category-scroll');

  const catPrev = document.getElementById('cat-prev');

  const catNext = document.getElementById('cat-next');

  const catDots = document.querySelectorAll('#category-dots div');

  if (catSlider && catPrev && catNext) {

    const updateCatControls = () => {

      catPrev.disabled = catSlider.scrollLeft <= 10; catNext.disabled = catSlider.scrollLeft + catSlider.clientWidth >= catSlider.scrollWidth - 10;

      if (catDots.length > 0) {

        const maxScroll = catSlider.scrollWidth - catSlider.clientWidth;

        const percentage = maxScroll > 0 ? (catSlider.scrollLeft / maxScroll) : 0;

        let activeIndex = Math.round(percentage * (catDots.length - 1));

        catDots.forEach((dot, index) => {

          if (index === activeIndex) {

            dot.classList.remove('bg-gray-200');

            dot.classList.add('bg-gray-900');

          } else {

            dot.classList.remove('bg-gray-900');

            dot.classList.add('bg-gray-200');

          }

        });

      }

    };

    catSlider.addEventListener('scroll', updateCatControls);

    window.addEventListener('resize', updateCatControls);

    setTimeout(updateCatControls, 150);

    const categoriesBtn = document.getElementById('categoriesDropdownBtn');

    if (categoriesBtn) {

      categoriesBtn.addEventListener('click', () => {

        setTimeout(updateCatControls, 100);

      });

    }

    catPrev.addEventListener('click', () => {

      const itemWidth = catSlider.firstElementChild ? catSlider.firstElementChild.offsetWidth + 24 : catSlider.clientWidth;

      catSlider.scrollBy({ left: -itemWidth, behavior: 'smooth' });

    });

    catNext.addEventListener('click', () => {

      const itemWidth = catSlider.firstElementChild ? catSlider.firstElementChild.offsetWidth + 24 : catSlider.clientWidth;

      catSlider.scrollBy({ left: itemWidth, behavior: 'smooth' });

    });

  }

});

