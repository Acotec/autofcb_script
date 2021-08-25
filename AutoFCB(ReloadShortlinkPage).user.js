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
            GM_notification({text:window.location.href+' Reloaded 4 times and close',
                             title:window.location.host,
                             timeout:300*1000,
                             ondone:()=>{window.close()},
                             onclick:()=>{window.open(window.location.href);window.close()}
                            });
            setTimeout(()=>{window.close()},300*1000)
        }
    }
    var autofcb = /auto(faucet|claim|bitco).(in|org)/ig.test(window.location.href)
    if(!autofcb){
        refresh()
    }
})();
