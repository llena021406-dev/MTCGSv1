'use strict';

    
    /* ── localStorage DB adapter ── */
    const DB={
      get(k){try{return JSON.parse(localStorage.getItem('mtcgs_'+k)||'null')}catch(e){return null}},
      set(k,v){localStorage.setItem('mtcgs_'+k,JSON.stringify(v));return v},
      push(k,item){const a=this.get(k)||[];a.push(item);this.set(k,a);return item},
      update(k,id,data){const a=this.get(k)||[];const i=a.findIndex(x=>x.id===id);if(i>-1){a[i]={...a[i],...data};this.set(k,a);return a[i]}return null},
      delete(k,id){this.set(k,(this.get(k)||[]).filter(x=>x.id!==id))},
      nextId(k){const a=this.get(k)||[];return a.length>0?Math.max(...a.map(x=>x.id||0))+1:1}
    };
    
    function seedData(){
      if(DB.get('seeded'))return;
      DB.set('users',[
        {id:1,fname:'Maria',lname:'Santos',email:'finance@mtcgs.edu.ph',password:'password',role:'finance',branch:'Patnubay',status:'active',initials:'MS'},
        {id:2,fname:'Jose',lname:'Reyes',email:'registrar@mtcgs.edu.ph',password:'password',role:'registrar',branch:'Patnubay',status:'active',initials:'JR'},
        {id:3,fname:'Ana',lname:'Cruz',email:'branch@mtcgs.edu.ph',password:'password',role:'branch',branch:'Patnubay',status:'active',initials:'AC'},
        {id:4,fname:'Board',lname:'President',email:'president@mtcgs.edu.ph',password:'password',role:'president',branch:'All Branches',status:'active',initials:'BP'},
        {id:5,fname:'Juan',lname:'Torres',email:'teacher@mtcgs.edu.ph',password:'password',role:'teacher',branch:'Patnubay',status:'active',initials:'JT'},
        {id:6,fname:'Celia',lname:'Auditor',email:'auditor@mtcgs.edu.ph',password:'password',role:'auditor',branch:'All Branches',status:'active',initials:'CA'},
        {id:7,fname:'Admin',lname:'Officer',email:'admin@mtcgs.edu.ph',password:'password',role:'admin',branch:'Patnubay',status:'active',initials:'AO'},
        {id:8,fname:'LIS',lname:'Head',email:'lis@mtcgs.edu.ph',password:'password',role:'lis',branch:'Patnubay',status:'active',initials:'LH'},
      ]);
      DB.set('students',[
        {id:1,lrn:'100234567890',fname:'Ana',lname:'Mabasa',grade:'11',section:'STEM-A',strand:'STEM',branch:'Patnubay',sy:'2025-2026',status:'enrolled',balance:12400,voucher:'SHS',voucherAmt:22400,discount:'none'},
        {id:2,lrn:'100234567891',fname:'Carlo',lname:'Reyes',grade:'12',section:'ABM-A',strand:'ABM',branch:'Patnubay',sy:'2025-2026',status:'enrolled',balance:8750,voucher:'SHS',voucherAmt:22400,discount:'none'},
        {id:3,lrn:'100234567892',fname:'Diana',lname:'Lim',grade:'11',section:'HUMSS-A',strand:'HUMSS',branch:'Patnubay',sy:'2025-2026',status:'enrolled',balance:6200,voucher:'SHS',voucherAmt:22400,discount:'sibling'},
        {id:4,lrn:'100234567893',fname:'Ramon',lname:'Santos',grade:'10',section:'10-A',strand:'JHS',branch:'Patnubay',sy:'2025-2026',status:'enrolled',balance:3500,voucher:'ESC',voucherAmt:18500,discount:'none'},
        {id:5,lrn:'100234567894',fname:'Frances',lname:'Garcia',grade:'12',section:'AD-A',strand:'Arts & Design',branch:'Patnubay',sy:'2025-2026',status:'enrolled',balance:15000,voucher:'SHS',voucherAmt:22400,discount:'none'},
        {id:6,lrn:'100234567895',fname:'Kevin',lname:'Villanueva',grade:'7',section:'7-A',strand:'JHS',branch:'Patnubay',sy:'2025-2026',status:'enrolled',balance:0,voucher:'ESC',voucherAmt:18500,discount:'none'},
        {id:7,lrn:'100234567896',fname:'Sophia',lname:'Tan',grade:'9',section:'9-B',strand:'JHS',branch:'Noveleta',sy:'2025-2026',status:'enrolled',balance:2200,voucher:'ESC',voucherAmt:18500,discount:'alumni'},
        {id:8,lrn:'100234567897',fname:'Miguel',lname:'Flores',grade:'11',section:'TVL-A',strand:'TVL',branch:'Patnubay',sy:'2025-2026',status:'enrolled',balance:4800,voucher:'SHS',voucherAmt:22400,discount:'honor'},
      ]);
      DB.set('payments',[
        {id:1,studentId:1,studentName:'Mabasa, Ana',amount:14500,channel:'cash',type:'tuition',orNum:'2025-05-1821',date:'2025-05-22',notes:'Partial payment May',branch:'Patnubay',by:'Maria Santos'},
        {id:2,studentId:6,studentName:'Villanueva, Kevin',amount:5000,channel:'gcash',type:'enrollment',orNum:'2025-05-1820',date:'2025-05-22',notes:'Upon enrollment fee',branch:'Patnubay',by:'Maria Santos'},
        {id:3,studentId:2,studentName:'Reyes, Carlo',amount:8000,channel:'bank',type:'tuition',orNum:'2025-05-1819',date:'2025-05-21',notes:'',branch:'Patnubay',by:'Maria Santos'},
        {id:4,studentId:4,studentName:'Santos, Ramon',amount:3500,channel:'cash',type:'misc',orNum:'2025-05-1818',date:'2025-05-21',notes:'Miscellaneous fees',branch:'Patnubay',by:'Maria Santos'},
      ]);
      DB.set('audit',[
        {id:1,action:'Payment posted',table:'payments',recordId:1,user:'Maria Santos',ts:'May 22, 10:42 AM',detail:'OR #2025-05-1821 - ₱14,500 - Mabasa, Ana'},
        {id:2,action:'Student enrolled',table:'students',recordId:6,user:'Jose Reyes',ts:'May 22, 9:15 AM',detail:'Villanueva, Kevin - Grade 7'},
        {id:3,action:'OR voided',table:'payments',recordId:0,user:'Maria Santos',ts:'May 21, 4:58 PM',detail:'OR #2025-05-1817 - voided after approval'},
      ]);
      DB.set('pending_users',[
        {id:101,fname:'Teresa',lname:'Macaraeg',email:'t.macaraeg@mtcgs.edu.ph',role:'registrar',branch:'Noveleta',password:'password123',ts:'2025-05-21'},
      ]);
      DB.set('timetables',[]);
      DB.set('notifications',[
        {id:1,msg:'Garcia, Frances - balance ₱15,000 overdue 62 days',type:'alert',read:false,ts:'May 22, 8:00 AM'},
        {id:2,msg:'14 students pending voucher verification',type:'info',read:false,ts:'May 22, 7:30 AM'},
        {id:3,msg:'New registration request: Teresa Macaraeg',type:'info',read:false,ts:'May 21, 4:00 PM'},
      ]);
      DB.set('seeded',true);
    }
    
    /* ── SESSION ── */
    let SESSION={user:null};
    const currentUser=()=>SESSION.user;
    
    /* ── ROLE CONFIGS ── */
    const ROLE_LABELS={cashier:'Cashier',accountant:'Accountant',parent:'Parent / Student',finance:'Finance Officer',admin:'Admin Officer',registrar:'Registrar',lis:'LIS Head',branch:'Branch Head',auditor:'Auditor',president:'President / BoT',teacher:'Teacher'};
    const ROLE_NAV={
      cashier:[{s:'Overview',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'collections',l:'Collections',i:'dollar'},{id:'receipts',l:'Official Receipts',i:'clipboard'},{id:'soa',l:'Statement of Accounts',i:'list'}]}],
      accountant:[{s:'Overview',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'collections',l:'Collections',i:'dollar'},{id:'receivables',l:'Receivables',i:'file-text'},{id:'receipts',l:'Official Receipts',i:'clipboard'}]},{s:'Reports',items:[{id:'daily-cash',l:'Daily Cash Report',i:'briefcase'},{id:'aging',l:'Aging Receivables',i:'activity'},{id:'audit',l:'Audit Trail',i:'shield'}]}],
      parent:[{s:'My Child',items:[{id:'dashboard',l:'Balance & Payments',i:'grid'}]}],
      finance:[
        {s:'Overview',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'collections',l:'Collections',i:'dollar',b:'3'},{id:'receivables',l:'Receivables',i:'file-text'},{id:'receipts',l:'Official Receipts',i:'clipboard'}]},
        {s:'Students',items:[{id:'soa',l:'Statement of Accounts',i:'list'},{id:'vouchers',l:'Vouchers & Grants',i:'tag'},{id:'discounts',l:'Discounts',i:'smile'}]},
        {s:'Reports',items:[{id:'daily-cash',l:'Daily Cash Report',i:'briefcase'},{id:'aging',l:'Aging Receivables',i:'activity'},{id:'audit',l:'Audit Trail',i:'shield'}]},
      ],
      registrar:[
        {s:'Enrollment',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'enroll',l:'Enrollment',i:'user-plus',b:'NEW'},{id:'students',l:'Student Records',i:'users'},{id:'requirements',l:'Requirements',i:'check-circle'}]},
        {s:'Records',items:[{id:'lis',l:'LIS / EBEIS Export',i:'download'},{id:'soa',l:'Statement of Accounts',i:'list'},{id:'vouchers',l:'Vouchers & Grants',i:'tag'}]},
        {s:'Reports',items:[{id:'sf-reports',l:'SF1–SF10 Reports',i:'file-text'},{id:'audit',l:'Audit Trail',i:'shield'}]},
      ],
      branch:[
        {s:'Overview',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'students',l:'Student Records',i:'users'},{id:'timetable',l:'AI Timetable',i:'calendar',b:'AI'},{id:'collections',l:'Collections',i:'dollar'},{id:'receivables',l:'Receivables',i:'file-text'}]},
        {s:'Management',items:[{id:'enroll',l:'Enrollment',i:'user-plus'},{id:'soa',l:'Statement of Accounts',i:'list'},{id:'vouchers',l:'Vouchers & Grants',i:'tag'},{id:'discounts',l:'Discounts',i:'smile'}]},
        {s:'Reports',items:[{id:'daily-cash',l:'Daily Cash Report',i:'briefcase'},{id:'sf-reports',l:'SF Reports',i:'file-text'},{id:'audit',l:'Audit Trail',i:'shield'}]},
        {s:'Admin',items:[{id:'user-mgmt',l:'User Management',i:'user-check'}]},
      ],
      president:[
        {s:'Executive',items:[{id:'dashboard',l:'Executive Dashboard',i:'grid'},{id:'multi-branch',l:'Multi-Branch View',i:'map'},{id:'collections',l:'All Collections',i:'dollar'},{id:'aging',l:'Aging Receivables',i:'activity'}]},
        {s:'Reports',items:[{id:'daily-cash',l:'Cash Position',i:'briefcase'},{id:'audit',l:'Audit Trail',i:'shield'},{id:'sf-reports',l:'DepEd Reports',i:'file-text'}]},
        {s:'System',items:[{id:'user-mgmt',l:'User Management',i:'user-check'}]},
      ],
      teacher:[
        {s:'My Classes',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'timetable',l:'My Timetable',i:'calendar'},{id:'students',l:'My Students',i:'users'}]},
        {s:'Records',items:[{id:'sf-reports',l:'Class Records',i:'file-text'},{id:'audit',l:'Activity Log',i:'shield'}]},
      ],
      lis:[
        {s:'LIS',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'students',l:'Student Records',i:'users'},{id:'lis',l:'LIS / EBEIS Export',i:'download'},{id:'enroll',l:'Enrollment',i:'user-plus'}]},
        {s:'Reports',items:[{id:'sf-reports',l:'SF1–SF10 Reports',i:'file-text'},{id:'audit',l:'Audit Trail',i:'shield'}]},
      ],
      auditor:[
        {s:'Read-Only Access',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'collections',l:'Collections',i:'dollar'},{id:'receipts',l:'Official Receipts',i:'clipboard'},{id:'audit',l:'Audit Trail',i:'shield'},{id:'aging',l:'Aging Receivables',i:'activity'},{id:'daily-cash',l:'Daily Cash Report',i:'briefcase'}]},
      ],
      admin:[
        {s:'Admin',items:[{id:'dashboard',l:'Dashboard',i:'grid'},{id:'students',l:'Student Records',i:'users'},{id:'enroll',l:'Enrollment',i:'user-plus'},{id:'collections',l:'Collections',i:'dollar'},{id:'soa',l:'Statement of Accounts',i:'list'},{id:'user-mgmt',l:'User Management',i:'user-check'},{id:'audit',l:'Audit Trail',i:'shield'}]},
      ],
    };
    
    /* ── SVG ICONS ── */
    const ICONS={
      grid:`<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>`,
      dollar:`<line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>`,
      'file-text':`<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>`,
      clipboard:`<path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="12" y2="16"/>`,
      list:`<line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/>`,
      tag:`<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`,
      smile:`<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>`,
      briefcase:`<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>`,
      activity:`<polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>`,
      shield:`<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>`,
      'user-check':`<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><polyline points="17 11 19 13 23 9"/>`,
      'user-plus':`<path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/>`,
      users:`<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
      download:`<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
      calendar:`<rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>`,
      map:`<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>`,
      'check-circle':`<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`,
      'alert-triangle':`<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`,
      'trending-up':`<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
      printer:`<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>`,
      edit:`<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
      trash:`<polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`,
      eye:`<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>`,
      plus:`<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
    };
    const ic=(n)=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[n]||''}</svg>`;
    
    /* ── HELPERS ── */
    const now=()=>new Date().toLocaleString('en-PH',{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'});
    const peso=(n)=>'₱'+Number(n||0).toLocaleString('en-PH',{minimumFractionDigits:0});
    const initials=(s)=>{const p=s.trim().split(' ');return(p[0][0]+(p[p.length-1][0])).toUpperCase()};
    const statusBadge=(b)=>b<=0?'<span class="badge bg-green">Paid</span>':b>10000?'<span class="badge bg-red">Overdue</span>':'<span class="badge bg-warn">Pending</span>';
    function auditLog(action,table,recordId,detail){
      const u=currentUser();
      DB.push('audit',{id:DB.nextId('audit'),action,table,recordId,user:u?`${u.fname} ${u.lname}`:'System',ts:now(),detail});
      /* Keep the Branch Head in the loop on activity in their branch (skip if they did it themselves) */
      if(!u||u.role==='branch')return;
      const msg=`${action}: ${detail}`;
      if(u.branch==='All Branches'){notifyBranchHead('Patnubay',msg);notifyBranchHead('Noveleta',msg)}
      else if(u.branch)notifyBranchHead(u.branch,msg);
    }
    function filterRows(inputId,tableId){const q=document.getElementById(inputId)?.value?.toLowerCase()||'';document.querySelectorAll(`#${tableId} tbody tr`).forEach(r=>{r.style.display=r.textContent.toLowerCase().includes(q)?'':'none'})}
    function showScreen(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active')}
    let _opener=null;
    function openModal(id){const m=document.getElementById(id);_opener=document.activeElement;m.setAttribute('role','dialog');m.setAttribute('aria-modal','true');const t=m.querySelector('.modal-title');if(t){t.id=t.id||id+'-t';m.setAttribute('aria-labelledby',t.id)}m.classList.add('open');a11yPass();setTimeout(()=>{(m.querySelector('input:not([readonly]):not([type=hidden]),select,textarea,.modal-close')||m).focus()},30)}
    function closeModal(id){document.getElementById(id).classList.remove('open');if(_opener&&document.contains(_opener))_opener.focus()}
    document.addEventListener('click',e=>{if(e.target.classList.contains('modal-overlay'))e.target.classList.remove('open')});
    
    /* ── AUTH ── */
    function quickLogin(role){document.getElementById('l-email').value=role+'@mtcgs.edu.ph';document.getElementById('l-pwd').value='password';doLogin()}
    function doLogin(){
      const email=document.getElementById('l-email').value.trim();
      const pwd=document.getElementById('l-pwd').value;
      const btn=document.getElementById('l-btn');
      document.querySelectorAll('.form-error').forEach(e=>e.classList.remove('show'));
      if(!email){document.getElementById('l-email-err').classList.add('show');return}
      if(!pwd){document.getElementById('l-pwd-err').textContent='Please enter your password';document.getElementById('l-pwd-err').classList.add('show');return}
      btn.textContent='Signing in…';btn.classList.add('loading');
      setTimeout(()=>{
        const users=DB.get('users')||[];
        const user=users.find(u=>u.email===email&&u.password===pwd&&u.status==='active');
        if(!user){btn.textContent='Sign in to System';btn.classList.remove('loading');document.getElementById('l-pwd-err').textContent='Invalid email or password';document.getElementById('l-pwd-err').classList.add('show');return}
        SESSION.user=user;
        auditLog('User signed in','users',user.id,`${user.fname} ${user.lname} (${user.role})`);
        btn.textContent='Sign in to System';btn.classList.remove('loading');
        showLoginLoading(user);
      },750);
    }
    function showLoginLoading(user){
      const ov=document.getElementById('login-loading-overlay');
      const txt=document.getElementById('lload-text');
      if(txt)txt.textContent=`Welcome, ${user.fname}. Preparing your dashboard…`;
      if(ov)ov.classList.add('show');
      setTimeout(()=>{
        launchApp(user);
        if(ov)ov.classList.remove('show');
      },900);
    }
    function doRegister(){
      if(!document.getElementById('r-consent')?.checked){const er=document.getElementById('r-err');er.textContent='Please tick the box to confirm you have read the Privacy Policy and Terms.';er.classList.add('show');return}
      const fname=document.getElementById('r-fname').value.trim();
      const lname=document.getElementById('r-lname').value.trim();
      const email=document.getElementById('r-email').value.trim();
      const role=document.getElementById('r-role').value;
      const branch=document.getElementById('r-branch').value;
      const pwd=document.getElementById('r-pwd').value;
      const pwd2=document.getElementById('r-pwd2').value;
      const errEl=document.getElementById('r-err');
      errEl.style.display='none';
      if(!fname||!lname||!email||!role||!branch||!pwd){errEl.textContent='Please fill in all fields';errEl.style.display='block';return}
      if(pwd!==pwd2){errEl.textContent='Passwords do not match';errEl.style.display='block';return}
      const users=DB.get('users')||[];
      if(users.find(u=>u.email===email)){errEl.textContent='This email is already registered';errEl.style.display='block';return}
      const btn=document.getElementById('r-btn');
      btn.textContent='Submitting…';btn.classList.add('loading');
      setTimeout(()=>{
        DB.push('pending_users',{id:DB.nextId('pending_users'),fname,lname,email,role,branch,password:pwd,ts:new Date().toISOString().slice(0,10)});
        DB.push('notifications',{id:DB.nextId('notifications'),msg:`New registration request: ${fname} ${lname} (${ROLE_LABELS[role]||role})`,type:'info',read:false,ts:now()});
        btn.textContent='Submit Registration Request';btn.classList.remove('loading');
        alert(`Registration submitted!\n\n${fname}, your account is pending approval from a Branch Head. You'll be notified once approved.`);
        showScreen('login-screen');
      },700);
    }
    function doLogout(){
      if(currentUser()) auditLog('User signed out','users',currentUser().id,`${currentUser().fname} ${currentUser().lname}`);
      SESSION.user=null;
      document.getElementById('app-screen').style.display='none';
      document.getElementById('login-loading-overlay')?.classList.remove('show');
      showScreen('login-screen');
      document.getElementById('l-btn').textContent='Sign in to System';
      document.getElementById('l-btn').classList.remove('loading');
      document.getElementById('l-email').value='';
      document.getElementById('l-pwd').value='';
    }
    
    /* ── APP LAUNCH ── */
    function launchApp(user){
      document.getElementById('login-screen').classList.remove('active');
      const app=document.getElementById('app-screen');
      app.style.display='block';
      const initl=user.initials||user.fname[0]+user.lname[0];
      document.getElementById('sb-av').textContent=initl;
      document.getElementById('sb-name').textContent=user.fname+' '+user.lname;
      document.getElementById('sb-role').textContent=ROLE_LABELS[user.role]||user.role;
      document.getElementById('sb-branch-name').textContent=user.branch;
      document.getElementById('topbar-av').textContent=initl;
      buildSidebar(user.role);
      loadNotifications();
      navigate('dashboard');
    }
    
    function buildSidebar(role){
      const nav=ROLE_NAV[role]||ROLE_NAV.finance;
      document.getElementById('sidebar-nav').innerHTML=nav.map(section=>`
        <div class="sb-section"><div class="sb-lbl">${section.s}</div>
        ${section.items.map(item=>`
          <div class="nav-item" id="nav-${item.id}" onclick="navigate('${item.id}')" data-page="${item.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${ICONS[item.i]||''}</svg>
            ${item.l}${item.b?`<span class="nav-badge">${item.b}</span>`:''}
          </div>`).join('')}
        </div>`).join('');
    }
    
    let currentPage='';
    const PAGE_TITLES={dashboard:'Dashboard','multi-branch':'Multi-Branch Overview',collections:'Collections',receivables:'Accounts Receivable',receipts:'Official Receipts',soa:'Statement of Accounts',vouchers:'Vouchers & Grants',discounts:'Discounts & Scholarships','daily-cash':'Daily Cash Report',aging:'Aging Receivables',audit:'Audit Trail',students:'Student Records',enroll:'Enrollment',requirements:'Requirements Checklist',lis:'LIS / EBEIS Export','sf-reports':'SF Reports','user-mgmt':'User Management',timetable:'AI Timetable Generator',profile:'My Profile'};
    
    function navigate(page){
      currentPage=page;
      document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
      const active=document.getElementById('nav-'+page);
      if(active) active.classList.add('active');
      document.getElementById('page-title').textContent=PAGE_TITLES[page]||page;
      const mc=document.getElementById('main-content');
      mc.classList.remove('page-enter');
      mc.innerHTML=renderSkeleton();
      const pages={dashboard:renderDashboard,collections:renderCollections,receivables:renderReceivables,receipts:renderReceipts,soa:renderSOA,vouchers:renderVouchers,discounts:renderDiscounts,'daily-cash':renderDailyCash,aging:renderAging,audit:renderAudit,students:renderStudents,enroll:renderEnroll,requirements:renderRequirements,lis:renderLIS,'sf-reports':renderSFReports,'user-mgmt':renderUserMgmt,timetable:renderTimetablePage,'multi-branch':renderMultiBranch,profile:renderProfile};
      const fn=pages[page];
      setTimeout(()=>{
        if(!currentUser())return; /* signed out during the skeleton delay */
        if(fn) fn();
        else document.getElementById('main-content').innerHTML=`<div class="empty-state">${ic('grid')}<h3>Coming soon</h3><p>This section is under development.</p></div>`;
        void mc.offsetWidth;mc.classList.add('page-enter');a11yPass();
      },220);
    }
    function renderSkeleton(){
      return `<div class="skel-stats">${Array.from({length:4}).map(()=>`<div class="skel-stat-card"><div class="skel"></div><div class="skel"></div></div>`).join('')}</div>
      <div class="skel-card">${Array.from({length:5}).map(()=>`<div class="skel skel-line"></div>`).join('')}</div>`;
    }
    
    function toggleSidebar(){
      const sb=document.getElementById('sidebar');
      const isClosed=sb.style.transform==='translateX(-100%)';
      sb.style.transform=isClosed?'':'translateX(-100%)';
      document.querySelector('.main-area').style.marginLeft=isClosed?'var(--sw)':'0';
    }
    
    /* ── NOTIFICATIONS ── */
    /* Notifications can be global (no forRole) or targeted (e.g. at the Branch Head of a specific branch) */
    function notifVisible(n,u){
      if(!n.forRole)return true;
      if(!u)return false;
      if(n.forRole!==u.role)return false;
      if(n.forBranch&&n.forBranch!=='All Branches'&&u.branch!==n.forBranch&&u.branch!=='All Branches')return false;
      return true;
    }
    function notifyBranchHead(branch,msg){
      if(!branch)return;
      DB.push('notifications',{id:DB.nextId('notifications'),msg,type:'info',read:false,ts:now(),forRole:'branch',forBranch:branch});
      loadNotifications();
    }
    function loadNotifications(){
      const u=currentUser();
      const notifs=(DB.get('notifications')||[]).filter(n=>notifVisible(n,u));
      const unread=notifs.filter(n=>!n.read);
      const dot=document.querySelector('.notif-dot');
      if(dot) dot.style.display=unread.length?'':'none';
      const list=document.getElementById('notif-list');
      if(!list) return;
      if(!notifs.length){list.innerHTML='<div style="padding:1rem;text-align:center;color:var(--text-3);font-size:13px">No notifications</div>';return}
      list.innerHTML=notifs.slice().reverse().map(n=>`<div class="notif-item${n.read?'':' notif-unread'}"><div class="notif-msg">${n.forRole?'👤 ':''}${n.msg}</div><div class="notif-time">${n.ts}</div></div>`).join('');
    }
    function toggleNotif(){const d=document.getElementById('notif-dropdown');d.style.display=d.style.display==='none'?'block':'none'}
    function markAllRead(e){
      e.stopPropagation();
      const u=currentUser();
      DB.set('notifications',(DB.get('notifications')||[]).map(n=>notifVisible(n,u)?{...n,read:true}:n));
      loadNotifications();
      document.getElementById('notif-dropdown').style.display='none';
    }
    document.addEventListener('click',e=>{const btn=document.getElementById('notif-btn');const drop=document.getElementById('notif-dropdown');if(drop&&btn&&!btn.contains(e.target)&&drop.style.display!=='none')drop.style.display='none'});
    
    /* ═══ PAGE RENDERS ═══ */
    function renderParentDashboard(){
      const u=currentUser();const s=(DB.get('students')||[]).find(x=>x.id===u.studentId);
      const pays=(DB.get('payments')||[]).filter(p=>p.studentId===u.studentId);
      document.getElementById('main-content').innerHTML=!s?'<div class="empty-state"><h3>No student linked</h3><p>Ask the school office to link your account to your child.</p></div>':`
      <div class="stats-grid fade-up"><div class="stat-card sc-gold"><div class="stat-label">Student</div><div class="stat-val" style="font-size:18px">${s.fname} ${s.lname}</div><div class="stat-change sc-neutral">Grade ${s.grade} · ${s.branch}</div></div>
      <div class="stat-card ${s.balance>0?'sc-red':'sc-green'}"><div class="stat-label">Outstanding balance</div><div class="stat-val">${peso(s.balance)}</div></div></div>
      <div class="card fade-up d2"><div class="card-header"><div class="card-title">Payment history</div></div><div class="card-body"><table class="data-table"><caption class="sr-only">Payments for ${s.fname} ${s.lname}</caption><thead><tr><th scope="col">Date</th><th scope="col">Type</th><th scope="col">Channel</th><th scope="col">Reference</th><th scope="col">Amount</th><th scope="col">Status</th></tr></thead><tbody>${pays.map(p=>`<tr><td>${p.date}</td><td>${p.type}</td><td>${p.channel}</td><td>${p.ref||'—'}</td><td>${peso(p.amount)}</td><td>${p.status==='pending'?'Pending verification':'Verified'}</td></tr>`).join('')||'<tr><td colspan="6">No payments recorded yet.</td></tr>'}</tbody></table></div></div>`;
    }
    function renderDashboard(){
      const role=currentUser().role;
      if(role==='teacher'){renderTeacherDashboard();return}
      if(role==='parent'){renderParentDashboard();return}
      const students=DB.get('students')||[];
      const payments=DB.get('payments')||[];
      const audit=DB.get('audit')||[];
      const totalColl=payments.reduce((s,p)=>s+p.amount,0);
      const totalBal=students.reduce((s,st)=>s+st.balance,0);
      const enrolled=students.filter(s=>s.status==='enrolled').length;
      const vouchers=students.filter(s=>s.voucher).length;
      const overdue=students.filter(s=>s.balance>10000).length;
      const isReadOnly=['auditor','accountant','parent'].includes(role);
      document.getElementById('main-content').innerHTML=`
      <div class="stats-grid fade-up">
        <div class="stat-card sc-gold d1"><div class="stat-icon si-gold">${ic('dollar')}</div><div class="stat-label">Total Collections</div><div class="stat-val">${peso(totalColl)}</div><div class="stat-change sc-up">${ic('trending-up')} +12.4% vs last month</div></div>
        <div class="stat-card sc-navy d2"><div class="stat-icon si-navy">${ic('file-text')}</div><div class="stat-label">Outstanding Receivables</div><div class="stat-val">${peso(totalBal)}</div><div class="stat-change sc-dn">${ic('alert-triangle')} ${overdue} accounts overdue</div></div>
        <div class="stat-card sc-green d3"><div class="stat-icon si-green">${ic('users')}</div><div class="stat-label">Enrolled Students</div><div class="stat-val">${enrolled}</div><div class="stat-change sc-up">${ic('trending-up')} S.Y. 2025–2026</div></div>
        <div class="stat-card sc-red d4"><div class="stat-icon si-red">${ic('tag')}</div><div class="stat-label">Active Vouchers</div><div class="stat-val">${vouchers}</div><div class="stat-change sc-neutral">ESC + SHS grantees</div></div>
      </div>
      <div class="grid-2 fade-up d2">
        <div class="card">
          <div class="card-header"><div><div class="card-title">Monthly Collections</div><div class="card-sub">S.Y. 2025–2026 · All branches</div></div><div class="tab-row"><button class="tab-btn active">Monthly</button><button class="tab-btn">Quarterly</button></div></div>
          <div class="card-body">
            <div class="bar-chart" id="dash-chart"></div>
            <div style="margin-top:.75rem;display:flex;gap:1.25rem">
              <div style="display:flex;align-items:center;gap:.35rem;font-size:11px;color:var(--text-3)"><div style="width:10px;height:10px;background:var(--gold);border-radius:2px"></div>Collected</div>
              <div style="display:flex;align-items:center;gap:.35rem;font-size:11px;color:var(--text-3)"><div style="width:10px;height:10px;background:var(--gold-pale);border:1px solid var(--gold-light);border-radius:2px"></div>Target</div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Payment Channels</div><span class="badge bg-gold">This month</span></div>
          <div class="card-body">
            <div style="font-family:var(--font-serif);font-size:24px;font-weight:600;color:var(--navy);margin-bottom:.2rem">${peso(totalColl)}</div>
            <div style="font-size:12px;color:var(--text-3);margin-bottom:.85rem">Total collected</div>
            <div class="breakdown-item"><div class="bd-dot" style="background:var(--gold)"></div><div class="bd-label">Cash (Cashier)</div><div class="bd-val">${peso(Math.round(totalColl*.51))}</div><div class="bd-pct">51%</div></div>
            <div class="breakdown-item"><div class="bd-dot" style="background:var(--navy)"></div><div class="bd-label">GCash</div><div class="bd-val">${peso(Math.round(totalColl*.33))}</div><div class="bd-pct">33%</div></div>
            <div class="breakdown-item"><div class="bd-dot" style="background:var(--green)"></div><div class="bd-label">Bank Transfer</div><div class="bd-val">${peso(Math.round(totalColl*.16))}</div><div class="bd-pct">16%</div></div>
          </div>
        </div>
      </div>
      <div class="grid-2 fade-up d3">
        <div class="card">
          <div class="card-header"><div class="card-title">Outstanding Accounts</div><button class="link-btn" onclick="navigate('receivables')">View all →</button></div>
          <div class="card-body">
            <div class="filter-bar" style="margin-bottom:.75rem">
              <div class="search-box">${ic('eye')}<input id="dash-search" type="text" placeholder="Search student…" oninput="filterRows('dash-search','dash-table')"/></div>
            </div>
            <table class="data-table" id="dash-table">
              <thead><tr><th>Student</th><th>Grade</th><th>Balance</th><th>Status</th><th></th></tr></thead>
              <tbody>${students.slice(0,6).map(s=>`
                <tr onclick="openStudentDetail(${s.id})">
                  <td><div style="display:flex;align-items:center;gap:.45rem"><div class="stu-av">${initials(s.fname+' '+s.lname)}</div><div><div class="td-bold">${s.lname}, ${s.fname}</div><div class="td-muted">${s.strand}</div></div></div></td>
                  <td>G${s.grade}</td>
                  <td style="font-weight:500;color:${s.balance>10000?'var(--red)':s.balance>0?'var(--warn)':'var(--green)'}">${peso(s.balance)}</td>
                  <td>${statusBadge(s.balance)}</td>
                  <td>${!isReadOnly?`<button class="btn-primary btn-sm" onclick="event.stopPropagation();openPayment(${s.id})">Pay</button>`:''}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
        <div class="stack">
          <div class="card">
            <div class="card-header"><div class="card-title">Recent Activity</div><span class="badge bg-navy">Today</span></div>
            <div class="card-body-sm">
              ${audit.slice(-4).reverse().map(a=>`
              <div class="activity-item">
                <div class="act-icon ${a.action.includes('Payment')?'ai-pay':a.action.includes('enroll')?'ai-enroll':a.action.includes('void')?'ai-alert':'ai-info'}">${ic(a.action.includes('Payment')?'dollar':a.action.includes('enroll')?'user-plus':a.action.includes('void')?'alert-triangle':'shield')}</div>
                <div><div class="act-main">${a.detail}</div><div class="act-time">${a.ts} · ${a.user}</div></div>
              </div>`).join('')}
            </div>
          </div>
          <div class="card">
            <div class="card-header"><div class="card-title">LGU Voucher Tracking</div><span class="badge bg-gold">2025–2026</span></div>
            <div class="card-body">
              <div class="voucher-row"><div class="vou-label">ESC Voucher (JHS)</div><div><div class="vou-amt">₱18,500/yr</div><div class="vou-sub">342 grantees</div></div></div>
              <div class="voucher-row"><div class="vou-label">SHS Voucher</div><div><div class="vou-amt">₱22,400/yr</div><div class="vou-sub">276 grantees</div></div></div>
              <div class="alert-box alert-warn" style="margin-top:.5rem"><p>⚠ 14 students pending voucher verification</p><small>School processing applications per enrollment policy</small></div>
            </div>
          </div>
        </div>
      </div>
      ${!isReadOnly?`<div style="display:flex;gap:.65rem;flex-wrap:wrap;margin-top:.5rem" class="fade-up d4">
        <button class="btn-gold" onclick="openPaymentModal()">+ Record Payment</button>
        ${['branch','admin','registrar','lis'].includes(role)?`<button class="btn-primary" onclick="navigate('enroll')">+ Enroll Student</button>`:''}
        ${['branch','teacher'].includes(role)?`<button class="btn-outline" onclick="navigate('timetable')">✦ AI Timetable</button>`:''}
        ${role==='branch'||role==='president'?`<button class="btn-outline" onclick="navigate('multi-branch')">Multi-Branch View</button>`:''}
      </div>`:''}`;
      buildBarChart('dash-chart');
    }
    
    function renderTeacherDashboard(){
      const students=DB.get('students')||[];
      const mine=students.filter(s=>s.branch===currentUser().branch);
      document.getElementById('main-content').innerHTML=`
      <div class="stats-grid fade-up">
        <div class="stat-card sc-gold"><div class="stat-icon si-gold">${ic('users')}</div><div class="stat-label">My Students</div><div class="stat-val">${mine.length}</div></div>
        <div class="stat-card sc-green"><div class="stat-icon si-green">${ic('check-circle')}</div><div class="stat-label">Fully Paid</div><div class="stat-val">${mine.filter(s=>s.balance<=0).length}</div></div>
        <div class="stat-card sc-navy"><div class="stat-icon si-navy">${ic('calendar')}</div><div class="stat-label">Classes Today</div><div class="stat-val">6</div></div>
        <div class="stat-card sc-red"><div class="stat-icon si-red">${ic('alert-triangle')}</div><div class="stat-label">With Balance</div><div class="stat-val">${mine.filter(s=>s.balance>0).length}</div></div>
      </div>
      <div class="grid-2 fade-up d2">
        <div class="card">
          <div class="card-header"><div class="card-title">Today's Schedule</div><button class="btn-outline btn-sm" onclick="navigate('timetable')">Full Timetable</button></div>
          <div class="card-body"><div class="tt-grid" id="teacher-mini-tt" style="grid-template-columns:70px repeat(5,1fr)"></div></div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">My Students</div></div>
          <div class="card-body">
            <table class="data-table"><thead><tr><th>Name</th><th>Grade</th><th>Balance</th></tr></thead>
            <tbody>${mine.map(s=>`<tr><td class="td-bold">${s.lname}, ${s.fname}</td><td>G${s.grade}</td><td>${statusBadge(s.balance)}</td></tr>`).join('')}</tbody></table>
          </div>
        </div>
      </div>`;
      buildMiniTeacherTT();
    }
    
    function verifyPayment(pid){
      if(!['finance','accountant','branch'].includes(currentUser().role))return;
      const p=(DB.get('payments')||[]).find(x=>x.id===pid);if(!p||p.status!=='pending'||p.byId===currentUser().id)return;
      if(!confirm(`Confirm that ${peso(p.amount)} (${p.channel}, ref ${p.ref}) was received?`))return;
      DB.update('payments',pid,{status:'verified'});
      const s=(DB.get('students')||[]).find(x=>x.id===p.studentId);
      if(s)DB.update('students',s.id,{balance:Math.max(0,s.balance-p.amount)});
      auditLog('Payment verified','payments',pid,`${peso(p.amount)} ref ${p.ref} verified by ${currentUser().fname} ${currentUser().lname}`);
      navigate('collections');
    }
    function exportPayments(){
      const rows=[['OR #','Student','Amount','Channel','Reference','Status','Type','Date','Recorded by']].concat((DB.get('payments')||[]).map(p=>[p.orNum,p.studentName,p.amount,p.channel,p.ref||'',p.status||'verified',p.type,p.date,p.by]));
      downloadCSV('mtcgs-collections.csv',rows);auditLog('Report downloaded','payments',0,'Collections CSV');
    }
    function downloadCSV(name,rows){
      const cell=v=>{v=String(v==null?'':v);if(/^[=+\-@]/.test(v))v="'"+v;return '"'+v.replace(/"/g,'""')+'"'};
      const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([rows.map(r=>r.map(cell).join(',')).join('\r\n')],{type:'text/csv'}));
      a.download=name;a.click();URL.revokeObjectURL(a.href);
    }
    function renderCollections(){
      const payments=DB.get('payments')||[];
      const total=payments.reduce((s,p)=>s+p.amount,0);
      const isReadOnly=['auditor','accountant','parent'].includes(currentUser().role);
      document.getElementById('main-content').innerHTML=`
      <div class="stats-grid fade-up">
        <div class="stat-card sc-gold"><div class="stat-icon si-gold">${ic('dollar')}</div><div class="stat-label">Total Collected</div><div class="stat-val">${peso(total)}</div></div>
        <div class="stat-card sc-navy"><div class="stat-icon si-navy">${ic('briefcase')}</div><div class="stat-label">Cash</div><div class="stat-val">${peso(payments.filter(p=>p.channel==='cash').reduce((s,p)=>s+p.amount,0))}</div></div>
        <div class="stat-card sc-green"><div class="stat-icon si-green">${ic('activity')}</div><div class="stat-label">GCash</div><div class="stat-val">${peso(payments.filter(p=>p.channel==='gcash').reduce((s,p)=>s+p.amount,0))}</div></div>
        <div class="stat-card sc-blue"><div class="stat-icon si-blue">${ic('trending-up')}</div><div class="stat-label">Bank Transfer</div><div class="stat-val">${peso(payments.filter(p=>p.channel==='bank').reduce((s,p)=>s+p.amount,0))}</div></div>
      </div>
      <div class="card fade-up d2">
        <div class="card-header"><div class="card-title">All Payments</div>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap">
            ${!isReadOnly?`<button class="btn-primary btn-sm" onclick="openPaymentModal()">+ Record Payment</button>`:''}
            <button class="btn-outline btn-sm" onclick="exportCSV()">Export CSV</button><button class="btn-outline btn-sm" onclick="exportPayments()">Download collections report</button>
          </div>
        </div>
        <div class="card-body">
          <div class="filter-bar"><div class="search-box">${ic('eye')}<input id="col-search" type="text" placeholder="Search…" oninput="filterRows('col-search','col-table')"/></div></div>
          <table class="data-table" id="col-table">
            <thead><tr><th>OR #</th><th>Student</th><th>Amount</th><th>Channel</th><th>Type</th><th>Reference</th><th>Status</th><th>Date</th><th>By</th><th></th></tr></thead>
            <tbody>${payments.slice().reverse().map(p=>`
              <tr><td class="td-bold">${p.orNum}</td><td>${p.studentName}</td>
              <td style="font-weight:600;color:var(--green)">${peso(p.amount)}</td>
              <td><span class="badge bg-navy">${p.channel}</span></td>
              <td>${p.type}</td><td class="td-muted">${p.ref||'—'}</td><td>${p.status==='pending'?'<span class="badge bg-warn">Pending</span>':'<span class="badge bg-green">Verified</span>'}</td><td class="td-muted">${p.date}</td><td class="td-muted">${p.by}</td>
              <td style="display:flex;gap:.3rem"><button class="btn-icon" onclick="showOR(${p.id})" title="View OR">${ic('printer')}</button>${p.status==='pending'&&['finance','accountant','branch'].includes(currentUser().role)&&p.byId!==currentUser().id?`<button class="btn-gold btn-sm" onclick="verifyPayment(${p.id})">Verify</button>`:''}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderReceivables(){
      const students=DB.get('students')||[];
      const wb=students.filter(s=>s.balance>0);
      document.getElementById('main-content').innerHTML=`
      <div class="stats-grid fade-up">
        <div class="stat-card sc-red"><div class="stat-icon si-red">${ic('alert-triangle')}</div><div class="stat-label">Total Receivables</div><div class="stat-val">${peso(wb.reduce((s,st)=>s+st.balance,0))}</div></div>
        <div class="stat-card sc-navy"><div class="stat-icon si-navy">${ic('users')}</div><div class="stat-label">Accounts with Balance</div><div class="stat-val">${wb.length}</div></div>
        <div class="stat-card sc-red"><div class="stat-icon si-red">${ic('alert-triangle')}</div><div class="stat-label">Overdue (>₱10k)</div><div class="stat-val">${wb.filter(s=>s.balance>10000).length}</div></div>
        <div class="stat-card sc-green"><div class="stat-icon si-green">${ic('check-circle')}</div><div class="stat-label">Fully Paid</div><div class="stat-val">${students.length-wb.length}</div></div>
      </div>
      <div class="card fade-up d2">
        <div class="card-header"><div class="card-title">Receivables by Student</div><button class="btn-outline btn-sm" onclick="exportCSV()">Export</button></div>
        <div class="card-body">
          <div class="filter-bar"><div class="search-box">${ic('eye')}<input id="rec-search" type="text" placeholder="Search…" oninput="filterRows('rec-search','rec-table')"/></div></div>
          <table class="data-table" id="rec-table">
            <thead><tr><th>Student</th><th>LRN</th><th>Grade</th><th>Strand</th><th>Balance</th><th>Voucher</th><th>Status</th><th></th></tr></thead>
            <tbody>${wb.map(s=>`
              <tr onclick="openStudentDetail(${s.id})">
                <td><div style="display:flex;align-items:center;gap:.45rem"><div class="stu-av">${initials(s.fname+' '+s.lname)}</div><div class="td-bold">${s.lname}, ${s.fname}</div></div></td>
                <td class="td-muted">${s.lrn}</td><td>G${s.grade}</td><td>${s.strand}</td>
                <td style="font-weight:600;color:${s.balance>10000?'var(--red)':'var(--warn)'}">${peso(s.balance)}</td>
                <td>${s.voucher?`<span class="badge bg-blue">${s.voucher}</span>`:'-'}</td>
                <td>${statusBadge(s.balance)}</td>
                <td><button class="btn-primary btn-sm" onclick="event.stopPropagation();openPayment(${s.id})">Record Payment</button></td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderReceipts(){
      const payments=DB.get('payments')||[];
      const isReadOnly=['auditor','accountant','parent'].includes(currentUser().role);
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up">
        <div class="card-header"><div><div class="card-title">Official Receipts Register</div><div class="card-sub">BIR-registered OR series · ${payments.length} records</div></div>
          ${!isReadOnly?`<button class="btn-primary btn-sm" onclick="openPaymentModal()">+ Issue OR</button>`:''}
        </div>
        <div class="card-body">
          <div class="filter-bar"><div class="search-box">${ic('eye')}<input id="or-search" type="text" placeholder="Search OR #…" oninput="filterRows('or-search','or-table')"/></div></div>
          <table class="data-table" id="or-table">
            <thead><tr><th>OR Number</th><th>Student</th><th>Amount</th><th>Channel</th><th>Date</th><th>Issued by</th><th>Actions</th></tr></thead>
            <tbody>${payments.slice().reverse().map(p=>`
              <tr>
                <td class="td-bold" style="font-family:var(--font-serif)">${p.orNum}</td>
                <td>${p.studentName}</td>
                <td style="color:var(--green);font-weight:600">${peso(p.amount)}</td>
                <td><span class="badge bg-navy">${p.channel}</span></td>
                <td>${p.date}</td><td class="td-muted">${p.by}</td>
                <td style="display:flex;gap:.35rem">
                  <button class="btn-icon" onclick="showOR(${p.id})" title="View">${ic('eye')}</button>
                  <button class="btn-icon" onclick="showOR(${p.id})" title="Print">${ic('printer')}</button>
                  ${!isReadOnly?`<button class="btn-icon" style="color:var(--red)" onclick="voidOR(${p.id})" title="Void">${ic('trash')}</button>`:''}
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderSOA(){
      const students=DB.get('students')||[];
      const payments=DB.get('payments')||[];
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up">
        <div class="card-header"><div class="card-title">Statement of Accounts</div><button class="btn-outline btn-sm" onclick="exportCSV()">Export All SOAs</button></div>
        <div class="card-body">
          <div class="filter-bar"><div class="search-box">${ic('eye')}<input id="soa-search" type="text" placeholder="Search student…" oninput="filterRows('soa-search','soa-table')"/></div></div>
          <table class="data-table" id="soa-table">
            <thead><tr><th>Student</th><th>Grade</th><th>Tuition</th><th>Misc</th><th>Voucher</th><th>Discount</th><th>Balance</th><th>Status</th><th></th></tr></thead>
            <tbody>${students.map(s=>{
              const tuition=parseInt(s.grade)>=11?45000:38000;const misc=3500;
              return `<tr onclick="openStudentDetail(${s.id})">
                <td><div style="display:flex;align-items:center;gap:.45rem"><div class="stu-av">${initials(s.fname+' '+s.lname)}</div><div class="td-bold">${s.lname}, ${s.fname}</div></div></td>
                <td>G${s.grade}</td><td>${peso(tuition)}</td><td>${peso(misc)}</td>
                <td>${s.voucher?`${peso(s.voucherAmt)} (${s.voucher})`:'-'}</td>
                <td>${s.discount!=='none'?`<span class="badge bg-purple">${s.discount}</span>`:'-'}</td>
                <td style="font-weight:600;color:${s.balance>0?'var(--red)':'var(--green)'}">${peso(s.balance)}</td>
                <td>${statusBadge(s.balance)}</td>
                <td><button class="btn-icon" onclick="event.stopPropagation();window.print()" title="Print SOA">${ic('printer')}</button></td>
              </tr>`;
            }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderVouchers(){
      const students=DB.get('students')||[];
      const esc=students.filter(s=>s.voucher==='ESC');
      const shs=students.filter(s=>s.voucher==='SHS');
      const isBranchHead=currentUser().role==='branch';
      document.getElementById('main-content').innerHTML=`
      <div class="stats-grid fade-up">
        <div class="stat-card sc-blue"><div class="stat-icon si-blue">${ic('tag')}</div><div class="stat-label">ESC Grantees (JHS)</div><div class="stat-val">${esc.length}</div><div class="stat-change sc-neutral">₱18,500/yr each</div></div>
        <div class="stat-card sc-gold"><div class="stat-icon si-gold">${ic('tag')}</div><div class="stat-label">SHS Voucher Grantees</div><div class="stat-val">${shs.length}</div><div class="stat-change sc-neutral">₱22,400/yr each</div></div>
        <div class="stat-card sc-red"><div class="stat-icon si-red">${ic('alert-triangle')}</div><div class="stat-label">No Voucher</div><div class="stat-val">${students.filter(s=>!s.voucher).length}</div></div>
        <div class="stat-card sc-green"><div class="stat-icon si-green">${ic('dollar')}</div><div class="stat-label">Total LGU Subsidy</div><div class="stat-val">${peso(esc.length*18500+shs.length*22400)}</div></div>
      </div>
      <div class="card fade-up d2">
        <div class="card-header"><div class="card-title">Voucher Registry</div>${isBranchHead?'<span class="badge bg-gold">You can verify vouchers</span>':''}</div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>Student</th><th>Grade</th><th>Voucher Type</th><th>Amount</th><th>Verification</th><th>Action</th></tr></thead>
            <tbody>${students.map(s=>`
              <tr><td class="td-bold">${s.lname}, ${s.fname}</td><td>G${s.grade}</td>
              <td>${s.voucher?`<span class="badge bg-blue">${s.voucher}</span>`:'<span class="badge bg-warn">Pending</span>'}</td>
              <td>${s.voucher?peso(s.voucherAmt):'-'}</td>
              <td>${!s.voucher?`<span class="badge bg-warn">No voucher</span>`:s.voucherStatus==='verified'?`<span class="badge bg-green">✓ Verified</span>`:`<span class="badge bg-warn">Unverified</span>`}</td>
              <td>${!s.voucher?`<button class="btn-primary btn-sm" onclick="assignVoucher(${s.id})">Assist Application</button>`:s.voucherStatus!=='verified'?(isBranchHead?`<button class="btn-gold btn-sm" onclick="verifyVoucher(${s.id})">Verify &amp; Set Tuition</button>`:`<span class="td-muted" style="font-size:12px">Awaiting Branch Head</span>`):''}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    function verifyVoucher(sid){
      if(currentUser().role!=='branch'){alert('Only the Branch Head can verify vouchers.');return}
      const s=(DB.get('students')||[]).find(x=>x.id===sid);if(!s)return;
      if(!confirm(`Verify the ${s.voucher} voucher for ${s.fname} ${s.lname}?`))return;
      const input=prompt(`Voucher verified. Set the adjusted tuition/balance for ${s.fname} ${s.lname}:`,s.balance);
      if(input===null)return;
      const fee=parseFloat(input);
      const updates={voucherStatus:'verified'};
      if(!isNaN(fee)&&fee>=0)updates.balance=fee;
      DB.update('students',sid,updates);
      auditLog('Voucher verified','students',sid,`${s.voucher} voucher verified for ${s.fname} ${s.lname}${!isNaN(fee)?`; tuition set to ${peso(fee)}`:''} by ${currentUser().fname} ${currentUser().lname}`);
      navigate('vouchers');
    }
    
    function renderDiscounts(){
      const students=DB.get('students')||[];
      const disc={sibling:5000,alumni:3000,honor:2000,employee:6000};
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up" style="margin-bottom:1rem">
        <div class="card-header"><div class="card-title">Discount Policy</div><span class="badge bg-gold">S.Y. 2025–2026</span></div>
        <div class="card-body">
          <div class="grid-3" style="margin-bottom:.75rem">
            ${Object.entries(disc).map(([k,v])=>`<div class="voucher-row"><div class="vou-label">${k.charAt(0).toUpperCase()+k.slice(1)} Discount</div><div><div class="vou-amt">${peso(v)}</div></div></div>`).join('')}
            <div class="voucher-row"><div class="vou-label">Full Payment (15–20% off)</div><div><div class="vou-amt">₱6,750–₱9,000</div></div></div>
          </div>
          <div class="alert-box alert-info"><p>💡 Discounts apply to specific categories only and cannot be combined.</p></div>
        </div>
      </div>
      <div class="card fade-up d2">
        <div class="card-header"><div class="card-title">Students with Discounts</div></div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>Student</th><th>Grade</th><th>Discount Type</th><th>Savings</th></tr></thead>
            <tbody>${students.filter(s=>s.discount!=='none').map(s=>`
              <tr><td class="td-bold">${s.lname}, ${s.fname}</td><td>G${s.grade}</td>
              <td><span class="badge bg-purple">${s.discount}</span></td>
              <td style="color:var(--green);font-weight:500">${peso(disc[s.discount]||0)}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderDailyCash(){
      const payments=DB.get('payments')||[];
      const today=new Date().toISOString().slice(0,10);
      const todayPay=payments.filter(p=>p.date===today);
      const total=todayPay.reduce((s,p)=>s+p.amount,0);
      document.getElementById('main-content').innerHTML=`
      <div class="stats-grid fade-up">
        <div class="stat-card sc-gold"><div class="stat-icon si-gold">${ic('dollar')}</div><div class="stat-label">Today's Collections</div><div class="stat-val">${peso(total)}</div></div>
        <div class="stat-card sc-navy"><div class="stat-icon si-navy">${ic('clipboard')}</div><div class="stat-label">Transactions Today</div><div class="stat-val">${todayPay.length}</div></div>
        <div class="stat-card sc-green"><div class="stat-icon si-green">${ic('briefcase')}</div><div class="stat-label">Cash on Hand</div><div class="stat-val">${peso(todayPay.filter(p=>p.channel==='cash').reduce((s,p)=>s+p.amount,0))}</div></div>
        <div class="stat-card sc-blue"><div class="stat-icon si-blue">${ic('activity')}</div><div class="stat-label">Digital Payments</div><div class="stat-val">${peso(todayPay.filter(p=>p.channel!=='cash').reduce((s,p)=>s+p.amount,0))}</div></div>
      </div>
      <div class="card fade-up d2">
        <div class="card-header"><div class="card-title">Daily Cash Report - ${new Date().toLocaleDateString('en-PH',{weekday:'long',year:'numeric',month:'long',day:'numeric'})}</div>
        <button class="btn-primary btn-sm" onclick="window.print()">Print Report</button></div>
        <div class="card-body">
          ${todayPay.length===0?`<div class="alert-box alert-info"><p>No transactions recorded today yet. Use "+ Record Payment" to post a payment.</p></div>`:`
          <table class="data-table"><thead><tr><th>OR #</th><th>Student</th><th>Amount</th><th>Channel</th><th>Type</th></tr></thead>
          <tbody>${todayPay.map(p=>`<tr><td class="td-bold">${p.orNum}</td><td>${p.studentName}</td><td style="color:var(--green);font-weight:600">${peso(p.amount)}</td><td><span class="badge bg-navy">${p.channel}</span></td><td>${p.type}</td></tr>`).join('')}</tbody></table>
          <div style="margin-top:1rem;padding-top:.75rem;border-top:2px solid var(--navy);display:flex;justify-content:space-between;font-weight:700;font-size:14px"><span>TOTAL COLLECTIONS</span><span style="color:var(--green)">${peso(total)}</span></div>`}
        </div>
      </div>`;
    }
    
    function renderAging(){
      const students=DB.get('students')||[];
      const wb=students.filter(s=>s.balance>0);
      document.getElementById('main-content').innerHTML=`
      <div class="grid-eq fade-up">
        <div class="card"><div class="card-header"><div class="card-title">Aging Summary</div></div><div class="card-body">
          <div class="sum-row"><span class="sum-label">0–30 days</span><span class="sum-val" style="color:var(--warn)">${peso(wb.filter(s=>s.balance<5000).reduce((t,s)=>t+s.balance,0))}</span></div>
          <div class="sum-row"><span class="sum-label">31–60 days</span><span class="sum-val" style="color:var(--warn)">${peso(wb.filter(s=>s.balance>=5000&&s.balance<10000).reduce((t,s)=>t+s.balance,0))}</span></div>
          <div class="sum-row"><span class="sum-label">61–90 days</span><span class="sum-val" style="color:var(--red)">${peso(wb.filter(s=>s.balance>=10000&&s.balance<15000).reduce((t,s)=>t+s.balance,0))}</span></div>
          <div class="sum-row"><span class="sum-label">90+ days</span><span class="sum-val" style="color:var(--red)">${peso(wb.filter(s=>s.balance>=15000).reduce((t,s)=>t+s.balance,0))}</span></div>
          <div class="sum-row"><span>TOTAL</span><span>${peso(wb.reduce((t,s)=>t+s.balance,0))}</span></div>
        </div></div>
        <div class="card"><div class="card-header"><div class="card-title">Collection Chart</div></div><div class="card-body"><div class="bar-chart" id="aging-chart"></div></div></div>
      </div>
      <div class="card fade-up d2">
        <div class="card-header"><div class="card-title">Overdue Accounts Detail</div><button class="btn-outline btn-sm">Send SMS Reminders</button></div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>Student</th><th>Grade</th><th>Balance</th><th>Est. Days Overdue</th><th>Action</th></tr></thead>
            <tbody>${wb.sort((a,b)=>b.balance-a.balance).map(s=>`
              <tr><td class="td-bold">${s.lname}, ${s.fname}</td><td>G${s.grade}</td>
              <td style="color:${s.balance>10000?'var(--red)':'var(--warn)'};font-weight:600">${peso(s.balance)}</td>
              <td><span class="badge ${s.balance>10000?'bg-red':'bg-warn'}">${s.balance>10000?'62 days':'30 days'}</span></td>
              <td><button class="btn-primary btn-sm" onclick="openPayment(${s.id})">Record Payment</button></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
      setTimeout(()=>{
        const c=document.getElementById('aging-chart');if(!c)return;
        c.innerHTML=[['0–30d',40],['31–60d',28],['61–90d',18],['>90d',14]].map(([l,v])=>`<div class="bar-wrap"><div style="display:flex;align-items:flex-end;height:80px"><div class="bar gold-bar" style="height:${v*2}px;flex:1"></div></div><div class="bar-lbl">${l}</div></div>`).join('');
      },100);
    }
    
    function renderAudit(){
      const audit=DB.get('audit')||[];
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up">
        <div class="card-header"><div><div class="card-title">Audit Trail</div><div class="card-sub">All system changes logged per RA 10173 (Data Privacy Act)</div></div><button class="btn-outline btn-sm" onclick="exportCSV()">Export Log</button></div>
        <div class="card-body">
          <div class="filter-bar"><div class="search-box">${ic('eye')}<input id="aud-search" type="text" placeholder="Search…" oninput="filterRows('aud-search','aud-table')"/></div></div>
          <table class="data-table" id="aud-table">
            <thead><tr><th>Timestamp</th><th>Action</th><th>User</th><th>Detail</th><th>Record</th></tr></thead>
            <tbody>${audit.slice().reverse().map(a=>`
              <tr><td class="td-muted">${a.ts}</td>
              <td><span class="badge ${a.action.includes('void')||a.action.includes('delete')?'bg-red':a.action.includes('Payment')||a.action.includes('paid')?'bg-green':'bg-navy'}">${a.action}</span></td>
              <td class="td-bold">${a.user}</td><td>${a.detail}</td><td class="td-muted">${a.table} #${a.recordId}</td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderStudents(){
      const students=DB.get('students')||[];
      const isReadOnly=['auditor','accountant','parent'].includes(currentUser().role);
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up">
        <div class="card-header"><div><div class="card-title">Student Records</div><div class="card-sub">${students.length} students enrolled</div></div>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap">
            ${!isReadOnly?`<button class="btn-primary btn-sm" onclick="openStudentForm(null)">+ Add Student</button>`:''}
            <button class="btn-outline btn-sm" onclick="exportCSV()">Export LIS</button>
          </div>
        </div>
        <div class="card-body">
          <div class="filter-bar">
            <div class="search-box">${ic('eye')}<input id="stu-search" type="text" placeholder="Search name or LRN…" oninput="filterStudents()"/></div>
            <select class="filter-sel" id="stu-filter-grade" onchange="filterStudents()"><option value="">All Grades</option><option value="7">Grade 7</option><option value="8">Grade 8</option><option value="9">Grade 9</option><option value="10">Grade 10</option><option value="11">Grade 11</option><option value="12">Grade 12</option></select>
            <select class="filter-sel" id="stu-filter-strand" onchange="filterStudents()"><option value="">All Strands</option><option value="STEM">STEM</option><option value="ABM">ABM</option><option value="HUMSS">HUMSS</option><option value="TVL">TVL</option><option value="JHS">JHS</option></select>
          </div>
          <table class="data-table" id="stu-table">
            <thead><tr><th>LRN</th><th>Name</th><th>Grade</th><th>Section</th><th>Strand</th><th>Voucher</th><th>Balance</th><th>Status</th><th></th></tr></thead>
            <tbody>${students.map(s=>`
              <tr data-grade="${s.grade}" data-strand="${s.strand}" onclick="openStudentDetail(${s.id})">
                <td class="td-muted">${s.lrn}</td>
                <td><div style="display:flex;align-items:center;gap:.45rem"><div class="stu-av">${initials(s.fname+' '+s.lname)}</div><div class="td-bold">${s.lname}, ${s.fname}</div></div></td>
                <td>G${s.grade}</td><td>${s.section}</td><td>${s.strand}</td>
                <td>${s.voucher?`<span class="badge bg-blue">${s.voucher}</span>`:'-'}</td>
                <td style="font-weight:500;color:${s.balance>0?'var(--red)':'var(--green)'}">${peso(s.balance)}</td>
                <td><span class="badge bg-green">Enrolled</span></td>
                <td style="display:flex;gap:.3rem">
                  ${!isReadOnly?`<button class="btn-icon" onclick="event.stopPropagation();openStudentForm(${s.id})" title="Edit">${ic('edit')}</button>`:''}
                  <button class="btn-icon" onclick="event.stopPropagation();openStudentDetail(${s.id})" title="View">${ic('eye')}</button>
                  ${!isReadOnly?`<button class="btn-icon" onclick="event.stopPropagation();removeStudent(${s.id})" title="Remove" style="color:var(--red)">${ic('trash')||'✕'}</button>`:''}
                </td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    function filterStudents(){
      const q=(document.getElementById('stu-search')?.value||'').toLowerCase();
      const grade=document.getElementById('stu-filter-grade')?.value||'';
      const strand=document.getElementById('stu-filter-strand')?.value||'';
      document.querySelectorAll('#stu-table tbody tr').forEach(r=>{
        const matchesText=r.textContent.toLowerCase().includes(q);
        const matchesGrade=!grade||r.dataset.grade===grade;
        const matchesStrand=!strand||r.dataset.strand===strand;
        r.style.display=(matchesText&&matchesGrade&&matchesStrand)?'':'none';
      });
    }
    function removeStudent(sid){
      const s=(DB.get('students')||[]).find(x=>x.id===sid);if(!s)return;
      if(!confirm(`Remove ${s.fname} ${s.lname} from enrollment? This cannot be undone.`))return;
      DB.delete('students',sid);
      auditLog('Student removed','students',sid,`${s.fname} ${s.lname} (Grade ${s.grade} ${s.strand}) removed by ${currentUser().fname} ${currentUser().lname}`);
      notifyBranchHead(s.branch,`Student removed: ${s.fname} ${s.lname} (Grade ${s.grade} ${s.strand}) by ${currentUser().fname} ${currentUser().lname}`);
      navigate('students');
    }
    
    /* ── LEGAL / COMPLIANCE ── */
    const LEGAL={
      privacy:['Privacy Policy',`<p>MTCGS follows the principles of the Data Privacy Act of 2012 (RA 10173): transparency, legitimate purpose, and proportionality.</p>
      <h4>What we collect</h4><ul><li>Student name, grade level, strand, branch, and enrollment details required on the school's enrollment form</li><li>Fees, payments (date, amount, channel, reference number) and balances</li><li>Staff and parent account names, emails, roles, and an audit trail of actions</li></ul>
      <h4>What we do not collect</h4><ul><li>No advertising or behavioral tracking, no device identifiers, no location, and no contacts or camera access</li><li>No data is sent to third parties</li></ul>
      <h4>Why and how long</h4><p>Data is used only for enrollment, fee tracking, payment verification, and reports. Records are kept only as long as school and audit rules require.</p>
      <h4>Who can see it</h4><p>Access depends on role and branch (Patnubay and Noveleta). Parents see only their own child.</p>
      <h4>Your rights</h4><p>You may ask the school to access, correct, or delete your data, or object to its processing, through your branch office.</p>
      <p><small>This prototype stores data in your browser's local storage on this device only.</small></p>`],
      terms:['Terms of Service',`<ul><li>Use the system only for school tasks that match your role.</li><li>Keep your password private. Do not share accounts.</li><li>Record payments accurately. You cannot verify a payment you recorded yourself.</li><li>All actions are logged for audit. Misuse may lead to loss of access and school disciplinary action.</li><li>There are no subscriptions, hidden fees, or automatic renewals. Fees shown are the school's published fees.</li><li>Downloaded reports contain private data. Store and share them only as the school permits.</li><li>The school will post any change to these terms here.</li></ul>`],
      sdk:['Third-party audit',`<p>This system loads <b>no third-party scripts, trackers, analytics, CDNs, or web fonts</b>. Everything runs from three local files.</p><table class="data-table"><thead><tr><th scope="col">Item</th><th scope="col">Use</th><th scope="col">License</th></tr></thead><tbody><tr><td>Inline SVG icons</td><td>Interface icons</td><td>Own / Lucide-style (ISC)</td></tr><tr><td>System font stack (Inter if installed)</td><td>Text</td><td>No download. Inter is OFL if self-hosted</td></tr><tr><td>Browser APIs</td><td>Local storage, CSV export</td><td>n/a</td></tr></tbody></table>`],
      keys:['Keyboard help',`<ul><li><b>Tab / Shift+Tab</b>: move between controls</li><li><b>Enter or Space</b>: activate buttons, menu items, and table rows</li><li><b>Escape</b>: close a dialog</li><li>Use "Skip to main content" at the top of the page to jump past the menu.</li></ul>`]
    };
    function openLegal(k){document.getElementById('legal-title').textContent=LEGAL[k][0];document.getElementById('legal-body').className='modal-body legal-body';document.getElementById('legal-body').innerHTML=LEGAL[k][1];openModal('modal-legal')}
    /* Accessibility pass: labels, alt text, keyboard focus for clickable non-buttons */
    function a11yPass(){
      document.querySelectorAll('img:not([alt])').forEach(i=>i.alt='Uploaded document preview');
      document.querySelectorAll('svg:not([aria-hidden]):not([role])').forEach(s=>s.setAttribute('aria-hidden','true'));
      document.querySelectorAll('button:not([aria-label])').forEach(b=>{if(!b.textContent.trim()&&b.title)b.setAttribute('aria-label',b.title)});
      document.querySelectorAll('input:not([aria-label]):not([type=hidden]),select:not([aria-label])').forEach(i=>{if(i.labels&&i.labels.length)return;const l=i.closest('.form-group')&&i.closest('.form-group').querySelector('label');const t=(l&&l.textContent)||i.placeholder;if(t)i.setAttribute('aria-label',t)});
      document.querySelectorAll('.nav-item,tr[onclick],[onclick]:not(button):not(a):not(input):not(select):not(textarea):not(tr)').forEach(e=>{if(!e.hasAttribute('tabindex'))e.setAttribute('tabindex','0');if(e.classList.contains('nav-item')&&!e.hasAttribute('role'))e.setAttribute('role','button')});
    }
    document.addEventListener('keydown',e=>{
      const open=[...document.querySelectorAll('.modal-overlay.open')].pop();
      if(e.key==='Escape'&&open){closeModal(open.id);return}
      if(e.key==='Tab'&&open){const f=[...open.querySelectorAll('button,[href],input:not([type=hidden]),select,textarea,[tabindex="0"]')].filter(x=>x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}}
      if((e.key==='Enter'||e.key===' ')&&e.target.matches('.nav-item,tr[onclick],[onclick]:not(button):not(a):not(input):not(select):not(textarea)')){e.preventDefault();e.target.click()}
    });
    /* One-time data migration: rename old branches and make sure new demo roles exist */
    function migrateData(){
      Object.keys(localStorage).filter(k=>k.startsWith('mtcgs_')).forEach(k=>{const v=localStorage.getItem(k);const n=v.replace(/"Branch 1"/g,'"Patnubay"').replace(/"Branch 2"/g,'"Noveleta"');if(n!==v)localStorage.setItem(k,n)});
      const users=DB.get('users');if(!users)return;
      [['cashier','Carla','Mendoza','cashier','Patnubay'],['accountant','Allan','Bautista','accountant','Noveleta'],['parent','Parent','Guardian','parent','Patnubay'],['branch2','Nina','Salazar','branch','Noveleta']].forEach(([em,f,l,role,br])=>{
        if(!users.some(u=>u.email===em+'@mtcgs.edu.ph'))users.push({id:DB.nextId('users'),fname:f,lname:l,email:em+'@mtcgs.edu.ph',password:'password',role,branch:br,status:'active',initials:f[0]+l[0],...(role==='parent'?{studentId:1}:{})});
      });
      DB.set('users',users);
    }
    /* ── ENROLLMENT ── */
    let enrollStep=1;
    let enrollData={};
    function generateLRN(branch){
      const students=DB.get('students')||[];
      const seq=String(students.length+1).padStart(4,'0');
      const yr=String(new Date().getFullYear()).slice(-2);
      const bcode=branch==='Noveleta'?'2':'1';
      return `10900${bcode}${yr}${seq}`;
    }
    const ENROLL_STEPS=['Student Info','Guardian & Family','Requirements','Fees & Voucher','Signatures & Confirm'];
    function renderEnroll(){
      enrollStep=1;
      enrollData={};
      enrollData['en-lrn']=generateLRN(currentUser()?.branch||'Patnubay');
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up">
        <div class="card-header"><div class="card-title">Student Enrollment</div><span class="badge bg-gold">S.Y. 2025–2026</span></div>
        <div class="card-body">
          <div class="enroll-steps">
            ${ENROLL_STEPS.map((s,i)=>`
              <div class="enroll-step">
                <div class="step-num ${i===0?'active':'pending'}" id="step-num-${i+1}">${i+1}</div>
                <div class="step-label ${i===0?'active':'pending'}" id="step-lbl-${i+1}">${s}</div>
                ${i<ENROLL_STEPS.length-1?`<div class="step-connector" id="step-conn-${i+1}"></div>`:''}</div>`).join('')}
          </div>
          <div id="enroll-content">${enroll1()}</div>
          <div style="display:flex;justify-content:space-between;margin-top:1.5rem">
            <button class="btn-outline" id="enroll-back" onclick="enrollBack()" style="visibility:hidden">← Back</button>
            <button class="btn-primary" id="enroll-next" onclick="enrollNext()">Continue →</button>
          </div>
        </div>
      </div>`;
    }
    /* ── enrollData helpers (fixes prior bug where field values reset between steps) ── */
    function ev(id,def=''){return enrollData[id]!==undefined&&enrollData[id]!==null?enrollData[id]:def}
    function evSel(id,val){return String(ev(id))===String(val)?'selected':''}
    function evChecked(id){return enrollData[id]?'checked':''}
    function captureEnrollStep(){
      document.querySelectorAll('#enroll-content [id^="en-"]').forEach(el=>{
        if(el.type==='checkbox')enrollData[el.id]=el.checked;
        else if(el.type!=='file')enrollData[el.id]=el.value;
      });
      const gc=document.getElementById('en-sig-guardian');const sc=document.getElementById('en-sig-student');
      if(gc&&!isCanvasBlank(gc))enrollData['en-guardian-sig']=gc.toDataURL();
      if(sc&&!isCanvasBlank(sc))enrollData['en-student-sig']=sc.toDataURL();
    }
    function isCanvasBlank(c){const ctx=c.getContext('2d');if(!ctx)return true;const p=ctx.getImageData(0,0,c.width,c.height).data;for(let i=3;i<p.length;i+=4){if(p[i]!==0)return false}return true}
    function enroll1(){return `
      <div class="alert-box alert-info" style="margin-bottom:1rem"><p>Student Information - matches the official MTCGS enrollment form</p></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Grade level</label>
        <select class="form-input" id="en-grade">${['7','8','9','10','11','12'].map(g=>`<option ${evSel('en-grade',g)}>${g}</option>`).join('')}</select></div>
      <div class="form-group"><label class="form-label">LRN (auto-generated)</label><input class="form-input" id="en-lrn" value="${ev('en-lrn')}" readonly style="background:var(--cream-mid);cursor:not-allowed;font-weight:600;letter-spacing:.04em"/></div>
      <div style="font-size:11px;color:var(--text-3);margin-top:-.4rem;margin-bottom:.9rem">System-generated Learner Reference Number - no manual entry needed</div>
      <div class="form-group"><label class="form-label">Scholarship grant</label>
        <select class="form-input" id="en-scholarship"><option value="" ${evSel('en-scholarship','')}>None</option><option value="ESC" ${evSel('en-scholarship','ESC')}>ESC</option><option value="SHS" ${evSel('en-scholarship','SHS')}>SHS Voucher</option><option value="Other" ${evSel('en-scholarship','Other')}>Other</option></select></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">First name</label><input class="form-input" id="en-fname" placeholder="Maria" value="${ev('en-fname')}"/></div>
      <div class="form-group"><label class="form-label">Last name</label><input class="form-input" id="en-lname" placeholder="Santos" value="${ev('en-lname')}"/></div></div>
      <div class="form-group"><label class="form-label">Track &amp; Strand (if applicable)</label>
        <select class="form-input" id="en-strand">${['JHS','STEM','ABM','HUMSS','TVL','Arts & Design'].map(s=>`<option ${evSel('en-strand',s)}>${s}</option>`).join('')}</select></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Gender</label>
        <select class="form-input" id="en-gender"><option ${evSel('en-gender','')}></option><option value="Male" ${evSel('en-gender','Male')}>Male</option><option value="Female" ${evSel('en-gender','Female')}>Female</option></select></div>
      <div class="form-group"><label class="form-label">Birthdate</label><input class="form-input" type="date" id="en-dob" value="${ev('en-dob')}"/></div>
      <div class="form-group"><label class="form-label">Birthplace</label><input class="form-input" id="en-birthplace" value="${ev('en-birthplace')}"/></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Religion</label><input class="form-input" id="en-religion" value="${ev('en-religion')}"/></div>
      <div class="form-group"><label class="form-label">Age</label><input class="form-input" type="number" min="0" id="en-age" value="${ev('en-age')}"/></div>
      <div class="form-group"><label class="form-label">No. of siblings</label><input class="form-input" type="number" min="0" id="en-siblings" value="${ev('en-siblings')}"/></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Transferee?</label>
        <select class="form-input" id="en-transfer"><option value="no" ${evSel('en-transfer','no')}>No - returning/incoming</option><option value="yes" ${evSel('en-transfer','yes')}>Yes - transferee</option></select></div>
      <div class="form-group"><label class="form-label">School last attended</label><input class="form-input" id="en-schoollast" value="${ev('en-schoollast')}"/></div></div>
      <div class="form-group"><label class="form-label">Branch</label>
        <select class="form-input" id="en-branch"><option ${evSel('en-branch','Patnubay')}>Patnubay</option><option ${evSel('en-branch','Noveleta')}>Noveleta</option></select></div>
      <div class="card" style="background:var(--cream);box-shadow:none;padding:.9rem 1rem;margin-top:.5rem">
        <div class="form-label" style="margin-bottom:.6rem">Vaccination record</div>
        <div class="form-row"><div class="form-group" style="margin-bottom:0"><label class="form-label">Vaccinated?</label>
          <select class="form-input" id="en-vaccinated" onchange="toggleVaxFields(this.value)"><option value="no" ${evSel('en-vaccinated','no')}>No</option><option value="yes" ${evSel('en-vaccinated','yes')}>Yes</option></select></div>
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Brand</label><input class="form-input" id="en-vaxbrand" value="${ev('en-vaxbrand')}"/></div></div>
        <div style="height:.6rem"></div>
        <div class="form-row"><div class="form-group" style="margin-bottom:0"><label class="form-label">Date of 1st dose</label><input class="form-input" type="date" id="en-vaxdate1" value="${ev('en-vaxdate1')}"/></div>
        <div class="form-group" style="margin-bottom:0"><label class="form-label">Date of 2nd dose</label><input class="form-input" type="date" id="en-vaxdate2" value="${ev('en-vaxdate2')}"/></div></div>
      </div>`}
    function toggleVaxFields(v){/* reserved for future conditional show/hide - fields stay visible for now */}
    function enroll2(){return `
      <div class="alert-box alert-info" style="margin-bottom:1rem"><p>Guardian &amp; family information</p></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Name of guardian</label><input class="form-input" id="en-guardian-name" value="${ev('en-guardian-name')}"/></div>
      <div class="form-group"><label class="form-label">Relationship to student</label><input class="form-input" id="en-guardian-relationship" placeholder="e.g. Mother, Aunt" value="${ev('en-guardian-relationship')}"/></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Highest educational attainment</label><input class="form-input" id="en-guardian-education" value="${ev('en-guardian-education')}"/></div>
      <div class="form-group"><label class="form-label">Occupation</label><input class="form-input" id="en-guardian-occupation" value="${ev('en-guardian-occupation')}"/></div></div>
      <div class="form-group"><label class="form-label">Monthly income</label><input class="form-input" id="en-guardian-income" placeholder="₱" value="${ev('en-guardian-income')}"/></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Complete address</label><input class="form-input" id="en-address" value="${ev('en-address')}"/></div>
      <div class="form-group"><label class="form-label">Contact no.</label><input class="form-input" id="en-contact" value="${ev('en-contact')}"/></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Mother's maiden name</label><input class="form-input" id="en-mother-name" value="${ev('en-mother-name')}"/></div>
      <div class="form-group"><label class="form-label">Mother's occupation</label><input class="form-input" id="en-mother-occupation" value="${ev('en-mother-occupation')}"/></div></div>
      <div class="form-row"><div class="form-group"><label class="form-label">Father's name</label><input class="form-input" id="en-father-name" value="${ev('en-father-name')}"/></div>
      <div class="form-group"><label class="form-label">Father's occupation</label><input class="form-input" id="en-father-occupation" value="${ev('en-father-occupation')}"/></div></div>`}
    const ENROLL_REQS=[['en-req-2x2','2 x 2 ID Picture'],['en-req-goodmoral','Good Moral Certificate'],['en-req-sf10','SF10'],['en-req-sf9','SF9 (report card)'],['en-req-psa','PSA birth certificate'],['en-req-esc',"ESC Certificate (if you're an ESC scholar from previous school)"]];
    function enroll3(){return `
      <div class="alert-box alert-info" style="margin-bottom:1rem"><p>Upload each requirement as it's submitted - uploading a file auto-checks it off. Incomplete docs = provisional enrollment only.</p></div>
      ${ENROLL_REQS.map(([id,label])=>{const key='en-doc-'+id;const uploaded=ev(key);return`
      <div style="display:flex;align-items:center;gap:.75rem;padding:.6rem 0;border-bottom:var(--border)">
        <input type="checkbox" id="${id}" ${evChecked(id)} style="width:16px;height:16px;accent-color:var(--gold);flex-shrink:0">
        <div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:500">${label}</div>
          ${uploaded?`<div style="font-size:11px;color:var(--green);margin-top:.15rem">✓ File attached</div>`:''}</div>
        ${uploaded?`<img src="${uploaded}" style="width:38px;height:38px;object-fit:cover;border-radius:6px;border:1px solid var(--border);flex-shrink:0"/>`:''}
        <label class="btn-outline" style="font-size:11px;padding:.35rem .65rem;cursor:pointer;flex-shrink:0">${uploaded?'Replace':'Upload'}<input type="file" accept="image/*,.pdf" style="display:none" onchange="handleReqUpload(event,'${id}')"></label>
      </div>`}).join('')}`}
    function handleReqUpload(e,reqId){
      const f=e.target.files[0];if(!f)return;
      const r=new FileReader();
      r.onload=()=>{
        enrollData['en-doc-'+reqId]=r.result;
        enrollData[reqId]=true;
        document.getElementById('enroll-content').innerHTML=enroll3();
      };
      r.readAsDataURL(f);
    }
    function enroll4(){
      const grade=ev('en-grade','11');
      const t=parseInt(grade)>=11?45000:38000;
      return `
      <div class="form-group"><label class="form-label">Payment term</label>
        <select class="form-input" id="en-payterm"><option value="annual" ${evSel('en-payterm','annual')}>Annual (full - 15% discount)</option><option value="quarterly" ${evSel('en-payterm','quarterly')}>Quarterly (4 installments)</option><option value="monthly" ${evSel('en-payterm','monthly')}>Monthly (10 installments)</option></select></div>
      <div class="form-group"><label class="form-label">Scholarship / Voucher</label>
        <select class="form-input" id="en-voucher"><option value="" ${evSel('en-voucher','')}>None / Not yet applied</option><option value="ESC" ${evSel('en-voucher','ESC')}>ESC Voucher (JHS)</option><option value="SHS" ${evSel('en-voucher','SHS')}>SHS Government Voucher</option></select></div>
      <div class="form-group"><label class="form-label">Discount type</label>
        <select class="form-input" id="en-discount"><option value="none" ${evSel('en-discount','none')}>None</option><option value="sibling" ${evSel('en-discount','sibling')}>Sibling (₱5,000 off)</option><option value="alumni" ${evSel('en-discount','alumni')}>Alumni (₱3,000 off)</option><option value="employee" ${evSel('en-discount','employee')}>Employee relative (₱6,000 off)</option><option value="honor" ${evSel('en-discount','honor')}>Honor scholar</option></select></div>
      <div style="background:var(--cream);border-radius:var(--radius);padding:1rem;margin-top:.5rem">
        <div class="sum-row"><span class="sum-label">Tuition fee</span><span class="sum-val">${peso(t)}</span></div>
        <div class="sum-row"><span class="sum-label">Miscellaneous</span><span class="sum-val">₱3,500</span></div>
        <div class="sum-row"><span class="sum-label">Upon enrollment fee</span><span class="sum-val">₱5,000</span></div>
        <div class="sum-row"><span class="sum-label">SHS Voucher (est.)</span><span class="sum-val" style="color:var(--green)">– ₱22,400</span></div>
        <div class="sum-row"><span>Est. Net Payable</span><span>${peso(t+3500+5000-22400)}</span></div>
      </div>`}
    function enroll5(){
      const fn=ev('en-fname');const ln=ev('en-lname');const g=ev('en-grade');const st=ev('en-strand');
      const u=currentUser();
      return `<div class="alert-box alert-success" style="margin-bottom:1rem"><p>✓ Ready to confirm enrollment</p><small>Review all information, then collect signatures below before finalizing.</small></div>
      <div class="sum-row"><span class="sum-label">Student name</span><span class="sum-val">${fn} ${ln}</span></div>
      <div class="sum-row"><span class="sum-label">Grade level</span><span class="sum-val">Grade ${g} - ${st}</span></div>
      <div class="sum-row"><span class="sum-label">Branch</span><span class="sum-val">${ev('en-branch')}</span></div>
      <div class="sum-row"><span class="sum-label">Guardian</span><span class="sum-val">${ev('en-guardian-name')}</span></div>
      <div class="sum-row"><span class="sum-label">School year</span><span class="sum-val">2025–2026</span></div>
      <div class="sum-row"><span class="sum-label">Payment term</span><span class="sum-val">${ev('en-payterm','monthly')}</span></div>
      <div class="form-row" style="margin-top:1rem">
        <div class="form-group">
          <label class="form-label">Parent's / Guardian's signature</label>
          <canvas id="en-sig-guardian" class="sig-pad" width="360" height="130"></canvas>
          <button type="button" class="btn-outline" style="margin-top:.4rem;font-size:12px;padding:.35rem .7rem" onclick="clearSigPad('en-sig-guardian')">Clear</button>
        </div>
        <div class="form-group">
          <label class="form-label">Student's signature</label>
          <canvas id="en-sig-student" class="sig-pad" width="360" height="130"></canvas>
          <button type="button" class="btn-outline" style="margin-top:.4rem;font-size:12px;padding:.35rem .7rem" onclick="clearSigPad('en-sig-student')">Clear</button>
        </div>
      </div>
      <div style="display:flex;align-items:center;gap:.6rem;margin-top:1rem;padding:.75rem;background:var(--cream);border-radius:var(--radius)">
        <input type="checkbox" id="en-verify" style="width:16px;height:16px;accent-color:var(--gold)">
        <label for="en-verify" style="font-size:13px">I, <strong>${u?u.fname+' '+u.lname:'Registrar'}</strong>, certify this enrollment record is complete and accurate as Registrar.</label>
      </div>`}
    function mountSigPads(){
      initSigPad('en-sig-guardian','en-guardian-sig');
      initSigPad('en-sig-student','en-student-sig');
    }
    function initSigPad(canvasId,dataKey){
      const c=document.getElementById(canvasId);if(!c)return;
      const ctx=c.getContext('2d');if(!ctx)return;
      ctx.strokeStyle='#1a1a2e';ctx.lineWidth=2;ctx.lineCap='round';
      if(enrollData[dataKey]){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0);img.src=enrollData[dataKey]}
      let drawing=false,last=null;
      const pos=(e)=>{const r=c.getBoundingClientRect();const t=e.touches?e.touches[0]:e;return{x:t.clientX-r.left,y:t.clientY-r.top}};
      const start=(e)=>{drawing=true;last=pos(e);e.preventDefault()};
      const move=(e)=>{if(!drawing)return;const p=pos(e);ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;e.preventDefault()};
      const end=()=>{drawing=false};
      c.addEventListener('mousedown',start);c.addEventListener('mousemove',move);window.addEventListener('mouseup',end);
      c.addEventListener('touchstart',start,{passive:false});c.addEventListener('touchmove',move,{passive:false});c.addEventListener('touchend',end);
    }
    function clearSigPad(canvasId){
      const c=document.getElementById(canvasId);if(!c)return;
      const ctx=c.getContext('2d');if(ctx)ctx.clearRect(0,0,c.width,c.height);
      const key=canvasId==='en-sig-guardian'?'en-guardian-sig':'en-student-sig';
      delete enrollData[key];
    }
    function refreshEnrollStepUI(){
      for(let i=1;i<=ENROLL_STEPS.length;i++){
        const n=document.getElementById(`step-num-${i}`);const l=document.getElementById(`step-lbl-${i}`);const c=document.getElementById(`step-conn-${i}`);
        if(n)n.className='step-num '+(i<enrollStep?'done':i===enrollStep?'active':'pending');
        if(l)l.className='step-label '+(i<=enrollStep?'active':'pending');
        if(c)c.className='step-connector '+(i<enrollStep?'done':'');
      }
    }
    function enrollNext(){
      if(enrollStep===1&&(!document.getElementById('en-fname')?.value||!document.getElementById('en-lname')?.value)){alert('Please enter student name');return}
      if(enrollStep===5&&!document.getElementById('en-verify')?.checked){alert('Please certify the enrollment record before confirming');return}
      captureEnrollStep();
      if(enrollStep<5){
        enrollStep++;
        const fns=[null,enroll1,enroll2,enroll3,enroll4,enroll5];
        document.getElementById('enroll-content').innerHTML=fns[enrollStep]();
        refreshEnrollStepUI();
        document.getElementById('enroll-back').style.visibility='visible';
        if(enrollStep===5){document.getElementById('enroll-next').textContent='Confirm Enrollment ✓';mountSigPads()}
      } else {
        const fname=ev('en-fname','New');const lname=ev('en-lname','Student');
        const grade=ev('en-grade','7');const strand=ev('en-strand','JHS');
        const branch=ev('en-branch')||currentUser().branch;
        const lrn=ev('en-lrn')||generateLRN(branch);
        const voucher=ev('en-voucher');const discount=ev('en-discount','none');
        const tuition=parseInt(grade)>=11?45000:38000;const misc=3500;
        const voucherAmt=voucher==='SHS'?22400:voucher==='ESC'?18500:0;
        const discAmt={sibling:5000,alumni:3000,employee:6000,honor:2000,none:0}[discount]||0;
        const balance=tuition+misc-voucherAmt-discAmt;
        const enrollmentDetails={
          gender:ev('en-gender'),dob:ev('en-dob'),birthplace:ev('en-birthplace'),religion:ev('en-religion'),
          age:ev('en-age'),siblings:ev('en-siblings'),transferee:ev('en-transfer'),schoolLastAttended:ev('en-schoollast'),
          scholarshipGrant:ev('en-scholarship'),
          vaccinated:ev('en-vaccinated'),vaxBrand:ev('en-vaxbrand'),vaxDate1:ev('en-vaxdate1'),vaxDate2:ev('en-vaxdate2'),
          guardianName:ev('en-guardian-name'),guardianRelationship:ev('en-guardian-relationship'),guardianEducation:ev('en-guardian-education'),
          guardianOccupation:ev('en-guardian-occupation'),guardianIncome:ev('en-guardian-income'),
          address:ev('en-address'),contact:ev('en-contact'),
          motherName:ev('en-mother-name'),motherOccupation:ev('en-mother-occupation'),
          fatherName:ev('en-father-name'),fatherOccupation:ev('en-father-occupation'),
          requirements:{
            idPhoto:!!ev('en-req-2x2',false),goodMoral:!!ev('en-req-goodmoral',false),sf10:!!ev('en-req-sf10',false),
            sf9:!!ev('en-req-sf9',false),psa:!!ev('en-req-psa',false),esc:!!ev('en-req-esc',false)
          },
          documents:{
            idPhoto:ev('en-doc-en-req-2x2'),goodMoral:ev('en-doc-en-req-goodmoral'),sf10:ev('en-doc-en-req-sf10'),
            sf9:ev('en-doc-en-req-sf9'),psa:ev('en-doc-en-req-psa'),esc:ev('en-doc-en-req-esc')
          },
          photo:ev('en-doc-en-req-2x2'),
          guardianSignature:enrollData['en-guardian-sig']||'',
          studentSignature:enrollData['en-student-sig']||'',
          verifiedBy:currentUser()?currentUser().fname+' '+currentUser().lname:'',
          verifiedAt:now()
        };
        const ns={id:DB.nextId('students'),lrn,fname,lname,grade,section:`${grade}-A`,strand,branch,sy:'2025-2026',status:'enrolled',balance,voucher,voucherAmt,discount,enrollmentDetails};
        DB.push('students',ns);
        auditLog('Student enrolled','students',ns.id,`${fname} ${lname} - Grade ${grade} ${strand}`);
        DB.push('notifications',{id:DB.nextId('notifications'),msg:`New enrollment: ${fname} ${lname} (Grade ${grade} ${strand})`,type:'info',read:false,ts:now()});
        loadNotifications();
        alert(`✓ ${fname} ${lname} enrolled successfully!\nBalance due: ${peso(balance)}`);
        navigate('students');
      }
    }
    function enrollBack(){
      if(enrollStep>1){
        captureEnrollStep();
        enrollStep--;
        const fns=[null,enroll1,enroll2,enroll3,enroll4,enroll5];
        document.getElementById('enroll-content').innerHTML=fns[enrollStep]();
        refreshEnrollStepUI();
        if(enrollStep===1)document.getElementById('enroll-back').style.visibility='hidden';
        document.getElementById('enroll-next').textContent='Continue →';
      }
    }

    
    function renderRequirements(){
      const students=DB.get('students')||[];
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up">
        <div class="card-header"><div class="card-title">Requirements Tracker</div><div class="card-sub">Track submitted enrollment documents per student</div></div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>Student</th><th>PSA</th><th>Good Moral</th><th>Form 137</th><th>Report Card</th><th>Voucher</th><th>Complete?</th></tr></thead>
            <tbody>${students.map(s=>{
              const checks=[true,true,true,parseInt(s.grade)>7,!!s.voucher];const complete=checks.every(c=>c);
              return `<tr><td class="td-bold">${s.lname}, ${s.fname}</td>${checks.map(c=>`<td style="color:${c?'var(--green)':'var(--red)'};">${c?'✓':'✗'}</td>`).join('')}<td>${complete?`<span class="badge bg-green">Complete</span>`:`<span class="badge bg-warn">Incomplete</span>`}</td></tr>`;
            }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderLIS(){
      const students=DB.get('students')||[];
      const csv='LRN,LastName,FirstName,Grade,Section,Strand,SY\n'+students.map(s=>`${s.lrn},${s.lname},${s.fname},${s.grade},${s.section},${s.strand},${s.sy}`).join('\n');
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up">
        <div class="card-header"><div><div class="card-title">LIS / EBEIS Export</div><div class="card-sub">DepEd Learner Information System compatible export</div></div></div>
        <div class="card-body">
          <div class="grid-eq" style="margin-bottom:1rem">
            <div class="alert-box alert-info"><p>📋 LIS Export</p><small>Student data in DepEd LIS CSV format. Upload directly to the LIS portal.</small></div>
            <div class="alert-box alert-success"><p>📊 EBEIS Export</p><small>Basic Education Information System school statistical report.</small></div>
          </div>
          <div style="display:flex;gap:.65rem;margin-bottom:1.25rem">
            <button class="btn-primary" onclick="downloadCSV('LIS_Export.csv',\`${csv.replace(/`/g,"'")}\`)">⬇ Download LIS CSV</button>
            <button class="btn-outline" onclick="downloadCSV('EBEIS_Export.csv',\`${csv.replace(/`/g,"'")}\`)">⬇ Download EBEIS CSV</button>
          </div>
          <table class="data-table"><thead><tr><th>LRN</th><th>Last Name</th><th>First Name</th><th>Grade</th><th>Section</th><th>Strand</th></tr></thead>
          <tbody>${students.map(s=>`<tr><td class="td-muted">${s.lrn}</td><td class="td-bold">${s.lname}</td><td>${s.fname}</td><td>G${s.grade}</td><td>${s.section}</td><td>${s.strand}</td></tr>`).join('')}</tbody></table>
        </div>
      </div>`;
    }
    
    function renderSFReports(){
      const sfForms=['SF1 - School Register (Masterlist)','SF2 - Daily Attendance Report','SF3 - Books Issued & Returned','SF4 - Monthly Learner Movement','SF5 - Report on Promotion & Proficiency','SF6 - Class Program','SF7 - School Personnel Plantilla','SF8 - Health & Nutrition Report','SF9 - Learner Progress Report Card','SF10 - Individual Permanent Record (Form 137)'];
      document.getElementById('main-content').innerHTML=`
      <div class="card fade-up">
        <div class="card-header"><div class="card-title">DepEd School Forms (SF1–SF10)</div></div>
        <div class="card-body">
          <div class="grid-eq">
            ${sfForms.map((sf,i)=>`
            <div class="voucher-row" style="cursor:pointer" onclick="alert('Generating SF${i+1}... In production this creates a DepEd-formatted PDF.')">
              <div class="stu-av" style="background:var(--navy);color:var(--gold-light);font-size:10px;width:36px;height:36px;flex-shrink:0">SF${i+1}</div>
              <div class="vou-label">${sf}</div>
              <button class="btn-outline btn-sm">${ic('download')} Generate</button>
            </div>`).join('')}
          </div>
        </div>
      </div>`;
    }
    
    function renderUserMgmt(){
      const users=DB.get('users')||[];
      const pending=DB.get('pending_users')||[];
      const canApprove=['branch','president','admin'].includes(currentUser().role);
      document.getElementById('main-content').innerHTML=`
      ${pending.length>0?`<div class="alert-box alert-warn" style="margin-bottom:1rem"><p>⚠ ${pending.length} pending registration${pending.length>1?'s':''} awaiting approval</p><small><a style="color:var(--gold);cursor:pointer;font-weight:500" onclick="openModal('modal-users');loadPendingUsers()">Review now →</a></small></div>`:''}
      <div class="card fade-up">
        <div class="card-header"><div class="card-title">System Users</div>
          ${canApprove&&pending.length>0?`<button class="btn-primary btn-sm" onclick="openModal('modal-users');loadPendingUsers()">Review Pending (${pending.length})</button>`:''}
        </div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Branch</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>${users.map(u=>`
              <tr>
                <td><div style="display:flex;align-items:center;gap:.45rem"><div class="stu-av">${u.initials||u.fname[0]+u.lname[0]}</div><div class="td-bold">${u.fname} ${u.lname}</div></div></td>
                <td class="td-muted">${u.email}</td>
                <td><span class="badge bg-navy">${ROLE_LABELS[u.role]||u.role}</span></td>
                <td class="td-muted">${u.branch}</td>
                <td><span class="badge bg-green">Active</span></td>
                <td>${canApprove&&u.id!==currentUser().id?`<button class="btn-danger btn-sm" onclick="deactivateUser(${u.id})">Deactivate</button>`:''}</td>
              </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderTimetablePage(){
      const timetables=DB.get('timetables')||[];
      document.getElementById('main-content').innerHTML=`
      <div class="ai-panel fade-up">
        <div class="ai-panel-title">✦ AI Timetable Generator</div>
        <div class="ai-panel-sub">Automatically creates class schedules based on teacher availability, room capacity, and subject requirements. Zero scheduling conflicts guaranteed.</div>
        <button class="btn-gold" onclick="openTTModal()">Generate New Timetable →</button>
      </div>
      <div class="card fade-up d2">
        <div class="card-header"><div class="card-title">Saved Timetables</div></div>
        <div class="card-body">
          ${timetables.length===0?`<div class="empty-state">${ic('calendar')}<h3>No timetables yet</h3><p>Generate your first timetable using the AI tool above.</p></div>`:
            `<table class="data-table"><thead><tr><th>Grade / Section</th><th>School Year</th><th>Generated</th><th>Status</th><th></th></tr></thead>
            <tbody>${timetables.map(t=>`<tr><td class="td-bold">${t.grade}${t.section?' - '+t.section:''}</td><td>${t.sy}</td><td class="td-muted">${t.created}</td><td>${t.conflicts&&t.conflicts.length>0?`<span class="badge bg-red">${t.conflicts.length} Conflict${t.conflicts.length>1?'s':''}</span>`:'<span class="badge bg-green">Active</span>'}</td>
            <td><button class="btn-icon" onclick="alert('View timetable #${t.id}')">${ic('eye')}</button></td></tr>`).join('')}</tbody></table>`}
        </div>
      </div>`;
    }
    
    function renderMultiBranch(){
      const branches=['Patnubay','Noveleta'];
      const students=DB.get('students')||[];
      const payments=DB.get('payments')||[];
      document.getElementById('main-content').innerHTML=`
      <div class="stats-grid fade-up">
        <div class="stat-card sc-gold"><div class="stat-icon si-gold">${ic('map')}</div><div class="stat-label">Total Branches</div><div class="stat-val">2</div></div>
        <div class="stat-card sc-green"><div class="stat-icon si-green">${ic('users')}</div><div class="stat-label">Total Students</div><div class="stat-val">${students.length}</div></div>
        <div class="stat-card sc-navy"><div class="stat-icon si-navy">${ic('dollar')}</div><div class="stat-label">Total Collections</div><div class="stat-val">${peso(payments.reduce((s,p)=>s+p.amount,0))}</div></div>
        <div class="stat-card sc-red"><div class="stat-icon si-red">${ic('file-text')}</div><div class="stat-label">Total Receivables</div><div class="stat-val">${peso(students.reduce((s,st)=>s+st.balance,0))}</div></div>
      </div>
      <div class="card fade-up d2">
        <div class="card-header"><div class="card-title">Branch Performance</div><span class="badge bg-gold">S.Y. 2025–2026</span></div>
        <div class="card-body">
          <table class="data-table">
            <thead><tr><th>Branch</th><th>Students</th><th>Collected</th><th>Receivables</th><th>Grantees</th><th>Collection Rate</th></tr></thead>
            <tbody>${branches.map(b=>{
              const bs=students.filter(s=>s.branch===b);const bp=payments.filter(p=>p.branch===b);
              const coll=bp.reduce((s,p)=>s+p.amount,0);const recv=bs.reduce((s,st)=>s+st.balance,0);
              const rate=coll+recv>0?Math.round(coll/(coll+recv)*100):0;
              return `<tr>
                <td class="td-bold">${b.split('-')[0].trim()}</td><td>${bs.length}</td>
                <td style="color:var(--green);font-weight:500">${peso(coll)}</td>
                <td style="color:var(--red);font-weight:500">${peso(recv)}</td>
                <td>${bs.filter(s=>s.voucher).length}</td>
                <td><div>${rate}%</div><div class="prog-bar" style="width:100px"><div class="prog-fill pf-gold" style="width:${rate}%"></div></div></td>
              </tr>`;
            }).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
    }
    
    function renderProfile(){
      const user=currentUser();
      document.getElementById('main-content').innerHTML=`
      <div class="profile-header fade-up">
        <div class="profile-av-lg">${user.initials||user.fname[0]+user.lname[0]}</div>
        <div><div class="profile-name">${user.fname} ${user.lname}</div><div class="profile-role">${ROLE_LABELS[user.role]||user.role} · ${user.branch}</div></div>
      </div>
      <div class="grid-eq fade-up d2">
        <div class="card">
          <div class="card-header"><div class="card-title">Account Details</div></div>
          <div class="card-body">
            <div class="sum-row"><span class="sum-label">Full name</span><span class="sum-val">${user.fname} ${user.lname}</span></div>
            <div class="sum-row"><span class="sum-label">Email</span><span class="sum-val">${user.email}</span></div>
            <div class="sum-row"><span class="sum-label">Role</span><span class="sum-val">${ROLE_LABELS[user.role]||user.role}</span></div>
            <div class="sum-row"><span class="sum-label">Branch</span><span class="sum-val">${user.branch}</span></div>
            <div class="sum-row"><span class="sum-label">Status</span><span><span class="badge bg-green">Active</span></span></div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><div class="card-title">Change Password</div></div>
          <div class="card-body">
            <div class="form-group"><label class="form-label">Current password</label><input type="password" class="form-input" id="cur-pwd" placeholder="••••••••"/></div>
            <div class="form-group"><label class="form-label">New password</label><input type="password" class="form-input" id="new-pwd" placeholder="••••••••"/></div>
            <div class="form-group"><label class="form-label">Confirm new password</label><input type="password" class="form-input" id="new-pwd2" placeholder="••••••••"/></div>
            <button class="btn-primary" onclick="changePassword()">Update Password</button>
          </div>
        </div>
      </div>`;
    }
    
    /* ── PAYMENT ── */
    function openPaymentModal(){openModal('modal-payment');populatePayStudents()}
    function openPayment(sid){openModal('modal-payment');populatePayStudents(sid)}
    function populatePayStudents(sid){
      const students=DB.get('students')||[];
      const sel=document.getElementById('pay-student');
      if(!sel)return;
      sel.innerHTML=students.map(s=>`<option value="${s.id}" ${s.id===sid?'selected':''}>${s.lname}, ${s.fname} - G${s.grade}</option>`).join('');
    }
    function submitPayment(){
      const sid=parseInt(document.getElementById('pay-student').value);
      const amount=parseFloat(document.getElementById('pay-amount').value);
      const channel=document.getElementById('pay-channel').value;
      const type=document.getElementById('pay-type').value;
      const notes=document.getElementById('pay-notes').value;
      if(!sid||!amount||amount<=0){alert('Please enter student and valid amount');return}
      const ref=(document.getElementById('pay-ref')?.value||'').trim();
      if(channel!=='cash'){
        if(ref.length<4){alert('Enter the reference number from the GCash or bank receipt (at least 4 characters).');return}
        if((DB.get('payments')||[]).some(p=>p.ref&&p.ref.toLowerCase()===ref.toLowerCase())){alert('That reference number is already logged. Check the receipt and try again.');return}
      }
      const status=channel==='cash'?'verified':'pending';
      const students=DB.get('students')||[];const s=students.find(x=>x.id===sid);
      const orNum=`2025-${String(Date.now()).slice(-5)}`;
      const payment={ref:channel==='cash'?'':ref,status,byId:currentUser().id,id:DB.nextId('payments'),studentId:sid,studentName:`${s.lname}, ${s.fname}`,amount,channel,type,orNum,date:new Date().toISOString().slice(0,10),notes,branch:s.branch,by:`${currentUser().fname} ${currentUser().lname}`};
      DB.push('payments',payment);
      if(status==='verified')DB.update('students',sid,{balance:Math.max(0,s.balance-amount)});
      auditLog('Payment posted','payments',payment.id,`OR ${orNum} - ${peso(amount)} - ${s.fname} ${s.lname}`);
      DB.push('notifications',{id:DB.nextId('notifications'),msg:`Payment ${peso(amount)} posted - ${s.lname}, ${s.fname} (OR #${orNum})`,type:'info',read:false,ts:now()});
      loadNotifications();
      closeModal('modal-payment');
      document.getElementById('pay-amount').value='';const pr=document.getElementById('pay-ref');if(pr)pr.value='';document.getElementById('pay-notes').value='';
      showOR(payment.id);
      if(currentPage)navigate(currentPage);
    }
    function showOR(pid){
      const p=(DB.get('payments')||[]).find(x=>x.id===pid);if(!p)return;
      document.getElementById('or-content').innerHTML=`
      <div class="receipt-wrap">
        <div class="receipt-header">
          <div class="receipt-school">Mother Theresa Colegio Group of Schools</div>
          <div class="receipt-address">${p.branch}</div>
          <div class="receipt-or">OR #${p.orNum}</div>
          <div style="font-size:11px;color:var(--text-3)">BIR Registered · Date: ${p.date}</div>
        </div>
        <div class="receipt-row"><span>Received from</span><span class="td-bold">${p.studentName}</span></div>
        <div class="receipt-row"><span>Payment for</span><span>${p.type}</span></div>
        <div class="receipt-row"><span>Payment channel</span><span>${p.channel}</span></div>
        ${p.notes?`<div class="receipt-row"><span>Notes</span><span>${p.notes}</span></div>`:''}
        <div class="receipt-row"><span>Issued by</span><span>${p.by}</span></div>
        <div class="receipt-row receipt-total"><span>TOTAL AMOUNT</span><span style="color:var(--green)">${peso(p.amount)}</span></div>
        <div style="margin-top:1rem;text-align:center;font-size:11px;color:var(--text-3)">Official Receipt - keep this for your records.<br>Thank you for your payment!</div>
      </div>`;
      openModal('modal-or');
    }
    function voidOR(pid){
      if(!confirm('Void this OR? This action will be logged in the audit trail.'))return;
      auditLog('OR voided','payments',pid,`OR voided by ${currentUser().fname} ${currentUser().lname}`);
      alert('OR has been voided and logged.');
      if(currentPage)navigate(currentPage);
    }
    
    /* ── STUDENT DETAIL / FORM ── */
    function openStudentDetail(sid){
      const s=(DB.get('students')||[]).find(x=>x.id===sid);if(!s)return;
      const sPay=(DB.get('payments')||[]).filter(p=>p.studentId===sid);
      const totalPaid=sPay.reduce((t,p)=>t+p.amount,0);
      document.getElementById('modal-student-title').textContent=`${s.lname}, ${s.fname}`;
      document.getElementById('modal-student-save').style.display='none';
      document.getElementById('modal-student-body').innerHTML=`
      <div class="grid-eq" style="margin-bottom:1rem">
        <div>
          <div class="sum-row"><span class="sum-label">LRN</span><span class="sum-val">${s.lrn}</span></div>
          <div class="sum-row"><span class="sum-label">Grade / Section</span><span class="sum-val">G${s.grade} - ${s.section}</span></div>
          <div class="sum-row"><span class="sum-label">Strand</span><span class="sum-val">${s.strand}</span></div>
          <div class="sum-row"><span class="sum-label">Branch</span><span class="sum-val">${s.branch}</span></div>
        </div>
        <div>
          <div class="sum-row"><span class="sum-label">Voucher</span><span>${s.voucher?`<span class="badge bg-blue">${s.voucher} - ${peso(s.voucherAmt)}</span>`:'None'}</span></div>
          <div class="sum-row"><span class="sum-label">Discount</span><span>${s.discount!=='none'?`<span class="badge bg-purple">${s.discount}</span>`:'None'}</span></div>
          <div class="sum-row"><span class="sum-label">Total Paid</span><span style="color:var(--green);font-weight:600">${peso(totalPaid)}</span></div>
          <div class="sum-row"><span class="sum-label">Balance</span><span style="color:var(--red);font-weight:700">${peso(s.balance)}</span></div>
        </div>
      </div>
      <div style="font-weight:600;font-size:13px;margin-bottom:.5rem;color:var(--navy)">Payment History</div>
      ${sPay.length===0?`<div style="font-size:13px;color:var(--text-3)">No payments recorded yet.</div>`:`
        <table class="data-table"><thead><tr><th>OR #</th><th>Amount</th><th>Channel</th><th>Type</th><th>Date</th></tr></thead>
        <tbody>${sPay.map(p=>`<tr><td class="td-bold">${p.orNum}</td><td style="color:var(--green);font-weight:500">${peso(p.amount)}</td><td>${p.channel}</td><td>${p.type}</td><td class="td-muted">${p.date}</td></tr>`).join('')}</tbody></table>`}
      <div style="margin-top:.75rem;display:flex;gap:.5rem">
        <button class="btn-primary btn-sm" onclick="closeModal('modal-student');openPayment(${s.id})">Record Payment</button>
        <button class="btn-outline btn-sm" onclick="window.print()">Print SOA</button>
      </div>`;
      openModal('modal-student');
    }
    function openStudentForm(sid){
      const students=DB.get('students')||[];const s=sid?students.find(x=>x.id===sid):null;
      document.getElementById('modal-student-title').textContent=s?'Edit Student Record':'Add New Student';
      document.getElementById('modal-student-save').style.display='';
      document.getElementById('modal-student-save').textContent=s?'Save Changes':'Add Student';
      document.getElementById('modal-student-save').onclick=()=>submitStudentForm(sid);
      document.getElementById('modal-student-body').innerHTML=`
      <div class="form-row">
        <div class="form-group"><label class="form-label">First name</label><input class="form-input" id="sf-fname" value="${s?.fname||''}"/></div>
        <div class="form-group"><label class="form-label">Last name</label><input class="form-input" id="sf-lname" value="${s?.lname||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">LRN</label><input class="form-input" id="sf-lrn" value="${s?.lrn||''}" maxlength="12"/></div>
        <div class="form-group"><label class="form-label">Grade</label>
          <select class="form-input" id="sf-grade">${[7,8,9,10,11,12].map(g=>`<option ${s?.grade==g?'selected':''}>${g}</option>`).join('')}</select></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Strand</label>
          <select class="form-input" id="sf-strand">${['JHS','STEM','ABM','HUMSS','TVL','Arts & Design'].map(st=>`<option ${s?.strand===st?'selected':''}>${st}</option>`).join('')}</select></div>
        <div class="form-group"><label class="form-label">Section</label><input class="form-input" id="sf-section" value="${s?.section||''}"/></div>
      </div>
      <div class="form-row">
        <div class="form-group"><label class="form-label">Balance (₱)</label><input class="form-input" type="number" id="sf-balance" value="${s?.balance||0}"/></div>
        <div class="form-group"><label class="form-label">Voucher</label>
          <select class="form-input" id="sf-voucher"><option value="">None</option><option value="ESC" ${s?.voucher==='ESC'?'selected':''}>ESC</option><option value="SHS" ${s?.voucher==='SHS'?'selected':''}>SHS</option></select></div>
      </div>`;
      openModal('modal-student');
    }
    function submitStudentForm(sid){
      const fname=document.getElementById('sf-fname')?.value?.trim();const lname=document.getElementById('sf-lname')?.value?.trim();
      const lrn=document.getElementById('sf-lrn')?.value?.trim();const grade=document.getElementById('sf-grade')?.value;
      const strand=document.getElementById('sf-strand')?.value;const section=document.getElementById('sf-section')?.value?.trim();
      const balance=parseFloat(document.getElementById('sf-balance')?.value)||0;const voucher=document.getElementById('sf-voucher')?.value;
      if(!fname||!lname){alert('Please enter student name');return}
      if(sid){
        DB.update('students',sid,{fname,lname,lrn,grade,strand,section,balance,voucher,voucherAmt:voucher==='SHS'?22400:voucher==='ESC'?18500:0});
        auditLog('Student updated','students',sid,`${fname} ${lname}`);
      } else {
        const ns={id:DB.nextId('students'),lrn:lrn||('100'+Date.now()).slice(0,12),fname,lname,grade,section:section||grade+'-A',strand,branch:currentUser().branch,sy:'2025-2026',status:'enrolled',balance,voucher,voucherAmt:voucher==='SHS'?22400:voucher==='ESC'?18500:0,discount:'none'};
        DB.push('students',ns);auditLog('Student added','students',ns.id,`${fname} ${lname}`);
      }
      closeModal('modal-student');navigate(currentPage||'students');
    }
    
    /* ── TIMETABLE ── */
    const SUBJ_BY_TRACK={JHS:['Filipino','English','Mathematics','Science','Araling Panlipunan','TLE','MAPEH','Edukasyon sa Pagpapakatao'],STEM:['Pre-Calculus','Basic Calculus','General Physics 1','General Chemistry','Research/Capstone','English for Academic & Prof. Purposes'],ABM:['Fundamentals of ABM','Business Mathematics','Organization & Management','Applied Economics','Research in Daily Life'],HUMSS:['Creative Writing','Introduction to World Religions','Trends & Issues in Humanities','Community Engagement'],TVL:['Bread & Pastry Production','Cookery','Food & Beverage Services','Technical Drafting'],'Arts & Design':['Drawing','Photography','Sculpture','Creative Arts & Design']};
    /* Each teacher: subjects they're qualified to teach (s), and the days they're available (avail) - mirrors staff attendance records */
    const TT_TEACHERS=[
      {name:'Mr. Dela Cruz',s:['Mathematics','Pre-Calculus','Basic Calculus'],avail:['Monday','Tuesday','Wednesday','Thursday','Friday']},
      {name:'Ms. Reyes',s:['Filipino','Mother Tongue','Creative Writing'],avail:['Monday','Tuesday','Wednesday','Thursday','Friday']},
      {name:'Mr. Santos',s:['Science','General Physics 1','General Chemistry'],avail:['Monday','Tuesday','Wednesday','Thursday','Friday']},
      {name:'Ms. Garcia',s:['English','English for Academic & Prof. Purposes'],avail:['Monday','Tuesday','Wednesday','Thursday','Friday']},
      {name:'Mr. Flores',s:['Araling Panlipunan','Introduction to World Religions'],avail:['Monday','Tuesday','Wednesday','Thursday']},
      {name:'Ms. Tan',s:['TLE','Bread & Pastry Production','Cookery'],avail:['Monday','Tuesday','Wednesday','Thursday','Friday']},
      {name:'Mr. Cruz',s:['MAPEH','Drawing','Photography'],avail:['Tuesday','Wednesday','Thursday','Friday']},
      {name:'Ms. Lim',s:['Business Mathematics','Fundamentals of ABM','Applied Economics'],avail:['Monday','Tuesday','Wednesday','Thursday','Friday']},
      {name:'Ms. Villanueva',s:['Edukasyon sa Pagpapakatao','Community Engagement','Trends & Issues in Humanities'],avail:['Monday','Tuesday','Wednesday','Thursday','Friday']},
      {name:'Mr. Ramos',s:['Organization & Management','Research in Daily Life','Research/Capstone'],avail:['Monday','Wednesday','Friday']},
      {name:'Ms. Bautista',s:['Food & Beverage Services','Technical Drafting','Sculpture','Creative Arts & Design'],avail:['Monday','Tuesday','Wednesday','Thursday','Friday']},
    ];
    /* Rooms: name + seating capacity, used to avoid overbooking and to match section size */
    const TT_ROOMS=[{name:'Room 101',capacity:40},{name:'Room 102',capacity:40},{name:'Room 103',capacity:35},{name:'Room 201',capacity:45},{name:'Room 202',capacity:35},{name:'Room 301',capacity:40},{name:'Science Lab',capacity:30},{name:'ICT Lab',capacity:30},{name:'Home Econ Room',capacity:25}];
    const TT_COLORS=['#D9A62B','#3E1568','#2d7a4f','#9b2c2c','#1e40af','#5b21b6','#0f766e','#b45309'];
    const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday'];
    let _lastTT=null;

    function openTTModal(){
      const cont=document.getElementById('tt-teachers');
      if(cont)cont.innerHTML=TT_TEACHERS.map((t,i)=>`<label style="display:flex;align-items:center;gap:.5rem;font-size:12.5px;cursor:pointer;padding:.2rem 0"><input type="checkbox" checked value="${i}" style="accent-color:var(--gold)"> ${t.name} <span style="color:var(--text-3)">- ${t.s[0]}</span></label>`).join('');
      document.getElementById('tt-result').style.display='none';
      openModal('modal-tt');
    }

    /* Build a set of "teacher|day|period" and "room|day|period" keys already committed in previously SAVED timetables, so a new generation never double-books a teacher or room across sections */
    function ttBuildBusySets(excludeId){
      const saved=(DB.get('timetables')||[]).filter(t=>t.id!==excludeId);
      const busyTeachers=new Set();const busyRooms=new Set();
      saved.forEach(t=>{
        (t.schedule||[]).forEach((daySlots,d)=>{
          (daySlots||[]).forEach((slot,p)=>{
            if(!slot)return;
            const day=t.days?t.days[d]:DAYS[d];
            if(slot.teacher&&slot.teacher!=='TBA')busyTeachers.add(`${slot.teacher}|${day}|${p}`);
            if(slot.room)busyRooms.add(`${slot.room}|${day}|${p}`);
          });
        });
      });
      return{busyTeachers,busyRooms};
    }

    function generateTimetable(){
      const grade=document.getElementById('tt-grade')?.value||'Grade 7';
      const section=document.getElementById('tt-section')?.value?.trim()||'A';
      const sectionSize=parseInt(document.getElementById('tt-size')?.value)||35;
      const periodMin=parseInt(document.getElementById('tt-period')?.value||60);
      const startHour=parseFloat(document.getElementById('tt-start')?.value||8);
      const constraint=document.getElementById('tt-constraints')?.value||'';
      let track='JHS';
      if(grade.includes('STEM'))track='STEM';else if(grade.includes('ABM'))track='ABM';else if(grade.includes('HUMSS'))track='HUMSS';else if(grade.includes('TVL'))track='TVL';else if(grade.includes('Arts'))track='Arts & Design';
      const subjects=(SUBJ_BY_TRACK[track]||SUBJ_BY_TRACK.JHS);
      const checkedVals=Array.from(document.querySelectorAll('#tt-teachers input:checked')).map(c=>parseInt(c.value));
      const selTeachers=checkedVals.map(i=>TT_TEACHERS[i]).filter(Boolean);
      const days=constraint==='no-monday'?DAYS.slice(1):constraint==='no-friday'?DAYS.slice(0,4):DAYS;
      const maxP=constraint==='morning-only'?4:6;
      const eligibleRooms=TT_ROOMS.filter(r=>r.capacity>=sectionSize);
      const {busyTeachers,busyRooms}=ttBuildBusySets(null);
      const usedThisRun={teacher:new Set(),room:new Set()};
      const schedule=[];const conflicts=[];
      let sIdx=0;
      for(let d=0;d<days.length;d++){
        const day=days[d];
        const slots=[];
        for(let p=0;p<maxP;p++){
          if(subjects.length===0){slots.push(null);continue}
          const subj=subjects[sIdx%subjects.length];
          /* teacher must be: selected for this run, qualified for the subject, available on this day, and not already booked this day/period (this run or a saved timetable) */
          let teacher=selTeachers.find(t=>
            t.s.includes(subj)&&t.avail.includes(day)&&
            !usedThisRun.teacher.has(`${t.name}|${day}|${p}`)&&
            !busyTeachers.has(`${t.name}|${day}|${p}`)
          );
          /* fall back to any qualified teacher school-wide (not just selected) before giving up */
          if(!teacher){
            teacher=TT_TEACHERS.find(t=>
              t.s.includes(subj)&&t.avail.includes(day)&&
              !usedThisRun.teacher.has(`${t.name}|${day}|${p}`)&&
              !busyTeachers.has(`${t.name}|${day}|${p}`)
            );
          }
          const room=eligibleRooms.find(r=>
            !usedThisRun.room.has(`${r.name}|${day}|${p}`)&&
            !busyRooms.has(`${r.name}|${day}|${p}`)
          );
          const h=startHour+(p*periodMin/60);const hh=Math.floor(h);const mm=String(Math.round((h%1)*60)).padStart(2,'0');
          const ap=hh>=12?'PM':'AM';const fh=hh>12?hh-12:hh;
          const time=`${fh}:${mm}${ap}`;
          if(!teacher||!room){
            const reason=!teacher?`No qualified teacher available for ${subj}`:`No room with capacity ≥${sectionSize} available`;
            conflicts.push({day,period:p+1,time,subject:subj,reason});
            slots.push({subject:subj,teacher:teacher?.name||'⚠ Unassigned',room:room?.name||'',time,color:TT_COLORS[sIdx%TT_COLORS.length],conflict:true});
          } else {
            usedThisRun.teacher.add(`${teacher.name}|${day}|${p}`);
            usedThisRun.room.add(`${room.name}|${day}|${p}`);
            slots.push({subject:subj,teacher:teacher.name,room:room.name,time,color:TT_COLORS[sIdx%TT_COLORS.length],conflict:false});
          }
          sIdx++;
        }
        schedule.push(slots);
      }
      const times=Array.from({length:maxP},(_,p)=>{const h=startHour+(p*periodMin/60);const hh=Math.floor(h);const mm=String(Math.round((h%1)*60)).padStart(2,'0');const ap=hh>=12?'PM':'AM';const fh=hh>12?hh-12:hh;return`${fh}:${mm}${ap}`});
      const grid=document.getElementById('tt-grid');if(!grid)return;
      grid.style.gridTemplateColumns=`80px repeat(${days.length},1fr)`;
      let html=`<div class="tt-header">Period</div>${days.map(d=>`<div class="tt-header">${d}</div>`).join('')}`;
      for(let p=0;p<maxP;p++){
        html+=`<div class="tt-time">${times[p]}</div>`;
        for(let d=0;d<days.length;d++){
          const slot=schedule[d][p];
          if(!slot){html+=`<div class="tt-cell tt-empty"></div>`;continue}
          html+=slot.conflict?
            `<div class="tt-cell tt-subject" style="background:#9b2c2c14;border-left:3px solid #9b2c2c"><div style="font-weight:600;font-size:10.5px;color:#9b2c2c">${slot.subject}</div><div style="font-size:9.5px;color:#9b2c2c">Conflict</div></div>`:
            `<div class="tt-cell tt-subject" style="background:${slot.color}18;border-left:3px solid ${slot.color}"><div style="font-weight:600;font-size:10.5px;color:${slot.color}">${slot.subject}</div><div style="font-size:9.5px;color:var(--text-3)">${slot.teacher}</div><div style="font-size:9px;color:var(--text-3)">${slot.room}</div></div>`;
        }
      }
      grid.innerHTML=html;
      const banner=document.getElementById('tt-status-banner');
      if(banner){
        banner.innerHTML=conflicts.length===0?
          `<div class="alert-box alert-success" style="margin-bottom:1rem"><p>✓ Timetable generated - no teacher or room conflicts detected</p></div>`:
          `<div class="alert-box alert-danger" style="margin-bottom:1rem"><p>⚠ ${conflicts.length} slot${conflicts.length>1?'s':''} could not be assigned</p><small>${conflicts.map(c=>`${c.day} ${c.time} (${c.subject}): ${c.reason}`).join('<br>')}</small></div>`;
      }
      document.getElementById('tt-result').style.display='block';
      _lastTT={id:DB.nextId('timetables'),grade,section,sectionSize,sy:document.getElementById('tt-sy')?.value,schedule,times,days,conflicts,created:now()};
      /* Always prompt to save right after generating, so a schedule never sits unsaved and forgotten */
      setTimeout(()=>{
        const msg=conflicts.length===0?
          `Save this timetable for Grade ${grade}${section?' - '+section:''}?`:
          `This timetable has ${conflicts.length} unresolved conflict${conflicts.length>1?'s':''}. Save it anyway as provisional?`;
        if(confirm(msg))saveTimetable(true);
      },150);
    }

    function saveTimetable(skipConfirm){
      if(!_lastTT){alert('Generate a timetable first');return}
      if(!skipConfirm&&_lastTT.conflicts&&_lastTT.conflicts.length>0){
        if(!confirm(`This timetable has ${_lastTT.conflicts.length} unresolved conflict(s). Save anyway?`))return;
      }
      DB.push('timetables',_lastTT);
      auditLog('Timetable saved','timetables',_lastTT.id,`Grade ${_lastTT.grade} ${_lastTT.section||''} - ${_lastTT.sy}`);
      alert('Timetable saved successfully!');closeModal('modal-tt');navigate('timetable');
    }


    
    function buildMiniTeacherTT(){
      const c=document.getElementById('teacher-mini-tt');if(!c)return;
      const days=['Mon','Tue','Wed','Thu','Fri'];const periods=['8:00AM','9:00AM','10:00AM','11:00AM','1:00PM','2:00PM'];
      const subjs=['Math','Filipino','English','Science','MAPEH','TLE'];
      let html=`<div class="tt-header" style="font-size:9px">Time</div>${days.map(d=>`<div class="tt-header" style="font-size:9px">${d}</div>`).join('')}`;
      periods.forEach((t,p)=>{
        html+=`<div class="tt-time" style="font-size:9px">${t}</div>`;
        days.forEach((_,di)=>{const subj=subjs[(p+di)%subjs.length];const color=TT_COLORS[(p+di)%TT_COLORS.length];html+=`<div class="tt-cell tt-subject" style="background:${color}18;border-left:2px solid ${color}"><div style="font-size:9px;font-weight:600;color:${color}">${subj}</div></div>`});
      });
      c.innerHTML=html;
    }
    
    /* ── MISC ACTIONS ── */
    function buildBarChart(id){
      const c=document.getElementById(id);if(!c)return;
      const col=[68,55,80,72,60,45,30,78,82,71,65,90];const tgt=[75,70,85,75,75,60,50,80,85,75,70,95];
      const months=['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
      c.innerHTML=months.map((m,i)=>`<div class="bar-wrap"><div style="display:flex;align-items:flex-end;gap:2px;height:80px"><div class="bar gold-bar" style="height:${Math.round(col[i]*.8)}px;flex:1"></div><div class="bar pale-bar" style="height:${Math.round(tgt[i]*.8)}px;flex:1"></div></div><div class="bar-lbl">${m}</div></div>`).join('');
    }
    function exportCSV(){
      const students=DB.get('students')||[];
      downloadCSV('MTCGS_Students.csv','LRN,Name,Grade,Section,Strand,Balance,Voucher\n'+students.map(s=>`${s.lrn},${s.lname} ${s.fname},${s.grade},${s.section},${s.strand},${s.balance},${s.voucher||''}`).join('\n'));
    }
    function downloadCSV(filename,content){
      const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type:'text/csv'}));a.download=filename;a.click();
    }
    function assignVoucher(sid){
      const type=confirm('Assign SHS voucher?\nClick Cancel for ESC voucher.')?'SHS':'ESC';
      DB.update('students',sid,{voucher:type,voucherAmt:type==='SHS'?22400:18500});
      auditLog('Voucher assigned','students',sid,`${type} voucher assigned`);
      navigate(currentPage||'vouchers');
    }
    function deactivateUser(uid){
      if(!confirm('Deactivate this user account?'))return;
      DB.update('users',uid,{status:'inactive'});
      auditLog('User deactivated','users',uid,'Account deactivated by '+currentUser().fname);
      navigate('user-mgmt');
    }
    function loadPendingUsers(){
      const pending=DB.get('pending_users')||[];
      const body=document.getElementById('modal-users-body');if(!body)return;
      if(!pending.length){body.innerHTML='<div style="padding:1rem;text-align:center;color:var(--text-3)">No pending registrations.</div>';return}
      body.innerHTML=`<table class="data-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Branch</th><th>Submitted</th><th>Action</th></tr></thead>
      <tbody>${pending.map(u=>`<tr><td class="td-bold">${u.fname} ${u.lname}</td><td class="td-muted">${u.email}</td><td><span class="badge bg-navy">${ROLE_LABELS[u.role]||u.role}</span></td><td class="td-muted">${u.branch}</td><td class="td-muted">${u.ts}</td>
      <td style="display:flex;gap:.35rem"><button class="btn-primary btn-sm" onclick="approveUser(${u.id})">Approve</button><button class="btn-danger btn-sm" onclick="rejectUser(${u.id})">Reject</button></td></tr>`).join('')}</tbody></table>`;
    }
    function approveUser(pid){
      const u=(DB.get('pending_users')||[]).find(x=>x.id===pid);if(!u)return;
      DB.push('users',{id:DB.nextId('users'),fname:u.fname,lname:u.lname,email:u.email,password:u.password,role:u.role,branch:u.branch,status:'active',initials:u.fname[0]+u.lname[0]});
      DB.delete('pending_users',pid);
      auditLog('User approved','users',pid,`${u.fname} ${u.lname} (${u.role}) approved`);
      alert(`${u.fname} ${u.lname}'s account has been approved and activated.`);
      loadPendingUsers();navigate('user-mgmt');
    }
    function rejectUser(pid){if(!confirm('Reject this registration request?'))return;DB.delete('pending_users',pid);loadPendingUsers()}
    function changePassword(){
      const p1=document.getElementById('new-pwd')?.value;const p2=document.getElementById('new-pwd2')?.value;
      if(!p1||p1!==p2){alert('Passwords do not match');return}
      DB.update('users',currentUser().id,{password:p1});
      auditLog('Password changed','users',currentUser().id,`${currentUser().fname} ${currentUser().lname} changed password`);
      alert('Password updated successfully.');
    }
    
    /* ── INIT ── */
    document.addEventListener('DOMContentLoaded',()=>{
      seedData();
      migrateData();
      a11yPass();
      showScreen('login-screen');
      /* Production: check session token here
         const token = sessionStorage.getItem('mtcgs_jwt');
         if(token) fetch('/api/auth/me',{headers:{Authorization:'Bearer '+token}}).then(r=>r.json()).then(user=>{if(user.id){SESSION.user=user;launchApp(user)}}) */
    });
    document.addEventListener('keydown',e=>{
      if(e.key==='Enter'&&document.getElementById('login-screen').classList.contains('active')) doLogin();
    });