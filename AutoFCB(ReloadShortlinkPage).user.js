function refresh(){
        let tryagain;
        var time = 3;//7
        var wait = 60;//120
        tryagain=sessionStorage.getItem('tryagain')
        if(sessionStorage.getItem('tryagain')==null){sessionStorage.setItem('tryagain',1);tryagain=sessionStorage.getItem('tryagain')};
        if(parseInt(tryagain)<=time){
            GM_addElement(document.getElementsByTagName('head')[0], 'meta',{'http-equiv':"refresh",'content':String(wait)});//content-in-seconds
            //document.title='r-' + document.title;
            sessionStorage.setItem('tryagain',parseInt(tryagain)+1)
        }
        else{
            sessionStorage.removeItem('tryagain');delete(sessionStorage.tryagain)
            //console.log('reset')
            GM_notification({
                title:window.location.host,
                text:window.location.href +' \nReloaded'+ time +'-times and will close after 10 seconds ---',
                timeout:10*1000,
                ondone:()=>{delete(sessionStorage.tryagain);sessionStorage.removeItem('tryagain');window.close()},
                onclick:()=>{delete(sessionStorage.tryagain);window.open(window.location.href);window.close()}
            });
          if(!/coin.mg|hcsbtc.eu/ig.test(window.location.host)){//host does not contain coin.mg
                delete(sessionStorage.tryagain);
                GM_setClipboard(window.location.href,'text/plain')//data,info
                window.close()}
          else{//host contain coin.mg
                sessionStorage.setItem('tryagain',1)
                setTimeout(()=>{window.close()},20*1000)
            }
    }
    }//endof function
    var autofcb = /auto(faucet|claim|bitco).(in|org).+(shortlink.*|claim.+|withdraw.*|exchange)|.*autofaucet.dutchycorp.space.*/ig.test(window.location.href)
    if(!autofcb){
        refresh()
    }
