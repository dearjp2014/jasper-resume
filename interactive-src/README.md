# Jasper P 个人展厅

第二阶段完整网站，面向求职与专业合作。基于已确认的第一阶段设计，保留明亮展厅首页、横向项目协作链与纵向研究文献页。由 React、TypeScript、Vite、Motion 和 HashRouter 实现，构建为纯静态文件。

正式入口：https://dearjp2014.github.io/jasper-resume/about/

## 页面与功能

- `#/work`：四段职业时间线与阶段详情。
- `#/projects`：项目展厅；`#/projects/qcpx`、`#/projects/budget-collaboration`、`#/projects/marketing-cube`、`#/projects/cps`：四个案例。
- `#/approach`：做事步骤与对应项目。
- `#/venture`：深度眺望定位、高校合作和付费验证。
- `#/research`：教育、论文与数学竞赛经历，保留 Scholar 链接。
- `#/contact`：公开邮箱与手机号、复制、邮件与电话链接。
- 全站包含正式一页简历链接和 PDF 下载；支持直接访问/刷新主题链接、前进后退、原生滚动、键盘操作、减少动画偏好。

## 开发与构建

Node.js 24，进入本目录执行：

```sh
npm ci
npm run dev
npm run build
npm run check:frozen
```

`vite.config.ts` 的 `base` 为 `/jasper-resume/about/`，输出写入仓库根目录下的 `about/`，GitHub Pages 继续使用 main 分支根目录发布。

本地可从仓库上一级运行静态服务：

```sh
python3 -m http.server 8876
```

然后访问 `http://127.0.0.1:8876/jasper-resume/about/`。

## 浏览器验收

测试脚本使用 Playwright 新建无头浏览器上下文，不操作用户当前浏览器。先安装测试浏览器：

```sh
npx playwright install chromium
npm run verify
```

`JASPER_BASE_URL` 可以指定本地或线上入口；`JASPER_QA_OUTPUT` 指定截图和 JSON 报告的输出目录（默认 `/tmp/jasper-about-qa`）。脚本检查所有主题/案例在 1440、1100、768、390、320 宽度下的布局，以及刷新、历史导航和阅读位置、键盘标签切换、机制与指标交互、手机菜单、联系复制、准确的 PDF 下载、减少动画与快速切页。

## 内容与素材

`src/data.ts` 维护已公开的身份、工作经历、指标、项目过程与方法提炼。联合发券指标表示日均净收贡献“增至约 6.2 倍”（2026.06–09）；130 次被引对应单篇代表作；4 篇为论文总数。智能商家券的 +6.5% 是策略实验结果，CPS 产品客户效果仍待测试。

主视觉、图标、机制图和创业概念图为原创示意。Archivo 字体随项目保存，许可为 OFL（见 `public/fonts/OFL.txt`）。网站无数据库、联系表单、访问追踪或 AI 对话。

`frozen-files.json` 保护原简历页面、既有入口和定稿 PDF；下载版本为该 PDF 的逐字节副本。第一阶段 `intro-design/` 与 `design/` 独立保留。
