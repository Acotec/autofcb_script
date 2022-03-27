(function() {
    'use strict';
    Array.prototype.sample = function() {return this[Math.floor(Math.random() * this.length)];}
    var captchatoselect = ['solvemedia'].sample()//"recaptcha",
    var loop=0
    if(/autofaucet.org\/auth\/signin/ig.test(window.location.href)){
        setInterval((e=document.querySelector("#submit"))=>{
            console.log(e.innerText);if(/Signing.*in/ig.test(e.innerText)){window.location.reload(false)}},2000)
        var check = setInterval(()=>{
            loop++
            var captcha_select = document.querySelector('#captcha-select')
            var captcha= Array.from(captcha_select.children)
            captcha.forEach((e)=>{if(new RegExp(captchatoselect,'ig').test(e.innerText)){e.click();e.selected = true;e.dispatchEvent(new Event('click'))}})
            if(loop>20&&new RegExp(captchatoselect,'ig').test(document.querySelector("#dropdownMenuButton").innerText)){
                clearInterval(check)
            }

        },100)
        }
    else{
        function selectFromDropDown(id,value){
            //alert(value)
            if(String(value)!=='undefined'){
                let element = document.querySelector(id);
                Array.from(element.options).filter(a=>{if(new RegExp(value,'ig').test(a.innerText.replace(/\s/ig,''))){a.selected = true;element.dispatchEvent(new Event('change'));}});
            }}
        //setInterval(()=>{selectFromDropDown('#captcha-select',captchatoselect)},1000)
        selectFromDropDown('#captcha-select',captchatoselect)
        //let check =setInterval(()=>{loop++;selectFromDropDown('#captcha-select',captchatoselect);loop>50||clearInterval(check);;console.log('reselect solve_media')},3000)
        setTimeout(()=>{selectFromDropDown('#captcha-select',captchatoselect);console.log('reselect solve_media')},3000)
        setInterval((e=document.querySelector(".toast"))=>{try{if(/error/ig.test(e.innerText)){window.location.reload(false)}}catch(e){null}},2000)
    }
})();
