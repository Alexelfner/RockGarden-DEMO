// ===== Mobile menu =====
const toggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// ===== Slideshow (home page only) =====
const slideshow = document.querySelector('.slideshow');

if (slideshow) {
  const slides = slideshow.querySelectorAll('.slide');
  const dotsWrap = slideshow.querySelector('.dots');
  let current = 0;
  let timer;

  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => { show(i); restart(); });
    dotsWrap.appendChild(dot);
  });
  const dots = dotsWrap.querySelectorAll('button');

  function show(i) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function restart() {
    clearInterval(timer);
    timer = setInterval(() => show(current + 1), 4000);
  }

  slideshow.querySelector('.arrow.prev').addEventListener('click', () => { show(current - 1); restart(); });
  slideshow.querySelector('.arrow.next').addEventListener('click', () => { show(current + 1); restart(); });

  show(0);
  restart();
}

// ===== Newsletter form (home page only) =====
const form = document.querySelector('.subscribe');

if (form) {
  const msg = form.querySelector('.form-msg');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.email.value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Please enter a valid email address.';
      msg.style.color = '#c0392b';
      return;
    }
    msg.textContent = 'Thanks for subscribing!';
    msg.style.color = '#1c8a43';
    form.reset();
  });
}

// ===== Contact form (contact page only) =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
  const msg = contactForm.querySelector('.form-msg');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      msg.textContent = 'Please enter your name and a valid email address.';
      msg.style.color = '#c0392b';
      return;
    }
    msg.textContent = 'Success! Message received.';
    msg.style.color = '#1c8a43';
    contactForm.reset();
  });
}

// ===== Blog search (blog page only) =====
const blogSearch = document.querySelector('.blog-search');

if (blogSearch) {
  const posts = document.querySelectorAll('.post');
  const noResults = document.querySelector('.no-results');

  blogSearch.addEventListener('input', () => {
    const q = blogSearch.value.trim().toLowerCase();
    let shown = 0;
    posts.forEach((post) => {
      const match = post.textContent.toLowerCase().includes(q);
      post.hidden = !match;
      if (match) shown++;
    });
    noResults.hidden = shown > 0;
  });
}
