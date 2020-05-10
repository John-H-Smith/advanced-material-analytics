g.url = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_LOCATION_SRV/location_entity_set";
g.format = "/?$format=json"

ready(main);

function main() {
    read(g.url);

}

function read(url) {
    g.count += parseInt(1);
    g.get(url + g.format).then(d => {
        console.log(d);
        showData(d);
    });
}

function showData(d) {
    d.d.results.forEach((e, i) => {
        if (i == 0) {
            g.e("#_mapTitle").innerHTML += e.NAME + ": " + e.CITY + " " + e.STREET + " " + e.HOUSNUMBER + " " + e.ZIP + "<br>";
        }
    });
}