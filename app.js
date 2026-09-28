/* ProCollege SPA — Supabase when configured, otherwise fully working demo data. */
'use strict';
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const uid=()=>crypto.randomUUID?.()||'id'+Date.now()+Math.random().toString(16).slice(2);
const ico=(n,c='h-4 w-4')=>`<i data-lucide="${n}" class="${c}"></i>`;
const pad=n=>String(n).padStart(2,'0'), iso=d=>`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`, today=()=>iso(new Date());
const DAYS=['Пн','Вт','Ср','Чт','Пт','Сб','Вс'], FULL=['Понедельник','Вторник','Среда','Четверг','Пятница','Суббота','Воскресенье'];
const ATT={PRESENT:'Присутствует',ABSENT:'Отсутствует',EXCUSED:'Уважительная'};

/* ---------- Grade scale: 0–100 pts → 2–5 ---------- */
const G=p=>p>=90?{n:5,t:'Отлично',c:'bg-emerald-100 text-emerald-800 border-emerald-200'}
  :p>=70?{n:4,t:'Хорошо',c:'bg-blue-100 text-blue-800 border-blue-200'}
  :p>=50?{n:3,t:'Удовлетворительно',c:'bg-amber-100 text-amber-800 border-amber-200'}
  :{n:2,t:'Неудовлетворительно',c:'bg-red-100 text-red-800 border-red-200'};
const gb=(p,showPts=true)=>p==null?'<span class="text-slate-300">—</span>':`<span class="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold ${G(p).c}">${G(p).n}${showPts?`<span class="font-medium opacity-70">· ${Math.round(p)}</span>`:''}</span>`;
const pill=(t,c='slate')=>`<span class="inline-flex whitespace-nowrap rounded-full bg-${c}-100 px-2.5 py-0.5 text-xs font-semibold text-${c}-700">${esc(t)}</span>`;

/* ---------- Data ---------- */
const demo={
 groups:[{id:'g1',name:'ПО-21'},{id:'g2',name:'ИС-32'},{id:'g3',name:'ДЗ-14'}],
 users:[
  {id:'t1',group_id:'g1',fio:'Алексей Волков',role:'TEACHER',status:'ACTIVE',email:'a.volkov@college.ru'},
  {id:'t2',group_id:'g2',fio:'Елена Миронова',role:'TEACHER',status:'ACTIVE',email:'e.mironova@college.ru'},
  {id:'a',group_id:'g1',fio:'Алина Иванова',role:'STUDENT',status:'ACTIVE',pin:'1111',email:'a.ivanova@college.ru'},
  {id:'b',group_id:'g1',fio:'Данил Петров',role:'STUDENT',status:'PENDING',email:'d.petrov@college.ru'},
  {id:'c',group_id:'g1',fio:'Мария Садыкова',role:'STUDENT',status:'PENDING',email:'m.sadykova@college.ru'},
  {id:'d',group_id:'g2',fio:'Тимур Орлов',role:'STUDENT',status:'ACTIVE',pin:'1111',email:'t.orlov@college.ru'},
  {id:'admin',fio:'Ирина Белова',role:'ADMIN',status:'ACTIVE',pin:'0000',email:'admin@college.ru'}],
 subjects:[
  {id:'s1',group_id:'g1',teacher_id:'t1',name:'Основы программирования',day_of_week:1,start_time:'09:00',end_time:'10:25',room:'Ауд. 204'},
  {id:'s2',group_id:'g1',teacher_id:'t2',name:'Математика',day_of_week:2,start_time:'10:40',end_time:'12:05',room:'Ауд. 310'},
  {id:'s3',group_id:'g1',teacher_id:'t1',name:'Прикладная графика',day_of_week:3,start_time:'12:20',end_time:'13:45',room:'Лаб. 12'},
  {id:'s4',group_id:'g1',teacher_id:'t1',name:'Базы данных',day_of_week:4,start_time:'09:00',end_time:'10:25',room:'Лаб. 8'},
  {id:'s5',group_id:'g2',teacher_id:'t2',name:'Информационные системы',day_of_week:1,start_time:'09:00',end_time:'10:25',room:'Ауд. 118'}],
 grades:[{id:'r1',student_id:'a',subject_id:'s1',score:92},{id:'r2',student_id:'a',subject_id:'s2',score:86},{id:'r3',student_id:'a',subject_id:'s3',score:78},{id:'r4',student_id:'b',subject_id:'s1',score:74},{id:'r5',student_id:'c',subject_id:'s2',score:98},{id:'r6',student_id:'c',subject_id:'s1',score:45}],
 attendance:[{id:'v1',student_id:'a',subject_id:'s1',date:'2026-09-21',status:'PRESENT'},{id:'v2',student_id:'a',subject_id:'s2',date:'2026-09-22',status:'ABSENT'},{id:'v3',student_id:'b',subject_id:'s1',date:'2026-09-21',status:'PRESENT'},{id:'v4',student_id:'c',subject_id:'s1',date:'2026-09-21',status:'ABSENT'}],
 assignments:[{id:'a1',subject_id:'s1',title:'Лабораторная №4: массивы',due:'2026-10-02',description:'Реализуйте основные операции с массивами.'},{id:'a2',subject_id:'s3',title:'Макет мобильного интерфейса',due:'2026-10-05',description:'Подготовьте адаптивный прототип.'},{id:'a3',subject_id:'s2',title:'Системы уравнений',due:'2026-09-24',description:'Решите задания из практикума.'}],
 submissions:[{id:'sub1',assignment_id:'a3',student_id:'a',status:'SUBMITTED',submitted_at:'2026-09-23T10:00:00.000Z',file_name:'решение.pdf',comment:'Работа готова'},{id:'sub2',assignment_id:'a1',student_id:'c',status:'SUBMITTED',submitted_at:'2026-09-27T10:00:00.000Z',file_name:'lab4.zip',comment:''}],
 practice:[{id:'p1',student_id:'a',date:'2026-09-25',text:'Настроила рабочее окружение.',verified:true},{id:'p2',student_id:'a',date:'2026-09-26',text:'Изучила структуру проекта.',verified:false}],
 messages:[{id:'m1',author:'Алексей Волков',text:'Завтра первая пара проходит в лаборатории №8.',time:'09:18'},{id:'m2',author:'Учебная часть',text:'Расписание на октябрь опубликовано.',time:'Вчера'}]
};
const S={d:structuredClone(demo),user:null,mode:'student',page:'Главная',day:new Date().getDay()||7,gid:null,lg:'g1',modal:null};
const TABLES=['groups','users','subjects','grades','attendance','assignments','submissions','practice','messages'];
const sb=()=>window.pairaSupabase&&window.SUPABASE_URL&&!String(window.SUPABASE_URL).includes('YOUR_PROJECT')&&location.protocol!=='file:'?window.pairaSupabase:null;

