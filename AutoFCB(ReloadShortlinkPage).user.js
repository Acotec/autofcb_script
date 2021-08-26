(function() {
    'use strict';
    function refresh(){
        let tryagain;
        tryagain=sessionStorage.getItem('tryagain')
        if(sessionStorage.getItem('tryagain')==null){sessionStorage.setItem('tryagain',1);tryagain=sessionStorage.getItem('tryagain')}
        if(parseInt(tryagain)<=4){
            sessionStorage.setItem('tryagain',parseInt(tryagain)+1);
            GM_addElement(document.getElementsByTagName('head')[0], 'meta', {'http-equiv':"refresh",'content':"180;url="+window.location.href,});} //content-in-seconds
        else{
            sessionStorage.removeItem('tryagain')
            //console.log('reset')
            GM_notification({
                title:window.location.host,
                text:window.location.href+' \n--Reloaded 4time and close---',
                timeout:300*1000,
                ondone:()=>{window.close()},
                onclick:()=>{window.open(window.location.href);window.close()}
            });
            GM_setClipboard(window.location.href,{type:'text/plain'})//data,info
            window.close()
        }
    }
    var autofcb = /auto(faucet|claim|bitco).(in|org).+|.+\/===/ig.test(window.location.href)
    if(!autofcb){
        refresh()
    }
})();
