// ==UserScript==
// @name         AutoFCB(signinGeneratePass)
// @namespace    Acotec
// @version      0.1
// @description  Genrate password from username
// @author       Acotec
// @updateURL    https://github.com/Acotec/autofcb_meta/raw/master/AutoFCB(signinGeneratePass).user.js
// @downloadURL  https://github.com/Acotec/autofcb_meta/raw/master/AutoFCB(signinGeneratePass).user.js
// @include      *auto*/signin
// @icon         https://www.google.com/s2/favicons?domain=autofaucet.org
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    let form = Array.from(document.querySelectorAll(".form-control"))
    let ps="",
        d=[];
    function capitalizeFirstLetter(string){return string[0].toUpperCase() + string.slice(1).toLowerCase();};
    const crypt = (salt, text) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const byteHex = (n) => ("0" + Number(n).toString(16)).substr(-2);
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);

        return text
            .split("")
            .map(textToChars)
            .map(applySaltToChar)
            .map(byteHex)
            .join("");
    };
    const decrypt = (salt, encoded) => {
        const textToChars = (text) => text.split("").map((c) => c.charCodeAt(0));
        const applySaltToChar = (code) => textToChars(salt).reduce((a, b) => a ^ b, code);
        return encoded
            .match(/.{1,2}/g)
            .map((hex) => parseInt(hex, 16))
            .map(applySaltToChar)
            .map((charCode) => String.fromCharCode(charCode))
            .join("");
    };
    function generatepass(df_ps){
        let ps=df_ps.toLowerCase()
        let autofcb ="autofcb"
        let ps_num =ps.length
        if(ps_num>=8){
            ps=capitalizeFirstLetter(ps+ps_num)
        }
        else if(ps_num<8){
            let getfromautofcb = 8-ps_num
            ps =capitalizeFirstLetter(ps+autofcb.slice(0,getfromautofcb)+getfromautofcb)
        }
        let key = window.location.host
        let crypt_ps = crypt(key,ps)
        let decrypt_ps =decrypt(key,crypt_ps)
        let bycrypt_ps = btoa(crypt_ps)+crypt_ps
        let gen = bycrypt_ps.replace(/=|\d/ig,'').substring(0,8)+crypt_ps.substr(-7)
        gen = capitalizeFirstLetter(gen.substring(4,))
        if(gen.length<8){gen=capitalizeFirstLetter(gen)}
        if(!/\w/ig.test(gen)){gen=capitalizeFirstLetter(gen+'Acot')}
        if(!/\d/ig.test(gen)){gen=capitalizeFirstLetter(gen+81186815)}
        console.log(ps,crypt_ps,decrypt_ps,bycrypt_ps,gen)
        return gen
    }
    function pass(un){
        form.filter(a =>{if(a.type==atob('cGFzc3dvcmQ=')){d.push(a)}})
        if(/autofaucet/ig.test(window.location.href)){
            ps = generatepass(un)
            console.log(ps)
            d.forEach(p =>{
                p.value=ps
            })
        }
        else if(/autoclaim/ig.test(window.location.href)){
            ps = generatepass(un)
            console.log(ps)
            d.forEach(p =>{
                p.value=ps
            })
        }
        else if(/autobitco/ig.test(window.location.href)){
            ps = generatepass(un)
            console.log(ps)
            d.forEach(p =>{
                p.value=ps
            })
        }}
    form.filter(u=>{if(u.name=='username'){u.addEventListener('focusout', (event) => {
        pass(u.value)
    });}})
})();
