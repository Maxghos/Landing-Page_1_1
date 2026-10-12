// Introduce el WhatsApp real con código de país y sin +, espacios ni guiones.
// Si se deja vacío, la consulta se prepara para copiar; no se simula un envío.
const CONTACT = { whatsapp: '' };
const arrowIcon = '<svg class="arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.5"/></svg>';
const projects = [
  { id: 'two-light', category: '2', title: 'Líneas suaves', detail: '2 cuerpos · Tapizado claro', images: ['Sillon2Cuerpos_1.jpg'] },
  { id: 'three-light', category: '3', title: 'Espacio para compartir', detail: '3 cuerpos · Tapizado claro', images: ['Sillon3Cuerpos_1.jpg'] },
  { id: 'four-grey', category: '4', title: 'Confort en L', detail: '4 cuerpos · Seccional gris', images: ['Sillon4Cuerpos_1.jpg'] },
  { id: 'two-white', category: '2', title: 'Esencia natural', detail: '2 cuerpos · Tonos neutros', images: ['Sillon2Cuerpos_2.jpg'] },
  { id: 'two-brown', category: '2', title: 'Calidez y carácter', detail: '2 cuerpos · Tapizado marrón', images: ['Sillon2Cuerpos_3.jpg'] },
  { id: 'three-white', category: '3', title: 'Un lugar para quedarse', detail: '3 cuerpos · Base de madera', images: ['Sillon3Cuerpos_2.jpg'] },
  { id: 'four-dark', category: '4', title: 'Amplitud a tu medida', detail: '4 cuerpos · Seccional oscuro', images: ['Sillon4Cuerspos_2.jpg'] },
];
const models = [
  { id: 'bianco', title: 'Modelo Bianco', detail: 'Un diseño en tonos claros. Explora sus detalles desde diferentes perspectivas.', images: ['SillonBianco_2.png', 'SillonBianco_1.png', 'SillonBianco_3.png', 'SillonBianco.png'] },
  { id: 'fullham', title: 'Modelo Fullham', detail: 'Medidas del modelo mostrado: 200 cm de ancho × 80 cm de profundidad × 82 cm de alto. Consulta opciones a medida.', images: ['SillonFullham_3.png', 'SillonFullham_1.png', 'SillonFullham_2.png', 'SillonFullhamMedidas.png', 'SillonFullham.png'] },
];
const motion = createMotionEffects();
const grid = document.querySelector('#work-grid');
function renderProjects(filter = 'all') {
  motion.forget(grid.querySelectorAll('.work-card'));
  const visible = projects.filter(project => filter === 'all' || project.category === filter);
  grid.replaceChildren(...visible.map((project) => {
    const card = document.createElement('article');
    card.className = 'work-card';
    card.innerHTML = `<button class="photo-button" data-project="${project.id}" aria-label="Ampliar ${project.title}"><img src="assets/${project.images[0]}" alt="${project.title}: ${project.detail}, fotografiado en el taller" loading="lazy" width="1280" height="960"><span class="photo-action" aria-hidden="true">${arrowIcon}</span></button><div class="work-card-info"><div><h3>${project.title}</h3><p>${project.detail}</p></div><span>${arrowIcon}</span></div>`;
    return card;
  }));
  motion.observe(grid.querySelectorAll('.work-card'), 70);
  document.querySelector('#gallery-count').textContent = `${visible.length} ${visible.length === 1 ? 'trabajo' : 'trabajos'} · Hechos en nuestro taller`;
}
renderProjects();
document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
  document.querySelectorAll('.filter').forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('active', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  renderProjects(button.dataset.filter);
}));
const dialog = document.querySelector('#photo-dialog');
let currentProject;
let photoIndex = 0;
let opener;
function displayPhoto() {
  const image = document.querySelector('#dialog-image');
  image.src = `assets/${currentProject.images[photoIndex]}`;
  image.alt = `${currentProject.title} — ${currentProject.images[photoIndex].includes('Medidas') ? 'Ficha de medidas' : `Fotografía ${photoIndex + 1}`}`;
  document.querySelector('#photo-counter').textContent = `${photoIndex + 1} / ${currentProject.images.length}`;
  const single = currentProject.images.length === 1;
  document.querySelector('#photo-prev').hidden = single;
  document.querySelector('#photo-next').hidden = single;
}
document.addEventListener('click', event => {
  const trigger = event.target.closest('[data-project]');
  if (!trigger) return;
  currentProject = [...projects, ...models].find(project => project.id === trigger.dataset.project);
  opener = trigger;
  photoIndex = 0;
  document.querySelector('#dialog-title').textContent = currentProject.title;
  document.querySelector('#dialog-description').textContent = currentProject.detail;
  displayPhoto();
  dialog.showModal();
  document.body.style.overflow = 'hidden';
});
function movePhoto(direction) {
  photoIndex = (photoIndex + direction + currentProject.images.length) % currentProject.images.length;
  displayPhoto();
}
document.querySelector('#photo-prev').addEventListener('click', () => movePhoto(-1));
document.querySelector('#photo-next').addEventListener('click', () => movePhoto(1));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); movePhoto(1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); movePhoto(-1); }
});
dialog.addEventListener('close', () => { document.body.style.overflow = ''; opener?.focus(); });
const menu = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  menu.textContent = open ? '×' : '☰';
  mobileNav.hidden = !open;
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => { mobileNav.hidden = true; menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Abrir menú'); menu.textContent = '☰'; }));
const form = document.querySelector('#contact-form');
if (CONTACT.whatsapp) {
  document.querySelector('#contact-submit').innerHTML = `Consultar por WhatsApp <span aria-hidden="true">${arrowIcon}</span>`;
  document.querySelector('#form-note').textContent = 'Se abrirá WhatsApp con tu consulta. Tú decides cuándo enviarla.';
}
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const message = form.elements.message.value.trim();
  if (!name || !message) {
    (name ? form.elements.message : form.elements.name).setCustomValidity('Escribe un texto para preparar tu consulta.');
    form.reportValidity();
    return;
  }
  const consultation = `Hola JORKEV, soy ${name}. Me interesa: ${form.elements.model.value}.\n\n${message}`;
  document.querySelector('#consultation').value = consultation;
  document.querySelector('#contact-result').hidden = false;
  document.querySelector('#contact-status').textContent = 'Tu consulta está lista para copiar. Todavía no se ha enviado.';
  if (CONTACT.whatsapp) window.open(`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(consultation)}`, '_blank', 'noopener,noreferrer');
});
form.querySelectorAll('input,textarea:not([readonly])').forEach(input => input.addEventListener('input', () => input.setCustomValidity('')));
document.querySelector('#copy-consultation').addEventListener('click', async () => {
  const text = document.querySelector('#consultation');
  const status = document.querySelector('#contact-status');
  try {
    await navigator.clipboard.writeText(text.value);
    status.textContent = 'Consulta copiada. Ya puedes pegarla en tu conversación.';
  } catch {
    text.focus(); text.select();
    status.textContent = 'Seleccionamos tu consulta. Usa la opción Copiar de tu dispositivo.';
  }
});
document.querySelector('#year').textContent = new Date().getFullYear();


