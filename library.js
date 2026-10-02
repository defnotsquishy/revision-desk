(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  let mode='papers',page=0;
  const pageSize=12;
  const params=new URLSearchParams(location.search);
  for(const [id,param,allowed] of [ ['paper-course','papersCourse',['combined','triple','other','all']],['paper-subject','papersSubject',['all','Biology','Chemistry','Physics','English Literature','Geography','History','Maths','Sociology']],['paper-tier','papersTier',['all','Foundation','Higher','Untiered']],['paper-number','papersNumber',['all','1','2','3']]])if(allowed.includes(params.get(param)))$(id).value=params.get(param);
  $('paper-search').value=params.get('papersSearch') || '';
  function link(label,url,download=false) {const a=document.createElement('a');a.className='button button-quiet';a.textContent=label;a.href=url;if(download)a.download=download;else{a.target='_blank';a.rel='noopener noreferrer';}return a;}
  function render(){
    const course=$('paper-course').value,subject=$('paper-subject').value,tier=$('paper-tier').value,query=$('paper-search').value.trim().toLowerCase();
    $('paper-search-clear').hidden=!query;$('paper-tier').disabled=mode==='files';$('paper-number').disabled=mode==='files';
    ['papers','files'].forEach(m=>$('library-'+m).setAttribute('aria-pressed',String(m===mode)));
    const data=mode==='papers'?[...window.PAPER_LIBRARY.papers,...(window.PAPER_LIBRARY.bundles||[]).map(r=>({...r,bundle:true}))]:window.SCIENCE_RESOURCES;
    const number=$('paper-number').value;
    const matches=data.filter(r=>(course==='all'||r.route===course||r.route==='both'&&['combined','triple'].includes(course)) && (subject==='all'||r.subject===subject) && (mode==='files'||tier==='all'||r.tier===tier||r.bundle) && (mode==='files'||number==='all'||String(r.paperNumber||1)===number||r.bundle&&r.paperNumbers.includes(Number(number))) && [r.title,r.subject,r.code,r.series,r.tier,r.name].join(' ').toLowerCase().includes(query));
    page=Math.min(page,Math.max(0,Math.ceil(matches.length/pageSize)-1));
    $('library-count').textContent=mode==='papers'?`${matches.filter(r=>!r.bundle).length} matched paper pairs · ${matches.filter(r=>r.bundle).length} official archive packs · checked 2 October 2026`:`${matches.length} matched study files · not exam papers`;
    $('library-empty').hidden=!!matches.length;
    $('library-results').replaceChildren(...matches.slice(page*pageSize,(page+1)*pageSize).map(r=>{
      const li=document.createElement('li'),h=document.createElement('h3'),p=document.createElement('p'),actions=document.createElement('div');
      actions.className='resource-actions';
      h.textContent=mode==='papers'?`${r.subject} · ${r.series}`:r.title;
      p.className='history-help';p.textContent=mode==='papers'?`${r.route==='combined'?'Combined Trilogy':r.route==='triple'?'Triple':r.board||'AQA'} · ${r.tier} · ${r.code} · ${r.bundle?'Papers 1, 2 & 3 · '+r.format+' pack':'Paper '+(r.paperNumber||1)}`:`${r.route==='both'?'Shared organiser (check labels)':r.route==='combined'?'Combined Trilogy':'Triple Science'} · ${r.subject} · ${r.name} · ${Math.ceil(r.bytes/1024)} KB`;
      actions.append(...(mode==='papers'?(r.bundle?[link('Open official '+r.format+' pack ↗',r.url)]:[link('Question paper ↗',r.paper),link('Matching mark scheme ↗',r.markScheme)]):[link('Download '+r.type,r.url,r.name)]));
      if(mode==='papers'&&!r.bundle){const draw=document.createElement('button');draw.className='button button-primary';draw.type='button';draw.textContent='Draw on paper';draw.addEventListener('click',()=>{$('library-dialog').close();window.RevisionPractice.openPaper(r);});actions.prepend(draw);}
      if(r.bundle){const help=document.createElement('p');help.className='history-help';help.textContent='Download the pack, extract a question paper, then open its PDF in My practice. Check the code and series against the mark scheme in the pack.';li.append(help);}
      li.append(h,p,actions);return li;
    }));
    $('library-prev').disabled=page===0;$('library-next').disabled=(page+1)*pageSize>=matches.length;
    $('library-page').textContent=matches.length?`${page*pageSize+1}–${Math.min((page+1)*pageSize,matches.length)} of ${matches.length}`:'0 files';
  }
  function persist(){const p=new URLSearchParams(location.search);p.set('papersCourse',$('paper-course').value);p.set('papersSubject',$('paper-subject').value);p.set('papersTier',$('paper-tier').value);p.set('papersNumber',$('paper-number').value);if($('paper-search').value)p.set('papersSearch',$('paper-search').value);else p.delete('papersSearch');history.replaceState(null,'',location.pathname+'?'+p.toString()+location.hash);}
  function open(){$('library-dialog').showModal();render();}
  $('library-button').addEventListener('click',open);window.RevisionLibrary={open};
  $('library-close').addEventListener('click',()=> $('library-dialog').close());
  ['papers','files'].forEach(m=>$('library-'+m).addEventListener('click',()=>{mode=m;page=0;render();}));
  ['paper-course','paper-subject','paper-tier','paper-number'].forEach(id=>$(id).addEventListener('change',()=>{page=0;persist();render();}));
  $('paper-search').addEventListener('input',event=>{if(event.isComposing)return;page=0;persist();render();});
  $('paper-search').addEventListener('compositionend',()=>{page=0;persist();render();});
  $('paper-search-clear').addEventListener('click',()=>{$('paper-search').value='';page=0;persist();render();$('paper-search').focus();});
  $('library-prev').addEventListener('click',()=>{if(page>0)page--;render();$('library-results').scrollIntoView({block:'nearest'});});
  $('library-next').addEventListener('click',()=>{page++;render();$('library-results').scrollIntoView({block:'nearest'});});
  $('paper-directories').replaceChildren(...window.PAPER_LIBRARY.directories.map(d=>{const p=document.createElement('p');p.append(link(`${d.subject} ${d.code} · official resources ↗`,d.url));return p;}));
  render();
})();
