'use strict';

var ready = ( callback ) => { 
    if ( document.readyState != "loading" ) 
        callback(); 
    else 
        document.addEventListener( "DOMContentLoaded", callback );
} 
g.e = function( selektor ){ return document.querySelector( selektor ); };
g.eAll  = function( selektor ){ return document.querySelectorAll( selektor ); };

ready( loadDelay );

function loadDelay() {

    g.eAll( 'header a' ).forEach( link => {
        link.addEventListener( 'click', event => {
            event.preventDefault();
            console.log( event.target );
            g.eAll( 'header li' ).forEach( ele => {
                if( ele.classList.contains( 'active' ))
                    ele.classList.remove( 'active' );
            });
            event.target.parentElement.classList.add( 'active' );
            setTimeout(() => {
                window.location = event.target.href;
            }, 300);
        } );
    }); 
}