const APP_VER=39;
// ===== AUTO UPDATE (PWA) =====
function checkUpdate(){try{fetch('index.html?t='+Date.now(),{cache:'no-store'}).then(r=>r.text()).then(t=>{const m=t.match(/game\.js\?v=(\d+)/);const nv=m?+m[1]:0;if(nv>APP_VER){const k='fl_upd_'+nv;if(sessionStorage.getItem(k))return;sessionStorage.setItem(k,'1');try{typeof save==='function'&&S&&save()}catch(e){}location.replace(location.pathname+'?v='+nv+'&t='+Date.now())}}).catch(()=>{})}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible')checkUpdate()});
setTimeout(checkUpdate,1500);
'use strict';
// ===== เส้นทางแข้ง: Football Life =====
const R=Math.random,rnd=(a,b)=>a+Math.floor(R()*(b-a+1)),pick=a=>a[Math.floor(R()*a.length)],cl=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const INJT=[[1,'🦵','กล้ามเนื้อตึง'],[2,'🦵','ต้นขาหลังฉีกเล็กน้อย'],[4,'🦶','ข้อเท้าแพลง'],[6,'🦿','เอ็นหัวเข่าอักเสบ'],[99,'🦴','กระดูกเท้าร้าว']];
const INJP={ice:.03,sauna:.03,chair:.04,physio:.12,cryo:.1,hyper:.15,med:.25};
const chance=p=>R()<p, $=s=>document.querySelector(s);
const fmt=n=>n<0?'-'+fmt(-n):n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':Math.round(n)+'';
const LEAGUES={
 ENG:{n:'อังกฤษ',f:'\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}',tiers:[['Premier Division',82],['Championship',73],['League One',65],['National League',58]],cities:['Ashford','Kingsbridge','Northvale','Redmoor','Whitehaven','Blackmoor','Eastport','Westbury','Stonegate','Highcliff','Millford','Oakham','Riverton','Brackwell','Lynton','Dunmore','Hartfield','Fernley','Grimsdale','Pelham','Thornbury','Wexley','Yarwood','Cobham','Halbrook','Merrow','Sandhurst','Tewley','Garston','Ilford Vale','Kestrel','Lowmarsh'],suf:['United','City','Rovers','Athletic','Town','Wanderers','Albion','FC']},
 ESP:{n:'สเปน',f:'🇪🇸',tiers:[['Primera Liga',81],['Segunda',70],['Primera RFEF',59]],cities:['Bellavista','Campoalto','Robledo','Sotomayor','Fuentecilla','Marisol','Tordesal','Encinar','Valdoria','Montesol','Rioseco','Castelmar','Almira','Puerto Verde','Sierra Alta','Torreluz','Navalón','Gredos','Peñaclara','Arenales','Villafría','Costabella','Mirador','Olivar'],pre:['Real','Atlético','CD','UD','Deportivo','SD','Racing','CF']},
 ITA:{n:'อิตาลี',f:'🇮🇹',tiers:[['Serie Prima',80],['Serie Cadetti',70],['Serie C Lega',59]],cities:['Borgoverde','Castelvetro','Fontanella','Montalbano','Rivalta','Sanfelice','Terrabianca','Vallerosa','Valmonte','Portoferro','Castellina','Rocca Nera','San Vito','Lago Azzurro','Montebruno','Vercella','Ardenza','Collefiore','Torrenova','Belcastro','Pianura','Marevento','Sassolungo','Ostiana'],pre:['AC','US','FC','SS','Calcio','Virtus','Sporting','Inter']},
 GER:{n:'เยอรมนี',f:'🇩🇪',tiers:[['Erste Liga',80],['Zweite Liga',70],['Dritte Liga',60]],cities:['Birkenau','Dornstadt','Eichwald','Felsberg','Hirschau','Kornheim','Lauterbach','Seeburg','Steinfeld','Rheinau','Waldheim','Kaltenberg','Bergstadt','Eisenbach','Nordmark','Hohenfels','Lindenau','Oberhof','Grünwald','Falkenrode','Mühlhafen','Sonnenberg','Altenburg','Wolfsee'],pre:['SV','FC','VfB','TSV','Borussia','Fortuna','SC','1. FC']},
 FRA:{n:'ฝรั่งเศส',f:'🇫🇷',tiers:[['Ligue Élite',78],['Ligue Deux',68],['National',58]],cities:['Bourgneuf','Chantemerle','Fontclaire','Montrevel','Rivesaltes','Saint-Brieux','Valmorel','Vieuxpont','Montclair','Saint-Lune','Valfleur','Rochebelle','Port-Argent','Beaumarais','Lacroix','Clairvaux','Mirande','Orvault','Pontivy-Sur-Mer','Belleville','Châteaurouge','Sablon','Verdier','Aubenas'],pre:['Olympique','AS','FC','Stade','RC','SC','Racing','US']},
 JPN:{n:'ญี่ปุ่น',f:'🇯🇵',tiers:[['J-Premier',72],['J-Second',64],['J-Third',56]],cities:['Asahino','Ishizaki','Kawabe','Nanohana','Oigawa','Sorano','Tokiwa','Yamabuki','Aokawa','Shirayama','Kitahama','Minatoya','Hoshino','Takamori','Midorigawa','Kazehara','Sakurazaka','Umibe','Tsukino','Akagane','Hayate','Kurogane','Yumesato','Fujimine'],suf:['FC','United','SC','Blitz','Thunders','Marines','Falcons','Stars']},
 KSA:{n:'ซาอุฯ',f:'🇸🇦',tiers:[['Desert Pro League',74],['First Division',62],['Second Division',54]],cities:['Al-Hilal Valley','Al-Wahat','Al-Jabal','Al-Nasim','Al-Diriya','Al-Sharq','Al-Ghad','Al-Zahra','Al-Noor','Al-Sahra','Al-Fajr','Al-Najm','Al-Wadi','Al-Qamar','Al-Rimal','Al-Saqr','Al-Barq','Al-Majd','Al-Nakheel','Al-Shams','Al-Bahr','Al-Fursan','Al-Khalij','Al-Ruwad'],suf:['FC','Club','SC','United']},
 THA:{n:'ไทย',f:'🇹🇭',tiers:[['ไทยลีก 1',64],['ไทยลีก 2',56],['ไทยลีก 3',50]],cities:['นครสยาม','ลำน้ำ','ภูผา','ทะเลทอง','อีสานยูไนเต็ด','เชียงดาว','บางปลา','หาดทราย','สุวรรณ','พระนคร','ช้างศึกเมือง','ลุ่มน้ำ','ดอยคำ','ปากน้ำ','อ่าวไทย','ขุนเขา','นาคราช','สายฟ้า','บึงกาฬนคร','เมืองเก่า','ทุ่งทอง','ป่าสัก','ศรีวิชัย','อยุธยาเฟิร์ส'],suf:['เอฟซี','ซิตี้','ยูไนเต็ด','วอริเออร์','']}
};
const POS={FW:'กองหน้า',WG:'ปีก',MF:'กองกลาง',DF:'กองหลัง'};
const AT={pac:'ความเร็ว',sho:'การยิง',pas:'การผ่าน',dri:'เลี้ยงบอล',def:'เกมรับ',phy:'ร่างกาย'};
const W={FW:{sho:.35,pac:.2,dri:.2,phy:.15,pas:.1,def:0},WG:{pac:.3,dri:.3,sho:.15,pas:.2,phy:.05,def:0},MF:{pas:.35,dri:.2,sho:.1,def:.15,phy:.1,pac:.1},DF:{def:.4,phy:.3,pac:.15,pas:.15,sho:0,dri:0}};
let S=null,CONS=[],TAB='home';
const ovr=(p=S.p)=>Math.round(Object.entries(W[p.pos]).reduce((s,[k,w])=>s+p.a[k]*w,0));
function genWorld(){const w={};for(const[c,L]of Object.entries(LEAGUES)){let ci=[...L.cities].sort(()=>R()-.5),used=0;w[c]=L.tiers.map(([n,str])=>{const clubs=[];for(let i=0;i<8;i++){const city=ci[used++%ci.length];const name=L.pre?pick(L.pre)+' '+city:(city+' '+pick(L.suf)).trim();clubs.push({n:name,s:cl(str+rnd(-6,6),35,95)})}return{n,str,clubs}})}return w}
const club=()=>S.club?S.world[S.club.c][S.club.t].clubs[S.club.i]:null;
const tierOf=(c,t)=>S.world[c][t];
const wage=(c,t)=>Math.round(Math.pow(tierOf(c,t).str-42,2)*85/10)*10;
const SK='fl_save3',SKB='fl_save3_bak';let SVN=0,SVW=0;
function save(){if(!S)return;let j;try{j=JSON.stringify(S)}catch(e){return saveWarn('แปลงข้อมูลไม่ได้')}try{localStorage.setItem(SK,j);if(++SVN%5===1)localStorage.setItem(SKB,j)}catch(e){saveWarn('พื้นที่เก็บข้อมูลเต็ม/ถูกบล็อก')}idbPut(j)}
function saveWarn(m){const t=Date.now();if(t-SVW<15000)return;SVW=t;try{toast('⚠️ บันทึกเซฟไม่สำเร็จ: '+m+' — กด "สำรองเซฟ" ในแท็บอาชีพ')}catch(e){}}
function parseSave(j){try{const o=JSON.parse(j);return o&&o.p&&o.ko?o:null}catch(e){return null}}
function load(){let a=null,b=null;try{a=localStorage.getItem(SK);b=localStorage.getItem(SKB)}catch(e){}S=parseSave(a)||parseSave(b)}
function idb(cb){try{const r=indexedDB.open('fl',1);r.onupgradeneeded=()=>r.result.createObjectStore('s');r.onsuccess=()=>cb(r.result);r.onerror=()=>{}}catch(e){}}
let IDBT=0;function idbPut(j){clearTimeout(IDBT);IDBT=setTimeout(()=>idb(d=>{try{d.transaction('s','readwrite').objectStore('s').put(j,'save')}catch(e){}}),400)}
function idbGet(cb){idb(d=>{try{const q=d.transaction('s').objectStore('s').get('save');q.onsuccess=()=>cb(q.result);q.onerror=()=>cb(null)}catch(e){cb(null)}})}
function exportSave(){save();const code=btoa(unescape(encodeURIComponent(JSON.stringify(S))));sheet(`<span class="tag o">สำรองเซฟ</span><p class="mu">คัดลอกโค้ดนี้เก็บไว้ (เช่นในโน้ต) แล้วนำไปวางใน "นำเข้าเซฟ" บนอุปกรณ์/เบราว์เซอร์อื่น</p><textarea id="exc" readonly style="width:100%;height:140px;font-size:16px;background:#0d1a12;color:#fff;border-radius:10px">${code}</textarea><button class="btn" id="cpy">📋 คัดลอก</button><button class="btn s" onclick="closeM()" style="text-align:center">ปิด</button>`);$('#cpy').onclick=()=>{const t=$('#exc');t.select();try{navigator.clipboard.writeText(t.value)}catch(e){document.execCommand('copy')}toast('คัดลอกแล้ว')}}
function importSave(){sheet(`<span class="tag o">นำเข้าเซฟ</span><p class="mu">วางโค้ดเซฟ (จะเขียนทับเซฟปัจจุบัน)</p><textarea id="imc" style="width:100%;height:140px;font-size:16px;background:#0d1a12;color:#fff;border-radius:10px"></textarea><button class="btn" id="imb">📥 นำเข้า</button><button class="btn s" onclick="closeM()" style="text-align:center">ยกเลิก</button>`);$('#imb').onclick=()=>{let o=null;try{o=parseSave(decodeURIComponent(escape(atob($('#imc').value.trim()))))}catch(e){}if(!o)return toast('⚠️ โค้ดไม่ถูกต้อง');try{if(S)localStorage.setItem(SKB,JSON.stringify(S))}catch(e){}S=o;save();closeM();LIVE=null;render();toast('✅ นำเข้าเซฟแล้ว')}}
function news(t){S.news.unshift({w:`${S.slabel||''} · ${new Date(now()).toLocaleString('th-TH',{timeZone:'Asia/Bangkok',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}`,t});S.news=S.news.slice(0,60)}
// ===== consequence helpers =====
const LBL={morale:'ขวัญกำลังใจ',trust:'ความเชื่อใจโค้ช',ref:'ชื่อเสียงกับกรรมการ',stamina:'สตามิน่า',media:'ภาพลักษณ์สื่อ'};
function E(k,d){if(!d)return;const p=S.p;if(k==='fans'){const v=d<1&&d>-1?Math.round(p.fans*d):d;p.fans=Math.max(50,p.fans+v);CONS.push((v>=0?'📈':'📉')+` ผู้ติดตาม ${v>=0?'+':''}${fmt(v)}`);fanMS();return}
 if(k==='money'){p.money+=d;CONS.push((d>=0?'💰':'💸')+` เงิน ${d>=0?'+':''}฿${fmt(d)}`);return}
 if(AT[k]){p.a[k]=cl(p.a[k]+d,20,99);CONS.push(`⚡ ${AT[k]} ${d>0?'+':''}${d}`);return}
 p[k]=cl(p[k]+d);CONS.push(`${d>0?'🟢':'🔴'} ${LBL[k]} ${d>0?'+':''}${d}`);if(k==='trust')tierChk()}
const N=t=>CONS.push('📝 '+t);
function fine(x){x=Math.max(x,Math.round(S.p.wage*x/10000));S.p.money-=x;CONS.push(`💸 โดนปรับ ฿${fmt(x)}`);S.p.fines+=x}
function ban(n,why){S.p.ban+=n;CONS.push(`⛔ แบน ${n} นัด (${why})`);news(`${S.p.name} ถูกแบน ${n} นัด: ${why}`)}
function chain(id,wk=1){S.chains.push({id,at:S.abs+wk});const k={scandal:'scandal',fixCaught:'scandal',partyLeak:'party',transferReq:'coach',sulkMedia:'coach'}[id];if(k)scandalPosts(k)}
function yellow(M){if(M.y){M.red=true;CONS.push('🟨🟥 ใบเหลืองที่สอง = ใบแดง!');}else{M.y=1;CONS.push('🟨 ใบเหลือง!')}S.p.yc++;if(S.p.yc%5===0&&!M.red){ban(1,'สะสมใบเหลืองครบ 5 ใบ')}}
function red(M,why){M.red=true;CONS.push('🟥 ใบแดง! '+(why||''));S.p.rc++}
function goal(M,how,r=1){M.g++;M.gf++;M.r+=r;S.p.sg++;S.p.tg++;N(`⚽ ประตู! ${how||''}`);E('fans',0.04);E('morale',4)}
function assist(M,r=.7){M.as++;M.gf++;M.r+=r;S.p.sa++;N('🅰️ แอสซิสต์!');E('trust',2)}
const sk=k=>S.p.a[k]/100;
// ===== EVENTS =====
// m: match moment, o: off-field. c=condition, x=text, o=options[{l,f}]
const EV=[
{id:'foulNoCard',m:1,x:M=>`นาที ${M.min}' กองหลัง ${M.opp} สไลด์เข้าข้อเท้าคุณเต็ม ๆ! กรรมการโบกมือให้เล่นต่อ ไม่มีใบเหลือง 😤`,o:[
 {l:'🙏 ประท้วงอย่างสุภาพ',f:M=>{E('ref',3);if(chance(.4))N('กรรมการพยักหน้า บอกว่าจะจับตาดู');else N('กรรมการไม่สนใจ แต่ก็ไม่ได้โกรธคุณ')}},
 {l:'😡 เข้าไปตะโกนใส่หน้ากรรมการ',f:M=>{E('ref',-10);if(chance(.6))yellow(M);else N('รอดใบเหลืองหวุดหวิด');E('fans',0.01)}},
 {l:'🦶 เอาคืน! เตะสวนกลับ',f:M=>{if(chance(.35))red(M,'ทำร้ายร่างกายคู่แข่ง');else{yellow(M);N('แฟนบอลเชียร์ลั่นที่คุณไม่ยอมใคร')}E('ref',-12);E('trust',-6);E('fans',0.03)}},
 {l:'🧊 ลุกขึ้นเล่นต่อ ใช้ฝีเท้าตอบ',f:M=>{E('morale',2);if(chance(.3+sk('dri')*.3)){N('สองนาทีต่อมาคุณเลี้ยงหลบคนเดิมแบบขายหน้า!');M.r+=.4;E('fans',0.02)}else N('เล่นต่อแบบมืออาชีพ');E('trust',3)}}]},
{id:'subOff',m:1,min:[50,65],x:M=>`นาที ${M.min}' ป้ายเปลี่ยนตัวขึ้นเบอร์ของคุณ! โค้ชไม่พอใจฟอร์ม/ความฟิตของคุณ สั่งเปลี่ยนออก`,o:[
 {l:'👏 เดินออกปรบมือให้แฟน ยอมรับ',f:M=>{E('trust',4);E('morale',-3);N('โค้ชแตะไหล่ ขอบคุณที่เป็นมืออาชีพ');M.sub=1}},
 {l:'😒 เดินช้า ๆ หน้างอ ไม่แปะมือเพื่อน',f:M=>{E('trust',-7);E('fans',-0.01);N('กล้องจับภาพหน้างอได้ชัดเจน');M.sub=1;chain('sulkMedia',1)}},
 {l:'🗣️ ตะโกนด่าโค้ชข้างสนาม',f:M=>{E('trust',-18);fine(20000);N('ทั้งสนามได้ยิน! ห้องแต่งตัวเดือด');M.sub=1;S.p.benched=1;chain('transferReq',2);news(`${S.p.name} ระเบิดอารมณ์ใส่โค้ชข้างสนาม!`)}},
 {l:'🎽 ขว้างเอี๊ยมลงพื้น เตะขวดน้ำ',f:M=>{E('trust',-14);E('fans',0.02);fine(10000);N('คลิปขว้างเอี๊ยมกลายเป็นไวรัล');M.sub=1;S.p.benched=chance(.6)?1:0;if(S.p.benched)CONS.push('🪑 โดนดองนัดหน้า');chain('sulkMedia',1)}}]},
{id:'redReact',m:1,c:()=>false,x:M=>`🟥 ใบแดง! กรรมการชี้ไล่คุณออกจากสนาม ทั้งสนามโห่ลั่น`,o:[
 {l:'🚶 ก้มหน้ายอมรับ เดินออก',f:M=>{ban(1,'ใบแดง');E('ref',4);E('trust',-3)}},
 {l:'🗯️ เถียงกรรมการไม่ยอมออก',f:M=>{ban(2,'ใบแดง+ไม่เคารพผู้ตัดสิน');fine(15000);E('ref',-10);E('trust',-6)}},
 {l:'🤚 ผลักอกกรรมการ',f:M=>{ban(6,'ทำร้ายผู้ตัดสิน');fine(80000);E('ref',-30);E('trust',-20);E('fans',-0.15);chain('scandal',1);news(`🔥 ฉาวทั้งประเทศ! ${S.p.name} ผลักผู้ตัดสินกลางสนาม`)}},
 {l:'👊 ต่อยกรรมการ!!',f:M=>{ban(15,'ทำร้ายร่างกายผู้ตัดสิน');fine(200000);E('ref',-50);E('trust',-40);E('fans',-0.3);S.p.terminate=1;chain('scandal',1);news(`💥 ข่าวใหญ่! ${S.p.name} ต่อยผู้ตัดสิน สโมสรเตรียมฉีกสัญญา`)}}]},
{id:'dive',m:1,c:()=>S.p.pos!=='DF',x:M=>`นาที ${M.min}' คุณพาบอลเข้ากรอบเขตโทษ กองหลังเอื้อมมือมาแตะเอวนิดเดียว...`,o:[
 {l:'🎭 ล้มแบบนักแสดงออสการ์',f:M=>{if(chance(.35+(S.p.ref-50)/200)){N('กรรมการเป่าจุดโทษ!');M.queue.unshift('pen');E('ref',-5)}else{N('VAR ตรวจสอบ... ใบเหลืองข้อหาพุ่งล้ม!');yellow(M);E('ref',-10);E('fans',-0.03)}}},
 {l:'💪 ทรงตัวสู้ต่อ',f:M=>{if(chance(.2+sk('phy')*.5)){if(chance(.5+sk('sho')*.3))goal(M,'สู้ไม่ล้มแล้วยิงเข้า! แฟนบอลยืนปรบมือ');else{N('ยิงโดนเสาอย่างน่าเสียดาย');M.r+=.2}}else N('เสียบอลไป แต่กรรมการชื่นชมใจนักกีฬา');E('ref',5)}}]},
{id:'celebrate',m:1,c:M=>M.g>0,x:M=>`คุณเพิ่งยิงประตู! มุมอัฒจันทร์ฝั่งแฟน ${M.opp} กำลังโห่และปาขวดน้ำใส่คุณ`,o:[
 {l:'🤫 วิ่งไปทำท่าจุ๊ปาก ยั่วแฟนคู่แข่ง',f:M=>{E('fans',0.08);E('ref',-5);if(chance(.45))yellow(M);if(chance(.4)){fine(25000);N('สมาคมฯ สั่งปรับข้อหายั่วยุ')}chain('fanConflict',2)}},
 {l:'❤️ จูบโลโก้สโมสร',f:M=>{E('fans',0.05);E('trust',2);N('แฟนบ้านรักคุณมากขึ้น')}},
 {l:'🙏 อุทิศประตูให้ครอบครัว',f:M=>{E('morale',5);E('fans',0.03)}},
 {l:'🕺 ถอดเสื้อเต้นท่าไวรัล',f:M=>{yellow(M);E('fans',0.12);N('ท่าเต้นของคุณขึ้นเทรนด์ X อันดับ 1!')}}]},
{id:'greedy',m:1,x:M=>`นาที ${M.min}' คุณวิ่งว่างโล่ง ๆ ตะโกนขอบอล แต่ "เดอะสตาร์" ของทีมเลือกยิงไกลเองเป็นครั้งที่ 4 แล้ว... ข้ามคานอีก`,o:[
 {l:'😤 ตะโกนด่ากลางสนาม',f:M=>{E('trust',-4);E('morale',-2);if(chance(.5)){N('เขาตะคอกกลับ เพื่อนร่วมทีมต้องเข้ามาแยก');chain('dressingFight',0)}else N('เขาเงียบ แต่สายตาไม่พอใจ')}},
 {l:'🧠 ไปคุยดี ๆ ตอนพักครึ่ง',f:M=>{E('trust',3);if(chance(.6)){N('ครึ่งหลังเขาเริ่มจ่ายให้คุณ');M.r+=.3}}},
 {l:'🏃 ช่างมัน แย่งบอลมาเล่นเองบ้าง',f:M=>{if(chance(.2+sk('dri')*.4))goal(M,'เลี้ยงผ่านสามคนยิงเอง!');else{N('เสียบอลจนโดนสวนกลับ');M.r-=.4;if(chance(.4)){M.ga++;N('โดนยิงสวน!')}}}}]},
{id:'captainHT',m:1,ht:1,min:[45,45],x:M=>`พักครึ่ง ห้องแต่งตัว กัปตันทีมชี้หน้าคุณ: "แกเล่นเห็นแก่ตัว! ไม่วิ่งกลับมาช่วยเกมรับเลย"`,o:[
 {l:'🙇 ขอโทษ สัญญาว่าจะช่วยมากขึ้น',f:M=>{E('trust',4);E('morale',-2);E('stamina',-5)}},
 {l:'🗣️ เถียงกลับ "พี่ก็จ่ายบอลไม่เป็นเหมือนกัน"',f:M=>{E('trust',-5);E('morale',2);N('โค้ชต้องตะโกนสั่งให้หยุด');if(chance(.4))chain('dressingFight',1)}},
 {l:'👊 ผลักกัปตันชนตู้ล็อกเกอร์',f:M=>{E('trust',-20);fine(30000);S.p.benched=1;N('สตาฟฟ์แยกแทบไม่ทัน! โค้ชถอดคุณออกครึ่งหลัง');M.sub=1;chain('transferReq',2);news(`ห้องแต่งตัวเดือด! ${S.p.name} ปะทะกัปตันทีม`)}}]},
{id:'injury',m:1,x:M=>`นาที ${M.min}' คุณรู้สึกแปล๊บที่ต้นขาหลังหลังสปรินต์ หมอทีมวิ่งเข้ามาถาม "ไหวไหม?"`,o:[
 {l:'💉 ฉีดยาชา เล่นต่อ!',f:M=>{if(chance(.45)){S.p.inj=rnd(3,6);CONS.push(`🚑 อาการหนักขึ้น! พักยาว ${S.p.inj} นัด`);M.sub=1;E('trust',3)}else{N('กัดฟันเล่นจนจบ แฟนบอลยกย่องหัวใจนักสู้');E('fans',0.03);E('trust',4)}E('stamina',-15)}},
 {l:'🙋 ขอเปลี่ยนตัว ไม่เสี่ยง',f:M=>{M.sub=1;S.p.inj=chance(.5)?1:0;N(S.p.inj?'พักแค่ 1 นัด ตัดสินใจถูก':'สแกนแล้วไม่เป็นไรมาก');E('trust',-1)}},
 {l:'🤥 บอกว่าไม่เป็นไร ไม่ให้ใครรู้',f:M=>{E('stamina',-20);M.r-=.5;if(chance(.35)){S.p.inj=rnd(2,4);CONS.push(`🚑 บาดเจ็บ ${S.p.inj} นัด`)}N('ครึ่งหลังคุณวิ่งไม่ออกเลย')}}]},
{id:'trash',m:1,x:M=>`นาที ${M.min}' กองหลังคู่แข่งกระซิบข้างหู: "ไอ้เด็กบ้านนอก กลับไปเตะบอลในทุ่งนาเถอะ"`,o:[
 {l:'😌 ยิ้มแล้วเดินหนี',f:M=>{E('morale',1);E('ref',2);N('เขาหงุดหงิดหนักกว่าเดิม')}},
 {l:'🗯️ สวนกลับ "ดูสกอร์บอร์ดก่อนพูด"',f:M=>{if(chance(.3)){yellow(M)}else N('ฝ่ายนั้นของขึ้นเอง');E('fans',0.01)}},
 {l:'🐐 โขกหัวใส่!',f:M=>{red(M,'โขกศีรษะคู่แข่ง');E('fans',0.05);E('trust',-15);news(`${S.p.name} โขกหัวคู่แข่ง! ซีดานยังต้องยอม`)}}]},
{id:'chants',m:1,x:M=>`กองเชียร์ ${M.opp} ร้องเพลงเหยียดคุณดังทั้งสนาม คุณได้ยินชัดทุกคำ`,o:[
 {l:'📢 แจ้งกรรมการตามขั้นตอน',f:M=>{E('ref',5);E('fans',0.04);N('เกมหยุด 5 นาที สื่อชื่นชมความกล้าหาญ');E('morale',-2)}},
 {l:'🚶 เดินออกจากสนามประท้วง',f:M=>{E('fans',0.1);E('trust',-5);N('เพื่อนร่วมทีมเดินออกตามคุณ! เป็นข่าวไปทั่วโลก');M.sub=1;news(`${S.p.name} นำทีมวอล์กเอาต์ต้านการเหยียด`)}},
 {l:'🖕 ชูนิ้วกลางให้อัฒจันทร์',f:M=>{yellow(M);fine(40000);E('fans',-0.02);E('ref',-6)}}]},
{id:'tactic',m:1,x:M=>`นาที ${M.min}' โค้ชตะโกนสั่งให้คุณถอยลงมาช่วยรับ แต่คุณรู้สึกว่าเกมรุกกำลังติดลม`,o:[
 {l:'✅ ทำตามสั่ง',f:M=>{E('trust',4);if(chance(.3)){M.ga=Math.max(0,M.ga-1);N('ช่วยรับไว้ได้หนึ่งจังหวะสำคัญ')}}},
 {l:'🚀 ไม่สน ดันขึ้นหน้า',f:M=>{E('trust',-6);if(chance(.35)){goal(M,'ฝืนคำสั่งแล้วได้ประตู! โค้ชยิ้มไม่ออก')}else if(chance(.5)){M.ga++;N('โดนสวนกลับตรงช่องที่คุณควรยืน!');E('trust',-5)}}}]},
{id:'ballboy',m:1,x:M=>`นาที ${M.min}' ตามหลังอยู่ เด็กเก็บบอลทีมเจ้าบ้านถ่วงเวลา ไม่ยอมส่งบอลให้`,o:[
 {l:'😤 กระชากบอลจากมือเด็ก',f:M=>{yellow(M);E('fans',-0.03);N('ภาพออกมาดูแย่มาก');fine(10000)}},
 {l:'🏃 วิ่งไปหยิบบอลสำรองเอง',f:M=>{E('ref',2);M.r+=.1}},
 {l:'🙄 ฟ้องกรรมการ',f:M=>{E('ref',1);N('กรรมการทดเวลาเพิ่มให้ 2 นาที')}}]},
{id:'teammateErr',m:1,x:M=>`นาที ${M.min}' เพื่อนร่วมทีมคืนบอลสั้นให้โกล์ จนคู่แข่งแย่งไปยิงเข้า!`,o:[
 {l:'🤗 เข้าไปตบไหล่ปลอบ',f:M=>{M.ga++;E('trust',4);E('morale',1);N('เพื่อนร่วมทีมจำน้ำใจคุณ')}},
 {l:'🤬 ตะโกนด่ากลางสนาม',f:M=>{M.ga++;E('trust',-4);N('ทีมเสียสมาธิหนักกว่าเดิม');if(chance(.3)){M.ga++;N('เสียอีกลูก!')}}},
 {l:'🔥 คว้าบอลวิ่งกลับเซ็นเตอร์ ปลุกใจ',f:M=>{M.ga++;E('morale',2);if(chance(.3+sk('phy')*.2)){M.gf++;N('ทีมฮึดตีไข่แตกทันที!')}}}]},
{id:'refWarn',m:1,c:M=>M.y,x:M=>`กรรมการเรียกคุณไปเตือน: "อีกครั้งเดียวนะ" คุณมีใบเหลืองติดตัวอยู่แล้ว`,o:[
 {l:'🙏 ขอโทษ เล่นเบาลง',f:M=>{E('ref',4);M.r-=.1}},
 {l:'👏 ปรบมือประชดใส่หน้า',f:M=>{yellow(M);E('ref',-12)}},
 {l:'🤐 พยักหน้าแล้วเล่นเหมือนเดิม',f:M=>{if(chance(.3))yellow(M);else N('รอดไปได้')}}]},
{id:'invader',m:1,x:M=>`นาที ${M.min}' แฟนบอลวิ่งลงสนามตรงมากอดคุณ! รปภ.กำลังวิ่งตามมา`,o:[
 {l:'🤳 กอดแล้วเซลฟี่',f:M=>{E('fans',0.07);fine(5000);N('คลิปน่ารักไวรัล แต่ลีกเตือนเรื่องความปลอดภัย')}},
 {l:'🙅 ผลักออกอย่างแรง',f:M=>{E('fans',-0.05);N('แฟนล้มกลิ้ง โซเชียลด่ายับ')}},
 {l:'🤝 จับมือแล้วพาไปส่ง รปภ.',f:M=>{E('fans',0.03);E('ref',2)}}]},
{id:'timeWaste',m:1,x:M=>`นาที ${M.min}' นักเตะ ${M.opp} ล้มกลิ้งแกล้งเจ็บถ่วงเวลา ทั้งที่คุณแทบไม่ได้แตะ`,o:[
 {l:'🧍 ดึงแขนเขาลุกขึ้นแรง ๆ',f:M=>{if(chance(.45))yellow(M);else N('เขาลุกขึ้นทันที ปาฏิหาริย์!');E('fans',0.01)}},
 {l:'⚽ เตะบอลอัดใส่ตัวเขา',f:M=>{if(chance(.6))red(M,'กิริยาไม่มีน้ำใจนักกีฬา');else yellow(M);E('ref',-10)}},
 {l:'😑 รอให้กรรมการจัดการ',f:M=>{E('ref',3)}}]},
{id:'htRant',m:1,ht:1,x:M=>`🚿 พักครึ่ง สกอร์ ${M.gf}-${M.ga} โค้ชเตะถังน้ำแข็งกระจาย แล้วเป่า "ไดร์เป่าผม" ใส่หน้าคุณ: "แกเล่นเหมือนเดินเล่นในสวน!"`,o:[
 {l:'😶 ก้มหน้ารับฟัง',f:M=>{E('trust',3);E('morale',-3);M.boost=(M.boost||0)+1;N('ครึ่งหลังทีมวิ่งกันไฟลุก')}},
 {l:'🗣️ เถียงกลับ "โค้ชก็วางแผนผิด!"',f:M=>{E('trust',-12);E('morale',3);if(chance(.5)){M.sub=1;N('โค้ชเปลี่ยนคุณออกทันที!')}}},
 {l:'🔥 "เดี๋ยวครึ่งหลังผมจัดการเอง"',f:M=>{E('morale',5);M.boost=(M.boost||0)+1.5;E('trust',chance(.5)?3:-3)}}]},
{id:'htTactic',m:1,ht:1,x:M=>`📋 พักครึ่ง โค้ชหันมาถามคุณตรง ๆ: "แกว่าครึ่งหลังเราควรเปลี่ยนอะไร?"`,o:[
 {l:'⚔️ "ดันเกมสูง เพรสซิ่งเลยครับ"',f:M=>{M.boost=(M.boost||0)+2;M.ga+=chance(.4)?1:0;E('stamina',-8);E('trust',3)}},
 {l:'🧱 "ตั้งรับแน่น ๆ แล้วสวนกลับ"',f:M=>{M.boost=(M.boost||0)-1;M.ga=Math.max(0,M.ga-1);E('trust',3)}},
 {l:'🤷 "แล้วแต่โค้ชครับ"',f:M=>{E('trust',-2);N('โค้ชถอนหายใจ คาดหวังมากกว่านี้')}}]},
{id:'htBlame',m:1,ht:1,x:M=>`😠 พักครึ่ง เพื่อนร่วมทีมโทษว่าคุณยืนผิดตำแหน่งจนเสียประตู ทั้งที่จริง ๆ เป็นความผิดเขา`,o:[
 {l:'🙇 ขอโทษไปก่อน รักษาบรรยากาศ',f:M=>{E('trust',3);E('morale',-4)}},
 {l:'🗯️ เถียงพร้อมชี้หลักฐานจากจอ',f:M=>{E('morale',2);E('trust',chance(.5)?2:-4);N('ห้องแต่งตัวเงียบกริบ')}},
 {l:'👊 คว้าคอเสื้อ!',f:M=>{E('trust',-15);fine(20000);M.sub=1;chain('dressingFight',1);news(`พักครึ่งเดือด! ${S.p.name} ปะทะเพื่อนร่วมทีม`)}}]},
{id:'htSpeech',m:1,ht:1,x:M=>`📣 กัปตันเงียบ ทุกคนหน้าเครียด... นี่คือโอกาสให้คุณลุกขึ้นพูดปลุกใจ`,o:[
 {l:'🦁 ลุกขึ้นพูดปลุกใจสุดพลัง',f:M=>{if(chance(.4+S.p.trust/200)){E('morale',8);M.boost=(M.boost||0)+2;N('ทั้งทีมตะโกนรับ! พลังล้นออกจากอุโมงค์')}else{E('trust',-3);N('ไม่มีใครฟัง... บรรยากาศแปลก ๆ')}}},
 {l:'🤫 นั่งเงียบ ๆ โฟกัสตัวเอง',f:M=>{E('stamina',5)}}]},
{id:'htPhysio',m:1,ht:1,x:M=>`🩹 นักกายภาพกดข้อเท้าคุณแล้วขมวดคิ้ว: "บวมนะ เล่นต่ออาจเจ็บยาว"`,o:[
 {l:'💪 พันเทปแน่น ๆ เล่นต่อ',f:M=>{E('stamina',-10);if(chance(.35)){S.p.inj=rnd(2,4);CONS.push(`🚑 อาการทรุด พัก ${S.p.inj} นัด`)}else{E('trust',3);E('fans',0.02)}}},
 {l:'🙋 ขอเปลี่ยนตัว',f:M=>{M.sub=1;E('stamina',8);N('ไม่เสี่ยง ตัดสินใจแบบมืออาชีพ')}}]},
{id:'htThreat',m:1,ht:1,x:M=>`⏱️ โค้ชชี้หน้า: "ให้เวลาแก 15 นาทีแรกครึ่งหลัง ถ้ายังเล่นแบบนี้ แกออก!"`,o:[
 {l:'🔥 "ครับ! ดูผมได้เลย"',f:M=>{E('morale',3);if(chance(.3+sk('phy')*.3)){M.r+=.6;M.boost=(M.boost||0)+1;N('15 นาทีแรกคุณวิ่งไม่หยุด! โค้ชพยักหน้า')}else{M.sub=1;N('ไม่รอด... โดนเปลี่ยนออกนาที 60');E('trust',-4)}}},
 {l:'😒 "เปลี่ยนเลยก็ได้"',f:M=>{E('trust',-14);M.sub=1;S.p.benched=1;CONS.push('🪑 โดนดองนัดหน้า')}}]},
{id:'htTunnel',m:1,ht:1,x:M=>`🚇 เดินผ่านอุโมงค์ แฟนบอล ${M.opp} ห้อยตัวลงมาตะโกนด่าพ่อแม่คุณ`,o:[
 {l:'🚶 เดินผ่านไม่สนใจ',f:M=>{E('ref',2)}},
 {l:'💦 สาดน้ำใส่',f:M=>{yellow(M);E('fans',0.04);fine(15000);N('กรรมการที่สี่เห็นเต็ม ๆ')}},
 {l:'😁 ส่งจูบให้',f:M=>{E('fans',0.05);E('morale',3)}}]},
{id:'htPhone',m:1,ht:1,x:M=>`📱 มือถือในล็อกเกอร์สั่น ข้อความจากเอเยนต์: "สโมสรใหญ่ส่งแมวมองมาดูวันนี้!" และแฟนสาวทักมา "ทำไมไม่ตอบแชท?"`,o:[
 {l:'⚡ อ่านแล้วไฟลุก โชว์ให้แมวมองเห็น',f:M=>{E('morale',5);M.boost=(M.boost||0)+1;E('stamina',-5);if(M.r>6.5)S.p.bonusOffer=1}},
 {l:'💬 ตอบแชทแฟนก่อน',f:M=>{E('morale',3);if(chance(.3)){E('trust',-5);N('โค้ชเห็นคุณเล่นมือถือระหว่างคุยแท็กติก!')}}},
 {l:'📴 ปิดเครื่อง โฟกัสเกม',f:M=>{E('trust',2);E('stamina',3)}}]},
{id:'htMotiv',m:1,ht:1,x:M=>`🎧 เหลือ 3 นาทีก่อนออกสนาม คุณจะเตรียมใจครึ่งหลังยังไง?`,o:[
 {l:'🙏 นั่งสมาธิหายใจลึก ๆ',f:M=>{E('stamina',8);E('morale',2)}},
 {l:'🎵 เปิดเพลงมันส์ ๆ เต้นในห้อง',f:M=>{E('morale',6);M.boost=(M.boost||0)+.5;if(chance(.2))E('trust',-3)}},
 {l:'📹 ดูคลิปจุดอ่อนคู่แข่ง',f:M=>{E('trust',3);M.r+=.3}}]},
// ===== OFF-FIELD =====
{id:'homesick',off:1,c:()=>foreign(),x:()=>`${NF()} คุณคิดถึงบ้านที่${NN()}มาก อาหาร ภาษา อากาศ ทุกอย่างแปลกไปหมด`,o:[
 {l:'📞 วิดีโอคอลหาครอบครัวทุกคืน',f:()=>{E('morale',5);E('stamina',-4)}},
 {l:'🍜 ตามหาร้านอาหารบ้านเกิด ชวนเพื่อนร่วมทีมไปกิน',f:()=>{E('morale',4);E('trust',2);E('fans',0.02)}},
 {l:'😔 เก็บตัวเงียบในห้อง',f:()=>{E('morale',-6)}}]},
{id:'lang',off:1,c:()=>foreign(),x:()=>`🗣️ โค้ชอธิบายแท็กติกเป็นภาษาท้องถิ่นเร็วปรื๋อ คุณฟังไม่ทันครึ่งหนึ่ง`,o:[
 {l:'📚 จ้างครูสอนภาษา',f:()=>{E('money',-15000);E('trust',6)}},
 {l:'👍 พยักหน้าเหมือนเข้าใจ',f:()=>{if(chance(.5)){E('trust',-6);N('ลงสนามยืนผิดตำแหน่งในการซ้อม')}else N('รอดไปได้')}},
 {l:'🙋 ขอให้เพื่อนร่วมทีมช่วยแปล',f:()=>{E('trust',2);E('morale',2)}}]},
{id:'journo',off:1,x:()=>`นักข่าวยื่นไมค์: "มีข่าวว่าคุณไม่พอใจที่ไม่ได้เป็นตัวจริงบ่อย ๆ จริงไหม?"`,o:[
 {l:'😇 "ผมเคารพการตัดสินใจของโค้ช"',f:()=>{E('trust',4);E('fans',0.01)}},
 {l:'😐 "ผมอยากลงเล่นมากกว่านี้ครับ"',f:()=>{E('trust',-3);E('morale',2);E('fans',0.02)}},
 {l:'🔥 "โค้ชคนนี้ไม่รู้เรื่องฟุตบอลหรอก"',f:()=>{E('trust',-20);E('fans',0.06);S.p.benched=1;news(`${S.p.name} ถล่มโค้ชกลางวงสัมภาษณ์!`);chain('transferReq',1)}}]},
{id:'social',off:1,x:()=>`ดราม่าในคอมเมนต์ IG ของคุณ มีคนด่าว่า "เตะห่วยแต่เก่งถ่ายรูป" คุณจะโพสต์อะไร?`,o:[
 {l:'📸 โพสต์รูปซ้อมเหงื่อท่วม แคปชั่นสั้น ๆ',f:()=>{E('fans',0.04);E('trust',1)}},
 {l:'🏎️ โพสต์อวดซูเปอร์คาร์คันใหม่',f:()=>{E('fans',0.07);E('money',-30000);E('media',-5);N('ชาวเน็ตแบ่งสองฝ่ายเดือด')}},
 {l:'⌨️ ไล่ตอบด่าคอมเมนต์ทีละคน',f:()=>{E('fans',-0.04);E('morale',-4);E('media',-8);N('แคปหลุดไปทั่วทวิตเตอร์')}}]},
{id:'party',off:1,x:()=>`คืนก่อนแมตช์ เพื่อนชวนไปปาร์ตี้ผับดัง "คืนเดียว ไม่มีใครรู้หรอก"`,o:[
 {l:'🛌 นอนเร็ว พรุ่งนี้มีเกม',f:()=>{E('stamina',8);E('morale',-1)}},
 {l:'🍹 ไปแป๊บเดียว กลับเที่ยงคืน',f:()=>{E('morale',5);E('stamina',-8);if(chance(.25)){chain('partyLeak',1)}}},
 {l:'🎉 ลุยยันเช้า!',f:()=>{E('morale',8);E('stamina',-30);E('fans',0.02);chain('partyLeak',1)}}]},
{id:'partyLeak',off:1,c:()=>false,x:()=>`📸 ภาพคุณเมาแอ๋ในผับหลุดออกมา! สื่อพาดหัว "แข้งดังปาร์ตี้ก่อนเกม"`,o:[
 {l:'🙇 ออกมาขอโทษสาธารณะ',f:()=>{E('trust',-5);E('fans',-0.02);fine(10000)}},
 {l:'🤷 "ชีวิตส่วนตัวผม"',f:()=>{E('trust',-12);E('fans',0.03);S.p.benched=1;CONS.push('🪑 โค้ชดองนัดหน้า')}},
 {l:'🧢 อ้างว่าเป็นรูปเก่า',f:()=>{if(chance(.5)){N('คนเชื่อ! รอดตัว');E('trust',-2)}else{N('มีคลิปยืนยันเวลา... ซวยหนัก');E('trust',-15);E('fans',-0.06);fine(30000)}}}]},
{id:'agent',off:1,x:()=>`เอเยนต์ชื่อดัง "บิ๊กโต้ง" ติดต่อมา: "ให้ผมดูแล ผมพาคุณไปยุโรปได้ ค่าคอม 15%"`,o:[
 {l:'✍️ เซ็นสัญญากับเอเยนต์',f:()=>{S.p.agent=1;N('ข้อเสนอย้ายทีมจะเข้ามาบ่อยขึ้น แต่โดนหักค่าคอม');E('money',-20000)}},
 {l:'🙅 ดูแลตัวเองต่อไป',f:()=>{E('morale',1)}}]},
{id:'tapUp',off:1,x:()=>`สโมสรใหญ่แอบติดต่อผ่านคนกลาง ชวนกินข้าวลับ ๆ เพื่อคุยเรื่องย้ายทีม (ผิดกฎ!)`,o:[
 {l:'🍽️ ไปฟัง เผื่อดี',f:()=>{if(chance(.3)){N('มีคนถ่ายรูปได้! สโมสรโกรธมาก');E('trust',-15);fine(20000)}else{N('คุยกันถูกคอ');S.p.bonusOffer=1}}},
 {l:'🛑 ปฏิเสธ ภักดีกับทีม',f:()=>{E('trust',6);E('fans',0.02)}},
 {l:'📰 ปล่อยข่าวให้สื่อ กดดันขอขึ้นเงิน',f:()=>{E('trust',-8);if(chance(.6)){const x=Math.round(S.p.wage*.3);S.p.wage+=x;CONS.push(`💰 ค่าเหนื่อยเพิ่ม ฿${fmt(x)}/สัปดาห์`)}else N('สโมสรไม่ยอม บรรยากาศมาคุ')}}]},
{id:'sponsor',off:1,x:()=>`มีสปอนเซอร์ 2 เจ้าเสนอดีล: เครื่องดื่มชูกำลังท้องถิ่น vs เว็บพนันออนไลน์ (เงินเยอะกว่า 5 เท่า)`,o:[
 {l:'🥤 เครื่องดื่มชูกำลัง',f:()=>{E('money',Math.round(30000+S.p.fans*.5));E('fans',0.02)}},
 {l:'🎰 เว็บพนัน',f:()=>{E('money',Math.round(150000+S.p.fans*2));if(chance(.5)){chain('scandal',2);N('มีคนเริ่มขุดเรื่องนี้...')}}},
 {l:'🙅 ไม่รับทั้งคู่',f:()=>{E('morale',1)}}]},
{id:'family',off:1,x:()=>`แม่โทรมาว่าพ่อไม่สบายเข้าโรงพยาบาล แต่พรุ่งนี้มีซ้อมแท็กติกสำคัญ`,o:[
 {l:'🏠 บินกลับบ้านทันที',f:()=>{E('morale',6);E('trust',-4);E('money',-15000);N('พ่ออาการดีขึ้นเมื่อเห็นหน้าคุณ ❤️')}},
 {l:'💸 ส่งเงินไปให้ แล้วซ้อมต่อ',f:()=>{E('money',-30000);E('morale',-6);E('trust',3)}},
 {l:'🗣️ ขอโค้ชลาแบบเปิดใจ',f:()=>{if(S.p.trust>50){E('morale',6);N('โค้ชเข้าใจ ให้ลา 2 วัน')}else{E('trust',-6);N('โค้ชไม่ค่อยพอใจ')}}}]},
{id:'fanConflict',off:1,x:()=>`แฟนบอลคู่แข่งกลุ่มหนึ่งเจอคุณที่ห้าง ตะโกนด่าและถ่ายคลิปยั่วโมโห`,o:[
 {l:'🤳 ยิ้ม ถ่ายรูปกับเด็ก ๆ ที่เป็นแฟน',f:()=>{E('fans',0.05);E('media',4)}},
 {l:'🚶 เดินหนีเงียบ ๆ',f:()=>{E('morale',-2)}},
 {l:'👊 เดินเข้าไปเผชิญหน้า',f:()=>{if(chance(.5)){fine(50000);E('fans',-0.08);news(`${S.p.name} มีเรื่องกับแฟนบอลกลางห้าง!`);ban(1,'สมาคมลงโทษพฤติกรรมนอกสนาม')}else{N('รปภ.เข้ามาห้ามทัน');E('fans',0.01)}}}]},
{id:'dressingFight',off:1,x:()=>`ระหว่างซ้อม "เดอะสตาร์" ของทีมเข้าบอลใส่คุณแรง ๆ แล้วหัวเราะเยาะ ความแค้นเก่ายังไม่จบ`,o:[
 {l:'🤝 เรียกคุยเคลียร์ใจ',f:()=>{E('trust',3);E('morale',2);N('สองคนจับมือกัน ห้องแต่งตัวสงบลง')}},
 {l:'🦶 เข้าคืนแรงกว่า',f:()=>{E('trust',-6);if(chance(.4)){S.p.inj=1;CONS.push('🚑 เจ็บเองจากการปะทะ พัก 1 นัด')}}},
 {l:'👊 ชกกันกลางสนามซ้อม',f:()=>{E('trust',-15);fine(25000);S.p.benched=1;E('fans',0.02);news(`วงในเผย ${S.p.name} ชกกับเพื่อนร่วมทีมในสนามซ้อม`);chain('transferReq',2)}}]},
{id:'minutes',off:1,c:()=>S.p.trust<55,x:()=>`คุณรู้สึกว่าได้เวลาลงสนามน้อย จะทำยังไงกับโค้ช?`,o:[
 {l:'💪 ซ้อมหนักเงียบ ๆ พิสูจน์ตัวเอง',f:()=>{E('trust',5);E('stamina',-8);E(pick(Object.keys(AT)),1)}},
 {l:'🚪 เคาะประตูห้องโค้ชขอคุยตรง ๆ',f:()=>{if(chance(S.p.trust/100+.2)){E('trust',8);N('โค้ชสัญญาจะให้โอกาส')}else{E('trust',-5);N('"ถ้าอยากเล่น ก็เล่นให้ดีกว่านี้"')}}},
 {l:'📱 โพสต์สตอรี่ "บางคนไม่เห็นค่า"',f:()=>{E('trust',-10);E('fans',0.03);N('สื่อตีข่าวว่าคุณจิกกัดโค้ช')}}]},
{id:'podcast',off:1,x:()=>`ยูทูบเบอร์บอลดังชวนไปออกพอดแคสต์ เขาชอบถามเรื่องดราม่าในทีม`,o:[
 {l:'🎙️ ไปแบบระวังคำพูด',f:()=>{E('fans',0.06);E('money',5000)}},
 {l:'🍿 ไปเล่าความลับห้องแต่งตัวสนุก ๆ',f:()=>{E('fans',0.15);E('trust',-12);N('เพื่อนร่วมทีมเลิกคุยกับคุณ')}},
 {l:'🙅 ไม่ไป',f:()=>{E('trust',1)}}]},
{id:'fix',off:1,c:()=>S.season>=1||S.week>4,x:()=>`ชายแปลกหน้าในรถตู้ดำ: "นัดหน้าโดนใบเหลืองนาทีที่ 20 รับไปเลยห้าแสน ไม่มีใครรู้"`,o:[
 {l:'🚔 แจ้งสมาคมฯ ทันที',f:()=>{E('fans',0.08);E('ref',10);E('trust',5);news(`${S.p.name} แจ้งเบาะแสล้มบอล ได้รับคำชื่นชม`)}},
 {l:'🙅 ปฏิเสธแล้วเดินหนี',f:()=>{E('morale',-1)}},
 {l:'💰 รับเงิน...',f:()=>{E('money',500000);chain('fixCaught',rnd(2,6));N('คุณนอนไม่หลับทั้งคืน')}}]},
{id:'fixCaught',off:1,c:()=>false,x:()=>`🚨 ตำรวจและสมาคมบุกสโมสร! การสอบสวนล้มบอลพบชื่อคุณในบัญชีเงินโอน`,o:[
 {l:'😢 สารภาพทั้งหมด',f:()=>{ban(20,'พัวพันล้มบอล');fine(600000);E('fans',-0.5);S.p.terminate=1}},
 {l:'⚖️ จ้างทนายสู้คดี',f:()=>{E('money',-200000);if(chance(.35)){N('หลักฐานไม่พอ รอดหวุดหวิด!');E('fans',-0.2)}else{ban(30,'ล้มบอล (ศาลตัดสิน)');S.p.terminate=1;E('fans',-0.6)}}}]},
{id:'charity',off:1,x:()=>`มูลนิธิเด็กด้อยโอกาสชวนไปสอนฟุตบอลวันหยุด ซึ่งเป็นวันพักวันเดียวของคุณ`,o:[
 {l:'⚽ ไปด้วยใจ',f:()=>{E('fans',0.06);E('morale',4);E('stamina',-6);E('media',8)}},
 {l:'💵 บริจาคเงินแทน',f:()=>{E('money',-20000);E('fans',0.02);E('media',4)}},
 {l:'😴 ขอพัก',f:()=>{E('stamina',6)}}]},
{id:'gf',off:1,x:()=>`แฟนสาวคุณโพสต์ตัดพ้อใน IG "บางคนรักฟุตบอลมากกว่าคน" คนแห่คอมเมนต์ถามว่าเลิกกันหรือเปล่า`,o:[
 {l:'💐 ไปง้อพร้อมดอกไม้',f:()=>{E('morale',5);E('money',-5000)}},
 {l:'📱 โพสต์ตอบโต้กลับ',f:()=>{E('morale',-6);E('fans',0.05);E('media',-6);N('ดราม่ายาว 3 วัน ขึ้นหน้าเพจข่าวบันเทิง')}},
 {l:'🤐 เงียบ โฟกัสฟุตบอล',f:()=>{E('morale',-3);E('trust',2)}}]},
{id:'food',off:1,x:()=>`นักโภชนาการให้กินอกไก่กับบร็อคโคลี แต่ร้านหมูกระทะเจ้าโปรดเปิดใหม่หน้าหอ`,o:[
 {l:'🥦 คุมอาหารเคร่งครัด',f:()=>{E('phy',1);E('morale',-2)}},
 {l:'🥓 หมูกระทะสักมื้อ',f:()=>{E('morale',4);if(chance(.3))E('stamina',-6)}},
 {l:'🍜 ยัดบุฟเฟ่ต์ทุกคืน',f:()=>{E('phy',-2);E('pac',-1);E('morale',6);E('trust',-4)}}]},
{id:'owner',off:1,x:()=>`แฟนบอลรวมตัวประท้วงเจ้าของสโมสรที่ไม่ยอมลงทุน ชวนคุณออกมายืนข้างพวกเขา`,o:[
 {l:'✊ ออกไปยืนกับแฟน',f:()=>{E('fans',0.1);E('trust',-6);N('เจ้าของสโมสรจดชื่อคุณไว้')}},
 {l:'🤐 ไม่ยุ่งการเมืองสโมสร',f:()=>{E('fans',-0.01)}},
 {l:'🗞️ ให้สัมภาษณ์เข้าข้างเจ้าของ',f:()=>{E('fans',-0.08);E('trust',4);E('money',20000)}}]},
{id:'sulkMedia',off:1,c:()=>false,x:()=>`📺 รายการวิเคราะห์บอลเปิดคลิปท่าทีหงุดหงิดของคุณตอนโดนเปลี่ยนตัวซ้ำไปมา "นี่คือนักเตะที่ไม่เป็นมืออาชีพ"`,o:[
 {l:'🙇 โพสต์ขอโทษโค้ชและทีม',f:()=>{E('trust',6);E('fans',-0.01)}},
 {l:'😤 "ผมแค่อยากชนะ ผิดตรงไหน"',f:()=>{E('fans',0.04);E('trust',-5)}}]},
{id:'transferReq',off:1,c:()=>false,x:()=>`ความสัมพันธ์กับโค้ชตึงสุดขีด คุณโดนดองไว้ข้างสนาม เอเยนต์ถามว่า "จะยื่นขอย้ายทีมไหม?"`,o:[
 {l:'📝 ยื่นขอย้ายทีมทันที',f:()=>{E('trust',-10);S.p.wantOut=1;N('สโมสรประกาศขายคุณ! ข้อเสนอจะเข้ามาเร็ว ๆ นี้');news(`${S.p.name} ยื่นหนังสือขอย้ายทีม!`)}},
 {l:'🙇 ไปขอโทษโค้ชตัวต่อตัว',f:()=>{E('trust',18);S.p.benched=0;N('โค้ช: "ดี ทีนี้ไปพิสูจน์ในสนาม"')}},
 {l:'🧊 เงียบ ซ้อมหนักพิสูจน์',f:()=>{E('trust',6);E('stamina',-8)}}]},
{id:'scandal',off:1,c:()=>false,x:()=>`🔥 ข่าวฉาวของคุณลามขึ้นหน้าหนึ่งทุกสำนัก สปอนเซอร์เริ่มโทรมา...`,o:[
 {l:'🎤 แถลงข่าวขอโทษน้ำตาซึม',f:()=>{E('fans',0.03);E('money',-50000);N('สปอนเซอร์ถอนตัวเจ้าหนึ่ง แต่ภาพลักษณ์ดีขึ้น')}},
 {l:'🕶️ หายเงียบ ปิดโซเชียล',f:()=>{E('morale',-8);E('money',-100000)}},
 {l:'😎 "Bad publicity is still publicity"',f:()=>{E('fans',0.1);E('money',-150000);E('trust',-10)}}]},
{id:'thai',off:1,c:()=>ovr()>=NAT()[2]&&!S.p.called,x:()=>`${NF()} สมาคมฟุตบอล${NN()}เรียกตัวคุณติดทีมชาติ${NN()}ชุดใหญ่!${foreign()?' ต้องบินข้ามทวีปกลับไปรายงานตัว':''} แต่ช่วงนั้นสโมสรมีเกมสำคัญ`,o:[
 {get l(){return NF()+' รับใช้ชาติ!'},f:()=>{S.p.called=1;S.p.caps++;E('fans',0.25);E('morale',10);E('stamina',-10);if(chance(.3+sk('sho')*.4)){S.p.ig++;N(`ยิงประตูให้ทีมชาติ${NN()}!! คนทั้งประเทศเรียกชื่อคุณ`)}else N('ได้ลงเล่นให้ทีมชาติครั้งแรก ภูมิใจที่สุดในชีวิต');news(`${NF()} ${S.p.name} ติดธงทีมชาติ${NN()}!`)}},
 {l:'🏟️ ขอโฟกัสสโมสร',f:()=>{E('trust',6);E('fans',-0.1);N(`แฟนบอล${NN()}บางส่วนผิดหวัง`)}}]},
{id:'raise',off:1,c:()=>S.p.sg>=4,x:()=>`ฟอร์มคุณร้อนแรง เอเยนต์บอกว่าถึงเวลาขอขึ้นเงินเดือน`,o:[
 {l:'💼 ขอขึ้น 20%',f:()=>{if(chance(.6)){const x=Math.round(S.p.wage*.2);S.p.wage+=x;CONS.push(`💰 ค่าเหนื่อย +฿${fmt(x)}/สัปดาห์`)}else{E('trust',-4);N('บอร์ดปฏิเสธ')}}},
 {l:'💎 ขอขึ้น 80% ไม่งั้นไม่ซ้อม',f:()=>{if(chance(.2)){const x=Math.round(S.p.wage*.8);S.p.wage+=x;CONS.push(`💰 ค่าเหนื่อย +฿${fmt(x)}`)}else{E('trust',-15);E('fans',-0.05);S.p.benched=1;N('สโมสรไม่ยอม! ดองยาว')}}},
 {l:'🙂 ยังไม่ขอ รอจบฤดูกาล',f:()=>{E('trust',3)}}]},
{id:'ref',off:1,c:()=>S.p.ref<35,x:()=>`ผู้ตัดสินรุ่นใหญ่ให้สัมภาษณ์ว่า "นักเตะบางคนชอบตบตากรรมการ" ทุกคนรู้ว่าหมายถึงคุณ`,o:[
 {l:'🤝 ขอพบคณะกรรมการผู้ตัดสินเพื่อปรับความเข้าใจ',f:()=>{E('ref',12)}},
 {l:'🗯️ ตอบกลับว่า "กรรมการเมืองนี้ห่วย"',f:()=>{E('ref',-10);fine(30000);E('fans',0.03)}}]},
{id:'gaming',off:1,x:()=>`คืนนี้คุณติดเกมออนไลน์กับเพื่อน ๆ ในทีม จะเล่นถึงกี่โมง?`,o:[
 {l:'🎮 ชั่วโมงเดียวแล้วนอน',f:()=>{E('morale',3);E('trust',1)}},
 {l:'🌙 ยันตีสี่',f:()=>{E('morale',5);E('stamina',-15)}},
 {l:'📺 สตรีมให้แฟนดู',f:()=>{E('fans',0.05);E('stamina',-6);E('money',3000)}}]},
{id:'youth',off:1,x:()=>`นักเตะดาวรุ่งอายุ 17 ในทีมขอให้คุณช่วยสอนเทคนิค แต่เขาเล่นตำแหน่งเดียวกับคุณ`,o:[
 {l:'👨‍🏫 สอนเต็มที่',f:()=>{E('trust',5);E('morale',2);if(chance(.3))N('อนาคตเขาอาจแย่งตำแหน่งคุณ...')}},
 {l:'😏 สอนแบบผิด ๆ',f:()=>{E('trust',-6);N('โค้ชเห็นทุกอย่าง')}}]},
];
// ===== FOOTBALL MOMENTS (choice cards) =====
const ATK=()=>S.p.pos!=='DF'||chance(.25), DEF=()=>S.p.pos==='DF'||(S.p.pos==='MF'&&chance(.5))||chance(.12);
const F=(l,at,b,k,g,rs=g==='goal'?1:g==='assist'?.7:.3,rf=-.3)=>({l,at,b,k,g,rs,rf});
const FM=[
 ['vol',ATK,M=>`ลูกครอสลอยข้ามหัวกองหลังมาหน้ากรอบ บอลกำลังตกพอดีจังหวะวอลเลย์!`,[F('วอลเลย์เต็มข้อ','sho',5,.55,'goal',1.1),F('จับบอลลงพื้นก่อนยิง','dri',10,.45,'goal',.9),F('ทำบอลให้เพื่อนที่ว่างกว่า','pas',20,.5,'assist')]],
 ['fk',ATK,M=>`ฟรีคิกระยะ 22 หลา ตรงหน้าประตูพอดี กำแพง 5 คน`,[F('ยิงโค้งข้ามกำแพง','sho',0,.45,'goal',1.2,-.1),F('ยิงเรียดลอดกำแพง','sho',5,.35,'goal',1.0,-.2),F('ลูกตัดเสาสองให้เพื่อนโหม่ง','pas',10,.45,'assist')]],
 ['cut',ATK,M=>`คุณรับบอลริมเส้นขวา กองหลังถอยหลังไปเรื่อย ๆ ช่องตัดเข้าในเปิดอยู่`,[F('ตัดเข้าในยิงโค้งเสาไกล','sho',5,.5,'goal'),F('เลี้ยงหลบอีกคนแล้วยิง','dri',0,.5,'goal',1.2,-.4),F('ชิพบอลให้เพื่อนเสาสอง','pas',15,.5,'assist')]],
 ['crs',()=>S.p.pos!=='DF',M=>`ทะลุถึงเส้นหลัง! กองหน้าเพื่อนคุณ 2 คนรออยู่ในกรอบ`,[F('เปิดโด่งเสาสอง','pas',10,.55,'assist'),F('ตวัดเรียดหน้าประตู','pas',15,.5,'assist'),F('ยิงเองมุมแคบ','sho',0,.3,'goal',1.2,-.4)]],
 ['thru',()=>S.p.pos!=='FW'||chance(.4),M=>`คุณได้บอลกลางสนาม เห็นกองหน้าเริ่มวิ่งทะลุแนวรับ`,[F('จ่ายทะลุช่องให้กองหน้า','pas',10,.6,'assist',.8),F('วันทูกับเพื่อนแล้วยิงเอง','dri',0,.45,'goal',1.0),F('จ่ายข้างเล่นปลอดภัย','pas',55,.4,null,.1,-.1)]],
 ['1v1',ATK,M=>`ลูกทะลุช่องมาพอดีเท้า! คุณหลุดเดี่ยวกับผู้รักษาประตู ${M.opp}`,[F('ยิงเรียดเข้ามุม','sho',15,.6,'goal'),F('ชิพข้ามผู้รักษาประตู','sho',5,.55,'goal',1.2,-.5),F('หลบผู้รักษาประตูแล้วแตะเข้า','dri',5,.55,'goal',1.1,-.5)]],
 ['head',()=>true,M=>`ลูกเตะมุม! บอลโด่งมาที่จุดโทษ คุณกระโดดสูงกว่าทุกคน`,[F('โหม่งกดลงพื้น','phy',0,.5,'goal'),F('สะบัดหัวเสาไกล','sho',0,.4,'goal',1.1),F('โหม่งชงให้เพื่อน','pas',10,.4,'assist')]],
 ['pen',()=>false,M=>`จุดโทษ! ทั้งสนามเงียบกริบ ลูกอยู่ในมือคุณ`,[F('ยิงเข้ามุมล่าง','sho',40,.5,'goal',.8,-.7),F('อัดกลางเต็มแรง','phy',40,.45,'goal',.8,-.7),F('ปาเนนก้าสุดเท่','sho',20,.5,'goal',1.3,-1.2)]],
 ['long',()=>true,M=>`บอลกระดอนมาหน้าเท้าคุณ ห่างประตู 30 หลา ไม่มีใครประกบ`,[F('ซัดไกลสุดแรง','sho',-5,.4,'goal',1.4,-.2),F('เปิดบอลยาวให้ปีก','pas',10,.4,'assist'),F('เคาะคืนหลัง','pas',70,.3,null,.05,0)]],
 ['cnt',ATK,M=>`สวนกลับเร็ว 2 ต่อ 1! เหลือกองหลังคนเดียวขวางอยู่`,[F('จ่ายให้เพื่อนจังหวะสุดท้าย','pas',15,.55,'assist'),F('ยิงเองเลย','sho',5,.5,'goal'),F('สปรินต์แซงกองหลัง','pac',5,.5,'goal',1.1,-.4)]],
 ['tap',ATK,M=>`เพื่อนยิงชนเสา! บอลกระดอนออกมาในกรอบหกหลา`,[F('พุ่งแทงซ้ำ','pac',20,.5,'goal',.8,-.3),F('ไซด์โวลเลย์ทันที','sho',10,.45,'goal',.9,-.3)]],
 ['solo',()=>S.p.pos!=='DF',M=>`คุณได้บอลหน้ากรอบ ข้างหน้ามีกองหลังสองคน`,[F('ลากเข้าไปยิงเอง','dri',-5,.45,'goal',1.3,-.3),F('เลี้ยงผ่านแล้วตัดกลับให้เพื่อน','dri',5,.45,'assist'),F('ประคองรอเพื่อนขึ้น','phy',40,.4,null,.2,-.1)]],
 ['blk',DEF,M=>`กองหน้า ${M.opp} หลุดเข้ามาในกรอบ ง้างเท้าจะยิง!`,[F('สไลด์บล็อก','def',10,.6,'stop',.5,-.3),F('ยืนตำแหน่งบีบมุม','def',20,.5,'stop',.4,-.2),F('ดึงเสื้อฟาวล์แท็กติก','def',50,.3,'foul',.1,-.1)]],
 ['air',DEF,M=>`${M.opp} ได้เตะมุม เป้าหมายตัวสูง 190 ซม. อยู่ใกล้คุณ`,[F('กระโดดโหม่งสกัด','phy',10,.55,'stop',.4,-.3),F('ประกบตัวแนบ','def',15,.5,'stop',.4,-.3)]],
 ['int',DEF,M=>`คู่แข่งต่อบอลกลางสนาม คุณอ่านทางจ่ายออก`,[F('ตัดบอลแล้วเปิดยาวทันที','pas',5,.45,'assist',.7,-.2),F('เข้าบอลแย่งจังหวะ','def',15,.55,'stop',.4,-.2)]],
];
const FAILT={goal:['ยิงข้ามคาน','ผู้รักษาประตูเซฟได้!','ชนเสา!!','กองหลังบล็อกทัน'],assist:['เพื่อนจบไม่ลง','บอลแรงเกินไป','โดนตัดบอล'],stop:['คู่แข่งยิงเข้า!'],foul:['กรรมการให้ใบเหลือง'],null:['เสียบอลง่าย ๆ']};
FM.forEach(([id,c,x,o])=>EV.push({id,fm:1,m:1,c,x,o}));
const EVM=Object.fromEntries(EV.map(e=>[e.id,e]));
// ===== TIME (Asia/Bangkok) =====
const HR=3600e3,MIN=60e3,DAY=24*HR,TZ=7*HR,NR=28;
const now=()=>S&&S.gameT?S.gameT:Date.now();
const bday=t=>Math.floor((t+TZ)/DAY)*DAY-TZ, dkey=t=>Math.floor((t+TZ)/DAY);
const bk=(y,m,d,h=0)=>Date.UTC(y,m,d)+h*HR-TZ, ymd=t=>{const d=new Date(t+TZ);return[d.getUTCFullYear(),d.getUTCMonth(),d.getUTCDate()]};
const fdt=t=>new Date(t).toLocaleString('th-TH',{timeZone:'Asia/Bangkok',weekday:'short',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})+' น.';
const KOH={ENG:[19,21,22.5],ESP:[20,22,23],ITA:[20,22,23],GER:[20,21.5,23],FRA:[20,22,23],JPN:[12,14,17],KSA:[21,22,23],THA:[18,19,20]};
function cdown(ms){if(ms<=0)return'ถึงเวลาแข่งแล้ว!';const d=Math.floor(ms/DAY),h=Math.floor(ms%DAY/HR),m=Math.floor(ms%HR/MIN),s=Math.floor(ms%MIN/1000);return (d?d+' วัน ':'')+String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')}
function makeSchedule(start,country){let[y,m]=ymd(start);if(m===5||m===6||(m===4&&ymd(start)[2]>1)){start=bk(m>=5?y:y,7,8,12)}[y,m]=ymd(start);
 const end=bk(m>=7?y+1:y,4,24);const H=KOH[country]||KOH.ENG;const d0=bday(start),gap=Math.max(1,Math.floor((bday(end)-d0)/DAY/(NR-1)));const ko=[];
 let first=null;for(const h of H){if(d0+h*HR>start+20*MIN){first=d0+h*HR;break}}if(!first)first=d0+DAY+H[0]*HR;ko.push(first);
 for(let k=1;k<NR;k++)ko.push(bday(first)+k*gap*DAY+pick(H)*HR);return ko}
// ===== FIXTURES / TABLE =====
function rr(n){const t=[...Array(n).keys()],rounds=[];for(let r=0;r<n-1;r++){const m=[];for(let i=0;i<n/2;i++){m.push(r%2?[t[n-1-i],t[i]]:[t[i],t[n-1-i]])}rounds.push(m);t.splice(1,0,t.pop())}return rounds.concat(rounds.map(r=>r.map(([a,b])=>[b,a])))}
function freshTable(){S.fix=rr(8).concat(rr(8));S.table=Array.from({length:8},(_,i)=>({i,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}));S.log=[]}
function newSeason(start){freshTable();S.ko=makeSchedule(start||now(),S.club?S.club.c:S.startC);S.N=NR;S.week=0;const y=ymd(S.ko[NR-1])[0];S.slabel=`${y-1}/${String(y).slice(2)}`;S.p.sg=0;S.p.sa=0;S.p.app=0;S.p.sapp=0;S.p.yc=0;S.p.called=0}
function newSeasonKeep(){const w=S.week;freshTable();for(let k=0;k<w;k++){S.fix[k].forEach(([x,y])=>rec(x,y,pois(1.3),pois(1.2)));S.log[k]='—'}}
const pois=l=>{let L=Math.exp(-Math.max(.1,l)),k=0,p=1;do{k++;p*=R()}while(p>L);return k-1};
function rec(a,b,ga,gb){const A=S.table[a],B=S.table[b];A.p++;B.p++;A.gf+=ga;A.ga+=gb;B.gf+=gb;B.ga+=ga;if(ga>gb){A.w++;A.pts+=3;B.l++}else if(ga<gb){B.w++;B.pts+=3;A.l++}else{A.d++;B.d++;A.pts++;B.pts++}}
const sorted=()=>[...S.table].sort((x,y)=>y.pts-x.pts||(y.gf-y.ga)-(x.gf-x.ga)||y.gf-x.gf);
// ===== NEW GAME =====
function newGame(name,pos,c){const w=genWorld();
 const base={pac:50,sho:50,pas:50,dri:50,def:50,phy:50};for(const k in base)base[k]=rnd(44,56)+Math.round(W[pos][k]*25);
 const ry=new Date().getFullYear()-(new Date().getMonth()<5?1:0);S={gameT:bk(ry,7,1,9),world:w,club:null,startC:c,season:1,abs:0,news:[],chains:[],log:[],devOff:0,lastT:Date.now(),evDay:dkey(Date.now()),
  p:{name,pos,age:16,a:base,stamina:90,morale:65,trust:50,ref:55,media:50,fans:300,money:10000,wage:0,contract:2,ban:0,inj:0,yc:0,rc:0,fines:0,tg:0,ta:0,sg:0,sa:0,app:0,caps:0,ig:0,benched:0,agent:0,trainDay:-1}};
 newSeason(bk(ry,7,8,9));save()}
// ===== UI =====
function bar(v,cls=''){return `<div class="bar ${cls}"><i style="width:${cl(v)}%"></i></div>`}
function setup(){let pos='FW',c='ENG',nat='THA';const av=Object.assign({},DAV);const draw=()=>{$('#app').innerHTML=`
 <div style="text-align:center;padding:30px 0 10px"><div style="font-size:54px">⚽</div><h1>เส้นทางแข้ง</h1><div class="or" style="font-weight:800;letter-spacing:3px">FOOTBALL LIFE</div><p class="mu">จากเด็กบ้านนอก สู่ซูเปอร์สตาร์ ทุกการตัดสินใจมีราคา</p></div>
 <div class="card"><h2>ชื่อนักเตะ</h2><input id="nm" maxlength="20" placeholder="เช่น ชนาธิป จ." value="${$('#nm')?.value||''}">
 <h2>สัญชาติ</h2><select id="nat">${Object.entries(NATS).map(([k,[f,n]])=>`<option value="${k}" ${k===nat?'selected':''}>${f} ${n}</option>`).join('')}</select>
 <h2>หน้าตานักเตะ</h2><div class="card" style="background:var(--card2)">${avEditor(av)}</div>
 <h2>ตำแหน่ง</h2><div class="chips">${Object.entries(POS).map(([k,v])=>`<div class="chip ${k===pos?'on':''}" data-pos="${k}">${v}</div>`).join('')}</div>
 <h2>เลือกลีกเริ่มต้น</h2><div class="chips">${Object.entries(LEAGUES).map(([k,L])=>`<div class="chip ${k===c?'on':''}" data-c="${k}">${L.f} ${L.n}</div>`).join('')}</div>
 <p class="mu" style="margin-top:10px">คุณจะเริ่มที่สโมสรเล็กใน <b class="or">${LEAGUES[c].tiers.at(-1)[0]}</b> ลีกล่างสุดของ${LEAGUES[c].n} — ย้ายข้ามลีกได้ภายหลัง และติดทีมชาติ${NATS[nat][1]} ${NATS[nat][0]} ได้เมื่อ OVR ${NATS[nat][2]}+${nat!==c&&NATS[c]?' · คุณจะเป็นนักเตะต่างชาติในลีกนี้ 🌍':''}</p>
 <button class="btn" id="go">เริ่มอาชีพ</button></div>`;
 $('#nat').onchange=e=>{nat=e.target.value;draw()};bindAe(av,draw);
 document.querySelectorAll('[data-pos]').forEach(e=>e.onclick=()=>{pos=e.dataset.pos;draw()});
 document.querySelectorAll('[data-c]').forEach(e=>e.onclick=()=>{c=e.dataset.c;draw()});
 $('#go').onclick=()=>{const n=$('#nm').value.trim()||'ไบคัง';newGame(n,pos,c);S.p.nat=nat;S.p.av=av;save();TAB='home';render();offers(false,c)}};
 $('#tabs').innerHTML='';draw()}
function tabs(){if(S&&S.p)PI();const T=[['home','🏠','หน้าหลัก'],['table','🏆','ตาราง'],['me','👤','นักเตะ'],['news','📰','ข่าว'],['life','💎','ไลฟ์สไตล์'],['career','💼','อาชีพ']];
 $('#tabs').innerHTML=T.map(([k,i,l])=>`<button class="${TAB===k?'on':''}" data-t="${k}"><span style="position:relative">${i}${k==='me'&&S.p.sp?`<i class="badge">${S.p.sp}</i>`:''}</span>${l}</button>`).join('');
 document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{const ch=TAB!==b.dataset.t;TAB=b.dataset.t;render();if(ch&&$('#app'))$('#app').scrollTop=0})}
function header(){const c=club(),L=S.club?LEAGUES[S.club.c]:null,p=S.p;AVI();const mb=(ic,lb,v,cl2)=>`<div class="hb"><div class="hbl"><span>${ic} ${lb}</span><b>${Math.round(v)}</b></div><div class="bar ${cl2}"><i style="width:${cl(v,0,100)}%"></i></div></div>`;return `<div class="card hdr"><div class="row sp" style="gap:10px">${avatarSVG(S.p.av,56)}<div style="flex:1;min-width:0"><h1 class="hn">${p.name}</h1><div class="mu hs">${POS[p.pos]} · ${p.age} ปี · ${c?L.f+' '+c.n:'ไร้สังกัด'}</div></div><div style="text-align:right"><div class="ovr2" id="ovrb">${ovr()}<span>OVR</span></div><div class="ye" style="font-size:13px;margin-top:4px">฿${fmt(p.money)}</div></div></div><div class="row hbars">${mb('⚡','สแตมิน่า',p.stamina,p.stamina<30?'r':'')}${mb('😊','ขวัญ',p.morale,p.morale<30?'r':'')}${mb('🤝',S.club&&p.tt!=null?'โค้ช · '+TT[p.tt].split('/')[0]:'โค้ช',p.trust,'o')}</div></div>`}
const COACH=[['🛡️ เน้นวินัย','ไม่ชอบนักเตะเกเร'],['🚀 บุกสุดตัว','ชอบนักเตะสร้างสรรค์'],['🧓 พ่อพระ','ใจดี ให้โอกาสเด็ก'],['🔥 เผด็จการ','เปลี่ยนตัวไว ด่าแรง'],['📊 สายแท็กติก','ชอบคนทำตามแผน']];
const ROLE={star:['ตัวจริง','g',62],rot:['สำรอง','',38],kid:['ดาวรุ่ง','o',50]};
function hue(n){let h=0;for(const ch of n)h=(h*31+ch.charCodeAt(0))%360;return h}
function genOffers(country,end){const o=ovr(),all=[],PF=perfOf(end),cur=S.club?tierOf(S.club.c,S.club.t).str:null;for(const c in S.world){if(country&&c!==country)continue;S.world[c].forEach((t,ti)=>all.push({c,ti,t}))}
 const allowF=PF.bump>=3&&chance(.3);const cap=cur!=null?cur+(PF.has?PF.bump:0):o+2;let fit=all.filter(x=>(x.t.str<=cap||(S.club&&PF.bump>=2&&x.c===S.club.c&&x.ti===S.club.t-1))&&x.t.str>=o-16&&!(S.club&&x.c===S.club.c&&x.ti===S.club.t&&!S.p.wantOut)&&(!S.club||x.c===S.club.c||allowF));if(!fit.length&&S.club)fit=[{c:S.club.c,ti:S.club.t,t:tierOf(S.club.c,S.club.t)}];
 let WK=null;if(country){const T=S.world[country];fit=[{c:country,ti:T.length-1,t:T.at(-1)}];WK=T.at(-1).clubs.map((c,i)=>[c.s,i]).sort((a,b)=>a[0]-b[0]).slice(0,4).map(x=>x[1])}
 const n=country?4:S.p.agent?4:rnd(2,3),res=[],used=new Set();
 for(let k=0;k<n*3&&res.length<n&&fit.length;k++){const x=country?fit[0]:pick(fit);const i=country?WK[res.length]:rnd(0,7),key=x.c+x.ti+'-'+i;if(used.has(key)||(S.club&&x.c===S.club.c&&x.ti===S.club.t&&i===S.club.i))continue;used.add(key);
  const cb=x.t.clubs[i];if(country)cb.s=Math.min(cb.s,x.t.str-1);if(!country&&cur!=null&&cb.s>cap+3)continue;const gap=cb.s-o;let role=gap>8?(S.p.age<22?'kid':'rot'):gap>2?pick(['rot','kid','star']):'star';if(S.p.age<=19&&role==='star'&&!(PF.bump>=4&&gap<-3&&chance(.4)))role=chance(.6)?'kid':'rot';if(country)role=(res.length===0&&chance(.5))?'star':(chance(.6)?'kid':'rot');
  const w=Math.round(wage(x.c,x.ti)*(.7+R()*.6)*(country?({star:.75,kid:1,rot:1.05}[role]):(role==="star"?1.15:role==="kid"?.75:1))*(country?.6:1)/10)*10;
  res.push({c:x.c,t:x.ti,i,wage:w,yrs:rnd(1,4),role,coach:rnd(0,COACH.length-1),bonus:chance(.5)?Math.round(w*rnd(2,8)/100)*100:0,fans:Math.round(Math.pow(cb.s-30,2.6)*3)})}
 if(S.club&&!country){let f=0;for(let k=res.length-1;k>=0;k--)if(res[k].c!==S.club.c&&(++f>1||res.length>1&&k===0&&f===res.length))res.splice(k,1)}res.why=country?'':PF.why;return res}
function offerCard(o,k){const t=tierOf(o.c,o.t),L=LEAGUES[o.c],cb=t.clubs[o.i],h=hue(cb.n),r=ROLE[o.role],co=COACH[o.coach];
 if(o.gone)return `<div class="card" style="opacity:.45"><b>${cb.n}</b><p class="re">❌ ถอนข้อเสนอแล้ว</p></div>`;
 return `<div class="card"><div class="row"><div style="width:46px;height:46px;border-radius:50%;flex:none;background:conic-gradient(hsl(${h},70%,45%) 0 50%,hsl(${(h+150)%360},70%,55%) 0);border:3px solid #fff2;display:grid;place-items:center;font-weight:800">${cb.n.replace(/^(Real|Atlético|CD|UD|Deportivo|SD|Racing|CF|AC|US|FC|SS|Calcio|Virtus|Sporting|Inter|SV|VfB|TSV|Borussia|Fortuna|SC|1\. FC|Olympique|AS|Stade|RC) /,'')[0]}</div>
 <div style="flex:1"><b style="font-size:17px">${L.f} ${cb.n}</b><div class="mu">${L.f} ${t.n} ${ltag(o.c,o.t)}</div></div><span class="tag ${r[1]}">${r[0]}</span></div>
 <div class="grid2" style="margin-top:10px;gap:6px"><div class="mini"><span class="mu">พลังทีม</span><b>${cb.s}</b>${bar(cb.s)}</div><div class="mini"><span class="mu">ค่าเหนื่อย/สัปดาห์</span><b class="ye">฿${fmt(o.wage)}</b></div>
 <div class="mini"><span class="mu">สัญญา</span><b>${o.yrs} ปี</b></div><div class="mini"><span class="mu">ฐานแฟนบอล</span><b>${fmt(o.fans)}</b></div></div>
 <p class="mu" style="margin-top:8px">โค้ช: <b style="color:var(--tx)">${co[0]}</b> · ${co[1]}${o.bonus?` · <span class="ye">เงินเซ็นสัญญา ฿${fmt(o.bonus)}</span>`:''}</p>
 <div class="row"><button class="btn" style="flex:2" data-of="${k}">✍️ เซ็นเลย</button>${o.neg?'':`<button class="btn s" style="flex:1;text-align:center" data-ng="${k}">💬 ต่อรอง</button>`}</div>${o.msg?`<p class="${o.msgc}" style="margin-top:6px">${o.msg}</p>`:''}</div>`}
function avgR(){const r=S.p.rh||[];return r.length?r.reduce((a,b)=>a+b,0)/r.length:0}
function earned(){const p=S.p,c=club();if(!c)return true;if(p.listed)return true;const r=p.rh||[];return (p.sapp||0)>=8&&((r.length>=5&&avgR()>=7.0)||(p.sg+p.sa)>=5)}
function perfOf(end){const p=S.p,L=end&&p.lastS?p.lastS:{app:p.sapp||0,g:p.sg,a:p.sa,avg:avgR(),n:(p.rh||[]).length};const has=L.app>=8&&((L.n>=5&&L.avg>=7)||L.g+L.a>=5);
 const bump=has?cl((L.avg-6.8)*6+(L.g+L.a)*.4,0,6):0;const why=[];if(L.n)why.push(`เรตติ้งเฉลี่ย ${L.avg.toFixed(1)} ใน ${Math.min(5,L.n)} นัด`);if(L.g)why.push(`${L.g} ประตู`);if(L.a)why.push(`${L.a} แอสซิสต์`);why.push(`ลงเล่น ${L.app} นัด`);
 return{has,bump,why:has?'สนใจเพราะ: '+why.join(', '):'ยังไม่มีผลงานโดดเด่น — มีแค่ทีมระดับเดียวกันหรือต่ำกว่าที่สนใจ ('+why.join(', ')+')'}}
function offers(auto,country,list){if(!list&&!country&&S.club&&!earned()){if(auto){closeM();save();return render()}return sheet(`<h2>ข้อเสนอ</h2><p>ยังไม่มีสโมสรสนใจคุณ</p><p class="mu">ต้องลงเล่น 8+ นัดในฤดูกาลนี้ (ตอนนี้ ${S.p.sapp||0}) และ เรตติ้งเฉลี่ย 7.0+ ใน 5 นัดล่าสุด (ตอนนี้ ${avgR().toFixed(1)}) หรือ ยิง+แอสซิสต์ 5+ (ตอนนี้ ${S.p.sg+S.p.sa})</p><button class="btn" onclick="closeM()">ปิด</button>`)}list=list||genOffers(country);rebindOffers=()=>offers(auto,country,list);const first=!!country;
 if(!list.length){if(auto){closeM();save();return render()}return sheet(`<h2>ข้อเสนอ</h2><p>ยังไม่มีสโมสรสนใจ พัฒนาฝีเท้าก่อนนะ</p><button class="btn" onclick="closeM()">ปิด</button>`)}
 sheet(`<span class="tag o">${first?'เริ่มต้นอาชีพ':'ตลาดซื้อขาย'}</span><div class="row">${avatarSVG(S.p.av,56)}<h2>สโมสรที่สนใจคุณ</h2></div><p class="mu" style="margin-bottom:10px">${first?'เลือกสโมสรแรกในชีวิตค้าแข้ง — ทีมใหญ่อาจได้นั่งสำรอง ทีมเล็กได้เป็นตัวจริง':'ต่อรองได้ครั้งเดียวต่อทีม แต่ระวังเขาถอนตัว!'}</p><button class="chip" style="margin:0 0 10px;border:1px solid #ffd21f55;color:#ffd21f;background:none;font:inherit;font-size:13px" onclick="leagueInfo()">ℹ️ ดูระดับลีกทั้งหมด (ดาว · พลังทีม · ค่าเหนื่อย)</button>${list.why?`<p class="ye" style="margin-bottom:10px">📊 ${list.why}</p>`:''}${list.map(offerCard).join('')}${first?'':`<button class="btn s" id="stay" style="text-align:center">${S.club?'อยู่ทีมเดิม':'ปิด'}</button>`}`);
 document.querySelectorAll('[data-ng]').forEach(b=>b.onclick=()=>{const o=list[+b.dataset.ng];o.neg=1;
  if(chance(o.role==='star'?.3:.4)){o.gone=1;if(list.every(x=>x.gone))list.push(...genOffers(country))}else if(chance(.6)){o.wage=Math.round(o.wage*1.25/10)*10;o.bonus=Math.round((o.bonus||o.wage)*1.5/100)*100;o.msg='✅ ยอมขึ้นค่าเหนื่อย +25% และเพิ่มเงินเซ็นสัญญา!';o.msgc='gr'}else{o.msg='😐 "นี่คือข้อเสนอสุดท้ายแล้ว"';o.msgc='mu'}
  const y=$('.sheet').scrollTop;offers(auto,country,list);$('.sheet').scrollTop=y});
 document.querySelectorAll('[data-of]').forEach(b=>b.onclick=()=>{const o=list[+b.dataset.of];const old=club(),oldF=S.club?LEAGUES[S.club.c].f:'';S.club={c:o.c,t:o.t,i:o.i};S.hist=S.hist||[];S.hist.push({f:LEAGUES[o.c].f,n:club().n,d:tierOf(o.c,o.t).n,y:S.slabel||''});const p=S.p;p.wage=o.wage;p.contract=o.yrs;p.role=o.role;p.tt={kid:0,rot:1,star:3}[o.role];p.trust=cl(Math.round(42+(ovr()-tierOf(o.c,o.t).clubs[o.i].s)*1.5),15,55);p.coach=o.coach;p.wantOut=0;p.benched=0;p.listed=0;p.promise=null;p.canEsc=0;p.trained=0;if(o.bonus)p.money+=o.bonus;
  news(first?`✍️ ${p.name} เซ็นสัญญาอาชีพฉบับแรกกับ ${LEAGUES[o.c].f} ${club().n} (${LEAGUES[o.c].n} · ${tierOf(o.c,o.t).n} · ${ltxt(o.c,o.t)}) ในบทบาท${ROLE[o.role][0]}${o.c!==p.nat?` 🌍 นักเตะต่างชาติจาก${NN()} ${NF()}`:''}`:`✈️ ย้ายทีม! ${p.name} ${old?'จาก '+oldF+' '+old.n:''} สู่ ${LEAGUES[o.c].f} ${club().n} (${LEAGUES[o.c].n} · ${ltxt(o.c,o.t)}) บทบาท${ROLE[o.role][0]}`);p.num=0;p.numL='';newSeasonKeep();save();closeM();render();numPick(true)});
 $('#stay')&&($('#stay').onclick=()=>{closeM();save();render()})}
// ===== RENDER =====
let LIVE=null;
function render(){if(!S)return setup();if(LIVE)return drawLive();tick();injChk();tabs();const p=S.p;let h=header();
 if(TAB==='home'){const nx=nextFix(),t=now(),trained=p.trainDay===dkey(t);PI();
  if(nx){const ko=S.ko[S.week],ready=dkey(t)>=dkey(ko),dd=dkey(ko)-dkey(t);
   h+=`<div class="card mcard"><div class="row sp mu" style="font-size:13px"><span>📅 ${new Date(t).toLocaleDateString('th-TH',{timeZone:'Asia/Bangkok',weekday:'short',day:'numeric',month:'short'})}</span><span>นัดที่ ${S.week+1}/${S.N} · ${S.slabel}</span></div>
   <div class="row sp" style="margin:10px 0 4px;align-items:center"><div style="flex:1;min-width:0"><div class="mu" style="font-size:12px">${nx.home?'🏠 เหย้า':'✈️ เยือน'} · คู่แข่งพลัง ${nx.opp.s}</div><div class="mu" style="font-size:12px">${tierOf(S.club.c,S.club.t).n} ${ltag(S.club.c,S.club.t)}</div><b style="font-size:18px">vs ${LF()} ${nx.opp.n}</b><div class="mu" style="font-size:12px">🗓️ ${fdt(ko)}</div></div><div class="cdn ${ready?'live':''}">${ready?'วันแข่ง!':`<b>${dd}</b><span>วัน</span>`}</div></div>
   ${p.ban?`<div class="re">⛔ ติดแบน ${p.ban} นัด</div>`:p.inj?`<div class="re">🚑 บาดเจ็บ ${p.inj} นัด</div>`:p.benched?`<div class="ye">🪑 โค้ชอาจไม่ส่งคุณลงสนาม</div>`:''}</div>`}
  else if(!S.club)h+=`<div class="card"><h2>ไร้สังกัด</h2><p class="mu">คุณไม่มีสโมสร รอข้อเสนอ หรือไปวันถัดไป</p></div>`;
  h+=injCard();
  h+=`<button class="card trow" id="ab-tr2"><span>🏋️ การซ้อมวันนี้</span><span class="${trained?'gr':'ye'}">${trained?'✅ ซ้อมแล้ว':'ยังไม่ได้ซ้อม ›'}</span></button>`;
  if(S.club)h+=tierCard();
  const wm=WM(),wd=wm.l.filter(m=>m.d).length;
  h+=`<details class="card fold"><summary>🏆 ภารกิจประจำสัปดาห์ <span class="mu">${wd}/${wm.l.length}</span></summary>${wm.l.map(m=>`<div style="margin:8px 0"><div class="row sp"><span>${m.d?'✅':'⬜'} ${m.t}</span><span class="mu">${m.p}/${m.n}</span></div>${bar(m.p/m.n*100,m.d?'':'o')}</div>`).join('')}</details>`;
  h+=`<details class="card fold"><summary>📊 สถานะนักเตะ</summary><div class="grid2" style="margin-top:8px">${[['สตามิน่า',p.stamina,'gr'],['ขวัญกำลังใจ',p.morale,'gr'],['ความเชื่อใจโค้ช',p.trust,'or'],['กรรมการ',p.ref,'or']].map(([l,v,c])=>`<div class="mini"><span class="mu">${l}</span><b class="${v<30?'re':c}">${Math.round(v)}</b>${bar(v,v<30?'r':c==='or'?'o':'')}</div>`).join('')}<div class="mini"><span class="mu">ผู้ติดตาม</span><b>${fmt(p.fans)}</b></div><div class="mini"><span class="mu">เงิน</span><b class="${p.money<0?'re':'ye'}">฿${fmt(p.money)}</b></div></div><p class="mu" style="margin-top:6px">🔋 สตามิน่าฟื้น +12 ต่อวัน</p></details>`;
  h+=`<details class="card fold"><summary>📰 ข่าวล่าสุด</summary><div class="feed">${S.news.slice(0,5).map(n=>`<div>${n.t}<div class="mu">${n.w}</div></div>`).join('')}</div></details>`}
 if(TAB==='table'&&S.club){const T=tierOf(S.club.c,S.club.t);h+=`<div class="card"><h2>${T.n}</h2><table><tr><th>#</th><th>ทีม</th><th>น.</th><th>ช</th><th>ส</th><th>+/-</th><th>แต้ม</th></tr>${sorted().map((r,k)=>`<tr class="${r.i===S.club.i?'me':''}"><td>${k+1}</td><td>${LF()} ${T.clubs[r.i].n}</td><td>${r.p}</td><td>${r.w}</td><td>${r.l}</td><td>${r.gf-r.ga}</td><td><b>${r.pts}</b></td></tr>`).join('')}</table><p class="mu" style="margin-top:8px">อันดับ 1-2 เลื่อนชั้น · 2 อันดับสุดท้ายตกชั้น</p></div>`;
  h+=`<div class="card"><h2>โปรแกรม ${S.slabel}</h2>${S.fix.map((r,k)=>{const m=r.find(x=>x.includes(S.club.i));const o=m[0]===S.club.i?m[1]:m[0];return `<div class="row sp mu" style="padding:5px 0;font-size:13px;${k===S.week?'color:var(--or)':''}"><span>${k+1}. ${m[0]===S.club.i?'🏠':'✈️'} ${LF()} ${T.clubs[o].n}<br><small>${fdt(S.ko[k])}</small></span><b>${S.log[k]||''}</b></div>`}).join('')}</div>`}
 if(TAB==='me'){PI();h+=`<div class="card row">${avatarSVG(p.av,96)}<div style="flex:1"><b style="font-size:18px">${p.name}</b><div class="mu">${NF()} สัญชาติ${NN()} · ${POS[p.pos]}</div><button class="btn s" id="eav" style="text-align:center;padding:10px">✏️ แก้ไขอวตาร</button>${S.club?`<button class="btn s" style="text-align:center;padding:10px;margin-top:6px" onclick="numPick(false)">👕 ${S.p.num?'เบอร์ '+S.p.num+(S.p.numL?' ⭐':'')+' · ขอเปลี่ยนเบอร์':'เลือกเบอร์เสื้อ'}</button>`:''}</div></div>${S.club?tierCard():''}${fanCard()}<div class="card"><div class="row sp"><h2 style="margin:0">อัปสกิล</h2><span class="tag ${p.sp?'o':''}">⭐ ${p.sp} SP</span></div><p class="mu">Training LV ${p.tlv} · 1 SP = 1 ขั้น · ขั้นต่อ +1: &lt;60=2 · 60s=3 · 70s=4 · 80s=6 · 90s=8 · สูงสุด 99</p>${Object.entries(AT).map(([k,l])=>{const n=pipN(p.a[k]),pp=(p.ap||{})[k]||0,can=p.sp>=1&&p.a[k]<99;return `<div class="stat" style="grid-template-columns:80px 1fr 30px 62px"><span>${l}${W[p.pos][k]>=.2?' <span class="or">★</span>':''}</span><div>${bar(p.a[k])}<div class="pips">${Array.from({length:n},(_,i)=>`<i class="${i<pp?'on':''}"></i>`).join('')}</div></div><b>${p.a[k]}</b><button class="spb ${can?'':'dis'}" data-sp="${k}" ${can?'':'disabled'}>+ขั้น · 1SP</button></div>`}).join('')}<p class="mu" style="margin-top:6px">★ = ค่าพลังหลักของตำแหน่ง${POS[p.pos]} (มีผลต่อ OVR มาก)</p></div>
  <div class="card"><h2>เส้นทางอาชีพ</h2>${(S.hist||[]).length?S.hist.map(x=>`<div class="row sp" style="padding:5px 0;border-bottom:1px solid var(--line)"><span>${fixF(x.f)} <b>${x.n}</b> <span class="mu">${x.d}</span> ${ltagN(x.d)}</span><span class="mu">${x.y}</span></div>`).join(''):'<span class="mu">-</span>'}</div><div class="card"><h2>สถิติ</h2><div class="grid2">${[['ลงเล่นฤดูกาลนี้',p.app],['ประตู/แอสซิสต์',p.sg+' / '+p.sa],['ประตูรวมอาชีพ',p.tg],['ใบเหลือง/แดง',p.yc+' / '+p.rc],['ทีมชาติ'+NN(),p.caps+' นัด '+p.ig+' ประตู'],['ค่าปรับรวม','฿'+fmt(p.fines)],['ภาพลักษณ์สื่อ',p.media],['ค่าเหนื่อย/สัปดาห์','฿'+fmt(p.wage)]].map(([l,v])=>`<div class="mini"><span class="mu">${l}</span><b>${v}</b></div>`).join('')}</div></div>`}
 if(TAB==='life')h+=lifeHTML();
 if(TAB==='news')h+=`<h2>โซเชียล</h2>${(S.feed||[]).length?S.feed.map(postCard).join(''):'<div class="card mu">ยังไม่มีโพสต์ — ลงสนามแล้วโลกโซเชียลจะพูดถึงคุณ</div>'}<div class="card feed"><h2>ข่าวสโมสร</h2>${S.news.map(n=>`<div>${n.t}<div class="mu">${n.w}</div></div>`).join('')}</div>`;
 if(TAB==='career')h+=`<div class="card"><h2>สัญญา</h2><p>${club()?club().n:'-'} · เหลือ ${p.contract} ฤดูกาล · ฿${fmt(p.wage)}/สัปดาห์</p><p class="mu">${p.agent?'มีเอเยนต์ดูแล':'ไม่มีเอเยนต์'}${p.wantOut?' · ยื่นขอย้ายแล้ว':''}</p><button class="btn o" id="offers">🔎 ดูข้อเสนอย้ายทีม</button></div>
  <button class="card trow" id="cabb"><span>🏆 ตู้รางวัล & ความสำเร็จ</span><span class="ye">${(S.cab||[]).length} รางวัล ›</span></button><div class="card"><h2>💾 เซฟเกม <span class="mu" style="font-size:12px;float:right;text-transform:none">เวอร์ชัน v${APP_VER}</span></h2><p class="mu">เซฟอัตโนมัติ · ถ้าเล่นทั้งใน Safari และไอคอนหน้าจอโฮม ข้อมูลแยกกัน ใช้สำรอง/นำเข้าเพื่อย้าย</p><div class="row"><button class="btn s" style="flex:1;text-align:center" onclick="exportSave()">📤 สำรองเซฟ</button><button class="btn s" style="flex:1;text-align:center" onclick="importSave()">📥 นำเข้าเซฟ</button></div></div><div class="card"><h2>เป้าหมาย</h2><p>🏆 เล่นลีกสูงสุดของยุโรป · ${NF()} ติดทีมชาติ${NN()} (OVR ${NAT()[2]}+) · 💰 เศรษฐีลูกหนัง</p></div><button class="btn s" id="reset">🗑️ เริ่มอาชีพใหม่</button>`;
 h+=abar();$('#app').innerHTML=h;$('#ab-tr')&&($('#ab-tr').onclick=openTrain);$('#ab-tr2')&&($('#ab-tr2').onclick=openTrain);
 if(TAB==='life')lifeBind();$('#eav')&&($('#eav').onclick=editAvatar);document.querySelectorAll('[data-rp]').forEach(b=>b.onclick=()=>{const[i,k]=b.dataset.rp.split(':').map(Number);replyPost(i,k)});document.querySelectorAll('[data-sp]').forEach(b=>{if(b.classList.contains('spb'))b.onclick=()=>{const k=b.dataset.sp;if(p.sp<1||p.a[k]>=99)return;p.sp--;p.ap=p.ap||{};p.ap[k]=(p.ap[k]||0)+1;if(p.ap[k]>=pipN(p.a[k])){p.ap[k]=0;p.a[k]++;toast(`📈 ${AT[k]} ขึ้นเป็น ${p.a[k]}!`)}save();render()}});$('#play')&&($('#play').onclick=playMatch);$('#wait')&&($('#wait').onclick=()=>{if(S.news.length)S.abs++;offers(true,S.news.length?null:S.startC)});
 document.querySelectorAll('[data-tr]').forEach(b=>b.onclick=()=>train(b.dataset.tr));trainBind();
 $('#offers')&&($('#offers').onclick=()=>offers(false));$('#reset')&&($('#reset').onclick=()=>{if(confirm('ลบเซฟแล้วเริ่มใหม่?')){localStorage.removeItem('fl_save3');localStorage.removeItem('fl_save3_bak');idb(d=>{try{d.transaction('s','readwrite').objectStore('s').delete('save')}catch(e){}});S=null;render()}});
 $('#nd')&&($('#nd').onclick=()=>advance());$('#sk')&&($('#sk').onclick=skipToMatch);$('#cabb')&&($('#cabb').onclick=openCab);injBind();
 if(!$('#modal.show'))dailyEvent()}
// ===== REAL-TIME TICK =====
function tick(){const t=now(),p=S.p;const d=dkey(t)-dkey(S.lastT||t);if(d>0){p.stamina=cl(p.stamina+12*d);p.morale=cl(p.morale+(65-p.morale)*Math.min(1,d/5))}S.lastT=t;
 let n=0;while(S.week<S.N&&dkey(t)>dkey(S.ko[S.week])&&n++<NR){autoRound()}
 if(S.week>=S.N&&!$('#modal.show'))endSeason();save()}
function advance(){S.gameT=bday(S.gameT)+DAY+9*HR;render()}
function skipToMatch(){let n=0;while(n++<400){const nx=nextFix();if(nx&&dkey(now())>=dkey(S.ko[S.week]))break;if(!nx&&S.club)break;S.gameT=bday(S.gameT)+DAY+9*HR;tick();if(!S.club)break;if(!$('#modal.show')&&maybeDaily())break;if($('#modal.show'))break}render()}
function autoRound(){const nx=nextFix();if(!nx){S.fix[S.week].forEach(([x,y])=>rec(x,y,pois(1.3),pois(1.2)));S.week++;return}
 const p=S.p,M={opp:nx.opp.n,gf:0,ga:0,g:0,as:0,r:5.0,played:false,tl:[]};if(!(p.ban||p.inj||p.benched))M.missed=1;p.benched=0;finish(nx,M,'',true)}
function maybeDaily(){const t=now();if(LIVE||!S.club||S.evDay===dkey(t))return false;S.evDay=dkey(t);save();
 const due=S.chains.findIndex(c=>c.at<=S.abs);let ev=null;const summer=S.week===0&&S.ko[0]-t>10*DAY;
 if(due>=0){ev=EVM[S.chains[due].id];S.chains.splice(due,1)}else if(!summer&&chance(.42)){const pool=EV.filter(e=>e.off&&e.id!==S.lastOff&&!(S.recentOff||[]).includes(e.id)&&(!e.c||e.c()));ev=pool.length?pick(pool):null}
 if(ev&&ev.off){S.lastOff=ev.id;S.recentOff=[ev.id,...(S.recentOff||[])].slice(0,6);S.offN=(S.offN||0)+1}
 if(ev){showEvent(ev,null,()=>{closeM();save();render()});return true}return false}
function dailyEvent(){maybeDaily()}
const needXP=l=>60+l*30,spCost=v=>v<60?1:v<70?2:v<80?3:v<90?4:5;
function PI(){const p=S.p;if(p.sp==null){p.sp=3;p.txp=0;p.tlv=1}}
function addXP(x){const p=S.p;PI();if(!x)return;p.txp+=x;CONS.push(`✨ Training XP +${x}`);while(p.txp>=needXP(p.tlv)){p.txp-=needXP(p.tlv);p.tlv++;p.sp+=2;CONS.push(`🎉 Training LV ${p.tlv}! ได้ 2 สกิลพอยต์`)}}
function addSP(n,why){PI();S.p.sp+=n;CONS.push(`⭐ สกิลพอยต์ +${n}${why?' ('+why+')':''}`)}
function train(k){const p=S.p;CONS=[];
 if(k==='heavy'){addXP(40);E('stamina',-18);if(chance(.08)){p.inj=1;CONS.push('🚑 เจ็บจากการซ้อม 1 นัด')}}
 if(k==='skill'){addXP(25);E('stamina',-10)}
 if(k==='tactic'){addXP(20);E('trust',rnd(3,6));E('stamina',-4)}
 if(k==='rest'){E('stamina',25);E('morale',4)}
 p.trainDay=dkey(now());save();sheet(`<span class="tag g">ซ้อม</span><h2>ผลการซ้อม</h2><ul class="cons">${CONS.map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" onclick="closeM();render()">ตกลง</button>`)}
function sheet(h){$('#modal').innerHTML=`<div class="sheet">${h}</div>`;$('#modal').classList.add('show')}
function closeM(){$('#modal').classList.remove('show')}
// ===== TRAINING 2.0 =====
const DR={sho:['🎯','ยิงประตู','กดให้ตรงเป้า'],dri:['🔶','เลี้ยงหลบกรวย','แตะซ้าย/ขวาหลบกรวย'],pac:['⚡','สปรินต์','แตะรัว ๆ ให้เร็วที่สุด'],pas:['🎯','จ่ายบอลเป้าเคลื่อนที่','กดตอนบอลอยู่ในเป้า'],tac:['📋','ประชุมแท็กติก','+ความไว้ใจโค้ช'],rest:['🧘','พักฟื้น','ฟื้นสตามิน่า']};
const INT={light:['เบา',.6,+8,0],normal:['ปกติ',1,-10,0],hard:['หนัก',1.5,-20,.1]};
const MS=[['sho3','ซ้อมยิง 3 วัน',3,60,0],['hard1','ซ้อมหนักให้จบ 1 ครั้ง',1,50,0],['mg80','ทำคะแนนมินิเกม > 80',1,40,20000],['dri2','ซ้อมเลี้ยง 2 วัน',2,40,0],['all4','ซ้อมครบ 4 วัน',4,60,30000],['pas2','ซ้อมจ่ายบอล 2 วัน',2,40,0],['mg2','เล่นมินิเกม 2 ครั้ง',2,30,10000]];
function WM(){const w=Math.floor(dkey(now())/7);if(!S.wm||S.wm.w!==w){const l=MS.slice().sort(()=>R()-.5).slice(0,3);S.wm={w,l:l.map(([id,t,n,xp,m])=>({id,t,n,xp,m,p:0,d:0}))}}return S.wm}
function mProg(id,v=1){WM().l.forEach(m=>{if(m.id===id&&!m.d){m.p=Math.min(m.n,m.p+v);if(m.p>=m.n){m.d=1;addXP(m.xp);addSP(2,'ภารกิจ');if(m.m){S.p.money+=m.m;CONS.push(`💰 โบนัสภารกิจ ฿${fmt(m.m)}`)}CONS.push(`🏆 ภารกิจสำเร็จ: ${m.t}`)}}})}
function trainUI(trained){const ts=S.tsel||(S.tsel={d:'sho',i:'normal'}),wm=WM();
 let h=`<div class="card"><div class="row sp"><b>Training LV ${S.p.tlv}</b><span class="mu">อีก ${needXP(S.p.tlv)-S.p.txp} XP</span></div>${bar(S.p.txp/needXP(S.p.tlv)*100,'o')}${S.p.sp?`<p class="ye" style="margin-top:6px">⭐ มี ${S.p.sp} สกิลพอยต์ — ไปอัปที่แท็บนักเตะ</p>`:''}`;
 if(trained)h+=`<p class="gr">✅ ซ้อมแล้ววันนี้ — กลับมาซ้อมใหม่พรุ่งนี้</p>`;
 else{h+=`<p class="mu" style="margin:8px 0 4px">เลือกดริล</p><div class="chips" style="flex-wrap:wrap">${Object.entries(DR).map(([k,v])=>`<div class="chip ${ts.d===k?'on':''}" data-dr="${k}">${v[0]} ${v[1]}</div>`).join('')}</div>
 ${ts.d!=='rest'?`<p class="mu" style="margin:8px 0 4px">ความหนัก</p><div class="chips">${Object.entries(INT).map(([k,v])=>`<div class="chip ${ts.i===k?'on':''}" data-in="${k}">${v[0]}</div>`).join('')}</div><p class="mu">${ts.i==='light'?'XP ×0.6 · ฟื้นสตามิน่า +8':ts.i==='hard'?'XP ×1.5 · สตามิน่า -20 · เสี่ยงเจ็บ 10%':'XP ×1 · สตามิน่า -10'}</p>`:''}
 <button class="btn" id="qt">✅ ซ้อมเลย</button><p class="mu" style="font-size:12px;text-align:center">บางครั้งโค้ชจะจัด 🎮 ดริลพิเศษ เล่นดีได้โบนัส XP</p>`}
 h+=`</div><h2>🏆 ภารกิจประจำสัปดาห์</h2><div class="card">${wm.l.map(m=>`<div style="margin:6px 0"><div class="row sp"><span>${m.d?'✅':'⬜'} ${m.t}</span><span class="mu">${m.p}/${m.n} · +${m.xp} XP${m.m?` +฿${fmt(m.m)}`:''}</span></div>${bar(m.p/m.n*100,m.d?'':'o')}</div>`).join('')}</div>`;return h}
function trainBind(){document.querySelectorAll('[data-dr]').forEach(b=>b.onclick=()=>{S.tsel.d=b.dataset.dr;save();render()});document.querySelectorAll('[data-in]').forEach(b=>b.onclick=()=>{S.tsel.i=b.dataset.in;save();render()});
 $('#qt')&&($('#qt').onclick=trainGo)}
function doTrain(score){const p=S.p,ts=S.tsel,d=ts.d,I=d==='rest'?['พัก',0,25,0]:INT[ts.i];CONS=[];PI();
 if(d==='rest'){E('stamina',25);E('morale',4)}else{let xp=(d==='tac'?20:25)*I[1];if(score!=null){const mu=1+Math.max(0,score-50)/100;xp*=mu;CONS.push(`🎮 คะแนนมินิเกม ${score} → XP ×${mu.toFixed(2)}`);mProg('mg2');if(score>80)mProg('mg80');if(score>=90&&chance(.35)&&p.a[d]<99){p.a[d]++;CONS.push(`📈 ${ATS[d]} +1`)}}
  addXP(Math.round(xp));addSP(ts.i==='hard'?2:ts.i==='normal'?1:chance(.5)?1:0,'ซ้อม');if(score>=80)addSP(1,'มินิเกมยอดเยี่ยม');E('stamina',I[2]);if(d==='tac')E('trust',rnd(3,6));if(I[3]&&chance(I[3])){p.inj=1;CONS.push('🚑 เจ็บจากการซ้อมหนัก 1 นัด')}
  if(ts.i==='hard')mProg('hard1');if(d==='sho')mProg('sho3');if(d==='dri')mProg('dri2');if(d==='pas')mProg('pas2');mProg('all4')}
 p.trainDay=dkey(now());save();const done=()=>sheet(`<span class="tag g">ซ้อม</span><h2>ผลการซ้อม</h2><ul class="cons">${CONS.map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" onclick="closeM();render()">ตกลง</button>`);
 if(d!=='rest'&&chance(.3)){const ev=pick(TEV),C0=CONS.slice();sheet(`<span class="tag o">⚡ เหตุการณ์ในสนามซ้อม</span><div class="ev">${ev[0]}</div>${ev[1].map((o,i)=>`<button class="btn s" data-te="${i}">${o[0]}</button>`).join('')}`);
  document.querySelectorAll('[data-te]').forEach(b=>b.onclick=()=>{CONS=C0;ev[1][+b.dataset.te][1]();save();done()})}else done()}
const TEV=[
 ['💥 กองหลังตัวเก๋าเข้าบอลใส่คุณแรงเกินเหตุ แล้วยิ้มเยาะ',[['😤 ผลักกลับ',()=>{E('trust',-8);E('morale',3);N('โค้ชเป่านกหวีดดุทั้งคู่')}],['🙂 ลุกขึ้นเล่นต่อ',()=>{E('trust',4);addXP(10)}],['⚽ แก้แค้นด้วยการเลี้ยงผ่านขาเขา',()=>{if(chance(.5)){E('morale',6);addXP(15);N('ทั้งสนามซ้อมโห่ฮา!')}else{E('morale',-4);N('โดนตัดบอลอีกรอบ อายหนัก')}}]]],
 ['👀 คุณสังเกตว่าโค้ชแอบยืนดูอยู่บนอัฒจันทร์',[['🔥 เร่งเต็มที่โชว์',()=>{E('trust',7);E('stamina',-8);addXP(10)}],['😌 ซ้อมตามปกติ',()=>{E('trust',2)}],['😎 เล่นท่าโชว์หวือหวา',()=>{if(chance(.4)){E('trust',8);N('โค้ชพยักหน้าชอบใจ')}else{E('trust',-6);N('โค้ช: "เลิกเล่นละครสัตว์!"')}}]]],
 ['🧓 รุ่นพี่ตัวเก๋าเรียกไปสอนทริกส่วนตัวหลังซ้อม',[['🙏 อยู่ฝึกต่อ',()=>{addXP(25);E('stamina',-6);E('morale',3)}],['🏠 ขอตัวกลับก่อน',()=>{E('morale',-1)}]]],
 ['📱 เพื่อนร่วมทีมแอบถ่ายคลิปคุณล้มคะมำแล้วโพสต์ลงโซเชียล',[['😂 รีโพสต์ขำ ๆ',()=>{E('fans',0.02);E('morale',2)}],['😠 ไปต่อว่า',()=>{E('morale',-3);E('trust',-2)}]]],
 ['🌧️ ฝนตกหนักกลางซ้อม โค้ชให้เลือกว่าจะซ้อมต่อไหม',[['💪 ซ้อมต่อกลางฝน',()=>{addXP(15);E('stamina',-6);E('trust',3)}],['🏃 เข้าร่ม',()=>{E('stamina',4)}]]],
 ['🧒 ดาวรุ่งตำแหน่งเดียวกับคุณเล่นดีมาก โค้ชชมเขาต่อหน้าทุกคน',[['🤝 ชมเขาด้วย',()=>{E('trust',3);E('morale',1)}],['😤 ซ้อมเพิ่มคนเดียวจนมืด',()=>{addXP(20);E('stamina',-10)}]]]];
function miniGame(d,cb){setTimeout(()=>{const sh=document.querySelector('#modal .sheet');if(sh)sh.classList.add('mg')},0);let end=false;const fin=sc=>{if(end)return;end=true;clearInterval(T);cancelAnimationFrame(A);cb(Math.round(cl(sc,0,100)))};let T=0,A=0;
 if(d==='sho'||d==='pas'){let n=0,tot=0,x=0,v=1.6,zx=40,zv=d==='pas'?0.7:0;const N2=d==='sho'?3:4;
  sheet(`<span class="tag o">🎮 ${DR[d][1]}</span><p class="mu">${DR[d][2]} · ${N2} ครั้ง</p><div class="mgbar"><div class="mgz" id="z"></div><div class="mgm" id="mk">⚽</div></div><p class="big" id="sc" style="text-align:center">0</p><button class="btn" id="tp">👆 แตะ!</button>`);
  const z=$('#z'),mk=$('#mk');const st=()=>{x+=v;if(x>96||x<0)v=-v;zx+=zv;if(zx>78||zx<2)zv=-zv;mk.style.left=x+'%';z.style.left=zx+'%';A=requestAnimationFrame(st)};st();
  $('#tp').onclick=()=>{const c=zx+10,dd=Math.abs(x+2-c);const s=dd<3?100:dd<10?100-(dd-3)*8:Math.max(0,44-(dd-10)*3);tot+=s;n++;SFX(s>=60?'hit':'miss');$('#sc').textContent=Math.round(tot/n);v*=1.25;if(n>=N2)setTimeout(()=>fin(tot/n),300)}}
 if(d==='pac'){let taps=0,t0=Date.now();sheet(`<span class="tag o">🎮 สปรินต์</span><p class="mu">แตะรัว ๆ 8 วินาที</p><div class="mgbar"><div class="mgm" id="mk" style="left:0">🏃</div></div><p class="big" id="sc" style="text-align:center">8.0</p><button class="btn" id="tp" style="padding:28px">👆 แตะ!</button>`);
  $('#tp').onclick=()=>{taps++;$('#mk').style.left=Math.min(94,taps/55*94)+'%'};T=setInterval(()=>{const l=8-(Date.now()-t0)/1000;$('#sc').textContent=Math.max(0,l).toFixed(1);if(l<=0)fin(taps/55*100)},100)}
 if(d==='dri'){let lane=1,hit=0,pass=0,cones=[],t0=Date.now();sheet(`<span class="tag o">🎮 เลี้ยงหลบกรวย</span><p class="mu">แตะซ้าย/ขวาเปลี่ยนเลน · 12 วินาที</p><div class="mgf" id="f"></div><div class="row"><button class="btn s" id="L" style="flex:1;text-align:center">⬅️</button><button class="btn s" id="Rr" style="flex:1;text-align:center">➡️</button></div><p class="mu" id="sc">หลบได้ 0 · ชน 0</p>`);
  const f=$('#f');$('#L').onclick=()=>lane=Math.max(0,lane-1);$('#Rr').onclick=()=>lane=Math.min(2,lane+1);
  T=setInterval(()=>{const el=(Date.now()-t0)/1000;if(chance(.09+el*.006))cones.push({l:rnd(0,2),y:0});cones.forEach(c=>c.y+=3+el*.25);cones=cones.filter(c=>{if(c.y>=82&&!c.h){c.h=1;if(c.l===lane){hit++;SFX('miss')}else pass++}return c.y<100});
   f.innerHTML=cones.map(c=>`<span style="left:${c.l*33+12}%;top:${c.y}%">🔶</span>`).join('')+`<span style="left:${lane*33+12}%;top:84%">⚽</span>`;$('#sc').textContent=`หลบได้ ${pass} · ชน ${hit}`;if(el>=12)fin(pass+hit?100*pass/(pass+hit)-hit*5:50)},60)}}
// ===== PITCH =====
function pitch(M,focus){const W2=300,H2=190;let s=`<svg viewBox="0 0 ${W2} ${H2}" class="pitch"><rect width="${W2}" height="${H2}" rx="10" fill="#123d22"/>${[0,1,2,3,4,5].map(i=>i%2?`<rect x="${i*50}" width="50" height="${H2}" fill="#15452a"/>`:'').join('')}
 <g stroke="#ffffff55" fill="none" stroke-width="1.5"><rect x="6" y="6" width="${W2-12}" height="${H2-12}" rx="4"/><line x1="150" y1="6" x2="150" y2="${H2-6}"/><circle cx="150" cy="95" r="24"/><rect x="6" y="50" width="40" height="90"/><rect x="${W2-46}" y="50" width="40" height="90"/><rect x="${W2-8}" y="80" width="4" height="30" fill="#fff"/><rect x="4" y="80" width="4" height="30" fill="#fff"/></g>`;
 const att=focus==='def'?0.25:focus==='atk'?0.78:.3+R()*.4;const bx=W2*att,by=40+R()*110;
 for(let i=0;i<6;i++)s+=`<circle cx="${cl(bx+rnd(-90,60),15,285)}" cy="${rnd(20,170)}" r="5" fill="#3ddc6a"/>`;
 for(let i=0;i<6;i++)s+=`<circle cx="${cl(bx+rnd(-50,90),15,285)}" cy="${rnd(20,170)}" r="5" fill="#e8e8e8"/>`;
 s+=`<circle cx="${bx}" cy="${by}" r="7.5" fill="#ff7a1a" stroke="#fff" stroke-width="2"/><text x="${bx}" y="${by-11}" fill="#fff" font-size="10" text-anchor="middle" font-family="Kanit">คุณ</text><circle cx="${bx+9}" cy="${by+5}" r="3" fill="#ffd21f"/></svg>`;return s}
// ===== EVENT UI =====
const ATS={pac:'ความเร็ว',sho:'ยิง',pas:'ผ่าน',dri:'เลี้ยง',def:'รับ',phy:'ร่างกาย'};
const attrCurve=v=>v<60?50+(v-60):50+(v-60)*.95,optDiff=o=>cl(((o.b+70*o.k)-40)*.6,-15,15)+({goal:-8,assist:1,stop:3,foul:0}[o.g]||0);
const pct=o=>cl(Math.round(attrCurve(S.p.a[o.at])+optDiff(o)+Math.min(5,tacFit(o.at))-(S.p.stamina<40?6:0)+cl((S.p.morale-60)/10,-4,4)),5,95);
function showEvent(ev,M,cb){const tagged=ev.m?`<span class="tag">${ev.fm?'⚽ จังหวะสำคัญ':ev.ht?'🚿 ห้องแต่งตัว':'⚠️ ดราม่าในสนาม'}</span> ${M?`<span class="mu">${clock(M)} · ${M.gf}-${M.ga}</span>`:''}`:`<span class="tag o">นอกสนาม · ${new Date(now()).toLocaleDateString('th-TH',{timeZone:'Asia/Bangkok',day:'numeric',month:'short'})}</span>`;
 const TG={goal:['ยิงประตูได้','g'],assist:['แอสซิสต์ได้','o'],stop:['สกัดบอล',''],foul:['ฟาวล์',''],null:['เล่นปลอดภัย','']};
 const opts=ev.fm?ev.o.map((o,i)=>{const P=pct(o);return `<button class="opt" data-o="${i}"><div class="row sp"><b>${o.l}</b><span class="tag ${TG[o.g][1]}">${TG[o.g][0]}</span></div><div class="row" style="margin:8px 0 4px">${bar(P,P<35?'r':P<60?'o':'')}<b style="width:44px;text-align:right">${P}%</b></div><div class="mu">ใช้: ${ATS[o.at]} ${S.p.a[o.at]} · เรตติ้ง <span class="gr">+${o.rs.toFixed(1)}</span> / <span class="re">${o.rf.toFixed(1)}</span></div></button>`}).join('')
  :ev.o.map((o,i)=>`<button class="btn s" data-o="${i}">${o.l}</button>`).join('');
 sheet(`${tagged}${ev.fm?pitch(M,['blk','air','int'].includes(ev.id)?'def':'atk'):''}<div class="ev">${ev.x(M)}</div>${opts}`);
 document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{CONS=[];const o=ev.o[+b.dataset.o];let head='';
  if(ev.fm){const P=pct(o),roll=rnd(1,100),ok=roll<=P;
   if(ok){if(o.g==='goal')goal(M,o.l,o.rs);else if(o.g==='assist')assist(M,o.rs);else{M.r+=o.rs;N(o.g==='foul'?'ตัดเกมได้':'สำเร็จ! เล่นได้เยี่ยม');if(o.g==='foul')yellow(M)}}
   else{M.r+=o.rf;N(pick(FAILT[o.g]));if(o.g==='stop')M.ga++;if(o.g==='goal')E('morale',-2)}
   if(o.at!=='def'||ok)E('stamina',-3);
   const T=ok?(o.g==='goal'?'ประตู!':o.g==='assist'?'แอสซิสต์!':'สำเร็จ!'):'พลาด';
   head=`<div class="res ${ok?'ok':'no'}">${T}</div><div class="roll">roll ${roll} | ต้องได้ ≤ ${P}</div>`;
   M.tl.push({m:clock(M),t:`${ok?(o.g==='goal'?'⚽':o.g==='assist'?'🅰️':'✅'):'❌'} ${o.l}`});
   if(M.g>0&&!M.cel&&ok&&o.g==='goal'&&chance(.6)){M.cel=1;M.queue.push('celebrate')}
   if(o.g==='goal'&&ok)tk(M,`⚽ ประตู!!! ${S.p.name} ${o.l}!`);else if(o.g==='stop'&&!ok)tk(M,`⚽ ${M.opp} ยิงได้`);
  }else{o.f(M);if(M){M.tl.push({m:clock(M),t:`${ev.ht?'🚿':'⚠️'} ${o.l}`});if(M.y&&!M.warned&&!M.red&&chance(.35)){M.warned=1;M.queue.push('refWarn')}}}
  if(!CONS.length)CONS.push('ไม่มีอะไรเปลี่ยนแปลง');save();
  sheet(`${head||'<span class="tag g">ผลที่ตามมา</span>'}<div class="ev" style="font-size:15px">คุณเลือก: <b>${o.l}</b></div><ul class="cons">${CONS.map(c=>`<li>${c}</li>`).join('')}</ul>${M?`<p class="mu">เรตติ้งตอนนี้ ${cl(M.r,3,10).toFixed(1)} · สกอร์ ${M.gf}-${M.ga}</p>`:''}<button class="btn" id="nx">ต่อไป ›</button>`);$('#nx').onclick=cb})}
