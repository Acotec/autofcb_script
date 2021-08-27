(function() {
    'use strict';
    function refresh(){
        let tryagain;
        tryagain=sessionStorage.getItem('tryagain')
        if(sessionStorage.getItem('tryagain')==null){sessionStorage.setItem('tryagain',1);tryagain=sessionStorage.getItem('tryagain')};
        if(parseInt(tryagain)<=4){
            GM_addElement(document.getElementsByTagName('head')[0], 'meta',{'http-equiv':"refresh",'content':"180;url="+window.location.href,});//content-in-seconds
            sessionStorage.setItem('tryagain',parseInt(tryagain)+1)
        }
        else{
            sessionStorage.removeItem('tryagain')
            delete(sessionStorage.tryagain)
            //console.log('reset')
            GM_notification({
                title:window.location.host,
                text:window.location.href +' \nReloaded 4-times and will close after 10 seconds ---',
                timeout:10*1000,
                ondone:()=>{delete(sessionStorage.tryagain);window.close()},
                onclick:()=>{delete(sessionStorage.tryagain);window.open(window.location.href);window.close()}
            });
            delete(sessionStorage.tryagain);
            GM_setClipboard(window.location.href,'text/plain')//data,info
            setTimeout(()=>{window.close()},10*1000)
        }
    }
    var autofcb = /auto(faucet|claim|bitco).(in|org).*|.+\/===/ig.test(window.location.href)
    if(!autofcb){
        refresh()
    }
})();
