(function() {
    'use strict';
    var h = window.location.href

    function removeElement(element){
        var elem = element.parentElement.parentElement
        elem.parentNode.removeChild(elem)//remove log-out button from every where;

        if(h.includes('withdraw/')){
            var ele = Array.from(document.querySelectorAll('option'))
            ele.forEach(element =>{if(element.innerHTML.toLowerCase().includes('expresscrypto')){element.remove()}});; //remove withdrawal to ExpressCrypto
        }
    }

    waitForKeyElements(".anticon-logout", (element) => {
        removeElement(element)
    }, );



})();
