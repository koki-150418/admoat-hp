// 記事ページで、少し読み進めたら画面の下に「LINEで無料マニュアルを受け取る」ボタンを出す。
// 記事末の特典枠が見えている間は隠す。×で閉じたら、そのタブを閉じるまで出さない。
(function(){
  var me=document.currentScript; var url=me&&me.getAttribute('data-url'); if(!url) return;
  function closed(){ try{ return sessionStorage.getItem('lgsClosed')==='1'; }catch(e){ return false; } }
  if(closed()) return;
  var bar=document.createElement('div'); bar.className='lgs'; bar.style.display='none'; bar.setAttribute('role','complementary'); bar.setAttribute('aria-label','公式LINE登録特典');
  bar.innerHTML='<div class="lgs-txt"><b>無料プレゼント</b>アカウント設計<wbr>マニュアル</div>'+
    '<a class="lgs-btn" target="_blank" rel="noopener">LINEで受け取る</a><button type="button" class="lgs-x" aria-label="閉じる">×</button>';
  bar.querySelector('.lgs-btn').href=url;
  bar.querySelector('.lgs-x').addEventListener('click',function(){ bar.remove(); try{ sessionStorage.setItem('lgsClosed','1'); }catch(e){} });
  function ready(){ document.body.appendChild(bar); update(); }
  var endVisible=false;
  function update(){ var show=window.scrollY>500 && !endVisible; bar.style.display=show?'':'none'; }
  window.addEventListener('scroll', update, {passive:true});
  function watch(){
    var t=document.getElementById('line-gift');
    if(!t){ setTimeout(watch,500); return; }
    if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ endVisible=es[0].isIntersecting; update(); }).observe(t); }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ ready(); watch(); }); else { ready(); watch(); }
})();
