(function() {
    var href = window.location.href
    if(/dogemate.com|faupto.com/gi.test(href)){$("#bdt").click()}
    else if (/theblogcash/gi.test(href)){document.getElementsByClassName("btn btn-info text-white btn-lg next-button")[0].click()}
    else if (/orangeptc/gi.test(href)){setTimeout( ()=>{document.querySelector("input").click()},4002)}
    else if (/prolinks.xyz|linkdesh.xyz|bitsfree.xyz|dgbauto/gi.test(href)){setInterval(()=>{document.querySelector("#mdt").click()},1000)}
    else if(/step/gi.test(href)){document.querySelector("#main-button").disabled=false;setTimeout(()=>{document.querySelector("#main-button").click()},100)}
    else if(/shortzzy.in/gi.test(href)){setInterval( () => {document.querySelector("#btn6").click()},1000)}
    else if(/yoshare.net/gi.test(href)){setTimeout(()=>{ try{document.querySelector("#yuidea > input.yu-btn.yu-blue").click()}catch(err){document.querySelector("#btn6").click()}},1000)}
    else if(/zegtrends/gi.test(href)){ try{javascript:document.getElementById('cln').submit()}catch(err){btn()}}
    else if(/techmodygi.io|ez4mods.com/gi.test(href)){ setInterval(()=>{yuidea1()},2000)}
    else if(/ez4short.com/gi.test(href)){window.onload=(e)=>{e.preventDefault;window.stop() }}
    else if(/forex-gold.net|4orex4.com/gi.test(href)){waitForKeyElements('a[href*="health"',(e)=>{ window.location=e.getAttribute('href')},true,0)}
    else if(/healthy4pepole.com/gi.test(href)){scrollToForm();waitForKeyElements('.s-btn-f',(e)=>{ window.location=e.getAttribute('href')},true,0)
                                            }
})();
