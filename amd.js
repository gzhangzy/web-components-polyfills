/*
    https://curiosity-driven.org/minimal-loader?utm_source=echojs
*/
(function(document) {
    var listeners = {}, resolves = {}, config = {}, loaded = {}, anonymous = [];

    function resolve(name, value) {
        if(!name) {
            anonymous.push(value);
            return;
        }
        resolves[name] = value;
        if(listeners[name]) {
            listeners[name].forEach(function(listener) {
                listener(name, value);
            });
            delete listeners[name];
        }
    }

    function onScriptLoad(evt) {
        var node = evt.currentTarget || evt.srcElement;
        if(evt.type==='load' || /^(complete|loaded)$/.test(node.readyState)) {
            node.removeEventListener('load', onScriptLoad, false);
            var name = node.getAttribute('data-requiremodule');
            anonymous.forEach(function(value) {
                resolve(name, value);
            });
            anonymous = [];
        }
    }

    function addLoadListener(name, listener) {
        if(name in resolves) listener(name, resolves[name]);
        else if(listeners[name]) listeners[name].push(listener);
        else {
            listeners[name] = [listener];
            if(config[name] && !loaded[config[name]]) {
                var node = document.createElement('SCRIPT');
                node.setAttribute('data-requiremodule', name);
                node.addEventListener('load', onScriptLoad, false);
                node.src = config[name];
                document.head.appendChild(node);
                loaded[config[name]] = true;
            }
        }
    }

    function require(deps, definition) {
        if(!definition) {
            definition = deps;
            deps = [];
        }
        if(!deps.length) definition();
        else {
            var values = [], count = 0;
            deps.forEach(function(dep) {
                addLoadListener(dep, function(name, value) {
                    values[deps.indexOf(name)] = value;
                    if(++count >= deps.length) definition.apply(null, values);
                });
            });
        }
    }

    function define(name, deps, definition) {
        if(typeof(name)!=='string') {
            definition = deps;
            deps = name;
            name = '';
        }
        if(!definition) {
            definition = deps;
            deps = [];
        }
        if(!deps.length) resolve(name, definition());
        else {
            require(deps, function() {
                resolve(name, definition.apply(null, arguments));
            });
        }
    }

    require.config = function(map) {
        for(var n in map) config[n] = map[n];
    };
    define.amd = config;

    window.require = require;
    window.define = define;
}(document));
