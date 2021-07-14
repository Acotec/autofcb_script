(function() {
    'use strict';
    // Your code here...
    var coin;
    waitForKeyElements('#estimatedc', (element) => {
        coin=element.innerText.replace(/[\W\d]+/,"")
    }, );
    waitForKeyElements('.toast-title', (element) => {
        if(/Success/gi.test(element.innerHTML)){
            let url='https://'+ window.location.host +'/dashboard/withdraw/'+coin
            window.location=url
        }
    }, );
    waitForKeyElements('.toast-message', (element) => {
        if(/payment has been sent/gi.test(element.innerHTML)){
            let url='https://'+ window.location.host +'/dashboard/claim/manual'
            window.location=url
        }
    }, );

})();
