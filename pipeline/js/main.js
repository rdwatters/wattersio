//operating system constants
const isMac = navigator.userAgent.indexOf('Mac OS X') != -1 ? true : false;
const theOs = getMobileOperatingSystem();
const isMobile = (theOs == "Android" || theOs == "iOS" || theOs == "Windows Phone");

//simple browser sniff function
function getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }
    return "notmobile";
}
/***********/
// POLYFILLS FOR ES2015 STRING METHODS, CLASSLIST, AND REMOVE()
/***********/

//es2015 string methods *not* transpiled with Babel - .startsWith, .includes, .endsWith
if (!String.prototype.startsWith) {
  String.prototype.startsWith = function(searchString, position) {
    position = position || 0;
    return this.indexOf(searchString, position) === position;
  };
}
if (!String.prototype.includes) {
  String.prototype.includes = function() {'use strict';
    return String.prototype.indexOf.apply(this, arguments) !== -1;
  };
}
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}
//http://purl.eligrey.com/github/classList.js/blob/master/classList.js
//CLASSLIST POLYFILL
if ("document" in self && !("classList" in document.createElement("_"))) {
    (function(j) {
        "use strict";
        if (!("Element" in j)) {
            return
        }
        var a = "classList",
            f = "prototype",
            m = j.Element[f],
            b = Object,
            k = String[f].trim || function() {
                return this.replace(/^\s+|\s+$/g, "")
            }, c = Array[f].indexOf || function(q) {
                var p = 0,
                    o = this.length;
                for (; p < o; p++) {
                    if (p in this && this[p] === q) {
                        return p
                    }
                }
                return -1
            }, n = function(o, p) {
                this.name = o;
                this.code = DOMException[o];
                this.message = p
            }, g = function(p, o) {
                if (o === "") {
                    throw new n("SYNTAX_ERR", "An invalid or illegal string was specified")
                }
                if (/\s/.test(o)) {
                    throw new n("INVALID_CHARACTER_ERR", "String contains an invalid character")
                }
                return c.call(p, o)
            }, d = function(s) {
                var r = k.call(s.getAttribute("class") || ""),
                    q = r ? r.split(/\s+/) : [],
                    p = 0,
                    o = q.length;
                for (; p < o; p++) {
                    this.push(q[p])
                }
                this._updateClassName = function() {
                    s.setAttribute("class", this.toString())
                }
            }, e = d[f] = [],
            i = function() {
                return new d(this)
            };
        n[f] = Error[f];
        e.item = function(o) {
            return this[o] || null
        };
        e.contains = function(o) {
            o += "";
            return g(this, o) !== -1
        };
        e.add = function() {
            var s = arguments,
                r = 0,
                p = s.length,
                q, o = false;
            do {
                q = s[r] + "";
                if (g(this, q) === -1) {
                    this.push(q);
                    o = true
                }
            } while (++r < p);
            if (o) {
                this._updateClassName()
            }
        };
        e.remove = function() {
            var t = arguments,
                s = 0,
                p = t.length,
                r, o = false;
            do {
                r = t[s] + "";
                var q = g(this, r);
                if (q !== -1) {
                    this.splice(q, 1);
                    o = true
                }
            } while (++s < p);
            if (o) {
                this._updateClassName()
            }
        };
        e.toggle = function(p, q) {
            p += "";
            var o = this.contains(p),
                r = o ? q !== true && "remove" : q !== false && "add";
            if (r) {
                this[r](p)
            }
            return !o
        };
        e.toString = function() {
            return this.join(" ")
        };
        if (b.defineProperty) {
            var l = {
                get: i,
                enumerable: true,
                configurable: true
            };
            try {
                b.defineProperty(m, a, l)
            } catch (h) {
                if (h.number === -2146823252) {
                    l.enumerable = false;
                    b.defineProperty(m, a, l)
                }
            }
        } else {
            if (b[f].__defineGetter__) {
                m.__defineGetter__(a, i)
            }
        }
    }(self))
};

//.remove() polyfill
if (!('remove' in Element.prototype)) {
    Element.prototype.remove = function() {
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
    };
}
/*! VelocityJS.org (1.2.3). (C) 2014 Julian Shapiro. MIT @license: en.wikipedia.org/wiki/MIT_License */

/*************************
   Velocity jQuery Shim
*************************/

/*! VelocityJS.org jQuery Shim (1.0.1). (C) 2014 The jQuery Foundation. MIT @license: en.wikipedia.org/wiki/MIT_License. */

/* This file contains the jQuery functions that Velocity relies on, thereby removing Velocity's dependency on a full copy of jQuery, and allowing it to work in any environment. */
/* These shimmed functions are only used if jQuery isn't present. If both this shim and jQuery are loaded, Velocity defaults to jQuery proper. */
/* Browser support: Using this shim instead of jQuery proper removes support for IE8. */

;
(function(window) {
  /***************
       Setup
  ***************/

  /* If jQuery is already loaded, there's no point in loading this shim. */
  if (window.jQuery) {
    return;
  }

  /* jQuery base. */
  var $ = function(selector, context) {
    return new $.fn.init(selector, context);
  };

  /********************
     Private Methods
  ********************/

  /* jQuery */
  $.isWindow = function(obj) {
    /* jshint eqeqeq: false */
    return obj != null && obj == obj.window;
  };

  /* jQuery */
  $.type = function(obj) {
    if (obj == null) {
      return obj + "";
    }

    return typeof obj === "object" || typeof obj === "function" ?
      class2type[toString.call(obj)] || "object" :
      typeof obj;
  };

  /* jQuery */
  $.isArray = Array.isArray || function(obj) {
    return $.type(obj) === "array";
  };

  /* jQuery */
  function isArraylike(obj) {
    var length = obj.length,
      type = $.type(obj);

    if (type === "function" || $.isWindow(obj)) {
      return false;
    }

    if (obj.nodeType === 1 && length) {
      return true;
    }

    return type === "array" || length === 0 || typeof length === "number" && length > 0 && (length - 1) in obj;
  }

  /***************
     $ Methods
  ***************/

  /* jQuery: Support removed for IE<9. */
  $.isPlainObject = function(obj) {
    var key;

    if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
      return false;
    }

    try {
      if (obj.constructor &&
        !hasOwn.call(obj, "constructor") &&
        !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (e) {
      return false;
    }

    for (key in obj) {}

    return key === undefined || hasOwn.call(obj, key);
  };

  /* jQuery */
  $.each = function(obj, callback, args) {
    var value,
      i = 0,
      length = obj.length,
      isArray = isArraylike(obj);

    if (args) {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.apply(obj[i], args);

          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          value = callback.apply(obj[i], args);

          if (value === false) {
            break;
          }
        }
      }

    } else {
      if (isArray) {
        for (; i < length; i++) {
          value = callback.call(obj[i], i, obj[i]);

          if (value === false) {
            break;
          }
        }
      } else {
        for (i in obj) {
          value = callback.call(obj[i], i, obj[i]);

          if (value === false) {
            break;
          }
        }
      }
    }

    return obj;
  };

  /* Custom */
  $.data = function(node, key, value) {
    /* $.getData() */
    if (value === undefined) {
      var id = node[$.expando],
        store = id && cache[id];

      if (key === undefined) {
        return store;
      } else if (store) {
        if (key in store) {
          return store[key];
        }
      }
      /* $.setData() */
    } else if (key !== undefined) {
      var id = node[$.expando] || (node[$.expando] = ++$.uuid);

      cache[id] = cache[id] || {};
      cache[id][key] = value;

      return value;
    }
  };

  /* Custom */
  $.removeData = function(node, keys) {
    var id = node[$.expando],
      store = id && cache[id];

    if (store) {
      $.each(keys, function(_, key) {
        delete store[key];
      });
    }
  };

  /* jQuery */
  $.extend = function() {
    var src, copyIsArray, copy, name, options, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    if (typeof target === "boolean") {
      deep = target;

      target = arguments[i] || {};
      i++;
    }

    if (typeof target !== "object" && $.type(target) !== "function") {
      target = {};
    }

    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];

          if (target === copy) {
            continue;
          }

          if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && $.isArray(src) ? src : [];

            } else {
              clone = src && $.isPlainObject(src) ? src : {};
            }

            target[name] = $.extend(deep, clone, copy);

          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    return target;
  };

  /* jQuery 1.4.3 */
  $.queue = function(elem, type, data) {
    function $makeArray(arr, results) {
      var ret = results || [];

      if (arr != null) {
        if (isArraylike(Object(arr))) {
          /* $.merge */
          (function(first, second) {
            var len = +second.length,
              j = 0,
              i = first.length;

            while (j < len) {
              first[i++] = second[j++];
            }

            if (len !== len) {
              while (second[j] !== undefined) {
                first[i++] = second[j++];
              }
            }

            first.length = i;

            return first;
          })(ret, typeof arr === "string" ? [arr] : arr);
        } else {
          [].push.call(ret, arr);
        }
      }

      return ret;
    }

    if (!elem) {
      return;
    }

    type = (type || "fx") + "queue";

    var q = $.data(elem, type);

    if (!data) {
      return q || [];
    }

    if (!q || $.isArray(data)) {
      q = $.data(elem, type, $makeArray(data));
    } else {
      q.push(data);
    }

    return q;
  };

  /* jQuery 1.4.3 */
  $.dequeue = function(elems, type) {
    /* Custom: Embed element iteration. */
    $.each(elems.nodeType ? [elems] : elems, function(i, elem) {
      type = type || "fx";

      var queue = $.queue(elem, type),
        fn = queue.shift();

      if (fn === "inprogress") {
        fn = queue.shift();
      }

      if (fn) {
        if (type === "fx") {
          queue.unshift("inprogress");
        }

        fn.call(elem, function() {
          $.dequeue(elem, type);
        });
      }
    });
  };

  /******************
     $.fn Methods
  ******************/

  /* jQuery */
  $.fn = $.prototype = {
    init: function(selector) {
      /* Just return the element wrapped inside an array; don't proceed with the actual jQuery node wrapping process. */
      if (selector.nodeType) {
        this[0] = selector;

        return this;
      } else {
        throw new Error("Not a DOM node.");
      }
    },

    offset: function() {
      /* jQuery altered code: Dropped disconnected DOM node checking. */
      var box = this[0].getBoundingClientRect ? this[0].getBoundingClientRect() : { top: 0, left: 0 };

      return {
        top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
        left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
      };
    },

    position: function() {
      /* jQuery */
      function offsetParent() {
        var offsetParent = this.offsetParent || document;

        while (offsetParent && (!offsetParent.nodeType.toLowerCase === "html" && offsetParent.style.position === "static")) {
          offsetParent = offsetParent.offsetParent;
        }

        return offsetParent || document;
      }

      /* Zepto */
      var elem = this[0],
        offsetParent = offsetParent.apply(elem),
        offset = this.offset(),
        parentOffset = /^(?:body|html)$/i.test(offsetParent.nodeName) ? { top: 0, left: 0 } : $(offsetParent).offset()

      offset.top -= parseFloat(elem.style.marginTop) || 0;
      offset.left -= parseFloat(elem.style.marginLeft) || 0;

      if (offsetParent.style) {
        parentOffset.top += parseFloat(offsetParent.style.borderTopWidth) || 0
        parentOffset.left += parseFloat(offsetParent.style.borderLeftWidth) || 0
      }

      return {
        top: offset.top - parentOffset.top,
        left: offset.left - parentOffset.left
      };
    }
  };

  /**********************
     Private Variables
  **********************/

  /* For $.data() */
  var cache = {};
  $.expando = "velocity" + (new Date().getTime());
  $.uuid = 0;

  /* For $.queue() */
  var class2type = {},
    hasOwn = class2type.hasOwnProperty,
    toString = class2type.toString;

  var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
  for (var i = 0; i < types.length; i++) {
    class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
  }

  /* Makes $(node) possible, without having to call init. */
  $.fn.init.prototype = $.fn;

  /* Globalize Velocity onto the window, and assign its Utilities property. */
  window.Velocity = { Utilities: $ };
})(window);

/******************
    Velocity.js
******************/

