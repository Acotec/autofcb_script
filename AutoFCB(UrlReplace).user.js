(function() {
    'use strict';
    var path = null
    var meta=()=>{ const m = document.createElement('meta');m.name = 'referrer';m.content = 'origin';document.head.appendChild(m);}
    var l = ((h) => {
        let url = window.location.href
        //------------Replace$Redirect--------------------------------------------------------//
        if (url.includes('adsy.pw') && h.searchParams.has('url')) {return (h.searchParams.get('url'))}
        else if (url.includes('gainprofitblog1.freesats.xyz')) {return ('gainprofit.xyz' + h.pathname)}
        else if (url.includes('crypto-faucet.xyz')) {
            if (url.includes('/claim/link/')) {path = h.pathname.replace(/\/claim\/link\//, '');return ('doctor-groups.com/link/' + path)}
            if (url.includes('/faucets/')) {path = h.pathname.replace(/\/faucets\//, '');return ('doctor-groups.com/link/' + path)}}
        else if(url.includes('konstantinova.net/verify/')){path = h.pathname.replace(/\/verify\//,'');return ('coin.mg/'+path)}
        else if(url.includes('faucet.100count.net')){path = url.replace(/.*faucet./,'');return (path)}
        else if(url.includes('crazyblog.in')){
            if(h.pathname.includes('demo')){path = h.pathname.replace(/.*\//,'');return ('wplink.online/'+path)}
            if(h.pathname.includes('wpblog')){if(h.searchParams.get('link')){return ('wplink.online/'+ h.searchParams.get('link'))}
                                              else{path=h.pathname.replace(/.*\//,'');return ('shrinkpay.crazyblog.in/'+path)}}
            if(h.searchParams.has('link')){return ('shrinkpay.crazyblog.in/' + h.searchParams.get('link'))}}
        else if(url.includes('amazingdarpon.com')&& h.searchParams.has('link')){return 'go.zolomix.in/' + h.searchParams.get('link');}
        else if(url.includes('kiralikarazi.com')){return 'go.mof.pw/' + h.searchParams.get('link');}
        else if(/\/\/.*\/coinsurl\/(.*)/ig.test(url)){path = h.pathname.replace(/\/coinsurl\//,'');return 'coinsurl.com/'+path}
        else if(/clickscoin.*\/short\/(.*)/ig.test(url)){path = h.pathname.replace(/\/short\//,'');return 'short.clickscoin.com/'+path}
        else if(/sl.mcmfaucets.*\/short\/(.*)/ig.test(url)){return 'mcmcryptos.xyz/'+h.pathname}
        else if(/crazyblog.in\/\?postid=/ig.test(url)){window.location = h.search.replace(/.*=/,'')}
        else if(/11bit.co.in/.test(url)){window.location='http:/'+h.pathname.replace(/bitshort/,'bitshort.co')}
        else if(/trxking.xyz\/bonus/.test(url)){window.location='http:/'+h.pathname.replace(/\/bonus/,'shrinkpay.crazyblog.in/')}
        else if(/.+clickscoin.com\/.+ccsl\/(.*)/ig.test(url)){path=h.pathname.replace(/\/ccsl\//,'');return 'ccsl.xyz/'+path }
        //-----------------meta-----------------------------------------------------//
        else if(url.includes('themezon.net')){
            path = h.search.replace(/\?/,'')
            // return ('linksly.co/'+path)
            meta()
            return ('linksly.co/'+ path)
        } else if(/mixespecialidades.live|tecnoinfo.xyz/.test(url) && h.pathname === '/check/' && /^\?([^&]+)/.test(h.search)){
            window.stop();setTimeout(()=>{location.reload()},60000)
            path = h.search.replace(/\?/,'')
            // return ('linksly.co/'+path)
            meta()
            location=path
        } else if(/cekip.site/.test(url) && /^\/go\/([^\/]+)/.test(h.pathname)){
            path = atob(h.pathname).slice(3)
            try {meta()
                 location=path
                }catch(e) {}
        } else if (/l.techpedi.com/.test(url)){
            path = h.search.replace(/\?/,'')
            return 'https://onewebify.com/' + path+"/===";
            if (h.pathname === '/verify/') {
                path = h.search.replace(/\?/,'')
                meta()
                const a = document.createElement('a');
                location='https://onewebify.com/' + path+"/=";
            }
        }
        //----------------------BASE64----------------------------------------------------//

        //---------------------------------------------------------------------------//
        else if(url.includes('mgnet.xyz')||url.includes('1bit.space')){
            waitForKeyElements('.button-element-verification',(e)=>{
                window.addEventListener('load', (event) => {
                    window.app_country_visitor=""
                    hcaptcha.getResponse=()=>{}
                    apiCounter.generateURL()
                    apiCounter.redirectTo(e)
                });},false) }

        else if(url.includes('1bitspace.com/api/tokenURL')){
            window.addEventListener('load', (event) => {
                window.location=atob(tokenURL)
            })
        }

    })(new URL(window.location.href))

    //----------------------------------------------------------------------------------//
    if (l) {
        window.location.replace(new URL('https://' + l.replace(/https:\/\//,'')));
    }
})();
