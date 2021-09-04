(function() {
    'use strict';
    var delayOn =JSON.parse(GM_getResourceText("delaypage").replace(/'/ig,'"'));
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\.|\[^.*]|\/.*/ig, '')
    function sleep(e) {
        const startPoint = new Date().getTime()
        while (new Date().getTime() - startPoint <= e*1e3){}
        return;
    };
    if(/adbull/.test(host)){
        var inter=setTimeout(()=>{location.reload(false)},25*1000)
        null!=sessionStorage.getItem("reloaded")||sleep(17);
        sessionStorage.setItem('reloaded', 'yes');
    } else if (RegExp(host,'ig').test(delayOn) && !/adbull/.test(host)) {
        sleep(17);
    }
})();
