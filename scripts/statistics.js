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
    getData(g.urlabc, "abc");
    getData(g.urlvalatm, "val");
    getData(g.urlactiv, "activ");
    //showData(g.contabc);
    //showData(g.contactiv);
    //showData(g.contvalatm);

}

function getData(url, name) {
    //g.headers.append('Authorization', 'Basic ' + btoa(g.u + ':' + g.p));
    //g.headers.append('X-CSRF-Token', 'FETCH');
    g.get(url).then(d => {
        if (name == "val") {
            g.valatm = d.d.results;
            showDataValAtm(g.contvalatm);
        }
        if (name == "activ") {
            g.activ = d.d.results;
            console.log(g.activ);
            showDataActive(g.contactiv);
        }
        if (name == "abc") {
            g.abc = d.d;
            console.log(g.abc);
            showAbcChart();
        }
    });
}

function showDataActive() {
    let act = [];
    let inact = [];
    let day;
    let month;
    let year;
    let dat;
    //{ x: new Date(2017,6,24), y: 31 },
    g.activ.forEach(e => {
        day = e['DATUM'].slice(6, 8);
        month = e['DATUM'].slice(4, 6);
        year = e['DATUM'].slice(0, 4);
        dat = new Date(year, month, day);
        act.push({ x: dat, y: parseInt(e['ACTIVE']) });
        inact.push({ x: dat, y: parseInt(e['INACTIV']) });
    });
    var chart = new CanvasJS.Chart(g.contactiv, {
        animationEnabled: true,
        title: {
            text: "Aktive/Inaktive Materialien über Zeit"
        },
        axisX: {
            valueFormatString: "DD MM YYYY"
        },
        axisY: {
            title: "Anzahl in Stück",
            includeZero: false,
            //suffix: " °C"
        },
        legend: {
            cursor: "pointer",
            fontSize: 16,
            itemclick: "toggleDataSeries"
        },
        toolTip: {
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
            }
        ]
    });
    chart.render();
}

function showDataValAtm() {
    let ar = [];
    g.valatm.forEach(e => {
        ar.push({ y: e['VALUE'], label: e['STORAGE'] });
    });
    var chart = new CanvasJS.Chart(g.contvalatm, {
        theme: "light1",
        exportEnabled: true,
        animationEnabled: true,
        title: {
            text: "Aktueller Warenwert in Lagerorten"
        },
        data: [{
            type: "pie",
            startAngle: 25,
            toolTipContent: "<b>{label}</b>: {y}",
            showInLegend: "true",
            legendText: "{label}",
            indexLabelFontSize: 16,
            indexLabel: "{label}: {y} €",
            dataPoints: ar,
        }]
    });


    chart.render();
}


function showAbcChart() {

    var chart = new CanvasJS.Chart("abc-analysis", {
        title: {
            text: "ABC-Analyse"
        },
        axisY: {
            title: "Wert",
            suffix: "€",
            lineColor: "#4F81BC",
            tickColor: "#4F81BC",
            labelFontColor: "#4F81BC"
        },
        axisY2: {
            title: "Prozent",
            suffix: "%",
            lineColor: "#C0504E",
            tickColor: "#C0504E",
            labelFontColor: "#C0504E"
        },
        axisX: {
            title: "Artikel"
        },
        data: [{
            type: "column",
            dataPoints: [
                { label: "A " + g.abc.COUNT_A, y: g.abc.VALUE_A },
                { label: "B " + g.abc.COUNT_B, y: g.abc.VALUE_B },
                { label: "C " + g.abc.COUNT_C, y: g.abc.VALUE_C }
            ]
        }]
    });
    chart.render();
    createPareto(chart);
}

function createPareto(chart) {
    var dps = [];
    var yValue, yTotal = 0,
        yPercent = 0;

    for (var i = 0; i < chart.data[0].dataPoints.length; i++)
        yTotal += chart.data[0].dataPoints[i].y;

    for (var i = 0; i < chart.data[0].dataPoints.length; i++) {
        yValue = chart.data[0].dataPoints[i].y;
        yPercent += (yValue / yTotal * 100);
        dps.push({ label: chart.data[0].dataPoints[i].label, y: yPercent });
    }

    chart.addTo("data", { type: "line", yValueFormatString: "0.##\"%\"", dataPoints: dps });
    chart.data[1].set("axisYType", "secondary", false);
    chart.axisY[0].set("maximum", yTotal);
    chart.axisY2[0].set("maximum", 100);
}