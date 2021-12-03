(function() {
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href )
    }//to prevent resubmit on refresh and back button
    //---------------------------------------------------------//
    var retry = 4
    function bypass(link){
        const key=atob(GM_getResourceText("key").match(/\w*/gi).filter(e=>""!=e)[0])
        const baseUrl = 'https://api.yuumari.com/alpha-bypass/';
        const u = key;
        const l = link
        fetch(baseUrl, {
            method: 'POST',
            body: new URLSearchParams({u,l})
        }).then(r => r.json())
            .then((d)=>{
            if(!d.message){
                sessionStorage.removeItem('tryagain')
                window.location=d.result

            }else{
                let tryagain;
                tryagain=sessionStorage.getItem('tryagain')
                if(sessionStorage.getItem('tryagain')==null){sessionStorage.setItem('tryagain',1);tryagain=sessionStorage.getItem('tryagain')}
                if(parseInt(tryagain)<=retry){
                    sessionStorage.setItem('tryagain',parseInt(tryagain)+1);
                    window.location.reload(true)}
                else{
                    sessionStorage.removeItem('tryagain')
                    GM_notification({
                        title:'!Bypass-- '+window.location.host,
                        text:d.message+"--"+l,
                        timeout:300*1000,
                        ondone:()=>{window.close()},
                    });
                    GM_setClipboard(l,{type:'text/plain'})
                    window.close()
                }
            }
        });
    }
    if(/\/===$/.test(window.location.href)){
        if(/megaurl.in\/bypass=/.test(window.location.href)){
            const link=window.location.pathname.replace(/.*bypass=/,'').replace(/\/===/ig,'');//get the exact link to pass to bypasser
            document.title =new URL(link).host;
            bypass(link)
        }else{
            const link = window.location.href.replace(/\/===/ig,'');
            bypass(link)}
    }
})();
