var repeatingSpamFunction = null;
var message = '';

function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

document.onclick = function(){
    createSpamButton();
};
//Arul ga bertanggung jawab jika WA lu ke blokir
function createSpamButton () {
    if(document.getElementById('spamButton') != null)
        return;
    var composeBar = getElementByXpath("//*[@id=\"main\"]/footer/div[1]");
    if(composeBar == null)
        return;
    composeBar.oninput = function(){
        editSpamButton();
    };

    var spamButton = document.createElement('button');
    spamButton.setAttribute("id", "spamButton");
    spamButton.innerHTML = 'START SPAM';
    spamButton.style.fontSize = '100%';
    spamButton.style.padding = '0px 0px 10px 10px';
    composeBar.append(spamButton);
    editSpamButton();
}
//Arul ga bertanggung jawab jika WA lu ke blokir
function sendMessage () {
    var evt = new Event('input', {
        bubbles: true
    });

    var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[2]/div/div[2]");
    input.innerHTML = message;
    input.dispatchEvent(evt);

    getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[3]/button").click();
}
//Arul ga bertanggung jawab jika WA lu ke blokir
function doSpam(element) {
    if(element.innerHTML == 'START SPAM'){
        var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[2]/div/div[2]");
        if(input.innerHTML == '' || input.innerHTML == null){
        window.alert('Ketik dulu baru pencet start.');
        return;
        }
        element.innerHTML = 'STOP SPAM';
        message = input.innerHTML;
        var interval = parseInt (prompt('Selang berapa milidetik buat ngirim:', '1 detik = 1000 milidetik'));
        repeatingSpamFunction = window.setInterval(function(){
            sendMessage();
        }, interval);
    } else {
        element.innerHTML = 'START SPAM';
        window.clearInterval(repeatingSpamFunction);
    }
    editSpamButton();
}
//Arul ga bertanggung jawab jika WA lu ke blokir
function editSpamButton(){
    var spamButton = document.getElementById('spamButton');
    var input = getElementByXpath("//*[@id=\"main\"]/footer/div[1]/div[2]/div/div[2]");
    if(input.innerHTML == '' || input.innerHTML == null){
        spamButton.style.cursor = 'not-allowed';
        spamButton.style.color = '#D3D3D3';
        spamButton.onclick = null;
    } else {
        spamButton.style.cursor = 'pointer';
        spamButton.style.color = '#039be5';
        spamButton.onclick = function(){
            doSpam(this);
        };
    }
}
//Arul ga bertanggung jawab jika WA lu ke blokir