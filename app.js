'use strict';
(()=>{
const $=id=>document.getElementById(id),NS='http://www.w3.org/2000/svg';
const overview=document.body?.hasAttribute('data-overview')??false;
const LESSONS=window.GEOMETRY_LESSONS.filter(p=>(p.chapter==='page1')===overview);
const CHAPTERS=[['cross','兩直線相交'],['perp','兩直線垂直'],['parallel','平行線的判定']];
let lesson=LESSONS[0],step=0,showSolution=overview,timer=null,frames=[],previousStep=-1;
const last=()=>frames.length-1;
const plain=s=>s.replace(/<span class="frac"[\s\S]*?<\/span><\/span>/g,'二分之一').replace(/<[^>]*>/g,' ').replace(/\s+/g,' ').trim();
function svg(tag,attrs,text){const n=document.createElementNS(NS,tag);for(const [k,v] of Object.entries(attrs))n.setAttribute(k,v);if(text!==undefined)n.textContent=text;return n;}
function xy(center,a,r){const t=a*Math.PI/180;return[center[0]+r*Math.cos(t),center[1]-r*Math.sin(t)];}
function arcEnd(g,r){return `A ${r} ${r} 0 ${Math.abs(g.b-g.a)>180?1:0} ${g.b>g.a?0:1} ${xy(g.center,g.b,r)}`;}
function arc(g,r){return `M ${xy(g.center,g.a,r)} ${arcEnd(g,r)}`;}
function geometry(a){
 const p=lesson.diagram.points;
 if(a.vertex)return{center:p[a.vertex],a:a.a,b:a.b};
 const [u,o,v]=a.ends.split(''),c=p[o];
 const direction=x=>Math.atan2(c[1]-p[x][1],p[x][0]-c[0])*180/Math.PI;
 const start=direction(u),end=direction(v),delta=((end-start+540)%360)-180;
 return{center:c,a:start,b:start+(Math.abs(delta+180)<.001?180:delta)};
}
function segment(name){const d=lesson.diagram,found=d.segments.find(s=>s[0]===name),value=found?found[1]:name;return typeof value==='string'?[d.points[value[0]],d.points[value[1]]]:value;}
function line(name,cls){const [a,b]=segment(name);$('rays').append(svg('path',{d:`M ${a} L ${b}`,class:cls}));}
function rightMark(a){const g=geometry(a),p=xy(g.center,g.a,21),q=xy(g.center,g.b,21),m=[p[0]+q[0]-g.center[0],p[1]+q[1]-g.center[1]];$('arcs').append(svg('path',{d:`M ${p} L ${m} L ${q}`,class:'right-mark','data-right':a.name}));}
function equalTick(a,count){const g=geometry(a),mid=(g.a+g.b)/2;for(let i=0;i<count;i++){const angle=mid+(i-(count-1)/2)*8,p=xy(g.center,angle,a.r-6),q=xy(g.center,angle,a.r+6);$('arcs').append(svg('path',{d:`M ${p} L ${q}`,class:'tick','data-equal-angle':a.name,'data-equal-count':count}));}}
function arrow(name,count,red){
 let [a,b]=segment(name);if(b[0]<a[0]||(Math.abs(b[0]-a[0])<.01&&b[1]>a[1]))[a,b]=[b,a];
 const dx=b[0]-a[0],dy=b[1]-a[1],length=Math.hypot(dx,dy),u=[dx/length,dy/length],n=[-u[1],u[0]],mid=[(a[0]+b[0])/2,(a[1]+b[1])/2];
 for(let i=0;i<count;i++){const c=[mid[0]+u[0]*(i-(count-1)/2)*14,mid[1]+u[1]*(i-(count-1)/2)*14],p=[c[0]-u[0]*6+n[0]*6,c[1]-u[1]*6+n[1]*6],q=[c[0]-u[0]*6-n[0]*6,c[1]-u[1]*6-n[1]*6];$('arcs').append(svg('path',{d:`M ${p} L ${c} L ${q}`,class:'parallel-mark'+(red?' red':''),'data-parallel':name}));}
}
function connectedGroups(groups){const edges=new Map();for(const group of groups)for(const a of group){if(!edges.has(a))edges.set(a,new Set());for(const b of group)edges.get(a).add(b);}const result=[],seen=new Set();for(const a of edges.keys())if(!seen.has(a)){const group=[],todo=[a];while(todo.length){const b=todo.pop();if(seen.has(b))continue;seen.add(b);group.push(b);for(const c of edges.get(b)||[])todo.push(c);}result.push(group);}return result;}
function lessonFrames(item,opening){
 const items=opening.map(kind=>({kind,row:0}));
 item.rows.slice(1).forEach((r,i)=>{
  items.push({kind:'relation',row:i+1});
  if(r.calc)items.push({kind:'calculation',row:i+1});
 });
 if(!item.concept)items.push({kind:'answer',row:item.rows.length-1});
 return items;
}
function rowState(){
 const visible=new Set(step>0?[0]:[]),calculated=new Set(),revealed=new Set(lesson.diagram.known||[]),pairs=[],right=new Set(lesson.diagram.right||[]);
 for(const frame of frames.slice(0,step+1)){
  if((frame.lesson&&frame.lesson!==lesson)||!['relation','calculation'].includes(frame.kind))continue;
  visible.add(frame.row);const r=lesson.rows[frame.row];if(frame.kind==='calculation'||!r.calc){calculated.add(frame.row);for(const a of r.reveal)revealed.add(a);}if(frame.kind==='relation'){for(const p of r.pairs)pairs.push({names:p,kind:r.relation||'parallel'});for(const a of r.right||[])right.add(a);}
 }
 return{visible,calculated,revealed,pairs,right};
}
function angle(a,state,focus,goal,final){
 const g=geometry(a),known=(lesson.diagram.known||[]).includes(a.name),isValue=a.value!=='';
 const active=focus.has(a.name),css=`angle ${known?'known-arc ':''}${goal?'target-angle ':''}${final?'final-angle ':''}${active?'focused ':''}${step!==previousStep&&active?'enter':''}`;
 if(active||goal||final)$('shades').append(svg('path',{d:`M ${g.center} L ${xy(g.center,g.a,a.r)} A ${a.r} ${a.r} 0 ${Math.abs(g.b-g.a)>180?1:0} ${g.b>g.a?0:1} ${xy(g.center,g.b,a.r)} Z`,class:'sector'+(final?' final':''),'data-angle':a.name}));
 $('arcs').append(svg('path',{d:arc(g,a.r),class:css,pathLength:1,'data-angle-name':a.name}));
 const mid=a.labelAngle??((g.a+g.b)/2);
 let label=goal?'?':known?a.value:isValue?(showSolution&&state.revealed.has(a.name)?a.value:'?'):'';
 if(!known&&!goal&&(['known','goal'].includes(frames[step].kind)||(!active&&!state.revealed.has(a.name))))label='';
 if(goal){const p=xy(g.center,mid,a.nameR??a.r+105);$('arcs').append(svg('text',{x:p[0]+(a.nameDX||0),y:p[1]+7+(a.nameDY||0),class:'angle-label goal-name'},'∠'+a.name));}
 if(label){const p=xy(g.center,mid,a.labelR??a.r+28);$('arcs').append(svg('text',{x:p[0]+(a.labelDX||0),y:p[1]+8+(a.labelDY||0),class:`angle-label ${known?'known-label ':''}${goal?'goal-label ':''}${final?'final-label':''}`,'data-value-for':a.name},label));}
}
function initDiagram(){
 for(const id of ['axes','labels'])$(id).replaceChildren();const d=lesson.diagram;
 if(lesson.concept){
  $('figure-title').textContent=lesson.title;
  return;
 }
 for(const [name] of d.segments){const [a,b]=segment(name);$('axes').append(svg('path',{d:`M ${a} L ${b}`,class:'axis'}));}
 for(const [name,p] of Object.entries(d.points)){$('labels').append(svg('circle',{cx:p[0],cy:p[1],r:2.7,class:'point'}));const label=d.labels[name]||[p[0]+13,p[1]-13];$('labels').append(svg('text',{x:label[0],y:label[1],class:'letter'},name));}
 $('figure-title').textContent=lesson.title||CHAPTERS.find(c=>c[0]===lesson.chapter)[1]+'，第 '+lesson.number+' 題';
}
function drawSymbols(original=false){for(const n of lesson.diagram.symbols||[]){const a=lesson.diagram.angles.find(a=>a.name===n),g=geometry(a),p=xy(g.center,(g.a+g.b)/2,a.r*.62);if(original)$('arcs').append(svg('path',{d:arc(g,a.r),class:'axis','data-original-angle':n}));$('arcs').append(svg('text',{x:p[0],y:p[1]+5,class:'angle-symbol'},a.symbol));}}
function drawMovingLines(motion,animate){
 const pivot=[320,195],fixedY=290,tilt=32;
 const crossing=motion==='intersect';
 const rotation=crossing?tilt:0;
 const moving=svg('g',{transform:`rotate(${rotation} ${pivot.join(' ')})`,'data-moving-line':''});
 $('rays').append(
  svg('path',{d:`M 55 ${fixedY} H 585`,class:'axis'}),
  moving
 );
 moving.append(svg('path',{d:`M 55 ${pivot[1]} H 585`,class:'concept-ray blue'}));
 if(animate){
  const from=crossing?0:tilt;
  const turn=svg('animateTransform',{
   attributeName:'transform',type:'rotate',begin:'indefinite',
   from:`${from} ${pivot.join(' ')}`,to:`${rotation} ${pivot.join(' ')}`,
   dur:'1.05s',fill:'freeze',calcMode:'spline',keySplines:'.4 0 .2 1'
  });
  moving.append(turn);
  if(turn.beginElement){
   moving.setAttribute('transform',`rotate(${from} ${pivot.join(' ')})`);
   turn.beginElement();
  }
 }
 if(crossing){
  const intersectionX=pivot[0]+(fixedY-pivot[1])/Math.tan(tilt*Math.PI/180);
  const mark=svg('g',{class:animate?'concept-reveal intersection-reveal':''});
  $('arcs').append(mark);
  mark.append(
   svg('circle',{cx:intersectionX,cy:fixedY,r:6,class:'concept-intersection'}),
   svg('text',{x:intersectionX-9,y:fixedY+34,class:'letter'},'O')
  );
 }
 if(motion!=='original'){
  $('arcs').append(svg('text',{x:320,y:409,class:animate?'concept-term concept-reveal intersection-reveal':'concept-term'},crossing?'相交':'平行'));
 }
}
function drawExtendingAngles(motion,animate,term){
 const {points,labels,angles}=lesson.diagram;
 const center=points.O;
 const sharesEdge=motion==='common'||motion==='adjacent';
 const sharesVertex=motion==='vertex'||motion==='vertical';
 const extensions={adjacent:['D'],vertical:['B','D']}[motion]||[];
 const addedAngles={adjacent:['2'],vertical:['3']}[motion]||[];
 const rays=$('rays'),marks=$('arcs');
 for(const endpoint of ['A','C',...extensions]){
  const extended=extensions.includes(endpoint);
  let color='';
  if(sharesEdge&&endpoint==='A'||motion==='vertical'&&['A','B'].includes(endpoint))color='amber';
  if((motion==='adjacent'||motion==='vertical')&&['C','D'].includes(endpoint))color='blue';
  const drawing=animate&&extended;
  rays.append(svg('path',{d:`M ${center} L ${points[endpoint]}`,pathLength:1,
   class:`concept-ray ${color}${drawing?' concept-grow':''}`,'data-concept-ray':endpoint}));
  marks.append(svg('text',{x:labels[endpoint][0],y:labels[endpoint][1],
   class:`letter${drawing?' concept-reveal':''}`},endpoint));
 }
 marks.append(svg('circle',{cx:center[0],cy:center[1],r:sharesVertex?6:4,class:sharesVertex?'concept-intersection':'point'}),
  svg('text',{x:center[0],y:center[1]+26,class:'letter'},'O'));
 if(sharesEdge)marks.append(svg('text',{x:208,y:369,class:'concept-cue'},'公共邊'));
 if(motion==='vertex')marks.append(svg('text',{x:346,y:285,class:'concept-cue vertex-cue'},'公共頂點'));
 for(const a of angles.filter(a=>a.name==='1'||addedAngles.includes(a.name))){
  const g=geometry(a),r=82;
  const [x,y]=xy(center,(g.a+g.b)/2,54);
  const tone=a.name==='2'||a.name==='4'?'amber':'blue';
  const result=svg('g',{class:animate&&a.name!=='1'?'concept-reveal':'','data-concept-angle':a.name});
  marks.append(result);
  result.append(
   svg('path',{d:`M ${center} L ${xy(center,g.a,r)} ${arcEnd(g,r)} Z`,class:`concept-sector ${tone}`}),
   svg('path',{d:arc(g,r),class:`concept-ray ${tone}`}),
   svg('text',{x,y:y+7,class:'concept-angle-number'},a.symbol)
  );
 }
 if(term)marks.append(svg('text',{x:320,y:409,class:'concept-term'},term));
}
function draw(state){
 for(const id of ['shades','rays','arcs'])$(id).replaceChildren();
 const f=frames[step],final=f.kind==='answer',goal=f.kind==='goal',r=lesson.rows[f.row];
 if(lesson.concept){
  const motion=f.kind==='relation'?r.motion:'original';
  const animate=Boolean(r.motion&&r.animate!==false&&f.kind==='relation'&&step!==previousStep&&!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches);
  if(lesson.concept==='lines')drawMovingLines(motion,animate);
  else drawExtendingAngles(motion,animate,r.term);
  return;
 }
 if(f.kind==='diagram'){drawSymbols(true);return;}
 const givens=[...(lesson.diagram.known||[]),...(lesson.diagram.right||[]),...(lesson.diagram.equal||[]).flat()];
 const answerAngles=lesson.answerFocus||lesson.goals;
 const focus=new Set(f.kind==='known'?givens:goal?[...lesson.goals,...(lesson.goalFocus||[])]:final?answerAngles:r.focus),visible=new Set([...givens,...state.revealed,...focus,...(lesson.diagram.symbols||[])]);
 if(goal)for(const p of lesson.goalPairs||[])for(const n of p)line(n,'highlight-ray target-line');
 const proven=new Map(),goalLines=new Set((lesson.goalPairs||[]).flat());
 for(const p of state.pairs){for(const n of p.names)line(n,final&&goalLines.has(n)?'highlight-ray final-ray':'highlight-ray proved-ray');if(p.kind==='parallel')for(const n of p.names){if(!proven.has(n))proven.set(n,new Set());for(const m of p.names)proven.get(n).add(m);}}
 if(final)for(const p of lesson.goalPairs||[])for(const n of p)line(n,'highlight-ray final-ray');
 if(final)for(const n of lesson.answerLines||[])line(n,'highlight-ray final-ray');
 if(f.kind==='relation')for(const n of r.lines||[])line(n,'highlight-ray proved-ray');
 const groups=[],visited=new Set();for(const name of proven.keys())if(!visited.has(name)){const group=[],todo=[name];while(todo.length){const n=todo.pop();if(visited.has(n))continue;visited.add(n);group.push(n);for(const q of proven.get(n)||[])todo.push(q);}groups.push(group);}groups.forEach((group,i)=>group.forEach(n=>arrow(n,Math.min(i+1,2),final&&goalLines.has(n))));
 for(const a of lesson.diagram.angles)if(visible.has(a.name))angle(a,state,focus,goal&&lesson.goals.includes(a.name),final&&answerAngles.includes(a.name));
 for(const [index,group] of connectedGroups(lesson.diagram.equal||[]).entries()){const shown=group.map(n=>lesson.diagram.angles.find(a=>a.name===n)).filter(a=>a&&visible.has(a.name));if(shown.length>1)for(const a of shown)equalTick(a,index+1);}
 for(const n of state.right){const a=lesson.diagram.angles.find(a=>a.name===n);if(a)rightMark(a);}
 drawSymbols();
}
function pause(){if(timer!==null)clearTimeout(timer);timer=null;$('play').textContent=step===last()?'重新播放':'自動播放';$('play').setAttribute('aria-pressed','false');}
function keepEquality(s){return s.replace(/=\s*(\d+(?:°(?:\d+′)?)?)/g,'<span class="numeric-equality">= $1</span>');}
function formula(row,calculated){const extra=calculated?row.calc:'',at=row.math.indexOf(' = ');if(at<0||row.reason==='已知'||row.reason==='設數'||row.math.includes('<br>'))return `<div class="formula">${keepEquality(row.math)}${keepEquality(extra)}</div>`;const lhs=row.math.slice(0,at),rhs=row.math.slice(at).trim();return `<div class="formula equation ${plain(lhs).length>7?'long-lhs':''}"><span class="eq-lhs">${lhs}</span><span class="eq-rhs">${keepEquality(rhs)}${keepEquality(extra)}</span></div>`;}
function render(){
 if(overview&&lesson!==frames[step].lesson){lesson=frames[step].lesson;initDiagram();}
 const f=frames[step],r=lesson.rows[f.row],state=rowState(),raw=f.kind==='diagram',goal=f.kind==='goal',final=f.kind==='answer';
 if(overview){
  const caption=f.kind==='intro'?lesson.task:final?plain(lesson.answer):f.kind==='relation'&&r.calc?r.idea:plain(r.math+(f.kind==='calculation'?r.calc:''));
  $('overview-title').textContent=lesson.title;
  $('thought').hidden=Boolean(lesson.concept);
  paintFrame(caption,state);
  return;
 }
 const idea=raw?'原圖。':f.kind==='known'?plain(lesson.rows[0].math):goal?lesson.task:final?(lesson.recap||(lesson.goals.length?'回看所求的角。':'回看所證明的直線關係。')):r.idea;
 const spoken=raw?idea:showSolution&&!goal&&!final?plain(r.math+(state.calculated.has(f.row)?r.calc:'')):showSolution&&final?plain(lesson.answer):idea;
 $('solution').hidden=!showSolution||raw;$('show-solution').checked=showSolution;$('demo').setAttribute('data-solution',String(showSolution&&!raw));$('thought').hidden=showSolution&&!goal&&!raw;$('thought').textContent=raw?'':idea;
 $('proof').innerHTML=showSolution?lesson.rows.map((row,i)=>!state.visible.has(i)?'':`<div class="row ${i===f.row&&!final?'active':''}" role="button" tabindex="0" data-to="${i===0?0:frames.findIndex(x=>x.row===i)}" aria-label="查看第 ${i+1} 步：${row.reason}"><div class="cell"><span class="num">${i+1}.</span>${formula(row,state.calculated.has(i))}</div><div class="cell"><span class="num">${i+1}.</span><div>${row.reason}${row.seal?`<p class="proof-seal">${row.seal}</p>`:''}</div></div></div>`).join(''):'';
 if(showSolution&&step!==previousStep&&!final){const row=$('proof').children[$('proof').children.length-1];if(row)row.classList.add('new');}
 $('answer').hidden=!showSolution||!final;$('answer').innerHTML=showSolution&&final?`<span>${lesson.answer}</span>`:'';
 paintFrame(spoken,state);
}
function paintFrame(spoken,state){
 if(overview)$('thought').textContent=spoken;
 $('range').max=last();$('range').value=step;$('range').setAttribute('aria-valuetext',spoken);$('count').textContent=`${step} / ${last()}`;$('prev').disabled=step===0;$('next').disabled=step===last();$('reset').disabled=step===0&&timer===null;
 $('announce').textContent=spoken;$('figure-desc').textContent=spoken;if(timer===null)$('play').textContent=step===last()?'重新播放':'自動播放';draw(state);previousStep=step;
}
function go(n){pause();step=Math.max(0,Math.min(last(),n));render();}
function advance(){if(step>=last()){pause();render();return;}step++;render();if(step===last()){pause();render();return;}timer=setTimeout(advance,3000);}
function navigation(){
 $('questions').innerHTML=CHAPTERS.map(([id,name])=>{
  const buttons=LESSONS.filter(p=>p.chapter===id).map(p=>
   `<button type="button" data-lesson="${p.id}"${lesson.id===p.id?' aria-current="true"':''}>第 ${p.number} 題</button>`
  ).join('');
  return `<section aria-labelledby="chapter-${id}"><h2 id="chapter-${id}">${name}</h2><div class="question-grid">${buttons}</div></section>`;
 }).join('');
}
function setQuestionMenu(open,restoreFocus=false){
 $('questions').hidden=!open;
 const toggle=$('question-toggle');
 toggle.setAttribute('aria-expanded',String(open));
 if(restoreFocus)toggle.focus();
}
function select(id,n=0,update=true){
 const selected=LESSONS.find(p=>p.id===id);if(!selected)return;pause();lesson=selected;showSolution=false;previousStep=-1;frames=lessonFrames(lesson,['diagram','known','goal']);step=Math.max(0,Math.min(last(),n));navigation();
 $('problem').innerHTML=`<p>${lesson.number}. 已知：${lesson.statement}</p><p>${lesson.task}</p>`;
 $('problem').setAttribute('aria-label',CHAPTERS.find(c=>c[0]===lesson.chapter)[1]+'第 '+lesson.number+' 題');
 initDiagram();render();if(update)history.replaceState(null,'','#'+lesson.id);
}
 $('next').onclick=()=>go(step+1);$('prev').onclick=()=>go(step-1);$('reset').onclick=()=>go(0);$('range').oninput=e=>go(Number(e.target.value));
 $('play').onclick=()=>{if(timer!==null){pause();render();return;}if(step===last()){step=0;render();}$('play').textContent='暫停';$('play').setAttribute('aria-pressed','true');timer=setTimeout(advance,1800);$('reset').disabled=false;};
 document.addEventListener('keydown',e=>{
  if(e.target.matches?.('input,button,[role="button"]'))return;
  if(e.key==='ArrowRight'){e.preventDefault();go(step+1);}
  if(e.key==='ArrowLeft'){e.preventDefault();go(step-1);}
 });
 document.addEventListener('visibilitychange',()=>{if(document.hidden){pause();render();}});
 if(overview){
  const conceptsButton=$('overview-concepts'),exercisesButton=$('overview-exercises');
  function selectOverview(concepts){
   pause();
   frames=LESSONS.filter(item=>Boolean(item.concept)===concepts)
    .flatMap(item=>lessonFrames(item,['intro']).map(frame=>({...frame,lesson:item})));
   lesson=frames[0].lesson;
   step=0;
   previousStep=-1;
   conceptsButton.setAttribute('aria-pressed',String(concepts));
   exercisesButton.setAttribute('aria-pressed',String(!concepts));
   initDiagram();
   render();
  }
  conceptsButton.onclick=()=>selectOverview(true);
  exercisesButton.onclick=()=>selectOverview(false);
  selectOverview(true);
  return;
 }
 $('show-solution').onchange=e=>{pause();showSolution=e.target.checked;render();};
 $('question-toggle').addEventListener('click',()=>setQuestionMenu($('questions').hidden));
 $('questions').addEventListener('click',e=>{
  const button=e.target.closest('[data-lesson]');
  if(!button)return;
  setQuestionMenu(false,true);
  select(button.dataset.lesson);
 });
 document.addEventListener('click',e=>{
  if(!$('questions').hidden&&!$('question-picker').contains(e.target))setQuestionMenu(false);
 });
 document.addEventListener('keydown',e=>{
  if(e.key==='Escape'&&!$('questions').hidden){
   e.preventDefault();
   setQuestionMenu(false,true);
   return;
  }
 });
 $('proof').addEventListener('click',e=>{const row=e.target.closest('[data-to]');if(row)go(Number(row.dataset.to));});$('proof').addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){const row=e.target.closest('[data-to]');if(row){e.preventDefault();go(Number(row.dataset.to));}}});
 function fromHash(){
  const match=location.hash.match(/^#((?:cross|perp|parallel)-\d+)(?:\/(\d+))?$/);
  select(match?match[1]:LESSONS[0].id,match?Number(match[2]||0):0,false);
 }
 window.addEventListener('hashchange',fromHash);fromHash();
})();
