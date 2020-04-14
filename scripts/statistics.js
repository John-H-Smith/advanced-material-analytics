"use strict";
g.u = "develop38";
g.p = "develop38";
g.abc;
g.activ;
g.valatm;
g.urlabc2 = "https://ux5.edvschulen-plattling.de/sap/bc/bsp/sap/z030_pm_beisp/lehrer.json?sap-client=101";
g.urlabc = "http://i82lp1.informatik.tu-muenchen.de:8000/sap/opu/odata/sap/ZMITO_STATISTICS_SRV/ABC_ANLAYSISSET(1).json?sap-client=301";
g.urlactiv;
g.valatm;

ready(main);


function main() {
    getDatenAbc();
    window.onload = function () {

        var chart = new CanvasJS.Chart("abc-analysis", {
            animationEnabled: true,
            theme: "light2", // "light1", "light2", "dark1", "dark2"
            title:{
                text: "Top Oil Reserves"
            },
            axisY: {
                title: "Reserves(MMbbl)"
            },
            data: [{        
                type: "column",  
                showInLegend: true, 
                legendMarkerColor: "grey",
                legendText: "MMbbl = one million barrels",
                dataPoints: [      
                    { y: 300878, label: "Venezuela" },
                    { y: 266455,  label: "Saudi" },
                    { y: 169709,  label: "Canada" },
                    { y: 158400,  label: "Iran" },
                    { y: 142503,  label: "Iraq" },
                    { y: 101500, label: "Kuwait" },
                    { y: 97800,  label: "UAE" },
                    { y: 80000,  label: "Russia" }
                ]
            }]
        });
        chart.render();
        
        }

}

function readData() {
    $.ajax({url: x.url + "/?$format=json",
        headers: {"Authorization": "Basic " + btoa(x.u + ':' + x.p), 'X-CSRF-Token': 'FETCH'}
    }).then((d, s, xhr) => saveTeachers(d, s, xhr), ajaxMistake).catch(mistake);
}

function getDatenAbc() {
    g.get(g.urlabc).then(d=>{
        console.log(d);
        g.abc = d.d.results;

    });
}



