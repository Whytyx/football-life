'use strict';
// ===== เส้นทางแข้ง: Football Life =====
const R=Math.random,rnd=(a,b)=>a+Math.floor(R()*(b-a+1)),pick=a=>a[Math.floor(R()*a.length)],cl=(v,a=0,b=100)=>Math.max(a,Math.min(b,v));
const chance=p=>R()<p, $=s=>document.querySelector(s);
const fmt=n=>n<0?'-'+fmt(-n):n>=1e6?(n/1e6).toFixed(1)+'M':n>=1e3?(n/1e3).toFixed(1)+'K':Math.round(n)+'';
const LEAGUES={
 ENG:{n:'อังกฤษ',f:'🏴',tiers:[['Premier Division',82],['Championship',73],['League One',65],['National League',58]],cities:['Ashford','Kingsbridge','Northvale','Redmoor','Whitehaven','Blackmoor','Eastport','Westbury','Stonegate','Highcliff','Millford','Oakham','Riverton','Brackwell','Lynton','Dunmore','Hartfield','Fernley','Grimsdale','Pelham','Thornbury','Wexley','Yarwood','Cobham','Halbrook','Merrow','Sandhurst','Tewley','Garston','Ilford Vale','Kestrel','Lowmarsh'],suf:['United','City','Rovers','Athletic','Town','Wanderers','Albion','FC']},
 ESP:{n:'สเปน',f:'🇪🇸',tiers:[['Primera Liga',81],['Segunda',70]],cities:['Valdoria','Montesol','Rioseco','Castelmar','Almira','Puerto Verde','Sierra Alta','Torreluz','Navalón','Gredos','Peñaclara','Arenales','Villafría','Costabella','Mirador','Olivar'],pre:['Real','Atlético','CD','UD','Deportivo','SD','Racing','CF']},
 ITA:{n:'อิตาลี',f:'🇮🇹',tiers:[['Serie Prima',80],['Serie Cadetti',70]],cities:['Valmonte','Portoferro','Castellina','Rocca Nera','San Vito','Lago Azzurro','Montebruno','Vercella','Ardenza','Collefiore','Torrenova','Belcastro','Pianura','Marevento','Sassolungo','Ostiana'],pre:['AC','US','FC','SS','Calcio','Virtus','Sporting','Inter']},
 GER:{n:'เยอรมนี',f:'🇩🇪',tiers:[['Erste Liga',80],['Zweite Liga',70]],cities:['Steinfeld','Rheinau','Waldheim','Kaltenberg','Bergstadt','Eisenbach','Nordmark','Hohenfels','Lindenau','Oberhof','Grünwald','Falkenrode','Mühlhafen','Sonnenberg','Altenburg','Wolfsee'],pre:['SV','FC','VfB','TSV','Borussia','Fortuna','SC','1. FC']},
 FRA:{n:'ฝรั่งเศส',f:'🇫🇷',tiers:[['Ligue Élite',78],['Ligue Deux',68]],cities:['Montclair','Saint-Lune','Valfleur','Rochebelle','Port-Argent','Beaumarais','Lacroix','Clairvaux','Mirande','Orvault','Pontivy-Sur-Mer','Belleville','Châteaurouge','Sablon','Verdier','Aubenas'],pre:['Olympique','AS','FC','Stade','RC','SC','Racing','US']},
 JPN:{n:'ญี่ปุ่น',f:'🇯🇵',tiers:[['J-Premier',72],['J-Second',64]],cities:['Aokawa','Shirayama','Kitahama','Minatoya','Hoshino','Takamori','Midorigawa','Kazehara','Sakurazaka','Umibe','Tsukino','Akagane','Hayate','Kurogane','Yumesato','Fujimine'],suf:['FC','United','SC','Blitz','Thunders','Marines','Falcons','Stars']},
 KSA:{n:'ซาอุฯ',f:'🇸🇦',tiers:[['Desert Pro League',74],['First Division',62]],cities:['Al-Noor','Al-Sahra','Al-Fajr','Al-Najm','Al-Wadi','Al-Qamar','Al-Rimal','Al-Saqr','Al-Barq','Al-Majd','Al-Nakheel','Al-Shams','Al-Bahr','Al-Fursan','Al-Khalij','Al-Ruwad'],suf:['FC','Club','SC','United']},
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
const wage=(c,t)=>Math.round(Math.pow(tierOf(c,t).str-42,2)*120/10)*10;
function save(){localStorage.setItem('fl_save3',JSON.stringify(S))}
function load(){try{S=JSON.parse(localStorage.getItem('fl_save3'))}catch(e){S=null}}
function news(t){S.news.unshift({w:`${S.slabel||''} · ${new Date(now()).toLocaleString('th-TH',{timeZone:'Asia/Bangkok',day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})}`,t});S.news=S.news.slice(0,60)}
// ===== consequence helpers =====
const LBL={morale:'ขวัญกำลังใจ',trust:'ความเชื่อใจโค้ช',ref:'ชื่อเสียงกับกรรมการ',stamina:'สตามิน่า',media:'ภาพลักษณ์สื่อ'};
function E(k,d){if(!d)return;const p=S.p;if(k==='fans'){const v=d<1&&d>-1?Math.round(p.fans*d):d;p.fans=Math.max(50,p.fans+v);CONS.push((v>=0?'📈':'📉')+` ผู้ติดตาม ${v>=0?'+':''}${fmt(v)}`);return}
 if(k==='money'){p.money+=d;CONS.push((d>=0?'💰':'💸')+` เงิน ${d>=0?'+':''}฿${fmt(d)}`);return}
 if(AT[k]){p.a[k]=cl(p.a[k]+d,20,99);CONS.push(`⚡ ${AT[k]} ${d>0?'+':''}${d}`);return}
 p[k]=cl(p[k]+d);CONS.push(`${d>0?'🟢':'🔴'} ${LBL[k]} ${d>0?'+':''}${d}`)}
const N=t=>CONS.push('📝 '+t);
function fine(x){x=Math.max(x,Math.round(S.p.wage*x/10000));S.p.money-=x;CONS.push(`💸 โดนปรับ ฿${fmt(x)}`);S.p.fines+=x}
function ban(n,why){S.p.ban+=n;CONS.push(`⛔ แบน ${n} นัด (${why})`);news(`${S.p.name} ถูกแบน ${n} นัด: ${why}`)}
function chain(id,wk=1){S.chains.push({id,at:S.abs+wk})}
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
{id:'subOff',m:1,min:[50,65],x:M=>`นาที ${M.min}' ป้ายเปลี่ยนตัวขึ้นเบอร์ของคุณ! โค้ชเปลี่ยนคุณออกทั้งที่เกมยังไม่ถึงชั่วโมง`,o:[
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
{id:'thai',off:1,c:()=>ovr()>=66&&!S.p.called,x:()=>`🇹🇭 สมาคมฟุตบอลแห่งประเทศไทยเรียกตัวคุณติดทีมชาติไทยชุดใหญ่! แต่ช่วงนั้นสโมสรมีเกมสำคัญ`,o:[
 {l:'🇹🇭 รับใช้ชาติ!',f:()=>{S.p.called=1;S.p.caps++;E('fans',0.25);E('morale',10);E('stamina',-10);if(chance(.3+sk('sho')*.4)){S.p.ig++;N('ยิงประตูให้ทีมชาติไทย!! คนทั้งประเทศเรียกชื่อคุณ')}else N('ได้ลงเล่นให้ทีมชาติครั้งแรก ภูมิใจที่สุดในชีวิต');news(`${S.p.name} ติดธงทีมชาติไทย!`)}},
 {l:'🏟️ ขอโฟกัสสโมสร',f:()=>{E('trust',6);E('fans',-0.1);N('แฟนบอลไทยบางส่วนผิดหวัง')}}]},
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
function newSeason(start){freshTable();S.ko=makeSchedule(start||now(),S.club?S.club.c:S.startC);S.N=NR;S.week=0;const y=ymd(S.ko[NR-1])[0];S.slabel=`${y-1}/${String(y).slice(2)}`;S.p.sg=0;S.p.sa=0;S.p.app=0;S.p.yc=0;S.p.called=0}
function newSeasonKeep(){const w=S.week;freshTable();for(let k=0;k<w;k++){S.fix[k].forEach(([x,y])=>rec(x,y,pois(1.3),pois(1.2)));S.log[k]='—'}}
const pois=l=>{let L=Math.exp(-Math.max(.1,l)),k=0,p=1;do{k++;p*=R()}while(p>L);return k-1};
function rec(a,b,ga,gb){const A=S.table[a],B=S.table[b];A.p++;B.p++;A.gf+=ga;A.ga+=gb;B.gf+=gb;B.ga+=ga;if(ga>gb){A.w++;A.pts+=3;B.l++}else if(ga<gb){B.w++;B.pts+=3;A.l++}else{A.d++;B.d++;A.pts++;B.pts++}}
const sorted=()=>[...S.table].sort((x,y)=>y.pts-x.pts||(y.gf-y.ga)-(x.gf-x.ga)||y.gf-x.gf);
// ===== NEW GAME =====
function newGame(name,pos,c){const w=genWorld();
 const base={pac:50,sho:50,pas:50,dri:50,def:50,phy:50};for(const k in base)base[k]=rnd(44,56)+Math.round(W[pos][k]*25);
 const ry=new Date().getFullYear()-(new Date().getMonth()<5?1:0);S={gameT:bk(ry,7,1,9),world:w,club:null,startC:c,season:1,abs:0,news:[],chains:[],log:[],devOff:0,lastT:Date.now(),evDay:dkey(Date.now()),
  p:{name,pos,age:18,a:base,stamina:90,morale:65,trust:50,ref:55,media:50,fans:300,money:20000,wage:0,contract:2,ban:0,inj:0,yc:0,rc:0,fines:0,tg:0,ta:0,sg:0,sa:0,app:0,caps:0,ig:0,benched:0,agent:0,trainDay:-1}};
 newSeason(bk(ry,7,8,9));save()}
// ===== UI =====
function bar(v,cls=''){return `<div class="bar ${cls}"><i style="width:${cl(v)}%"></i></div>`}
function setup(){let pos='FW',c='ENG';const draw=()=>{$('#app').innerHTML=`
 <div style="text-align:center;padding:30px 0 10px"><div style="font-size:54px">⚽</div><h1>เส้นทางแข้ง</h1><div class="or" style="font-weight:800;letter-spacing:3px">FOOTBALL LIFE</div><p class="mu">จากเด็กบ้านนอก สู่ซูเปอร์สตาร์ ทุกการตัดสินใจมีราคา</p></div>
 <div class="card"><h2>ชื่อนักเตะ</h2><input id="nm" maxlength="20" placeholder="เช่น ชนาธิป จ." value="${$('#nm')?.value||''}">
 <h2>ตำแหน่ง</h2><div class="chips">${Object.entries(POS).map(([k,v])=>`<div class="chip ${k===pos?'on':''}" data-pos="${k}">${v}</div>`).join('')}</div>
 <h2>เลือกลีกเริ่มต้น</h2><div class="chips">${Object.entries(LEAGUES).map(([k,L])=>`<div class="chip ${k===c?'on':''}" data-c="${k}">${L.f} ${L.n}</div>`).join('')}</div>
 <p class="mu" style="margin-top:10px">คุณจะเริ่มที่สโมสรเล็กใน <b class="or">${LEAGUES[c].tiers.at(-1)[0]}</b> ลีกล่างสุดของ${LEAGUES[c].n} — ย้ายข้ามลีกได้ภายหลัง และยังติดทีมชาติไทยได้ 🇹🇭</p>
 <button class="btn" id="go">เริ่มอาชีพ</button></div>`;
 document.querySelectorAll('[data-pos]').forEach(e=>e.onclick=()=>{pos=e.dataset.pos;draw()});
 document.querySelectorAll('[data-c]').forEach(e=>e.onclick=()=>{c=e.dataset.c;draw()});
 $('#go').onclick=()=>{const n=$('#nm').value.trim()||'ไบคัง';newGame(n,pos,c);TAB='home';render();offers(false,c)}};
 $('#tabs').innerHTML='';draw()}
function tabs(){const T=[['home','🏠','หน้าหลัก'],['table','🏆','ตาราง'],['me','👤','นักเตะ'],['news','📰','ข่าว'],['career','💼','อาชีพ']];
 $('#tabs').innerHTML=T.map(([k,i,l])=>`<button class="${TAB===k?'on':''}" data-t="${k}"><span>${i}</span>${l}</button>`).join('');
 document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{TAB=b.dataset.t;render()})}
function header(){const c=club(),L=S.club?LEAGUES[S.club.c]:null;return `<div class="card row sp"><div><div class="mu">${c?L.f+' '+tierOf(S.club.c,S.club.t).n:'ไร้สังกัด'}</div><h1>${S.p.name}</h1><div class="mu">${POS[S.p.pos]} · อายุ ${S.p.age} · ${c?c.n:'Free Agent'}</div></div><div class="ovr" id="ovrb"><div style="font-size:11px">OVR</div><div class="big" style="font-size:36px">${ovr()}</div></div></div>`}
const COACH=[['🛡️ เน้นวินัย','ไม่ชอบนักเตะเกเร'],['🚀 บุกสุดตัว','ชอบนักเตะสร้างสรรค์'],['🧓 พ่อพระ','ใจดี ให้โอกาสเด็ก'],['🔥 เผด็จการ','เปลี่ยนตัวไว ด่าแรง'],['📊 สายแท็กติก','ชอบคนทำตามแผน']];
const ROLE={star:['ตัวจริง','g',62],rot:['สำรอง','',38],kid:['ดาวรุ่ง','o',50]};
function hue(n){let h=0;for(const ch of n)h=(h*31+ch.charCodeAt(0))%360;return h}
function genOffers(country){const o=ovr(),all=[];for(const c in S.world){if(country&&c!==country)continue;S.world[c].forEach((t,ti)=>all.push({c,ti,t}))}
 let fit=all.filter(x=>x.t.str<=o+12+(S.p.fans>50000?3:0)&&x.t.str>=o-16&&!(S.club&&x.c===S.club.c&&x.ti===S.club.t&&!S.p.wantOut));
 if(country){const T=S.world[country];fit=[{c:country,ti:T.length-1,t:T.at(-1)},{c:country,ti:T.length-1,t:T.at(-1)}];if(T.length>1)fit.push({c:country,ti:T.length-2,t:T.at(-2)});}
 const n=country?(S.world[country].length>1?4:3):S.p.agent?4:rnd(2,3),res=[],used=new Set();
 for(let k=0;k<n*3&&res.length<n&&fit.length;k++){const x=country?fit[res.length%fit.length]:pick(fit);const i=rnd(0,7),key=x.c+x.ti+'-'+i;if(used.has(key)||(S.club&&x.c===S.club.c&&x.ti===S.club.t&&i===S.club.i))continue;used.add(key);
  const cb=x.t.clubs[i],gap=cb.s-o;const role=gap>8?(S.p.age<22?'kid':'rot'):gap>2?pick(['rot','kid','star']):'star';
  const w=Math.round(wage(x.c,x.ti)*(.7+R()*.6)*(role==='star'?1.15:role==='kid'?.75:1)/10)*10;
  res.push({c:x.c,t:x.ti,i,wage:w,yrs:rnd(1,4),role,coach:rnd(0,COACH.length-1),bonus:chance(.5)?Math.round(w*rnd(2,8)/100)*100:0,fans:Math.round(Math.pow(cb.s-30,2.6)*3)})}
 return res}
function offerCard(o,k){const t=tierOf(o.c,o.t),L=LEAGUES[o.c],cb=t.clubs[o.i],h=hue(cb.n),r=ROLE[o.role],co=COACH[o.coach];
 if(o.gone)return `<div class="card" style="opacity:.45"><b>${cb.n}</b><p class="re">❌ ถอนข้อเสนอแล้ว</p></div>`;
 return `<div class="card"><div class="row"><div style="width:46px;height:46px;border-radius:50%;flex:none;background:conic-gradient(hsl(${h},70%,45%) 0 50%,hsl(${(h+150)%360},70%,55%) 0);border:3px solid #fff2;display:grid;place-items:center;font-weight:800">${cb.n.replace(/^(Real|Atlético|CD|UD|Deportivo|SD|Racing|CF|AC|US|FC|SS|Calcio|Virtus|Sporting|Inter|SV|VfB|TSV|Borussia|Fortuna|SC|1\. FC|Olympique|AS|Stade|RC) /,'')[0]}</div>
 <div style="flex:1"><b style="font-size:17px">${cb.n}</b><div class="mu">${L.f} ${t.n}</div></div><span class="tag ${r[1]}">${r[0]}</span></div>
 <div class="grid2" style="margin-top:10px;gap:6px"><div class="mini"><span class="mu">พลังทีม</span><b>${cb.s}</b>${bar(cb.s)}</div><div class="mini"><span class="mu">ค่าเหนื่อย/สัปดาห์</span><b class="ye">฿${fmt(o.wage)}</b></div>
 <div class="mini"><span class="mu">สัญญา</span><b>${o.yrs} ปี</b></div><div class="mini"><span class="mu">ฐานแฟนบอล</span><b>${fmt(o.fans)}</b></div></div>
 <p class="mu" style="margin-top:8px">โค้ช: <b style="color:var(--tx)">${co[0]}</b> · ${co[1]}${o.bonus?` · <span class="ye">เงินเซ็นสัญญา ฿${fmt(o.bonus)}</span>`:''}</p>
 <div class="row"><button class="btn" style="flex:2" data-of="${k}">✍️ เซ็นเลย</button>${o.neg?'':`<button class="btn s" style="flex:1;text-align:center" data-ng="${k}">💬 ต่อรอง</button>`}</div>${o.msg?`<p class="${o.msgc}" style="margin-top:6px">${o.msg}</p>`:''}</div>`}
function offers(auto,country,list){list=list||genOffers(country);const first=!!country;
 if(!list.length){if(auto){closeM();save();return render()}return sheet(`<h2>ข้อเสนอ</h2><p>ยังไม่มีสโมสรสนใจ พัฒนาฝีเท้าก่อนนะ</p><button class="btn" onclick="closeM()">ปิด</button>`)}
 sheet(`<span class="tag o">${first?'เริ่มต้นอาชีพ':'ตลาดซื้อขาย'}</span><h2>สโมสรที่สนใจคุณ</h2><p class="mu" style="margin-bottom:10px">${first?'เลือกสโมสรแรกในชีวิตค้าแข้ง — ทีมใหญ่อาจได้นั่งสำรอง ทีมเล็กได้เป็นตัวจริง':'ต่อรองได้ครั้งเดียวต่อทีม แต่ระวังเขาถอนตัว!'}</p>${list.map(offerCard).join('')}${first?'':`<button class="btn s" id="stay" style="text-align:center">${S.club?'อยู่ทีมเดิม':'ปิด'}</button>`}`);
 document.querySelectorAll('[data-ng]').forEach(b=>b.onclick=()=>{const o=list[+b.dataset.ng];o.neg=1;
  if(chance(o.role==='star'?.3:.4)){o.gone=1;if(list.every(x=>x.gone))list.push(...genOffers(country))}else if(chance(.6)){o.wage=Math.round(o.wage*1.25/10)*10;o.bonus=Math.round((o.bonus||o.wage)*1.5/100)*100;o.msg='✅ ยอมขึ้นค่าเหนื่อย +25% และเพิ่มเงินเซ็นสัญญา!';o.msgc='gr'}else{o.msg='😐 "นี่คือข้อเสนอสุดท้ายแล้ว"';o.msgc='mu'}
  const y=$('.sheet').scrollTop;offers(auto,country,list);$('.sheet').scrollTop=y});
 document.querySelectorAll('[data-of]').forEach(b=>b.onclick=()=>{const o=list[+b.dataset.of];const old=club();S.club={c:o.c,t:o.t,i:o.i};const p=S.p;p.wage=o.wage;p.contract=o.yrs;p.trust=ROLE[o.role][2];p.role=o.role;p.coach=o.coach;p.wantOut=0;p.benched=0;p.trained=0;if(o.bonus)p.money+=o.bonus;
  news(first?`✍️ ${p.name} เซ็นสัญญาอาชีพฉบับแรกกับ ${club().n} (${LEAGUES[o.c].n} · ${tierOf(o.c,o.t).n}) ในบทบาท${ROLE[o.role][0]}`:`✈️ ย้ายทีม! ${p.name} ${old?'จาก '+old.n:''} สู่ ${club().n} (${LEAGUES[o.c].n}) บทบาท${ROLE[o.role][0]}`);newSeasonKeep();save();closeM();render()});
 $('#stay')&&($('#stay').onclick=()=>{closeM();save();render()})}
// ===== RENDER =====
let LIVE=null;
function render(){if(!S)return setup();if(LIVE)return drawLive();tick();tabs();const p=S.p;let h=header();
 if(TAB==='home'){const nx=nextFix(),t=now();h+=`<div class="datebar">📅 ${new Date(t).toLocaleDateString('th-TH',{timeZone:'Asia/Bangkok',weekday:'long',day:'numeric',month:'long',year:'numeric'})}</div>`;
  if(nx){const ko=S.ko[S.week],ready=dkey(t)>=dkey(ko);
   h+=`<div class="card"><div class="row sp"><span class="tag o">นัดที่ ${S.week+1}/${S.N}</span><span class="mu">ฤดูกาล ${S.slabel}</span></div>
   <div class="score"><div><b>${club().n}</b><div class="mu">${nx.home?'เหย้า':'เยือน'}</div></div><div class="big or">VS</div><div><b>${nx.opp.n}</b><div class="mu">พลังทีม ${nx.opp.s}</div></div></div>
   <div style="text-align:center" class="mu">🗓️ คิกออฟ ${fdt(ko)}</div><div class="cd">${ready?'🔴 วันแข่ง!':'อีก '+(dkey(ko)-dkey(t))+' วัน'}</div>
   ${p.ban?`<div class="re">⛔ คุณติดแบน ${p.ban} นัด</div>`:p.inj?`<div class="re">🚑 บาดเจ็บ ${p.inj} นัด</div>`:p.benched?`<div class="ye">🪑 โค้ชอาจไม่ส่งคุณลงสนาม</div>`:''}
   ${ready?'<button class="btn" id="play">⚽ PLAY MATCH</button>':'<div class="row"><button class="btn s" style="flex:1;text-align:center" id="nd">☀️ ไปวันถัดไป</button><button class="btn" style="flex:1.3" id="sk">⏩ ข้ามไปวันแข่ง</button></div>'}</div>`}
  else if(!S.club)h+=`<div class="card"><h2>ไร้สังกัด</h2><p>คุณไม่มีสโมสร รอข้อเสนอ...</p><button class="btn s" id="nd" style="text-align:center">☀️ ไปวันถัดไป</button><button class="btn" id="wait">${S.news.length?'รอข้อเสนอสัปดาห์นี้':'ดูสโมสรที่สนใจคุณ'}</button></div>`;
  h+=`<div class="grid2">${[['สตามิน่า',p.stamina,'gr'],['ขวัญกำลังใจ',p.morale,'gr'],['ความเชื่อใจโค้ช',p.trust,'or'],['กรรมการ',p.ref,'or']].map(([l,v,c])=>`<div class="mini"><span class="mu">${l}</span><b class="${v<30?'re':c}">${Math.round(v)}</b>${bar(v,v<30?'r':c==='or'?'o':'')}</div>`).join('')}
   <div class="mini"><span class="mu">ผู้ติดตาม</span><b>${fmt(p.fans)}</b></div><div class="mini"><span class="mu">เงิน</span><b class="${p.money<0?'re':'ye'}">฿${fmt(p.money)}</b></div></div><p class="mu" style="margin-top:6px">🔋 สตามิน่าฟื้น +12 ต่อวัน</p>`;
  const trained=p.trainDay===dkey(t);
  h+=`<h2>การซ้อมวันนี้</h2><div class="card">${trained?`<p class="gr">✅ ซ้อมแล้ววันนี้ — กลับมาซ้อมใหม่พรุ่งนี้</p>`:[['heavy','🏋️ ซ้อมหนัก (+ค่าพลัง, -สตามิน่า)'],['skill','🎯 ซ้อมจุดเด่นเฉพาะตำแหน่ง'],['tactic','📋 ประชุมแท็กติก (+ความเชื่อใจโค้ช)'],['rest','🧘 พักฟื้น (+สตามิน่า, +ขวัญ)']].map(([k,l])=>`<button class="btn s" data-tr="${k}">${l}</button>`).join('')}</div>`;
  h+=`<h2>ข่าวล่าสุด</h2><div class="card feed">${S.news.slice(0,4).map(n=>`<div>${n.t}<div class="mu">${n.w}</div></div>`).join('')}</div>`}
 if(TAB==='table'&&S.club){const T=tierOf(S.club.c,S.club.t);h+=`<div class="card"><h2>${T.n}</h2><table><tr><th>#</th><th>ทีม</th><th>น.</th><th>ช</th><th>ส</th><th>+/-</th><th>แต้ม</th></tr>${sorted().map((r,k)=>`<tr class="${r.i===S.club.i?'me':''}"><td>${k+1}</td><td>${T.clubs[r.i].n}</td><td>${r.p}</td><td>${r.w}</td><td>${r.l}</td><td>${r.gf-r.ga}</td><td><b>${r.pts}</b></td></tr>`).join('')}</table><p class="mu" style="margin-top:8px">อันดับ 1-2 เลื่อนชั้น · 2 อันดับสุดท้ายตกชั้น</p></div>`;
  h+=`<div class="card"><h2>โปรแกรม ${S.slabel}</h2>${S.fix.map((r,k)=>{const m=r.find(x=>x.includes(S.club.i));const o=m[0]===S.club.i?m[1]:m[0];return `<div class="row sp mu" style="padding:5px 0;font-size:13px;${k===S.week?'color:var(--or)':''}"><span>${k+1}. ${m[0]===S.club.i?'🏠':'✈️'} ${T.clubs[o].n}<br><small>${fdt(S.ko[k])}</small></span><b>${S.log[k]||''}</b></div>`}).join('')}</div>`}
 if(TAB==='me'){h+=`<div class="card"><h2>ค่าพลัง</h2>${Object.entries(AT).map(([k,l])=>`<div class="stat"><span>${l}</span>${bar(p.a[k])}<b>${p.a[k]}</b></div>`).join('')}</div>
  <div class="card"><h2>สถิติ</h2><div class="grid2">${[['ลงเล่นฤดูกาลนี้',p.app],['ประตู/แอสซิสต์',p.sg+' / '+p.sa],['ประตูรวมอาชีพ',p.tg],['ใบเหลือง/แดง',p.yc+' / '+p.rc],['ทีมชาติไทย',p.caps+' นัด '+p.ig+' ประตู'],['ค่าปรับรวม','฿'+fmt(p.fines)],['ภาพลักษณ์สื่อ',p.media],['ค่าเหนื่อย/สัปดาห์','฿'+fmt(p.wage)]].map(([l,v])=>`<div class="mini"><span class="mu">${l}</span><b>${v}</b></div>`).join('')}</div></div>`}
 if(TAB==='news')h+=`<div class="card feed"><h2>ฟีดข่าว</h2>${S.news.map(n=>`<div>${n.t}<div class="mu">${n.w}</div></div>`).join('')}</div>`;
 if(TAB==='career')h+=`<div class="card"><h2>สัญญา</h2><p>${club()?club().n:'-'} · เหลือ ${p.contract} ฤดูกาล · ฿${fmt(p.wage)}/สัปดาห์</p><p class="mu">${p.agent?'มีเอเยนต์ดูแล':'ไม่มีเอเยนต์'}${p.wantOut?' · ยื่นขอย้ายแล้ว':''}</p><button class="btn o" id="offers">🔎 ดูข้อเสนอย้ายทีม</button></div>
  <div class="card"><h2>เป้าหมาย</h2><p>🏆 เล่นลีกสูงสุดของยุโรป · 🇹🇭 ติดทีมชาติไทย (OVR 66+) · 💰 เศรษฐีลูกหนัง</p></div><button class="btn s" id="reset">🗑️ เริ่มอาชีพใหม่</button>`;
 $('#app').innerHTML=h;
 $('#play')&&($('#play').onclick=playMatch);$('#wait')&&($('#wait').onclick=()=>{if(S.news.length)S.abs++;offers(true,S.news.length?null:S.startC)});
 document.querySelectorAll('[data-tr]').forEach(b=>b.onclick=()=>train(b.dataset.tr));
 $('#offers')&&($('#offers').onclick=()=>offers(false));$('#reset')&&($('#reset').onclick=()=>{if(confirm('ลบเซฟแล้วเริ่มใหม่?')){localStorage.removeItem('fl_save3');S=null;render()}});
 $('#nd')&&($('#nd').onclick=()=>advance());$('#sk')&&($('#sk').onclick=skipToMatch);
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
 if(due>=0){ev=EVM[S.chains[due].id];S.chains.splice(due,1)}else if(!summer&&chance(.3))ev=pick(EV.filter(e=>e.off&&(!e.c||e.c())));
 if(ev){showEvent(ev,null,()=>{closeM();save();render()});return true}return false}
function dailyEvent(){maybeDaily()}
function train(k){const p=S.p;CONS=[];const ks=Object.keys(AT);
 if(k==='heavy'){E(pick(ks),rnd(1,2));E(pick(ks),1);E('stamina',-18);if(chance(.08)){p.inj=1;CONS.push('🚑 เจ็บจากการซ้อม 1 นัด')}}
 if(k==='skill'){const best=Object.entries(W[p.pos]).sort((a,b)=>b[1]-a[1])[0][0];E(best,rnd(1,2));E('stamina',-10)}
 if(k==='tactic'){E('trust',rnd(3,6));E('stamina',-4)}
 if(k==='rest'){E('stamina',25);E('morale',4)}
 p.trainDay=dkey(now());save();sheet(`<span class="tag g">ซ้อม</span><h2>ผลการซ้อม</h2><ul class="cons">${CONS.map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" onclick="closeM();render()">ตกลง</button>`)}
function sheet(h){$('#modal').innerHTML=`<div class="sheet">${h}</div>`;$('#modal').classList.add('show')}
function closeM(){$('#modal').classList.remove('show')}
// ===== PITCH =====
function pitch(M,focus){const W2=300,H2=190;let s=`<svg viewBox="0 0 ${W2} ${H2}" class="pitch"><rect width="${W2}" height="${H2}" rx="10" fill="#123d22"/>${[0,1,2,3,4,5].map(i=>i%2?`<rect x="${i*50}" width="50" height="${H2}" fill="#15452a"/>`:'').join('')}
 <g stroke="#ffffff55" fill="none" stroke-width="1.5"><rect x="6" y="6" width="${W2-12}" height="${H2-12}" rx="4"/><line x1="150" y1="6" x2="150" y2="${H2-6}"/><circle cx="150" cy="95" r="24"/><rect x="6" y="50" width="40" height="90"/><rect x="${W2-46}" y="50" width="40" height="90"/><rect x="${W2-8}" y="80" width="4" height="30" fill="#fff"/><rect x="4" y="80" width="4" height="30" fill="#fff"/></g>`;
 const att=focus==='def'?0.25:focus==='atk'?0.78:.3+R()*.4;const bx=W2*att,by=40+R()*110;
 for(let i=0;i<6;i++)s+=`<circle cx="${cl(bx+rnd(-90,60),15,285)}" cy="${rnd(20,170)}" r="5" fill="#3ddc6a"/>`;
 for(let i=0;i<6;i++)s+=`<circle cx="${cl(bx+rnd(-50,90),15,285)}" cy="${rnd(20,170)}" r="5" fill="#e8e8e8"/>`;
 s+=`<circle cx="${bx}" cy="${by}" r="7.5" fill="#ff7a1a" stroke="#fff" stroke-width="2"/><text x="${bx}" y="${by-11}" fill="#fff" font-size="10" text-anchor="middle" font-family="Kanit">คุณ</text><circle cx="${bx+9}" cy="${by+5}" r="3" fill="#ffd21f"/></svg>`;return s}
// ===== EVENT UI =====
const ATS={pac:'ความเร็ว',sho:'ยิง',pas:'ผ่าน',dri:'เลี้ยง',def:'รับ',phy:'ร่างกาย'};
const pct=o=>cl(Math.round(o.b+S.p.a[o.at]*o.k-(S.p.stamina<40?8:0)+(S.p.morale-60)/8),5,95);
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
 if(p.benched||(p.trust<25&&chance(.6))){p.benched=0;base.played=false;return finish(nx,base,'🪑 โค้ชไม่ส่งคุณลงสนาม นั่งปั้นหน้าบนม้านั่งสำรอง')}
 const M=base,c=club();const d=c.s+(ovr()-c.s)*.2+(p.morale-50)/25+(nx.home?2:0)-nx.opp.s;M.lf=cl(1.0+d*.05,.2,3);M.la=cl(1.2-d*.05,.2,3);
 const fms=EV.filter(e=>e.fm&&e.id!=='pen'&&e.c()).sort(()=>R()-.5).slice(0,rnd(4,6));
 const dr=EV.filter(e=>e.m&&!e.fm&&!e.ht&&!['redReact','subOff','celebrate','refWarn'].includes(e.id)).sort(()=>R()-.5).slice(0,2);
 const ids=[...fms,...dr].map(e=>e.id);if(chance(.06))ids.push('pen');
 if(chance(.15+(60-p.trust)/150+(60-p.stamina)/200))ids.push('subOff');
 const used=new Set();M.sched=ids.map(id=>{let m;do{m=id==='subOff'?rnd(56,75):rnd(4,88)}while(used.has(m)||m===45);used.add(m);return{m,id}}).sort((a,b)=>a.m-b.m);
 M.ht=pick(EV.filter(e=>e.ht)).id;M.st1=rnd(1,4);M.st2=rnd(2,6);M.half=1;M.ext=0;M.home=nx.home;
 tk(M,`🗓️ ${c.n} พบ ${M.opp} — คุณลงเป็นตัวจริง!`);LIVE={M,nx,speed:1,timer:null,paused:true};closeM();
 drawLive();sheet(`<span class="tag o">KICK-OFF</span><div class="score"><div><b>${nx.home?c.n:M.opp}</b></div><div class="big or">VS</div><div><b>${nx.home?M.opp:c.n}</b></div></div><p class="mu">สตามิน่า ${Math.round(p.stamina)} · ขวัญ ${Math.round(p.morale)} · เกมจะหยุดทุกจังหวะสำคัญให้คุณตัดสินใจ</p><button class="btn" id="ko">▶ เริ่มเกม</button>`);$('#ko').onclick=()=>{closeM();resume()}}
function loop(){clearInterval(LIVE.timer);LIVE.timer=setInterval(()=>{if(LIVE&&!LIVE.paused)adv()},650/LIVE.speed)}
function resume(){closeM();if(!LIVE)return;LIVE.paused=false;drawLive();loop()}
function adv(){const M=LIVE.M;
 if(M.half===1){if(M.min<45)M.min++;else if(M.ext<M.st1){if(!M.ext)tk(M,`🟨 ป้ายทดเวลา +${M.st1}`);M.ext++}else return halftime()}
 else{if(M.min<90)M.min++;else if(M.ext<M.st2){if(!M.ext)tk(M,`🟨 ป้ายทดเวลา +${M.st2}`);M.ext++}else return fulltime()}
 const off=M.sub||M.redDone,lf=M.lf*(M.redDone?.6:1)*(M.half===2?1+M.boost*.08:1)*.75,la=M.la*(M.redDone?1.5:1);
 if(chance(lf/92)){M.gf++;const w=pick(TM);tk(M,`⚽ ประตู! ${club().n} — ${w}`);M.tl.push({m:clock(M),t:`⚽ ${w} (เพื่อนร่วมทีม)`});if(!off)M.r+=.1}
 else if(chance(la/92)){M.ga++;tk(M,`⚽ ${M.opp} ยิงได้`);M.tl.push({m:clock(M),t:`🥅 ${M.opp} ยิง`});if(!off)M.r-=.1}
 else if(chance(.13))tk(M,pick(COMM));
 if(!off&&!M.ext&&M.sched.length&&M.sched[0].m<=M.min){const s=M.sched.shift();return moment(s.id)}
 drawLive()}
function moment(id){const M=LIVE.M;const e=EVM[id];if(e.c&&!e.fm&&!e.c(M)&&!['pen','celebrate','refWarn'].includes(id))return drawLive();
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
function drawLive(){const L=LIVE,M=L.M,c=club();$('#tabs').innerHTML='';const hn=M.home?c.n:M.opp,an=M.home?M.opp:c.n,hs=M.home?M.gf:M.ga,as=M.home?M.ga:M.gf;
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
 if(M.played){p.app++;p.stamina=cl(p.stamina-rnd(15,25));M.r+=(gf-ga)*.15;if(M.r>7.5)E('fans',0.03);p.ta+=M.as;if(M.r>6.8&&chance(.6)){const k=pick(Object.keys(AT));p.a[k]=cl(p.a[k]+1,20,99)}}
 else if(!M.missed){p.stamina=cl(p.stamina+10);if(p.ban)p.ban--;else if(p.inj)p.inj--}
 const [h,a]=nx.m;rec(h,a,nx.home?gf:ga,nx.home?ga:gf);
 S.fix[S.week].forEach(([x,y])=>{if(x===S.club.i||y===S.club.i)return;const cs=tierOf(S.club.c,S.club.t).clubs;rec(x,y,pois(1.3+(cs[x].s-cs[y].s)*.05+.15),pois(1.2-(cs[x].s-cs[y].s)*.05))});
 const res=gf>ga?'ชนะ':gf<ga?'แพ้':'เสมอ';S.log[S.week]=`${gf}-${ga}`;p.morale=cl(p.morale+(gf>ga?5:gf<ga?-5:0));
 const rating=(M.played||M.missed)?cl(M.r,3,10).toFixed(1):'-';
 news(`${res==='ชนะ'?'✅':res==='แพ้'?'❌':'➖'} ${c.n} ${gf}-${ga} ${M.opp}${M.played?` · ${p.name} เรตติ้ง ${rating}${M.g?` ⚽x${M.g}`:''}${M.as?` 🅰️x${M.as}`:''}`:M.missed?` · ขาดนัด เรตติ้ง ${rating}`:' (ไม่ได้ลงเล่น)'}`);
 const wg=p.wage;p.money+=wg;S.week++;S.abs++;save();if(quiet)return;
 sheet(`<span class="tag ${res==='ชนะ'?'g':res==='แพ้'?'':'o'}">จบเกม · ${res}</span><div class="score"><div><b>${c.n}</b></div><div class="big">${gf} - ${ga}</div><div><b>${M.opp}</b></div></div>
  ${msg?`<p>${msg}</p>`:''}${M.played?`<div class="grid2"><div class="mini"><span class="mu">เรตติ้ง</span><b class="or">${rating}</b></div><div class="mini"><span class="mu">ประตู/แอสซิสต์</span><b>${M.g} / ${M.as}</b></div></div>`:''}
  ${M.tl&&M.tl.length?`<h2>ไทม์ไลน์</h2><div class="tl">${M.tl.map(x=>`<div><b>${x.m}</b><span>${x.t}</span></div>`).join('')}</div>`:''}
  <p class="mu" style="margin-top:8px">💰 ค่าเหนื่อย +฿${fmt(wg)}</p><button class="btn" id="nx">ต่อไป ›</button>`);
 $('#nx').onclick=()=>{if(p.terminate){p.terminate=0;news(`📄 ${c.n} ประกาศยกเลิกสัญญา ${p.name}`);S.club=null;p.wage=0;closeM();save();render();return sheet(`<span class="tag">สัญญาถูกยกเลิก</span><div class="ev">${c.n} ฉีกสัญญาคุณ! ตอนนี้คุณเป็นนักเตะไร้สังกัด</div><button class="btn" onclick="closeM();render()">เข้าใจแล้ว</button>`)}
  if(S.week>=S.N)return endSeason();postMatch()}}
function postMatch(){const due=S.chains.findIndex(c=>c.at<=S.abs);let ev=null;if(due>=0){ev=EVM[S.chains[due].id];S.chains.splice(due,1)}
 const after=()=>{closeM();if(S.club&&(S.p.wantOut||S.p.bonusOffer||(S.p.agent&&chance(.15))||chance(.05))){S.p.bonusOffer=0;return offers(true)}save();TAB='home';render()};
 if(ev)showEvent(ev,null,after);else after()}
function endSeason(){if(!S.club){S.season++;S.p.age++;newSeason(S.ko[S.N-1]+DAY);save();return}
 const st=sorted(),pos=st.findIndex(r=>r.i===S.club.i)+1,c=S.club,T=S.world[c.c],me=club();let msg=`จบฤดูกาล ${S.slabel}: ${me.n} จบอันดับ ${pos}`;
 if(pos<=2&&c.t>0){const up=T[c.t-1].clubs;const wi=up.reduce((m,x,k)=>x.s<up[m].s?k:m,0);const down=up[wi];up[wi]=me;T[c.t].clubs[c.i]=down;S.club={c:c.c,t:c.t-1,i:wi};msg+=' 🎉 เลื่อนชั้น!';S.p.wage=Math.max(S.p.wage,wage(c.c,c.t-1));S.p.fans*=1.3}
 else if(pos>=7&&c.t<T.length-1){const dn=T[c.t+1].clubs;const bi=dn.reduce((m,x,k)=>x.s>dn[m].s?k:m,0);const upc=dn[bi];dn[bi]=me;T[c.t].clubs[c.i]=upc;S.club={c:c.c,t:c.t+1,i:bi};msg+=' 😢 ตกชั้น';}
 if(pos===1)msg+=' 🏆 แชมป์ลีก!';news(msg+` · ${S.p.name} ${S.p.sg} ประตู ${S.p.sa} แอสซิสต์`);
 S.season++;S.p.age++;S.p.contract--;if(S.p.age>30)for(const k in S.p.a)S.p.a[k]=cl(S.p.a[k]-rnd(0,2),20,99);
 else if(S.p.age<25)for(const k in S.p.a)S.p.a[k]=cl(S.p.a[k]+rnd(0,2),20,99);
 S.p.stamina=95;S.p.morale=cl(S.p.morale+5);newSeason(S.ko[S.N-1]+DAY);
 if(S.p.contract<=0){S.p.contract=rnd(1,3);S.p.wage=Math.round(S.p.wage*(1+(ovr()-60)/100));msg+=` · ต่อสัญญาอัตโนมัติ ฿${fmt(S.p.wage)}/สัปดาห์`}
 msg+=`<br><span class="mu">ฤดูกาลใหม่ ${S.slabel} เริ่ม ${fdt(S.ko[0])}</span>`;
 save();sheet(`<span class="tag g">สรุปฤดูกาล</span><div class="ev">${msg}</div><button class="btn" id="nx">ตลาดซื้อขายช่วงซัมเมอร์ ›</button>`);$('#nx').onclick=()=>offers(true)}
window.closeM=closeM;window.render=render;
load();if(S&&!S.ko)S=null;if(S&&!S.gameT){S.gameT=Math.min(Date.now()+(S.devOff||0),S.ko[Math.min(S.week,S.N-1)]);delete S.dev}render();
