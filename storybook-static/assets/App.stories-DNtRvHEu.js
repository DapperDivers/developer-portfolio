const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./smoothscroll-Bc4c12Lx.js","./_commonjsHelpers-CqkleIqs.js","./Greetings-DWEnjiiu.js","./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js","./jsx-runtime-BuIwgEqq.js","./index-B6-Y_Zgq.js","./PortfolioContext-CM91bWnU.js","./index-Co38GRlK.js","./dev-coding-DSnmwsmw.js","./index-LaBibFJR.js","./Button-DTt19CJR.js","./iconify-BRCYAcB5.js","./DisplayLottie-BzSg4w-g.js","./Loading-DnxwpyrZ.js","./SocialLinks-DRjwrL1j.js","./proxy-Vqfb2hit.js","./Skills-BPcnO0Y6.js","./dev-webdev-BS9LylDY.js","./Skill-DEX2uO-l.js","./tailwind-DFzwuMQg.css","./SkeletonCard-CCuh-sAq.js","./Section-D0daCtUT.js","./Proficiency-8_ri9l1u.js","./Education-D7ZFYMVO.js","./EducationCard-ChW5JNA7.js","./Card-piHSsVOW.js","./useIntersectionObserver-D-75sPdH.js","./Experience-C1ifQCVF.js","./ExperienceCard-BC3092ar.js","./ResponsiveImage-DeSVJz96.js","./Projects-BIzzySeu.js","./ProjectsCard-CatNf-Dc.js","./GithubProfile-RuwLMCHm.js","./GithubProfileCard-6MlIJpjd.js","./envConfig-DP59KUwZ.js","./Feedbacks-Btgug8lc.js","./FeedbackCard-B8QmyUa1.js"])))=>i.map(i=>d[i]);
import{j as y,a as e}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import{r as a}from"./index-B6-Y_Zgq.js";import{_ as l}from"./iframe-hKvExgqn.js";import{H as z}from"./Head-PA0Co7_A.js";import{N as H}from"./Navigation-BbhDlWTa.js";import{F as j}from"./Footer-hLnq4Z6W.js";import{S as M}from"./SkipToContent--EoLpGE5.js";import{e as v}from"./envConfig-DP59KUwZ.js";import{L as d}from"./Loading-DnxwpyrZ.js";import{P as h}from"./index-Co38GRlK.js";import{a as q}from"./PortfolioContext-CM91bWnU.js";import{H as V}from"./index.esm-B_4_A6mH.js";/* empty css              *//* empty css                 */import{w as N,e as u}from"./index-DZ0MIZXx.js";import{w as W,a as O}from"./decorators-DZYmSUt9.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-LaBibFJR.js";import"./Button-DTt19CJR.js";import"./iconify-BRCYAcB5.js";import"./SocialLinks-DRjwrL1j.js";import"./mockData-Bv86VHFx.js";const U=()=>{try{const t={get passive(){return window.supportPassiveEvents=!0,!0}};window.addEventListener("test",null,t),window.removeEventListener("test",null,t)}catch{window.supportPassiveEvents=!1}"scrollBehavior"in document.documentElement.style||l(()=>import("./smoothscroll-Bc4c12Lx.js").then(t=>t.s),__vite__mapDeps([0,1]),import.meta.url).then(t=>{t.polyfill()}),document.addEventListener("touchstart",function(){},window.supportPassiveEvents?{passive:!0}:!1);try{const t=document.createElement("div");if(t.style.setProperty("--test","0"),t.style.getPropertyValue("--test")!=="0"){const o=document.createElement("style");o.textContent=`
        /* Basic CSS variable fallbacks for older browsers */
        :root {
          /* Core layout variables */
          --container-width: 1140px;
          --spacing-unit: 8px;
          
          /* Colors */
          --primary: #3563E9;
          --secondary: #4D5E80;
          --accent: #14B8A6;
          --light: #F5F9FF;
          --dark: #1A1F36;
          --white: #FFFFFF;
          
          /* Typography */
          --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          --font-size-base: 16px;
          --line-height-base: 1.5;
        }
        
        /* IE/Edge specific styles */
        @media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
          /* Apply fallback values directly */
          .container { max-width: 1140px; }
          .primary-color { color: #3563E9; }
          .primary-bg { background-color: #3563E9; }
          .secondary-color { color: #4D5E80; }
          .accent-color { color: #14B8A6; }
        }
      `,document.head.appendChild(o),window.cssVars=function(){console.log("CSS Variables polyfill applied")}}}catch(t){console.warn("Error detecting CSS variable support",t)}},w={defaultPlaceholder:"/assets/img/placeholder.svg"},X=()=>{const t=(()=>{const r=document.createElement("canvas");return r.getContext&&r.getContext("2d")?r.toDataURL("image/webp").indexOf("data:image/webp")===0:!1})();return(()=>{const r=new Image;return r.canPlayType&&r.canPlayType("image/avif").replace(/no/,"")})()?"avif":t?"webp":"jpg"},E=(t=document)=>{if(!("IntersectionObserver"in window)){t.querySelectorAll("img[data-src]").forEach(i=>{i.src=i.dataset.src,i.dataset.srcset&&(i.srcset=i.dataset.srcset)});return}const o=new IntersectionObserver(n=>{n.forEach(i=>{if(i.isIntersecting){const c=i.target;c.dataset.src&&(c.src=c.dataset.src),c.dataset.srcset&&(c.srcset=c.dataset.srcset),c.classList.add("loaded"),o.unobserve(c)}})},{rootMargin:"50px 0px",threshold:.01});t.querySelectorAll("img[data-src]").forEach(n=>{!n.src&&w.defaultPlaceholder&&(n.src=w.defaultPlaceholder),n.style.transition="opacity 0.3s ease-in-out",n.style.opacity="0",n.addEventListener("load",()=>{n.style.opacity="1"}),o.observe(n)})},G=(t=[])=>{if(!t.length)return;const o=X();t.forEach(r=>{const n=document.createElement("link");if(n.rel="preload",n.as="image",r.startsWith("/")||r.startsWith("./")){const i=r.split(".");i.length>1&&(i.pop(),r=`${i.join(".")}.${o}`)}n.href=r,document.head.appendChild(n)})},$=()=>{document.readyState==="complete"?E():window.addEventListener("load",()=>{E()});{const t=[];t.length>0&&G(t)}},J=()=>{const t=["default-src 'self'","script-src 'self' 'unsafe-inline' https://api.github.com https://code.iconify.design","style-src 'self' 'unsafe-inline' https://fonts.googleapis.com","img-src 'self' data: https://avatars.githubusercontent.com https://*.githubusercontent.com","font-src 'self' https://fonts.gstatic.com","connect-src 'self' https://api.github.com https://api.iconify.design https://cdn.jsdelivr.net","frame-src 'none'","object-src 'none'"].join("; "),o=document.createElement("meta");o.httpEquiv="Content-Security-Policy",o.content=t,document.head.appendChild(o)},K=()=>{const t=document.createElement("meta");t.name="referrer",t.content="same-origin",document.head.appendChild(t)},Q=t=>{const o=document.createElement("div");return o.textContent=t,o.innerHTML},Y=()=>{if(window!==window.top)try{window.top.location.hostname}catch{document.body.innerHTML="This page cannot be displayed in a frame.",document.body.style.backgroundColor="#fff",document.body.style.color="#000",document.body.style.padding="20px",document.body.style.textAlign="center",document.body.style.fontFamily="sans-serif"}},Z=()=>{if((v.isDevelopment||!window.location.hostname.includes("localhost"))&&J(),K(),Y(),document.querySelectorAll("input, textarea").forEach(t=>{t.addEventListener("change",o=>{o.target.value=Q(o.target.value)})}),document.querySelectorAll('a[target="_blank"]').forEach(t=>{t.setAttribute("rel","noopener noreferrer")}),v.isDevelopment){const t=document.createComment(" Security headers (X-Frame-Options, Strict-Transport-Security, X-XSS-Protection) are properly set server-side in server.js using Helmet middleware ");document.head.appendChild(t)}};class s extends a.Component{constructor(o){super(o),this.state={hasError:!1,error:null,errorInfo:null}}static getDerivedStateFromError(o){return{hasError:!0,error:o}}componentDidCatch(o,r){console.error("Error caught by ErrorBoundary:",o,r),this.setState({errorInfo:r}),this.props.onError&&this.props.onError(o,r)}render(){const{hasError:o,error:r,errorInfo:n}=this.state,{fallback:i,children:c}=this.props;return o?i?typeof i=="function"?i(r,n):i:y("div",{className:"error-boundary",role:"alert",children:[e("h2",{children:"Something went wrong."}),y("details",{children:[e("summary",{children:"Error details"}),e("p",{children:r==null?void 0:r.toString()}),e("p",{children:n==null?void 0:n.componentStack})]})]}):c}}s.propTypes={children:h.node.isRequired,fallback:h.oneOfType([h.node,h.func]),onError:h.func};s.__docgenInfo={description:`Error Boundary component to catch JavaScript errors in child components
and display a fallback UI instead of crashing the whole application.

@component`,methods:[],displayName:"ErrorBoundary",props:{children:{description:"",type:{name:"node"},required:!0},fallback:{description:"",type:{name:"union",value:[{name:"node"},{name:"func"}]},required:!1},onError:{description:"",type:{name:"func"},required:!1}}};const ee=a.lazy(()=>l(()=>import("./Greetings-DWEnjiiu.js"),__vite__mapDeps([2,3,4,5,1,6,7,8,9,10,11,12,13,14,15]),import.meta.url)),te=a.lazy(()=>l(()=>import("./Skills-BPcnO0Y6.js"),__vite__mapDeps([16,3,4,5,1,12,13,9,17,18,7,11,15,19,20,21,6]),import.meta.url)),oe=a.lazy(()=>l(()=>import("./Proficiency-8_ri9l1u.js"),__vite__mapDeps([22,3,4,5,1,6,7,12,13,9,15]),import.meta.url)),re=a.lazy(()=>l(()=>import("./Education-D7ZFYMVO.js"),__vite__mapDeps([23,3,4,5,1,24,7,9,25,15,26,21,19,6]),import.meta.url)),ne=a.lazy(()=>l(()=>import("./Experience-C1ifQCVF.js"),__vite__mapDeps([27,3,4,5,1,28,7,25,15,29,26,19,20,21,9,11,6]),import.meta.url)),ae=a.lazy(()=>l(()=>import("./Projects-BIzzySeu.js"),__vite__mapDeps([30,3,4,5,1,31,7,25,15,10,11,29,26,19,20,21,9,6]),import.meta.url)),ie=a.lazy(()=>l(()=>import("./GithubProfile-RuwLMCHm.js").then(t=>t.b),__vite__mapDeps([32,3,4,5,1,7,13,6,33,9,14,10,11,15,21,19,34]),import.meta.url)),se=a.lazy(()=>l(()=>import("./Feedbacks-Btgug8lc.js"),__vite__mapDeps([35,3,4,5,1,36,7,9,25,15,29,26,19,21,6]),import.meta.url));function g(){return a.useEffect(()=>{U(),$(),Z()},[]),e(s,{fallback:()=>y("div",{className:"error-container",role:"alert",style:{padding:"2rem",margin:"2rem auto",maxWidth:"800px",textAlign:"center"},children:[e("h1",{children:"Something went wrong"}),e("p",{children:"We're sorry, but there was an error loading this page."}),e("p",{children:"Try reloading the page or clearing your browser cache."}),e("button",{onClick:()=>window.location.reload(),style:{padding:"0.5rem 1rem",background:"#3563E9",color:"white",border:"none",borderRadius:"4px",cursor:"pointer",marginTop:"1rem"},children:"Reload Page"})]}),children:e(V,{children:e(q,{children:y("div",{className:"App",children:[e(z,{}),e(M,{mainId:"main-content"}),e(H,{}),y("main",{id:"main-content",children:[e(s,{children:e(a.Suspense,{fallback:e(d,{}),children:e(ee,{})})}),e(s,{children:e(a.Suspense,{fallback:e(d,{}),children:e(te,{})})}),e(s,{children:e(a.Suspense,{fallback:e(d,{}),children:e(oe,{})})}),e(s,{children:e(a.Suspense,{fallback:e(d,{}),children:e(re,{})})}),e(s,{children:e(a.Suspense,{fallback:e(d,{}),children:e(ne,{})})}),e(s,{children:e(a.Suspense,{fallback:e(d,{}),children:e(se,{})})}),e(s,{children:e(a.Suspense,{fallback:e(d,{}),children:e(ae,{})})}),e(s,{children:e(a.Suspense,{fallback:e(d,{}),children:e(ie,{id:"contact"})})})]}),e(j,{})]})})})})}g.__docgenInfo={description:"",methods:[],displayName:"App"};const R=t=>e(V,{context:{},children:e(t,{})});R.__docgenInfo={description:`A decorator that provides a HelmetProvider with a mock context.
This is necessary for components that use react-helmet-async to work in Storybook.

@example
export default {
  title: 'Components/MyComponent',
  component: MyComponent,
  decorators: [withHelmetProvider],
};`,methods:[],displayName:"withHelmetProvider"};const Fe={title:"Templates/App",component:g,tags:["autodocs"],decorators:[R,W],parameters:{docs:{description:{component:"Main application component that composes the entire portfolio page structure. It integrates the header, navigation, all content sections, and footer into a complete page layout."}},a11y:{config:{rules:[{id:"landmark-unique",enabled:!0},{id:"heading-order",enabled:!0},{id:"skip-link",enabled:!0}]}},layout:"fullscreen",paddings:{disable:!0}}},b=()=>e(g,{}),f=b.bind({});f.play=async({canvasElement:t,step:o})=>{const r=N(t);await o("Verify main structural elements",async()=>{await u(r.getByText("Skip to content")).toBeInTheDocument(),await u(r.getByRole("navigation")).toBeInTheDocument(),await u(r.getByRole("main")).toBeInTheDocument(),await u(r.getByRole("contentinfo")).toBeInTheDocument()}),await o("Verify key sections exist",async()=>{await u(r.getByText("Proficiency")).toBeInTheDocument(),await u(r.getByText("Skills")).toBeInTheDocument()})};const p=b.bind({});p.decorators=[O("mobile")];p.parameters={docs:{description:{story:"Mobile view of the complete portfolio showing responsive layout adaptations."}}};const m=b.bind({});m.decorators=[O("tablet")];m.parameters={docs:{description:{story:"Tablet view of the complete portfolio."}}};var _,S,P;f.parameters={...f.parameters,docs:{...(_=f.parameters)==null?void 0:_.docs,source:{originalSource:"() => <App />",...(P=(S=f.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var k,x,T,C,A;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:"() => <App />",...(T=(x=p.parameters)==null?void 0:x.docs)==null?void 0:T.source},description:{story:"Mobile view of the complete portfolio",...(A=(C=p.parameters)==null?void 0:C.docs)==null?void 0:A.description}}};var I,F,D,L,B;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:"() => <App />",...(D=(F=m.parameters)==null?void 0:F.docs)==null?void 0:D.source},description:{story:"Tablet view of the complete portfolio",...(B=(L=m.parameters)==null?void 0:L.docs)==null?void 0:B.description}}};const De=["CompletePortfolio","MobileView","TabletView"];export{f as CompletePortfolio,p as MobileView,m as TabletView,De as __namedExportsOrder,Fe as default};