function nextFix(){if(!S.club||S.week>=S.N)return null;const m=S.fix[S.week].find(x=>x.includes(S.club.i));const home=m[0]===S.club.i;return{m,home,opp:tierOf(S.club.c,S.club.t).clubs[home?m[1]:m[0]]}}
// ===== LIVE MATCH =====
const COMM=['บอลเปลี่ยนแข้งกันกลางสนาม','แฟนบอลร้องเพลงเชียร์กึกก้อง','จังหวะเปิดบอลยาวออกหลังไป','ผู้รักษาประตูรับบอลสบาย ๆ','โค้ชลุกขึ้นมาสั่งการข้างสนาม','ฟาวล์กลางสนาม เล่นใหม่ด้วยลูกฟรีคิก','เตะมุมแต่กองหลังสกัดออก','ยิงไกลข้ามคานไปเยอะ','กรรมการเป่าล้ำหน้า','เกมเริ่มดุเดือดมากขึ้น','ทีมเยือนครองบอลต่อเนื่อง','ลูกยิงเฉียดเสาออกไปนิดเดียว!','เสียงโห่ดังทั่วสนาม','คุณวิ่งเปิดพื้นที่ให้เพื่อน'];
const TM=['เบอร์ 9','เบอร์ 10','เบอร์ 7','กัปตันทีม','ตัวสำรองที่เพิ่งลงมา','กองหลังเบอร์ 4'];
const clock=M=>M.ext?`${M.half===1?45:90}+${M.ext}'`:`${M.min}'`;
function tk(M,t){M.tick.unshift(`<b>${clock(M)}</b> ${t}`);M.tick=M.tick.slice(0,6)}
function playMatch(){const nx=nextFix(),p=S.p;if(!nx||dkey(now())<dkey(S.ko[S.week]))return render();
 const base={opp:nx.opp.n,gf:0,ga:0,g:0,as:0,y:0,red:false,sub:0,r:6.0,queue:[],min:0,played:true,tl:[],tick:[],boost:0};
 if(p.ban||p.inj){base.played=false;return finish(nx,base,p.ban?'⛔ คุณติดแบน นั่งดูอยู่บนอัฒจันทร์':'🚑 คุณบาดเจ็บ พักรักษาตัว')}
 TTI();const fr=avgR(),RN=TT[p.tt],why=[`ระดับในทีม: ${RN}`,`ความไว้ใจโค้ช ${Math.round(p.trust)}`,fr?`ฟอร์ม 5 นัดล่าสุด ${fr.toFixed(1)}`:'ยังไม่มีฟอร์มให้ดู'];
 let st='start',subIn=0,unused=0,reason='';
 if(p.benched||(p.trust<10&&chance(.3))){st='out';reason=p.benched?'โค้ชลงโทษจากเหตุการณ์ก่อนหน้า':'โค้ชไม่ไว้ใจคุณเลย'}
 else if(p.tt<4){const sc=cl([.15,.3,.55,.88][p.tt]+(p.trust-50)/250+(fr?(fr-6.5)*.08:0),.05,.97);if(!chance(sc)){if(chance([.35,.2,.08,.02][p.tt])){st='out';reason=`คุณเป็น${RN} โค้ชเลือกคนอื่นติดทีม`}else{st='bench';subIn=rnd(55,80);unused=chance([.35,.25,.15,.05][p.tt]);reason=`คุณเป็น${RN} ยังไม่ได้ใจโค้ชพอจะเป็นตัวจริง`}}else reason=`ฟอร์ม/ความไว้ใจดีพอ โค้ชให้โอกาสตัวจริง!`}
 else reason='คุณคือตัวหลัก/กัปตันของทีม';
 p.benched=0;const PR=p.promise;if(PR&&PR.left>0&&st!=='start'&&!p.ban&&!p.inj){if(chance(.8)){st='start';subIn=0;unused=0;reason='โค้ชรักษาสัญญาที่ให้ไว้ — คุณได้เป็นตัวจริง'}else{PR.broken=1;reason+=' · ⚠️ โค้ชผิดสัญญาที่ให้ไว้!'}}if(PR&&PR.left>0)PR.left--,PR.cur=st;return prematch(nx,base,{st,subIn,unused,reason,why})}
