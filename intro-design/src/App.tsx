import React, {useState} from 'react';
import {DesignCanvas, DCSection, DCArtboard} from './design-canvas';

type View = 'desktop' | 'mobile' | 'motion';
type PageKind = 'home' | 'case' | 'research';
const topicNames = ['职业旅程','代表项目','做事方式','创业实践','研究与学术'];

function Arrow({diagonal=false}:{diagonal?:boolean}) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal?'M6 18 18 6M6 6h12v12':'M4 12h15m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function Brand(){return <div className="brand"><span className="brand-symbol">j<span>p</span>.</span><span className="brand-name">Jasper P</span></div>;}
function SiteHeader({active='',mobile=false}:{active?:string,mobile?:boolean}) {
  return <header className="site-header"><Brand/>{!mobile && <nav className="site-nav" aria-label="主题导航">{topicNames.map(t=><span key={t} className={active===t?'nav-current':''}>{t}</span>)}</nav>}<div className="site-actions">{!mobile&&<span className="download-link">下载简历 <Arrow diagonal/></span>}<span className="contact-link">联系我 <Arrow diagonal/></span>{mobile&&<span className="menu-icon"><i/><i/></span>}</div></header>;
}

function TopicGlyph({kind}:{kind:number}) {
  if(kind===0)return <svg viewBox="0 0 190 54" aria-hidden="true"><path d="M8 26h170" className="glyph-line"/>{[12,65,119,177].map((x,i)=><g key={x}><circle cx={x} cy="26" r={i===3?6:4} fill={i===3?'#3859DB':'#b5c3bc'}/><text x={x} y="49" textAnchor="middle">{['2019','2021','2023','2024'][i]}</text></g>)}</svg>;
  if(kind===1)return <svg viewBox="0 0 110 58" aria-hidden="true"><path d="M7 10C45 10 32 27 68 27m-61 3h61M7 50c38 0 25-23 61-23" fill="none" stroke="#1E8A72" strokeWidth="2"/><rect x="68" y="13" width="31" height="28" rx="7" fill="#1E8A72"/><path d="m76 27 5 5 10-10" fill="none" stroke="white" strokeWidth="2"/></svg>;
  if(kind===2)return <svg viewBox="0 0 132 56" aria-hidden="true">{[4,46,88].map((x,i)=><g key={x}><rect x={x} y={9+i*6} width="34" height="34" rx="5" fill={i===1?'#E5B83F':'#edf0e9'} stroke="#c4d0c7"/><path d={'M'+(x+10)+' '+(26+i*6)+'h14'} stroke="#132B27" strokeWidth="2"/></g>)}</svg>;
  if(kind===3)return <svg viewBox="0 0 86 64" aria-hidden="true"><rect x="15" y="13" width="54" height="44" rx="4" fill="#e3d07d" transform="rotate(-9 42 35)"/><rect x="19" y="7" width="54" height="44" rx="4" fill="#fffdf5" stroke="#c8c8ae" transform="rotate(7 46 29)"/><path d="M31 18h25m-25 7h30m-30 7h16" stroke="#7f8c79" strokeWidth="2"/><circle cx="61" cy="43" r="8" fill="#E5B83F"/></svg>;
  return <svg viewBox="0 0 102 66" aria-hidden="true"><path d="M13 46h80M30 8v53" stroke="#cad1d0"/><circle cx="52" cy="31" r="22" fill="none" stroke="#3859DB" strokeWidth="1.4"/><path d="M14 45c15 0 12-21 34-21s25 19 44 19" fill="none" stroke="#1E8A72" strokeWidth="2"/><circle cx="53" cy="25" r="4" fill="#E5B83F"/></svg>;
}

