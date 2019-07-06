function getUrlParam(parameter, defaultvalue){
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1){
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
                                             vars[key] = value;
                                             });
    return vars;
}

function setCount() {
    var count = getUrlParam('fire_count', 0)
    alert(count);
    document.getElementById('fire_count').value = count;
}
