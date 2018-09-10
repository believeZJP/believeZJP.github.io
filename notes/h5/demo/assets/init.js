!(function() {
    // 判断是否是一定浏览器
    function e() {
        return !(
            !/iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(
                navigator.userAgent.toLowerCase()
            ) || /pc=1/.test(location.search)
        );
    }
    function i() {
        var e = window.navigator.userAgent.toLowerCase();
        return 'micromessenger' == e.match(/MicroMessenger/i);
    }
    function n() {
        var e = window.navigator.userAgent.toLowerCase();
        return 'newsapp' == e.match(/newsapp/i);
    }
    function t(e) {
        var i = document.getElementById(e),
            n = function() {
                document.removeEventListener('WeixinJSBridgeReady', n),
                    document.removeEventListener('YixinJSBridgeReady', n),
                    i.play();
            };
        document.addEventListener('WeixinJSBridgeReady', n, !1), document.addEventListener('YixinJSBridgeReady', n, !1);
    }
    function o(e) {
        var i = document.getElementById(e),
            n = function() {
                document.removeEventListener('WeixinJSBridgeReady', n),
                    document.removeEventListener('YixinJSBridgeReady', n),
                    i.play(),
                    i.pause();
            };
        document.addEventListener('WeixinJSBridgeReady', n, !1), document.addEventListener('YixinJSBridgeReady', n, !1);
    }
    // loading样式设置
    function a() {
        (w = window.innerWidth),
            (_ = window.innerHeight),
            // 宽度小于高度，竖屏，设置loading样式
            w < _
                ? ((k = w / 750),
                  (B = _ / k),
                  $('#loading').css({
                      '-webkit-transform': 'rotate(90deg) scale(' + k + ') translate3d(0,-750px,0)',
                      width: _ / k,
                      height: '750px'
                  }),
                  $('.loading_logo').css({
                      left: (_ / k - 242) / 2 + 'px'
                  }),
                  $('.loading_main').css({
                      left: (_ / k - 283) / 2 + 'px'
                  }))
                : //   宽度大于高度，设置loading样式
                  ((k = _ / 750),
                  (B = w / k),
                  $('#loading').css({
                      '-webkit-transform': 'rotate(0deg) scale(' + k + ') translate3d(0,0,0)',
                      width: w / k,
                      height: '750px'
                  }),
                  $('.loading_logo').css({
                      left: (w / k - 242) / 2 + 'px'
                  }),
                  $('.loading_main').css({
                      left: (w / k - 283) / 2 + 'px'
                  }));
    }
    // 确定屏幕旋转角度，根据不同的角度显示不同内容
    function s() {
        console.log(window.orientation, '方向');
        switch (window.orientation) {
            case 0:
                setTimeout(function() {
                    a(),
                        (Te = Math.PI / 2),
                        (X.rotation = Te),
                        X.scale.set(k, k),
                        W.resize(w, _),
                        X.position.set(w, 0),
                        (P = Ne.__scrollLeft),
                        $('#loading').css({
                            '-webkit-transform': 'rotate(90deg) scale(' + k + ') translate3d(0,-750px,0)',
                            width: _ / k,
                            height: '750px'
                        }),
                        $('.loading_logo').css({
                            left: (_ / k - 242) / 2 + 'px'
                        }),
                        $('.loading_main').css({
                            left: (_ / k - 283) / 2 + 'px'
                        }),
                        setTimeout(function() {
                            // Ne.setDimensions(w, _, w, 16067 + _), Ne.scrollTo(0, P, !1), (B = _ / k), v();
                            Ne.setDimensions(w, _, w, 1600 + _), Ne.scrollTo(0, P, !1), (B = _ / k), v();
                        }, 200);
                }, 300);
                break;
            case -90:
                setTimeout(function() {
                    a(),
                        (Te = 0),
                        (X.rotation = Te),
                        X.scale.set(k, k),
                        W.resize(w, _),
                        X.position.set(0, 0),
                        (S = Ne.__scrollTop),
                        $('#loading').css({
                            '-webkit-transform': 'rotate(0deg) scale(' + k + ') translate3d(0,0,0)',
                            width: w / k,
                            height: '750px'
                        }),
                        $('.loading_logo').css({
                            left: (w / k - 242) / 2 + 'px'
                        }),
                        $('.loading_main').css({
                            left: (w / k - 283) / 2 + 'px'
                        }),
                        setTimeout(function() {
                            Ne.setDimensions(w, _, 16067 + w, _), Ne.scrollTo(S, 0, !1), (B = w / k), v();
                        }, 200);
                }, 300);
                break;
            case 90:
                setTimeout(function() {
                    a(),
                        (Te = 0),
                        (X.rotation = Te),
                        X.scale.set(k, k),
                        W.resize(w, _),
                        X.position.set(0, 0),
                        (S = Ne.__scrollTop),
                        $('#loading').css({
                            '-webkit-transform': 'rotate(0deg) scale(' + k + ') translate3d(0,0,0)',
                            width: w / k,
                            height: '750px'
                        }),
                        $('.loading_logo').css({
                            left: (w / k - 242) / 2 + 'px'
                        }),
                        $('.loading_main').css({
                            left: (w / k - 283) / 2 + 'px'
                        }),
                        setTimeout(function() {
                            Ne.setDimensions(w, _, 16067 + w, _), Ne.scrollTo(S, 0, !1), (B = w / k), v();
                        }, 200);
                }, 300);
                break;
            case 180:
        }
        B = w < _ ? _ / k : w / k;
    }
    // 更新加载进度
    function d(e, i) {
        var n = parseInt(e.progress);
        $('#percent').html(n + '%');
    }
    // 必须图片加载完后开始初始化canvas
    function p() {
        // 图片加载完成
        $('#percent').html('100%'),
            // loading移除
            setTimeout(function() {
                $('#loading').fadeOut(300);
            }, 300),
            // loading样式设置
            a(),
            (R = new C()),
            (J = new C()),
            J.pivot.set(2050, 300),
            J.position.set(2050, 300),
            (D = new C()),
            D.pivot.set(550, 150),
            D.position.set(2762, 150),
            D.scale.set(0.8, 0.8),
            (U = new C()),
            U.pivot.set(550, 150),
            U.position.set(2762, 150),
            (U.alpha = 0),
            (O = new C()),
            O.position.set(5200, 0),
            (z = new A(T.resources[M + '3/tree.png'].texture)),
            z.position.set(8670, 0),
            (G = new C()),
            G.position.set(7500, 0),
            (Q = new C()),
            Q.position.set(8800, 0),
            (q = new C()),
            // q.position.set(11250, 0),
            q.position.set(11250, 0);
        //     (ne = [be, we, _e, fe, Ie, Se, Pe]),
        //     (te = [J, D, U, O, G, Q, q]);
        // for (var e = 0; e < te.length; e++)
        //     for (var i = 0; i < ne[e].length; i++) {
        //         var n = new A(T.resources[ne[e][i].url].texture);
        //         if (3 == e && 11 == i) {
        //             n = new C();
        //             var t = new A(T.resources[M + '3/car3.png'].texture),
        //                 o = new A(T.resources[M + '3/car3_wheel.png'].texture),
        //                 d = new A(T.resources[M + '3/car3_wheel.png'].texture);
        //             o.pivot.set(22.5, 22.5),
        //                 d.pivot.set(22.5, 22.5),
        //                 o.position.set(191.5, 100.5),
        //                 d.position.set(383.5, 100.5),
        //                 n.addChild(t, o, d);
        //         }
        //         if (3 == e && 12 == i) {
        //             n = new C();
        //             var t = new A(T.resources[M + '3/car4.png'].texture),
        //                 o = new A(T.resources[M + '3/car4_wheel.png'].texture),
        //                 d = new A(T.resources[M + '3/car4_wheel.png'].texture);
        //             o.pivot.set(22.5, 22.5),
        //                 d.pivot.set(22.5, 22.5),
        //                 o.position.set(215.5, 95.5),
        //                 d.position.set(425.5, 95.5),
        //                 n.addChild(t, o, d);
        //         }
        //         if (3 == e && 13 == i) {
        //             n = new C();
        //             var t = new A(T.resources[M + '3/car2.png'].texture),
        //                 o = new A(T.resources[M + '3/car2_wheel.png'].texture),
        //                 d = new A(T.resources[M + '3/car2_wheel.png'].texture);
        //             o.pivot.set(40.5, 40.5),
        //                 d.pivot.set(40.5, 40.5),
        //                 o.position.set(432.5, 122.5),
        //                 d.position.set(107.5, 122.5),
        //                 n.addChild(t, o, d);
        //         }
        //         if (3 == e && 14 == i) {
        //             n = new C();
        //             var t = new A(T.resources[M + '3/car1.png'].texture),
        //                 p = new A(T.resources[M + '3/car1_light.png'].texture);
        //             p.position.set(482, 64);
        //             var o = new A(T.resources[M + '3/car1_wheel.png'].texture),
        //                 d = new A(T.resources[M + '3/car1_wheel2.png'].texture);
        //             o.pivot.set(41, 41),
        //                 d.pivot.set(43, 43),
        //                 o.position.set(422, 120),
        //                 d.position.set(123, 118),
        //                 n.addChild(t, o, d, p);
        //         }
        //         if (
        //             (n.position.set(ne[e][i].position.x, ne[e][i].position.y),
        //             (n.name = ne[e][i].name),
        //             (n.data = ne[e][i]),
        //             ((1 == e && 1 == i) ||
        //                 (1 == e && 12 == i) ||
        //                 (1 == e && 27 == i) ||
        //                 (1 == e && 29 == i) ||
        //                 (1 == e && 31 == i) ||
        //                 (1 == e && 33 == i)) &&
        //                 (n.alpha = 0),
        //             1 == e && 9 == i && n.pivot.set(8, 58),
        //             1 == e && 10 == i && n.pivot.set(88, 58),
        //             1 == e && 22 == i && n.pivot.set(295, 10),
        //             ((1 == e && 30 == i) || (1 == e && 31 == i)) && (n.pivot.set(44, 6), (n.rotation = -0.5)),
        //             4 == e && 2 == i && n.pivot.set(85, 7),
        //             4 == e && 3 == i && n.pivot.set(21.5, 21.5),
        //             4 == e && 4 == i && (n.pivot.set(41, 57), n.position.set(589, 410)),
        //             4 == e && 5 == i && (n.pivot.set(41, 57), n.position.set(589, 410), (n.visible = !1)),
        //             4 == e &&
        //                 6 == i &&
        //                 (n.pivot.set(205, 285), n.position.set(589, 410), (n.visible = !1), n.scale.set(0.2, 0.2)),
        //             te[e].addChild(n),
        //             4 == e && 6 == i)
        //         ) {
        //             ae = new C();
        //             for (var h = 0; h < ke.length; h++) {
        //                 var c = new A(T.resources[ke[h].url].texture);
        //                 c.pivot.set(ke[h].pivot.x, ke[h].pivot.y),
        //                     c.position.set(ke[h].position.x + ke[h].pivot.x, ke[h].position.y + ke[h].pivot.y),
        //                     (c.data = ke[h]),
        //                     c.scale.set(3),
        //                     (c.rotation = ke[h].rotate),
        //                     ae.addChild(c);
        //             }
        //             te[e].addChild(ae);
        //         }
        //         if (0 == i && 0 == e) {
        //             var u = new E();
        //             u.beginFill(6737151),
        //                 u.drawRect(300, 0, 83, 59),
        //                 u.endFill(),
        //                 (u.data = {
        //                     position: {
        //                         x: 545,
        //                         y: 321
        //                     },
        //                     speed: {
        //                         x: 0.05,
        //                         y: 0
        //                     }
        //                 }),
        //                 J.addChild(u);
        //             var v = new E();
        //             v.beginFill(0),
        //                 v.drawRect(0, 0, 83, 158),
        //                 v.endFill(),
        //                 (v.data = {
        //                     position: {
        //                         x: 846,
        //                         y: 162
        //                     },
        //                     speed: {
        //                         x: 0.05,
        //                         y: 0.1
        //                     }
        //                 }),
        //                 (v.mask = u),
        //                 v.position.set(v.data.position.x, v.data.position.y);
        //             var y = new E();
        //             y.beginFill(0),
        //                 y.drawRect(0, 0, 83, 158),
        //                 y.endFill(),
        //                 (y.data = {
        //                     position: {
        //                         x: 846,
        //                         y: 380
        //                     },
        //                     speed: {
        //                         x: 0.05,
        //                         y: -0.1
        //                     }
        //                 }),
        //                 (y.mask = u),
        //                 y.position.set(y.data.position.x, y.data.position.y),
        //                 J.addChild(v, y);
        //         }
        //         if (
        //             (3 == e &&
        //                 i == fe.length - 1 &&
        //                 ((Y = new E()),
        //                 Y.beginFill(6737151),
        //                 Y.drawRect(0, 0, 3690, 750),
        //                 Y.endFill(),
        //                 (Y.data = {
        //                     position: {
        //                         x: 0,
        //                         y: 0
        //                     },
        //                     speed: {
        //                         x: -0.1,
        //                         y: 0
        //                     }
        //                 }),
        //                 (O.mask = Y),
        //                 O.addChild(Y)),
        //             5 == e && 10 == i && (n.alpha = 0),
        //             5 == e && 5 == i && (n.pivot.set(632, 16), (n.visible = !1)),
        //             ((5 == e && 6 == i) || (5 == e && 7 == i)) && n.pivot.set(2400, 450),
        //             5 == e && 19 == i && n.pivot.set(1e3, 450),
        //             5 == e && 15 == i)
        //         ) {
        //             ie = new C();
        //             var b = new A(T.resources[M + '4/body.png'].texture);
        //             b.pivot.set(56, 100), b.position.set(107, 228);
        //             var f = new A(T.resources[M + '4/hand1.png'].texture);
        //             f.pivot.set(52, 154), f.position.set(94, 157);
        //             var S = new A(T.resources[M + '4/hand2.png'].texture);
        //             S.pivot.set(29, 163), S.position.set(93, 169);
        //             var P = new A(T.resources[M + '4/leg1.png'].texture);
        //             P.pivot.set(63, 11), P.position.set(107, 289);
        //             var j = new A(T.resources[M + '4/leg2.png'].texture);
        //             j.pivot.set(15, 13), j.position.set(114, 295);
        //             var K = new A(T.resources[M + '4/head.png'].texture);
        //             K.pivot.set(113, 130),
        //                 K.position.set(113, 192),
        //                 ie.addChild(f, j, K, b, S, P),
        //                 (ie.data = {
        //                     position: {
        //                         x: 477,
        //                         y: 0
        //                     },
        //                     speed: 0
        //                 }),
        //                 ie.position.set(477, 0),
        //                 Q.addChild(ie);
        //         }
        //         6 == e && 0 == i && ((de = new PIXI.extras.AnimatedSprite.fromImages(pe)), q.addChild(de));
        //     }
        // var oe = new E();
        // oe.beginFill(4158644),
        //     oe.drawRect(0, 0, 2e4, 2e4),
        //     oe.endFill(),
        // (H = new C()),
        //     (N = new A(T.resources[M + 'start/bg.jpg'].texture)),
        //     w < _ ? (N.width = _ / k) : (N.width = w / k),
        //     (N.height = 750),
        // (F = new PIXI.extras.AnimatedSprite.fromImages([M + 'start/eye_open.png', M + 'start/eye_close.png'])),
        //     (Ce = setInterval(function() {
        //         F.gotoAndStop(1),
        //             setTimeout(function() {
        //                 F.gotoAndStop(0);
        //             }, 150);
        //     }, 1700)),
        //     F.pivot.set(224, 311),
        //     F.position.set(224 + (B - 558) / 2, 361);
        var se = new C();
        se.position.set(0, 55);
        var re = new A(T.resources[M + 'start/line.png'].texture),
            le = new A(T.resources[M + 'start/line.png'].texture);
        le.position.set(1747, 0),
            se.addChild(re, le),
            //     new TWEEN.Tween(se.position)
            //         .to(
            //             {
            //                 x: -1747
            //             },
            //             9e4
            //         )
            //         .repeat(1 / 0)
            //         .start();
            // var ge = new C();
            // ge.position.set(0, 14);
            // var he = new A(T.resources[M + 'start/dot.png'].texture),
            //     ce = new A(T.resources[M + 'start/dot.png'].texture);
            // ce.position.set(1635, 0),
            //     ge.addChild(he, ce),
            //     new TWEEN.Tween(ge.position)
            //         .to(
            //             {
            //                 x: -1635
            //             },
            //             3e4
            //         )
            //         .repeat(1 / 0)
            //         .start(),
            //     (L = new E()),
            //     L.beginFill(6737151),
            //     L.drawRect(0, 0, N.width, 750),
            //     L.endFill(),
            //     (H.mask = L),
            //     H.addChild(N, se, ge, F, L),
            //     (ye = new C());
            // var ue = new A(T.resources[M + 'start/hand.png'].texture);
            // ue.position.set((B - 61) / 2 + 100, 483),
            //     (me = new TWEEN.Tween(ue.position)
            //         .to(
            //             {
            //                 x: (B - 61) / 2 - 100
            //             },
            //             1e3
            //         )
            //         .delay(300)
            //         .repeat(1 / 0)
            //         .easing(TWEEN.Easing.Quadratic.Out)
            //         .start());
            // var xe = new A(T.resources[M + 'start/text.png'].texture);
            // xe.position.set((B - 133) / 2, 610);
            // var ve = new E();
            // ve.beginFill(0),
            //     ve.drawRect(0, 0, 2e3, 750),
            //     ve.endFill(),
            //     (ve.alpha = 0.35),
            //     ye.addChild(ve, ue, xe),
            //     H.addChild(ye),
            //     (Z = new C());
            // var Ee = new A(T.resources[M + 'start/bg.jpg'].texture);
            // Z.position.set(13900, 0);
            // var $e = new C();
            // $e.position.set(0, 55);
            // var re = new A(T.resources[M + 'start/line.png'].texture),
            //     le = new A(T.resources[M + 'start/line.png'].texture);
            // le.position.set(1747, 0), $e.addChild(re, le);
            // var Me = new C();
            // Me.position.set(0, 14);
            // var he = new A(T.resources[M + 'start/dot.png'].texture),
            //     ce = new A(T.resources[M + 'start/dot.png'].texture);
            // ce.position.set(1635, 0),
            //     Me.addChild(he, ce),
            //     (Ae = 100),
            //     ($e.visible = !1),
            //     (Me.visible = !1),
            //     (V = setInterval(function() {
            //         ($e.position.x -= Ae),
            //             (Me.position.x -= Ae / 3),
            //             $e.position.x < -1747 && ($e.position.x += 1747),
            //             Me.position.x < -1635 && (Me.position.x += 1635);
            //     }, 60)),
            (ee = new C());
        // var ve = new A(T.resources[M + 'end/cover_bg1.png'].texture),
        //     Xe = new A(T.resources[M + 'end/watch_again1.png'].texture);
        // // Xe.position.set(78, 551),
        // //     (Xe.interactive = !0),
        // //     (Xe.buttonMode = !0),
        // //     Xe.on('touchend', function() {
        // //         location.reload();
        // //     });
        // // window.openNewsapp.init({
        // //     projectId: '4JHDPZUJ-2',
        // //     channels: ['news_sps_feidian', 'sps_article', 'sps'],
        // //     param: 'S1385797470941'
        // // });
        // var We = new A(T.resources[M + 'end/netease1.png'].texture);
        // We.position.set(78, 458), (We.interactive = !0), (We.buttonMode = !0);
        // // We.on('touchend', function(e) {
        // //     window.openNewsapp.open({
        // //         param: 'reader/T1497354552181'
        // //     });
        // // });
        // var Re = new A(T.resources[M + 'end/share.png'].texture);
        // Re.position.set(22, 444),
        //     (Re.interactive = !0),
        //     (Re.buttonMode = !0),
        //     Re.on('touchend', function(e) {
        //         // h5Share.share();
        //     }),
        //     I
        //         ? ((Xe.visible = !1), (We.visible = !1), (Re.visible = !0))
        //         : ((Xe.visible = !0), (We.visible = !0), (Re.visible = !1)),
        //     ee.addChild(ve, Xe, We, Re),
        //     ee.position.set(B, 0),
        //     Z.addChild(Ee, $e, Me, ee),
        //     X.addChild(R),
        (Te = Math.PI / 2),
            (X.rotation = Te),
            X.position.set(w, 0),
            // R.addChild(oe, q, Q, G, O, z, D, U, J, H, Z),
            X.scale.set(k, k),
            (X.interactive = !0),
            (X.buttonMode = !0),
            // 对canvas容器绑定触摸事件
            X.on('touchstart', r).on('touchmove', l).on('touchend', g),
            // 旋转屏幕的处理
            s(),
            //   字幕处理
            x(),
            Ne.setDimensions(w, _, w, 16067 + _),
            W.render(X),
            m();
    }
    // 开始滑动事件监听
    function r(e) {
        ye.visible = !1;
        var i = e.data.originalEvent;
        (Le = !0), Ne.doTouchStart(i.touches, i.timeStamp);
    }
    // 滑动过程事件监听
    function l(e) {
        if (Le) {
            var i = e.data.originalEvent;
            Ne.doTouchMove(i.touches, i.timeStamp, i.scale);
        }
    }
    // 滑动结束事件监听
    function g(e) {
        var i = e.data.originalEvent;
        Ne.doTouchEnd(i.timeStamp), (Le = !1);
    }
    function h() {
        Be = setInterval(function() {
            var e = 6 * Math.random();
            if (!(e > 5)) {
                var i = parseInt(150 + 100 * Math.random()),
                    n = 0.2 * Math.random(),
                    t = new TWEEN.Tween({
                        rotation: -0.5
                    })
                        .to(
                            {
                                rotation: -n
                            },
                            i
                        )
                        .onUpdate(function() {
                            (D.children[30].rotation = this.rotation), (D.children[31].rotation = this.rotation);
                        })
                        .easing(TWEEN.Easing.Quadratic.Out)
                        .start(),
                    o = new TWEEN.Tween({
                        rotation: -n
                    })
                        .to(
                            {
                                rotation: -0.5
                            },
                            200
                        )
                        .onUpdate(function() {
                            (D.children[30].rotation = this.rotation), (D.children[31].rotation = this.rotation);
                        })
                        .easing(TWEEN.Easing.Quadratic.Out);
                t.chain(o);
            }
        }, 450);
    }
    // 清除定时器
    function c() {
        clearInterval(Be), (Be = null);
    }
    function u() {
        (oe = new PIXI.extras.AnimatedSprite.fromImages(Ee)),
            (se = 1),
            w < _ ? _ / k > 1206 && (se = _ / k / 1206) : w / k > 1206 && (se = w / k / 1206),
            oe.pivot.set(205, 285),
            oe.position.set(205 + 205 * (se - 1), 285),
            oe.scale.set(se),
            (oe.visible = !1),
            G.addChildAt(oe, 7),
            (re = new PIXI.extras.AnimatedSprite.fromImages(le)),
            q.addChildAt(re, 2),
            re.position.set(601, 369),
            re.pivot.set(100, 265),
            re.scale.set(0.6),
            (ge = new PIXI.extras.AnimatedSprite.fromImages([
                M + '5/1-0.png',
                M + '5/1-1.png',
                M + '5/1-2.png',
                M + '5/1-3.png',
                M + '5/1-4.png',
                M + '5/1-5.png',
                M + '5/1-6.png'
            ])),
            ge.position.set(1478, 125),
            (he = new PIXI.extras.AnimatedSprite.fromImages([
                M + '5/2-0.png',
                M + '5/2-1.png',
                M + '5/2-2.png',
                M + '5/2-3.png',
                M + '5/2-4.png',
                M + '5/2-5.png',
                M + '5/2-6.png'
            ])),
            he.position.set(1737, 116),
            (ce = new PIXI.extras.AnimatedSprite.fromImages([
                M + '5/3-0.png',
                M + '5/3-1.png',
                M + '5/3-2.png',
                M + '5/3-3.png',
                M + '5/3-4.png',
                M + '5/3-5.png',
                M + '5/3-6.png'
            ])),
            ce.position.set(1901, 102),
            (ue = new PIXI.extras.AnimatedSprite.fromImages([
                M + '5/4-0.png',
                M + '5/4-1.png',
                M + '5/4-2.png',
                M + '5/4-3.png',
                M + '5/4-4.png',
                M + '5/4-5.png',
                M + '5/4-6.png'
            ])),
            ue.position.set(2141, 229),
            (ve = new PIXI.extras.AnimatedSprite.fromImages([
                M + '5/6-0.png',
                M + '5/6-1.png',
                M + '5/6-2.png',
                M + '5/6-3.png',
                M + '5/6-4.png',
                M + '5/6-5.png',
                M + '5/6-6.png'
            ])),
            ve.position.set(2141, 207),
            (xe = new PIXI.extras.AnimatedSprite.fromImages([
                M + '5/5-0.png',
                M + '5/5-1.png',
                M + '5/5-2.png',
                M + '5/5-3.png',
                M + '5/5-4.png',
                M + '5/5-5.png',
                M + '5/5-6.png'
            ])),
            xe.position.set(2420, 105),
            q.addChildAt(ge, 3),
            q.addChildAt(he, 4),
            q.addChildAt(ce, 5),
            q.addChildAt(ue, 6),
            q.addChildAt(xe, 7),
            q.addChildAt(ve, 8);
        for (var e = [], i = 0; i < 17; i++) e.push(M + 'end/' + i + '.png');
        (K = new PIXI.extras.AnimatedSprite.fromImages(e)),
            K.pivot.set(224, 330),
            K.position.set(224 + (B - 558) / 2, 357),
            Z.addChildAt(K, 3);
    }
    // 字幕处理
    function x() {
        X.removeChild(j), (j = new C()), j.position.set(0, 628);
        for (var e = 0; e < 7; e++) {
            var i = new A(T.resources[M + 'text/' + e + '.png'].texture);
            (i.visible = !1), (i.position.x = (B - i.width) / 2), j.addChild(i);
        }
        X.addChild(j);
    }
    function v() {
        x();
        // x(),
        // ee.position.set(B, 0),
        // H.removeChild(N),
        // (N = new A(T.resources[M + 'start/bg.jpg'].texture)),
        // (N.width = B),
        // (N.height = 750),
        // H.addChildAt(N, 0),
        // H.removeChild(L),
        // (L = new E()),
        // L.beginFill(6737151),
        // L.drawRect(0, 0, B, 750),
        // L.endFill(),
        // (H.mask = L),
        // H.addChildAt(L, 4),
        // (F.position.x = 224 + (B - 558) / 2),
        // K && (K.position.x = 224 + (B - 558) / 2),
        // (ye.children[1].position.x = (B - 61) / 2 + 100),
        // me.stop(),
        // (me = new TWEEN.Tween(ye.children[1].position)
        //     .to(
        //         {
        //             x: (B - 61) / 2 - 100
        //         },
        //         1e3
        //     )
        //     .delay(300)
        //     .repeat(1 / 0)
        //     .easing(TWEEN.Easing.Quadratic.Out)
        //     .start()),
        // (ye.children[2].position.x = (B - 133) / 2);
    }
    function y() {
        Je = setInterval(function() {
            K.gotoAndStop(16),
                setTimeout(function() {
                    K.gotoAndStop(15);
                }, 150);
        }, 1700);
    }
    // 根据硬件环境渲染canvas
    function m() {
        // W是整个canvas, X 是PIXI的容器
        TWEEN.update(), requestAnimationFrame(m), W.render(X);
    }
    // 判断是否是移动端浏览器
    var b = e();
    // 如果不是移动端, 页面移除所有内容，显示二维码背景图
    if (!b) {
        var w = 640,
            _ = window.innerHeight;
        return (
            $('.china_tolerance_content').height(_),
            $('.china_tolerance_content').html(''),
            void $('.china_tolerance_content').css({
                'background-color': '#eee',
                'background-image':
                    'url(http://cms-bucket.nosdn.127.net/918219c1426d4d25a8bed87ac991fe6e20170914123039.jpeg)',
                'background-repeat': 'no-repeat',
                'background-position': 'center 100px'
            })
        );
    }
    var f = i(),
        I = n();
    // f ||
    //     h5Share.init({
    //         title: '\u6002\u6002\u5fcd\u6002\u6002\u6002\u6002\u5fcd\u6002\u6002\uff0c\u8fd8\u5fcd\u5417',
    //         desc: '\u6d3b\u5230\u73b0\u5728\u4f60\u90fd\u9003\u4e0d\u5f00\u7684\u56db\u5b57\u9b54\u5492',
    //         url: window.location.href,
    //         img: 'http://cms-bucket.nosdn.127.net/15447b3150fc427789fa41225d843b2b20170914111552.jpeg'
    //     });
    var k,
        _ = window.innerHeight,
        w = window.innerWidth,
        S = 0,
        P = 0,
        C = PIXI.Container,
        T = (PIXI.autoDetectRenderer, PIXI.loader),
        A = (PIXI.loader.resources,
        PIXI.utils.TextureCache,
        PIXI.Texture,
        PIXI.Text,
        new PIXI.ticker.Ticker(),
        PIXI.Sprite),
        E = (PIXI.Rectangle, PIXI.Graphics),
        M = 'http://static.ws.126.net/f2e/news/china_tolerance/images/';
    $('.mask').bind('touchmove', function(e) {
        e.preventDefault();
    }),
        $('.mask').bind('touchstart', function(e) {
            e.preventDefault();
        }),
        t('bgm'),
        o('guitar'),
        o('game'),
        o('close'),
        o('paper'),
        o('photo'),
        o('laugh'),
        o('mix'),
        o('car'),
        o('mouth'),
        o('hit'),
        o('ball'),
        o('chair'),
        o('type'),
        o('clock'),
        o('snow'),
        o('swish1'),
        o('swish2'),
        o('swish3'),
        o('swish4'),
        o('swish5');
    var X = new C();
    (X.width = w), (X.height = _);
    var W = new PIXI.CanvasRenderer(w, _);
    $('.china_tolerance_content')[0].appendChild(W.view),
        T.add(M + 'start/bg.jpg')
            .add(M + 'start/eye_open.png')
            .add(M + 'start/eye_close.png')
            .add(M + 'start/line.png')
            .add(M + 'start/dot.png')
            .add(M + 'start/hand.png')
            .add(M + 'start/text.png')
            .add(M + '1/tree.png')
            .add(M + '1/cover.png')
            .add(M + '1/bg.png')
            .add(M + '1/child.png')
            .add(M + '1/mother.png')
            .add(M + '1/curtain.png')
            .add(M + '2/bg.jpg')
            .add(M + '2/balloon.png')
            .add(M + '2/balloon1.png')
            .add(M + '2/bed.png')
            .add(M + '2/bed_boy.png')
            .add(M + '2/mother_body.png')
            .add(M + '2/mother_left.png')
            .add(M + '2/mother_right.png')
            .add(M + '2/desk.png')
            .add(M + '2/light.png')
            .add(M + '2/lamp.png')
            .add(M + '2/book.png')
            .add(M + '2/book1.png')
            .add(M + '2/book2.png')
            .add(M + '2/book3.png')
            .add(M + '2/book4.png')
            .add(M + '2/boy.png')
            .add(M + '2/photo.png')
            .add(M + '2/photo1.png')
            .add(M + '2/boy1.png')
            .add(M + '2/thing.png')
            .add(M + '2/thing1.png')
            .add(M + '2/guitar_boy.png')
            .add(M + '2/guitar.png')
            .add(M + '2/guitar_hand.png')
            .add(M + '2/guitar_hand1.png')
            .add(M + '2/boy2.png')
            .add(M + '2_1/bg.jpg')
            .add(M + '2_1/balloon.png')
            .add(M + '2_1/balloon1.png')
            .add(M + '2_1/bed.png')
            .add(M + '2_1/bed_boy.png')
            .add(M + '2_1/desk.png')
            .add(M + '2_1/photo.png')
            .add(M + '2_1/photo1.png')
            .add(M + '2_1/boy1.png')
            .add(M + '2_1/thing.png')
            .add(M + '2_1/thing1.png')
            .add(M + '2_1/guitar_boy.png')
            .add(M + '2_1/guitar.png')
            .add(M + '2_1/guitar_hand.png')
            .add(M + '2_1/guitar_hand1.png')
            .add(M + '2_1/boy2.png')
            .add(M + '3/bg.jpg')
            .add(M + '3/moon.png')
            .add(M + '3/cloud.png')
            .add(M + '3/back_bg.png')
            .add(M + '3/front_bg.png')
            .add(M + '3/man1.png')
            .add(M + '3/man2.png')
            .add(M + '3/umbrella1.png')
            .add(M + '3/tree_big.png')
            .add(M + '3/tree_small.png')
            .add(M + '3/car3.png')
            .add(M + '3/car3_wheel.png')
            .add(M + '3/car4.png')
            .add(M + '3/car4_wheel.png')
            .add(M + '3/car2.png')
            .add(M + '3/car2_wheel.png')
            .add(M + '3/car1.png')
            .add(M + '3/car1_light.png')
            .add(M + '3/car1_wheel.png')
            .add(M + '3/car1_wheel2.png')
            .add(M + '3/stick.png')
            .add(M + '3/third.png')
            .add(M + '3/tree.png')
            .add(M + '3/couple.png')
            .add(M + '3_1/bg.jpg')
            .add(M + '3_1/child.png')
            .add(M + '3_1/leg.png')
            .add(M + '3_1/ball.png')
            .add(M + '3_1/boy.png')
            .add(M + '3_1/boy1.png')
            .add(M + '3_1/boy2.png')
            .add(M + '3-4/0.png')
            .add(M + '3_things/body.png')
            .add(M + '3_things/car.png')
            .add(M + '3_things/head.png')
            .add(M + '3_things/leg.png')
            .add(M + '3_things/plane.png')
            .add(M + '3_things/wheel.png')
            .add(M + '3_things/wings.png')
            .add(M + '4/building.png')
            .add(M + '4/cloud.png')
            .add(M + '4/desk.png')
            .add(M + '4/desk1.png')
            .add(M + '4/light.png')
            .add(M + '4/light2.png')
            .add(M + '4/people1.png')
            .add(M + '4/people2.png')
            .add(M + '4/people3.png')
            .add(M + '4/people4.png')
            .add(M + '4/people5.png')
            .add(M + '4/seat.png')
            .add(M + '4/star.png')
            .add(M + '4/file.png')
            .add(M + '4/file1.png')
            .add(M + '4/wall.png')
            .add(M + '4/wall_night.png')
            .add(M + '4/man.png')
            .add(M + '4/body.png')
            .add(M + '4/head.png')
            .add(M + '4/hand1.png')
            .add(M + '4/hand2.png')
            .add(M + '4/leg1.png')
            .add(M + '4/leg2.png')
            .add(M + '4/big_head.png')
            .add(M + '5/man1.png')
            .add(M + '5/thing1.png')
            .add(M + '5/thing2.png')
            .add(M + '5/thing3.png')
            .add(M + '5/thing4.png')
            .add(M + '5/thing5.png')
            .add(M + '5/snow1.png')
            .add(M + '5/snow2.png')
            .add(M + '5/snow3.png')
            .add(M + 'text/0.png')
            .add(M + 'text/1.png')
            .add(M + 'text/2.png')
            .add(M + 'text/3.png')
            .add(M + 'text/4.png')
            .add(M + 'text/5.png')
            .add(M + 'text/6.png')
            .add(M + 'end/cover_bg1.png')
            .add(M + 'end/watch_again1.png')
            .add(M + 'end/share.png')
            .add(M + 'end/netease1.png')
            .on('progress', d)
            .load(p);
    for (
        var R,
            j,
            F,
            L,
            N,
            B,
            J,
            D,
            U,
            O,
            Y,
            z,
            G,
            H,
            Q,
            q,
            Z,
            K,
            V,
            ee,
            ie,
            ne,
            te,
            oe,
            ae,
            se,
            de,
            pe,
            re,
            le,
            ge,
            he,
            ce,
            ue,
            xe,
            ve,
            ye,
            me,
            be = [
                {
                    name: 'bg',
                    url: M + '1/bg.png',
                    position: {
                        x: 535,
                        y: 0
                    },
                    speed: {
                        x: 0.05,
                        y: 0
                    }
                },
                {
                    name: 'curtain',
                    url: M + '1/curtain.png',
                    position: {
                        x: 985,
                        y: 40
                    },
                    speed: {
                        x: 0.05,
                        y: 0
                    }
                },
                {
                    name: 'mother',
                    url: M + '1/mother.png',
                    position: {
                        x: 1050,
                        y: 245
                    },
                    speed: {
                        x: -0.25,
                        y: 0
                    }
                },
                {
                    name: 'child',
                    url: M + '1/child.png',
                    position: {
                        x: 808,
                        y: 392
                    },
                    speed: {
                        x: 0.05,
                        y: 0
                    }
                },
                {
                    name: 'cover',
                    url: M + '1/cover.png',
                    position: {
                        x: -244,
                        y: 0
                    },
                    speed: 0
                },
                {
                    name: 'tree',
                    url: M + '1/tree.png',
                    position: {
                        x: 0,
                        y: 285
                    },
                    speed: {
                        x: 0.5,
                        y: 0
                    }
                }
            ],
            we = [
                {
                    name: 'bg',
                    url: M + '2/bg.jpg',
                    position: {
                        x: 0,
                        y: 0
                    },
                    speed: {
                        x: -0.1,
                        y: 0
                    }
                },
                {
                    name: 'bg',
                    url: M + '2_1/bg.jpg',
                    position: {
                        x: 0,
                        y: 0
                    },
                    speed: {
                        x: -0.1,
                        y: 0
                    }
                },
                {
                    name: 'balloon',
                    url: M + '2/balloon.png',
                    position: {
                        x: 1141,
                        y: 52
                    },
                    speed: {
                        x: -0.08,
                        y: 0
                    }
                },
                {
                    name: 'balloon1',
                    url: M + '2/balloon1.png',
                    position: {
                        x: 1182,
                        y: 42
                    },
                    speed: {
                        x: -0.02,
                        y: 0
                    }
                },
                {
                    name: 'bed_boy',
                    url: M + '2/bed_boy.png',
                    position: {
                        x: 2216,
                        y: 97
                    },
                    speed: {
                        x: -0.08,
                        y: 0
                    }
                },
                {
                    name: 'bed_boy',
                    url: M + '2_1/bed_boy.png',
                    position: {
                        x: 2216,
                        y: 97
                    },
                    speed: {
                        x: -0.08,
                        y: 0
                    }
                },
                {
                    name: 'bed',
                    url: M + '2/bed.png',
                    position: {
                        x: 1905,
                        y: 197
                    },
                    speed: {
                        x: -0.08,
                        y: 0
                    }
                },
                {
                    name: 'bed',
                    url: M + '2_1/bed.png',
                    position: {
                        x: 1905,
                        y: 197
                    },
                    speed: {
                        x: -0.08,
                        y: 0
                    }
                },
                {
                    name: 'mother_body',
                    url: M + '2/mother_body.png',
                    position: {
                        x: 338,
                        y: 166
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'mother_left',
                    url: M + '2/mother_left.png',
                    position: {
                        x: 349,
                        y: 480
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'mother_right',
                    url: M + '2/mother_right.png',
                    position: {
                        x: 511,
                        y: 481
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'desk',
                    url: M + '2/desk.png',
                    position: {
                        x: 40,
                        y: 592
                    },
                    speed: 0
                },
                {
                    name: 'desk',
                    url: M + '2_1/desk.png',
                    position: {
                        x: 40,
                        y: 592
                    },
                    speed: 0
                },
                {
                    name: 'book',
                    url: M + '2/book.png',
                    position: {
                        x: 715,
                        y: 571
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'book1',
                    url: M + '2/book1.png',
                    position: {
                        x: 385,
                        y: 566
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'book2',
                    url: M + '2/book2.png',
                    position: {
                        x: 389,
                        y: 533
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'book3',
                    url: M + '2/book3.png',
                    position: {
                        x: 721,
                        y: 539
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'book4',
                    url: M + '2/book4.png',
                    position: {
                        x: 723,
                        y: 494
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'boy',
                    url: M + '2/boy.png',
                    position: {
                        x: 520,
                        y: 303
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'photo',
                    url: M + '2/photo.png',
                    position: {
                        x: 1008,
                        y: 525
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'photo1',
                    url: M + '2/photo1.png',
                    position: {
                        x: 1170,
                        y: 483
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'lamp',
                    url: M + '2/lamp.png',
                    position: {
                        x: 837,
                        y: 416
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'light',
                    url: M + '2/light.png',
                    position: {
                        x: 875,
                        y: 410
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'thing',
                    url: M + '2/thing.png',
                    position: {
                        x: 1525,
                        y: 601
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'boy1',
                    url: M + '2/boy1.png',
                    position: {
                        x: 1702,
                        y: 310
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'thing1',
                    url: M + '2/thing1.png',
                    position: {
                        x: 1959,
                        y: 572
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'guitar_boy',
                    url: M + '2/guitar_boy.png',
                    position: {
                        x: 2121,
                        y: 247
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'guitar_boy',
                    url: M + '2_1/guitar_boy.png',
                    position: {
                        x: 2121,
                        y: 247
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'guitar',
                    url: M + '2/guitar.png',
                    position: {
                        x: 2292,
                        y: 389
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'guitar',
                    url: M + '2_1/guitar.png',
                    position: {
                        x: 2292,
                        y: 389
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'guitar_hand',
                    url: M + '2/guitar_hand.png',
                    position: {
                        x: 2426,
                        y: 417
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'guitar_hand',
                    url: M + '2_1/guitar_hand.png',
                    position: {
                        x: 2426,
                        y: 417
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'guitar_hand1',
                    url: M + '2/guitar_hand1.png',
                    position: {
                        x: 2564,
                        y: 445
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'guitar_hand1',
                    url: M + '2_1/guitar_hand1.png',
                    position: {
                        x: 2564,
                        y: 445
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'boy2',
                    url: M + '2/boy2.png',
                    position: {
                        x: 2554,
                        y: 213
                    },
                    speed: {
                        x: -0.05,
                        y: 0
                    }
                }
            ],
            _e = [
                {
                    name: 'balloon',
                    url: M + '2_1/balloon.png',
                    position: {
                        x: 1141,
                        y: 52
                    },
                    speed: {
                        x: -0.08,
                        y: 0
                    }
                },
                {
                    name: 'balloon1',
                    url: M + '2_1/balloon1.png',
                    position: {
                        x: 1182,
                        y: 42
                    },
                    speed: {
                        x: -0.02,
                        y: 0
                    }
                },
                {
                    name: 'photo',
                    url: M + '2_1/photo.png',
                    position: {
                        x: 1008,
                        y: 525
                    },
                    speed: 0
                },
                {
                    name: 'photo1',
                    url: M + '2_1/photo1.png',
                    position: {
                        x: 1170,
                        y: 483
                    },
                    speed: 0
                },
                {
                    name: 'thing',
                    url: M + '2/thing.png',
                    position: {
                        x: 1525,
                        y: 601
                    },
                    speed: 0
                },
                {
                    name: 'boy1',
                    url: M + '2_1/boy1.png',
                    position: {
                        x: 1702,
                        y: 310
                    },
                    speed: 0
                },
                {
                    name: 'thing1',
                    url: M + '2_1/thing1.png',
                    position: {
                        x: 1959,
                        y: 572
                    },
                    speed: 0
                },
                {
                    name: 'boy2',
                    url: M + '2_1/boy2.png',
                    position: {
                        x: 2554,
                        y: 213
                    },
                    speed: {
                        x: -0.05,
                        y: 0
                    }
                }
            ],
            fe = [
                {
                    name: 'bg',
                    url: M + '3/bg.jpg',
                    position: {
                        x: 0,
                        y: 0
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'moon',
                    url: M + '3/moon.png',
                    position: {
                        x: 30,
                        y: 23
                    },
                    speed: {
                        x: -0.03,
                        y: 0
                    }
                },
                {
                    name: 'cloud',
                    url: M + '3/cloud.png',
                    position: {
                        x: 169,
                        y: 49
                    },
                    speed: {
                        x: -0.06,
                        y: 0
                    }
                },
                {
                    name: 'back_bg',
                    url: M + '3/back_bg.png',
                    position: {
                        x: 75,
                        y: 0
                    },
                    speed: {
                        x: -0.18,
                        y: 0
                    }
                },
                {
                    name: 'front_bg',
                    url: M + '3/front_bg.png',
                    position: {
                        x: -400,
                        y: 40
                    },
                    speed: {
                        x: -0.5,
                        y: 0
                    }
                },
                {
                    name: 'man1',
                    url: M + '3/man1.png',
                    position: {
                        x: 304,
                        y: 539
                    },
                    speed: {
                        x: -0.32,
                        y: 0
                    }
                },
                {
                    name: 'man2',
                    url: M + '3/man2.png',
                    position: {
                        x: 2371,
                        y: 482
                    },
                    speed: {
                        x: -0.32,
                        y: 0
                    }
                },
                {
                    name: 'tree_big',
                    url: M + '3/tree_big.png',
                    position: {
                        x: 842,
                        y: 0
                    },
                    speed: {
                        x: -0.38,
                        y: 0
                    }
                },
                {
                    name: 'tree_small',
                    url: M + '3/tree_small.png',
                    position: {
                        x: 119,
                        y: 70
                    },
                    speed: {
                        x: -0.38,
                        y: 0
                    }
                },
                {
                    name: 'umbrella1',
                    url: M + '3/umbrella1.png',
                    position: {
                        x: 131,
                        y: 375
                    },
                    speed: {
                        x: -0.36,
                        y: 0
                    }
                },
                {
                    name: 'umbrella2',
                    url: M + '3/umbrella1.png',
                    position: {
                        x: 2226,
                        y: 375
                    },
                    speed: {
                        x: -0.36,
                        y: 0
                    }
                },
                {
                    name: 'car3',
                    url: M + '3/car3.png',
                    position: {
                        x: 736,
                        y: 550
                    },
                    speed: {
                        x: -0.8,
                        y: 0
                    }
                },
                {
                    name: 'car4',
                    url: M + '3/car4.png',
                    position: {
                        x: 2159,
                        y: 547
                    },
                    speed: {
                        x: -1,
                        y: 0
                    }
                },
                {
                    name: 'car2',
                    url: M + '3/car2.png',
                    position: {
                        x: 1246,
                        y: 550
                    },
                    speed: {
                        x: 0.3,
                        y: 0
                    }
                },
                {
                    name: 'car1',
                    url: M + '3/car1.png',
                    position: {
                        x: 117,
                        y: 560
                    },
                    speed: {
                        x: 1,
                        y: 0
                    }
                },
                {
                    name: 'third',
                    url: M + '3/third.png',
                    position: {
                        x: 1579,
                        y: 345
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                },
                {
                    name: 'couple',
                    url: M + '3/couple.png',
                    position: {
                        x: 1500,
                        y: 268
                    },
                    speed: {
                        x: 0,
                        y: 0
                    }
                }
            ],
            Ie = [
                {
                    name: 'bg',
                    url: M + '3_1/bg.jpg',
                    position: {
                        x: 0,
                        y: 0
                    },
                    speed: 0
                },
                {
                    name: 'child',
                    url: M + '3_1/child.png',
                    position: {
                        x: 135,
                        y: 502
                    },
                    speed: 0
                },
                {
                    name: 'leg',
                    url: M + '3_1/leg.png',
                    position: {
                        x: 175,
                        y: 634
                    },
                    speed: 0
                },
                {
                    name: 'ball',
                    url: M + '3_1/ball.png',
                    position: {
                        x: 261.5,
                        y: 708.5
                    },
                    speed: 0
                },
                {
                    name: 'boy2',
                    url: M + '3_1/boy2.png',
                    position: {
                        x: 543,
                        y: 353
                    },
                    speed: 0
                },
                {
                    name: 'boy1',
                    url: M + '3_1/boy1.png',
                    position: {
                        x: 543,
                        y: 353
                    },
                    speed: 0
                },
                {
                    name: 'boy',
                    url: M + '3_1/boy.png',
                    position: {
                        x: 543,
                        y: 353
                    },
                    speed: 0
                }
            ],
            ke = [
                {
                    name: 'body',
                    url: M + '3_things/body.png',
                    position: {
                        x: 102,
                        y: 114
                    },
                    pivot: {
                        x: 531,
                        y: 359
                    },
                    rotationSpeed: 0.4,
                    rotate: 0
                },
                {
                    name: 'head',
                    url: M + '3_things/head.png',
                    position: {
                        x: 72,
                        y: 16
                    },
                    pivot: {
                        x: 501,
                        y: 261
                    },
                    rotationSpeed: 0.2,
                    rotate: 0
                },
                {
                    name: 'leg',
                    url: M + '3_things/leg.png',
                    position: {
                        x: 239,
                        y: 242
                    },
                    pivot: {
                        x: 364,
                        y: 133
                    },
                    rotationSpeed: 0.3,
                    rotate: 0
                },
                {
                    name: 'car',
                    url: M + '3_things/car.png',
                    position: {
                        x: 116,
                        y: 404
                    },
                    pivot: {
                        x: 487,
                        y: 29
                    },
                    rotationSpeed: 0.4,
                    rotate: 0
                },
                {
                    name: 'wheel',
                    url: M + '3_things/wheel.png',
                    position: {
                        x: 222,
                        y: 559
                    },
                    pivot: {
                        x: 381,
                        y: -184
                    },
                    rotationSpeed: 0.5,
                    rotate: 0
                },
                {
                    name: 'plane',
                    url: M + '3_things/plane.png',
                    position: {
                        x: 765,
                        y: 16
                    },
                    pivot: {
                        x: -162,
                        y: 359
                    },
                    rotationSpeed: 0.6,
                    rotate: 50 / (2 * Math.PI)
                },
                {
                    name: 'wings',
                    url: M + '3_things/wings.png',
                    position: {
                        x: 906,
                        y: 147
                    },
                    pivot: {
                        x: -303,
                        y: 228
                    },
                    rotationSpeed: 0.7,
                    rotate: 0
                }
            ],
            Se = [
                {
                    name: 'bg',
                    url: M + 'start/bg.jpg',
                    position: {
                        x: 0,
                        y: 0
                    },
                    speed: 0
                },
                {
                    name: 'star',
                    url: M + '4/star.png',
                    position: {
                        x: 94,
                        y: 165
                    },
                    speed: {
                        x: -0.05,
                        y: 0
                    }
                },
                {
                    name: 'cloud',
                    url: M + '4/cloud.png',
                    position: {
                        x: 0,
                        y: 27
                    },
                    speed: {
                        x: -0.08,
                        y: 0
                    }
                },
                {
                    name: 'building',
                    url: M + '4/building.png',
                    position: {
                        x: 50,
                        y: 229
                    },
                    speed: {
                        x: -0.13,
                        y: 0
                    }
                },
                {
                    name: 'file',
                    url: M + '4/file.png',
                    position: {
                        x: 2029,
                        y: 147
                    },
                    speed: 0
                },
                {
                    name: 'file1',
                    url: M + '4/file1.png',
                    position: {
                        x: 2661,
                        y: 163
                    },
                    speed: 0
                },
                {
                    name: 'wall',
                    url: M + '4/wall.png',
                    position: {
                        x: 2400,
                        y: 450
                    },
                    speed: 0
                },
                {
                    name: 'wall_night',
                    url: M + '4/wall_night.png',
                    position: {
                        x: 2400,
                        y: 450
                    },
                    speed: 0
                },
                {
                    name: 'people5',
                    url: M + '4/people5.png',
                    position: {
                        x: 184,
                        y: 318
                    },
                    speed: 0
                },
                {
                    name: 'desk',
                    url: M + '4/desk.png',
                    position: {
                        x: 0,
                        y: 334
                    },
                    speed: 0
                },
                {
                    name: 'desk1',
                    url: M + '4/desk1.png',
                    position: {
                        x: 0,
                        y: 334
                    },
                    speed: 0
                },
                {
                    name: 'light',
                    url: M + '4/light.png',
                    position: {
                        x: 0,
                        y: 0
                    },
                    speed: 0
                },
                {
                    name: 'light2',
                    url: M + '4/light2.png',
                    position: {
                        x: 0,
                        y: 0
                    },
                    speed: 0
                },
                {
                    name: 'people4',
                    url: M + '4/people4.png',
                    position: {
                        x: 0,
                        y: 402
                    },
                    speed: 0
                },
                {
                    name: 'people3',
                    url: M + '4/people3.png',
                    position: {
                        x: 746,
                        y: 345
                    },
                    speed: 0
                },
                {
                    name: 'man',
                    url: M + '4/man.png',
                    position: {
                        x: 462,
                        y: 363
                    },
                    speed: 0
                },
                {
                    name: 'seat',
                    url: M + '4/seat.png',
                    position: {
                        x: 28,
                        y: 453
                    },
                    speed: 0
                },
                {
                    name: 'people2',
                    url: M + '4/people2.png',
                    position: {
                        x: 993,
                        y: 252
                    },
                    speed: 0
                },
                {
                    name: 'people1',
                    url: M + '4/people1.png',
                    position: {
                        x: 243,
                        y: 266
                    },
                    speed: 0
                },
                {
                    name: 'big_head',
                    url: M + '4/big_head.png',
                    position: {
                        x: 2430,
                        y: 450
                    },
                    speed: {
                        x: -0.08,
                        y: 0
                    }
                }
            ],
            Pe = [
                {
                    name: 'bg',
                    url: M + 'start/bg.jpg',
                    position: {
                        x: -1300,
                        y: 0
                    },
                    speed: 0
                },
                {
                    name: 'thing1',
                    url: M + '5/thing1.png',
                    position: {
                        x: 1516,
                        y: 329
                    },
                    speed: 0
                },
                {
                    name: 'thing2',
                    url: M + '5/thing2.png',
                    position: {
                        x: 1731,
                        y: 350
                    },
                    speed: 0
                },
                {
                    name: 'thing3',
                    url: M + '5/thing3.png',
                    position: {
                        x: 1965,
                        y: 400
                    },
                    speed: 0
                },
                {
                    name: 'thing5',
                    url: M + '5/thing5.png',
                    position: {
                        x: 2494,
                        y: 367
                    },
                    speed: 0
                }
            ],
            Ce = null,
            Te = 0,
            Ae = 0,
            Ee = [],
            $e = 0;
        $e < 20;
        $e++
    )
        Ee.push(M + '3-4/' + $e + '.png');
    (pe = [M + '5/snow1.png', M + '5/snow2.png', M + '5/snow3.png']),
        (le = [
            M + '5/man1.png',
            M + '5/man2.png',
            M + '5/man3.png',
            M + '5/man4.png',
            M + '5/man5.png',
            M + '5/man6.png'
        ]),
        a(),
        (window.onorientationchange = s);
    var Me = (isPlayedPaper = isPlayedGuitar1 = isPlayedGame = isPlayedCar = isPlayedPhoto = isPlayedMouth = isPlayedClose = isPlayedLaugh = !1),
        // 音频播放序列
        Xe = [
            {
                video: $('#close')[0],
                start: 1120,
                end: 1500,
                isPlayed: !1
            },
            {
                video: $('#paper')[0],
                start: 2100,
                end: 2400,
                isPlayed: !1
            },
            {
                video: $('#photo')[0],
                start: 2700,
                end: 3400,
                isPlayed: !1
            },
            {
                video: $('#mix')[0],
                start: 3100,
                end: 4700,
                isPlayed: !1
            },
            {
                video: $('#car')[0],
                start: 5e3,
                end: 7800,
                isPlayed: !1
            },
            {
                video: $('#mouth')[0],
                start: 6730,
                end: 7e3,
                isPlayed: !1
            },
            {
                video: $('#ball')[0],
                start: 8300,
                end: 8600,
                isPlayed: !1
            },
            {
                video: $('#hit')[0],
                start: 8500,
                end: 9300,
                isPlayed: !1
            },
            {
                video: $('#chair')[0],
                start: 9600,
                end: 10200,
                isPlayed: !1
            },
            {
                video: $('#type')[0],
                start: 9650,
                end: 11150,
                isPlayed: !1
            },
            {
                video: $('#snow')[0],
                start: 11600,
                end: 13900,
                isPlayed: !1
            },
            {
                video: $('#swish1')[0],
                start: 12310,
                end: 12535,
                isPlayed: !1
            },
            {
                video: $('#swish2')[0],
                start: 12535,
                end: 12740,
                isPlayed: !1
            },
            {
                video: $('#swish3')[0],
                start: 12740,
                end: 12985,
                isPlayed: !1
            },
            {
                video: $('#swish4')[0],
                start: 12985,
                end: 13210,
                isPlayed: !1
            },
            {
                video: $('#swish5')[0],
                start: 13210,
                end: 13350,
                isPlayed: !1
            },
            {
                video: $('#clock')[0],
                start: 14500,
                end: 15700,
                isPlayed: !1
            }
        ],
        We = !1,
        Re = !1,
        je = !1,
        Fe = function(e, i, n) {
            console.log(e, i, n, 'canshu');
            var t, o;
            if ((Te > 0 ? ((o = i), (t = e)) : ((o = e), (t = i)), o < 850)) {
                o > 50 && o < 400
                    ? We ||
                      ((We = !0),
                      $('.mask').show(),
                      Te > 0
                          ? new TWEEN.Tween(Ne)
                                .to(
                                    {
                                        __scrollTop: 850
                                    },
                                    800
                                )
                                .onUpdate(function() {
                                    o = Ne.__scrollTop;
                                })
                                .onComplete(function() {
                                    $('.mask').hide(), (We = !1);
                                })
                                .start()
                          : new TWEEN.Tween(Ne)
                                .to(
                                    {
                                        __scrollLeft: 850
                                    },
                                    800
                                )
                                .onUpdate(function() {
                                    o = Ne.__scrollLeft;
                                })
                                .onComplete(function() {
                                    $('.mask').hide(), (We = !1);
                                })
                                .start())
                    : o < 800 &&
                      o >= 400 &&
                      (We ||
                          ((We = !0),
                          $('.mask').show(),
                          Te > 0
                              ? new TWEEN.Tween(Ne)
                                    .to(
                                        {
                                            __scrollTop: 0
                                        },
                                        800
                                    )
                                    .onUpdate(function() {
                                        o = Ne.__scrollTop;
                                    })
                                    .onComplete(function() {
                                        $('.mask').hide(), (We = !1);
                                    })
                                    .start()
                              : new TWEEN.Tween(Ne)
                                    .to(
                                        {
                                            __scrollLeft: 0
                                        },
                                        800
                                    )
                                    .onUpdate(function() {
                                        o = Ne.__scrollLeft;
                                    })
                                    .onComplete(function() {
                                        $('.mask').hide(), (We = !1);
                                    })
                                    .start()));
                var a = o;
                // o > 50
                //     ? Ce && (clearInterval(Ce), (Ce = null), F.gotoAndStop(0))
                //     : Ce ||
                //       (Ce = setInterval(function() {
                //           F.gotoAndStop(1),
                //               setTimeout(function() {
                //                   F.gotoAndStop(0);
                //               }, 150);
                //       }, 1700)),
                //     (H.position.x = a),
                //     (J.position.x = 2050 + a);
                var s = a * a / 3e3;
                // if (
                //     (F.scale.set(1 + s),
                //     o > 150
                //         ? ((H.children[0].visible = !1), (H.children[1].visible = !1), (H.children[2].visible = !1))
                //         : ((H.children[0].visible = !0), (H.children[1].visible = !0), (H.children[2].visible = !0)),
                //     o > 550)
                // ) {
                //     var a = o - 550;
                //     H.alpha = 1 - a / 300;
                // } else H.alpha = 1;
            }
            if (o < 2130 - B + 850 && o >= 850) {
                Re || ((Re = !0), u()), (H.alpha = 0);
                for (var a = o - 850, d = 0; d < J.children.length; d++) {
                    var p = J.children[d];
                    p.data.speed &&
                        ((p.position.x = p.data.position.x + p.data.speed.x * a),
                        (p.position.y = p.data.position.y + p.data.speed.y * a)),
                        o > 1250 && 5 == d && (p.position.x = 950);
                }
            }
            if (o > 2050 && o < 2500) {
                isPlayedGame1 = !1;
                var a = o - 2050,
                    r = 1 + a / 100,
                    l = 1 - (a - 180) / 80;
                (J.alpha = l), J.scale.set(r, r), (J.position.x = 2900 + 2 * a);
                var g = Math.min(1, 0.8 + a / 500);
                (D.position.x = 2762 - 0.05 * a),
                    (U.position.x = 2762 - 0.05 * a),
                    D.scale.set(g, g),
                    U.scale.set(g, g);
            } else
                o <= 2050 && o > 850
                    ? (J.scale.set(1, 1),
                      (J.alpha = 1),
                      (J.position.x = 2900),
                      (D.position.x = 2762 - 0.05 * (o - 2050)),
                      (U.position.x = 2762 - 0.05 * (o - 2050)),
                      D.scale.set(0.8, 0.8),
                      U.scale.set(0.8, 0.8))
                    : o >= 2500 && (J.scale.set(10, 10), (J.alpha = 0), D.scale.set(1, 1), U.scale.set(1, 1));
            if (o > 2100 && o < 5450) {
                for (var a = o - 2100, d = 0; d < D.children.length; d++) {
                    var p = D.children[d];
                    p.data.speed &&
                        ((p.position.x = p.data.position.x + p.data.speed.x * a),
                        (p.position.y = p.data.position.y + p.data.speed.y * a));
                }
                for (var d = 0; d < U.children.length; d++) {
                    var p = U.children[d];
                    p.data.speed &&
                        ((p.position.x = p.data.position.x + p.data.speed.x * a),
                        (p.position.y = p.data.position.y + p.data.speed.y * a));
                }
                if (o < 2368) {
                    var a = o - 2100;
                    (D.children[9].rotation = -a / 250), (D.children[10].rotation = a / 250);
                }
                if (o < 3e3 && o > 2300) {
                    var a = o - 2300;
                    D.children[22].rotation = -a / 400;
                }
                if (o < 2400)
                    for (var a = o - 2100, x = 12 + parseInt(a / 50), d = 13; d < 18; d++)
                        d <= x ? (D.children[d].visible = !0) : (D.children[d].visible = !1);
                else {
                }
            }
            // else
            //     (D.children[13].visible = !1),
            //         (D.children[14].visible = !1),
            //         (D.children[15].visible = !1),
            //         (D.children[16].visible = !1),
            //         (D.children[17].visible = !1),
            //         (D.children[9].rotation = 0),
            //         (D.children[10].rotation = 0);
            if (o > 3800 && o < 1e4) {
            }
            if (o > 6600 && o < 1e4) {
            }
            if (o > 8800 && o < 11850) {
            }
            // if (o >= 11250) {
            // } else if (o >= 10100) {
            // } else Q.children[0].visible = !0;
            // if (o > 11800) {
            // } else o > 10800 && (K.scale.set(100), (K.alpha = 0));

            // (R.position.x = -o), (R.position.y = -t);
        },
        Le = !1,
        // Ne是Scroller的实例
        Ne = new Scroller(Fe, {
            zooming: !1,
            animating: !0,
            bouncing: !1,
            animationDuration: 1e3
        });
    Ne.__enableScrollY = !0;
    var Be = null,
        Je = null;
})();
