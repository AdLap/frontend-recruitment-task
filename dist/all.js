const app=document.querySelector("#app");class Popup{constructor(t,e,n,o){this.parentElement=t,this.resetButtonVisible=n,this.currentSection=o,this.popupWrapper=null,this.popupWindow=null,this.popupCloseButton=null,this.popupContentText=document.createTextNode(e)??"No data",this.resetButton=null,this.createPopup()}createPopup(){this.popupWrapper=document.createElement("div"),this.popupWrapper.classList.add("popup"),this.parentElement.prepend(this.popupWrapper),this.popupWrapper.addEventListener("click",t=>this.onClosePopup(t)),this.popupWindow=document.createElement("div"),this.popupWindow.classList.add("popup__window"),this.popupWrapper.append(this.popupWindow);const t=document.createElement("h1"),e=(t.classList.add("popup__window__title"),t.innerText="Alert!",document.createElement("p")),n=(e.classList.add("popup__window__content"),e.append(this.popupContentText),this.popupCloseButton=document.createElement("button"),this.popupCloseButton.classList.add("popup__window__close"),this.popupCloseButton.setAttribute("aria-label","Close pop-up"),this.popupCloseButton.title="Close pop-up",this.popupWindow.append(t,e,this.popupCloseButton),document.createElement("span")),o=(n.classList.add("popup__window__close__left"),document.createElement("span"));o.classList.add("popup__window__close__right"),this.popupCloseButton.append(n,o),this.resetButtonVisible&&this.createResetButton()}onClosePopup(t){t.target!==this.popupWrapper&&t.target!==this.popupCloseButton&&t.target!==this.popupCloseButton.childNodes[0]&&t.target!==this.popupCloseButton.childNodes[1]||(this.popupWrapper.remove(),this.currentSection.onButtonsDisabled(!1),app.parentElement.style.overflow="visible")}onResetCounter(){this.currentSection.onCounterUpdate(0)}createResetButton(){this.resetButton=document.createElement("button"),this.resetButton.classList.add("popup__window__reset"),this.resetButton.innerText="Reset Counter",this.resetButton.setAttribute("aria-label","Reset counter"),this.resetButton.title="Reset counter",this.popupWindow.append(this.resetButton),this.resetButton.focus(),this.resetButton.addEventListener("click",()=>{this.popupContentText.textContent="The counter has beend reset.",this.onResetCounter(),this.resetButton.remove()})}}class Section{constructor(t,e){this.counter=localStorage.getItem("Section-"+e)??0,this.name=e,this.parentElement=t,this.resetButtonVisible=!1,this.button=null,this.createSection()}createSection(){const t=document.createElement("section"),e=(t.classList.add("container"),this.parentElement.append(t),document.createElement("div")),n=(e.classList.add("container__image"),t.append(e),document.createElement("img")),o=(n.classList.add("container__image__picture"),n.src="./images/sean-o-KMn4VEeEPR8-unsplash_1_s6zmfh_ar_16_9,c_fill,g_auto__c_scale,w_596.jpg",n.alt="ocean",n.title="Ocean",e.append(n),document.createElement("article")),s=(o.classList.add("container__content"),t.append(o),document.createElement("h1")),i=(s.classList.add("container__content__title"),s.innerText="Lorem Ipsum",document.createElement("p"));i.classList.add("container__content__paragraph"),i.innerText="Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required.",this.button=document.createElement("button"),this.button.classList.add("container__content__button"),this.button.type="button",this.button.innerText="Button",this.button.title="Open pop-up and increase counter",this.button.setAttribute("aria-label","Click me to increase counter"),o.append(s,i,this.button),this.button.addEventListener("click",()=>this.onOpenPopup())}onCounterUpdate(t){if(0!==(this.counter=t))return localStorage.setItem("Section-"+this.name,t);localStorage.removeItem("Section-"+this.name)}onButtonsDisabled(t){this.button.disabled=t}onOpenPopup(){return++this.counter,localStorage.setItem("Section-"+this.name,this.counter),this.resetButtonVisible=Boolean(5<this.counter),app.parentElement.style.overflow="hidden",this.onButtonsDisabled(!0),new Popup(this.parentElement,`You have clicked ${this.counter} times to related button.`,this.resetButtonVisible,this)}}const firstSection=new Section(app,"first"),secondSection=new Section(app,"second");class _Section{constructor(t){this.counter=0,this.parentElement=t,this.createSection()}createSection(){const t=document.createElement("section"),e=(t.classList.add("container"),this.parentElement.append(t),document.createElement("div")),n=(e.classList.add("container__image"),t.append(e),document.createElement("img")),o=(n.classList.add("container__image__picture"),e.append(n),document.createElement("article")),s=(o.classList.add("container__content"),t.append(o),document.createElement("h1")),i=(s.classList.add("container__content__title"),s.innerText="Lorem Ipsum",o.append(s),document.createElement("p")),a=(i.classList.add("container__content__paragraph"),i.innerText="Infinitely scalable, feature-rich and cloud-native data management and protection for modern and legacy infrastructures and SaaS platforms, managed via a single app with no hardware required.",o.append(i),document.createElement("button"));a.classList.add("container__content__button"),a.type="button",a.innerText="Button",a.setAttribute("aria-label","Click me"),o.append(a),a.onclick=()=>this.onOpenPopup()}onOpenPopup(){return++this.counter,5<=this.counter&&(this.counter=0),console.log("class::",this.counter),new Popup(this.parentElement,`You have clicked ${this.counter} times to related button.`)}}