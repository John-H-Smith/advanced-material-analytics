g = {}
g.log = e => console.log(e);

g.headers = new Headers(); //Header Instanz, falls benötigt
g.u = "develop39";
g.u = "test1234";

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
        return fetch(url,
		{method: 'GET',headers: g.headers}
		).then(
			d => d.json(), e => g.log(e)).catch(e => g.log(e));
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
            body: JSON.stringify(data)
        }).then(d => d.json(), e => g.log(e)).catch(e => g.log(e));
    }
    // Ändern
g.put = function(url, id, data) {
    return fetch(url + '(' + id + ')', { // bei odata
        method: 'PUT',
        headers: g.headers,
        body: JSON.stringify(data)
    }).then(d => d.json(), e => g.log(e)).catch(e => g.log(e));
}
