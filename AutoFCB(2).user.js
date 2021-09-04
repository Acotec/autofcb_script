(function() {
    'use strict';
    var _open_link_fast = [].map(e => e.toLowerCase());
    var _alreadyRun = GM_getValue("_alreadyRun");
    var _available_link = parseInt(document.getElementsByClassName('amount')[1].textContent);
    var _views_ToVisit = Array.from(document.querySelectorAll('span#views'));
    var _num_ofLink_toVisit = [];
    var _sort_and_Re_Dup = [];
    var _ordered_LinkToVisitOnPage = [];
    var _order_ByName = [];
    var button = document.createElement("button");
    var body = document.getElementsByClassName('col item')[1].getElementsByClassName('content-box')[0];

    function checkButton() {
        if (GM_getValue("_alreadyRun") == true) {
            GM_setValue("_alreadyRun", false);
            button.innerHTML = "Script Run";
            sessionStorage.removeItem("close")
            location.reload()
            sessionStorage.removeItem("close")
            //console.log("GM_value set to-" + GM_getValue("_alreadyRun"))
        } else {
            GM_setValue("_alreadyRun", true);
            button.innerHTML = "Script Stop";
            sessionStorage.removeItem("close")
            location.reload()
        };
    };

    function SpeedCtr() {
        var speed = GM_getValue('speed', 0.1); //the duration speed
        "undefined" != String(speed) && "NaN" != String(speed) && "null" != String(GM_getValue(speed)) || GM_setValue("speed", 0.1);
        var body1 = document.getElementsByClassName('col item')[0].getElementsByClassName('content-box')[0]
        var dis = document.createElement("p");
        var speed_add = document.createElement("button");
        var speed_sub = document.createElement("button");
        body1.appendChild(speed_add);
        speed_add.innerHTML = 'speed +'
        body1.appendChild(speed_sub);
        speed_sub.innerHTML = 'speed -'
        body1.appendChild(dis);
        dis.innerHTML = 'DS - ' + speed + ' Seconds' //DS=default Speed
        speed_add.addEventListener("click", function() {
            speed = parseFloat((speed + 0.01).toFixed(2))
            GM_setValue("speed", speed);
            dis.innerHTML = 'CS - ' + GM_getValue('speed') + ' Seconds' // CS = current setSpeed
        });
        speed_sub.addEventListener("click", function() {
            if (!(GM_getValue('speed') < 0.05)) {
                speed = parseFloat((speed - 0.01).toFixed(2))
                GM_setValue("speed", speed);
            }
            dis.innerHTML = 'CS - ' + GM_getValue('speed') + ' Seconds'
        });
    };

    function DelayShort() {
        //var dcoin = document.getElementById('visit239')[1]
        var ShortDelay = document.createElement("button"); //create button to enable/disable the Delay of some shortlink b4 they open
        var ShortDelayButton = document.getElementsByClassName("shortlinks")[0] //Append somewhere
        ShortDelayButton.appendChild(ShortDelay)
        try {
            if (GM_getValue("delayShort")) {
                ShortDelay.innerHTML = 'Delay';
            } else {
                GM_setValue("delayShort", false)
                ShortDelay.innerHTML = 'Dnt_Delay';
            }
            ShortDelay.addEventListener('click', function(e) {
                if (GM_getValue("delayShort", true)) {
                    GM_setValue("delayShort", false);
                    ShortDelay.innerHTML = 'Dnt_Delay';
                } else {
                    GM_setValue("delayShort", true);
                    ShortDelay.innerHTML = 'Delay'
                }
                //console.log(GM_getValue("delayShort"))
            });
        } catch (err) {}
    };

    //function to get the shortlinks that should not be open
    if (GM_getValue("_alreadyRun") != true) {
        GM_setValue("_alreadyRun", true);
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://gist.github.com/Harfho/d4805d8a56793fa59d47e464c6eec243/raw/_DontOpen.txt?timestamp=' + (+new Date()),
            fetch: true,
            nocache: false,
            revalidate: true,
            onload: Runcode
        })
    }
    else {
        SpeedCtr()
        body.appendChild(button);
        button.innerHTML = "Script Not Running -- SHORTLINKS=" + _views_ToVisit.length;
        DelayShort()
        button.addEventListener("click", function() {
            checkButton()
        });

    };

    function Runcode(response) {
        /* variable for appearFunction */
        var i = 0; //index (for looping purpose)
        var interval; //for setInterval
        var duration; //for setInterval duration

        var _DontOpen = response.responseText.split(',').map(item => item.replace(/'/ig, '"'))
        if (_views_ToVisit.length >= _DontOpen.length) {
            var _totalLink = _views_ToVisit.length - _DontOpen.length;
        } else if (_DontOpen.length >= _views_ToVisit.length) {
            _totalLink = 'NO'
        } else {
            _totalLink = _views_ToVisit.length;
        }

        //function to check when the page is reloaded
        function pageR() {
            //reload
            var reloading = sessionStorage.getItem("reloading");
            if (reloading) {
                sessionStorage.removeItem("reloading");
                if (_alreadyRun == false) {
                    button.innerHTML = "Script Run(Click to Run Again)";
                    sessionStorage.setItem("close", "true") //AutoFCB(Close)
                } else {
                    button.innerHTML = "Script Not Running -- SHORTLINKS=" + _views_ToVisit.length;
                }
            }
        };

        //function to reload the page
        function reloadP() {
            sessionStorage.setItem("reloading", "true");
        };

        //function to re-run the script
        function Re_run() {
            let reRun = Number(GM_getValue("Re_run", 0)) //
            let time = 2
            if (reRun < time) {
                GM_setValue("_alreadyRun", false);
                GM_setValue("Re_run", reRun + 1); //
                sessionStorage.setItem("close", "true")
                window.close()
            } else {
                GM_setValue("Re_run", 0); //
                GM_setValue("_alreadyRun", true);
                sessionStorage.removeItem("close")
                window.close()
            }
        };

        function ViewsOnPage() {
            for (let i = 0; i < _views_ToVisit.length; i++) {
                //console.log(views[i])
                let getViewsLeft = _views_ToVisit[i].textContent // get the views_left
                let exTotalNum = getViewsLeft.match(/\d*\//)[0] // extract views_left number with /
                let totalView = getViewsLeft.replace(exTotalNum, '') // replace / with ''
                _num_ofLink_toVisit.push(parseInt(totalView)) // add to _num_ofLink_toVisit
            }
        };

        function Sort_And_Remove_Duplicate() {
            let uniq = _num_ofLink_toVisit.map((name) => {
                return {
                    count: 1,
                    name: name
                }
            }).reduce((a, b) => {
                a[b.name] = (a[b.name] || 0) + b.count
                return a
            }, {})
            let sorted = Object.keys(uniq).sort((a, b) => uniq[a] < uniq[b])
            _sort_and_Re_Dup = sorted
            //console.log(sorted)
        };

        function Ordered_LinkToView() {
            for (let i = 0; i < _sort_and_Re_Dup.length; i++) {
                for (let j = 0; j < _views_ToVisit.length; j++) {
                    let b = _views_ToVisit[j].textContent.includes(_sort_and_Re_Dup[i])
                    let ext_name = _views_ToVisit[j].parentElement.parentElement.getElementsByClassName('name')[0].innerText
                    let check = ext_name.replace(ext_name.match(/\sFCT*\d*.*/), '')
                    //use this to extract only the link name without it FctToken [ext_name.replace(ext_name.match(/\s*\d* .*/), '')]
                    if (_order_ByName.includes(check) == false) {
                        _ordered_LinkToVisitOnPage.push(_views_ToVisit[j])
                        _order_ByName.push(check)
                    }
                }
            }
        };

        function DontOpen_LinkByName(linkName) {
            //alert('Dontopen '+linkName)
            if (new RegExp(linkName, 'ig').test(_DontOpen)) {
                return true
            } else {
                return false
            }
        };

        function appear() { //define a function
            let limit = _ordered_LinkToVisitOnPage.length
            interval = setInterval(() => {
                try {
                    let _getlink = _ordered_LinkToVisitOnPage.splice(0, 1)[0],
                        open_link = _getlink.parentNode.parentNode.parentNode.querySelector("button"),
                        exLinkInfo = _getlink.parentNode.parentNode.getElementsByClassName("name")[0].innerText.trim(),
                        linkName = exLinkInfo.replace(exLinkInfo.match(/\s*\d* .*/), "");
                    if (_available_link <= 1000) {
                        _getlink = _getlink.textContent;
                        let exFirstNum = _getlink.match(/\/\d*/)[0],
                            views_left = _getlink.replace(exFirstNum, "");
                        if (DontOpen_LinkByName(linkName)) {
                            //console.log('Shortlink Among Dont Open')
                            limit++
                            //console.log('wont open',linkName,limit)
                        } else {
                            //console.log(linkName)
                            i++; //increment the index
                            if (/^coin$/ig.test(linkName.toLowerCase()) && GM_getValue("delayShort")) {
                                duration = 10 * 1000 //duration can be increase in (secs)
                            } else {
                                duration = i * GM_getValue('speed') * 1000
                            }
                            //console.log(i)
                            var inter = setInterval(() => {
                                views_left--
                                if (views_left >= 0) {
                                    open_link.click()
                                    //console.log('a', open_link.parentElement.parentElement.getElementsByClassName('name')[0].innerText.trim())
                                    clearInterval(interval)
                                    appear() // re-run
                                }
                            }, duration)
                            }
                    } //end
                    //if Available link is greater than 1000
                    else {
                        duration = i * GM_getValue('speed')
                        if (DontOpen_LinkByName(open_link)) {
                            //console.log('Shortlink Among Dont Open')
                            limit++
                        } else {
                            open_link.click()
                            //console.log('b', open_link.parentElement.parentElement.getElementsByClassName('name')[0].innerText.trim())
                        }
                    } //end
                    clearInterval(interval); //clear
                }
                catch(err){null};
                clearInterval(interval); //clear
                //console.log(limit);//console.log('duration using is', (duration / 1000).toFixed(2))
                if (limit != 0) {
                    appear(); //re-run
                } else {
                    i = 0; //reset
                    //console.log('Done opening')
                    button.innerHTML = 'Done opening-Click to Run Again'
                    clearInterval(interval)
                    Re_run()
                    //window.close();//window.close()
                }
            }, duration);
        }

        ViewsOnPage()
        Sort_And_Remove_Duplicate()
        Ordered_LinkToView()
        SpeedCtr()
        DelayShort()
        //console.log(_ordered_LinkToVisitOnPage);console.log(_num_ofLink_toVisit);console.log(_sort_and_Re_Dup);console.log(_order_ByName)

        function main() {
            GM_setValue("_alreadyRun", true);
            appear();
        }
        body.appendChild(button);
        // Add event handler
        button.addEventListener("click", function() {
            checkButton()
        });
        //////////////////
        pageR()
        reloadP()
        if (!_alreadyRun) {
            button.innerHTML = "Script Run [" + _totalLink + "] Links will Open";
            sessionStorage.setItem("close", "true") //AutoFCB(Close) 'Allow tab to close if codes rerun without pressing - var(button)'
            main()
        }
    }
})();
