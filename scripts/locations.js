g.url = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_LOCATION_SRV/location_entity_set";
g.format = "/?$format=json"
var adress;
g.url2 = "https://nominatim.openstreetmap.org/search?q="
g.format2 = "&format=json";
var maps = [];


ready(main);

function main() {
    read(g.url);

}

function read(url) {
    g.count += parseInt(1);
    g.get(url + g.format).then(d => {
        console.log(d);
        createMap(d);
    });
}


function createMap(d) {
    d.d.results.forEach((ld, i) => {
        g.get(g.url2 + ld.STREET + "-" + ld.HOUSNUMBER + ",+" + ld.CITY + g.format2).then(e => {
            g.e("#main").innerHTML += "<div id=\"div" + i + "\" ><iframe id=\"map" + i + "\" width=\"425\" height=\"350\" frameborder=\"0\" scrolling=\"no\" marginheight=\"0\" marginwidth=\"0\" style=\"border: 1px solid black\"></iframe><br></div>";
            maps.push(g.e("#map" + i));
            maps[i].setAttribute("src", "https://www.openstreetmap.org/export/embed.html?bbox=" + e[0].boundingbox[2] + "%2C+" + e[0].boundingbox[1] + "%2C+" + e[0].boundingbox[2] + "%2C" + e[0].boundingbox[0] + "&amp;layer=mapnik&amp");
            let title = document.createElement("div")
            title.setAttribute("class", "mapTitle");
            title.setAttribute("id", "mapTitle" + i);
            title.innerHTML = ld.NAME + ": " + ld.CITY + " " + ld.STREET + " " + ld.HOUSNUMBER + "<br>";
            g.e("#div" + i).appendChild(title);


        });
    });
}