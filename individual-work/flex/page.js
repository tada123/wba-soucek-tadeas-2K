
window.addEventListener('load', function(){
    let ic = document.getElementById("itemcnt");
    let cnt = 10;
    while(cnt--){
        ic.appendChild(document.createElement("div")).classList.add("flexbox");
    }
});