async function load(){try{const c=sb();if(!c)throw 0;const r=await Promise.all(TABLES.map(t=>c.from(t).select('*')));if(r.some(x=>x.error))throw 0;TABLES.forEach((t,i)=>S.d[t]=r[i].data||[])}catch{S.d=structuredClone(demo)}}
async function add(t,row){const c=sb();if(c){const r=await c.from(t).insert(row).select().single();if(!r.error)return r.data;toast('Сервер недоступен: '+r.error.message,true)}const x={...row,id:uid()};return x}
async function patch(t,key,row){const c=sb();if(c){const r=await c.from(t).update(row).eq('id',key);if(r.error)toast(r.error.message,true)}}
async function del(t,key){const c=sb();if(c){const r=await c.from(t).delete().eq('id',key);if(r.error)toast(r.error.message,true)}}
async function upsert(t,id,row){const list=S.d[t],o=list.find(x=>x.id===id);if(o){Object.assign(o,row);await patch(t,id,row);return o}const n=await add(t,row);list.push(n);return n}
async function remove(t,id){await del(t,id);S.d[t]=S.d[t].filter(x=>x.id!==id)}

/* ---------- Selectors ---------- */
const U=()=>S.user, name=(t,id)=>S.d[t].find(x=>x.id===id)?.name||S.d[t].find(x=>x.id===id)?.fio||'—';
const gStuds=g=>S.d.users.filter(u=>u.role==='STUDENT'&&u.group_id===g);
const gSubs=g=>S.d.subjects.filter(s=>s.group_id===g);
const tGroups=()=>{const ids=new Set(S.d.subjects.filter(s=>s.teacher_id===U().id).map(s=>s.group_id));if(U().group_id)ids.add(U().group_id);return S.d.groups.filter(g=>ids.has(g.id))};
const curG=()=>tGroups().find(g=>g.id===S.gid)||tGroups()[0];
const tSubs=g=>{const own=gSubs(g).filter(s=>s.teacher_id===U().id);return own.length?own:gSubs(g)};
const uniqSubs=g=>{const m=new Map();gSubs(g).forEach(s=>m.has(s.name)||m.set(s.name,s));return [...m.values()]};
const avgPts=(sIds,subId)=>{const x=S.d.grades.filter(g=>sIds.includes(g.student_id)&&(!subId||g.subject_id===subId));return x.length?x.reduce((a,g)=>a+Number(g.score),0)/x.length:null};
const avgGrade=sIds=>{const x=S.d.grades.filter(g=>sIds.includes(g.student_id));return x.length?(x.reduce((a,g)=>a+G(g.score).n,0)/x.length).toFixed(1):null};
const attPct=(sIds,subId)=>{const a=S.d.attendance.filter(x=>sIds.includes(x.student_id)&&(!subId||x.subject_id===subId)&&x.status!=='EXCUSED');return a.length?Math.round(a.filter(x=>x.status==='PRESENT').length/a.length*100):null};
const pct=v=>v==null?'—':v+'%', ini=n=>n.split(' ').map(x=>x[0]).slice(0,2).join('');
const lessonsOn=(subs,d)=>subs.filter(s=>Number(s.day_of_week)===d).sort((a,b)=>a.start_time.localeCompare(b.start_time));

/* ---------- UI helpers ---------- */
function toast(text,bad=false){const e=$('#toast');e.className=`fixed bottom-20 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium text-white shadow-xl md:bottom-6 ${bad?'bg-red-600':'bg-slate-900'}`;e.innerHTML=`${ico(bad?'circle-alert':'circle-check')}${esc(text)}`;window.lucide?.createIcons();clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.add('hidden'),2600)}
const head=(t,s,a='')=>`<div class="mb-6 flex flex-wrap items-end justify-between gap-3"><div><h1 class="text-2xl font-bold tracking-tight">${t}</h1><p class="mt-1 text-sm text-slate-500">${s}</p></div><div class="flex flex-wrap gap-2">${a}</div></div>`;
const stat=(l,v,d,i,c='blue')=>`<div class="card p-5"><div class="flex justify-between"><div><p class="text-xs font-medium text-slate-500">${l}</p><div class="mt-2 text-3xl font-bold">${v}</div><p class="mt-1 text-xs text-slate-400">${d}</p></div><div class="grid h-10 w-10 place-items-center rounded-xl bg-${c}-50 text-${c}-600">${ico(i,'h-5 w-5')}</div></div></div>`;
const bar=(v,c='bg-blue-500')=>`<div class="h-2 rounded-full bg-slate-100"><div class="h-full rounded-full ${c}" style="width:${v||0}%"></div></div>`;
const attColor=v=>v==null?'text-slate-300':v>=90?'text-emerald-600':v>=75?'text-amber-600':'text-red-600';
const empty=t=>`<div class="rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">${t}</div>`;
const opts=(list,sel)=>list.map(([v,t])=>`<option value="${esc(v)}" ${String(v)===String(sel)?'selected':''}>${esc(t)}</option>`).join('');
const fl=(label,inner)=>`<label class="mb-3 block text-xs font-semibold text-slate-600">${label}<div class="mt-1">${inner}</div></label>`;
const chips=()=>`<div class="mb-5 flex flex-wrap gap-2">${tGroups().map(g=>`<button data-act="pickGroup" data-id="${g.id}" class="rounded-xl px-4 py-2 text-sm font-semibold ${curG()?.id===g.id?'bg-blue-600 text-white':'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}">${esc(g.name)}</button>`).join('')}</div>`;

const NAV={
 student:[['Главная','layout-dashboard'],['Расписание','calendar-days'],['Оценки','chart-no-axes-column'],['Задания','clipboard-check'],['Посещаемость','calendar-check'],['Профиль','user-round-cog']],
 teacher:[['Главная','layout-dashboard'],['Расписание','calendar-days'],['Журнал группы','notebook-tabs'],['Профиль','user-round-cog']],
 admin:[['Главная','layout-dashboard'],['Группы','panels-top-left'],['Пользователи','users-round'],['Предметы','library-big'],['Настройки','settings-2']]};
const ROLE={student:'Студент',teacher:'Преподаватель',admin:'Администратор'};

function layout(content){
 const m=NAV[S.mode],u=U();
 return `<div class="min-h-screen md:flex">
 <aside class="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-slate-900 px-4 py-5 md:flex">
  <div class="flex items-center gap-3 px-2 pb-6"><div class="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">${ico('graduation-cap','h-5 w-5')}</div><div><div class="font-bold text-white">ProCollege</div><div class="text-[11px] text-slate-400">Учебный портал</div></div></div>
  <nav class="space-y-1">${m.map(([n,i])=>`<button class="nav ${S.page===n?'on':''}" data-act="go" data-id="${n}">${ico(i,'h-[18px] w-[18px]')}${n}</button>`).join('')}</nav>
  <div class="mt-auto flex items-center gap-3 rounded-2xl bg-slate-800 p-3"><div class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-500 text-xs font-bold text-white">${esc(ini(u.fio))}</div><div class="min-w-0 flex-1"><div class="truncate text-sm font-semibold text-white">${esc(u.fio)}</div><div class="text-[11px] text-slate-400">${ROLE[S.mode]}</div></div><button data-act="logout" class="rounded-lg p-2 text-slate-400 hover:bg-slate-700 hover:text-white" aria-label="Выйти">${ico('log-out')}</button></div>
 </aside>
 <main class="min-w-0 flex-1 pb-24 md:ml-64 md:pb-8">
  <header class="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur md:px-8"><b class="text-sm">${S.page}</b><div class="flex items-center gap-2 md:hidden"><button data-act="logout" class="rounded-lg p-2 text-slate-500">${ico('log-out')}</button></div></header>
  <div class="mx-auto max-w-[1400px] px-4 py-6 md:px-8">${content}</div>
 </main>
 <nav class="fixed inset-x-0 bottom-0 z-30 flex justify-around bg-slate-900 px-1 pb-[max(.4rem,env(safe-area-inset-bottom))] pt-2 md:hidden">${m.map(([n,i])=>`<button data-act="go" data-id="${n}" class="flex flex-1 flex-col items-center gap-1 py-1 text-[10px] font-medium ${S.page===n?'text-blue-400':'text-slate-400'}">${ico(i,'h-5 w-5')}<span class="max-w-full truncate">${n}</span></button>`).join('')}</nav></div>`}

