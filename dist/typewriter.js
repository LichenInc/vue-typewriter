!function(root, factory) {
    "object" == typeof exports && "object" == typeof module ? module.exports = factory() : "function" == typeof define && define.amd ? define([], factory) : "object" == typeof exports ? exports.VueTypewriter = factory() : root.VueTypewriter = factory();
}(this, function() {
    return function(modules) {
        function __webpack_require__(moduleId) {
            if (installedModules[moduleId]) return installedModules[moduleId].exports;
            var module = installedModules[moduleId] = {
                exports: {},
                id: moduleId,
                loaded: !1
            };
            return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
            module.loaded = !0, module.exports;
        }
        var installedModules = {};
        return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
        __webpack_require__.p = "", __webpack_require__(0);
    }([ function(module, exports, __webpack_require__) {
        "use strict";
        function _interopRequireDefault(obj) {
            return obj && obj.__esModule ? obj : {
                default: obj
            };
        }
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.Typewriter = void 0;
        var _Typewriter = __webpack_require__(1), _Typewriter2 = _interopRequireDefault(_Typewriter);
        exports.default = {
            install: function(Vue) {
                Vue.component("typewriter", _Typewriter2.default);
            }
        }, exports.Typewriter = _Typewriter2.default;
    }, function(module, exports, __webpack_require__) {
        var __vue_exports__, __vue_options__;
        __webpack_require__(2), __vue_exports__ = __webpack_require__(6);
        var __vue_template__ = __webpack_require__(7);
        __vue_options__ = __vue_exports__ = __vue_exports__ || {}, "object" != typeof __vue_exports__.default && "function" != typeof __vue_exports__.default || (__vue_options__ = __vue_exports__ = __vue_exports__.default), 
        "function" == typeof __vue_options__ && (__vue_options__ = __vue_options__.options), 
        __vue_options__.render = __vue_template__.render, __vue_options__.staticRenderFns = __vue_template__.staticRenderFns, 
        module.exports = __vue_exports__;
    }, function(module, exports, __webpack_require__) {
        var content = __webpack_require__(3);
        "string" == typeof content && (content = [ [ module.id, content, "" ] ]);
        __webpack_require__(5)(content, {});
        content.locals && (module.exports = content.locals);
    }, function(module, exports, __webpack_require__) {
        exports = module.exports = __webpack_require__(4)(), exports.push([ module.id, ".typewriter-selected{background-color:rgba(0,0,0,.1)}.typewriter-cursor{opacity:1;animation:blink .7s infinite;position:relative;top:-3px;left:-12px}@keyframes blink{0%{opacity:1}50%{opacity:0}to{opacity:1}}", "" ]);
    }, function(module, exports) {
        module.exports = function() {
            var list = [];
            return list.toString = function() {
                for (var result = [], i = 0; i < this.length; i++) {
                    var item = this[i];
                    item[2] ? result.push("@media " + item[2] + "{" + item[1] + "}") : result.push(item[1]);
                }
                return result.join("");
            }, list.i = function(modules, mediaQuery) {
                "string" == typeof modules && (modules = [ [ null, modules, "" ] ]);
                for (var alreadyImportedModules = {}, i = 0; i < this.length; i++) {
                    var id = this[i][0];
                    "number" == typeof id && (alreadyImportedModules[id] = !0);
                }
                for (i = 0; i < modules.length; i++) {
                    var item = modules[i];
                    "number" == typeof item[0] && alreadyImportedModules[item[0]] || (mediaQuery && !item[2] ? item[2] = mediaQuery : mediaQuery && (item[2] = "(" + item[2] + ") and (" + mediaQuery + ")"), 
                    list.push(item));
                }
            }, list;
        };
    }, function(module, exports, __webpack_require__) {
        function addStylesToDom(styles, options) {
            for (var i = 0; i < styles.length; i++) {
                var item = styles[i], domStyle = stylesInDom[item.id];
                if (domStyle) {
                    domStyle.refs++;
                    for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j](item.parts[j]);
                    for (;j < item.parts.length; j++) domStyle.parts.push(addStyle(item.parts[j], options));
                } else {
                    for (var parts = [], j = 0; j < item.parts.length; j++) parts.push(addStyle(item.parts[j], options));
                    stylesInDom[item.id] = {
                        id: item.id,
                        refs: 1,
                        parts: parts
                    };
                }
            }
        }
        function listToStyles(list) {
            for (var styles = [], newStyles = {}, i = 0; i < list.length; i++) {
                var item = list[i], id = item[0], css = item[1], media = item[2], sourceMap = item[3], part = {
                    css: css,
                    media: media,
                    sourceMap: sourceMap
                };
                newStyles[id] ? newStyles[id].parts.push(part) : styles.push(newStyles[id] = {
                    id: id,
                    parts: [ part ]
                });
            }
            return styles;
        }
        function insertStyleElement(options, styleElement) {
            var head = getHeadElement(), lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
            if ("top" === options.insertAt) lastStyleElementInsertedAtTop ? lastStyleElementInsertedAtTop.nextSibling ? head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling) : head.appendChild(styleElement) : head.insertBefore(styleElement, head.firstChild), 
            styleElementsInsertedAtTop.push(styleElement); else {
                if ("bottom" !== options.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
                head.appendChild(styleElement);
            }
        }
        function removeStyleElement(styleElement) {
            styleElement.parentNode.removeChild(styleElement);
            var idx = styleElementsInsertedAtTop.indexOf(styleElement);
            idx >= 0 && styleElementsInsertedAtTop.splice(idx, 1);
        }
        function createStyleElement(options) {
            var styleElement = document.createElement("style");
            return styleElement.type = "text/css", insertStyleElement(options, styleElement), 
            styleElement;
        }
        function addStyle(obj, options) {
            var styleElement, update, remove;
            if (options.singleton) {
                var styleIndex = singletonCounter++;
                styleElement = singletonElement || (singletonElement = createStyleElement(options)), 
                update = applyToSingletonTag.bind(null, styleElement, styleIndex, !1), remove = applyToSingletonTag.bind(null, styleElement, styleIndex, !0);
            } else styleElement = createStyleElement(options), update = applyToTag.bind(null, styleElement), 
            remove = function() {
                removeStyleElement(styleElement);
            };
            return update(obj), function(newObj) {
                if (newObj) {
                    if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) return;
                    update(obj = newObj);
                } else remove();
            };
        }
        function applyToSingletonTag(styleElement, index, remove, obj) {
            var css = remove ? "" : obj.css;
            if (styleElement.styleSheet) styleElement.styleSheet.cssText = replaceText(index, css); else {
                var cssNode = document.createTextNode(css), childNodes = styleElement.childNodes;
                childNodes[index] && styleElement.removeChild(childNodes[index]), childNodes.length ? styleElement.insertBefore(cssNode, childNodes[index]) : styleElement.appendChild(cssNode);
            }
        }
        function applyToTag(styleElement, obj) {
            var css = obj.css, media = obj.media, sourceMap = obj.sourceMap;
            if (media && styleElement.setAttribute("media", media), sourceMap && (css += "\n/*# sourceURL=" + sourceMap.sources[0] + " */", 
            css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */"), 
            styleElement.styleSheet) styleElement.styleSheet.cssText = css; else {
                for (;styleElement.firstChild; ) styleElement.removeChild(styleElement.firstChild);
                styleElement.appendChild(document.createTextNode(css));
            }
        }
        var stylesInDom = {}, memoize = function(fn) {
            var memo;
            return function() {
                return "undefined" == typeof memo && (memo = fn.apply(this, arguments)), memo;
            };
        }, isOldIE = memoize(function() {
            return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
        }), getHeadElement = memoize(function() {
            return document.head || document.getElementsByTagName("head")[0];
        }), singletonElement = null, singletonCounter = 0, styleElementsInsertedAtTop = [];
        module.exports = function(list, options) {
            if (!1) throw new Error("The style-loader cannot be used in a non-browser environment");
            options = options || {}, "undefined" == typeof options.singleton && (options.singleton = isOldIE()), 
            "undefined" == typeof options.insertAt && (options.insertAt = "bottom");
            var styles = listToStyles(list);
            return addStylesToDom(styles, options), function(newList) {
                for (var mayRemove = [], i = 0; i < styles.length; i++) {
                    var item = styles[i], domStyle = stylesInDom[item.id];
                    domStyle.refs--, mayRemove.push(domStyle);
                }
                if (newList) {
                    var newStyles = listToStyles(newList);
                    addStylesToDom(newStyles, options);
                }
                for (var i = 0; i < mayRemove.length; i++) {
                    var domStyle = mayRemove[i];
                    if (0 === domStyle.refs) {
                        for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();
                        delete stylesInDom[domStyle.id];
                    }
                }
            };
        };
        var replaceText = function() {
            var textStore = [];
            return function(index, replacement) {
                return textStore[index] = replacement, textStore.filter(Boolean).join("\n");
            };
        }();
    }, function(module, exports) {
        "use strict";
        Object.defineProperty(exports, "__esModule", {
            value: !0
        }), exports.default = {
            props: {
                words: {
                    type: Array,
                    default: function() {
                        return [];
                    }
                },
                interval: {
                    type: Number,
                    default: 200
                },
                speed: {
                    type: Number,
                    default: 300
                },
                cursor: {
                    type: Boolean,
                    default: !0
                },
                cursorSymbol: {
                    type: String,
                    default: "|"
                },
                fullErase: {
                    type: Boolean,
                    default: !1
                },
                eraseAfter: {
                    type: Boolean,
                    default: !0
                }
            },
            data: function() {
                return {
                    typePos: 0,
                    isTyping: !1,
                    isWaiting: !1,
                    currentWordPos: null,
                    currentWord: null,
                    typing: null,
                    isFullErasing: !1
                };
            },
            computed: {
                isErasing: function() {
                    return !this.isTyping;
                },
                finishTyping: function() {
                    return null !== this.typing && null !== this.currentWord && (!!this.hasStarted && (this.isTyping && this.typing.length >= this.currentWord.length));
                },
                hasStarted: function() {
                    return null !== this.currentWord;
                },
                isErased: function() {
                    return !!this.hasStarted && (!(!this.isErasing || null !== this.typing) || this.isErasing && this.typing.length <= 0);
                },
                isLastWord: function() {
                    return this.hasStarted && this.currentWordPos >= this.words.length - 1;
                }
            },
            mounted: function() {
                this.type();
            },
            beforeDestroy: function() {
                this.destroyTimers();
            },
            methods: {
                destroyTimers: function() {
                    this.destroyTypeInterval(), this.destroyCharTimeout(), this.destroyFullEraseTimeout();
                },
                destroyTypeInterval: function() {
                    this.typeInterval && clearInterval(this.typeInterval);
                },
                destroyCharTimeout: function() {
                    this.charTimeout && clearTimeout(this.charTimeout);
                },
                destroyFullEraseTimeout: function() {
                    this.fullEraseTimeout && clearTimeout(this.fullEraseTimeout);
                },
                next: function() {
                    var _this = this;
                    this.canContinue() && (this.hasStarted ? this.isLastWord ? this.currentWordPos = 0 : this.currentWordPos++ : this.currentWordPos = 0, 
                    this.isWaiting = !0, this.charTimeout = setTimeout(function() {
                        _this.destroyCharTimeout(), _this.isWaiting = !1, _this.currentWord = _this.words[_this.currentWordPos], 
                        _this.typePos = _this.isTyping ? _this.currentWord.length : 0, _this.isTyping = !_this.isTyping;
                    }, this.interval));
                },
                canContinue: function() {
                    return !this.isWaiting && (!(this.isTyping && !this.finishTyping && this.hasStarted) && (!(this.isErasing && !this.isErased && this.hasStarted) && (this.isTyping && this.finishTyping ? (this.isTyping = !this.isTyping, 
                    this.doFullErase(), !1) : (this.finishTyping && this.$emit("finished"), !0))));
                },
                doFullErase: function() {
                    var _this2 = this;
                    this.fullErase && !this.isFullErasing && (this.isFullErasing = !0, this.isWaiting = !0, 
                    this.fullEraseTimeout = setTimeout(function() {
                        clearTimeout(_this2.fullEraseTimeout), _this2.reset();
                    }, 300));
                },
                reset: function() {
                    this.isWaiting = !1, this.typing = null, this.typePos = 0, this.isFullErasing = !1;
                },
                type: function() {
                    var _this3 = this;
                    this.destroyTypeInterval(), this.typeInterval = setInterval(function() {
                        _this3.next(), _this3.hasStarted && !_this3.isWaiting && (_this3.isTyping ? _this3.typePos++ : _this3.eraseAfter && _this3.typePos--, 
                        _this3.typing = _this3.currentWord.substr(0, _this3.typePos));
                    }, this.speed);
                }
            }
        };
    }, function(module, exports) {
        module.exports = {
            render: function() {
                var _vm = this, _h = _vm.$createElement, _c = _vm._self._c || _h;
                return _c("span", {
                    staticClass: "typewriter"
                }, [ _vm._t("default"), _vm._v(" "), _c("span", {
                    staticClass: "typewriter-msg",
                    class: {
                        "typewriter-selected": _vm.isFullErasing
                    }
                }, [ _vm._v(_vm._s(_vm.typing)) ]), _vm._v(" "), _vm.cursor ? _c("span", {
                    staticClass: "typewriter-cursor"
                }, [ _vm._v(_vm._s(_vm.cursorSymbol)) ]) : _vm._e() ], 2);
            },
            staticRenderFns: []
        };
    } ]);
});
//# sourceMappingURL=typewriter.js.map