// Progressive enhancement: content stays visible when animations are unavailable.
function createMotionEffects() {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const active = new Set();
  const delays = new WeakMap();
  const seen = new WeakSet();
  const observer = typeof window.IntersectionObserver === 'function' ? new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.intersectionRatio < 0.08) return;
      observer.unobserve(entry.target);
      reveal(entry.target, delays.get(entry.target) || 0);
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }) : null;

  function reveal(element, delay = 0, offset = 10, fade = false) {
    if (preference.matches || typeof element.animate !== 'function') return;
    const animation = element.animate([
      // Scroll reveals keep full opacity so visible content never flashes away.
      { opacity: fade ? 0 : 1, transform: `translateY(${offset}px)` },
      { opacity: 1, transform: 'translateY(0)' },
    ], {
      duration: 580,
      delay,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'backwards',
    });
    active.add(animation);
    animation.onfinish = animation.oncancel = () => active.delete(animation);
  }

  function observe(elements, stagger = 0) {
    if (preference.matches || !observer) return;
    Array.from(elements).forEach((element, index) => {
      if (seen.has(element)) return;
      seen.add(element);
      delays.set(element, Math.min(index * stagger, 90));
      observer.observe(element);
    });
  }

  function forget(elements) {
    const removed = new Set(elements);
    removed.forEach(element => observer?.unobserve(element));
    active.forEach(animation => {
      if (removed.has(animation.effect.target)) animation.cancel();
    });
  }

  function start() {
    reveal(document.querySelector('.header'), 0, -6, true);
    document.querySelectorAll('.hero-copy > *').forEach((element, index) => {
      reveal(element, 40 + index * 50, 12, true);
    });
    observe(document.querySelectorAll('.hero-visual'));
    observe(document.querySelectorAll('.values-strip'));
    observe(document.querySelectorAll('.section-heading > *'), 70);
    observe(document.querySelectorAll('.model-card'), 90);
    observe(document.querySelectorAll('.work-toolbar'));
    observe(document.querySelectorAll('.process-intro'));
    observe(document.querySelectorAll('.steps article'), 70);
    observe(document.querySelectorAll('.contact-layout > *'), 90);
    observe(document.querySelectorAll('.footer > *'), 50);
  }

  // Changing the device preference also stops animations already in progress.
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer?.disconnect();
    active.forEach(animation => animation.cancel());
    active.clear();
  });
  // Never leave a focused link or form field inside a delayed fade.
  document.addEventListener('focusin', event => {
    active.forEach(animation => {
      if (animation.effect.target.contains(event.target)) animation.finish();
    });
  });
  return { observe, forget, start };
}

motion.start();
