(() => {
const copy = window.TEXTOS || {};
document.querySelectorAll('[data-copy]').forEach(el => {
const value = copy[el.dataset.copy]; if(typeof value !== 'string') return;
if(el.matches('h1,h2')) { el.replaceChildren(); value.split('\n').forEach((line,index) => { if(index) el.append(document.createElement('br')); const italic = ['titulo','entradaTitulo'].includes(el.dataset.copy) && index === value.split('\n').length - 1; const part = document.createElement(italic ? 'em' : 'span'); part.textContent = line; el.append(part); }); } else el.textContent=value;
});
document.title=(copy.marca || 'Umbral')+' — Tu próximo lugar';
const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('nav');
const closeMenu=()=>{ menu.setAttribute('aria-expanded','false'); nav.hidden=true; };
menu.addEventListener('click',()=>{ const open=menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(open));nav.hidden=!open; });
nav.addEventListener('click',e=>{if(e.target.closest('a')) closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape' && !nav.hidden){closeMenu();menu.focus();}});
const contact=document.getElementById('contact-button'),phone=(copy.whatsapp || '').replace(/\D/g,'');let choice='';
function contactUrl(){const message=choice ? 'Hola, me gustaría recibir asesoramiento para '+choice+'.' : copy.mensajeWhatsapp || 'Hola';if(phone)contact.href='https://wa.me/'+phone+'?text='+encodeURIComponent(message);else if(copy.email)contact.href='mailto:'+copy.email+'?subject='+encodeURIComponent(message);}
contactUrl();document.querySelectorAll('[data-choice]').forEach(link=>link.addEventListener('click',()=>{choice=link.dataset.choice;contactUrl();}));
if(!phone && !copy.email){const explain=()=>{document.querySelector('.contact-detail').textContent='Demo: el contacto se habilita al agregar el WhatsApp o email real.';};contact.addEventListener('click',explain);contact.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();explain();}});}
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const entrance=document.querySelector('.entrance-track'),panel=entrance.querySelector('.panel'),art=panel.querySelector('.art');
const originalArt=art.innerHTML;
const roomTrack=document.querySelector('.room-track'),roomCopy=roomTrack.querySelector('.copy'),services=roomTrack.querySelector('.service-list');
const entryCopy=panel.querySelector('.copy');
const clamp=x=>Math.max(0,Math.min(1,x));
let activeTimeline;
function updateProgress(){document.documentElement.style.setProperty('--progress',clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)));}
addEventListener('scroll',updateProgress,{passive:true});updateProgress();
if(!window.gsap || !window.ScrollTrigger) return;
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ignoreMobileResize:true});
const media=gsap.matchMedia();
media.add('(prefers-reduced-motion: no-preference)',()=>{
  document.body.classList.add('animated-walkthrough');
  art.innerHTML='<div class="camera"><div class="room-portal"><img src="assets/interior.webp" alt=""></div><svg class="door-frame" viewBox="0 0 1024 1536" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><mask id="frame-mask"><rect width="1024" height="1536" fill="white"/><rect x="316" y="174" width="454" height="996" fill="black"/></mask></defs><image href="assets/puerta.webp" width="1024" height="1536" mask="url(#frame-mask)"/></svg><div class="door-leaf"><img src="assets/hoja-puerta.webp" alt=""></div></div>';
  panel.append(roomCopy,services);
  roomCopy.classList.add('journey-room-copy');services.classList.add('journey-services');
  const camera=art.querySelector('.camera'),portal=art.querySelector('.room-portal'),leaf=art.querySelector('.door-leaf');
  let geometry;
  function align(){
    const w=art.clientWidth,h=art.clientHeight,factor=Math.max(w/1024,h/1536),iw=1024*factor,ih=1536*factor;
    geometry={x:iw*.30859375-(iw-w)/2,y:ih*.11328125-(ih-h)/2,w:iw*.443359375,h:ih*.6484375};
    for(const el of [portal,leaf])gsap.set(el,{left:geometry.x,top:geometry.y,width:geometry.w,height:geometry.h});
    gsap.set(camera,{transformOrigin:(geometry.x+geometry.w/2)+'px '+(geometry.y+geometry.h/2)+'px'});
  }
  align();
  gsap.set(roomCopy,{autoAlpha:0,y:16});gsap.set(services,{autoAlpha:0,y:20});
  gsap.set(leaf,{rotationY:0,transformPerspective:1000});
  const tl=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{trigger:entrance,start:'top top',end:'bottom bottom',scrub:.85,anticipatePin:1,invalidateOnRefresh:true,onRefreshInit:align}});
  activeTimeline=tl;
  tl.addLabel('door',0)
    .to(leaf,{rotationY:-105,duration:2.5,ease:'power1.inOut'},.3)
    .to(leaf,{autoAlpha:0,duration:.6},2.6)
    .addLabel('inside',3.2)
    .to(camera,{scale:()=>Math.max(art.clientWidth/geometry.w,art.clientHeight/geometry.h)*1.04,x:()=>art.clientWidth/2-geometry.x-geometry.w/2,y:()=>art.clientHeight/2-geometry.y-geometry.h/2,duration:3.6,ease:'power1.inOut'},3.2)
    .to(entryCopy,{autoAlpha:0,y:-12,duration:.9},4.9)
    .to(roomCopy,{autoAlpha:1,y:0,duration:1.1},5.9)
    .to(services,{autoAlpha:1,y:0,duration:1.1},6.3)
    .addLabel('services',7.4)
    .to({}, {duration:1},7.4);
  gsap.timeline({scrollTrigger:{trigger:'.exterior-track',start:'top top',end:'bottom bottom',scrub:.75}})
    .to('.house-photo',{scale:1.8,duration:2,ease:'none'},0)
    .to('.approach-photo',{opacity:1,duration:1,ease:'none'},1);
  const images=[...document.images];
  Promise.all(images.map(img=>img.decode().catch(()=>{}))).then(()=>{if(activeTimeline===tl)ScrollTrigger.refresh();});
  document.fonts.ready.then(()=>{if(activeTimeline===tl)ScrollTrigger.refresh();});
  return ()=>{
    activeTimeline=null;document.body.classList.remove('animated-walkthrough');
    roomCopy.classList.remove('journey-room-copy');services.classList.remove('journey-services');
    roomTrack.querySelector('.panel').prepend(roomCopy);roomTrack.querySelector('.panel').append(services);
    art.innerHTML=originalArt;
  };
});
// Navigate to the informational moment inside the same pinned sequence.
document.querySelectorAll('a[href="#servicios"]').forEach(link=>link.addEventListener('click',e=>{
  if(!activeTimeline)return;e.preventDefault();
  const st=activeTimeline.scrollTrigger;
  const target=st.start+(st.end-st.start)*activeTimeline.labels.services/activeTimeline.duration();
  window.scrollTo({top:target,behavior:reduced.matches?'instant':'smooth'});
  closeMenu();
}));
})();
