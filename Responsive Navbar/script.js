const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');

  if(document.body.classList.contains('light')){
    themeBtn.textContent = '☀️';
  } else {
    themeBtn.textContent = '🌙';
  }
});

// Scroll nav
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled',scrollY > 30),
  { passive:true }
});

// Hamburger toggle
const burger = document.getElementById('burger');
const wrap = document.getElementById('mobileWrap');
const bg = document.getElementById('mobileBg');

function open(){
  wrap.classList.add('open');
  burger.classList.add('open');
  burger.setAttribute('aria-expanded','true');
  document.body.style.overflow='hidden';
}

function close(){
  wrap.classList.remove('open');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded','false');
  document.body.style.overflow='';
}

burger.addEventListener('click',() => {
  wrap.classList.contains('open')?close():open()
});

bg.addEventListener('click',close);

wrap.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));

document.addEventListener('keydown',e => {
  e.key ==='Escape'&&close()
});
 
// Active link sync
const allA = [
  ...document.querySelectorAll('.pill-nav a'),
  ...document.querySelectorAll('.mob-links a')
];

allA.forEach((link,_,arr) => {

  link.addEventListener('click',function(){

    if(!this.closest('.pill-nav')&&!this.closest('.mob-links'))return;

    const isPill=!!this.closest('.pill-nav');

    document.querySelectorAll('.pill-nav a').forEach(l=>l.classList.remove('active'));
    document.querySelectorAll('.mob-links a').forEach(l=>l.classList.remove('active'));

    const idx = [...this.closest('ul').querySelectorAll('a')].indexOf(this);

    document.querySelectorAll('.pill-nav a')[idx]?.classList.add('active');
    document.querySelectorAll('.mob-links a')[idx]?.classList.add('active');

  });

});