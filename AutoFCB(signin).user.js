(function() {
    'use strict';
    if(/autofaucet.org\/auth\/signin/ig.test(window.location.href)){
        setInterval((e=document.querySelector("#submit"))=>{
            console.log(e.innerText);if(/Signing.*in/ig.test(e.innerText)){window.location.reload(false)}},2000)
        var check = setInterval(()=>{
            var captcha_select = document.querySelector('#captcha-select')
            var captcha= Array.from(captcha_select.children)
            captcha.forEach((e)=>{if(/solvemedia/ig.test(e.innerText)){e.click()}})
            if(/solvemedia/ig.test(document.querySelector("#dropdownMenuButton").innerText)){
                clearInterval(check)
            }
        },100)
        }
    else{
        function selectFromDropDown(id,value){
            //alert(value)
            if(String(value)!=='undefined'){
                let element = document.querySelector(id);
                Array.from(element.options).filter(a=>{if(RegExp(value,'ig').test(a.innerText.replace(/\s/ig,''))){a.selected = true;element.dispatchEvent(new Event('change'));}});
            }}
        selectFromDropDown('#captcha-select','solvemedia')
    }

})();
