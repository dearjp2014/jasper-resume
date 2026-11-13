export const identity = {
  name:'Jasper P',role:'商业化产品负责人',city:'北京',email:'dearjp2014@163.com',phone:'15910918639',
  resume:'/jasper-resume/about/files/Jasper-resume.pdf',
  onePage:'/jasper-resume/commercialization-resume.html',
  scholar:'https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=the+contribution+of+socioeconomic+factors+to+pm2.5+pollution+in+urban+china+shchlor&btnG=',
  paper:'The contribution of socioeconomic factors to PM2.5 pollution in urban China'
};
export const topics=[
  {path:'/work',name:'职业旅程',description:'阿里、美团、字节跳动',kind:0},
  {path:'/projects',name:'代表项目',description:'增长、预算与产品的实际问题',kind:1},
  {path:'/approach',name:'做事方式',description:'把判断放在事实和约束中',kind:2},
  {path:'/venture',name:'创业实践',description:'深度眺望 DEEPSURVEY',kind:3},
  {path:'/research',name:'研究与学术',description:'数理训练与代表作品',kind:4}
];
export const careers=[
  {company:'阿里巴巴',unit:'阿里妈妈事业群',period:'2019.02–2021.06',year:'2019',role:'商业产品经理',scope:'负责广告主人群经营与定向产品，覆盖人群洞察、标签推荐、圈选定向、投放诊断和人群溢价。',
    results:[['+50%','活跃客户数'],['+120%','覆盖消耗'],['+20%','人群溢价收入']],actions:['主导达摩盘 3.0 升级，重构标签体系、圈人流程与标签推荐服务。','迭代直通车、钻展、超级推荐与万相台的白盒定向及诊断能力，累计服务超 10 万客户。'],project:'/projects'},
  {company:'美团',unit:'到家 · 商业增值部',period:'2021.06–2023.07',year:'2021',role:'到家场景营销产品负责人',scope:'负责商家营销产品从 0 到 1 建设，指导 2 人，获美团袋鼠之星。',
    results:[['30%','1 年预算渗透'],['+11%','CPM'],['+10%','ARPU']],actions:['打造营销魔方，整合定向、创意、出价、通投与分析能力。','通过 LBS 智能定向、半自动出价通投与差异化创意提升投放效率；AB 测试 CTR +21.3%。','参与搭建 BETTER 外卖营销方法论，联合贝恩咨询推动头部品牌验证。'],project:'/projects/marketing-cube'},
  {company:'字节跳动',unit:'巨量千川 · 商业化策略产品',period:'2023.07–2024.07',year:'2023',role:'场景化投放策略方向负责人',scope:'负责商品、素材供给与人/货/场出价产品，指导 3 人，将经营目标转化为可实验、可规模投放的策略。',
    results:[['+25%','商品推广率'],['+7%','带动消耗'],['6500 万元/天','场景出价贡献消耗']],actions:['联动商品推荐、直播双开与全店推广，拓展广告商品供给。','通过自然与广告双佣金机制释放达人素材，以 AIGC 补齐增量供给；素材投产率 +50%。','围绕新客转化、节点爆发与结算场景设计三维出价策略。'],project:'/projects'},
  {company:'字节跳动',unit:'中国电商 · 千川与营销策略',period:'2024.07–至今',year:'2024',role:'电商智能营销策略方向负责人',scope:'负责 QCPX、平台营销与联合发券、商家营销，为广告收入、GMV 收益目标与资金效率负责。团队共 9 人（含本人）。',
    results:[['86.7%','消耗渗透率'],['14%','净收贡献'],['6.2×','联合发券日均净收贡献增至']],actions:['拓展客户供给与流量场景，迭代券型决策和资金调控。','建立多方预算联合决策、收益评估与分账机制。','按商家预算分层设计 CPS 新变现方案，兼顾策略收益、体验与风险。','从两人团队起盘，建立方向授权、资源优先级与分层培养机制，建立了业务领先的营销策略团队。'],project:'/projects/budget-collaboration'}
];
export type ProjectId='qcpx'|'budget-collaboration'|'marketing-cube'|'cps';
export type Story={name:string;title:string;text:string};
export type Metric={value:string;label:string;note:string};
export type Project={id:ProjectId;title:string;headline:string;category:string;summary:string;period:string;kind:number;metrics:Metric[];stories:Story[];status?:string};
export const projects:Project[]=[
  {id:'qcpx',title:'QCPX 增长与治理',headline:'增长与风险，一起进入判断。',category:'业务增长 / 经营质量',period:'2024.08 以来',kind:0,
   summary:'把供给、场景、券型与资金调控连起来，在扩展覆盖的同时约束风险。',
   metrics:[{value:'66% → 86.7%',label:'消耗渗透率',note:'起点与阶段结果'},{value:'3.7% → 14%',label:'净收贡献',note:'2024.08 以来'},{value:'−69%',label:'因券退款率',note:'累计降低'}],
   stories:[{name:'问题',title:'覆盖与收益，不能单独推进。',text:'QCPX 的增长需要同时关注客户供给、流量场景、策略收益与风险约束。'},{name:'判断',title:'把增长与经营质量放在一起看。',text:'扩展客户与场景的同时，将退款、客诉和局部资损纳入治理。'},{name:'行动',title:'让策略迭代有明确的约束。',text:'拓展供给与流量场景，迭代券型决策和资金调控；建立风险分级与全端风控协同。'},{name:'结果',title:'用阶段结果回看增长质量。',text:'消耗渗透率由 66% 提升至 86.7%，净收贡献由 3.7% 提升至 14%；月均客诉由约 300 例降至 10 例。'}]},
  {id:'budget-collaboration',title:'多预算联合发券',headline:'多方预算，一次联合决策。',category:'预算协同',period:'2026.06–09',kind:1,
   summary:'把不同资金来源的目标放在同一张桌上，让收入、GMV 与资金效率共同进入判断。',
   metrics:[{value:'6.2×',label:'日均净收贡献',note:'增至约 6.2 倍 · 2026.06–09'},{value:'+1.19%',label:'平台智能券',note:'大盘支付 GMV 提升'}],
   stories:[{name:'问题',title:'不同预算，目标并不相同。',text:'广告收入、GMV 收益与资金效率，需要在共同的评估与决策机制中协调。'},{name:'判断',title:'先对齐目标，再讨论选择。',text:'把各方收益与约束放在一起评估，避免只看单一局部指标。'},{name:'行动',title:'让协作有清楚的边界。',text:'建立多方预算联合决策、收益评估与分账机制，推动平台智能券能力复用。'},{name:'结果',title:'用阶段结果回看决策。',text:'联合发券日均净收贡献增至约 6.2 倍，平台智能券大盘支付 GMV 提升 1.19%。'}]},
  {id:'marketing-cube',title:'营销魔方',headline:'从一个经营目标，到一套营销工具。',category:'产品从 0 到 1',period:'美团 · 2021–2023',kind:2,
   summary:'整合定向、创意、出价、通投与分析，让品牌和商家的投放链路更完整。',
   metrics:[{value:'30%',label:'预算渗透',note:'1 年完成'},{value:'+11%',label:'CPM',note:'场景化营销产品结果'},{value:'+10%',label:'ARPU',note:'场景化营销产品结果'}],
   stories:[{name:'问题',title:'经营目标，需要完整工具承接。',text:'商家营销涵盖定向、创意、出价、通投与报表分析，需要一体化产品能力。'},{name:'判断',title:'从经营场景组织投放能力。',text:'以客户经营目标为导向，把投放与分析能力组织为场景化营销工具。'},{name:'行动',title:'把关键能力放进同一条链路。',text:'从 0 到 1 打造营销魔方，结合智能定向、半自动出价通投和差异化创意改善效率。'},{name:'结果',title:'用渗透与效率验证产品。',text:'1 年完成 30% 预算渗透，CPM 提升 11%、ARPU 提升 10%；AB 测试 CTR 提升 21.3%。'}]},
  {id:'cps',title:'CPS 新变现产品',headline:'从商家已有的预算习惯出发。',category:'商家营销 / 新产品探索',period:'核心方案已完成',kind:3,status:'客户效果待测试验证',
   summary:'按商家广告与营销预算分层设计产品，先验证策略，再推进新变现方案的客户测试。',
   metrics:[{value:'+6.5%',label:'智能商家券策略实验',note:'商品 GMV 提升；不等于 CPS 产品客户效果'}],
   stories:[{name:'问题',title:'新产品，要承接真实经营习惯。',text:'商家的广告与营销预算不同，产品需要按预算特征分层设计。'},{name:'判断',title:'先看客户约束，再匹配方案。',text:'围绕商家已有预算与经营目标设计产品，兼顾策略收益与真实使用。'},{name:'行动',title:'完成方案，也保留验证边界。',text:'已完成核心方案和智能商家券策略实验；CPS 新变现产品的客户效果仍待测试验证。'},{name:'结果',title:'策略实验与客户效果分别说明。',text:'智能商家券实验商品 GMV 提升 6.5%。这一结果不代表 CPS 新产品已完成客户收益验证。'}]}
];
export const approachSteps=[
  {title:'先对齐目标',subtitle:'把问题放回经营目标。',text:'收入、GMV 与资金效率各有侧重。先把需要解决的目标与约束说清楚，再组织方案。',example:'在多预算联合发券中，建立联合决策、收益评估与分账机制。',project:'/projects/budget-collaboration'},
  {title:'一起看收益与风险',subtitle:'经营质量也是产品结果。',text:'关注增长，也关注体验与风险。把收益、退款、客诉与局部资损放在同一判断中。',example:'QCPX 同步推进覆盖增长与风险治理，因券退款率累计降低 69%。',project:'/projects/qcpx'},
  {title:'用验证推进方案',subtitle:'把完成方案与验证效果分开。',text:'用实验结果判断策略，把已实现结果与待客户验证的部分分别说明。',example:'智能商家券已有策略实验结果，CPS 新变现产品仍待客户效果验证。',project:'/projects/cps'},
  {title:'把方法沉淀成机制',subtitle:'让协作与复用更稳定。',text:'通过方向授权、资源优先级与分层培养机制，组织策略产品团队的推进与协作。',example:'从两人团队起盘，建立方向授权、资源优先级与分层培养机制。',project:'/work'}
];
