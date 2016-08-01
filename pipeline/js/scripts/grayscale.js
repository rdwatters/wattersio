/*! Gray v1.4.5 https://github.com/karlhorky/gray) | MIT */
/*! Modernizr 2.8.3 (Custom Build) | MIT & BSD */
/* Build: http://modernizr.com/download/#-inlinesvg-prefixes-css_filters-svg_filters
 */
/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssfilters-setclasses !*/
! function(e, n, t) {
    function r(e, n) {
        return typeof e === n
    }

    function s() {
        var e, n, t, s, o, i, a;
        for (var l in C)
            if (C.hasOwnProperty(l)) {
                if (e = [], n = C[l], n.name && (e.push(n.name.toLowerCase()), n.options && n.options.aliases && n.options.aliases.length))
                    for (t = 0; t < n.options.aliases.length; t++) e.push(n.options.aliases[t].toLowerCase());
                for (s = r(n.fn, "function") ? n.fn() : n.fn, o = 0; o < e.length; o++) i = e[o], a = i.split("."), 1 === a.length ? Modernizr[a[0]] = s : (!Modernizr[a[0]] || Modernizr[a[0]] instanceof Boolean || (Modernizr[a[0]] = new Boolean(Modernizr[a[0]])), Modernizr[a[0]][a[1]] = s), g.push((s ? "" : "no-") + a.join("-"))
            }
    }

    function o(e) {
        var n = w.className,
            t = Modernizr._config.classPrefix || "";
        if (_ && (n = n.baseVal), Modernizr._config.enableJSClass) {
            var r = new RegExp("(^|\\s)" + t + "no-js(\\s|$)");
            n = n.replace(r, "$1" + t + "js$2")
        }
        Modernizr._config.enableClasses && (n += " " + t + e.join(" " + t), _ ? w.className.baseVal = n : w.className = n)
    }

    function i() {
        return "function" != typeof n.createElement ? n.createElement(arguments[0]) : _ ? n.createElementNS.call(n, "http://www.w3.org/2000/svg", arguments[0]) : n.createElement.apply(n, arguments)
    }

    function a(e, n) {
        return function() {
            return e.apply(n, arguments)
        }
    }

    function l(e, n, t) {
        var s;
        for (var o in e)
            if (e[o] in n) return t === !1 ? e[o] : (s = n[e[o]], r(s, "function") ? a(s, t || n) : s);
        return !1
    }

    function f(e, n) {
        return !!~("" + e).indexOf(n)
    }

    function u(e) {
        return e.replace(/([a-z])-([a-z])/g, function(e, n, t) {
            return n + t.toUpperCase()
        }).replace(/^-/, "")
    }

    function p(e) {
        return e.replace(/([A-Z])/g, function(e, n) {
            return "-" + n.toLowerCase()
        }).replace(/^ms-/, "-ms-")
    }

    function d() {
        var e = n.body;
        return e || (e = i(_ ? "svg" : "body"), e.fake = !0), e
    }

    function c(e, t, r, s) {
        var o, a, l, f, u = "modernizr",
            p = i("div"),
            c = d();
        if (parseInt(r, 10))
            for (; r--;) l = i("div"), l.id = s ? s[r] : u + (r + 1), p.appendChild(l);
        return o = i("style"), o.type = "text/css", o.id = "s" + u, (c.fake ? c : p).appendChild(o), c.appendChild(p), o.styleSheet ? o.styleSheet.cssText = e : o.appendChild(n.createTextNode(e)), p.id = u, c.fake && (c.style.background = "", c.style.overflow = "hidden", f = w.style.overflow, w.style.overflow = "hidden", w.appendChild(c)), a = t(p, e), c.fake ? (c.parentNode.removeChild(c), w.style.overflow = f, w.offsetHeight) : p.parentNode.removeChild(p), !!a
    }

    function m(n, r) {
        var s = n.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; s--;)
                if (e.CSS.supports(p(n[s]), r)) return !0;
            return !1
        }
        if ("CSSSupportsRule" in e) {
            for (var o = []; s--;) o.push("(" + p(n[s]) + ":" + r + ")");
            return o = o.join(" or "), c("@supports (" + o + ") { #modernizr { position: absolute; } }", function(e) {
                return "absolute" == getComputedStyle(e, null).position
            })
        }
        return t
    }

    function h(e, n, s, o) {
        function a() { p && (delete j.style, delete j.modElem) }
        if (o = r(o, "undefined") ? !1 : o, !r(s, "undefined")) {
            var l = m(e, s);
            if (!r(l, "undefined")) return l
        }
        for (var p, d, c, h, v, y = ["modernizr", "tspan", "samp"]; !j.style && y.length;) p = !0, j.modElem = i(y.shift()), j.style = j.modElem.style;
        for (c = e.length, d = 0; c > d; d++)
            if (h = e[d], v = j.style[h], f(h, "-") && (h = u(h)), j.style[h] !== t) {
                if (o || r(s, "undefined")) return a(), "pfx" == n ? h : !0;
                try { j.style[h] = s } catch (g) {}
                if (j.style[h] != v) return a(), "pfx" == n ? h : !0
            }
        return a(), !1
    }

    function v(e, n, t, s, o) {
        var i = e.charAt(0).toUpperCase() + e.slice(1),
            a = (e + " " + E.join(i + " ") + i).split(" ");
        return r(n, "string") || r(n, "undefined") ? h(a, n, s, o) : (a = (e + " " + T.join(i + " ") + i).split(" "), l(a, n, t))
    }

    function y(e, n, r) {
        return v(e, t, t, n, r)
    }
    var g = [],
        C = [],
        S = {
            _version: "3.3.1",
            _config: { classPrefix: "", enableClasses: !0, enableJSClass: !0, usePrefixes: !0 },
            _q: [],
            on: function(e, n) {
                var t = this;
                setTimeout(function() { n(t[e]) }, 0)
            },
            addTest: function(e, n, t) { C.push({ name: e, fn: n, options: t }) },
            addAsyncTest: function(e) { C.push({ name: null, fn: e }) }
        },
        Modernizr = function() {};
    Modernizr.prototype = S, Modernizr = new Modernizr;
    var w = n.documentElement,
        _ = "svg" === w.nodeName.toLowerCase(),
        x = "CSS" in e && "supports" in e.CSS,
        b = "supportsCSS" in e;
    Modernizr.addTest("supports", x || b);
    var P = S._config.usePrefixes ? " -webkit- -moz- -o- -ms- ".split(" ") : ["", ""];
    S._prefixes = P;
    var z = "Moz O ms Webkit",
        E = S._config.usePrefixes ? z.split(" ") : [];
    S._cssomPrefixes = E;
    var T = S._config.usePrefixes ? z.toLowerCase().split(" ") : [];
    S._domPrefixes = T;
    var N = { elem: i("modernizr") };
    Modernizr._q.push(function() { delete N.elem });
    var j = { style: N.elem.style };
    Modernizr._q.unshift(function() { delete j.style }), S.testAllProps = v, S.testAllProps = y, Modernizr.addTest("cssfilters", function() {
        if (Modernizr.supports) return y("filter", "blur(2px)");
        var e = i("a");
        return e.style.cssText = P.join("filter:blur(2px); "), !!e.style.length && (n.documentMode === t || n.documentMode > 9)
    }), s(), o(g), delete S.addTest, delete S.addAsyncTest;
    for (var k = 0; k < Modernizr._q.length; k++) Modernizr._q[k]();
    e.Modernizr = Modernizr
}(window, document);
(function($, window, document, undefined) {

    var pluginName = 'gray',
        defaults = {
            fade: false,
            classes: {
                fade: 'grayscale-fade'
            }
        };

    function Plugin(element, options) {
        var classes,
            fadeClass;

        options = options || {};

        classes = options.classes || {};
        fadeClass = classes.fade || defaults.classes.fade;
        options.fade = options.fade || element.className.indexOf(fadeClass) > -1;

        this.element = element;
        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {

        init: function() {
            var element;

            if (!Modernizr.cssfilters &&
                Modernizr.inlinesvg &&
                Modernizr.svgfilters
            ) {
                element = $(this.element);

                if (this.cssFilterDeprecated(element) || this.settings.fade) {
                    this.switchImage(element);
                }
            }
        },

        // TODO: Test a freshly made element (modernizr feature test?)
        // instead of testing the active element (fragile)
        cssFilterDeprecated: function(element) {
            return element.css('filter') === 'none';
        },

        elementType: function(element) {
            return element.prop('tagName') === 'IMG' ? 'Img' : 'Bg';
        },

        pxToNumber: function(pxString) {
            return parseInt(pxString.replace('px', ''));
        },

        getComputedStyle: function(element) {
            var computedStyle = {},
                styles = {};

            computedStyle = window.getComputedStyle(element, null);

            for (var i = 0, length = computedStyle.length; i < length; i++) {
                var prop = computedStyle[i];
                var val = computedStyle.getPropertyValue(prop);
                styles[prop] = val;
            }

            return styles;
        },

        extractUrl: function(backgroundImage) {
            var url,
                regex;

            startRegex = /^url\(["']?/;
            endRegex = /["']?\)$/;
            url = backgroundImage.replace(startRegex, '')
                .replace(endRegex, '');

            return url;
        },

        positionToNegativeMargin: function(backgroundPosition) {
            var x,
                y,
                margin;

            x = backgroundPosition.match(/^(-?\d+\S+)/)[0];
            y = backgroundPosition.match(/\s(-?\d+\S+)$/)[0];

            margin = 'margin:' + y + ' 0 0 ' + x;

            return margin;
        },

        getBgSize: function(url, backgroundSize) {
            var img,
                ratio,
                defaultW,
                w,
                defaultH,
                h,
                size;

            img = new Image();
            img.src = url;

            // TODO: Break this up or simplify
            if (backgroundSize !== 'auto' && backgroundSize !== 'cover' && backgroundSize !== 'contain' && backgroundSize !== 'inherit') {
                var $element = $(this.element);

                ratio = img.width / img.height;
                w = parseInt((backgroundSize.match(/^(\d+)px/) || [0, 0])[1]);
                h = parseInt((backgroundSize.match(/\s(\d+)px$/) || [0, 0])[1]);
                defaultW = $element.height() * ratio;
                defaultH = $element.width() / ratio;
                w = w || defaultW;
                h = h || defaultH;
            }

            if (w || h) {
                size = {
                    width: w,
                    height: h
                };
            } else {
                size = {
                    width: img.width,
                    height: img.height
                };
            }

            return size;
        },

        getImgParams: function(element) {
            var params = {};

            params.styles = this.getComputedStyle(element[0]);

            var padding = {
                top: this.pxToNumber(params.styles['padding-top']),
                right: this.pxToNumber(params.styles['padding-right']),
                bottom: this.pxToNumber(params.styles['padding-bottom']),
                left: this.pxToNumber(params.styles['padding-left'])
            };

            var borderWidth = {
                top: this.pxToNumber(params.styles['border-top-width']),
                right: this.pxToNumber(params.styles['border-right-width']),
                bottom: this.pxToNumber(params.styles['border-bottom-width']),
                left: this.pxToNumber(params.styles['border-left-width'])
            };

            params.image = {
                width: this.pxToNumber(params.styles.width),
                height: this.pxToNumber(params.styles.height)
            };

            params.svg = {
                url: element[0].src,
                padding: padding,
                borderWidth: borderWidth,
                width: params.image.width +
                    padding.left +
                    padding.right +
                    borderWidth.left +
                    borderWidth.right,
                height: params.image.height +
                    padding.top +
                    padding.bottom +
                    borderWidth.top +
                    borderWidth.bottom,
                offset: ''
            };

            return params;
        },

        getBgParams: function(element) {
            var params = {},
                url,
                position;

            url = this.extractUrl(element.css('background-image'));
            bgSize = this.getBgSize(url, element.css('background-size'));
            offset = this.positionToNegativeMargin(element.css('background-position'));

            params.styles = this.getComputedStyle(element[0]);

            params.svg = $.extend({ url: url },
                bgSize, { offset: offset }
            );

            params.image = {
                width: params.svg.width,
                height: params.svg.height
            };

            return params;
        },

        setStyles: function(type, styles, svg, image) {
            styles.display = 'inline-block';
            styles.overflow =
                styles['overflow-x'] =
                styles['overflow-y'] = 'hidden';
            styles['background-image'] = 'url("' + svg.url + '")';
            styles['background-size'] = image.width + 'px ' + image.height + 'px';

            if (type === 'Img') {
                styles['background-repeat'] = 'no-repeat';
                styles['background-position'] = svg.padding.left + 'px ' + svg.padding.top + 'px';
                styles.width = svg.width;
                styles.height = svg.height;
            }

            delete styles.filter;

            return styles;
        },

        // TODO: Run this outside of the plugin so that it's not run
        // on every element
        addSVGFilterOnce: function() {
            $body = $('body');
            if (!$body.data('plugin_' + pluginName + '_has_filter')) {
                $body.data('plugin_' + pluginName + '_has_filter', 'true')
                    .append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="position:absolute"><defs><filter id="gray"><feColorMatrix type="saturate" values="0"/></filter></defs></svg>');
            }
        },

        switchImage: function(element) {
            var type,
                params,
                classes,
                template;

            type = this.elementType(element);
            params = this['get' + type + 'Params'](element);

            classes = this.settings.fade ? this.settings.classes.fade : '';

            template = $(
                '<div class="grayscale grayscale-replaced ' + classes + '">' +
                '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + params.svg.width + ' ' + params.svg.height + '" width="' + params.svg.width + '" height="' + params.svg.height + '" style="' + params.svg.offset + '">' +
                '<image filter="url(&quot;#gray&quot;)" x="0" y="0" width="' + params.image.width + '" height="' + params.image.height + '" preserveAspectRatio="none" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="' + params.svg.url + '" />' +
                '</svg>' +
                '</div>');

            params.styles = this.setStyles(type, params.styles, params.svg, params.image);

            // TODO: Should this really set all params or should we set only unique ones by comparing to a control element?
            template.css(params.styles);

            this.addSVGFilterOnce();
            element.replaceWith(template);
        }
    });
    $.fn[pluginName] = function(options) {
        this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
        return this;
    };

    $(window).on('load', function() {
        $('.grayscale:not(.grayscale-replaced)')[pluginName]();
    });

})(jQuery, window, document);

$('.grayscale').hover(function(){
  $(this).toggleClass('grayscale-off');
});
