define(function() {
    var state = 'loading';
    var queue = [];

    MathJax = {
        skipStartupTypeset: true,
        jax: ["input/TeX", "output/HTML-CSS"],
        AuthorInit: function() {
            MathJax.Hub.Config({
                showProcessingMessages: false,
                showMathMenu: false,
                showMathMenuMSIE: false
            });
            MathJax.Hub.Register.StartupHook("End", function() {
                state = 'ready';
                queue.forEach(requestTypeset);
                queue = [];
            });
        }
    };

    function requestTypeset(entry) {
        MathJax.Hub.Queue([entry[0], MathJax.Hub, entry[1]]);
    }

    function pushAction(entry) {
        state === 'ready' ? requestTypeset(entry) : queue.push(entry);
    }

    var node = document.createElement('SCRIPT');
    node.src = '//cdn.mathjax.org/mathjax/latest/MathJax.js';
    document.head.appendChild(node);

    return pushAction;
});
