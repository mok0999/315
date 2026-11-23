(function(){
  'use strict';
  var TARGET='https://mok0999.github.io/315/chat.html';
  if(location.href.indexOf(TARGET)===0)return;
  var host=null,btn=null,pending='';
  function selText(){
    var a=document.activeElement;
    if(a&&(a.tagName==='TEXTAREA'||(a.tagName==='INPUT'&&/^(text|search)$/i.test(a.type)))){
      try{return a.value.slice(a.selectionStart,a.selectionEnd);}catch(_){}
    }
    var s=window.getSelection();return s?String(s):'';
  }
  function make(){
    host=document.createElement('div');
    host.style.cssText='all:initial;position:absolute;z-index:2147483647;top:0;left:0;width:0;height:0';
    var root=host.attachShadow({mode:'closed'});
    root.innerHTML='<style>button{all:initial;box-sizing:border-box;position:absolute;width:30px;height:30px;border-radius:50%;'
      +'background:#424448;box-shadow:0 2px 8px rgba(0,0,0,.25);cursor:pointer;display:flex;align-items:center;justify-content:center;'
      +'transition:transform .12s}button:hover{transform:scale(1.1)}svg{display:block}</style>'
      +'<button type="button" title="발췌기로 보내기"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">'
      +'<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><line x1="20" y1="4" x2="8.12" y2="15.88"/><line x1="14.47" y1="14.48" x2="20" y2="20"/><line x1="8.12" y1="8.12" x2="12" y2="12"/></svg></button>';
    btn=root.querySelector('button');
    btn.addEventListener('mousedown',function(e){e.preventDefault();e.stopPropagation();});
    btn.addEventListener('click',function(e){
      e.preventDefault();e.stopPropagation();
      var t=pending;hide();
      if(t.trim())send(t);
    });
    document.documentElement.appendChild(host);
  }
  function show(x,y){
    if(!host||!host.isConnected)make();
    var bx=Math.min(x+8,window.scrollX+document.documentElement.clientWidth-36);
    btn.style.left=bx+'px';btn.style.top=(y+10)+'px';btn.style.display='flex';
  }
  function hide(){if(btn)btn.style.display='none';}
  document.addEventListener('mouseup',function(e){
    if(e.button!==0)return;
    if(host&&e.composedPath&&e.composedPath().indexOf(host)>=0)return;
    setTimeout(function(){
      var t=selText();
      if(t&&t.trim()){pending=t;show(e.pageX,e.pageY);}else hide();
    },10);
  },true);
  document.addEventListener('mousedown',function(e){
    if(host&&e.composedPath&&e.composedPath().indexOf(host)>=0)return;
    hide();
  },true);
  document.addEventListener('keydown',hide,true);
  function url(t){return TARGET+'#moko-send='+Date.now()+'&text='+encodeURIComponent(t);}
  function send(t){
    try{chrome.runtime.sendMessage({type:'moko-send',url:url(t)});}
    catch(_){window.open(url(t),'_blank');}
  }
})();
