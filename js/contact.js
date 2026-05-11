/* CONTACT JS */
document.getElementById('sendBtn').addEventListener('click',()=>{
  const name  = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const dest  = document.getElementById('cf-dest').value;
  const svc   = document.getElementById('cf-service').value;
  const msg   = document.getElementById('cf-msg').value.trim();

  const invalid = [];
  if(!name) invalid.push(document.getElementById('cf-name'));
  if(!phone) invalid.push(document.getElementById('cf-phone'));
  if(!dest) invalid.push(document.getElementById('cf-dest'));

  if(invalid.length){
    invalid.forEach(el=>{ el.style.borderColor='#ef4444'; setTimeout(()=>el.style.borderColor='',1500); });
    return;
  }

  const text=encodeURIComponent(
    `Hello Trip Fly BD! 👋\n\n`+
    `*Name:* ${name}\n`+
    `*Phone:* ${phone}\n`+
    `*Destination:* ${dest}\n`+
    `*Service:* ${svc||'Not specified'}\n`+
    `*Message:* ${msg||'No extra message'}\n\n`+
    `Please assist me with travel planning. 🙏`
  );
  window.open(`https://wa.me/8801XXXXXXXXX?text=${text}`,'_blank');
});