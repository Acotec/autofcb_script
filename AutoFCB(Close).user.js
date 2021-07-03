(function () {
    var c = getCookie("visited");
    if (c === "yes") {
         window.close();window.close();window.close();window.close();window.close();window.close()
    } else {
        setCookie("visited", "yes",10)
    }
})();
