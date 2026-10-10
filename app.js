(() => {
  const copy = window.TEXTOS || {};
  document.querySelectorAll('[data-copy]').forEach(el => {
    const value = copy[el.dataset.copy];
    if (typeof value !== 'string') return;
    if (el.dataset.copy === 'marca') {
      el.replaceChildren(document.createTextNode(value));
      const sub = document.createElement('span'); sub.className = 'brand-sub'; sub.textContent = 'INMOBILIARIA'; el.append(sub);
      document.querySelector('.footer-brand').firstChild.textContent = value;
      document.title = value + ' — Tu próximo capítulo';
    } else if (/^(titulo|nosotrosTitulo|serviciosTitulo|contactoTitulo)$/.test(el.dataset.copy)) {
      const parts = value.split('\n'); el.replaceChildren(document.createTextNode(parts[0] + (parts.length > 1 ? ' ' : '')));
      if (parts.length > 1) { el.append(document.createElement('br')); const em = document.createElement('em'); em.textContent = parts.slice(1).join(' '); el.append(em); }
    } else el.textContent = value;
  });
  const button = document.getElementById('contact-button');
  const phone = (copy.whatsapp || '').replace(/\D/g, '');
  if (phone) { button.href = 'https://wa.me/' + phone + '?text=' + encodeURIComponent(copy.mensajeWhatsapp || 'Hola'); button.firstChild.textContent = 'Hablemos por WhatsApp '; }
  else if (copy.email) button.href = 'mailto:' + copy.email;
  else { button.removeAttribute('href'); button.setAttribute('role', 'button'); button.setAttribute('tabindex', '0'); button.firstChild.textContent = 'Contacto de muestra '; const showDemo = () => { document.querySelector('.contact-detail').textContent = 'Esta es una demo. El contacto se habilita al agregar el email o WhatsApp de la inmobiliaria.'; }; button.addEventListener('click', showDemo); button.addEventListener('keydown', e => { if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showDemo(); } }); }
  const house = document.querySelector('.house'), key = document.querySelector('.key'), door = document.querySelector('.door'), light = document.querySelector('.window-light'), drawing = document.querySelectorAll('.drawing path'), caption = document.getElementById('scene-caption');
  drawing.forEach(path => { const length = path.getTotalLength(); path.style.strokeDasharray = length; path.dataset.length = length; });
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const chapters = [...document.querySelectorAll('.chapter')];
  // The mobile entrance occupies its own scene, then scrolls away completely.
  const entrance = document.createElement('div');
  entrance.className = 'mobile-entrance'; entrance.setAttribute('aria-hidden', 'true');
  const entranceStage = document.createElement('div'); entranceStage.className = 'entrance-stage';
  function copyIllustration(prefix) {
    const svg = document.querySelector('.illustration').cloneNode(true);
    svg.querySelectorAll('[id]').forEach(el => {
      const old = el.id; el.id = prefix + old;
      svg.querySelectorAll('*').forEach(node => [...node.attributes].forEach(attr => {
        if (attr.value.includes('url(#' + old + ')')) node.setAttribute(attr.name, attr.value.replace('url(#' + old + ')', 'url(#' + prefix + old + ')'));
      }));
    });
    return svg;
  }
  const entranceSvg = copyIllustration('entrance-');
  const entranceVeil = document.createElement('div'); entranceVeil.className = 'entrance-veil';
  const entranceCaption = document.createElement('p'); entranceCaption.className = 'entrance-caption'; entranceCaption.textContent = 'Bajá. La puerta está abierta.';
  entranceStage.append(entranceSvg, entranceVeil, entranceCaption); entrance.append(entranceStage);
  chapters[0].after(entrance);
  const contactKey = document.createElement('div'); contactKey.className = 'mobile-contact-key'; contactKey.setAttribute('aria-hidden', 'true');
  contactKey.append(copyIllustration('contact-')); chapters[3].querySelector('.chapter-content').prepend(contactKey);
  const entranceHouse = entranceSvg.querySelector('.house'), entranceDoor = entranceSvg.querySelector('.door');
  const clamp = x => Math.max(0, Math.min(1, x));
  let queued = false;
  function render() {
    queued = false;
    const mobile = innerWidth <= 760;
    const anchor = scrollY + innerHeight * (mobile ? .5 : .48);
    const start = chapters[0].offsetTop;
    const end = chapters[3].offsetTop;
    const p = clamp((anchor - start - innerHeight * .3) / Math.max(1, end - start));
    const phase = p * 3;
    const lit = clamp((phase - .5) * 1.8);
    const opening = clamp((phase - 1.25) * 1.8);
    const finale = clamp((phase - 2.1) / .7);
    drawing.forEach(path => { path.style.strokeDashoffset = reduced.matches ? 0 : path.dataset.length * (1 - clamp(.55 + phase * 2)); });
    light.style.opacity = lit;
    door.style.transform = reduced.matches ? 'none' : `skewY(${-opening * 12}deg) scaleX(${1 - opening * .85})`;
    house.style.opacity = 1 - finale;
    house.style.transform = reduced.matches ? 'none' : `translateY(${finale * 18}px) rotate(${Math.sin(phase) * -2}deg) scale(${1 - finale * .12})`;
    key.style.opacity = finale;
    key.style.transform = reduced.matches ? 'none' : `translateY(${(1-finale)*35}px) rotate(${(1-finale)*-25}deg) scale(${.8 + finale*.2})`;
    caption.textContent = (copy.escenas || [])[Math.min(3, Math.round(phase))] || '';
    if (mobile) {
      const bounds = entrance.getBoundingClientRect();
      const entering = clamp(-bounds.top / Math.max(1, bounds.height - entranceStage.offsetHeight));
      const open = clamp(entering / .3);
      const zoom = clamp((entering - .25) / .65);
      const easedZoom = zoom * zoom;
      entranceSvg.querySelector('.window-light').style.opacity = 1;
      entranceSvg.querySelector('.key').style.opacity = 0;
      entranceSvg.querySelectorAll('.drawing path').forEach(path => { path.style.strokeDashoffset = 0; });
      entranceDoor.style.transform = reduced.matches ? 'scaleX(.15)' : `skewY(${-open * 12}deg) scaleX(${1 - open * .95})`;
      entranceHouse.style.opacity = 1;
      entranceHouse.style.transform = reduced.matches ? 'none' : `scale(${1 + easedZoom * 17})`;
      entranceVeil.style.opacity = reduced.matches ? 0 : clamp((entering - .75) / .22);
      entranceCaption.style.opacity = 1 - clamp(entering / .25);
      entranceSvg.querySelector('.plant').style.opacity = 1 - clamp(zoom * 3);
    }
    document.documentElement.style.setProperty('--progress', clamp(scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight)));
  }
  const schedule = () => { if (!queued) { queued = true; requestAnimationFrame(render); } };
  addEventListener('scroll', schedule, { passive: true }); addEventListener('resize', schedule); reduced.addEventListener('change', schedule); render();
})();
