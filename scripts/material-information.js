ready(main);

let newNotitz = true;
let aktID = -1;


function main() {
    /*
        if (screen.width <= 630) {
            g.e('.noticeParts').innerHTML = "<textarea id='notice'></textarea>";
            g.e('#matinfo').innerHTML += '<button id="btn" class="shortcut"><span class="caption fg-white">Speichern</span><span class="mif-floppy-disk icon fg-white"></span></button>';
        } else {
            g.e('.noticeParts').innerHTML = '<textarea id="notice"></textarea><button id="btn" class="shortcut"><span class="caption fg-white">Speichern</span><span class="mif-floppy-disk icon fg-white"></span></button>';
        }
    */
    g.temp = g.e('#matinfo').innerHTML;
    g.e('#matinfo').innerHTML = 'Bitte Material auswählen!';

    loadMaterials();

    g.e('#material-dropdown').addEventListener(
        'change',
        () => {
            g.e('#matinfo').innerHTML = g.temp;
            loadMaterial(g.e('#material-dropdown').value)
        }
    );

}

function loadMaterials() {
    g.get(
        'https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_MAT_INFO_SRV/mat_infos/?$format=json'
    ).then(data => {
        //data.json().then( d => {
        g.e('#material-dropdown').innerHTML = '<option value="null">-- Bitte auswählen --</option>';
        data.d.results.forEach(dat => {
            g.e('#material-dropdown').innerHTML += '<option value="' + dat.id + '">' + dat.id + ' - ' + dat.name + '</option>';
        });
        //});

    });
}

function loadMaterial(id) {
    if (id == "null") {
        g.e('#matinfo').innerHTML = 'Bitte Material auswählen!';
        return;
    }

    g.get(
        'https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_MAT_INFO_SRV/material_complete_set(' + id + ')?$expand=HeadToItemNav&$format=json'
    ).then(data => {
        let mat = data.d;
        g.e('#id0').innerHTML = mat.ID;
        console.log(mat);
        if (mat.HeadToItemNav.results.length > 0) {
            g.e('#notice').innerHTML = mat.HeadToItemNav.results[0].NOTITZ;
            newNotitz = false;
            aktID = mat.HeadToItemNav.results[0].ID;
        } else {
            newNotitz = true;
        }

        g.e('#shortcode').innerHTML = mat.KUERZEL;
        g.e('#article').innerHTML = mat.NAME;
        g.e('#unitprice').innerHTML = mat.EINHEITSPREIS;
        g.e('#currency').innerHTML = mat.WAEHRUNG;
        g.e('#unit').innerHTML = mat.EINHEIT;
        g.e('#weight').innerHTML = mat.GEWICHT;
        g.e('#weightunit').innerHTML = mat.GEWICHTSEINHEIT;
        g.e('#validfrom').innerHTML = mat.GUELTIGVON;
        g.e('#validuntil').innerHTML = mat.GUELTIGBIS;
        g.e("#btn").addEventListener('click', saveNotitz);
        console.log(id);
        g.get(
            "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_MAT_INFO_SRV/material_pic_set(" + "MID=" + parseInt(id) + ",ID=" + parseInt(aktID) + ")?$expand=HeadToItemNav&$format=json"
        ).then(data => {
            console.log(data);
            g.e('#materialimage').src = data.d.PICTURE;
        });
        /*if( g.e( '#materialimage' ).src == "undefined" ) {
            g.e( '#materialimage' ).style.display = 'none';
        } else {
            g.e( '#materialimage' ).style.display = 'block';
        }*/

    });
}

function saveNotitz() {
    let matid = parseInt(getID());
    if (matid) {
        let notiz = g.e("#notice").value;

        //selectPic();
        if (newNotitz) {
            g.post(
                "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_MAT_INFO_SRV/material_note_set", {
                    NOTITZ: notiz,
                    MID: matid
                }
            )
            newNotitz = false;
        } else {

            g.put(
                "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_MAT_INFO_SRV/material_note_set",
                aktID, {
                    NOTITZ: notiz,
                    MID: matid,
                    ID: aktID
                }

            )
        }
    }
}


function getID() {
    let select = g.e("#material-dropdown");
    let name = select.options[select.selectedIndex].value;
    if (name != "Bitte Material auswählen!") {
        let matid = name.split(" ")[0];
        return matid;
    }
}
/*
async function selectPic() {
    let file = g.e('#image').files[0];
    var filesize = ( ( files[ x ].size / 1024 ) / 1024 ).toFixed(4);    //Convert to mibibytes
    if( filesize > 5 ) {
        alert("Bild zu groß! Bitte maximal 5 MiB verwenden.");
        return;
    }
    file = await toBase64(file);
    if (file instanceof Error) {
        console.log('Error: ', file.message);
        return;
    }
    uploadPic(file);
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);

});



function uploadPic(pic) {
    let matid = parseInt(getID());
    if (matid) {
        let obj =  {
            MID: matid,
            ID: 1,
            PICTURE: pic
        };
        console.log(typeof(obj.PICTURE));
        console.log(
            {
                MID: matid,
                ID: 1,
                PICTURE: pic
            }
        );
        g.post(
            "https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_MAT_INFO_SRV/material_pic_set",
            //"MID="+matid+",ID="+1,
            {
                MID: matid,
                ID: 1,
                PICTURE: pic
            }
        )
        g.e('#materialimage').src = pic;
    }
}
*/