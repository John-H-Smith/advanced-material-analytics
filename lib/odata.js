g = {}
g.log = e => console.log(e);

g.headers = new Headers();
// User
g.u = "";
// Password
g.p = "";

g.headers.append('Content-Type', 'application/json; charset=UTF-8');
g.headers.append('Authorization', 'Basic ' + btoa(g.u + ':' + g.p));

g.get = function(url) {
    if (g.headers.get("X-CSRF-Token") == null) {
        g.headers.append("X-CSRF-Token", "FETCH");
    }
    return fetch(url, { method: 'GET', headers: g.headers }).then(
        (d, a, b) => { setToken(d); return d.json(); }, e => g.log(e)).catch(e => g.log(e));
}

g.getText = function(url) {
    return fetch(url).then(d => d.text(), e => g.log(e)).catch(e => g.log(e));
}

g.delete = function(url, id) {
    return fetch(url + '(' + id + ')', {
        method: 'DELETE'
    }).then(d => {
        console.log(d);
        return d.json();
    }, e => g.log(e)).catch(e => g.log(e));
}

g.post = function(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: g.headers,
        body: JSON.stringify(data),
    }).then(d => d.json(), e => g.log(e)).catch(e => g.log(e));
}

g.put = function(url, id, data) {
    console.log(g.headers);
    return fetch(url + '(' + id + ')', {
        method: 'PUT',
        headers: g.headers,
        body: JSON.stringify(data)
    }).then(d => {
        console.log(d);
        d.json()
    }, e => g.log(e)).catch(e => g.log(e));
}

function setToken(data) {
    g.token = data.headers.get("X-CSRF-Token");
    if (data.headers.get("X-CSRF-Token") != null) {
        g.headers.set("X-CSRF-Token", g.token);
    }
    console.log(g.headers.get("X-CSRF-Token"));
}

g.put2 = function(url, id, pic, data) {
    console.log(g.headers);
    return fetch(url + '(' + id + ')' + "/$" + pic, {
        method: 'PUT',
        headers: g.headers,
        body: JSON.stringify(data)
    }).then(d => {
        console.log(d);
        d.json()
    }, e => g.log(e)).catch(e => g.log(e));
}