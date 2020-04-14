g.url = "https://i82lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZMITO_DASHBOARD_SRV/";
g.countArticel = "CountArticleSet(1)";
g.countActiveArticel = "CountActiveArticleSet(1)";
g.countTypeArticle = "CountTypeArticelSet";
g.countMaterialMovement = "MaterialMovementSet(1)";
g.mostUsedTransportType = "MostUsedTransportTypeSet";
g.mand = "?sap-client=101";
g.count = parseInt(0);
g.id = [];
g.u = "";
g.p = "";

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
    g.e("#material-grid").forEach(e => {
        g.id.add(g.e("#" + e).attr('id'));
    });
}

function read(url) {
    $.ajax({
        url: url + g.mand + "/?$format=json",
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