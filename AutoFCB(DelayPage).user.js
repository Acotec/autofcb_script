(function() {
    'use strict';
    var element, error1052, alreadyVisit, success, referrer;
    var default_host =JSON.parse(GM_getResourceText("delaypage").replace(/'/ig,'"'));
    console.log(default_host)
    var newDelay =[]
    var delayOn = GM_SuperValue.get('delayOn', default_host)
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\.|\[^.*]|\/.*/ig, '')
    var autofcb = /auto(faucet|claim|bitco).(in|org).*/ig
    var isHost = autofcb.test(host)
    var back = String(window.performance.getEntriesByType("navigation")[0].type) === "back_forward"

    function sleep(e) {
        for (var n = (new Date).getTime(); new Date < n + 1e3 * e;);
        return 0
    }

    function addDelayorClose(element) {
        error1052 = element.innerText.toLowerCase().includes('action is marked as suspicious')
        alreadyVisit = element.innerText.toLowerCase().includes('already visited this link!')
        referrer = document.referrer.replace(/https:\/\/|www\.|\[^.*]|\/.*/ig, '')
        if (error1052 && !(autofcb.test(referrer) || delayOn.includes(referrer) || referrer == '')) {
            newDelay.push(referrer)
            GM_SuperValue.set(' newDelay', newDelay);
        } else if (referrer == '' && isHost && !(alreadyVisit || delayOn.includes(referrer))){
            window.history.go(-1)
            //window.history.back()
        } else {
            window.close()
        }
    }
    if(/adbull/.test(host)){
        var inter=setTimeout(()=>{location.reload(false)},25*1000)
        null!=sessionStorage.getItem("reloaded")||sleep(17);
        sessionStorage.setItem('reloaded', 'yes');
    }
    if (isHost) {
        waitForKeyElements("div.alert-danger", (element) => {
            addDelayorClose(element)
        }, );
    } else if (back && autofcb.test(document.referrer) && !(delayOn.includes(host) || autofcb.test(host)) ) {
        newDelay.push(host)
        GM_SuperValue.set(' newDelay', newDelay);
    } else if (RegExp(host,'ig').test(delayOn) && !/adbull/.test(host)) {
        sleep(17);
    }
})();