function prematch(nx,base,o){const c=club(),p=S.p;base.tac=pickTac(nx);const T={start:['✅ ตัวจริง','g','คุณลงสนามตั้งแต่นาทีแรก'],bench:['🪑 ม้านั่งสำรอง','o','อาจได้ถูกส่งลงในครึ่งหลัง'],out:['❌ ไม่ติดทีม','r','นัดนี้คุณไม่ได้อยู่ใน 18 คน']}[o.st];
 sheet(`<span class="tag o">ก่อนเกม · ${LF()} ${nx.home?c.n:nx.opp.n} vs ${nx.home?nx.opp.n:c.n}</span><h2 style="margin:12px 0 4px" class="${T[1]==='g'?'gr':T[1]==='r'?'re':'or'}">${T[0]}</h2><p>${T[2]}</p>${tacCard(base.tac)}<div class="card" style="margin:8px 0"><b>เหตุผล:</b> ${o.reason}<ul class="cons">${o.why.map(w=>`<li>${w}</li>`).join('')}</ul></div>
 <details class="card" style="margin:8px 0"><summary>ℹ️ บทบาทหมายถึงอะไร?</summary><p class="mu"><b>ตัวจริง</b> = ตัวหลัก ลงสนามเกือบทุกนัด<br><b>สำรอง</b> = ตัวเสริม มักได้ลงท้ายเกม บางนัดได้เป็นตัวจริง<br><b>ดาวรุ่ง</b> = เยาวชน ไม่ค่อยได้ลงเป็นตัวจริง ต้องสะสมนาทีจากการซ้อม (ซ้อมแท็กติกเพิ่มความไว้ใจ) และฟอร์มดี ๆ ตอนได้ลง<br>เรตติ้งเฉลี่ย ≥7 ติดกัน 3 นัด + ความไว้ใจ ≥60 → ขึ้นเป็นตัวจริง</p></details>
 ${o.st==='out'?`<button class="btn" id="pm">⏭ ข้ามไปดูผลการแข่งขัน</button>`:o.st==='bench'?`<button class="btn" id="pm">▶ นั่งข้างสนาม (ข้ามไปช่วงที่อาจได้ลง)</button>`:`<button class="btn" id="pm">▶ ลงสนาม</button>`}`);
 $('#pm').onclick=()=>{closeM();if(o.st==='out'){base.played=false;return finish(nx,base,`❌ ไม่ติดทีม — ${o.reason}`)}startLive(nx,base,o)}}
