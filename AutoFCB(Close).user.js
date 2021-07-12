    function OnPhone(){
        window.close();window.close();window.close();window.close();
    }

    function OnLaptop(){
        var c = getCookie("visited");
        var navigate = performance.getEntriesByType("navigation")[0].type == 'navigate'
        var reload = performance.getEntriesByType("navigation")[0].type =='reload'
        var ref_self = /auto(faucet|claim|bitco)/ig.test(document.referrer)
        var visited = document.referrer.includes("shortlinks/visited/");
        if ((navigate && !ref_self) || (reload && visited) ) {
            window.close();window.close();window.close();window.close();window.close();window.close()
        }else{
            if (c === "yes") {
                window.close();window.close();window.close();window.close();window.close();window.close()
            }
            setCookie("visited", "yes",120)
        }
    }
    OnPhone()
