/* Read-only resource directory. URL owns filters; existing router owns navigation. */
(() => {
  'use strict';
  const $=id=>document.getElementById(id),catalogue=window.REVISION_MATHS_RESOURCES,size=12;
  if(!catalogue||!$('maths-results'))return;
  const keys=['mathsCourse','mathsSection','mathsGrade','mathsSearch','mathsPage'];
  function node(tag,cls,text){const el=document.createElement(tag);if(cls)el.className=cls;if(text!==undefined)el.textContent=text;return el;}
  function link(label,url){const a=node('a','resource-link',label);a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.append(node('span','sr-only',' (opens in a new tab)'));return a;}
  function read(){const p=new URLSearchParams(location.search),course=Object.hasOwn(catalogue,p.get(keys[0]))?p.get(keys[0]):'maths',data=catalogue[course];return {course,section:data.sections.some(s=>s.id===p.get(keys[1]))?p.get(keys[1]):'all',grade:course==='maths'&&/^[1-8]$/.test(p.get(keys[2])||'')?p.get(keys[2]):'all',query:(p.get(keys[3])||'').slice(0,200),page:Math.max(1,Math.min(999,Number.parseInt(p.get(keys[4]),10)||1))};}
  function write(state){const url=new URL(location.href);for(const [key,value] of [[keys[0],state.course],[keys[1],state.section],[keys[2],state.grade],[keys[3],state.query],[keys[4],String(state.page)]])if(value&&value!=='all'&&!(key===keys[4]&&value==='1'))url.searchParams.set(key,value);else url.searchParams.delete(key);history.replaceState(null,'',url);}
  function render(){
    const state=read(),data=catalogue[state.course],query=state.query.trim().toLowerCase();
    $('maths-course').value=state.course;
    const options=[node('option','','All sections'),...data.sections.map(s=>{const o=node('option','',s.title);o.value=s.id;return o;})];options[0].value='all';$('maths-section').replaceChildren(...options);$('maths-section').value=state.section;
    $('maths-grade').value=state.grade;$('maths-grade').disabled=state.course!=='maths';$('maths-search').value=state.query;$('maths-search-clear').hidden=!state.query;
    $('maths-course-title').textContent=data.title;$('maths-qualification').textContent=data.qualification;
    $('maths-provider').href=data.sourceUrl;$('maths-grade-note').textContent=data.gradeNote;
    $('maths-booklets').replaceChildren(...data.booklets.map(b=>link(b.title+' ↗',b.url)));
    const all=data.sections.flatMap(s=>s.topics.map(t=>({...t,section:s.title,sectionId:s.id})));
    const matches=all.filter(t=>(state.section==='all'||t.sectionId===state.section)&&(state.grade==='all'||String(t.grade)===state.grade)&&(!query||(t.title+' '+t.section).toLowerCase().includes(query)));
    const pages=Math.max(1,Math.ceil(matches.length/size)),page=Math.min(state.page,pages);if(page!==state.page)write({...state,page});
    $('maths-count').textContent=`${matches.length} of ${all.length} topics · ${data.provider}`;
    $('maths-empty').hidden=!!matches.length;$('maths-table-frame').hidden=!matches.length;
    $('maths-results').replaceChildren(...matches.slice((page-1)*size,page*size).map(t=>{
      const row=node('tr'),heading=node('th');heading.scope='row';heading.append(node('strong','',t.title),node('small','',t.section+(t.tier==='higher'?' · Higher only':'')));
      row.append(heading);
      for(const [label,url,text] of [['Video explanation',t.videoUrl,'Watch video ↗'],['Practice questions',t.questionsUrl,'Questions PDF ↗'],['Worked solutions',t.solutionsUrl,t.solutionsType==='video'?'Watch solutions ↗':'Solutions PDF ↗']]){const cell=node('td');cell.dataset.label=label;cell.append(link(text,url));row.append(cell);}
      const grade=node('td','maths-grade-value',t.gradeLabel||'Untiered');grade.dataset.label='Provider grade';row.append(grade);return row;
    }));
    $('maths-page').textContent=matches.length?`${(page-1)*size+1}–${Math.min(page*size,matches.length)} of ${matches.length}`:'No matching topics';
    $('maths-prev').disabled=page===1;$('maths-next').disabled=page===pages||!matches.length;
  }
  function filter(id){const state=read();if(id==='maths-course'){state.course=$(id).value;state.section='all';state.grade='all';}else if(id==='maths-section')state.section=$(id).value;else if(id==='maths-grade')state.grade=$(id).value;else state.query=$(id).value.slice(0,200);state.page=1;write(state);render();}
  for(const id of ['maths-course','maths-section','maths-grade'])$(id).addEventListener('change',()=>filter(id));
  $('maths-search').addEventListener('input',event=>{if(!event.isComposing)filter('maths-search');});$('maths-search').addEventListener('compositionend',()=>filter('maths-search'));
  $('maths-search-clear').addEventListener('click',()=>{$('maths-search').value='';filter('maths-search');$('maths-search').focus();});
  function reset(){write({...read(),section:'all',grade:'all',query:'',page:1});render();$('maths-section').focus();}
  $('maths-reset').addEventListener('click',reset);$('maths-empty-reset').addEventListener('click',reset);
  for(const [id,step] of [['maths-prev',-1],['maths-next',1]])$(id).addEventListener('click',()=>{write({...read(),page:read().page+step});render();$('maths-table-frame').scrollIntoView({block:'start'});$('maths-results-title').focus({preventScroll:true});});
  $('maths-papers').addEventListener('click',()=>window.RevisionLibrary.open({subject:read().course==='maths'?'Maths':'Further Maths'}));
  window.addEventListener('popstate',render);
  window.RevisionMathsResources={onShow:render,open(course='maths'){write({course:Object.hasOwn(catalogue,course)?course:'maths',section:'all',grade:'all',query:'',page:1});render();window.RevisionHome.show('maths');}};
  render();
})();
