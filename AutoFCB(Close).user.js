(function () {
    'use strict';
    var navigate = performance.getEntriesByType("navigation")[0].type == 'navigate'
    var ref_self = /auto(faucet|claim|bitco)/ig.test(document.referrer)
    var referrer = document.referrer.includes("shortlinks/visited/");
    if ((navigate && !ref_self) || referrer ) {
        window.close()
    }else {
        waitForKeyElements("div.alert-success", function(e) {
            window.close();
        }, true, 10, -1);
    }
})();
