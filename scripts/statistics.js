"use strict";
g.u = "develop38";
g.u = "develop38";
g.abc;
g.activ;
g.valatm;
g.urlabc = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/ABC_ANLAYSISSET(1)" + "/?$format=json";
g.urlactiv;
g.urlvalatm = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/STORAGE_TIME_WORTHSET";
g.contabc = "abc-analysis";
g.contactiv = "active-materials";
g.contvalatm = "matart-count";

ready(main);


function main() {
    getDaten(g.urlabc);
    getDaten(g.urlvalatm);
    getDaten(g.urlactiv);
    showDaten(g.contabc);
    showDaten(g.contactiv);
    showDaten(g.contvalatm);
}


function readData() {
    $.ajax({url: x.url + "/?$format=json",
        headers: {"Authorization": "Basic " + btoa(x.u + ':' + x.p), 'X-CSRF-Token': 'FETCH'}
    }).then((d, s, xhr) => saveTeachers(d, s, xhr), ajaxMistake).catch(mistake);
}

function getDaten(url) {
    //g.headers = {"Authorization": "Basic " + btoa(g.u + ':' + g.p), 'X-CSRF-Token': 'FETCH'};
    g.headers.append('Authorization', 'Basic ' + btoa(g.u + ':' + g.p));
    g.headers.append('X-CSRF-Token', 'FETCH');
    g.get(url).then(d=>{
        console.log(d);
        g.abc = d.d;
    });
}

function showDaten(container){
    
}

