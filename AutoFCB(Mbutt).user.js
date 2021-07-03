(function () {
    'use strict';
    // 1. Create the button
    var visit = document.querySelector("#visit239 > button")
    var visitR = visit && parseInt(visit.parentElement.parentElement.getElementsByClassName('info')[0].getElementsByTagName('span')[0].innerText.replace(/\/.*/, ''))
    var button = document.createElement("button");
    var limit = 15
    // 2. Append somewhere
    var body = document.getElementsByClassName("shortlinks")[0];;
    button.innerHTML = "Run Script";
    function main() {
        let speed=4000
        let i=0
        let inter = setInterval(()=>{
            i++
            visit.click()
            if(i>=limit){
                button.innerHTML ='Done opening '+limit+' time'
                clearInterval(inter)}
        },speed)
        }


    body.appendChild(button);
    // // 3. Add event handler
    if(visit!== null || visitR>=limit){
        button.addEventListener("click", function () {
            GM_setValue("flag", true)
            button.innerHTML = "Script Run";
            console.log('Script run from Auto***')
            button.innerHTML = 'Script was run from Auto**'
            main()
        });
    }else if(GM_getValue("flag")==true && (visit==null||visitR<=limit)){
        GM_setValue("flag",false)
        button.innerHTML ='Main Script Run '
        window.addEventListener('load', (event) => {
            $('button:contains("Not Running")')[0].click()
        })
    }else{
        button.innerHTML ='Noting to do'
    }
})();
