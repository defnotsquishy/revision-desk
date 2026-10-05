// Important-text highlighting is plain text plus ranges, never saved HTML.
(() => {
  'use strict';
  const storage=window.RevisionMakerStorage;
  if(!storage)return;
  function checked(content,ranges){
    if(typeof content!=='string'||content.length>storage.limits.answer)throw Object.assign(Error('This card text is invalid.'),{code:'maker-validation'});
    return storage.validateHighlights(ranges,content);
  }
  function addHighlight(content,ranges,start,end){
    const current=checked(content,ranges),selection=checked(content,[[start,end]])[0];
    const ordered=[...current,selection].sort((a,b)=>a[0]-b[0]),merged=[];
    for(const range of ordered){
      const previous=merged[merged.length-1];
      if(previous&&range[0]<=previous[1])previous[1]=Math.max(previous[1],range[1]);else merged.push([...range]);
    }
    return checked(content,merged);
  }
  // Text edits deliberately clear this field's marks: stale offsets must not
  // silently mark a different fact. Other fields and stable card IDs are intact.
  function editHighlights(before,after,ranges){return before===after?checked(after,ranges):[];}
  function segments(content,ranges){
    const result=[];let position=0;
    for(const [start,end] of checked(content,ranges)){
      if(start>position)result.push({text:content.slice(position,start),highlighted:false});
      result.push({text:content.slice(start,end),highlighted:true});position=end;
    }
    if(position<content.length)result.push({text:content.slice(position),highlighted:false});
    return result;
  }
  function render(target,content,ranges){
    const chunks=segments(content,ranges),doc=target.ownerDocument||document;
    const nodes=chunks.map(chunk=>{
      if(!chunk.highlighted)return doc.createTextNode(chunk.text);
      const mark=doc.createElement('mark');mark.className='maker-highlight';mark.append(doc.createTextNode(chunk.text));return mark;
    });
    target.replaceChildren(...nodes);
  }
  window.RevisionMakerRichText=Object.freeze({addHighlight,editHighlights,segments,render});
})();
