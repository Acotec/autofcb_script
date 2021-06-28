(function() {
    'use strict';
    // Your code here...
    var href = window.location.href
    if(href.includes('dogemate.com')||href.includes('faupto.com')){$("#bdt").click()}
    else if (href.includes('theblogcash')){document.getElementsByClassName("btn btn-info text-white btn-lg next-button")[0].click()}
    else if (href.includes('orangeptc')){setTimeout( ()=>{document.querySelector("input").click()},4002)}
    else if (href.includes('prolinks.xyz')||
             href.includes('linkdesh.xyz')||
             href.includes('bitsfree.xyz')||
             href.includes('dgbauto')
            ){setInterval(()=>{document.querySelector("#mdt").click()},1000)}

    else if(href.includes('step')){document.querySelector("#main-button").disabled=false
                                   setTimeout(()=>{document.querySelector("#main-button").click()},100)}

    else if(href.includes('shortzzy.in')){setInterval( () => {document.querySelector("#btn6").click()},1000)}

    // else if(href.includes('100count.net')){//window.onload=()=>{
    //     setInterval(()=>{ try{location.href=document.getElementById('cl1').querySelector('a').href}
    //                      catch(err){document.getElementsByTagName('button')[0].click()}},1000) } //}
    else if(href.includes('yoshare.net')){setTimeout(()=>{ try{document.querySelector("#yuidea > input.yu-btn.yu-blue").click()}
                                                          catch(err){document.querySelector("#btn6").click()}},1000)}

    else if(href.includes('zegtrends.com')){ try{javascript:document.getElementById('cln').submit()}catch(err){
        btn()}}

    else if(href.includes('techmody.io')||href.includes('ez4mods.com')){
        setInterval(()=>{yuidea1()},2000)
    }
    else if(href.includes('ez4short.com/')){
        window.onload=(e)=>{e.preventDefault;window.stop()
                           }}
    else if(href.includes('forex-gold.net')){
        waitForKeyElements('a[href*="health"',(e)=>{ window.location=e.getAttribute('href')},true,0)
        //window.location=document.getElementsByClassName('submitBtn btn btn-primary ')[0].getAttribute('href')
    }
    else if(href.includes('healthy4pepole.com')){
        scrollToForm()
        waitForKeyElements('.s-btn-f',(e)=>{ window.location=e.getAttribute('href')},true,0)
    }


})();