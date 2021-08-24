(function() {
    'use strict';
    function refresh(){
        //let tryagain = GM_getValue('tryagain',1)
        let tryagain;
        tryagain=sessionStorage.getItem('tryagain')
        if(sessionStorage.getItem('tryagain')==null){sessionStorage.setItem('tryagain',1);tryagain=sessionStorage.getItem('tryagain')}
        if(parseInt(tryagain)<=3){
            sessionStorage.setItem('tryagain',parseInt(tryagain)+1);
            GM_addElement(document.getElementsByTagName('head')[0], 'meta', {'http-equiv':"refresh",'content':"180;url="+window.location.href,});}
        else{
            sessionStorage.removeItem('tryagain')
            //console.log('reset')
            GM_notification({text:window.location.href+' Reloaded 3 times and close',title:window.location.host,timeout:0},null);
            window.close()
        }
    }
    var autofcb = /auto(faucet|claim|bitco).(in|org)/ig.test(window.location.href)
    if(!autofcb){
        refresh()
    }
})();
