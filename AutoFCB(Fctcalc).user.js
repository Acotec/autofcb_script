(function() {
    'use strict';
    // Your code here...
    var parag = document.createElement("p");
    parag.setAttribute('class','amount')
    var addto = document.getElementsByClassName('col item')[1].getElementsByClassName('content-box')[0]
    var getElement=Array.from(document.getElementsByClassName('info'))
    var FCT =0

    for(let i=0;i<=getElement.length;i++){
        try{
            let getItem = getElement[i].parentElement.getElementsByClassName('name')[0]
            let get_fct=getItem.getElementsByClassName('badge badge-info')[0].innerText
            let get_fctnum=parseInt(get_fct.match(/(\d.*\d)/)[0])
            let get_viewleft= getItem.parentElement.getElementsByClassName('info')[0].innerText.match(/\d\/\d.*/)[0]
            //let remain = get_viewleft.replace(/\/\d.*/,'')
            let total = get_viewleft.replace(/\d.*\//,'')
            FCT +=get_fctnum*total
        }catch(err){null}
    }
    console.log(FCT)

    parag.innerText='Total FCT:'+FCT
    addto.append(parag)
})();