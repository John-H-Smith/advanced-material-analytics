'use strict';

var ready = ( callback ) => { 
    if ( document.readyState != "loading" ) 
        callback(); 
    else 
        document.addEventListener( "DOMContentLoaded", callback );
} 
g.e = function( selektor ){ return document.querySelector( selektor ); };
g.eAll  = function( selektor ){ return document.querySelectorAll( selektor ); };

ready( menu );

function menu() {

    let size = 0;
    g.eAll( 'main > div' ).forEach(ele => {
        if(ele.offsetWidth > size)
            if(ele.style.display != "none")
                size = ele.offsetWidth;
    });
    g.e( 'header ul' ).style.maxWidth = size + "px";
}