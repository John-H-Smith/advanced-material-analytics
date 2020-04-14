'use strict';

var ready = ( callback ) => { 
    if ( document.readyState != "loading" ) 
        callback(); 
    else 
        document.addEventListener( "DOMContentLoaded", callback );
} 
g.e = function( selektor ){ return document.querySelector( selektor ); };
g.eAll  = function( selektor ){ return document.querySelectorAll( selektor ); };