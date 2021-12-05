(function() {
    'use strict';
    var delayOn =GM_getResourceText("delaypage").replace(/'|"|\[|\]|\s/ig,'').split(',').filter(e=>e);
    var host = window.location.host.toLowerCase().replace(/https:\/\/|www\.|\[^.*]|\/.*/ig, '')
    var url = window.location.href.toLowerCase().match(/https:\/\/|www\.|\/.*\/.+/ig).pop()
    var delayhost = delayOn.some((link) => {return new RegExp(link,"ig").test(host)})
    var delayurl = delayOn.some((link) => {return new RegExp(link,"ig").test(url)})
    //console.log(delayOn,delayhost,delayurl)
    function sleep(e) {
        const startPoint = new Date().getTime()
        while (new Date().getTime() - startPoint <= e*1e3){}
        return;
    };
    if(/adbull/.test(host)){
        var inter=setTimeout(()=>{location.reload(false)},25*1000)
        null!=sessionStorage.getItem("reloaded")||sleep(17);
        sessionStorage.setItem('reloaded', 'yes');
    } else if (delayhost&& !/adbull/.test(host)) {
        document.title ='Dh-'+host
        sleep(17);
    } else if (delayurl) {
        document.title ='Du-'+host+url
        sleep(17);
    }
})();
