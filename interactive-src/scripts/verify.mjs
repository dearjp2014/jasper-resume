import {createRequire} from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
const require=createRequire(import.meta.url);
const {chromium}=require(process.env.JASPER_PLAYWRIGHT_PATH||'playwright');
const base=process.env.JASPER_BASE_URL||'http://127.0.0.1:8876/jasper-resume/about/';
const out=process.env.JASPER_QA_OUTPUT||'/tmp/jasper-about-qa';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../..');
const sourcePdf=fs.readFileSync(path.join(root,'output/pdf/Jasper_商业化产品负责人.pdf'));
const routes=['/','/work','/projects','/projects/qcpx','/projects/budget-collaboration','/projects/marketing-cube','/projects/cps','/approach','/venture','/research','/contact'];
const labels=['展厅首页','职业旅程','代表项目','QCPX 增长与治理','多预算联合发券','营销魔方','CPS 新变现产品','做事方式','创业实践','研究与学术','联系我'];
const findings=[],errors=[];
const assert=(condition,message)=>{if(!condition)throw Error(message)};
const digest=b=>crypto.createHash('sha256').update(b).digest('hex');
fs.mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true});
async function settled(page,label){await page.locator('article[data-screen-label="'+label+'"]').waitFor();await page.waitForFunction(()=>!document.querySelector('.route-portal'));await page.waitForTimeout(220)}
async function route(page,r){await page.goto(base+'#'+r);await settled(page,labels[routes.indexOf(r)]);await page.evaluate(()=>document.fonts.ready)}
try{
 for(const [device,width,height] of (process.env.JASPER_SKIP_LAYOUT?[]:[['desktop',1440,900],['compact',1100,900],['tablet',768,1024],['mobile',390,844],['small',320,740]])){
  const context=await browser.newContext({viewport:{width,height},isMobile:device==='mobile'||device==='small',hasTouch:device==='mobile'||device==='small'});
  const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));page.on('response',r=>{if(r.status()>=400)errors.push(r.status()+' '+r.url())});
  for(const r of routes){await route(page,r);const layout=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,main:document.querySelectorAll('main').length}));
   assert(layout.scroll<=width+1,device+' overflow at '+r);assert(layout.main===1,'Multiple main regions at '+r);
   const text=await page.locator('main').innerText();assert(!/统筹|初步|公司级|专业前.?5%|物理竞赛|LLM|成员晋升|1 个月内|3 级 80 人/.test(text),'Removed fact restored at '+r);
   findings.push({device,route:r,...layout});if(!['compact','small'].includes(device))await page.screenshot({path:path.join(out,device+'-'+(r==='/'?'home':r.slice(1).replaceAll('/','-'))+'.png'),fullPage:true});
  }
  if(device==='mobile'){
   await route(page,'/');await page.getByRole('button',{name:'打开主题菜单'}).tap();await page.locator('#mobile-menu').waitFor();await page.locator('#mobile-menu').getByRole('link',{name:'研究与学术'}).tap();await settled(page,'研究与学术');assert(await page.locator('#mobile-menu').count()===0,'Mobile menu did not close');
   await page.getByRole('button',{name:'打开主题菜单'}).click();await page.keyboard.press('Escape');assert(await page.locator('#mobile-menu').count()===0,'Escape did not close mobile menu');assert(await page.locator('.menu-toggle').evaluate(e=>e===document.activeElement),'Escape did not restore focus');
  }
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:900},permissions:['clipboard-read','clipboard-write']});const page=await context.newPage();page.on('pageerror',e=>errors.push(String(e)));
 await route(page,'/');await page.getByRole('button',{name:'GMV 收益',exact:true}).click();assert(await page.locator('.decision-checks').innerText().then(t=>t.includes('让不同预算参与共同判断')),'Homepage goal interaction');
 const skip=page.locator('.skip-link');await skip.focus();await page.keyboard.press('Enter');assert(new URL(page.url()).hash==='#/','Skip link changed router hash');assert(await page.locator('main h1').evaluate(e=>e===document.activeElement),'Skip focus');
 await page.getByRole('link',{name:'看我的项目',exact:true}).click();await settled(page,'代表项目');assert(await page.locator('main h1').evaluate(e=>e===document.activeElement),'Route focus');
 await page.locator('.project-exhibit').filter({hasText:'多预算联合发券'}).click();await settled(page,'多预算联合发券');await page.getByRole('button',{name:/判断依据 收益评估/}).click();assert(await page.locator('.collab-description h3').innerText()==='先明确各方的目标与约束。','Mechanism node');
 const storyTabs=page.getByRole('tablist',{name:'案例过程'});await storyTabs.getByRole('tab',{name:'问题',exact:true}).click();await page.keyboard.press('ArrowRight');assert(await storyTabs.getByRole('tab',{name:'判断',exact:true}).getAttribute('aria-selected')==='true','Arrow tab navigation');await page.keyboard.press('End');assert(await storyTabs.getByRole('tab',{name:'结果',exact:true}).getAttribute('aria-selected')==='true','End tab navigation');
 await page.reload();await settled(page,'多预算联合发券');assert(page.url().endsWith('#/projects/budget-collaboration'),'Deep-link refresh');
 await route(page,'/work');await page.getByRole('tablist',{name:'选择工作阶段'}).getByRole('tab').first().click();assert(await page.locator('.career-detail').innerText().then(t=>t.includes('达摩盘 3.0')),'Career tabs');
 await page.evaluate(()=>scrollTo(0,400));await page.waitForTimeout(100);const before=await page.evaluate(()=>scrollY);await page.locator('.site-nav').getByRole('link',{name:'代表项目',exact:true}).click();await settled(page,'代表项目');await page.goBack();await settled(page,'职业旅程');assert(Math.abs(await page.evaluate(()=>scrollY)-before)<4,'Back did not restore reading position');await page.goForward();await settled(page,'代表项目');
 await route(page,'/projects/qcpx');await page.getByRole('button',{name:'起点',exact:true}).click();assert(await page.locator('.qcpx-bars').innerText().then(t=>t.includes('66%')&&t.includes('3.7%')),'QCPX starting metrics');await page.getByRole('button',{name:'阶段结果',exact:true}).click();assert(await page.locator('.qcpx-bars').innerText().then(t=>t.includes('86.7%')&&t.includes('14%')),'QCPX final metrics');
 await route(page,'/projects/marketing-cube');await page.getByRole('tab',{name:'分析',exact:true}).click();assert(await page.locator('.cube-controls [role=tabpanel]').innerText().then(t=>t.includes('报表分析')),'Cube capabilities');
 await route(page,'/projects/cps');await page.getByRole('tab',{name:/客户验证/}).click();assert(await page.locator('.cps-stage-detail').innerText().then(t=>t.includes('待测试')),'CPS status');
 await route(page,'/approach');await page.getByRole('tablist').getByRole('tab').last().click();assert(await page.locator('.approach-note').innerText().then(t=>t.includes('方向授权')),'Approach steps');
 await route(page,'/venture');await page.getByRole('tab',{name:/高校合作/}).click();assert(await page.locator('.venture-validation [role=tabpanel]').innerText().then(t=>t.includes('10 万元级')),'Venture validation');
 await route(page,'/research');await page.locator('.journal-index').getByRole('button',{name:/代表作品/}).click();await page.waitForTimeout(500);assert(await page.evaluate(()=>scrollY)>0,'Journal section navigation');assert(await page.getByRole('link',{name:'阅读论文'}).getAttribute('href').then(h=>h.startsWith('https://scholar.google.com/scholar?')),'Scholar link');assert(await page.locator('.publication-citation').innerText().then(t=>t.includes('130')),'Representative citations');
 await route(page,'/contact');await page.getByRole('button',{name:'复制邮箱'}).click();assert(await page.evaluate(()=>navigator.clipboard.readText())==='dearjp2014@163.com','Copy email');await page.getByRole('button',{name:'复制电话'}).click();assert(await page.evaluate(()=>navigator.clipboard.readText())==='15910918639','Copy phone');assert(await page.getByRole('link',{name:'打开邮箱'}).getAttribute('href').then(h=>h.startsWith('mailto:dearjp2014@163.com')),'Mail link');assert(await page.getByRole('link',{name:'15910918639'}).getAttribute('href')==='tel:15910918639','Telephone link');
 const [download]=await Promise.all([page.waitForEvent('download'),page.locator('.site-actions .download-link').click()]);const downloaded=fs.readFileSync(await download.path());assert(digest(downloaded)===digest(sourcePdf),'Download differs from official PDF');
 await page.locator('.motion-toggle').click();assert(await page.locator('.gallery-app').getAttribute('class').then(c=>c.includes('reduce-motion')),'Manual reduced motion');await page.reload();await settled(page,'联系我');assert(await page.locator('.gallery-app.reduce-motion').count()===1,'Motion preference not retained');
 await page.locator('.motion-toggle').click();for(const name of ['职业旅程','代表项目','研究与学术','做事方式']){await page.locator('.site-nav').getByRole('link',{name,exact:true}).click({force:true});}await settled(page,'做事方式');
 await page.goto(base+'#/unknown');await page.getByRole('heading',{name:/回到展厅/}).waitFor();await page.getByRole('link',{name:'返回展厅',exact:true}).click();await settled(page,'展厅首页');await context.close();
 const reducedContext=await browser.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const rp=await reducedContext.newPage();await route(rp,'/');await rp.getByRole('link',{name:'看我的项目',exact:true}).click();await settled(rp,'代表项目');assert(await rp.locator('.route-portal').count()===0,'OS reduced motion portal');assert(await rp.locator('.gallery-app.reduce-motion').count()===1,'OS reduced motion class');await reducedContext.close();
 assert(errors.length===0,'Browser errors: '+errors.join('\n'));
 fs.writeFileSync(path.join(out,'verification.json'),JSON.stringify({base,checkedAt:new Date().toISOString(),findings,errors,passed:['routes','refresh','history','scroll','keyboard','mechanisms','metrics','menu','clipboard','email','tel','PDF hash','reduced motion','rapid navigation','fallback']},null,2));
 console.log('Passed: '+findings.length+' route/device layouts; navigation, history, interaction, accessibility, contact and exact PDF download.');
}finally{await browser.close();}
