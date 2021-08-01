(function() {
    function getAmount(){
        let getindex = Cryptocurrency[0].selectedIndex
        let getvalue = Cryptocurrency[0].options[getindex].innerText.toLowerCase()

        Cryptocurrency[1].value = GM_getValue(getvalue)
        Cryptocurrency[1].dispatchEvent(new Event('change'));
        GM_setValue('defaultCrypto',getvalue)
    }
    if(/transfer/gi.test(window.location.href)){
        var Cryptocurrency = document.querySelectorAll('.form-control');
        Cryptocurrency[0].addEventListener('change',getAmount);
        var defaultCrypto = GM_getValue('defaultCrypto',null);
        if(defaultCrypto){
            for (let i = 0; i <= Cryptocurrency[0].length-1; i++){
                if (Cryptocurrency[0][i].innerText.toLowerCase().includes(defaultCrypto)){
                    Cryptocurrency[0][i].selected = true
                    Cryptocurrency[0].dispatchEvent(new Event('change'));
                };
            };
            Cryptocurrency[1].value = GM_getValue(defaultCrypto)
            Cryptocurrency[1].dispatchEvent(new Event('change'));
        }
        Cryptocurrency[2].value = 'harfho77@gmail.com'
        Cryptocurrency[2].dispatchEvent(new Event('change'));
        waitForKeyElements(".alert-info", (element) => {
            let msg = element.innerText
            if(/Your transfer has been successfully completed/gi.test(msg)){
                var transfer = GM_setValue('transfer',true)
                location = 'https://faucetpay.io/page/user-admin'
            }
        },true,100);

    };
    if(/user-admin/gi.test(window.location.href)){
        var payouttoday = parseInt(document.querySelector(".media.mg-t-20.mg-sm-t-0.mg-sm-l-15.mg-md-l-40 > div.media-body").innerText.replace(/[^\d].*\n/,''))
        waitForKeyElements(".crypto", (element) => {
            if(element){
                GM_setValue(element.innerText.match(/.*\n/gi)[0].replace(/\n/,'').toLowerCase(),element.innerText.replace(/^.*\n/gi,''))
            }
        },false,100,1);

        //location = 'https://faucetpay.io/transfer'
        if(!(payouttoday>=3)){
            alert('You have not withdraw from all the faucet sites Today')
        }
        else if(!GM_getValue('transfer') && !/transfer/gi.test(document.referrer)){
            location = 'https://faucetpay.io/transfer'
            //GM_setValue('transfer',false)
        }else{GM_setValue('transfer',false)}
    }
})();
