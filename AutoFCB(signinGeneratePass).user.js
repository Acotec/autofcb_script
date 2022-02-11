(function() {
    let form = Array.from(document.querySelectorAll(".form-control"))
    let ps="",
        d=[];
    function capitalizeFirstLetter(string){return string[0].toUpperCase() + string.slice(1);};
    function generatepass(df_ps){
        let ps=df_ps
        let autofcb ="autofcb"
        let ps_num =ps.length
        if(ps_num>=8){
            ps=capitalizeFirstLetter(ps+ps_num)
        }
        else if(ps_num<8){
            let getfromautofcb = 8-ps_num
            ps =capitalizeFirstLetter(ps+autofcb.slice(0,getfromautofcb)+getfromautofcb)
        }
        return ps
    }
    function pass(un){
        form.filter(a =>{if(a.type==atob('cGFzc3dvcmQ=')){d.push(a)}})
        if(/autofaucet/ig.test(window.location.href)){
            ps = generatepass(un)
            console.log(ps)
            d.forEach(p =>{
                p.value=ps
            })
        }
        else if(/autoclaim/ig.test(window.location.href)){
            ps = generatepass(un)
            console.log(ps)
            d.forEach(p =>{
                p.value=ps
            })
        }
        else if(/autobitco/ig.test(window.location.href)){
            ps = generatepass(un)
            console.log(ps)
            d.forEach(p =>{
                p.value=ps
            })
        }}
    form.filter(u=>{if(u.name=='username'){u.addEventListener('focusout', (event) => {
        pass(u.value)
    });}})   
})();
