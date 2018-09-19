!(function() {
    // 通用设置
    const w = window.innerWidth,
        _ = window.innerHeight;

    var k,
        S = 0,
        P = 0,
        A = (PIXI.loader.resources,
        PIXI.utils.TextureCache,
        PIXI.Texture,
        PIXI.Text,
        new PIXI.ticker.Ticker(),
        PIXI.Sprite),
        T = (PIXI.autoDetectRenderer, PIXI.loader),
        E = (PIXI.Rectangle, PIXI.Graphics),
        // PIXI里的容器
        Container = PIXI.Container,
        imgPre = 'images/';

    T.add(imgPre + '01.png').on('progress', onProgress).load(endLoad);
    // 从这开始
    // container 是PIXI容器的实例
    var container = new Container();
    (container.width = w), (container.height = _);

    //Create the renderer 创建canvas渲染器
    var W = new PIXI.CanvasRenderer(w, _);

    // 添加canvas到html
    $('.china_tolerance_content')[0].appendChild(W.view);

    // 处理加载图片进度，用于页面显示百分比
    function onProgress(e, i) {
        var n = parseInt(e.progress);
        console.log('当前进度' + n);
    }

    // 图片加载完回调
    function endLoad() {
        // 显示100%
        // loading移除

        // 加载各个元素
        var wrapper = new Container();

        var bgColor = new E();
        bgColor.beginFill(4158644);
        bgColor.drawRect(0, 0, 2e4, 2e4);
        bgColor.endFill();
        aa = new A(T.resources[imgPre + '01.png'].texture);

        // 设置位置
        container.position.set(w, 0);
        container.addChild(bgColor);

        aa.position.set(190, 240);
        container.addChild(wrapper, aa);
        k = _ / 750;
        container.scale.set(k, k);

        // 一定要设置这个才能触发鼠标事件
        container.interactive = !0;
        container.buttonMode = !0;

        // 对containerI容器绑定触摸事件
        container.on('touchstart', touchStart).on('touchmove', touchMove).on('touchend', touchEnd);

        //   旋转屏幕处理
        s();
        // Ne.setDimensions(w, _, contentWidth, contentHeight);
        Ne.setDimensions(w, _, w, 16067 + _);
        // 首次渲染
        W.render(container);
        // 更新canvas
        update();
    }

    // 根据硬件频率，刷新canvas
    function update() {
        TWEEN.update(), requestAnimationFrame(update), W.render(container);
    }

    function a() {
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
                    a(), (Te = 90), (container.rotation = Te);
                    console.log(k);
                    container.scale.set(k, k),
                        W.resize(w, _),
                        container.position.set(0, 0),
                        (S = Ne.__scrollTop),
                        setTimeout(function() {
                            Ne.setDimensions(w, _, 16067 + w, _), Ne.scrollTo(S, 0, !1), (B = w / k);
                            // v();
                        }, 200);
                }, 300);
                break;
            case -90:
                break;
            case 90:
                setTimeout(function() {
                    a(), (Te = 0), (container.rotation = Te);
                    console.log(k);
                    container.scale.set(k, k),
                        W.resize(w, _),
                        container.position.set(0, 0),
                        (S = Ne.__scrollTop),
                        setTimeout(function() {
                            Ne.setDimensions(w, _, 16067 + w, _), Ne.scrollTo(S, 0, !1), (B = w / k);
                            // v();
                        }, 200);
                }, 300);
                break;
            case 180:
        }
        B = w < _ ? _ / k : w / k;
    }

    // Canvas renderer
    var render = function(left, top, zoom) {
        console.log(left, top, zoom, 'aaa');
    };

    var touching = !1;
    // 初始化滚动插件
    const Ne = new Scroller(render, {
        zooming: !1,
        animating: !0,
        bouncing: !1,
        animationDuration: 1e3
    });
    Ne.__enableScrollY = !0;

    // 开始滑动事件监听
    function touchStart(e) {
        var i = e.data.originalEvent;
        console.log('start', i);
        touching = true;
        Ne.doTouchStart(i.touches, i.timeStamp);
    }
    // 滑动过程事件监听
    function touchMove(e) {
        console.log('moving');
        // if (touching) {
        var i = e.data.originalEvent;
        Ne.doTouchMove(i.touches, i.timeStamp, i.scale);
        // }
    }
    // 滑动结束事件监听
    function touchEnd(e) {
        var i = e.data.originalEvent;
        console.log('end', i);
        touching = false;
        Ne.doTouchEnd(i.timeStamp);
    }
})();
