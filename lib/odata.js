g = {}
g.log = e => console.log(e);

g.headers = new Headers(); //Header Instanz, falls benötigt
g.u = "";
g.p = "";

//für json-Daten bei post/put
g.headers.append('Content-Type', 'application/json; charset=UTF-8');
g.headers.append('Authorization', 'Basic ' + btoa(g.u + ':' + g.p));


// Falls Authentication im Header benötigt wird
//g.headers.append('Authorization', 'Basic ' + btoa(""));

// Lesen, Erwarte json-Antwort
/*
g.get = function(url) { //Antwort ist json => d.json() liefert die Antwort
        return fetch(url).then(d => d.json(), e => g.log(e)).catch(e => g.log(e));
    }*/
g.get = function(url) { //Antwort ist json => d.json() liefert die Antwort
    if (g.headers.get("X-CSRF-Token") == null) {
        g.headers.append("X-CSRF-Token", "FETCH");
    }
    return fetch(url, { method: 'GET', headers: g.headers }).then(
        (d, a, b) => { setToken(d); return d.json(); }, e => g.log(e)).catch(e => g.log(e));
}

// Lesen, Erwarte text-Antwort bzw. html
g.getText = function(url) { //Antwort ist Text (html,..)  => d.text() liefert die Antwort
        return fetch(url).then(d => d.text(), e => g.log(e)).catch(e => g.log(e));
    }
    // Löschen
g.delete = function(url, id) {
        return fetch(url + '(' + id + ')', { // bei odata
            method: 'DELETE'
        }).then(d => {
            console.log(d); // zur Kontrolle
            return d.json();
        }, e => g.log(e)).catch(e => g.log(e));
    }
    // Einfügen
g.post = function(url, data) {
        return fetch(url, {
            method: 'POST',
            headers: g.headers,
            body: JSON.stringify(data),
        }).then(d => d.json(), e => g.log(e)).catch(e => g.log(e));
    }
    // Ändern
g.put = function(url, id, data) {
    console.log(g.headers);
    return fetch(url + '(' + id + ')', { // bei odata
        method: 'PUT',
        headers: g.headers,
        body: JSON.stringify(data)
    }).then(d => { console.log(d);
        d.json() }, e => g.log(e)).catch(e => g.log(e));
}

function setToken(data) {
    //console.log(data);
    g.token = data.headers.get("X-CSRF-Token");
    //console.log( g.token );
    if (data.headers.get("X-CSRF-Token") != null) {
        g.headers.set("X-CSRF-Token", g.token);
    }
    console.log(g.headers.get("X-CSRF-Token"));
}

g.put2 = function(url, id, pic, data) {
    console.log(g.headers);
    return fetch(url + '(' + id + ')' + "/$" + pic, { // bei odata
        method: 'PUT',
        headers: g.headers,
        body: JSON.stringify(data)
    }).then(d => { console.log(d);
        d.json() }, e => g.log(e)).catch(e => g.log(e));
}