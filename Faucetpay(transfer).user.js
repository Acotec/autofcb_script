(function() {
    function getAmount(){
        let getindex = Cryptocurrency[0].selectedIndex
        let getvalue = Cryptocurrency[0].options[getindex].innerText.toLowerCase()

        Cryptocurrency[1].value = GM_getValue(getvalue)
        Cryptocurrency[1].dispatchEvent(new Event('change'));
        GM_setValue('defaultCrypto',getvalue)
    }

    if(/user-admin/gi.test(window.location.href)){
        var payouttoday = parseInt(document.getElementsByClassName('tx-20 tx-sm-18 tx-md-24 tx-normal tx-rubik mg-b-0')[2].innerText)
        var wallet_balance = parseFloat(document.getElementsByClassName('tx-20 tx-sm-18 tx-md-24 tx-normal tx-rubik mg-b-0')[0].innerText.replace(/\$/,''))
        waitForKeyElements(".crypto", (element) => {
            if(element){
                GM_setValue(element.innerText.match(/.*\n/gi)[0].replace(/\n/,'').toLowerCase(),element.innerText.replace(/^.*\n/gi,''))
            }
        },false,);

        //location = 'https://faucetpay.io/transfer'
        if(!(payouttoday>=3)|| parseInt(wallet_balance)==0 ){
            if(payouttoday<3){alert('You have not withdraw from all the faucet sites Today')}
            else{alert('Wallet Balance is '+wallet_balance)}
        }
        else{
            window.location.replace('https://faucetpay.io/transfer')
            // ;GM_setValue('transfer',false)
        }
    };
    if(/transfer/gi.test(window.location.href)){
        waitForKeyElements(".alert-info", (element) => {
            let msg = element.innerText
            if(/Your transfer has been successfully completed/gi.test(msg)){
                //var transfer = GM_setValue('transfer',true)
                window.location.replace('https://faucetpay.io/page/user-admin')
            }
        },false,);

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
    };

})();
