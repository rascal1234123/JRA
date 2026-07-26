const intro=document.querySelector('[data-intro]');
const skipIntro=document.querySelector('[data-skip-intro]');
const forceIntro=new URLSearchParams(location.search).get('intro')==='1';
let introTimers=[];
const clearIntroTimers=()=>{introTimers.forEach(clearTimeout);introTimers=[]};
const finishIntro=()=>{if(!intro)return;clearIntroTimers();intro.classList.add('finished');document.body.classList.remove('intro-pending');sessionStorage.setItem('jraIntroSeen','1');setTimeout(()=>intro.remove(),900)};
const giJoe099='https://raw.githubusercontent.com/rascal1234123/JRA/main/assets/assets-2/gallery/full/gijoe/gijoe-artwork-099.webp';
const runIntro=()=>{
 if(!intro)return;
 const logo=intro.querySelector('.intro-logo');
 const shade=intro.querySelector('.intro-shade');
 const sources=[
  'intro-2.jpg?v=20260726-3','intro-3.jpg?v=20260726-3','intro-4.jpg?v=20260726-3','intro-5.jpg?v=20260726-3',
  'intro-6.jpg?v=20260726-3','intro-7.jpg?v=20260726-3','intro-8.jpg?v=20260726-3','intro-9.jpg?v=20260726-3',giJoe099
 ];
 while(intro.querySelectorAll('.intro-slide').length<sources.length){const slide=document.createElement('div');slide.className='intro-slide';slide.setAttribute('aria-hidden','true');intro.insertBefore(slide,shade)}
 const slides=[...intro.querySelectorAll('.intro-slide')].slice(0,sources.length);
 const settings=[
  {position:'center 38%',from:'scale(1.03) translateY(1.5%)',to:'scale(1.08) translateY(-1.5%)'},
  {position:'center',from:'scale(1.04) translateX(1.5%)',to:'scale(1.09) translateX(-1.5%)'},
  {position:'center',from:'scale(1.03) translate(1%,1%)',to:'scale(1.08) translate(-1%,-1%)'},
  {position:'center 28%',from:'scale(1.02) translateY(1%)',to:'scale(1.07) translateY(-1%)'},
  {position:'center',from:'scale(1.03)',to:'scale(1.09)'},
  {position:'center',from:'scale(1.04) translateX(-1.5%)',to:'scale(1.09) translateX(1.5%)'},
  {position:'center',from:'scale(1.03)',to:'scale(1.09)'},
  {position:'center',from:'scale(1.03) translateY(1%)',to:'scale(1.08) translateY(-1%)'},
  {position:'center',from:'scale(1.02)',to:'scale(1.075)'}
 ];
 slides.forEach((slide,index)=>{const config=settings[index];slide.style.animation='none';slide.style.opacity='0';slide.style.transform=config.from;slide.style.transformOrigin='center center';slide.style.transition='opacity .7s ease, transform 2.7s ease';slide.style.backgroundImage=`url('${sources[index]}')`;slide.style.backgroundSize='contain';slide.style.backgroundPosition=config.position;slide.style.backgroundRepeat='no-repeat';slide.style.backgroundColor='#050505'});
 if(logo){logo.style.animation='none';logo.style.opacity='1';logo.style.width='min(48vw,520px)';logo.style.maxHeight='72vh';logo.style.objectFit='contain';logo.style.transition='opacity .65s ease,width .65s ease'}
 const showSlide=index=>{slides.forEach((slide,i)=>{slide.style.opacity=i===index?'1':'0';slide.style.transform=i===index?settings[i].to:settings[i].from});if(logo)logo.style.opacity='0'};
 const start=1700,interval=2700;
 slides.forEach((_,index)=>introTimers.push(setTimeout(()=>showSlide(index),start+index*interval)));
 introTimers.push(setTimeout(()=>{slides.forEach(slide=>slide.style.opacity='0');if(logo){logo.style.width='min(58vw,620px)';logo.style.opacity='1'}},start+slides.length*interval));
 introTimers.push(setTimeout(finishIntro,start+slides.length*interval+1800));
};
if(intro){const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;const seen=sessionStorage.getItem('jraIntroSeen')==='1';if(reduced||(seen&&!forceIntro)){finishIntro()}else{if(forceIntro)sessionStorage.removeItem('jraIntroSeen');skipIntro?.addEventListener('click',finishIntro);runIntro()}}
const header=document.querySelector('[data-header]');
const menu=document.querySelector('[data-menu-button]');
const nav=document.querySelector('[data-nav]');
nav?.querySelectorAll('a[href="about.html"]').forEach(link=>{link.textContent='About John'});
addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>20));
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav?.classList.toggle('open',!open)});
nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu?.setAttribute('aria-expanded','false')}));
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>b.classList.remove('active'));button.classList.add('active');const filter=button.dataset.filter;document.querySelectorAll('[data-category]').forEach(card=>card.hidden=filter!=='all'&&card.dataset.category!==filter)}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('visible',entry.isIntersecting)),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const heroArt=document.querySelector('[data-hero-art]');
if(heroArt&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const frames=[...heroArt.querySelectorAll('.hero-art-frame')];const images=[2,3,4,5,6,7,8,9].map(n=>`intro-${n}.jpg?v=20260726-3`).concat(giJoe099);let nextImage=5,frameIndex=0,rotationTimer=null;const rotateFrame=()=>{if(!frames.length)return;const frame=frames[frameIndex%frames.length];const img=frame.querySelector('img');frame.classList.add('is-changing');setTimeout(()=>{img.src=images[nextImage%images.length];nextImage+=1;img.onload=()=>frame.classList.remove('is-changing')},650);frameIndex+=1};const startHeroRotation=()=>{if(!rotationTimer)rotationTimer=setInterval(rotateFrame,2600)};const stopHeroRotation=()=>{clearInterval(rotationTimer);rotationTimer=null};heroArt.addEventListener('mouseenter',stopHeroRotation);heroArt.addEventListener('mouseleave',startHeroRotation);heroArt.addEventListener('focusin',stopHeroRotation);heroArt.addEventListener('focusout',startHeroRotation);startHeroRotation()}
const saleScroller=document.querySelector('[data-sale-scroller]');
const scrollSale=direction=>{if(!saleScroller)return;const card=saleScroller.querySelector('.sale-card');const amount=(card?.getBoundingClientRect().width||320)+18;saleScroller.scrollBy({left:direction*amount,behavior:'smooth'})};
document.querySelector('[data-sale-prev]')?.addEventListener('click',()=>scrollSale(-1));
document.querySelector('[data-sale-next]')?.addEventListener('click',()=>scrollSale(1));
const year=document.querySelector('[data-year]');if(year)year.textContent=new Date().getFullYear();