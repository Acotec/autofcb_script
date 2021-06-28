(function () {
    'use strict';
    var Nav=(()=>{var e=performance.getEntriesByType("navigation")[0].redirectCount,r=document.referrer.includes("shortlinks/visited/");1==e||1==r?(window.close(),window.close()):waitForKeyElements("div.alert-success",e=>{window.close()},true,10,-1)})();

    })();