function startLive(nx,base,o){const p=S.p,subIn=o.subIn;
 if(o.st==='bench'&&o.unused){base.played=false;return finish(nx,base,`🪑 นั่งสำรองทั้งเกม ไม่ได้ถูกส่งลง — ${o.reason}`)}
 const M=base,c=club();const d=c.s+(ovr()-c.s)*.2+(p.morale-50)/25+(nx.home?2:0)-nx.opp.s;M.lf=cl(1.0+d*.05,.2,3)*TAC[M.tac||"bal"][1];M.la=cl(1.2-d*.05,.2,3)*TAC[M.tac||"bal"][2];
 const tot=subIn?rnd(1,3):rnd(4,6),nf=Math.min(tot,cl(Math.round((ovr()-56)/9)+rnd(0,1),1,4)-(subIn?1:0)||1),nd=tot-nf;
 const TB=TAC[base.tac||'bal'],nf2=cl(nf+TB[4],1,6),fms=EV.filter(e=>e.fm&&e.id!=='pen'&&e.c()).map(e=>[e,R()-(TB[5].includes(e.id)?.7:0)]).sort((a,b)=>a[1]-b[1]).map(x=>x[0]).slice(0,nf2);
 const dr=EV.filter(e=>e.m&&!e.fm&&!e.ht&&!['redReact','subOff','celebrate','refWarn'].includes(e.id)).sort(()=>R()-.5).slice(0,nd);
 const ids=[...fms,...dr].map(e=>e.id);if(chance(.55))ids.push('freelance');if(!subIn&&chance(.06))ids.push('pen');
 if(!subIn&&p.tt<=1)ids.push('kidSub');else if(!subIn&&p.tt<4&&chance([.12,.1,.08,.05][p.tt]+(60-p.trust)/200+(60-p.stamina)/250))ids.push('subOff');
 const used=new Set();if(ids.includes('subOff'))M.subChk=1;M.sched=ids.map(id=>{let m;do{m=id==='kidSub'?rnd(46,65):id==='subOff'?rnd(74,84):subIn?rnd(subIn+2,89):(ids.indexOf(id)%2?rnd(46,88):rnd(4,44))}while(used.has(m)||m===45);used.add(m);return{m,id}}).sort((a,b)=>a.m-b.m);
 if(subIn){M.inMin=subIn;M.subChk=1}M.ht=pick(EV.filter(e=>e.ht)).id;M.st1=rnd(1,4);M.st2=rnd(2,6);M.half=1;M.ext=0;M.home=nx.home;
 tk(M,subIn?`🗓️ ${c.n} พบ ${M.opp} — คุณเริ่มเป็นตัวสำรอง (คาดว่าจะได้ลงช่วงนาที ${subIn})`:`🗓️ ${c.n} พบ ${M.opp} — คุณลงเป็นตัวจริง!`);LIVE={M,nx,speed:1,timer:null,paused:true};closeM();
 if(subIn){ffTo(M);drawLive();return sheet(`<span class="tag o">🔁 นาทีที่ ${subIn}</span><div class="score"><div class="big">${M.gf} - ${M.ga}</div></div><p>โค้ชเรียกคุณวอร์มอัพ... คุณถูกส่งลงสนาม!</p><p class="mu">ข้ามช่วงที่นั่งดูให้แล้ว · เหลือเวลาเล่น ~${90-subIn} นาที</p><button class="btn" id="ko">▶ ลงสนาม</button>`),$('#ko').onclick=()=>{closeM();resume()}}
 drawLive();sheet(`<span class="tag o">KICK-OFF</span><div class="score"><div><b>${nx.home?c.n:M.opp}</b></div><div class="big or">VS</div><div><b>${nx.home?M.opp:c.n}</b></div></div><p class="mu">สตามิน่า ${Math.round(p.stamina)} · ขวัญ ${Math.round(p.morale)} · เกมจะหยุดทุกจังหวะสำคัญให้คุณตัดสินใจ</p><button class="btn" id="ko">▶ เริ่มเกม</button>`);$('#ko').onclick=()=>{closeM();resume()}}
function ffTo(M){let n=0;while(n++<300&&!(M.half===2&&M.min>=M.inMin)){if(M.half===1&&M.min>=45&&M.ext>=M.st1){tk(M,'⏸️ หมดครึ่งแรก');M.half=2;M.min=45;M.ext=0;tk(M,'▶ เริ่มครึ่งหลัง');continue}adv(1)}}
function loop(){clearInterval(LIVE.timer);LIVE.timer=setInterval(()=>{if(LIVE&&!LIVE.paused)adv()},650/LIVE.speed)}
function resume(){closeM();if(!LIVE)return;LIVE.paused=false;drawLive();loop()}
function adv(ff){const M=LIVE.M;
 if(M.half===1){if(M.min<45)M.min++;else if(M.ext<M.st1){if(!M.ext)tk(M,`🟨 ป้ายทดเวลา +${M.st1}`);M.ext++}else return halftime()}
 else{if(M.min<90)M.min++;else if(M.ext<M.st2){if(!M.ext)tk(M,`🟨 ป้ายทดเวลา +${M.st2}`);M.ext++}else return fulltime()}
 if(M.inMin&&M.min===M.inMin&&M.half===2){tk(M,'🔁 คุณถูกส่งลงสนามเป็นตัวสำรอง!');M.tl.push({m:clock(M),t:'🔁 ลงสนาม (สำรอง)'})}
 const off=M.sub||M.redDone||(M.inMin&&(M.half===1||M.min<M.inMin)),lf=M.lf*(M.redDone?.6:1)*(M.half===2?1+M.boost*.08:1)*.75,la=M.la*(M.redDone?1.5:1);
 if(chance(lf/92)){M.gf++;const w=pick(TM);tk(M,`⚽ ประตู! ${club().n} — ${w}`);M.tl.push({m:clock(M),t:`⚽ ${w} (เพื่อนร่วมทีม)`});if(!off)M.r+=.05}
 else if(chance(la/92)){M.ga++;tk(M,`⚽ ${M.opp} ยิงได้`);M.tl.push({m:clock(M),t:`🥅 ${M.opp} ยิง`});if(!off)M.r-=.1}
 else if(chance(.13))tk(M,pick(COMM));
 if(ff)return;if(!off&&tacSwitch(M))return;if(!off){S.p.stamina=cl(S.p.stamina-.12*TAC[M.tac||'bal'][3]);const bad=(M.half===2&&M.r<=5.5)||(M.min>=60&&M.r<=5.8)||S.p.stamina<15;if(bad&&!M.subChk&&M.half===2&&chance(.07*(1+(55-S.p.trust)/50))){M.subChk=1;tk(M,'🔁 ป้ายเปลี่ยนตัวขึ้นเบอร์คุณ...');return moment('subOff')}}
 if(!off&&!M.ext&&M.sched.length&&M.sched[0].m<=M.min){const s=M.sched.shift();if(s.id==='kidSub'){if(M.r<7.2||(M.g+M.as===0&&M.r<7.6)){M.sub=1;M.subT=1;M.kidOff=M.min;M.sched=[];M.queue=[];tk(M,'🔁 โค้ชเปลี่ยนดาวรุ่งออก ให้พักตามแผน');M.tl.push({m:clock(M),t:'🔁 ถูกเปลี่ยนออก (ดาวรุ่ง)'})}else tk(M,'💪 ฟอร์มดี โค้ชให้คุณเล่นต่อ!');return drawLive()}return moment(s.id)}
 drawLive()}
function moment(id){const M=LIVE.M;const e=EVM[id];if(e.c&&!e.fm&&!e.c(M)&&!['pen','celebrate','refWarn','subOff','redReact'].includes(id)){const alt=EV.filter(x=>x.fm&&x.id!=='pen'&&x.c());if(!alt.length)return drawLive();return moment(pick(alt).id)}
 LIVE.paused=true;drawLive();showEvent(e,M,afterMoment)}
function afterMoment(){const M=LIVE.M;closeM();
 if(M.red){M.red=false;M.redDone=1;M.sched=[];M.queue=[];tk(M,'🟥 ใบแดง! คุณถูกไล่ออกจากสนาม');M.tl.push({m:clock(M),t:'🟥 ใบแดง'});return showEvent(EVM.redReact,M,()=>{closeM();resume()})}
 if(M.sub&&!M.subT){M.subT=1;M.sched=[];M.queue=[];tk(M,'🔁 คุณถูกเปลี่ยนตัวออก');M.tl.push({m:clock(M),t:'🔁 ออกจากสนาม'})}
 if(M.queue.length&&!M.sub)return moment(M.queue.shift());resume()}
function halftime(){const L=LIVE,M=L.M;L.paused=true;clearInterval(L.timer);tk(M,'⏸️ หมดครึ่งแรก');drawLive();
 const go2=()=>{M.half=2;M.min=45;M.ext=0;tk(M,'▶ เริ่มครึ่งหลัง');if(M.sub&&!M.subT){M.subT=1;M.sched=[];M.tl.push({m:"HT",t:'🔁 ถูกเปลี่ยนตัวช่วงพักครึ่ง'})}sheet(`<span class="tag o">ครึ่งหลัง</span><div class="score"><div class="big">${M.gf} - ${M.ga}</div></div><p class="mu">เรตติ้ง ${cl(M.r,3,10).toFixed(1)} · สตามิน่า ${Math.round(S.p.stamina)}${M.boost?` · บูสต์ทีม ${M.boost>0?'+':''}${M.boost}`:''}</p><button class="btn" id="h2">▶ เริ่มครึ่งหลัง</button>`);$('#h2').onclick=resume};
 sheet(`<span class="tag">⏸️ พักครึ่ง</span><div class="score"><div><b>${club().n}</b></div><div class="big">${M.gf} - ${M.ga}</div><div><b>${M.opp}</b></div></div><p class="mu">ทุกคนเดินเข้าห้องแต่งตัว...</p><button class="btn" id="dr">🚿 เข้าห้องแต่งตัว</button>`);
 $('#dr').onclick=()=>{if(M.sub||M.redDone)return go2();M.min=45;showEvent(EVM[M.ht],M,go2)}}
function fulltime(){const L=LIVE;clearInterval(L.timer);LIVE=null;tk(L.M,'🏁 จบเกม');finish(L.nx,L.M)}
function skip(){const L=LIVE;let n=0;while(LIVE&&!L.paused&&n++<200)adv()}
function drawLive(){const L=LIVE,M=L.M,c=club();$('#tabs').innerHTML='';const hn=LF()+' '+(M.home?c.n:M.opp),an=LF()+' '+(M.home?M.opp:c.n),hs=M.home?M.gf:M.ga,as=M.home?M.ga:M.gf;
 $('#app').innerHTML=`<div class="card live"><div class="row sp"><span class="tag">● LIVE</span><span class="mu">${tierOf(S.club.c,S.club.t).n}</span></div>
 <div class="score"><div style="flex:1"><b>${hn}</b></div><div><div class="big">${hs} - ${as}</div><div class="clock">${clock(M)}${M.ext?`<span class="board">+${M.half===1?M.st1:M.st2}</span>`:''}</div></div><div style="flex:1"><b>${an}</b></div></div>
 ${bar(M.half===1?Math.min(M.min,45)/90*100:Math.min(M.min,90)/90*100,'o')}</div>
 ${pitch(M)}
 <div class="card ticker">${M.tick.map((t,i)=>`<div style="opacity:${1-i*.14}">${t}</div>`).join('')}</div>
 <div class="row"><div class="chips" style="flex:1">${[1,2,4].map(s=>`<div class="chip ${L.speed===s?'on':''}" data-sp="${s}">${s}x</div>`).join('')}</div><button class="btn" id="skp" style="width:auto;margin:0;padding:10px 14px;font-size:14px">⏭ ข้ามไปจังหวะถัดไป</button></div>
 <div class="grid2" style="margin-top:10px"><div class="mini"><span class="mu">เรตติ้งของคุณ</span><b class="or">${(M.sub||M.redDone)?'🔁 ':''}${cl(M.r,3,10).toFixed(1)}</b></div><div class="mini"><span class="mu">สตามิน่า</span><b>${Math.round(S.p.stamina)}</b>${bar(S.p.stamina)}</div></div>`;
 document.querySelectorAll('[data-sp]').forEach(b=>b.onclick=()=>{L.speed=+b.dataset.sp;if(!L.paused)loop();drawLive()});$('#skp').onclick=skip}
