(function () {
    if (window.history.replaceState) {
        window.history.replaceState(null, null, window.location.href)
    } //to prevent resubmit on refresh and back button
    //---------------------------------------------------------//
    var messageError, linkCantBypass,
        //var location = window.location
        listOfAcceptDomains = GM_getValue('domains', ''),
        retry = 3,
        green_icon = GM_getValue('green_icon', ''),
        green_icon1 = GM_getValue('green_icon1', ''),
        grey_icon = GM_getValue('grey_icon', ''),
        red_icon = GM_getValue('red_icon', ''),
        autoFCB = 'auto(faucet|claim|bitco).(in|org)',
        gist_id = 'e6ed9bbe9feb74e71030c680feba9d71',
        delayOn = GM_getValue("delayOn", "[]"),
        update_delayOn = GM_getValue('update_delayOn', true);
    delayOn = JSON.parse(delayOn);

    function getIcons() {
        fetch("https://gist.githubusercontent.com/Harfho/63966e7f7145a5607e710a4cdcb31906/raw/ALBypass_icons.json")
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then((result) => {
            //console.log(result);
            let green_icon = result.green_icon
            let green_icon1 = result.green_icon1
            let grey_icon = result.grey_icon
            let red_icon = result.red_icon
            GM_setValue('green_icon', green_icon)
            GM_setValue('green_icon1', green_icon1)
            GM_setValue('grey_icon', grey_icon)
            GM_setValue('red_icon', red_icon)
        }).catch((error) => {
            //alert(error)
            //console.error(error);
            console.log("can't get Icons because of ", error)
            window.location.reload(false)
        });
    }
    0 != green_icon && 0 != green_icon1 && 0 != grey_icon && 0 != red_icon || getIcons();

    function favicon(icon_base64) {
        GM_addElement(document.getElementsByTagName('head')[0], 'link', {
            href: icon_base64,
            rel: "icon",
            type: "image/png"
        });
    }

    function waitForKeyElements(t, o, e, i, n) {
        void 0 === e && (e = !0), void 0 === i && (i = 300), void 0 === n && (n = -1);
        var r = "function" == typeof t ? t() : document.querySelectorAll(t),
            u = r && 0 < r.length;
        u && r.forEach(function (t) {
            var e = "data-userscript-alreadyFound";
            t.getAttribute(e) || !1 || (o(t) ? u = !1 : t.setAttribute(e, !0))
        }), 0 === n || u && e || (--n, setTimeout(function () {
            waitForKeyElements(t, o, e, i, n)
        }, i))
    }

    function getdelayPages() {
        //alert('getting delay page')
        GM_xmlhttpRequest({
            method: 'GET',
            url: "https://gist.github.com/Harfho/" + gist_id + "/raw/delaypage.txt?timestamp=' + (+new Date())",
            revalidate: false,
            nocache: true,
            onload: (r) => {
                let getdelaypages = r.responseText.replace(/[^\w\d.,-]/ig, '').split(',').filter(e => e),
                    delaypages = getdelaypages.map(item => item.replace(/'/ig, '"').toLowerCase());
                GM_setValue('delayOn', JSON.stringify(delaypages));
            },
            onerror: (r) => {}
        })
    }
    if (delayOn == false || update_delayOn == true) {
        GM_setValue('update_delayOn', false)
        getdelayPages()
    }

    function delayHost(link_host) {
        link_host = new URL(link_host).host
        if (delayOn.includes(link_host)) {
            return true
        }
    }

    function update_delaypage(linkhost = null) {
        var delaypage = GM_getValue('delayOn'); //getdelaypage.map(item => item.replace(/'/ig, '"').toLowerCase())
        delaypage = JSON.parse(delaypage)
        //console..log(delaypage,linkhost)
        var access_token = atob('Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==') //github access gist-Token
        access_token = "Bearer " + access_token
        //console.log(access_token)
        const myHeaders = new Headers({
            "accept": "application/vnd.github.v3+json",
            'Authorization': access_token,
            "Content-Type": "application/json"
        })
        var raw = JSON.stringify({
            "files": {
                "delaypage.txt": {
                    "content": JSON.stringify(delaypage)
                }
            }
        }),
            requestOptions = {
                method: 'PATCH',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
        fetch("https://api.github.com/gists/" + gist_id, requestOptions)
            .then(response => response.text())
            .then((result) => {
            console.log('Done', delaypage);
            //GM_setValue('update_delayOn',true);
            window.close()
        }) //console.log(result)
            .catch((error) => {
            console.log('error', error);
        });
        let msg = "push " + linkhost + " to delaypage list on github"
        GM_notification({
            title: '!Bypass-- ' + linkhost,
            text: msg,
            timeout: 10000,
            ondone: () => {},
        });
    }

    function addDelayorClose(element) {
        try {
            var referrer,
                error1052 = /.*action is marked as suspicious.*/ig.test(element.innerText.toLowerCase()),
                alreadyVisit = /.*already visited this link.*/ig.test(element.innerText.toLowerCase());
            referrer = new URL(document.referrer).host
        } catch (e) {
            referrer = ''
        }
        if (error1052) {
            //alert(error1052)
            delayOn = GM_getValue('delayOn');
            delayOn = JSON.parse(delayOn)
            let previousHost = GM_getValue('previousHost', '')
            if (referrer && delayOn.includes(referrer) == false) {
                delayOn.push(referrer)
                GM_setValue('delayOn', JSON.stringify(delayOn))
                update_delaypage(referrer)
            } else if (previousHost && delayOn.includes(previousHost) == false) {
                delayOn.push(previousHost)
                GM_setValue('delayOn', JSON.stringify(delayOn))
                update_delaypage(previousHost)
            }
        } else {
            window.close();
            window.close();
            window.close();
            window.close()
        }
    }

    function OnPhone() {
        0 == GM_getValue("OnPhone", !1) ? GM_setValue("OnPhone", !0) : GM_setValue("OnPhone", !1);
        window.location.reload()
    };

    function AllowToSendEmail() {
        0 == GM_getValue("AllowToSendEmail", !1) ? GM_setValue("AllowToSendEmail", !0) : GM_setValue("AllowToSendEmail", !1);
        window.location.reload()
    };

    function getSimilarWord(word, knownWords, _threshold = 0.3) {
        const threshold = _threshold

        function getBigram(word) {
            let result = [];
            for (let i = 0; i < word.length - 1; i++) {
                result.push(word[i] + word[i + 1]);
            }
            return result;
        }

        function getSimilarity(word1, word2) {
            word1 = word1.toLowerCase();
            word2 = word2.toLowerCase();
            const bigram1 = getBigram(word1),
                  bigram2 = getBigram(word2);
            let similar = [];

            for (let i = 0; i < bigram1.length; i++) {
                if (bigram2.indexOf(bigram1[i]) > -1) {
                    similar.push(bigram1[i]);
                }
            }
            return similar.length / Math.max(bigram1.length, bigram2.length);
        }

        function autoCorrect(word, knownWords, similarityThreshold = threshold) {
            let maxSimilarity = 0;
            let mostSimilar = word;
            for (let i = 0; i < knownWords.length; i++) {
                let similarity = getSimilarity(knownWords[i], word);
                if (similarity > maxSimilarity) {
                    maxSimilarity = similarity;
                    mostSimilar = knownWords[i];
                }
            }
            return maxSimilarity > similarityThreshold ? mostSimilar : word;
        }
        return autoCorrect(word, knownWords)
    }

    function updateAcceptDomain() {
        fetch("https://api.yuumari.com/alpha-bypass/domains/accept")
            .then((response) => {
            if (response.ok) {
                return response.json();
            }
            return Promise.reject(response);
        }).then((result) => {
            //console.log(result);
            var elements = []
            for (let keys in result) {
                elements.push(...result[keys])
            }
            //console.log(elements);
            GM_setValue('domains', JSON.stringify(elements))
        }).catch((error) => {
            //alert(error)
            //console.error(error);
            console.log("can't updateAcceptDomain because of ", error)
            window.location.reload(false)
        });
    }

    function sendEmail(toname, temp_id, msg) {
        const username = "Harfho",
              from_name = "Harfho",
              to_name = toname,
              message = msg,
              accessToken = atob("NDFjYWY3YmU4MWMwMmRiODIwOWQwNGE2Njg4YWVhZWE="),
              myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "user_id": "user_oF6Z1O2ypLkxsb5eCKwxN",
            "service_id": "gmail",
            "accessToken": accessToken,
            "template_id": temp_id,
            "template_params": {
                "username": username,
                "from_name": from_name,
                "to_name": to_name,
                "message": message
            }
        });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        fetch("https://api.emailjs.com/api/v1.0/email/send", requestOptions)
            .then(response => response.text())
            .then((result) => {
            console.log(result);
            window.close()
        })
            .catch(error => console.log('error', error));
    }

    function update_DontOpen(linkName) {
        GM_xmlhttpRequest({
            method: 'GET',
            url: "https://gist.github.com/Harfho/" + gist_id + "/raw/_DontOpen.txt?timestamp=' + (+new Date())",
            revalidate: false,
            nocache: true,
            onload: getDontOpen
        })

        function getDontOpen(response) {
            let getDontOpen = response.responseText.replace(/'|"|\[|\]/ig, '').split(',').filter(e => e);
            var _DontOpen = getDontOpen.map(item => item.replace(/'/ig, '"').toLowerCase())
            //console..log(_DontOpen,linkName)
            var access_token = atob('Z2hwXzFVMGhPMTFodTZ6eWxaZ0hMWW5qWFdMTjE1d3V5NjBZN0l6Rw==') //github access gist-Token
            access_token = "Bearer " + access_token
            //console.log(access_token)
            const myHeaders = new Headers({
                "accept": "application/vnd.github.v3+json",
                'Authorization': access_token,
                "Content-Type": "application/json"
            })
            if (linkName && !(_DontOpen.includes(linkName))) { //if the shortlink is not among _DontOpen before
                _DontOpen.push(linkName.toLowerCase())
                var raw = JSON.stringify({
                    "files": {
                        "_DontOpen.txt": {
                            "content": JSON.stringify(_DontOpen)
                        }
                    }
                }),
                    requestOptions = {
                        method: 'PATCH',
                        headers: myHeaders,
                        body: raw,
                        redirect: 'follow'
                    };
                fetch("https://api.github.com/gists/" + gist_id, requestOptions)
                    .then(response => response.text())
                    .then((result) => {
                    console.log('Done', _DontOpen);
                    window.close()
                }) //console.log(result)
                    .catch((error) => {
                    console.log('error', error);
                });
                let toname = "Yuumari.com",
                    temp_id = "shortlinks_vicissitude",
                    msg = "Cant Bypass " + linkCantBypass + " because api return with " + messageError + " message";
                sendEmail(toname, temp_id, msg)
                msg = linkName + " " + messageError + " and was added to _DontOpen list on gist"
                GM_notification({
                    title: '!Bypass-- ' + linkCantBypass,
                    text: msg,
                    timeout: 10000,
                    ondone: () => {},
                });
            } else {
                let msg = linkName + " is Already added to _DontOpen"
                GM_notification({
                    title: '!Bypass-- ' + linkCantBypass,
                    text: msg,
                    timeout: 10000,
                    ondone: () => {},
                });
                //console.log('Already added to _DontOpen')console.log('Updating shortlinks Lists')
                updateAcceptDomain()
                setTimeout(() => {
                    window.close()
                }, 5000)
            }
        }
    }

    function getDomainOrPathNameAndUpdate(link, toupdate) { //toupdate=(dontopen,delaypage,unsupported url)
        GM_xmlhttpRequest({
            method: 'GET',
            url: "https://gist.github.com/Harfho/" + gist_id + "/raw/shortlinks_name.txt?timestamp=' + (+new Date())",
            revalidate: false,
            nocache: true,
            onload: get_Shortlinks
        }, )

        function get_Shortlinks(response) {
            let get_shortlinks_name = response.responseText.replace(/'|"|\[|\]|\s/ig, '').split(',').filter(e => e);
            var shortlinks_name = get_shortlinks_name.map(item => item.replace(/'/ig, '"').toLowerCase());
            //console.log(shortlinks_name)
            let url = window.location.href.toLowerCase(),
                page_title = document.title.toLowerCase().trim(),
                hostname = new URL(link).host, //get hostname
                pathname,
                urlsplice = url.split('/').splice(2, 2),
                similardomain = getSimilarWord(urlsplice[0], shortlinks_name);
            if (/.*unsupported url.*/ig.test(toupdate)) {
                urlsplice.push(page_title, hostname, similardomain); //get domain,path and page title
            } else {
                urlsplice.push(page_title, hostname); //get domain,path and page title
            }
            //console.log(urlsplice)
            let found = urlsplice.some((r) => {
                pathname = r;
                return shortlinks_name.includes(r)
            })
            if (found) {
                if (/.*dontopen.*/ig.test(toupdate)) {
                    pathname = getSimilarWord(pathname, shortlinks_name)
                    update_DontOpen(pathname)
                } else if (/.*unsupported url.*/ig.test(toupdate) && shortlinks_name.includes(pathname)) {
                    messageError = "shortlink url was changed";
                    linkCantBypass = link
                    update_DontOpen(pathname)
                    let toname = "Harfho",
                        temp_id = "api_issue",
                        msg = "Cant Bypass " + link;
                    sendEmail(toname, temp_id, msg)
                }
            } else {
                if (/dontopen/ig.test(toupdate)) {
                    hostname = getSimilarWord(hostname, shortlinks_name)
                    update_DontOpen(hostname)
                } else if (/.*unsupported url.*/ig.test(toupdate) && shortlinks_name.includes(hostname)) {
                    messageError = "shortlink url was changed";
                    linkCantBypass = link
                    update_DontOpen(hostname)
                }
            }
        }
    }

    function update_Accesskey() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: "https://gist.githubusercontent.com/Harfho/d4805d8a56793fa59d47e464c6eec243/raw/keyEncode.txt",
            revalidate: false,
            nocache: true,
            onload: (r) => {
                let accesskey = r.responseText
                GM_setValue('accesskey', JSON.stringify(accesskey));
                console.log(atob(GM_getValue('accesskey').match(/\w*/gi).filter(e => "" != e)[0]))
            },
            onerror: (r) => {}
        })
    }
    if (GM_getValue('accesskey', false) == false) {
        update_Accesskey()
    }

    //bypass the link
    function bypass(link) {
        favicon(green_icon)
        let urlhost = new URL(link).host
        document.title = urlhost
        GM_setValue('previousHost', urlhost)
        const key = atob(GM_getValue('accesskey').match(/\w*/gi).filter(e => "" != e)[0]),
              baseUrl = 'https://api.yuumari.com/alpha-bypass/',
              u = key, //Access Key;
              l = link;
        fetch(baseUrl, {
            method: 'POST',
            body: new URLSearchParams({
                u,
                l
            })
        }).then(response => {
            console.log(response.status)
            if (!response.ok) {
                console.log("Network response was not OK - HTTP status " + response.status);
                throw new Error("Network response was not OK - HTTP status " + response.status);
            }
            return response.json()
        }).then((data) => {
            let message = data.message
            if (!message) { //if api return with a result
                sessionStorage.removeItem('tryagain')
                let title = document.title
                let timer = (x) => {
                    if (x == 0) {
                        window.location.href = data.result;
                        return
                    };
                    document.title = x + '-' + title;
                    return setTimeout(() => {
                        timer(--x)
                    }, 1000)
                }
                if (delayHost(link)) {
                    timer(17)
                } else {
                    timer(0)
                };
            } else { //api return with a message
                favicon(green_icon1)
                let tryagain;
                tryagain = sessionStorage.getItem('tryagain')
                if (sessionStorage.getItem('tryagain') == null) {
                    sessionStorage.setItem('tryagain', 1);
                    tryagain = sessionStorage.getItem('tryagain')
                }
                if (parseInt(tryagain) <= retry) {
                    sessionStorage.setItem('tryagain', parseInt(tryagain) + 1);
                    setTimeout(() => {
                        window.location.reload(false)
                    }, 2000)
                } else { //can't bypass the link after retrying
                    let urlhost = new URL(l).host
                    sessionStorage.removeItem('tryagain')
                    console.log(data.message)
                    //alert(data.message)
                    let check = "pattern changed|unsupported domain|not found|invalid path|invalid domain|failed to get document"
                    if (new RegExp(check, 'ig').test(message)) {
                        messageError = message;
                        linkCantBypass = link
                        getDomainOrPathNameAndUpdate(link, 'dontopen') //getDomain Or PathName And Update _DontoOpen with it
                    } else if (/ticket.*expired/ig.test(message)) { // if api key is expired
                        if (GM_getValue('AllowToSendEmail', false)) {
                            let toname = "Harfho",
                                temp_id = "api_issue",
                                msg = message + " Get New API key previous api key as expired";
                            update_Accesskey()
                            sendEmail(toname, temp_id, msg)
                        } else {
                            update_Accesskey()
                            setTimeout(() => {
                                window.location.reload(false)
                            }, 5000)
                        }
                    } else if (/ticket.*locked/ig.test(message)) {
                        //alert(message + "You have use more than 2 IPs to access Yuumari.com,Wait for 24Hour for API key to continue working")
                        if (GM_getValue('AllowToSendEmail', false)) {
                            let toname = "Harfho",
                                temp_id = "api_issue",
                                msg = message + "You have use more than 2 IPs to access Yuumari.com,Wait for 24Hour for API key to continue working";
                            sendEmail(toname, temp_id, msg)
                        } else {
                            console.log(message + "You have use more than 2 IPs to access Yuumari.com,Wait for 24Hour for API key to continue working")
                            window.close()
                        }
                    } else if (/leeched max count/ig.test(message)) {
                        let msg = message + "The limit on the number of requests has exceeded 2 queries per 1sec."
                        console.log(msg)
                        setTimeout(() => {
                            window.location.reload(false)
                        }, 1000)
                    } else {
                        let msg = message + "--" + link
                        GM_notification({
                            title: '!Bypass-- ' + urlhost,
                            text: msg,
                            timeout: 10 * 1000,
                            ondone: () => {
                                window.close()
                            },
                        });
                        GM_setClipboard(link, {
                            type: 'text/plain'
                        })
                        window.close()
                    }
                }
            }
        }).catch((error) => {
            favicon(red_icon)
            console.error(error);
            let urlhost = new URL(link).host
            console.log("can't bypass " + urlhost + " because of", error)
            //alert(error)
            let recheck;
            recheck = sessionStorage.getItem('recheck')
            if (sessionStorage.getItem('recheck') == null) {
                sessionStorage.setItem('recheck', 1);
                recheck = sessionStorage.getItem('recheck')
            }
            if (parseInt(recheck) <= retry) {
                sessionStorage.setItem('recheck', parseInt(recheck) + 1);
                setTimeout(window.location.reload(false), 5000)
            } else {
                favicon(red_icon)
                document.title = error + ":" + new URL(link).host
                sessionStorage.removeItem('recheck')

            }
        });
    }

    //main
    GM_registerMenuCommand("OnPhone-" + GM_getValue('OnPhone', false), OnPhone, "OnPhone");
    GM_registerMenuCommand("AllowToSendEmail-" + GM_getValue('AllowToSendEmail', false), AllowToSendEmail, "AllowToSendEmail");
    if (!listOfAcceptDomains) {
        updateAcceptDomain()
    } else if (listOfAcceptDomains.includes(window.location.host) && !(/\/===$/.test(window.location.href))) {
        //alert(window.location.host)
        let link = window.location.href
        document.title = new URL(link).host
        bypass(link)
    } else if (/\/===$/.test(window.location.href)) {
        if (/megaurl.in\/bypass=/.test(window.location.href)) {
            let link = window.location.pathname.replace(/.*bypass=/, '').replace(/\/===/ig, ''); //get the exact link to pass to bypasser
            document.title = new URL(link).host;
            bypass(link)
        } else {
            let link = window.location.href.replace(/\/===/ig, '');
            bypass(link)
        }
    } else if (new RegExp(autoFCB + '/dashboard$', 'ig').test(window.location.href)) {
        localStorage.removeItem("close");
        localStorage.clear();
    } else if (new RegExp(autoFCB + '/dashboard/shortlinks$', 'ig').test(window.location.href)) {
        waitForKeyElements("div.alert-danger", (element) => {
            addDelayorClose(element)
        });
        "true" == localStorage.getItem("close") && (window.close());
        if (GM_getValue('OnPhone', false)) {
            window.close();
        }
    } else if (new RegExp(autoFCB, 'ig').test(window.location.host)) {
        var error = document.querySelector("#cf-error-details")
        var time = 60 * 1000
        if (error && /Error 5../ig.test(error.innerText)) {
            document.title = 'R-' + document.title
            window.setTimeout(window.location.reload(false), time)
        }
    } else {
        favicon(grey_icon)
        let link = window.location.href
        if (GM_getValue('updateAcceptDomain', true) == true) {
            updateAcceptDomain();
            GM_setValue('updateAcceptDomain', false);
            setTimeout(() => {
                window.location.reload()
            }, 3000)
        } else if (GM_getValue('updateAcceptDomain') == false) {
            getDomainOrPathNameAndUpdate(link, 'unsupported url');
            GM_setValue('updateAcceptDomain', true)
        }
    }
})();
