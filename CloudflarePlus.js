(function() {
    'use strict';
    async function fix_cloudflare() {
        if(document.querySelectorAll("div[class^='cf-'").length==0 || document.querySelectorAll("div[id^='cf-'").length==0){
            const oldUrl = window.location.href;
            const url = new URL(oldUrl);
            const params = url.searchParams;
            const key=['jschl','captcha','managed','rt'];
            for (let i = 0; i < key.length; i++) {
                params.delete('__cf_chl_'+key[i]+'_tk__');
            }
            const newUrl = url.toString();
            if(newUrl!==oldUrl){
                window.location.replace(newUrl);
            }
        }
    }
    window.onload = function() {fix_cloudflare();}
})();