/* ---------- Auth ---------- */
const loginUsers=()=>S.d.users.filter(u=>u.role===S.mode.toUpperCase()&&(S.mode==='admin'||S.mode==='teacher'||u.group_id===S.lg));
function login(){
 $('#app').innerHTML=`<main class="grid min-h-screen place-items-center bg-slate-900 p-4"><section class="w-full max-w-md rounded-2xl bg-white p-7 shadow-2xl">
 <div class="flex items-center gap-3"><div class="grid h-10 w-10 place-items-center rounded-xl bg-blue-600 text-white">${ico('graduation-cap','h-5 w-5')}</div><b class="text-lg">ProCollege</b></div>
 <h1 class="mt-6 text-2xl font-bold">Вход в кабинет</h1><p class="mt-1 text-sm text-slate-500">Выберите профиль и введите PIN-код.</p>
 <div class="mt-5 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">${Object.entries(ROLE).map(([k,t])=>`<button data-act="role" data-id="${k}" class="rounded-lg px-2 py-2 text-xs font-semibold ${S.mode===k?'bg-white text-blue-700 shadow-sm':'text-slate-500'}">${t}</button>`).join('')}</div>
 <form data-form="login" class="mt-4">
  ${S.mode==='student'?fl('Группа',`<select name="group" data-chg="lg" class="fld">${opts(S.d.groups.map(g=>[g.id,g.name]),S.lg)}</select>`):''}
  ${fl('Профиль',`<select name="person" class="fld">${loginUsers().map(u=>`<option value="${esc(u.id)}">${esc(u.fio)}${u.status==='PENDING'||!u.pin?' · первый вход':''}</option>`).join('')}</select>`)}
  ${fl('PIN-код',`<input name="pin" type="password" maxlength="4" inputmode="numeric" pattern="[0-9]{4}" class="fld" placeholder="4 цифры" autocomplete="off">`)}
  <button class="btn-p mt-2 w-full">Войти ${ico('arrow-right')}</button>
  <p class="mt-3 text-center text-xs text-slate-400">${S.mode==='admin'?'Демо PIN администратора: 0000':'При первом входе введённый PIN станет вашим постоянным.'}</p></form></section></main>`;
 window.lucide?.createIcons()}
async function doLogin(fd){
 const u=S.d.users.find(x=>x.id===fd.get('person')),pin=fd.get('pin');
 if(!u)return toast('Выберите профиль',true);
 if(!/^\d{4}$/.test(pin))return toast('Введите PIN из 4 цифр',true);
 if(u.pin&&u.status!=='PENDING'){if(u.pin!==pin)return toast('Неверный PIN-код',true)}
 else{u.pin=pin;u.status='ACTIVE';await patch('users',u.id,{pin,status:'ACTIVE'})}
 S.user=u;S.page='Главная';S.gid=null;S.modal=null;render();toast('Добро пожаловать!')}

/* ---------- Student ---------- */
function slotCard(s,live){const c=live?'border-blue-500 bg-blue-50':'border-slate-200 bg-white';return `<div class="flex gap-4"><div class="w-14 shrink-0 pt-3 text-right text-xs font-semibold tabular-nums text-slate-500">${s.start_time}<div class="font-normal text-slate-300">${s.end_time}</div></div><div class="flex-1 rounded-2xl border border-l-4 ${live?'border-l-blue-600':'border-l-slate-300'} ${c} p-4"><div class="flex items-start justify-between gap-2"><b class="text-sm">${esc(s.name)}</b>${live?pill('Идёт сейчас','blue'):''}</div><p class="mt-1 text-xs text-slate-500">${esc(name('users',s.teacher_id))} · ${esc(s.room||'')}</p></div></div>`}
const isLive=(s)=>{const n=new Date(),m=n.getHours()*60+n.getMinutes(),f=t=>t.split(':').reduce((a,b)=>a*60+ +b);return Number(s.day_of_week)===(n.getDay()||7)&&m>=f(s.start_time)&&m<f(s.end_time)};
function dayPicker(){const t=new Date(),mon=new Date(t);mon.setDate(t.getDate()-((t.getDay()+6)%7));return `<div class="mb-5 flex gap-2 overflow-x-auto pb-1">${DAYS.map((d,i)=>{const dt=new Date(mon);dt.setDate(mon.getDate()+i);const on=S.day===i+1;return `<button data-act="day" data-id="${i+1}" class="min-w-[64px] flex-1 rounded-2xl border px-3 py-3 text-center ${on?'border-blue-600 bg-blue-600 text-white':'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'}"><div class="text-[11px] font-medium ${on?'text-blue-100':'text-slate-400'}">${d}</div><div class="text-lg font-bold">${dt.getDate()}</div></button>`}).join('')}</div>`}
const timeline=(subs,d)=>{const l=lessonsOn(subs,d);return l.length?`<div class="space-y-3">${l.map(s=>slotCard(s,isLive(s))).join('')}</div>`:empty('В этот день занятий нет ☀️')};

