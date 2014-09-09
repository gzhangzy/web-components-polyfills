module.exports = function(grunt) {
  'use strict';

  var platformFiles = [
    "platform/build/boot.js",
    "observe-js/src/observe.js",
    "WeakMap/weakmap.js",
    "platform/build/if-poly.js",
    "ShadowDOM/src/wrappers.js",
    "ShadowDOM/src/microtask.js",
    "ShadowDOM/src/MutationObserver.js",
    "ShadowDOM/src/TreeScope.js",
    "ShadowDOM/src/wrappers/events.js",
    "ShadowDOM/src/wrappers/TouchEvent.js",
    "ShadowDOM/src/wrappers/NodeList.js",
    "ShadowDOM/src/wrappers/HTMLCollection.js",
    "ShadowDOM/src/wrappers/Node.js",
    "ShadowDOM/src/querySelector.js",
    "ShadowDOM/src/wrappers/node-interfaces.js",
    "ShadowDOM/src/wrappers/CharacterData.js",
    "ShadowDOM/src/wrappers/Text.js",
    "ShadowDOM/src/wrappers/DOMTokenList.js",
    "ShadowDOM/src/wrappers/Element.js",
    "ShadowDOM/src/wrappers/HTMLElement.js",
    "ShadowDOM/src/wrappers/HTMLCanvasElement.js",
    "ShadowDOM/src/wrappers/HTMLContentElement.js",
    "ShadowDOM/src/wrappers/HTMLFormElement.js",
    "ShadowDOM/src/wrappers/HTMLImageElement.js",
    "ShadowDOM/src/wrappers/HTMLShadowElement.js",
    "ShadowDOM/src/wrappers/HTMLTemplateElement.js",
    "ShadowDOM/src/wrappers/HTMLMediaElement.js",
    "ShadowDOM/src/wrappers/HTMLAudioElement.js",
    "ShadowDOM/src/wrappers/HTMLOptionElement.js",
    "ShadowDOM/src/wrappers/HTMLSelectElement.js",
    "ShadowDOM/src/wrappers/HTMLTableElement.js",
    "ShadowDOM/src/wrappers/HTMLTableSectionElement.js",
    "ShadowDOM/src/wrappers/HTMLTableRowElement.js",
    "ShadowDOM/src/wrappers/HTMLUnknownElement.js",
    "ShadowDOM/src/wrappers/SVGElement.js",
    "ShadowDOM/src/wrappers/SVGUseElement.js",
    "ShadowDOM/src/wrappers/SVGElementInstance.js",
    "ShadowDOM/src/wrappers/CanvasRenderingContext2D.js",
    "ShadowDOM/src/wrappers/WebGLRenderingContext.js",
    "ShadowDOM/src/wrappers/Range.js",
    "ShadowDOM/src/wrappers/generic.js",
    "ShadowDOM/src/wrappers/ShadowRoot.js",
    "ShadowDOM/src/ShadowRenderer.js",
    "ShadowDOM/src/wrappers/elements-with-form-property.js",
    "ShadowDOM/src/wrappers/Selection.js",
    "ShadowDOM/src/wrappers/Document.js",
    "ShadowDOM/src/wrappers/Window.js",
    "ShadowDOM/src/wrappers/DataTransfer.js",
    "ShadowDOM/src/wrappers/FormData.js",
    "ShadowDOM/src/wrappers/override-constructors.js",
    "platform/src/patches-shadowdom-polyfill.js",
    "platform/src/ShadowCSS.js",
    "platform/build/else.js",
    "platform/src/patches-shadowdom-native.js",
    "platform/build/end-if.js",
    "URL/url.js",
    "platform/src/lang.js",
    "platform/src/dom.js",
    "MutationObservers/MutationObserver.js",
    "HTMLImports/src/scope.js",
    "HTMLImports/src/base.js",
    "HTMLImports/src/Loader.js",
    "HTMLImports/src/Parser.js",
    "HTMLImports/src/HTMLImports.js",
    "HTMLImports/src/Observer.js",
    "HTMLImports/src/boot.js",
    "CustomElements/src/scope.js",
    "CustomElements/src/Observer.js",
    "CustomElements/src/CustomElements.js",
    "CustomElements/src/Parser.js",
    "CustomElements/src/boot.js",
    "platform/src/patches-custom-elements.js",
    "platform/src/unresolved.js",
    "platform/src/module.js"
  ].concat([
    'amd.js',
    'amd-config.js'
  ]);

  var polyfillFiles = [
    "WeakMap/weakmap.js",
    "MutationObservers/MutationObserver.js",
    "CustomElements/src/scope.js",
    "CustomElements/src/Observer.js",
    "CustomElements/src/CustomElements.js",
    "CustomElements/src/Parser.js",
    "CustomElements/src/boot.js"
  ].concat([
    'amd.js',
    'amd-config.js'
  ]);

  var WebReflectionFiles = [
    "node_modules/document-register-element/build/document-register-element.max.js"
  ].concat([
    'amd.js',
    'amd-config.js'
  ]);

  grunt.initConfig({
    concat: {
      platform: {
        src: platformFiles,
        dest: 'doc/lib/platform.js'
      },
      polyfill: {
        src: polyfillFiles,
        dest: 'doc/lib/custom-elements.js'
      },
      WebReflection: {
        src: WebReflectionFiles,
        dest: 'doc/lib/register-element.js'
      }
    },
    uglify: {
      all: {
        files: {
          'doc/lib/register-element.min.js': ['doc/lib/register-element.js'],
          'doc/lib/marked.min.js': ['node_modules/marked/lib/marked.js'],
          'doc/lib/mathjax.min.js': ['doc/lib/mathjax.js'],
          'doc/lib/qr.min.js': ['doc/lib/qr.js'],
          'doc/lib/jquery.min.js': ['node_modules/jquery/dist/jquery.js']
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat:WebReflection','uglify']);
};
