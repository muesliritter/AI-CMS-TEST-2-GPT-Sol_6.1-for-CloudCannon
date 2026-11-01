const form=document.querySelector<HTMLFormElement>('[data-filters]');
const list=document.querySelector<HTMLElement>('[data-place-list]');
const de=document.documentElement.lang==='de';
if(form&&list){
 const cards=Array.from(list.querySelectorAll<HTMLElement>('[data-place]'));
 const search=form.querySelector<HTMLInputElement>('[name=search]')!;
 const sort=form.querySelector<HTMLSelectElement>('[name=sort]')!;
 const buttons=Array.from(form.querySelectorAll<HTMLButtonElement>('[data-tag]'));
 const all=form.querySelector<HTMLButtonElement>('[data-all]')!;
 const params=new URLSearchParams(location.search);const selected=new Set((params.get('tags')||'').split(',').filter(x=>buttons.some(b=>b.dataset.tag===x)));
 search.value=params.get('q')||'';
 if(Array.from(sort.options).some(o=>o.value===params.get('sort')))sort.value=params.get('sort')!;
 const normal=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase(document.documentElement.lang);
 function update(){
  const query=normal(search.value.trim());
  let count=0;
  for(const card of cards){const tags=JSON.parse(card.dataset.tags||'[]');card.hidden=!(normal(card.textContent||'').includes(query)&&[...selected].every(x=>tags.includes(x)));if(!card.hidden)count++;}
  buttons.forEach(b=>b.setAttribute('aria-pressed',String(selected.has(b.dataset.tag!))));all.setAttribute('aria-pressed',String(selected.size===0));
  const key=sort.value;const sorted=[...cards].sort((a,b)=>{
   if(key==='name'||key==='quarter')return (a.dataset[key]||'').localeCompare(b.dataset[key]||'',de?'de':'en')||Number(a.dataset.order)-Number(b.dataset.order);
   if(key.startsWith('score:')){const id=key.slice(6);const ar=JSON.parse(a.dataset.ratings||'{}')[id]??-1;const br=JSON.parse(b.dataset.ratings||'{}')[id]??-1;return br-ar||Number(a.dataset.order)-Number(b.dataset.order);}
   return Number(a.dataset.order)-Number(b.dataset.order);
  });sorted.forEach(card=>list.append(card));
  form!.querySelector('[data-count]')!.textContent=`${count} ${de?'Orte zum Entdecken':'places to discover'}`;
  const empty=document.querySelector<HTMLElement>('[data-empty]');if(empty)empty.hidden=count!==0;
  const next=new URL(location.href);for(const k of ['q','tags','sort'])next.searchParams.delete(k);
  if(search.value)next.searchParams.set('q',search.value);if(selected.size)next.searchParams.set('tags',[...selected].join(','));if(sort.value!=='curated')next.searchParams.set('sort',sort.value);
  history.replaceState(null,'',next);document.querySelectorAll<HTMLAnchorElement>('.languages a').forEach(a=>{a.search=next.search;});
 }
 search.addEventListener('input',update);sort.addEventListener('change',update);
 buttons.forEach(b=>b.addEventListener('click',()=>{const id=b.dataset.tag!;selected.has(id)?selected.delete(id):selected.add(id);update();}));
 all.addEventListener('click',()=>{selected.clear();update();});form.addEventListener('reset',event=>{event.preventDefault();selected.clear();search.value='';sort.value='curated';update();});update();
}
const modal=document.querySelector<HTMLDialogElement>('[data-lightbox]');
if(modal){const img=modal.querySelector('img')!;const caption=modal.querySelector('figcaption')!;let photos:HTMLButtonElement[]=[];let current=0;let opener:HTMLButtonElement|undefined;
 const show=()=>{const p=photos[current];img.src=p.dataset.photo!;img.alt=p.dataset.alt||'';caption.textContent=`${img.alt} · ${current+1} / ${photos.length}`;modal.querySelectorAll<HTMLButtonElement>('.prev-photo,.next-photo').forEach(b=>b.hidden=photos.length<2);};
 document.querySelectorAll<HTMLButtonElement>('[data-photo]').forEach(b=>b.addEventListener('click',()=>{photos=Array.from(b.closest('[data-gallery]')!.querySelectorAll('[data-photo]'));current=photos.indexOf(b);opener=b;show();modal.showModal();}));
 modal.querySelector('.close-lightbox')!.addEventListener('click',()=>modal.close());
 modal.querySelector('.prev-photo')!.addEventListener('click',()=>{current=(current-1+photos.length)%photos.length;show();});
 modal.querySelector('.next-photo')!.addEventListener('click',()=>{current=(current+1)%photos.length;show();});
 modal.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();current=(current+(e.key==='ArrowRight'?1:-1)+photos.length)%photos.length;show();}});
 modal.addEventListener('click',e=>{if(e.target===modal){const r=modal.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)modal.close();}});
 modal.addEventListener('close',()=>opener?.focus());
}