function studentHome(){
 const u=U(),subs=gSubs(u.group_id),mine=S.d.assignments.filter(a=>subs.some(s=>s.id===a.subject_id)).map(a=>({...a,sub:S.d.submissions.find(x=>x.assignment_id===a.id&&x.student_id===u.id)})),pend=mine.filter(a=>!a.sub).sort((a,b)=>a.due.localeCompare(b.due));
 const pts=avgPts([u.id]),avg=avgGrade([u.id]),pr=S.d.practice.filter(p=>p.student_id===u.id&&p.verified).length,TARGET=16;
 return `${head(`Привет, ${esc(u.fio.split(' ')[0])}!`,new Date().toLocaleDateString('ru-RU',{weekday:'long',day:'numeric',month:'long'}))}
 <div class="grid gap-5 xl:grid-cols-[1fr_340px]">
  <section class="card p-5"><h2 class="mb-4 font-bold">Расписание на день</h2>${dayPicker()}${timeline(subs,S.day)}</section>
  <div class="space-y-5">
   <div class="card p-5"><p class="text-xs font-medium text-slate-500">Средний балл</p><div class="mt-2 flex items-end gap-3"><span class="text-5xl font-bold">${avg??'—'}</span>${pts!=null?gb(pts):''}</div><p class="mt-2 text-xs text-slate-400">${pts!=null?`${Math.round(pts)} из 100 баллов`:'Оценок пока нет'} · посещаемость ${pct(attPct([u.id]))}</p></div>
   <div class="card p-5"><div class="mb-3 flex justify-between"><h2 class="font-bold">Ближайшие задания</h2><button data-act="go" data-id="Задания" class="text-xs font-semibold text-blue-600">Все</button></div><div class="space-y-2">${pend.slice(0,3).map(a=>`<button data-act="modal" data-type="submit" data-id="${a.id}" class="flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left hover:bg-slate-100"><span class="h-2 w-2 rounded-full bg-amber-400"></span><div class="min-w-0 flex-1"><b class="block truncate text-xs">${esc(a.title)}</b><span class="text-[11px] text-slate-400">до ${new Date(a.due+'T12:00').toLocaleDateString('ru-RU')}</span></div></button>`).join('')||empty('Всё сдано 🎉')}</div></div>
   <div class="card p-5"><h2 class="mb-3 font-bold">Уведомления</h2><div class="space-y-3">${S.d.messages.slice(-3).reverse().map(m=>`<div class="flex gap-3"><span class="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-blue-50 text-blue-600">${ico('bell')}</span><div><p class="text-xs text-slate-700">${esc(m.text)}</p><p class="mt-0.5 text-[11px] text-slate-400">${esc(m.author)} · ${esc(m.time)}</p></div></div>`).join('')}</div></div>
   <div class="card p-5"><div class="mb-3 flex justify-between"><h2 class="font-bold">Прогресс практики</h2><b class="text-sm text-blue-600">${Math.round(pr/TARGET*100)}%</b></div>${bar(pr/TARGET*100)}<p class="mt-2 text-xs text-slate-400">${pr} из ${TARGET} подтверждённых записей</p></div>
  </div></div>`}
function studentSchedule(){const subs=gSubs(U().group_id);return `${head('Расписание','Занятия вашей группы на неделю.')}${dayPicker()}<div class="grid gap-5 lg:grid-cols-2">${DAYS.slice(0,6).map((d,i)=>`<section class="card p-5"><h2 class="mb-4 font-bold">${FULL[i]}</h2>${timeline(subs,i+1)}</section>`).join('')}</div>`}
function studentGrades(){const u=U(),rows=gSubs(u.group_id);return `${head('Оценки','Баллы (0–100) и итоговая оценка (2–5).')}<div class="card overflow-x-auto"><table class="w-full min-w-[560px]"><thead class="bg-slate-50"><tr><th class="th">Предмет</th><th class="th">Работ</th><th class="th">Баллы</th><th class="th">Оценка</th></tr></thead><tbody class="divide-y divide-slate-100">${rows.map(s=>{const p=avgPts([u.id],s.id);return `<tr><td class="td font-semibold">${esc(s.name)}</td><td class="td">${S.d.grades.filter(g=>g.student_id===u.id&&g.subject_id===s.id).length}</td><td class="td">${p==null?'—':Math.round(p)}</td><td class="td">${gb(p,false)}${p!=null?` <span class="ml-1 text-xs text-slate-400">${G(p).t}</span>`:''}</td></tr>`}).join('')}</tbody></table></div>`}
function studentTasks(){const u=U(),subs=gSubs(u.group_id),list=S.d.assignments.filter(a=>subs.some(s=>s.id===a.subject_id));return `${head('Задания','Ваши задания и статус сдачи.')}<div class="grid gap-4 lg:grid-cols-2">${list.map(a=>{const r=S.d.submissions.find(x=>x.assignment_id===a.id&&x.student_id===u.id),late=!r&&new Date(a.due+'T23:59')<new Date();return `<article class="card p-5"><div class="flex justify-between"><span class="text-xs text-slate-400">${esc(name('subjects',a.subject_id))}</span>${r?pill(r.status==='GRADED'?`Оценено: ${r.grade}`:'На проверке',r.status==='GRADED'?'emerald':'amber'):late?pill('Просрочено','red'):pill('Ожидает','blue')}</div><h3 class="mt-2 font-bold">${esc(a.title)}</h3><p class="mt-1 text-sm text-slate-500">${esc(a.description||'')}</p><div class="mt-4 flex items-center justify-between border-t border-slate-100 pt-3"><span class="text-xs text-slate-400">Срок: ${new Date(a.due+'T12:00').toLocaleDateString('ru-RU')}</span>${r?(r.feedback?`<span class="text-xs text-slate-500">${esc(r.feedback)}</span>`:''):`<button data-act="modal" data-type="submit" data-id="${a.id}" class="btn-p !py-2 text-xs">Сдать работу</button>`}</div></article>`}).join('')||empty('Заданий нет')}</div>`}
function studentAtt(){const u=U(),subs=gSubs(u.group_id),rows=S.d.attendance.filter(a=>a.student_id===u.id);return `${head('Посещаемость','Статистика по предметам.')}<div class="mb-5 grid gap-4 sm:grid-cols-3">${stat('Общая',pct(attPct([u.id])),'За период','pie-chart','emerald')}${stat('Присутствия',rows.filter(a=>a.status==='PRESENT').length,'Отмечено','circle-check-big')}${stat('Пропуски',rows.filter(a=>a.status==='ABSENT').length,'Без уважительной причины','circle-x','red')}</div><div class="card space-y-4 p-5">${subs.map(s=>{const p=attPct([u.id],s.id);return `<div><div class="mb-1.5 flex justify-between text-sm"><b>${esc(s.name)}</b><b class="${attColor(p)}">${pct(p)}</b></div>${bar(p,p>=90?'bg-emerald-500':p>=75?'bg-amber-500':'bg-red-500')}</div>`}).join('')}</div>`}
function profile(){const u=U();return `${head('Профиль','Личные данные и безопасность.')}<div class="grid gap-5 lg:grid-cols-[1fr_1.2fr]"><section class="card p-6"><div class="grid h-16 w-16 place-items-center rounded-full bg-blue-600 text-xl font-bold text-white">${esc(ini(u.fio))}</div><h2 class="mt-4 text-xl font-bold">${esc(u.fio)}</h2><p class="text-sm text-slate-400">${esc(u.email||'')}</p><div class="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm"><div class="flex justify-between"><span class="text-slate-500">Роль</span><b>${ROLE[S.mode]}</b></div><div class="flex justify-between"><span class="text-slate-500">Группа</span><b>${esc(name('groups',u.group_id))}</b></div></div></section><form data-form="pin" class="card p-6"><h2 class="font-bold">Изменить PIN-код</h2><div class="mt-4 grid gap-3 sm:grid-cols-2"><input name="p1" type="password" maxlength="4" inputmode="numeric" class="fld" placeholder="Новый PIN"><input name="p2" type="password" maxlength="4" inputmode="numeric" class="fld" placeholder="Повторите PIN"></div><button class="btn-p mt-4">Сохранить</button></form></div>`}

