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
                GM_setValue('stop',false);
                location=d.result
            }else{
                let flag = GM_getValue('stop',false)
                let tryagain = GM_getValue('tryagain',1)
                if(flag==false && tryagain<=3){
                    GM_setValue('tryagain',tryagain+1);
                    window.location.reload()}
                else{
                    GM_setValue('tryagain',1);GM_setValue('stop',true);
                    alert('Bypass -- '+ (l) +' -- '+ d.message)}
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
