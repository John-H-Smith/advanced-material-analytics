g.url = "https://i82lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZMITO_DASHBOARD_SRV/";
g.countArticel = "CountArticleSet(1)";
g.countActiveArticel = "CountActiveArticleSet(1)";
g.countTypeArticle = "CountTypeArticelSet";
g.countMaterialMovement = "MaterialMovementSet(1)";
g.mostUsedTransportType = "MostUsedTransportTypeSet";
g.mand = "?sap-client=101";
g.count = int(0);
g.id = [];
g.u = "";
g.p = "";

g.log = e => console.log(e);
g.get = function(url) { //answer is json => d.json() returns the answer
    return fetch(url).then(d => d.json(), e => g.log(e)).catch(e => g.log(e));
}
g.e = function(element) { return document.querySelector(element); };

// document.ready without jquery
let ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}
ready(main);

function main() {
    readIds();
    read(g.url + g.countArticel);
    read(g.url + g.countActiveArticel);
    read(g.url + g.countTypeArticle);
    read(g.url + g.countMaterialMovement);
    read(g.url + g.mostUsedTransportType);
}

function readIds() {
    g.e("#klasse").each(e => {
        g.id.add(g.e("#" + e).attr('id'));
    });
}

function read(url) {
    $.ajax({
        url: g.url + g.mand + "/?$format=json",
        headers: { "Authorization": "Basic " + btoa(g.u + ':' + g.p), 'X-CSRF-Token': 'FETCH' }
    }).then(showData(d), ajaxMistake).catch(mistake);
}

function showData(d) {
    let tile = g.e("#" + g.id[g.count]);
    tile.innerHTML = d.d.results;
    g.count += 1;
}

function ajaxMistake() {
    alert("Ajax Fehler")
}

function mistake() {
    alert("Anderer Fehler");
}