import{a as o}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import{r}from"./index-B6-Y_Zgq.js";import{F as a}from"./FeedbackCard-B8QmyUa1.js";import{S as c}from"./Section-D0daCtUT.js";import{u as m}from"./PortfolioContext-CM91bWnU.js";import"./jsx-runtime-BuIwgEqq.js";import"./_commonjsHelpers-CqkleIqs.js";import"./index-Co38GRlK.js";import"./index-LaBibFJR.js";import"./Card-piHSsVOW.js";import"./proxy-Vqfb2hit.js";import"./ResponsiveImage-DeSVJz96.js";import"./useIntersectionObserver-D-75sPdH.js";/* empty css                 */const d=()=>{const{feedbacks:e}=m();return e},t=()=>{const e=d(),s={initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px"},transition:{duration:.5}};return!e||e.length===0?null:o(c,{id:"testimonials",title:"Personal Recommendations",icon:"simple-icons:trustpilot",animation:s,className:"py-16","data-testid":"feedbacks-section",children:o("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:e.map((n,i)=>o(a,{data:n,index:i},`feedback-${i}`))})})};t.propTypes={};const v=r.memo(t);t.__docgenInfo={description:`Feedbacks section displaying testimonials and recommendations.

@component
@returns {React.ReactElement} Feedbacks component`,methods:[],displayName:"Feedbacks"};export{v as default};
