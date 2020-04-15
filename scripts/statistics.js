"use strict";
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
    //getData(g.urlabc, "abc");
    getData(g.urlvalatm, "val");
    getData(g.urlactiv, "activ");
    //showData(g.contabc);
    //showData(g.contactiv);
    //showData(g.contvalatm);
    
}

function getData(url, name) {
    //g.headers.append('Authorization', 'Basic ' + btoa(g.u + ':' + g.p));
    //g.headers.append('X-CSRF-Token', 'FETCH');
    g.get(url).then(d=>{
        if(name == "val"){
        g.valatm = d.d.results;
        showDataValAtm(g.contvalatm);
    }
        if(name == "activ"){
            g.activ = d.d.results;
            console.log(g.activ);
            showDataActive(g.contactiv);
        }
        if(name == "abc"){
            g.abc = d.d;
            console.log(g.abc);
        }
    });
}

function showDataActive(){
    let act = [];
    let inact = [];
    let day;
    let month;
    let year;
    let dat;
    //{ x: new Date(2017,6,24), y: 31 },
    g.activ.forEach(e => {
        day = e['DATUM'].split(".")[0];
        month = e['DATUM'].split(".")[1];
        year = e['DATUM'].split(".")[2];
        dat = new Date(year,month,day);
        act.push({x: dat, y: parseInt(e['ACTIVE'])});
        inact.push({x: dat, y: parseInt(e['INACTIV'])});
    });
    console.log(act);
    var chart = new CanvasJS.Chart(g.contactiv, {
        animationEnabled: true,
        title:{
            text: "Aktive Materialien über Zeit"
        },
        axisX: {
            valueFormatString: "DD MM YY"
        },
        axisY: {
            title: "Temperature (in °C)",
            includeZero: false,
            //suffix: " °C"
        },
        legend:{
            cursor: "pointer",
            fontSize: 16,
            itemclick: "toggleDataSeries"
        },
        toolTip:{
            shared: true
        },
        data: [{
            name: "Aktives Material",
            type: "spline",
            //yValueFormatString: "#0.## °C",
            showInLegend: true,
            dataPoints: act
        },
        {
            name: "Inaktives Material",
            type: "spline",
            //yValueFormatString: "#0.## °C",
            showInLegend: true,
            dataPoints: inact
        }]
    });
    chart.render();
    console.log("ok");
}

function showDataValAtm(){
    let ar = [];
    g.valatm.forEach(e => {
        ar.push({y: e['VALUE'], label: e['STORAGE']});
    });
    var chart = new CanvasJS.Chart(g.contvalatm, {
        theme: "light1", // "light1", "light2", "dark1", "dark2"
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Aktueller Warenwert in Lagerorten"
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}%",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label} - {y}%",
            dataPoints: ar,
        }]
    });
 

    chart.render();
}

