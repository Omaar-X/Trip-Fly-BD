/* DESTINATIONS JS */
document.querySelectorAll('.ftab').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.ftab').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const f=btn.dataset.f;
    document.querySelectorAll('.dest-full-card').forEach(card=>{
      if(f==='all'||card.dataset.cat===f){
        card.classList.remove('hidden');
        card.style.animation='none'; card.offsetHeight; card.style.animation='';
      } else { card.classList.add('hidden'); }
    });
  });
});