/* ---------- Teacher ---------- */
function teacherHome(){
 const u=U(),mySubs=S.d.subjects.filter(s=>s.teacher_id===u.id),ids=new Set(mySubs.map(s=>s.id)),
 pending=S.d.submissions.filter(s=>s.status==='SUBMITTED'&&ids.has(S.d.assignments.find(a=>a.id===s.assignment_id)?.subject_id)),
 recent=S.d.grades.filter(g=>ids.has(g.subject_id)).slice(-6).reverse(),icons=['code-2','calculator','palette','database','book-open'];
 return `${head(`Добро пожаловать, ${esc(u.fio.split(' ')[0])}`,'Ваши курсы, работы на проверку и последние оценки.')}
 <h2 class="mb-3 font-bold">Мои курсы</h2><div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">${mySubs.map((s,i)=>{const st=gStuds(s.group_id).map(x=>x.id);return `<article class="card p-5"><div class="flex justify-between"><span class="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600">${ico(icons[i%5],'h-5 w-5')}</span>${gb(avgPts(st,s.id),false)}</div><h3 class="mt-4 font-bold leading-tight">${esc(s.name)}</h3><p class="mt-1 text-xs text-slate-500">${esc(name('groups',s.group_id))} · ${st.length} студ. · ${DAYS[s.day_of_week-1]} ${s.start_time}</p><button data-act="openGroup" data-id="${s.group_id}" class="btn-q mt-4 w-full !py-2 text-xs">Открыть журнал</button></article>`}).join('')||empty('Курсов пока нет')}</div>
 <div class="mt-5 grid gap-5 xl:grid-cols-[1fr_1.3fr]">
  <section class="card p-5"><h2 class="font-bold">Работы на проверку</h2><p class="mb-3 text-xs text-slate-500">${pending.length} ожидают оценки</p><div class="space-y-2">${pending.map(p=>{const a=S.d.assignments.find(x=>x.id===p.assignment_id);return `<button data-act="modal" data-type="review" data-id="${p.id}" class="flex w-full items-center gap-3 rounded-xl bg-slate-50 p-3 text-left hover:bg-slate-100"><span class="grid h-8 w-8 place-items-center rounded-full bg-amber-100 text-[11px] font-bold text-amber-700">${esc(ini(name('users',p.student_id)))}</span><div class="min-w-0 flex-1"><b class="block truncate text-xs">${esc(a?.title)}</b><span class="text-[11px] text-slate-400">${esc(name('users',p.student_id))}</span></div>${pill('Оценить','blue')}</button>`}).join('')||empty('Всё проверено')}</div></section>
  <section class="card overflow-x-auto"><h2 class="p-5 pb-2 font-bold">Последние оценки</h2><table class="w-full min-w-[420px]"><thead><tr><th class="th">Студент</th><th class="th">Предмет</th><th class="th">Оценка</th></tr></thead><tbody class="divide-y divide-slate-100">${recent.map(g=>`<tr><td class="td font-medium">${esc(name('users',g.student_id))}</td><td class="td text-slate-500">${esc(name('subjects',g.subject_id))}</td><td class="td">${gb(g.score)}</td></tr>`).join('')||`<tr><td class="td text-slate-400" colspan="3">Оценок пока нет</td></tr>`}</tbody></table></section></div>`}
function teacherSchedule(){
 const g=curG();if(!g)return head('Расписание','')+empty('У вас нет групп');
 const subs=gSubs(g.id);
 return `${head('Расписание группы','Добавляйте и редактируйте занятия.',`<button data-act="modal" data-type="slot" class="btn-p">${ico('plus')}Добавить занятие</button>`)}${chips()}<div class="grid gap-5 lg:grid-cols-2">${DAYS.slice(0,6).map((d,i)=>`<section class="card p-5"><h2 class="mb-3 font-bold">${FULL[i]}</h2><div class="space-y-2">${lessonsOn(subs,i+1).map(s=>`<div class="flex items-center gap-3 rounded-xl border border-slate-200 p-3"><div class="w-24 shrink-0 text-xs font-semibold tabular-nums text-blue-600">${s.start_time}–${s.end_time}</div><div class="min-w-0 flex-1"><b class="block truncate text-sm">${esc(s.name)}</b><span class="text-xs text-slate-400">${esc(s.room||'')} · ${esc(name('users',s.teacher_id))}</span></div><button data-act="modal" data-type="slot" data-id="${s.id}" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100">${ico('pencil')}</button><button data-act="modal" data-type="confirm" data-do="delSubject" data-id="${s.id}" data-text="Удалить занятие «${esc(s.name)}»?" class="rounded-lg p-2 text-red-500 hover:bg-red-50">${ico('trash-2')}</button></div>`).join('')||empty('Нет занятий')}</div></section>`).join('')}</div>`}
function teacherGroup(){
 const g=curG();if(!g)return head('Журнал группы','')+empty('У вас нет групп');
 const st=gStuds(g.id),ids=st.map(s=>s.id),pts=avgPts(ids),at=attPct(ids);
 return `${head('Журнал группы','Успеваемость и посещаемость студентов.',`<button data-act="modal" data-type="att" class="btn-q">${ico('calendar-check')}Посещаемость</button><button data-act="modal" data-type="gradeBulk" class="btn-p">${ico('list-checks')}Массовое оценивание</button>`)}${chips()}
 <div class="mb-5 grid gap-4 sm:grid-cols-3">
  <div class="card p-5"><p class="text-xs font-medium text-slate-500">Средний балл группы</p><div class="mt-2 flex items-end gap-3"><span class="text-4xl font-bold">${pts==null?'—':Math.round(pts)}</span>${gb(pts,false)}</div><p class="mt-1 text-xs text-slate-400">${pts==null?'Нет оценок':`Оценка ${G(pts).n} · ${G(pts).t}`}</p></div>
  ${stat('Посещаемость',pct(at),'Вся группа','calendar-check','emerald')}${stat('Студентов',st.length,esc(g.name),'users','sky')}</div>
 <div class="card overflow-x-auto"><table class="w-full min-w-[640px]"><thead class="bg-slate-50"><tr><th class="th">Студент</th><th class="th">Баллы</th><th class="th">Оценка</th><th class="th">Посещ.</th><th class="th text-right">Действия</th></tr></thead><tbody class="divide-y divide-slate-100">${st.map(s=>{const p=avgPts([s.id]),a=attPct([s.id]);return `<tr><td class="td"><div class="flex items-center gap-3"><span class="grid h-8 w-8 place-items-center rounded-full bg-blue-50 text-[11px] font-bold text-blue-700">${esc(ini(s.fio))}</span><b>${esc(s.fio)}</b></div></td><td class="td">${p==null?'—':Math.round(p)}</td><td class="td">${gb(p,false)}</td><td class="td font-semibold ${attColor(a)}">${pct(a)}</td><td class="td text-right"><button data-act="modal" data-type="grade1" data-id="${s.id}" class="btn-q !px-3 !py-1.5 text-xs">Оценить</button> <button data-act="modal" data-type="att" data-id="${s.id}" class="btn-q !px-3 !py-1.5 text-xs">Отметить</button></td></tr>`}).join('')||`<tr><td class="td text-slate-400" colspan="5">В группе нет студентов</td></tr>`}</tbody></table></div>`}