function BudgetArt({mobile=false,caseMode=false}:{mobile?:boolean,caseMode?:boolean}) {
  if(mobile)return <div className={'budget-art compact '+(caseMode?'case-art':'')}><svg viewBox="0 0 390 225" role="img" aria-label="收入、GMV、资金效率三条路径汇入联合决策的机制示意">
    <defs><filter id="mobile-shadow" x="-30%" y="-30%" width="160%" height="190%"><feDropShadow dx="0" dy="10" stdDeviation="9" floodColor="#132B27" floodOpacity=".07"/></filter></defs>
    {[{x:12,t:'广告收入',c:'#3859DB'},{x:139,t:'GMV 收益',c:'#1E8A72'},{x:266,t:'资金效率',c:'#b58b21'}].map((n,i)=><g key={n.t}><rect x={n.x} y="15" width="112" height="37" rx="9" fill={['#ebeffd','#e7f1ec','#f6efcf'][i]}/><text x={n.x+56} y="39" textAnchor="middle" fill={n.c} fontSize="16" fontWeight="650">{n.t}</text><path d={'M'+(n.x+56)+' 52C'+(n.x+56)+' 85 195 74 195 106'} stroke={n.c} strokeWidth="2" fill="none"/></g>)}
    <rect x="71" y="109" width="247" height="100" rx="18" fill="#fffef9" stroke="#d5dfd4" filter="url(#mobile-shadow)"/>
    <text x="194" y="143" textAnchor="middle" fill="#687A75" fontSize="13">理解目标 · 比较约束</text><text x="194" y="175" textAnchor="middle" fill="#132B27" fontSize="27" fontWeight="700">一个联合判断</text>
  </svg><span className="art-caption">决策路径 · 机制示意</span></div>;
  return <div className={'budget-art '+(caseMode?'case-art':'')}><div className="art-axis"><span>目标的来源不同</span><span>判断的依据一致</span></div><svg viewBox="0 0 680 430" role="img" aria-label="收入、GMV、资金效率三条路径汇入产品决策窗口的机制示意">
    <defs><filter id="paper-shadow" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="15" stdDeviation="18" floodColor="#132B27" floodOpacity=".1"/></filter><pattern id="art-grid" width="25" height="25" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r=".6" fill="#a6b5ab" opacity=".5"/></pattern></defs>
    <rect x="0" y="0" width="680" height="430" fill="url(#art-grid)"/>
    <rect x="301" y="64" width="289" height="303" rx="24" fill="#e8d994" transform="rotate(6 445 215)"/>
    <rect x="284" y="51" width="289" height="303" rx="24" fill="#e1ede6" transform="rotate(-6 428 202)"/>
    {[{y:84,t:'广告收入',c:'#3859DB',bg:'#ecf0fd'},{y:198,t:'GMV 收益',c:'#1E8A72',bg:'#e9f2ed'},{y:312,t:'资金效率',c:'#af8621',bg:'#f6efd2'}].map((n,i)=><g key={n.t}>
      <path d={'M151 '+(n.y+30)+'C220 '+(n.y+30)+' 194 200 307 200'} fill="none" stroke={n.c} strokeWidth="2.3"/>
      <rect x="18" y={n.y} width="140" height="60" rx="11" fill={n.bg} stroke={n.c} strokeOpacity=".15"/>
      <circle cx="40" cy={n.y+30} r="4" fill={n.c}/><text x="58" y={n.y+37} fontSize="21" fontWeight="600" fill={n.c}>{n.t}</text>
      <circle cx={211+i*20} cy={n.y+30+(1-i)*20} r="3.7" fill={n.c}/>
    </g>)}
    <g filter="url(#paper-shadow)"><rect x="308" y="43" width="283" height="313" rx="22" fill="#fffefa" stroke="#cad6c9"/></g>
    <text x="335" y="82" fill="#687A75" fontSize="13" letterSpacing="2">PRODUCT DECISION</text>
    <circle cx="563" cy="76" r="5" fill="#1E8A72"/>
    <text x="335" y="125" fill="#132B27" fontSize="28" fontWeight="700">做出一个好决策</text>
    <path d="M335 151h228" stroke="#dce4d8"/>
    {['理解各方目标','评估收益与约束','验证、调整、复用'].map((t,i)=><g key={t}><circle cx="342" cy={182+i*47} r="4" fill={['#3859DB','#1E8A72','#E5B83F'][i]}/><text x="359" y={189+i*47} fill="#334b40" fontSize="19">{t}</text><path d={'M548 '+(178+i*47)+'l5 5 9-9'} fill="none" stroke="#8a9e8b" strokeWidth="1.5"/></g>)}
    <rect x="335" y="312" width="88" height="24" rx="6" fill="#eef3eb"/><text x="379" y="329" textAnchor="middle" fill="#486453" fontSize="12">产品结果</text>
    <path d="M592 201h62m-8-6 8 6-8 6" fill="none" stroke="#8da092" strokeWidth="1.7"/>
    <text x="660" y="237" textAnchor="end" fill="#687A75" fontSize="14">经营变化</text>
  </svg><span className="art-caption">不同目标，在同一张决策桌上对齐。<span>机制示意</span></span></div>;
}

