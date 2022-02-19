(function () {
    var msg;
    const sendTo = "harfho77@gmail.com"

    function getAmount() {
        let getindex = Cryptocurrency.selectedIndex
        let getvalue = Cryptocurrency.options[getindex].innerText.toLowerCase()

        Amount.value = GM_getValue(getvalue)
        Amount.dispatchEvent(new Event('change'));
        GM_setValue('defaultCrypto', getvalue)
    }

    function ForceTransfer() {
        0 == GM_getValue("ForceTransfer", !1) ? GM_setValue("ForceTransfer", !0) : GM_setValue("ForceTransfer", !1);
        window.location.reload()
    };
    GM_registerMenuCommand("ForceTransfer-" + GM_getValue('ForceTransfer', false), ForceTransfer, "ForceTransfer");

    if (/user-admin/gi.test(window.location.href)) {
        var payouttoday = parseInt(document.getElementsByClassName('tx-20 tx-sm-18 tx-md-24 tx-normal tx-rubik mg-b-0')[2].innerText)
        var wallet_balance = parseFloat(document.getElementsByClassName('tx-20 tx-sm-18 tx-md-24 tx-normal tx-rubik mg-b-0')[0].innerText.replace(/\$/, ''))
        waitForKeyElements(".crypto", (element) => {
            if (element) {
                GM_setValue(element.innerText.match(/.*\n/gi)[0].replace(/\n/, '').toLowerCase(), element.innerText.replace(/^.*\n/gi, ''))
            }
        }, false, );

        //location = 'https://faucetpay.io/transfer'
        if (GM_getValue("ForceTransfer", false) == true && (parseFloat(wallet_balance) != 0)) {
            msg = "Forcing -- Transfer"
            GM_notification({
                title: window.location.host,
                text: msg,
                timeout: 5 * 1000,
                ondone: () => {},
                onclick: () => {
                    alert(msg)
                }
            });
            window.location.replace('https://faucetpay.io/transfer')
        } else if (!(payouttoday >= 3) || parseInt(wallet_balance) == 0) {
            var acct = document.querySelector('.avatar-initial').innerText
            //GM_setValue("ForceTransfer", false)
            if (payouttoday < 3) {
                msg = 'You have not withdraw from all the faucet sites Today in ' + acct
                GM_notification({
                    title: window.location.host,
                    text: msg,
                    timeout: 10 * 1000,
                    ondone: () => {},
                    onclick: () => {
                        alert(msg)
                    }
                });
            } else {
                msg = 'Wallet Balance of ' + acct + " is " + wallet_balance
                GM_notification({
                    title: window.location.host,
                    text: msg,
                    timeout: 10 * 1000,
                    ondone: () => {},
                    onclick: () => {
                        alert(msg)
                    }
                });
            };
        } else {
            window.location.replace('https://faucetpay.io/transfer')
            // ;GM_setValue('transfer',false)
        }
    };
    if (/transfer/gi.test(window.location.href)) {
        waitForKeyElements(".alert-info", (element) => {
            msg = element.innerText
            if (/Your transfer has been successfully completed/gi.test(msg)) {
                //var transfer = GM_setValue('transfer',true)
                window.location.replace('https://faucetpay.io/page/user-admin')
            }
        }, false, );


        var Cryptocurrency_details = document.querySelectorAll('.form-control'),
            Cryptocurrency = Cryptocurrency_details[0],
            Amount = Cryptocurrency_details[1],
            UsernameOrEmail_Address = Cryptocurrency_details[2];

        Cryptocurrency.addEventListener('change', getAmount);
        var defaultCrypto = GM_getValue('defaultCrypto', null);
        if (defaultCrypto) {
            for (let i = 0; i <= Cryptocurrency.length - 1; i++) {
                if (Cryptocurrency[i].innerText.toLowerCase().includes(defaultCrypto)) {
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
