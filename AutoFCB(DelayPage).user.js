(function() {
    'use strict';
    var delayOn =GM_getResourceText("delaypage").replace(/'|"|\[|\]|\s/ig,'').split(',').filter(e=>e);
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\.|\[^.*]|\/.*/ig, '')
    var delay = delayOn.some((link) => {return new RegExp(link,"ig").test(host)})
    //console.log(delay)
    function sleep(e) {
        const startPoint = new Date().getTime()
        while (new Date().getTime() - startPoint <= e*1e3){}
        return;
    };
    if(/adbull/.test(host)){
        var inter=setTimeout(()=>{location.reload(false)},25*1000)
        null!=sessionStorage.getItem("reloaded")||sleep(17);
        sessionStorage.setItem('reloaded', 'yes');
    } else if (delay && !/adbull/.test(host)) {
        document.title ='D-'+host
        sleep(17);
    }
})();
