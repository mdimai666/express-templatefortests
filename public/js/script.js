/// <reference path="jquery.min.js"/>

$(document).ready(function () {

    $('.json').each(function (i, e) {
        $(e).html(beauityJSON(e.innerHTML));
    });

    let btn1 = $('#btn1');
    let info = $('#info');

    let spinner = `<div class="text-center"><i class="fa fa-spin fa-spinner fa-2x"></i></div>`;

    btn1.click(function () {
        info.html(spinner)

        $.get('/users/ext')
            .done(d => {
                console.warn(d)
                let j = beauityJSON(d)
                info.html(j);
            })
            .fail((xhr, status, err) => {
                info.html(status);
            })

    })



});

function beauityJSON(data) {
    if (!data) return '';
    var z;
    if (typeof data === 'string') {
        // json = JSON.stringify(json, undefined, 2);
        if ('[object Object]' === data) return 'is String:: ' + data;
        // throw new Error('beauityJSON: data is damaged');

        data = JSON.parse(data);
    }
    z = syntaxHighlight(data);
    return $('<pre>' + z + '</pre>');
}

function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'key';
            } else {
                cls = 'string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'boolean';
        } else if (/null/.test(match)) {
            cls = 'null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}