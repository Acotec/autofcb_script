(function (){window.history.replaceState&&window.history.replaceState(null,null,window.location.href),GM_addValueChangeListener("shortner_name",function(e,t,o,n){GM_setValue("shortner_name",o),GM_setValue("previous_shortner_name",t)});var messageError,linkCantBypass,listOfAcceptDomains=GM_getValue("domains",""),retry=3,green_icon=GM_getValue("green_icon",""),green_icon1=GM_getValue("green_icon1",""),grey_icon=GM_getValue("grey_icon",""),red_icon=GM_getValue("red_icon",""),autoFCB="auto(faucet|claim|bitco).(in|org)",gist_id="8f5a3bd519f0ebf94708ad624ffd76d2",delayOn=GM_getValue("delayOn","[]"),update_delayOn=GM_getValue("update_delayOn",!0);function getIcons(){fetch("https://gist.githubusercontent.com/Harfho/63966e7f7145a5607e710a4cdcb31906/raw/ALBypass_icons.json").then(e=>e.ok?e.json():Promise.reject(e)).then(e=>{var t=e.green_icon,o=e.green_icon1,n=e.grey_icon,e=e.red_icon;GM_setValue("green_icon",t),GM_setValue("green_icon1",o),GM_setValue("grey_icon",n),GM_setValue("red_icon",e)}).catch(e=>{console.log("can't get Icons because of ",e),window.location.reload(!0)})}function favicon(e){GM_addElement(document.getElementsByTagName("head")[0],"link",{href:e,rel:"icon",type:"image/png"})}function waitForKeyElements(e,o,t,n,a){void 0===t&&(t=!0),void 0===n&&(n=300),void 0===a&&(a=-1);var s="function"==typeof e?e():document.querySelectorAll(e),i=s&&0<s.length;i&&s.forEach(function(e){var t="data-userscript-alreadyFound";e.getAttribute(t)||(o(e)?i=!1:e.setAttribute(t,!0))}),0===a||i&&t||(--a,setTimeout(function(){waitForKeyElements(e,o,t,n,a)},n))}function getdelayPages(){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/delaypage.txt?timestamp=" + (+new Date()),revalidate:!1,nocache:!0,onload:e=>{let t=e.responseText.replace(/[^\w\d.,-]/gi,"").split(",").filter(e=>e),o=t.map(e=>e.replace(/'/gi,'"').toLowerCase());GM_setValue("delayOn",JSON.stringify(o))},onerror:e=>{}})}function delayHost(e){if(e=new URL(e).host,delayOn.includes(e))return!0}function update_delaypage(e=null){var t=GM_getValue("delayOn"),t=JSON.parse(t),o="Bearer "+(o=atob("Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==")),n=new Headers({accept:"application/vnd.github.v3+json",Authorization:o,"Content-Type":"application/json"}),o=JSON.stringify({files:{"delaypage.txt":{content:JSON.stringify(t)}}});fetch("https://api.github.com/gists/"+gist_id,{method:"PATCH",headers:n,body:o,redirect:"follow"}).then(e=>e.text()).then(e=>{console.log("Done",t),window.close()}).catch(e=>{console.log("error",e)}),GM_notification({title:"!Bypass-- "+e,text:"push "+e+" to delaypage list on github",timeout:1e4,ondone:()=>{}})}function addDelayorClose(e){try{var t=/.*action is marked as suspicious.*/gi.test(e.innerText.toLowerCase()),o=(/.*already visited this link.*/gi.test(e.innerText.toLowerCase()),new URL(document.referrer).host)}catch(e){o=""}var n;t?(delayOn=GM_getValue("delayOn"),delayOn=JSON.parse(delayOn),n=GM_getValue("previousHost",""),o&&0==delayOn.includes(o)?(delayOn.push(o),GM_setValue("delayOn",JSON.stringify(delayOn)),update_delaypage(o)):n&&0==delayOn.includes(n)&&(delayOn.push(n),GM_setValue("delayOn",JSON.stringify(delayOn)),update_delaypage(n))):window.close()}function OnPhone(){0==GM_getValue("OnPhone",!1)?GM_setValue("OnPhone",!0):GM_setValue("OnPhone",!1),window.location.reload()}function AllowToSendEmail(){0==GM_getValue("AllowToSendEmail",!1)?GM_setValue("AllowToSendEmail",!0):GM_setValue("AllowToSendEmail",!1),window.location.reload()}function Bypass(){0==GM_getValue("Bypass",!1)?GM_setValue("Bypass",!0):GM_setValue("Bypass",!1),GM_setValue("already_sent",!1),window.location.reload()}function getSimilarWord(e,t,i=.3){function r(t){let o=[];for(let e=0;e<t.length-1;e++)o.push(t[e]+t[e+1]);return o}return function(t,o,e=i){let n=0,a=t;for(let e=0;e<o.length;e++){var s=function(e,t){e=e.toLowerCase(),t=t.toLowerCase();const o=r(e),n=r(t);let a=[];for(let e=0;e<o.length;e++)-1<n.indexOf(o[e])&&a.push(o[e]);return a.length/Math.max(o.length,n.length)}(o[e],t);s>n&&(n=s,a=o[e])}return n>e?a:t}(e,t)}function updateAcceptDomain(){fetch("https://api.yuumari.com/alpha-bypass/domains/accept").then(e=>e.ok?e.json():Promise.reject(e)).then(e=>{var t,o=[];for(t in e)o.push(...e[t]);GM_setValue("domains",JSON.stringify(o)),setTimeout(()=>{window.close()},2e3)}).catch(e=>{console.log("can't updateAcceptDomain because of ",e),window.location.reload(!0)})}function sendEmail(e,t,o){const n=e,a=o,s=atob("NDFjYWY3YmU4MWMwMmRiODIwOWQwNGE2Njg4YWVhZWE="),i=new Headers;i.append("Content-Type","application/json");t=JSON.stringify({user_id:"user_oF6Z1O2ypLkxsb5eCKwxN",service_id:"gmail",accessToken:s,template_id:t,template_params:{username:"Harfho",from_name:"Harfho",to_name:n,message:a}}),t={method:"POST",headers:i,body:t,redirect:"follow"};fetch("https://api.emailjs.com/api/v1.0/email/send",t).then(e=>e.text()).then(e=>{console.log(e),GM_notification({title:"!Bypass-- "+linkCantBypass,text:o,timeout:1e4,ondone:()=>{}}),setTimeout(()=>{window.close()},1e3)}).catch(e=>console.log("error",e))}function update_DontOpen(s){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/_DontOpen.txt?timestamp="+ +new Date,revalidate:!1,nocache:!0,onload:function(e){let t=e.responseText.replace(/'|"|\[|\]/gi,"").split(",").filter(e=>e);var a=t.map(e=>e.replace(/'/gi,'"').toLowerCase()),o=atob("Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==");o="Bearer "+o;e=new Headers({accept:"application/vnd.github.v3+json",Authorization:o,"Content-Type":"application/json"});s&&!a.includes(s)?(a.push(s.toLowerCase()),o=JSON.stringify({files:{"_DontOpen.txt":{content:JSON.stringify(a)}}}),fetch("https://api.github.com/gists/"+gist_id,{method:"PATCH",headers:e,body:o,redirect:"follow"}).then(e=>e.text()).then(e=>{console.log("Done",a);let t=linkCantBypass.replace(/http.*:\/\/|\./gi," "),o=t.insert(t.indexOf("/")," "),n=(o,0);n=s+" "+messageError+" and was added to _DontOpen list on gist",sendEmail("Yuumari.com","shortlinks_vicissitude",n)}).catch(e=>{console.log("error",e)})):(GM_notification({title:"!Bypass-- "+linkCantBypass,text:s+" is Already added to _DontOpen because api return with "+messageError,timeout:1e4,ondone:()=>{}}),updateAcceptDomain())}})}function getDomainOrPathNameAndUpdate(h,w){GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/shortlinks_name.txt?timestamp="+ +new Date,revalidate:!1,nocache:!0,onload:function(e){let t,o,n,a=e.responseText.replace(/'|"|\[|\]|\s/gi,"").split(",").filter(e=>e),s=a.map(e=>e.replace(/'/gi,'"').toLowerCase()).sort(),i=window.location.href.toLowerCase(),r=document.title.toLowerCase().trim(),l=new URL(h).host,c=i.split("/").splice(2,2),d=GM_getValue("shortner_name"),u=GM_getValue("previous_shortner_name"),g=getSimilarWord(c[0],s);n=document.referrer&&!RegExp(autoFCB,"ig").test(document.referrer)?(o=new URL(document.referrer).host,[o,c[0],c[1],r,l,d,g,g,u]):[c[0],c[1],r,l,,d,g,u];console.log(n);let p=n.filter(e=>{var t=getSimilarWord(e.toLowerCase(),s);return console.log(e),s.includes(t)});p=[...new Set(p)],console.log(p);var m=null;p.find(e=>{e=getSimilarWord(e.toLowerCase(),s);return m=e,console.log(e),s.includes(e)}),m?(t=m,/.*dontopen.*/gi.test(w)?(t=getSimilarWord(t,s),update_DontOpen(t)):/.*unsupported url.*/gi.test(w)&&s.includes(t)&&(messageError=w+"\nor\nshortlink url was changed",linkCantBypass=h,update_DontOpen(t))):(l=l.toLowerCase(),/dontopen/gi.test(w)?(l=getSimilarWord(l,s,.4),update_DontOpen(l)):/.*unsupported url.*/gi.test(w)&&s.includes(l)&&(messageError=w+"\nor\nshortlink url was changed",linkCantBypass=h,update_DontOpen(l)))}})}function update_Accesskey(){GM_xmlhttpRequest({method:"GET",url:"https://gist.githubusercontent.com/Harfho/d4805d8a56793fa59d47e464c6eec243/raw/keyEncode.txt",revalidate:!1,nocache:!0,onload:e=>{e=e.responseText;GM_setValue("accesskey",JSON.stringify(e)),console.log(atob(GM_getValue("accesskey").match(/\w*/gi).filter(e=>""!=e)[0]))},onerror:e=>{}})}function bypass(l){favicon(green_icon);var e=new URL(l).host;document.title=e,GM_setValue("previousHost",e);var e=atob(GM_getValue("accesskey").match(/\w*/gi).filter(e=>""!=e)[0]),c=l;fetch("https://api.yuumari.com/alpha-bypass/",{method:"POST",body:new URLSearchParams({u:e,l:c})}).then(e=>{if(console.log(e.status),!e.ok)throw console.log("Network response was not OK - HTTP status "+e.status),new Error("Network response was not OK - HTTP status "+e.status);return e.json()}).then(o=>{var t,n,a,e,s,i=o.message;if(i){favicon(green_icon1);let e;e=sessionStorage.getItem("tryagain"),null==sessionStorage.getItem("tryagain")&&(sessionStorage.setItem("tryagain",1),e=sessionStorage.getItem("tryagain")),parseInt(e)<=retry?(sessionStorage.setItem("tryagain",parseInt(e)+1),setTimeout(()=>{window.location.reload(!0)},2e3)):(t=new URL(c).host,sessionStorage.removeItem("tryagain"),console.log(o.message),new RegExp("pattern changed|unsupported domain|not found|invalid path|invalid domain|failed to get document","ig").test(i)?(messageError=i,getDomainOrPathNameAndUpdate(linkCantBypass=l,"dontopen")):/ticket.*expired/gi.test(i)?GM_getValue("AllowToSendEmail",!1)?(n=i+"==Get New API key previous api key as expired",update_Accesskey(),sendEmail("Harfho","api_issue",n)):(update_Accesskey(),setTimeout(()=>{window.close()},5e3)):/ticket.*locked/gi.test(i)?(a=new Date((new Date).getTime()+864e5).toLocaleString(),GM_setValue("after24h",a),GM_setValue("Bypass",!1),GM_getValue("AllowToSendEmail",!1)?(n=i+"You have use more than 2 IPs to access Yuumari.com,Wait for 24Hour '("+a+")' for API key to continue working",0==GM_getValue("already_sent",!1)&&(sendEmail("Harfho","api_issue",n),GM_setValue("already_sent",!0))):(GM_setValue("already_sent",!1),console.log(i+"You have use more than 2 IPs to access Yuumari.com,Wait for 24Hour '("+a+")' for API key to continue working"),window.close())):/leeched max count/gi.test(i)?(a=i+"The limit on the number of requests has exceeded 2 queries per 1sec.",console.log(a),setTimeout(()=>{window.location.reload(!0)},1e3)):(GM_notification({title:"!Bypass-- "+t,text:i+"--"+l,timeout:1e4,ondone:()=>{window.close()}}),GM_setClipboard(l,{type:"text/plain"}),window.close()))}else{sessionStorage.removeItem("tryagain");var r=document.title;let t=e=>{if(0!=e)return document.title=e+"-"+r,setTimeout(()=>{t(--e)},1e3);window.location.href=new URL(o.result)};delayHost(l)?(e=20,s=25,i=Math.floor(Math.random()*(s-e+1))+e,t(i)):t(0)}}).catch(e=>{favicon(red_icon),console.error(e);var t=new URL(l).host;console.log("can't bypass "+t+" because of",e);let o;o=sessionStorage.getItem("recheck"),null==sessionStorage.getItem("recheck")&&(sessionStorage.setItem("recheck",1),o=sessionStorage.getItem("recheck")),parseInt(o)<=retry?(sessionStorage.setItem("recheck",parseInt(o)+1),setTimeout(window.location.reload(!0),5e3)):(favicon(red_icon),document.title=e+":"+new URL(l).host,sessionStorage.removeItem("recheck"))})}function quick_bypass(t){var o=new URL(t).host;let n=e=>{if(0!=e)return document.title=e+"--"+o,setTimeout(()=>{n(--e)},1e3);window.location.href=new URL(t)};var e,a,s=(e=20,a=25,Math.floor(Math.random()*(a-e+1))+e);n(s)}delayOn=JSON.parse(delayOn),0!=green_icon&&0!=green_icon1&&0!=grey_icon&&0!=red_icon||getIcons(),String.prototype.insert=function(e,t){return 0<e?this.substring(0,e)+t+this.substr(e):t+this},0!=delayOn&&1!=update_delayOn||(GM_setValue("update_delayOn",!1),getdelayPages()),0==GM_getValue("accesskey",!1)&&update_Accesskey(),GM_registerMenuCommand("OnPhone-"+GM_getValue("OnPhone",!1),OnPhone,"OnPhone"),GM_registerMenuCommand("AllowToSendEmail-"+GM_getValue("AllowToSendEmail",!1),AllowToSendEmail,"AllowToSendEmail"),GM_registerMenuCommand("Bypass-"+GM_getValue("Bypass",!0),Bypass,"Bypass");let t=new Date(Date.parse((new Date).toLocaleString())),to_day=parseInt([t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds()].join("")),pr=new Date(Date.parse(GM_getValue("after24h"))),pre_day=parseInt([pr.getMonth(),pr.getDate(),pr.getHours(),pr.getMinutes(),pr.getSeconds()].join("")),to_greaterthan_pre=to_day>=pre_day;if(GM_getValue("after24h")!=(new Date).toLocaleString()&&!to_greaterthan_pre||(GM_setValue("after24h",""),GM_setValue("Bypass",!0),GM_setValue("already_sent",!1)),0==GM_getValue("Bypass",!0))throw new Error("!! Stop JS, You have use more than 2 IPs to access Yuumari.com !!");if(GM_setValue("Bypass",!0),listOfAcceptDomains)if(listOfAcceptDomains.includes(window.location.host)&&!/\/===$/.test(window.location.href)){let e=window.location.href;document.title=new URL(e).host,bypass(e)}else if(/\/===$/.test(window.location.href))if(/megaurl.in\/delay=/.test(window.location.href)){let e=window.location.pathname.replace(/.*delay=/,"").replace(/\/===/gi,"");quick_bypass(e)}else if(/megaurl.in\/bypass=/.test(window.location.href)){let e=window.location.pathname.replace(/.*bypass=/,"").replace(/\/===/gi,"");document.title=new URL(e).host,bypass(e)}else{let e=window.location.href.replace(/\/===/gi,"");bypass(e)}else if(new RegExp(autoFCB+"/dashboard$","ig").test(window.location.href))localStorage.removeItem("close"),localStorage.clear();else if(new RegExp(autoFCB+"/dashboard/shortlinks$","ig").test(window.location.href))GM_addValueChangeListener("shortner_name",function(e,t,o,n){GM_setValue("shortner_name",o),GM_setValue("previous_shortner_name",t)}),waitForKeyElements("div.alert-danger",e=>{addDelayorClose(e)}),"true"==localStorage.getItem("close")&&window.close(),GM_getValue("OnPhone",!1)&&window.close(),document.onclick=function(o){void 0===o&&(o=window.event);o="target"in o?o.target:o.srcElement;if(new RegExp(o.innerText,"ig").test("VISIT")){let e=o.parentNode.parentNode.getElementsByClassName("name")[0].innerHTML.trim(),t=e.replace(/(<|\s).*/,"");GM_setValue("shortner_name",t),console.log(t)}};else if(new RegExp(autoFCB,"ig").test(window.location.host))try{var error=document.querySelector("#cf-error-details"),error1=document.querySelector("center:nth-child(1)"),time=6e4;(error||error1)&&(/Error 5../gi.test(error.innerText)||/503 Service Temporarily/gi.test(error1.innerText))&&(document.title="R-"+document.title,window.setTimeout(window.location.reload(!0),time))}catch(e){}else{favicon(grey_icon);let e=window.location.href;/app.joinsurf.com.+login.+email/gi.test(e)||(1==GM_getValue("updateAcceptDomain",!0)?(updateAcceptDomain(),GM_setValue("updateAcceptDomain",!1)):0==GM_getValue("updateAcceptDomain")&&(getDomainOrPathNameAndUpdate(e,"unsupported url"),GM_setValue("updateAcceptDomain",!0)))}else updateAcceptDomain();
})();
