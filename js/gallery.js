/* GALLERY JS */
const items    = document.querySelectorAll('.masonry-item');
const lightbox = document.getElementById('lightbox');
const lbImg    = document.getElementById('lbImg');
const lbCap    = document.getElementById('lbCaption');
const lbCnt    = document.getElementById('lbCounter');
const lbClose  = document.getElementById('lbClose');
const lbPrev   = document.getElementById('lbPrev');
const lbNext   = document.getElementById('lbNext');
const lbBack   = document.getElementById('lbBackdrop');

let cur=0;
const srcs=[], caps=[];
items.forEach((it,i)=>{ srcs.push(it.dataset.src); caps.push(it.dataset.caption||''); it.addEventListener('click',()=>open(i)); });

function open(i){ cur=i; lbImg.src=srcs[i]; lbCap.textContent=caps[i]; lbCnt.textContent=`${i+1} / ${srcs.length}`; lightbox.classList.add('open'); document.body.style.overflow='hidden'; }
function close(){ lightbox.classList.remove('open'); document.body.style.overflow=''; }
function prev(){ cur=(cur-1+srcs.length)%srcs.length; open(cur); }
function next(){ cur=(cur+1)%srcs.length; open(cur); }

lbClose.addEventListener('click',close);
lbBack.addEventListener('click',close);
lbPrev.addEventListener('click',prev);
lbNext.addEventListener('click',next);
document.addEventListener('keydown',e=>{ if(!lightbox.classList.contains('open'))return; if(e.key==='Escape')close(); if(e.key==='ArrowLeft')prev(); if(e.key==='ArrowRight')next(); });