function HomePage({mobile=false}:{mobile?:boolean}) {
  return <article className={'site-page home-page '+(mobile?'is-mobile':'')} data-screen-label={mobile?'首页 · 手机':'首页 · 桌面'}>
    <SiteHeader mobile={mobile}/>
    <main className="home-main"><section className="home-hero"><div className="hero-copy"><span className="eyebrow"><i/>商业化产品负责人</span><h1>Jasper P<span className="name-dot">.</span></h1><h2>做产品，<br/>也对经营结果负责。</h2><p>7 年以上广告与电商营销产品经验，<br className="desktop-break"/>从产品建设、预算协同，到团队与新业务。</p><div className="hero-actions"><span className="primary-button">看我的项目 <Arrow/></span><span className="text-button">查看一页简历 <Arrow diagonal/></span></div></div><BudgetArt mobile={mobile}/></section>
      <section className="topic-gallery"><div className="section-intro"><span>从一个侧面，认识我。</span><span className="explore-hint">选择你感兴趣的主题 <Arrow/></span></div><div className="topic-grid">{topicNames.map((t,i)=><div className={'topic-card topic-'+i} key={t}><div><span className="topic-title">{t}<Arrow diagonal/></span><p>{['阿里、美团、字节跳动','增长、预算与产品的实际问题','把判断放在事实和约束中','深度眺望 DEEPSURVEY','数理训练与代表作品'][i]}</p></div><div className="topic-glyph"><TopicGlyph kind={i}/></div></div>)}</div></section>
    </main><footer className="site-footer"><span>产品 / 经营 / 研究</span><span>北京 · 求职与专业合作</span><span>Jasper P</span></footer>
  </article>;
}

const caseSteps=[
  {name:'问题',title:'不同预算，目标并不相同。',text:'广告收入、GMV 收益与资金效率，需要在共同的评估与决策机制中协调。'},
  {name:'判断',title:'先对齐目标，再讨论选择。',text:'把各方收益与约束放在一起评估，避免只看单一局部指标。'},
  {name:'行动',title:'让协作有清楚的边界。',text:'建立多方预算联合决策、收益评估与分账机制，推动平台智能券能力复用。'},
  {name:'结果',title:'用阶段结果回看决策。',text:'联合发券日均净收贡献增至约 6.2 倍，平台智能券大盘支付 GMV 提升 1.19%。'}
];
function CasePage({mobile=false}:{mobile?:boolean}) {
  return <article className={'site-page case-page '+(mobile?'is-mobile':'')} data-screen-label={mobile?'联合发券案例 · 手机':'联合发券案例 · 桌面'}>
    <SiteHeader active="代表项目" mobile={mobile}/><main className="case-main"><div className="page-breadcrumb"><span>← 返回展厅</span><span>代表项目 / 多预算联合发券</span></div>
      <section className="case-hero"><div className="case-copy"><span className="eyebrow"><i/>多预算联合发券</span><h1>多方预算，<br/>一次联合决策。</h1><p>把不同资金来源的目标放在同一张桌上，<br className="desktop-break"/>让收入、GMV 与资金效率共同进入判断。</p><div className="case-outcomes"><div><strong>6.2<span>×</span></strong><p>日均净收贡献<br/><em>增至约 6.2 倍 · 2026.06–09</em></p></div><div><strong>+1.19<span>%</span></strong><p>平台智能券<br/><em>大盘支付 GMV 提升</em></p></div></div></div><BudgetArt mobile={mobile} caseMode/></section>
      <section className="case-story"><div className="section-intro"><span>从问题走到结果。</span><span className="subtle-label">判断与验证的过程</span></div><div className="mobile-story-tabs">{caseSteps.map((s,i)=><span key={s.name} className={i===0?'tab-current':''}>{s.name}</span>)}</div><div className="case-step-grid">{caseSteps.map((s,i)=><div className={'case-step step-'+i} key={s.name}><span className="step-name">{s.name}</span><h3>{s.title}</h3><p>{s.text}</p></div>)}</div></section>
      <div className="case-source"><span>阶段结果据定稿简历，机制图为示意。</span><span>下一个项目：QCPX 增长与治理 <Arrow/></span></div>
    </main>
  </article>;
}