;
(function(factory) {
  /* CommonJS module. */
  if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = factory();
    /* AMD module. */
  } else if (typeof define === "function" && define.amd) {
    define(factory);
    /* Browser globals. */
  } else {
    factory();
  }
}(function() {
  return function(global, window, document, undefined) {

    /***************
        Summary
    ***************/

    /*
    - CSS: CSS stack that works independently from the rest of Velocity.
    - animate(): Core animation method that iterates over the targeted elements and queues the incoming call onto each element individually.
      - Pre-Queueing: Prepare the element for animation by instantiating its data cache and processing the call's options.
      - Queueing: The logic that runs once the call has reached its point of execution in the element's $.queue() stack.
                  Most logic is placed here to avoid risking it becoming stale (if the element's properties have changed).
      - Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
    - tick(): The single requestAnimationFrame loop responsible for tweening all in-progress calls.
    - completeCall(): Handles the cleanup process for each Velocity call.
    */

    /*********************
       Helper Functions
    *********************/

    /* IE detection. Gist: https://gist.github.com/julianshapiro/9098609 */
    var IE = (function() {
      if (document.documentMode) {
        return document.documentMode;
      } else {
        for (var i = 7; i > 4; i--) {
          var div = document.createElement("div");

          div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";

          if (div.getElementsByTagName("span").length) {
            div = null;

            return i;
          }
        }
      }

      return undefined;
    })();

    /* rAF shim. Gist: https://gist.github.com/julianshapiro/9497513 */
    var rAFShim = (function() {
      var timeLast = 0;

      return window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) {
        var timeCurrent = (new Date()).getTime(),
          timeDelta;

        /* Dynamically set delay on a per-tick basis to match 60fps. */
        /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
        timeDelta = Math.max(0, 16 - (timeCurrent - timeLast));
        timeLast = timeCurrent + timeDelta;

        return setTimeout(function() { callback(timeCurrent + timeDelta); }, timeDelta);
      };
    })();

    /* Array compacting. Copyright Lo-Dash. MIT License: https://github.com/lodash/lodash/blob/master/LICENSE.txt */
    function compactSparseArray(array) {
      var index = -1,
        length = array ? array.length : 0,
        result = [];

      while (++index < length) {
        var value = array[index];

        if (value) {
          result.push(value);
        }
      }

      return result;
    }

    function sanitizeElements(elements) {
      /* Unwrap jQuery/Zepto objects. */
      if (Type.isWrapped(elements)) {
        elements = [].slice.call(elements);
        /* Wrap a single element in an array so that $.each() can iterate with the element instead of its node's children. */
      } else if (Type.isNode(elements)) {
        elements = [elements];
      }

      return elements;
    }

    var Type = {
      isString: function(variable) {
        return (typeof variable === "string");
      },
      isArray: Array.isArray || function(variable) {
        return Object.prototype.toString.call(variable) === "[object Array]";
      },
      isFunction: function(variable) {
        return Object.prototype.toString.call(variable) === "[object Function]";
      },
      isNode: function(variable) {
        return variable && variable.nodeType;
      },
      /* Copyright Martin Bohm. MIT License: https://gist.github.com/Tomalak/818a78a226a0738eaade */
      isNodeList: function(variable) {
        return typeof variable === "object" &&
          /^\[object (HTMLCollection|NodeList|Object)\]$/.test(Object.prototype.toString.call(variable)) &&
          variable.length !== undefined &&
          (variable.length === 0 || (typeof variable[0] === "object" && variable[0].nodeType > 0));
      },
      /* Determine if variable is a wrapped jQuery or Zepto element. */
      isWrapped: function(variable) {
        return variable && (variable.jquery || (window.Zepto && window.Zepto.zepto.isZ(variable)));
      },
      isSVG: function(variable) {
        return window.SVGElement && (variable instanceof window.SVGElement);
      },
      isEmptyObject: function(variable) {
        for (var name in variable) {
          return false;
        }

        return true;
      }
    };

    /*****************
       Dependencies
    *****************/

    var $,
      isJQuery = false;

    if (global.fn && global.fn.jquery) {
      $ = global;
      isJQuery = true;
    } else {
      $ = window.Velocity.Utilities;
    }

    if (IE <= 8 && !isJQuery) {
      throw new Error("Velocity: IE8 and below require jQuery to be loaded before Velocity.");
    } else if (IE <= 7) {
      /* Revert to jQuery's $.animate(), and lose Velocity's extra features. */
      jQuery.fn.velocity = jQuery.fn.animate;

      /* Now that $.fn.velocity is aliased, abort this Velocity declaration. */
      return;
    }

    /*****************
        Constants
    *****************/

    var DURATION_DEFAULT = 400,
      EASING_DEFAULT = "swing";

    /*************
        State
    *************/

    var Velocity = {
      /* Container for page-wide Velocity state data. */
      State: {
        /* Detect mobile devices to determine if mobileHA should be turned on. */
        isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        /* The mobileHA option's behavior changes on older Android devices (Gingerbread, versions 2.3.3-2.3.7). */
        isAndroid: /Android/i.test(navigator.userAgent),
        isGingerbread: /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
        isChrome: window.chrome,
        isFirefox: /Firefox/i.test(navigator.userAgent),
        /* Create a cached element for re-use when checking for CSS property prefixes. */
        prefixElement: document.createElement("div"),
        /* Cache every prefix match to avoid repeating lookups. */
        prefixMatches: {},
        /* Cache the anchor used for animating window scrolling. */
        scrollAnchor: null,
        /* Cache the browser-specific property names associated with the scroll anchor. */
        scrollPropertyLeft: null,
        scrollPropertyTop: null,
        /* Keep track of whether our RAF tick is running. */
        isTicking: false,
        /* Container for every in-progress call to Velocity. */
        calls: []
      },
      /* Velocity's custom CSS stack. Made global for unit testing. */
      CSS: { /* Defined below. */ },
      /* A shim of the jQuery utility functions used by Velocity -- provided by Velocity's optional jQuery shim. */
      Utilities: $,
      /* Container for the user's custom animation redirects that are referenced by name in place of the properties map argument. */
      Redirects: { /* Manually registered by the user. */ },
      Easings: { /* Defined below. */ },
      /* Attempt to use ES6 Promises by default. Users can override this with a third-party promises library. */
      Promise: window.Promise,
      /* Velocity option defaults, which can be overriden by the user. */
      defaults: {
        queue: "",
        duration: DURATION_DEFAULT,
        easing: EASING_DEFAULT,
        begin: undefined,
        complete: undefined,
        progress: undefined,
        display: undefined,
        visibility: undefined,
        loop: false,
        delay: false,
        mobileHA: true,
        /* Advanced: Set to false to prevent property values from being cached between consecutive Velocity-initiated chain calls. */
        _cacheValues: true
      },
      /* A design goal of Velocity is to cache data wherever possible in order to avoid DOM requerying. Accordingly, each element has a data cache. */
      init: function(element) {
        $.data(element, "velocity", {
          /* Store whether this is an SVG element, since its properties are retrieved and updated differently than standard HTML elements. */
          isSVG: Type.isSVG(element),
          /* Keep track of whether the element is currently being animated by Velocity.
             This is used to ensure that property values are not transferred between non-consecutive (stale) calls. */
          isAnimating: false,
          /* A reference to the element's live computedStyle object. Learn more here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
          computedStyle: null,
          /* Tween data is cached for each animation on the element so that data can be passed across calls --
             in particular, end values are used as subsequent start values in consecutive Velocity calls. */
          tweensContainer: null,
          /* The full root property values of each CSS hook being animated on this element are cached so that:
             1) Concurrently-animating hooks sharing the same root can have their root values' merged into one while tweening.
             2) Post-hook-injection root values can be transferred over to consecutively chained Velocity calls as starting root values. */
          rootPropertyValueCache: {},
          /* A cache for transform updates, which must be manually flushed via CSS.flushTransformCache(). */
          transformCache: {}
        });
      },
      /* A parallel to jQuery's $.css(), used for getting/setting Velocity's hooked CSS properties. */
      hook: null,
      /* Defined below. */
      /* Velocity-wide animation time remapping for testing purposes. */
      mock: false,
      version: { major: 1, minor: 2, patch: 2 },
      /* Set to 1 or 2 (most verbose) to output debug info to console. */
      debug: false
    };

    /* Retrieve the appropriate scroll anchor and property name for the browser: https://developer.mozilla.org/en-US/docs/Web/API/Window.scrollY */
    if (window.pageYOffset !== undefined) {
      Velocity.State.scrollAnchor = window;
      Velocity.State.scrollPropertyLeft = "pageXOffset";
      Velocity.State.scrollPropertyTop = "pageYOffset";
    } else {
      Velocity.State.scrollAnchor = document.documentElement || document.body.parentNode || document.body;
      Velocity.State.scrollPropertyLeft = "scrollLeft";
      Velocity.State.scrollPropertyTop = "scrollTop";
    }

    /* Shorthand alias for jQuery's $.data() utility. */
    function Data(element) {
      /* Hardcode a reference to the plugin name. */
      var response = $.data(element, "velocity");

      /* jQuery <=1.4.2 returns null instead of undefined when no match is found. We normalize this behavior. */
      return response === null ? undefined : response;
    };

    /**************
        Easing
    **************/

    /* Step easing generator. */
    function generateStep(steps) {
      return function(p) {
        return Math.round(p * steps) * (1 / steps);
      };
    }

    /* Bezier curve function generator. Copyright Gaetan Renaudeau. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    function generateBezier(mX1, mY1, mX2, mY2) {
      var NEWTON_ITERATIONS = 4,
        NEWTON_MIN_SLOPE = 0.001,
        SUBDIVISION_PRECISION = 0.0000001,
        SUBDIVISION_MAX_ITERATIONS = 10,
        kSplineTableSize = 11,
        kSampleStepSize = 1.0 / (kSplineTableSize - 1.0),
        float32ArraySupported = "Float32Array" in window;

      /* Must contain four arguments. */
      if (arguments.length !== 4) {
        return false;
      }

      /* Arguments must be numbers. */
      for (var i = 0; i < 4; ++i) {
        if (typeof arguments[i] !== "number" || isNaN(arguments[i]) || !isFinite(arguments[i])) {
          return false;
        }
      }

      /* X values must be in the [0, 1] range. */
      mX1 = Math.min(mX1, 1);
      mX2 = Math.min(mX2, 1);
      mX1 = Math.max(mX1, 0);
      mX2 = Math.max(mX2, 0);

      var mSampleValues = float32ArraySupported ? new Float32Array(kSplineTableSize) : new Array(kSplineTableSize);

      function A(aA1, aA2) {
        return 1.0 - 3.0 * aA2 + 3.0 * aA1; }

      function B(aA1, aA2) {
        return 3.0 * aA2 - 6.0 * aA1; }

      function C(aA1) {
        return 3.0 * aA1; }

      function calcBezier(aT, aA1, aA2) {
        return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
      }

      function getSlope(aT, aA1, aA2) {
        return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
      }

      function newtonRaphsonIterate(aX, aGuessT) {
        for (var i = 0; i < NEWTON_ITERATIONS; ++i) {
          var currentSlope = getSlope(aGuessT, mX1, mX2);

          if (currentSlope === 0.0) return aGuessT;

          var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
          aGuessT -= currentX / currentSlope;
        }

        return aGuessT;
      }

      function calcSampleValues() {
        for (var i = 0; i < kSplineTableSize; ++i) {
          mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        }
      }

      function binarySubdivide(aX, aA, aB) {
        var currentX, currentT, i = 0;

        do {
          currentT = aA + (aB - aA) / 2.0;
          currentX = calcBezier(currentT, mX1, mX2) - aX;
          if (currentX > 0.0) {
            aB = currentT;
          } else {
            aA = currentT;
          }
        } while (Math.abs(currentX) > SUBDIVISION_PRECISION && ++i < SUBDIVISION_MAX_ITERATIONS);

        return currentT;
      }

      function getTForX(aX) {
        var intervalStart = 0.0,
          currentSample = 1,
          lastSample = kSplineTableSize - 1;

        for (; currentSample != lastSample && mSampleValues[currentSample] <= aX; ++currentSample) {
          intervalStart += kSampleStepSize;
        }

        --currentSample;

        var dist = (aX - mSampleValues[currentSample]) / (mSampleValues[currentSample + 1] - mSampleValues[currentSample]),
          guessForT = intervalStart + dist * kSampleStepSize,
          initialSlope = getSlope(guessForT, mX1, mX2);

        if (initialSlope >= NEWTON_MIN_SLOPE) {
          return newtonRaphsonIterate(aX, guessForT);
        } else if (initialSlope == 0.0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
        }
      }

      var _precomputed = false;

      function precompute() {
        _precomputed = true;
        if (mX1 != mY1 || mX2 != mY2) calcSampleValues();
      }

      var f = function(aX) {
        if (!_precomputed) precompute();
        if (mX1 === mY1 && mX2 === mY2) return aX;
        if (aX === 0) return 0;
        if (aX === 1) return 1;

        return calcBezier(getTForX(aX), mY1, mY2);
      };

      f.getControlPoints = function() {
        return [{ x: mX1, y: mY1 }, { x: mX2, y: mY2 }]; };

      var str = "generateBezier(" + [mX1, mY1, mX2, mY2] + ")";
      f.toString = function() {
        return str; };

      return f;
    }

    /* Runge-Kutta spring physics function generator. Adapted from Framer.js, copyright Koen Bok. MIT License: http://en.wikipedia.org/wiki/MIT_License */
    /* Given a tension, friction, and duration, a simulation at 60FPS will first run without a defined duration in order to calculate the full path. A second pass
       then adjusts the time delta -- using the relation between actual time and duration -- to calculate the path for the duration-constrained animation. */
    var generateSpringRK4 = (function() {
      function springAccelerationForState(state) {
        return (-state.tension * state.x) - (state.friction * state.v);
      }

      function springEvaluateStateWithDerivative(initialState, dt, derivative) {
        var state = {
          x: initialState.x + derivative.dx * dt,
          v: initialState.v + derivative.dv * dt,
          tension: initialState.tension,
          friction: initialState.friction
        };

        return { dx: state.v, dv: springAccelerationForState(state) };
      }

      function springIntegrateState(state, dt) {
        var a = {
            dx: state.v,
            dv: springAccelerationForState(state)
          },
          b = springEvaluateStateWithDerivative(state, dt * 0.5, a),
          c = springEvaluateStateWithDerivative(state, dt * 0.5, b),
          d = springEvaluateStateWithDerivative(state, dt, c),
          dxdt = 1.0 / 6.0 * (a.dx + 2.0 * (b.dx + c.dx) + d.dx),
          dvdt = 1.0 / 6.0 * (a.dv + 2.0 * (b.dv + c.dv) + d.dv);

        state.x = state.x + dxdt * dt;
        state.v = state.v + dvdt * dt;

        return state;
      }

      return function springRK4Factory(tension, friction, duration) {

        var initState = {
            x: -1,
            v: 0,
            tension: null,
            friction: null
          },
          path = [0],
          time_lapsed = 0,
          tolerance = 1 / 10000,
          DT = 16 / 1000,
          have_duration, dt, last_state;

        tension = parseFloat(tension) || 500;
        friction = parseFloat(friction) || 20;
        duration = duration || null;

        initState.tension = tension;
        initState.friction = friction;

        have_duration = duration !== null;

        /* Calculate the actual time it takes for this animation to complete with the provided conditions. */
        if (have_duration) {
          /* Run the simulation without a duration. */
          time_lapsed = springRK4Factory(tension, friction);
          /* Compute the adjusted time delta. */
          dt = time_lapsed / duration * DT;
        } else {
          dt = DT;
        }

        while (true) {
          /* Next/step function .*/
          last_state = springIntegrateState(last_state || initState, dt);
          /* Store the position. */
          path.push(1 + last_state.x);
          time_lapsed += 16;
          /* If the change threshold is reached, break. */
          if (!(Math.abs(last_state.x) > tolerance && Math.abs(last_state.v) > tolerance)) {
            break;
          }
        }

        /* If duration is not defined, return the actual time required for completing this animation. Otherwise, return a closure that holds the
           computed path and returns a snapshot of the position according to a given percentComplete. */
        return !have_duration ? time_lapsed : function(percentComplete) {
          return path[(percentComplete * (path.length - 1)) | 0]; };
      };
    }());

    /* jQuery easings. */
    Velocity.Easings = {
      linear: function(p) {
        return p; },
      swing: function(p) {
        return 0.5 - Math.cos(p * Math.PI) / 2 },
      /* Bonus "spring" easing, which is a less exaggerated version of easeInOutElastic. */
      spring: function(p) {
        return 1 - (Math.cos(p * 4.5 * Math.PI) * Math.exp(-p * 6)); }
    };

    /* CSS3 and Robert Penner easings. */
    $.each(
      [
        ["ease", [0.25, 0.1, 0.25, 1.0]],
        ["ease-in", [0.42, 0.0, 1.00, 1.0]],
        ["ease-out", [0.00, 0.0, 0.58, 1.0]],
        ["ease-in-out", [0.42, 0.0, 0.58, 1.0]],
        ["easeInSine", [0.47, 0, 0.745, 0.715]],
        ["easeOutSine", [0.39, 0.575, 0.565, 1]],
        ["easeInOutSine", [0.445, 0.05, 0.55, 0.95]],
        ["easeInQuad", [0.55, 0.085, 0.68, 0.53]],
        ["easeOutQuad", [0.25, 0.46, 0.45, 0.94]],
        ["easeInOutQuad", [0.455, 0.03, 0.515, 0.955]],
        ["easeInCubic", [0.55, 0.055, 0.675, 0.19]],
        ["easeOutCubic", [0.215, 0.61, 0.355, 1]],
        ["easeInOutCubic", [0.645, 0.045, 0.355, 1]],
        ["easeInQuart", [0.895, 0.03, 0.685, 0.22]],
        ["easeOutQuart", [0.165, 0.84, 0.44, 1]],
        ["easeInOutQuart", [0.77, 0, 0.175, 1]],
        ["easeInQuint", [0.755, 0.05, 0.855, 0.06]],
        ["easeOutQuint", [0.23, 1, 0.32, 1]],
        ["easeInOutQuint", [0.86, 0, 0.07, 1]],
        ["easeInExpo", [0.95, 0.05, 0.795, 0.035]],
        ["easeOutExpo", [0.19, 1, 0.22, 1]],
        ["easeInOutExpo", [1, 0, 0, 1]],
        ["easeInCirc", [0.6, 0.04, 0.98, 0.335]],
        ["easeOutCirc", [0.075, 0.82, 0.165, 1]],
        ["easeInOutCirc", [0.785, 0.135, 0.15, 0.86]]
      ],
      function(i, easingArray) {
        Velocity.Easings[easingArray[0]] = generateBezier.apply(null, easingArray[1]);
      });

    /* Determine the appropriate easing type given an easing input. */
    function getEasing(value, duration) {
      var easing = value;

      /* The easing option can either be a string that references a pre-registered easing,
         or it can be a two-/four-item array of integers to be converted into a bezier/spring function. */
      if (Type.isString(value)) {
        /* Ensure that the easing has been assigned to jQuery's Velocity.Easings object. */
        if (!Velocity.Easings[value]) {
          easing = false;
        }
      } else if (Type.isArray(value) && value.length === 1) {
        easing = generateStep.apply(null, value);
      } else if (Type.isArray(value) && value.length === 2) {
        /* springRK4 must be passed the animation's duration. */
        /* Note: If the springRK4 array contains non-numbers, generateSpringRK4() returns an easing
           function generated with default tension and friction values. */
        easing = generateSpringRK4.apply(null, value.concat([duration]));
      } else if (Type.isArray(value) && value.length === 4) {
        /* Note: If the bezier array contains non-numbers, generateBezier() returns false. */
        easing = generateBezier.apply(null, value);
      } else {
        easing = false;
      }

      /* Revert to the Velocity-wide default easing type, or fall back to "swing" (which is also jQuery's default)
         if the Velocity-wide default has been incorrectly modified. */
      if (easing === false) {
        if (Velocity.Easings[Velocity.defaults.easing]) {
          easing = Velocity.defaults.easing;
        } else {
          easing = EASING_DEFAULT;
        }
      }

      return easing;
    }

    /*****************
        CSS Stack
    *****************/

    /* The CSS object is a highly condensed and performant CSS stack that fully replaces jQuery's.
       It handles the validation, getting, and setting of both standard CSS properties and CSS property hooks. */
    /* Note: A "CSS" shorthand is aliased so that our code is easier to read. */
    var CSS = Velocity.CSS = {

      /*************
          RegEx
      *************/

      RegEx: {
        isHex: /^#([A-f\d]{3}){1,2}$/i,
        /* Unwrap a property value's surrounding text, e.g. "rgba(4, 3, 2, 1)" ==> "4, 3, 2, 1" and "rect(4px 3px 2px 1px)" ==> "4px 3px 2px 1px". */
        valueUnwrap: /^[A-z]+\((.*)\)$/i,
        wrappedValueAlreadyExtracted: /[0-9.]+ [0-9.]+ [0-9.]+( [0-9.]+)?/,
        /* Split a multi-value property into an array of subvalues, e.g. "rgba(4, 3, 2, 1) 4px 3px 2px 1px" ==> [ "rgba(4, 3, 2, 1)", "4px", "3px", "2px", "1px" ]. */
        valueSplit: /([A-z]+\(.+\))|(([A-z0-9#-.]+?)(?=\s|$))/ig
      },

      /************
          Lists
      ************/

      Lists: {
        colors: ["fill", "stroke", "stopColor", "color", "backgroundColor", "borderColor", "borderTopColor", "borderRightColor", "borderBottomColor", "borderLeftColor", "outlineColor"],
        transformsBase: ["translateX", "translateY", "scale", "scaleX", "scaleY", "skewX", "skewY", "rotateZ"],
        transforms3D: ["transformPerspective", "translateZ", "scaleZ", "rotateX", "rotateY"]
      },

      /************
          Hooks
      ************/

      /* Hooks allow a subproperty (e.g. "boxShadowBlur") of a compound-value CSS property
         (e.g. "boxShadow: X Y Blur Spread Color") to be animated as if it were a discrete property. */
      /* Note: Beyond enabling fine-grained property animation, hooking is necessary since Velocity only
         tweens properties with single numeric values; unlike CSS transitions, Velocity does not interpolate compound-values. */
      Hooks: {
        /********************
            Registration
        ********************/

        /* Templates are a concise way of indicating which subproperties must be individually registered for each compound-value CSS property. */
        /* Each template consists of the compound-value's base name, its constituent subproperty names, and those subproperties' default values. */
        templates: {
          "textShadow": ["Color X Y Blur", "black 0px 0px 0px"],
          "boxShadow": ["Color X Y Blur Spread", "black 0px 0px 0px 0px"],
          "clip": ["Top Right Bottom Left", "0px 0px 0px 0px"],
          "backgroundPosition": ["X Y", "0% 0%"],
          "transformOrigin": ["X Y Z", "50% 50% 0px"],
          "perspectiveOrigin": ["X Y", "50% 50%"]
        },

        /* A "registered" hook is one that has been converted from its template form into a live,
           tweenable property. It contains data to associate it with its root property. */
        registered: {
          /* Note: A registered hook looks like this ==> textShadowBlur: [ "textShadow", 3 ],
             which consists of the subproperty's name, the associated root property's name,
             and the subproperty's position in the root's value. */
        },
        /* Convert the templates into individual hooks then append them to the registered object above. */
        register: function() {
          /* Color hooks registration: Colors are defaulted to white -- as opposed to black -- since colors that are
             currently set to "transparent" default to their respective template below when color-animated,
             and white is typically a closer match to transparent than black is. An exception is made for text ("color"),
             which is almost always set closer to black than white. */
          for (var i = 0; i < CSS.Lists.colors.length; i++) {
            var rgbComponents = (CSS.Lists.colors[i] === "color") ? "0 0 0 1" : "255 255 255 1";
            CSS.Hooks.templates[CSS.Lists.colors[i]] = ["Red Green Blue Alpha", rgbComponents];
          }

          var rootProperty,
            hookTemplate,
            hookNames;

          /* In IE, color values inside compound-value properties are positioned at the end the value instead of at the beginning.
             Thus, we re-arrange the templates accordingly. */
          if (IE) {
            for (rootProperty in CSS.Hooks.templates) {
              hookTemplate = CSS.Hooks.templates[rootProperty];
              hookNames = hookTemplate[0].split(" ");

              var defaultValues = hookTemplate[1].match(CSS.RegEx.valueSplit);

              if (hookNames[0] === "Color") {
                /* Reposition both the hook's name and its default value to the end of their respective strings. */
                hookNames.push(hookNames.shift());
                defaultValues.push(defaultValues.shift());

                /* Replace the existing template for the hook's root property. */
                CSS.Hooks.templates[rootProperty] = [hookNames.join(" "), defaultValues.join(" ")];
              }
            }
          }

          /* Hook registration. */
          for (rootProperty in CSS.Hooks.templates) {
            hookTemplate = CSS.Hooks.templates[rootProperty];
            hookNames = hookTemplate[0].split(" ");

            for (var i in hookNames) {
              var fullHookName = rootProperty + hookNames[i],
                hookPosition = i;

              /* For each hook, register its full name (e.g. textShadowBlur) with its root property (e.g. textShadow)
                 and the hook's position in its template's default value string. */
              CSS.Hooks.registered[fullHookName] = [rootProperty, hookPosition];
            }
          }
        },

        /*****************************
           Injection and Extraction
        *****************************/

        /* Look up the root property associated with the hook (e.g. return "textShadow" for "textShadowBlur"). */
        /* Since a hook cannot be set directly (the browser won't recognize it), style updating for hooks is routed through the hook's root property. */
        getRoot: function(property) {
          var hookData = CSS.Hooks.registered[property];

          if (hookData) {
            return hookData[0];
          } else {
            /* If there was no hook match, return the property name untouched. */
            return property;
          }
        },
        /* Convert any rootPropertyValue, null or otherwise, into a space-delimited list of hook values so that
           the targeted hook can be injected or extracted at its standard position. */
        cleanRootPropertyValue: function(rootProperty, rootPropertyValue) {
          /* If the rootPropertyValue is wrapped with "rgb()", "clip()", etc., remove the wrapping to normalize the value before manipulation. */
          if (CSS.RegEx.valueUnwrap.test(rootPropertyValue)) {
            rootPropertyValue = rootPropertyValue.match(CSS.RegEx.valueUnwrap)[1];
          }

          /* If rootPropertyValue is a CSS null-value (from which there's inherently no hook value to extract),
             default to the root's default value as defined in CSS.Hooks.templates. */
          /* Note: CSS null-values include "none", "auto", and "transparent". They must be converted into their
             zero-values (e.g. textShadow: "none" ==> textShadow: "0px 0px 0px black") for hook manipulation to proceed. */
          if (CSS.Values.isCSSNullValue(rootPropertyValue)) {
            rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
          }

          return rootPropertyValue;
        },
        /* Extracted the hook's value from its root property's value. This is used to get the starting value of an animating hook. */
        extractValue: function(fullHookName, rootPropertyValue) {
          var hookData = CSS.Hooks.registered[fullHookName];

          if (hookData) {
            var hookRoot = hookData[0],
              hookPosition = hookData[1];

            rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

            /* Split rootPropertyValue into its constituent hook values then grab the desired hook at its standard position. */
            return rootPropertyValue.toString().match(CSS.RegEx.valueSplit)[hookPosition];
          } else {
            /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
            return rootPropertyValue;
          }
        },
        /* Inject the hook's value into its root property's value. This is used to piece back together the root property
           once Velocity has updated one of its individually hooked values through tweening. */
        injectValue: function(fullHookName, hookValue, rootPropertyValue) {
          var hookData = CSS.Hooks.registered[fullHookName];

          if (hookData) {
            var hookRoot = hookData[0],
              hookPosition = hookData[1],
              rootPropertyValueParts,
              rootPropertyValueUpdated;

            rootPropertyValue = CSS.Hooks.cleanRootPropertyValue(hookRoot, rootPropertyValue);

            /* Split rootPropertyValue into its individual hook values, replace the targeted value with hookValue,
               then reconstruct the rootPropertyValue string. */
            rootPropertyValueParts = rootPropertyValue.toString().match(CSS.RegEx.valueSplit);
            rootPropertyValueParts[hookPosition] = hookValue;
            rootPropertyValueUpdated = rootPropertyValueParts.join(" ");

            return rootPropertyValueUpdated;
          } else {
            /* If the provided fullHookName isn't a registered hook, return the rootPropertyValue that was passed in. */
            return rootPropertyValue;
          }
        }
      },

      /*******************
         Normalizations
      *******************/

      /* Normalizations standardize CSS property manipulation by pollyfilling browser-specific implementations (e.g. opacity)
         and reformatting special properties (e.g. clip, rgba) to look like standard ones. */
      Normalizations: {
        /* Normalizations are passed a normalization target (either the property's name, its extracted value, or its injected value),
           the targeted element (which may need to be queried), and the targeted property value. */
        registered: {
          clip: function(type, element, propertyValue) {
            switch (type) {
              case "name":
                return "clip";
                /* Clip needs to be unwrapped and stripped of its commas during extraction. */
              case "extract":
                var extracted;

                /* If Velocity also extracted this value, skip extraction. */
                if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                  extracted = propertyValue;
                } else {
                  /* Remove the "rect()" wrapper. */
                  extracted = propertyValue.toString().match(CSS.RegEx.valueUnwrap);

                  /* Strip off commas. */
                  extracted = extracted ? extracted[1].replace(/,(\s+)?/g, " ") : propertyValue;
                }

                return extracted;
                /* Clip needs to be re-wrapped during injection. */
              case "inject":
                return "rect(" + propertyValue + ")";
            }
          },

          blur: function(type, element, propertyValue) {
            switch (type) {
              case "name":
                return Velocity.State.isFirefox ? "filter" : "-webkit-filter";
              case "extract":
                var extracted = parseFloat(propertyValue);

                /* If extracted is NaN, meaning the value isn't already extracted. */
                if (!(extracted || extracted === 0)) {
                  var blurComponent = propertyValue.toString().match(/blur\(([0-9]+[A-z]+)\)/i);

                  /* If the filter string had a blur component, return just the blur value and unit type. */
                  if (blurComponent) {
                    extracted = blurComponent[1];
                    /* If the component doesn't exist, default blur to 0. */
                  } else {
                    extracted = 0;
                  }
                }

                return extracted;
                /* Blur needs to be re-wrapped during injection. */
              case "inject":
                /* For the blur effect to be fully de-applied, it needs to be set to "none" instead of 0. */
                if (!parseFloat(propertyValue)) {
                  return "none";
                } else {
                  return "blur(" + propertyValue + ")";
                }
            }
          },

          /* <=IE8 do not support the standard opacity property. They use filter:alpha(opacity=INT) instead. */
          opacity: function(type, element, propertyValue) {
            if (IE <= 8) {
              switch (type) {
                case "name":
                  return "filter";
                case "extract":
                  /* <=IE8 return a "filter" value of "alpha(opacity=\d{1,3})".
                     Extract the value and convert it to a decimal value to match the standard CSS opacity property's formatting. */
                  var extracted = propertyValue.toString().match(/alpha\(opacity=(.*)\)/i);

                  if (extracted) {
                    /* Convert to decimal value. */
                    propertyValue = extracted[1] / 100;
                  } else {
                    /* When extracting opacity, default to 1 since a null value means opacity hasn't been set. */
                    propertyValue = 1;
                  }

                  return propertyValue;
                case "inject":
                  /* Opacified elements are required to have their zoom property set to a non-zero value. */
                  element.style.zoom = 1;

                  /* Setting the filter property on elements with certain font property combinations can result in a
                     highly unappealing ultra-bolding effect. There's no way to remedy this throughout a tween, but dropping the
                     value altogether (when opacity hits 1) at leasts ensures that the glitch is gone post-tweening. */
                  if (parseFloat(propertyValue) >= 1) {
                    return "";
                  } else {
                    /* As per the filter property's spec, convert the decimal value to a whole number and wrap the value. */
                    return "alpha(opacity=" + parseInt(parseFloat(propertyValue) * 100, 10) + ")";
                  }
              }
              /* With all other browsers, normalization is not required; return the same values that were passed in. */
            } else {
              switch (type) {
                case "name":
                  return "opacity";
                case "extract":
                  return propertyValue;
                case "inject":
                  return propertyValue;
              }
            }
          }
        },

        /*****************************
            Batched Registrations
        *****************************/

        /* Note: Batched normalizations extend the CSS.Normalizations.registered object. */
        register: function() {

          /*****************
              Transforms
          *****************/

          /* Transforms are the subproperties contained by the CSS "transform" property. Transforms must undergo normalization
             so that they can be referenced in a properties map by their individual names. */
          /* Note: When transforms are "set", they are actually assigned to a per-element transformCache. When all transform
             setting is complete complete, CSS.flushTransformCache() must be manually called to flush the values to the DOM.
             Transform setting is batched in this way to improve performance: the transform style only needs to be updated
             once when multiple transform subproperties are being animated simultaneously. */
          /* Note: IE9 and Android Gingerbread have support for 2D -- but not 3D -- transforms. Since animating unsupported
             transform properties results in the browser ignoring the *entire* transform string, we prevent these 3D values
             from being normalized for these browsers so that tweening skips these properties altogether
             (since it will ignore them as being unsupported by the browser.) */
          if (!(IE <= 9) && !Velocity.State.isGingerbread) {
            /* Note: Since the standalone CSS "perspective" property and the CSS transform "perspective" subproperty
            share the same name, the latter is given a unique token within Velocity: "transformPerspective". */
            CSS.Lists.transformsBase = CSS.Lists.transformsBase.concat(CSS.Lists.transforms3D);
          }

          for (var i = 0; i < CSS.Lists.transformsBase.length; i++) {
            /* Wrap the dynamically generated normalization function in a new scope so that transformName's value is
            paired with its respective function. (Otherwise, all functions would take the final for loop's transformName.) */
            (function() {
              var transformName = CSS.Lists.transformsBase[i];

              CSS.Normalizations.registered[transformName] = function(type, element, propertyValue) {
                switch (type) {
                  /* The normalized property name is the parent "transform" property -- the property that is actually set in CSS. */
                  case "name":
                    return "transform";
                    /* Transform values are cached onto a per-element transformCache object. */
                  case "extract":
                    /* If this transform has yet to be assigned a value, return its null value. */
                    if (Data(element) === undefined || Data(element).transformCache[transformName] === undefined) {
                      /* Scale CSS.Lists.transformsBase default to 1 whereas all other transform properties default to 0. */
                      return /^scale/i.test(transformName) ? 1 : 0;
                      /* When transform values are set, they are wrapped in parentheses as per the CSS spec.
                         Thus, when extracting their values (for tween calculations), we strip off the parentheses. */
                    } else {
                      return Data(element).transformCache[transformName].replace(/[()]/g, "");
                    }
                  case "inject":
                    var invalid = false;

                    /* If an individual transform property contains an unsupported unit type, the browser ignores the *entire* transform property.
                       Thus, protect users from themselves by skipping setting for transform values supplied with invalid unit types. */
                    /* Switch on the base transform type; ignore the axis by removing the last letter from the transform's name. */
                    switch (transformName.substr(0, transformName.length - 1)) {
                      /* Whitelist unit types for each transform. */
                      case "translate":
                        invalid = !/(%|px|em|rem|vw|vh|\d)$/i.test(propertyValue);
                        break;
                        /* Since an axis-free "scale" property is supported as well, a little hack is used here to detect it by chopping off its last letter. */
                      case "scal":
                      case "scale":
                        /* Chrome on Android has a bug in which scaled elements blur if their initial scale
                           value is below 1 (which can happen with forcefeeding). Thus, we detect a yet-unset scale property
                           and ensure that its first value is always 1. More info: http://stackoverflow.com/questions/10417890/css3-animations-with-transform-causes-blurred-elements-on-webkit/10417962#10417962 */
                        if (Velocity.State.isAndroid && Data(element).transformCache[transformName] === undefined && propertyValue < 1) {
                          propertyValue = 1;
                        }

                        invalid = !/(\d)$/i.test(propertyValue);
                        break;
                      case "skew":
                        invalid = !/(deg|\d)$/i.test(propertyValue);
                        break;
                      case "rotate":
                        invalid = !/(deg|\d)$/i.test(propertyValue);
                        break;
                    }

                    if (!invalid) {
                      /* As per the CSS spec, wrap the value in parentheses. */
                      Data(element).transformCache[transformName] = "(" + propertyValue + ")";
                    }

                    /* Although the value is set on the transformCache object, return the newly-updated value for the calling code to process as normal. */
                    return Data(element).transformCache[transformName];
                }
              };
            })();
          }

          /*************
              Colors
          *************/

          /* Since Velocity only animates a single numeric value per property, color animation is achieved by hooking the individual RGBA components of CSS color properties.
             Accordingly, color values must be normalized (e.g. "#ff0000", "red", and "rgb(255, 0, 0)" ==> "255 0 0 1") so that their components can be injected/extracted by CSS.Hooks logic. */
          for (var i = 0; i < CSS.Lists.colors.length; i++) {
            /* Wrap the dynamically generated normalization function in a new scope so that colorName's value is paired with its respective function.
               (Otherwise, all functions would take the final for loop's colorName.) */
            (function() {
              var colorName = CSS.Lists.colors[i];

              /* Note: In IE<=8, which support rgb but not rgba, color properties are reverted to rgb by stripping off the alpha component. */
              CSS.Normalizations.registered[colorName] = function(type, element, propertyValue) {
                switch (type) {
                  case "name":
                    return colorName;
                    /* Convert all color values into the rgb format. (Old IE can return hex values and color names instead of rgb/rgba.) */
                  case "extract":
                    var extracted;

                    /* If the color is already in its hookable form (e.g. "255 255 255 1") due to having been previously extracted, skip extraction. */
                    if (CSS.RegEx.wrappedValueAlreadyExtracted.test(propertyValue)) {
                      extracted = propertyValue;
                    } else {
                      var converted,
                        colorNames = {
                          black: "rgb(0, 0, 0)",
                          blue: "rgb(0, 0, 255)",
                          gray: "rgb(128, 128, 128)",
                          green: "rgb(0, 128, 0)",
                          red: "rgb(255, 0, 0)",
                          white: "rgb(255, 255, 255)"
                        };

                      /* Convert color names to rgb. */
                      if (/^[A-z]+$/i.test(propertyValue)) {
                        if (colorNames[propertyValue] !== undefined) {
                          converted = colorNames[propertyValue]
                        } else {
                          /* If an unmatched color name is provided, default to black. */
                          converted = colorNames.black;
                        }
                        /* Convert hex values to rgb. */
                      } else if (CSS.RegEx.isHex.test(propertyValue)) {
                        converted = "rgb(" + CSS.Values.hexToRgb(propertyValue).join(" ") + ")";
                        /* If the provided color doesn't match any of the accepted color formats, default to black. */
                      } else if (!(/^rgba?\(/i.test(propertyValue))) {
                        converted = colorNames.black;
                      }

                      /* Remove the surrounding "rgb/rgba()" string then replace commas with spaces and strip
                         repeated spaces (in case the value included spaces to begin with). */
                      extracted = (converted || propertyValue).toString().match(CSS.RegEx.valueUnwrap)[1].replace(/,(\s+)?/g, " ");
                    }

                    /* So long as this isn't <=IE8, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                    if (!(IE <= 8) && extracted.split(" ").length === 3) {
                      extracted += " 1";
                    }

                    return extracted;
                  case "inject":
                    /* If this is IE<=8 and an alpha component exists, strip it off. */
                    if (IE <= 8) {
                      if (propertyValue.split(" ").length === 4) {
                        propertyValue = propertyValue.split(/\s+/).slice(0, 3).join(" ");
                      }
                      /* Otherwise, add a fourth (alpha) component if it's missing and default it to 1 (visible). */
                    } else if (propertyValue.split(" ").length === 3) {
                      propertyValue += " 1";
                    }

                    /* Re-insert the browser-appropriate wrapper("rgb/rgba()"), insert commas, and strip off decimal units
                       on all values but the fourth (R, G, and B only accept whole numbers). */
                    return (IE <= 8 ? "rgb" : "rgba") + "(" + propertyValue.replace(/\s+/g, ",").replace(/\.(\d)+(?=,)/g, "") + ")";
                }
              };
            })();
          }
        }
      },

      /************************
         CSS Property Names
      ************************/

      Names: {
        /* Camelcase a property name into its JavaScript notation (e.g. "background-color" ==> "backgroundColor").
           Camelcasing is used to normalize property names between and across calls. */
        camelCase: function(property) {
          return property.replace(/-(\w)/g, function(match, subMatch) {
            return subMatch.toUpperCase();
          });
        },

        /* For SVG elements, some properties (namely, dimensional ones) are GET/SET via the element's HTML attributes (instead of via CSS styles). */
        SVGAttribute: function(property) {
          var SVGAttributes = "width|height|x|y|cx|cy|r|rx|ry|x1|x2|y1|y2";

          /* Certain browsers require an SVG transform to be applied as an attribute. (Otherwise, application via CSS is preferable due to 3D support.) */
          if (IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) {
            SVGAttributes += "|transform";
          }

          return new RegExp("^(" + SVGAttributes + ")$", "i").test(property);
        },

        /* Determine whether a property should be set with a vendor prefix. */
        /* If a prefixed version of the property exists, return it. Otherwise, return the original property name.
           If the property is not at all supported by the browser, return a false flag. */
        prefixCheck: function(property) {
          /* If this property has already been checked, return the cached value. */
          if (Velocity.State.prefixMatches[property]) {
            return [Velocity.State.prefixMatches[property], true];
          } else {
            var vendors = ["", "Webkit", "Moz", "ms", "O"];

            for (var i = 0, vendorsLength = vendors.length; i < vendorsLength; i++) {
              var propertyPrefixed;

              if (i === 0) {
                propertyPrefixed = property;
              } else {
                /* Capitalize the first letter of the property to conform to JavaScript vendor prefix notation (e.g. webkitFilter). */
                propertyPrefixed = vendors[i] + property.replace(/^\w/, function(match) {
                  return match.toUpperCase(); });
              }

              /* Check if the browser supports this property as prefixed. */
              if (Type.isString(Velocity.State.prefixElement.style[propertyPrefixed])) {
                /* Cache the match. */
                Velocity.State.prefixMatches[property] = propertyPrefixed;

                return [propertyPrefixed, true];
              }
            }

            /* If the browser doesn't support this property in any form, include a false flag so that the caller can decide how to proceed. */
            return [property, false];
          }
        }
      },

      /************************
         CSS Property Values
      ************************/

      Values: {
        /* Hex to RGB conversion. Copyright Tim Down: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb */
        hexToRgb: function(hex) {
          var shortformRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            longformRegex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i,
            rgbParts;

          hex = hex.replace(shortformRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
          });

          rgbParts = longformRegex.exec(hex);

          return rgbParts ? [parseInt(rgbParts[1], 16), parseInt(rgbParts[2], 16), parseInt(rgbParts[3], 16)] : [0, 0, 0];
        },

        isCSSNullValue: function(value) {
          /* The browser defaults CSS values that have not been set to either 0 or one of several possible null-value strings.
             Thus, we check for both falsiness and these special strings. */
          /* Null-value checking is performed to default the special strings to 0 (for the sake of tweening) or their hook
             templates as defined as CSS.Hooks (for the sake of hook injection/extraction). */
          /* Note: Chrome returns "rgba(0, 0, 0, 0)" for an undefined color whereas IE returns "transparent". */
          return (value == 0 || /^(none|auto|transparent|(rgba\(0, ?0, ?0, ?0\)))$/i.test(value));
        },

        /* Retrieve a property's default unit type. Used for assigning a unit type when one is not supplied by the user. */
        getUnitType: function(property) {
          if (/^(rotate|skew)/i.test(property)) {
            return "deg";
          } else if (/(^(scale|scaleX|scaleY|scaleZ|alpha|flexGrow|flexHeight|zIndex|fontWeight)$)|((opacity|red|green|blue|alpha)$)/i.test(property)) {
            /* The above properties are unitless. */
            return "";
          } else {
            /* Default to px for all other properties. */
            return "px";
          }
        },

        /* HTML elements default to an associated display type when they're not set to display:none. */
        /* Note: This function is used for correctly setting the non-"none" display value in certain Velocity redirects, such as fadeIn/Out. */
        getDisplayType: function(element) {
          var tagName = element && element.tagName.toString().toLowerCase();

          if (/^(b|big|i|small|tt|abbr|acronym|cite|code|dfn|em|kbd|strong|samp|var|a|bdo|br|img|map|object|q|script|span|sub|sup|button|input|label|select|textarea)$/i.test(tagName)) {
            return "inline";
          } else if (/^(li)$/i.test(tagName)) {
            return "list-item";
          } else if (/^(tr)$/i.test(tagName)) {
            return "table-row";
          } else if (/^(table)$/i.test(tagName)) {
            return "table";
          } else if (/^(tbody)$/i.test(tagName)) {
            return "table-row-group";
            /* Default to "block" when no match is found. */
          } else {
            return "block";
          }
        },

        /* The class add/remove functions are used to temporarily apply a "velocity-animating" class to elements while they're animating. */
        addClass: function(element, className) {
          if (element.classList) {
            element.classList.add(className);
          } else {
            element.className += (element.className.length ? " " : "") + className;
          }
        },

        removeClass: function(element, className) {
          if (element.classList) {
            element.classList.remove(className);
          } else {
            element.className = element.className.toString().replace(new RegExp("(^|\\s)" + className.split(" ").join("|") + "(\\s|$)", "gi"), " ");
          }
        }
      },

      /****************************
         Style Getting & Setting
      ****************************/

      /* The singular getPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
      getPropertyValue: function(element, property, rootPropertyValue, forceStyleLookup) {
        /* Get an element's computed property value. */
        /* Note: Retrieving the value of a CSS property cannot simply be performed by checking an element's
           style attribute (which only reflects user-defined values). Instead, the browser must be queried for a property's
           *computed* value. You can read more about getComputedStyle here: https://developer.mozilla.org/en/docs/Web/API/window.getComputedStyle */
        function computePropertyValue(element, property) {
          /* When box-sizing isn't set to border-box, height and width style values are incorrectly computed when an
             element's scrollbars are visible (which expands the element's dimensions). Thus, we defer to the more accurate
             offsetHeight/Width property, which includes the total dimensions for interior, border, padding, and scrollbar.
             We subtract border and padding to get the sum of interior + scrollbar. */
          var computedValue = 0;

          /* IE<=8 doesn't support window.getComputedStyle, thus we defer to jQuery, which has an extensive array
             of hacks to accurately retrieve IE8 property values. Re-implementing that logic here is not worth bloating the
             codebase for a dying browser. The performance repercussions of using jQuery here are minimal since
             Velocity is optimized to rarely (and sometimes never) query the DOM. Further, the $.css() codepath isn't that slow. */
          if (IE <= 8) {
            computedValue = $.css(element, property); /* GET */
            /* All other browsers support getComputedStyle. The returned live object reference is cached onto its
               associated element so that it does not need to be refetched upon every GET. */
          } else {
            /* Browsers do not return height and width values for elements that are set to display:"none". Thus, we temporarily
               toggle display to the element type's default value. */
            var toggleDisplay = false;

            if (/^(width|height)$/.test(property) && CSS.getPropertyValue(element, "display") === 0) {
              toggleDisplay = true;
              CSS.setPropertyValue(element, "display", CSS.Values.getDisplayType(element));
            }

            function revertDisplay() {
              if (toggleDisplay) {
                CSS.setPropertyValue(element, "display", "none");
              }
            }

            if (!forceStyleLookup) {
              if (property === "height" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                var contentBoxHeight = element.offsetHeight - (parseFloat(CSS.getPropertyValue(element, "borderTopWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderBottomWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingTop")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingBottom")) || 0);
                revertDisplay();

                return contentBoxHeight;
              } else if (property === "width" && CSS.getPropertyValue(element, "boxSizing").toString().toLowerCase() !== "border-box") {
                var contentBoxWidth = element.offsetWidth - (parseFloat(CSS.getPropertyValue(element, "borderLeftWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "borderRightWidth")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingLeft")) || 0) - (parseFloat(CSS.getPropertyValue(element, "paddingRight")) || 0);
                revertDisplay();

                return contentBoxWidth;
              }
            }

            var computedStyle;

            /* For elements that Velocity hasn't been called on directly (e.g. when Velocity queries the DOM on behalf
               of a parent of an element its animating), perform a direct getComputedStyle lookup since the object isn't cached. */
            if (Data(element) === undefined) {
              computedStyle = window.getComputedStyle(element, null); /* GET */
              /* If the computedStyle object has yet to be cached, do so now. */
            } else if (!Data(element).computedStyle) {
              computedStyle = Data(element).computedStyle = window.getComputedStyle(element, null); /* GET */
              /* If computedStyle is cached, use it. */
            } else {
              computedStyle = Data(element).computedStyle;
            }

            /* IE and Firefox do not return a value for the generic borderColor -- they only return individual values for each border side's color.
               Also, in all browsers, when border colors aren't all the same, a compound value is returned that Velocity isn't setup to parse.
               So, as a polyfill for querying individual border side colors, we just return the top border's color and animate all borders from that value. */
            if (property === "borderColor") {
              property = "borderTopColor";
            }

            /* IE9 has a bug in which the "filter" property must be accessed from computedStyle using the getPropertyValue method
               instead of a direct property lookup. The getPropertyValue method is slower than a direct lookup, which is why we avoid it by default. */
            if (IE === 9 && property === "filter") {
              computedValue = computedStyle.getPropertyValue(property); /* GET */
            } else {
              computedValue = computedStyle[property];
            }

            /* Fall back to the property's style value (if defined) when computedValue returns nothing,
               which can happen when the element hasn't been painted. */
            if (computedValue === "" || computedValue === null) {
              computedValue = element.style[property];
            }

            revertDisplay();
          }

          /* For top, right, bottom, and left (TRBL) values that are set to "auto" on elements of "fixed" or "absolute" position,
             defer to jQuery for converting "auto" to a numeric value. (For elements with a "static" or "relative" position, "auto" has the same
             effect as being set to 0, so no conversion is necessary.) */
          /* An example of why numeric conversion is necessary: When an element with "position:absolute" has an untouched "left"
             property, which reverts to "auto", left's value is 0 relative to its parent element, but is often non-zero relative
             to its *containing* (not parent) element, which is the nearest "position:relative" ancestor or the viewport (and always the viewport in the case of "position:fixed"). */
          if (computedValue === "auto" && /^(top|right|bottom|left)$/i.test(property)) {
            var position = computePropertyValue(element, "position"); /* GET */

            /* For absolute positioning, jQuery's $.position() only returns values for top and left;
               right and bottom will have their "auto" value reverted to 0. */
            /* Note: A jQuery object must be created here since jQuery doesn't have a low-level alias for $.position().
               Not a big deal since we're currently in a GET batch anyway. */
            if (position === "fixed" || (position === "absolute" && /top|left/i.test(property))) {
              /* Note: jQuery strips the pixel unit from its returned values; we re-add it here to conform with computePropertyValue's behavior. */
              computedValue = $(element).position()[property] + "px"; /* GET */
            }
          }

          return computedValue;
        }

        var propertyValue;

        /* If this is a hooked property (e.g. "clipLeft" instead of the root property of "clip"),
           extract the hook's value from a normalized rootPropertyValue using CSS.Hooks.extractValue(). */
        if (CSS.Hooks.registered[property]) {
          var hook = property,
            hookRoot = CSS.Hooks.getRoot(hook);

          /* If a cached rootPropertyValue wasn't passed in (which Velocity always attempts to do in order to avoid requerying the DOM),
             query the DOM for the root property's value. */
          if (rootPropertyValue === undefined) {
            /* Since the browser is now being directly queried, use the official post-prefixing property name for this lookup. */
            rootPropertyValue = CSS.getPropertyValue(element, CSS.Names.prefixCheck(hookRoot)[0]); /* GET */
          }

          /* If this root has a normalization registered, peform the associated normalization extraction. */
          if (CSS.Normalizations.registered[hookRoot]) {
            rootPropertyValue = CSS.Normalizations.registered[hookRoot]("extract", element, rootPropertyValue);
          }

          /* Extract the hook's value. */
          propertyValue = CSS.Hooks.extractValue(hook, rootPropertyValue);

          /* If this is a normalized property (e.g. "opacity" becomes "filter" in <=IE8) or "translateX" becomes "transform"),
             normalize the property's name and value, and handle the special case of transforms. */
          /* Note: Normalizing a property is mutually exclusive from hooking a property since hook-extracted values are strictly
             numerical and therefore do not require normalization extraction. */
        } else if (CSS.Normalizations.registered[property]) {
          var normalizedPropertyName,
            normalizedPropertyValue;

          normalizedPropertyName = CSS.Normalizations.registered[property]("name", element);

          /* Transform values are calculated via normalization extraction (see below), which checks against the element's transformCache.
             At no point do transform GETs ever actually query the DOM; initial stylesheet values are never processed.
             This is because parsing 3D transform matrices is not always accurate and would bloat our codebase;
             thus, normalization extraction defaults initial transform values to their zero-values (e.g. 1 for scaleX and 0 for translateX). */
          if (normalizedPropertyName !== "transform") {
            normalizedPropertyValue = computePropertyValue(element, CSS.Names.prefixCheck(normalizedPropertyName)[0]); /* GET */

            /* If the value is a CSS null-value and this property has a hook template, use that zero-value template so that hooks can be extracted from it. */
            if (CSS.Values.isCSSNullValue(normalizedPropertyValue) && CSS.Hooks.templates[property]) {
              normalizedPropertyValue = CSS.Hooks.templates[property][1];
            }
          }

          propertyValue = CSS.Normalizations.registered[property]("extract", element, normalizedPropertyValue);
        }

        /* If a (numeric) value wasn't produced via hook extraction or normalization, query the DOM. */
        if (!/^[\d-]/.test(propertyValue)) {
          /* For SVG elements, dimensional properties (which SVGAttribute() detects) are tweened via
             their HTML attribute values instead of their CSS style values. */
          if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
            /* Since the height/width attribute values must be set manually, they don't reflect computed values.
               Thus, we use use getBBox() to ensure we always get values for elements with undefined height/width attributes. */
            if (/^(height|width)$/i.test(property)) {
              /* Firefox throws an error if .getBBox() is called on an SVG that isn't attached to the DOM. */
              try {
                propertyValue = element.getBBox()[property];
              } catch (error) {
                propertyValue = 0;
              }
              /* Otherwise, access the attribute value directly. */
            } else {
              propertyValue = element.getAttribute(property);
            }
          } else {
            propertyValue = computePropertyValue(element, CSS.Names.prefixCheck(property)[0]); /* GET */
          }
        }

        /* Since property lookups are for animation purposes (which entails computing the numeric delta between start and end values),
           convert CSS null-values to an integer of value 0. */
        if (CSS.Values.isCSSNullValue(propertyValue)) {
          propertyValue = 0;
        }

        if (Velocity.debug >= 2) console.log("Get " + property + ": " + propertyValue);

        return propertyValue;
      },

      /* The singular setPropertyValue, which routes the logic for all normalizations, hooks, and standard CSS properties. */
      setPropertyValue: function(element, property, propertyValue, rootPropertyValue, scrollData) {
        var propertyName = property;

        /* In order to be subjected to call options and element queueing, scroll animation is routed through Velocity as if it were a standard CSS property. */
        if (property === "scroll") {
          /* If a container option is present, scroll the container instead of the browser window. */
          if (scrollData.container) {
            scrollData.container["scroll" + scrollData.direction] = propertyValue;
            /* Otherwise, Velocity defaults to scrolling the browser window. */
          } else {
            if (scrollData.direction === "Left") {
              window.scrollTo(propertyValue, scrollData.alternateValue);
            } else {
              window.scrollTo(scrollData.alternateValue, propertyValue);
            }
          }
        } else {
          /* Transforms (translateX, rotateZ, etc.) are applied to a per-element transformCache object, which is manually flushed via flushTransformCache().
             Thus, for now, we merely cache transforms being SET. */
          if (CSS.Normalizations.registered[property] && CSS.Normalizations.registered[property]("name", element) === "transform") {
            /* Perform a normalization injection. */
            /* Note: The normalization logic handles the transformCache updating. */
            CSS.Normalizations.registered[property]("inject", element, propertyValue);

            propertyName = "transform";
            propertyValue = Data(element).transformCache[property];
          } else {
            /* Inject hooks. */
            if (CSS.Hooks.registered[property]) {
              var hookName = property,
                hookRoot = CSS.Hooks.getRoot(property);

              /* If a cached rootPropertyValue was not provided, query the DOM for the hookRoot's current value. */
              rootPropertyValue = rootPropertyValue || CSS.getPropertyValue(element, hookRoot); /* GET */

              propertyValue = CSS.Hooks.injectValue(hookName, propertyValue, rootPropertyValue);
              property = hookRoot;
            }

            /* Normalize names and values. */
            if (CSS.Normalizations.registered[property]) {
              propertyValue = CSS.Normalizations.registered[property]("inject", element, propertyValue);
              property = CSS.Normalizations.registered[property]("name", element);
            }

            /* Assign the appropriate vendor prefix before performing an official style update. */
            propertyName = CSS.Names.prefixCheck(property)[0];

            /* A try/catch is used for IE<=8, which throws an error when "invalid" CSS values are set, e.g. a negative width.
               Try/catch is avoided for other browsers since it incurs a performance overhead. */
            if (IE <= 8) {
              try {
                element.style[propertyName] = propertyValue;
              } catch (error) {
                if (Velocity.debug) console.log("Browser does not support [" + propertyValue + "] for [" + propertyName + "]"); }
              /* SVG elements have their dimensional properties (width, height, x, y, cx, etc.) applied directly as attributes instead of as styles. */
              /* Note: IE8 does not support SVG elements, so it's okay that we skip it for SVG animation. */
            } else if (Data(element) && Data(element).isSVG && CSS.Names.SVGAttribute(property)) {
              /* Note: For SVG attributes, vendor-prefixed property names are never used. */
              /* Note: Not all CSS properties can be animated via attributes, but the browser won't throw an error for unsupported properties. */
              element.setAttribute(property, propertyValue);
            } else {
              element.style[propertyName] = propertyValue;
            }

            if (Velocity.debug >= 2) console.log("Set " + property + " (" + propertyName + "): " + propertyValue);
          }
        }

        /* Return the normalized property name and value in case the caller wants to know how these values were modified before being applied to the DOM. */
        return [propertyName, propertyValue];
      },

      /* To increase performance by batching transform updates into a single SET, transforms are not directly applied to an element until flushTransformCache() is called. */
      /* Note: Velocity applies transform properties in the same order that they are chronogically introduced to the element's CSS styles. */
      flushTransformCache: function(element) {
        var transformString = "";

        /* Certain browsers require that SVG transforms be applied as an attribute. However, the SVG transform attribute takes a modified version of CSS's transform string
           (units are dropped and, except for skewX/Y, subproperties are merged into their master property -- e.g. scaleX and scaleY are merged into scale(X Y). */
        if ((IE || (Velocity.State.isAndroid && !Velocity.State.isChrome)) && Data(element).isSVG) {
          /* Since transform values are stored in their parentheses-wrapped form, we use a helper function to strip out their numeric values.
             Further, SVG transform properties only take unitless (representing pixels) values, so it's okay that parseFloat() strips the unit suffixed to the float value. */
          function getTransformFloat(transformProperty) {
            return parseFloat(CSS.getPropertyValue(element, transformProperty));
          }

          /* Create an object to organize all the transforms that we'll apply to the SVG element. To keep the logic simple,
             we process *all* transform properties -- even those that may not be explicitly applied (since they default to their zero-values anyway). */
          var SVGTransforms = {
            translate: [getTransformFloat("translateX"), getTransformFloat("translateY")],
            skewX: [getTransformFloat("skewX")],
            skewY: [getTransformFloat("skewY")],
            /* If the scale property is set (non-1), use that value for the scaleX and scaleY values
               (this behavior mimics the result of animating all these properties at once on HTML elements). */
            scale: getTransformFloat("scale") !== 1 ? [getTransformFloat("scale"), getTransformFloat("scale")] : [getTransformFloat("scaleX"), getTransformFloat("scaleY")],
            /* Note: SVG's rotate transform takes three values: rotation degrees followed by the X and Y values
               defining the rotation's origin point. We ignore the origin values (default them to 0). */
            rotate: [getTransformFloat("rotateZ"), 0, 0]
          };

          /* Iterate through the transform properties in the user-defined property map order.
             (This mimics the behavior of non-SVG transform animation.) */
          $.each(Data(element).transformCache, function(transformName) {
            /* Except for with skewX/Y, revert the axis-specific transform subproperties to their axis-free master
               properties so that they match up with SVG's accepted transform properties. */
            if (/^translate/i.test(transformName)) {
              transformName = "translate";
            } else if (/^scale/i.test(transformName)) {
              transformName = "scale";
            } else if (/^rotate/i.test(transformName)) {
              transformName = "rotate";
            }

            /* Check that we haven't yet deleted the property from the SVGTransforms container. */
            if (SVGTransforms[transformName]) {
              /* Append the transform property in the SVG-supported transform format. As per the spec, surround the space-delimited values in parentheses. */
              transformString += transformName + "(" + SVGTransforms[transformName].join(" ") + ")" + " ";

              /* After processing an SVG transform property, delete it from the SVGTransforms container so we don't
                 re-insert the same master property if we encounter another one of its axis-specific properties. */
              delete SVGTransforms[transformName];
            }
          });
        } else {
          var transformValue,
            perspective;

          /* Transform properties are stored as members of the transformCache object. Concatenate all the members into a string. */
          $.each(Data(element).transformCache, function(transformName) {
            transformValue = Data(element).transformCache[transformName];

            /* Transform's perspective subproperty must be set first in order to take effect. Store it temporarily. */
            if (transformName === "transformPerspective") {
              perspective = transformValue;
              return true;
            }

            /* IE9 only supports one rotation type, rotateZ, which it refers to as "rotate". */
            if (IE === 9 && transformName === "rotateZ") {
              transformName = "rotate";
            }

            transformString += transformName + transformValue + " ";
          });

          /* If present, set the perspective subproperty first. */
          if (perspective) {
            transformString = "perspective" + perspective + " " + transformString;
          }
        }

        CSS.setPropertyValue(element, "transform", transformString);
      }
    };

    /* Register hooks and normalizations. */
    CSS.Hooks.register();
    CSS.Normalizations.register();

    /* Allow hook setting in the same fashion as jQuery's $.css(). */
    Velocity.hook = function(elements, arg2, arg3) {
      var value = undefined;

      elements = sanitizeElements(elements);

      $.each(elements, function(i, element) {
        /* Initialize Velocity's per-element data cache if this element hasn't previously been animated. */
        if (Data(element) === undefined) {
          Velocity.init(element);
        }

        /* Get property value. If an element set was passed in, only return the value for the first element. */
        if (arg3 === undefined) {
          if (value === undefined) {
            value = Velocity.CSS.getPropertyValue(element, arg2);
          }
          /* Set property value. */
        } else {
          /* sPV returns an array of the normalized propertyName/propertyValue pair used to update the DOM. */
          var adjustedSet = Velocity.CSS.setPropertyValue(element, arg2, arg3);

          /* Transform properties don't automatically set. They have to be flushed to the DOM. */
          if (adjustedSet[0] === "transform") {
            Velocity.CSS.flushTransformCache(element);
          }

          value = adjustedSet;
        }
      });

      return value;
    };

    /*****************
        Animation
    *****************/

    var animate = function() {

      /******************
          Call Chain
      ******************/

      /* Logic for determining what to return to the call stack when exiting out of Velocity. */
      function getChain() {
        /* If we are using the utility function, attempt to return this call's promise. If no promise library was detected,
           default to null instead of returning the targeted elements so that utility function's return value is standardized. */
        if (isUtility) {
          return promiseData.promise || null;
          /* Otherwise, if we're using $.fn, return the jQuery-/Zepto-wrapped element set. */
        } else {
          return elementsWrapped;
        }
      }

      /*************************
         Arguments Assignment
      *************************/

      /* To allow for expressive CoffeeScript code, Velocity supports an alternative syntax in which "elements" (or "e"), "properties" (or "p"), and "options" (or "o")
         objects are defined on a container object that's passed in as Velocity's sole argument. */
      /* Note: Some browsers automatically populate arguments with a "properties" object. We detect it by checking for its default "names" property. */
      var syntacticSugar = (arguments[0] && (arguments[0].p || (($.isPlainObject(arguments[0].properties) && !arguments[0].properties.names) || Type.isString(arguments[0].properties)))),
        /* Whether Velocity was called via the utility function (as opposed to on a jQuery/Zepto object). */
        isUtility,
        /* When Velocity is called via the utility function ($.Velocity()/Velocity()), elements are explicitly
           passed in as the first parameter. Thus, argument positioning varies. We normalize them here. */
        elementsWrapped,
        argumentIndex;

      var elements,
        propertiesMap,
        options;

      /* Detect jQuery/Zepto elements being animated via the $.fn method. */
      if (Type.isWrapped(this)) {
        isUtility = false;

        argumentIndex = 0;
        elements = this;
        elementsWrapped = this;
        /* Otherwise, raw elements are being animated via the utility function. */
      } else {
        isUtility = true;

        argumentIndex = 1;
        elements = syntacticSugar ? (arguments[0].elements || arguments[0].e) : arguments[0];
      }

      elements = sanitizeElements(elements);

      if (!elements) {
        return;
      }

      if (syntacticSugar) {
        propertiesMap = arguments[0].properties || arguments[0].p;
        options = arguments[0].options || arguments[0].o;
      } else {
        propertiesMap = arguments[argumentIndex];
        options = arguments[argumentIndex + 1];
      }

      /* The length of the element set (in the form of a nodeList or an array of elements) is defaulted to 1 in case a
         single raw DOM element is passed in (which doesn't contain a length property). */
      var elementsLength = elements.length,
        elementsIndex = 0;

      /***************************
          Argument Overloading
      ***************************/

      /* Support is included for jQuery's argument overloading: $.animate(propertyMap [, duration] [, easing] [, complete]).
         Overloading is detected by checking for the absence of an object being passed into options. */
      /* Note: The stop and finish actions do not accept animation options, and are therefore excluded from this check. */
      if (!/^(stop|finish|finishAll)$/i.test(propertiesMap) && !$.isPlainObject(options)) {
        /* The utility function shifts all arguments one position to the right, so we adjust for that offset. */
        var startingArgumentPosition = argumentIndex + 1;

        options = {};

        /* Iterate through all options arguments */
        for (var i = startingArgumentPosition; i < arguments.length; i++) {
          /* Treat a number as a duration. Parse it out. */
          /* Note: The following RegEx will return true if passed an array with a number as its first item.
             Thus, arrays are skipped from this check. */
          if (!Type.isArray(arguments[i]) && (/^(fast|normal|slow)$/i.test(arguments[i]) || /^\d/.test(arguments[i]))) {
            options.duration = arguments[i];
            /* Treat strings and arrays as easings. */
          } else if (Type.isString(arguments[i]) || Type.isArray(arguments[i])) {
            options.easing = arguments[i];
            /* Treat a function as a complete callback. */
          } else if (Type.isFunction(arguments[i])) {
            options.complete = arguments[i];
          }
        }
      }

      /***************
          Promises
      ***************/

      var promiseData = {
        promise: null,
        resolver: null,
        rejecter: null
      };

      /* If this call was made via the utility function (which is the default method of invocation when jQuery/Zepto are not being used), and if
         promise support was detected, create a promise object for this call and store references to its resolver and rejecter methods. The resolve
         method is used when a call completes naturally or is prematurely stopped by the user. In both cases, completeCall() handles the associated
         call cleanup and promise resolving logic. The reject method is used when an invalid set of arguments is passed into a Velocity call. */
      /* Note: Velocity employs a call-based queueing architecture, which means that stopping an animating element actually stops the full call that
         triggered it -- not that one element exclusively. Similarly, there is one promise per call, and all elements targeted by a Velocity call are
         grouped together for the purposes of resolving and rejecting a promise. */
      if (isUtility && Velocity.Promise) {
        promiseData.promise = new Velocity.Promise(function(resolve, reject) {
          promiseData.resolver = resolve;
          promiseData.rejecter = reject;
        });
      }

      /*********************
         Action Detection
      *********************/

      /* Velocity's behavior is categorized into "actions": Elements can either be specially scrolled into view,
         or they can be started, stopped, or reversed. If a literal or referenced properties map is passed in as Velocity's
         first argument, the associated action is "start". Alternatively, "scroll", "reverse", or "stop" can be passed in instead of a properties map. */
      var action;

      switch (propertiesMap) {
        case "scroll":
          action = "scroll";
          break;

        case "reverse":
          action = "reverse";
          break;

        case "finish":
        case "finishAll":
        case "stop":
          /*******************
              Action: Stop
          *******************/

          /* Clear the currently-active delay on each targeted element. */
          $.each(elements, function(i, element) {
            if (Data(element) && Data(element).delayTimer) {
              /* Stop the timer from triggering its cached next() function. */
              clearTimeout(Data(element).delayTimer.setTimeout);

              /* Manually call the next() function so that the subsequent queue items can progress. */
              if (Data(element).delayTimer.next) {
                Data(element).delayTimer.next();
              }

              delete Data(element).delayTimer;
            }

            /* If we want to finish everything in the queue, we have to iterate through it
               and call each function. This will make them active calls below, which will
               cause them to be applied via the duration setting. */
            if (propertiesMap === "finishAll" && (options === true || Type.isString(options))) {
              /* Iterate through the items in the element's queue. */
              $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                /* The queue array can contain an "inprogress" string, which we skip. */
                if (Type.isFunction(item)) {
                  item();
                }
              });

              /* Clearing the $.queue() array is achieved by resetting it to []. */
              $.queue(element, Type.isString(options) ? options : "", []);
            }
          });

          var callsToStop = [];

          /* When the stop action is triggered, the elements' currently active call is immediately stopped. The active call might have
             been applied to multiple elements, in which case all of the call's elements will be stopped. When an element
             is stopped, the next item in its animation queue is immediately triggered. */
          /* An additional argument may be passed in to clear an element's remaining queued calls. Either true (which defaults to the "fx" queue)
             or a custom queue string can be passed in. */
          /* Note: The stop command runs prior to Velocity's Queueing phase since its behavior is intended to take effect *immediately*,
             regardless of the element's current queue state. */

          /* Iterate through every active call. */
          $.each(Velocity.State.calls, function(i, activeCall) {
            /* Inactive calls are set to false by the logic inside completeCall(). Skip them. */
            if (activeCall) {
              /* Iterate through the active call's targeted elements. */
              $.each(activeCall[1], function(k, activeElement) {
                /* If true was passed in as a secondary argument, clear absolutely all calls on this element. Otherwise, only
                   clear calls associated with the relevant queue. */
                /* Call stopping logic works as follows:
                   - options === true --> stop current default queue calls (and queue:false calls), including remaining queued ones.
                   - options === undefined --> stop current queue:"" call and all queue:false calls.
                   - options === false --> stop only queue:false calls.
                   - options === "custom" --> stop current queue:"custom" call, including remaining queued ones (there is no functionality to only clear the currently-running queue:"custom" call). */
                var queueName = (options === undefined) ? "" : options;

                if (queueName !== true && (activeCall[2].queue !== queueName) && !(options === undefined && activeCall[2].queue === false)) {
                  return true;
                }

                /* Iterate through the calls targeted by the stop command. */
                $.each(elements, function(l, element) {
                  /* Check that this call was applied to the target element. */
                  if (element === activeElement) {
                    /* Optionally clear the remaining queued calls. If we're doing "finishAll" this won't find anything,
                       due to the queue-clearing above. */
                    if (options === true || Type.isString(options)) {
                      /* Iterate through the items in the element's queue. */
                      $.each($.queue(element, Type.isString(options) ? options : ""), function(_, item) {
                        /* The queue array can contain an "inprogress" string, which we skip. */
                        if (Type.isFunction(item)) {
                          /* Pass the item's callback a flag indicating that we want to abort from the queue call.
                             (Specifically, the queue will resolve the call's associated promise then abort.)  */
                          item(null, true);
                        }
                      });

                      /* Clearing the $.queue() array is achieved by resetting it to []. */
                      $.queue(element, Type.isString(options) ? options : "", []);
                    }

                    if (propertiesMap === "stop") {
                      /* Since "reverse" uses cached start values (the previous call's endValues), these values must be
                         changed to reflect the final value that the elements were actually tweened to. */
                      /* Note: If only queue:false animations are currently running on an element, it won't have a tweensContainer
                         object. Also, queue:false animations can't be reversed. */
                      if (Data(element) && Data(element).tweensContainer && queueName !== false) {
                        $.each(Data(element).tweensContainer, function(m, activeTween) {
                          activeTween.endValue = activeTween.currentValue;
                        });
                      }

                      callsToStop.push(i);
                    } else if (propertiesMap === "finish" || propertiesMap === "finishAll") {
                      /* To get active tweens to finish immediately, we forcefully shorten their durations to 1ms so that
                      they finish upon the next rAf tick then proceed with normal call completion logic. */
                      activeCall[2].duration = 1;
                    }
                  }
                });
              });
            }
          });

          /* Prematurely call completeCall() on each matched active call. Pass an additional flag for "stop" to indicate
             that the complete callback and display:none setting should be skipped since we're completing prematurely. */
          if (propertiesMap === "stop") {
            $.each(callsToStop, function(i, j) {
              completeCall(j, true);
            });

            if (promiseData.promise) {
              /* Immediately resolve the promise associated with this stop call since stop runs synchronously. */
              promiseData.resolver(elements);
            }
          }

          /* Since we're stopping, and not proceeding with queueing, exit out of Velocity. */
          return getChain();

        default:
          /* Treat a non-empty plain object as a literal properties map. */
          if ($.isPlainObject(propertiesMap) && !Type.isEmptyObject(propertiesMap)) {
            action = "start";

            /****************
                Redirects
            ****************/

            /* Check if a string matches a registered redirect (see Redirects above). */
          } else if (Type.isString(propertiesMap) && Velocity.Redirects[propertiesMap]) {
            var opts = $.extend({}, options),
              durationOriginal = opts.duration,
              delayOriginal = opts.delay || 0;

            /* If the backwards option was passed in, reverse the element set so that elements animate from the last to the first. */
            if (opts.backwards === true) {
              elements = $.extend(true, [], elements).reverse();
            }

            /* Individually trigger the redirect for each element in the set to prevent users from having to handle iteration logic in their redirect. */
            $.each(elements, function(elementIndex, element) {
              /* If the stagger option was passed in, successively delay each element by the stagger value (in ms). Retain the original delay value. */
              if (parseFloat(opts.stagger)) {
                opts.delay = delayOriginal + (parseFloat(opts.stagger) * elementIndex);
              } else if (Type.isFunction(opts.stagger)) {
                opts.delay = delayOriginal + opts.stagger.call(element, elementIndex, elementsLength);
              }

              /* If the drag option was passed in, successively increase/decrease (depending on the presense of opts.backwards)
                 the duration of each element's animation, using floors to prevent producing very short durations. */
              if (opts.drag) {
                /* Default the duration of UI pack effects (callouts and transitions) to 1000ms instead of the usual default duration of 400ms. */
                opts.duration = parseFloat(durationOriginal) || (/^(callout|transition)/.test(propertiesMap) ? 1000 : DURATION_DEFAULT);

                /* For each element, take the greater duration of: A) animation completion percentage relative to the original duration,
                   B) 75% of the original duration, or C) a 200ms fallback (in case duration is already set to a low value).
                   The end result is a baseline of 75% of the redirect's duration that increases/decreases as the end of the element set is approached. */
                opts.duration = Math.max(opts.duration * (opts.backwards ? 1 - elementIndex / elementsLength : (elementIndex + 1) / elementsLength), opts.duration * 0.75, 200);
              }

              /* Pass in the call's opts object so that the redirect can optionally extend it. It defaults to an empty object instead of null to
                 reduce the opts checking logic required inside the redirect. */
              Velocity.Redirects[propertiesMap].call(element, element, opts || {}, elementIndex, elementsLength, elements, promiseData.promise ? promiseData : undefined);
            });

            /* Since the animation logic resides within the redirect's own code, abort the remainder of this call.
               (The performance overhead up to this point is virtually non-existant.) */
            /* Note: The jQuery call chain is kept intact by returning the complete element set. */
            return getChain();
          } else {
            var abortError = "Velocity: First argument (" + propertiesMap + ") was not a property map, a known action, or a registered redirect. Aborting.";

            if (promiseData.promise) {
              promiseData.rejecter(new Error(abortError));
            } else {
              console.log(abortError);
            }

            return getChain();
          }
      }

      /**************************
          Call-Wide Variables
      **************************/

      /* A container for CSS unit conversion ratios (e.g. %, rem, and em ==> px) that is used to cache ratios across all elements
         being animated in a single Velocity call. Calculating unit ratios necessitates DOM querying and updating, and is therefore
         avoided (via caching) wherever possible. This container is call-wide instead of page-wide to avoid the risk of using stale
         conversion metrics across Velocity animations that are not immediately consecutively chained. */
      var callUnitConversionData = {
        lastParent: null,
        lastPosition: null,
        lastFontSize: null,
        lastPercentToPxWidth: null,
        lastPercentToPxHeight: null,
        lastEmToPx: null,
        remToPx: null,
        vwToPx: null,
        vhToPx: null
      };

      /* A container for all the ensuing tween data and metadata associated with this call. This container gets pushed to the page-wide
         Velocity.State.calls array that is processed during animation ticking. */
      var call = [];

      /************************
         Element Processing
      ************************/

      /* Element processing consists of three parts -- data processing that cannot go stale and data processing that *can* go stale (i.e. third-party style modifications):
         1) Pre-Queueing: Element-wide variables, including the element's data storage, are instantiated. Call options are prepared. If triggered, the Stop action is executed.
         2) Queueing: The logic that runs once this call has reached its point of execution in the element's $.queue() stack. Most logic is placed here to avoid risking it becoming stale.
         3) Pushing: Consolidation of the tween data followed by its push onto the global in-progress calls container.
      */

      function processElement() {

        /*************************
           Part I: Pre-Queueing
        *************************/

        /***************************
           Element-Wide Variables
        ***************************/

        var element = this,
          /* The runtime opts object is the extension of the current call's options and Velocity's page-wide option defaults. */
          opts = $.extend({}, Velocity.defaults, options),
          /* A container for the processed data associated with each property in the propertyMap.
             (Each property in the map produces its own "tween".) */
          tweensContainer = {},
          elementUnitConversionData;

        /******************
           Element Init
        ******************/

        if (Data(element) === undefined) {
          Velocity.init(element);
        }

        /******************
           Option: Delay
        ******************/

        /* Since queue:false doesn't respect the item's existing queue, we avoid injecting its delay here (it's set later on). */
        /* Note: Velocity rolls its own delay function since jQuery doesn't have a utility alias for $.fn.delay()
           (and thus requires jQuery element creation, which we avoid since its overhead includes DOM querying). */
        if (parseFloat(opts.delay) && opts.queue !== false) {
          $.queue(element, opts.queue, function(next) {
            /* This is a flag used to indicate to the upcoming completeCall() function that this queue entry was initiated by Velocity. See completeCall() for further details. */
            Velocity.velocityQueueEntryFlag = true;

            /* The ensuing queue item (which is assigned to the "next" argument that $.queue() automatically passes in) will be triggered after a setTimeout delay.
               The setTimeout is stored so that it can be subjected to clearTimeout() if this animation is prematurely stopped via Velocity's "stop" command. */
            Data(element).delayTimer = {
              setTimeout: setTimeout(next, parseFloat(opts.delay)),
              next: next
            };
          });
        }

        /*********************
           Option: Duration
        *********************/

        /* Support for jQuery's named durations. */
        switch (opts.duration.toString().toLowerCase()) {
          case "fast":
            opts.duration = 200;
            break;

          case "normal":
            opts.duration = DURATION_DEFAULT;
            break;

          case "slow":
            opts.duration = 600;
            break;

          default:
            /* Remove the potential "ms" suffix and default to 1 if the user is attempting to set a duration of 0 (in order to produce an immediate style change). */
            opts.duration = parseFloat(opts.duration) || 1;
        }

        /************************
           Global Option: Mock
        ************************/

        if (Velocity.mock !== false) {
          /* In mock mode, all animations are forced to 1ms so that they occur immediately upon the next rAF tick.
             Alternatively, a multiplier can be passed in to time remap all delays and durations. */
          if (Velocity.mock === true) {
            opts.duration = opts.delay = 1;
          } else {
            opts.duration *= parseFloat(Velocity.mock) || 1;
            opts.delay *= parseFloat(Velocity.mock) || 1;
          }
        }

        /*******************
           Option: Easing
        *******************/

        opts.easing = getEasing(opts.easing, opts.duration);

        /**********************
           Option: Callbacks
        **********************/

        /* Callbacks must functions. Otherwise, default to null. */
        if (opts.begin && !Type.isFunction(opts.begin)) {
          opts.begin = null;
        }

        if (opts.progress && !Type.isFunction(opts.progress)) {
          opts.progress = null;
        }

        if (opts.complete && !Type.isFunction(opts.complete)) {
          opts.complete = null;
        }

        /*********************************
           Option: Display & Visibility
        *********************************/

        /* Refer to Velocity's documentation (VelocityJS.org/#displayAndVisibility) for a description of the display and visibility options' behavior. */
        /* Note: We strictly check for undefined instead of falsiness because display accepts an empty string value. */
        if (opts.display !== undefined && opts.display !== null) {
          opts.display = opts.display.toString().toLowerCase();

          /* Users can pass in a special "auto" value to instruct Velocity to set the element to its default display value. */
          if (opts.display === "auto") {
            opts.display = Velocity.CSS.Values.getDisplayType(element);
          }
        }

        if (opts.visibility !== undefined && opts.visibility !== null) {
          opts.visibility = opts.visibility.toString().toLowerCase();
        }

        /**********************
           Option: mobileHA
        **********************/

        /* When set to true, and if this is a mobile device, mobileHA automatically enables hardware acceleration (via a null transform hack)
           on animating elements. HA is removed from the element at the completion of its animation. */
        /* Note: Android Gingerbread doesn't support HA. If a null transform hack (mobileHA) is in fact set, it will prevent other tranform subproperties from taking effect. */
        /* Note: You can read more about the use of mobileHA in Velocity's documentation: VelocityJS.org/#mobileHA. */
        opts.mobileHA = (opts.mobileHA && Velocity.State.isMobile && !Velocity.State.isGingerbread);

        /***********************
           Part II: Queueing
        ***********************/

        /* When a set of elements is targeted by a Velocity call, the set is broken up and each element has the current Velocity call individually queued onto it.
           In this way, each element's existing queue is respected; some elements may already be animating and accordingly should not have this current Velocity call triggered immediately. */
        /* In each queue, tween data is processed for each animating property then pushed onto the call-wide calls array. When the last element in the set has had its tweens processed,
           the call array is pushed to Velocity.State.calls for live processing by the requestAnimationFrame tick. */
        function buildQueue(next) {

          /*******************
             Option: Begin
          *******************/

          /* The begin callback is fired once per call -- not once per elemenet -- and is passed the full raw DOM element set as both its context and its first argument. */
          if (opts.begin && elementsIndex === 0) {
            /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
            try {
              opts.begin.call(elements, elements);
            } catch (error) {
              setTimeout(function() {
                throw error; }, 1);
            }
          }

          /*****************************************
             Tween Data Construction (for Scroll)
          *****************************************/

          /* Note: In order to be subjected to chaining and animation options, scroll's tweening is routed through Velocity as if it were a standard CSS property animation. */
          if (action === "scroll") {
            /* The scroll action uniquely takes an optional "offset" option -- specified in pixels -- that offsets the targeted scroll position. */
            var scrollDirection = (/^x$/i.test(opts.axis) ? "Left" : "Top"),
              scrollOffset = parseFloat(opts.offset) || 0,
              scrollPositionCurrent,
              scrollPositionCurrentAlternate,
              scrollPositionEnd;

            /* Scroll also uniquely takes an optional "container" option, which indicates the parent element that should be scrolled --
               as opposed to the browser window itself. This is useful for scrolling toward an element that's inside an overflowing parent element. */
            if (opts.container) {
              /* Ensure that either a jQuery object or a raw DOM element was passed in. */
              if (Type.isWrapped(opts.container) || Type.isNode(opts.container)) {
                /* Extract the raw DOM element from the jQuery wrapper. */
                opts.container = opts.container[0] || opts.container;
                /* Note: Unlike other properties in Velocity, the browser's scroll position is never cached since it so frequently changes
                   (due to the user's natural interaction with the page). */
                scrollPositionCurrent = opts.container["scroll" + scrollDirection]; /* GET */

                /* $.position() values are relative to the container's currently viewable area (without taking into account the container's true dimensions
                   -- say, for example, if the container was not overflowing). Thus, the scroll end value is the sum of the child element's position *and*
                   the scroll container's current scroll position. */
                scrollPositionEnd = (scrollPositionCurrent + $(element).position()[scrollDirection.toLowerCase()]) + scrollOffset; /* GET */
                /* If a value other than a jQuery object or a raw DOM element was passed in, default to null so that this option is ignored. */
              } else {
                opts.container = null;
              }
            } else {
              /* If the window itself is being scrolled -- not a containing element -- perform a live scroll position lookup using
                 the appropriate cached property names (which differ based on browser type). */
              scrollPositionCurrent = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + scrollDirection]]; /* GET */
              /* When scrolling the browser window, cache the alternate axis's current value since window.scrollTo() doesn't let us change only one value at a time. */
              scrollPositionCurrentAlternate = Velocity.State.scrollAnchor[Velocity.State["scrollProperty" + (scrollDirection === "Left" ? "Top" : "Left")]]; /* GET */

              /* Unlike $.position(), $.offset() values are relative to the browser window's true dimensions -- not merely its currently viewable area --
                 and therefore end values do not need to be compounded onto current values. */
              scrollPositionEnd = $(element).offset()[scrollDirection.toLowerCase()] + scrollOffset; /* GET */
            }

            /* Since there's only one format that scroll's associated tweensContainer can take, we create it manually. */
            tweensContainer = {
              scroll: {
                rootPropertyValue: false,
                startValue: scrollPositionCurrent,
                currentValue: scrollPositionCurrent,
                endValue: scrollPositionEnd,
                unitType: "",
                easing: opts.easing,
                scrollData: {
                  container: opts.container,
                  direction: scrollDirection,
                  alternateValue: scrollPositionCurrentAlternate
                }
              },
              element: element
            };

            if (Velocity.debug) console.log("tweensContainer (scroll): ", tweensContainer.scroll, element);

            /******************************************
               Tween Data Construction (for Reverse)
            ******************************************/

            /* Reverse acts like a "start" action in that a property map is animated toward. The only difference is
               that the property map used for reverse is the inverse of the map used in the previous call. Thus, we manipulate
               the previous call to construct our new map: use the previous map's end values as our new map's start values. Copy over all other data. */
            /* Note: Reverse can be directly called via the "reverse" parameter, or it can be indirectly triggered via the loop option. (Loops are composed of multiple reverses.) */
            /* Note: Reverse calls do not need to be consecutively chained onto a currently-animating element in order to operate on cached values;
               there is no harm to reverse being called on a potentially stale data cache since reverse's behavior is simply defined
               as reverting to the element's values as they were prior to the previous *Velocity* call. */
          } else if (action === "reverse") {
            /* Abort if there is no prior animation data to reverse to. */
            if (!Data(element).tweensContainer) {
              /* Dequeue the element so that this queue entry releases itself immediately, allowing subsequent queue entries to run. */
              $.dequeue(element, opts.queue);

              return;
            } else {
              /*********************
                 Options Parsing
              *********************/

              /* If the element was hidden via the display option in the previous call,
                 revert display to "auto" prior to reversal so that the element is visible again. */
              if (Data(element).opts.display === "none") {
                Data(element).opts.display = "auto";
              }

              if (Data(element).opts.visibility === "hidden") {
                Data(element).opts.visibility = "visible";
              }

              /* If the loop option was set in the previous call, disable it so that "reverse" calls aren't recursively generated.
                 Further, remove the previous call's callback options; typically, users do not want these to be refired. */
              Data(element).opts.loop = false;
              Data(element).opts.begin = null;
              Data(element).opts.complete = null;

              /* Since we're extending an opts object that has already been extended with the defaults options object,
                 we remove non-explicitly-defined properties that are auto-assigned values. */
              if (!options.easing) {
                delete opts.easing;
              }

              if (!options.duration) {
                delete opts.duration;
              }

              /* The opts object used for reversal is an extension of the options object optionally passed into this
                 reverse call plus the options used in the previous Velocity call. */
              opts = $.extend({}, Data(element).opts, opts);

              /*************************************
                 Tweens Container Reconstruction
              *************************************/

              /* Create a deepy copy (indicated via the true flag) of the previous call's tweensContainer. */
              var lastTweensContainer = $.extend(true, {}, Data(element).tweensContainer);

              /* Manipulate the previous tweensContainer by replacing its end values and currentValues with its start values. */
              for (var lastTween in lastTweensContainer) {
                /* In addition to tween data, tweensContainers contain an element property that we ignore here. */
                if (lastTween !== "element") {
                  var lastStartValue = lastTweensContainer[lastTween].startValue;

                  lastTweensContainer[lastTween].startValue = lastTweensContainer[lastTween].currentValue = lastTweensContainer[lastTween].endValue;
                  lastTweensContainer[lastTween].endValue = lastStartValue;

                  /* Easing is the only option that embeds into the individual tween data (since it can be defined on a per-property basis).
                     Accordingly, every property's easing value must be updated when an options object is passed in with a reverse call.
                     The side effect of this extensibility is that all per-property easing values are forcefully reset to the new value. */
                  if (!Type.isEmptyObject(options)) {
                    lastTweensContainer[lastTween].easing = opts.easing;
                  }

                  if (Velocity.debug) console.log("reverse tweensContainer (" + lastTween + "): " + JSON.stringify(lastTweensContainer[lastTween]), element);
                }
              }

              tweensContainer = lastTweensContainer;
            }

            /*****************************************
               Tween Data Construction (for Start)
            *****************************************/

          } else if (action === "start") {

            /*************************
                Value Transferring
            *************************/

            /* If this queue entry follows a previous Velocity-initiated queue entry *and* if this entry was created
               while the element was in the process of being animated by Velocity, then this current call is safe to use
               the end values from the prior call as its start values. Velocity attempts to perform this value transfer
               process whenever possible in order to avoid requerying the DOM. */
            /* If values aren't transferred from a prior call and start values were not forcefed by the user (more on this below),
               then the DOM is queried for the element's current values as a last resort. */
            /* Note: Conversely, animation reversal (and looping) *always* perform inter-call value transfers; they never requery the DOM. */
            var lastTweensContainer;

            /* The per-element isAnimating flag is used to indicate whether it's safe (i.e. the data isn't stale)
               to transfer over end values to use as start values. If it's set to true and there is a previous
               Velocity call to pull values from, do so. */
            if (Data(element).tweensContainer && Data(element).isAnimating === true) {
              lastTweensContainer = Data(element).tweensContainer;
            }

            /***************************
               Tween Data Calculation
            ***************************/

            /* This function parses property data and defaults endValue, easing, and startValue as appropriate. */
            /* Property map values can either take the form of 1) a single value representing the end value,
               or 2) an array in the form of [ endValue, [, easing] [, startValue] ].
               The optional third parameter is a forcefed startValue to be used instead of querying the DOM for
               the element's current value. Read Velocity's docmentation to learn more about forcefeeding: VelocityJS.org/#forcefeeding */
            function parsePropertyValue(valueData, skipResolvingEasing) {
              var endValue = undefined,
                easing = undefined,
                startValue = undefined;

              /* Handle the array format, which can be structured as one of three potential overloads:
                 A) [ endValue, easing, startValue ], B) [ endValue, easing ], or C) [ endValue, startValue ] */
              if (Type.isArray(valueData)) {
                /* endValue is always the first item in the array. Don't bother validating endValue's value now
                   since the ensuing property cycling logic does that. */
                endValue = valueData[0];

                /* Two-item array format: If the second item is a number, function, or hex string, treat it as a
                   start value since easings can only be non-hex strings or arrays. */
                if ((!Type.isArray(valueData[1]) && /^[\d-]/.test(valueData[1])) || Type.isFunction(valueData[1]) || CSS.RegEx.isHex.test(valueData[1])) {
                  startValue = valueData[1];
                  /* Two or three-item array: If the second item is a non-hex string or an array, treat it as an easing. */
                } else if ((Type.isString(valueData[1]) && !CSS.RegEx.isHex.test(valueData[1])) || Type.isArray(valueData[1])) {
                  easing = skipResolvingEasing ? valueData[1] : getEasing(valueData[1], opts.duration);

                  /* Don't bother validating startValue's value now since the ensuing property cycling logic inherently does that. */
                  if (valueData[2] !== undefined) {
                    startValue = valueData[2];
                  }
                }
                /* Handle the single-value format. */
              } else {
                endValue = valueData;
              }

              /* Default to the call's easing if a per-property easing type was not defined. */
              if (!skipResolvingEasing) {
                easing = easing || opts.easing;
              }

              /* If functions were passed in as values, pass the function the current element as its context,
                 plus the element's index and the element set's size as arguments. Then, assign the returned value. */
              if (Type.isFunction(endValue)) {
                endValue = endValue.call(element, elementsIndex, elementsLength);
              }

              if (Type.isFunction(startValue)) {
                startValue = startValue.call(element, elementsIndex, elementsLength);
              }

              /* Allow startValue to be left as undefined to indicate to the ensuing code that its value was not forcefed. */
              return [endValue || 0, easing, startValue];
            }

            /* Cycle through each property in the map, looking for shorthand color properties (e.g. "color" as opposed to "colorRed"). Inject the corresponding
               colorRed, colorGreen, and colorBlue RGB component tweens into the propertiesMap (which Velocity understands) and remove the shorthand property. */
            $.each(propertiesMap, function(property, value) {
              /* Find shorthand color properties that have been passed a hex string. */
              if (RegExp("^" + CSS.Lists.colors.join("$|^") + "$").test(property)) {
                /* Parse the value data for each shorthand. */
                var valueData = parsePropertyValue(value, true),
                  endValue = valueData[0],
                  easing = valueData[1],
                  startValue = valueData[2];

                if (CSS.RegEx.isHex.test(endValue)) {
                  /* Convert the hex strings into their RGB component arrays. */
                  var colorComponents = ["Red", "Green", "Blue"],
                    endValueRGB = CSS.Values.hexToRgb(endValue),
                    startValueRGB = startValue ? CSS.Values.hexToRgb(startValue) : undefined;

                  /* Inject the RGB component tweens into propertiesMap. */
                  for (var i = 0; i < colorComponents.length; i++) {
                    var dataArray = [endValueRGB[i]];

                    if (easing) {
                      dataArray.push(easing);
                    }

                    if (startValueRGB !== undefined) {
                      dataArray.push(startValueRGB[i]);
                    }

                    propertiesMap[property + colorComponents[i]] = dataArray;
                  }

                  /* Remove the intermediary shorthand property entry now that we've processed it. */
                  delete propertiesMap[property];
                }
              }
            });

            /* Create a tween out of each property, and append its associated data to tweensContainer. */
            for (var property in propertiesMap) {

              /**************************
                 Start Value Sourcing
              **************************/

              /* Parse out endValue, easing, and startValue from the property's data. */
              var valueData = parsePropertyValue(propertiesMap[property]),
                endValue = valueData[0],
                easing = valueData[1],
                startValue = valueData[2];

              /* Now that the original property name's format has been used for the parsePropertyValue() lookup above,
                 we force the property to its camelCase styling to normalize it for manipulation. */
              property = CSS.Names.camelCase(property);

              /* In case this property is a hook, there are circumstances where we will intend to work on the hook's root property and not the hooked subproperty. */
              var rootProperty = CSS.Hooks.getRoot(property),
                rootPropertyValue = false;

              /* Other than for the dummy tween property, properties that are not supported by the browser (and do not have an associated normalization) will
                 inherently produce no style changes when set, so they are skipped in order to decrease animation tick overhead.
                 Property support is determined via prefixCheck(), which returns a false flag when no supported is detected. */
              /* Note: Since SVG elements have some of their properties directly applied as HTML attributes,
                 there is no way to check for their explicit browser support, and so we skip skip this check for them. */
              if (!Data(element).isSVG && rootProperty !== "tween" && CSS.Names.prefixCheck(rootProperty)[1] === false && CSS.Normalizations.registered[rootProperty] === undefined) {
                if (Velocity.debug) console.log("Skipping [" + rootProperty + "] due to a lack of browser support.");

                continue;
              }

              /* If the display option is being set to a non-"none" (e.g. "block") and opacity (filter on IE<=8) is being
                 animated to an endValue of non-zero, the user's intention is to fade in from invisible, thus we forcefeed opacity
                 a startValue of 0 if its startValue hasn't already been sourced by value transferring or prior forcefeeding. */
              if (((opts.display !== undefined && opts.display !== null && opts.display !== "none") || (opts.visibility !== undefined && opts.visibility !== "hidden")) && /opacity|filter/.test(property) && !startValue && endValue !== 0) {
                startValue = 0;
              }

              /* If values have been transferred from the previous Velocity call, extract the endValue and rootPropertyValue
                 for all of the current call's properties that were *also* animated in the previous call. */
              /* Note: Value transferring can optionally be disabled by the user via the _cacheValues option. */
              if (opts._cacheValues && lastTweensContainer && lastTweensContainer[property]) {
                if (startValue === undefined) {
                  startValue = lastTweensContainer[property].endValue + lastTweensContainer[property].unitType;
                }

                /* The previous call's rootPropertyValue is extracted from the element's data cache since that's the
                   instance of rootPropertyValue that gets freshly updated by the tweening process, whereas the rootPropertyValue
                   attached to the incoming lastTweensContainer is equal to the root property's value prior to any tweening. */
                rootPropertyValue = Data(element).rootPropertyValueCache[rootProperty];
                /* If values were not transferred from a previous Velocity call, query the DOM as needed. */
              } else {
                /* Handle hooked properties. */
                if (CSS.Hooks.registered[property]) {
                  if (startValue === undefined) {
                    rootPropertyValue = CSS.getPropertyValue(element, rootProperty); /* GET */
                    /* Note: The following getPropertyValue() call does not actually trigger a DOM query;
                       getPropertyValue() will extract the hook from rootPropertyValue. */
                    startValue = CSS.getPropertyValue(element, property, rootPropertyValue);
                    /* If startValue is already defined via forcefeeding, do not query the DOM for the root property's value;
                       just grab rootProperty's zero-value template from CSS.Hooks. This overwrites the element's actual
                       root property value (if one is set), but this is acceptable since the primary reason users forcefeed is
                       to avoid DOM queries, and thus we likewise avoid querying the DOM for the root property's value. */
                  } else {
                    /* Grab this hook's zero-value template, e.g. "0px 0px 0px black". */
                    rootPropertyValue = CSS.Hooks.templates[rootProperty][1];
                  }
                  /* Handle non-hooked properties that haven't already been defined via forcefeeding. */
                } else if (startValue === undefined) {
                  startValue = CSS.getPropertyValue(element, property); /* GET */
                }
              }

              /**************************
                 Value Data Extraction
              **************************/

              var separatedValue,
                endValueUnitType,
                startValueUnitType,
                operator = false;

              /* Separates a property value into its numeric value and its unit type. */
              function separateValue(property, value) {
                var unitType,
                  numericValue;

                numericValue = (value || "0")
                  .toString()
                  .toLowerCase()
                  /* Match the unit type at the end of the value. */
                  .replace(/[%A-z]+$/, function(match) {
                    /* Grab the unit type. */
                    unitType = match;

                    /* Strip the unit type off of value. */
                    return "";
                  });

                /* If no unit type was supplied, assign one that is appropriate for this property (e.g. "deg" for rotateZ or "px" for width). */
                if (!unitType) {
                  unitType = CSS.Values.getUnitType(property);
                }

                return [numericValue, unitType];
              }

              /* Separate startValue. */
              separatedValue = separateValue(property, startValue);
              startValue = separatedValue[0];
              startValueUnitType = separatedValue[1];

              /* Separate endValue, and extract a value operator (e.g. "+=", "-=") if one exists. */
              separatedValue = separateValue(property, endValue);
              endValue = separatedValue[0].replace(/^([+-\/*])=/, function(match, subMatch) {
                operator = subMatch;

                /* Strip the operator off of the value. */
                return "";
              });
              endValueUnitType = separatedValue[1];

              /* Parse float values from endValue and startValue. Default to 0 if NaN is returned. */
              startValue = parseFloat(startValue) || 0;
              endValue = parseFloat(endValue) || 0;

              /***************************************
                 Property-Specific Value Conversion
              ***************************************/

              /* Custom support for properties that don't actually accept the % unit type, but where pollyfilling is trivial and relatively foolproof. */
              if (endValueUnitType === "%") {
                /* A %-value fontSize/lineHeight is relative to the parent's fontSize (as opposed to the parent's dimensions),
                   which is identical to the em unit's behavior, so we piggyback off of that. */
                if (/^(fontSize|lineHeight)$/.test(property)) {
                  /* Convert % into an em decimal value. */
                  endValue = endValue / 100;
                  endValueUnitType = "em";
                  /* For scaleX and scaleY, convert the value into its decimal format and strip off the unit type. */
                } else if (/^scale/.test(property)) {
                  endValue = endValue / 100;
                  endValueUnitType = "";
                  /* For RGB components, take the defined percentage of 255 and strip off the unit type. */
                } else if (/(Red|Green|Blue)$/i.test(property)) {
                  endValue = (endValue / 100) * 255;
                  endValueUnitType = "";
                }
              }

              /***************************
                 Unit Ratio Calculation
              ***************************/

              /* When queried, the browser returns (most) CSS property values in pixels. Therefore, if an endValue with a unit type of
                 %, em, or rem is animated toward, startValue must be converted from pixels into the same unit type as endValue in order
                 for value manipulation logic (increment/decrement) to proceed. Further, if the startValue was forcefed or transferred
                 from a previous call, startValue may also not be in pixels. Unit conversion logic therefore consists of two steps:
                 1) Calculating the ratio of %/em/rem/vh/vw relative to pixels
                 2) Converting startValue into the same unit of measurement as endValue based on these ratios. */
              /* Unit conversion ratios are calculated by inserting a sibling node next to the target node, copying over its position property,
                 setting values with the target unit type then comparing the returned pixel value. */
              /* Note: Even if only one of these unit types is being animated, all unit ratios are calculated at once since the overhead
                 of batching the SETs and GETs together upfront outweights the potential overhead
                 of layout thrashing caused by re-querying for uncalculated ratios for subsequently-processed properties. */
              /* Todo: Shift this logic into the calls' first tick instance so that it's synced with RAF. */
              function calculateUnitRatios() {

                /************************
                    Same Ratio Checks
                ************************/

                /* The properties below are used to determine whether the element differs sufficiently from this call's
                   previously iterated element to also differ in its unit conversion ratios. If the properties match up with those
                   of the prior element, the prior element's conversion ratios are used. Like most optimizations in Velocity,
                   this is done to minimize DOM querying. */
                var sameRatioIndicators = {
                    myParent: element.parentNode || document.body,
                    /* GET */
                    position: CSS.getPropertyValue(element, "position"),
                    /* GET */
                    fontSize: CSS.getPropertyValue(element, "fontSize") /* GET */
                  },
                  /* Determine if the same % ratio can be used. % is based on the element's position value and its parent's width and height dimensions. */
                  samePercentRatio = ((sameRatioIndicators.position === callUnitConversionData.lastPosition) && (sameRatioIndicators.myParent === callUnitConversionData.lastParent)),
                  /* Determine if the same em ratio can be used. em is relative to the element's fontSize. */
                  sameEmRatio = (sameRatioIndicators.fontSize === callUnitConversionData.lastFontSize);

                /* Store these ratio indicators call-wide for the next element to compare against. */
                callUnitConversionData.lastParent = sameRatioIndicators.myParent;
                callUnitConversionData.lastPosition = sameRatioIndicators.position;
                callUnitConversionData.lastFontSize = sameRatioIndicators.fontSize;

                /***************************
                   Element-Specific Units
                ***************************/

                /* Note: IE8 rounds to the nearest pixel when returning CSS values, thus we perform conversions using a measurement
                   of 100 (instead of 1) to give our ratios a precision of at least 2 decimal values. */
                var measurement = 100,
                  unitRatios = {};

                if (!sameEmRatio || !samePercentRatio) {
                  var dummy = Data(element).isSVG ? document.createElementNS("http://www.w3.org/2000/svg", "rect") : document.createElement("div");

                  Velocity.init(dummy);
                  sameRatioIndicators.myParent.appendChild(dummy);

                  /* To accurately and consistently calculate conversion ratios, the element's cascaded overflow and box-sizing are stripped.
                     Similarly, since width/height can be artificially constrained by their min-/max- equivalents, these are controlled for as well. */
                  /* Note: Overflow must be also be controlled for per-axis since the overflow property overwrites its per-axis values. */
                  $.each(["overflow", "overflowX", "overflowY"], function(i, property) {
                    Velocity.CSS.setPropertyValue(dummy, property, "hidden");
                  });
                  Velocity.CSS.setPropertyValue(dummy, "position", sameRatioIndicators.position);
                  Velocity.CSS.setPropertyValue(dummy, "fontSize", sameRatioIndicators.fontSize);
                  Velocity.CSS.setPropertyValue(dummy, "boxSizing", "content-box");

                  /* width and height act as our proxy properties for measuring the horizontal and vertical % ratios. */
                  $.each(["minWidth", "maxWidth", "width", "minHeight", "maxHeight", "height"], function(i, property) {
                    Velocity.CSS.setPropertyValue(dummy, property, measurement + "%");
                  });
                  /* paddingLeft arbitrarily acts as our proxy property for the em ratio. */
                  Velocity.CSS.setPropertyValue(dummy, "paddingLeft", measurement + "em");

                  /* Divide the returned value by the measurement to get the ratio between 1% and 1px. Default to 1 since working with 0 can produce Infinite. */
                  unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth = (parseFloat(CSS.getPropertyValue(dummy, "width", null, true)) || 1) / measurement; /* GET */
                  unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight = (parseFloat(CSS.getPropertyValue(dummy, "height", null, true)) || 1) / measurement; /* GET */
                  unitRatios.emToPx = callUnitConversionData.lastEmToPx = (parseFloat(CSS.getPropertyValue(dummy, "paddingLeft")) || 1) / measurement; /* GET */

                  sameRatioIndicators.myParent.removeChild(dummy);
                } else {
                  unitRatios.emToPx = callUnitConversionData.lastEmToPx;
                  unitRatios.percentToPxWidth = callUnitConversionData.lastPercentToPxWidth;
                  unitRatios.percentToPxHeight = callUnitConversionData.lastPercentToPxHeight;
                }

                /***************************
                   Element-Agnostic Units
                ***************************/

                /* Whereas % and em ratios are determined on a per-element basis, the rem unit only needs to be checked
                   once per call since it's exclusively dependant upon document.body's fontSize. If this is the first time
                   that calculateUnitRatios() is being run during this call, remToPx will still be set to its default value of null,
                   so we calculate it now. */
                if (callUnitConversionData.remToPx === null) {
                  /* Default to browsers' default fontSize of 16px in the case of 0. */
                  callUnitConversionData.remToPx = parseFloat(CSS.getPropertyValue(document.body, "fontSize")) || 16; /* GET */
                }

                /* Similarly, viewport units are %-relative to the window's inner dimensions. */
                if (callUnitConversionData.vwToPx === null) {
                  callUnitConversionData.vwToPx = parseFloat(window.innerWidth) / 100; /* GET */
                  callUnitConversionData.vhToPx = parseFloat(window.innerHeight) / 100; /* GET */
                }

                unitRatios.remToPx = callUnitConversionData.remToPx;
                unitRatios.vwToPx = callUnitConversionData.vwToPx;
                unitRatios.vhToPx = callUnitConversionData.vhToPx;

                if (Velocity.debug >= 1) console.log("Unit ratios: " + JSON.stringify(unitRatios), element);

                return unitRatios;
              }

              /********************
                 Unit Conversion
              ********************/

              /* The * and / operators, which are not passed in with an associated unit, inherently use startValue's unit. Skip value and unit conversion. */
              if (/[\/*]/.test(operator)) {
                endValueUnitType = startValueUnitType;
                /* If startValue and endValue differ in unit type, convert startValue into the same unit type as endValue so that if endValueUnitType
                   is a relative unit (%, em, rem), the values set during tweening will continue to be accurately relative even if the metrics they depend
                   on are dynamically changing during the course of the animation. Conversely, if we always normalized into px and used px for setting values, the px ratio
                   would become stale if the original unit being animated toward was relative and the underlying metrics change during the animation. */
                /* Since 0 is 0 in any unit type, no conversion is necessary when startValue is 0 -- we just start at 0 with endValueUnitType. */
              } else if ((startValueUnitType !== endValueUnitType) && startValue !== 0) {
                /* Unit conversion is also skipped when endValue is 0, but *startValueUnitType* must be used for tween values to remain accurate. */
                /* Note: Skipping unit conversion here means that if endValueUnitType was originally a relative unit, the animation won't relatively
                   match the underlying metrics if they change, but this is acceptable since we're animating toward invisibility instead of toward visibility,
                   which remains past the point of the animation's completion. */
                if (endValue === 0) {
                  endValueUnitType = startValueUnitType;
                } else {
                  /* By this point, we cannot avoid unit conversion (it's undesirable since it causes layout thrashing).
                     If we haven't already, we trigger calculateUnitRatios(), which runs once per element per call. */
                  elementUnitConversionData = elementUnitConversionData || calculateUnitRatios();

                  /* The following RegEx matches CSS properties that have their % values measured relative to the x-axis. */
                  /* Note: W3C spec mandates that all of margin and padding's properties (even top and bottom) are %-relative to the *width* of the parent element. */
                  var axis = (/margin|padding|left|right|width|text|word|letter/i.test(property) || /X$/.test(property) || property === "x") ? "x" : "y";

                  /* In order to avoid generating n^2 bespoke conversion functions, unit conversion is a two-step process:
                     1) Convert startValue into pixels. 2) Convert this new pixel value into endValue's unit type. */
                  switch (startValueUnitType) {
                    case "%":
                      /* Note: translateX and translateY are the only properties that are %-relative to an element's own dimensions -- not its parent's dimensions.
                         Velocity does not include a special conversion process to account for this behavior. Therefore, animating translateX/Y from a % value
                         to a non-% value will produce an incorrect start value. Fortunately, this sort of cross-unit conversion is rarely done by users in practice. */
                      startValue *= (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                      break;

                    case "px":
                      /* px acts as our midpoint in the unit conversion process; do nothing. */
                      break;

                    default:
                      startValue *= elementUnitConversionData[startValueUnitType + "ToPx"];
                  }

                  /* Invert the px ratios to convert into to the target unit. */
                  switch (endValueUnitType) {
                    case "%":
                      startValue *= 1 / (axis === "x" ? elementUnitConversionData.percentToPxWidth : elementUnitConversionData.percentToPxHeight);
                      break;

                    case "px":
                      /* startValue is already in px, do nothing; we're done. */
                      break;

                    default:
                      startValue *= 1 / elementUnitConversionData[endValueUnitType + "ToPx"];
                  }
                }
              }

              /*********************
                 Relative Values
              *********************/

              /* Operator logic must be performed last since it requires unit-normalized start and end values. */
              /* Note: Relative *percent values* do not behave how most people think; while one would expect "+=50%"
                 to increase the property 1.5x its current value, it in fact increases the percent units in absolute terms:
                 50 points is added on top of the current % value. */
              switch (operator) {
                case "+":
                  endValue = startValue + endValue;
                  break;

                case "-":
                  endValue = startValue - endValue;
                  break;

                case "*":
                  endValue = startValue * endValue;
                  break;

                case "/":
                  endValue = startValue / endValue;
                  break;
              }

              /**************************
                 tweensContainer Push
              **************************/

              /* Construct the per-property tween object, and push it to the element's tweensContainer. */
              tweensContainer[property] = {
                rootPropertyValue: rootPropertyValue,
                startValue: startValue,
                currentValue: startValue,
                endValue: endValue,
                unitType: endValueUnitType,
                easing: easing
              };

              if (Velocity.debug) console.log("tweensContainer (" + property + "): " + JSON.stringify(tweensContainer[property]), element);
            }

            /* Along with its property data, store a reference to the element itself onto tweensContainer. */
            tweensContainer.element = element;
          }

          /*****************
              Call Push
          *****************/

          /* Note: tweensContainer can be empty if all of the properties in this call's property map were skipped due to not
             being supported by the browser. The element property is used for checking that the tweensContainer has been appended to. */
          if (tweensContainer.element) {
            /* Apply the "velocity-animating" indicator class. */
            CSS.Values.addClass(element, "velocity-animating");

            /* The call array houses the tweensContainers for each element being animated in the current call. */
            call.push(tweensContainer);

            /* Store the tweensContainer and options if we're working on the default effects queue, so that they can be used by the reverse command. */
            if (opts.queue === "") {
              Data(element).tweensContainer = tweensContainer;
              Data(element).opts = opts;
            }

            /* Switch on the element's animating flag. */
            Data(element).isAnimating = true;

            /* Once the final element in this call's element set has been processed, push the call array onto
               Velocity.State.calls for the animation tick to immediately begin processing. */
            if (elementsIndex === elementsLength - 1) {
              /* Add the current call plus its associated metadata (the element set and the call's options) onto the global call container.
                 Anything on this call container is subjected to tick() processing. */
              Velocity.State.calls.push([call, elements, opts, null, promiseData.resolver]);

              /* If the animation tick isn't running, start it. (Velocity shuts it off when there are no active calls to process.) */
              if (Velocity.State.isTicking === false) {
                Velocity.State.isTicking = true;

                /* Start the tick loop. */
                tick();
              }
            } else {
              elementsIndex++;
            }
          }
        }

        /* When the queue option is set to false, the call skips the element's queue and fires immediately. */
        if (opts.queue === false) {
          /* Since this buildQueue call doesn't respect the element's existing queue (which is where a delay option would have been appended),
             we manually inject the delay property here with an explicit setTimeout. */
          if (opts.delay) {
            setTimeout(buildQueue, opts.delay);
          } else {
            buildQueue();
          }
          /* Otherwise, the call undergoes element queueing as normal. */
          /* Note: To interoperate with jQuery, Velocity uses jQuery's own $.queue() stack for queuing logic. */
        } else {
          $.queue(element, opts.queue, function(next, clearQueue) {
            /* If the clearQueue flag was passed in by the stop command, resolve this call's promise. (Promises can only be resolved once,
               so it's fine if this is repeatedly triggered for each element in the associated call.) */
            if (clearQueue === true) {
              if (promiseData.promise) {
                promiseData.resolver(elements);
              }

              /* Do not continue with animation queueing. */
              return true;
            }

            /* This flag indicates to the upcoming completeCall() function that this queue entry was initiated by Velocity.
               See completeCall() for further details. */
            Velocity.velocityQueueEntryFlag = true;

            buildQueue(next);
          });
        }

        /*********************
            Auto-Dequeuing
        *********************/

        /* As per jQuery's $.queue() behavior, to fire the first non-custom-queue entry on an element, the element
           must be dequeued if its queue stack consists *solely* of the current call. (This can be determined by checking
           for the "inprogress" item that jQuery prepends to active queue stack arrays.) Regardless, whenever the element's
           queue is further appended with additional items -- including $.delay()'s or even $.animate() calls, the queue's
           first entry is automatically fired. This behavior contrasts that of custom queues, which never auto-fire. */
        /* Note: When an element set is being subjected to a non-parallel Velocity call, the animation will not begin until
           each one of the elements in the set has reached the end of its individually pre-existing queue chain. */
        /* Note: Unfortunately, most people don't fully grasp jQuery's powerful, yet quirky, $.queue() function.
           Lean more here: http://stackoverflow.com/questions/1058158/can-somebody-explain-jquery-queue-to-me */
        if ((opts.queue === "" || opts.queue === "fx") && $.queue(element)[0] !== "inprogress") {
          $.dequeue(element);
        }
      }

      /**************************
         Element Set Iteration
      **************************/

      /* If the "nodeType" property exists on the elements variable, we're animating a single element.
         Place it in an array so that $.each() can iterate over it. */
      $.each(elements, function(i, element) {
        /* Ensure each element in a set has a nodeType (is a real element) to avoid throwing errors. */
        if (Type.isNode(element)) {
          processElement.call(element);
        }
      });

      /******************
         Option: Loop
      ******************/

      /* The loop option accepts an integer indicating how many times the element should loop between the values in the
         current call's properties map and the element's property values prior to this call. */
      /* Note: The loop option's logic is performed here -- after element processing -- because the current call needs
         to undergo its queue insertion prior to the loop option generating its series of constituent "reverse" calls,
         which chain after the current call. Two reverse calls (two "alternations") constitute one loop. */
      var opts = $.extend({}, Velocity.defaults, options),
        reverseCallsCount;

      opts.loop = parseInt(opts.loop);
      reverseCallsCount = (opts.loop * 2) - 1;

      if (opts.loop) {
        /* Double the loop count to convert it into its appropriate number of "reverse" calls.
           Subtract 1 from the resulting value since the current call is included in the total alternation count. */
        for (var x = 0; x < reverseCallsCount; x++) {
          /* Since the logic for the reverse action occurs inside Queueing and therefore this call's options object
             isn't parsed until then as well, the current call's delay option must be explicitly passed into the reverse
             call so that the delay logic that occurs inside *Pre-Queueing* can process it. */
          var reverseOptions = {
            delay: opts.delay,
            progress: opts.progress
          };

          /* If a complete callback was passed into this call, transfer it to the loop redirect's final "reverse" call
             so that it's triggered when the entire redirect is complete (and not when the very first animation is complete). */
          if (x === reverseCallsCount - 1) {
            reverseOptions.display = opts.display;
            reverseOptions.visibility = opts.visibility;
            reverseOptions.complete = opts.complete;
          }

          animate(elements, "reverse", reverseOptions);
        }
      }

      /***************
          Chaining
      ***************/

      /* Return the elements back to the call chain, with wrapped elements taking precedence in case Velocity was called via the $.fn. extension. */
      return getChain();
    };

    /* Turn Velocity into the animation function, extended with the pre-existing Velocity object. */
    Velocity = $.extend(animate, Velocity);
    /* For legacy support, also expose the literal animate method. */
    Velocity.animate = animate;

    /**************
        Timing
    **************/

    /* Ticker function. */
    var ticker = window.requestAnimationFrame || rAFShim;

    /* Inactive browser tabs pause rAF, which results in all active animations immediately sprinting to their completion states when the tab refocuses.
       To get around this, we dynamically switch rAF to setTimeout (which the browser *doesn't* pause) when the tab loses focus. We skip this for mobile
       devices to avoid wasting battery power on inactive tabs. */
    /* Note: Tab focus detection doesn't work on older versions of IE, but that's okay since they don't support rAF to begin with. */
    if (!Velocity.State.isMobile && document.hidden !== undefined) {
      document.addEventListener("visibilitychange", function() {
        /* Reassign the rAF function (which the global tick() function uses) based on the tab's focus state. */
        if (document.hidden) {
          ticker = function(callback) {
            /* The tick function needs a truthy first argument in order to pass its internal timestamp check. */
            return setTimeout(function() { callback(true) }, 16);
          };

          /* The rAF loop has been paused by the browser, so we manually restart the tick. */
          tick();
        } else {
          ticker = window.requestAnimationFrame || rAFShim;
        }
      });
    }

    /************
        Tick
    ************/

    /* Note: All calls to Velocity are pushed to the Velocity.State.calls array, which is fully iterated through upon each tick. */
    function tick(timestamp) {
      /* An empty timestamp argument indicates that this is the first tick occurence since ticking was turned on.
         We leverage this metadata to fully ignore the first tick pass since RAF's initial pass is fired whenever
         the browser's next tick sync time occurs, which results in the first elements subjected to Velocity
         calls being animated out of sync with any elements animated immediately thereafter. In short, we ignore
         the first RAF tick pass so that elements being immediately consecutively animated -- instead of simultaneously animated
         by the same Velocity call -- are properly batched into the same initial RAF tick and consequently remain in sync thereafter. */
      if (timestamp) {
        /* We ignore RAF's high resolution timestamp since it can be significantly offset when the browser is
           under high stress; we opt for choppiness over allowing the browser to drop huge chunks of frames. */
        var timeCurrent = (new Date).getTime();

        /********************
           Call Iteration
        ********************/

        var callsLength = Velocity.State.calls.length;

        /* To speed up iterating over this array, it is compacted (falsey items -- calls that have completed -- are removed)
           when its length has ballooned to a point that can impact tick performance. This only becomes necessary when animation
           has been continuous with many elements over a long period of time; whenever all active calls are completed, completeCall() clears Velocity.State.calls. */
        if (callsLength > 10000) {
          Velocity.State.calls = compactSparseArray(Velocity.State.calls);
        }

        /* Iterate through each active call. */
        for (var i = 0; i < callsLength; i++) {
          /* When a Velocity call is completed, its Velocity.State.calls entry is set to false. Continue on to the next call. */
          if (!Velocity.State.calls[i]) {
            continue;
          }

          /************************
             Call-Wide Variables
          ************************/

          var callContainer = Velocity.State.calls[i],
            call = callContainer[0],
            opts = callContainer[2],
            timeStart = callContainer[3],
            firstTick = !!timeStart,
            tweenDummyValue = null;

          /* If timeStart is undefined, then this is the first time that this call has been processed by tick().
             We assign timeStart now so that its value is as close to the real animation start time as possible.
             (Conversely, had timeStart been defined when this call was added to Velocity.State.calls, the delay
             between that time and now would cause the first few frames of the tween to be skipped since
             percentComplete is calculated relative to timeStart.) */
          /* Further, subtract 16ms (the approximate resolution of RAF) from the current time value so that the
             first tick iteration isn't wasted by animating at 0% tween completion, which would produce the
             same style value as the element's current value. */
          if (!timeStart) {
            timeStart = Velocity.State.calls[i][3] = timeCurrent - 16;
          }

          /* The tween's completion percentage is relative to the tween's start time, not the tween's start value
             (which would result in unpredictable tween durations since JavaScript's timers are not particularly accurate).
             Accordingly, we ensure that percentComplete does not exceed 1. */
          var percentComplete = Math.min((timeCurrent - timeStart) / opts.duration, 1);

          /**********************
             Element Iteration
          **********************/

          /* For every call, iterate through each of the elements in its set. */
          for (var j = 0, callLength = call.length; j < callLength; j++) {
            var tweensContainer = call[j],
              element = tweensContainer.element;

            /* Check to see if this element has been deleted midway through the animation by checking for the
               continued existence of its data cache. If it's gone, skip animating this element. */
            if (!Data(element)) {
              continue;
            }

            var transformPropertyExists = false;

            /**********************************
               Display & Visibility Toggling
            **********************************/

            /* If the display option is set to non-"none", set it upfront so that the element can become visible before tweening begins.
               (Otherwise, display's "none" value is set in completeCall() once the animation has completed.) */
            if (opts.display !== undefined && opts.display !== null && opts.display !== "none") {
              if (opts.display === "flex") {
                var flexValues = ["-webkit-box", "-moz-box", "-ms-flexbox", "-webkit-flex"];

                $.each(flexValues, function(i, flexValue) {
                  CSS.setPropertyValue(element, "display", flexValue);
                });
              }

              CSS.setPropertyValue(element, "display", opts.display);
            }

            /* Same goes with the visibility option, but its "none" equivalent is "hidden". */
            if (opts.visibility !== undefined && opts.visibility !== "hidden") {
              CSS.setPropertyValue(element, "visibility", opts.visibility);
            }

            /************************
               Property Iteration
            ************************/

            /* For every element, iterate through each property. */
            for (var property in tweensContainer) {
              /* Note: In addition to property tween data, tweensContainer contains a reference to its associated element. */
              if (property !== "element") {
                var tween = tweensContainer[property],
                  currentValue,
                  /* Easing can either be a pre-genereated function or a string that references a pre-registered easing
                     on the Velocity.Easings object. In either case, return the appropriate easing *function*. */
                  easing = Type.isString(tween.easing) ? Velocity.Easings[tween.easing] : tween.easing;

                /******************************
                   Current Value Calculation
                ******************************/

                /* If this is the last tick pass (if we've reached 100% completion for this tween),
                   ensure that currentValue is explicitly set to its target endValue so that it's not subjected to any rounding. */
                if (percentComplete === 1) {
                  currentValue = tween.endValue;
                  /* Otherwise, calculate currentValue based on the current delta from startValue. */
                } else {
                  var tweenDelta = tween.endValue - tween.startValue;
                  currentValue = tween.startValue + (tweenDelta * easing(percentComplete, opts, tweenDelta));

                  /* If no value change is occurring, don't proceed with DOM updating. */
                  if (!firstTick && (currentValue === tween.currentValue)) {
                    continue;
                  }
                }

                tween.currentValue = currentValue;

                /* If we're tweening a fake 'tween' property in order to log transition values, update the one-per-call variable so that
                   it can be passed into the progress callback. */
                if (property === "tween") {
                  tweenDummyValue = currentValue;
                } else {
                  /******************
                     Hooks: Part I
                  ******************/

                  /* For hooked properties, the newly-updated rootPropertyValueCache is cached onto the element so that it can be used
                     for subsequent hooks in this call that are associated with the same root property. If we didn't cache the updated
                     rootPropertyValue, each subsequent update to the root property in this tick pass would reset the previous hook's
                     updates to rootPropertyValue prior to injection. A nice performance byproduct of rootPropertyValue caching is that
                     subsequently chained animations using the same hookRoot but a different hook can use this cached rootPropertyValue. */
                  if (CSS.Hooks.registered[property]) {
                    var hookRoot = CSS.Hooks.getRoot(property),
                      rootPropertyValueCache = Data(element).rootPropertyValueCache[hookRoot];

                    if (rootPropertyValueCache) {
                      tween.rootPropertyValue = rootPropertyValueCache;
                    }
                  }

                  /*****************
                      DOM Update
                  *****************/

                  /* setPropertyValue() returns an array of the property name and property value post any normalization that may have been performed. */
                  /* Note: To solve an IE<=8 positioning bug, the unit type is dropped when setting a property value of 0. */
                  var adjustedSetData = CSS.setPropertyValue(element, /* SET */
                    property,
                    tween.currentValue + (parseFloat(currentValue) === 0 ? "" : tween.unitType),
                    tween.rootPropertyValue,
                    tween.scrollData);

                  /*******************
                     Hooks: Part II
                  *******************/

                  /* Now that we have the hook's updated rootPropertyValue (the post-processed value provided by adjustedSetData), cache it onto the element. */
                  if (CSS.Hooks.registered[property]) {
                    /* Since adjustedSetData contains normalized data ready for DOM updating, the rootPropertyValue needs to be re-extracted from its normalized form. ?? */
                    if (CSS.Normalizations.registered[hookRoot]) {
                      Data(element).rootPropertyValueCache[hookRoot] = CSS.Normalizations.registered[hookRoot]("extract", null, adjustedSetData[1]);
                    } else {
                      Data(element).rootPropertyValueCache[hookRoot] = adjustedSetData[1];
                    }
                  }

                  /***************
                     Transforms
                  ***************/

                  /* Flag whether a transform property is being animated so that flushTransformCache() can be triggered once this tick pass is complete. */
                  if (adjustedSetData[0] === "transform") {
                    transformPropertyExists = true;
                  }

                }
              }
            }

            /****************
                mobileHA
            ****************/

            /* If mobileHA is enabled, set the translate3d transform to null to force hardware acceleration.
               It's safe to override this property since Velocity doesn't actually support its animation (hooks are used in its place). */
            if (opts.mobileHA) {
              /* Don't set the null transform hack if we've already done so. */
              if (Data(element).transformCache.translate3d === undefined) {
                /* All entries on the transformCache object are later concatenated into a single transform string via flushTransformCache(). */
                Data(element).transformCache.translate3d = "(0px, 0px, 0px)";

                transformPropertyExists = true;
              }
            }

            if (transformPropertyExists) {
              CSS.flushTransformCache(element);
            }
          }

          /* The non-"none" display value is only applied to an element once -- when its associated call is first ticked through.
             Accordingly, it's set to false so that it isn't re-processed by this call in the next tick. */
          if (opts.display !== undefined && opts.display !== "none") {
            Velocity.State.calls[i][2].display = false;
          }
          if (opts.visibility !== undefined && opts.visibility !== "hidden") {
            Velocity.State.calls[i][2].visibility = false;
          }

          /* Pass the elements and the timing data (percentComplete, msRemaining, timeStart, tweenDummyValue) into the progress callback. */
          if (opts.progress) {
            opts.progress.call(callContainer[1],
              callContainer[1],
              percentComplete,
              Math.max(0, (timeStart + opts.duration) - timeCurrent),
              timeStart,
              tweenDummyValue);
          }

          /* If this call has finished tweening, pass its index to completeCall() to handle call cleanup. */
          if (percentComplete === 1) {
            completeCall(i);
          }
        }
      }

      /* Note: completeCall() sets the isTicking flag to false when the last call on Velocity.State.calls has completed. */
      if (Velocity.State.isTicking) {
        ticker(tick);
      }
    }

    /**********************
        Call Completion
    **********************/

    /* Note: Unlike tick(), which processes all active calls at once, call completion is handled on a per-call basis. */
    function completeCall(callIndex, isStopped) {
      /* Ensure the call exists. */
      if (!Velocity.State.calls[callIndex]) {
        return false;
      }

      /* Pull the metadata from the call. */
      var call = Velocity.State.calls[callIndex][0],
        elements = Velocity.State.calls[callIndex][1],
        opts = Velocity.State.calls[callIndex][2],
        resolver = Velocity.State.calls[callIndex][4];

      var remainingCallsExist = false;

      /*************************
         Element Finalization
      *************************/

      for (var i = 0, callLength = call.length; i < callLength; i++) {
        var element = call[i].element;

        /* If the user set display to "none" (intending to hide the element), set it now that the animation has completed. */
        /* Note: display:none isn't set when calls are manually stopped (via Velocity("stop"). */
        /* Note: Display gets ignored with "reverse" calls and infinite loops, since this behavior would be undesirable. */
        if (!isStopped && !opts.loop) {
          if (opts.display === "none") {
            CSS.setPropertyValue(element, "display", opts.display);
          }

          if (opts.visibility === "hidden") {
            CSS.setPropertyValue(element, "visibility", opts.visibility);
          }
        }

        /* If the element's queue is empty (if only the "inprogress" item is left at position 0) or if its queue is about to run
           a non-Velocity-initiated entry, turn off the isAnimating flag. A non-Velocity-initiatied queue entry's logic might alter
           an element's CSS values and thereby cause Velocity's cached value data to go stale. To detect if a queue entry was initiated by Velocity,
           we check for the existence of our special Velocity.queueEntryFlag declaration, which minifiers won't rename since the flag
           is assigned to jQuery's global $ object and thus exists out of Velocity's own scope. */
        if (opts.loop !== true && ($.queue(element)[1] === undefined || !/\.velocityQueueEntryFlag/i.test($.queue(element)[1]))) {
          /* The element may have been deleted. Ensure that its data cache still exists before acting on it. */
          if (Data(element)) {
            Data(element).isAnimating = false;
            /* Clear the element's rootPropertyValueCache, which will become stale. */
            Data(element).rootPropertyValueCache = {};

            var transformHAPropertyExists = false;
            /* If any 3D transform subproperty is at its default value (regardless of unit type), remove it. */
            $.each(CSS.Lists.transforms3D, function(i, transformName) {
              var defaultValue = /^scale/.test(transformName) ? 1 : 0,
                currentValue = Data(element).transformCache[transformName];

              if (Data(element).transformCache[transformName] !== undefined && new RegExp("^\\(" + defaultValue + "[^.]").test(currentValue)) {
                transformHAPropertyExists = true;

                delete Data(element).transformCache[transformName];
              }
            });

            /* Mobile devices have hardware acceleration removed at the end of the animation in order to avoid hogging the GPU's memory. */
            if (opts.mobileHA) {
              transformHAPropertyExists = true;
              delete Data(element).transformCache.translate3d;
            }

            /* Flush the subproperty removals to the DOM. */
            if (transformHAPropertyExists) {
              CSS.flushTransformCache(element);
            }

            /* Remove the "velocity-animating" indicator class. */
            CSS.Values.removeClass(element, "velocity-animating");
          }
        }

        /*********************
           Option: Complete
        *********************/

        /* Complete is fired once per call (not once per element) and is passed the full raw DOM element set as both its context and its first argument. */
        /* Note: Callbacks aren't fired when calls are manually stopped (via Velocity("stop"). */
        if (!isStopped && opts.complete && !opts.loop && (i === callLength - 1)) {
          /* We throw callbacks in a setTimeout so that thrown errors don't halt the execution of Velocity itself. */
          try {
            opts.complete.call(elements, elements);
          } catch (error) {
            setTimeout(function() {
              throw error; }, 1);
          }
        }

        /**********************
           Promise Resolving
        **********************/

        /* Note: Infinite loops don't return promises. */
        if (resolver && opts.loop !== true) {
          resolver(elements);
        }

        /****************************
           Option: Loop (Infinite)
        ****************************/

        if (Data(element) && opts.loop === true && !isStopped) {
          /* If a rotateX/Y/Z property is being animated to 360 deg with loop:true, swap tween start/end values to enable
             continuous iterative rotation looping. (Otherise, the element would just rotate back and forth.) */
          $.each(Data(element).tweensContainer, function(propertyName, tweenContainer) {
            if (/^rotate/.test(propertyName) && parseFloat(tweenContainer.endValue) === 360) {
              tweenContainer.endValue = 0;
              tweenContainer.startValue = 360;
            }

            if (/^backgroundPosition/.test(propertyName) && parseFloat(tweenContainer.endValue) === 100 && tweenContainer.unitType === "%") {
              tweenContainer.endValue = 0;
              tweenContainer.startValue = 100;
            }
          });

          Velocity(element, "reverse", { loop: true, delay: opts.delay });
        }

        /***************
           Dequeueing
        ***************/

        /* Fire the next call in the queue so long as this call's queue wasn't set to false (to trigger a parallel animation),
           which would have already caused the next call to fire. Note: Even if the end of the animation queue has been reached,
           $.dequeue() must still be called in order to completely clear jQuery's animation queue. */
        if (opts.queue !== false) {
          $.dequeue(element, opts.queue);
        }
      }

      /************************
         Calls Array Cleanup
      ************************/

      /* Since this call is complete, set it to false so that the rAF tick skips it. This array is later compacted via compactSparseArray().
        (For performance reasons, the call is set to false instead of being deleted from the array: http://www.html5rocks.com/en/tutorials/speed/v8/) */
      Velocity.State.calls[callIndex] = false;

      /* Iterate through the calls array to determine if this was the final in-progress animation.
         If so, set a flag to end ticking and clear the calls array. */
      for (var j = 0, callsLength = Velocity.State.calls.length; j < callsLength; j++) {
        if (Velocity.State.calls[j] !== false) {
          remainingCallsExist = true;

          break;
        }
      }

      if (remainingCallsExist === false) {
        /* tick() will detect this flag upon its next iteration and subsequently turn itself off. */
        Velocity.State.isTicking = false;

        /* Clear the calls array so that its length is reset. */
        delete Velocity.State.calls;
        Velocity.State.calls = [];
      }
    }

    /******************
        Frameworks
    ******************/

    /* Both jQuery and Zepto allow their $.fn object to be extended to allow wrapped elements to be subjected to plugin calls.
       If either framework is loaded, register a "velocity" extension pointing to Velocity's core animate() method.  Velocity
       also registers itself onto a global container (window.jQuery || window.Zepto || window) so that certain features are
       accessible beyond just a per-element scope. This master object contains an .animate() method, which is later assigned to $.fn
       (if jQuery or Zepto are present). Accordingly, Velocity can both act on wrapped DOM elements and stand alone for targeting raw DOM elements. */
    global.Velocity = Velocity;

    if (global !== window) {
      /* Assign the element function to Velocity's core animate() method. */
      global.fn.velocity = animate;
      /* Assign the object function's defaults to Velocity's global defaults object. */
      global.fn.velocity.defaults = Velocity.defaults;
    }

    /***********************
       Packaged Redirects
    ***********************/

    /* slideUp, slideDown */
    $.each(["Down", "Up"], function(i, direction) {
      Velocity.Redirects["slide" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
        var opts = $.extend({}, options),
          begin = opts.begin,
          complete = opts.complete,
          computedValues = { height: "", marginTop: "", marginBottom: "", paddingTop: "", paddingBottom: "" },
          inlineValues = {};

        if (opts.display === undefined) {
          /* Show the element before slideDown begins and hide the element after slideUp completes. */
          /* Note: Inline elements cannot have dimensions animated, so they're reverted to inline-block. */
          opts.display = (direction === "Down" ? (Velocity.CSS.Values.getDisplayType(element) === "inline" ? "inline-block" : "block") : "none");
        }

        opts.begin = function() {
          /* If the user passed in a begin callback, fire it now. */
          begin && begin.call(elements, elements);

          /* Cache the elements' original vertical dimensional property values so that we can animate back to them. */
          for (var property in computedValues) {
            inlineValues[property] = element.style[property];

            /* For slideDown, use forcefeeding to animate all vertical properties from 0. For slideUp,
               use forcefeeding to start from computed values and animate down to 0. */
            var propertyValue = Velocity.CSS.getPropertyValue(element, property);
            computedValues[property] = (direction === "Down") ? [propertyValue, 0] : [0, propertyValue];
          }

          /* Force vertical overflow content to clip so that sliding works as expected. */
          inlineValues.overflow = element.style.overflow;
          element.style.overflow = "hidden";
        }

        opts.complete = function() {
          /* Reset element to its pre-slide inline values once its slide animation is complete. */
          for (var property in inlineValues) {
            element.style[property] = inlineValues[property];
          }

          /* If the user passed in a complete callback, fire it now. */
          complete && complete.call(elements, elements);
          promiseData && promiseData.resolver(elements);
        };

        Velocity(element, computedValues, opts);
      };
    });

    /* fadeIn, fadeOut */
    $.each(["In", "Out"], function(i, direction) {
      Velocity.Redirects["fade" + direction] = function(element, options, elementsIndex, elementsSize, elements, promiseData) {
        var opts = $.extend({}, options),
          propertiesMap = { opacity: (direction === "In") ? 1 : 0 },
          originalComplete = opts.complete;

        /* Since redirects are triggered individually for each element in the animated set, avoid repeatedly triggering
           callbacks by firing them only when the final element has been reached. */
        if (elementsIndex !== elementsSize - 1) {
          opts.complete = opts.begin = null;
        } else {
          opts.complete = function() {
            if (originalComplete) {
              originalComplete.call(elements, elements);
            }

            promiseData && promiseData.resolver(elements);
          }
        }

        /* If a display was passed in, use it. Otherwise, default to "none" for fadeOut or the element-specific default for fadeIn. */
        /* Note: We allow users to pass in "null" to skip display setting altogether. */
        if (opts.display === undefined) {
          opts.display = (direction === "In" ? "auto" : "none");
        }

        Velocity(this, propertiesMap, opts);
      };
    });

    return Velocity;
  }((window.jQuery || window.Zepto || window), window, document);
}));

