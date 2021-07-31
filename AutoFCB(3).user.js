(function () {
    'use strict';
    var getDontOpenList = [];
    for (let e of GM_getResourceText("_DontOpen").split(",")) getDontOpenList.push(e);
    const _DontOpen = [];
    for (let e of getDontOpenList) {
        let n = e.replace(/\W/gi, "");
        _DontOpen.includes(n) || _DontOpen.push(n)
    }
    var _open_link_fast = []
    var _alreadyRun = GM_getValue("_alreadyRun")
    var _available_link = parseInt(document.getElementsByClassName('amount')[1].textContent)
    var _views_ToVisit = $('span#views').toArray()
    var _num_ofLink_toVisit = []
    var _sort_and_Re_Dup = []
    var _ordered_LinkToVisitOnPage = []
    var _order_ByName = []
    if (_views_ToVisit.length > _DontOpen.length) var _totalLink = _views_ToVisit.length - _DontOpen.length;
    else _totalLink = _views_ToVisit.length;
    /* variable for appearFunction */
    var i = 0; //index (for looping purpose)
    var s = 10; //index
    var interval; //for setInterval
    var duration; //for setInterval duration
    var S_speed = 5 //GM_getValue('speed',500)
    var speed = 1 //GM_getValue('speed',1500); //the duration speed
    "undefined" != String(GM_getValue("speed")) && "NaN" != String(GM_getValue("speed")) && "null" != String(GM_getValue("speed")) || GM_setValue("speed", speed);
    "undefined" != String(GM_getValue("S_speed")) && "NaN" != String(GM_getValue("S_speed")) && "null" != String(GM_getValue("S_speed")) || GM_setValue("S_speed", S_speed);
    // 1. Create the button
    var button = document.createElement("button");
    var speed_add = document.createElement("button");
    var speed_sub = document.createElement("button");
    var s_speed_add = document.createElement("button");
    var s_speed_sub = document.createElement("button");
    var dis = document.createElement("p");
    var dis1 = document.createElement("p");
    // 2. Append somewhere
    var body = document.getElementsByClassName('col item')[1].getElementsByClassName('content-box')[0]
    var body1 = document.getElementsByClassName('col item')[0].getElementsByClassName('content-box')[0]
    //button.innerHTML = "Run Script";
    function checkButton() {
        if (GM_getValue("_alreadyRun") == true) {
            GM_setValue("_alreadyRun", false);
            //button.innerHTML = "Run Script";
            button.innerHTML = "Script Run [" + _totalLink + "] Links will Open";
            sessionStorage.removeItem("close")
            location.reload()
            sessionStorage.removeItem("close")
            //console.log("GM_value set to-" + GM_getValue("_alreadyRun"))
        } else {
            GM_setValue("_alreadyRun", true);
            button.innerHTML = "Script Stop";
            sessionStorage.removeItem("close")
            //console.log("GM_value set to-" + GM_getValue("_alreadyRun"))
        };
    }

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
    }

    function reloadP() {
        sessionStorage.setItem("reloading", "true");
    }

    function Rclick() {
        //document.querySelector("body > div.content-area > button").click()
        if (Number(GM_getValue("Reload")) < 1) {
            var R = Number(GM_getValue("Reload"))
            GM_setValue("_alreadyRun", false);
            GM_setValue("Reload", R + 1);
            window.close()
            window.top.close()
            window.location.reload()
        } else {
            GM_setValue("_alreadyRun", true);
            GM_setValue("Reload", 0)
            button.innerHTML = "Auto Click Done(" + GM_getValue("Reload") + ")"
            setInterval(() => {
                document.querySelector("body > div.content-area > div.shortlinks > button").click()
            }, 1000)
        }
    }

    function ViewsOnPage() {
        for (let i = 0; i < _views_ToVisit.length; i++) {
            //console.log(views[i])
            let getViewsLeft = _views_ToVisit[i].textContent // get the views_left
            let exTotalNum = getViewsLeft.match(/\d*\//)[0] // extract views_left number with /
            let totalView = getViewsLeft.replace(exTotalNum, '') // replace / with ''
            _num_ofLink_toVisit.push(parseInt(totalView)) // add to _num_ofLink_toVisit
        }
    }

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
    }

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
    }

    function DontOpen_LinkByName(link) {
        let Lower_DontOpen = _DontOpen.map(item => item.toLowerCase())
        let getName = link.parentElement.parentElement.getElementsByClassName('name')[0].innerText.trim()
        //console.log(getName)
        let isit = getName.replace(getName.match(/\s*\d* .*/), '')
        //console.log(isit)
        if (Lower_DontOpen.includes(isit.toLowerCase())) {
            //console.log('DontOpen - ', isit)
            return true
        }
    }

    function appear() { //define a function
        let limit = _ordered_LinkToVisitOnPage.length
        // if(limit>30){limit = 30 //_available_link}; i += 1; //increment the index ; duration = i*speed ; console.log('First',duration)
        interval = setInterval(() => {
            // console.log(i)
            try {
                let _getlink = _ordered_LinkToVisitOnPage.splice(0, 1)[0],
                    open_link = _getlink.parentNode.parentNode.parentNode.querySelector("button"),
                    exLinkInfo = _getlink.parentNode.parentNode.getElementsByClassName("name")[0].innerText.trim(),
                    linkName = exLinkInfo.replace(exLinkInfo.match(/\s*\d* .*/), ""),
                    lower_open_link_fast = _open_link_fast.map(e => e.toLowerCase());
                if (_available_link <= 5000) {
                    _getlink = _getlink.textContent;
                    let exFirstNum = _getlink.match(/\/\d*/)[0],
                        views_left = _getlink.replace(exFirstNum, "");
                    if (DontOpen_LinkByName(open_link)) {
                        //console.log('Shortlink Among Dont Open')
                        limit++
                        //console.log('wont ',limit)
                    } else {
                        if (views_left == 1 || lower_open_link_fast.includes(linkName.toLowerCase())) {
                            //s++
                            duration = GM_getValue('S_speed') * 1000 //duration
                            //console.log('single visit duration ', duration / 1000 + ' Seconds')
                            //console.log('Link is open fast -- ',linkName)
                        } else {
                            i += 1; //increment the index
                            //console.log('i=', i)
                            let value = 15 * 1000
                            if (duration >= value) {
                                //console.log(duration / 1000 + ' Seconds', '>=', value / 1000 + ' Seconds')
                                i = 1
                                duration = 5 * 1000 //duration
                            } else {
                                duration = i * GM_getValue('speed') * 1000
                            }
                        }
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
                } else {
                    duration = i * GM_getValue('speed')
                    if (DontOpen_LinkByName(open_link)) {
                        //console.log('Shortlink Among Dont Open')
                        limit++
                    } else {
                        open_link.click()
                        //console.log('b', open_link.parentElement.parentElement.getElementsByClassName('name')[0].innerText.trim())
                    }
                }
                clearInterval(interval); //clear
            } catch (err) {
                null
            }
            clearInterval(interval); //clear
            // console.log(limit)
            //console.log('duration using is', duration / 1000 + ' Seconds')
            if (!limit == 0) {
                appear(); //re-run
            } else {
                i = 0; //reset
                //console.log('Done opening')
                button.innerHTML = 'Done opening-Click to Run Again'
                clearInterval(interval)
                //Rclick()
                //window.close()
                //window.close()
            }
        }, duration);
    }

    function main() {
        GM_setValue("_alreadyRun", true);
        //console.log("GM_value is now set to-" + GM_getValue("_alreadyRun"))
        ViewsOnPage()
        Sort_And_Remove_Duplicate()
        Ordered_LinkToView()
        appear();
    }
    body.appendChild(button);
    body1.appendChild(speed_add);
    speed_add.innerHTML = 'Speed+'
    body1.appendChild(speed_sub);
    speed_sub.innerHTML = 'speed-'
    body1.appendChild(dis);
    body1.appendChild(s_speed_add);
    s_speed_add.innerHTML = 's_speed+'
    body1.appendChild(s_speed_sub);
    s_speed_sub.innerHTML = 's_speed-'
    body1.appendChild(dis1);
    dis.innerHTML = 'DS - ' + GM_getValue('speed', speed) + ' Seconds' //DS=default Speed
    dis1.innerHTML = 'DS - ' + GM_getValue('S_speed', S_speed) + ' Seconds' //DS=default Speed
    // // 3. Add event handler
    button.addEventListener("click", function () {
        checkButton()
    });
    speed_add.addEventListener("click", function () {
        speed = GM_getValue('speed') + 1
        GM_setValue("speed", speed);
        dis.innerHTML = 'CS - ' + GM_getValue('speed') + ' Seconds' // CS = current setSpeed
    });
    speed_sub.addEventListener("click", function () {
        if (!(GM_getValue('speed') <= 1)) {
            speed = GM_getValue('speed') - 1
            GM_setValue("speed", speed);
            dis.innerHTML = 'CS - ' + GM_getValue('speed') + ' Seconds'
        }
    });
    /////s_speed Button
    s_speed_add.addEventListener("click", function () {
        S_speed = GM_getValue('S_speed') + 1
        GM_setValue("S_speed", S_speed);
        dis1.innerHTML = 'CS - ' + GM_getValue('S_speed') + ' Seconds' // CS = current setSpeed
    });
    s_speed_sub.addEventListener("click", function () {
        if (!(GM_getValue('S_speed') <= 1)) {
            S_speed = GM_getValue('S_speed') - 1
            GM_setValue("S_speed", S_speed);
            dis1.innerHTML = 'CS - ' + GM_getValue('S_speed') + ' Seconds'
        }
    });
    pageR()
    button.innerHTML = "Script Not Running -- SHORTLINKS=" + _views_ToVisit.length;
    reloadP();
    if (!_alreadyRun) {
        button.innerHTML = "Script Run(Click to Run Again)";
        main()
    }
})();
