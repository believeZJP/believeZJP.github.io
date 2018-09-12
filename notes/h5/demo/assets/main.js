!(function() {
    // 通用设置
    const w = window.innerWidth,
        _ = window.innerHeight;

    var k,
        S = 0,
        P = 0,
        T = (PIXI.autoDetectRenderer, PIXI.loader),
        E = (PIXI.Rectangle, PIXI.Graphics),
        A = (PIXI.loader.resources,
        PIXI.utils.TextureCache,
        PIXI.Texture,
        PIXI.Text,
        new PIXI.ticker.Ticker(),
        PIXI.Sprite),
        // PIXI里的容器
        Container = PIXI.Container,
        // 屏幕当前旋转角度
        degree = 0,
        imgPre = 'images/';

    // 从这开始
    // container 是PIXI容器的实例
    var container = new Container();
    (container.width = w), (container.height = _);

    //Create the renderer 创建canvas渲染器
    var W = new PIXI.CanvasRenderer(w, _);

    // 添加canvas到html
    $('.china_tolerance_content')[0].appendChild(W.view);

    //   提前加载所有图片
    T.add(imgPre + '01.png')
        .add(imgPre + '02.png')
        .add(imgPre + '01bgdash.png')
        .add(imgPre + '01bg.png')
        .add(imgPre + '01dialog.png')
        .add(imgPre + '01hand.png')
        .add(imgPre + '02bg.png')
        .add(imgPre + '02desk.png')
        .add(imgPre + '02dialog.png')
        .add(imgPre + '02package.png')
        .on('progress', onProgress)
        .load(endLoad);

    // 处理加载图片进度，用于页面显示百分比
    function onProgress(e, i) {
        var n = parseInt(e.progress);
        console.log('当前进度' + n);
    }

    // 图片加载完回调
    function endLoad() {
        // 显示100%
        // loading移除

        // 初始值设置
        a();
        // 加载各个元素
        var wrapper = new Container();

        var bgColor = new E();
        bgColor.beginFill(4158644);
        bgColor.drawRect(0, 0, 2e4, 2e4);
        bgColor.endFill();

        // 开始添加背景图片
        // 1.先定义一个容器，将图片添加到容器中
        var bgImg = new Container(),
            bgImgText = new A(T.resources[imgPre + '01bgdash.png'].texture),
            dialog = new A(T.resources[imgPre + '01dialog.png'].texture),
            darkBgImg = new A(T.resources[imgPre + '01bg.png'].texture);
        w < _
            ? ((bgImgText.width = _ / k), (darkBgImg.width = _ / k))
            : ((bgImgText.width = w / k / 2), (darkBgImg.width = w / k / 2)),
            ((bgImgText.height = 750), (darkBgImg.height = 750));
        // 黑色背景
        darkBgImg.position.set(w / k / 2, 0);
        // 对话框
        dialog.position.set(80, 100);
        // 左滑手势
        var ue = new A(T.resources[imgPre + '01hand.png'].texture);
        ue.position.set(180, 380),
            (me = new TWEEN.Tween(ue.position)
                .to(
                    {
                        x: 140
                    },
                    1e3
                )
                .delay(300)
                .repeat(1 / 0)
                .easing(TWEEN.Easing.Quadratic.Out)
                .start());

        // 第二屏
        var secondCon = new Container();

        var bg2Page = new A(T.resources[imgPre + '02bg.png'].texture);
        bg2Page.width = w / k;
        bg2Page.position.set(w / k, 0);
        var bg2Desk = new A(T.resources[imgPre + '02desk.png'].texture);
        bg2Desk.width = w / k;
        bg2Desk.position.set(w / k, 470);
        var dialog02 = new A(T.resources[imgPre + '02dialog.png'].texture);
        dialog02.position.set(w / k + 220, 240);

        secondCon.addChild(bg2Page, bg2Desk, dialog02);
        // bgImg.addChild(bgImgText);
        // 添加中间的人物
        // (F = new PIXI.extras.AnimatedSprite.fromImages([imgPre + 'eye_open.png', imgPre + 'eye_close.png'])),
        //     (Ce = setInterval(function() {
        //         F.gotoAndStop(1),
        //             setTimeout(function() {
        //                 F.gotoAndStop(0);
        //             }, 150);
        //     }, 1700)),
        //     F.pivot.set(224, 311),
        //     F.position.set(224 + (B - 558) / 2, 361);
        // bgImg.addChild(bgImgText, F);

        bgImg.addChild(bgImgText, darkBgImg, dialog, ue);
        // 总的容器添加wrapper
        container.addChild(wrapper);

        // (Te = Math.PI / 2), (container.rotation = Te);
        // 设置位置
        container.position.set(w, 0);
        // 添加图片的顺序不能反，最外层的在最后
        container.addChild(bgColor, bgImg, secondCon);

        // ？？
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
                break;
            case -90:
                break;
            case 90:
                setTimeout(function() {
                    // 计算图片比例
                    a(), (degree = 0), (container.rotation = degree);
                    console.log(k, '屏幕比例');
                    container.scale.set(k, k), W.resize(w, _), container.position.set(0, 0), (S = Ne.__scrollTop);
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
        // e, i, n
        var x, y;

        degree > 0 ? ((x = top), (y = left)) : ((x = left), (y = top));
        (container.position.x = -x), (container.position.y = -y);
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
