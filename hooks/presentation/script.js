document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const counter = document.getElementById('slideCounter');
  const progressBar = document.getElementById('progressBar');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const fullscreenBtn = document.getElementById('fullscreenBtn');
  const nav = document.getElementById('slideNav');

  let current = 0;
  const total = slides.length;
  let navTimeout;

  function updateSlide(direction = 'next') {
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'exit-left');
      if (direction === 'next' && i < current) {
        slide.classList.add('exit-left');
      }
    });

    slides[current].classList.add('active');
    counter.textContent = `${current + 1} / ${total}`;
    progressBar.style.width = `${((current + 1) / total) * 100}%`;

    prevBtn.style.opacity = current === 0 ? '0.3' : '1';
    nextBtn.style.opacity = current === total - 1 ? '0.3' : '1';
  }

  function goNext() {
    if (current < total - 1) {
      current++;
      updateSlide('next');
    }
  }

  function goPrev() {
    if (current > 0) {
      current--;
      updateSlide('prev');
    }
  }

  function showNav() {
    nav.style.opacity = '1';
    clearTimeout(navTimeout);
    navTimeout = setTimeout(() => {
      nav.style.opacity = '';
    }, 3000);
  }

  document.addEventListener('keydown', (e) => {
    showNav();
    switch (e.key) {
      case 'ArrowRight':
      case ' ':
      case 'Enter':
        e.preventDefault();
        goNext();
        break;
      case 'ArrowLeft':
      case 'Backspace':
        e.preventDefault();
        goPrev();
        break;
      case 'Home':
        e.preventDefault();
        current = 0;
        updateSlide('prev');
        break;
      case 'End':
        e.preventDefault();
        current = total - 1;
        updateSlide('next');
        break;
      case 'f':
      case 'F':
        toggleFullscreen();
        break;
    }

    if (e.key >= '0' && e.key <= '9') {
      const target = e.key === '0' ? 9 : parseInt(e.key) - 1;
      if (target < total) {
        const dir = target > current ? 'next' : 'prev';
        current = target;
        updateSlide(dir);
      }
    }
  });

  prevBtn.addEventListener('click', () => { goPrev(); showNav(); });
  nextBtn.addEventListener('click', () => { goNext(); showNav(); });

  document.addEventListener('mousemove', (e) => {
    if (e.clientY > window.innerHeight - 120) {
      showNav();
    }
  });

  let touchStartX = 0;
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext();
      else goPrev();
    }
    showNav();
  });

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.() ||
      document.documentElement.webkitRequestFullscreen?.();
    } else {
      document.exitFullscreen?.() ||
      document.webkitExitFullscreen?.();
    }
  }

  fullscreenBtn.addEventListener('click', toggleFullscreen);

  updateSlide();

  setTimeout(() => { nav.style.opacity = '1'; }, 500);
  navTimeout = setTimeout(() => { nav.style.opacity = ''; }, 4000);
});
