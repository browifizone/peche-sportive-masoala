/* Splash de bienvenue + bannière d'offres — Pêche Sportive Masoala
   Pour modifier les offres : changer uniquement la section CONFIG ci-dessous. */
(function(){
  /* ===== CONFIG ===== */
  var PROMOS=[
  {
    "k": "Pêche au gros",
    "t": "Demandez votre devis",
    "x": "Sortie en mer sur le bateau Ilona avec nos guides, en baie d’Antongil.",
    "b": "Écrire sur WhatsApp",
    "h": "https://wa.me/262639698604?text=Bonjour%2C%20je%20souhaite%20avoir%20des%20informations%20et%20un%20devis%20pour%20une%20sortie%20P%C3%AAche%20Sportive%20Masoala."
  },
  {
    "k": "Séjour combiné",
    "t": "Pêche + hôtel à Maroantsetra",
    "x": "Reposez-vous au Manga Beach Hôtel avant ou après votre sortie.",
    "b": "Voir l’hôtel",
    "h": "https://mangabeach-madagascar.mg/"
  },
  {
    "k": "Éco-lodge",
    "t": "Paradise Valley Lodge",
    "x": "Prolongez l’aventure avec des nuits nature à Ambanizana.",
    "b": "Voir le lodge",
    "h": "https://lodge-paradisevalley.com/"
  }
];
  var ROTATE=5500, HIDE_ON=[];
  /* ================== */
  var doc=document, ss=null;
  try{ss=window.sessionStorage}catch(e){}
  function get(k){try{return ss&&ss.getItem(k)}catch(e){return null}}
  function set(k){try{ss&&ss.setItem(k,'1')}catch(e){}}

  /* Écran de bienvenue */
  var sp=doc.querySelector('.wz-splash');
  if(sp){
    set('wz_splash');
    var close=function(){sp.classList.add('is-closing')};
    var b=sp.querySelector('.wz-skip-btn'); if(b) b.addEventListener('click',close);
    doc.addEventListener('keydown',function(e){if(e.key==='Escape')close()});
  }

  /* Bannière d'offres */
  var page=(location.pathname.split('/').pop()||'index.html');
  if(!PROMOS.length||HIDE_ON.indexOf(page)>-1||get('wz_promo_closed')) return;
  var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;

  var bar=doc.createElement('div');
  bar.className='wz-banner'; bar.setAttribute('role','region'); bar.setAttribute('aria-label','Offres');
  var h='<div class="wz-b-slides">';
  PROMOS.forEach(function(p,i){
    h+='<a class="wz-b-slide'+(i?'':' is-on')+'" href="'+p.h+'"'+(i?' tabindex="-1"':'')+'><span class="wz-b-k">'+p.k+'</span><span class="wz-b-t">'+p.t+'</span><span class="wz-b-c">'+p.b+' &rarr;</span></a>';
  });
  h+='</div><button class="wz-b-close" type="button" aria-label="Fermer la bannière">&times;</button>';
  bar.innerHTML=h;
  var eco=doc.querySelector('.ecosystem-nav');
  if(eco&&eco.parentNode) eco.parentNode.insertBefore(bar,eco.nextSibling); else doc.body.insertBefore(bar,doc.body.firstChild);
  if(getComputedStyle(bar).position!=='relative'){bar.remove();return}  /* CSS absent : ne rien afficher */

  /* Menu fixe (Manga Beach) : le décaler sous la bannière tant qu'elle est visible */
  var nav=doc.querySelector('nav#navbar')||doc.querySelector('nav');
  var fixedNav=nav&&getComputedStyle(nav).position==='fixed';
  function offsetNav(){
    if(!fixedNav) return;
    if(!bar.parentNode){nav.style.top='';return}
    nav.style.top=Math.max(0,Math.round(bar.getBoundingClientRect().bottom))+'px';
  }
  if(fixedNav){addEventListener('scroll',offsetNav,{passive:true});addEventListener('resize',offsetNav);offsetNav();setTimeout(offsetNav,300)}

  var slides=bar.querySelectorAll('.wz-b-slide'), cur=0, timer=null;
  function go(n){slides[cur].classList.remove('is-on');slides[cur].tabIndex=-1;cur=(n+slides.length)%slides.length;slides[cur].classList.add('is-on');slides[cur].removeAttribute('tabindex')}
  function stop(){if(timer){clearInterval(timer);timer=null}}
  function start(){stop(); if(!reduce&&slides.length>1) timer=setInterval(function(){go(cur+1)},ROTATE)}
  bar.addEventListener('mouseenter',stop); bar.addEventListener('mouseleave',start);
  bar.addEventListener('focusin',stop); bar.addEventListener('focusout',start);
  bar.querySelector('.wz-b-close').addEventListener('click',function(){stop();set('wz_promo_closed');bar.remove();offsetNav()});
  start();
})();
