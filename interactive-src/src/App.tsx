import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { GalleryContext, Header, Footer, TopicGlyph, ProjectGlyph, handleTabKeys } from './components';
import { Home, Work, ProjectIndex, ProjectDetail, Approach, Venture, Research, Contact, NotFound } from './views';
import { topics, projects, ProjectId } from './data';

type Portal = { id: number; left: number; top: number; width: number; height: number; title: string; kind: number; projectId?: ProjectId };
const pageTitles: Record<string, string> = {
  '/': '个人展厅', '/work': '职业旅程', '/projects': '代表项目',
  '/approach': '做事方式', '/venture': '创业实践', '/research': '研究与学术', '/contact': '联系我'
};
function readMotionPreference() {
  try { return localStorage.getItem('jasper-reduced-motion') === 'true'; }
  catch { return false; }
}
function PageStage({ children, reduced, entering, onReady }: {
  children: React.ReactNode; reduced: boolean; entering: boolean; onReady: () => void;
}) {
  // Mount after the outgoing page has left, so focus and scroll use the new content.
  useLayoutEffect(onReady, []);
  return <motion.div className="page-stage"
    initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : -6 }}
    transition={{ duration: reduced ? 0 : 0.18, delay: entering && !reduced ? 0.28 : 0 }}>
    {children}
  </motion.div>;
}
export default function App() {
  const location = useLocation(), navigate = useNavigate(), navigationType = useNavigationType();
  const systemReduced = useReducedMotion();
  const [manualReduced, setMotionPreference] = useState(readMotionPreference);
  const [portal, setPortal] = useState<Portal | null>(null);
  const reduced = manualReduced || Boolean(systemReduced);
  const positions = useRef(new Map<string, number>());
  const renderedKey = useRef(location.key), latestPortal = useRef(0);
  function setManualReduced(value: boolean) {
    setMotionPreference(value);
    try { localStorage.setItem('jasper-reduced-motion', String(value)); } catch { /* Storage is optional. */ }
  }
  function focusContent() {
    const heading = document.querySelector<HTMLElement>('main h1');
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
  }
  function go(path: string, event?: React.MouseEvent<HTMLElement>) {
    if (path === location.pathname) {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
      focusContent();
      return;
    }
    positions.current.set(renderedKey.current, window.scrollY);
    if (!reduced && event) {
      const rect = event.currentTarget.getBoundingClientRect();
      const project = projects.find(p => path === '/projects/' + p.id);
      const topic = topics.find(t => path === t.path);
      const id = ++latestPortal.current;
      setPortal({ id, left: rect.left, top: rect.top, width: Math.max(rect.width, 48),
        height: Math.max(rect.height, 44), title: project?.title || topic?.name || pageTitles[path] || '个人展厅',
        kind: project?.kind ?? topic?.kind ?? 1, projectId: project?.id });
    } else { setPortal(null); }
    navigate(path);
  }
  function onPageReady() {
    const top = navigationType === 'POP' ? positions.current.get(location.key) || 0 : 0;
    renderedKey.current = location.key;
    window.scrollTo({ top, behavior: 'instant' });
    requestAnimationFrame(focusContent);
  }
  const value = useMemo(() => ({ go, reduced, manualReduced, setManualReduced }), [location.pathname, reduced, manualReduced]);
  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    const savePosition = () => positions.current.set(renderedKey.current, window.scrollY);
    window.addEventListener('scroll', savePosition, { passive: true });
    return () => { window.removeEventListener('scroll', savePosition); window.history.scrollRestoration = previous; };
  }, []);
  useEffect(() => {
    const project = projects.find(p => location.pathname === '/projects/' + p.id);
    document.title = (project?.title || pageTitles[location.pathname] || '个人展厅') + ' — Jasper P';
    if (navigationType === 'POP') setPortal(null);
  }, [location.key]);
  useEffect(() => { if (reduced) setPortal(null); }, [reduced]);
  return <GalleryContext.Provider value={value}>
    <div className={reduced ? 'gallery-app reduce-motion' : 'gallery-app'}>
      <a className="skip-link" href="#main-content" onClick={event => {
        event.preventDefault();
        document.getElementById('main-content')?.scrollIntoView({ behavior: 'instant' });
        focusContent();
      }}>跳到主要内容</a>
      <Header />
      <div id="main-content" tabIndex={-1} onKeyDown={handleTabKeys}>
        <AnimatePresence mode="wait" initial={false}>
          <PageStage key={location.key} reduced={reduced} entering={Boolean(portal)} onReady={onPageReady}>
            <Routes location={location}>
              <Route path="/" element={<Home />} /><Route path="/work" element={<Work />} />
              <Route path="/projects" element={<ProjectIndex />} /><Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/approach" element={<Approach />} /><Route path="/venture" element={<Venture />} />
              <Route path="/research" element={<Research />} /><Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageStage>
        </AnimatePresence>
      </div>
      <Footer />
      <AnimatePresence>
        {portal && !reduced && <motion.div key={portal.id} className={'route-portal portal-kind-' + portal.kind}
          role="presentation" aria-hidden="true"
          initial={{ left: portal.left, top: portal.top, width: portal.width, height: portal.height, borderRadius: 12, opacity: 1 }}
          animate={{ left: 0, top: window.innerWidth < 1180 ? 67 : 88, width: window.innerWidth,
            height: window.innerHeight - (window.innerWidth < 1180 ? 67 : 88), borderRadius: 0, opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.14 } }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          onAnimationComplete={() => { if (latestPortal.current === portal.id) { setPortal(null); focusContent(); } }}>
          <div className="portal-content"><span>Jasper P / {portal.title}</span>
            <div className="portal-art">{portal.projectId?<ProjectGlyph id={portal.projectId}/>:<TopicGlyph kind={portal.kind} />}</div><strong>{portal.title}</strong>
          </div>
        </motion.div>}
      </AnimatePresence>
    </div>
  </GalleryContext.Provider>;
}
