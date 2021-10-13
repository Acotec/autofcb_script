(function() {
    const sendTo = "harfho77@gmail.com"

    function getAmount(){
        let getindex = Cryptocurrency.selectedIndex
        let getvalue = Cryptocurrency.options[getindex].innerText.toLowerCase()

        Amount.value = GM_getValue(getvalue)
        Amount.dispatchEvent(new Event('change'));
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


        var Cryptocurrency_details = document.querySelectorAll('.form-control');
        var Cryptocurrency=Cryptocurrency_details[0]
        var Amount=Cryptocurrency_details[1]
        var UsernameOrEmail_Address =Cryptocurrency_details[2]

        Cryptocurrency.addEventListener('change',getAmount);
        var defaultCrypto = GM_getValue('defaultCrypto',null);
        if(defaultCrypto){
            for (let i = 0; i <= Cryptocurrency.length-1; i++){
                if (Cryptocurrency[i].innerText.toLowerCase().includes(defaultCrypto)){
                    Cryptocurrency[i].selected = true
                    Cryptocurrency.dispatchEvent(new Event('change'));
                };
            };
            Amount.value = GM_getValue(defaultCrypto)
            Amount.dispatchEvent(new Event('change'));
        }
        UsernameOrEmail_Address.value = sendTo
        UsernameOrEmail_Address.dispatchEvent(new Event('change'));
    };

})();
