FastClick.attach(document.body),
  !(function() {
    function a(a, b) {
      try {
        return P.call(a, b);
      } catch (c) {
        return !1;
      }
    }
    function b(b, c) {
      if (("string" == typeof b && ((c = b), (b = this)), a(b, c))) return b;
      if (b.closest) return b.closest(c);
      for (var d, b = b.parentElement; b && 1 == b.nodeType; ) {
        if (a(b, c)) {
          d = b;
          break;
        }
        b = b.parentElement;
      }
      return d || null;
    }
    function c(a) {
      "function" == typeof a && N.push(a);
    }
    function d(a, b) {
      (a = a || {}), c(b), window.history.replaceState(a.state, a.title, a.url);
    }
    function e(a) {
      if (((a = a || {}), a.eventId))
        try {
          var b = new MPing.inputs.Click(a.eventId);
          void 0 != a.event_param && (b.event_param = a.event_param),
            void 0 != a.page_name && (b.page_name = a.page_name),
            void 0 != a.event_level && (b.event_level = a.event_level),
            b.updateEventSeries();
          var c = new MPing();
          c.send(b);
        } catch (d) {}
    }
    function f() {
      var a = window.location.search;
      a = g("ran", new Date().getTime(), a);
      var b = window.location.pathname + a;
      window.history.replaceState(
        {
          url: b
        },
        "",
        b
      );
    }
    function g(a, b, c) {
      var d = new RegExp("([?;&])" + a + "[^&;]*[;&]?"),
        e = c.replace(d, "$1").replace(/&$/, "");
      return (e.length > 2 ? e + "&" : "?") + (b ? a + "=" + b : "");
    }
    function h(a, b, c) {
      if (a && b) {
        (c = c || []),
          "[object Array]" != Object.prototype.toString.call(c) && (c = [c]);
        var d = a.addEventListener || a.attachEvent;
        if (d && "function" == typeof b) {
          var e = !1,
            f = function() {
              if (!e) {
                for (var a = !0, d = 0; d < c.length; d++) {
                  var f = !0;
                  if (((f = "function" == typeof c[d] ? c[d]() : !!c[d]), !f)) {
                    a = !1;
                    break;
                  }
                }
                a &&
                  ((e = !0),
                  b(function() {
                    e = !1;
                  }));
              }
            };
          d.call(a, "scroll", k(f, 200));
        }
      }
    }
    function i(a, b, c, d, e) {
      if (
        a &&
        b &&
        ((a = J(a)),
        1 == b.nodeType && (b = b.innerHTML),
        "[object Array]" != Object.prototype.toString.call(c) && (c = [c]),
        a)
      ) {
        var f = doT.template(b),
          g = f.apply(this, c);
        if (d) {
          var h,
            i,
            k = j(g);
          if (
            ((h = a.children[e])
              ? (i = "afterend")
              : ((h = a), (i = "beforeend")),
            k instanceof HTMLElement && h.insertAdjacentElement(i, k),
            k instanceof NodeList)
          )
            if ("beforeend" == i)
              for (var l = 0; (node = k[l]); )
                h.insertAdjacentElement(i, node), l++;
            else if ("afterend" == i)
              for (var l = k.length - 1; (node = k[l]); )
                h.insertAdjacentElement(i, node), l--;
          if (k instanceof DocumentFragment)
            if (((k = k.children), "beforeend" == i))
              for (var l = 0; (node = k[l]); ) h.insertAdjacentElement(i, node);
            else if ("afterend" == i)
              for (var l = k.length - 1; (node = k[l]); )
                h.insertAdjacentElement(i, node), l--;
        } else a.innerHTML = g;
      }
    }
    function j(a) {
      if (a.querySelector) return a;
      if ("string" == typeof a) {
        var b = document.createElement("div");
        b.innerHTML = a;
        var c = b.children;
        if (1 === c.length) return c[0];
        for (var d = document.createDocumentFragment(); c.length > 0; )
          d.appendChild(c[0]);
        return d;
      }
      return null;
    }
    function k(a, b, c) {
      var d,
        e,
        f,
        g,
        h,
        i = function() {
          var j = Date.now() - g;
          b > j && j > 0
            ? (d = setTimeout(i, b - j))
            : ((d = null), c || ((h = a.apply(f, e)), d || (f = e = null)));
        };
      return function(j) {
        (f = this), (e = arguments), (g = Date.now());
        var k = c && !d;
        return (
          d || (d = setTimeout(i, b)),
          k && ((h = a.apply(f, e)), (f = e = null)),
          h
        );
      };
    }
    function l() {
      for (
        var a,
          b = [],
          c = document.querySelectorAll(".apply-num[unfetched]"),
          d = 0;
        d < c.length;
        d++
      ) {
        var e = c[d],
          f = e.getAttribute("data-id");
        f && b.push(f);
      }
      b.length &&
        ((a = "/mobile/user/getApplyCountByActivityIds?activityIds="),
        a &&
          $.ajax({
            url: a + b.join(","),
            dataType: "jsonp",
            success: function(a) {
              (a || []).forEach(function(a) {
                var b = a.activity_id,
                  c = a.count;
                if ((c > 1e4 && (c = (c / 1e4).toFixed(1) + "w+"), b)) {
                  var d = document.querySelector(
                    '.apply-num[unfetched][data-id="' + b + '"]'
                  );
                  if (d) {
                    var e = d.querySelector("font");
                    e && ((e.innerText = c || 0), $(d).removeClass("hide")),
                      d.removeAttribute("unfetched");
                  }
                }
              });
            }
          }));
    }
    function m(a) {
      function b(a) {
        return Number(a) > 0;
      }
      for (
        var c,
          d = [],
          e = document.querySelectorAll(".price[unfetched]"),
          f = 0;
        f < e.length;
        f++
      ) {
        var g = e[f],
          h = g.getAttribute("data-id");
        h && d.push(h);
      }
      if (d.length) {
        switch (C) {
          case "qq":
            c = "//pe.3.cn/prices/mgets?origin=4&source=20&skuids=";
            break;
          case "wx":
            c = "//pe.3.cn/prices/mgets?origin=4&source=20&skuids=";
            break;
          case "app":
            c = "//pm.3.cn/prices/mgets?area=&origin=2&source=20&skuids=";
            break;
          default:
            c = "//pm.3.cn/prices/mgets?area=&origin=2&source=20&skuids=";
        }
        c &&
          $.ajax({
            url: c + d.join(","),
            dataType: "jsonp",
            success: function(c) {
              (d || []).forEach(function(a) {
                var d,
                  e,
                  f = c.filter(function(b) {
                    return a == b.id;
                  });
                if (!f.length) {
                  var g = document.querySelector(
                    '.price[unfetched][data-id="' + a + '"]'
                  );
                  return void (
                    g &&
                    ((g.innerText = "鏆傛棤鎶ヤ环"),
                    (g.style.textDecoration = "none"),
                    g.removeAttribute("unfetched"))
                  );
                }
                if (((d = f[0].id), (e = f[0].p), d)) {
                  var g = document.querySelector(
                    '.price[unfetched][data-id="' + d + '"]'
                  );
                  if (!g) return;
                  b(e)
                    ? g.children.length > 0
                      ? (g.innerHTML =
                          '<span>锟�</span><span class="n">' + e + "</span>")
                      : (g.innerText = "锟�" + e)
                    : ((g.innerText = "鏆傛棤鎶ヤ环"),
                      (g.style.textDecoration = "none")),
                    g.removeAttribute("unfetched");
                }
              }),
                a && a(c);
            }
          });
      }
    }
    function n() {
      for (
        var a = [],
          b = document.querySelectorAll("[apply-state-unfetched]"),
          c = "/getApplyStateByActivityIds?activityIds=",
          d = 0;
        d < b.length;
        d++
      ) {
        var e = b[d],
          f = e.getAttribute("data-id");
        f && a.push(f);
      }
      a.length &&
        $.ajax({
          url: c + a.join(","),
          success: function(b) {
            try {
              b = JSON.parse(b);
            } catch (c) {
              b = null;
            }
            b &&
              $.each(a, function(a, c) {
                var d,
                  e = document.querySelector(
                    '[apply-state-unfetched][data-id="' + c + '"]'
                  );
                if (e) {
                  for (var f = 0; f < b.length; f++)
                    if (b[f].activityId == c) {
                      d = b[f];
                      break;
                    }
                  if (d) {
                    var g = d.selected,
                      h =
                        0 == g
                          ? "not-selected"
                          : 2 == g || 1 == g || 10 == g
                            ? "applying"
                            : 3 == g || 4 == g
                              ? "selected"
                              : "";
                    e.setAttribute("data-apply-state", d.selected),
                      $(e).addClass(h);
                  }
                  e.removeAttribute("apply-state-unfetched");
                }
              });
          }
        });
    }
    function o(a) {
      return a
        ? F
          ? "//wq.jd.com/item/view?sku=" + a
          : G
            ? "openApp.jdMobile://virtual?params={%22category%22:%22jump%22,%22des%22:%22productDetail%22,%22skuId%22:%22" +
              a +
              "%22}"
            : "//item.m.jd.com/product/" + a + ".html"
        : void 0;
    }
    function p(a, b) {
      return (
        (b = b || 1),
        G
          ? 'openApp.jdMobile://virtual?params={"category":"jump","des":"cart","skuId":' +
            a +
            ',"skuNum":' +
            b +
            "}"
          : "//m.jd.com/cart/add.action?wareId=" + a + "&num=" + b
      );
    }
    function q(a) {
      var b;
      if ("string" == typeof a) {
        var c = new RegExp("(^|&)" + a + "=([^&]+)", "g"),
          d = location.search.substring(1).match(c);
        d &&
          d.forEach(function(a) {
            var c = a.split("=")[1];
            try {
              c = decodeURIComponent(c);
            } catch (d) {}
            (b = b || []), b.push(c);
          });
      }
      return b;
    }
    function r(a) {
      var b = [],
        c = document.cookie.split(";");
      a = RegExp("^\\s*" + a + "=\\s*(.*?)\\s*$");
      for (var d = 0; d < c.length; d++) {
        var e = c[d].match(a);
        e && b.push(e[1]);
      }
      return b;
    }
    function s(a) {
      if (a)
        switch (a) {
          case 1:
            return 6;
          case 2:
            return 5;
          case 3:
            return 10;
          case 4:
            return 8;
          case 5:
            return 1;
          case 6:
            return 11;
          case 7:
            return 4;
          case 8:
            return 3;
          case 9:
            return 2;
          case 10:
            return 7;
          case 11:
            return 9;
          default:
            return void 0;
        }
    }
    function t(a, b) {
      if ("number" == typeof a || void 0 === a) {
        var c = void 0 === a ? new Date() : new Date(a),
          d = c.getFullYear(),
          e = c.getMonth() + 1,
          f = c.getDate(),
          g = c.getHours(),
          h = c.getMinutes(),
          i = c.getSeconds();
        return (
          (e = 10 > e ? "0" + e : e),
          (f = 10 > f ? "0" + f : f),
          (g = 10 > g ? "0" + g : g),
          (h = 10 > h ? "0" + h : h),
          (i = 10 > i ? "0" + i : i),
          d + "-" + e + "-" + f + (b ? " " + g + ":" + h + ":" + i : "")
        );
      }
    }
    function u(a) {
      if (a) {
        clearTimeout(window.t);
        var b = $(".message");
        b.text(a).show(),
          (window.t = setTimeout(function() {
            b.hide();
          }, 2e3));
      }
    }
    function v(a) {
      a = a || location.href;
      var b = w();
      "wx" == b || "qq" == b
        ? (window.location.href =
            "//wq.jd.com/pinbind/pintokenredirect?biz=car&url=" +
            encodeURIComponent(a))
        : (window.location.href =
            "//passport.m.jd.com/user/login.action?v=t&returnurl=" +
            encodeURIComponent(a));
    }
    function w() {
      var a = "",
        b = navigator.userAgent.toLowerCase(),
        c = window.WeixinJSBridge,
        d = !1,
        e = !1;
      return (
        c || (c = b.match(/micromessenger/) ? !0 : !1),
        /qq\/([\d\.]+)*/.test(b) && (d = !0),
        (e = b.match(/jdapp/) ? !0 : !1),
        e || (e = b.match(/jdcar_ios/) || b.match(/jdcar_android/) ? !0 : !1),
        (a = c ? "wx" : d ? "qq" : e ? "app" : "h5")
      );
    }
    function x(a) {
      if ("object" == typeof a) {
        for (var b in a) return !1;
        return !0;
      }
      return null == a ||
        void 0 == a ||
        "undefined" == a ||
        "" == a ||
        "null" == a
        ? !0
        : !1;
    }
    function y(a) {
      return !x(a);
    }
    function z(a) {
      function b() {
        (g = document.body.scrollTop),
          $("body")
            .addClass("overflowHide")
            .css("top", -g + "px"),
          $(h).show();
      }
      function c() {
        $("body")
          .removeClass("overflowHide")
          .css("top", 0),
          $(h).hide(),
          setTimeout(function() {
            document.body.scrollTop = g;
          });
      }
      var d,
        e,
        f,
        g,
        h = J(".modal-pane");
      if (((a = a || {}), h)) {
        if (
          ((d = h.querySelector(".title")),
          (e = h.querySelector(".content")),
          (f = h.querySelector(".btns")),
          (d.innerText = ""),
          (e.innerText = ""),
          (f.innerHTML = ""),
          a.title && (d.innerText = a.title),
          a.content && (e.innerText = a.content),
          a.btns)
        )
          for (var i = 0; i < +a.btns.length; i++) {
            var j,
              k = a.btns[i];
            (j = document.createElement("a")),
              j.setAttribute("href", "javascript:;"),
              (j.innerText = k.text),
              $(j).addClass(k.className),
              $(j).addClass("btn"),
              k.fn && j.addEventListener("click", k.fn),
              j.addEventListener("click", c),
              f.appendChild(j);
          }
        b();
      }
    }
    function A(a) {
      this.defaultOpt = {
        event_id: "",
        event_param: "",
        page_name: "",
        event_level: ""
      };
      var b = {};
      b = $.extend(b, this.defaultOpt, a);
      try {
        var c = b.event_id,
          d = new MPing.inputs.Click(c);
        (d.event_param = b.event_param),
          (d.event_level = b.event_level),
          (d.page_name = b.page_name),
          d.updateEventSeries();
        var e = new MPing();
        e.send(d);
      } catch (f) {}
    }
    function B(a, b, c, d) {
      var e = {
        event_id: a,
        event_param: b,
        page_name: c,
        event_level: d
      };
      A(e);
    }
    var C,
      D = (Math.random(), navigator.userAgent),
      E = -1 != D.indexOf("QQ"),
      F = -1 != D.indexOf("MicroMessenger"),
      G = -1 != D.indexOf("jdapp"),
      H = Array.prototype.slice,
      I = [
        {
          name: "鍏ㄩ儴鍒嗙被",
          id: 0
        },
        {
          name: "澶у皬瀹剁數",
          id: "737",
          img: "jfs/t3433/259/1707719343/17529/1bdf6023/582d57c4N967ae140.png"
        },
        {
          name: "娼祦3C",
          id: "670,652,9987",
          img: "jfs/t3349/350/1582997203/16572/ff62d0b0/582d590bN0240c65f.png"
        },
        {
          name: "椋熷搧楗枡",
          id: "1320,12259",
          img: "jfs/t3490/260/1536014176/13243/949c47f1/582d590bNf3a9d127.png"
        },
        {
          name: "鍥句功",
          id: "1713,4053",
          img: "jfs/t3340/302/1641930459/24924/dbe711ea/582d590bN3e684ce6.png"
        },
        {
          name: "鐢熼矞",
          id: "12218",
          img: "jfs/t3781/312/1636406045/16199/74986544/582d590bNc7dc2c72.png"
        },
        {
          name: "姣嶅┐鐜╁叿",
          id: "1319,6233",
          img: "jfs/t3820/238/1403321506/16406/2eab1bf5/582d590bN9b8db9ad.png"
        },
        {
          name: "涓姢缇庡",
          id: "1316",
          img: "jfs/t3493/338/1639928675/8742/22466e7e/582d590bNa6f96cb0.png"
        },
        {
          name: "姹借溅鐢ㄥ搧",
          id: "6728",
          img: "jfs/t3343/360/1641968834/14377/9ad59e82/582d590bN6e9cfa9e.png"
        },
        {
          name: "閽熻〃",
          id: "5025",
          img: "jfs/t3619/225/1646376833/11578/442a9c80/582d590bN31c8cb42.png"
        }
      ],
      J = function(a) {
        try {
          return "string" == typeof a ? document.querySelector(a) : a;
        } catch (b) {}
      },
      K = function(a) {
        try {
          return "string" == typeof a
            ? H.call(document.querySelectorAll(a))
            : a;
        } catch (b) {}
      },
      L = function(a, b) {
        return (
          (a = J(a)),
          (b = "number" == typeof b ? b : 0),
          1 == a.nodeType &&
            a.parentElement.offsetHeight +
              (a.scrollTop || a.parentElement.scrollTop) +
              b >=
              a.offsetHeight &&
            a.parentElement.offsetHeight < a.offsetHeight
        );
      },
      M = (window._from_cache = !1),
      N = [],
      O = document.documentElement,
      P =
        O.matchesSelector ||
        O.mozMatchesSelector ||
        O.webkitMatchesSelector ||
        O.msMatchesSelector ||
        function(a) {
          for (
            var b = (this.document || this.ownerDocument).querySelectorAll(a),
              c = b.length;
            --c >= 0 && b.item(c) !== this;

          );
          return c > -1;
        };
    "scrollRestoration" in history && (history.scrollRestoration = "manual"),
      window.addEventListener("pageshow", function(a) {
        M = a.persisted;
      }),
      (window.onpopstate = function(a) {
        console.log("popstate"),
          M ||
            N.forEach(function(b) {
              b(a.state);
            });
      }),
      (window.recordState = d),
      (window.addRestoreFn = c),
      (window.replaceUrl = f),
      document.body.addEventListener("click", function(a) {
        var c,
          d,
          g,
          h,
          i,
          j = a.target,
          k = b(j, ".J_ping");
        k &&
          ((c = k.dataset.event_id),
          (d = k.dataset.event_param),
          (g = k.dataset.page_name),
          (h = k.dataset.event_level),
          (i = k.dataset.link),
          c &&
            (f(),
            e({
              eventId: c,
              event_param: d,
              page_name: g || location.hostname + (location.path || "/"),
              event_level: h
            })),
          i &&
            (f(),
            setTimeout(function() {
              location.href = i;
            }, 100)));
      }),
      (C = F ? "wx" : E ? "qq" : G ? "app" : "m");
    var Q = document.querySelector(".top"),
      R = /(^|\s+)hide($|\s+)/;
    Q &&
      (Q.addEventListener("click", function() {
        window.scrollTo(0, 0);
      }),
      h(window, function(a) {
        if (document.body.scrollTop >= document.documentElement.offsetHeight) {
          var b = Q.className.match(R);
          b && (Q.className = Q.className.replace(b[0], ""));
        } else {
          var b = Q.className.match(R);
          b || (Q.className = Q.className + " hide");
        }
        a();
      })),
      (window.updateMPing = B),
      (window.showModal = z),
      (window.isEmpty = x),
      (window.isNotEmpty = y),
      (window.goLogin = v),
      (window.showResult = u),
      (window.getDom = J),
      (window.getDoms = K),
      (window.getCookie = r),
      (window.switchOrder = s),
      (window.atBottom = L),
      (window.categories = I),
      (window.scrollExecute = h),
      (window.render = i),
      (window.parseHTML = j),
      (window.debounce = k),
      (window.getApplyNum = l),
      (window.getPrices = m),
      (window.getApplyState = n),
      (window.getDetailLink = o),
      (window.getURLParam = q),
      (window.getAddCartLink = p),
      (window.closest = b),
      (window.matches = a),
      (window.timestampToDatetime = t),
      (window.authinfo_url =
        location.protocol +
        "//game.m.jd.com/client?functionId=gameShareInitExecute&activityId=1&gameId=1&locHref=http%253A%252F%252Ftry.jd.com%252Findex.html"),
      (window.page_icon =
        location.protocol +
        "//m.360buyimg.com/mobilecms/s80x80_jfs/t3421/186/1013624254/4511/c58caa35/581aa272N460de9c6.png");
  })();
