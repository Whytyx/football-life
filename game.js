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
function save(){localStorage.setItem('fl_save',JSON.stringify(S))}
function load(){try{S=JSON.parse(localStorage.getItem('fl_save'))}catch(e){S=null}}
function news(t){S.news.unshift({w:`ฤดูกาล ${S.season} · สัปดาห์ ${S.week+1}`,t});S.news=S.news.slice(0,60)}
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
function goal(M,how){M.g++;M.gf++;M.r+=1.1;S.p.sg++;S.p.tg++;N(`⚽ ประตู! ${how||''}`);E('fans',0.04);E('morale',4)}
function assist(M){M.as++;M.gf++;M.r+=.7;S.p.sa++;N('🅰️ แอสซิสต์!');E('trust',2)}
const sk=k=>S.p.a[k]/100;
// ===== EVENTS =====
// m: match moment, o: off-field. c=condition, x=text, o=options[{l,f}]
const EV=[
{id:'1v1',m:1,c:M=>S.p.pos!=='DF',x:M=>`นาที ${M.min}' ลูกทะลุช่องมาพอดีเท้า! คุณหลุดเดี่ยวกับผู้รักษาประตู ${M.opp}`,o:[
 {l:'⚽ ซัดเองเต็มข้อ',f:M=>{if(chance(.25+sk('sho')*.55))goal(M,'จบสกอร์แบบเย็นชา');else{N('ยิงข้ามคานไปเฉย ๆ แฟนบอลกุมหัว');M.r-=.4;E('morale',-3)}}},
 {l:'🤝 แปะให้เพื่อนยิงประตูว่าง',f:M=>{if(chance(.4+sk('pas')*.45)){assist(M);E('trust',3)}else{N('จ่ายแรงไปหน่อย เพื่อนแตะไม่ทัน');M.r-=.2}}},
 {l:'🤸 ล้มขอจุดโทษ',f:M=>{const p=.25+(100-S.p.ref)/400;if(chance(p+.15)){N('กรรมการชี้จุดโทษ! (รีเพลย์ดูเหมือนแอคติ้ง)');E('ref',-6);M.queue.unshift('pen')}else{N('กรรมการไม่ซื้อ! โดนข้อหาพุ่งล้ม');yellow(M);E('ref',-8);E('fans',-0.02)}}}]},
{id:'pen',m:1,c:()=>false,x:M=>`จุดโทษ! ทั้งสนามเงียบกริบ ลูกอยู่ในมือคุณ`,o:[
 {l:'🎯 ยิงเอง เน้นมุม',f:M=>{if(chance(.55+sk('sho')*.35))goal(M,'จุดโทษเข้ามุมล่าง');else{N('ผู้รักษาประตูเดาถูก! เซฟได้');M.r-=.6;E('morale',-6)}}},
 {l:'🥄 ปาเนนก้า สไตล์เท่',f:M=>{if(chance(.35+sk('sho')*.3)){goal(M,'ปาเนนก้าสุดเท่!!');E('fans',0.08)}else{N('ปาเนนก้าลอยไปให้ประตูรับสบาย ๆ ... โซเชียลถล่มยับ');E('fans',-0.06);E('trust',-8);M.r-=1}}},
 {l:'🤲 ยกให้กัปตันยิง',f:M=>{if(chance(.75)){M.gf++;N('กัปตันยิงเข้า ทีมชมว่าคุณเป็นคนมีน้ำใจ')}else N('กัปตันยิงพลาด... แต่ไม่ใช่ความผิดคุณ');E('trust',4)}}]},
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
{id:'captainHT',m:1,min:[45,45],x:M=>`พักครึ่ง ห้องแต่งตัว กัปตันทีมชี้หน้าคุณ: "แกเล่นเห็นแก่ตัว! ไม่วิ่งกลับมาช่วยเกมรับเลย"`,o:[
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
{id:'lastMan',m:1,c:()=>S.p.pos==='DF'||S.p.pos==='MF',x:M=>`นาที ${M.min}' กองหน้า ${M.opp} หลุดมา คุณคือคนสุดท้าย!`,o:[
 {l:'🛷 สไลด์ตัดเต็มตัว',f:M=>{if(chance(.3+sk('def')*.5)){N('ตัดบอลได้คลีน! ทั้งสนามลุกปรบมือ');M.r+=.6;E('fans',0.02)}else if(chance(.5))red(M,'ทำฟาวล์คนสุดท้าย');else{M.ga++;N('สไลด์วืด... เสียประตู')}}},
 {l:'🟨 ดึงเสื้อ ยอมโดนใบเหลือง',f:M=>{yellow(M);E('trust',2);N('ฟาวล์แท็กติก ตัดเกมรุกได้')}},
 {l:'🏃 วิ่งไล่ประกบ ไม่เสี่ยงฟาวล์',f:M=>{if(chance(.3+sk('pac')*.4))N('ไล่ทันบีบให้ยิงพลาด!');else{M.ga++;N('เขายิงเข้า...');E('trust',-3)}}}]},
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
{id:'longShot',m:1,x:M=>`นาที ${M.min}' บอลกระดอนมาหน้าเท้าคุณ ห่างประตู 30 หลา ไม่มีใครประกบ`,o:[
 {l:'🚀 ปั่นโค้งเข้าก้นหอย!',f:M=>{if(chance(.08+sk('sho')*.25)){goal(M,'ลูกยิงไกลสุดสวย! ประตูแห่งปีชัด ๆ');E('fans',0.1)}else{N('ลอยไปหาแฟนบอลแถวบน');M.r-=.1}}},
 {l:'🎯 เปิดบอลไปเสาสอง',f:M=>{if(chance(.2+sk('pas')*.35))assist(M);else N('กองหลังโหม่งสกัด')}},
 {l:'🔄 เคาะคืนหลังเล่นปลอดภัย',f:M=>{E('trust',1);M.r+=.05}}]},
{id:'invader',m:1,x:M=>`นาที ${M.min}' แฟนบอลวิ่งลงสนามตรงมากอดคุณ! รปภ.กำลังวิ่งตามมา`,o:[
 {l:'🤳 กอดแล้วเซลฟี่',f:M=>{E('fans',0.07);fine(5000);N('คลิปน่ารักไวรัล แต่ลีกเตือนเรื่องความปลอดภัย')}},
 {l:'🙅 ผลักออกอย่างแรง',f:M=>{E('fans',-0.05);N('แฟนล้มกลิ้ง โซเชียลด่ายับ')}},
 {l:'🤝 จับมือแล้วพาไปส่ง รปภ.',f:M=>{E('fans',0.03);E('ref',2)}}]},
{id:'timeWaste',m:1,x:M=>`นาที ${M.min}' นักเตะ ${M.opp} ล้มกลิ้งแกล้งเจ็บถ่วงเวลา ทั้งที่คุณแทบไม่ได้แตะ`,o:[
 {l:'🧍 ดึงแขนเขาลุกขึ้นแรง ๆ',f:M=>{if(chance(.45))yellow(M);else N('เขาลุกขึ้นทันที ปาฏิหาริย์!');E('fans',0.01)}},
 {l:'⚽ เตะบอลอัดใส่ตัวเขา',f:M=>{if(chance(.6))red(M,'กิริยาไม่มีน้ำใจนักกีฬา');else yellow(M);E('ref',-10)}},
 {l:'😑 รอให้กรรมการจัดการ',f:M=>{E('ref',3)}}]},
{id:'cross',m:1,c:()=>S.p.pos!=='DF'||chance(.4),x:M=>`นาที ${M.min}' ลูกเตะมุม! บอลโด่งมาที่เสาแรง คุณกระโดดขึ้นสูงสุด`,o:[
 {l:'🗿 โหม่งกดลงพื้น',f:M=>{if(chance(.12+sk('phy')*.35))goal(M,'ลูกโหม่งสะท้านตาข่าย!');else N('โหม่งตรงมือผู้รักษาประตู')}},
 {l:'🦵 ตีลังกาจักรยานอากาศ!',f:M=>{if(chance(.06+sk('dri')*.15)){goal(M,'จักรยานอากาศ!!! ทั้งโลกต้องดู');E('fans',0.2)}else{N('วืดตกลงมาหลังกระแทกพื้น');E('stamina',-8)}}},
 {l:'↩️ ทำบอลให้เพื่อนเสาสอง',f:M=>{if(chance(.25+sk('pas')*.3))assist(M);else N('เพื่อนยิงไม่ติด')}}]},
{id:'skill',m:1,c:()=>S.p.pos!=='DF',x:M=>`นาที ${M.min}' ทีมนำอยู่ คุณได้บอลริมเส้น มีนักเตะคู่แข่งยืนเผชิญหน้า`,o:[
 {l:'🌈 โชว์ตะไล + ลอดดาก',f:M=>{if(chance(.3+sk('dri')*.4)){N('ลอดดากสวยงาม! คู่แข่งหัวเสียมาก');E('fans',0.06);if(chance(.4))chain('fanConflict',2)}else{N('เสียบอล โค้ชกุมขมับ');E('trust',-4)}}},
 {l:'🕐 เลี้ยงไปมุมธง ถ่วงเวลา',f:M=>{E('trust',3);N('มืออาชีพ แต่แฟนคู่แข่งโห่ไล่')}},
 {l:'🎯 ตัดเข้าในยิงเลย',f:M=>{if(chance(.15+sk('sho')*.3))goal(M,'ตัดเข้ายิงเสาไกล!');else N('ยิงโดนกองหลังบล็อก')}}]},
{id:'freekick',m:1,x:M=>`นาที ${M.min}' ฟรีคิกหน้ากรอบ! คุณกับกัปตันยืนข้างบอลพร้อมกัน`,o:[
 {l:'✋ "ผมยิงเอง!" แย่งบอลมา',f:M=>{E('trust',-3);if(chance(.12+sk('sho')*.35)){goal(M,'ฟรีคิกโค้งข้ามกำแพง!');E('trust',5)}else{N('ชนกำแพง... กัปตันมองค้อน');if(chance(.4))chain('dressingFight',1)}}},
 {l:'🤝 ให้กัปตันยิง',f:M=>{E('trust',2);if(chance(.15)){M.gf++;N('กัปตันยิงเข้า!')}}},
 {l:'🧠 เสนอลูกแท็กติกที่ซ้อมมา',f:M=>{if(chance(.2+sk('pas')*.3))assist(M);else N('แผนล่ม คนดูหัวเราะ');E('trust',1)}}]},
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
const EVM=Object.fromEntries(EV.map(e=>[e.id,e]));
// ===== FIXTURES / TABLE =====
function rr(n){const t=[...Array(n).keys()],rounds=[];for(let r=0;r<n-1;r++){const m=[];for(let i=0;i<n/2;i++){m.push(r%2?[t[n-1-i],t[i]]:[t[i],t[n-1-i]])}rounds.push(m);t.splice(1,0,t.pop())}return rounds.concat(rounds.map(r=>r.map(([a,b])=>[b,a])))}
function newSeason(){S.fix=rr(8);S.table=Array.from({length:8},(_,i)=>({i,p:0,w:0,d:0,l:0,gf:0,ga:0,pts:0}));S.week=0;S.p.sg=0;S.p.sa=0;S.p.app=0;S.p.yc=0;S.p.called=0}
const pois=l=>{let L=Math.exp(-Math.max(.1,l)),k=0,p=1;do{k++;p*=R()}while(p>L);return k-1};
function rec(a,b,ga,gb){const A=S.table[a],B=S.table[b];A.p++;B.p++;A.gf+=ga;A.ga+=gb;B.gf+=gb;B.ga+=ga;if(ga>gb){A.w++;A.pts+=3;B.l++}else if(ga<gb){B.w++;B.pts+=3;A.l++}else{A.d++;B.d++;A.pts++;B.pts++}}
const sorted=()=>[...S.table].sort((x,y)=>y.pts-x.pts||(y.gf-y.ga)-(x.gf-x.ga)||y.gf-x.gf);
// ===== NEW GAME =====
function newGame(name,pos,c){const w=genWorld();const t=LEAGUES[c].tiers.length-1;const i=rnd(4,7);
 const base={pac:50,sho:50,pas:50,dri:50,def:50,phy:50};for(const k in base)base[k]=rnd(44,56)+Math.round(W[pos][k]*25);
 S={world:w,club:{c,t,i},season:1,abs:0,news:[],chains:[],log:[],
  p:{name,pos,age:18,a:base,stamina:90,morale:65,trust:50,ref:55,media:50,fans:300,money:20000,wage:0,contract:2,ban:0,inj:0,yc:0,rc:0,fines:0,tg:0,ta:0,sg:0,sa:0,app:0,caps:0,ig:0,benched:0,agent:0,trained:0}};
 S.p.wage=wage(c,t);newSeason();news(`✍️ ${name} เซ็นสัญญาอาชีพฉบับแรกกับ ${club().n} (${LEAGUES[c].n} · ${tierOf(c,t).n})`);save()}
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
 $('#go').onclick=()=>{const n=$('#nm').value.trim()||'ไบคัง';newGame(n,pos,c);TAB='home';render();betweenWeeks(true)}};
 $('#tabs').innerHTML='';draw()}
function tabs(){const T=[['home','🏠','หน้าหลัก'],['table','🏆','ตาราง'],['me','👤','นักเตะ'],['news','📰','ข่าว'],['career','💼','อาชีพ']];
 $('#tabs').innerHTML=T.map(([k,i,l])=>`<button class="${TAB===k?'on':''}" data-t="${k}"><span>${i}</span>${l}</button>`).join('');
 document.querySelectorAll('[data-t]').forEach(b=>b.onclick=()=>{TAB=b.dataset.t;render()})}
function header(){const c=club(),L=S.club?LEAGUES[S.club.c]:null;return `<div class="card row sp"><div><div class="mu">${c?L.f+' '+tierOf(S.club.c,S.club.t).n:'ไร้สังกัด'}</div><h1>${S.p.name}</h1><div class="mu">${POS[S.p.pos]} · อายุ ${S.p.age} · ${c?c.n:'Free Agent'}</div></div><div class="ovr"><div style="font-size:11px">OVR</div><div class="big" style="font-size:36px">${ovr()}</div></div></div>`}
function render(){if(!S)return setup();tabs();const p=S.p;let h=header();
 if(TAB==='home'){const nx=nextFix();
  h+=nx?`<div class="card"><div class="row sp"><span class="tag o">นัดถัดไป · สัปดาห์ ${S.week+1}/14</span><span class="mu">ฤดูกาล ${S.season}</span></div>
   <div class="score"><div><b>${club().n}</b><div class="mu">${nx.home?'เหย้า':'เยือน'}</div></div><div class="big or">VS</div><div><b>${nx.opp.n}</b><div class="mu">พลังทีม ${nx.opp.s}</div></div></div>
   ${p.ban?`<div class="re">⛔ คุณติดแบน ${p.ban} นัด</div>`:p.inj?`<div class="re">🚑 บาดเจ็บ ${p.inj} นัด</div>`:p.benched?`<div class="ye">🪑 โค้ชอาจไม่ส่งคุณลงสนาม</div>`:''}
   <button class="btn" id="play">⚽ ลงสนาม!</button></div>`:`<div class="card"><h2>ไร้สังกัด</h2><p>คุณไม่มีสโมสร รอข้อเสนอ...</p><button class="btn" id="wait">รอข้อเสนอสัปดาห์นี้</button></div>`;
  h+=`<div class="grid2">${[['สตามิน่า',p.stamina,'gr'],['ขวัญกำลังใจ',p.morale,'gr'],['ความเชื่อใจโค้ช',p.trust,'or'],['กรรมการ',p.ref,'or']].map(([l,v,c])=>`<div class="mini"><span class="mu">${l}</span><b class="${v<30?'re':c}">${v}</b>${bar(v,v<30?'r':c==='or'?'o':'')}</div>`).join('')}
   <div class="mini"><span class="mu">ผู้ติดตาม</span><b>${fmt(p.fans)}</b></div><div class="mini"><span class="mu">เงิน</span><b class="${p.money<0?'re':'ye'}">฿${fmt(p.money)}</b></div></div>`;
  h+=`<h2>การซ้อมสัปดาห์นี้</h2><div class="card">${p.trained?`<p class="gr">✅ ซ้อมแล้วสัปดาห์นี้</p>`:[['heavy','🏋️ ซ้อมหนัก (+ค่าพลัง, -สตามิน่า)'],['skill','🎯 ซ้อมจุดเด่นเฉพาะตำแหน่ง'],['tactic','📋 ประชุมแท็กติก (+ความเชื่อใจโค้ช)'],['rest','🧘 พักฟื้น (+สตามิน่า, +ขวัญ)']].map(([k,l])=>`<button class="btn s" data-tr="${k}">${l}</button>`).join('')}</div>`;
  h+=`<h2>ข่าวล่าสุด</h2><div class="card feed">${S.news.slice(0,4).map(n=>`<div>${n.t}<div class="mu">${n.w}</div></div>`).join('')}</div>`}
 if(TAB==='table'&&S.club){h+=`<div class="card"><h2>${tierOf(S.club.c,S.club.t).n}</h2><table><tr><th>#</th><th>ทีม</th><th>น.</th><th>ช</th><th>ส</th><th>+/-</th><th>แต้ม</th></tr>${sorted().map((r,k)=>`<tr class="${r.i===S.club.i?'me':''}"><td>${k+1}</td><td>${tierOf(S.club.c,S.club.t).clubs[r.i].n}</td><td>${r.p}</td><td>${r.w}</td><td>${r.l}</td><td>${r.gf-r.ga}</td><td><b>${r.pts}</b></td></tr>`).join('')}</table><p class="mu" style="margin-top:8px">อันดับ 1-2 เลื่อนชั้น · 2 อันดับสุดท้ายตกชั้น</p></div>`;
  h+=`<div class="card"><h2>โปรแกรม</h2>${S.fix.map((r,k)=>{const m=r.find(x=>x.includes(S.club.i));const o=m[0]===S.club.i?m[1]:m[0];return `<div class="row sp mu" style="padding:4px 0;${k===S.week?'color:var(--or)':''}"><span>${k+1}. ${m[0]===S.club.i?'🏠':'✈️'} ${tierOf(S.club.c,S.club.t).clubs[o].n}</span><span>${S.log[k]||''}</span></div>`}).join('')}</div>`}
 if(TAB==='me'){h+=`<div class="card"><h2>ค่าพลัง</h2>${Object.entries(AT).map(([k,l])=>`<div class="stat"><span>${l}</span>${bar(p.a[k])}<b>${p.a[k]}</b></div>`).join('')}</div>
  <div class="card"><h2>สถิติ</h2><div class="grid2">${[['ลงเล่นฤดูกาลนี้',p.app],['ประตู/แอสซิสต์',p.sg+' / '+p.sa],['ประตูรวมอาชีพ',p.tg],['ใบเหลือง/แดง',p.yc+' / '+p.rc],['ทีมชาติไทย',p.caps+' นัด '+p.ig+' ประตู'],['ค่าปรับรวม','฿'+fmt(p.fines)],['ภาพลักษณ์สื่อ',p.media],['ค่าเหนื่อย/สัปดาห์','฿'+fmt(p.wage)]].map(([l,v])=>`<div class="mini"><span class="mu">${l}</span><b>${v}</b></div>`).join('')}</div></div>`}
 if(TAB==='news')h+=`<div class="card feed"><h2>ฟีดข่าว</h2>${S.news.map(n=>`<div>${n.t}<div class="mu">${n.w}</div></div>`).join('')}</div>`;
 if(TAB==='career')h+=`<div class="card"><h2>สัญญา</h2><p>${club()?club().n:'-'} · เหลือ ${p.contract} ฤดูกาล · ฿${fmt(p.wage)}/สัปดาห์</p><p class="mu">${p.agent?'มีเอเยนต์ดูแล':'ไม่มีเอเยนต์'}${p.wantOut?' · ยื่นขอย้ายแล้ว':''}</p><button class="btn o" id="offers">🔎 ดูข้อเสนอย้ายทีม</button></div>
  <div class="card"><h2>เป้าหมาย</h2><p>🏆 เล่นลีกสูงสุดของยุโรป · 🇹🇭 ติดทีมชาติไทย (OVR 66+) · 💰 เศรษฐีลูกหนัง</p></div><button class="btn s" id="reset">🗑️ เริ่มอาชีพใหม่</button>`;
 $('#app').innerHTML=h;
 $('#play')&&($('#play').onclick=playMatch);$('#wait')&&($('#wait').onclick=()=>{S.abs++;offers(true)});
 document.querySelectorAll('[data-tr]').forEach(b=>b.onclick=()=>train(b.dataset.tr));
 $('#offers')&&($('#offers').onclick=()=>offers(false));$('#reset')&&($('#reset').onclick=()=>{if(confirm('ลบเซฟแล้วเริ่มใหม่?')){localStorage.removeItem('fl_save');S=null;render()}});window.scrollTo(0,0)}
function train(k){const p=S.p;CONS=[];const ks=Object.keys(AT);
 if(k==='heavy'){E(pick(ks),rnd(1,2));E(pick(ks),1);E('stamina',-18);if(chance(.08)){p.inj=1;CONS.push('🚑 เจ็บจากการซ้อม 1 นัด')}}
 if(k==='skill'){const best=Object.entries(W[p.pos]).sort((a,b)=>b[1]-a[1])[0][0];E(best,rnd(1,2));E('stamina',-10)}
 if(k==='tactic'){E('trust',rnd(3,6));E('stamina',-4)}
 if(k==='rest'){E('stamina',25);E('morale',4)}
 p.trained=1;save();sheet(`<span class="tag g">ซ้อม</span><h2>ผลการซ้อม</h2><ul class="cons">${CONS.map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" onclick="closeM();render()">ตกลง</button>`)}
function sheet(h){$('#modal').innerHTML=`<div class="sheet">${h}</div>`;$('#modal').classList.add('show')}
function closeM(){$('#modal').classList.remove('show')}
function showEvent(ev,M,cb){const tagged=ev.m?`<span class="tag">⚠️ ดราม่าในสนาม</span> ${M?`<span class="mu">${club().n} ${M.gf}-${M.ga} ${M.opp}</span>`:''}`:`<span class="tag o">นอกสนาม</span>`;
 sheet(`${tagged}<div class="ev">${ev.x(M)}</div>${ev.o.map((o,i)=>`<button class="btn s" data-o="${i}">${o.l}</button>`).join('')}`);
 document.querySelectorAll('[data-o]').forEach(b=>b.onclick=()=>{CONS=[];ev.o[+b.dataset.o].f(M);if(!CONS.length)CONS.push('ไม่มีอะไรเปลี่ยนแปลง');save();
  sheet(`<span class="tag g">ผลที่ตามมา</span><div class="ev" style="font-size:15px">คุณเลือก: <b>${ev.o[+b.dataset.o].l}</b></div><ul class="cons">${CONS.map(c=>`<li>${c}</li>`).join('')}</ul><button class="btn" id="nx">ต่อไป ›</button>`);$('#nx').onclick=cb})}
function nextFix(){if(!S.club||S.week>=14)return null;const m=S.fix[S.week].find(x=>x.includes(S.club.i));const home=m[0]===S.club.i;return{m,home,opp:tierOf(S.club.c,S.club.t).clubs[home?m[1]:m[0]]}}
function playMatch(){const nx=nextFix(),p=S.p;const M={opp:nx.opp.n,gf:0,ga:0,g:0,as:0,y:0,red:false,sub:0,r:6.3,queue:[],min:0,played:true};
 if(p.ban||p.inj){M.played=false;return finish(nx,M,p.ban?'⛔ คุณติดแบน นั่งดูอยู่บนอัฒจันทร์':'🚑 คุณบาดเจ็บ พักรักษาตัว')}
 if(p.benched||(p.trust<25&&chance(.6))){p.benched=0;M.played=false;return finish(nx,M,'🪑 โค้ชไม่ส่งคุณลงสนาม นั่งปั้นหน้าบนม้านั่งสำรอง')}
 // pick moments
 const pool=EV.filter(e=>e.m&&e.id!=='pen'&&e.id!=='redReact'&&e.id!=='subOff'&&e.id!=='captainHT'&&e.id!=='celebrate'&&e.id!=='refWarn');
 const ids=[...pool].sort(()=>R()-.5).slice(0,4).map(e=>e.id);
 if(chance(.3))ids.splice(2,0,'captainHT');
 if(chance(.25+(60-p.trust)/150+(60-p.stamina)/200))ids.splice(rnd(2,ids.length),0,'subOff');
 M.queue=ids;let mins=[...Array(M.queue.length)].map(()=>rnd(5,88)).sort((a,b)=>a-b);M.mins=mins;
 const step=()=>{if(M.red){M.red=false;M.redDone=1;M.queue=[];return showEvent(EVM.redReact,M,()=>finish(nx,M))}
  if(M.sub||M.redDone||!M.queue.length)return finish(nx,M);
  let id=M.queue.shift();const ev=EVM[id];
  if(M.g>0&&!M.cel&&chance(.7)){M.cel=1;M.queue.unshift(id);id='celebrate'}
  else if(M.y&&!M.warned&&chance(.35)){M.warned=1;M.queue.unshift(id);id='refWarn'}
  const e=EVM[id];if(e.c&&!e.c(M)&&!['celebrate','refWarn','pen'].includes(id))return step();
  M.min=id==='captainHT'?45:id==='subOff'?Math.max(M.min+1,rnd(50,65)):Math.max(M.min+rnd(4,20),M.mins.shift()||M.min+5);if(M.min>90)M.min=90;
  showEvent(e,M,step)};
 sheet(`<span class="tag o">KICK-OFF</span><div class="score"><div><b>${club().n}</b></div><div class="big or">VS</div><div><b>${M.opp}</b></div></div><p class="mu">สตามิน่า ${p.stamina} · ขวัญ ${p.morale} · การตัดสินใจของคุณจะเปลี่ยนเกม!</p><button class="btn" id="ko">เริ่มเกม</button>`);$('#ko').onclick=step}
function finish(nx,M,msg){const p=S.p,c=club();const my=c.s+(M.played?(ovr()-c.s)*.2+(p.morale-50)/25:0)+(nx.home?2:0),op=nx.opp.s;const d=my-op;
 let gf=pois(1.25+d*.06)+M.gf-(M.played?Math.round(M.gf*.3):0),ga=pois(1.2-d*.06)+M.ga+(M.redDone&&chance(.5)?1:0);gf=Math.max(gf,M.gf);
 if(M.played){p.app++;p.stamina=cl(p.stamina-rnd(12,20));M.r+=(gf-ga)*.25-(M.sub?.3:0);if(M.r>7.5){E('fans',0.03)}p.ta+=M.as;
  const g=Math.round((M.r-6.5)*1.5+rnd(0,1));if(g>0){const k=pick(Object.keys(AT));p.a[k]=cl(p.a[k]+(chance(.5)?1:0),20,99)}}
 else{p.stamina=cl(p.stamina+15);if(p.ban)p.ban--;else if(p.inj)p.inj--;}
 const [h,a]=nx.m;rec(h,a,nx.home?gf:ga,nx.home?ga:gf);
 S.fix[S.week].forEach(([x,y])=>{if(x===S.club.i||y===S.club.i)return;const cs=tierOf(S.club.c,S.club.t).clubs;rec(x,y,pois(1.3+(cs[x].s-cs[y].s)*.05+.15),pois(1.2-(cs[x].s-cs[y].s)*.05))});
 const res=gf>ga?'ชนะ':gf<ga?'แพ้':'เสมอ';S.log[S.week]=`${gf}-${ga}`;p.morale=cl(p.morale+(gf>ga?5:gf<ga?-5:0));
 const rating=M.played?cl(M.r,3,10).toFixed(1):'-';
 news(`${res==='ชนะ'?'✅':res==='แพ้'?'❌':'➖'} ${c.n} ${gf}-${ga} ${M.opp}${M.played?` · ${p.name} เรตติ้ง ${rating}${M.g?` ⚽x${M.g}`:''}${M.as?` 🅰️x${M.as}`:''}`:' (ไม่ได้ลงเล่น)'}`);
 const wg=p.wage;p.money+=wg;S.week++;S.abs++;p.trained=0;
 sheet(`<span class="tag ${res==='ชนะ'?'g':res==='แพ้'?'':'o'}">จบเกม · ${res}</span><div class="score"><div><b>${c.n}</b></div><div class="big">${gf} - ${ga}</div><div><b>${M.opp}</b></div></div>
  ${msg?`<p>${msg}</p>`:''}${M.played?`<div class="grid2"><div class="mini"><span class="mu">เรตติ้ง</span><b class="or">${rating}</b></div><div class="mini"><span class="mu">ประตู/แอสซิสต์</span><b>${M.g} / ${M.as}</b></div></div>`:''}
  <p class="mu" style="margin-top:8px">💰 ค่าเหนื่อย +฿${fmt(wg)}</p><button class="btn" id="nx">ต่อไป ›</button>`);
 $('#nx').onclick=()=>{if(p.terminate){p.terminate=0;news(`📄 ${c.n} ประกาศยกเลิกสัญญา ${p.name}`);S.club=null;p.wage=0;closeM();save();render();return sheet(`<span class="tag">สัญญาถูกยกเลิก</span><div class="ev">${c.n} ฉีกสัญญาคุณ! ตอนนี้คุณเป็นนักเตะไร้สังกัด</div><button class="btn" onclick="closeM();render()">เข้าใจแล้ว</button>`)}
  if(S.week>=14)return endSeason();betweenWeeks()};save()}
function betweenWeeks(first){const due=S.chains.findIndex(c=>c.at<=S.abs);let ev=null;
 if(due>=0){ev=EVM[S.chains[due].id];S.chains.splice(due,1)}
 else if(!first&&chance(.7)){const pool=EV.filter(e=>e.off&&(!e.c||e.c()));ev=pick(pool)}
 const after=()=>{closeM();if(S.club&&(S.p.wantOut||S.p.bonusOffer||(S.p.agent&&chance(.15))||chance(.05))&&!first){S.p.bonusOffer=0;return offers(true)}save();render()};
 if(ev)showEvent(ev,null,after);else after()}
function genOffers(){const o=ovr(),res=[];const all=[];for(const c in S.world)S.world[c].forEach((t,ti)=>all.push({c,ti,t}));
 const fit=all.filter(x=>x.t.str<=o+8+(S.p.fans>50000?3:0)&&x.t.str>=o-14&&!(S.club&&x.c===S.club.c&&x.ti===S.club.t&&!S.p.wantOut));
 const n=S.p.agent?3:2;for(let k=0;k<n&&fit.length;k++){const x=pick(fit);const i=rnd(0,7);if(S.club&&x.c===S.club.c&&x.ti===S.club.t&&i===S.club.i)continue;
  res.push({c:x.c,t:x.ti,i,wage:Math.round(wage(x.c,x.ti)*(.8+R()*.6)*(1+ovr()/300)),yrs:rnd(1,4)})}return res}
function offers(auto){const list=genOffers();
 if(!list.length){if(auto){closeM();save();return render()}return sheet(`<h2>ข้อเสนอ</h2><p>ยังไม่มีสโมสรสนใจ พัฒนาฝีเท้าก่อนนะ</p><button class="btn" onclick="closeM()">ปิด</button>`)}
 sheet(`<span class="tag o">ตลาดซื้อขาย</span><h2>ข้อเสนอย้ายทีม</h2>${list.map((o,k)=>{const t=tierOf(o.c,o.t),L=LEAGUES[o.c];return `<button class="btn s" data-of="${k}"><b>${t.clubs[o.i].n}</b><br><span class="mu">${L.f} ${L.n} · ${t.n} · ฿${fmt(o.wage)}/สัปดาห์ · ${o.yrs} ปี</span></button>`}).join('')}<button class="btn" id="stay">${S.club?'อยู่ทีมเดิม':'ปิด'}</button>`);
 document.querySelectorAll('[data-of]').forEach(b=>b.onclick=()=>{const o=list[+b.dataset.of];const old=club();S.club={c:o.c,t:o.t,i:o.i};S.p.wage=o.wage;S.p.contract=o.yrs;S.p.trust=50;S.p.wantOut=0;S.p.benched=0;S.p.trained=0;
  news(`✈️ ย้ายทีม! ${S.p.name} ${old?'จาก '+old.n:''} สู่ ${club().n} (${LEAGUES[o.c].n})`);newSeasonKeep();save();closeM();render()});
 $('#stay').onclick=()=>{closeM();save();render()}}
function newSeasonKeep(){const sg=S.p.sg,sa=S.p.sa,app=S.p.app,yc=S.p.yc,w=S.week;newSeason();S.log=[];S.p.sg=sg;S.p.sa=sa;S.p.app=app;S.p.yc=yc;
 // simulate already-played weeks in new league
 for(let k=0;k<w&&k<14;k++){S.fix[k].forEach(([x,y])=>rec(x,y,pois(1.3),pois(1.2)));S.log[k]='—'}S.week=Math.min(w,13)}
function endSeason(){const st=sorted(),pos=st.findIndex(r=>r.i===S.club.i)+1,c=S.club,T=S.world[c.c],me=club();let msg=`จบฤดูกาล ${S.season}: ${me.n} จบอันดับ ${pos}`;
 if(pos<=2&&c.t>0){const up=T[c.t-1].clubs;const wi=up.reduce((m,x,k)=>x.s<up[m].s?k:m,0);const down=up[wi];up[wi]=me;T[c.t].clubs[c.i]=down;S.club={c:c.c,t:c.t-1,i:wi};msg+=' 🎉 เลื่อนชั้น!';S.p.wage=Math.max(S.p.wage,wage(c.c,c.t-1));S.p.fans*=1.3}
 else if(pos>=7&&c.t<T.length-1){const dn=T[c.t+1].clubs;const bi=dn.reduce((m,x,k)=>x.s>dn[m].s?k:m,0);const upc=dn[bi];dn[bi]=me;T[c.t].clubs[c.i]=upc;S.club={c:c.c,t:c.t+1,i:bi};msg+=' 😢 ตกชั้น';}
 if(pos===1)msg+=' 🏆 แชมป์ลีก!';news(msg+` · ${S.p.name} ${S.p.sg} ประตู ${S.p.sa} แอสซิสต์`);
 S.season++;S.p.age++;S.p.contract--;if(S.p.age>30)for(const k in S.p.a)S.p.a[k]=cl(S.p.a[k]-rnd(0,2),20,99);
 else if(S.p.age<25)for(const k in S.p.a)S.p.a[k]=cl(S.p.a[k]+rnd(0,2),20,99);
 S.p.stamina=95;S.p.morale=cl(S.p.morale+5);newSeason();S.log=[];
 if(S.p.contract<=0){S.p.contract=rnd(1,3);S.p.wage=Math.round(S.p.wage*(1+(ovr()-60)/100));msg+=` · ต่อสัญญาอัตโนมัติ ฿${fmt(S.p.wage)}/สัปดาห์`}
 save();sheet(`<span class="tag g">สรุปฤดูกาล</span><div class="ev">${msg}</div><button class="btn" id="nx">ตลาดซื้อขายช่วงซัมเมอร์ ›</button>`);$('#nx').onclick=()=>offers(true)}
window.closeM=closeM;window.render=render;
load();render();
