ready ( main );

function main() {

    g.temp = g.e( '#matinfo' ).innerHTML;
    g.e( '#matinfo' ).innerHTML = 'Bitte Material auswählen!';

    loadMaterials();

    g.e( '#material-dropdown' ).addEventListener( 
        'change', 
        () => {
            g.e( '#matinfo' ).innerHTML = g.temp;
            loadMaterial( g.e( '#material-dropdown' ).value )
        }
    );
}

function loadMaterials() {
    g.get(
        'https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_MAT_INFO_SRV/mat_infos/?$format=json'
    ).then( data => {
        //data.json().then( d => {
            g.e( '#material-dropdown' ).innerHTML = '<option value="null">-- Bitte auswählen --</option>';
            data.d.results.forEach( dat => {
                g.e( '#material-dropdown' ).innerHTML += '<option value="' + dat.id + '">' + dat.id + ' - ' + dat.name + '</option>';
            });
        //});
        
    });
}

function loadMaterial( id ) {
    if( id == "null" ) {
        g.e( '#matinfo' ).innerHTML = 'Bitte Material auswählen!';
        return;
    }

    g.get( 
        'https://ux5.edvschulen-plattling.de/sap/opu/odata/sap/ZMITO_MAT_INFO_SRV/material_complete_set(' + id + ')?$expand=HeadToItemNav&$format=json' 
    ).then( data => {

        let mat = data.d;
        console.log( typeof mat );

        g.e( '#id' ).innerHTML = mat.ID;
        g.e( '#shortcode' ).innerHTML = mat.KUERZEL;
        g.e( '#article' ).innerHTML = mat.NAME;
        g.e( '#unitprice' ).innerHTML = mat.EINHEITSPREIS;
        g.e( '#currency' ).innerHTML = mat.WAEHRUNG;
        g.e( '#unit' ).innerHTML = mat.EINHEIT;
        g.e( '#weight' ).innerHTML = mat.GEWICHT;
        g.e( '#weightunit' ).innerHTML = mat.GEWICHTSEINHEIT;
        g.e( '#validfrom' ).innerHTML = mat.GUELTIGVON;
        g.e( '#validuntil' ).innerHTML = mat.GUELTIGBIS;

    });
}