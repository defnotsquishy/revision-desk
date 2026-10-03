(() => {
  'use strict';
  const $=id=>document.getElementById(id);
  let mode='papers',page=0;
  const pageSize=12;
  const otherSubjects=['Maths','Further Maths','Sociology','History','Geography','English Language','English Literature'];
  const subjects=['all','Biology','Chemistry','Physics',...otherSubjects];
  const params=new URLSearchParams(location.search);
  const assetRoot=new URL('.',document.currentScript?.src || new URL('./library.js',location.href));
  $('paper-course').value='all';
  for(const [id,param,allowed] of [ ['paper-course','papersCourse',['combined','triple','other','all']],['paper-subject','papersSubject',subjects],['paper-tier','papersTier',['all','Foundation','Higher','Untiered']],['paper-number','papersNumber',['all','1','2','3']]])if(allowed.includes(params.get(param)))$(id).value=params.get(param);
  $('paper-search').value=params.get('papersSearch') || '';
  function link(label,url,download=false) {const a=document.createElement('a');a.className='button button-quiet';a.textContent=label;a.href=new URL(url,assetRoot).href;if(download)a.download=download;else{a.target='_blank';a.rel='noopener noreferrer';}return a;}
  function render(){
    const course=$('paper-course').value,subject=$('paper-subject').value,tier=$('paper-tier').value,query=$('paper-search').value.trim().toLowerCase();
    $('paper-search-clear').hidden=!query;$('paper-tier').disabled=mode==='files';$('paper-number').disabled=mode==='files';
    ['papers','files'].forEach(m=>$('library-'+m).setAttribute('aria-pressed',String(m===mode)));
    const data=mode==='papers'?[...window.PAPER_LIBRARY.papers,...(window.PAPER_LIBRARY.bundles||[]).map(r=>({...r,bundle:true}))].sort((a,b)=>(Number(b.series.match(/\d{4}/)?.[0])||0)-(Number(a.series.match(/\d{4}/)?.[0])||0)||b.series.localeCompare(a.series)||a.subject.localeCompare(b.subject)||a.code.localeCompare(b.code)):window.SCIENCE_RESOURCES;
    const number=$('paper-number').value;
    const matches=data.filter(r=>(course==='all'||r.route===course||r.route==='both'&&['combined','triple'].includes(course)) && (subject==='all'||r.subject===subject) && (mode==='files'||tier==='all'||r.tier===tier||r.bundle) && (mode==='files'||number==='all'||String(r.paperNumber||1)===number||r.bundle&&r.paperNumbers.includes(Number(number))) && [r.title,r.subject,r.code,r.series,r.tier,r.name].join(' ').toLowerCase().includes(query));
    page=Math.min(page,Math.max(0,Math.ceil(matches.length/pageSize)-1));
    const checked=new Date(window.PAPER_LIBRARY.checked+'T12:00:00Z').toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'});
    $('library-count').textContent=mode==='papers'?`${matches.filter(r=>!r.bundle).length} matched paper pairs · ${matches.filter(r=>r.bundle).length} official archive packs · checked ${checked}`:`${matches.length} matched study files · not exam papers`;
    const coverage={
      Maths:'Edexcel 1MA1: all 3 papers, Foundation and Higher. 66 individual pairs (2019–2025 public series); 2017–2018 papers are in 4 official ZIP archives. Sample/specimen PDF packs include questions and schemes. Locked releases are excluded.',
      History:'Your confirmed options: Medicine (11, Paper 1), Henry VIII (B3, Paper 2) and Cold War (P4, Paper 2). Paper 3 is not included because your school option is not confirmed. Older combined-option Paper 2 booklets are not assumed to match.',
      'Further Maths':'AQA Level 2 Further Mathematics 8365, untiered: Paper 1 non-calculator and Paper 2 calculator. 12 complete public pairs: June 2022–2025, November 2021 and Sample set 1. This is not A-level Further Maths or legacy 8360. Check the official resources for later releases.',
      'English Language':'AQA GCSE English Language 8700, untiered: 19 complete public pairs with source-text inserts. Updated sample papers are for first exam 2026, not 2026 past papers. Older papers use the pre-2026 format. November 2023 Paper 2 is omitted because its matching standard question paper is not currently public in the catalogue.',
      'English Literature':'AQA GCSE English Literature 8702, untiered: 18 complete public pairs, including Sample set 1. November 2021 and June 2022 use an adapted format with separate Paper 1M, 1N and 1P components. Check the component label and your current specification before practising.'
    };
    $('library-coverage').textContent=mode==='files'?'School organisers are reference downloads, not official examination papers.':coverage[subject]||'Public papers for your courses: Edexcel Maths, AQA Level 2 Further Maths, AQA English Language and Literature, Geography, History, Sociology, Combined Trilogy and Triple Science. Both science papers are included. Only complete public question-paper/mark-scheme pairs are listed; choose a subject, paper number and tier, and check older formats against your current specification.';
    $('library-empty').hidden=!!matches.length;
    $('library-results').replaceChildren(...matches.slice(page*pageSize,(page+1)*pageSize).map(r=>{
      const li=document.createElement('li'),h=document.createElement('h3'),p=document.createElement('p'),actions=document.createElement('div');
      actions.className='resource-actions';
      h.textContent=mode==='papers'?(r.title||`${r.subject==='History'&&r.code.includes('Medicine')?'Medicine in Britain, c1250–present':r.subject} · ${r.series}`):r.title;
      p.className='history-help';p.textContent=mode==='papers'?`${r.route==='combined'?'Combined Trilogy':r.route==='triple'?'Triple':r.board||'AQA'} · ${r.tier} · ${r.code} · ${r.bundle?'Papers 1, 2 & 3 · '+r.format+' pack':'Paper '+(r.paperNumber||1)}`:`${r.route==='both'?'Shared organiser (check labels)':r.route==='combined'?'Combined Trilogy':'Triple Science'} · ${r.subject} · ${r.name} · ${Math.ceil(r.bytes/1024)} KB`;
      actions.append(...(mode==='papers'?(r.bundle?[link('Open official '+r.format+' pack ↗',r.url)]:[link('Question paper ↗',r.paper),link('Matching mark scheme ↗',r.markScheme),...(r.insert?[link((r.insertLabel||'Matching insert')+' ↗',r.insert)]:[])]):[link('Download '+r.type,r.url,r.name)]));
      if(mode==='papers'&&!r.bundle){const draw=document.createElement('button');draw.className='button button-primary';draw.type='button';draw.textContent='Draw on paper';draw.addEventListener('click',()=>{$('library-dialog').close();window.RevisionPractice.openPaper(r);});actions.prepend(draw);}
      li.append(h,p);
      if(mode==='papers'&&r.note){const note=document.createElement('p');note.className='history-help';note.textContent=r.note;li.append(note);}
      li.append(actions);
      if(r.bundle){const help=document.createElement('p');help.className='history-help';help.textContent=r.format==='ZIP'?'Download the pack, extract a question paper, then open its PDF in My practice. Check its code and series against the scheme in the pack.':'This combined PDF contains questions and schemes. Download it, then open the PDF in My practice. Use the contents to find your tier and paper.';li.append(help);}
      return li;
    }));
    $('library-prev').disabled=page===0;$('library-next').disabled=(page+1)*pageSize>=matches.length;
    $('library-page').textContent=matches.length?`${page*pageSize+1}–${Math.min((page+1)*pageSize,matches.length)} of ${matches.length}`:'0 files';
  }
  function persist(){const p=new URLSearchParams(location.search);p.set('papersCourse',$('paper-course').value);p.set('papersSubject',$('paper-subject').value);p.set('papersTier',$('paper-tier').value);p.set('papersNumber',$('paper-number').value);if($('paper-search').value)p.set('papersSearch',$('paper-search').value);else p.delete('papersSearch');history.replaceState(null,'',location.pathname+'?'+p.toString()+location.hash);}
  function open(options){
    const subject=options&&typeof options==='object'&&otherSubjects.includes(options.subject)?options.subject:null;
    if(subject){mode='papers';page=0;$('paper-course').value='other';$('paper-subject').value=subject;$('paper-tier').value='all';$('paper-number').value='all';$('paper-search').value='';persist();}
    $('library-dialog').showModal();render();
  }
  $('library-button').addEventListener('click',open);window.RevisionLibrary={open};
  $('library-close').addEventListener('click',()=> $('library-dialog').close());
  ['papers','files'].forEach(m=>$('library-'+m).addEventListener('click',()=>{mode=m;page=0;render();}));
  ['paper-course','paper-subject','paper-tier','paper-number'].forEach(id=>$(id).addEventListener('change',()=>{if(id==='paper-subject'&&otherSubjects.includes($('paper-subject').value)&&['combined','triple'].includes($('paper-course').value))$('paper-course').value='other';page=0;persist();render();}));
  $('library-reset-filters').addEventListener('click',()=>{mode='papers';for(const id of ['paper-course','paper-subject','paper-tier','paper-number'])$(id).value='all';$('paper-search').value='';page=0;persist();render();$('paper-course').focus();});
  $('paper-search').addEventListener('input',event=>{if(event.isComposing)return;page=0;persist();render();});
  $('paper-search').addEventListener('compositionend',()=>{page=0;persist();render();});
  $('paper-search-clear').addEventListener('click',()=>{$('paper-search').value='';page=0;persist();render();$('paper-search').focus();});
  $('library-prev').addEventListener('click',()=>{if(page>0)page--;render();$('library-results').scrollIntoView({block:'nearest'});});
  $('library-next').addEventListener('click',()=>{page++;render();$('library-results').scrollIntoView({block:'nearest'});});
  $('paper-directories').replaceChildren(...window.PAPER_LIBRARY.directories.map(d=>{const p=document.createElement('p');p.append(link(`${d.subject} ${d.code} · official resources ↗`,d.url));return p;}));
  render();
})();
