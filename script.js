const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Otwórz menu' : 'Zamknij menu');
    mainNav.classList.toggle('is-open', !isOpen);
  });

  mainNav.addEventListener('click', (event) => {
    if (event.target.closest('a')) {
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Otwórz menu');
      mainNav.classList.remove('is-open');
    }
  });
}

const filterButtons = [...document.querySelectorAll('[data-filter]')];
const productCards = [...document.querySelectorAll('[data-category]')];
const filterEmpty = document.querySelector('.filter-empty');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedFilter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle('is-active', isSelected);
      filterButton.setAttribute('aria-pressed', String(isSelected));
    });

    productCards.forEach((card) => {
      const shouldShow = selectedFilter === 'all' || card.dataset.category === selectedFilter;
      card.hidden = !shouldShow;
      if (shouldShow) visibleCount += 1;
    });

    if (filterEmpty) filterEmpty.hidden = visibleCount > 0;
  });
});

document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const feedback = form.querySelector('.form-feedback');
    feedback.textContent = 'Dzięki! To formularz demonstracyjny, więc zapis nie jest wysyłany.';
    form.reset();
  });
});

const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    const formData = new FormData(contactForm);
    const subject = `[Yoki-Yoga] ${formData.get('topic')}`;
    const body = `Imię: ${formData.get('name')}\nE-mail: ${formData.get('email')}\n\n${formData.get('message')}`;
    const mailto = `mailto:hej@yoki-yoga.pl?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    contactForm.querySelector('.form-feedback').textContent = 'Otwieramy aplikację pocztową z gotową wiadomością.';
  });
}