(function () {
    'use strict';
    // 1. Create the button
    var visit = document.querySelector("#visit239 > button")
    var visitR = visit && parseInt(visit.parentElement.parentElement.getElementsByClassName('info')[0].getElementsByTagName('span')[0].innerText.replace(/\/.*/, ''))
    var button = document.createElement("button");
    var limit = 50
    var reload = performance.getEntriesByType("navigation")[0].type =='reload'
    // 2. Append somewhere
    var body = document.getElementsByClassName("shortlinks")[0];;
    button.innerHTML = "Run Script";
    function main() {
        let speed=10000
        let i=0
        var inter = setInterval(()=>{
            i++
            visit.click()
            if(i>=limit){
                clearInterval(inter)
                button.innerHTML ='Done opening '+limit+' time'
                clearInterval(inter)
                window.close()
            }
        },speed)
        }


    body.appendChild(button);
    // // 3. Add event handler
    if((reload && GM_getValue("flag", true)) && visit!== null){
        button.innerHTML = "Script Run";
        main()
        button.addEventListener("click", function () {
            GM_setValue("flag", false)
            button.innerHTML ='Script Stop'
            window.location.reload();
        });
    }
    else if(visit !== null){
        button.innerHTML = "Run Script";
        button.addEventListener("click", function () {
            GM_setValue("flag", true)
            window.location.reload();
        });
    }
    else if(GM_getValue("flag")==true && visit==null){
        GM_setValue("flag",false)
        button.innerHTML ='Main Script Run '
        window.addEventListener('load', (event) => {
            document.getElementsByTagName('button')[2].click()
        })
    }else{
        GM_setValue("flag",false)
        button.innerHTML ='Noting to do'
    }
})();
