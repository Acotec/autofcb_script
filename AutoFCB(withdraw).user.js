(function() {
    'use strict';
    var coinS=GM_getValue("coin",null);
    var loop = 0
    function selectFromDropDown(id,value){
        //alert(value)
        if(String(value)!=='undefined'){
            let element = document.querySelector(id);
            Array.from(element.options).filter(a=>{if(RegExp(value,'ig').test(a.innerText.replace(/\s/ig,''))){a.selected = true;element.dispatchEvent(new Event('change'));}});
        }else{
            console.log('No currency claim yet ')
        }
    }
    waitForKeyElements('#estimatedc', (element) => {
        coinS=element.innerText.replace(/[\W\d]+/,"")
        GM_setValue("coin",coinS)
    },false);
    waitForKeyElements('.toast-message', (element) => {
        if(/payment has been sent/gi.test(element.innerHTML) && /dashboard\/withdraw\/\w+/gi.test(window.location.href)){
            let url='https://'+ window.location.host +'/dashboard/shortlinks'//'https://'+ window.location.host +'/dashboard/claim/manual'
            window.location=url
        }else if(/credited to your balance/gi.test(element.innerHTML) && /claim\/manual/gi.test(window.location.href)){
            let url='https://'+ window.location.host +'/dashboard/withdraw/'+ GM_getValue("coin")
            window.location=url
        }else if(/You entered an incorrect answer for the captcha, please try again|wrong.?answer/.test(element.innerHTML)){
            window.location.reload(false)
        }else if(/You have not entered your FaucetPay E-mail address yet/ig.test(element.innerHTML)){
            window.location.href = 'https://autobitco.in/dashboard/settings'
        }

    },false);

    if(/claim\/manual/gi.test(window.location.href)){
        selectFromDropDown('#currency-select','USDT')
        let inter=setInterval(function () {
            loop+=1
            let token = document.querySelector("#token-amount").value==0
            if(token&&!(loop>=50)){
                document.querySelector("#maxmcla-addon").click()
            }
            else{
                clearInterval(inter);clearInterval(inter)
                if(!token){
                    selectFromDropDown('#currency-select',GM_getValue("coin"))
                    selectFromDropDown('#captcha-select','solvemedia')}
            }
        },100)
        } else if(/dashboard\/withdraw\/\w+/gi.test(window.location.href)){
            let inter=setInterval(function () {
                loop+=1
                let amount = document.querySelector("#amount").value==0
                if(amount&&!(loop>=50)){
                    document.querySelector("#maxwith-addon").click()
                }
                else{
                    clearInterval(inter);clearInterval(inter)
                    if(!amount){
                        selectFromDropDown('#processor','faucetpay')
                        selectFromDropDown('#captcha-select','solvemedia')}

                }
            },100)
            } else if(/dashboard\/withdraw\#settings/ig.test(window.location.href)){
                var saveButton=[]
                waitForKeyElements('#form-faucetpaymail', (element) => {
                    let faucetpayemail = element.querySelector("#faucetpay-email")
                    faucetpayemail.value=GM_getValue('Email')
                    var saveEmail = Array.from(document.querySelectorAll("button"));
                    saveEmail.filter((b)=>{if(/save/ig.test(b.innerText)){saveButton.push(b)}})
                    saveButton=saveButton.pop()
                });
                setTimeout(()=>{saveButton.click();document.dispatchEvent(new Event('change'))},2000)
                setTimeout(()=>{window.location ='https://'+ window.location.host +'/dashboard/withdraw/'+ GM_getValue("coin")},5000)
            } else if(/dashboard\/settings/ig.test(window.location.href)){
                waitForKeyElements('.input-group', (element) => {
                    let Email = element.getElementsByTagName('input')[0].value
                    GM_setValue('Email',Email)
                    window.location = 'https://'+ window.location.host+"/dashboard/withdraw#settings"
                });
            }
})();
