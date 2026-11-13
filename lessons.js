'use strict';
window.GEOMETRY_LESSONS=(()=>{
const H='<span class="frac" role="math" aria-label="二分之一"><span>1</span><span>2</span></span>';
const E=s=>`<span class="continuation">${s}</span>`;
const R=(math,reason,idea,focus=[],calc='',reveal=[],pairs=[],extra={})=>({math,reason,idea,focus,calc,reveal,pairs,...extra});
const K=s=>R(`<span class="known">${s}</span>`,'已知','先看題目給出的條件。');
const A=(name,ends,value='',r=70,extra={})=>({name,ends,value,r,...extra});
function radial(directions,angles,extra={}){
 const center=extra.center||[320,245],radius=extra.radius||205;
 const points={O:center},labels={O:extra.originLabel||[center[0]+3,center[1]+28]};
 for(const [key,a] of Object.entries(directions)){
  const t=a*Math.PI/180,rr=extra.lengths?.[key]||radius,lr=rr+24;
  points[key]=[center[0]+rr*Math.cos(t),center[1]-rr*Math.sin(t)];
  labels[key]=[center[0]+lr*Math.cos(t),center[1]-lr*Math.sin(t)+7];
  if(a===0||a===180)labels[key][1]-=10;
 }
 return {points,labels,segments:Object.keys(directions).map(k=>[k,'O'+k]),angles,...extra};
}
const cross1=radial({A:180,B:0,C:211,D:31,E:149},[
 A('EOD','EOD','118°',162,{labelR:189}),A('EOC','EOC','62°',134,{labelAngle:180,labelR:169}),
 A('EOA','EOA','31°',84,{labelAngle:164,labelR:119,nameR:205}),A('AOC','AOC','31°',84,{labelAngle:196,labelR:119,nameR:205}),
 A('BOC','BOC','149°',119,{labelAngle:-71,labelR:154,nameR:213}),A('BOD','BOD','31°',84,{labelR:124,nameR:205})
],{center:[320,267],radius:255,lengths:{E:235},known:['EOD'],equal:[['EOA','AOC']]});
const cross2=radial({A:132.5,B:312.5,C:180,D:0,E:47.5,F:227.5},[
 A('AOE','AOE','85°',145,{labelAngle:90,labelR:172}),A('AOF','AOF','95°',128,{labelAngle:180,labelR:157}),
 A('AOC','AOC','47°30′',59,{labelR:92}),A('COF','COF','47°30′',59,{labelR:94,nameR:170}),
 A('BOE','BOE','95°',95,{labelAngle:0,labelR:127,nameR:205,nameDY:38}),A('DOF','DOF','132°30′',145,{labelAngle:-66.25,labelR:177,nameR:222})
],{known:['AOE'],equal:[['AOC','COF']],originLabel:[320,284]});
const cross3=radial({A:136,B:102,C:68,D:34,E:0},[
 A('AOE','AOE','136°',215,{labelR:242,labelAngle:55}),A('AOC','AOC','68°',120),A('COE','COE','68°',120),
 A('AOB','AOB','34°',65,{labelR:94,nameR:153}),A('BOC','BOC','34°',65),A('COD','COD','34°',65),A('DOE','DOE','34°',65),
 A('BOD','BOD','68°',120,{labelR:149,nameR:197}),A('AOD','AOD','102°',175,{labelAngle:88,labelR:204,nameR:259})
],{center:[320,357],radius:205,known:['AOE'],equal:[['AOC','COE'],['AOB','BOC','COD','DOE']]});
const cross4=radial({A:180,B:0,C:160,D:340,E:20},[
 A('BOD','BOD','20°',70),A('AOD','AOD','160°',110,{labelAngle:-96}),A('BOE','BOE','20°',70),
 A('EOD','EOD','40°',125,{labelAngle:0,labelR:158}),A('COE','COE','140°',120,{labelAngle:90,labelR:153,nameR:205})
],{center:[320,270],known:[],equal:[['BOE','BOD']],originLabel:[306,300]});
const cross5=radial({A:180,B:132,C:0,D:156,E:88},[
 A('DOE','DOE','68°',171,{labelR:199}),A('BOE','BOE','44°',85),A('EOC','EOC','88°',124,{labelR:154,nameR:210}),
 A('BOC','BOC','132°',142,{labelAngle:58,labelR:194}),A('AOB','AOB','48°',125),A('BOD','BOD','24°',68),A('AOD','AOD','24°',68)
],{center:[320,347],known:['DOE'],equal:[['AOD','BOD']]});
const perp1=radial({A:180,B:0,C:145,D:325,E:270},[
 A('AOC','AOC','35°',76),A('DOE','DOE','55°',134,{labelR:166}),A('BOD','BOD','35°',76),A('BOE','BOE','90°',90,{labelR:119})
],{center:[320,235],known:['AOC','DOE'],originLabel:[302,266]});
const perp2=radial({A:180,B:0,C:134,D:314,M:270},[
 A('MOD','MOD','44°',136,{labelR:165}),A('BOM','BOM','90°',85),A('AOM','AOM','90°',85),
 A('BOD','BOD','46°',80),A('COA','COA','46°',80,{labelR:113,nameR:185}),A('AOD','AOD','134°',125,{labelAngle:247,labelR:157,nameR:220})
],{center:[320,235],known:['MOD'],right:['BOM','AOM'],originLabel:[302,266]});
const perp3=radial({A:180,B:0,C:216,D:36,E:18,F:288},[
 A('BOD','BOD','36°',110),A('BOC','BOC','144°',125,{labelAngle:-47}),A('BOE','BOE','18°',75),A('BOF','BOF','72°',70),
 A('1','DOE','18°',126,{symbol:'1'}),A('2','COF','72°',97,{symbol:'2'}),
 A('EOF','EOF','90°',165,{labelAngle:-27}),A('AOF','AOF','108°',135,{labelAngle:234,labelR:165,nameR:229})
],{center:[320,235],known:[],equal:[['BOE','1'],['BOF','2']],symbols:['1','2'],originLabel:[310,279]});
const parallel1={points:{A:[232,157],B:[110,370],C:[355,370],D:[553,370],E:[455,197]},labels:{A:[232,133],B:[91,391],C:[355,397],D:[569,378],E:[469,187]},segments:[['AB','AB'],['BC','BD'],['AC','AC'],['EC','CE']],angles:[A('ACE','ACE','',43),A('ECD','ECD','',68),A('ABC','ABC','',52)],known:['ACE','ABC'],equal:[['ACE','ABC'],['ACE','ECD']]};
const tan53=Math.tan(53*Math.PI/180),dy53=90*tan53;
const parallel2={points:{A:[260,270-110*tan53],B:[150,270],C:[420,270],D:[330,270+dy53],E:[540,270+dy53]},labels:{A:[265,270-110*tan53-17],B:[150,300],C:[420,300],D:[318,297+dy53],E:[552,297+dy53]},segments:[['AB',[[80,270+70*tan53],[260,270-110*tan53]]],['BC',[[65,270],[560,270]]],['CD',[[330,270+dy53],[505,270-85*tan53]]],['DE','DE']],angles:[A('1',null,'127°',65,{vertex:'B',a:53,b:180,labelR:92,symbol:'1'}),A('ABC','ABC','53°',45),A('2',null,'53°',46,{vertex:'C',a:0,b:53,labelR:73,symbol:'2'}),A('CDE','CDE','53°',48,{labelR:77})],known:['1','2','CDE'],symbols:['1','2']};
const parallel3={points:{A:[120,380],B:[520,380],C:[320,255],D:[472,160],E:[168,160],F:[525,255]},labels:{A:[105,400],B:[534,400],C:[309,284],D:[486,149],E:[154,149],F:[540,263]},segments:[['AB','AB'],['ED','ED'],['AD','AD'],['EB','EB'],['CF','CF']],angles:[A('BAC','BAC','',55),A('CDE','CDE','',55),A('ABC','ABC','',55),A('FCB','FCB','',60)],known:['BAC','CDE','ABC','FCB'],equal:[['BAC','CDE'],['ABC','FCB']]};
const cx4=530-230*Math.tan(10*Math.PI/180),fx4=530-120*Math.tan(10*Math.PI/180);
const parallel4={points:{A:[110,390],B:[530,390],C:[cx4,160],D:[180,160],E:[110+70*120/230,270],F:[fx4,270]},labels:{A:[94,415],B:[544,415],C:[cx4+13,145],D:[166,145],E:[122,278],F:[fx4+23,278]},segments:[['AB','AB'],['CD','CD'],['AD','AD'],['BC','BC'],['AC','AC'],['EF','EF']],angles:[A('DCA','DCA','',43),A('CAB','CAB','',55),A('EFB','EFB','100°',45,{labelR:86,labelAngle:200}),A('ABF','ABF','80°',62,{labelR:92,labelAngle:145})],known:['DCA','CAB','EFB','ABF'],equal:[['DCA','CAB']]};
const parallel5={points:{A:[135,400],B:[240,400],C:[515,400],F:[135,145],E:[240,175.4],D:[515,255]},labels:{A:[120,423],B:[240,427],C:[530,422],F:[124,131],E:[240,155],D:[532,253]},segments:[['AC','AC'],['AF','AF'],['EB','EB'],['CD','CD'],['FD','FD']],angles:[A('FAC','FAC','90°',33),A('EBC','EBC','90°',33),A('BED','BED','',52),A('EDC','EDC','',52)],known:['BED','EDC'],right:['FAC','EBC']};
const fy6=180+185*Math.tan(38*Math.PI/180),gx6=235+115*Math.cos(128*Math.PI/180),gy6=fy6-115*Math.sin(128*Math.PI/180);
const parallel6={points:{A:[150,180],B:[555,180],E:[420,180],C:[80,fy6],D:[550,fy6],F:[235,fy6],G:[gx6,gy6]},labels:{A:[135,187],B:[571,187],E:[410,156],C:[65,fy6+8],D:[565,fy6+8],F:[241,fy6+29],G:[gx6-17,gy6-7]},segments:[['AB','AB'],['CD','CD'],['EF',[[155,fy6+80*Math.tan(38*Math.PI/180)],[510,180-90*Math.tan(38*Math.PI/180)]]],['GF','FG']],angles:[A('1',null,'38°',53,{vertex:'E',a:0,b:38,labelR:83,symbol:'1'}),A('2','CFG','52°',44,{labelR:73,symbol:'2'}),A('GFE','GFE','90°',40),A('CFE','CFE','142°',87,{labelR:115,labelAngle:112}),A('AEF','AEF','38°',50)],known:['1','2'],right:['GFE'],symbols:['1','2']};
return [
{id:'cross-1',chapter:'cross',number:1,page:1,statement:'直線 AB 與 CD 相交於 O 點，OA 平分 ∠EOC，∠EOD = 118°。',task:'求 ∠EOA、∠AOC、∠BOC 和 ∠BOD 的度數。',diagram:cross1,goals:['EOA','AOC','BOC','BOD'],rows:[
 K('AB、CD 相交於 O，<br>OA 平分 ∠EOC，∠EOD = 118°。'),
 R('∠EOC = 180° − ∠EOD','平角定義、角的差','∠EOC 與 ∠EOD 組成平角，先求 ∠EOC。',['EOC','EOD'],E('= 180° − 118° = 62°'),['EOC']),
 R(`∠EOA = ∠AOC${E(`= ${H}∠EOC`)}`,'平分定義','把 ∠EOC 平分，得到 ∠EOA 和 ∠AOC。',['EOA','AOC'],E(`= ${H}× 62° = 31°`),['EOA','AOC']),
 R('∠BOC = 180° − ∠AOC','平角定義、角的差','由平角扣去 ∠AOC，求 ∠BOC。',['BOC','AOC'],E('= 180° − 31° = 149°'),['BOC']),
 R('∠BOD = ∠AOC','對頂角相等','利用對頂角相等，求 ∠BOD。',['BOD','AOC'],E('= 31°'),['BOD'])],answer:'∴ ∠EOA = ∠AOC = ∠BOD = 31°，<br>　∠BOC = 149°。'},
{id:'cross-2',chapter:'cross',number:2,page:1,statement:'直線 AB 與 CD 相交於 O 點，OC 平分 ∠AOF，∠AOE = 85°；圖中 E、O、F 共線。',task:'求 ∠COF、∠BOE 和 ∠DOF 的度數。',diagram:cross2,goals:['COF','BOE','DOF'],rows:[
 K('AB、CD 相交於 O，OC 平分 ∠AOF，<br>∠AOE = 85°，E、O、F 共線。'),
 R('∠AOF = 180° − ∠AOE','平角定義、角的差','E、O、F 共線，先從平角求 ∠AOF。',['AOF','AOE'],E('= 180° − 85° = 95°'),['AOF']),
 R(`∠COF = ∠AOC${E(`= ${H}∠AOF`)}`,'平分定義','OC 平分 ∠AOF，求它的一半。',['COF','AOC'],E(`= ${H}× 95° = 47°30′`),['COF','AOC']),
 R('∠BOE = ∠AOF','對頂角相等','∠BOE 與 ∠AOF 是對頂角。',['BOE','AOF'],E('= 95°'),['BOE']),
 R('∠DOF = 180° − ∠COF','平角定義、角的差','∠DOF 與 ∠COF 組成平角。',['DOF','COF'],E('= 180° − 47°30′')+E('= 132°30′'),['DOF'])],answer:'∴ ∠COF = 47°30′，∠BOE = 95°，<br>　∠DOF = 132°30′。'},
{id:'cross-3',chapter:'cross',number:3,page:2,statement:'OB 平分 ∠AOC，OC 平分 ∠AOE，OD 平分 ∠COE，∠AOE = 136°。',task:'求 ∠AOB、∠BOD 和 ∠AOD 的度數。',diagram:cross3,goals:['AOB','BOD','AOD'],rows:[
 K('OB 平分 ∠AOC，OC 平分 ∠AOE，<br>OD 平分 ∠COE，∠AOE = 136°。'),
 R(`∠AOC = ∠COE${E(`= ${H}∠AOE`)}`,'平分定義','先用 OC 把 ∠AOE 平分。',['AOC','COE'],E(`= ${H}× 136° = 68°`),['AOC','COE']),
 R(`∠AOB = ∠BOC${E(`= ${H}∠AOC`)}`,'平分定義','再用 OB 平分 ∠AOC。',['AOB','BOC'],E(`= ${H}× 68° = 34°`),['AOB','BOC']),
 R(`∠COD = ∠DOE${E(`= ${H}∠COE`)}`,'平分定義','用 OD 平分另一邊的 ∠COE。',['COD','DOE'],E(`= ${H}× 68° = 34°`),['COD','DOE']),
 R('∠BOD = ∠BOC + ∠COD','角的和','合併 ∠BOC 和 ∠COD，求 ∠BOD。',['BOC','COD','BOD'],E('= 34° + 34° = 68°'),['BOD']),
 R('∠AOD = ∠AOC + ∠COD','角的和','合併 ∠AOC 和 ∠COD，求 ∠AOD。',['AOC','COD','AOD'],E('= 68° + 34° = 102°'),['AOD'])],answer:'∴ ∠AOB = 34°，∠BOD = 68°，<br>　∠AOD = 102°。'},
{id:'cross-4',chapter:'cross',number:4,page:2,statement:'AB、CD 相交於 O，OB 平分 ∠EOD，∠BOD : ∠AOD = 1 : 8。',task:'求 ∠COE 的度數。',diagram:cross4,goals:['COE'],rows:[
 K('AB、CD 相交於 O，OB 平分 ∠EOD，<br>∠BOD : ∠AOD = 1 : 8。'),
 R('設每份為 <var>x</var>°，<br>∠BOD = <var>x</var>°，∠AOD = 8<var>x</var>°。','設數','依比例設每份為 x°，把兩個角表示成份數。',['BOD','AOD']),
 R('∠BOD + ∠AOD = 180°','平角定義、角的和','兩個鄰補角合成平角，列式求每份。',['BOD','AOD'],E('<var>x</var>° + 8<var>x</var>° = 180°')+E('<var>x</var> = 20'),['BOD','AOD']),
 R('∠EOD = 2∠BOD','平分定義','OB 是角平分線，把 ∠BOD 加倍。',['EOD','BOE','BOD'],E('= 2 × 20° = 40°'),['EOD','BOE']),
 R('∠COE = 180° − ∠EOD','平角定義、角的差','最後從平角扣去 ∠EOD，才是所求的 ∠COE。',['COE','EOD'],E('= 180° − 40° = 140°'),['COE'])],answer:'∴ ∠COE = 140°。'},
{id:'cross-5',chapter:'cross',number:5,page:2,statement:'∠AOB 與 ∠BOC 互為鄰補角，OD 平分 ∠AOB，OE 在 ∠BOC 內，∠EOC = 2∠BOE，∠DOE = 68°。',task:'求 ∠EOC 的度數。',diagram:cross5,goals:['EOC'],rows:[
 K('∠AOB、∠BOC 互為鄰補角，OD 平分 ∠AOB，<br>OE 在 ∠BOC 內，∠EOC = 2∠BOE，∠DOE = 68°。'),
 R('設 ∠BOE = <var>x</var>°，則 ∠EOC = 2<var>x</var>°。','設數','以 ∠BOE 為一份，把 ∠EOC 表示成兩份。',['BOE','EOC']),
 R('∠BOC = ∠BOE + ∠EOC'+E('= 3<var>x</var>°')+'<br>∠AOB = 180° − ∠BOC'+E('= 180° − 3<var>x</var>°'),'角的和、平角定義','先合成 ∠BOC，再用鄰補關係表示 ∠AOB。',['BOC','AOB']),
 R(`∠BOD = ${H}∠AOB${E(`= ${H}(180° − 3<var>x</var>°)`)}`,'平分定義','OD 平分 ∠AOB，取它的一半。',['BOD','AOD']),
 R('∠DOE = ∠BOD + ∠BOE','角的和、代入','把 ∠DOE 拆成 ∠BOD 與 ∠BOE，代入已知角求 x。',['DOE','BOD','BOE'],E(`${H}(180° − 3<var>x</var>°) + <var>x</var>°`)+E('= 68°')+E('180° − 3<var>x</var>° + 2<var>x</var>°')+E('= 136°')+E('<var>x</var> = 44'),['BOE','BOD','AOD','BOC','AOB']),
 R('∠EOC = 2∠BOE','代入','把求得的一份代回 ∠EOC。',['EOC','BOE'],E('= 2 × 44° = 88°'),['EOC'])],answer:'∴ ∠EOC = 88°。'},
{id:'perp-1',chapter:'perp',number:1,page:3,statement:'直線 AB 與 CD 都經過 O，OE 為射線，∠AOC = 35°，∠DOE = 55°。',task:'求證 AB ⊥ OE。',diagram:perp1,goals:[],goalPairs:[['AB','OE']],goalFocus:['BOE'],rows:[
 K('AB、CD 相交於 O，OE 為射線，<br>∠AOC = 35°，∠DOE = 55°。'),
 R('∠BOD = ∠AOC','對頂角相等','先由對頂角求 ∠BOD。',['BOD','AOC'],E('= 35°'),['BOD']),
 R('∠BOE = ∠BOD + ∠DOE','角的和','合併 ∠BOD 和 ∠DOE，檢查是否形成直角。',['BOE','BOD','DOE'],E('= 35° + 55° = 90°'),['BOE']),
 R('AB ⊥ OE','垂直定義','∠BOE 是直角，依垂直定義完成證明。',['BOE'],'',[],[['AB','OE']],{relation:'perpendicular',right:['BOE']})],answer:'∴ 得證。'},
{id:'perp-2',chapter:'perp',number:2,page:3,statement:'直線 AB、CD 相交於 O，OM ⊥ AB，∠MOD = 44°。',task:'求 ∠COA 和 ∠AOD 的度數。',diagram:perp2,goals:['COA','AOD'],rows:[
 K('AB、CD 相交於 O，OM ⊥ AB，∠MOD = 44°。'),
 R('∠BOM = ∠AOM = 90°','垂直定義','OM 垂直 AB，左右各有一個直角。',['BOM','AOM'],'',['BOM','AOM']),
 R('∠BOD = ∠BOM − ∠MOD','角的差','從右邊的直角扣去 ∠MOD。',['BOM','MOD','BOD'],E('= 90° − 44° = 46°'),['BOD']),
 R('∠COA = ∠BOD','對頂角相等','利用對頂角相等求 ∠COA。',['COA','BOD'],E('= 46°'),['COA']),
 R('∠AOD = 180° − ∠BOD','平角定義、角的差','再以鄰補關係求 ∠AOD。',['AOD','BOD'],E('= 180° − 46° = 134°'),['AOD'])],answer:'∴ ∠COA = 46°，∠AOD = 134°。'},
{id:'perp-3',chapter:'perp',number:3,page:3,statement:'直線 AB、CD 相交於 O，OE 平分 ∠BOD，OF 平分 ∠BOC。',task:'(1) 求證 OE ⊥ OF；(2) 若 ∠2 : ∠1 = 4 : 1，求 ∠AOF 的度數。',diagram:perp3,goals:['AOF'],goalPairs:[['OE','OF']],goalFocus:['EOF'],rows:[
 K('AB、CD 相交於 O，OE、OF 分別平分 ∠BOD、∠BOC；<br>(2) ∠2 : ∠1 = 4 : 1。'),
 R(`(1) ∠EOF = ∠BOE + ∠BOF${E(`= ${H}∠BOD + ${H}∠BOC`)}${E(`= ${H}(∠BOD + ∠BOC)`)}`,'角的和、平分定義、平角定義','兩個鄰補角各取一半，合起來是平角的一半。',['BOE','BOF','EOF'],E(`= ${H}× 180° = 90°`),['EOF']),
 R('OE ⊥ OF','垂直定義','先證明 OE 與 OF 垂直，完成第 (1) 小題。',['EOF'],'',[],[['OE','OF']],{relation:'perpendicular',right:['EOF'],seal:'∴ 得證。'}),
 R('(2) 設每份為 <var>x</var>°，<br>∠1 = <var>x</var>°，∠2 = 4<var>x</var>°。','設數','第 (2) 小題再按比例設每份為 x°。',['1','2']),
 R('∠1 + ∠2 = ∠EOF = 90°','角的和、代入','這兩個角合成剛證明的直角，列式求每份。',['1','2','EOF'],E('<var>x</var>° + 4<var>x</var>° = 90°')+E('<var>x</var> = 18'),['1','2','BOE','BOF']),
 R('∠AOF = 180° − ∠BOF'+E('= 180° − ∠2'),'平角定義、角的差、平分定義','∠BOF 等於 ∠2，再求它的鄰補角。',['AOF','BOF','2'],E('= 180° − 72° = 108°'),['AOF'])],answer:'∴ ∠AOF = 108°。'},
{id:'parallel-1',chapter:'parallel',number:1,page:7,statement:'如圖，CE 平分 ∠ACD，∠ACE = ∠B。',task:'求證 AB // EC。',diagram:parallel1,goals:[],goalPairs:[['AB','EC']],rows:[
 K('CE 平分 ∠ACD，∠ACE = ∠ABC。'),
 R(`∠ACE = ∠ECD = ${H}∠ACD`,'平分定義','先由 CE 平分 ∠ACD，找出兩個相等的角。',['ACE','ECD'],'',['ECD']),
 R('∠ABC = ∠ECD','等量代換','把已知的 ∠ABC 與 ∠ACE 代換，得到這一對角相等。',['ABC','ECD']),
 R('AB // EC','同位角相等，兩直線平行','以 BC 為截線，利用同位角相等判定平行。',['ABC','ECD'],'',[],[['AB','EC']])],answer:'∴ 得證。'},
{id:'parallel-2',chapter:'parallel',number:2,page:7,statement:'如圖，∠D = 53°，∠1 = 127°，∠2 = 53°。',task:'試說明直線 AB 與 CD、直線 BC 與 DE 的位置關係。',diagram:parallel2,goals:[],goalPairs:[['AB','CD'],['BC','DE']],rows:[
 K('∠CDE = 53°，∠1 = 127°，∠2 = 53°。'),
 R('∠ABC = 180° − ∠1','平角定義、角的差','先求 ∠1 的鄰補角，找出可比較的銳角。',['ABC','1'],E('= 180° − 127° = 53°'),['ABC']),
 R('∠ABC = ∠2','等量代換','比較 ∠ABC 與 ∠2。',['ABC','2']),
 R('AB // CD','同位角相等，兩直線平行','以 BC 為截線，先判定 AB 與 CD 的位置關係。',['ABC','2'],'',[],[['AB','CD']]),
 R('∠2 = ∠CDE = 53°','已知','換用 CD 為截線，找出另一對相等的同位角。',['2','CDE']),
 R('BC // DE','同位角相等，兩直線平行','再判定 BC 與 DE 的位置關係。',['2','CDE'],'',[],[['BC','DE']])],answer:'∴ AB // CD，BC // DE。'},
{id:'parallel-3',chapter:'parallel',number:3,page:8,statement:'如圖，∠A = ∠D，∠B = ∠FCB。',task:'求證 ED // CF。',diagram:parallel3,goals:[],goalPairs:[['ED','CF']],rows:[
 K('∠BAC = ∠CDE，∠ABC = ∠FCB。'),
 R('AB // ED','內錯角相等，兩直線平行','以 AD 為截線，先利用第一對內錯角。',['BAC','CDE'],'',[],[['AB','ED']]),
 R('AB // CF','內錯角相等，兩直線平行','再以 BC 為截線，利用另一對內錯角。',['ABC','FCB'],'',[],[['AB','CF']]),
 R('ED // CF','平行於同一直線的兩直線平行','ED 與 CF 都平行於 AB，合併兩個結論。',[],'',[],[['ED','CF']])],answer:'∴ 得證。'},
{id:'parallel-4',chapter:'parallel',number:4,page:8,statement:'如圖，∠DCA = ∠CAB，∠EFB = 100°，∠B = 80°。',task:'求證 EF // CD。',diagram:parallel4,goals:[],goalPairs:[['EF','CD']],rows:[
 K('∠DCA = ∠CAB，∠EFB = 100°，∠ABF = 80°。'),
 R('CD // AB','內錯角相等，兩直線平行','先利用對角線 AC 兩側相等的內錯角。',['DCA','CAB'],'',[],[['CD','AB']]),
 R('∠EFB + ∠ABF','代入','檢查 EF 與 AB 之間這一對同旁內角是否互補。',['EFB','ABF'],E('= 100° + 80° = 180°')),
 R('EF // AB','同旁內角互補，兩直線平行','這對同旁內角互補，判定 EF 與 AB 平行。',['EFB','ABF'],'',[],[['EF','AB']]),
 R('EF // CD','平行於同一直線的兩直線平行','EF 和 CD 都平行於 AB，得到所求結論。',[],'',[],[['EF','CD']])],answer:'∴ 得證。'},
{id:'parallel-5',chapter:'parallel',number:5,page:8,statement:'FA ⊥ AC，EB ⊥ AC，垂足分別為 A、B，∠BED + ∠D = 180°。',task:'求證 AF // CD。',diagram:parallel5,goals:[],goalPairs:[['AF','CD']],rows:[
 K('FA ⊥ AC，EB ⊥ AC，∠BED + ∠EDC = 180°。'),
 R('FA // EB','同一平面內，同垂直則平行','FA 與 EB 都垂直於 AC，先連起第一個平行關係。',['FAC','EBC'],'',[],[['AF','EB']]),
 R('EB // CD','同旁內角互補，兩直線平行','以 ED 為截線，由已知的同旁內角互補再判定平行。',['BED','EDC'],'',[],[['EB','CD']]),
 R('AF // CD','平行於同一直線的兩直線平行','AF 和 CD 都平行於 EB，合併兩條推理。',[],'',[],[['AF','CD']])],answer:'∴ 得證。'},
{id:'parallel-6',chapter:'parallel',number:6,page:8,statement:'直線 EF 與 AB、CD 分別相交於 E、F，GF ⊥ EF 於 F，∠1 = 38°，∠2 = 52°。',task:'直線 AB 與 CD 平行嗎？請說明理由。',diagram:parallel6,goals:[],goalPairs:[['AB','CD']],rows:[
 K('EF 與 AB、CD 分別相交於 E、F，<br>GF ⊥ EF，∠1 = 38°，∠2 = 52°。'),
 R('∠GFE = 90°','垂直定義','先從 GF 垂直 EF 找出直角。',['GFE'],'',['GFE']),
 R('∠CFE = ∠CFG + ∠GFE','角的和','∠2 在 FC 與 FG 之間，把它與直角合成 ∠CFE。',['2','GFE','CFE'],E('= 52° + 90° = 142°'),['CFE']),
 R('∠AEF + ∠CFE = ∠1 + ∠CFE','代入','再把 ∠AEF 與 ∠CFE 合起來，檢查同旁內角。',['AEF','CFE'],E('= 38° + 142° = 180°'),['AEF']),
 R('AB // CD','同旁內角互補，兩直線平行','兩個同旁內角互補，因此 AB 與 CD 平行。',['AEF','CFE'],'',[],[['AB','CD']])],answer:'∴ AB 與 CD 平行。'}
];
})();
