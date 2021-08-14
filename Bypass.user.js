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
                location=d.result
            }else{
                alert('Bypass -- '+ (l) +' -- '+ d.message)
            }
        });
    }
    if(/\/===$/.test(window.location.href)){
        if(/example.com/.test(window.location.href)){
            const link=window.location.pathname.replace(/.*bypass=/,'').replace(/\/===/ig,'');
             document.title =link;
            bypass(link)
        }else{
            const link = window.location.href.replace(/\/===/ig,'');
            bypass(link)}
    }
})();
