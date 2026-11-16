(function(){
  var input=document.getElementById('bank-filter-input');
  var table=document.querySelector('#banken .bank-matrix');
  if(!input||!table)return;
  var count=document.getElementById('bank-filter-count');
  var rows=Array.prototype.slice.call(table.tBodies[0].rows);
  var total=rows.length;
  input.hidden=false;
  function norm(s){return s.toLowerCase().replace(/\s+/g,' ')}
  var texts=rows.map(function(r){
    return norm(r.cells[0].textContent+' '+r.cells[1].textContent)
      .replace('enable banking (psd2)','enable banking psd2');
  });
  function apply(){
    var terms=norm(input.value).trim().split(' ').filter(Boolean);
    var shown=0;
    rows.forEach(function(r,i){
      var ok=terms.every(function(t){return texts[i].indexOf(t)!==-1});
      r.hidden=!ok;
      if(ok)shown++;
    });
    count.textContent=terms.length?shown+' von '+total+' Einträgen':'';
  }
  input.addEventListener('input',apply);
})();
