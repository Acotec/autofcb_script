(function() {
   var _DontOpen=GM_getResourceText("_DontOpen").replace(/'|"|\[|\]|\s/gi,"").split(",").filter(e=>e),shortlinks_name=GM_getResourceText("shortlinks_name").replace(/'|"|\[|\]|\s/gi,"").split(",").filter(e=>e),_open_link_fast=[].map(e=>e.toLowerCase()),_alreadyRun=GM_getValue("_alreadyRun"),_available_link=parseInt(document.getElementsByClassName("amount")[1].textContent),_views_ToVisit=Array.from(document.querySelectorAll("span#views")),_num_ofLink_toVisit=[],_sort_and_Re_Dup=[],_ordered_LinkToVisitOnPage=[],_order_ByName=[],button=document.createElement("button"),body=document.getElementsByClassName("col item")[1].getElementsByClassName("content-box")[0],gist_id="e6ed9bbe9feb74e71030c680feba9d71",hideVisitedShortlinks=document.querySelector("div.shide").querySelector(".cwrapper");function AutoUpdateDontOpen(){var t=document.createElement("button");document.getElementsByClassName("col item")[2].getElementsByClassName("content-box")[0].appendChild(t);try{GM_getValue("AutoUpdate")?(t.innerHTML="AutoUpdate_ON",t.style="background-color:Violet;color:white"):(GM_setValue("AutoUpdate",!1),t.innerHTML="AutoUpdate_OFF",t.style="background-color:black;color:white"),t.addEventListener("click",function(e){GM_getValue("AutoUpdate",!0)?(GM_setValue("AutoUpdate",!1),t.innerHTML="AutoUpdate_OFF",t.style="background-color:black;color:white"):(GM_setValue("AutoUpdate",!0),t.innerHTML="AutoUpdate_ON",t.style="background-color:Violet;color:white")})}catch(e){}}function checkButton(){1==GM_getValue("_alreadyRun")?(GM_setValue("_alreadyRun",!1),button.innerHTML="Script Run",localStorage.removeItem("close"),location.reload(),localStorage.removeItem("close")):(GM_setValue("_alreadyRun",!0),button.innerHTML="Script Stop",localStorage.removeItem("close"),location.reload())}function static_speed(){let t=document.createElement("button"),e=document.getElementsByClassName("col item")[0].getElementsByClassName("content-box")[0];e.appendChild(t);try{GM_getValue("static")?(t.innerHTML="Static_ON",t.style="background-color:Violet;color:white"):(GM_setValue("static",!1),t.innerHTML="Static_OFF",t.style="background-color:black;color:white"),t.addEventListener("click",function(e){GM_getValue("static",!0)?(GM_setValue("static",!1),t.innerHTML="Static_OFF",t.style="background-color:black;color:white"):(GM_setValue("static",!0),t.innerHTML="Static_ON",t.style="background-color:Violet;color:white")})}catch(e){}}function SpeedCtr(){var e=GM_getValue("speed",.1);"undefined"!=String(e)&&"NaN"!=String(e)&&"null"!=String(GM_getValue(e))||GM_setValue("speed",.1);var t=document.getElementsByClassName("col item")[0].getElementsByClassName("content-box")[0],n=document.createElement("p"),o=document.createElement("button"),a=document.createElement("button");t.appendChild(o),o.innerHTML="speed +",t.appendChild(a),a.innerHTML="speed -",t.appendChild(n),n.innerHTML="DS - "+e+" Seconds",o.addEventListener("click",function(){e=parseFloat((e+.01).toFixed(2)),GM_setValue("speed",e),n.innerHTML="CS - "+GM_getValue("speed")+" Seconds"}),a.addEventListener("click",function(){GM_getValue("speed")<.05||(e=parseFloat((e-.01).toFixed(2)),GM_setValue("speed",e)),n.innerHTML="CS - "+GM_getValue("speed")+" Seconds"}),static_speed()}function DelayShort(){var t=document.createElement("button");document.getElementsByClassName("shortlinks")[0].appendChild(t);try{GM_getValue("delayShort")?t.innerHTML="Delay":(GM_setValue("delayShort",!1),t.innerHTML="Dnt_Delay"),t.addEventListener("click",function(e){GM_getValue("delayShort",!0)?(GM_setValue("delayShort",!1),t.innerHTML="Dnt_Delay"):(GM_setValue("delayShort",!0),t.innerHTML="Delay")})}catch(e){}}function get_Shortlinks_and_DontOpen(e){let t=e.responseText.replace(/'|"|\[|\]|\s/gi,"").split(",").filter(e=>e);shortlinks_name=t.map(e=>e.replace(/'/gi,'"').toLowerCase()),GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/_DontOpen.txt?timestamp="+ +new Date,fetch:!0,nocache:!1,onload:Runcode})}function Runcode(t=null){var s,r,n,e,c=0;if(localStorage.setItem("close","true"),GM_getValue("AutoUpdate")){let e=t.responseText.replace(/'|"|\[|\]|\s/gi,"").split(",").filter(e=>e);_DontOpen=e.map(e=>e.replace(/'/gi,'"').toLowerCase())}else _DontOpen=_DontOpen.map(e=>e.replace(/'/gi,'"').toLowerCase()),shortlinks_name=shortlinks_name.map(e=>e.replace(/'/gi,'"').toLowerCase());function u(t){return!!_DontOpen.some(e=>new RegExp("^"+e,"ig").test(t))}function _(){let i=_ordered_LinkToVisitOnPage.length;s=setInterval(()=>{try{let n=_ordered_LinkToVisitOnPage.splice(0,1)[0],o=n.parentNode.parentNode.parentNode.querySelector("button"),e=n.parentNode.parentNode.getElementsByClassName("name")[0].innerHTML.trim(),a=e.replace(/(<|\s).*/,"");if(_available_link<=1e3){n=n.textContent;let e=n.match(/\/\d*/)[0],t=n.replace(e,"");var l;u(a)?i++:shortlinks_name.includes(a.toLowerCase())?(c++,GM_getValue("use_static","")&&GM_getValue("static")?((l=new Date).toLocaleString("en-US",{hour:"numeric",hour12:!0}).replace(/\s+/gi,""),r=/(12|0[0-8]|[1-8])am/gi.test(l)?1e3:!/(9|1[0-1])am/gi.test(l)&&/(12|(0|1[0-9]|[1-9]))pm/gi.test(l)?3e3:5e3):(r=c*GM_getValue("speed")*1e3,GM_setValue("use_static",!0)),setInterval(()=>{t--,0<=t&&(o.click(),clearInterval(s),_())},r)):(console.log(a.toLowerCase(),"Is not among shortlinks to open"),function(e){_DontOpen.push(e.toLowerCase()),shortlinks_name.push(e);var t="Bearer "+(t=atob("Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==")),e=new Headers({accept:"application/vnd.github.v3+json",Authorization:t,"Content-Type":"application/json"}),t=JSON.stringify({files:{"_DontOpen.txt":{content:JSON.stringify(_DontOpen)},"shortlinks_name.txt":{content:JSON.stringify(shortlinks_name)}}});fetch("https://api.github.com/gists/"+gist_id,{method:"PATCH",headers:e,body:t,redirect:"follow"}).then(e=>e.text()).then(e=>console.log(_DontOpen)).catch(e=>console.log("error",e))}(a))}else r=c*GM_getValue("speed"),u(o)?i++:o.click();clearInterval(s)}catch(e){}var e;clearInterval(s),0!=i?_():(c=0,button.innerHTML="Done opening-Click to Run Again",clearInterval(s),GM_setValue("use_static",!1),(e=Number(GM_getValue("Re_run",0)))<2?(GM_setValue("_alreadyRun",!1),GM_setValue("Re_run",e+1),localStorage.setItem("close","true")):(GM_setValue("Re_run",0),GM_setValue("_alreadyRun",!0),localStorage.removeItem("close")),window.close())},r)}t=_views_ToVisit.length>=_DontOpen.length?_views_ToVisit.length-_DontOpen.length:_DontOpen.length>=_views_ToVisit.length?"NO":_views_ToVisit.length,function(){for(let o=0;o<_views_ToVisit.length;o++){let e=_views_ToVisit[o].textContent,t=e.match(/\d*\//)[0],n=e.replace(t,"");_num_ofLink_toVisit.push(parseInt(n))}}(),n=_num_ofLink_toVisit.map(e=>({count:1,name:e})).reduce((e,t)=>(e[t.name]=(e[t.name]||0)+t.count,e),{}),e=Object.keys(n).sort((e,t)=>n[e]<n[t]),_sort_and_Re_Dup=e,function(){for(let o=0;o<_sort_and_Re_Dup.length;o++)for(let n=0;n<_views_ToVisit.length;n++){_views_ToVisit[n].textContent.includes(_sort_and_Re_Dup[o]);let e=_views_ToVisit[n].parentElement.parentElement.getElementsByClassName("name")[0].innerText,t=e.replace(e.match(/\sFCT*\d*.*/),"");0==_order_ByName.includes(t)&&(_ordered_LinkToVisitOnPage.push(_views_ToVisit[n]),_order_ByName.push(t))}}(),SpeedCtr(),DelayShort(),body.appendChild(button),button.addEventListener("click",function(){checkButton()}),sessionStorage.getItem("reloading")&&(sessionStorage.removeItem("reloading"),0==_alreadyRun?(button.innerHTML="Script Run(Click to Run Again)",localStorage.setItem("close","true")):button.innerHTML="Script Not Running -- SHORTLINKS="+_views_ToVisit.length),sessionStorage.setItem("reloading","true"),_alreadyRun||(button.innerHTML="Script Run ["+t+"] Links will Open",localStorage.setItem("close","true"),GM_setValue("_alreadyRun",!0),_())}/checked/gi.test(hideVisitedShortlinks.innerHTML)||setTimeout(()=>{hideVisitedShortlinks.click(),hideVisitedShortlinks.dispatchEvent(new Event("change"))},2000),AutoUpdateDontOpen(),1!=GM_getValue("_alreadyRun")?(GM_setValue("_alreadyRun",!0),GM_getValue("AutoUpdate")?GM_xmlhttpRequest({method:"GET",url:"https://gist.github.com/Harfho/"+gist_id+"/raw/shortlinks_name.txt?timestamp="+ +new Date,fetch:!0,nocache:!1,onload:get_Shortlinks_and_DontOpen}):Runcode()):(SpeedCtr(),body.appendChild(button),button.innerHTML="Script Not Running -- SHORTLINKS="+_views_ToVisit.length,DelayShort(),button.addEventListener("click",function(){checkButton()}));
})();
