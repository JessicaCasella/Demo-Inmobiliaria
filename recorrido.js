(() => {
const stage=document.querySelector('.stage'),exterior=document.querySelector('.exterior'),interior=document.querySelector('.interior'),door=document.querySelector('.door');
const hero=document.querySelector('.hero-copy'),entry=document.querySelector('.entry-copy'),room=document.querySelector('.room-copy'),final=document.querySelector('.final-copy'),key=document.querySelector('.key');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
const state={scale:1,x:0,y:0};let geometry,timeline;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
function measure(){
 const w=stage.clientWidth,h=stage.clientHeight,s=Math.max(w/1600,h/1000),ox=(w-1600*s)/2,oy=(h-1000*s)/2;
 geometry={w,h,x:950.5*s+ox,y:630.4*s+oy,pw:155.8*s,ph:369.6*s};
 geometry.cx=geometry.x+geometry.pw/2;geometry.cy=geometry.y+geometry.ph/2;
 gsap.set(door,{left:geometry.x,top:geometry.y,width:geometry.pw,height:geometry.ph});
 gsap.set(exterior,{transformOrigin:geometry.cx+'px '+geometry.cy+'px'});
}
function paint(){
 const g=geometry;
 const scale=Number(gsap.getProperty(exterior,'scaleX')),x=Number(gsap.getProperty(exterior,'x')),y=Number(gsap.getProperty(exterior,'y'));
 const left=g.cx-g.pw*scale/2+x,top=g.cy-g.ph*scale/2+y;
 const right=left+g.pw*scale,bottom=top+g.ph*scale;
 interior.style.clipPath='inset('+clamp(top,0,g.h)+'px '+clamp(g.w-right,0,g.w)+'px '+clamp(g.h-bottom,0,g.h)+'px '+clamp(left,0,g.w)+'px)';
}
if(!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);
const mm=gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)',()=>{
 measure();
 const mobile=innerWidth<=760;
 Object.assign(state,{scale:mobile?.72:1,x:mobile?(geometry.w/2-geometry.cx):0,y:mobile?160:0});gsap.set(exterior,state);paint();
 const initial={...state};
 gsap.set(door,{rotationY:0,transformPerspective:1200});
 const t=gsap.timeline({defaults:{ease:'none'},onUpdate:paint,scrollTrigger:{trigger:'.journey',start:'top top',end:'bottom bottom',scrub:1,invalidateOnRefresh:true,onRefreshInit:measure,onRefresh:paint}});timeline=t;
 t.addLabel('house',0).to({}, {duration:.8},0)
 .to(hero,{autoAlpha:0,y:-20,duration:1},.8)
 .to(exterior,{scale:()=>initial.scale*1.8,x:()=>geometry.w/2-geometry.cx,y:()=>geometry.h*.5-geometry.cy,duration:2,ease:'power1.inOut'},.8)
 .to(entry,{autoAlpha:1,y:0,duration:.8},2)
 .addLabel('door',2.8)
 .to(door,{rotationY:-104,duration:2.5,ease:'power1.inOut'},3.1)
 .to(door,{autoAlpha:0,duration:.5},5.2)
 .to(entry,{autoAlpha:0,y:-14,duration:.8},5.5)
 .to(exterior,{scale:()=>Math.max(geometry.w/geometry.pw,geometry.h/geometry.ph)*1.03,x:()=>geometry.w/2-geometry.cx,y:()=>geometry.h/2-geometry.cy,duration:3.8,ease:'power1.inOut'},5.7)
 .to('.room',{scale:1.03,x:-12,duration:3.8,ease:'power1.inOut'},5.7)
 .to(room,{autoAlpha:1,y:0,duration:1.2},8.8)
 .addLabel('room',10).to({}, {duration:1.5},10)
 .to(room,{autoAlpha:0,y:-15,duration:1},11.5)
 .to('.room',{x:-30,scale:1.04,duration:2,ease:'power1.inOut'},11.5)
 .fromTo(key,{autoAlpha:0,y:80,rotation:-18,scale:.85},{autoAlpha:1,y:0,rotation:-6,scale:1,duration:2,ease:'power2.out'},11.9)
 .to(final,{autoAlpha:1,y:0,duration:1.2},12.4)
 .addLabel('key',14).to({}, {duration:1.2},14);
 const labels=['house','door','room','key'];
 function go(index){const st=t.scrollTrigger;const pos=st.start+(st.end-st.start)*t.labels[labels[index]]/t.duration();scrollTo({top:pos,behavior:'smooth'});}
 document.querySelectorAll('[data-phase]').forEach(button=>{const fn=()=>go(Number(button.dataset.phase));button.addEventListener('click',fn);button._go=fn;});
 const toEntry=e=>{e.preventDefault();go(1);},toFinal=e=>{e.preventDefault();go(3);};
 document.querySelectorAll('a[href="#entrada"]').forEach(a=>a.addEventListener('click',toEntry));
 document.querySelectorAll('a[href="#final"]').forEach(a=>a.addEventListener('click',toFinal));
 t.eventCallback('onUpdate',()=>{paint();const time=t.time();const index=time>=11.5?3:time>=8.8?2:time>=2?1:0;document.querySelectorAll('[data-phase]').forEach((button,i)=>button.setAttribute('aria-current',String(i===index)));});
 Promise.all([...document.images].map(image=>image.decode().catch(()=>{}))).then(()=>{if(timeline===t)ScrollTrigger.refresh();});
 document.fonts.ready.then(()=>{if(timeline===t)ScrollTrigger.refresh();});
 return()=>{timeline=null;document.querySelectorAll('[data-phase]').forEach(b=>b.removeEventListener('click',b._go));document.querySelectorAll('a[href="#entrada"]').forEach(a=>a.removeEventListener('click',toEntry));document.querySelectorAll('a[href="#final"]').forEach(a=>a.removeEventListener('click',toFinal));};
});
const contact=document.querySelector('.contact'),copy=window.TEXTOS||{},phone=(copy.whatsapp||'').replace(/\D/g,'');
if(phone)contact.href='https://wa.me/'+phone+'?text='+encodeURIComponent(copy.mensajeWhatsapp||'Hola');else if(copy.email)contact.href='mailto:'+copy.email;
else {const explain=()=>{document.querySelector('.contact-detail').textContent='Demo: el contacto real se configura en textos.js.';};contact.addEventListener('click',explain);contact.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();explain();}});}
if(reduced.matches){document.querySelector('.prototype').textContent='PRUEBA · MOVIMIENTO REDUCIDO';}
})();
