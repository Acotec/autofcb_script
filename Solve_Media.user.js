(function() {
    var cfg = new MonkeyConfig({
        title: 'Configuración',
        menuCommand: true,
        params: {
            Auto_focus: {
                type: 'checkbox',
                default: true
            },
            Auto_solver: {
                type: 'checkbox',
                default: true
            },
            Find_vulnerable_captchas: {
                type: 'checkbox',
                default: false
            }
        }
    });

    let autofocus=cfg.get('Auto_focus');
    let autosolver=cfg.get('Auto_solver');
    let find_vulnerable_captchas=cfg.get('Find_vulnerable_captchas');

    'use strict';
    function update_key() {
        GM_xmlhttpRequest({
            method: 'GET',
            url: "https://gist.githubusercontent.com/Harfho/d4805d8a56793fa59d47e464c6eec243/raw/_phrases.txt",
            revalidate: false,
            nocache: true,
            onload: (r) => {
                let key = r.responseText
                GM_setValue('key',key)
                window.location.reload();
            },
            onerror: (r) => {}
        })
    }if (GM_getValue('key', false) == false) {
        update_key()
    }
    try{
        var key=JSON.parse(GM_getValue("key").split(','))
        }catch(err){}

    function getSimilarWord(word, knownWords, _threshold = 0.15) {
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

    function search_solvemedia() {
        let scripts = document.getElementsByTagName('script');
        let status=false;
        for (var i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute("src")!=null && scripts[i].getAttribute("src").toLowerCase().search('solvemedia.com')>=0) {
                status=true;
                break;
            }
        }
        return status;
    }
    async function set_keys(input,id) {
        let datalist,option;
        datalist=document.createElement('datalist');
        datalist.setAttribute('id',id);
        for (let i = 0; i < key.length; ++i) {
            option=document.createElement('option');
            option.value=key[i];
            datalist.appendChild(option);
        }
        input.parentNode.insertBefore(datalist, input.nextSibling);
        input.setAttribute('list', datalist.id);
    }
    function check_type_captcha() {
        let status=false;
        if(document.body.querySelectorAll('iframe[src^="//api-secure.solvemedia.com"]').length>0) {
            status=true;
            console.log('The captcha SolveMedia can be solved.');
        }else{
            GM_deleteValue("SolvedMediaPlus");
            console.log('The captcha SolveMedia cannot be resolved.');
        }
        return status;
    }
    if (window.top != window.self){//Exec in iframe
        if(autosolver){
            if(document.URL.search("api-secure.solvemedia.com")>0){
                let solver1=document.body.querySelectorAll('canvas#slog');
                if(solver1.length>0){
                    setTimeout(function(){
                        let base64img=solver1[0].toDataURL();
                        Tesseract.recognize(base64img,'eng',{logger: m => console.log(m)}).then(({data: { text }}) => {
                            const to_delete=['/','(',')','@','“','"','%','.',';','!','¡',','];
                            for (let i = 0; i < to_delete.length; i++) {
                                text=text.replace(to_delete[i],'');
                            }
                            text=text.replace('—','-');
                            text=text.replace('_','-');
                            text=text.replace('’',"'");
                            text=text.replace(/\n/g,' ').trim();
                            console.log('Captcha generated solution before: '+text);
                            text = getSimilarWord(text,key)
                            console.log('Captcha generated solution after: '+text);
                            GM_setValue("SolvedMediaPlus",text+'||solvedmedia_1_solution||');
                        });
                    }, 1000);
                }
                let solver2=document.body.querySelectorAll('span#slog');
                if(solver2.length>0){
                    setTimeout(function(){
                        let text=solver2[0].innerText;
                        console.log('Captcha generated solution before: '+text);
                        text = getSimilarWord(text,key)
                        console.log('Captcha solution after: '+text);
                        GM_setValue("SolvedMediaPlus",text+'||solvedmedia_2_solution||');
                    }, 1000);
                }
            }
        }
    }
    else{
        window.onload = function() {
            if(search_solvemedia()){
                let input=document.body.querySelectorAll('input[type=text][id*=adcopy_response]');
                if(input.length>0){
                    for (let i = 0; i < input.length; ++i) {
                        if(i==0){
                            if(autosolver){
                                var tempint=setInterval(function(){
                                    if(check_type_captcha()){
                                        let inputfix=document.body.querySelector('input[type=text][id*=adcopy_response]');
                                        if(typeof GM_getValue("SolvedMediaPlus") !== 'undefined'){
                                            let solved=GM_getValue("SolvedMediaPlus").toLowerCase();
                                            inputfix.setAttribute('placeholder','Solved Media Plus');
                                            if(solved.indexOf('||solvedmedia_1_solution||')>0){
                                                solved=solved.replace('||solvedmedia_1_solution||', '');
                                                let solved_array=solved.split(' '),greatest_success=1,one_result=0,one_exec=true;
                                                if (solved.length>2){
                                                    for (let i = 0; i < key.length; ++i) {
                                                        if(key[i].indexOf(solved)>=0){
                                                            inputfix.value = solved;
                                                            console.log('Captcha solved');
                                                            break;
                                                        }else{
                                                            let words=key[i].split(' '),success=0;
                                                            for (let e = 0; e < words.length; ++e) {
                                                                for (let a = 0; a < solved_array.length; ++a) {
                                                                    if (solved_array[a].length>2){
                                                                        if(words[e].indexOf(solved_array[a])>=0){
                                                                            success++;
                                                                            if(success==1){one_result++;}
                                                                            if(one_result==1){
                                                                                inputfix.value = key[i];
                                                                            }else{
                                                                                if(one_exec){inputfix.value = '';one_exec=false;}
                                                                                if(success>greatest_success){
                                                                                    greatest_success=success;
                                                                                    inputfix.value = key[i];
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            if(solved.indexOf('||solvedmedia_2_solution||')>0){
                                                solved=solved.replace('||solvedmedia_2_solution||', '');
                                                inputfix.value = solved;
                                            }
                                            GM_deleteValue("SolvedMediaPlus");
                                            clearInterval(tempint);
                                        }else{
                                            inputfix.setAttribute('placeholder','Trying to solve...');
                                        }
                                    }else{
                                        clearInterval(tempint);
                                        if(find_vulnerable_captchas){
                                            setTimeout(function(){location.reload(true);}, 1000);
                                        }
                                    }
                                }, 1000);
                            }
                            if(autofocus){
                                input[i].focus();
                            }
                        }
                        input[i].setAttribute('placeholder','Solved Media Plus');
                        input[i].setAttribute('list','Solved_Media_Key_'+i);
                        set_keys(input[i],input[i].getAttribute('list'));
                    }
                }else{
                    document.body.addEventListener('keydown', function handler(event) {
                        if (/^adcopy_response/.test(event.target.id)) {
                            this.removeEventListener(event.type, handler);
                            let input = event.target;
                            input.placeholder='Solved Media Plus';
                            set_keys(input,'Solved_Media_Key_1');
                        }
                    });
                }
            }
        }
    }
})();
