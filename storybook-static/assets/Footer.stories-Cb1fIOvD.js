import{a as n}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import"./index-B6-Y_Zgq.js";import{F as m}from"./Footer-hLnq4Z6W.js";import{w as _,e as t,u as w}from"./index-DZ0MIZXx.js";import{P as S}from"./PortfolioContext-CM91bWnU.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-LaBibFJR.js";import"./Button-DTt19CJR.js";import"./index-Co38GRlK.js";import"./iconify-BRCYAcB5.js";import"./SocialLinks-DRjwrL1j.js";const h={greetings:{name:"John Doe",title:"Full Stack Developer",description:"I build things for the web.",resumeLink:"https://example.com/resume"},socialLinks:{github:"https://github.com/username",linkedin:"https://linkedin.com/in/username",twitter:"https://twitter.com/username"}},V={greetings:{name:"Jane Smith"},socialLinks:{github:"https://github.com/janesmith"}},d=u=>c=>n(S.Provider,{value:u,children:n(c,{})}),A={title:"Molecules/Footer",component:m,tags:["autodocs"],parameters:{docs:{description:{component:"Footer component with contact information, quick links, and copyright information. Includes social media links and a back-to-top button."}},a11y:{config:{rules:[{id:"landmark-contentinfo-is-top-level",reviewOnFail:!0},{id:"heading-order",reviewOnFail:!0},{id:"color-contrast",reviewOnFail:!0},{id:"link-name",reviewOnFail:!0}]}},layout:"fullscreen",backgrounds:{default:"dark"}}},o=()=>n(m,{});o.decorators=[d(h)];o.play=async({canvasElement:u,step:c})=>{const s=_(u);await c("Initial render check",()=>{t(s.getByText("John Doe")).toBeInTheDocument(),t(s.getByText("Quick Links")).toBeInTheDocument(),t(s.getByText("Contact")).toBeInTheDocument();const e=new Date().getFullYear().toString(),l=s.getByText(new RegExp(`© ${e}`));t(l).toBeInTheDocument();const p=s.getByLabelText("Back to top");t(p).toBeInTheDocument()}),await c("Interaction test - Back to top button",async()=>{const e=s.getByLabelText("Back to top");await w.click(e),t(e).toBeInTheDocument()}),await c("Keyboard navigation test",async()=>{let e=0;for(let l=0;l<10;l++){await w.tab();const p=document.activeElement;p&&p.tagName==="A"&&e++}t(e).toBeGreaterThan(3)})};const a=()=>n(m,{});a.decorators=[d(V)];a.parameters={docs:{description:{story:"Shows how the footer appears with minimal data in the portfolio context."}}};const r=()=>n(m,{});r.decorators=[d(h)];r.parameters={viewport:{defaultViewport:"mobile1"},docs:{description:{story:"Shows how the footer adapts to mobile viewport sizes with a stacked layout."}}};const i=()=>n(m,{});i.decorators=[d(h)];i.parameters={viewport:{defaultViewport:"tablet"},docs:{description:{story:"Shows how the footer appears on tablet sized screens."}}};o.__docgenInfo={description:"",methods:[{name:"play",docblock:null,modifiers:["static"],params:[{name:"{ canvasElement, step }",optional:!1,type:null}],returns:null}],displayName:"Default"};a.__docgenInfo={description:"",methods:[],displayName:"MinimalData"};r.__docgenInfo={description:"",methods:[],displayName:"MobileView"};i.__docgenInfo={description:"",methods:[],displayName:"TabletView"};var f,g,b;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:"() => <Footer />",...(b=(g=o.parameters)==null?void 0:g.docs)==null?void 0:b.source}}};var k,y,T;a.parameters={...a.parameters,docs:{...(k=a.parameters)==null?void 0:k.docs,source:{originalSource:"() => <Footer />",...(T=(y=a.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var D,B,v;r.parameters={...r.parameters,docs:{...(D=r.parameters)==null?void 0:D.docs,source:{originalSource:"() => <Footer />",...(v=(B=r.parameters)==null?void 0:B.docs)==null?void 0:v.source}}};var x,F,I;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:"() => <Footer />",...(I=(F=i.parameters)==null?void 0:F.docs)==null?void 0:I.source}}};const G=["Default","MinimalData","MobileView","TabletView"];export{o as Default,a as MinimalData,r as MobileView,i as TabletView,G as __namedExportsOrder,A as default};