// ===== FINISH =====
function finish(nx,M,msg,quiet){const p=S.p,c=club();let gf,ga;
 if(M.played&&M.tick){gf=M.gf;ga=M.ga}else{const d=c.s-nx.opp.s+(nx.home?2:0)-(M.missed?3:0);gf=pois(1.25+d*.06);ga=pois(1.2-d*.06)}
 if(M.missed){p.app++;CONS=[];E('trust',-6);E('morale',-4);msg='⏰ คุณไม่ได้ลงสนามตามเวลา ระบบจำลองผลให้ (ฟอร์มย่ำแย่)'}
 if(M.played){p.app++;p.sapp=(p.sapp||0)+1;p.stamina=cl(p.stamina-rnd(5,10));M.r+=(gf-ga)*.1;if(M.r>7.5)E('fans',0.03);p.ta+=M.as;CONS=[];const rr=cl(M.r,3,10);addSP(1,'ลงสนาม');if(rr>=7)addSP(rr>=8?3:rr>=7.5?2:1,'เรตติ้ง');if(M.g)addSP(M.g,'ประตู');if(M.as)addSP(M.as,'แอสซิสต์');if(rr>=8){M.motm=1;addSP(2,'MOTM')}msChk();const td=Math.round((rr-6.4)*9+M.g*4+M.as*3);E('trust',cl(td,-14,18));M.spc=CONS.slice()}
 else if(!M.missed){p.stamina=cl(p.stamina+10);if(p.ban)p.ban--;else if(p.inj)p.inj--}
 const [h,a]=nx.m;rec(h,a,nx.home?gf:ga,nx.home?ga:gf);
 S.fix[S.week].forEach(([x,y])=>{if(x===S.club.i||y===S.club.i)return;const cs=tierOf(S.club.c,S.club.t).clubs;rec(x,y,pois(1.3+(cs[x].s-cs[y].s)*.05+.15),pois(1.2-(cs[x].s-cs[y].s)*.05))});
 const res=gf>ga?'ชนะ':gf<ga?'แพ้':'เสมอ';S.log[S.week]=`${gf}-${ga}`;p.morale=cl(p.morale+(gf>ga?5:gf<ga?-5:0));
 const rating=(M.played||M.missed)?cl(M.r,3,10).toFixed(1):'-';if(M.played){p.rh=(p.rh||[]).concat(+rating).slice(-5);}
 news(`${res==='ชนะ'?'✅':res==='แพ้'?'❌':'➖'} ${LF()} ${c.n} ${gf}-${ga} ${M.opp}${M.played?` · ${p.name} เรตติ้ง ${rating}${M.g?` ⚽x${M.g}`:''}${M.as?` 🅰️x${M.as}`:''}`:M.missed?` · ขาดนัด เรตติ้ง ${rating}`:' (ไม่ได้ลงเล่น)'}`);
 try{matchPosts(M,gf,ga,rating)}catch(e){}const wg=p.wage;p.money+=wg;S.week++;S.abs++;save();if(quiet)return;
 sheet(`<span class="tag ${res==='ชนะ'?'g':res==='แพ้'?'':'o'}">จบเกม · ${res}</span><div class="score"><div><b>${c.n}</b></div><div class="big">${gf} - ${ga}</div><div><b>${M.opp}</b></div></div>
  ${msg?`<p>${msg}</p>`:''}${M.played?`<div class="grid2"><div class="mini"><span class="mu">เรตติ้ง</span><b class="or">${rating}</b></div><div class="mini"><span class="mu">ประตู/แอสซิสต์</span><b>${M.g} / ${M.as}</b></div></div>`:''}
  ${M.tl&&M.tl.length?`<h2>ไทม์ไลน์</h2><div class="tl">${M.tl.map(x=>`<div><b>${x.m}</b><span>${x.t}</span></div>`).join('')}</div>`:''}
  ${M.motm?'<p class="ye">🏅 แมนออฟเดอะแมตช์!</p>':''}${M.spc&&M.spc.length?`<ul class="cons">${M.spc.map(c=>`<li>${c}</li>`).join('')}</ul>`:''}<p class="mu" style="margin-top:8px">💰 ค่าเหนื่อย +฿${fmt(wg)}</p><button class="btn" id="nx">ต่อไป ›</button>`);
 $('#nx').onclick=()=>{if(p.terminate){p.terminate=0;news(`📄 ${c.n} ประกาศยกเลิกสัญญา ${p.name}`);S.club=null;p.wage=0;closeM();save();render();return sheet(`<span class="tag">สัญญาถูกยกเลิก</span><div class="ev">${c.n} ฉีกสัญญาคุณ! ตอนนี้คุณเป็นนักเตะไร้สังกัด</div><button class="btn" onclick="closeM();render()">เข้าใจแล้ว</button>`)}
  if(S.week>=S.N)return endSeason();postMatch()}}
function postMatch(){const due=S.chains.findIndex(c=>c.at<=S.abs);let ev=null;if(due>=0){ev=EVM[S.chains[due].id];S.chains.splice(due,1)}
 const after=()=>{closeM();if(S.club&&earned()&&(S.p.bonusOffer||chance(S.p.wantOut?.6:S.p.agent?.3:.18))){const l=genOffers();S.p.bonusOffer=0;if(l.length)return offers(true,null,l)}save();TAB='home';render()};
 if(ev)showEvent(ev,null,after);else after()}
function endSeason(){if(!S.club){S.season++;S.p.age++;newSeason(S.ko[S.N-1]+DAY);save();return}
 const st=sorted(),pos=st.findIndex(r=>r.i===S.club.i)+1,c=S.club,T=S.world[c.c],me=club();let msg=`จบฤดูกาล ${S.slabel}: ${me.n} จบอันดับ ${pos}`;
 if(pos<=2&&c.t>0){const up=T[c.t-1].clubs;const wi=up.reduce((m,x,k)=>x.s<up[m].s?k:m,0);const down=up[wi];up[wi]=me;T[c.t].clubs[c.i]=down;S.club={c:c.c,t:c.t-1,i:wi};msg+=' 🎉 เลื่อนชั้น!';S.p.wage=Math.max(S.p.wage,wage(c.c,c.t-1));S.p.fans*=1.3}
 else if(pos>=7&&c.t<T.length-1){const dn=T[c.t+1].clubs;const bi=dn.reduce((m,x,k)=>x.s>dn[m].s?k:m,0);const upc=dn[bi];dn[bi]=me;T[c.t].clubs[c.i]=upc;S.club={c:c.c,t:c.t+1,i:bi};msg+=' 😢 ตกชั้น';}
 if(pos===1)msg+=' 🏆 แชมป์ลีก!';news(msg+` · ${S.p.name} ${S.p.sg} ประตู ${S.p.sa} แอสซิสต์`);
 S.season++;S.p.age++;S.p.contract--;if(S.p.age>30)for(const k in S.p.a)S.p.a[k]=cl(S.p.a[k]-rnd(0,2),20,99);
 else if(S.p.age<25){PI();S.p.sp+=2}
 S.p.lastS={app:S.p.sapp||0,g:S.p.sg,a:S.p.sa,avg:avgR(),n:(S.p.rh||[]).length};S.p.stamina=95;S.p.morale=cl(S.p.morale+5);newSeason(S.ko[S.N-1]+DAY);
 if(S.p.contract<=0){S.p.contract=rnd(1,3);S.p.wage=Math.round(S.p.wage*(1+(ovr()-60)/100));msg+=` · ต่อสัญญาอัตโนมัติ ฿${fmt(S.p.wage)}/สัปดาห์`}
 msg+=`<br><span class="mu">ฤดูกาลใหม่ ${S.slabel} เริ่ม ${fdt(S.ko[0])}</span>`;
 save();sheet(`<span class="tag g">สรุปฤดูกาล</span><div class="ev">${msg}</div><button class="btn" id="nx">ต่อไป ›</button>`);$('#nx').onclick=()=>{const l=genOffers(null,true);if(l.length&&(S.p.contract<=1||(S.p.lastS&&perfOf(true).has)))offers(true,null,l);else{closeM();render()}}}
// ===== LIFESTYLE =====
let LS='boost',LC='rec';
const BST={
 ice:{c:'rec',ic:'🧊',n:'อ่างแช่น้ำแข็ง',d:'บำบัดความเย็น ฟื้นฟูกล้ามเนื้อ',days:3,p:8000,k:'stamina',v:[5]},
 sauna:{c:'rec',ic:'🧖‍♂️',n:'ซาวน่าอินฟราเรด',d:'ขับเหงื่อ คลายกล้ามเนื้อ',days:4,p:12000,k:'stamina',v:[6]},
 chair:{c:'rec',ic:'💆',n:'เก้าอี้นวดไฟฟ้า',d:'นวดผ่อนคลายระดับมืออาชีพที่บ้าน',days:5,p:15000,k:'stamina',v:[8]},
 physio:{c:'rec',ic:'🩺',n:'นักกายภาพส่วนตัว',d:'ดูแลกล้ามเนื้อทุกวัน',days:7,p:40000,k:'stamina',v:[11]},
 cryo:{c:'rec',ic:'❄️',n:'ห้องไครโอเทอราพี',d:'เทคโนโลยีฟื้นฟูระดับยุโรป',days:7,p:45000,k:'stamina',v:[12]},
 hyper:{c:'rec',ic:'🫧',n:'ห้องออกซิเจนแรงดันสูง',d:'ฟื้นตัวไวแบบนักกีฬาระดับโลก',days:10,p:150000,k:'both',v:[8]},
 med:{c:'rec',ic:'🏥',n:'ทีมแพทย์ส่วนตัว',d:'หมอ นักกายภาพ นักวิทย์การกีฬาครบชุด',days:14,p:600000,k:'both',v:[14]},
 bike:{c:'trn',ic:'🚴',n:'จักรยานซ้อมที่บ้าน',d:'คาร์ดิโอเสริมทุกเช้า',days:4,p:12000,k:'trust',v:[2]},
 gym:{c:'trn',ic:'🏋️',n:'โฮมยิมส่วนตัว',d:'เวทเทรนนิ่ง ได้สกิลพอยต์',days:5,p:30000,k:'xp',v:[1]},
 sprint:{c:'trn',ic:'⚡',n:'โค้ชสปรินต์',d:'เทคนิคออกตัว ได้สกิลพอยต์',days:5,p:55000,k:'xp',v:[1]},
 coachp:{c:'trn',ic:'🧑‍🏫',n:'โค้ชส่วนตัว',d:'วิเคราะห์เกมตัวต่อตัว',days:7,p:60000,k:'trust',v:[3]},
 finish:{c:'trn',ic:'🎯',n:'โค้ชจบสกอร์',d:'ยิงวันละ 200 ลูก',days:7,p:120000,k:'xp',v:[2]},
 psych:{c:'trn',ic:'🧠',n:'นักจิตวิทยาการกีฬา',d:'ใจนิ่งในเกมใหญ่',days:10,p:200000,k:'morale',v:[6]},
 ground:{c:'trn',ic:'🏟️',n:'สนามซ้อมส่วนตัว',d:'ซ้อมได้ทุกเวลา ไม่มีใครกวน',days:14,p:1500000,k:'xp',v:[3]},
 spa:{c:'life',ic:'🧖',n:'สปาวันหยุด',d:'พักใจ คลายเครียดจากดราม่า',days:3,p:10000,k:'morale',v:[5]},
 chef:{c:'life',ic:'👨‍🍳',n:'เชฟส่วนตัว',d:'อาหารอร่อยถูกหลักโภชนาการ',days:5,p:20000,k:'morale',v:[4]},
 nutri:{c:'life',ic:'🥗',n:'นักโภชนาการ',d:'วางแผนอาหาร เพิ่มพลังทุกด้าน',days:7,p:35000,k:'both',v:[3]},
 pr:{c:'life',ic:'📸',n:'ทีม PR & โซเชียล',d:'คอนเทนต์ปัง ผู้ติดตามเพิ่ม',days:7,p:90000,k:'fans',v:[200]},
 butler:{c:'life',ic:'🤵',n:'พ่อบ้านส่วนตัว',d:'ไม่ต้องกังวลเรื่องจุกจิก',days:10,p:250000,k:'morale',v:[7]},
 retreat:{c:'life',ic:'🏝️',n:'รีทรีตส่วนตัวมัลดีฟส์',d:'ชาร์จพลังเต็มร้อย',days:5,p:900000,k:'both',v:[12]}};
const BCAT={rec:'ฟื้นฟู',trn:'ซ้อม',life:'ไลฟ์สไตล์'};
const KL={stamina:'สตามิน่า',trust:'ความเชื่อใจโค้ช',morale:'ขวัญกำลังใจ',xp:'สกิลพอยต์',both:'ขวัญ+สตามิน่า',fans:'ผู้ติดตาม'};
const ASSETS=[
 ['casio','⌚','นาฬิกาสปอร์ต','นาฬิกา',8000,1,100],['shoes','👟','สนีกเกอร์แรร์','แฟชั่น',45000,1,800],['scooter','🛵','สกู๊ตเตอร์ไฟฟ้า','รถ',25000,1,300],['gaming','🎮','ห้องเกมมิ่งจัดเต็ม','บ้าน',150000,1,1200],
 ['chain','📿','สร้อยทองเส้นใหญ่','แฟชั่น',120000,2,1500],['paint','🖼️','ภาพวาดศิลปินไทย','ศิลปะ',300000,2,2000],['tag','⌚','นาฬิกาสวิสสปอร์ต','นาฬิกา',250000,2,2500],['civic','🚗','รถเก๋งซิ่ง','รถ',900000,2,3000],
 ['rolex','⌚','นาฬิกาสวิสทองคำ','นาฬิกา',800000,3,8000],['ring','💍','แหวนเพชร','แฟชั่น',1500000,3,12000],['condo','🏢','คอนโดใกล้สนาม','บ้าน',2500000,2,2000],['nft','🐒','NFT ลิงเบื่อโลก','ศิลปะ',2000000,3,20000],['benz','🚙','SUV หรู','รถ',4500000,3,15000],
 ['apm','💎','นาฬิกาเพชรลิมิเต็ด','นาฬิกา',6000000,5,50000],['sculpt','🗿','ประติมากรรมยุโรป','ศิลปะ',9000000,4,40000],['villa','🏡','พูลวิลล่า','บ้าน',15000000,4,40000],['super','🏎️','ซูเปอร์คาร์อิตาลี','รถ',18000000,5,80000],
 ['mansion','🏰','คฤหาสน์ริมทะเล','บ้าน',60000000,5,150000],['hyper','🚀','ไฮเปอร์คาร์ลิมิเต็ด','รถ',90000000,5,250000],['yacht','🛥️','ซูเปอร์ยอทช์','ยานพาหนะ',300000000,5,500000],['jet','✈️','เครื่องบินส่วนตัว','ยานพาหนะ',800000000,5,900000],['island','🏝️','เกาะส่วนตัว','บ้าน',2000000000,5,2000000]].sort((a,b)=>a[4]-b[4]);
const AM=Object.fromEntries(ASSETS.map(a=>[a[0],a]));
const INV={sav:['🏦','บัญชีออมทรัพย์','ความเสี่ยงต่ำมาก',7,1,2,1000],bond:['📜','พันธบัตรรัฐบาล','ความเสี่ยงต่ำ',14,1,4,10000],gold:['🥇','ทองคำ','ความเสี่ยงต่ำ-กลาง',21,-4,9,20000],idx:['📈','กองทุนดัชนี','ความเสี่ยงกลาง',14,-5,12,10000],stock:['💹','หุ้นเทคโนโลยี','ความเสี่ยงสูง',14,-15,28,50000],reit:['🏘️','กองทุนอสังหาฯ','ความเสี่ยงกลาง',30,-3,15,100000],cry:['🪙','คริปโต','ความเสี่ยงสูงมาก!',7,-45,70,5000],rest:['🍜','เปิดร้านอาหาร','ธุรกิจ เสี่ยงกลาง-สูง',45,-30,45,1000000],brand:['👕','แบรนด์เสื้อผ้าของตัวเอง','ธุรกิจ เสี่ยงสูง',60,-40,90,5000000],club:['⚽','ซื้อหุ้นสโมสรฟุตบอล','ความเสี่ยงสูงมาก!',90,-50,120,50000000]};
const MAXLV=10,bVal=(B,lv)=>Math.max(1,Math.round(B.v[0]*(1+(lv-1)*.35))),bUp=(B,lv)=>Math.round(B.p*2*Math.pow(1.6,lv-1)/100)*100,aUp=(a,lv)=>Math.round(a[4]*.25*Math.pow(1.45,lv-1)/100)*100,iUp=(I,lv)=>Math.round(Math.max(20000,I[6]*.5)*Math.pow(1.7,lv-1)/100)*100,iRng=(I,lv)=>[I[4]+(lv-1)*Math.abs(I[4])*.05,I[5]*(1+(lv-1)*.06)];
function LI(){S.boost=S.boost||[];S.blv=S.blv||{};S.assets=S.assets||[];S.inv=S.inv||[];S.alv=S.alv||{};S.ilv=S.ilv||{}}
const portVal=()=>{LI();return S.assets.reduce((s,id)=>s+(AM[id]?AM[id][4]*.7:0),0)+S.inv.reduce((s,x)=>s+x.amt,0)};
const lvTag=lv=>`<span class="tag o">LV${lv}/${MAXLV}</span>`,upBtn=(attr,id,lv,c)=>`<button class="btn s ${lv>=MAXLV||S.p.money<c?'dis':''}" style="flex:1;text-align:center" data-${attr}="${id}" ${lv>=MAXLV?'disabled':''}>${lv>=MAXLV?'✅ LV สูงสุด':`⬆️ LV${lv+1} ฿${fmt(c)}`}</button>`;
function lifeHTML(){LI();const p=S.p,today=dkey(now());S.boost=S.boost.filter(b=>b.end>=today&&BST[b.id]);
 let h=`<div class="card row sp" style="border-left:5px solid var(--or)"><div><div class="big or" style="font-size:34px">฿${fmt(p.money)}</div><div class="mu">ยอดเงินคงเหลือ</div></div><div style="text-align:right"><b class="ye" style="font-size:20px">฿${fmt(portVal())}</b><div class="mu">มูลค่าพอร์ต</div></div></div>
 <div class="seg">${[['boost','บูสเตอร์'],['asset','ทรัพย์สิน'],['inv','ลงทุน']].map(([k,l])=>`<div class="${LS===k?'on':''}" data-ls="${k}">${l}</div>`).join('')}</div>`;
 if(LS==='boost'){h+=`<div class="row sp"><h2>บูสเตอร์ที่ใช้งาน</h2><span class="tag">${S.boost.length}/4 ช่อง</span></div>`;
  h+=S.boost.length?S.boost.map((b,i)=>{const B=BST[b.id],lv=S.blv[b.id]||1,v=bVal(B,lv),can=b.last!==today;return `<div class="card" style="border-color:var(--gr)"><div class="row sp"><b>${B.ic} ${B.n} ${lvTag(lv)}</b><span class="mu">เหลือ ${b.end-today+1} วัน</span></div>${bar((b.end-today+1)/B.days*100)}<button class="btn o ${can?'':'dis'}" data-cl="${i}" ${can?'':'disabled'}>${can?`รับ +${fmt(v)} ${KL[B.k]}`:'รับแล้ววันนี้ — กลับมาพรุ่งนี้'}</button></div>`}).join(''):`<div class="card mu">ยังไม่มีบูสเตอร์ ซื้อด้านล่างได้เลย</div>`;
  h+=`<div class="chips" style="margin:10px 0">${Object.entries(BCAT).map(([k,l])=>`<div class="chip ${LC===k?'on':''}" data-lc="${k}">${l}</div>`).join('')}</div>`;
  h+=Object.entries(BST).filter(([,B])=>B.c===LC).sort((a,b)=>a[1].p-b[1].p).map(([id,B])=>{const lv=S.blv[id]||1,act=S.boost.some(b=>b.id===id),full=S.boost.length>=4,up=bUp(B,lv),lock=p.money<B.p;
   return `<div class="card ${lock?'lock':''}"><div class="row sp"><div class="row"><span style="font-size:30px">${B.ic}</span><div><b>${lock?'🔒 ':''}${B.n}</b><div class="mu">${B.d}</div></div></div>${lvTag(lv)}</div>
   <div class="row" style="margin:8px 0;flex-wrap:wrap"><span class="chip">${B.days} วัน</span><span class="chip gr">+${fmt(bVal(B,lv))} ${KL[B.k]}/วัน</span>${lv<MAXLV?`<span class="chip">LV${lv+1}: +${fmt(bVal(B,lv+1))}</span>`:''}</div>
   <div class="row">${upBtn('up',id,lv,up)}<button class="btn ${act||full||lock?'dis':''}" style="flex:1" data-bb="${id}" ${act||full?'disabled':''}>${act?'ใช้งานอยู่':full?'ช่องเต็ม':`ซื้อ ฿${fmt(B.p)}`}</button></div></div>`}).join('')}
 if(LS==='asset'){h+=`<h2>ของที่คุณมี (${S.assets.length})</h2>`+(S.assets.length?S.assets.filter(id=>AM[id]).map(id=>{const a=AM[id],lv=S.alv[id]||1;return `<div class="card"><div class="row sp"><b>${a[1]} ${a[2]}</b>${lvTag(lv)}</div><p class="mu">แต่ง/อัปเกรด: ${lv<MAXLV?`LV${lv+1} ได้ +${fmt(Math.round(a[6]*.4))} ผู้ติดตาม · ขวัญ +${a[5]}`:'สูงสุดแล้ว'}</p><div class="row">${upBtn('au',id,lv,aUp(a,lv))}</div></div>`}).join(''):'<div class="card mu">ยังไม่มีทรัพย์สิน</div>')+`<h2>ร้านค้า (เรียงตามราคา)</h2>`;
  h+=ASSETS.map(([id,ic,n,cat,pr,st,f])=>{const own=S.assets.includes(id),lock=!own&&p.money<pr;return `<div class="card row sp ${lock?'lock':''}"><div class="row"><span style="font-size:30px">${ic}</span><div><b>${lock?'🔒 ':''}${n}</b><div class="mu">${cat} · <span class="ye">${'★'.repeat(st)}${'☆'.repeat(5-st)}</span> · +${fmt(f)} ผู้ติดตาม</div></div></div><button class="btn ${own||lock?'dis':''}" style="width:auto;padding:10px 12px;font-size:14px" data-as="${id}" ${own?'disabled':''}>${own?'มีแล้ว':'฿'+fmt(pr)}</button></div>`}).join('')}
 if(LS==='inv'){h+=`<h2>พอร์ตลงทุน</h2>${S.inv.length?S.inv.map((x,i)=>{const I=INV[x.id],done=today>=x.end;return `<div class="card"><div class="row sp"><b>${I[0]} ${I[1]}</b><b>฿${fmt(x.amt)}</b></div>${bar(Math.min(100,(today-x.start)/(x.end-x.start)*100))}<button class="btn ${done?'':'dis'}" data-ic="${i}" ${done?'':'disabled'}>${done?'💰 รับผลตอบแทน':`ครบกำหนดอีก ${x.end-today} วัน`}</button></div>`}).join(''):'<div class="card mu">ยังไม่มีการลงทุน</div>'}
  <h2>ผลิตภัณฑ์</h2><div class="card"><span class="mu">จำนวนเงินลงทุน</span><input id="amt" type="number" inputmode="numeric" value="${Math.max(1000,Math.round(p.money*.25/1000)*1000)}"><div class="mu">ภาษี 15% จากกำไร · ขาดทุนได้! · อัป LV = ที่ปรึกษาเก่งขึ้น ผลตอบแทนดีขึ้น</div></div>`+
  Object.entries(INV).sort((a,b)=>a[1][6]-b[1][6]).map(([id,I])=>{const [ic,n,r,d,,,min]=I,lv=S.ilv[id]||1,[mn,mx]=iRng(I,lv),[mn2,mx2]=iRng(I,lv+1),lock=p.money<min;return `<div class="card ${lock?'lock':''}"><div class="row sp"><b>${lock?'🔒 ':''}${ic} ${n}</b><span class="row" style="gap:4px"><span class="tag ${mn<-10?'':mn<0?'o':'g'}">${r}</span>${lvTag(lv)}</span></div><div class="row sp mu" style="margin:6px 0"><span>${d} วัน · ขั้นต่ำ ฿${fmt(min)}</span><span>ผลตอบแทน <span class="${mn<0?'re':'gr'}">${mn.toFixed(1)}%</span> ถึง <span class="gr">+${mx.toFixed(1)}%</span></span></div>${lv<MAXLV?`<div class="mu" style="font-size:12px">LV${lv+1}: ${mn2.toFixed(1)}% ถึง +${mx2.toFixed(1)}%</div>`:''}<div class="row">${upBtn('iu',id,lv,iUp(I,lv))}<button class="btn s ${lock?'dis':''}" style="flex:1;text-align:center" data-iv="${id}">ลงทุน</button></div></div>`}).join('')}
 return h}
function lifeMsg(t){sheet(`<span class="tag g">ไลฟ์สไตล์</span><ul class="cons">${(Array.isArray(t)?t:[t]).map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" onclick="closeM();render()">ตกลง</button>`)}
function pay(x){if(S.p.money<x){lifeMsg('💸 เงินไม่พอ!');return false}S.p.money-=x;return true}
function lifeBind(){const q=(s,f)=>document.querySelectorAll(s).forEach(b=>b.onclick=()=>f(b));const today=dkey(now());
 q('[data-ls]',b=>{LS=b.dataset.ls;render()});q('[data-lc]',b=>{LC=b.dataset.lc;render()});
 q('[data-bb]',b=>{const id=b.dataset.bb,B=BST[id];if(!pay(B.p))return;S.boost.push({id,lv:S.blv[id]||1,end:today+B.days-1,last:null});save();lifeMsg(`${B.ic} เปิดใช้ ${B.n} ${B.days} วัน`)});
 q('[data-up]',b=>{const id=b.dataset.up,B=BST[id],lv=S.blv[id]||1;if(lv>=MAXLV||!pay(bUp(B,lv)))return;S.blv[id]=lv+1;save();lifeMsg(`⬆️ ${B.n} อัปเกรดเป็น LV${lv+1} (+${fmt(bVal(B,lv+1))} ${KL[B.k]}/วัน)`)});
 q('[data-au]',b=>{const id=b.dataset.au,a=AM[id],lv=S.alv[id]||1;if(lv>=MAXLV||!pay(aUp(a,lv)))return;S.alv[id]=lv+1;CONS=[];E('fans',Math.round(a[6]*.4));E('morale',a[5]);save();lifeMsg([`⬆️ ${a[2]} LV${lv+1}`,...CONS])});
 q('[data-iu]',b=>{const id=b.dataset.iu,I=INV[id],lv=S.ilv[id]||1;if(lv>=MAXLV||!pay(iUp(I,lv)))return;S.ilv[id]=lv+1;save();const[mn,mx]=iRng(I,lv+1);lifeMsg(`⬆️ ที่ปรึกษา${I[1]} LV${lv+1}: ผลตอบแทน ${mn.toFixed(1)}% ถึง +${mx.toFixed(1)}%`)});
 q('[data-cl]',b=>{const x=S.boost[+b.dataset.cl],B=BST[x.id],v=bVal(B,S.blv[x.id]||1);x.last=today;CONS=[];
  if(B.k==='xp'){addSP(v,B.n)}else if(B.k==='both'){E('morale',v);E('stamina',v)}else if(B.k==='fans')E('fans',v);else E(B.k,v);save();lifeMsg(CONS)});
 q('[data-as]',b=>{const a=AM[b.dataset.as];if(!pay(a[4]))return;S.assets.push(a[0]);CONS=[];E('fans',a[6]);E('morale',a[5]*2);if(a[5]>=4){E('media',-3);N('สื่อเริ่มวิจารณ์ความฟุ้งเฟ้อ')}news(`🛍️ ${S.p.name} ถอย${a[2]}ราคา ฿${fmt(a[4])}`);save();lifeMsg(CONS)});
 q('[data-iv]',b=>{const id=b.dataset.iv,I=INV[id],amt=Math.round(+$('#amt').value);if(!(amt>=I[6]))return lifeMsg(`ขั้นต่ำ ฿${fmt(I[6])}`);if(!pay(amt))return;S.inv.push({id,amt,start:today,end:today+I[3]});save();lifeMsg(`${I[0]} ลงทุน ${I[1]} ฿${fmt(amt)} ครบกำหนดใน ${I[3]} วัน`)});
 q('[data-ic]',b=>{const i=+b.dataset.ic,x=S.inv[i],I=INV[x.id],[mn,mx]=iRng(I,S.ilv[x.id]||1);const r=mn+R()*(mx-mn);let pr=Math.round(x.amt*r/100);const tax=pr>0?Math.round(pr*.15):0;S.inv.splice(i,1);S.p.money+=x.amt+pr-tax;save();
  lifeMsg([`${I[0]} ${I[1]} ผลตอบแทน ${r>=0?'+':''}${r.toFixed(1)}%`,`${pr>=0?'📈 กำไร':'📉 ขาดทุน'} ฿${fmt(pr)}`,tax?`🧾 ภาษี 15%: -฿${fmt(tax)}`:'ไม่มีภาษี (ไม่มีกำไร)',`💰 ได้รับคืน ฿${fmt(x.amt+pr-tax)}`])})}
// ===== SOCIAL FEED =====
const FT={fan:['แฟนบอล','g'],media:['สื่อ','o'],pundit:['กูรู',''],rival:['คู่แข่ง','']};
const AV={fan:['😍','🔥','🥹','🤩','😭','⚽','🦁','💚'],media:['📰','📺','🎙️','🗞️'],pundit:['🧐','👴','🎓','📊'],rival:['😤','🙄','🤡','😈']};
const HN={fan:['ultras_สายเลือด','บอลคือชีวิต99','เด็กหลังโกล','แฟนพันธุ์แท้_{c3}','น้องมายด์ดูบอล','ลุงแดงข้างสนาม','KopThai_88','หัวใจ{c3}'],media:['ข่าวกีฬาทันใจ','FootballDaily_TH','สปอร์ตเพจ','ขอบสนามนิวส์','บอลเดลี่ช็อต'],pundit:['โค้ชเฒ่าเล่าบอล','อดีตทีมชาติ_เอก','TacticalNerd_TH','กูรูหน้าจอ'],rival:['แฟน_{o3}_ตัวจริง','เกลียด{c3}ทั้งชีวิต','ultras_{o3}','ขี้แพ้ชวนตี']};
const FP={
 great:[['fan','แม่ถามว่าทำไมกรี๊ดตอนตีสอง... ก็ {n} ยิงอะ 😭'],['media','สื่อนอกเริ่มจับตา {n} ดาวรุ่งจาก{nat}'],['pundit','การตัดสินใจในจังหวะสุดท้ายของ {n} เหนือชั้นกว่าทุกคนในสนาม'],['rival','ยอมรับก็ได้ว่าเก่ง... แต่ไม่ชอบอยู่ดี 😒'],['fan','{n} คือเทพเจ้า!!! 🙏🙏 เรตติ้ง {r} คืนนี้ ไม่มีใครหยุดได้'],['fan','ฉายาใหม่ "{nick}" มาแล้วว ใครเห็นด้วยกดหัวใจ ❤️'],['fan','ร้องไห้หนักมาก เด็กคนนี้เกิดมาเพื่อ {c} 😭💚'],['pundit','ผมดูบอลมา 30 ปี {n} เกมนี้คือระดับยุโรปจริง ๆ เคลื่อนที่ฉลาดมาก'],['media','🔥 {n} โชว์ฟอร์มสุดร้อนแรง เรตติ้ง {r} พา {c} ผงาด'],['rival','โชคช่วยล้วน ๆ เดี๋ยวนัดหน้าก็กลับมาเป็นตัวตลกเหมือนเดิม 🙄'],['fan','#{tag} ติดเทรนด์อันดับ 1 แล้วว ภูมิใจมากก'],['pundit','ถ้าทีมชาติ{nat}ไม่เรียก {n} ผมจะไม่ดูบอล{nat}อีก!'],['fan','นักเตะ{nat}คนนี้ของจริง! {flag}🔥'],['media','{flag} สื่อ{nat}ตีข่าวใหญ่ ภูมิใจใน {n}'],['rival','ทำไมทีมเราไม่มีแบบ {n} บ้าง... เจ็บใจ 😤'],['fan','เอาเงินเดือนไปเพิ่มให้เขาเดี๋ยวนี้!! 💰💰']],
 goal:[['fan','ประตูนั้นของ {n} ผมดูซ้ำไป 40 รอบแล้ว 🥶'],['media','⚽ {n} ซัด {g} ประตู! แฟน {c} คลั่ง'],['fan','{g} ลูก!!! ใครบอกว่าเด็กคนนี้ไม่เก่ง ออกมาขอโทษด่วน'],['rival','ยิงได้เพราะกองหลังเราหลับ ไม่ได้เก่งอะไร']],
 ok:[['fan','ขยันวิ่งดีนะ แต่จบสกอร์ยังต้องฝึกอีกเยอะ'],['rival','ก็งั้น ๆ แหละ ไม่ได้น่ากลัวอะไร'],['fan','วันนี้ {n} ก็โอเคนะ แต่ยังรอให้ระเบิดฟอร์มกว่านี้'],['pundit','{n} เล่นตามระบบ ไม่มีอะไรหวือหวา เรตติ้ง {r} ถือว่าพอใช้'],['media','{c} {sc} {o} — {n} เรตติ้ง {r}'],['fan','เกมนี้สนุกดี แต่หวังว่า {n} จะยิงได้ในนัดหน้า 🙏']],
 bad:[['fan','ดูจบแล้วขอไปนอนร้องไห้ก่อน {c} เป็นอะไรไป 😩'],['media','ชาวเน็ตถล่ม! {n} หลังโชว์ฟอร์มเรตติ้ง {r}'],['rival','อยากให้ {n} ลงทุกนัดเลย ทีมเราชนะง่ายดี 😈'],['pundit','ถ้าเป็นผมคุมทีม {n} นั่งสำรองนัดหน้าแน่นอน'],['fan','{n} วันนี้เดินเล่นในสนามหรอ?? เรตติ้ง {r} 💀'],['fan','ขายทิ้งเถอะ เอาเงินไปซื้อคนอื่น 😮‍💨'],['fan','ฉายาใหม่ "{bnick}" เหมาะสมมาก'],['pundit','ยิงพลาดแบบนั้นในระดับอาชีพ รับไม่ได้ครับ {n} ต้องกลับไปซ้อมพื้นฐาน'],['media','📉 {n} ฟอร์มตกหนัก แฟน {c} เริ่มทนไม่ไหว'],['rival','ขอบคุณ {n} ที่ช่วยทีมเรามากกว่าทีมตัวเอง 🤡'],['fan','#{tag}Out กำลังขึ้นเทรนด์... เศร้าแต่จริง'],['fan','ใจเย็นกันก่อนนะทุกคน เขายังเด็ก ให้โอกาสอีกหน่อย 🥺'],['pundit','ปัญหาไม่ใช่ฝีเท้า แต่คือความมั่นใจ {n} ดูกดดันมาก']],
 red:[['media','🟥 {n} โดนใบแดง! ทำทีม {c} เหลือ 10 คน'],['fan','ใบแดงแบบนี้ไม่ไหวจริง ๆ ทีมต้องมาลำบากเพราะคนคนเดียว'],['rival','555 อารมณ์ร้อนแบบนี้ไปเป็นนักมวยเถอะ 🥊'],['pundit','วุฒิภาวะยังไม่พอ ต้องเรียนรู้การควบคุมอารมณ์']],
 sub:[['fan','โดนเปลี่ยนออกก็สมควรแล้ว วันนี้ไม่มีอะไรเลย'],['media','🔁 โค้ช {c} ไม่ทน! ถอด {n} ออกกลางเกม'],['fan','ทำไมเปลี่ยน {n} ออก โค้ชคิดอะไรอยู่!? 😡']],
 motm:[['media','🏅 แมนออฟเดอะแมตช์: {n} ({c}) เรตติ้ง {r}'],['fan','MOTM สมศักดิ์ศรี!! โหวตให้แล้ว 10 รอบ']],
 scandal:[['fan','ทำไมต้องทำแบบนี้ 💔 อุตส่าห์ซื้อเสื้อเบอร์คุณมา'],['media','สปอนเซอร์เริ่มถอยห่าง {n} หลังข่าวฉาว'],['media','🚨 ด่วน! {n} ตกเป็นข่าวฉาว สโมสรเตรียมสอบสวน'],['fan','ผิดหวังมาก เคยเป็นไอดอลของลูกผม 😞'],['rival','มีมใหม่มาแล้วว 😂 {n} เวอร์ชันนักมวยปล้ำ'],['pundit','ฝีเท้าดีแค่ไหนก็ไร้ค่าถ้าไม่มีวินัย'],['fan','#Save{tag} ใครยังเชียร์อยู่ยกมือ ✋'],['media','📸 ภาพหลุดสะเทือนวงการ! {n} ทำอะไรลงไป?']],
 coach:[['media','💥 รอยร้าว! {n} ปะทะเดือดกับโค้ช {c}'],['fan','อยู่ข้าง {n} ครับ โค้ชคนนี้ไม่ไหวจริง'],['fan','ไม่เคารพโค้ชแบบนี้ ไปอยู่ทีมอื่นเลย'],['pundit','นักเตะที่ทะเลาะกับโค้ชในที่สาธารณะ ส่วนใหญ่ไม่จบสวย']],
 party:[['media','🍾 จับภาพ {n} ปาร์ตี้ถึงเช้าก่อนเกม!'],['fan','เตะบอลไม่ได้แต่ปาร์ตี้เก่ง 🙃'],['rival','เตรียมตัวดีมากก ทีมเราขอบคุณ 🍻'],['fan','เขาก็คนนะ ให้เขาใช้ชีวิตบ้างเถอะ']],
};
const NICK=['เจ้าพายุ','ไอ้หนุ่มสายฟ้า','เมสซี่เมืองไทย','จอมถล่มประตู','เทพบุตรลูกหนัง','มังกรน้อย'],BNICK=['นักวิ่งมาราธอน','ผู้ใจบุญของคู่แข่ง','ลมเพลมพัด','กองหลังคู่แข่งเบอร์ 12'];
function mkPost(cat,v){const [ty,t]=pick(FP[cat]);const o3=(v.o||'คู่แข่ง').split(' ').pop(),c3=(v.c||'ทีม').split(' ').pop();
 const fill=x=>x.replace(/\{(\w+)\}/g,(_,k)=>({n:S.p.name,c:v.c,o:v.o,r:v.r,g:v.g,sc:v.sc,nick:pick(NICK),bnick:pick(BNICK),tag:S.p.name.replace(/\s/g,''),o3,c3,nat:NN(),flag:NF()}[k]??''));
 const reach=Math.max(20,S.p.fans)*(.02+R()*.08)*(ty==='media'?2:1);return{ty,av:pick(AV[ty]),h:'@'+fill(pick(HN[ty])),t:fill(t),lk:Math.round(reach),rt:Math.round(reach*(.1+R()*.3)),cat,d:new Date(now()).toLocaleDateString('th-TH',{timeZone:'Asia/Bangkok',day:'numeric',month:'short'})}}
