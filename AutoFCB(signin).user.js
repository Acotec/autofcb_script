(function() {
    'use strict';
    Array.prototype.sample = function() {return this[Math.floor(Math.random() * this.length)];}
    var captchatoselect = ["recaptcha"].sample()//'solvemedia'
    var loop=0
    var repeat = 3
    if(/autofaucet.org\/auth\/signin/ig.test(window.location.href)){
        setInterval((e=document.querySelector("#submit"))=>{
            console.log(e.innerText);if(/Signing.*in/ig.test(e.innerText)){window.location.reload(false)}},2000)
        var check = setInterval(()=>{
            loop++
            var captcha_select = document.querySelector('#captcha-select')
            var captcha= Array.from(captcha_select.children)
            captcha.forEach((e)=>{if(new RegExp(captchatoselect,'ig').test(e.innerText)){e.click();e.selected = true;e.dispatchEvent(new Event('click'))}})
            if(loop>=repeat&&new RegExp(captchatoselect,'ig').test(document.querySelector("#dropdownMenuButton").innerText)){
                clearInterval(check)
            }

        },500)
        }
    else{
        function selectFromDropDown(id,value){
            //alert(value)
            if(String(value)!=='undefined'){
                let element = document.querySelector(id);
                Array.from(element.options).filter(a=>{if(new RegExp(value,'ig').test(a.innerText.replace(/\s/ig,''))){a.selected = true;element.dispatchEvent(new Event('change'));}});
            }}
        //selectFromDropDown('#captcha-select',captchatoselect)
        let check =setInterval(()=>{
            loop++;
            selectFromDropDown('#captcha-select',captchatoselect);
            console.log('reselect',captchatoselect)
            loop<=repeat||clearInterval(check);
        },500)
        //setTimeout(()=>{selectFromDropDown('#captcha-select',captchatoselect);console.log('reselect',captchatoselect)},3000)
        setInterval((e=document.querySelector(".toast"))=>{try{if(/error/ig.test(e.innerText)){window.location.reload(false)}}catch(e){null}},2000)
    }
})();