/* ---------- Admin ---------- */
function adminHome(){const c=r=>S.d.users.filter(u=>u.role===r).length;return `${head('Панель администратора','Общая картина по колледжу.')}<div class="grid gap-4 sm:grid-cols-4">${stat('Студентов',c('STUDENT'),'Во всех группах','graduation-cap')}${stat('Преподавателей',c('TEACHER'),'Активные записи','presentation','sky')}${stat('Групп',S.d.groups.length,'Учебный год','panels-top-left','emerald')}${stat('Предметов',S.d.subjects.length,'В расписании','library-big','amber')}</div><section class="card mt-5 p-5"><h2 class="font-bold">Наполняемость групп</h2>${S.d.groups.map(g=>{const n=gStuds(g.id).length;return `<div class="mt-4"><div class="mb-1.5 flex justify-between text-xs"><b>${esc(g.name)}</b><span class="text-slate-500">${n} студентов</span></div>${bar(Math.min(100,n*10))}</div>`}).join('')}</section>`}
function adminGroups(){return `${head('Группы','Создание и редактирование.',`<button data-act="modal" data-type="group" class="btn-p">${ico('plus')}Новая группа</button>`)}<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">${S.d.groups.map(g=>`<article class="card p-5"><div class="flex justify-between"><span class="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-600">${ico('users','h-5 w-5')}</span><div><button data-act="modal" data-type="group" data-id="${g.id}" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100">${ico('pencil')}</button><button data-act="modal" data-type="confirm" data-do="delGroup" data-id="${g.id}" data-text="Удалить группу «${esc(g.name)}»?" class="rounded-lg p-2 text-red-500 hover:bg-red-50">${ico('trash-2')}</button></div></div><h3 class="mt-4 text-xl font-bold">${esc(g.name)}</h3><p class="text-xs text-slate-400">${gStuds(g.id).length} студентов · ${gSubs(g.id).length} предметов</p></article>`).join('')}</div>`}
function adminUsers(){return `${head('Пользователи','Студенты, преподаватели и доступ.',`<button data-act="modal" data-type="user" class="btn-p">${ico('user-plus')}Добавить</button>`)}<div class="card overflow-x-auto"><table class="w-full min-w-[720px]"><thead class="bg-slate-50"><tr><th class="th">Пользователь</th><th class="th">Роль</th><th class="th">Группа</th><th class="th">Статус</th><th class="th text-right">Действия</th></tr></thead><tbody class="divide-y divide-slate-100">${S.d.users.map(u=>`<tr><td class="td"><b>${esc(u.fio)}</b><div class="text-xs text-slate-400">${esc(u.email||'')}</div></td><td class="td text-xs">${ROLE[u.role.toLowerCase()]}</td><td class="td text-xs">${esc(name('groups',u.group_id))}</td><td class="td">${u.status==='ACTIVE'&&u.pin?pill('Активен','emerald'):pill('Ожидает PIN','amber')}</td><td class="td text-right whitespace-nowrap"><button title="Изменить" data-act="modal" data-type="user" data-id="${u.id}" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100">${ico('pencil')}</button><button title="Сбросить PIN" data-act="modal" data-type="confirm" data-do="resetPin" data-id="${u.id}" data-text="Сбросить PIN для ${esc(u.fio)}? Пользователь задаст новый при входе." class="rounded-lg p-2 text-slate-400 hover:bg-slate-100">${ico('key-round')}</button><button title="Удалить" data-act="modal" data-type="confirm" data-do="delUser" data-id="${u.id}" data-text="Удалить пользователя ${esc(u.fio)}?" class="rounded-lg p-2 text-red-500 hover:bg-red-50">${ico('trash-2')}</button></td></tr>`).join('')}</tbody></table></div>`}
function adminSubjects(){return `${head('Предметы','Назначение групп, преподавателей и аудиторий.',`<button data-act="modal" data-type="subject" class="btn-p">${ico('plus')}Новый предмет</button>`)}<div class="grid gap-4 lg:grid-cols-2">${S.d.subjects.map(s=>`<article class="card flex items-center gap-4 p-5"><span class="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-600">${ico('book-open','h-5 w-5')}</span><div class="min-w-0 flex-1"><b class="block truncate">${esc(s.name)}</b><p class="text-xs text-slate-400">${esc(name('groups',s.group_id))} · ${esc(name('users',s.teacher_id))} · ${DAYS[s.day_of_week-1]} ${s.start_time}</p></div><button data-act="modal" data-type="subject" data-id="${s.id}" class="rounded-lg p-2 text-slate-400 hover:bg-slate-100">${ico('pencil')}</button><button data-act="modal" data-type="confirm" data-do="delSubject" data-id="${s.id}" data-text="Удалить предмет «${esc(s.name)}»?" class="rounded-lg p-2 text-red-500 hover:bg-red-50">${ico('trash-2')}</button></article>`).join('')||empty('Предметов нет')}</div>`}
const adminSettings=()=>`${head('Настройки','Параметры системы.')}<form data-form="settings" class="card max-w-2xl p-6"><div class="grid gap-3 sm:grid-cols-2"><select class="fld"><option>2026 / 2027</option></select><select class="fld"><option>Казахстан (UTC+5)</option><option>UTC</option></select></div>${['Изменения расписания','Еженедельный отчёт'].map(x=>`<label class="mt-3 flex items-center justify-between rounded-xl bg-slate-50 p-4 text-sm font-medium">${x}<input type="checkbox" checked class="h-4 w-4 accent-blue-600"></label>`).join('')}<button class="btn-p mt-5">Сохранить</button></form>`;

const VIEWS={
 student:{'Главная':studentHome,'Расписание':studentSchedule,'Оценки':studentGrades,'Задания':studentTasks,'Посещаемость':studentAtt,'Профиль':profile},
 teacher:{'Главная':teacherHome,'Расписание':teacherSchedule,'Журнал группы':teacherGroup,'Профиль':profile},
 admin:{'Главная':adminHome,'Группы':adminGroups,'Пользователи':adminUsers,'Предметы':adminSubjects,'Настройки':adminSettings}};

/* ---------- Modals ---------- */
const scoreIn=(n,v='')=>`<input name="${n}" type="number" min="0" max="100" value="${v}" class="fld" placeholder="0–100">`;
const MODALS={
 slot(x){const s=S.d.subjects.find(i=>i.id===x.id)||{day_of_week:1,start_time:'09:00',end_time:'10:25'};return {title:x.id?'Изменить занятие':'Новое занятие',body:`${fl('Предмет',`<input name="name" required class="fld" value="${esc(s.name||'')}" list="subjNames"><datalist id="subjNames">${uniqSubs(curG().id).map(i=>`<option value="${esc(i.name)}">`).join('')}</datalist>`)}${fl('День',`<select name="day" class="fld">${opts(DAYS.map((d,i)=>[i+1,FULL[i]]),s.day_of_week)}</select>`)}<div class="grid grid-cols-2 gap-3">${fl('Начало',`<input name="start" type="time" required class="fld" value="${s.start_time}">`)}${fl('Конец',`<input name="end" type="time" required class="fld" value="${s.end_time}">`)}</div>${fl('Аудитория',`<input name="room" class="fld" value="${esc(s.room||'')}" placeholder="Ауд. 204">`)}`}},
 grade1(x){const g=curG().id;return {title:'Выставить оценку',body:`${fl('Студент',`<select name="student" class="fld">${opts(gStuds(g).map(s=>[s.id,s.fio]),x.id)}</select>`)}${fl('Предмет',`<select name="subject" class="fld">${opts(tSubs(g).map(s=>[s.id,s.name]),'')}</select>`)}${fl('Баллы (0–100)',scoreIn('score'))}`}},
 gradeBulk(x){const g=curG().id,sub=x.subject||tSubs(g)[0]?.id;return {w:'max-w-lg',title:'Массовое оценивание',body:`${fl('Предмет',`<select name="subject" data-chg="bulkSubj" class="fld">${opts(tSubs(g).map(s=>[s.id,s.name]),sub)}</select>`)}<div class="space-y-2">${gStuds(g).map(s=>`<div class="flex items-center gap-3"><span class="flex-1 text-sm font-medium">${esc(s.fio)}</span><input name="s_${s.id}" type="number" min="0" max="100" placeholder="—" class="fld !w-24 text-center"></div>`).join('')}</div><p class="mt-3 text-xs text-slate-400">Пустые поля пропускаются.</p>`}},
 att(x){const g=curG().id,sub=x.subject||tSubs(g)[0]?.id,date=x.date||today();return {w:'max-w-lg',title:'Отметка посещаемости',body:`<div class="grid grid-cols-2 gap-3">${fl('Предмет',`<select name="subject" data-chg="attCtx" class="fld">${opts(tSubs(g).map(s=>[s.id,s.name]),sub)}</select>`)}${fl('Дата',`<input name="date" type="date" data-chg="attCtx" value="${date}" class="fld">`)}</div><div class="space-y-2">${gStuds(g).filter(s=>!x.id||s.id===x.id).map(s=>{const ex=S.d.attendance.find(a=>a.student_id===s.id&&a.subject_id===sub&&a.date===date);return `<div class="flex items-center gap-3"><span class="flex-1 text-sm font-medium">${esc(s.fio)}</span><select name="a_${s.id}" class="fld !w-auto">${opts(Object.entries(ATT),ex?.status||'PRESENT')}</select></div>`}).join('')}</div>`}},
 review(x){const p=S.d.submissions.find(s=>s.id===x.id);return {title:'Проверка работы',body:`<p class="mb-3 text-sm"><b>${esc(name('users',p.student_id))}</b> · ${esc(S.d.assignments.find(a=>a.id===p.assignment_id)?.title)}</p><p class="mb-3 rounded-xl bg-slate-50 p-3 text-xs text-slate-500">${esc(p.file_name||'Файл не приложен')} · ${esc(p.comment||'Без комментария')}</p>${fl('Баллы (0–100)',scoreIn('score'))}${fl('Комментарий',`<input name="feedback" class="fld">`)}`}},
 submit(x){const a=S.d.assignments.find(i=>i.id===x.id);return {title:'Сдать работу',ok:'Отправить',body:`<p class="mb-3 text-sm font-semibold">${esc(a.title)}</p>${fl('Файл',`<input name="file" type="file" class="fld">`)}${fl('Комментарий',`<input name="comment" class="fld" placeholder="Необязательно">`)}`}},
 group(x){const g=S.d.groups.find(i=>i.id===x.id);return {title:g?'Изменить группу':'Новая группа',body:fl('Название',`<input name="name" required class="fld" value="${esc(g?.name||'')}" placeholder="ПО-22">`)}},
 user(x){const u=S.d.users.find(i=>i.id===x.id)||{role:'STUDENT'};return {title:x.id?'Изменить пользователя':'Новый пользователь',body:`${fl('ФИО',`<input name="fio" required class="fld" value="${esc(u.fio||'')}">`)}${fl('Email',`<input name="email" type="email" required class="fld" value="${esc(u.email||'')}">`)}<div class="grid grid-cols-2 gap-3">${fl('Роль',`<select name="role" class="fld">${opts([['STUDENT','Студент'],['TEACHER','Преподаватель']],u.role)}</select>`)}${fl('Группа',`<select name="group" class="fld"><option value="">—</option>${opts(S.d.groups.map(g=>[g.id,g.name]),u.group_id)}</select>`)}</div>${x.id?'':fl('Начальный PIN (необязательно)',`<input name="pin" maxlength="4" inputmode="numeric" class="fld" placeholder="4 цифры">`)}`}},
 subject(x){const s=S.d.subjects.find(i=>i.id===x.id)||{day_of_week:1,start_time:'09:00',end_time:'10:25'};return {title:x.id?'Изменить предмет':'Новый предмет',body:`${fl('Название',`<input name="name" required class="fld" value="${esc(s.name||'')}">`)}<div class="grid grid-cols-2 gap-3">${fl('Группа',`<select name="group" required class="fld">${opts(S.d.groups.map(g=>[g.id,g.name]),s.group_id)}</select>`)}${fl('Преподаватель',`<select name="teacher" required class="fld">${opts(S.d.users.filter(u=>u.role==='TEACHER').map(u=>[u.id,u.fio]),s.teacher_id)}</select>`)}</div><div class="grid grid-cols-3 gap-3">${fl('День',`<select name="day" class="fld">${opts(DAYS.map((d,i)=>[i+1,d]),s.day_of_week)}</select>`)}${fl('Начало',`<input name="start" type="time" class="fld" value="${s.start_time}">`)}${fl('Конец',`<input name="end" type="time" class="fld" value="${s.end_time}">`)}</div>${fl('Аудитория',`<input name="room" class="fld" value="${esc(s.room||'')}">`)}`}},
 confirm(x){return {title:'Подтвердите действие',ok:'Подтвердить',body:`<p class="text-sm text-slate-600">${esc(x.text)}</p>`}}
};
function modalHtml(){const m=S.modal;if(!m)return'';const b=MODALS[m.type](m.data);return `<div data-act="closeBg" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 p-4 backdrop-blur-sm"><form data-form="${m.type}" class="card max-h-[90vh] w-full ${b.w||'max-w-md'} overflow-y-auto p-6 shadow-2xl"><div class="mb-4 flex items-start justify-between"><h3 class="text-lg font-bold">${b.title}</h3><button type="button" data-act="close" class="rounded-lg p-1 text-slate-400 hover:bg-slate-100">${ico('x','h-5 w-5')}</button></div>${b.body}<div class="mt-5 flex justify-end gap-2"><button type="button" data-act="close" class="btn-q">Отмена</button><button class="btn-p">${b.ok||'Сохранить'}</button></div></form></div>`}

/* ---------- Save handlers ---------- */
const clampScore=v=>{const n=Number(v);return v!==''&&Number.isFinite(n)&&n>=0&&n<=100?n:null};
const ACTIONS={
 async slot(f,d){const g=curG().id,row={name:f.get('name').trim(),group_id:g,day_of_week:+f.get('day'),start_time:f.get('start'),end_time:f.get('end'),room:f.get('room')};if(row.end_time<=row.start_time)return 'Конец должен быть позже начала';const old=S.d.subjects.find(s=>s.id===d.id);await upsert('subjects',d.id,{...row,teacher_id:old?.teacher_id||U().id});return 'Расписание сохранено'},
 async grade1(f){const score=clampScore(f.get('score'));if(score==null)return 'Баллы: от 0 до 100';S.d.grades.push(await add('grades',{student_id:f.get('student'),subject_id:f.get('subject'),score}));return `Оценка ${G(score).n} сохранена`},
 async gradeBulk(f){let n=0;for(const s of gStuds(curG().id)){const v=f.get('s_'+s.id);if(v==='')continue;const score=clampScore(v);if(score==null)return `Некорректные баллы: ${s.fio}`;S.d.grades.push(await add('grades',{student_id:s.id,subject_id:f.get('subject'),score}));n++}return n?`Оценок сохранено: ${n}`:'Ничего не заполнено'},
 async att(f,d){const sub=f.get('subject'),date=f.get('date');if(!sub||!date)return 'Выберите предмет и дату';for(const s of gStuds(curG().id).filter(s=>!d.id||s.id===d.id)){const status=f.get('a_'+s.id);if(!status)continue;const ex=S.d.attendance.find(a=>a.student_id===s.id&&a.subject_id===sub&&a.date===date);if(ex){ex.status=status;await patch('attendance',ex.id,{status})}else S.d.attendance.push(await add('attendance',{student_id:s.id,subject_id:sub,date,status}))}return 'Посещаемость сохранена'},
 async review(f,d){const score=clampScore(f.get('score'));if(score==null)return 'Баллы: от 0 до 100';const p=S.d.submissions.find(s=>s.id===d.id),a=S.d.assignments.find(x=>x.id===p.assignment_id),row={status:'GRADED',grade:score,feedback:f.get('feedback')};Object.assign(p,row);await patch('submissions',p.id,row);S.d.grades.push(await add('grades',{student_id:p.student_id,subject_id:a.subject_id,score}));return 'Работа оценена'},
 async submit(f,d){const row={assignment_id:d.id,student_id:U().id,status:'SUBMITTED',submitted_at:new Date().toISOString(),file_name:f.get('file')?.name||'',comment:f.get('comment'),grade:null,feedback:''};S.d.submissions.push(await add('submissions',row));return 'Работа отправлена'},
 async group(f,d){const n=f.get('name').trim();if(!n)return 'Введите название';if(S.d.groups.some(g=>g.name.toLowerCase()===n.toLowerCase()&&g.id!==d.id))return 'Такая группа уже есть';await upsert('groups',d.id,{name:n});return 'Группа сохранена'},
 async user(f,d){const pin=f.get('pin')||'',role=f.get('role'),group=f.get('group')||null;if(pin&&!/^\d{4}$/.test(pin))return 'PIN — 4 цифры';if(role==='STUDENT'&&!group)return 'Выберите группу студента';const row={fio:f.get('fio').trim(),email:f.get('email').trim(),role,group_id:group};if(S.d.users.some(u=>u.email===row.email&&u.id!==d.id))return 'Email уже используется';if(!d.id){row.status=pin?'ACTIVE':'PENDING';row.pin=pin||null}await upsert('users',d.id,row);return 'Пользователь сохранён'},
 async subject(f,d){await upsert('subjects',d.id,{name:f.get('name').trim(),group_id:f.get('group'),teacher_id:f.get('teacher'),day_of_week:+f.get('day'),start_time:f.get('start'),end_time:f.get('end'),room:f.get('room')});return 'Предмет сохранён'},
 async pin(f){const p=f.get('p1');if(!/^\d{4}$/.test(p)||p!==f.get('p2'))return 'PIN: 4 цифры, значения должны совпадать';U().pin=p;await patch('users',U().id,{pin:p});return 'PIN изменён'},
 async settings(){return 'Настройки сохранены'},
 async confirm(f,d){
  if(d.do==='delGroup'){if(S.d.users.some(u=>u.group_id===d.id)||gSubs(d.id).length)return 'Сначала перенесите пользователей и предметы';await remove('groups',d.id)}
  if(d.do==='delUser'){if(d.id===U().id)return 'Нельзя удалить свой профиль';await remove('users',d.id)}
  if(d.do==='delSubject')await remove('subjects',d.id);
  if(d.do==='resetPin'){const u=S.d.users.find(x=>x.id===d.id);Object.assign(u,{pin:null,status:'PENDING'});await patch('users',u.id,{pin:null,status:'PENDING'})}
  return 'Готово'}
};
const NOMODAL=new Set(['pin','settings']);

/* ---------- Render & events ---------- */
function render(){if(!S.user)return login();const v=VIEWS[S.mode][S.page]||VIEWS[S.mode]['Главная'];$('#app').innerHTML=layout(v())+modalHtml();window.lucide?.createIcons()}
const app=document.getElementById('app');
app.addEventListener('click',e=>{
 const t=e.target.closest('[data-act]');if(!t)return;const a=t.dataset.act,id=t.dataset.id;
 if(a==='closeBg'&&e.target!==t)return;
 if(a==='go'){S.page=id;S.modal=null}
 else if(a==='day')S.day=+id;
 else if(a==='pickGroup')S.gid=id;
 else if(a==='openGroup'){S.gid=id;S.page='Журнал группы'}
 else if(a==='role'){S.mode=id;login();return}
 else if(a==='logout'){S.user=null;S.modal=null;login();return}
 else if(a==='modal')S.modal={type:t.dataset.type,data:{id,do:t.dataset.do,text:t.dataset.text}};
 else if(a==='close'||a==='closeBg')S.modal=null;
 render()});
app.addEventListener('change',e=>{
 const k=e.target.dataset.chg;if(!k)return;
 if(k==='lg'){S.lg=e.target.value;login()}
 else if(k==='bulkSubj'){S.modal.data.subject=e.target.value;render()}
 else if(k==='attCtx'){const f=new FormData(e.target.form);S.modal.data.subject=f.get('subject');S.modal.data.date=f.get('date');render()}});
app.addEventListener('submit',async e=>{
 e.preventDefault();const form=e.target,type=form.dataset.form,f=new FormData(form);
 if(type==='login')return doLogin(f);
 const btn=form.querySelector('button:not([type])');if(btn)btn.disabled=true;
 try{const data=NOMODAL.has(type)?{}:S.modal?.data||{},msg=await ACTIONS[type](f,data),ok=/сохран|Готово|отправлен|оценен|изменён|Оценка/.test(msg);
  if(ok&&!NOMODAL.has(type))S.modal=null;render();toast(msg,!ok)}
 catch(err){console.error(err);toast('Не удалось сохранить: '+(err.message||err),true);if(btn)btn.disabled=false}});

load().then(login);