function pushPosts(cats,v){S.feed=S.feed||[];const ps=cats.map(c=>mkPost(c,v));if(chance(.35)){const i=rnd(0,ps.length-1);if(ps[i].ty!=='media')ps[i].rep=1}ps.reverse().forEach(p=>S.feed.unshift(p));S.feed=S.feed.slice(0,40)}
function matchPosts(M,gf,ga,rating){const c=club().n,v={c,o:M.opp,r:rating,g:M.g,sc:`${gf}-${ga}`};const r=+rating,cats=[];
 if(!M.played)return;if(M.redDone)cats.push('red','red');if(M.subT&&r<6.3)cats.push('sub');
 if(r>=8)cats.push('motm','great','great');else if(r>=7.2)cats.push('great');else if(r>=6.2)cats.push('ok');else cats.push('bad','bad');
 if(M.g)cats.push('goal');if(r<6&&chance(.6))cats.push('bad');if(r>=7&&chance(.5))cats.push('great');
 pushPosts([...new Set(cats.slice(0,1))].concat(cats.slice(1)).slice(0,rnd(2,4)),v);legendMatch(r,v);promiseChk(r)}
function scandalPosts(kind){const v={c:club()?club().n:'',o:'',r:'',g:0};pushPosts(Array.from({length:rnd(2,3)},()=>kind),v)}
function postCard(p,i){return `<div class="post"><div class="row sp"><div class="row"><span class="pav">${p.av}</span><div><b>${p.h}</b><div class="mu" style="font-size:12px">${p.d}</div></div></div><span class="tag ${FT[p.ty][1]}">${FT[p.ty][0]}</span></div>
 <div style="margin:8px 0;font-size:15px;line-height:1.5">${p.t}</div><div class="row mu" style="font-size:13px;gap:16px"><span>❤️ ${fmt(p.lk)}</span><span>🔁 ${fmt(p.rt)}</span><span>💬 ${fmt(p.rt/3)}</span></div>
 ${p.rep?`<div class="row" style="margin-top:8px;gap:6px"><button class="btn s" style="flex:1;text-align:center;font-size:13px;padding:9px" data-rp="${i}:0">🙈 เมิน</button><button class="btn s" style="flex:1;text-align:center;font-size:13px;padding:9px" data-rp="${i}:1">🙏 ขอบคุณ</button><button class="btn s" style="flex:1;text-align:center;font-size:13px;padding:9px" data-rp="${i}:2">🔥 ตอกกลับ</button></div>`:p.my?`<div class="myrep row">${avatarSVG(S.p.av,32)}<span>↪️ <b>${S.p.name}</b>: ${p.my}</span></div>`:''}</div>`}
function replyPost(i,k){const p=S.feed[i],neg=['bad','red','sub','scandal','coach','party'].includes(p.cat)||p.ty==='rival';CONS=[];p.rep=0;
 if(k===0){p.my='(ไม่ตอบ)';E('morale',neg?-1:0);N('คุณเลือกเงียบ')}
 if(k===1){p.my=neg?'ขอบคุณสำหรับคำติ จะพัฒนาให้ดีขึ้นครับ 🙏':'ขอบคุณทุกกำลังใจครับ 💚';E('fans',neg?0.02:0.03);E('media',neg?5:2);E('morale',neg?1:3)}
 if(k===2){p.my=neg?'คนที่ไม่เคยเตะบอลอาชีพ ไม่ต้องมาสอนผมครับ 😏':'รอดูนัดหน้า จะมันกว่านี้อีก 😎';if(neg){E('fans',chance(.5)?0.05:-0.04);E('media',-8);E('morale',2);N('แคปไปลงเพจดังทั่วประเทศ');if(chance(.3))E('trust',-3)}else{E('fans',0.04);E('morale',3)}}
 save();sheet(`<span class="tag g">ผลที่ตามมา</span><ul class="cons">${CONS.map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" onclick="closeM();render()">ตกลง</button>`)}
// ===== NATIONALITY & AVATAR =====
const NATS={THA:['🇹🇭','ไทย',66],ENG:['🏴','อังกฤษ',80],ESP:['🇪🇸','สเปน',81],BRA:['🇧🇷','บราซิล',82],ARG:['🇦🇷','อาร์เจนตินา',82],FRA:['🇫🇷','ฝรั่งเศส',82],GER:['🇩🇪','เยอรมนี',80],ITA:['🇮🇹','อิตาลี',79],POR:['🇵🇹','โปรตุเกส',80],NED:['🇳🇱','เนเธอร์แลนด์',79],BEL:['🇧🇪','เบลเยียม',78],JPN:['🇯🇵','ญี่ปุ่น',72],KOR:['🇰🇷','เกาหลีใต้',71],KSA:['🇸🇦','ซาอุดีอาระเบีย',68],NGA:['🇳🇬','ไนจีเรีย',72],SEN:['🇸🇳','เซเนกัล',74],USA:['🇺🇸','สหรัฐอเมริกา',72],MEX:['🇲🇽','เม็กซิโก',73],AUS:['🇦🇺','ออสเตรเลีย',70],VIE:['🇻🇳','เวียดนาม',63],IDN:['🇮🇩','อินโดนีเซีย',62],MAS:['🇲🇾','มาเลเซีย',61]};
const LF=()=>S&&S.club?LEAGUES[S.club.c].f:'';const NAT=()=>NATS[(S&&S.p.nat)||'THA'],NF=()=>NAT()[0],NN=()=>NAT()[1];
const foreign=()=>S.club&&S.club.c!==S.p.nat;
const SKIN=['#f6d3b3','#e9b98f','#c98d60','#a06a43','#74492b','#4b2e1b'],HC=['#1a1a1a','#4a2c17','#8b5a2b','#d9a441','#e8e0d0','#b8322a','#2a5bd7'];
const AVO={s:['สีผิว',SKIN.map((_,i)=>'โทน '+(i+1))],h:['ทรงผม',['ปัดข้าง','สกินเฟด','แอฟโฟร','ยาวประบ่า','โมฮอว์ก','หนามแหลม','แมนบัน','บัซคัท','อันเดอร์คัท','สลิคแบ็ค','เท็กซ์เจอร์ครอป','เคิร์ลลี่ท็อป']],hc:['สีผม',['ดำ','น้ำตาลเข้ม','น้ำตาล','บลอนด์','เทา/ขาว','แดง','น้ำเงิน']],f:['รูปหน้า',['กลม','รี','เหลี่ยม']],e:['ดวงตา',['คม','ยิ้มตา','ดุดัน','เหยี่ยว']],b:['หนวดเครา',['ไม่มี','เครางาม','หนวด','เคราแพะ','ไรหนวด']],a:['เครื่องประดับ',['ไม่มี','ผ้าคาดผม','ต่างหู','ผ้าคาด+ต่างหู']]};
const DAV={s:2,h:8,hc:0,f:0,e:0,b:0,a:0};
function kitCol(){return S&&S.club&&club()?`hsl(${hue(club().n)},70%,45%)`:'#3a4a40'}
let AVN=0;
function shade(hex,a){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const f=v=>Math.max(0,Math.min(255,Math.round(a<0?v*(1+a):v+(255-v)*a)));return '#'+((1<<24)+(f(r)<<16)+(f(g)<<8)+f(b)).toString(16).slice(1)}
function lockP(x0,y0,cx,cy,x1,y1,wd){const dx=x1-x0,dy=y1-y0,l=Math.hypot(dx,dy)||1,nx=-dy/l*wd/2,ny=dx/l*wd/2;return `M${(x0+nx).toFixed(1)} ${(y0+ny).toFixed(1)} Q${(cx+nx).toFixed(1)} ${(cy+ny).toFixed(1)} ${x1} ${y1} Q${(cx-nx).toFixed(1)} ${(cy-ny).toFixed(1)} ${(x0-nx).toFixed(1)} ${(y0-ny).toFixed(1)}Z`}
function locks(arr,c){return arr.map(([x0,y0,cx,cy,x1,y1,wd])=>`<path d="${lockP(x0,y0,cx,cy,x1,y1,wd)}" fill="${c.H}"/><path d="M${x0} ${y0} Q${cx} ${cy} ${x1} ${y1}" stroke="${c.hcL}" stroke-width="${(wd*.18).toFixed(2)}" fill="none" opacity=".45" stroke-linecap="round"/>`).join('')}
function hairDefs(id,hc,hcL,hcD){return `<linearGradient id="${id}f" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hc}" stop-opacity=".95"/><stop offset=".55" stop-color="${hcD}" stop-opacity=".55"/><stop offset="1" stop-color="${hcD}" stop-opacity="0"/></linearGradient><radialGradient id="${id}m" cx="45%" cy="25%" r="70%"><stop offset="0" stop-color="${hcL}"/><stop offset=".5" stop-color="${hc}"/><stop offset="1" stop-color="${hcD}"/></radialGradient><filter id="${id}b" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation=".35"/></filter>`}
// mass over skull with natural hairline; v=volume above skull, hy=hairline y
function mass(c,v,hy,fill){const{L,R}=c;return `<path d="M${L-1.2} 40 C${L-2.2} 24 ${L+3} ${14-v} 50 ${13.5-v} C${R-3} ${14-v} ${R+2.2} 24 ${R+1.2} 40 L${R-.6} 40 Q${R-.6} 31 ${R-4} ${hy+1} Q50 ${hy-3} ${L+4} ${hy+1} Q${L+.6} 31 ${L+.6} 40Z" fill="${fill||`url(#${c.id}m)`}" filter="url(#${c.id}b)"/>`}
function sides(c,op=1){const{L,R}=c;return `<path d="M${L-1.4} 26 Q${L-2.2} 34 ${L-.8} 44 L${L+1.6} 44 Q${L+1} 34 ${L+3} 28Z M${R+1.4} 26 Q${R+2.2} 34 ${R+.8} 44 L${R-1.6} 44 Q${R-1} 34 ${R-3} 28Z" fill="url(#${c.id}f)" opacity="${op}" filter="url(#${c.id}b)"/>`}
function buzz(c,op=.3){const{L,R}=c;return `<path d="M${L-.4} 38 C${L-.8} 22 ${L+5} 15 50 14.8 C${R-5} 15 ${R+.8} 22 ${R+.4} 38 L${R-1} 38 Q${R-2} 27 50 25.5 Q${L+2} 27 ${L+1} 38Z" fill="${c.hcD}" opacity="${op}" filter="url(#${c.id}b)"/>`}
function fadeS(c,top=27,op=1){const{L,R}=c;return `<path d="M${L-1.3} ${top} Q${L-2} 36 ${L-.6} 45 L${L+1.2} 45 Q${L+1} 36 ${L+3.5} ${top-1}Z M${R+1.3} ${top} Q${R+2} 36 ${R+.6} 45 L${R-1.2} 45 Q${R-1} 36 ${R-3.5} ${top-1}Z" fill="url(#${c.id}f)" opacity="${op}" filter="url(#${c.id}b)"/>`}
function topM(c,v,hy,opt={}){const{L,R}=c;const T=14-v,sl=opt.sl||0,lx=L+(opt.lw||1),rx=R-(opt.rw||1),sy=opt.sy||30;
 return `<path d="M${lx} ${sy} C${L-1} ${T+9} ${L+4+sl} ${T} ${50+sl} ${T} C${R-3+sl} ${T} ${R+1.5} ${T+7} ${rx} ${sy} Q${R-3} ${hy+1} ${R-6} ${hy} Q50 ${hy-(opt.dip||1.5)} ${L+6} ${hy} Q${L+2.5} ${hy+1} ${lx} ${sy}Z" fill="url(#${c.id}m)" filter="url(#${c.id}b)"/>`}
function strands(c,arr,col,op=.4,wd=.7){return arr.map(d=>`<path d="${d}" stroke="${col}" stroke-width="${wd}" fill="none" opacity="${op}" stroke-linecap="round"/>`).join('')}
function curls(c,pts,r){return pts.map(([x,y,rr])=>{rr=rr||r;return `<circle cx="${x}" cy="${y}" r="${rr}" fill="url(#${c.id}m)"/><path d="M${x-rr*.55} ${y+rr*.1} a${rr*.55} ${rr*.55} 0 1 1 ${rr*.8} ${rr*.4}" stroke="${c.hcL}" stroke-width=".7" fill="none" opacity=".5"/>`}).join('')}
function hairBack(c){const{L,R,h}=c;
 if(h===2)return curls(c,[[L-2,30,5],[L-3,38,4.5],[R+2,30,5],[R+3,38,4.5],[L,22,5.5],[R,22,5.5]],5);
 if(h===3)return `<path d="M${L-1} 26 Q${L-7} 40 ${L-5} 52 Q${L-7} 60 ${L-2} 66 Q${L+3} 62 ${L+1.5} 54 L${R-1.5} 54 Q${R-3} 62 ${R+2} 66 Q${R+7} 60 ${R+5} 52 Q${R+7} 40 ${R+1} 26Z" fill="url(#${c.id}m)" filter="url(#${c.id}b)"/>`;
 if(h===6)return `<circle cx="52" cy="9.5" r="5.6" fill="url(#${c.id}m)"/>${strands(c,[`M48 9.5 Q52 5 56 9.5`],c.hcL,.5)}`;
 return ''}
function hairFront(c){const{L,R,h,hcL,hcD}=c;let o='';
 switch(h){
 case 0: o+=fadeS(c,27,.8)+topM(c,7,26,{sl:2,dip:3})+strands(c,[`M${L+4} 24 Q46 11 ${R} 18`,`M${L+8} 25 Q50 13 ${R-1} 24`,`M${L+12} 26 Q52 16 ${R-2} 27`],hcL,.4);break;
 case 1: o+=fadeS(c,26,1)+topM(c,4,25.5,{lw:2.5,rw:2.5,sy:27,dip:.5})+strands(c,[`M${L+6} 22 Q50 15 ${R-6} 21`,`M${L+8} 18 Q50 12.5 ${R-8} 17`],hcL,.35);break;
 case 2: o+=curls(c,[[L+1,25,5.5],[L+5,17,6],[L+12,12,6],[50,10,6.5],[R-12,12,6],[R-5,17,6],[R-1,25,5.5],[L+9,21,5],[50,18,5],[R-9,21,5],[44,23,4],[56,23,4]],5.5);break;
 case 3: o+=topM(c,4,26,{dip:4})+`<path d="M50 15 Q${L+3} 17 ${L-3} 34 Q${L-2} 26 ${L+2} 24 Q${L+6} 20 50 19Z" fill="url(#${c.id}m)"/><path d="M50 15 Q${R-3} 17 ${R+3} 34 Q${R+2} 26 ${R-2} 24 Q${R-6} 20 50 19Z" fill="url(#${c.id}m)"/>`+strands(c,[`M${L-2} 30 Q${L-5} 42 ${L-3} 58`,`M${R+2} 30 Q${R+5} 42 ${R+3} 58`,`M48 16 Q${L+6} 17 ${L} 26`,`M52 16 Q${R-6} 17 ${R} 26`],hcL,.35,.8);break;
 case 4: o+=fadeS(c,25,1)+buzz(c,.22)+`<path d="M43 27 Q42 18 44 12 L46 15 L47 7 L49.5 11 L51 3 L53 10 L55 6 L56 13 L58 11 Q58.5 20 57 27 Q50 25 43 27Z" fill="url(#${c.id}m)" filter="url(#${c.id}b)"/>`+strands(c,[`M46 25 Q46 14 50 5`,`M54 25 Q55 15 55 8`],hcL,.45);break;
 case 5: o+=fadeS(c,26,1)+topM(c,3.5,25.5,{lw:2.5,rw:2.5,sy:27})+`<path d="M${L+3} 25 L${L+3} 16 L${L+7} 18 L${L+8} 9 L${L+12} 14 L46 6 L49 12 L52 5 L55 12 L${R-11} 7 L${R-9} 14 L${R-5} 10 L${R-4} 18 L${R-2} 17 L${R-2} 25 Q50 21 ${L+3} 25Z" fill="url(#${c.id}m)" filter="url(#${c.id}b)"/>`+strands(c,[`M${L+8} 21 L${L+9} 12`,`M47 20 L47.5 9`,`M53 20 L53 9`,`M${R-8} 21 L${R-8} 12`],hcL,.45);break;
 case 6: o+=topM(c,1.5,26,{dip:1})+strands(c,[`M${L+4} 27 Q${L+6} 15 ${R-6} 11`,`M${L+9} 25 Q48 14 ${R-5} 13`,`M46 25 Q52 15 ${R-4} 15`,`M${R-2} 28 Q${R-1} 18 ${R-5} 13`],hcL,.4,.8);break;
 case 7: o+=fadeS(c,26,.6)+`<path d="M${L+.4} 33 C${L-.6} 21 ${L+5} 13.6 50 13.4 C${R-5} 13.6 ${R+.6} 21 ${R-.4} 33 Q${R-3} 26.5 ${R-6} 25.8 Q50 24.6 ${L+6} 25.8 Q${L+3} 26.5 ${L+.4} 33Z" fill="url(#${c.id}m)" opacity=".92" filter="url(#${c.id}b)"/>`;break;
 case 8: o+=fadeS(c,24,1)+topM(c,8,25.5,{lw:3,rw:3,sy:25,sl:1})+strands(c,[`M${L+5} 23 Q${L+4} 10 50 8 Q${R-4} 8 ${R-4} 16`,`M${L+9} 24 Q${L+10} 13 52 11`,`M48 24 Q52 13 ${R-5} 13`,`M${L+4} 19 Q${L+8} 13 ${L+13} 13`],hcL,.45,.8)+strands(c,[`M44 22 Q47 15 54 13`],hcD,.5,.7);break;
 case 9: o+=fadeS(c,25,1)+topM(c,6,25.5,{lw:2.5,rw:2.5,sy:26,dip:.8})+strands(c,[`M${L+5} 24 Q${L+6} 11 ${R-4} 11`,`M${L+9} 25 Q${L+12} 12 ${R-2} 15`,`M46 25 Q50 13 ${R-1} 19`,`M53 25 Q58 16 ${R-1} 23`],hcL,.5,.9);break;
 case 10: o+=fadeS(c,25,1)+topM(c,4,26.5,{lw:2.5,rw:2.5,sy:26,dip:-1})+curls(c,[[L+6,18,3.4],[L+12,14.5,3.6],[50,13.5,3.6],[R-12,14.5,3.6],[R-6,18,3.4],[L+9,23,3.2],[46,20,3.2],[54,20,3.2],[R-9,23,3.2]],3.4);break;
 case 11: o+=fadeS(c,24,1)+topM(c,6,25.5,{lw:2.5,rw:2.5,sy:26})+curls(c,[[L+4,21,4.3],[L+8,14,4.6],[L+14,9.5,4.6],[50,8,4.8],[R-14,9.5,4.6],[R-8,14,4.6],[R-4,21,4.3],[L+10,20,4.2],[50,15,4.4],[R-10,20,4.2],[44,22.5,3.6],[56,22.5,3.6]],4.4);break;
 }return o}
function avatarSVG(av,size=64,kit){av=Object.assign({},DAV,av||{});const id='a'+(AVN++),sk=SKIN[av.s],hc=HC[av.hc];kit=kit||kitCol();
 const skD=shade(sk,-.16),skL=shade(sk,.14),hcL=shade(hc,.3),hcD=shade(hc,-.3),h=av.h;
 const w=[18.5,17,19.5][av.f],L=50-w,R=50+w,cy=av.f===2?72:73,cx=av.f===2?7.5:6;
 const face=`M${L} 36 C${L} 51 ${L+2.5} 60 ${50-cx} 67.5 Q50 ${cy+1} ${50+cx} 67.5 C${R-2.5} 60 ${R} 51 ${R} 36 C${R} 21 ${R-6} 14.5 50 14.5 C${L+6} 14.5 ${L} 21 ${L} 36Z`;
 let o=`<defs><radialGradient id="${id}s" cx="46%" cy="40%" r="62%"><stop offset="0" stop-color="${skL}"/><stop offset=".7" stop-color="${sk}"/><stop offset="1" stop-color="${skD}"/></radialGradient>
 <linearGradient id="${id}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hcL}"/><stop offset=".55" stop-color="${hc}"/><stop offset="1" stop-color="${hcD}"/></linearGradient>
 <linearGradient id="${id}k" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${kit}"/><stop offset="1" stop-color="#000" stop-opacity=".5"/></linearGradient>
 <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".2"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
 ${hairDefs(id,hc,hcL,hcD)}<radialGradient id="${id}bg" cx="50%" cy="30%" r="75%"><stop offset="0" stop-color="#2d4a3a"/><stop offset="1" stop-color="#0d1611"/></radialGradient></defs><rect width="110" height="110" fill="url(#${id}bg)"/>`;
 const H=`url(#${id}h)`;
 const C={L,R,w,h,id,H,hc,hcL,hcD};o+=hairBack(C);
 // body + neck
 o+=`<path d="M2 102 Q4 81 24 76 Q36 73 41 70 L59 70 Q64 73 76 76 Q96 81 98 102Z" fill="url(#${id}k)"/><path d="M2 102 Q4 81 24 76 Q36 73 41 70 L59 70 Q64 73 76 76 Q96 81 98 102Z" fill="url(#${id}g)"/>`;
 o+=`<path d="M41.5 62 L41.5 73 Q50 79 58.5 73 L58.5 62Z" fill="${sk}"/><path d="M41.5 64 Q50 71 58.5 64 L58.5 68 Q50 74 41.5 68Z" fill="${skD}" opacity=".55"/>`;
 o+=`<path d="M38 71 L50 85 L62 71 L58.5 69 L50 78 L41.5 69Z" fill="#fff" opacity=".92"/><path d="M33 74 L41 69.5 L44 76Z M67 74 L59 69.5 L56 76Z" fill="${kit}" stroke="#fff" stroke-width="1.1" stroke-opacity=".75"/>`;
 // ears
 o+=`<path d="M${L+.5} 40 Q${L-5} 38.5 ${L-4.5} 45.5 Q${L-3.5} 51 ${L+1} 51Z" fill="${sk}"/><path d="M${R-.5} 40 Q${R+5} 38.5 ${R+4.5} 45.5 Q${R+3.5} 51 ${R-1} 51Z" fill="${sk}"/><path d="M${L-2.5} 43 Q${L-3} 46.5 ${L-.5} 48.5 M${R+2.5} 43 Q${R+3} 46.5 ${R+.5} 48.5" stroke="${skD}" stroke-width=".9" fill="none" opacity=".7"/>`;
 // face
 o+=`<path d="${face}" fill="url(#${id}s)"/>`;
 // facial hair
 const bp=`M${L+.3} 44 C${L+.5} 55 ${L+3} 61 ${50-cx} 67.5 Q50 ${cy+1} ${50+cx} 67.5 C${R-3} 61 ${R-.5} 55 ${R-.3} 44 Q${R-2} 56 ${50+5} 60.5 Q50 59 ${50-5} 60.5 Q${L+2} 56 ${L+.3} 44Z`;
 if(av.b===1)o+=`<path d="${bp}" fill="${H}"/>`;if(av.b===4)o+=`<path d="${bp}" fill="${hcD}" opacity=".22"/>`;
 if(av.b===3)o+=`<path d="M47.2 64.6 Q50 63.6 52.8 64.6 Q52.6 ${cy-2} 50 ${cy-.3} Q47.4 ${cy-2} 47.2 64.6Z" fill="${H}" opacity=".9"/>`;
 // lips (fuller)
 o+=`<path d="M44.6 59.3 Q47.2 57.7 50 58.6 Q52.8 57.7 55.4 59.3 Q50 60 44.6 59.3Z" fill="${shade(sk,-.32)}"/><path d="M45.2 59.5 Q50 64 54.8 59.5 Q50 60.5 45.2 59.5Z" fill="${shade(sk,-.17)}"/><ellipse cx="50" cy="61.4" rx="2.4" ry=".7" fill="${skL}" opacity=".55"/>`;
 if(av.b===2||av.b===1)o+=`<path d="M43.5 58 Q47 55.4 50 56.4 Q53 55.4 56.5 58 Q53 57.3 50 57.8 Q47 57.3 43.5 58Z" fill="${hcD}"/>`;
 // nose (subtle)
 o+=`<path d="M51.4 44 Q52.6 49.5 51.6 51.6" stroke="${skD}" stroke-width=".9" fill="none" stroke-linecap="round" opacity=".55"/><path d="M47.6 52 Q50 53.4 52.4 52" stroke="${shade(sk,-.25)}" stroke-width=".9" fill="none" stroke-linecap="round" opacity=".55"/>`;
 // eyes
 const ey=42,eh=av.e===3?2.2:av.e===1?2.3:2.7;
 for(const x of [50-8.3,50+8.3]){o+=`<path d="M${x-4.6} ${ey} Q${x} ${ey-eh-.4} ${x+4.6} ${ey} Q${x} ${ey+eh-.5} ${x-4.6} ${ey}Z" fill="#f6f3ee"/><circle cx="${x+.2}" cy="${ey}" r="${Math.min(2.2,eh-.3)}" fill="#3b2a1d"/><circle cx="${x+.2}" cy="${ey}" r="1" fill="#0b0b0b"/><circle cx="${x+.9}" cy="${ey-.8}" r=".55" fill="#fff"/><path d="M${x-5} ${ey+.1} Q${x} ${ey-eh-1} ${x+5} ${ey+.1}" stroke="#1a120c" stroke-width="1.1" fill="none" stroke-linecap="round"/>`}
 // brows
 const bc=h===7?shade(sk,-.5):hcD,ang=av.e===2?2.2:0;
 o+=`<path d="M36.5 ${37.4+ang*.2} Q41 ${35.2+ang*.6} 46 ${36+ang} L46 ${37.3+ang} Q41 ${36.8+ang*.6} 36.8 ${38.6+ang*.2}Z" fill="${bc}"/><path d="M63.5 ${37.4+ang*.2} Q59 ${35.2+ang*.6} 54 ${36+ang} L54 ${37.3+ang} Q59 ${36.8+ang*.6} 63.2 ${38.6+ang*.2}Z" fill="${bc}"/>`;
 o+=hairFront(C);
 // accessories
 if(av.a===1||av.a===3)o+=`<path d="M${L-1.8} 31.5 Q50 24 ${R+1.8} 31.5 L${R+1.8} 35 Q50 27.6 ${L-1.8} 35Z" fill="#f2f2f2"/><path d="M${L-1.8} 33.2 Q50 25.8 ${R+1.8} 33.2" stroke="${kit}" stroke-width="1.1" fill="none"/>`;
 if(av.a===2||av.a===3)o+=`<circle cx="${L-3.2}" cy="50.5" r="1.5" fill="#ffd21f"/>`;
 return `<svg class="avs" viewBox="12 5 76 76" width="${size}" height="${size}">${o}</svg>`}
function avEditor(av){return `<div class="row" style="justify-content:center">${avatarSVG(av,120)}</div>${Object.entries(AVO).map(([k,[l,opts]])=>`<div class="row sp aer"><span class="mu">${l}</span><div class="row"><button class="ab" data-ae="${k}:-1">◀</button><b style="min-width:96px;text-align:center">${opts[av[k]]}</b><button class="ab" data-ae="${k}:1">▶</button></div></div>`).join('')}<button class="btn s" style="text-align:center" data-ae="rand:0">🎲 สุ่ม</button>`}
function bindAe(av,redraw){document.querySelectorAll('[data-ae]').forEach(b=>b.onclick=()=>{const[k,d]=b.dataset.ae.split(':');if(k==='rand')for(const q in AVO)av[q]=rnd(0,AVO[q][1].length-1);else{const n=AVO[k][1].length;av[k]=(av[k]+(+d)+n)%n}redraw()})}
function editAvatar(){const av=Object.assign({},DAV,S.p.av);const d=()=>{sheet(`<span class="tag o">แก้ไขอวตาร</span>${avEditor(av)}<button class="btn" id="avs">💾 บันทึก</button>`);bindAe(av,d);$('#avs').onclick=()=>{S.p.av=av;save();closeM();render()}};d()}
function AVI(){const p=S.p;if(!S.hist&&S.club)S.hist=[{f:LEAGUES[S.club.c].f,n:club().n,d:tierOf(S.club.c,S.club.t).n,y:S.slabel||''}];if(!p.nat)p.nat='THA';if(!p.av)p.av=Object.assign({},DAV)}
window.closeM=closeM;window.render=render;


document.addEventListener('gesturestart',e=>e.preventDefault(),{passive:false});
document.addEventListener('dblclick',e=>e.preventDefault(),{passive:false});
let LTE=0;document.addEventListener('touchend',e=>{const t=Date.now();if(e.target.closest&&e.target.closest('.mg')){if(t-LTE<300){e.preventDefault();e.target.click&&e.target.closest('button')&&e.target.closest('button').click()}}LTE=t},{passive:false});
// ===== PORTRAIT AVATARS (override SVG builder) =====
function AGf(){return [['as','เอเชีย'],['bl','ผิวเข้ม'],['eu','ยุโรป'],['la','ละติน/อาหรับ']]}
function avFix(av){if(!av)av={};if(av.g==null){const s=av.s==null?2:av.s;av.g=s<=1?'eu':s===2?'as':s===3?'la':'bl';av.i=(av.h||0)%8}return av}
function avatarSVG(av,size=64){av=avFix(av);return `<div class="pav2" style="width:${size}px;height:${size}px;border-color:${kitCol()}"><img src="avatars/${av.g}${av.i}.webp" alt="" width="${size}" height="${size}"></div>`}
function avEditor(av){avFix(av);return `<div class="row" style="justify-content:center">${avatarSVG(av,120)}</div><div class="chips" style="justify-content:center;margin:10px 0">${AGf().map(([k,l])=>`<div class="chip ${av.g===k?'on':''}" data-ag="${k}">${l}</div>`).join('')}</div>
 <div class="avgrid">${[0,1,2,3,4,5,6,7].map(i=>`<img src="avatars/${av.g}${i}.webp" class="${av.i===i?'on':''}" data-ai="${i}" alt="">`).join('')}</div><button class="btn s" data-ar="1" style="text-align:center">🎲 สุ่มหน้าตา</button>`}
function bindAe(av,redraw){document.querySelectorAll('[data-ag]').forEach(b=>b.onclick=()=>{av.g=b.dataset.ag;redraw()});document.querySelectorAll('[data-ai]').forEach(b=>b.onclick=()=>{av.i=+b.dataset.ai;redraw()});const r=document.querySelector('[data-ar]');if(r)r.onclick=()=>{av.g=pick(AGf())[0];av.i=rnd(0,7);redraw()}}
// ===== TRUST TIERS, SP MILESTONES, FAN MILESTONES =====
var TT=['ดาวรุ่ง','สำรอง','สำรองตัวหลัก','ตัวจริง','ตัวหลัก/กัปตัน'];
function pipN(v){return v<60?2:v<70?3:v<80?4:v<90?6:8}
function TTI(){const p=S.p;if(p.tt==null){p.tt=p.role==='kid'?0:p.role==='rot'?1:3;p.trust=cl(p.trust,15,70)}}
function syncRole(){const p=S.p;p.role=p.tt>=3?'star':p.tt>=1?'rot':'kid'}
function tierChk(){const p=S.p;if(!S.club||p.tt==null)return;if(p.trust>=100&&p.tt<4){p.tt++;p.trust=30;syncRole();const m=`⬆️ เลื่อนขั้น! ตอนนี้คุณคือ ${TT[p.tt]}`;CONS.push(m);toast(m);news(`⬆️ ${p.name} ได้รับความไว้ใจเพิ่ม ขึ้นเป็น${TT[p.tt]}ของ ${club().n}`)}else if(p.trust>=100)p.trust=100;else if(p.trust<=0&&p.tt>0){p.tt--;p.trust=60;syncRole();const m=`⬇️ ถูกลดขั้นเป็น ${TT[p.tt]}`;CONS.push(m);toast(m)}else if(p.trust<=0)p.trust=5}
function tierCard(){TTI();const p=S.p;return `<div class="card"><div class="row sp"><span class="mu">ระดับในทีม · ความไว้ใจโค้ช</span><span class="mu">${p.tt<4?'ถัดไป: '+TT[p.tt+1]:'สูงสุดแล้ว'}</span></div>
 <div class="tladder">${TT.map((t,i)=>`<span class="${i===p.tt?'on':i<p.tt?'done':''}">${t}</span>`).join('')}</div>${bar(p.trust,p.trust<25?'r':'o')}${p.promise&&p.promise.left>0?`<p class="ye" style="margin-top:4px">🤝 โค้ชสัญญาให้ลงเล่น — เหลือ ${p.promise.left} นัด</p>`:''}${p.listed?'<p class="re">📋 คุณถูกประกาศขาย — รอข้อเสนอ</p>':''}<button class="btn s" style="text-align:center;margin-top:8px" onclick="talkCoach()">🗣️ คุยกับโค้ช${talkCD()>0?` (อีก ${talkCD()} วัน)`:''}</button><p class="mu" style="margin-top:4px">${Math.round(p.trust)}/100 · ครบ 100 = เลื่อนขั้น · ถึง 0 = ลดขั้น · เรตติ้ง/ประตูช่วยดันแถบ ฟอร์มแย่ทำให้ลด</p></div>`}
var FMS=[[1000,20000,2,5,3],[5000,50000,3,5,4],[10000,100000,4,6,5],[50000,300000,6,8,6],[100000,600000,8,8,8],[500000,2000000,12,10,10],[1000000,5000000,20,15,12]];
function fanMS(){const p=S.p;p.fms=p.fms||0;while(p.fms<FMS.length&&p.fans>=FMS[p.fms][0]){const[f,m,sp,mo,tr]=FMS[p.fms];p.fms++;p.money+=m;PI();p.sp+=sp;p.morale=cl(p.morale+mo);p.trust=cl(p.trust+tr);const t=`🎉 ผู้ติดตามครบ ${fmt(f)}! รางวัล ฿${fmt(m)} · ⭐${sp} SP · ขวัญ +${mo} · ความไว้ใจ +${tr}`;CONS.push(t);toast(t);news(t)}}
function fanCard(){const p=S.p;p.fms=p.fms||0;const nx=FMS[p.fms],pv=p.fms?FMS[p.fms-1][0]:0;return `<div class="card"><div class="row sp"><b>👥 ผู้ติดตาม ${fmt(p.fans)}</b><span class="mu">${nx?'เป้าหมายถัดไป '+fmt(nx[0]):'ครบทุกเป้าแล้ว!'}</span></div>${nx?bar((p.fans-pv)/(nx[0]-pv)*100,'o')+`<p class="mu" style="margin-top:4px">รางวัล: ฿${fmt(nx[1])} · ⭐${nx[2]} SP · ขวัญ +${nx[3]} · ความไว้ใจ +${nx[4]}</p>`:''}<div class="chips" style="margin-top:6px;flex-wrap:wrap">${FMS.map((x,i)=>`<span class="chip ${i<p.fms?'on':''}">${fmt(x[0])}</span>`).join('')}</div></div>`}
var SPM=[['tg',[1,5,10,25,50,100],'ประตูอาชีพ'],['app',[1,10,25,50,100],'นัดอาชีพ']];
function msChk(){const p=S.p;p.msd=p.msd||{};p.capp=(p.capp||0)+1;const v={tg:p.tg,app:p.capp};SPM.forEach(([k,L,n])=>L.forEach(x=>{const id=k+x;if(v[k]>=x&&!p.msd[id]){p.msd[id]=1;const sp=Math.max(2,Math.round(Math.sqrt(x)*1.5));addSP(sp,`ไมล์สโตน ${x} ${n}`);toast(`🏅 ไมล์สโตน: ${x} ${n}! ⭐+${sp} SP`)}}))}
function toast(t){let d=document.getElementById('toast');if(!d){d=document.createElement('div');d.id='toast';document.body.appendChild(d)}const e=document.createElement('div');e.className='tst';e.textContent=t;d.appendChild(e);setTimeout(()=>e.classList.add('out'),2600);setTimeout(()=>e.remove(),3200)}
// ===== SOUND (Web Audio synth) =====
var AC=null,SND=localStorage.getItem('fl_snd')!=='0',AMB=null;
function acx(){if(!AC){try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}}if(AC&&AC.state==='suspended')AC.resume();return AC}
function tone(f,d,type='sine',v=.15,t0=0,f2){const a=acx();if(!a)return;const t=a.currentTime+t0,o=a.createOscillator(),g=a.createGain();o.type=type;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g).connect(a.destination);o.start(t);o.stop(t+d+.05)}
function noise(d,v=.2,fq=1000,q=.7,t0=0,loop){const a=acx();if(!a)return null;const n=a.createBuffer(1,a.sampleRate*(loop?2:d),a.sampleRate),c=n.getChannelData(0);for(let i=0;i<c.length;i++)c[i]=Math.random()*2-1;const s=a.createBufferSource();s.buffer=n;s.loop=!!loop;const f=a.createBiquadFilter();f.type='bandpass';f.frequency.value=fq;f.Q.value=q;const g=a.createGain(),t=a.currentTime+t0;
 if(loop)g.gain.value=v;else{g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(v,t+d*.25);g.gain.exponentialRampToValueAtTime(.0001,t+d)}s.connect(f).connect(g).connect(a.destination);s.start(t);if(!loop)s.stop(t+d+.05);return{s,g}}
