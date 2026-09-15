// Gallery lightbox
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
if (galleryGrid && lightbox && lightboxImg) {
  galleryGrid.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const full = item.getAttribute('data-full');
      const alt = item.querySelector('img')?.getAttribute('alt') || '';
      lightboxImg.setAttribute('src', full);
      lightboxImg.setAttribute('alt', alt);
      lightbox.classList.add('open');
    });
  });
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightboxImg.setAttribute('src', '');
  };
  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// Review submission form -> emails the review to Adam for approval
const reviewForm = document.getElementById('reviewForm');
const formSuccess = document.getElementById('formSuccess');
const REVIEW_INBOX = 'reviews@eggshellpainting.ie'; // TODO: confirm/replace with the real inbox to receive reviews

if (reviewForm) {
  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewerName').value.trim();
    const area = document.getElementById('reviewerArea').value.trim();
    const email = document.getElementById('reviewerEmail').value.trim();
    const rating = reviewForm.querySelector('input[name="rating"]:checked')?.value || '5';
    const text = document.getElementById('reviewerText').value.trim();

    const stars = '★'.repeat(Number(rating)) + '☆'.repeat(5 - Number(rating));
    const subject = `New website review from ${name}${area ? ' (' + area + ')' : ''}`;
    const body =
      `Name: ${name}\n` +
      `Area: ${area || '-'}\n` +
      `Email: ${email}\n` +
      `Rating: ${stars} (${rating}/5)\n\n` +
      `Review:\n${text}`;

    const mailto = `mailto:${REVIEW_INBOX}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    formSuccess.classList.add('show');
    reviewForm.reset();
  });
}

const toggle = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}
