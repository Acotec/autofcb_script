(function () {
    'use strict';
    // 1. Create the button
    var button = document.createElement("button");
    // 2. Append somewhere
    var body = document.getElementsByClassName("shortlinks")[0];;

    button.innerHTML = "Run Script";
    var loop
    var time = GM_getValue("time", GM_getValue("run"))
    var run = GM_getValue("run")

    function runAgain() {
        console.log('Script run ', run)
        GM_setValue("run", run + 1)
        main()
    }

    function main() {
        let count = 0
        let speed = 4000
        let run = GM_getValue("run")
        let visit = document.querySelector("#visit239 > button")
        let getviews = visit.parentElement.parentElement.getElementsByClassName('info')[0].getElementsByTagName('span')[0].innerText
        let viewleft = getviews.replace(getviews.match(/\/.*/), '')
        let viewleftInt = parseInt(viewleft)
        loop = 15

        if (viewleftInt <= loop) {
            var interval = setInterval(() => {
                $(visit)[0].click()
                count++
                if (count > viewleftInt) {
                    clearInterval(interval)
                    GM_setValue('run', 0)
                    window.close()
                }
            }, speed)
            } else {
                GM_setValue('time', parseInt(viewleftInt / loop))
                var inter = setInterval(() => {
                    //console.log(visit)
                    if (count < viewleftInt && count <= loop - 1) {
                        $(visit)[0].click()
                        count++
                    } else {
                        clearInterval(inter)
                        //console.log(parseInt(time-run))
                        window.close()
                        window.top.close()
                    }

                }, speed)

                }
    }

    body.appendChild(button);
    // // 3. Add event handler
    if (run <= time && run != 0) {
        button.innerHTML = "Script re-Run";
        runAgain()
    } else {
        GM_setValue("run", 0)
        button.innerHTML = "Done running script";
    }


    button.addEventListener("click", function () {
        button.innerHTML = "Script Run";
        let run = GM_getValue("run")
        if (run == 0) {
            console.log('Script run from Auto**', run)
            button.innerHTML = 'Script was run from Auto** ' + run
            GM_setValue("run", 1)
            main()
        }
    });
    ////////////////
})();