var Zepto = (function() {
    function t(t) {
        return null == t ? String(t) : U[J.call(t)] || 'object';
    }
    function e(e) {
        return 'function' == t(e);
    }
    function n(t) {
        return null != t && t == t.window;
    }
    function r(t) {
        return null != t && t.nodeType == t.DOCUMENT_NODE;
    }
    function i(e) {
        return 'object' == t(e);
    }
    function o(t) {
        return i(t) && !n(t) && Object.getPrototypeOf(t) == Object.prototype;
    }
    function a(t) {
        return 'number' == typeof t.length;
    }
    function s(t) {
        return P.call(t, function(t) {
            return null != t;
        });
    }
    function u(t) {
        return t.length > 0 ? j.fn.concat.apply([], t) : t;
    }
    function c(t) {
        return t
            .replace(/::/g, '/')
            .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
            .replace(/([a-z\d])([A-Z])/g, '$1_$2')
            .replace(/_/g, '-')
            .toLowerCase();
    }
    function l(t) {
        return t in Z ? Z[t] : (Z[t] = new RegExp('(^|\\s)' + t + '(\\s|$)'));
    }
    function f(t, e) {
        return 'number' != typeof e || $[c(t)] ? e : e + 'px';
    }
    function h(t) {
        var e, n;
        return (
            L[t] ||
                ((e = A.createElement(t)),
                A.body.appendChild(e),
                (n = getComputedStyle(e, '').getPropertyValue('display')),
                e.parentNode.removeChild(e),
                'none' == n && (n = 'block'),
                (L[t] = n)),
            L[t]
        );
    }
    function p(t) {
        return 'children' in t
            ? O.call(t.children)
            : j.map(t.childNodes, function(t) {
                  return 1 == t.nodeType ? t : void 0;
              });
    }
    function d(t, e, n) {
        for (E in e)
            n && (o(e[E]) || G(e[E]))
                ? (o(e[E]) && !o(t[E]) && (t[E] = {}), G(e[E]) && !G(t[E]) && (t[E] = []), d(t[E], e[E], n))
                : e[E] !== w && (t[E] = e[E]);
    }
    function m(t, e) {
        return null == e ? j(t) : j(t).filter(e);
    }
    function v(t, n, r, i) {
        return e(n) ? n.call(t, r, i) : n;
    }
    function g(t, e, n) {
        null == n ? t.removeAttribute(e) : t.setAttribute(e, n);
    }
    function y(t, e) {
        var n = t.className,
            r = n && n.baseVal !== w;
        return e === w ? (r ? n.baseVal : n) : void (r ? (n.baseVal = e) : (t.className = e));
    }
    function x(t) {
        var e;
        try {
            return t
                ? 'true' == t ||
                  ('false' != t &&
                      ('null' == t
                          ? null
                          : /^0/.test(t) || isNaN((e = Number(t))) ? (/^[\[\{]/.test(t) ? j.parseJSON(t) : t) : e))
                : t;
        } catch (n) {
            return t;
        }
    }
    function b(t, e) {
        e(t);
        for (var n = 0, r = t.childNodes.length; r > n; n++) b(t.childNodes[n], e);
    }
    var w,
        E,
        j,
        S,
        T,
        C,
        N = [],
        O = N.slice,
        P = N.filter,
        A = window.document,
        L = {},
        Z = {},
        $ = {'column-count': 1, columns: 1, 'font-weight': 1, 'line-height': 1, opacity: 1, 'z-index': 1, zoom: 1},
        _ = /^\s*<(\w+|!)[^>]*>/,
        D = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        R = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
        M = /^(?:body|html)$/i,
        k = /([A-Z])/g,
        z = ['val', 'css', 'html', 'text', 'data', 'width', 'height', 'offset'],
        F = ['after', 'prepend', 'before', 'append'],
        q = A.createElement('table'),
        H = A.createElement('tr'),
        I = {tr: A.createElement('tbody'), tbody: q, thead: q, tfoot: q, td: H, th: H, '*': A.createElement('div')},
        V = /complete|loaded|interactive/,
        B = /^[\w-]*$/,
        U = {},
        J = U.toString,
        X = {},
        W = A.createElement('div'),
        Y = {
            tabindex: 'tabIndex',
            readonly: 'readOnly',
            for: 'htmlFor',
            class: 'className',
            maxlength: 'maxLength',
            cellspacing: 'cellSpacing',
            cellpadding: 'cellPadding',
            rowspan: 'rowSpan',
            colspan: 'colSpan',
            usemap: 'useMap',
            frameborder: 'frameBorder',
            contenteditable: 'contentEditable'
        },
        G =
            Array.isArray ||
            function(t) {
                return t instanceof Array;
            };
    return (
        (X.matches = function(t, e) {
            if (!e || !t || 1 !== t.nodeType) return !1;
            var n = t.webkitMatchesSelector || t.mozMatchesSelector || t.oMatchesSelector || t.matchesSelector;
            if (n) return n.call(t, e);
            var r,
                i = t.parentNode,
                o = !i;
            return o && (i = W).appendChild(t), (r = ~X.qsa(i, e).indexOf(t)), o && W.removeChild(t), r;
        }),
        (T = function(t) {
            return t.replace(/-+(.)?/g, function(t, e) {
                return e ? e.toUpperCase() : '';
            });
        }),
        (C = function(t) {
            return P.call(t, function(e, n) {
                return t.indexOf(e) == n;
            });
        }),
        (X.fragment = function(t, e, n) {
            var r, i, a;
            return (
                D.test(t) && (r = j(A.createElement(RegExp.$1))),
                r ||
                    (t.replace && (t = t.replace(R, '<$1></$2>')),
                    e === w && (e = _.test(t) && RegExp.$1),
                    e in I || (e = '*'),
                    (a = I[e]),
                    (a.innerHTML = '' + t),
                    (r = j.each(O.call(a.childNodes), function() {
                        a.removeChild(this);
                    }))),
                o(n) &&
                    ((i = j(r)),
                    j.each(n, function(t, e) {
                        z.indexOf(t) > -1 ? i[t](e) : i.attr(t, e);
                    })),
                r
            );
        }),
        (X.Z = function(t, e) {
            return (t = t || []), (t.__proto__ = j.fn), (t.selector = e || ''), t;
        }),
        (X.isZ = function(t) {
            return t instanceof X.Z;
        }),
        (X.init = function(t, n) {
            var r;
            if (!t) return X.Z();
            if ('string' == typeof t)
                if (((t = t.trim()), '<' == t[0] && _.test(t))) (r = X.fragment(t, RegExp.$1, n)), (t = null);
                else {
                    if (n !== w) return j(n).find(t);
                    r = X.qsa(A, t);
                }
            else {
                if (e(t)) return j(A).ready(t);
                if (X.isZ(t)) return t;
                if (G(t)) r = s(t);
                else if (i(t)) (r = [t]), (t = null);
                else if (_.test(t)) (r = X.fragment(t.trim(), RegExp.$1, n)), (t = null);
                else {
                    if (n !== w) return j(n).find(t);
                    r = X.qsa(A, t);
                }
            }
            return X.Z(r, t);
        }),
        (j = function(t, e) {
            return X.init(t, e);
        }),
        (j.extend = function(t) {
            var e,
                n = O.call(arguments, 1);
            return (
                'boolean' == typeof t && ((e = t), (t = n.shift())),
                n.forEach(function(n) {
                    d(t, n, e);
                }),
                t
            );
        }),
        (X.qsa = function(t, e) {
            var n,
                i = '#' == e[0],
                o = !i && '.' == e[0],
                a = i || o ? e.slice(1) : e,
                s = B.test(a);
            return r(t) && s && i
                ? (n = t.getElementById(a)) ? [n] : []
                : 1 !== t.nodeType && 9 !== t.nodeType
                  ? []
                  : O.call(
                        s && !i ? (o ? t.getElementsByClassName(a) : t.getElementsByTagName(e)) : t.querySelectorAll(e)
                    );
        }),
        (j.contains = A.documentElement.contains
            ? function(t, e) {
                  return t !== e && t.contains(e);
              }
            : function(t, e) {
                  for (; e && (e = e.parentNode); ) if (e === t) return !0;
                  return !1;
              }),
        (j.type = t),
        (j.isFunction = e),
        (j.isWindow = n),
        (j.isArray = G),
        (j.isPlainObject = o),
        (j.isEmptyObject = function(t) {
            var e;
            for (e in t) return !1;
            return !0;
        }),
        (j.inArray = function(t, e, n) {
            return N.indexOf.call(e, t, n);
        }),
        (j.camelCase = T),
        (j.trim = function(t) {
            return null == t ? '' : String.prototype.trim.call(t);
        }),
        (j.uuid = 0),
        (j.support = {}),
        (j.expr = {}),
        (j.map = function(t, e) {
            var n,
                r,
                i,
                o = [];
            if (a(t)) for (r = 0; r < t.length; r++) (n = e(t[r], r)), null != n && o.push(n);
            else for (i in t) (n = e(t[i], i)), null != n && o.push(n);
            return u(o);
        }),
        (j.each = function(t, e) {
            var n, r;
            if (a(t)) {
                for (n = 0; n < t.length; n++) if (e.call(t[n], n, t[n]) === !1) return t;
            } else for (r in t) if (e.call(t[r], r, t[r]) === !1) return t;
            return t;
        }),
        (j.grep = function(t, e) {
            return P.call(t, e);
        }),
        window.JSON && (j.parseJSON = JSON.parse),
        j.each('Boolean Number String Function Array Date RegExp Object Error'.split(' '), function(t, e) {
            U['[object ' + e + ']'] = e.toLowerCase();
        }),
        (j.fn = {
            forEach: N.forEach,
            reduce: N.reduce,
            push: N.push,
            sort: N.sort,
            indexOf: N.indexOf,
            concat: N.concat,
            map: function(t) {
                return j(
                    j.map(this, function(e, n) {
                        return t.call(e, n, e);
                    })
                );
            },
            slice: function() {
                return j(O.apply(this, arguments));
            },
            ready: function(t) {
                return (
                    V.test(A.readyState) && A.body
                        ? t(j)
                        : A.addEventListener(
                              'DOMContentLoaded',
                              function() {
                                  t(j);
                              },
                              !1
                          ),
                    this
                );
            },
            get: function(t) {
                return t === w ? O.call(this) : this[t >= 0 ? t : t + this.length];
            },
            toArray: function() {
                return this.get();
            },
            size: function() {
                return this.length;
            },
            remove: function() {
                return this.each(function() {
                    null != this.parentNode && this.parentNode.removeChild(this);
                });
            },
            each: function(t) {
                return (
                    N.every.call(this, function(e, n) {
                        return t.call(e, n, e) !== !1;
                    }),
                    this
                );
            },
            filter: function(t) {
                return e(t)
                    ? this.not(this.not(t))
                    : j(
                          P.call(this, function(e) {
                              return X.matches(e, t);
                          })
                      );
            },
            add: function(t, e) {
                return j(C(this.concat(j(t, e))));
            },
            is: function(t) {
                return this.length > 0 && X.matches(this[0], t);
            },
            not: function(t) {
                var n = [];
                if (e(t) && t.call !== w)
                    this.each(function(e) {
                        t.call(this, e) || n.push(this);
                    });
                else {
                    var r = 'string' == typeof t ? this.filter(t) : a(t) && e(t.item) ? O.call(t) : j(t);
                    this.forEach(function(t) {
                        r.indexOf(t) < 0 && n.push(t);
                    });
                }
                return j(n);
            },
            has: function(t) {
                return this.filter(function() {
                    return i(t) ? j.contains(this, t) : j(this).find(t).size();
                });
            },
            eq: function(t) {
                return -1 === t ? this.slice(t) : this.slice(t, +t + 1);
            },
            first: function() {
                var t = this[0];
                return t && !i(t) ? t : j(t);
            },
            last: function() {
                var t = this[this.length - 1];
                return t && !i(t) ? t : j(t);
            },
            find: function(t) {
                var e,
                    n = this;
                return (e = t
                    ? 'object' == typeof t
                      ? j(t).filter(function() {
                            var t = this;
                            return N.some.call(n, function(e) {
                                return j.contains(e, t);
                            });
                        })
                      : 1 == this.length
                        ? j(X.qsa(this[0], t))
                        : this.map(function() {
                              return X.qsa(this, t);
                          })
                    : []);
            },
            closest: function(t, e) {
                var n = this[0],
                    i = !1;
                for ('object' == typeof t && (i = j(t)); n && !(i ? i.indexOf(n) >= 0 : X.matches(n, t)); )
                    n = n !== e && !r(n) && n.parentNode;
                return j(n);
            },
            parents: function(t) {
                for (var e = [], n = this; n.length > 0; )
                    n = j.map(n, function(t) {
                        return (t = t.parentNode) && !r(t) && e.indexOf(t) < 0 ? (e.push(t), t) : void 0;
                    });
                return m(e, t);
            },
            parent: function(t) {
                return m(C(this.pluck('parentNode')), t);
            },
            children: function(t) {
                return m(
                    this.map(function() {
                        return p(this);
                    }),
                    t
                );
            },
            contents: function() {
                return this.map(function() {
                    return O.call(this.childNodes);
                });
            },
            siblings: function(t) {
                return m(
                    this.map(function(t, e) {
                        return P.call(p(e.parentNode), function(t) {
                            return t !== e;
                        });
                    }),
                    t
                );
            },
            empty: function() {
                return this.each(function() {
                    this.innerHTML = '';
                });
            },
            pluck: function(t) {
                return j.map(this, function(e) {
                    return e[t];
                });
            },
            show: function() {
                return this.each(function() {
                    'none' == this.style.display && (this.style.display = ''),
                        'none' == getComputedStyle(this, '').getPropertyValue('display') &&
                            (this.style.display = h(this.nodeName));
                });
            },
            replaceWith: function(t) {
                return this.before(t).remove();
            },
            wrap: function(t) {
                var n = e(t);
                if (this[0] && !n)
                    var r = j(t).get(0),
                        i = r.parentNode || this.length > 1;
                return this.each(function(e) {
                    j(this).wrapAll(n ? t.call(this, e) : i ? r.cloneNode(!0) : r);
                });
            },
            wrapAll: function(t) {
                if (this[0]) {
                    j(this[0]).before((t = j(t)));
                    for (var e; (e = t.children()).length; ) t = e.first();
                    j(t).append(this);
                }
                return this;
            },
            wrapInner: function(t) {
                var n = e(t);
                return this.each(function(e) {
                    var r = j(this),
                        i = r.contents(),
                        o = n ? t.call(this, e) : t;
                    i.length ? i.wrapAll(o) : r.append(o);
                });
            },
            unwrap: function() {
                return (
                    this.parent().each(function() {
                        j(this).replaceWith(j(this).children());
                    }),
                    this
                );
            },
            clone: function() {
                return this.map(function() {
                    return this.cloneNode(!0);
                });
            },
            hide: function() {
                return this.css('display', 'none');
            },
            toggle: function(t) {
                return this.each(function() {
                    var e = j(this);
                    (t === w ? 'none' == e.css('display') : t) ? e.show() : e.hide();
                });
            },
            prev: function(t) {
                return j(this.pluck('previousElementSibling')).filter(t || '*');
            },
            next: function(t) {
                return j(this.pluck('nextElementSibling')).filter(t || '*');
            },
            html: function(t) {
                return 0 in arguments
                    ? this.each(function(e) {
                          var n = this.innerHTML;
                          j(this).empty().append(v(this, t, e, n));
                      })
                    : 0 in this ? this[0].innerHTML : null;
            },
            text: function(t) {
                return 0 in arguments
                    ? this.each(function(e) {
                          var n = v(this, t, e, this.textContent);
                          this.textContent = null == n ? '' : '' + n;
                      })
                    : 0 in this ? this[0].textContent : null;
            },
            attr: function(t, e) {
                var n;
                return 'string' != typeof t || 1 in arguments
                    ? this.each(function(n) {
                          if (1 === this.nodeType)
                              if (i(t)) for (E in t) g(this, E, t[E]);
                              else g(this, t, v(this, e, n, this.getAttribute(t)));
                      })
                    : this.length && 1 === this[0].nodeType
                      ? !(n = this[0].getAttribute(t)) && t in this[0] ? this[0][t] : n
                      : w;
            },
            removeAttr: function(t) {
                return this.each(function() {
                    1 === this.nodeType && g(this, t);
                });
            },
            prop: function(t, e) {
                return (
                    (t = Y[t] || t),
                    1 in arguments
                        ? this.each(function(n) {
                              this[t] = v(this, e, n, this[t]);
                          })
                        : this[0] && this[0][t]
                );
            },
            data: function(t, e) {
                var n = 'data-' + t.replace(k, '-$1').toLowerCase(),
                    r = 1 in arguments ? this.attr(n, e) : this.attr(n);
                return null !== r ? x(r) : w;
            },
            val: function(t) {
                return 0 in arguments
                    ? this.each(function(e) {
                          this.value = v(this, t, e, this.value);
                      })
                    : this[0] &&
                      (this[0].multiple
                          ? j(this[0])
                                .find('option')
                                .filter(function() {
                                    return this.selected;
                                })
                                .pluck('value')
                          : this[0].value);
            },
            offset: function(t) {
                if (t)
                    return this.each(function(e) {
                        var n = j(this),
                            r = v(this, t, e, n.offset()),
                            i = n.offsetParent().offset(),
                            o = {top: r.top - i.top, left: r.left - i.left};
                        'static' == n.css('position') && (o.position = 'relative'), n.css(o);
                    });
                if (!this.length) return null;
                var e = this[0].getBoundingClientRect();
                return {
                    left: e.left + window.pageXOffset,
                    top: e.top + window.pageYOffset,
                    width: Math.round(e.width),
                    height: Math.round(e.height)
                };
            },
            css: function(e, n) {
                if (arguments.length < 2) {
                    var r = this[0],
                        i = getComputedStyle(r, '');
                    if (!r) return;
                    if ('string' == typeof e) return r.style[T(e)] || i.getPropertyValue(e);
                    if (G(e)) {
                        var o = {};
                        return (
                            j.each(G(e) ? e : [e], function(t, e) {
                                o[e] = r.style[T(e)] || i.getPropertyValue(e);
                            }),
                            o
                        );
                    }
                }
                var a = '';
                if ('string' == t(e))
                    n || 0 === n
                        ? (a = c(e) + ':' + f(e, n))
                        : this.each(function() {
                              this.style.removeProperty(c(e));
                          });
                else
                    for (E in e)
                        e[E] || 0 === e[E]
                            ? (a += c(E) + ':' + f(E, e[E]) + ';')
                            : this.each(function() {
                                  this.style.removeProperty(c(E));
                              });
                return this.each(function() {
                    this.style.cssText += ';' + a;
                });
            },
            index: function(t) {
                return t ? this.indexOf(j(t)[0]) : this.parent().children().indexOf(this[0]);
            },
            hasClass: function(t) {
                return (
                    !!t &&
                    N.some.call(
                        this,
                        function(t) {
                            return this.test(y(t));
                        },
                        l(t)
                    )
                );
            },
            addClass: function(t) {
                return t
                    ? this.each(function(e) {
                          S = [];
                          var n = y(this),
                              r = v(this, t, e, n);
                          r.split(/\s+/g).forEach(function(t) {
                              j(this).hasClass(t) || S.push(t);
                          }, this),
                              S.length && y(this, n + (n ? ' ' : '') + S.join(' '));
                      })
                    : this;
            },
            removeClass: function(t) {
                return this.each(function(e) {
                    return t === w
                        ? y(this, '')
                        : ((S = y(this)),
                          v(this, t, e, S).split(/\s+/g).forEach(function(t) {
                              S = S.replace(l(t), ' ');
                          }),
                          void y(this, S.trim()));
                });
            },
            toggleClass: function(t, e) {
                return t
                    ? this.each(function(n) {
                          var r = j(this),
                              i = v(this, t, n, y(this));
                          i.split(/\s+/g).forEach(function(t) {
                              (e === w ? !r.hasClass(t) : e) ? r.addClass(t) : r.removeClass(t);
                          });
                      })
                    : this;
            },
            scrollTop: function(t) {
                if (this.length) {
                    var e = 'scrollTop' in this[0];
                    return t === w
                        ? e ? this[0].scrollTop : this[0].pageYOffset
                        : this.each(
                              e
                                  ? function() {
                                        this.scrollTop = t;
                                    }
                                  : function() {
                                        this.scrollTo(this.scrollX, t);
                                    }
                          );
                }
            },
            scrollLeft: function(t) {
                if (this.length) {
                    var e = 'scrollLeft' in this[0];
                    return t === w
                        ? e ? this[0].scrollLeft : this[0].pageXOffset
                        : this.each(
                              e
                                  ? function() {
                                        this.scrollLeft = t;
                                    }
                                  : function() {
                                        this.scrollTo(t, this.scrollY);
                                    }
                          );
                }
            },
            position: function() {
                if (this.length) {
                    var t = this[0],
                        e = this.offsetParent(),
                        n = this.offset(),
                        r = M.test(e[0].nodeName) ? {top: 0, left: 0} : e.offset();
                    return (
                        (n.top -= parseFloat(j(t).css('margin-top')) || 0),
                        (n.left -= parseFloat(j(t).css('margin-left')) || 0),
                        (r.top += parseFloat(j(e[0]).css('border-top-width')) || 0),
                        (r.left += parseFloat(j(e[0]).css('border-left-width')) || 0),
                        {top: n.top - r.top, left: n.left - r.left}
                    );
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (
                        var t = this.offsetParent || A.body;
                        t && !M.test(t.nodeName) && 'static' == j(t).css('position');

                    )
                        t = t.offsetParent;
                    return t;
                });
            }
        }),
        (j.fn.detach = j.fn.remove),
        ['width', 'height'].forEach(function(t) {
            var e = t.replace(/./, function(t) {
                return t[0].toUpperCase();
            });
            j.fn[t] = function(i) {
                var o,
                    a = this[0];
                return i === w
                    ? n(a) ? a['inner' + e] : r(a) ? a.documentElement['scroll' + e] : (o = this.offset()) && o[t]
                    : this.each(function(e) {
                          (a = j(this)), a.css(t, v(this, i, e, a[t]()));
                      });
            };
        }),
        F.forEach(function(e, n) {
            var r = n % 2;
            (j.fn[e] = function() {
                var e,
                    i,
                    o = j.map(arguments, function(n) {
                        return (e = t(n)), 'object' == e || 'array' == e || null == n ? n : X.fragment(n);
                    }),
                    a = this.length > 1;
                return o.length < 1
                    ? this
                    : this.each(function(t, e) {
                          (i = r ? e : e.parentNode),
                              (e = 0 == n ? e.nextSibling : 1 == n ? e.firstChild : 2 == n ? e : null);
                          var s = j.contains(A.documentElement, i);
                          o.forEach(function(t) {
                              if (a) t = t.cloneNode(!0);
                              else if (!i) return j(t).remove();
                              i.insertBefore(t, e),
                                  s &&
                                      b(t, function(t) {
                                          null == t.nodeName ||
                                              'SCRIPT' !== t.nodeName.toUpperCase() ||
                                              (t.type && 'text/javascript' !== t.type) ||
                                              t.src ||
                                              window.eval.call(window, t.innerHTML);
                                      });
                          });
                      });
            }),
                (j.fn[r ? e + 'To' : 'insert' + (n ? 'Before' : 'After')] = function(t) {
                    return j(t)[e](this), this;
                });
        }),
        (X.Z.prototype = j.fn),
        (X.uniq = C),
        (X.deserializeValue = x),
        (j.zepto = X),
        j
    );
})();
(window.Zepto = Zepto),
    void 0 === window.$ && (window.$ = Zepto),
    (function(t) {
        function e(t) {
            return t._zid || (t._zid = h++);
        }
        function n(t, n, o, a) {
            if (((n = r(n)), n.ns)) var s = i(n.ns);
            return (v[e(t)] || []).filter(function(t) {
                return !(
                    !t ||
                    (n.e && t.e != n.e) ||
                    (n.ns && !s.test(t.ns)) ||
                    (o && e(t.fn) !== e(o)) ||
                    (a && t.sel != a)
                );
            });
        }
        function r(t) {
            var e = ('' + t).split('.');
            return {e: e[0], ns: e.slice(1).sort().join(' ')};
        }
        function i(t) {
            return new RegExp('(?:^| )' + t.replace(' ', ' .* ?') + '(?: |$)');
        }
        function o(t, e) {
            return (t.del && !y && t.e in x) || !!e;
        }
        function a(t) {
            return b[t] || (y && x[t]) || t;
        }
        function s(n, i, s, u, l, h, p) {
            var d = e(n),
                m = v[d] || (v[d] = []);
            i.split(/\s/).forEach(function(e) {
                if ('ready' == e) return t(document).ready(s);
                var i = r(e);
                (i.fn = s),
                    (i.sel = l),
                    i.e in b &&
                        (s = function(e) {
                            var n = e.relatedTarget;
                            return !n || (n !== this && !t.contains(this, n)) ? i.fn.apply(this, arguments) : void 0;
                        }),
                    (i.del = h);
                var d = h || s;
                (i.proxy = function(t) {
                    if (((t = c(t)), !t.isImmediatePropagationStopped())) {
                        t.data = u;
                        var e = d.apply(n, t._args == f ? [t] : [t].concat(t._args));
                        return e === !1 && (t.preventDefault(), t.stopPropagation()), e;
                    }
                }),
                    (i.i = m.length),
                    m.push(i),
                    'addEventListener' in n && n.addEventListener(a(i.e), i.proxy, o(i, p));
            });
        }
        function u(t, r, i, s, u) {
            var c = e(t);
            (r || '').split(/\s/).forEach(function(e) {
                n(t, e, i, s).forEach(function(e) {
                    delete v[c][e.i], 'removeEventListener' in t && t.removeEventListener(a(e.e), e.proxy, o(e, u));
                });
            });
        }
        function c(e, n) {
            return (
                (n || !e.isDefaultPrevented) &&
                    (n || (n = e),
                    t.each(S, function(t, r) {
                        var i = n[t];
                        (e[t] = function() {
                            return (this[r] = w), i && i.apply(n, arguments);
                        }),
                            (e[r] = E);
                    }),
                    (n.defaultPrevented !== f
                        ? n.defaultPrevented
                        : 'returnValue' in n ? n.returnValue === !1 : n.getPreventDefault && n.getPreventDefault()) &&
                        (e.isDefaultPrevented = w)),
                e
            );
        }
        function l(t) {
            var e,
                n = {originalEvent: t};
            for (e in t) j.test(e) || t[e] === f || (n[e] = t[e]);
            return c(n, t);
        }
        var f,
            h = 1,
            p = Array.prototype.slice,
            d = t.isFunction,
            m = function(t) {
                return 'string' == typeof t;
            },
            v = {},
            g = {},
            y = 'onfocusin' in window,
            x = {focus: 'focusin', blur: 'focusout'},
            b = {mouseenter: 'mouseover', mouseleave: 'mouseout'};
        (g.click = g.mousedown = g.mouseup = g.mousemove = 'MouseEvents'),
            (t.event = {add: s, remove: u}),
            (t.proxy = function(n, r) {
                var i = 2 in arguments && p.call(arguments, 2);
                if (d(n)) {
                    var o = function() {
                        return n.apply(r, i ? i.concat(p.call(arguments)) : arguments);
                    };
                    return (o._zid = e(n)), o;
                }
                if (m(r)) return i ? (i.unshift(n[r], n), t.proxy.apply(null, i)) : t.proxy(n[r], n);
                throw new TypeError('expected function');
            }),
            (t.fn.bind = function(t, e, n) {
                return this.on(t, e, n);
            }),
            (t.fn.unbind = function(t, e) {
                return this.off(t, e);
            }),
            (t.fn.one = function(t, e, n, r) {
                return this.on(t, e, n, r, 1);
            });
        var w = function() {
                return !0;
            },
            E = function() {
                return !1;
            },
            j = /^([A-Z]|returnValue$|layer[XY]$)/,
            S = {
                preventDefault: 'isDefaultPrevented',
                stopImmediatePropagation: 'isImmediatePropagationStopped',
                stopPropagation: 'isPropagationStopped'
            };
        (t.fn.delegate = function(t, e, n) {
            return this.on(e, t, n);
        }),
            (t.fn.undelegate = function(t, e, n) {
                return this.off(e, t, n);
            }),
            (t.fn.live = function(e, n) {
                return t(document.body).delegate(this.selector, e, n), this;
            }),
            (t.fn.die = function(e, n) {
                return t(document.body).undelegate(this.selector, e, n), this;
            }),
            (t.fn.on = function(e, n, r, i, o) {
                var a,
                    c,
                    h = this;
                return e && !m(e)
                    ? (t.each(e, function(t, e) {
                          h.on(t, n, r, e, o);
                      }),
                      h)
                    : (m(n) || d(i) || i === !1 || ((i = r), (r = n), (n = f)),
                      (d(r) || r === !1) && ((i = r), (r = f)),
                      i === !1 && (i = E),
                      h.each(function(f, h) {
                          o &&
                              (a = function(t) {
                                  return u(h, t.type, i), i.apply(this, arguments);
                              }),
                              n &&
                                  (c = function(e) {
                                      var r,
                                          o = t(e.target).closest(n, h).get(0);
                                      return o && o !== h
                                          ? ((r = t.extend(l(e), {currentTarget: o, liveFired: h})),
                                            (a || i).apply(o, [r].concat(p.call(arguments, 1))))
                                          : void 0;
                                  }),
                              s(h, e, i, r, n, c || a);
                      }));
            }),
            (t.fn.off = function(e, n, r) {
                var i = this;
                return e && !m(e)
                    ? (t.each(e, function(t, e) {
                          i.off(t, n, e);
                      }),
                      i)
                    : (m(n) || d(r) || r === !1 || ((r = n), (n = f)),
                      r === !1 && (r = E),
                      i.each(function() {
                          u(this, e, r, n);
                      }));
            }),
            (t.fn.trigger = function(e, n) {
                return (
                    (e = m(e) || t.isPlainObject(e) ? t.Event(e) : c(e)),
                    (e._args = n),
                    this.each(function() {
                        'dispatchEvent' in this ? this.dispatchEvent(e) : t(this).triggerHandler(e, n);
                    })
                );
            }),
            (t.fn.triggerHandler = function(e, r) {
                var i, o;
                return (
                    this.each(function(a, s) {
                        (i = l(m(e) ? t.Event(e) : e)),
                            (i._args = r),
                            (i.target = s),
                            t.each(n(s, e.type || e), function(t, e) {
                                return (o = e.proxy(i)), !i.isImmediatePropagationStopped() && void 0;
                            });
                    }),
                    o
                );
            }),
            'focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select keydown keypress keyup error'
                .split(' ')
                .forEach(function(e) {
                    t.fn[e] = function(t) {
                        return t ? this.bind(e, t) : this.trigger(e);
                    };
                }),
            ['focus', 'blur'].forEach(function(e) {
                t.fn[e] = function(t) {
                    return (
                        t
                            ? this.bind(e, t)
                            : this.each(function() {
                                  try {
                                      this[e]();
                                  } catch (t) {}
                              }),
                        this
                    );
                };
            }),
            (t.Event = function(t, e) {
                m(t) || ((e = t), (t = e.type));
                var n = document.createEvent(g[t] || 'Events'),
                    r = !0;
                if (e) for (var i in e) 'bubbles' == i ? (r = !!e[i]) : (n[i] = e[i]);
                return n.initEvent(t, r, !0), c(n);
            });
    })(Zepto),
    (function(t) {
        function e(e, n, r) {
            var i = t.Event(n);
            return t(e).trigger(i, r), !i.isDefaultPrevented();
        }
        function n(t, n, r, i) {
            return t.global ? e(n || y, r, i) : void 0;
        }
        function r(e) {
            e.global && 0 === t.active++ && n(e, null, 'ajaxStart');
        }
        function i(e) {
            e.global && !--t.active && n(e, null, 'ajaxStop');
        }
        function o(t, e) {
            var r = e.context;
            return (
                e.beforeSend.call(r, t, e) !== !1 &&
                n(e, r, 'ajaxBeforeSend', [t, e]) !== !1 &&
                void n(e, r, 'ajaxSend', [t, e])
            );
        }
        function a(t, e, r, i) {
            var o = r.context,
                a = 'success';
            r.success.call(o, t, a, e), i && i.resolveWith(o, [t, a, e]), n(r, o, 'ajaxSuccess', [e, r, t]), u(a, e, r);
        }
        function s(t, e, r, i, o) {
            var a = i.context;
            i.error.call(a, r, e, t), o && o.rejectWith(a, [r, e, t]), n(i, a, 'ajaxError', [r, i, t || e]), u(e, r, i);
        }
        function u(t, e, r) {
            var o = r.context;
            r.complete.call(o, e, t), n(r, o, 'ajaxComplete', [e, r]), i(r);
        }
        function c() {}
        function l(t) {
            return (
                t && (t = t.split(';', 2)[0]),
                (t && (t == j ? 'html' : t == E ? 'json' : b.test(t) ? 'script' : w.test(t) && 'xml')) || 'text'
            );
        }
        function f(t, e) {
            return '' == e ? t : (t + '&' + e).replace(/[&?]{1,2}/, '?');
        }
        function h(e) {
            e.processData && e.data && 'string' != t.type(e.data) && (e.data = t.param(e.data, e.traditional)),
                !e.data || (e.type && 'GET' != e.type.toUpperCase()) || ((e.url = f(e.url, e.data)), (e.data = void 0));
        }
        function p(e, n, r, i) {
            return (
                t.isFunction(n) && ((i = r), (r = n), (n = void 0)),
                t.isFunction(r) || ((i = r), (r = void 0)),
                {url: e, data: n, success: r, dataType: i}
            );
        }
        function d(e, n, r, i) {
            var o,
                a = t.isArray(n),
                s = t.isPlainObject(n);
            t.each(n, function(n, u) {
                (o = t.type(u)),
                    i && (n = r ? i : i + '[' + (s || 'object' == o || 'array' == o ? n : '') + ']'),
                    !i && a
                        ? e.add(u.name, u.value)
                        : 'array' == o || (!r && 'object' == o) ? d(e, u, r, n) : e.add(n, u);
            });
        }
        var m,
            v,
            g = 0,
            y = window.document,
            x = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
            b = /^(?:text|application)\/javascript/i,
            w = /^(?:text|application)\/xml/i,
            E = 'application/json',
            j = 'text/html',
            S = /^\s*$/;
        (t.active = 0),
            (t.ajaxJSONP = function(e, n) {
                if (!('type' in e)) return t.ajax(e);
                var r,
                    i,
                    u = e.jsonpCallback,
                    c = (t.isFunction(u) ? u() : u) || 'jsonp' + ++g,
                    l = y.createElement('script'),
                    f = window[c],
                    h = function(e) {
                        t(l).triggerHandler('error', e || 'abort');
                    },
                    p = {abort: h};
                return (
                    n && n.promise(p),
                    t(l).on('load error', function(o, u) {
                        clearTimeout(i),
                            t(l).off().remove(),
                            'error' != o.type && r ? a(r[0], p, e, n) : s(null, u || 'error', p, e, n),
                            (window[c] = f),
                            r && t.isFunction(f) && f(r[0]),
                            (f = r = void 0);
                    }),
                    o(p, e) === !1
                        ? (h('abort'), p)
                        : ((window[c] = function() {
                              r = arguments;
                          }),
                          (l.src = e.url.replace(/\?(.+)=\?/, '?$1=' + c)),
                          y.head.appendChild(l),
                          e.timeout > 0 &&
                              (i = setTimeout(function() {
                                  h('timeout');
                              }, e.timeout)),
                          p)
                );
            }),
            (t.ajaxSettings = {
                type: 'GET',
                beforeSend: c,
                success: c,
                error: c,
                complete: c,
                context: null,
                global: !0,
                xhr: function() {
                    return new window.XMLHttpRequest();
                },
                accepts: {
                    script: 'text/javascript, application/javascript, application/x-javascript',
                    json: E,
                    xml: 'application/xml, text/xml',
                    html: j,
                    text: 'text/plain'
                },
                crossDomain: !1,
                timeout: 0,
                processData: !0,
                cache: !0
            }),
            (t.ajax = function(e) {
                var n = t.extend({}, e || {}),
                    i = t.Deferred && t.Deferred();
                for (m in t.ajaxSettings) void 0 === n[m] && (n[m] = t.ajaxSettings[m]);
                r(n),
                    n.crossDomain ||
                        (n.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(n.url) && RegExp.$2 != window.location.host),
                    n.url || (n.url = window.location.toString()),
                    h(n);
                var u = n.dataType,
                    p = /\?.+=\?/.test(n.url);
                if (
                    (p && (u = 'jsonp'),
                    (n.cache !== !1 && ((e && e.cache === !0) || ('script' != u && 'jsonp' != u))) ||
                        (n.url = f(n.url, '_=' + Date.now())),
                    'jsonp' == u)
                )
                    return (
                        p || (n.url = f(n.url, n.jsonp ? n.jsonp + '=?' : n.jsonp === !1 ? '' : 'callback=?')),
                        t.ajaxJSONP(n, i)
                    );
                var d,
                    g = n.accepts[u],
                    y = {},
                    x = function(t, e) {
                        y[t.toLowerCase()] = [t, e];
                    },
                    b = /^([\w-]+:)\/\//.test(n.url) ? RegExp.$1 : window.location.protocol,
                    w = n.xhr(),
                    E = w.setRequestHeader;
                if (
                    (i && i.promise(w),
                    n.crossDomain || x('X-Requested-With', 'XMLHttpRequest'),
                    x('Accept', g || '*/*'),
                    (g = n.mimeType || g) &&
                        (g.indexOf(',') > -1 && (g = g.split(',', 2)[0]), w.overrideMimeType && w.overrideMimeType(g)),
                    (n.contentType || (n.contentType !== !1 && n.data && 'GET' != n.type.toUpperCase())) &&
                        x('Content-Type', n.contentType || 'application/x-www-form-urlencoded'),
                    n.headers)
                )
                    for (v in n.headers) x(v, n.headers[v]);
                if (
                    ((w.setRequestHeader = x),
                    (w.onreadystatechange = function() {
                        if (4 == w.readyState) {
                            (w.onreadystatechange = c), clearTimeout(d);
                            var e,
                                r = !1;
                            if (
                                (w.status >= 200 && w.status < 300) ||
                                304 == w.status ||
                                (0 == w.status && 'file:' == b)
                            ) {
                                (u = u || l(n.mimeType || w.getResponseHeader('content-type'))), (e = w.responseText);
                                try {
                                    'script' == u
                                        ? (0, eval)(e)
                                        : 'xml' == u
                                          ? (e = w.responseXML)
                                          : 'json' == u && (e = S.test(e) ? null : t.parseJSON(e));
                                } catch (o) {
                                    r = o;
                                }
                                r ? s(r, 'parsererror', w, n, i) : a(e, w, n, i);
                            } else s(w.statusText || null, w.status ? 'error' : 'abort', w, n, i);
                        }
                    }),
                    o(w, n) === !1)
                )
                    return w.abort(), s(null, 'abort', w, n, i), w;
                if (n.xhrFields) for (v in n.xhrFields) w[v] = n.xhrFields[v];
                var j = !('async' in n) || n.async;
                w.open(n.type, n.url, j, n.username, n.password);
                for (v in y) E.apply(w, y[v]);
                return (
                    n.timeout > 0 &&
                        (d = setTimeout(function() {
                            (w.onreadystatechange = c), w.abort(), s(null, 'timeout', w, n, i);
                        }, n.timeout)),
                    w.send(n.data ? n.data : null),
                    w
                );
            }),
            (t.get = function() {
                return t.ajax(p.apply(null, arguments));
            }),
            (t.post = function() {
                var e = p.apply(null, arguments);
                return (e.type = 'POST'), t.ajax(e);
            }),
            (t.getJSON = function() {
                var e = p.apply(null, arguments);
                return (e.dataType = 'json'), t.ajax(e);
            }),
            (t.fn.load = function(e, n, r) {
                if (!this.length) return this;
                var i,
                    o = this,
                    a = e.split(/\s/),
                    s = p(e, n, r),
                    u = s.success;
                return (
                    a.length > 1 && ((s.url = a[0]), (i = a[1])),
                    (s.success = function(e) {
                        o.html(i ? t('<div>').html(e.replace(x, '')).find(i) : e), u && u.apply(o, arguments);
                    }),
                    t.ajax(s),
                    this
                );
            });
        var T = encodeURIComponent;
        t.param = function(t, e) {
            var n = [];
            return (
                (n.add = function(t, e) {
                    this.push(T(t) + '=' + T(e));
                }),
                d(n, t, e),
                n.join('&').replace(/%20/g, '+')
            );
        };
    })(Zepto),
    (function(t) {
        (t.fn.serializeArray = function() {
            var e,
                n = [];
            return (
                t([].slice.call(this.get(0).elements)).each(function() {
                    e = t(this);
                    var r = e.attr('type');
                    'fieldset' != this.nodeName.toLowerCase() &&
                        !this.disabled &&
                        'submit' != r &&
                        'reset' != r &&
                        'button' != r &&
                        (('radio' != r && 'checkbox' != r) || this.checked) &&
                        n.push({name: e.attr('name'), value: e.val()});
                }),
                n
            );
        }),
            (t.fn.serialize = function() {
                var t = [];
                return (
                    this.serializeArray().forEach(function(e) {
                        t.push(encodeURIComponent(e.name) + '=' + encodeURIComponent(e.value));
                    }),
                    t.join('&')
                );
            }),
            (t.fn.submit = function(e) {
                if (e) this.bind('submit', e);
                else if (this.length) {
                    var n = t.Event('submit');
                    this.eq(0).trigger(n), n.isDefaultPrevented() || this.get(0).submit();
                }
                return this;
            });
    })(Zepto),
    (function(t) {
        '__proto__' in {} ||
            t.extend(t.zepto, {
                Z: function(e, n) {
                    return (e = e || []), t.extend(e, t.fn), (e.selector = n || ''), (e.__Z = !0), e;
                },
                isZ: function(e) {
                    return 'array' === t.type(e) && '__Z' in e;
                }
            });
        try {
            getComputedStyle(void 0);
        } catch (e) {
            var n = getComputedStyle;
            window.getComputedStyle = function(t) {
                try {
                    return n(t);
                } catch (e) {
                    return null;
                }
            };
        }
    })(Zepto);

//     Zepto.fx.js
//     (c) 2010-2016 Thomas Fuchs
//     Zepto.js may be freely distributed under the MIT license.

(function($, undefined) {
    var prefix = '',
        eventPrefix,
        vendors = {Webkit: 'webkit', Moz: '', O: 'o'},
        testEl = document.createElement('div'),
        supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
        transform,
        transitionProperty,
        transitionDuration,
        transitionTiming,
        transitionDelay,
        animationName,
        animationDuration,
        animationTiming,
        animationDelay,
        cssReset = {};

    function dasherize(str) {
        return str.replace(/([A-Z])/g, '-$1').toLowerCase();
    }
    function normalizeEvent(name) {
        return eventPrefix ? eventPrefix + name : name.toLowerCase();
    }

    if (testEl.style.transform === undefined)
        $.each(vendors, function(vendor, event) {
            if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
                prefix = '-' + vendor.toLowerCase() + '-';
                eventPrefix = event;
                return false;
            }
        });

    transform = prefix + 'transform';
    cssReset[(transitionProperty = prefix + 'transition-property')] = cssReset[
        (transitionDuration = prefix + 'transition-duration')
    ] = cssReset[(transitionDelay = prefix + 'transition-delay')] = cssReset[
        (transitionTiming = prefix + 'transition-timing-function')
    ] = cssReset[(animationName = prefix + 'animation-name')] = cssReset[
        (animationDuration = prefix + 'animation-duration')
    ] = cssReset[(animationDelay = prefix + 'animation-delay')] = cssReset[
        (animationTiming = prefix + 'animation-timing-function')
    ] =
        '';

    $.fx = {
        off: eventPrefix === undefined && testEl.style.transitionProperty === undefined,
        speeds: {_default: 400, fast: 200, slow: 600},
        cssPrefix: prefix,
        transitionEnd: normalizeEvent('TransitionEnd'),
        animationEnd: normalizeEvent('AnimationEnd')
    };

    $.fn.animate = function(properties, duration, ease, callback, delay) {
        if ($.isFunction(duration)) (callback = duration), (ease = undefined), (duration = undefined);
        if ($.isFunction(ease)) (callback = ease), (ease = undefined);
        if ($.isPlainObject(duration))
            (ease = duration.easing),
                (callback = duration.complete),
                (delay = duration.delay),
                (duration = duration.duration);
        if (duration)
            duration = (typeof duration == 'number' ? duration : $.fx.speeds[duration] || $.fx.speeds._default) / 1000;
        if (delay) delay = parseFloat(delay) / 1000;
        return this.anim(properties, duration, ease, callback, delay);
    };

    $.fn.anim = function(properties, duration, ease, callback, delay) {
        var key,
            cssValues = {},
            cssProperties,
            transforms = '',
            that = this,
            wrappedCallback,
            endEvent = $.fx.transitionEnd,
            fired = false;

        if (duration === undefined) duration = $.fx.speeds._default / 1000;
        if (delay === undefined) delay = 0;
        if ($.fx.off) duration = 0;

        if (typeof properties == 'string') {
            // keyframe animation
            cssValues[animationName] = properties;
            cssValues[animationDuration] = duration + 's';
            cssValues[animationDelay] = delay + 's';
            cssValues[animationTiming] = ease || 'linear';
            endEvent = $.fx.animationEnd;
        } else {
            cssProperties = [];
            // CSS transitions
            for (key in properties)
                if (supportedTransforms.test(key)) transforms += key + '(' + properties[key] + ') ';
                else (cssValues[key] = properties[key]), cssProperties.push(dasherize(key));

            if (transforms) (cssValues[transform] = transforms), cssProperties.push(transform);
            if (duration > 0 && typeof properties === 'object') {
                cssValues[transitionProperty] = cssProperties.join(', ');
                cssValues[transitionDuration] = duration + 's';
                cssValues[transitionDelay] = delay + 's';
                cssValues[transitionTiming] = ease || 'linear';
            }
        }

        wrappedCallback = function(event) {
            if (typeof event !== 'undefined') {
                if (event.target !== event.currentTarget) return; // makes sure the event didn't bubble from "below"
                $(event.target).unbind(endEvent, wrappedCallback);
            } else $(this).unbind(endEvent, wrappedCallback); // triggered by setTimeout

            fired = true;
            $(this).css(cssReset);
            callback && callback.call(this);
        };
        if (duration > 0) {
            this.bind(endEvent, wrappedCallback);
            // transitionEnd is not always firing on older Android phones
            // so make sure it gets fired
            setTimeout(function() {
                if (fired) return;
                wrappedCallback.call(that);
            }, (duration + delay) * 1000 + 25);
        }

        // trigger page reflow so new elements can animate
        this.size() && this.get(0).clientLeft;

        this.css(cssValues);

        if (duration <= 0)
            setTimeout(function() {
                that.each(function() {
                    wrappedCallback.call(this);
                });
            }, 0);

        return this;
    };

    testEl = null;
})(Zepto);
