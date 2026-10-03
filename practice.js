(() => {
  'use strict';
  const $=id=>document.getElementById(id),ink=window.RevisionInk,storage=window.RevisionPracticeStorage;
  const canvas=$('ink-canvas'),paper=$('paper-canvas'),stage=$('paper-stage');
  const MAX_BYTES=20*1024*1024;
  const assetRoot=new URL('.',document.currentScript?.src || new URL('./practice.js',location.href));
  let scope=window.RevisionStore.state().uid||'guest',record=null,pdf=null,page=1,tool='pen',color=ink.colors.Black;
  let loading=0,rendering=0,renderTask=null,dirty=false,edit=0,saveTask=null,timer,pointer=null,stroke=null,undo=[],redo=[],busy=false,blocked=false;
  const drafts=new Map();
  const status=message=>$('practice-status').textContent=message;
  const saveStatus=message=>$('practice-save-status').textContent=message;
  const pageData=()=>record.pages[page] ||= {strokes:[],notes:''};
  const clone=value=>JSON.parse(JSON.stringify(value));
  const dispose=doc=>{if(doc)doc.loadingTask.destroy().catch(()=>{});};
  function controls(){
    const ready=!!record&&!busy;
    for(const id of ['practice-backup','practice-export','practice-restore'])$(id).disabled=!ready;
    $('practice-image').disabled=!ready||!!renderTask;
    $('practice-save').disabled=!dirty||busy||blocked;
    $('practice-reload').hidden=!blocked;
    $('ink-undo').disabled=!undo.length||blocked;$('ink-redo').disabled=!redo.length||blocked;
    $('practice-prev').disabled=!ready||page<=1;$('practice-next').disabled=!ready||page>=record?.count;
    $('practice-page').disabled=!ready;$('practice-notes').disabled=!ready||blocked;
    canvas.style.pointerEvents=ready&&!blocked?'auto':'none';
    $('practice-editor').setAttribute('aria-busy',String(busy));
  }
  async function savedList(){
    const owner=scope;
    try{const rows=await storage.list(owner);if(owner!==scope)return;
      const select=$('practice-saved'),previous=select.value;select.replaceChildren(new Option('Choose a saved paper or board…',''));
      rows.forEach(r=>select.add(new Option(r.title+' · '+new Date(r.updatedAt).toLocaleDateString('en-GB'),r.key)));
      select.value=previous;$('practice-resume').disabled=!select.value;
    }catch(_){saveStatus('Device storage is unavailable. Keep an exported copy of your work.');}
  }
  async function save(){
    clearTimeout(timer);
    if(saveTask){await saveTask;if(dirty)return save();return;}
    if(!record||!dirty)return;
    if(blocked)throw Error('Export your ink, then reload the saved copy before continuing.');
    const current=record,version=edit,snapshot={...record,pages:clone(record.pages)};
    saveStatus('Saving drawings on this device…');
    saveTask=storage.save(snapshot,current.revision||0).then(revision=>{
      current.revision=revision;
      if(record===current){if(edit===version)dirty=false;saveStatus(dirty?'Saving your latest ink…':'Saved on this device · drawings are not cloud-synced.');}
    }).catch(error=>{if(record===current){blocked=error.code==='practice-conflict';saveStatus(error.message);}throw error;}).finally(()=>{saveTask=null;controls();});
    await saveTask;
    if(record===current&&dirty)return save();
    savedList();
  }
  function changed(){dirty=true;edit++;saveStatus('Unsaved ink · saving on this device…');clearTimeout(timer);timer=setTimeout(()=>save().catch(()=>{}),450);controls();}
  function remember(){undo.push(clone(pageData().strokes));if(undo.length>50)undo.shift();redo=[];}
  function paint(){const ctx=canvas.getContext('2d');ctx.clearRect(0,0,canvas.width,canvas.height);if(!record)return;pageData().strokes.forEach(s=>ink.draw(ctx,s,canvas.width,canvas.height));if(stroke)ink.draw(ctx,stroke,canvas.width,canvas.height);}
  async function render(){
    if(!record||$('view-practice').hidden)return;
    const token=++rendering,current=record;renderTask?.cancel();renderTask=null;
    try{
      const pdfPage=pdf?await pdf.getPage(page):null;if(token!==rendering||record!==current)return;
      const viewport=pdfPage?.getViewport({scale:1})||{width:595,height:842};
      const available=Math.max(240,$('paper-scroll').clientWidth-24),zoom=$('practice-zoom').value;
      const width=zoom==='fit'?Math.min(1000,available):viewport.width*Number(zoom),height=width*viewport.height/viewport.width;
      const ratio=Math.min(window.devicePixelRatio||1,2,Math.sqrt(8000000/(width*height)));
      stage.style.width=width+'px';stage.style.height=height+'px';
      for(const c of [paper,canvas]){c.width=Math.round(width*ratio);c.height=Math.round(height*ratio);}
      const ctx=paper.getContext('2d');ctx.fillStyle='#fff';ctx.fillRect(0,0,paper.width,paper.height);
      if(pdfPage){renderTask=pdfPage.render({canvasContext:ctx,viewport:pdfPage.getViewport({scale:paper.width/viewport.width})});controls();await renderTask.promise;}
      else if(record.grid==='grid'){ctx.strokeStyle='#dce3eb';ctx.lineWidth=1;const gap=20*paper.width/595;ctx.beginPath();for(let x=gap;x<paper.width;x+=gap){ctx.moveTo(x,0);ctx.lineTo(x,paper.height);}for(let y=gap;y<paper.height;y+=gap){ctx.moveTo(0,y);ctx.lineTo(paper.width,y);}ctx.stroke();}
      if(token!==rendering||record!==current)return;
      renderTask=null;paint();controls();
    }catch(error){if(token!==rendering||error.name==='RenderingCancelledException')return;renderTask=null;status('This page could not be rendered. Try another page or reopen the PDF. Your saved ink is retained.');controls();}
  }
  function sourceLinks(source){$('practice-source').hidden=!source;if(source){$('practice-official').href=source.paper;$('practice-mark-scheme').href=source.markScheme;$('practice-mark-scheme').textContent='Matching mark scheme ↗';}}
  async function decode(bytes){
    const api=await import('./vendor/pdfjs/pdf.min.mjs');api.GlobalWorkerOptions.workerSrc=new URL('./vendor/pdfjs/pdf.worker.min.mjs',assetRoot).href;
    const task=api.getDocument({data:new Uint8Array(bytes.slice(0)),isEvalSupported:false,maxImageSize:16000000,cMapUrl:new URL('./vendor/pdfjs/cmaps/',assetRoot).href,cMapPacked:true,standardFontDataUrl:new URL('./vendor/pdfjs/standard_fonts/',assetRoot).href,wasmUrl:new URL('./vendor/pdfjs/wasm/',assetRoot).href});
    let timeout;
    const interrupted=new Promise((_,reject)=>{task.onPassword=()=>{reject(Error('This PDF needs a password. Choose a PDF that opens without a password.'));task.destroy().catch(()=>{});};timeout=setTimeout(()=>{reject(Error('This PDF took too long to open. Try a smaller or simpler PDF.'));task.destroy().catch(()=>{});},20000);});
    let doc;try{doc=await Promise.race([task.promise,interrupted]);}finally{clearTimeout(timeout);}if(doc.numPages>200){dispose(doc);throw Error('Choose a PDF with no more than 200 pages.');}return doc;
  }
  async function activate(next,decoded){
    if(next.scope!==scope){dispose(decoded);return;}
    rendering++;renderTask?.cancel();renderTask=null;dispose(pdf);pdf=decoded;record=next;page=Math.min(next.count,next.currentPage||1);dirty=false;blocked=false;undo=[];redo=[];stroke=null;pointer=null;
    $('practice-title').textContent=next.title;$('practice-description').textContent=next.kind==='board'?'Your own space for working things out.':'Write directly on each page, then check your answers.';
    sourceLinks(next.source);$('practice-editor').hidden=false;$('board-grid-label').hidden=next.kind!=='board';$('board-grid').value=next.grid||'blank';
    $('practice-page').replaceChildren(...Array.from({length:next.count},(_,i)=>new Option(`${i+1} of ${next.count}`,i+1)));$('practice-page').value=page;$('practice-notes').value=pageData().notes;
    status(next.kind==='board'?'Whiteboard ready.':'Paper ready. Your writing stays attached to its page.');saveStatus('Saved on this device · drawings are not cloud-synced.');
    window.RevisionHome.show('practice');controls();await render();
  }
  async function openBytes(bytes,title,source,token){
    if(bytes.byteLength>MAX_BYTES||!bytes.byteLength)throw Error('Choose a PDF no larger than 20 MB.');
    if(!new TextDecoder().decode(bytes.slice(0,1024)).includes('%PDF-'))throw Error('This is not a readable PDF. Download the PDF file and try again.');
    const owner=scope,hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(x=>x.toString(16).padStart(2,'0')).join(''),key=owner+':pdf:'+hash;
    const decoded=await decode(bytes);if(token!==loading||scope!==owner){dispose(decoded);return;}
    let existing;try{existing=await storage.read(key);}catch(_){}
    if(token!==loading||scope!==owner){dispose(decoded);return;}
    if(existing&&!ink.validPages(existing.pages,decoded.numPages)){dispose(decoded);throw Error('The saved ink could not be read. Keep a backup and try another copy.');}
    const next=existing||{key,scope:owner,kind:'pdf',fingerprint:hash,title:title.slice(0,180),source:source||null,bytes,count:decoded.numPages,pages:{},revision:0,currentPage:1};
    await activate(next,decoded);if(!existing){changed();await save();}
  }
  async function leave(){finishStroke();await save();}
  async function loadFile(file){if(!file)return;const token=++loading;try{if(!file.size||file.size>MAX_BYTES)throw Error('Choose a non-empty PDF no larger than 20 MB.');await leave();busy=true;controls();status('Opening PDF…');const bytes=await file.arrayBuffer();if(token===loading)await openBytes(bytes,file.name,null,token);}catch(error){if(token===loading)status(error.message||'Could not open this PDF. Try a PDF that opens without a password.');}finally{if(token===loading){busy=false;controls();}}}
  async function openPaper(source){
    const token=++loading;window.RevisionHome.show('practice');
    try{await leave();busy=true;controls();status('Loading the official question paper…');
      const response=await fetch(source.paper,{credentials:'omit',signal:AbortSignal.timeout(20000)});
      if(!response.ok||Number(response.headers.get('content-length'))>MAX_BYTES)throw Error('download');
      const reader=response.body.getReader();let size=0;const chunks=[];
      while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>MAX_BYTES){await reader.cancel();throw Error('size');}chunks.push(value);}
      const bytes=new Uint8Array(size);let offset=0;chunks.forEach(c=>{bytes.set(c,offset);offset+=c.length;});
      if(token===loading)await openBytes(bytes.buffer,`${source.subject} · ${source.series} · ${source.code}`,{paper:source.paper,markScheme:source.markScheme},token);
    }catch(error){if(token===loading){console.warn('Official PDF load failed:',error.name,error.message);status('The paper could not open here. '+(error.name==='TypeError'||error.name==='TimeoutError'||['download','size'].includes(error.message)?'The board may block embedded viewing. ':error.message+' ')+'Open the official question paper, download it, then use “Open a PDF” above. '+(record?'Your previous practice is still below.':''));sourceLinks(source);$('practice-mark-scheme').textContent='Requested paper’s mark scheme ↗';}}
    finally{if(token===loading){busy=false;controls();}}
  }
  async function whiteboard(fresh=false){
    window.RevisionHome.show('practice');if(record?.kind==='board'&&!fresh){render();return;}
    const token=++loading,owner=scope;
    try{await leave();busy=true;controls();const id=crypto.randomUUID();const next={key:owner+':board:'+id,scope:owner,kind:'board',fingerprint:id,title:'Whiteboard · '+new Date().toLocaleString('en-GB',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}),count:1,pages:{},revision:0,grid:'blank'};if(token!==loading||owner!==scope)return;await activate(next,null);changed();await save();}
    catch(error){status(error.message||'Could not open the whiteboard.');}finally{if(token===loading){busy=false;controls();}}
  }
  async function resume(key,discard=false){const token=++loading,owner=scope;try{if(!discard)await leave();busy=true;controls();status('Opening saved practice…');const next=await storage.read(key);if(!next||next.scope!==owner||!ink.validPages(next.pages,next.count))throw Error('Saved practice was not found or could not be read.');const decoded=next.kind==='pdf'?await decode(next.bytes):null;if(token!==loading||owner!==scope){dispose(decoded);return;}await activate(next,decoded);}catch(error){if(token===loading)status(error.message||'Could not open saved practice.');}finally{if(token===loading){busy=false;controls();}}}
  function position(event){const rect=canvas.getBoundingClientRect();return [Math.max(0,Math.min(1,(event.clientX-rect.left)/rect.width)),Math.max(0,Math.min(1,(event.clientY-rect.top)/rect.height))];}
  function erase(p){const data=pageData(),next=data.strokes.filter(s=>!ink.hit(s,p,canvas.height/canvas.width));if(next.length!==data.strokes.length){data.strokes=next;paint();}}
  canvas.addEventListener('pointerdown',event=>{
    if(!record||busy||blocked||renderTask||pointer!==null||tool==='scroll'||event.button!==0)return;
    event.preventDefault();pointer=event.pointerId;canvas.setPointerCapture(pointer);remember();
    if(tool==='erase'){erase(position(event));return;}
    if(pageData().strokes.length>=500){pointer=null;status('This page has reached 500 strokes. Export your work or erase some ink to continue.');return;}
    stroke={tool,color,width:Number($('ink-width').value),points:[position(event)]};paint();
  });
  canvas.addEventListener('pointermove',event=>{if(event.pointerId!==pointer)return;event.preventDefault();if(tool==='erase'){erase(position(event));return;}if(!stroke)return;for(const e of event.getCoalescedEvents?.()||[event])if(stroke.points.length<4000)stroke.points.push(position(e));paint();});
  function finishStroke(){if(pointer===null)return;if(stroke){pageData().strokes.push(stroke);stroke=null;}const released=pointer;pointer=null;if(canvas.hasPointerCapture(released))canvas.releasePointerCapture(released);paint();changed();}
  canvas.addEventListener('pointerup',finishStroke);canvas.addEventListener('pointercancel',finishStroke);canvas.addEventListener('lostpointercapture',finishStroke);
  document.querySelectorAll('[data-ink-tool]').forEach(b=>b.addEventListener('click',()=>{finishStroke();tool=b.dataset.inkTool;document.querySelectorAll('[data-ink-tool]').forEach(el=>el.setAttribute('aria-pressed',String(el===b)));canvas.style.touchAction=tool==='scroll'?'auto':'none';canvas.style.cursor=tool==='scroll'?'auto':'crosshair';}));
  Object.entries(ink.colors).forEach(([name,value])=>{const b=document.createElement('button');b.type='button';b.className='ink-swatch';b.textContent=name;b.style.setProperty('--swatch',value);b.setAttribute('aria-label',name+' ink');b.setAttribute('aria-pressed',String(value===color));b.addEventListener('click',()=>{color=value;Array.from($('ink-colors').children).forEach(el=>el.setAttribute('aria-pressed',String(el===b)));});$('ink-colors').append(b);});
  function history(direction){finishStroke();const from=direction==='undo'?undo:redo,to=direction==='undo'?redo:undo;if(!from.length||blocked)return;to.push(clone(pageData().strokes));pageData().strokes=from.pop();paint();changed();}
  $('ink-undo').addEventListener('click',()=>history('undo'));$('ink-redo').addEventListener('click',()=>history('redo'));
  let confirmation;
  function confirmAction(title,copy,label,action){$('ink-confirm-title').textContent=title;$('ink-confirm-copy').textContent=copy;$('ink-confirm-ok').textContent=label;confirmation=action;$('ink-confirm-dialog').showModal();}
  $('ink-clear').addEventListener('click',()=>{if(!record||busy||blocked)return;finishStroke();confirmAction('Clear this page’s ink?','The original paper and typed notes stay unchanged. You can undo this clear while the document stays open.','Clear page ink',()=>{remember();pageData().strokes=[];paint();changed();});});
  $('ink-confirm-cancel').addEventListener('click',()=>$('ink-confirm-dialog').close());$('ink-confirm-ok').addEventListener('click',()=>{$('ink-confirm-dialog').close();confirmation?.();});
  $('practice-reload').addEventListener('click',()=>confirmAction('Reload the saved practice?','Unsaved ink in this window will be replaced. Export an ink backup first if you want to keep it.','Reload saved copy',()=>resume(record.key,true)));
  async function go(n){if(!record||busy||n<1||n>record.count)return;finishStroke();page=n;record.currentPage=n;undo=[];redo=[];$('practice-page').value=n;$('practice-notes').value=pageData().notes;changed();await render();}
  $('practice-prev').addEventListener('click',()=>go(page-1));$('practice-next').addEventListener('click',()=>go(page+1));$('practice-page').addEventListener('change',e=>go(Number(e.target.value)));
  $('practice-zoom').addEventListener('change',()=>{finishStroke();render();});$('board-grid').addEventListener('change',e=>{if(record?.kind==='board'){record.grid=e.target.value;changed();render();}});
  $('practice-notes').addEventListener('input',e=>{if(record&&!blocked){pageData().notes=e.target.value;changed();e.target.style.height='auto';e.target.style.height=Math.min(800,e.target.scrollHeight)+'px';}});
  $('practice-pdf').addEventListener('change',e=>{loadFile(e.target.files?.[0]);e.target.value='';});$('practice-new-board').addEventListener('click',()=>whiteboard(true));
  $('practice-saved').addEventListener('change',e=>$('practice-resume').disabled=!e.target.value);$('practice-resume').addEventListener('click',()=>resume($('practice-saved').value));$('practice-save').addEventListener('click',()=>save().catch(()=>{}));
  function download(blob,suffix){const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=(record.title.replace(/[^a-z0-9 -]/gi,'').slice(0,90)||'Revision practice')+suffix;a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);}
  $('practice-backup').addEventListener('click',()=>{finishStroke();download(new Blob([JSON.stringify({format:'revision-ink-v1',fingerprint:record.fingerprint,count:record.count,kind:record.kind,pages:record.pages,grid:record.grid||'blank'})],{type:'application/json'}),'.ink.json');status('Ink backup downloaded. Keep the original PDF too; the backup contains your ink and typed notes.');});
  $('practice-restore').addEventListener('change',async e=>{const file=e.target.files?.[0];e.target.value='';if(!file||!record)return;const current=record;
    try{if(file.size>15*1024*1024)throw Error('Choose an ink backup smaller than 15 MB.');const value=JSON.parse(await file.text());if(record!==current)return;if(value.format!=='revision-ink-v1'||value.count!==record.count||!ink.validPages(value.pages,record.count)||value.kind!==record.kind||(record.kind==='pdf'&&value.fingerprint!==record.fingerprint))throw Error('This backup does not match the open PDF, or contains invalid ink. Open the original PDF first.');
      confirmAction('Restore this ink backup?','This replaces the open document’s ink and notes. Export your current ink first if you want to keep both versions.','Restore ink backup',()=>{if(record!==current)return;record.pages=clone(value.pages);undo=[];redo=[];$('practice-notes').value=pageData().notes;paint();changed();});
    }catch(error){status(error.message||'Could not read this ink backup.');}
  });
  $('practice-image').addEventListener('click',()=>{finishStroke();const output=document.createElement('canvas');output.width=paper.width;output.height=paper.height;const ctx=output.getContext('2d');ctx.drawImage(paper,0,0);ctx.drawImage(canvas,0,0);output.toBlob(blob=>{if(blob)download(blob,`-page-${page}.png`);},'image/png');});
  let pdfLib;
  function getPdfLib(){return pdfLib ||= new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('vendor/pdf-lib.min.js',assetRoot).href;script.onload=()=>resolve(window.PDFLib);script.onerror=()=>{pdfLib=null;reject(Error('PDF export could not load. Retry or export an ink backup.'));};document.head.append(script);});}
  $('practice-export').addEventListener('click',async()=>{
    if(!record||busy)return;finishStroke();const current=record,owner=scope;busy=true;controls();status('Preparing written PDF…');
    try{const lib=await getPdfLib();let doc,flatten=false;
      if(current.kind==='pdf'){try{doc=await lib.PDFDocument.load(current.bytes.slice(0));}catch(error){if(error.name!=='EncryptedPDFError'&&!/encrypted/i.test(error.message))throw error;doc=await lib.PDFDocument.create();flatten=true;}}
      else{doc=await lib.PDFDocument.create();doc.addPage([595,842]);}
      for(let n=1;n<=current.count;n++){
        if(current!==record||owner!==scope)return;
        const original=pdf?await pdf.getPage(n):null,vp=original?.getViewport({scale:1})||{width:595,height:842,convertToPdfPoint:(x,y)=>[x,842-y]};
        if(flatten){
          status(`Preparing written PDF · page ${n} of ${current.count}…`);
          const output=document.createElement('canvas'),scale=Math.min(1.5,Math.sqrt(8000000/(vp.width*vp.height)));output.width=Math.round(vp.width*scale);output.height=Math.round(vp.height*scale);
          const ctx=output.getContext('2d');await original.render({canvasContext:ctx,viewport:original.getViewport({scale})}).promise;
          for(const s of current.pages[n]?.strokes||[])ink.draw(ctx,s,output.width,output.height);
          const image=await doc.embedPng(output.toDataURL('image/png'));doc.addPage([vp.width,vp.height]).drawImage(image,{x:0,y:0,width:vp.width,height:vp.height});output.width=output.height=1;continue;
        }
        const target=doc.getPage(n-1);
        if(current.kind==='board'&&current.grid==='grid')for(let x=20;x<842;x+=20){if(x<595)target.drawLine({start:{x,y:0},end:{x,y:842},thickness:.5,color:lib.rgb(.86,.89,.92)});target.drawLine({start:{x:0,y:x},end:{x:595,y:x},thickness:.5,color:lib.rgb(.86,.89,.92)});}
        for(const s of current.pages[n]?.strokes||[]){const points=s.points.map(p=>vp.convertToPdfPoint(p[0]*vp.width,p[1]*vp.height)),rgb=s.color.match(/[a-f0-9]{2}/gi).map(x=>parseInt(x,16)/255),width=s.width*(s.tool==='highlight'?6:1)*vp.width/595,opacity=s.tool==='highlight'?.28:1;
          if(points.length===1)target.drawCircle({x:points[0][0],y:points[0][1],size:width/2,color:lib.rgb(...rgb),opacity});
          else target.drawSvgPath(points.map((p,i)=>`${i?'L':'M'}${p[0]} ${-p[1]}`).join(' '),{x:0,y:0,borderColor:lib.rgb(...rgb),borderWidth:width,borderOpacity:opacity,borderLineCap:lib.LineCapStyle.Round});
        }
      }
      const bytes=await doc.save();if(current===record&&owner===scope){download(new Blob([bytes],{type:'application/pdf'}),'-written.pdf');status('Written PDF downloaded.'+(flatten?' This is a flattened page-image copy.':'')+' Typed notes are included in the ink backup.');}
    }catch(error){if(current===record)status(error.message||'Could not export this PDF. Save a page image and ink backup instead.');}finally{if(current===record){busy=false;controls();}}
  });
  window.addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>{finishStroke();render();},150);});let resizeTimer;
  window.addEventListener('revision-account-change',event=>{
    const next=event.detail?.uid||'guest';if(next===scope)return;
    finishStroke();clearTimeout(timer);if(record&&dirty){drafts.set(scope,record);save().catch(()=>{});}loading++;rendering++;renderTask?.cancel();renderTask=null;dispose(pdf);pdf=null;record=null;dirty=false;blocked=false;busy=false;scope=next;
    $('practice-editor').hidden=true;sourceLinks(null);$('practice-title').textContent='Paper practice & whiteboard';status('Account changed. Choose saved practice for this account.');saveStatus('Drawings stay separate on this device.');controls();savedList();
    const held=drafts.get(scope);if(held){drafts.delete(scope);status('An unsaved draft from this session is being recovered.');(async()=>{const doc=held.kind==='pdf'?await decode(held.bytes):null;if(held.scope!==scope){dispose(doc);return;}await activate(held,doc);changed();})().catch(()=>status('Could not recover this session’s draft.'));
    }
  });
  window.addEventListener('beforeunload',event=>{if(dirty||saveTask||drafts.size){event.preventDefault();event.returnValue='';}});
  window.RevisionPractice={openPaper,whiteboard,resize:()=>render()};savedList();controls();
})();
