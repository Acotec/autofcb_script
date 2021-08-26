(function() {
    function bypass(l){
        const key=atob(JSON.parse(GM_getResourceText('key')))
        const baseUrl = 'https://api.yuumari.com/alpha-bypass/';
        const u = key;
        fetch(baseUrl, {
            method: 'POST',
            body: new URLSearchParams({u,l})
        }).then(r => r.json())
            .then((d)=>{
            if(!d.message){
                sessionStorage.removeItem('tryagain')
                location=d.result
            }else{
                let tryagain;
                tryagain=sessionStorage.getItem('tryagain')
                if(sessionStorage.getItem('tryagain')==null){sessionStorage.setItem('tryagain',1);tryagain=sessionStorage.getItem('tryagain')}
                if(parseInt(tryagain)<=3){
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
            const link=window.location.pathname.replace(/.*bypass=/,'').replace(/\/===/ig,'');
            document.title =link
            bypass(link)
        }else{
            const link = window.location.href.replace(/\/===/ig,'');
            bypass(link)}
    }
})();
