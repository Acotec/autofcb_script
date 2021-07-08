(function () {
    function OnPhone(){
        var c = getCookie("visited");
        if (c === "yes") {
            window.close();window.close();window.close();window.close();window.close();window.close()
        }
        setCookie("visited", "yes",300)}

    function OnLaptop(){
        var navigate = performance.getEntriesByType("navigation")[0].type == 'navigate'
        var reload = performance.getEntriesByType("navigation")[0].type =='reload'
        var ref_self = /auto(faucet|claim|bitco)/ig.test(document.referrer)
        var visited = document.referrer.includes("shortlinks/visited/");
        if ((navigate && !ref_self) || (reload && visited) ) {
            window.close();window.close();window.close();window.close();window.close();window.close()
        }
    }
    OnPhone()
})();
