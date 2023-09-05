const sidelist = document.querySelector("#sidelist");
const eachHistory = document.querySelector("#eachHistory");
const removeCookies = document.querySelector("#removeCookies");

let setCookie = function(name, value, exp) {
    let date = new Date();
    date.setTime(date.getTime() + exp*60*60*1000);
    document.cookie = name + '=' + value + ';expires=' + date.toUTCString() + ';path=/';
};

let getCookie = function(name){
    let value = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
    return value? value[2] : null;
}

/*let deleteCookie = function(name){
    document.cookie = name + '=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
}*/

let Cookie = [null];

if(getCookie('name')){
    let CookieName = getCookie('name');
    console.log(CookieName);
    Cookie = CookieName.split(',');
    Cookie[Cookie.length] = Storname+'|'+mappic.dataset.num+'|'+menu;

    for(let i=0;i<Cookie.length;i++){
        for(let j=i+1;j<Cookie.length;j++){
            if(Cookie[i]===Cookie[j]){
                Cookie.splice(i, 1);
                break;
            }
        }
    }

} else {Cookie[0] = Storname+'|'+mappic.dataset.num+'|'+menu;};

if((Cookie.length===1)&&(Cookie[0].split('|')[0]===Storname)){
    removeCookies.style.display = "none";
} else {removeCookies.style.display = "";}

setCookie('name', Cookie, 1);

if(Cookie[Cookie.length-1]){
    for(let i=0;i<Cookie.length;i++) {
        let Name = Cookie[i].split('|');
        if((Name[0]!==Storname))
            history_func(i, Cookie)
    }
};

function history_func(i, Cookie) {
    const history = document.createElement('div');
    const history_pic = document.createElement('div');
    const history_right = document.createElement('div');
    const history_name = document.createElement('div');
    const history_menu = document.createElement('div');
    const historyList = document.createElement('div');

    let divide_Cookie = Cookie[i].split('|');

    historyList.className = "eachHistory";
    history.className = "history";

    history_pic.innerHTML = `<img src="./img/fname/${divide_Cookie[1]}.png" id="history_pic">`;
    history_name.innerHTML = `${divide_Cookie[0]}`;
    history_name.style.fontWeight = `bold`;
    history_name.style.marginBottom = `3px`;
    history_menu.innerHTML = `${divide_Cookie[2]}`;

    historyList.appendChild(history);
    history.appendChild(history_pic);
    history.appendChild(history_right);
    history_right.appendChild(history_name);
    history_right.appendChild(history_menu);
    
    history.onclick = function (){toDetail(divide_Cookie[1])};
    history.style.cursor = "pointer";

    history_pic.style.float = "left";
    history_right.style.clear = "both";
    historyList.style.borderTop = "1px solid black";
    historyList.style.borderLeft = "1px solid black";
    historyList.style.borderRight = "1px solid black";

    if(sidelist.lastChild){
        sidelist.lastChild.style.borderBottom = "1px solid black";
    } else if(!sidelist.lastChild){
        historyList.style.borderBottom = "1px solid black";
    }

    historyList.style.width = "13%";
    historyList.style.minWidth = "13%";
    historyList.style.padding = "5px";

    sidelist.prepend(historyList);
};

removeCookies.addEventListener("click",RemoveCookies);
removeCookies.onclick = function (){RemoveCookies};

function toDetail(eno){
    window.location.href = `/detail?eno=${eno}`
}

function RemoveCookies() {
    console.log('RemoveCookies test');
    Cookie2 = Storname+'|'+mappic.dataset.num+'|'+menu;
    setCookie('name', Cookie2, 1);
    sidelist.remove(eachHistory);
    removeCookies.style.display = "none";
};
