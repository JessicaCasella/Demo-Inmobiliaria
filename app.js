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
const reduced=matchMedia('(prefers-reduced-motion: reduce)'),exterior=document.querySelector('.exterior-track'),entrance=document.querySelector('.entrance-track'),house=document.querySelector('.house-photo'),approach=document.querySelector('.approach-photo'),door=document.querySelector('.door-photo'),leaf=document.querySelector('.door-leaf'),room=document.querySelector('.room-reveal');
const clamp=x=>Math.max(0,Math.min(1,x));function progress(track){const rect=track.getBoundingClientRect();return clamp(-rect.top/Math.max(1,rect.height-track.querySelector('.panel').offsetHeight));}
function alignDoor(){
  const stage=door.parentElement,w=stage.clientWidth,h=stage.clientHeight;
  const factor=Math.max(w/(door.naturalWidth||1024),h/(door.naturalHeight||1536));
  const imageW=(door.naturalWidth||1024)*factor,imageH=(door.naturalHeight||1536)*factor;
  leaf.style.left=(imageW*.309-(imageW-w)/2)+'px';
  leaf.style.top=(imageH*.113-(imageH-h)/2)+'px';
  leaf.style.width=imageW*.443+'px';leaf.style.height=imageH*.648+'px';
}
door.addEventListener('load',alignDoor);addEventListener('resize',alignDoor);alignDoor();
const smooth=x=>x*x*(3-2*x);
let queued=false;function render(){queued=false;const p=reduced.matches?0:progress(exterior),q=reduced.matches?0:progress(entrance);const blend=clamp((p-.5)/.5);house.style.transform='scale('+(1+p*.8)+')';approach.style.opacity=blend;approach.style.transform='scale('+(1.1-blend*.1)+')';const opening=smooth(clamp((q-.04)/.44));leaf.style.transform='rotateY('+(-opening*100)+'deg)';leaf.style.opacity=1-smooth(clamp((q-.42)/.12));const entering=smooth(clamp((q-.54)/.43));door.style.transform='scale('+(1+entering*entering*1.7)+')';room.style.opacity=smooth(clamp((q-.62)/.35));room.style.transform='scale('+(1.06-smooth(clamp((q-.62)/.35))*.06)+')';document.documentElement.style.setProperty('--progress',clamp(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)));}
const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(render);}};addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule);reduced.addEventListener('change',schedule);render();
})();

