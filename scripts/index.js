g.url = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_DASHBOARD_SRV/";
g.countArticel = "CountArticleSet(1)";
g.countActiveArticel = "CountActiveArticleSet(1)";
g.countTypeArticle = "CountTypeArticelSet";
g.countMaterialMovement = "MaterialMovementSet(1)";
g.mostUsedTransportType = "MostUsedTransportTypeSet";
g.count = parseInt(0);
g.format = "/?$format=json"
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
    g.eAll("#material-grid>div").forEach(e => {
        g.id.push(e.id);
    });
}

function read(url) {
    g.headers.append('Authorization', 'Basic ' + btoa(g.u + ':' + g.p));
    g.headers.append('X-CSRF-Token', 'FETCH');
    g.get(url + g.format).then(d => {
        console.log(d);
        showData(d);
        g.abc = d.d;
    });
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