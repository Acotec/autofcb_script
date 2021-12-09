(function() {
    if ( window.history.replaceState ) {
        window.history.replaceState( null, null, window.location.href )
    }//to prevent resubmit on refresh and back button
    //---------------------------------------------------------//
    var retry = 4
    function update_DontOpen(linkName) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: 'https://gist.github.com/Harfho/d4805d8a56793fa59d47e464c6eec243/raw/_DontOpen.txt?timestamp=' + (+new Date()),
            fetch: true,
            nocache: false,
            onload: getDontOpen
        })
        function getDontOpen(response){
            let getDontOpen = response.responseText.replace(/'|"|\[|\]/ig, '').split(',');
            var _DontOpen = getDontOpen.map(item => item.replace(/'/ig, '"').toLowerCase())
            _DontOpen.push(linkName.toLowerCase())
            alert(_DontOpen)
            var access_token = atob('Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==')
            access_token = "Bearer " + access_token
            //console.log(access_token)
            const myHeaders = new Headers({
                "accept": "application/vnd.github.v3+json",
                'Authorization': access_token,
                "Content-Type": "application/json"
            })
            var raw = JSON.stringify({
                "files": {
                    "_DontOpen.txt": {
                        "content": JSON.stringify(_DontOpen)
                    }
                }
            });
            var requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };

            fetch("https://api.github.com/gists/d4805d8a56793fa59d47e464c6eec243", requestOptions)
                .then(response => response.text())
                .then(result => console.log(_DontOpen)) //console.log(result)
                .catch(error => console.log('error', error));
        }


    }
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
                    if(/pattern.*/ig.test(d.message)){
                        update_DontOpen(new URL(l).host.replace(/\..*/ig,""))
                        GM_notification({
                            title:'!Bypass-- '+window.location.host,
                            text:l+""+d.message+" and was added to DontOpen",
                            timeout:300*1000,
                            ondone:()=>{},
                        });
                        window.close()
                    }else{
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