/******************
   Known Issues
******************/

/* The CSS spec mandates that the translateX/Y/Z transforms are %-relative to the element itself -- not its parent.
Velocity, however, doesn't make this distinction. Thus, converting to or from the % unit with these subproperties
will produce an inaccurate conversion value. The same issue exists with the cx/cy attributes of SVG circles and ellipses. */

(function() {
  //assign all blockquote content to an html collection/variable
  var blockQuotes = document.querySelectorAll('blockquote > p');
  //create new regex test for ' - ' (with one whitespace on each side so as not to accidentally grab hyphenated words as well)
  var hyphenTest = new RegExp(/\s\-\s/);
  //iterate through all html blocks within the blockquotes html collection
  for (var i = 0; i < blockQuotes.length; i++) {
    //check for ' - ' in the blockquote's text content
    if (hyphenTest.test(blockQuotes[i].textContent)) {
      //if true, split existing inner HTML into two-part array
      //newQuoteContent === text leading up to hyphen
      var newQuoteContent = blockQuotes[i].innerHTML.split(' - ')[0];
      //newAuthorAttr === text after hyphen
      var newAuthorAttr = blockQuotes[i].innerHTML.split(' - ')[1];
      //fill blockquote paragraph with new content, but now with a <cite> wrapper around the author callout and the appropriate quotation dash.
      //2016-06-25: adding selectionShareable to each of the p elements to make them selectable like the rest of <p> on page.
      blockQuotes[i].parentNode.innerHTML = '<p class=\"selectionShareable\">' + newQuoteContent + '<cite class="blockquote-citation">&#x2015; ' + newAuthorAttr + '</cite>' + '</p>';
    }
  }
})();
// /*! highlight.js v9.2.0 | BSD3 License | git.io/hljslicense */
// /*Custom version including highlighting for JavaScript, HTML, CSS, BASH, JSON, YAML downloaded from https://highlightjs.org/download/
// */
// !function(e){var n="object"==typeof window&&window||"object"==typeof self&&self;"undefined"!=typeof exports?e(exports):n&&(n.hljs=e({}),"function"==typeof define&&define.amd&&define([],function(){return n.hljs}))}(function(e){function n(e){return e.replace(/&/gm,"&amp;").replace(/</gm,"&lt;").replace(/>/gm,"&gt;")}function t(e){return e.nodeName.toLowerCase()}function r(e,n){var t=e&&e.exec(n);return t&&0==t.index}function a(e){return/^(no-?highlight|plain|text)$/i.test(e)}function i(e){var n,t,r,i=e.className+" ";if(i+=e.parentNode?e.parentNode.className:"",t=/\blang(?:uage)?-([\w-]+)\b/i.exec(i))return w(t[1])?t[1]:"no-highlight";for(i=i.split(/\s+/),n=0,r=i.length;r>n;n++)if(w(i[n])||a(i[n]))return i[n]}function o(e,n){var t,r={};for(t in e)r[t]=e[t];if(n)for(t in n)r[t]=n[t];return r}function u(e){var n=[];return function r(e,a){for(var i=e.firstChild;i;i=i.nextSibling)3==i.nodeType?a+=i.nodeValue.length:1==i.nodeType&&(n.push({event:"start",offset:a,node:i}),a=r(i,a),t(i).match(/br|hr|img|input/)||n.push({event:"stop",offset:a,node:i}));return a}(e,0),n}function c(e,r,a){function i(){return e.length&&r.length?e[0].offset!=r[0].offset?e[0].offset<r[0].offset?e:r:"start"==r[0].event?e:r:e.length?e:r}function o(e){function r(e){return" "+e.nodeName+'="'+n(e.value)+'"'}f+="<"+t(e)+Array.prototype.map.call(e.attributes,r).join("")+">"}function u(e){f+="</"+t(e)+">"}function c(e){("start"==e.event?o:u)(e.node)}for(var s=0,f="",l=[];e.length||r.length;){var g=i();if(f+=n(a.substr(s,g[0].offset-s)),s=g[0].offset,g==e){l.reverse().forEach(u);do c(g.splice(0,1)[0]),g=i();while(g==e&&g.length&&g[0].offset==s);l.reverse().forEach(o)}else"start"==g[0].event?l.push(g[0].node):l.pop(),c(g.splice(0,1)[0])}return f+n(a.substr(s))}function s(e){function n(e){return e&&e.source||e}function t(t,r){return new RegExp(n(t),"m"+(e.cI?"i":"")+(r?"g":""))}function r(a,i){if(!a.compiled){if(a.compiled=!0,a.k=a.k||a.bK,a.k){var u={},c=function(n,t){e.cI&&(t=t.toLowerCase()),t.split(" ").forEach(function(e){var t=e.split("|");u[t[0]]=[n,t[1]?Number(t[1]):1]})};"string"==typeof a.k?c("keyword",a.k):Object.keys(a.k).forEach(function(e){c(e,a.k[e])}),a.k=u}a.lR=t(a.l||/\b\w+\b/,!0),i&&(a.bK&&(a.b="\\b("+a.bK.split(" ").join("|")+")\\b"),a.b||(a.b=/\B|\b/),a.bR=t(a.b),a.e||a.eW||(a.e=/\B|\b/),a.e&&(a.eR=t(a.e)),a.tE=n(a.e)||"",a.eW&&i.tE&&(a.tE+=(a.e?"|":"")+i.tE)),a.i&&(a.iR=t(a.i)),void 0===a.r&&(a.r=1),a.c||(a.c=[]);var s=[];a.c.forEach(function(e){e.v?e.v.forEach(function(n){s.push(o(e,n))}):s.push("self"==e?a:e)}),a.c=s,a.c.forEach(function(e){r(e,a)}),a.starts&&r(a.starts,i);var f=a.c.map(function(e){return e.bK?"\\.?("+e.b+")\\.?":e.b}).concat([a.tE,a.i]).map(n).filter(Boolean);a.t=f.length?t(f.join("|"),!0):{exec:function(){return null}}}}r(e)}function f(e,t,a,i){function o(e,n){for(var t=0;t<n.c.length;t++)if(r(n.c[t].bR,e))return n.c[t]}function u(e,n){if(r(e.eR,n)){for(;e.endsParent&&e.parent;)e=e.parent;return e}return e.eW?u(e.parent,n):void 0}function c(e,n){return!a&&r(n.iR,e)}function g(e,n){var t=N.cI?n[0].toLowerCase():n[0];return e.k.hasOwnProperty(t)&&e.k[t]}function p(e,n,t,r){var a=r?"":E.classPrefix,i='<span class="'+a,o=t?"":"</span>";return i+=e+'">',i+n+o}function h(){if(!k.k)return n(M);var e="",t=0;k.lR.lastIndex=0;for(var r=k.lR.exec(M);r;){e+=n(M.substr(t,r.index-t));var a=g(k,r);a?(B+=a[1],e+=p(a[0],n(r[0]))):e+=n(r[0]),t=k.lR.lastIndex,r=k.lR.exec(M)}return e+n(M.substr(t))}function d(){var e="string"==typeof k.sL;if(e&&!R[k.sL])return n(M);var t=e?f(k.sL,M,!0,y[k.sL]):l(M,k.sL.length?k.sL:void 0);return k.r>0&&(B+=t.r),e&&(y[k.sL]=t.top),p(t.language,t.value,!1,!0)}function b(){L+=void 0!==k.sL?d():h(),M=""}function v(e,n){L+=e.cN?p(e.cN,"",!0):"",k=Object.create(e,{parent:{value:k}})}function m(e,n){if(M+=e,void 0===n)return b(),0;var t=o(n,k);if(t)return t.skip?M+=n:(t.eB&&(M+=n),b(),t.rB||t.eB||(M=n)),v(t,n),t.rB?0:n.length;var r=u(k,n);if(r){var a=k;a.skip?M+=n:(a.rE||a.eE||(M+=n),b(),a.eE&&(M=n));do k.cN&&(L+="</span>"),k.skip||(B+=k.r),k=k.parent;while(k!=r.parent);return r.starts&&v(r.starts,""),a.rE?0:n.length}if(c(n,k))throw new Error('Illegal lexeme "'+n+'" for mode "'+(k.cN||"<unnamed>")+'"');return M+=n,n.length||1}var N=w(e);if(!N)throw new Error('Unknown language: "'+e+'"');s(N);var x,k=i||N,y={},L="";for(x=k;x!=N;x=x.parent)x.cN&&(L=p(x.cN,"",!0)+L);var M="",B=0;try{for(var C,j,I=0;;){if(k.t.lastIndex=I,C=k.t.exec(t),!C)break;j=m(t.substr(I,C.index-I),C[0]),I=C.index+j}for(m(t.substr(I)),x=k;x.parent;x=x.parent)x.cN&&(L+="</span>");return{r:B,value:L,language:e,top:k}}catch(O){if(-1!=O.message.indexOf("Illegal"))return{r:0,value:n(t)};throw O}}function l(e,t){t=t||E.languages||Object.keys(R);var r={r:0,value:n(e)},a=r;return t.forEach(function(n){if(w(n)){var t=f(n,e,!1);t.language=n,t.r>a.r&&(a=t),t.r>r.r&&(a=r,r=t)}}),a.language&&(r.second_best=a),r}function g(e){return E.tabReplace&&(e=e.replace(/^((<[^>]+>|\t)+)/gm,function(e,n){return n.replace(/\t/g,E.tabReplace)})),E.useBR&&(e=e.replace(/\n/g,"<br>")),e}function p(e,n,t){var r=n?x[n]:t,a=[e.trim()];return e.match(/\bhljs\b/)||a.push("hljs"),-1===e.indexOf(r)&&a.push(r),a.join(" ").trim()}function h(e){var n=i(e);if(!a(n)){var t;E.useBR?(t=document.createElementNS("http://www.w3.org/1999/xhtml","div"),t.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n")):t=e;var r=t.textContent,o=n?f(n,r,!0):l(r),s=u(t);if(s.length){var h=document.createElementNS("http://www.w3.org/1999/xhtml","div");h.innerHTML=o.value,o.value=c(s,u(h),r)}o.value=g(o.value),e.innerHTML=o.value,e.className=p(e.className,n,o.language),e.result={language:o.language,re:o.r},o.second_best&&(e.second_best={language:o.second_best.language,re:o.second_best.r})}}function d(e){E=o(E,e)}function b(){if(!b.called){b.called=!0;var e=document.querySelectorAll("pre code");Array.prototype.forEach.call(e,h)}}function v(){addEventListener("DOMContentLoaded",b,!1),addEventListener("load",b,!1)}function m(n,t){var r=R[n]=t(e);r.aliases&&r.aliases.forEach(function(e){x[e]=n})}function N(){return Object.keys(R)}function w(e){return e=(e||"").toLowerCase(),R[e]||R[x[e]]}var E={classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:void 0},R={},x={};return e.highlight=f,e.highlightAuto=l,e.fixMarkup=g,e.highlightBlock=h,e.configure=d,e.initHighlighting=b,e.initHighlightingOnLoad=v,e.registerLanguage=m,e.listLanguages=N,e.getLanguage=w,e.inherit=o,e.IR="[a-zA-Z]\\w*",e.UIR="[a-zA-Z_]\\w*",e.NR="\\b\\d+(\\.\\d+)?",e.CNR="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",e.BNR="\\b(0b[01]+)",e.RSR="!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",e.BE={b:"\\\\[\\s\\S]",r:0},e.ASM={cN:"string",b:"'",e:"'",i:"\\n",c:[e.BE]},e.QSM={cN:"string",b:'"',e:'"',i:"\\n",c:[e.BE]},e.PWM={b:/\b(a|an|the|are|I|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|like)\b/},e.C=function(n,t,r){var a=e.inherit({cN:"comment",b:n,e:t,c:[]},r||{});return a.c.push(e.PWM),a.c.push({cN:"doctag",b:"(?:TODO|FIXME|NOTE|BUG|XXX):",r:0}),a},e.CLCM=e.C("//","$"),e.CBCM=e.C("/\\*","\\*/"),e.HCM=e.C("#","$"),e.NM={cN:"number",b:e.NR,r:0},e.CNM={cN:"number",b:e.CNR,r:0},e.BNM={cN:"number",b:e.BNR,r:0},e.CSSNM={cN:"number",b:e.NR+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",r:0},e.RM={cN:"regexp",b:/\//,e:/\/[gimuy]*/,i:/\n/,c:[e.BE,{b:/\[/,e:/\]/,r:0,c:[e.BE]}]},e.TM={cN:"title",b:e.IR,r:0},e.UTM={cN:"title",b:e.UIR,r:0},e.METHOD_GUARD={b:"\\.\\s*"+e.UIR,r:0},e});hljs.registerLanguage("css",function(e){var c="[a-zA-Z-][a-zA-Z0-9_-]*",t={b:/[A-Z\_\.\-]+\s*:/,rB:!0,e:";",eW:!0,c:[{cN:"attribute",b:/\S/,e:":",eE:!0,starts:{eW:!0,eE:!0,c:[{b:/[\w-]+\(/,rB:!0,c:[{cN:"built_in",b:/[\w-]+/},{b:/\(/,e:/\)/,c:[e.ASM,e.QSM]}]},e.CSSNM,e.QSM,e.ASM,e.CBCM,{cN:"number",b:"#[0-9A-Fa-f]+"},{cN:"meta",b:"!important"}]}}]};return{cI:!0,i:/[=\/|'\$]/,c:[e.CBCM,{cN:"selector-id",b:/#[A-Za-z0-9_-]+/},{cN:"selector-class",b:/\.[A-Za-z0-9_-]+/},{cN:"selector-attr",b:/\[/,e:/\]/,i:"$"},{cN:"selector-pseudo",b:/:(:)?[a-zA-Z0-9\_\-\+\(\)"'.]+/},{b:"@(font-face|page)",l:"[a-z-]+",k:"font-face page"},{b:"@",e:"[{;]",c:[{cN:"keyword",b:/\S+/},{b:/\s/,eW:!0,eE:!0,r:0,c:[e.ASM,e.QSM,e.CSSNM]}]},{cN:"selector-tag",b:c,r:0},{b:"{",e:"}",i:/\S/,c:[e.CBCM,t]}]}});hljs.registerLanguage("markdown",function(e){return{aliases:["md","mkdown","mkd"],c:[{cN:"section",v:[{b:"^#{1,6}",e:"$"},{b:"^.+?\\n[=-]{2,}$"}]},{b:"<",e:">",sL:"xml",r:0},{cN:"bullet",b:"^([*+-]|(\\d+\\.))\\s+"},{cN:"strong",b:"[*_]{2}.+?[*_]{2}"},{cN:"emphasis",v:[{b:"\\*.+?\\*"},{b:"_.+?_",r:0}]},{cN:"quote",b:"^>\\s+",e:"$"},{cN:"code",v:[{b:"`.+?`"},{b:"^( {4}|	)",e:"$",r:0}]},{b:"^[-\\*]{3,}",e:"$"},{b:"\\[.+?\\][\\(\\[].*?[\\)\\]]",rB:!0,c:[{cN:"string",b:"\\[",e:"\\]",eB:!0,rE:!0,r:0},{cN:"link",b:"\\]\\(",e:"\\)",eB:!0,eE:!0},{cN:"symbol",b:"\\]\\[",e:"\\]",eB:!0,eE:!0}],r:10},{b:"^\\[.+\\]:",rB:!0,c:[{cN:"symbol",b:"\\[",e:"\\]:",eB:!0,eE:!0,starts:{cN:"link",e:"$"}}]}]}});hljs.registerLanguage("json",function(e){var i={literal:"true false null"},n=[e.QSM,e.CNM],r={e:",",eW:!0,eE:!0,c:n,k:i},t={b:"{",e:"}",c:[{cN:"attr",b:/"/,e:/"/,c:[e.BE],i:"\\n"},e.inherit(r,{b:/:/})],i:"\\S"},c={b:"\\[",e:"\\]",c:[e.inherit(r)],i:"\\S"};return n.splice(n.length,0,t,c),{c:n,k:i,i:"\\S"}});hljs.registerLanguage("xml",function(s){var e="[A-Za-z0-9\\._:-]+",t={eW:!0,i:/</,r:0,c:[{cN:"attr",b:e,r:0},{b:"=",r:0,c:[{cN:"string",v:[{b:/"/,e:/"/},{b:/'/,e:/'/},{b:/[^\s\/>]+/}]}]}]};return{aliases:["html","xhtml","rss","atom","xsl","plist"],cI:!0,c:[{cN:"meta",b:"<!DOCTYPE",e:">",r:10,c:[{b:"\\[",e:"\\]"}]},s.C("<!--","-->",{r:10}),{b:"<\\!\\[CDATA\\[",e:"\\]\\]>",r:10},{b:/<\?(php)?/,e:/\?>/,sL:"php",c:[{b:"/\\*",e:"\\*/",skip:!0}]},{cN:"tag",b:"<style(?=\\s|>|$)",e:">",k:{name:"style"},c:[t],starts:{e:"</style>",rE:!0,sL:["css","xml"]}},{cN:"tag",b:"<script(?=\\s|>|$)",e:">",k:{name:"script"},c:[t],starts:{e:"</script>",rE:!0,sL:["actionscript","javascript","handlebars","xml"]}},{cN:"meta",v:[{b:/<\?xml/,e:/\?>/,r:10},{b:/<\?\w+/,e:/\?>/}]},{cN:"tag",b:"</?",e:"/?>",c:[{cN:"name",b:/[^\/><\s]+/,r:0},t]}]}});hljs.registerLanguage("javascript",function(e){return{aliases:["js","jsx"],k:{keyword:"in of if for while finally var new function do return void else break catch instanceof with throw case default try this switch continue typeof delete let yield const export super debugger as async await static import from as",literal:"true false null undefined NaN Infinity",built_in:"eval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Error EvalError InternalError RangeError ReferenceError StopIteration SyntaxError TypeError URIError Number Math Date String RegExp Array Float32Array Float64Array Int16Array Int32Array Int8Array Uint16Array Uint32Array Uint8Array Uint8ClampedArray ArrayBuffer DataView JSON Intl arguments require module console window document Symbol Set Map WeakSet WeakMap Proxy Reflect Promise"},c:[{cN:"meta",r:10,b:/^\s*['"]use (strict|asm)['"]/},{cN:"meta",b:/^#!/,e:/$/},e.ASM,e.QSM,{cN:"string",b:"`",e:"`",c:[e.BE,{cN:"subst",b:"\\$\\{",e:"\\}"}]},e.CLCM,e.CBCM,{cN:"number",v:[{b:"\\b(0[bB][01]+)"},{b:"\\b(0[oO][0-7]+)"},{b:e.CNR}],r:0},{b:"("+e.RSR+"|\\b(case|return|throw)\\b)\\s*",k:"return throw case",c:[e.CLCM,e.CBCM,e.RM,{b:/</,e:/(\/\w+|\w+\/)>/,sL:"xml",c:[{b:/<\w+\/>/,skip:!0},{b:/<\w+/,e:/(\/\w+|\w+\/)>/,skip:!0,c:["self"]}]}],r:0},{cN:"function",bK:"function",e:/\{/,eE:!0,c:[e.inherit(e.TM,{b:/[A-Za-z$_][0-9A-Za-z$_]*/}),{cN:"params",b:/\(/,e:/\)/,eB:!0,eE:!0,c:[e.CLCM,e.CBCM]}],i:/\[|%/},{b:/\$[(.]/},e.METHOD_GUARD,{cN:"class",bK:"class",e:/[{;=]/,eE:!0,i:/[:"\[\]]/,c:[{bK:"extends"},e.UTM]},{bK:"constructor",e:/\{/,eE:!0}],i:/#(?!!)/}});hljs.registerLanguage("http",function(e){var t="HTTP/[0-9\\.]+";return{aliases:["https"],i:"\\S",c:[{b:"^"+t,e:"$",c:[{cN:"number",b:"\\b\\d{3}\\b"}]},{b:"^[A-Z]+ (.*?) "+t+"$",rB:!0,e:"$",c:[{cN:"string",b:" ",e:" ",eB:!0,eE:!0},{b:t},{cN:"keyword",b:"[A-Z]+"}]},{cN:"attribute",b:"^\\w",e:": ",eE:!0,i:"\\n|\\s|=",starts:{e:"$",r:0}},{b:"\\n\\n",starts:{sL:[],eW:!0}}]}});hljs.registerLanguage("yaml",function(e){var a={literal:"{ } true false yes no Yes No True False null"},b="^[ \\-]*",r="[a-zA-Z_][\\w\\-]*",t={cN:"attr",v:[{b:b+r+":"},{b:b+'"'+r+'":'},{b:b+"'"+r+"':"}]},c={cN:"template-variable",v:[{b:"{{",e:"}}"},{b:"%{",e:"}"}]},l={cN:"string",r:0,v:[{b:/'/,e:/'/},{b:/"/,e:/"/}],c:[e.BE,c]};return{cI:!0,aliases:["yml","YAML","yaml"],c:[t,{cN:"meta",b:"^---s*$",r:10},{cN:"string",b:"[\\|>] *$",rE:!0,c:l.c,e:t.v[0].b},{b:"<%[%=-]?",e:"[%-]?%>",sL:"ruby",eB:!0,eE:!0,r:0},{cN:"type",b:"!!"+e.UIR},{cN:"meta",b:"&"+e.UIR+"$"},{cN:"meta",b:"\\*"+e.UIR+"$"},{cN:"bullet",b:"^ *-",r:0},l,e.HCM,e.CNM],k:a}});
// hljs.initHighlightingOnLoad();
console.log("%cHey there, fellow developer. Find me on GitHub at https://github.com/rdwatters - Cheers.", "font-size: 20px; color: #01589B; font-family:'proximanova'!important;");
/*!
 * clipboard.js v1.5.10
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
! function(t) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = t();
    else if ("function" == typeof define && define.amd) define([], t);
    else {
        var e;
        e = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, e.Clipboard = t() } }(function() {
    var t, e, n;
    return function t(e, n, o) {
        function i(c, a) {
            if (!n[c]) {
                if (!e[c]) {
                    var s = "function" == typeof require && require;
                    if (!a && s) return s(c, !0);
                    if (r) return r(c, !0);
                    var l = new Error("Cannot find module '" + c + "'");
                    throw l.code = "MODULE_NOT_FOUND", l }
                var u = n[c] = { exports: {} };
                e[c][0].call(u.exports, function(t) {
                    var n = e[c][1][t];
                    return i(n ? n : t) }, u, u.exports, t, e, n, o) }
            return n[c].exports }
        for (var r = "function" == typeof require && require, c = 0; c < o.length; c++) i(o[c]);
        return i }({ 1: [function(t, e, n) {
            var o = t("matches-selector");
            e.exports = function(t, e, n) {
                for (var i = n ? t : t.parentNode; i && i !== document;) {
                    if (o(i, e)) return i;
                    i = i.parentNode } } }, { "matches-selector": 5 }], 2: [function(t, e, n) {
            function o(t, e, n, o, r) {
                var c = i.apply(this, arguments);
                return t.addEventListener(n, c, r), { destroy: function() { t.removeEventListener(n, c, r) } } }

            function i(t, e, n, o) {
                return function(n) { n.delegateTarget = r(n.target, e, !0), n.delegateTarget && o.call(t, n) } }
            var r = t("closest");
            e.exports = o }, { closest: 1 }], 3: [function(t, e, n) { n.node = function(t) {
                return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType }, n.nodeList = function(t) {
                var e = Object.prototype.toString.call(t);
                return void 0 !== t && ("[object NodeList]" === e || "[object HTMLCollection]" === e) && "length" in t && (0 === t.length || n.node(t[0])) }, n.string = function(t) {
                return "string" == typeof t || t instanceof String }, n.fn = function(t) {
                var e = Object.prototype.toString.call(t);
                return "[object Function]" === e } }, {}], 4: [function(t, e, n) {
            function o(t, e, n) {
                if (!t && !e && !n) throw new Error("Missing required arguments");
                if (!a.string(e)) throw new TypeError("Second argument must be a String");
                if (!a.fn(n)) throw new TypeError("Third argument must be a Function");
                if (a.node(t)) return i(t, e, n);
                if (a.nodeList(t)) return r(t, e, n);
                if (a.string(t)) return c(t, e, n);
                throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList") }

            function i(t, e, n) {
                return t.addEventListener(e, n), { destroy: function() { t.removeEventListener(e, n) } } }

            function r(t, e, n) {
                return Array.prototype.forEach.call(t, function(t) { t.addEventListener(e, n) }), { destroy: function() { Array.prototype.forEach.call(t, function(t) { t.removeEventListener(e, n) }) } } }

            function c(t, e, n) {
                return s(document.body, t, e, n) }
            var a = t("./is"),
                s = t("delegate");
            e.exports = o }, { "./is": 3, delegate: 2 }], 5: [function(t, e, n) {
            function o(t, e) {
                if (r) return r.call(t, e);
                for (var n = t.parentNode.querySelectorAll(e), o = 0; o < n.length; ++o)
                    if (n[o] == t) return !0;
                return !1 }
            var i = Element.prototype,
                r = i.matchesSelector || i.webkitMatchesSelector || i.mozMatchesSelector || i.msMatchesSelector || i.oMatchesSelector;
            e.exports = o }, {}], 6: [function(t, e, n) {
            function o(t) {
                var e;
                if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) t.focus(), t.setSelectionRange(0, t.value.length), e = t.value;
                else { t.hasAttribute("contenteditable") && t.focus();
                    var n = window.getSelection(),
                        o = document.createRange();
                    o.selectNodeContents(t), n.removeAllRanges(), n.addRange(o), e = n.toString() }
                return e }
            e.exports = o }, {}], 7: [function(t, e, n) {
            function o() {}
            o.prototype = { on: function(t, e, n) {
                    var o = this.e || (this.e = {});
                    return (o[t] || (o[t] = [])).push({ fn: e, ctx: n }), this }, once: function(t, e, n) {
                    function o() { i.off(t, o), e.apply(n, arguments) }
                    var i = this;
                    return o._ = e, this.on(t, o, n) }, emit: function(t) {
                    var e = [].slice.call(arguments, 1),
                        n = ((this.e || (this.e = {}))[t] || []).slice(),
                        o = 0,
                        i = n.length;
                    for (o; i > o; o++) n[o].fn.apply(n[o].ctx, e);
                    return this }, off: function(t, e) {
                    var n = this.e || (this.e = {}),
                        o = n[t],
                        i = [];
                    if (o && e)
                        for (var r = 0, c = o.length; c > r; r++) o[r].fn !== e && o[r].fn._ !== e && i.push(o[r]);
                    return i.length ? n[t] = i : delete n[t], this } }, e.exports = o }, {}], 8: [function(e, n, o) {! function(i, r) {
                if ("function" == typeof t && t.amd) t(["module", "select"], r);
                else if ("undefined" != typeof o) r(n, e("select"));
                else {
                    var c = { exports: {} };
                    r(c, i.select), i.clipboardAction = c.exports } }(this, function(t, e) { "use strict";

                function n(t) {
                    return t && t.__esModule ? t : { "default": t } }

                function o(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }
                var i = n(e),
                    r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
                        return typeof t } : function(t) {
                        return t && "function" == typeof Symbol && t.constructor === Symbol ? "symbol" : typeof t },
                    c = function() {
                        function t(t, e) {
                            for (var n = 0; n < e.length; n++) {
                                var o = e[n];
                                o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o) } }
                        return function(e, n, o) {
                            return n && t(e.prototype, n), o && t(e, o), e } }(),
                    a = function() {
                        function t(e) { o(this, t), this.resolveOptions(e), this.initSelection() }
                        return t.prototype.resolveOptions = function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                            this.action = e.action, this.emitter = e.emitter, this.target = e.target, this.text = e.text, this.trigger = e.trigger, this.selectedText = "" }, t.prototype.initSelection = function t() { this.text ? this.selectFake() : this.target && this.selectTarget() }, t.prototype.selectFake = function t() {
                            var e = this,
                                n = "rtl" == document.documentElement.getAttribute("dir");
                            this.removeFake(), this.fakeHandler = document.body.addEventListener("click", function() {
                                return e.removeFake() }), this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "fixed", this.fakeElem.style[n ? "right" : "left"] = "-9999px", this.fakeElem.style.top = (window.pageYOffset || document.documentElement.scrollTop) + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, document.body.appendChild(this.fakeElem), this.selectedText = (0, i.default)(this.fakeElem), this.copyText() }, t.prototype.removeFake = function t() { this.fakeHandler && (document.body.removeEventListener("click"), this.fakeHandler = null), this.fakeElem && (document.body.removeChild(this.fakeElem), this.fakeElem = null) }, t.prototype.selectTarget = function t() { this.selectedText = (0, i.default)(this.target), this.copyText() }, t.prototype.copyText = function t() {
                            var e = void 0;
                            try { e = document.execCommand(this.action) } catch (n) { e = !1 }
                            this.handleResult(e) }, t.prototype.handleResult = function t(e) { e ? this.emitter.emit("success", { action: this.action, text: this.selectedText, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) }) : this.emitter.emit("error", { action: this.action, trigger: this.trigger, clearSelection: this.clearSelection.bind(this) }) }, t.prototype.clearSelection = function t() { this.target && this.target.blur(), window.getSelection().removeAllRanges() }, t.prototype.destroy = function t() { this.removeFake() }, c(t, [{ key: "action", set: function t() {
                                var e = arguments.length <= 0 || void 0 === arguments[0] ? "copy" : arguments[0];
                                if (this._action = e, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"') }, get: function t() {
                                return this._action } }, { key: "target", set: function t(e) {
                                if (void 0 !== e) {
                                    if (!e || "object" !== ("undefined" == typeof e ? "undefined" : r(e)) || 1 !== e.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                                    if ("copy" === this.action && e.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                                    if ("cut" === this.action && (e.hasAttribute("readonly") || e.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                                    this._target = e } }, get: function t() {
                                return this._target } }]), t }();
                t.exports = a }) }, { select: 6 }], 9: [function(e, n, o) {! function(i, r) {
                if ("function" == typeof t && t.amd) t(["module", "./clipboard-action", "tiny-emitter", "good-listener"], r);
                else if ("undefined" != typeof o) r(n, e("./clipboard-action"), e("tiny-emitter"), e("good-listener"));
                else {
                    var c = { exports: {} };
                    r(c, i.clipboardAction, i.tinyEmitter, i.goodListener), i.clipboard = c.exports } }(this, function(t, e, n, o) { "use strict";

                function i(t) {
                    return t && t.__esModule ? t : { "default": t } }

                function r(t, e) {
                    if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function") }

                function c(t, e) {
                    if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return !e || "object" != typeof e && "function" != typeof e ? t : e }

                function a(t, e) {
                    if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                    t.prototype = Object.create(e && e.prototype, { constructor: { value: t, enumerable: !1, writable: !0, configurable: !0 } }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e) }

                function s(t, e) {
                    var n = "data-clipboard-" + t;
                    if (e.hasAttribute(n)) return e.getAttribute(n) }
                var l = i(e),
                    u = i(n),
                    f = i(o),
                    d = function(t) {
                        function e(n, o) { r(this, e);
                            var i = c(this, t.call(this));
                            return i.resolveOptions(o), i.listenClick(n), i }
                        return a(e, t), e.prototype.resolveOptions = function t() {
                            var e = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                            this.action = "function" == typeof e.action ? e.action : this.defaultAction, this.target = "function" == typeof e.target ? e.target : this.defaultTarget, this.text = "function" == typeof e.text ? e.text : this.defaultText }, e.prototype.listenClick = function t(e) {
                            var n = this;
                            this.listener = (0, f.default)(e, "click", function(t) {
                                return n.onClick(t) }) }, e.prototype.onClick = function t(e) {
                            var n = e.delegateTarget || e.currentTarget;
                            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l.default({ action: this.action(n), target: this.target(n), text: this.text(n), trigger: n, emitter: this }) }, e.prototype.defaultAction = function t(e) {
                            return s("action", e) }, e.prototype.defaultTarget = function t(e) {
                            var n = s("target", e);
                            return n ? document.querySelector(n) : void 0 }, e.prototype.defaultText = function t(e) {
                            return s("text", e) }, e.prototype.destroy = function t() { this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null) }, e }(u.default);
                t.exports = d }) }, { "./clipboard-action": 8, "good-listener": 4, "tiny-emitter": 7 }] }, {}, [9])(9) });
var snippets = document.querySelectorAll('.code-copy');
[].forEach.call(snippets, function(snippet) {
    snippet.insertAdjacentHTML('afterbegin', '<button class="copy-button" title="Copy to clipboard" data-clipboard-snippet><img class="clippy" src="/assets/icons/clipboard2.svg" alt="Copy to clipboard"><span class="copy-span">COPY</span></button>');
});
var clipboardSnippets = new Clipboard('[data-clipboard-snippet]', {
    target: function(trigger) {
        return trigger.nextElementSibling;
    }
});
clipboardSnippets.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, 'Copied!');
});
clipboardSnippets.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
});

function showTooltip(elem, msg) {
    elem.setAttribute('class', 'copy-button tooltipped tooltipped-s');
    elem.setAttribute('aria-label', msg);
}

function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');
    if (isMac) {
        actionMsg = 'Press ⌘-' + actionKey;
    } else {
        actionMsg = 'Press Ctrl-' + actionKey;
    }
    return actionMsg;
}

(function() {
  // Don't inject Disqus on localhost or netlify to keep Disqus comments clean.
  var netlifyLocalTest = new RegExp(/(netlify|localhost)/i);
  var disqThread = document.getElementById('disqus_thread');
  if (!disqThread || netlifyLocalTest.test(window.location.hostname)) {
    console.log("No Disqus Comments in local dev or in netlify URLs");
    return;
  } else {
    var disqus_config = function() {
      this.page.url = "{{ .Permalink }}"; // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = "{{.Title}}"; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    };

    var dsq = document.createElement('script');
    dsq.type = 'text/javascript';
    dsq.async = true;
    var disqus_shortname = 'ryanwattersio';
    dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
    (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
  }
})();

// var allPimgs = document.querySelectorAll('img.left, img.right');
// if(allPimgs){
// 	for (var i = 0; i < allPimgs.length; i++) {
// 		console.log(allPimgs[i].parentNode.nextElementSibling.textContent);
// 	}
// }
(function imageClasses() {
    // var allImgs = document.getElementsByTagName('img');
    var allImgs = document.querySelectorAll('.body-copy img');
    if (allImgs.length < 1) {
        return;
    } else {
        applyAltClassesAndIds(allImgs);
    }

    function applyAltClassesAndIds(images) {
        for (var i = 0; i < images.length; i++) {
            if (images[i].alt.indexOf('class=') > 0) {
                var justText = images[i].alt.split('class=')[0];
                var newClass = images[i].alt.split('class=')[1];
                images[i].setAttribute('alt', justText);
                images[i].classList.add(newClass);
            } else if (images[i].alt.indexOf('id=') > 0) {
                var justText = images[i].alt.split('id=')[0];
                var newId = images[i].alt.split('id=')[1];
                images[i].setAttribute('alt', justText);
                images[i].id = newId;
            }
        }
    }
})();

//don't run scroll event on mobile devices
var hero = document.querySelector('.hero');
var siteLogo = document.querySelector('.site-logo.home-link:not(.form)');
if (hero && !isMobile) {
  window.addEventListener('scroll', changeLogo, false);
}

function changeLogo() {
  var heroHeight = hero.offsetHeight;
  var scrollPosition = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollPosition;
  if (scrollPosition > heroHeight - 40) {
    siteLogo.classList.add('lightbg');
  } else {
    siteLogo.classList.remove('lightbg');
  }

}

(function() {
	var allPres = document.querySelectorAll('pre');
	for (var i = 0; i < allPres.length; i++) {
		allPres[i].classList.add('line-numbers');
	}
})();

/* http://prismjs.com/download.html?themes=prism-okaidia&languages=markup+css+clike+javascript+markdown+scss+twig+typescript+yaml&plugins=line-numbers */
var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(){var e=/\blang(?:uage)?-(\w+)\b/i,t=0,n=_self.Prism={util:{encode:function(e){return e instanceof a?new a(e.type,n.util.encode(e.content),e.alias):"Array"===n.util.type(e)?e.map(n.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e){var t=n.util.type(e);switch(t){case"Object":var a={};for(var r in e)e.hasOwnProperty(r)&&(a[r]=n.util.clone(e[r]));return a;case"Array":return e.map&&e.map(function(e){return n.util.clone(e)})}return e}},languages:{extend:function(e,t){var a=n.util.clone(n.languages[e]);for(var r in t)a[r]=t[r];return a},insertBefore:function(e,t,a,r){r=r||n.languages;var i=r[e];if(2==arguments.length){a=arguments[1];for(var l in a)a.hasOwnProperty(l)&&(i[l]=a[l]);return i}var o={};for(var s in i)if(i.hasOwnProperty(s)){if(s==t)for(var l in a)a.hasOwnProperty(l)&&(o[l]=a[l]);o[s]=i[s]}return n.languages.DFS(n.languages,function(t,n){n===r[e]&&t!=e&&(this[t]=o)}),r[e]=o},DFS:function(e,t,a,r){r=r||{};for(var i in e)e.hasOwnProperty(i)&&(t.call(e,i,e[i],a||i),"Object"!==n.util.type(e[i])||r[n.util.objId(e[i])]?"Array"!==n.util.type(e[i])||r[n.util.objId(e[i])]||(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,i,r)):(r[n.util.objId(e[i])]=!0,n.languages.DFS(e[i],t,null,r)))}},plugins:{},highlightAll:function(e,t){var a={callback:t,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};n.hooks.run("before-highlightall",a);for(var r,i=a.elements||document.querySelectorAll(a.selector),l=0;r=i[l++];)n.highlightElement(r,e===!0,a.callback)},highlightElement:function(t,a,r){for(var i,l,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(i=(o.className.match(e)||[,""])[1].toLowerCase(),l=n.languages[i]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+i,o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+i);var s=t.textContent,u={element:t,language:i,grammar:l,code:s};if(n.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return n.hooks.run("complete",u),void 0;if(n.hooks.run("before-highlight",u),a&&_self.Worker){var c=new Worker(n.filename);c.onmessage=function(e){u.highlightedCode=e.data,n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},c.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=n.highlight(u.code,u.grammar,u.language),n.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),n.hooks.run("after-highlight",u),n.hooks.run("complete",u)},highlight:function(e,t,r){var i=n.tokenize(e,t);return a.stringify(n.util.encode(i),r)},tokenize:function(e,t){var a=n.Token,r=[e],i=t.rest;if(i){for(var l in i)t[l]=i[l];delete t.rest}e:for(var l in t)if(t.hasOwnProperty(l)&&t[l]){var o=t[l];o="Array"===n.util.type(o)?o:[o];for(var s=0;s<o.length;++s){var u=o[s],c=u.inside,g=!!u.lookbehind,h=!!u.greedy,f=0,d=u.alias;if(h&&!u.pattern.global){var p=u.pattern.toString().match(/[imuy]*$/)[0];u.pattern=RegExp(u.pattern.source,p+"g")}u=u.pattern||u;for(var m=0,y=0;m<r.length;y+=(r[m].matchedStr||r[m]).length,++m){var v=r[m];if(r.length>e.length)break e;if(!(v instanceof a)){u.lastIndex=0;var b=u.exec(v),k=1;if(!b&&h&&m!=r.length-1){if(u.lastIndex=y,b=u.exec(e),!b)break;for(var w=b.index+(g?b[1].length:0),_=b.index+b[0].length,A=m,S=y,P=r.length;P>A&&_>S;++A)S+=(r[A].matchedStr||r[A]).length,w>=S&&(++m,y=S);if(r[m]instanceof a||r[A-1].greedy)continue;k=A-m,v=e.slice(y,S),b.index-=y}if(b){g&&(f=b[1].length);var w=b.index+f,b=b[0].slice(f),_=w+b.length,x=v.slice(0,w),O=v.slice(_),j=[m,k];x&&j.push(x);var N=new a(l,c?n.tokenize(b,c):b,d,b,h);j.push(N),O&&j.push(O),Array.prototype.splice.apply(r,j)}}}}}return r},hooks:{all:{},add:function(e,t){var a=n.hooks.all;a[e]=a[e]||[],a[e].push(t)},run:function(e,t){var a=n.hooks.all[e];if(a&&a.length)for(var r,i=0;r=a[i++];)r(t)}}},a=n.Token=function(e,t,n,a,r){this.type=e,this.content=t,this.alias=n,this.matchedStr=a||null,this.greedy=!!r};if(a.stringify=function(e,t,r){if("string"==typeof e)return e;if("Array"===n.util.type(e))return e.map(function(n){return a.stringify(n,t,e)}).join("");var i={type:e.type,content:a.stringify(e.content,t,r),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:r};if("comment"==i.type&&(i.attributes.spellcheck="true"),e.alias){var l="Array"===n.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(i.classes,l)}n.hooks.run("wrap",i);var o="";for(var s in i.attributes)o+=(o?" ":"")+s+'="'+(i.attributes[s]||"")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+(o?" "+o:"")+">"+i.content+"</"+i.tag+">"},!_self.document)return _self.addEventListener?(_self.addEventListener("message",function(e){var t=JSON.parse(e.data),a=t.language,r=t.code,i=t.immediateClose;_self.postMessage(n.highlight(r,n.languages[a],a)),i&&_self.close()},!1),_self.Prism):_self.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(n.filename=r.src,document.addEventListener&&!r.hasAttribute("data-manual")&&("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(n.highlightAll):window.setTimeout(n.highlightAll,16):document.addEventListener("DOMContentLoaded",n.highlightAll))),_self.Prism}();"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism);
Prism.languages.markup={comment:/<!--[\w\W]*?-->/,prolog:/<\?[\w\W]+?\?>/,doctype:/<!DOCTYPE[\w\W]+?>/,cdata:/<!\[CDATA\[[\w\W]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\\1|\\?(?!\1)[\w\W])*\1|[^\s'">=]+))?)*\s*\/?>/i,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:('|")[\w\W]*?(\1)|[^\s>]+)/i,inside:{punctuation:/[=>"']/}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},Prism.hooks.add("wrap",function(a){"entity"===a.type&&(a.attributes.title=a.content.replace(/&amp;/,"&"))}),Prism.languages.xml=Prism.languages.markup,Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup;
Prism.languages.css={comment:/\/\*[\w\W]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^\{\}\s][^\{\};]*?(?=\s*\{)/,string:/("|')(\\(?:\r\n|[\w\W])|(?!\1)[^\\\r\n])*\1/,property:/(\b|\B)[\w-]+(?=\s*:)/i,important:/\B!important\b/i,"function":/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},Prism.languages.css.atrule.inside.rest=Prism.util.clone(Prism.languages.css),Prism.languages.markup&&(Prism.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\w\W]*?>)[\w\W]*?(?=<\/style>)/i,lookbehind:!0,inside:Prism.languages.css,alias:"language-css"}}),Prism.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|').*?\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:Prism.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:Prism.languages.css}},alias:"language-css"}},Prism.languages.markup.tag));
Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\w\W]*?\*\//,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0}],string:{pattern:/(["'])(\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[a-z0-9_\.\\]+/i,lookbehind:!0,inside:{punctuation:/(\.|\\)/}},keyword:/\b(if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,"boolean":/\b(true|false)\b/,"function":/[a-z0-9_]+(?=\()/i,number:/\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/};
Prism.languages.javascript=Prism.languages.extend("clike",{keyword:/\b(as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b-?(0x[\dA-Fa-f]+|0b[01]+|0o[0-7]+|\d*\.?\d+([Ee][+-]?\d+)?|NaN|Infinity)\b/,"function":/[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\()/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*\*?|\/|~|\^|%|\.{3}/}),Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:/(^|[^\/])\/(?!\/)(\[.+?]|\\.|[^\/\\\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,lookbehind:!0,greedy:!0}}),Prism.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\\\|\\?[^\\])*?`/,greedy:!0,inside:{interpolation:{pattern:/\$\{[^}]+\}/,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}}}),Prism.languages.markup&&Prism.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\w\W]*?>)[\w\W]*?(?=<\/script>)/i,lookbehind:!0,inside:Prism.languages.javascript,alias:"language-javascript"}}),Prism.languages.js=Prism.languages.javascript;
Prism.languages.markdown=Prism.languages.extend("markup",{}),Prism.languages.insertBefore("markdown","prolog",{blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},code:[{pattern:/^(?: {4}|\t).+/m,alias:"keyword"},{pattern:/``.+?``|`[^`\n]+`/,alias:"keyword"}],title:[{pattern:/\w+.*(?:\r?\n|\r)(?:==+|--+)/,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#+.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])([\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:/(^|[^\\])(\*\*|__)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^\*\*|^__|\*\*$|__$/}},italic:{pattern:/(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,lookbehind:!0,inside:{punctuation:/^[*_]|[*_]$/}},url:{pattern:/!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,inside:{variable:{pattern:/(!?\[)[^\]]+(?=\]$)/,lookbehind:!0},string:{pattern:/"(?:\\.|[^"\\])*"(?=\)$)/}}}}),Prism.languages.markdown.bold.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.italic.inside.url=Prism.util.clone(Prism.languages.markdown.url),Prism.languages.markdown.bold.inside.italic=Prism.util.clone(Prism.languages.markdown.italic),Prism.languages.markdown.italic.inside.bold=Prism.util.clone(Prism.languages.markdown.bold);
Prism.languages.scss=Prism.languages.extend("css",{comment:{pattern:/(^|[^\\])(?:\/\*[\w\W]*?\*\/|\/\/.*)/,lookbehind:!0},atrule:{pattern:/@[\w-]+(?:\([^()]+\)|[^(])*?(?=\s+[{;])/,inside:{rule:/@[\w-]+/}},url:/(?:[-a-z]+-)*url(?=\()/i,selector:{pattern:/(?=\S)[^@;\{\}\(\)]?([^@;\{\}\(\)]|&|#\{\$[-_\w]+\})+(?=\s*\{(\}|\s|[^\}]+(:|\{)[^\}]+))/m,inside:{parent:{pattern:/&/,alias:"important"},placeholder:/%[-_\w]+/,variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}}}),Prism.languages.insertBefore("scss","atrule",{keyword:[/@(?:if|else(?: if)?|for|each|while|import|extend|debug|warn|mixin|include|function|return|content)/i,{pattern:/( +)(?:from|through)(?= )/,lookbehind:!0}]}),Prism.languages.scss.property={pattern:/(?:[\w-]|\$[-_\w]+|#\{\$[-_\w]+\})+(?=\s*:)/i,inside:{variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}},Prism.languages.insertBefore("scss","important",{variable:/\$[-_\w]+|#\{\$[-_\w]+\}/}),Prism.languages.insertBefore("scss","function",{placeholder:{pattern:/%[-_\w]+/,alias:"selector"},statement:{pattern:/\B!(?:default|optional)\b/i,alias:"keyword"},"boolean":/\b(?:true|false)\b/,"null":/\bnull\b/,operator:{pattern:/(\s)(?:[-+*\/%]|[=!]=|<=?|>=?|and|or|not)(?=\s)/,lookbehind:!0}}),Prism.languages.scss.atrule.inside.rest=Prism.util.clone(Prism.languages.scss);
Prism.languages.twig={comment:/\{#[\s\S]*?#\}/,tag:{pattern:/\{\{[\s\S]*?\}\}|\{%[\s\S]*?%\}/,inside:{ld:{pattern:/^(?:\{\{\-?|\{%\-?\s*\w+)/,inside:{punctuation:/^(?:\{\{|\{%)\-?/,keyword:/\w+/}},rd:{pattern:/\-?(?:%\}|\}\})$/,inside:{punctuation:/.*/}},string:{pattern:/("|')(?:\\?.)*?\1/,inside:{punctuation:/^['"]|['"]$/}},keyword:/\b(?:even|if|odd)\b/,"boolean":/\b(?:true|false|null)\b/,number:/\b-?(?:0x[\dA-Fa-f]+|\d*\.?\d+([Ee][-+]?\d+)?)\b/,operator:[{pattern:/(\s)(?:and|b\-and|b\-xor|b\-or|ends with|in|is|matches|not|or|same as|starts with)(?=\s)/,lookbehind:!0},/[=<>]=?|!=|\*\*?|\/\/?|\?:?|[-+~%|]/],property:/\b[a-zA-Z_][a-zA-Z0-9_]*\b/,punctuation:/[()\[\]{}:.,]/}},other:{pattern:/\S(?:[\s\S]*\S)?/,inside:Prism.languages.markup}};
Prism.languages.typescript=Prism.languages.extend("javascript",{keyword:/\b(break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|false|finally|for|function|get|if|implements|import|in|instanceof|interface|let|new|null|package|private|protected|public|return|set|static|super|switch|this|throw|true|try|typeof|var|void|while|with|yield|module|declare|constructor|string|Function|any|number|boolean|Array|enum)\b/});
Prism.languages.yaml={scalar:{pattern:/([\-:]\s*(![^\s]+)?[ \t]*[|>])[ \t]*(?:((?:\r?\n|\r)[ \t]+)[^\r\n]+(?:\3[^\r\n]+)*)/,lookbehind:!0,alias:"string"},comment:/#.*/,key:{pattern:/(\s*(?:^|[:\-,[{\r\n?])[ \t]*(![^\s]+)?[ \t]*)[^\r\n{[\]},#\s]+?(?=\s*:\s)/,lookbehind:!0,alias:"atrule"},directive:{pattern:/(^[ \t]*)%.+/m,lookbehind:!0,alias:"important"},datetime:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(\d{4}-\d\d?-\d\d?([tT]|[ \t]+)\d\d?:\d{2}:\d{2}(\.\d*)?[ \t]*(Z|[-+]\d\d?(:\d{2})?)?|\d{4}-\d{2}-\d{2}|\d\d?:\d{2}(:\d{2}(\.\d*)?)?)(?=[ \t]*($|,|]|}))/m,lookbehind:!0,alias:"number"},"boolean":{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(true|false)[ \t]*(?=$|,|]|})/im,lookbehind:!0,alias:"important"},"null":{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)(null|~)[ \t]*(?=$|,|]|})/im,lookbehind:!0,alias:"important"},string:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')(?=[ \t]*($|,|]|}))/m,lookbehind:!0},number:{pattern:/([:\-,[{]\s*(![^\s]+)?[ \t]*)[+\-]?(0x[\da-f]+|0o[0-7]+|(\d+\.?\d*|\.?\d+)(e[\+\-]?\d+)?|\.inf|\.nan)[ \t]*(?=$|,|]|})/im,lookbehind:!0},tag:/![^\s]+/,important:/[&*][\w]+/,punctuation:/---|[:[\]{}\-,|>?]|\.\.\./};
!function(){"undefined"!=typeof self&&self.Prism&&self.document&&Prism.hooks.add("complete",function(e){if(e.code){var t=e.element.parentNode,s=/\s*\bline-numbers\b\s*/;if(t&&/pre/i.test(t.nodeName)&&(s.test(t.className)||s.test(e.element.className))&&!e.element.querySelector(".line-numbers-rows")){s.test(e.element.className)&&(e.element.className=e.element.className.replace(s,"")),s.test(t.className)||(t.className+=" line-numbers");var n,a=e.code.match(/\n(?!$)/g),l=a?a.length+1:1,r=new Array(l+1);r=r.join("<span></span>"),n=document.createElement("span"),n.setAttribute("aria-hidden","true"),n.className="line-numbers-rows",n.innerHTML=r,t.hasAttribute("data-start")&&(t.style.counterReset="linenumber "+(parseInt(t.getAttribute("data-start"),10)-1)),e.element.appendChild(n)}}})}();

var allIFrames = document.getElementsByTagName('iframe');
if (allIFrames.length > 0) {
  for (var i = 0; i < allIFrames.length; i++) {
    var src = allIFrames[i].getAttribute('src');
    if (src.startsWith('https://www.google.com/maps/embed')) {
    	var iF = allIFrames[i];
      var wrap = document.createElement('div');
      wrap.className = "iframe-wrapper";
      iF.parentNode.insertBefore(wrap,iF);
      wrap.appendChild(iF);
    }
  }
}

var searchData;
var searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', lunrSearch, true);
window.index = lunr(function() {
    this.field('id');
    this.field('url');
    this.field('title', { boost: 100 });
    this.field('subtitle');
    this.field('description');
    this.field('tags', { boost: 30 });
    this.field('content', { boost: 10 });
});
var indexLocation = "/assets/site-index.json";
var searchReq = new XMLHttpRequest();
searchReq.open('GET', indexLocation, true);
searchReq.onload = function() {
    if (this.status >= 200 && this.status < 400) {
        searchData = JSON.parse(this.response);
        searchData.forEach(function(obj, index) {
            obj['id'] = index;
            window.index.add(obj);
        });
    } else {
        console.log("Failed status for site-index.js.");
    }
};
searchReq.onerror = function() {
    console.log("Error when attempting to load site-index.json.");
}
searchReq.send();

function lunrSearch(event) {
    var query = document.getElementById("search-input").value;
    var searchResults = document.getElementById("search-results");
    var resultsLength = document.getElementById('results-length');
    if (query.length < 3) {
        searchResults.innerHTML = '';
        resultsLength.innerHTML = '';
    }
    if (query.length > 2) {
        var matches = window.index.search(query);
        displayResults(matches);
    }
}

function displayResults(results) {
    var searchResults = document.getElementById('search-results');
    var inputVal = document.getElementById('search-input').value;
    var resultsLength = document.getElementById('results-length');
    if (results.length) {
        searchResults.innerHTML = '';
        resultsLength.innerHTML = '';
        results.forEach(function(result) {
            var item = window.searchData[result.ref];
            var appendString = '<li class=\"search-result\"><a href=\"' + item.url + '\"><h5>' + item.title + '</h5>' + '<p>' + item.description + '</p></li>';
            searchResults.innerHTML += appendString;
        })
        if (results.length > 1) {
            resultsLength.innerHTML = '<strong>' + results.length + '</strong>' + ' results for <strong>\"' + inputVal + '\"</strong>';
        } else {
            resultsLength.innerHTML = '<strong>' + results.length + '</strong>' + ' result for <strong>\"' + inputVal + '\"</strong>';
        }
    } else {
        searchResults.innerHTML = '<li class=\"search-result none\">No results found for <span class=\"input-value\">' + inputVal + '</span>. Please check spelling and spacing.</li>';
        resultsLength.innerHTML = '';
    }
}

var fullHeight = Math.max(document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"]);
if (document.querySelector('aside.toc')) {
  window.onscroll = function() {
    var scrollPosition = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollPosition;
    var fromBottom = fullHeight - 800;
    if (scrollPosition < 300 || scrollPosition > fromBottom) {
      document.querySelector('aside.toc').classList.remove('fadeIn');
      document.getElementById('toggle-toc').classList.remove('fadeIn');
    } else if (scrollPosition > 300) {
      document.querySelector('aside.toc').classList.add('fadeIn');
      document.getElementById('toggle-toc').classList.add('fadeIn');
    }
  }
}

var tocTog = document.getElementById('toggle-toc');
var allTocLinks = document.querySelectorAll('aside#toc a');
var tocExists = document.querySelector('aside.toc') ? true : false;
console.log(allTocLinks.length);

if (allTocLinks.length > 3) {
  tocTog.addEventListener('click', toggleToc, false);
  for (var i = 0; i < allTocLinks.length; i++) {
    allTocLinks[i].addEventListener('click', smoothVelScrolling, false);
  }
} else if (allTocLinks.length <= 3 && tocExists) {
  document.querySelector('aside.toc').remove();
  tocTog.remove();
}

function smoothVelScrolling(evt) {
  var clickedLink = evt.target.href.split('#')[1];
  console.log(clickedLink);
  var targetLink = document.getElementById(clickedLink);
  Velocity(targetLink, "scroll", { duration: 300, offset: 0 });
}

function toggleToc(evt) {
  evt.preventDefault();
  document.querySelector('aside.toc').classList.toggle('open-toc');
  document.getElementById('toggle-toc').classList.toggle('open-toc');
}

(function() {
  var toggleWrapper = document.querySelector('.modal-toggle-wrapper');
  if (toggleWrapper) {
    toggleWrapper.onclick = function() {
      var modalOpen = document.querySelector('.fullscreenModal.active') ? true : false;
      var theToc = document.querySelector('aside.toc');
      var visibleToc = document.querySelector('aside.toc.fadeIn');
      var tocToggle = document.getElementById('toggle-toc');
      var toggleDivs = document.querySelectorAll('.modal-toggle-bubble,.social-wrapper,.modal-toggle-wrapper,.modal-toggle-bubbleShadow,.modal-toggle-close-wrapper,.share-close');
      for (var i = 0; i < toggleDivs.length; i++) {
        toggleDivs[i].classList.toggle('active');
      }
      document.querySelector('.social-media-share.animated').classList.toggle('fadeInDown');
      if (visibleToc) {
        visibleToc.classList.remove('fadeIn');
      }
      if (modalOpen && theToc) {
        theToc.classList.add('fadeIn');
      }
      if (tocToggle) {
        tocToggle.classList.toggle('hide-toggle');
      }
    }
  }
})();
document.querySelector('.sidebar-toggle-wrapper').addEventListener('click', navToggle, false);
document.querySelector('.all-content-wrapper').addEventListener('click', navToggleCheck, false);
var divsToMove = document.querySelectorAll('.sidebar-toggle-wrapper,.site-navigation,.all-content-wrapper,#toggle-search');

function navToggle() {
  for (var i = 0; i < divsToMove.length; i++) {
    divsToMove[i].classList.toggle('open');
  }
}

function navToggleCheck() {
  var navIsOpen = document.querySelector('.all-content-wrapper.open') ? true : false;
  if (navIsOpen) {
    for (var i = 0; i < divsToMove.length; i++) {
      divsToMove[i].classList.remove('open');
    }
  }
}
<<<<<<< HEAD
document.getElementById('toggle-search').addEventListener('click', toggleSearch, false);
document.getElementById('close-search').addEventListener('click', toggleSearch, false);
document.addEventListener('keyup', keystrokeSearchToggle, false);
document.getElementById('search-input').addEventListener('keyup', setSearchInLocalStorage, false);

<<<<<<< HEAD
=======
//keep IE from autofocsing on search input on page load

$(document).ready(function() {
  $('#search-input').blur();
});
=======

window.onload = pageNotFoundTest;
window.onload = checkForSearchHash;
window.onpopstate = checkForSearchHash;
var searchForm = document.getElementById('site-search');
var searchToggle = document.getElementById('toggle-search');
var searchInput = document.getElementById('search-input');
var localTerm = localStorage.getItem('search_term') ? localStorage.getItem('search_term') : '';
searchToggle.addEventListener('click', toggleSearch, false);
searchInput.addEventListener('keyup', setSearchInLocalStorage, false);

document.onkeydown = function(evt) {
  var searchIsOpen = searchForm.classList.contains('open');
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key == "Escape";
  } else {
    isEscape = evt.keyCode == 27;
  }
  if (isEscape && searchIsOpen) {
    searchForm.classList.remove('open');
    searchInput.blur();
  }
};
>>>>>>> dev

function checkForSearchHash() {
  if (window.location.hash.startsWith('#search')) {
    searchInput.value = localTerm;
    lunrSearch();
    if (!searchForm.classList.contains('open')) {
      searchForm.classList.add('open');
      searchInput.focus();
    }
  } else if (searchForm.classList.contains('open')) {
    searchForm.classList.remove('open');
    searchInput.blur();
  }
}

function pageNotFoundTest() {
  var fourTest = new RegExp('Page not found', 'i');
  var docTitle = document.title;
  var currentUrl = window.location.href;
  if (fourTest.test(docTitle)) {
    document.getElementById('search-results').innerHTML = '<li class="search-result notfound"><h5><strong>It looks like ' + currentUrl + ' does not exist. Please try searching for another page.</strong></h5></li>';
    toggleSearch(null);
  }
<<<<<<< HEAD

}

>>>>>>> dev
//toggle search based on keystroke
function keystrokeSearchToggle(thekey) {
<<<<<<< HEAD
    var boardKey = thekey.keyCode;
    var searchIsOpen = document.querySelector('.search-form.open') ? true : false;
    if (boardKey == 27 && searchIsOpen) {
    	document.querySelector('.search-form').classList.remove('open');
    }
}

function toggleSearch(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    var searchValue = localStorage.getItem('rw_search_term');
    var searchForm = document.getElementById('site-search');
    var searchInput = document.getElementById('search-input');

    if(searchValue != null){
    	searchInput.value = searchValue;
    	lunrSearch();
    }
    searchForm.classList.toggle('open');
    if (!searchForm.classList.contains('open')) {
        searchInput.value = '';
    } else { document.getElementById('search-input').focus(); }
    return false;
=======
  var boardKey = thekey.keyCode;
  var searchIsOpen = document.querySelector('.search-form.open') ? true : false;
  if (boardKey == 27 && searchIsOpen) {
    document.querySelector('.search-form').classList.remove('open');
  }
=======
>>>>>>> dev
}

function toggleSearch(evt) {
  if (evt !== null) {
    evt.preventDefault();
  }
  var searchIsOpen = searchForm.classList.contains('open') ? true : false;
  localTerm = localStorage.getItem('search_term') ? localStorage.getItem('search_term') : '';
  searchInput.value = localTerm;
  if (searchIsOpen) {
    searchForm.classList.remove('open');
    window.location.hash = "#";
    searchInput.blur();
  } else {
    searchForm.classList.add('open');
    window.location.hash = "#search";
    lunrSearch();
    searchInput.focus();
  }
>>>>>>> dev
}

function setSearchInLocalStorage() {
  var sTerm = searchInput.value;
  var queryTerm = searchInput.value.split(' ').join('+');
  localStorage.setItem('search_term', sTerm);
}
window.onload = tangentsInit;

function tangentsInit() {
  var allTangentButtons = document.querySelectorAll('.tangent-title');
  if (allTangentButtons.length) {
    for (var i = 0; i < allTangentButtons.length; i++) {
      allTangentButtons[i].addEventListener('click', toggleTangent, true);
    }
  }

  function toggleTangent(evt) {
    var tangentContent,
      rotateArrow,
      targ = evt.target,
      clickedClass = targ.className;
    if (clickedClass !== 'tangent-title') {
      tangentContent = targ.parentNode.nextElementSibling;
      rotateArrow = targ.parentNode.lastElementChild;
    } else {
      tangentContent = targ.nextElementSibling;
      rotateArrow = targ.lastElementChild;
    }
    var tangentContentHeight = tangentContent.clientHeight;
    if (tangentContentHeight === 0) {
      Velocity(tangentContent, "slideDown", { duration: 300 });
    } else {
      Velocity(tangentContent, "slideUp", { duration: 300 });
    }
    rotateArrow.classList.toggle('open');
  }
}

var allVids = document.querySelectorAll('.video-thumbnail,.icon-video-play-button');
if (allVids.length > 0) {
  for (var i = 0; i < allVids.length; i++) {
    allVids[i].addEventListener('click', vidSwitch, false);
  }
}

function vidSwitch(evt) {
  var vidItem = evt.target;
  var vidParent = vidItem.parentNode;
  var clickedClass = vidItem.className;
  console.log(clickedClass);
  var iframe = document.createElement('iframe');
  //assign theService to the provider added, but set to lower case to control for youtube, YouTube, etc.
  var theService = vidItem.parentNode.dataset.streaming.toLowerCase();
  var theVideoId = vidItem.parentNode.dataset.videoid.toLowerCase();
  if (theService == "youtube") {
    iframe.setAttribute('src', '//www.youtube.com/embed/' + theVideoId + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0&vq=hd1080');
  } else if (theService == "vimeo") {
    iframe.setAttribute('src', '//player.vimeo.com/video/' + theVideoId + '?autoplay=1&title=0&byline=0&portrait=0');
  } else {
    console.log("If you are getting this error in the console, it is probably a sign that the youtube or vimeo api has changed.");
  }
  //The parameters for the video embed are set to show video controls but disallow related information at the video's end.
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('class', 'video-iframe');
  if (clickedClass === "video-thumbnail" || clickedClass === "icon-video-play-button") {
    vidParent.querySelector('.icon-video-play-button').remove();
    vidParent.querySelector('.video-thumbnail').remove();
    vidParent.appendChild(iframe);
  }
}

// var vimObject = {};
// var getVimeoThumbnail = function(id, vidDiv) {
//   var imgUrl = "";
//   $.ajax({
//     type: 'GET',
//     url: '//vimeo.com/api/v2/video/' + id + '.json',
//     jsonp: 'callback',
//     dataType: 'jsonp',
//     success: function(data) {
//       imgUrl = data[0].thumbnail_large;
//       vidDiv.style.backgroundImage = "url(" + imgUrl + ")";
//     }
//   });
// };

// var allThumbs = document.querySelectorAll('.video-thumbnail');
// if (allThumbs.length > 0) {
//   for (var i = 0; i < allThumbs.length; i++) {
//     if (allThumbs[i].dataset.isVimeo === "true") {
//       var vidId = allThumbs[i].dataset.videoid;
//       getVimeoThumbnail(vidId, allThumbs[i]);
//     }
//   }
// }





// $('.video-thumbnail,.icon-video-play-button').click(function() {
//   var clickedClass = $(this).attr('class');
//   console.log(clickedClass);
//   var iframe = document.createElement('iframe');
//   //assign theService to the provider added, but set to lower case to control for youtube, YouTube, etc.
//   var theService = $(this).parent().attr('data-streaming').toLowerCase();
//   var theVideoId = $(this).parent().attr('data-videoid');
//   if (theService == "youtube") {
//     iframe.setAttribute('src', '//www.youtube.com/embed/' + theVideoId + '?autoplay=1&autohide=2&border=0&wmode=opaque&enablejsapi=1&controls=1&showinfo=0&rel=0&vq=hd1080');
//   } else if (theService == "vimeo") {
//     iframe.setAttribute('src', '//player.vimeo.com/video/' + theVideoId + '?autoplay=1&title=0&byline=0&portrait=0');
//   } else {
//     console.log("If you are getting this error in the console, it is probably a sign that the youtube or vimeo api has changed.");
//   }
//   //The parameters for the video embed are set to show video controls but disallow related information at the video's end.
//   iframe.setAttribute('frameborder', '0');
//   iframe.setAttribute('class', 'video-iframe');
//   if (clickedClass === "icon-video-play-button") {
//     $(this).parent().empty().append(iframe);
//   } else {
//     $(this).prev().remove();
//     $(this).replaceWith(iframe);
//   }
// });
