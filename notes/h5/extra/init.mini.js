!(function() {
    // 判断是否是一定浏览器
    // loading样式设置
    function a() {
        (w = window.innerWidth), (_ = window.innerHeight);
        // 宽度小于高度，竖屏，设置loading样式
        w < _
            ? ((k = w / 750), (B = _ / k))
            : //   宽度大于高度，设置loading样式
              ((k = _ / 750), (B = w / k));
    }
    // 确定屏幕旋转角度，根据不同的角度显示不同内容
    function s() {
        console.log(window.orientation, '方向');
        switch (window.orientation) {
            case 0:
                setTimeout(function() {
                    a();
                    Te = Math.PI / 2;
                    X.rotation = Te;
                    X.scale.set(k, k);
                    W.resize(w, _);
                    X.position.set(w, 0);
                    S = Ne.__scrollLeft;
                    setTimeout(function() {
                        Ne.setDimensions(w, _, w, 1600 + w);
                        Ne.scrollTo(S, 0, !1);
                    }, 200);
                }, 300);
                break;

            case 90:
                setTimeout(function() {
                    a();
                    Te = 0;
                    X.rotation = Te;
                    X.scale.set(k, k);
                    W.resize(w, _);
                    X.position.set(0, 0);
                    S = Ne.__scrollTop;
                    setTimeout(function() {
                        Ne.setDimensions(w, _, 16067 + w, _), Ne.scrollTo(S, 0, !1);
                    }, 200);
                }, 300);
                break;
            case 180:
        }
        B = w < _ ? _ / k : w / k;
        console.log(B, 'B:');
    }
    // 更新加载进度
    function d(e, i) {}
    // 必须图片加载完后开始初始化canvas
    function p() {
        // 图片加载完成
        // loading移除
        setTimeout(function() {
            $('#loading').fadeOut(300);
        }, 10);
        // loading样式设置,及初始值设置
        a();
        //   R是wrapper
        R = new C();
        var oe = new E();
        oe.beginFill(4158644),
            oe.drawRect(0, 0, 2e4, 2e4),
            oe.endFill(),
            // 背景
            (H = new C()),
            // 头像
            (F = new PIXI.extras.AnimatedSprite.fromImages([M + 'start/eye_open.png'])),
            F.pivot.set(224, 311);
        F.position.set(612, 361);
        // 背景容器添加背景图片和任务到容器
        H.addChild(F),
            // (Te = Math.PI / 2),
            // (X.rotation = Te),
            R.addChild(oe, H);

        X.addChild(R);
        X.position.set(w, 0), X.scale.set(k, k);

        (X.interactive = !0),
            (X.buttonMode = !0),
            // 对canvas容器绑定触摸事件
            X.on('touchstart', r).on('touchmove', l).on('touchend', g),
            // 旋转屏幕的处理
            s(),
            // Ne.setDimensions(w, _, w, 16067 + _),
            W.render(X),
            m();
    }
    // 开始滑动事件监听
    function r(e) {
        var i = e.data.originalEvent;
        Ne.doTouchStart(i.touches, i.timeStamp);
    }
    // 滑动过程事件监听
    function l(e) {
        var i = e.data.originalEvent;
        Ne.doTouchMove(i.touches, i.timeStamp, i.scale);
    }
    // 滑动结束事件监听
    function g(e) {
        var i = e.data.originalEvent;
        Ne.doTouchEnd(i.timeStamp);
    }
    // 根据硬件环境渲染canvas
    function m() {
        // W是整个canvas, X 是PIXI的容器
        TWEEN.update(), requestAnimationFrame(m), W.render(X);
    }
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
        // 角度
        Te,
        E = (PIXI.Rectangle, PIXI.Graphics),
        M = 'http://static.ws.126.net/f2e/news/china_tolerance/images/';

    // 从这里开始
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
            .on('progress', d)
            .load(p);
    (Fe = function(e, i, n) {
        console.log(e, i, n, 'canshu');
        var t, o;
        console.log(Te, 'te');
        Te > 0 ? ((o = i), (t = e)) : ((o = e), (t = i));
        // 加了这个才能正常显示！！！
        // 实时移动整个容器的位置
        (R.position.x = -o), (R.position.y = -t);
    }),
        // Ne是Scroller的实例
        (Ne = new Scroller(Fe, {
            zooming: !1,
            animating: !0,
            bouncing: !1,
            animationDuration: 1e3
        }));
    Ne.__enableScrollY = !0;
})();
