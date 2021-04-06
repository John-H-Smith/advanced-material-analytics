g.url = "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_EXCEL_SRV/excel_set";
g.format = "/?$format=json"
g.materials = [];
ready(main);


function main() {
    read(g.url);
    g.e("#createExcel").addEventListener("click", createExcel);
}

function read(url) {
    g.count += parseInt(1);
    g.get(url + g.format).then(d => {
        console.log(d);
        paintTab(d);
    });
}

function createExcel() {
    var wb = XLSX.utils.book_new();
    wb.Props = {
        title: "Excel Export",
        Subject: "",
        Author: "ZMITO-Team",
        CreatedDate: new Date()
    };
    wb.SheetNames.push("Export Sheet");
    let lines = [
        []
    ];

    lines.push(["Id", "Name", "Einheit", "Materialart", "Kürzel", "Gültig von", "Gültig bis", "Gewicht", "Gewichtseinheit", "Einheitspreis", "Währung"]);
    g.materials.forEach(e => {
        lines.push([e.id, e.name, e.einheit, e.materialart, e.kuerzel, e.gueltigvon, e.gueltigbis, e.gewicht, e.gewichtseinheit, e.einheitspreis, e.waehrung]);
    });

    var ws = XLSX.utils.aoa_to_sheet(lines);
    wb.Sheets["Export Sheet"] = ws;

    var wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), "export.xlsx");
}

function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
}


function paintTab(d) {
    g.e("#tab").innerHTML = "";
    g.materials = d.d.results;
    g.materials.forEach(function(e, i) {
        let line = document.createElement("tr");
        line.innerHTML += "<td>" + e.id + "  </td>";
        line.innerHTML += "<td>" + e.name + "  </td>";
        line.innerHTML += "<td>" + e.einheit + "  </td>";
        line.innerHTML += "<td>" + e.materialart + "  </td>";
        line.innerHTML += "<td>" + e.kuerzel + "  </td>";
        line.innerHTML += "<td>" + e.gueltigvon + "  </td>";
        line.innerHTML += "<td>" + e.gueltigbis + "  </td>";
        line.innerHTML += "<td>" + e.gewicht + "  </td>";
        line.innerHTML += "<td>" + e.gewichtseinheit + "  </td>";
        line.innerHTML += "<td>" + e.einheitspreis + "  </td>";
        line.innerHTML += "<td>" + e.waehrung + "  </td>";
        g.e("#tab").appendChild(line);
    });

}