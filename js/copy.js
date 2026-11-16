(function(){
  var b=document.querySelector('.copy-btn');
  if(!b||!navigator.clipboard)return;
  b.addEventListener('click',function(){
    navigator.clipboard.writeText(b.getAttribute('data-copy')).then(function(){
      b.textContent='Kopiert ✓';b.classList.add('done');
      setTimeout(function(){b.textContent='Kopieren';b.classList.remove('done')},1800);
    });
  });
})();