function SFX(k){if(!SND)return;try{
 if(k==='whistle'){tone(2800,.35,'square',.06,0,2700);tone(3000,.35,'sine',.05)}
 else if(k==='whistle3'){[0,.45,.9].forEach((t,i)=>{tone(2800,i<2?.3:.7,'square',.06,t);tone(3000,i<2?.3:.7,'sine',.05,t)})}
 else if(k==='cheer'){noise(2.2,.35,900,.5);noise(1.8,.2,2200,.8,.1);tone(523,.15,'triangle',.08,.05);tone(659,.15,'triangle',.08,.18);tone(784,.3,'triangle',.08,.31)}
 else if(k==='groan'){noise(1.2,.22,350,.6);tone(300,.7,'sawtooth',.03,0,180)}
 else if(k==='card'){tone(1800,.08,'square',.06);tone(900,.25,'triangle',.08,.08)}
 else if(k==='tap'){tone(1200,.04,'sine',.04)}
 else if(k==='hit'){tone(660,.08,'triangle',.12);tone(990,.12,'triangle',.1,.06)}
 else if(k==='miss'){tone(220,.18,'sawtooth',.06,0,140)}
 else if(k==='jingle'){[523,659,784,1047].forEach((f,i)=>tone(f,.22,'triangle',.1,i*.1))}
 else if(k==='chime'){[1319,1568,2093].forEach((f,i)=>tone(f,.6,'sine',.08,i*.12))}
}catch(e){}}
function amb(on){if(on&&SND&&!AMB){AMB=noise(1,.035,600,.4,0,true)}else if(!on&&AMB){try{AMB.s.stop()}catch(e){}AMB=null}}
document.addEventListener('pointerdown',e=>{acx();if(e.target.closest&&e.target.closest('button,.chip,.opt,[data-ai],[data-ag]')&&!e.target.closest('.mg'))SFX('tap')},{capture:true});
(function(){const _tk=tk;tk=function(M,t){if(/^⚽ ประตู/.test(t))SFX('cheer');else if(/ยิงได้$/.test(t))SFX('groan');else if(/^🟨 ป้าย/.test(t)){}else if(/^🟥/.test(t))SFX('card');else if(/^⏸️/.test(t)||/^▶ เริ่มครึ่งหลัง/.test(t)||/^🗓️/.test(t))SFX('whistle');else if(/^🏁/.test(t))SFX('whistle3');return _tk(M,t)};
 const _y=yellow;yellow=function(M){SFX('card');return _y(M)};
 const _sh=sheet;sheet=function(h){if(h.includes('class="res no"'))SFX('miss');else if(h.includes('class="res ok"')&&!h.includes('ประตู!'))SFX('hit');return _sh(h)};
 const _to=toast;toast=function(t){SFX(/ผู้ติดตามครบ/.test(t)?'chime':/เลื่อนขั้น|ไมล์สโตน|ขึ้นเป็น/.test(t)?'jingle':'tap');return _to(t)};
 const _ax=addXP;addXP=function(x){const l=S.p.tlv;const r=_ax(x);if(S.p.tlv>l)SFX('jingle');return r};
 const _re=resume;resume=function(){const r=_re();amb(!!LIVE);return r};
 const _ft=fulltime;fulltime=function(){amb(false);return _ft()};
})();
function sndBtn(){let b=document.getElementById('sndb');if(!b){b=document.createElement('button');b.id='sndb';document.body.appendChild(b);b.onclick=()=>{SND=!SND;localStorage.setItem('fl_snd',SND?'1':'0');if(!SND)amb(false);else{acx();SFX('tap');if(LIVE&&!LIVE.paused)amb(true)}sndBtn()}}b.textContent=SND?'🔊':'🔇'}
sndBtn();

