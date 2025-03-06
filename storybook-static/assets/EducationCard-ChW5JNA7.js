import{j as i,a as e}from"./emotion-react-jsx-runtime.browser.esm-Cpdipq7a.js";import{r as c}from"./index-B6-Y_Zgq.js";import{P as r}from"./index-Co38GRlK.js";import{F as p}from"./index-LaBibFJR.js";import{C as u}from"./Card-piHSsVOW.js";import{u as h}from"./useIntersectionObserver-D-75sPdH.js";const t=({education:a,index:s=0})=>{const[n,o]=h({threshold:.1,rootMargin:"-100px 0px"}),d={initial:{opacity:0,x:-20},animate:o?{opacity:1,x:0}:{opacity:0,x:-20},transition:{duration:.5,delay:.2+s*.1,ease:"easeOut"}};return i("div",{className:"relative mb-8 transition-all duration-300",ref:n,"data-testid":"education-card",children:[e("div",{className:"absolute left-[-28px] top-6 w-4 h-4 rounded-full bg-white border-2 border-primary-400 z-10 shadow-md hidden md:block"}),e("div",{className:"hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-gradient-to-r from-white to-gray-100 shadow-md mb-4",children:e(p,{className:"text-primary-500 text-lg"})}),e(u,{className:"overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",animation:d,shadow:!0,children:i("div",{className:"p-6",children:[e("h5",{className:"text-primary-600 font-bold text-xl mb-2",tabIndex:"0",children:a.schoolName}),e("h6",{className:"font-semibold text-gray-800 mb-3",tabIndex:"0",children:a.subHeader}),e("span",{className:"bg-primary-50 text-primary-600 font-semibold px-3 py-1 rounded-full text-xs tracking-wide mb-4 inline-block","aria-label":`Duration: ${a.duration}`,children:a.duration}),a.desc&&e("p",{className:"text-gray-600 text-sm leading-relaxed mt-3",tabIndex:"0",children:a.desc}),a.descBullets&&a.descBullets.length>0&&e("ul",{className:"pl-5 mt-3 space-y-2","aria-label":"Additional information",children:a.descBullets.map((l,m)=>e("li",{className:"text-gray-600 text-sm list-disc",tabIndex:"0",children:l},m))})]})})]})};t.propTypes={education:r.shape({schoolName:r.string.isRequired,subHeader:r.string.isRequired,duration:r.string.isRequired,desc:r.string,descBullets:r.arrayOf(r.string)}).isRequired,index:r.number};const v=c.memo(t);t.__docgenInfo={description:`Education card component for displaying educational background.

@component
@param {Object} props - Component props
@param {Object} props.education - Education data object
@param {string} props.education.schoolName - Name of the school or institution
@param {string} props.education.subHeader - Degree or certification title
@param {string} props.education.duration - Time period of education
@param {string} [props.education.desc] - Description or details
@param {Array} [props.education.descBullets] - Array of bullet points for additional details
@param {number} [props.index=0] - Index number for staggered animations
@returns {React.ReactElement} EducationCard component`,methods:[],displayName:"EducationCard",props:{index:{defaultValue:{value:"0",computed:!1},description:"",type:{name:"number"},required:!1},education:{description:"",type:{name:"shape",value:{schoolName:{name:"string",required:!0},subHeader:{name:"string",required:!0},duration:{name:"string",required:!0},desc:{name:"string",required:!1},descBullets:{name:"arrayOf",value:{name:"string"},required:!1}}},required:!0}}};export{v as E};
