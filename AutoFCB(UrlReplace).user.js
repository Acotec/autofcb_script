(function() {
    'use strict';
    var path = null
    var l = ((h) => {
        let url = window.location.href
        if (url.includes('adsy.pw') && h.searchParams.has('url')) {
            return (h.searchParams.get('url'))
        } else if (url.includes('gainprofitblog1.freesats.xyz')) {
            return ('gainprofit.xyz' + h.pathname)
        } else if (url.includes('crypto-faucet.xyz')) {
            if (url.includes('/claim/link/')) {
                path = h.pathname.replace(/\/claim\/link\//, '')
                return ('doctor-groups.com/link/' + path)
            }
            if (url.includes('/faucets/')) {
                path = h.pathname.replace(/\/faucets\//, '')
                return ('doctor-groups.com/link/' + path)
            }
        } else if(url.includes('konstantinova.net/verify/')){
            path = h.pathname.replace(/\/verify\//,'')
            return ('coin.mg/'+path)
        } else if(url.includes('faucet.100count.net')){
            path = url.replace(/.*faucet./,'')
            return (path)
        } else if(url.includes('themezon.net')){
            path = h.search.replace(/\?/,'')
            // return ('linksly.co/'+path)
            const m = document.createElement('meta');
            m.name = 'referrer';
            m.content = 'origin';
            document.head.appendChild(m);
            //const a = document.createElement('a');
            // a.href = 'https://linksly.co/' + path;
            // a.click();
            return ('linksly.co/'+ path)
        } else if(/mixespecialidades.live|tecnoinfo.xyz/.test(url) && h.pathname === '/check/' && /^\?([^&]+)/.test(h.search)){
            window.stop();setTimeout(()=>{location.reload()},60000)
            path = h.search.replace(/\?/,'')
            // return ('linksly.co/'+path)
            const m = document.createElement('meta');
            m.name = 'referrer';
            m.content = 'origin';
            document.head.appendChild(m);
            //const a = document.createElement('a');
            // a.href = 'https://linksly.co/' + path;
            // a.click();
            location=path
        } else if(/cekip.site/.test(url) && /^\/go\/([^\/]+)/.test(h.pathname)){
            path = atob(h.pathname).slice(3)
            try {
                const m = document.createElement('meta');
                m.name = 'referrer';
                m.content = 'origin';
                document.head.appendChild(m);
                //const a = document.createElement('a');
                // a.href = atob(RegExp.$1);
                // a.click();
                location=path
            } catch(e) {}

        } else if(url.includes('crazyblog.in')){
            if(h.pathname.includes('demo')){
                path = h.pathname.replace(/.*\//,'')
                return ('wplink.online/'+path)
            }if(h.pathname.includes('wpblog')){
                return ('wplink.online/'+ h.searchParams.get('link'))
            }if(h.searchParams.has('link')){
                return ('cblink.crazyblog.in' + h.searchParams.get('link'))
            }
        } else if(url.includes('amazingdarpon.com')&& h.searchParams.has('link')){
            return 'go.zolomix.in/' + h.searchParams.get('link');
        } else if(url.includes('kiralikarazi.com')){
            return 'go.mof.pw/' + h.searchParams.get('link');
        } else if(/\/\/.*\/coinsurl\/(.*)/ig.test(url)){
            path = h.pathname.replace(/\/coinsurl\//,'')
            return 'coinsurl.com/'+path
        } else if(/click.*\/short\/(.*)/ig.test(url)){
            path = h.pathname.replace(/\/short\//,'')
            return 'short.clickscoin.com/'+path
        } else if(/sl.mcmfaucets.*\/short\/(.*)/ig.test(url)){
            return 'mcmcryptos.xyz/'+h.pathname
        }else if(/crazyblog.in\/\?postid=/ig.test(url)){
            window.location = h.search.replace(/.*=/,'')
        }

        //---------------------------------------------------------------------------//
        else if(url.includes('mgnet.xyz')||url.includes('1bit.space')){
            waitForKeyElements('.button-element-verification',(e)=>{
                window.addEventListener('load', (event) => {
                    window.app_country_visitor=""
                    hcaptcha.getResponse=()=>{}
                    apiCounter.generateURL()
                    apiCounter.redirectTo(e)
                });},) }

        else if(url.includes('1bitspace.com/api/tokenURL')){
            window.addEventListener('load', (event) => {
                window.location=atob(tokenURL)
            })
        }
    })(new URL(window.location.href))
    //---------------------------------------------------------------------------------//
    if (l) {
        window.location.replace(new URL('https://' + l.replace(/https:\/\//,'')));
    }
})();