// ===== BOOT (after all definitions) =====
function boot(){load();if(S&&!S.gameT){try{S.gameT=Math.min(Date.now()+(S.devOff||0),S.ko[Math.min(S.week,S.N-1)]);delete S.dev}catch(e){}}
 try{render()}catch(e){console.error(e);toast('⚠️ โหลดหน้าจอผิดพลาด แต่เซฟยังอยู่: '+e.message)}
 if(!S)idbGet(j=>{const o=j&&parseSave(j);if(o&&!S){S=o;save();render();toast('♻️ กู้เซฟจากที่เก็บสำรองแล้ว')}});
 try{navigator.storage&&navigator.storage.persist&&navigator.storage.persist()}catch(e){}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')save()});
window.addEventListener('pagehide',()=>save());
setInterval(()=>{if(S)save()},20000);
// ===== SHIRT NUMBERS =====
var KEYN=[1,7,9,10];
function hsh(t){let h=7;for(const ch of t)h=(h*131+ch.charCodeAt(0))%1000003;return h}
var LGF=['ซานโต','มาร์โก','เคนจิ','อาลี','ดิเอโก','ฮันส์','ลูก้า','ปิแอร์','ซอมชาย','ราฟาเอล','ยูซุฟ','อีวาน'],LGL=['เดอะ เลเจนด์','"เจ้าชาย"','"ฟ้าผ่า"','"นักเวทย์"','"กัปตันเหล็ก"','"เท้าทองคำ"','"สิงห์เฒ่า"'],LGS=['ยิงประตูชัยในนัดชิงแชมป์ ก่อนเลิกเล่นในสโมสรเดียวตลอดชีวิต','ทำ 200 ประตูให้สโมสร แฟนบอลวาดภาพไว้ที่กำแพงสนาม','พาทีมหนีตกชั้นวันสุดท้ายด้วยแฮตทริก','เป็นกัปตัน 12 ปี เสื้อเบอร์นี้ถูกเก็บไว้รอ "คนที่คู่ควร"','จากเด็กเก็บบอลสู่ดาวยิงอันดับหนึ่งของลีก'];
function legends(cb){const h=hsh(cb.n),n=cb.s>=70?1+(h%2):cb.s>=58?(h%3===0?1:0)+(h%5===0?1:0):(h%4===0?1:0),pool=[7,10,9,14,8,11,1,4,23,5];const r=[];for(let i=0;i<n;i++){const num=pool[(h>>(i*3))%pool.length];if(r.some(x=>x.n===num))continue;r.push({n:num,name:LGF[(h>>(i+2))%LGF.length]+' '+LGL[(h>>(i+4))%LGL.length],st:LGS[(h>>(i+1))%LGS.length]})}return r}
function takenNums(cb){const h=hsh(cb.n+'#'),t=new Set([1]);let x=h;for(let k=0;k<200&&t.size<16;k++){x=(Math.imul(x,1103515245)+12345)>>>0;t.add(1+(x>>>8)%40)}if(S.p.num&&S.club&&club()===cb)t.delete(S.p.num);return t}
function numElig(){const p=S.p;return (p.tt||0)>=3&&((p.sg||0)>=10||(p.tg||0)>=10||((p.rh||[]).length>=5&&avgR()>=7.3))}
function numPick(first){const cb=club();if(!cb)return;const L=legends(cb),T=takenNums(cb),el=numElig();let sel=S.p.num||0;if(!sel){const fr=[];for(let n=(S.p.tt||0)>=3?2:20;n<=49;n++)if(!T.has(n)&&!KEYN.includes(n)&&!L.some(l=>l.n===n))fr.push(n);sel=pick(fr)||rnd(41,99)}
 const draw=()=>{sheet(`<span class="tag o">👕 เบอร์เสื้อ · ${cb.n}</span><p class="mu">${first?'ยินดีต้อนรับ! เลือกเบอร์ของคุณ':'ขอเปลี่ยนเบอร์กับสโมสร'} · สีเทา = เพื่อนร่วมทีมใช้อยู่${(S.p.tt||0)<3?' · 🔑 เบอร์หลัก (1/7/9/10) เป็นของตัวจริง — ขอตอนนี้โค้ชจะไม่พอใจ':''}${(S.p.tt||0)<=1?' · ดาวรุ่ง/สำรองได้เบอร์ 20+':''}</p>
 ${L.length?L.map(l=>`<div class="card" style="border-color:#ffd21f;margin:6px 0"><b class="ye">⭐ เบอร์ ${l.n} — ตำนาน ${l.name}</b><p class="mu">${l.st}</p><p class="${el?'gr':'re'}" style="font-size:13px">${el?'คุณมีสิทธิ์ขอใส่เบอร์นี้ แต่แฟนจะคาดหวังสูงมาก!':'ต้องเป็น ตัวจริง ขึ้นไป + ยิง 10+ ประตู หรือ เรตติ้งเฉลี่ย 7.3+'}</p></div>`).join(''):'<p class="mu">สโมสรนี้ไม่มีเบอร์ตำนาน — เลือกได้อิสระ</p>'}
 <div class="numgrid">${Array.from({length:99},(_,i)=>i+1).map(n=>{const lg=L.find(l=>l.n===n),ky=KEYN.includes(n)&&!lg&&(S.p.tt||0)<3,yb=!lg&&!ky&&n<20&&(S.p.tt||0)<=1,tk=(T.has(n)&&!lg&&!KEYN.includes(n))||yb,dis=tk||(lg&&!el);return `<button class="nb ${sel===n?'on':''} ${lg?'lg':''} ${ky?'ky':''} ${dis?'dis':''}" data-nm="${n}" ${dis?'disabled':''}>${n}</button>`}).join('')}</div>
 <button class="btn ${sel?'':'dis'}" id="nmok">✅ ยืนยันเบอร์ ${sel||''}</button>${first?'':'<button class="btn s" onclick="closeM()" style="text-align:center">ยกเลิก</button>'}`);
  document.querySelectorAll('[data-nm]').forEach(b=>b.onclick=()=>{sel=+b.dataset.nm;const y=$('.sheet').scrollTop;draw();$('.sheet').scrollTop=y});
  $('#nmok').onclick=()=>{if(!sel)return;if(KEYN.includes(sel)&&!L.some(l=>l.n===sel)&&(S.p.tt||0)<3){CONS=[];E('trust',-6);closeM();save();return lifeMsg(['🙅 โค้ช: "เบอร์นั้นเป็นของตัวจริง แกยังไม่ได้พิสูจน์อะไรเลย!"',...CONS])}setNum(sel,L.find(l=>l.n===sel));closeM();render()}};draw()}
function setNum(n,lg){const p=S.p,old=p.num;p.num=n;p.numL=lg?lg.name:'';if(lg){news(`⭐ ประวัติศาสตร์! ${p.name} ได้รับเสื้อเบอร์ ${n} ของตำนาน ${lg.name} แห่ง ${club().n}`);E('fans',0.1);toast(`⭐ คุณได้สวมเบอร์ ${n} ของตำนาน ${lg.name}!`)}else news(`👕 ${p.name} สวมเสื้อเบอร์ ${n} ให้ ${club().n}${old&&old!==n?` (เดิม ${old})`:''}`);save()}
function legendMatch(r,v){const p=S.p;if(!p.numL||!S.feed)return;if(r>=7.5){CONS=[];E('fans',0.05);const q=mkPost('great',v);q.t=`🔥 นี่แหละทายาทเบอร์ ${p.num} ของ ${p.numL} ตัวจริง! ${p.name} คู่ควรกับเสื้อตัวนี้`;S.feed.unshift(q);if(r>=8)news(`⭐ เบอร์ ${p.num} คืนชีพ! ${p.name} เล่นสมศักดิ์ศรีตำนาน ${p.numL}`)}
 else if(r<6.3){const q=mkPost('bad',v);q.t=`😡 ถอดเสื้อเบอร์ ${p.num} คืนมาเลย! ${p.numL} คงร้องไห้ที่เห็น ${p.name} ใส่เสื้อตัวนี้`;S.feed.unshift(q);const q2=mkPost('bad',v);q2.t=`ไม่คู่ควรกับเบอร์ตำนาน ${p.num} #ถอดเสื้อ`;S.feed.unshift(q2);S.p.morale=cl(S.p.morale-3)}}
// legendary number offer event + avatar badge
(function(){EV.push({id:'keyNum',off:1,c:()=>S.club&&(S.p.tt||0)>=3&&S.p.num&&!KEYN.includes(S.p.num)&&!S.p.numL&&!S.p.keyAsk,x:()=>{const k=KEYN.find(n=>!legends(club()).some(l=>l.n===n)&&n!==1)||9;S.p.keyK=k;return `📰 ${chance(.5)?`เจ้าของเสื้อเบอร์ ${k} ย้ายออกจากทีม`:`คุณแซงเจ้าของเบอร์ ${k} ขึ้นเป็นตัวจริงแล้ว`} — เบอร์ ${k} ว่างลง จะขอโค้ชไหม?`},o:[
 {l:'🙋 ขอเบอร์นี้',f:()=>{S.p.keyAsk=1;const k=S.p.keyK||9;if(S.p.trust>=40||chance(.5)){setNum(k,null);CONS.push(`👕 ได้เบอร์ ${k} แล้ว!`)}else{E('trust',-4);N('โค้ช: "ยังไม่ถึงเวลา" ปฏิเสธ')}}},{l:'👌 ใส่เบอร์เดิมต่อ',f:()=>{S.p.keyAsk=1;E('trust',2)}}]});EVM.keyNum=EV[EV.length-1];
 EV.push({id:'numOffer',off:1,c:()=>{const cb=club();if(!cb||S.p.numL)return false;const L=legends(cb);return L.length>0&&(S.p.tt||0)>=3&&((S.p.sg||0)>=6||avgR()>=7.1)},x:()=>{const L=legends(club())[0];return `👔 ประธานสโมสรเรียกพบ: "แฟนบอลรอมานาน... เราอยากมอบเสื้อเบอร์ ${L.n} ของตำนาน ${L.name} ให้คุณ" แต่ความคาดหวังจะสูงลิ่ว`},o:[
 {l:'⭐ รับเกียรตินี้',f:()=>{const L=legends(club())[0];setNum(L.n,L);CONS.push(`👕 สวมเบอร์ ${L.n} แล้ว`)}},{l:'🙏 ขอเวลาพิสูจน์ตัวเองก่อน',f:()=>{E('trust',4);E('media',3);N('แฟนชื่นชมความถ่อมตัว')}}]});EVM.numOffer=EV[EV.length-1];
 const _av=avatarSVG;avatarSVG=function(av,size=64){const h=_av(av,size);if(S&&S.p&&S.club&&av===S.p.av&&S.p.num&&size>=56)return `<div style="position:relative;flex:none">${h}<span class="shnum ${S.p.numL?'lg':''}" style="font-size:${Math.round(size/4.2)}px">${S.p.num}</span></div>`;return h}})();
// ===== TALK TO COACH =====
function talkCD(){const d=S.p.talkD;return d==null?0:Math.max(0,d+14-dkey(now()))}
function tScore(){const p=S.p,c=club();return p.trust+(avgR()?(avgR()-6.5)*20:0)+(ovr()-c.s)*2+(p.tt||0)*8}
function promiseChk(r){const p=S.p,P=p.promise;if(!P)return;if(P.cur==='start'&&r<6.2){p.trust=cl(p.trust-6);news(`😬 ได้โอกาสตามสัญญาแต่ ${p.name} เล่นแย่ (${r}) โค้ชเริ่มหมดความอดทน`)}
 if(P.broken&&!p.canEsc){p.canEsc=1;toast('💔 โค้ชผิดสัญญา! คุณร้องเรียนผู้บริหารได้ที่ "คุยกับโค้ช"');news(`💔 วงใน: โค้ช ${club().n} ไม่ทำตามสัญญาที่ให้ ${p.name}`)}
 if(P.left<=0&&!P.broken){p.promise=null;news(`🤝 โค้ชรักษาคำพูด ให้ ${p.name} ได้ลงเล่นตามที่สัญญา`)}else if(P.left<=0)p.promise=null}
function talkCoach(){const p=S.p;if(!S.club)return;if(talkCD()>0)return lifeMsg(`⏳ โค้ชยุ่งมาก ลองใหม่อีก ${talkCD()} วัน`);const sc=tScore();
 const done=(lines,nw)=>{p.talkD=dkey(now());if(nw)news(nw);save();sheet(`<span class="tag o">🗣️ ห้องโค้ช</span><ul class="cons">${lines.concat(CONS).map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" onclick="closeM();render()">ตกลง</button>`)};
 const O=[['mins','⏱️ ขอเวลาลงสนามมากขึ้น'],['wage','💰 ขอต่อสัญญา/ขึ้นค่าเหนื่อย'],['leave','🚪 ขู่ย้ายทีม ถ้าไม่ได้ลงเล่น'],['num','👕 ขอเบอร์หลัก']];if(p.canEsc)O.unshift(['esc','📢 ร้องเรียนผู้จัดการ/ประธานสโมสร']);
 sheet(`<span class="tag o">🗣️ คุยกับโค้ช</span><div class="ev">โค้ชวางแท็บเล็ตลง มองหน้าคุณ: "มีอะไรจะพูด?"</div><p class="mu">ระดับ ${TT[p.tt||0]} · ความไว้ใจ ${Math.round(p.trust)} · ฟอร์ม ${avgR()?avgR().toFixed(1):'-'} · OVR ${ovr()} (ทีม ${club().s})</p>${O.map(([k,l])=>`<button class="btn s" data-tk="${k}">${l}</button>`).join('')}<button class="btn s" onclick="closeM()" style="text-align:center">ยกเลิก</button>`);
 document.querySelectorAll('[data-tk]').forEach(b=>b.onclick=()=>{CONS=[];const k=b.dataset.tk;
  if(k==='mins'){if((p.tt||0)>=3)return done(['โค้ช: "แกเป็นตัวจริงอยู่แล้วนะ จะเอาอะไรอีก?"'],null);if(sc>=55){p.promise={left:3};done(['โค้ช: "โอเค 3 นัดถัดไปแกได้ลงเป็นตัวจริง แต่ถ้าเล่นไม่ดี อย่าหาว่าไม่เตือน"','🤝 ได้รับสัญญา: ตัวจริง 3 นัด'],`🤝 ${p.name} คุยกับโค้ชได้ผล ได้รับสัญญาลงเป็นตัวจริง`)}else{E('trust',-3);done(['โค้ช: "แกยังไม่พร้อม ไปซ้อมให้ดีกว่านี้ก่อน"'],null)}}
  if(k==='wage'){if(sc>=75){const x=Math.round(p.wage*(.15+R()*.15)/10)*10;p.wage+=x;p.contract=Math.max(p.contract,rnd(2,4));done([`ผู้บริหาร: "เราเห็นคุณค่าคุณ" ค่าเหนื่อย +฿${fmt(x)}/สัปดาห์ และขยายสัญญา`],`✍️ ${p.name} ต่อสัญญาใหม่กับ ${club().n} ค่าเหนื่อยเพิ่มขึ้น`)}else{E('trust',-5);done(['โค้ช: "เงิน? พิสูจน์ในสนามก่อนค่อยมาคุย"'],null)}}
  if(k==='leave'){if(p.trust<30&&chance(.6)){const r=R();if(r<.4){p.listed=1;S.p.bonusOffer=1;E('trust',-10);done(['โค้ช: "อยากไปนักก็ไปเลย!" 📋 สโมสรประกาศขายคุณ'],`📋 ${club().n} ประกาศขาย ${p.name} หลังขู่ย้ายทีม`)}else{p.benched=1;E('trust',-12);done(['โค้ชโกรธจัด: "งั้นไปนั่งดูอยู่ข้างสนาม!" 🪑 ถูกดอง'],`🧊 ${p.name} ถูกโค้ชดองหลังขู่ย้ายทีม`)}}
   else if(sc>=50&&(p.tt||0)<3){p.promise={left:3};E('trust',-2);done(['โค้ช: "ใจเย็น ๆ ฉันจะให้โอกาสแก 3 นัด"','🤝 ได้รับสัญญา: ตัวจริง 3 นัด'],null)}else{E('trust',-6);if(chance(.5)){p.listed=1;done(['ประธานสโมสร: "ถ้าอยากไป เราจะรับฟังข้อเสนอ" 📋 ถูกประกาศขาย'],`📋 ${p.name} ยื่นขอย้าย สโมสรยอมเปิดรับข้อเสนอ`)}else done(['สโมสรปฏิเสธ: "คุณยังมีสัญญา ไม่มีทางปล่อยตัว"'],`🔒 ${club().n} ปฏิเสธคำขอย้ายทีมของ ${p.name}`)}}
  if(k==='num'){if((p.tt||0)>=3&&p.trust>=45){closeM();p.talkD=dkey(now());numPick(false)}else{E('trust',-6);done(['โค้ช: "เบอร์นั้นเป็นของตัวจริงที่พิสูจน์ตัวเองแล้ว แกยังไม่ใช่!"'],null)}}
  if(k==='esc'){p.canEsc=0;const r=R();if(r<.4){p.listed=1;S.p.bonusOffer=1;done(['ประธาน: "เข้าใจ เราจะหาทีมใหม่ให้" 📋 ถูกประกาศขาย ข้อเสนอจะเริ่มเข้ามา'],`📋 ${p.name} ร้องเรียนผู้บริหาร — สโมสรประกาศขาย`)}else if(r<.75){p.promise={left:3};E('trust',4);done(['ผู้จัดการทีมสั่งโค้ช: "ให้โอกาสเด็กมันหน่อย"','🤝 สัญญาใหม่: ตัวจริง 3 นัด'],`🗣️ ผู้บริหาร ${club().n} เข้ามาแทรก หลัง ${p.name} ร้องเรียน`)}else{E('trust',-10);p.benched=1;done(['ประธานเข้าข้างโค้ช: "เคารพการตัดสินใจของโค้ช!" 🪑 ถูกดองนัดหน้า'],`🧊 ${p.name} ร้องเรียนไม่สำเร็จ ถูกดองข้างสนาม`)}}
 })}
// ===== TACTICS =====
// [name, goalsFor x, goalsAgainst x, stamina x, extra player chances, favoured moments, fit attrs, instruction]
var TAC={att:['⚔️ บุกเต็มที่',1.3,1.25,1.1,1,['vol','1v1','cut','long','solo','head','tap'],['sho','dri'],'ดันขึ้นสูง ยิงทุกโอกาสที่มี'],
 bal:['⚖️ สมดุล',1,1,1,0,[],['pas','phy'],'เล่นตามตำแหน่ง ช่วยทั้งรุกและรับ'],
 def:['🛡️ ตั้งรับ',.75,.7,.9,-1,['blk','air','int','long'],['def','phy'],'ถอยลงต่ำ รักษาโครงสร้าง อย่าเสียบอลง่าย'],
 cnt:['⚡ สวนกลับ',1.05,.9,1,0,['1v1','cnt','thru','solo'],['pac','pas'],'รอจังหวะ เมื่อได้บอลให้วิ่งทะลุเร็วที่สุด'],
 pos:['🎯 ครองบอล',1.05,.85,.95,0,['thru','crs','cnt','fk'],['pas','dri'],'จ่ายสั้น ครองบอล หาช่องจ่ายทะลุ'],
 prs:['🔥 เพรสสูง',1.15,1.05,1.35,0,['int','blk','tap','cnt'],['phy','pac'],'ไล่บอลทันทีที่เสีย บีบคู่แข่งในแดนเขา']};
function pickTac(nx){const d=club().s-nx.opp.s+(nx.home?2:0),w=d>5?['att','pos','prs','bal']:d<-5?['def','cnt','cnt','bal']:['bal','pos','cnt','prs','att','def'];return pick(w)}
function tacFitV(k){const T=TAC[k],a=S.p.a;return Math.round(((a[T[6][0]]+a[T[6][1]])/2-ovr())/2)}
function tacFit(at){const M=LIVE&&LIVE.M;if(!M||!M.tac)return 0;const T=TAC[M.tac];return T[6].includes(at)?3+Math.max(0,tacFitV(M.tac)):0}
function tacCard(k){const T=TAC[k],f=tacFitV(k);return `<div class="card" style="margin:8px 0"><div class="row sp"><b>📋 แท็กติกทีม: ${T[0]}</b><span class="tag ${f>0?'g':f<0?'':'o'}">ความเข้ากัน ${f>0?'+':''}${f}</span></div><p class="mu" style="margin-top:4px">คำสั่งถึงคุณ: "${T[7]}"</p><p class="mu" style="font-size:12px">ประตูได้ ×${T[1]} · เสีย ×${T[2]} · สตามิน่า ×${T[3]} · ค่าพลังที่เข้ากัน: ${T[6].map(x=>ATS[x]).join(', ')}</p></div>`}
function tacSwitch(M){if(M.tsw||M.half!==2||M.min<58||M.min>75||!chance(.06))return false;const df=M.gf-M.ga;let nt=null,why='';
 if(df<0&&M.tac!=='att'){nt='att';why=`ตามหลัง ${M.gf}-${M.ga}`}else if(df>=2&&M.tac!=='def'){nt='def';why=`นำอยู่ ${M.gf}-${M.ga}`}else if(df===0&&chance(.3)&&M.tac!=='prs'){nt='prs';why='เสมอกันอยู่'}
 if(!nt)return false;M.tsw=1;const o=M.tac;M.tac=nt;tk(M,`📋 โค้ชเปลี่ยนแท็กติก: ${TAC[nt][0]}`);M.tl.push({m:clock(M),t:`📋 ${TAC[o][0]} → ${TAC[nt][0]}`});
 LIVE.paused=true;drawLive();sheet(`<span class="tag o">📋 เปลี่ยนแท็กติก · ${clock(M)}</span><div class="ev">โค้ชตะโกนจากข้างสนาม (${why}): "เปลี่ยนเป็น ${TAC[nt][0]}!"</div>${tacCard(nt)}<button class="btn" id="tsok">รับทราบ ▶</button>`);$('#tsok').onclick=()=>resume();return true}
(function(){EV.push({id:'freelance',m:1,x:M=>{const T=TAC[M.tac||'bal'];return `📋 โค้ชสั่งให้คุณ "${T[7]}" แต่คุณเห็นช่องว่างที่จะเล่นนอกแผนได้...`},o:[
 {l:'🫡 ทำตามคำสั่งโค้ช',f:M=>{M.r+=.1;E('trust',2);N('โค้ชพยักหน้า — วินัยดี')}},
 {l:'🎨 ฟรีสไตล์ เล่นตามสัญชาตญาณ',f:M=>{const b=Math.max(...Object.values(S.p.a));if(chance(cl((b-40)/60,.2,.7))){M.r+=.6;E('trust',3);if(chance(.35))goal(M,'ฟรีสไตล์นอกแผน!',.5);else N('จังหวะนอกแผนสวยงาม! โค้ชยิ้มมุมปาก')}else{M.r-=.5;E('trust',-6);N('เล่นนอกแผนแล้วเสียบอล โค้ชโมโหข้างสนาม');if(chance(.3))M.ga++}}}]});EVM.freelance=EV[EV.length-1]})();
// ===== STICKY ACTION BAR + TRAINING SHEET =====
function abar(){const p=S.p,nx=nextFix(),t=now(),trained=p.trainDay===dkey(t);let main;
 const IJ=p.inj>0&&!p.pk&&S.club&&nx;
 if(nx&&dkey(t)>=dkey(S.ko[S.week]))main=`<button class="abm go" id="play">${IJ?'🚑 ดูผลนัดนี้':'⚽ ไปแข่ง!'}</button>${IJ?'<button class="abs" id="isk" title="ข้ามจนหายเจ็บ">⏩<small>หายเจ็บ</small></button>':''}`;
 else if(IJ)main=`<button class="abm" id="isk">⏩ ข้ามจนหายเจ็บ</button><button class="abs" id="nd" title="วันถัดไป">☀️<small>วันถัดไป</small></button>`;
 else main=`<button class="abm" id="nd">☀️ วันถัดไป</button>${nx?`<button class="abs" id="sk" title="ข้ามไปวันแข่ง">⏩<small>วันแข่ง</small></button>`:`<button class="abs" id="wait" title="ข้อเสนอ">📨<small>ข้อเสนอ</small></button>`}`;
 return `<div id="abar"><button class="abt ${trained?'done':''}" id="ab-tr">${trained?'✅ ซ้อมแล้ว':'🏋️ ซ้อม'}</button>${main}</div>`}
function openTrain(){const t=now(),trained=S.p.trainDay===dkey(t);PI();
 sheet(`<div class="row sp"><span class="tag g">🏋️ การซ้อม</span><button class="ab" onclick="closeM()" style="font-size:18px">✕</button></div>${trainUI(trained)}`);
 document.querySelectorAll('#modal [data-dr]').forEach(b=>b.onclick=()=>{S.tsel.d=b.dataset.dr;save();openTrain()});
 document.querySelectorAll('#modal [data-in]').forEach(b=>b.onclick=()=>{S.tsel.i=b.dataset.in;save();openTrain()});
 $('#qt')&&($('#qt').onclick=trainGo)}
function trainGo(){const d=S.tsel.d,mgOK=['sho','dri','pac','pas'].includes(d),wm=WM(),need=wm.l.some(m=>!m.d&&(m.id==='mg80'||m.id==='mg2'));
 if(mgOK&&(chance(.25)||(need&&chance(.5)))){sheet(`<span class="tag o">🎮 ดริลพิเศษ!</span><div class="ev">โค้ชตั้งดริล${DR[d][1]}พิเศษวันนี้ — เล่นดีได้โบนัส XP สูงสุด ×1.5${need?' (นับภารกิจมินิเกม)':''}</div><button class="btn" id="mgp">▶ เล่นมินิเกม</button><button class="btn s" id="mgs" style="text-align:center">⏩ ข้าม (รับ XP ปกติ)</button>`);$('#mgp').onclick=()=>miniGame(d,sc=>doTrain(sc));$('#mgs').onclick=()=>doTrain(null)}
 else doTrain(null)}
// ===== LEAGUE TIER TAGS =====
function lstars(str){return str>=80?5:str>=72?4:str>=64?3:str>=57?2:1}
function ltxt(c,ti){const T=S.world[c],n=T.length;return (ti===0?'ลีกสูงสุด':`ดิวิชัน ${ti+1}/${n}`)+' '+'⭐'.repeat(lstars(T[ti].str))}
function ltag(c,ti){return `<span class="ltag">${ltxt(c,ti)}</span>`}
function ltagN(name){for(const c in S.world){const ti=S.world[c].findIndex(t=>t.n===name);if(ti>=0)return ltag(c,ti)}return ''}
function fixF(f){return f==='🏴'?LEAGUES.ENG.f:f}
function leagueInfo(){const rows=[];for(const c in S.world)S.world[c].forEach((t,ti)=>rows.push({c,ti,t}));rows.sort((a,b)=>b.t.str-a.t.str);
 const back=$('#modal').innerHTML,y=$('.sheet')?$('.sheet').scrollTop:0;
 sheet(`<div class="row sp"><span class="tag o">ℹ️ ระดับลีกทั้งหมด</span><button class="ab" id="lib">✕</button></div><p class="mu">เรียงจากแข็งแกร่งที่สุด · ⭐ = ระดับความแข็งแกร่ง (5 ดาว = ลีกชั้นนำโลก) · ค่าเหนื่อยโดยประมาณต่อสัปดาห์</p>
 ${rows.map(({c,ti,t})=>{const ss=t.clubs.map(x=>x.s),w=wage(c,ti);return `<div class="lrow"><div style="flex:1;min-width:0"><b>${LEAGUES[c].f} ${t.n}</b><div class="mu" style="font-size:12px">${LEAGUES[c].n} · ${ti===0?'ลีกสูงสุด':'ดิวิชัน '+(ti+1)+'/'+S.world[c].length} · พลังทีม ${Math.min(...ss)}–${Math.max(...ss)}</div></div><div style="text-align:right"><div style="font-size:12px">${'⭐'.repeat(lstars(t.str))}</div><div class="ye" style="font-size:12px">฿${fmt(w*.7)}–${fmt(w*1.3)}</div></div></div>`}).join('')}`);
 $('#lib').onclick=()=>{if(rebindOffers){rebindOffers();if($('.sheet'))$('.sheet').scrollTop=y}else closeM()}}
var rebindOffers=null;


// ===== INJURY TREATMENT =====
function injProt(){if(!S||!S.boost)return 0;const t=dkey(now());let v=0;S.boost.filter(b=>b.end>=t&&INJP[b.id]).forEach(b=>v+=INJP[b.id]*(1+((S.blv&&S.blv[b.id])||1)*.08-.08));return Math.min(.5,v)}
function injProtSrc(){const t=dkey(now());return (S.boost||[]).filter(b=>b.end>=t&&INJP[b.id]).map(b=>BST[b.id].ic+' '+BST[b.id].n)}
const injCost=k=>{const w=S.p.wage||0;return k==='rh'?Math.round((5000+w*1.5)/500)*500:Math.round((40000+w*6)/1000)*1000};
function injChk(){if(!S||!S.p)return;const p=S.p;
 if(!(p.inj>0)){if(p.injT&&!p.pkInj){p.injT=null;p.injMax=0;p.injU={};p.pk=0}return}
 if(!p.injT){const P=injProt();let msg='';
  if(P>0&&p.inj<=2&&chance(P*.6)){p.inj=0;news('🛡️ ทีมฟื้นฟูส่วนตัวตรวจพบเร็ว อาการบาดเจ็บไม่หนัก ไม่ต้องพักเลย!');toast('🛡️ ไลฟ์สไตล์ฟื้นฟูช่วยไว้ ไม่ต้องพัก!');save();return}
  const red=P>0?Math.min(p.inj-1,Math.round(p.inj*P)):0;if(red>0){p.inj-=red;msg=` (ไลฟ์สไตล์ฟื้นฟูช่วยลด ${red} นัด)`}
  const T=INJT.find(x=>p.inj<=x[0]);p.injT=T[1]+' '+T[2];p.injMax=p.inj;p.injU={};p.pk=0;
  news(`🚑 ${p.name} บาดเจ็บ: ${T[2]} คาดพัก ${p.inj} นัด${msg}`);if(msg)toast('🩺'+msg);save()}}
function injCard(){const p=S.p;if(!(p.inj>0)||!p.injT)return '';const U=p.injU||{},P=injProt(),tr=p.trust>=35,nx=nextFix(),md=nx&&dkey(now())>=dkey(S.ko[S.week]);
 const opt=(id,ic,t,d,cost,ok,why)=>`<button class="card trow" data-it="${id}" ${ok?'':'disabled style="opacity:.45"'}><span style="text-align:left">${ic} <b>${t}</b><br><small class="mu">${ok?d:why}</small></span><span class="${cost?'ye':'gr'}">${cost?'฿'+fmt(cost):'ฟรี'}</span></button>`;
 return `<div class="card" style="border-color:var(--re,#e55)"><div class="row sp"><h2>🚑 บาดเจ็บ</h2><span class="tag">เหลือ ${p.inj} นัด</span></div>
 <p><b>${p.injT}</b> · ${p.pk?'<span class="ye">💉 วางแผนฉีดยาลงเล่นนัดหน้า</span>':`คาดกลับมาได้ในอีก ${p.inj} นัด`}</p>${bar(100-p.inj/Math.max(1,p.injMax)*100)}
 ${P?`<p class="mu" style="font-size:12px">🛡️ ไลฟ์สไตล์ฟื้นฟูช่วยลดโอกาส/ระยะเจ็บ ${Math.round(P*100)}% (${injProtSrc().join(', ')})</p>`:`<p class="mu" style="font-size:12px">💡 บูสเตอร์ฟื้นฟูในไลฟ์สไตล์ (นักกายภาพ, ไครโอ, ทีมแพทย์) ช่วยลดโอกาสและระยะบาดเจ็บ</p>`}
 <details class="fold" open><summary>ตัวเลือกการรักษา</summary>
 ${opt('ph','🩺','หมอทีม (กายภาพสโมสร)','ลด 1 นัด · ใช้ได้ 1 ครั้งต่อการเจ็บ',0,tr&&!U.ph,U.ph?'ใช้ไปแล้วสำหรับอาการนี้':'ต้องมีความไว้ใจโค้ช 35+')}
 ${opt('rh','🏊','ฟื้นฟูแบบเข้มข้น','มีโอกาสลด 1–2 นัด',injCost('rh'),!U.rh,'ทำไปแล้วสำหรับอาการนี้')}
 ${opt('cl','🏥','คลินิกผู้เชี่ยวชาญเอกชน','ลดระยะพัก 50%',injCost('cl'),!U.cl&&p.inj>=2,U.cl?'ใช้ไปแล้ว':'อาการเบาเกินไปที่จะใช้')}
 ${opt('pk','💉','ฉีดยาแก้ปวด ลงเล่นนัดหน้า','เสี่ยงอาการหนักขึ้น · โค้ช/แฟนชื่นชมความทุ่มเท',0,!p.pk,'วางแผนไว้แล้ว')}
 </details></div>`}
function injBind(){document.querySelectorAll('[data-it]').forEach(b=>b.onclick=()=>injDo(b.dataset.it));$('#isk')&&($('#isk').onclick=injSkip)}
function injDo(k){const p=S.p;p.injU=p.injU||{};CONS=[];let t='';
 if(k==='ph'){p.injU.ph=1;p.inj--;E('trust',-2);t='🩺 หมอทีมดูแลพิเศษ ลดระยะพัก 1 นัด';CONS.push('⏱️ ระยะพัก -1 นัด')}
 if(k==='rh'||k==='cl'){const c=injCost(k);if(p.money<c){sheet(`<p>💸 เงินไม่พอ (ต้องใช้ ฿${fmt(c)})</p><button class="btn" onclick="closeM()">ตกลง</button>`);return}p.money-=c;p.injU[k]=1;CONS.push(`💸 -฿${fmt(c)}`);
  if(k==='rh'){const r=chance(.25)?2:chance(.75)?1:0;p.inj=Math.max(0,p.inj-r);E('morale',r?3:-3);t=r?`🏊 ฟื้นฟูเข้มข้นได้ผล! ลดระยะพัก ${r} นัด`:'🏊 ฟื้นฟูเต็มที่ แต่ร่างกายยังไม่ตอบสนอง';CONS.push(r?`⏱️ ระยะพัก -${r} นัด`:'⏱️ ระยะพักเท่าเดิม')}
  else{const r=Math.ceil(p.inj/2);p.inj-=r;t=`🏥 ผู้เชี่ยวชาญรักษาตรงจุด ลดระยะพัก ${r} นัด`;CONS.push(`⏱️ ระยะพัก -${r} นัด`);E('morale',4)}}
 if(k==='pk'){p.pk=1;t='💉 คุณบอกหมอว่าจะฉีดยาแก้ปวดลงเล่นนัดหน้า';CONS.push('⚠️ มีโอกาสอาการหนักขึ้นหลังเกม')}
 news(t);if(p.inj<=0){CONS.push('✅ หายเจ็บแล้ว! พร้อมลงสนาม');news(`✅ ${p.name} หายจากอาการบาดเจ็บ`)}
 save();sheet(`<span class="tag g">🚑 การรักษา</span><p>${t}</p><ul class="cons">${CONS.map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" onclick="closeM();render()">ตกลง</button>`)}
function injSkip(){let n=0;const p=S.p;while(n++<200&&S.club){const nx=nextFix();if(!nx)break;const md=dkey(now())>=dkey(S.ko[S.week]);if(md&&(!(p.inj>0)||p.pk))break;
  S.gameT=bday(S.gameT)+DAY+9*HR;const st=p.inj;tick();if(!S.club||$('#modal.show'))break;
  if(p.inj>0){if(chance(.15)&&rehabEv())return}else if(st>0){toast('✅ หายเจ็บแล้ว!');news(`✅ ${p.name} หายจากอาการบาดเจ็บ กลับมาซ้อมกับทีม`)}
  S.evDay=dkey(now())}
 save();render()}
function rehabEv(){const ev=pick(EV.filter(e=>e.rehab&&e.id!==S.lastOff));if(!ev)return false;S.lastOff=ev.id;S.evDay=dkey(now());save();showEvent(ev,null,()=>{closeM();save();render()});return true}
EV.push(
{id:'rehabA',off:1,rehab:1,c:()=>S.p.inj>0,x:()=>`🏋️ ห้องฟื้นฟู: นักกายภาพยื่นโปรแกรมที่น่าเบื่อสุด ๆ ให้ "ทำตามนี้ทุกวัน อย่าใจร้อน"`,o:[
 {l:'📋 ทำตามโปรแกรมเคร่งครัด',f:()=>{E('trust',3);if(chance(.35)){S.p.inj=Math.max(0,S.p.inj-1);CONS.push('⏱️ ฟื้นตัวเร็วกว่ากำหนด -1 นัด')}else CONS.push('ร่างกายค่อย ๆ ดีขึ้น')}},
 {l:'🔥 แอบซ้อมหนักเพื่อกลับเร็ว',f:()=>{if(chance(.45)){S.p.inj=Math.max(0,S.p.inj-1);CONS.push('⏱️ เสี่ยงแต่ได้ผล -1 นัด')}else{S.p.inj++;S.p.injMax++;E('trust',-4);CONS.push('🚑 อาการกำเริบ! +1 นัด')}}},
 {l:'📺 พักเต็มที่ ดูวิดีโอแท็กติก',f:()=>{E('morale',4);addXP(15)}}]},
{id:'rehabB',off:1,rehab:1,c:()=>S.p.inj>0,x:()=>`📱 ระหว่างพักเจ็บ แฟน ๆ ถามไถ่อาการคุณเต็มคอมเมนต์ เพื่อนชวนไปปาร์ตี้คืนนี้ด้วย`,o:[
 {l:'🎥 โพสต์คลิปทำกายภาพ',f:()=>{E('fans',0.04);E('morale',2)}},
 {l:'🏥 ไปเยี่ยมเด็ก ๆ ที่โรงพยาบาล',f:()=>{E('fans',0.05);E('morale',5);E('media',4)}},
 {l:'🎉 ไปปาร์ตี้คลายเครียด',f:()=>{E('morale',6);E('trust',-5);if(chance(.3)){S.p.inj++;S.p.injMax++;CONS.push('🚑 เต้นจนเจ็บซ้ำ +1 นัด')}}}]},
{id:'rehabC',off:1,rehab:1,c:()=>S.p.inj>0,x:()=>`🩺 หมอทีมบอกว่า "สแกนล่าสุดดีขึ้นมาก ถ้าอยากลองซ้อมกับทีมเบา ๆ ก็ได้นะ"`,o:[
 {l:'⚽ ลองซ้อมกับทีมเบา ๆ',f:()=>{if(chance(.6)){S.p.inj=Math.max(0,S.p.inj-1);E('trust',2);CONS.push('⏱️ ขาโอเค! -1 นัด')}else{E('morale',-4);CONS.push('ยังรู้สึกตึง ๆ ต้องพักต่อ')}}},
 {l:'🛌 ขอพักให้หายสนิท',f:()=>{E('morale',2);E('stamina',10)}}]});
const _mdI=maybeDaily;maybeDaily=function(){const p=S&&S.p;if(p&&p.inj>0&&!LIVE&&S.club&&S.evDay!==dkey(now())&&S.lastOff!=='rehabA'&&chance(.3))return rehabEv();return _mdI()};
const _pmI=playMatch;playMatch=function(){const p=S.p,nx=nextFix();if(nx&&dkey(now())>=dkey(S.ko[S.week])&&p.inj>0&&p.pk&&!p.ban){p.pkInj=p.inj;p.inj=0;p.pk=0;E('stamina',-12);news(`💉 ${p.name} ฉีดยาแก้ปวดเพื่อลงเล่นทั้งที่ยังเจ็บ`)}return _pmI()};
const _fnI=finish;finish=function(nx,M,msg,quiet){const p=S.p,pk=p.pkInj;p.pkInj=0;const r=_fnI(nx,M,msg,quiet);
 if(pk){if(chance(.4)){p.inj=Math.max(p.inj,pk+rnd(1,3));p.injMax=p.inj;E('trust',-5);E('morale',-8);E('fans',-0.02);news(`🚑 ยาแก้ปวดหมดฤทธิ์ อาการ${p.name}หนักขึ้น! ต้องพัก ${p.inj} นัด · แฟนบอลวิจารณ์ทีมแพทย์`);toast(`🚑 อาการหนักขึ้น! พัก ${p.inj} นัด`)}
  else{p.inj=Math.max(p.inj,pk-1);E('trust',3);E('fans',0.02);news(`💪 ${p.name} ฝืนเจ็บลงเล่น แฟนบอลชื่นชมความทุ่มเท${p.inj?` (ยังเหลือพัก ${p.inj} นัด)`:''}`);toast(p.inj?`💪 รอดมาได้ ยังเหลือพัก ${p.inj} นัด`:'💪 รอด! อาการไม่กำเริบ')}
  if(!p.inj){p.injT=null;p.injMax=0}save()}return r};

// ===== AWARDS / TROPHY CABINET / ACHIEVEMENTS =====
const TOP5=['ENG','ESP','ITA','GER','FRA'];
const ACH=[
 ['debut','🎽','นัดเดบิวต์','ลงสนามนัดแรกในอาชีพ',p=>[p.capp||0,1],{sp:1}],
 ['g1','⚽','ประตูแรก','ยิงประตูแรกในอาชีพ',p=>[p.tg||0,1],{sp:2,f:.05}],
 ['g10','⚽','10 ประตู','ยิงครบ 10 ประตูในอาชีพ',p=>[p.tg||0,10],{sp:3,m:20000}],
 ['g50','🔥','50 ประตู','ยิงครบ 50 ประตูในอาชีพ',p=>[p.tg||0,50],{sp:6,m:150000,f:.1}],
 ['g100','💯','100 ประตู','ยิงครบ 100 ประตูในอาชีพ',p=>[p.tg||0,100],{sp:10,m:600000,f:.15}],
 ['g250','👑','250 ประตู','ตำนานดาวยิง 250 ประตู',p=>[p.tg||0,250],{sp:20,m:3000000,f:.25}],
 ['a10','🅰️','10 แอสซิสต์','จ่ายให้เพื่อนยิงครบ 10 ครั้ง',p=>[p.ta||0,10],{sp:3,m:20000}],
 ['a50','🎯','50 แอสซิสต์','จ่ายให้เพื่อนยิงครบ 50 ครั้ง',p=>[p.ta||0,50],{sp:6,m:150000}],
 ['p50','👟','50 นัด','ลงสนามครบ 50 นัดในอาชีพ',p=>[p.capp||0,50],{sp:3,m:30000}],
 ['p100','🏟️','100 นัด','ลงสนามครบ 100 นัดในอาชีพ',p=>[p.capp||0,100],{sp:6,m:120000,tr:5}],
 ['p250','🎖️','250 นัด','ลงสนามครบ 250 นัดในอาชีพ',p=>[p.capp||0,250],{sp:12,m:800000}],
 ['hat','⚽⚽⚽','แฮตทริกแรก','ยิง 3 ประตูในเกมเดียว',p=>[(p.mst||{}).hat||0,1],{sp:3}],
 ['motm5','🏅','แมนออฟเดอะแมตช์ x5','คว้า MOTM ครบ 5 ครั้ง',p=>[(p.mst||{}).motm||0,5],{sp:3,f:.05}],
 ['motm25','🏅','แมนออฟเดอะแมตช์ x25','คว้า MOTM ครบ 25 ครั้ง',p=>[(p.mst||{}).motm||0,25],{sp:8,m:300000}],
 ['cs10','🧱','คลีนชีต 10 นัด','ไม่เสียประตูขณะลงเล่น 10 นัด (กองหลัง)',p=>[(p.mst||{}).cs||0,10],{sp:4,tr:5}],
 ['starter','✅','ตัวจริงของทีม','ไต่ขึ้นถึงระดับตัวจริง',p=>[(p.tt||0)>=3?1:0,1],{sp:3,tr:3}],
 ['capt','©️','กัปตันทีม','ไต่ขึ้นถึงระดับตัวหลัก/กัปตัน',p=>[(p.tt||0)>=4?1:0,1],{sp:6,m:100000,f:.08}],
 ['leg','⭐','สวมเบอร์ตำนาน','ได้สวมเสื้อเบอร์ตำนานของสโมสร',p=>[p.numL?1:0,1],{sp:4,f:.1}],
 ['f100k','📱','100K ผู้ติดตาม','มีผู้ติดตามครบ 100,000',p=>[Math.round(p.fans||0),100000],{sp:3,m:50000}],
 ['f1m','💎','1M ผู้ติดตาม','มีผู้ติดตามครบ 1,000,000',p=>[Math.round(p.fans||0),1000000],{sp:8,m:500000}],
 ['abroad','✈️','ค้าแข้งต่างแดน','ย้ายไปเล่นในลีกต่างประเทศ',p=>{if(S.club&&S.club.c!==p.nat)p.abroad=1;return [p.abroad?1:0,1]},{sp:3,f:.08}],
 ['nat','🛡️','ติดทีมชาติ','ได้ลงเล่นให้ทีมชาติ',p=>[p.caps||0,1],{sp:4,f:.1}],
 ['troph1','🏆','แชมป์แรก','คว้าถ้วยรางวัลกับทีมครั้งแรก',p=>[(S.cab||[]).filter(x=>x.t==='team').length,1],{sp:5,m:100000}],
 ['ind1','🥇','รางวัลส่วนตัวแรก','คว้ารางวัลส่วนตัวรายเดือน/รายฤดูกาล',p=>[(S.cab||[]).filter(x=>x.t==='ind').length,1],{sp:4}],
 ['ballon','🌍','ลูกฟุตบอลทองคำโลก','คว้ารางวัลนักเตะยอดเยี่ยมของโลก',p=>[(S.cab||[]).filter(x=>x.k==='ballon').length,1],{sp:25,m:5000000,f:.3}]];
function AWI(){const p=S.p;if(!S.cab)S.cab=[];if(!S.ach)S.ach={};if(!p.mst)p.mst={hat:0,brace:0,poker:0,motm:0,cs:0,a3:0};if(p.capp==null){p.capp=(p.app||0)+((p.lastS&&p.lastS.app)||0)+Math.max(0,((S.season||1)-2))*10;if(p.tg>0||p.capp>0)p.capp=Math.max(p.capp,1)}
 if(p.srn==null){p.srs=0;p.srn=0;p.smotm=0;p.scs=0}
 if(!S.achInit){S.achInit=1;ACH.forEach(a=>{const [c,g]=a[4](p);if(c>=g)S.ach[a[0]]=1})}}
function rewTxt(r){const p=S.p,o=[];if(r.m){p.money+=r.m;o.push(`💰 +฿${fmt(r.m)}`)}if(r.sp){PI();p.sp+=r.sp;o.push(`⭐ +${r.sp} สกิลพอยต์`)}if(r.f){const v=Math.round(p.fans*r.f)+Math.round(500*r.f*10);p.fans+=v;o.push(`📈 +${fmt(v)} ผู้ติดตาม`)}if(r.mo){p.morale=cl(p.morale+r.mo);o.push(`😊 ขวัญ +${r.mo}`)}if(r.tr){p.trust=cl(p.trust+r.tr);o.push(`🤝 โค้ช +${r.tr}`)}return o}
function cabAdd(o){AWI();S.cab.push(Object.assign({s:S.slabel||'',c:club()?club().n:'',f:S.club?LEAGUES[S.club.c].f:''},o))}
let CQ=[];
function celeb(ic,title,sub,rw){CQ.push({ic,title,sub,rw});if(!document.getElementById('celeb'))celebNext()}
function celebNext(){const c=CQ.shift();if(!c)return;try{SFX&&SFX(c.big?'cheer':'jingle')}catch(e){}const d=document.createElement('div');d.id='celeb';
 d.innerHTML=`<div class="cbx"><div class="cic">${c.ic}</div><h1>${c.title}</h1><p>${c.sub||''}</p>${c.rw&&c.rw.length?`<ul class="cons">${c.rw.map(x=>`<li>${x}</li>`).join('')}</ul>`:''}<button class="btn" id="cbok">สุดยอด! ›</button></div><div class="conf">${'🎉✨⚽🏆⭐'.repeat(6).match(/./gu).map((e,i)=>`<i style="left:${(i*37)%100}%;animation-delay:${(i%7)*.25}s">${e}</i>`).join('')}</div>`;
 document.body.appendChild(d);d.querySelector('#cbok').onclick=()=>{d.remove();save();celebNext()}}
function achChk(){AWI();const p=S.p;ACH.forEach(a=>{if(S.ach[a[0]])return;const [c,g]=a[4](p);if(c>=g){S.ach[a[0]]=1;const r=rewTxt(a[5]);news(`🏅 ปลดล็อกความสำเร็จ: ${a[2]}`);toast(`🏅 ความสำเร็จ: ${a[2]}`);try{SFX('chime')}catch(e){}}})}
function lgName(){return S.club?tierOf(S.club.c,S.club.t).n:''}
function lgW(){if(!S.club)return .2;const L=LEAGUES[S.club.c],str=L.tiers[S.club.t][1];return cl((str-40)/45,.1,1.1)*(TOP5.includes(S.club.c)?1:.75)}
function monthEval(){const p=S.p,m=p.mo;if(!m||m.app<3){return}const avg=m.rs/m.app,sc=avg+.25*m.g+.15*m.a,riv=7.9+R()*.8;
 if(sc>=riv){const L=lgName(),r=rewTxt({m:Math.round(15000+40000*lgW()*lgW()*10/5),sp:3,f:.05,tr:5});cabAdd({t:'ind',k:'potm',ic:'📅',n:`ผู้เล่นยอดเยี่ยมประจำเดือน`,d:`${L} · ${['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'][m.k%12]}`});
  news(`📅 ${p.name} คว้ารางวัลผู้เล่นยอดเยี่ยมประจำเดือนของ ${L}! (${m.g} ประตู ${m.a} แอสซิสต์ เรตติ้งเฉลี่ย ${avg.toFixed(2)})`);celeb('📅','ผู้เล่นยอดเยี่ยมประจำเดือน!',`${L} · ${m.app} นัด ${m.g} ประตู ${m.a} แอสซิสต์ · เฉลี่ย ${avg.toFixed(2)}`,r)}}
const _fnA=finish;finish=function(nx,M,msg,quiet){const p=S.p;AWI();const tg0=p.tg||0;const r=_fnA(nx,M,msg,quiet);
 try{if(M.played){const res=(S.log[S.week-1]||'0-0').split('-').map(Number),ga=res[1],rr=cl(M.r,3,10),mk=(()=>{const y=ymd(now());return y[0]*12+y[1]})();
  if(p.mo&&p.mo.k!==mk)monthEval();if(!p.mo||p.mo.k!==mk)p.mo={k:mk,app:0,g:0,a:0,rs:0};p.mo.app++;p.mo.g+=M.g||0;p.mo.a+=M.as||0;p.mo.rs+=rr;
  p.capp=(p.capp||0)+1;p.srs+=rr;p.srn++;const mst=p.mst,cn=club()?club().n:'',vs=M.opp;
  if(p.capp===1){const rw=rewTxt({sp:1,mo:5});cabAdd({t:'ms',k:'debut',ic:'🎽',n:'เสื้อนัดเดบิวต์',d:`vs ${vs}`});news(`🎽 ${p.name} ลงเดบิวต์อาชีพกับ ${cn}!`);celeb('🎽','นัดเดบิวต์อาชีพ!',`ก้าวแรกบนเส้นทางแข้ง vs ${vs}`,rw)}
  if(M.g>0&&tg0===0){const rw=rewTxt({sp:2,f:.06,mo:8});cabAdd({t:'ms',k:'fg',ic:'⚽',n:'ประตูแรกในอาชีพ',d:`vs ${vs}`});news(`⚽ ประวัติศาสตร์ส่วนตัว! ${p.name} ยิงประตูแรกในอาชีพใส่ ${vs}`);celeb('⚽','ประตูแรกในอาชีพ!',`จะจดจำวันนี้ไปตลอดชีวิต vs ${vs}`,rw)}
  if(M.g>=4){mst.poker++;mst.hat++;const rw=rewTxt({sp:8,f:.18,mo:15,tr:8,m:30000});cabAdd({t:'ball',k:'poker',ic:'⚽',n:'ลูกบอลโปกเกอร์ (4 ประตู)',d:`${M.g} ประตู vs ${vs}`});news(`🤯 โปกเกอร์!! ${p.name} ถล่ม ${vs} คนเดียว ${M.g} ประตู! เก็บลูกบอลกลับบ้าน`);celeb('⚽⚽⚽⚽',`โปกเกอร์ตำนาน! ${M.g} ประตู`,`คุณเก็บลูกบอลนัดนี้กลับบ้าน · vs ${vs}`,rw);CQ[CQ.length-1].big=1}
  else if(M.g===3){mst.hat++;const rw=rewTxt({sp:5,f:.12,mo:12,tr:6,m:15000});cabAdd({t:'ball',k:'hat',ic:'⚽',n:'ลูกบอลแฮตทริก',d:`vs ${vs}`});news(`🎩 แฮตทริกฮีโร่! ${p.name} ซัด 3 ประตูใส่ ${vs} พร้อมเก็บลูกบอลไว้เป็นที่ระลึก`);celeb('⚽⚽⚽','แฮตทริกฮีโร่!',`คุณเก็บลูกบอลนัดนี้ไว้ในตู้รางวัล · vs ${vs}`,rw)}
  else if(M.g===2){mst.brace++;const rw=rewTxt({sp:2,f:.04,mo:5});toast('⚽⚽ เบรซ! ยิง 2 ประตู · '+rw.join(' '));news(`⚽⚽ ${p.name} ยิงเบรซใส่ ${vs}`)}
  if(M.as>=3){mst.a3++;const rw=rewTxt({sp:3,f:.06,tr:4});cabAdd({t:'ms',k:'a3',ic:'🎯',n:`จอมแอสซิสต์ ${M.as} ลูก`,d:`vs ${vs}`});news(`🎯 ${p.name} จ่ายให้เพื่อนยิง ${M.as} ลูกในเกมเดียว!`);celeb('🎯',`แอสซิสต์ ${M.as} ลูกในเกมเดียว!`,'เพลย์เมกเกอร์ไฟลุก',rw)}
  if(M.motm){mst.motm++;p.smotm++}
  if(p.pos==='DF'&&ga===0){mst.cs++;p.scs++;const rw=rewTxt({sp:1,tr:2});toast('🧱 คลีนชีต! '+rw.join(' '))}
 }achChk();save()}catch(e){console.error('awards',e)}return r};
const _esA=endSeason;endSeason=function(){if(!S.club)return _esA();AWI();const p=S.p;let out=[];
 try{monthEval();p.mo=null;const st=sorted(),pos=st.findIndex(r=>r.i===S.club.i)+1,c=S.club,L=lgName(),cn=club().n,app=p.sapp||0,avg=p.srn?p.srs/p.srn:0,g=p.sg||0,a=p.sa||0,w=lgW(),age=p.age;
  const add=(k,ic,n,d,rw,txt,t='ind')=>{const r=rewTxt(rw);cabAdd({t,k,ic,n,d});news(`${ic} ${txt}`);out.push({ic,n,d,r})};
  if(pos===1)add('league','🏆',`แชมป์ ${L}`,`${cn} · ${S.slabel}`,{m:Math.round(50000+400000*w*w),f:.15,mo:15,tr:5},`${cn} คว้าแชมป์ ${L}! ${p.name} ชูถ้วยร่วมกับทีม`,'team');
  else if(pos<=2&&c.t>0)add('promo','🥈',`เลื่อนชั้นจาก ${L}`,`${cn} · ${S.slabel}`,{m:Math.round(30000+150000*w*w),f:.08,mo:10},`${cn} เลื่อนชั้นสำเร็จ!`,'team');
  if(app>=10){const rg=rnd(12,22),ra=rnd(8,15);
   if(g>=rg)add('boot','👟',`รองเท้าทองคำ ${L}`,`${g} ประตู · ${S.slabel}`,{m:Math.round(40000+300000*w*w),sp:6,f:.12,tr:5},`${p.name} คว้ารองเท้าทองคำ ${L} ด้วย ${g} ประตู!`);
   if(a>=ra)add('play','🎯',`ราชาแอสซิสต์ ${L}`,`${a} แอสซิสต์ · ${S.slabel}`,{m:Math.round(30000+200000*w*w),sp:5,f:.08},`${p.name} คว้ารางวัลเพลย์เมกเกอร์ ${L} (${a} แอสซิสต์)`);}
  const ps=avg+.06*g+.05*a+(pos===1?.15:0);
  if(app>=18&&ps>=8.1+R()*.5)add('pots','👑',`ผู้เล่นยอดเยี่ยมแห่งฤดูกาล ${L}`,S.slabel,{m:Math.round(80000+500000*w*w),sp:8,f:.2,tr:8,mo:15},`${p.name} ได้รับเลือกเป็นผู้เล่นยอดเยี่ยมแห่งฤดูกาล ${L}!`);
  if(age<=21&&app>=12&&ps>=7.5+R()*.4)add('ypots','🌟',`ดาวรุ่งยอดเยี่ยมแห่งฤดูกาล ${L}`,S.slabel,{m:Math.round(30000+200000*w*w),sp:5,f:.12,tr:5},`${p.name} คว้ารางวัลดาวรุ่งยอดเยี่ยม ${L}!`);
  if(app>=16&&(avg>=7.3||(avg>=7.0&&g+a>=12)))add('tots','📋',`ทีมยอดเยี่ยมแห่งฤดูกาล ${L}`,`ตำแหน่ง${POS[p.pos]} · ${S.slabel}`,{sp:3,f:.06,tr:3},`${p.name} ติดทีมยอดเยี่ยมแห่งฤดูกาล ${L}`);
  if(app>=12&&ps+Math.min(.3,Math.log10(p.fans+10)/20)>=7.5+R()*.4)add('fans','❤️',`ขวัญใจแฟนบอล ${cn}`,`โหวตโดยแฟนบอล · ${S.slabel}`,{f:.1,mo:10,tr:4},`แฟนบอล ${cn} โหวตให้ ${p.name} เป็นนักเตะยอดเยี่ยมของสโมสร`);
  if(p.pos==='DF'&&app>=15&&p.scs>=8&&avg>=6.9)add('wall','🧱',`กองหลังยอดเยี่ยมแห่งฤดูกาล ${L}`,`${p.scs} คลีนชีต · ${S.slabel}`,{sp:4,f:.06,tr:4},`${p.name} คว้ารางวัลกองหลังยอดเยี่ยม ${L} (${p.scs} คลีนชีต)`);
  const gs=((avg-6)*2+g*.12+a*.08+(pos===1?1:0)+(p.smotm||0)*.1)*w;
  if(age<=21&&app>=12){if(gs>=4.2+R()*.8)add('gboy','🏅','โกลเด้นบอย (ดาวรุ่ง U21 ยอดเยี่ยมของโลก)',S.slabel,{m:300000,sp:8,f:.25,tr:6},`🌍 ${p.name} คว้ารางวัลโกลเด้นบอย! ดาวรุ่งที่ดีที่สุดในโลก`);else if(gs>=3)news(`🏅 ${p.name} ติดโผผู้เข้าชิงโกลเด้นบอย`)}
  if(c.t===0&&app>=18){if(gs>=6.3+R()*.9)add('ballon','🌍','ลูกฟุตบอลทองคำโลก',`นักเตะยอดเยี่ยมของโลก ${S.slabel}`,{m:2000000,sp:15,f:.4,tr:10,mo:25},`🌍🏆 ${p.name} คือนักเตะที่ดีที่สุดในโลก! คว้าลูกฟุตบอลทองคำ`);else if(gs>=4.5){const rk=gs>=5.5?rnd(2,3):rnd(4,10);news(`🌍 ${p.name} ติดอันดับ ${rk} ของรางวัลลูกฟุตบอลทองคำโลก`);toast(`🌍 ลูกฟุตบอลทองคำ: อันดับ ${rk}`)}}
  p.srs=0;p.srn=0;p.smotm=0;p.scs=0}catch(e){console.error('season awards',e)}
 const r=_esA();if(out.length===1)celeb(out[0].ic,out[0].n,out[0].d,out[0].r);else if(out.length)celeb(out.map(o=>o.ic).slice(0,4).join(''),`${out.length} รางวัลแห่งฤดูกาล!`,out.map(o=>`<b>${o.ic} ${o.n}</b>`).join('<br>'),out.flatMap(o=>o.r));try{achChk()}catch(e){}save();return r};
function cabHTML(){AWI();const p=S.p,cab=S.cab;const grp=t=>{const m={};cab.filter(x=>x.t===t).forEach(x=>{const k=x.n;(m[k]=m[k]||{ic:x.ic,n:x.n,l:[]}).l.push(x)});return Object.values(m)};
 const shelf=(t,title)=>{const g=grp(t);return `<div class="card"><h2>${title}</h2>${g.length?`<div class="shelf">${g.map(x=>`<div class="trph"><div class="ti">${x.ic}${x.l.length>1?`<b>x${x.l.length}</b>`:''}</div><div class="tn">${x.n}</div><small class="mu">${x.l.slice(-3).map(y=>`${y.s}${y.c?' · '+y.c:''}${y.d&&t!=='team'&&y.d!==y.s?' · '+y.d.replace(' · '+y.s,''):''}`).join('<br>')}</small></div>`).join('')}</div>`:'<p class="mu">ยังว่างอยู่ — ลงสนามแล้วสร้างประวัติศาสตร์กันเลย!</p>'}</div>`};
 const done=ACH.filter(a=>S.ach[a[0]]).length;
 return `<div class="card row sp"><div><h2 style="margin:0">🏆 ตู้รางวัล</h2><span class="mu">${cab.length} รางวัล · 🏅 MOTM ${p.mst.motm} ครั้ง · ⚽⚽⚽ แฮตทริก ${p.mst.hat}</span></div></div>
 ${shelf('team','🏆 ถ้วยรางวัลทีม')}${shelf('ind','🥇 รางวัลส่วนตัว')}${shelf('ball','⚽ ลูกบอลที่ระลึก')}${shelf('ms','🎽 ช่วงเวลาสำคัญ')}
 <div class="card"><div class="row sp"><h2>🎖️ ความสำเร็จ</h2><span class="tag">${done}/${ACH.length}</span></div>${ACH.map(a=>{const [c,g]=a[4](p),ok=S.ach[a[0]],r=a[5];return `<div class="achr ${ok?'ok':''}"><span class="ai">${ok?a[1]:'🔒'}</span><div style="flex:1;min-width:0"><b>${a[2]}</b><div class="mu" style="font-size:12px">${a[3]} · รางวัล: ${[r.sp?`⭐${r.sp}`:'',r.m?`฿${fmt(r.m)}`:'',r.f?'📈':'',r.tr?'🤝':''].filter(Boolean).join(' ')}</div>${ok?'':bar(Math.min(100,c/g*100))}<small class="mu">${ok?'✅ ปลดล็อกแล้ว':`${fmt(Math.min(c,g))}/${fmt(g)}`}</small></div></div>`}).join('')}</div>`}
function openCab(){sheet(`<div class="row sp"><span class="tag g">🏆 ตู้รางวัล</span><button class="ab" onclick="closeM()" style="font-size:18px">✕</button></div>${cabHTML()}`)}
// keep the action bar outside the scroll container (fixed to viewport, never dragged by iOS bounce)
try{new MutationObserver(ms=>{if(!ms.some(m=>m.addedNodes.length))return;const old=document.querySelector('body>#abar');const nw=document.querySelector('#app #abar');if(old&&old!==nw)old.remove();if(nw)document.body.insertBefore(nw,document.getElementById('tabs'))}).observe(document.getElementById('app'),{childList:true})}catch(e){}
try{boot()}catch(e){console.error('boot failed',e);checkUpdate()}
