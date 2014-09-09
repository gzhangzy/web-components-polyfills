require(['mathjax'], function(pushAction) {
    var element = Object.create(HTMLElement.prototype);

    element.createdCallback = function() {
        this._jax = document.createElement('script');
        this._jax.type = this.getAttribute('mode')==='display'
                       ? 'math/tex; mode=display'
                       : 'math/tex';
        this._jax.textContent = this.textContent;
        this.textContent = '';
        this.appendChild(this._jax);
    };

    element.attachedCallback = function() {
        pushAction(["Typeset", this._jax]);
    };

    document.registerElement('x-math', {prototype: element});
});
