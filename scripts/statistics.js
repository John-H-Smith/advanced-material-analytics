"use strict";
g.abc;
g.activ;
g.valatm;
g.urlabc = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/ABC_ANLAYSISSET(1)" + "/?$format=json";
g.urlactiv = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/Activ_Inactiv_material_over_time" + "/?$format=json";
g.urlvalatm = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/STORAGE_TIME_WORTHSET" + "/?$format=json";



g.chartColors = {
    red: 'rgb(255, 99, 132)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(75, 192, 192)',
    blue: 'rgb(54, 162, 235)',
};

ready(main);

function main() {
    getData(g.urlabc, "abc");
    getData(g.urlvalatm, "val");
    getData(g.urlactiv, "activ");
}

function getData(url, name) {

    g.get(url).then(d => {
        if (name == "abc") {
            g.abc = d.d;
            console.log(g.abc);
            createAbcChart();
        }
        if (name == "activ") {
            g.activ = d.d.results;
            console.log(g.activ);
            createDataActive(g.contactiv);
        }
        if (name == "val") {
            g.valatm = d.d.results;
            createDataValAtm(g.contvalatm);
        }

    });
}

function createDataValAtm() {
    let ar = [];
    g.valatm.forEach(e => {
        ar.push({ y: e['VALUE'], label: e['STORAGE'] });
    });

    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data: [
                    ar[1].y,
                    ar[0].y
                ],
                backgroundColor: [
                    g.chartColors.orange,
                    g.chartColors.yellow,

                ],
                label: 'Dataset 1'
            }],
            labels: [
                ar[1].label,
                ar[0].label
            ]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Materialwert je Lagerort'
            },
        }
    };

    var ctx = document.getElementById('storage-values').getContext('2d');
    var pieChart = new Chart(ctx, config);
}


function createAbcChart() {
    var chartData = {
        labels: ["A " + g.abc.COUNT_A, "B " + g.abc.COUNT_B, "C " + g.abc.COUNT_C],
        datasets: [{
            type: 'line',
            label: 'Summiert',
            borderColor: g.chartColors.blue,
            borderWidth: 2,
            fill: false,
            data: [
                g.abc.VALUE_A,
                (g.abc.VALUE_A + g.abc.VALUE_B),
                (g.abc.VALUE_A + g.abc.VALUE_B + g.abc.VALUE_C)
            ]
        }, {
            type: 'bar',
            label: '',
            backgroundColor: g.chartColors.orange,
            data: [
                g.abc.VALUE_A,
                g.abc.VALUE_B,
                g.abc.VALUE_C

            ],
            borderColor: 'white',
            borderWidth: 2
        }]

    };
    loadAbcChart(chartData);
}

function loadAbcChart(chartData) {
    var ctx = document.getElementById('abc-analysis').getContext('2d');

    var abcChart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'ABC-Analyse'
            },
            tooltips: {
                mode: 'index',
                intersect: true
            }
        }

    });
}

function createDataActive() {
    let act = [];
    let actDat = [];
    let inact = [];
    let inactDat = [];
    let day;
    let month;
    let year;
    let dat;

    g.activ.forEach(e => {
        day = e['DATUM'].slice(6, 8);
        month = e['DATUM'].slice(4, 6);
        year = e['DATUM'].slice(0, 4);
        dat = new Date(year, month, day);
        act.push(parseInt(e['ACTIVE']));
        actDat.push(month + "/" + year);
        inact.push(parseInt(e['INACTIV']));

    });

    var config = {
        type: 'line',
        data: {
            labels: actDat,
            datasets: [{
                label: 'Aktive Materialien',
                backgroundColor: g.chartColors.red,
                borderColor: g.chartColors.red,
                data: act,
                fill: false,
            }, {
                label: 'Inaktive Materialien',
                fill: false,
                backgroundColor: g.chartColors.blue,
                borderColor: g.chartColors.blue,
                data: inact
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Aktive/Inaktive Materialien über Zeit'
            },
            tooltips: {
                mode: 'index',
                intersect: false,
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Value'
                    }
                }]
            }
        }
    };


    var ctx = document.getElementById('active-materials').getContext('2d');
    window.myLine = new Chart(ctx, config);
}