function PaperCard({mobile=false}:{mobile?:boolean}) {
  return <div className={'paper-display '+(mobile?'paper-mobile':'')}><div className="paper-back blue-paper"/><div className="paper-back yellow-paper"/><div className="paper-sheet"><div className="paper-heading"><span>代表作</span><span>Environmental Pollution · 2018</span></div><h3>The contribution of socioeconomic factors to PM2.5 pollution in urban China</h3><div className="paper-rule"/><p>顶刊第一作者论文<br/>数值计算方向</p><div className="paper-credential"><span>Elsevier 年度高被引论文</span><span>被引 <strong>130</strong> 次</span></div><span className="paper-link">查看论文 <Arrow diagonal/></span><div className="paper-math" aria-hidden="true"><svg viewBox="0 0 220 88"><path d="M6 70h208M39 9v70" stroke="#c8d2cd"/>{[18,34,49].map(r=><circle key={r} cx="129" cy="44" r={r} fill="none" stroke="#d0dccc" strokeDasharray={r===49?'2 4':undefined}/>)}<path d="M25 67c34-7 24-38 66-25s65 14 111-24" stroke="#3859DB" strokeWidth="2" fill="none"/><circle cx="91" cy="42" r="4" fill="#E5B83F"/></svg></div></div><span className="paper-caption">以一个代表作，展开研究背景。</span></div>;
}
function ResearchPage({mobile=false}:{mobile?:boolean}) {
  return <article className={'site-page research-page '+(mobile?'is-mobile':'')} data-screen-label={mobile?'研究与学术 · 手机':'研究与学术 · 桌面'}>
    <SiteHeader active="研究与学术" mobile={mobile}/><main className="research-main"><div className="page-breadcrumb"><span>← 返回展厅</span><span>研究与学术</span></div><section className="research-hero"><div className="research-copy"><span className="eyebrow"><i/>研究与学术</span><h1>从数理研究，<br/>走向产品决策。</h1><p>数学与系统科学的训练，以及论文研究经历。<br className="desktop-break"/>它们也是分析问题、比较方案的基础。</p><div className="research-counts"><div><strong>4<span> 篇</span></strong><p>已发表论文</p></div><div><strong>130<span> 次</span></strong><p>代表作累计被引</p></div></div><div className="research-interest"><span>数理基础</span><span>逻辑思维</span><span>数据分析</span></div></div><PaperCard mobile={mobile}/></section><section className="research-foundations"><div className="education-block"><span className="block-kicker">教育背景</span><div className="school-row"><div className="school-monogram">清</div><div><h3>清华大学</h3><p>理学硕士 · 系统科学</p><small>免试推荐 · 发表 4 篇论文</small></div><span>2016–2019</span></div><div className="school-row"><div className="school-monogram">地</div><div><h3>中国地质大学</h3><p>理学学士 · 数学</p><small>GPA 3.88/4 · 专业第一</small></div><span>2012–2016</span></div></div><div className="honors-block"><span className="block-kicker">数理训练的另一种证明</span><h3>在真实问题中练习分析。</h3><p>美国大学生数学建模竞赛一等奖<br/>全国大学生数学建模竞赛一等奖<br/>全国大学生数学竞赛二等奖</p><span className="kaggle-proof">Kaggle TOP 10% ×2 <small>2018 / 2019</small></span></div></section></main>
  </article>;
}

function Page({kind,mobile=false}:{kind:PageKind,mobile?:boolean}){if(kind==='home')return <HomePage mobile={mobile}/>;if(kind==='case')return <CasePage mobile={mobile}/>;return <ResearchPage mobile={mobile}/>;}

