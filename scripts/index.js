g.url = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_DASHBOARD_SRV/";
g.countArticel = "CountArticleSet(1)";
g.countActiveArticel = "CountActiveArticleSet(1)";
g.countTypeArticle = "CountTypeArticelSet";
g.countMaterialMovement = "MaterialMovementSet(1)";
g.mostUsedTransportType = "MostUsedTransportTypeSet";
g.count = parseInt(-1);
g.format = "/?$format=json"
g.id = [];

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
    console.log("readIds()");
    g.eAll("#_dashboard>div>div").forEach(e => {
        console.log(e.id);
        g.id.push(e.id);
    });
}

function read(url) {
    g.count += parseInt(1);
    let count = g.count;
    let id = g.id[g.count];
    g.get(url + g.format).then(d => {
        console.log(d);
        showData(d, id, count);
    });
}

function showData(d, id, count) {
    let tile = g.e("#" + id);
    console.log(d);
    if (count < 2) {
        tile.innerHTML += d.d.count;
    } else if (count == 2) {
        d.d.results.forEach(e => {
            tile.innerHTML += e.bezeichnung.substring(0, 1) + e.bezeichnung.substring(1, e.length).toLowerCase() + ": " + e.count + "<br>";
        });
    } else if (count == 3) {
        console.log(d);
        tile.innerHTML += "Bestandsveränderungen gesamt: " + d.d.INLETAVERAGE + "<br>";

    } else if (count == 4) {
        console.log(d);
        d.d.results.forEach(e => {
            tile.innerHTML += "Verwendungen: " + e.TRANSACTION_COUNT + "<br>" +
                e.DESCRIPTION;
        });
    }

}

function ajaxMistake() {
    alert("Ajax Fehler")
}

function mistake() {
    alert("Anderer Fehler");
}