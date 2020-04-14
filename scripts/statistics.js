"use strict";
g.u = "develop39";
g.u = "test1234";
g.abc;
g.activ;
g.valatm;
g.urlabc = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/ABC_ANLAYSISSET(1)" + "/?$format=json";
g.urlactiv = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/Activ_Inactiv_material_over_time" + "/?$format=json";
g.urlvalatm = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/STORAGE_TIME_WORTHSET" + "/?$format=json";
g.contabc = "abc-analysis";
g.contactiv = "active-materials";
g.contvalatm = "matart-count";

ready(main);




function main() {
    getAbc(g.urlabc);
    getData(g.urlvalatm, g.valatm);
    getData(g.urlactiv, g.activ);
    showData(g.contabc);
    //showData(g.contactiv);
    //showData(g.contvalatm);
    
}


function readData() {
    $.ajax({url: x.url + "/?$format=json",
        headers: {"Authorization": "Basic " + btoa(x.u + ':' + x.p), 'X-CSRF-Token': 'FETCH'}
    }).then((d, s, xhr) => saveTeachers(d, s, xhr), ajaxMistake).catch(mistake);
}

function getData(url, save) {
    //g.headers = {"Authorization": "Basic " + btoa(g.u + ':' + g.p), 'X-CSRF-Token': 'FETCH'};
    g.headers.append('Authorization', 'Basic ' + btoa(g.u + ':' + g.p));
    g.headers.append('X-CSRF-Token', 'FETCH');
    g.get(url).then(d=>{
        console.log(d);
        save = d.d.results;
    });
}

function getAbc(url){
    //g.headers.append('Authorization', 'Basic ' + btoa(g.u + ':' + g.p));
    //g.headers.append('X-CSRF-Token', 'FETCH');
    g.get(url).then(d=>{
        console.log(d);
        g.abc = d.d;
        console.log(g.valatm);
    });
}

function showData(container){
    var chart = new CanvasJS.Chart(container, {
        animationEnabled: true,
        
        title:{
            text:"Fortune 500 Companies by Country"
        },
        axisX:{
            interval: 1
        },
        axisY2:{
            interlacedColor: "rgba(1,77,101,.2)",
            gridColor: "rgba(1,77,101,.1)",
            title: "Number of Companies"
        },
        data: [{
            type: "bar",
            name: "companies",
            axisYType: "secondary",
            color: "#014D65",
            dataPoints: [
                { y: 3, label: "Sweden" },
                { y: 7, label: "Taiwan" },
                { y: 5, label: "Russia" },
                { y: 9, label: "Spain" },
                { y: 7, label: "Brazil" },
                { y: 7, label: "India" },
                { y: 9, label: "Italy" },
                { y: 8, label: "Australia" },
                { y: 11, label: "Canada" },
                { y: 15, label: "South Korea" },
                { y: 12, label: "Netherlands" },
                { y: 15, label: "Switzerland" },
                { y: 25, label: "Britain" },
                { y: 28, label: "Germany" },
                { y: 29, label: "France" },
                { y: 52, label: "Japan" },
                { y: 103, label: "China" },
                { y: 134, label: "US" }
            ]
        }]
    });
    chart.render();
}