const transitionStages=[{label:'入口反馈',time:'点击前 / Hover',note:'主题边缘抬升，关联目标路径高亮。',progress:0},{label:'入口展开',time:'约 180ms',note:'项目入口扩展，周边内容淡出。',progress:.35},{label:'页面着陆',time:'约 550ms',note:'相同图形进入内页，导航保持稳定。',progress:.8},{label:'正文出现',time:'550ms 后',note:'按阅读顺序出现标题、数据与过程。',progress:1}];
function TransitionFrame({stage}:{stage:number}) {
  const s=transitionStages[stage];
  return <div className={'transition-frame transition-'+stage} data-screen-label={'转场 · '+s.label}><div className="motion-demo"><div className="motion-mini-nav"><b>jp.</b><span>职业 · 项目 · 创业 · 研究</span><i/></div>{stage<2?<><div className="motion-home-title"><b>Jasper P.</b><span>做产品，也对经营结果负责。</span></div><div className="motion-tile-background"><span>职业旅程</span><span>做事方式</span><span>研究与学术</span></div><div className="motion-selected"><small>代表项目</small><b>多方预算</b><TopicGlyph kind={1}/><Arrow diagonal/></div></>:<><div className="motion-case-title"><small>代表项目 / 联合发券</small><b>多方预算，<br/>一次联合决策。</b></div><div className="motion-case-art"><TopicGlyph kind={1}/></div>{stage===3&&<><div className="motion-stats"><b>6.2×</b><b>+1.19%</b></div><div className="motion-body-lines"><span>问题</span><span>判断</span><span>行动</span><span>结果</span></div></>}</>}</div><div className="transition-caption"><div><strong>{s.label}</strong><span>{s.time}</span></div><p>{s.note}</p></div></div>;
}

const pages:[PageKind,string][]=[['home','首页'],['case','联合发券案例'],['research','研究与学术']];
export default function App(){
  const hash=window.location.hash.slice(1);
  const [view,setView]=useState<View>(hash==='mobile'||hash==='motion'?hash:'desktop');
  const screen=new URLSearchParams(window.location.search).get('screen');
  const exportPage=pages.find(([kind])=>screen===kind+'-desktop'||screen===kind+'-mobile');
  if(exportPage)return <Page kind={exportPage[0]} mobile={screen?.endsWith('-mobile')}/>;
  if(screen && /^motion-[0-3]$/.test(screen))return <TransitionFrame stage={Number(screen.slice(-1))}/>;
  function changeView(v:View){window.location.hash=v;setView(v);}
  return <div className="review-app"><div className="review-toolbar"><div className="review-heading"><span className="review-brand">Jasper P</span><span className="review-stage">个人展厅 · 第一阶段设计稿</span></div><div className="review-tabs">{([['desktop','桌面 · 3'],['mobile','手机 · 3'],['motion','转场 · 4']] as [View,string][]).map(([v,t])=><button key={v} className={view===v?'selected':''} onClick={()=>changeView(v)}>{t}</button>)}</div><span className="review-help">点击画稿标题可全屏查看</span></div><div className="review-canvas"><DesignCanvas key={view} minScale={.08} maxScale={2}><DCSection id={view} title={view==='desktop'?'桌面设计 · 1440 × 900':view==='mobile'?'手机设计 · 390 × 844':'主题入口 → 案例页 · 约 550ms'} subtitle={view==='motion'?'四个关键帧说明过渡关系，完整动画在视觉确认后制作。':'确认视觉、信息层级与模块差异后，再制作完整网站。'}>{view==='motion'?transitionStages.map((s,i)=><DCArtboard key={s.label} id={'motion-'+i} label={s.label} width={520} height={390}><img className="artboard-image" src={"/jasper-resume/design/frames/motion-"+i+".png"} width="520" height="390" alt={s.label+"转场关键帧"}/></DCArtboard>):pages.map(([kind,label])=><DCArtboard key={kind} id={view+'-'+kind} label={label+' · '+(view==='mobile'?'手机':'桌面')} width={view==='mobile'?390:1440} height={view==='mobile'?844:900}><img className="artboard-image" src={"/jasper-resume/design/frames/"+kind+"-"+view+".png"} width={view==='mobile'?390:1440} height={view==='mobile'?844:900} alt={label+"高保真设计稿"}/></DCArtboard>)}</DCSection></DesignCanvas></div><div className="review-status"><span>设计预览 · 页面内按钮仅展示版式，完整交互待第二阶段制作。</span><span>拖动画布 / 滚轮移动 · Ctrl / ⌘ + 滚轮缩放 · 全屏时 ← → 切页，Esc 返回</span></div></div>;
}
