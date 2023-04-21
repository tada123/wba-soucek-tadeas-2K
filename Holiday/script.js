//
const navlinks = {
    "Dovolená": "index.html",
    "Praktické informace": "information.html",
    "Kontakt": "contact.html"
}        
//
const imgs = {
    "Aktuálně COVID-19": "covid.png", 
    "Průběh dovolené": "plane.png", 
    "Slevový systém": "discount.png",
    "Smlouva o zájezdu": "contract.png",
    "Cestovní pojištění": "contract.png",
    "Obchodní podmínky": "contract.png",    
    
};
//
const pageinits = {
    "index.html": function(){
//        let pt = document.getElementById('placetiles');
//        for()
    }, 
    "information.html": function(){
        let infd = document.getElementById("infodiv");
        for(k in imgs){
            let d = infd.appendChild(document.createElement('div'));
            d.className = "infosub";
            
            let img = d.appendChild(document.createElement('img'));
            img.src = `images/${imgs[k]}`;
            img.className = "infosub_img";
            
            let span = d.appendChild(document.createElement('span'));
            span.textContent = k;
            span.style.color = "#000000ff";
            span.className = "infosub_span";
        }
    }, 
};
//
function makeNavbar(){
    let logo = document.createElement('img');
    logo.src = "images/anchor.png";
    logo.id = "logoimg";
    logo.style.cursor = "pointer";
    logo.addEventListener('click', function(){
        window.location.href = "ubdex.html";
    });
    
    navbar.appendChild(logo);
    
    let d = document.createElement('div');
    d.className = "navlinkcnt";
    navbar.appendChild(d);
    
    let nav = document.getElementById('navbar');
    for(let nl in navlinks){
        let lnk = document.createElement('a');
        lnk.textContent = nl;
        lnk.href = navlinks[nl];
        lnk.className = "navlink";
        d.appendChild(lnk);
    }
    let btn = document.createElement('img');
    btn.src = "images/lines.png";
    btn.className = "mobilebtn";
    nav.appendChild(btn);
}


window.addEventListener('load', function(){    
    let f;
    if((f = pageinits[window.location.href.split("/").pop()]) !== undefined){
        f();
    }
    makeNavbar();
    
});

class PlaceView extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        if(this.img){
            return; //Already created
        }
        this.style.position = "relative";
        this.style.height = "60vh";
        this.style.width = "33%";
        this.style.color = "#000000ff";
        
        this.img = this.appendChild(document.createElement('img'));
        this.img.className = "placeimg";
        this.img.src = this.getAttribute("photo");
        
        this.hd = this.appendChild(document.createElement('p'));
        this.hd.className = "holidayhp";
        this.hd.style.fontSize = "18px";
        this.hd.textContent = this.getAttribute("header");
        this.hd.position = "relative";
        this.hd.style.left = "50%";
        this.hd.style.transform = "translateX(-50%)";
        
        this.p = this.appendChild(document.createElement('p'));
        this.p.style.marginLeft = "5px";
        this.p.style.marginRight = "5px";
        this.p.style.fontSize = "14px";
        this.p.textContent = this.getAttribute("text");
        this.p.style.opacity = 0.7;
        Array.from(this.children).forEach(e => {
            e.style.position = "relative";
            e.style.display = "inline-block";
        });
        
    }
}
//
customElements.define("place-view", PlaceView);
//
//
//
//
//
