// http://news.163.com/special/fdh5_funnyfriend/

function (e) {
    function n(e) {
        var n = document.getElementById(e),
            i = function () {
                document.removeEventListener("WeixinJSBridgeReady", i), document.removeEventListener("YixinJSBridgeReady", i), n.play()
            };
        document.addEventListener("WeixinJSBridgeReady", i, !1), document.addEventListener("YixinJSBridgeReady", i, !1)
    }

    function i(e, n) {
        return Math.floor(Math.random() * (n - e + 1) + e)
    }

    function a(e) {
        for (var n = e.slice(), a = 0; a < n.length; a++) {
            var t = i(0, a),
                r = n[a];
            n[a] = n[t], n[t] = r
        }
        return n
    }

    function t(n) {
        if (5 == n) return void r();
        3 == n ? (J.visible = !1, whitePage.visible = !0, e(".music").addClass("white")) : (J.visible = !0, whitePage.visible = !1, e(".music").removeClass("white"));
        for (var i = 0; i < 5; i++)
            N["num" + i].visible = !1;
        N["num" + n].visible = !0, main.children[n].visible = !0, main.children[n].alpha = 0, new TWEEN.Tween({
            alpha: 0
        }).to({
            alpha: 1
        }, 300).onUpdate(function () {
            main.children[n].alpha = this.alpha, main.children[n - 1].alpha = 1 - this.alpha
        }).start()
    }

    function r() {
        W.resize(750, 1206), b - 1206 > 50 && e("canvas,.create_bg,.show_img,.save_img").css({
            "margin-top": (b - 1206) / 2 + "px"
        }), e(".first").hide(), e(".music").hide(), e(".create_end").fadeIn(), setTimeout(function () {
            e(".create_box").addClass("active")
        }, 10), setTimeout(function () {
            e(".create_end").fadeOut(300)
        }, 2500), new TWEEN.Tween({
            width: 0
        }).to({
            width: 291
        }, 2500).onUpdate(function () {
            e(".create_rect").width(this.width)
        }).easing(TWEEN.Easing.Quadratic.InOut).start(), setTimeout(function () {
            var n = new z(k.resources[m + "end/bg" + H + ".jpg"].texture);
            O.addChild(n);
            var i = new z(k.resources[m + "end/end_shidian_logo.png"].texture);
            i.position.set(297, 1086), O.addChild(i);
            var a = d(F),
                t = 10;
            a > 8 && (t = 5);
            var r = new j(F, {
                fontSize: "60px",
                fill: "#000000",
                letterSpacing: t
            }),
                o = new j("的损友圈", {
                    fontSize: "60px",
                    fill: "#000000",
                    letterSpacing: t
                });
            a <= 4 ? r.position.set(120, 130) : r.position.set((340 - r.width) / 2, 130), o.position.set(118, 200), O.addChild(r, o);
            for (var s = 0; s < D.length; s++)
                D[s] = D[s].replaceAll("XX", F), D[s] = D[s].replaceAll("sex", U);
            for (var s = 0; s < Y.length; s++)
                Y[s] = Y[s].replaceAll("XX", F), Y[s] = Y[s].replaceAll("sex", U);
            for (var s = 0; s < Z.length; s++)
                Z[s] = Z[s].replaceAll("XX", F), Z[s] = Z[s].replaceAll("sex", U);
            var g = new j(F + "的朋友", {
                fontSize: "30px",
                fill: "#262626",
                wordWrap: !0,
                wordWrapWidth: 444,
                breakWords: !0,
                lineHeight: 40
            }),
                l = new y;
            l.beginFill(16708220), l.drawRect(0, 0, g.width, 15), l.position.set(125, 380), l.endFill();
            var h = new j(F + "的朋友" + D[G[0]], {
                fontSize: "30px",
                fill: "#262626",
                wordWrap: !0,
                wordWrapWidth: 504,
                breakWords: !0,
                lineHeight: 40
            });
            h.position.set(125, 368);
            var p = new j(D[G[1]], {
                fontSize: "30px",
                fill: "#262626",
                wordWrap: !0,
                wordWrapWidth: 504,
                breakWords: !0,
                lineHeight: 40
            });
            p.position.set(125, h.height + 368 + 50);
            var u = new j(Y[V], {
                fontSize: "30px",
                fill: "#262626",
                wordWrap: !0,
                wordWrapWidth: 504,
                breakWords: !0,
                lineHeight: 40
            });
            u.position.set(125, h.height + 368 + 50 + p.height + 50);
            var X = new j(Z[ee], {
                fontSize: "30px",
                fill: "#262626",
                wordWrap: !0,
                wordWrapWidth: 504,
                breakWords: !0,
                lineHeight: 40
            });
            X.position.set(125, h.height + 368 + 50 + p.height + 45 + u.height + 50), O.addChild(l, h, p, u, X);
            var x = new z(k.resources[m + "erweima/" + L + ".png"].texture);
            if (x.width = 156, x.height = 156, x.position.set(485, 821), f && w) var v = new z(k.resources[m + "end/android.png"].texture);
            else var v = new z(k.resources[m + "end/touch.png"].texture);
            v.position.set(487, 986);
            var b = new z(k.resources[m + "end/check.png"].texture);
            b.position.set(486, 991), b.visible = !1, O.addChild(x, v, b), setTimeout(function () {
                var n = c(e("canvas")[0]);
                e(".show_img").append(n), e(".show_img").show(), v.visible = !1, b.visible = !0, setTimeout(function () {
                    var n = c(e("canvas")[0]);
                    e(".save_img").append(n), e(".save_img").show()
                }, 100)
            })
        }, 1e3)
    }

    function o(n) {
        function i(e) {
            for (var n = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]"), i = "", a = 0; a < e.length; a++)
                i += e.substr(a, 1).replace(n, "");
            return i
        }
        n = n.replace(/(^\s*)|(\s*$)/g, ""), n = i(n);
        var a = d(n);
        if ("" === n) return e(".alert").fadeIn(100), e(".noname").show(), !1;
        if (a > 10) return e(".alert").fadeIn(100), e(".outname").show(), !1;
        var t = new RegExp(h, "g"),
            r = t.test(n);
        return r ? (e(".alert").fadeIn(100), e(".falsename").show(), !1) : n
    }

    function d(e) {
        for (var n = 0, i = 0; i < e.length; i++) {
            var a = e.charCodeAt(i);
            a >= 1 && a <= 126 || 65376 <= a && a <= 65439 ? n++ : n += 2
        }
        return n
    }

    function s(e) {
        for (var n = [], i = e.n, a = !1; i >= 1; i--) {
            var t = parseInt(Math.random() * e.total),
                r = !0;
            n.forEach(function (e) {
                t == e && (r = !1)
            }), 2 == i && K.forEach(function (e, n) {
                t == e[0] && (a = n), t == e[1] && (a = n)
            }), 1 == i && a !== !1 && (t == K[a][0] && (r = !1), t == K[a][1] && (r = !1)), r ? n.push(t) : i++
        }
        return n
    }

    function g(e) {
        var n = !1;
        e.result1.forEach(function (i, a) {
            e.figure.forEach(function (e, a) {
                e[0] == i && (n = a)
            })
        });
        for (var i = 1; i >= 1; i--) {
            var a = parseInt(Math.random() * e.total);
            if (n !== !1) for (var t = 1; t < e.figure[n].length; t++)
                a == e.figure[n][t] && i++
        }
        return a
    }

    function c(e) {
        var n = new Image;
        return n.src = e.toDataURL("image/png"), n
    }

    function l() {
        TWEEN.update(), requestAnimationFrame(l), W.render(I)
    }
    var h = "大大";
        p = window.navigator.userAgent.toLowerCase(),
        u = navigator.userAgent,
        X = /iphone|nokia|sony|ericsson|mot|samsung|sgh|lg|philips|panasonic|alcatel|lenovo|cldc|midp|wap|mobile/i.test(p) && !/pc=1/.test(location.search),
        x = "micromessenger" == p.match(/MicroMessenger/i),
        f = "newsapp" == p.match(/newsapp/i),
        w = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1,
        m = (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), /iphone/gi.test(navigator.userAgent) && 812 == screen.height && 375 == screen.width, "http://static.ws.126.net/f2e/news/friend_test/images/");
    if (!X) {
        var v = 640,
            b = window.innerHeight;
        return e(".friend_test_content").height(b), e(".friend_test_content").html(""), void e(".friend_test_content").css({
            "background-color": "#eee",
            "background-image": "url(http://cms-bucket.nosdn.127.net/2018/07/06/d0277ed61b6e4eb3a8153b6a429e85b1.jpeg)",
            "background-repeat": "no-repeat",
            "background-position": "center 50px",
            "background-size": "60%"
        })
    }
    x || h5Share.init({
        title: "朋友都爱怎么损你？点击查看你的损友圈",
        desc: "你的身边，围绕着一群怎样的损友呢？",
        url: window.location.href,
        img: "http://cms-bucket.nosdn.127.net/2018/07/06/ae7ac558b80f433d9db5238917a3803f.jpeg"
    }), e(".friend_test_content").on("touchmove", function (e) {
        e.preventDefault()
    }), n("bgm");
    var b = window.innerHeight,
        v = 750,
        _ = PIXI.Container,
        k = (PIXI.autoDetectRenderer, PIXI.loader),
        j = (PIXI.loader.resources, PIXI.utils.TextureCache, PIXI.Texture, PIXI.Text),
        z = (new PIXI.ticker.Ticker, PIXI.Sprite),
        y = (PIXI.Rectangle, PIXI.Graphics),
        I = new _;
    I.width = v, I.height = b;
    var W = new PIXI.CanvasRenderer(v, b, {
        backgroundColor: 16777215
    });
    e("#content").append(W.view);
    for (var A = [], C = 0; C < 24; C++)
        A.push(m + "bg1/" + C + ".jpg");
    for (var S = [], C = 0; C < 24; C++)
        S.push(m + "bg2/" + C + ".jpg");
    for (var E = [], C = 0; C < 3; C++)
        E.push(m + "bg3/" + C + ".jpg");
    for (var T = [], C = 0; C < 24; C++)
        T.push(m + "bg4/" + C + ".jpg");
    for (var P = [], C = 0; C < 24; C++)
        P.push(m + "bg5/" + C + ".jpg");
    var M = [A, S, E, T, P],
        B = [{
            x: 104,
            y: 160
        }, {
            x: 60,
            y: 420
        }, {
            x: 104,
            y: 180
        }, {
            x: 104,
            y: 600
        }, {
            x: 100,
            y: 180
        }],
        R = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    if (R = a(R), 9 == R[4]) {
        var q = R[5];
        R[5] = R[4], R[4] = q
    }
    var J, N, O, H = parseInt(10 * Math.random()) + 1,
        L = parseInt(21 * Math.random());
    window.onload = function () {
        function n() {
            var n = "fdh5_funnyfriend";
            if (window.location.href.indexOf("shidian") !== -1) var n = "fdh5_shidianfriend";
            var i = "http://cms-bucket.nosdn.127.net/2018/07/06/ae7ac558b80f433d9db5238917a3803f.jpeg",
                a = "朋友都爱怎么损你？点击查看你的损友圈",
                r = "你的身边，围绕着一群怎样的损友呢？",
                o = window.location.href;
            o = NTESAntAnalysis.getShareLink(window.location.href), document.addEventListener("WeixinJSBridgeReady", function () {
                window.WeixinJSBridge.on("menu:share:appmessage", function (e) {
                    return window.WeixinJSBridge.invoke("sendAppMessage", {
                        img_url: i,
                        link: o,
                        desc: r,
                        title: a
                    }, function () {
                        NTESAntAnalysis.sendData({
                            projectid: "NTM-MMKAJZQA-1",
                            val_nm: "share",
                            val_act: "sharedone",
                            info: {
                                modelid: n,
                                title: document.title
                            }
                        })
                    })
                }), window.WeixinJSBridge.on("menu:share:timeline", function (e) {
                    return window.WeixinJSBridge.invoke("shareTimeline", {
                        img_url: i,
                        link: o,
                        desc: r,
                        title: a
                    }, function () {
                        NTESAntAnalysis.sendData({
                            projectid: "NTM-MMKAJZQA-1",
                            val_nm: "share",
                            val_act: "sharedone",
                            info: {
                                modelid: n,
                                title: document.title
                            }
                        })
                    })
                })
            }), b = window.innerHeight, v = window.innerWidth, e(".friend_test_wrap,.friend_test_content").width(750).height(b), main = new _;
            for (var d = b - 1334, s = 0, g = 0; g < 5; g++) {
                var c = new _;
                c.visible = !1;
                var h = new PIXI.extras.AnimatedSprite.fromImages(M[g]);
                3 == g ? h.position.set(0, 0) : h.position.set(0, d), 2 == g ? h.animationSpeed = .1 : h.animationSpeed = .2, h.play();
                var p = new _;
                p.chosen = !1, p.position.set(B[g].x, B[g].y);
                var u = new z(k.resources[m + "text/t" + R[g] + "_main.png?"].texture);
                p.addChild(u);
                for (var X = 0; X < 2; X++) {
                    var x = new _,
                        f = new z(k.resources[m + "text/unclick.png"].texture);
                    f.position.set(0, 3);
                    var w = new z(k.resources[m + "text/click.png"].texture);
                    w.position.set(6, 9), x.clickIcon = w, w.visible = !1;
                    var j, A;
                    0 == X ? (x.position.set(0, 342), A = new z(k.resources[m + "text/t" + R[g] + "_A.png?"].texture), j = new z(k.resources[m + "text/A.png"].texture)) : (x.position.set(0, 420), A = new z(k.resources[m + "text/t" + R[g] + "_B.png?"].texture), j = new z(k.resources[m + "text/B.png"].texture)), j.position.set(42, 2.5), A.position.set(90, 0);
                    var C = new y;
                    C.beginFill(16708220), C.drawRect(0, 0, A.width + 14, 22), C.position.set(83, 6), C.endFill(), C.scale.x = 0, x.yellowBg = C, x.addChild(f, w, j, C, A);
                    var S = new y;
                    S.beginFill(16708220), S.drawRect(0, 0, x.width + 60, 60), S.position.set(-30, -15), S.endFill(), S.alpha = 0, x.addChild(S), x.interactive = !0, x.buttonMode = !0, x.on("tap", function () {
                        if (1 != this.parent.chosen) {
                            s++ , this.parent.chosen = !0, this.clickIcon.visible = !0;
                            var e = this.yellowBg;
                            new TWEEN.Tween({
                                scale: 0
                            }).to({
                                scale: 1
                            }, 300).onUpdate(function () {
                                e.scale.x = this.scale
                            }).onComplete(function () {
                                t(s)
                            }).start()
                        }
                    }), p.addChild(x)
                }
                c.addChild(h, p), main.addChild(c)
            }
            N = new _, J = new _;
            var E = new z(k.resources[m + "page_bg.png"].texture);
            J.addChild(E), whitePage = new _;
            var T = new z(k.resources[m + "page_white_bg.png"].texture);
            whitePage.visible = !1, whitePage.addChild(T), N.position.set(672, 170), N.addChild(J, whitePage);
            for (var X = 0; X < 5; X++) {
                var P = new z(k.resources[m + "page_" + (X + 1) + ".png"].texture);
                P.visible = !1, P.position.set(2, -12), N["num" + X] = P, N.addChild(P)
            }
            main.addChild(N), O = new _, main.addChild(O), main.children[0].visible = !0, N.num0.visible = !0, I.addChild(main), W.render(I), l()
        }
        for (var i = 0; i < 5; i++)
            k.add(m + "text/t" + R[i] + "_main.png?").add(m + "text/t" + R[i] + "_A.png?").add(m + "text/t" + R[i] + "_B.png?");
        k.add(m + "bg.jpg").add(m + "logo.png").add(m + "white_logo.png?").add(m + "text/click.png").add(m + "text/unclick.png").add(m + "text/A.png").add(m + "text/B.png").add(m + "page_bg.png").add(m + "page_white_bg.png").add(m + "page_1.png").add(m + "page_2.png").add(m + "page_3.png").add(m + "page_4.png").add(m + "page_5.png").add(m + "create_bg.jpg").add(m + "create_rect.png").add(m + "create_text.png").add(m + "create_circle.png").add(m + "end/bg" + H + ".jpg").add(m + "erweima/" + L + ".png").add(m + "end/touch.png").add(m + "end/android.png").add(m + "end/check.png").add(m + "end/end_shidian_logo.png").load(n)
    }, String.prototype.replaceAll = function (e, n) {
        return this.replace(new RegExp(e, "gm"), n)
    };
    var F = "呀啦索啦索";
    e(".start").bind("click", function () {
        F = o(e("#name")[0].value), F && (e(".input_name").hide(), e(".chose_sex").show())
    });
    var U = "他";
    e(".man").bind("click", function () {
        U = "他", e(".first").fadeOut(300)
    }), e(".woman").bind("click", function () {
        U = "她", e(".first").fadeOut(300)
    }), e(".alert").bind("click", function () {
        e(".alert").fadeOut(100), e(".alert div").hide()
    }), e(".music").bind("click", function () {
        e("#bgm")[0].paused ? (e("#bgm")[0].play(), e(".music").removeClass("pause")) : (e("#bgm")[0].pause(), e(".music").addClass("pause"))
    }), e("#name").on("focus", function () {
        e(".placeholder").hide()
    }), e("#name").on("blur", function () {
        var n = e("#name")[0].value;
        n = n.replace(/(^\s*)|(\s*$)/g, ""), 0 == n.length && e(".placeholder").show()
    });
    var D = ["喜欢合照，发朋友圈却总忘记给XXP图", "出手大方，经常在XX减肥时请sex吃夜宵", "超级乐观，只会给XX的朋友圈评论“哈哈哈”", "很不见外，抢XX的红包从不手软", "有点脸盲，经常忽略XX的高颜值", "相当健忘，常常忘记夸赞XX的优秀", "高贵冷艳，在XX面前却一秒变二货", "腼腆害羞，K歌时却总和XX争做麦霸", "口才贼好，损起XX来没一句重样", "惜字如金，和XX煲电话粥却没完没了", "特别学霸，上课却总忍不住和XX闲聊", "酷爱点赞，却从不主动给XX发个红包", "沉得住气，从不当面称赞XX的才华", "食量很小，偷吃XX的零食却从不嘴软", "桃花很旺，却没有给XX介绍对象的觉悟", "勤俭持家，从来不爱请XX吃饭", "有偶像包袱，却总在XX面前笑出猪叫", "智商爆表，在XX面前却宛如智障", "沉迷养生，却总拉着XX嗨到深夜", "霸气十足，却粘着XX不撒手", "萌萌哒，但和XX在一起会变抠脚大汉", "非常恋家，一去XX家却不想回家", "方向感极强，和XX在一起却晕头转向", "总想见sex，见到XX却只看手机", "喜欢新鲜感，却总腻着XX这个老朋友", "非常专一，有了对象就想不起XX", "记忆超群，记得XX的每一件糗事", "文静内敛，对XX却大大咧咧", "气场强大，在XX面前却很娇羞"],
        K = [
            [1, 15],
            [3, 11],
            [19, 24],
            [8, 9]
        ],
        Q = [
            [17, 22],
            [9, 21],
            [2, 21],
            [16, 21],
            [4, 28]
        ],
        $ = [
            [1, 16],
            [16, 3, 5]
        ],
        Y = ["但还是很可爱，给XX过生日，陪sex度过难关", "但还是很体贴，雨天帮XX打伞，嗨完送sex回家", "但还是很靠谱，跟XX聚会很少迟到，也不放鸽子", "但还是很佛系，XX说什么都OK，被sex欺负也不介意", "但还是很善良，从不让XX吃亏，总会为sex考虑", "但还是很暖心，对XX非常体贴，也很善解人意", "但还是很知心，了解XX的小癖好，善于倾听sex的内心", "但还是很讲义气，常常对XX伸出援手，总能信守承诺", "但还是很随和，从不对XX发脾气，生气了也很好哄", "但还是很豁达，包容XX的孩子气，不过分计较得失", "但还是很稳重，帮XX抑制大脑冲动，给sex各种建议", "但还是很实在，过节给XX送祝福，总是有求必应", "但还是很玩得来，跟XX默契十足，不拘束很放肆", "但还是很亲密，陪XX上厕所，跟sex一起旅行", "但还是很贴心，和XX一起看电影，一起逛吃逛吃", "但还是很热心，给XX捧场，帮sex跑腿买东西", "但还是很有趣，陪XX打游戏，一起恶作剧", "但还是很机智，帮XX圆谎，为sex打掩护", "但还是大度，包容XX的缺点，原谅sex的小失误", "但还是很耿直，总是实话实说，帮XX看清现实", "但还是很给力，无条件信任XX，支持sex的各种决定", "但还是很搞笑，总是妙语连珠，与XX互相吐槽", "但还是很睿智，和XX分享人生哲学，帮sex理清小困惑", "但还是很正能量，和XX一起进步，给sex鼓励和勇气", "但还是很细心，总能觉察到XX的失落，给sex力量", "但还是很勇敢，陪XX去冒险，和sex一起面对挑战", "但还是很有品味，给XX推荐各种好剧，做sex的时尚顾问", "但还是很神奇，让XX的快乐翻倍，悲伤减半", "但还是很有眼光，看XX自带滤镜，是sex的头号粉丝"],
        Z = ["在XX想吐槽的时候，会变成sex的吐槽接收机", "在XX有问题的时候，会变成sex的问题拆解器", "在XX压力大的时候，会变成sex的按摩舒缓仪", "在XX想听笑话的时候，会变成sex的灵魂段子手", "在XX失眠的时候，会变成sex的爆款催眠器", "在XX不开心的时候，会变成sex的低配版郭德纲", "在XX没钱的时候，会变成sex的限额版提款机", "在XX无聊的时候，会变成sex的解闷小黄人", "在XX骂人的时候，会变成sex的骂人复读机", "在XX说谎的时候，会变成sex的圆谎小助手", "在XX想诉苦的时候，会变成sex的情绪安抚仪", "在XX倒霉的时候，会变成sex的转运锦鲤", "在XX很冷的时候，会变成sex的人肉暖宝宝", "在XX孤单的时候，会变成sex的陪聊Siri", "在XX紧张的时候，会变成sex的超强镇定剂", "在XX比赛的时候，会变成sex的助威喇叭", "在XX要变胖的时候，会变成sex的零食消灭机", "在XX想听歌的时候，会变成sex的移动点歌台", "在XX生病的时候，会变成sex的多喝热水提醒器", "在XX吃火锅的时候，会变成sex的自动捞菜机", "在XX想哭的时候，会变成sex的手动雨刮器", "在XX有危险的时候，会变成sex的防御平底锅", "在XX受伤的时候，会变成sex的速效止痛药", "在XX饥饿的时候，会变成sex的自动炒菜机", "在XX无助的时候，会变成sex的哆啦A梦", "在XX暴躁的时候，会变成sex的超级灭火器", "在XX头脑发热的时候，会变成sex的无敌降温器", "在XX低落的时候，会变成sex的强力兴奋剂", "在XX气馁的时候，会变成sex的专属打气筒", "在XX犯懒的时候，会变成sex的最严教导主任"],
        G = s({
            total: D.length,
            n: 2
        }),
        V = g({
            total: Y.length,
            result1: G,
            figure: Q
        }),
        ee = g({
            total: Z.length,
            result1: G,
            figure: $
        });
    e(".text").html("XX的朋友：</br>" + D[G[0]] + "</br>" + D[G[1]] + "</br>" + Y[V] + "</br>" + Z[ee])
} (jQuery);