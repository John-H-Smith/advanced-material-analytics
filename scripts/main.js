g.log = e => console.log(e);
g.get = function(url) { //answer is json => d.json() returns the answer
    return fetch(url).then(d => d.json(), e => g.log(e)).catch(e => g.log(e));
}
g.e = function(element) { return document.querySelector(element); };
g.eAll  = function( selektor ){ return document.querySelectorAll( selektor ); };

// document.ready without jquery
let ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
}