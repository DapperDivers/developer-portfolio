import{a as t,j as v}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import{r as i}from"./index-B6-Y_Zgq.js";import{E as S}from"./ExperienceCard-BC3092ar.js";import{S as A}from"./SkeletonCard-CCuh-sAq.js";import{S as E}from"./Section-D0daCtUT.js";import{I as R}from"./iconify-BRCYAcB5.js";import{u as L}from"./PortfolioContext-CM91bWnU.js";import{m as I}from"./proxy-Vqfb2hit.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";import"./Card-piHSsVOW.js";import"./ResponsiveImage-DeSVJz96.js";import"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */import"./index-LaBibFJR.js";const O=e=>e&&typeof e=="object"&&typeof e.company=="string"&&typeof e.role=="string"&&typeof e.date=="string"&&typeof e.desc=="string"&&typeof e.companylogo=="string",j=(e={})=>{const{filter:y,sortBy:s="recent",delay:a=0}=e,{experience:o}=L(),[f,r]=i.useState(a>0);i.useEffect(()=>{let c;return a>0&&(r(!0),c=setTimeout(()=>{r(!1)},a)),()=>{c&&clearTimeout(c)}},[a]);const d=i.useMemo(()=>{if(!o||!Array.isArray(o))return console.warn("Experience data is missing or invalid"),[];let c=o.filter(O);if(y&&typeof y=="string"&&y.length>0){const l=y.toLowerCase();c=c.filter(p=>{const w=p.company.toLowerCase().includes(l),x=p.role.toLowerCase().includes(l),n=p.desc.toLowerCase().includes(l);return w||x||n})}switch(s){case"company":return[...c].sort((l,p)=>l.company.localeCompare(p.company));case"role":return[...c].sort((l,p)=>l.role.localeCompare(p.role));case"recent":default:return c}},[o,y,s]);return f?null:d},z=(e={})=>{const{defaultView:y="timeline",animationDelayIncrement:s=150,enableIntersectionObserver:a=!0}=e,[o,f]=i.useState(y),r=i.useRef([]),d=i.useRef(null),c=i.useCallback(()=>{f(n=>n==="timeline"?"grid":"timeline")},[]),l=i.useCallback(n=>{(n==="timeline"||n==="grid")&&f(n)},[]),p=i.useCallback(n=>`${n*(s/1e3)}s`,[s]),w=i.useCallback(n=>g=>{g&&(r.current[n]=g)},[]);i.useEffect(()=>{if(!a)return;d.current=new IntersectionObserver(h=>{h.forEach(b=>{b.isIntersecting&&(b.target.classList.add("visible"),d.current.unobserve(b.target))})},{threshold:.2,rootMargin:"0px 0px -100px 0px"});const g=setTimeout(()=>{r.current.length>0&&r.current.forEach(h=>{h&&d.current.observe(h)})},100);return()=>{d.current&&d.current.disconnect(),clearTimeout(g)}},[a,o]),i.useEffect(()=>{const n=()=>{window.innerWidth<992&&o==="timeline"&&f("grid")};return n(),window.addEventListener("resize",n),()=>{window.removeEventListener("resize",n)}},[o]);const x=i.useCallback(n=>{const g=n.match(/(\d{4})/g);return g?g[0]:""},[]);return{viewType:o,toggleView:c,setView:l,getAnimationDelay:p,entryRef:w,entriesRef:r,extractDateYear:x}},C=()=>{var k,N,T,V,$;const e=L(),y=((k=e==null?void 0:e.settings)==null?void 0:k.loadingDelay)||0,s=j({sortBy:"recent",delay:y}),a=((N=e==null?void 0:e.experienceSection)==null?void 0:N.title)||"Experience",o=(T=e==null?void 0:e.experienceSection)==null?void 0:T.subtitle,f=((V=e==null?void 0:e.experienceSection)==null?void 0:V.viewType)||"timeline",{viewType:r,setView:d,getAnimationDelay:c,entryRef:l,extractDateYear:p}=z({defaultView:f,animationDelayIncrement:150,enableIntersectionObserver:!0}),w=i.useMemo(()=>`layout-${r}`,[r]),x=i.useCallback(u=>{d(u)},[d]),n=i.useMemo(()=>3,[]),g=!s,h=s&&s.length===0;if((($=e==null?void 0:e.experienceSection)==null?void 0:$.display)===!1)return null;const b=i.useMemo(()=>({initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px"},transition:{duration:.5,type:"tween",translateY:!0}}),[]);if(g)return t(E,{id:"experience",title:a,subtitle:o,icon:"simple-icons:briefcase",className:"experience-section",children:t("div",{className:"experience-grid experience-grid-loading skeleton-staggered",children:Array.from({length:n}).map((u,m)=>t(A,{type:"experience",index:m},m))})});if(h)return t(E,{id:"experience",title:a,subtitle:o,icon:"simple-icons:briefcase",className:"experience-section",children:t("div",{className:"experience-empty-state",children:t("p",{children:"No work experience is currently available."})})});const M=()=>v("div",{className:"view-controls",children:[v("button",{type:"button",className:`view-toggle ${r==="timeline"?"active":""}`,onClick:()=>x("timeline"),"aria-pressed":r==="timeline",children:[t(R,{icon:"mdi:timeline-outline",className:"view-icon","aria-hidden":"true"}),t("span",{children:"Timeline"})]}),v("button",{type:"button",className:`view-toggle ${r==="grid"?"active":""}`,onClick:()=>x("grid"),"aria-pressed":r==="grid",children:[t(R,{icon:"mdi:grid",className:"view-icon","aria-hidden":"true"}),t("span",{children:"Grid"})]})]});return v(E,{id:"experience",title:a,subtitle:o,icon:"simple-icons:briefcase",animation:b,className:`experience-section ${w}`,"aria-label":"Work experience history",children:[M(),t("div",{className:"experience-grid","aria-label":`${s.length} work experiences in grid layout`,children:s.map((u,m)=>t(S,{data:u,index:m},`experience-grid-${u.company}-${m}`))}),t("div",{className:"experience-timeline timeline-animate-in","aria-label":`${s.length} work experiences in timeline layout`,children:s.map((u,m)=>v(I.div,{className:"timeline-entry",ref:l(m),style:{transitionDelay:c(m)},initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px 0px"},transition:{duration:.5,delay:.1*m,ease:"easeOut"},children:[t("div",{className:"timeline-date","aria-label":`Work period: ${u.date}`,children:p(u.date)}),t(S,{data:u,index:m})]},`experience-timeline-${u.company}-${m}`))})]})};C.propTypes={};const ee=i.memo(C);C.__docgenInfo={description:`Experience section component displaying work history.
Renders a grid of ExperienceCard components with work history data.

@component
@returns {React.ReactElement} Experience section component

@example
// Usage in App.jsx or another container
import Experience from './containers/Experience';

const App = () => (
  <main>
    <Experience />
  </main>
);`,methods:[],displayName:"Experience"};export{ee as default};
