(function() {
    var key=atob(JSON.parse(GM_getResourceText('key')))
    if(/\/===$/.test(window.location.href)){
        const baseUrl = 'https://api.yuumari.com/alpha-bypass/';
        const link = window.location.href.replaceAll(/\/===/ig,'');
        const u = key;
        const l = link
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
