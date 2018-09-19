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
        // 手势消失的timeout
        imgPre = 'images/';

    // 从这开始
    // container 是PIXI容器的实例
    var container = new Container();
    (container.width = w), (container.height = _);

    //Create the renderer 创建canvas渲染器
    var W = new PIXI.CanvasRenderer(w, _);

    // 添加canvas到html
    $('.china_tolerance_content')[0].appendChild(W.view);
    //防止屏幕移动
    $(document).bind('touchmove', function(e) {
        e.preventDefault();
    });
    //   提前加载所有图片
    T.add(imgPre + '01.png')
        .add(imgPre + '02.png')
        .add(imgPre + '01bgdash.png')
        .add(imgPre + '01bg.png')
        .add(imgPre + '01dialog.png')
        .add(imgPre + '01hand.png')
        .add(imgPre + '02bg.png')
        .add(imgPre + '02bg-desk.png')
        .add(imgPre + '02wifi.png')
        .add(imgPre + '02text.png')
        .add(imgPre + '02desk.png')
        .add(imgPre + '02dialog.png')
        .add(imgPre + '02package.png')
        .add(imgPre + '03card.png')
        .add(imgPre + '03dialog.png')
        .add(imgPre + '03adapter.png')
        .add(imgPre + '04adapter.png')
        .add(imgPre + '04dialog.png')
        .add(imgPre + '04dialog2.png')
        .add(imgPre + '05dialog.png')
        .add(imgPre + '05download.png')
        .add(imgPre + '05scanCode.png')
        .add(imgPre + '05account.png')
        .add(imgPre + '06dialog.png')
        .add(imgPre + '07dialog.png')
        .add(imgPre + '07music.png')
        .add(imgPre + '08dialog.png')
        .add(imgPre + '08qqmusicIndex.png')
        .add(imgPre + '08adddevice.png')
        .add(imgPre + '09dialog.png')
        .add(imgPre + '09wifiinput.png')
        .add(imgPre + '10dialog.png')
        .add(imgPre + '10netting.png')
        .add(imgPre + '10end.png')
        .add(imgPre + '11dialog.png')
        .add(imgPre + '11banner.png')
        .add(imgPre + '11bear.png')
        .add(imgPre + '11bg.png')
        .add(imgPre + '12question.png')
        .add(imgPre + '12yujian.png')
        .add(imgPre + '12music.png')
        .add(imgPre + '13ques.png')
        .add(imgPre + '13car.png')
        .add(imgPre + '13dialog.png')
        .add(imgPre + '14ques.png')
        .add(imgPre + '14item.png')
        .add(imgPre + '14dialog.png')
        .add(imgPre + '15ques.png')
        .add(imgPre + '15item.png')
        .add(imgPre + '15dialog.png')
        .add(imgPre + '16xunlian.png')
        .add(imgPre + '16dialog.png')
        .add(imgPre + '17light.png')
        .add(imgPre + '17light2.png')
        .add(imgPre + '17dialog.png')
        .add(imgPre + '18bluetooth.png')
        .add(imgPre + '18dialog.png')
        .add(imgPre + '19download.png')
        .add(imgPre + '19rewatch.png')
        .add(imgPre + '19speaker.png')
        .add(imgPre + '19zaijia.png')
        .add(imgPre + '19logo.png')
        .add(imgPre + '19green.png')
        .add(imgPre + 'righthand.png')
        .add(imgPre + 'blackspeaker.png')
        .add(imgPre + 'bluespeaker.png')
        .add(imgPre + 'orangespeaker.png')
        .add(imgPre + 'purplespeaker.png')
        .add(imgPre + 'redspeaker.png')
        .on('progress', onProgress)
        .load(endLoad);

    // 处理加载图片进度，用于页面显示百分比
    function onProgress(e, i) {
        var n = parseInt(e.progress);
        console.log('当前进度' + n);
    }
    function getTexture(name) {
        return new A(T.resources[imgPre + name + '.png'].texture);
    }

    // 图片加载完回调
    function endLoad() {
        // 显示100%
        // loading移除

        // 初始值设置
        a();

        // 加载各个元素
        var bgColor = new E();
        bgColor.beginFill(4158644);
        bgColor.drawRect(0, 0, 13000, 13000);
        bgColor.endFill();

        // 每屏宽度
        pw = w / k;
        // pw为横屏整屏宽度， 如果宽度小于高度，为竖屏，设置
        w < _ ? (pw = _ / k) : (pw = w / k);
        // 将pw直接定死
        pw = 667 * 2;
        console.log(pw, 'pw页宽', 'w:', w);
        // 开始添加背景图片
        // 1.先定义一个容器，将图片添加到容器中
        var firstCon = new Container();
        // 背景图片
        bgPic = getTexture('02bg-desk');
        bgPic.width = pw;
        bgPic.position.set(0, 0);
        // 对话框
        dialog = getTexture('01dialog');
        dialog.position.set(80, 100);
        package01 = getTexture('02package');
        package01.position.set(pw / 2 - 150, 0 - 300);
        package01.scale.x = 2;
        package01.scale.y = 2;
        // 左滑手势
        leftSlide = getTexture('01hand');
        leftSlide.position.set(180, 400),
            (me = new TWEEN.Tween(leftSlide.position)
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

        firstCon.addChild(bgPic, package01, dialog, leftSlide);

        // 第二屏
        var secondCon = new Container();

        // wifi
        // bg2Wifi = new A(T.resources[imgPre + '02wifi.png'].texture);
        bg2Wifi = new PIXI.extras.AnimatedSprite.fromImages([
            imgPre + '02wifi.png',
            imgPre + '10-01.png',
            imgPre + '18-01.png'
        ]);
        bg2Wifi.position.set(w / k + 30, 30);

        // 拆箱
        bg2Text = new PIXI.extras.AnimatedSprite.fromImages([
            imgPre + '02text.png',
            imgPre + '10-02.png',
            imgPre + '18-02.png'
        ]);
        bg2Text.position.set(w / k * 2 - 400, 30);

        dialog02 = new A(T.resources[imgPre + '02dialog.png'].texture);
        dialog02.position.set(w / k + 190, 240);
        dialog02.alpha = 0;
        var package02 = new A(T.resources[imgPre + '02package.png'].texture);
        package02.position.set(w / k + 220, 140);
        package02.alpha = 0;
        // secondCon.addChild(bgPic, bg2Desk, bg2Wifi, bg2Text, dialog02, package02);
        secondCon.addChild(bg2Wifi, bg2Text, dialog02, package02);

        // 第三屏
        var thirdCon = new Container();
        card03 = new A(T.resources[imgPre + '03card.png'].texture);
        card03.position.set(w / k * 2 + 620, 20);
        dialog03 = new A(T.resources[imgPre + '03dialog.png'].texture);
        dialog03.position.set(w / k * 2 + 60, 80);
        dialog03.alpha = 0;
        // speaker03 = getTexture('blackspeaker');
        speaker03 = new PIXI.extras.AnimatedSprite.fromImages([
            imgPre + 'blackspeaker.png',
            imgPre + 'orangespeaker.png'
        ]);
        speaker03.position.set(w / k * 2 + 320, 175);
        adapter03 = getTexture('03adapter');
        adapter03.position.set(w / k * 2 + 50, 560);
        adapter03.alpha = 0;
        thirdCon.addChild(adapter03, card03, dialog03);
        // 第四屏 接通电源
        var fourthCon = new Container();
        dialog04 = getTexture('04dialog');
        dialog04.position.set(pw * 3 + 1000, 220);
        // dialog04.alpha = 0;
        dialog042 = getTexture('04dialog2');
        dialog042.position.set(pw * 3 + 400, 220);
        dialog042.alpha = 0;
        adapter04 = getTexture('04adapter');
        adapter04.position.set(pw * 4 + 600, 560);
        adapter04.alpha = 0;

        fourthCon.addChild(dialog04, dialog042, adapter04);
        // 第五屏 扫码下载APP
        var fifthCon = new Container();
        handHeld = new PIXI.extras.AnimatedSprite.fromImages([
            imgPre + '05scanCode.png',
            imgPre + '05download.png',
            imgPre + '05account.png',
            imgPre + '07qqmusic.png',
            imgPre + '08qqmusicIndex.png',
            imgPre + '08adddevice.png',
            imgPre + '09wifiinput.png',
            imgPre + '10netting.png',
            imgPre + '10end.png',
            imgPre + '16xunlian.png',
            imgPre + '18bluetooth.png'
        ]);
        handHeld.position.set(pw * 5, 20);
        handHeld.scale.set(0);
        // 扫码dialog
        dialog05 = getTexture('05dialog');
        dialog05.position.set(pw * 5 + 900, 220);
        dialog05.alpha = 0;
        // 因为要设置index，放到最外层容器
        // fifthCon.addChild(handHeld, dialog05);
        fifthCon.addChild(dialog05);
        // 第六屏
        var sixthCon = new Container();
        dialog06 = getTexture('06dialog');
        dialog06.position.set(pw * 6 + 900, 220);
        rightHand = getTexture('righthand');
        rightHand.position.set(pw * 6 + 700, 262);
        rightHand.alpha = 0;
        // 第七,八屏只有一个dialog,直接放到第六屏
        dialog07 = getTexture('07dialog');
        dialog07.position.set(pw * 7 + 900, 220);
        dialog08 = getTexture('08dialog');
        dialog08.position.set(pw * 8 + 900, 220);
        sixthCon.addChild(dialog06, dialog07, dialog08, rightHand);

        // 第九屏，第十屏 wifi配网
        var ninthCon = new Container();
        dialog09 = getTexture('09dialog');
        dialog09.position.set(pw * 9 + 900, 220);
        dialog09.alpha = 0;
        dialog10 = getTexture('10dialog');
        dialog10.position.set(pw * 10 + 900, 220);
        dialog10.alpha = 0;
        ninthCon.addChild(dialog09, dialog10);
        // 第11屏，小熊，唤醒
        var eleventhCon = new Container();
        bg11 = getTexture('11bg');
        bg11.position.set(pw * 11, 0);
        bg11.width = pw;
        banner11 = getTexture('11banner');
        banner11.position.set(pw * 11, 0);
        banner11.width = pw;
        bear11 = getTexture('11bear');
        bear11.position.set(pw * 11 + 1150, 280);
        dialog11 = getTexture('11dialog');
        dialog11.position.set(pw * 11 + 700, 220);
        eleventhCon.addChild(bg11, banner11, bear11, dialog11);
        // 第12屏 听遇见
        var twelfthCon = new Container();
        music12 = getTexture('12music');
        music12.position.set(pw * 12 + 400, 50);

        dialog12 = getTexture('12question');
        dialog12.position.set(pw * 12 + 500, 450);
        // dialog12.alpha = 0;
        dialog12yujian = getTexture('12yujian');
        dialog12yujian.position.set(pw * 12 + 900, 220);
        // dialog12.alpha = 0;
        twelfthCon.addChild(music12, dialog12, dialog12yujian);
        // 第13屏 闹钟⏰ 14,极客模式，15，儿童模式
        var thirteenthCon = new Container();
        dialog13 = getTexture('13dialog');
        dialog13.position.set(pw * 13 + 900, 220);
        dialog13.alpha = 0;
        dialog13ques = getTexture('13ques');
        dialog13ques.position.set(pw * 13 + 500, 450);
        dialog13ques.alpha = 0;
        item13 = getTexture('13car');
        item13.position.set(pw * 13 + 500, 50);

        dialog14 = getTexture('14dialog');
        dialog14.position.set(pw * 14 + 900, 220);
        dialog14.alpha = 0;
        dialog14ques = getTexture('14ques');
        dialog14ques.position.set(pw * 14 + 500, 450);
        dialog14ques.alpha = 0;
        item14 = getTexture('14item');
        item14.position.set(pw * 14 + 500, 50);

        dialog15 = getTexture('15dialog');
        dialog15.position.set(pw * 15 + 900, 220);
        dialog15.alpha = 0;
        dialog15ques = getTexture('15ques');
        dialog15ques.position.set(pw * 15 + 500, 450);
        dialog15ques.alpha = 0;
        item15 = getTexture('15item');
        item15.position.set(pw * 15 + 500, 50);

        thirteenthCon.addChild(
            item13,
            dialog13,
            dialog13ques,
            item14,
            dialog14,
            dialog14ques,
            item15,
            dialog15,
            dialog15ques
        );
        var sixteenthCon = new Container();
        dialog16 = getTexture('16dialog');
        dialog16.position.set(pw * 16 + 900, 220);
        dialog16.alpha = 0;
        sixteenthCon.addChild(dialog16);
        // 第17屏
        var seventeenthCon = new Container();
        dialog17 = getTexture('17dialog');
        dialog17.position.set(pw * 17 + 900, 220);
        dialog17.alpha = 0;
        item17 = new PIXI.extras.AnimatedSprite.fromImages([imgPre + '17light.png', imgPre + '17light2.png']);
        item17.animationSpeed = 0.01;
        item17.position.set(pw * 17 + 700, 50);
        // 第18屏 蓝牙
        dialog18 = getTexture('18dialog');
        dialog18.position.set(pw * 18 + 900, 220);
        dialog18.alpha = 0;
        seventeenthCon.addChild(item17, dialog17, dialog18);

        var nineteenthCon = new Container();
        logo19 = getTexture('19logo');
        logo19.position.set(pw * 19 + 2100, 600);
        rewatch19 = getTexture('19rewatch');
        rewatch19.position.set(pw * 19 + 1800, 350);
        rewatch19.interactive = true;
        rewatch19.on('tap', () => {
            location.href = '/';
        });
        download19 = getTexture('19download');
        download19.position.set(pw * 19 + 2100, 350);
        download19.interactive = true;
        download19.on('tap', () => {
            location.href = '';
        });

        zaijia19 = getTexture('19zaijia');
        zaijia19.position.set(pw * 19 + 1500, 100);
        zaijia19.interactive = true;
        zaijia19.on('tap', () => {
            location.href = 'https://dumall.baidu.com/zaijia';
        });
        speaker19 = getTexture('19speaker');
        speaker19.position.set(pw * 19 + 2000, 100);
        speaker19.interactive = true;
        speaker19.on('tap', () => {
            location.href = 'https://dumall.baidu.com/speaker1';
        });
        green19 = getTexture('19green');
        green19.position.set(pw * 19 + 1000, 0);

        nineteenthCon.addChild(green19, logo19, rewatch19, download19, speaker19, zaijia19);
        nineteenthCon.interactiveChildren = true;

        // 定义右手点击动画
        W1Ani = TweenMax.fromTo(
            rightHand,
            1,
            {
                pixi: {alpha: 0}
            },
            {
                pixi: {alpha: 1},
                onComplete: function() {
                    TweenMax.fromTo(
                        rightHand,
                        1,
                        {
                            alpha: 1
                        },
                        {
                            alpha: 0.5,
                            onComplete: function() {
                                rightHand.alpha = 1;
                                W1Ani.restart();
                            }
                        }
                    );
                }
            }
        );
        // 默认是开启的
        W1Ani.pause();
        // (Te = Math.PI / 2), (container.rotation = Te);
        // 设置位置
        container.position.set(0, 0);
        // 总的容器添加子容器
        // 添加顺序不能反，最外层的在最后
        container.addChild(
            bgColor,
            firstCon,
            secondCon,
            thirdCon,
            fourthCon,
            handHeld,
            fifthCon,
            sixthCon,
            ninthCon,
            eleventhCon,
            twelfthCon,
            thirteenthCon,
            sixteenthCon,
            seventeenthCon,
            nineteenthCon,
            speaker03
        );
        console.log(container, 'ocn');
        // 因为音箱的层级最高，对话框都要在音箱后面，所以要将音箱层级提高。
        // 注意层级不能超过所有元素的最大值
        container.setChildIndex(speaker03, 15);
        // container.setChildIndex(handHeld, 8);
        // container.setChildIndex(firstCon, 3);
        // container.setChildIndex(d, 3);

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
        Ne.setDimensions(w, _, w, 13230 + _);
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
                // Ne.setDimensions(w, _, w, 16067 + _);
                setTimeout(function() {
                    a(), (degree = 90), (container.rotation = 90);
                    console.log(k, '屏幕比例');
                    debugger;
                    container.scale.set(k, k), W.resize(w, _), container.position.set(0, 0), (S = Ne.__scrollTop);
                    console.log(S, 's');
                    setTimeout(function() {
                        // Ne.setDimensions(w, _, 13230 + w, _), Ne.scrollTo(S, 0, !1), (B = w / k);
                        Ne.setDimensions(w, _, container.width + 30, _), Ne.scrollTo(S, 0, !1), (B = _ / k);
                        // v();
                    }, 200);
                }, 300);
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
                        // Ne.setDimensions(w, _, 13230 + w, _), Ne.scrollTo(S, 0, !1), (B = w / k);
                        Ne.setDimensions(w, _, container.width + 30, _), Ne.scrollTo(S, 0, !1), (B = w / k);
                        // v();
                    }, 200);
                }, 300);
                break;
            case 180:
        }
        B = w < _ ? _ / k : w / k;
    }

    // 区间最小值, 区间最大值, top, 初始位置, 终点
    function scrollNum(minNum, maxNum, top, start, end) {
        let val = start + (top - minNum) / (maxNum - minNum) * (end - start);
        // 这里处理y轴，从下到上,超过最小值还继续向上的问题
        if (start > end) {
            if (val < end) {
                val = end;
            }
        }
        if (start === 750 && end == 280) {
            console.log(start + (top - minNum) / (maxNum - minNum) * (end - start), 'val', top);
        }
        // console.log(start + (top - minNum) / (maxNum - minNum) * (end - start), 'val');
        return val;
    }

    ///////////////////////////
    // Canvas renderer 滑动渐变动作
    var render = function(left, top, zoom) {
        var x, y;

        // 0为竖屏，90为横屏
        degree > 0 ? ((x = top), (y = left)) : ((x = left), (y = top));
        console.log(`坐标：${x}`);
        if (x > 0 && x < 640) {
            if (x < 451) {
                package01.x = scrollNum(0, 450, x, pw / 2 - 150, pw + 220);
                package01.y = scrollNum(0, 450, x, -300, 140);
                package01.scale.x = scrollNum(0, 450, x, 2, 1);
                package01.scale.y = scrollNum(0, 450, x, 2, 1);
            }
            if (x > 451) {
                package01.position.set(pw + 220, 140);
                package01.scale.x = 1;
                package01.scale.y = 1;
            }
        }
        if (x > 640 && x < 1200) {
            // 750是页面高度，刚开始在最底下，350是要移动到的高度
            // dialog02.y = scrollNum(140, 540, x, 750, 240);
            dialog02.alpha = scrollNum(140, 150, x, 0, 1);
        } else {
            dialog02.alpha = 0;
        }
        // 第三屏
        if (x > 1000 && x < 1200) {
            card03.y = scrollNum(1000, 1200, x, 750, 500);
            adapter03.alpha = scrollNum(1000, 1100, x, 0, 1);
            adapter03.y = scrollNum(1000, 1200, x, 750, 560);
        }
        // if (x > 1200) {
        //     adapter03.y = 560;
        // }
        if (x > 1280 && x < 1800) {
            dialog03.alpha = scrollNum(1200, 1300, x, 0, 1);
        } else {
            dialog03.alpha = 0;
        }

        // 第四屏 提示接通电源,指示灯亮起

        if (x > 1830 && x < 2500) {
            // dialog042.alpha = scrollNum(2200, 2300, x, 0, 1);
            dialog04.alpha = scrollNum(2050, 2200, x, 0, 1);
            // 显示插座适配器
            adapter04.alpha = 1;
            adapter04.y = scrollNum(1830, 2100, x, 750, 560);
            dialog042.alpha = scrollNum(1830, 2000, x, 0, 1);
        } else {
        }
        // 节点：接通电源，黑灯换橙色灯。 TODO 返回去灯变黑
        if (x > 2170 && x < 3100) {
            adapter03.alpha = 0;
            speaker03.gotoAndStop(1);
            handHeld.scale.set(0);
        }

        // 第五屏 扫码下载
        if (x > 3100 && x < 3300) {
            handHeld.gotoAndStop(0);
            handHeld.scale.x = scrollNum(3100, 3300, x, 0, 1);
            handHeld.scale.y = scrollNum(3100, 3300, x, 0, 1);
            handHeld.rotation = scrollNum(3100, 3300, x, -1, 0);
            if (x > 3200 && x < 3300) {
                dialog05.alpha = scrollNum(3200, 3300, x, 0, 1);
            }
        }
        if (x > 3300) {
            initHandHeld();
        }
        // 扫码完成，切换画面
        if (x > 3350) {
            handHeld.gotoAndStop(1);
        }
        if (x > 3800 && x < 4000) {
            dialog06.alpha = scrollNum(3800, 3950, x, 0, 1);
        }
        if (x > 4000) {
            handHeld.gotoAndStop(2);
        }
        if (x < 4050) {
            W1Ani.pause();
            rightHand.alpha = 0;
        }
        if (x > 4050 && x < 4080) {
            rightHand.alpha = 1;
            rightHand.position.set(pw * 6 + 700, 262);
            if (W1Ani.paused) {
                W1Ani.play();
            }
        }
        if (x > 4080 && x < 4500) {
            W1Ani.pause();
            rightHand.alpha = 0;
        }
        // 切换为QQ音乐
        if (x > 4550 && x < 4700) {
            handHeld.gotoAndStop(3);
            dialog07.alpha = scrollNum(4600, 4650, x, 0, 1);
        }
        if (x > 4650 && x < 4680) {
            rightHand.position.set(pw * 7 + 600, 470);
            rightHand.alpha = 1;
            if (W1Ani.paused) W1Ani.play();
        }
        if (x > 4680 && x < 5250) {
            W1Ani.pause();
            rightHand.alpha = 0;
            handHeld.gotoAndStop(3);
        }
        // QQ音乐APP首页
        if (x > 5250 && x < 5330) {
            handHeld.gotoAndStop(4);
            dialog08.alpha = scrollNum(5250, 5300, x, 0, 1);
            // 设备
            if (x > 5300 && x < 5330) {
                rightHand.position.set(pw * 8 + 500, 100);
                rightHand.alpha = 1;
                if (W1Ani.paused) W1Ani.play();
            }
        }
        // 中间间隙
        if (x > 5330 && x < 5350) {
            rightHand.alpha = 0;
            W1Ani.pause();
        }
        // 添加设备
        if (x > 5330 && x < 5800) {
            handHeld.gotoAndStop(5);
            // 添加设备
            if (x > 5350 && x < 5380) {
                rightHand.position.set(pw * 8 + 550, 140);
                if (W1Ani.paused) {
                    W1Ani.play();
                }
            }
            if (x > 5380 && x < 5800) {
                rightHand.alpha = 0;
                W1Ani.pause();
            }
        }
        // wifi输入框
        if (x > 5800 && x < 6400) {
            handHeld.gotoAndStop(6);
            dialog09.alpha = scrollNum(5850, 5900, x, 0, 1);
        }
        if (x > 6000 && x < 6050) {
            dialog09.alpha = 1;
            rightHand.position.set(pw * 9 + 600, 300);
            rightHand.alpha = scrollNum(6000, 6050, x, 0, 1);
            if (W1Ani.paused) {
                W1Ani.play();
            }
        }
        if (x > 6050 && x < 6300) {
            rightHand.alpha = 0;
        }
        if (x > 6400 && x < 6550) {
            handHeld.gotoAndStop(7);
        }
        if (x > 6550 && x < 7000) {
            handHeld.gotoAndStop(7);
            dialog10.alpha = scrollNum(6550, 6600, x, 0, 1);
        }
        if (x > 6600 && x < 7000) {
            handHeld.gotoAndStop(8);
            handHeld.alpha = 1;
        }
        // 配网成功，小熊
        if (x > 7000 && x < 7300) {
            banner11.y = scrollNum(7000, 7250, x, 750, 0);
            bear11.y = scrollNum(7250, 7300, x, 750, 280);

            dialog11.alpha = scrollNum(7200, 7300, x, 0, 1);
            if (x > 7200) {
                // 隐藏左手
                handHeld.alpha = 0;
            }
        }
        // 处理左上角和右上角的元素
        if (x < 7600) {
            bg2Wifi.gotoAndStop(0);
            bg2Text.gotoAndStop(0);
        }
        if (x > 7600 && x < 12000) {
            // 处理左上角和右上角的元素
            bg2Wifi.gotoAndStop(1);
            bg2Text.gotoAndStop(1);
        }
        // 听遇见
        if (x > 7600 && x < 8200) {
            music12.y = scrollNum(7650, 7730, x, 750, 50);
            dialog12.alpha = scrollNum(8000, 8050, x, 0, 1);
            dialog12yujian.alpha = scrollNum(7900, 8000, x, 0, 1);
        }
        if (x > 8500 && x < 9100) {
            item13.y = scrollNum(8500, 8600, x, 750, 50);
            dialog13.alpha = scrollNum(8630, 8700, x, 0, 1);
            dialog13ques.alpha = scrollNum(8600, 8650, x, 0, 1);
        }

        // 极客模式
        if (x > 9100 && x < 9600) {
            item14.y = scrollNum(9150, 9250, x, 750, 50);
            dialog14.alpha = scrollNum(9300, 9350, x, 0, 1);
            dialog14ques.alpha = scrollNum(9300, 9400, x, 0, 1);
        }

        // 儿童模式
        if (x > 9600 && x < 10100) {
            item15.y = scrollNum(9700, 9800, x, 750, 50);
            dialog15.alpha = scrollNum(9950, 10000, x, 0, 1);
            dialog15ques.alpha = scrollNum(9950, 10050, x, 0, 1);
        }
        // 单独处理手持手机
        if (x > 7300 && x < 10600) {
            handHeld.alpha = 0;
        }
        if (x > 10600 && x < 10700) {
            handHeld.alpha = 1;
            handHeld.scale.x = scrollNum(10600, 10700, x, 0, 1);
            handHeld.scale.y = scrollNum(10600, 10700, x, 0, 1);
            handHeld.rotation = scrollNum(10600, 10700, x, -1, 0);
        }
        if (x > 10700 && x < 11000) {
            dialog16.alpha = scrollNum(10700, 10800, x, 0, 1);
            handHeld.animationSpeed = 0.3;
            handHeld.gotoAndStop(9);
            handHeld.alpha = 1;
            if (x > 10800 && x < 11000) {
                handHeld.position.set(pw * 16, 0);
                //     handHeld.scale.x = scrollNum(10800, 11000, x, 0, 1);
                //     handHeld.scale.y = scrollNum(10800, 11000, x, 0, 1);
                //     handHeld.rotation = scrollNum(10800, 11000, x, -1, 0);
            }
        }
        if (x > 11000 && x < 12000) {
            handHeld.gotoAndStop(9);

            handHeld.alpha = scrollNum(11200, 11250, x, 1, 0);
            item17.play();
            if (x > 11400) {
                dialog17.alpha = scrollNum(11400, 11450, x, 0, 1);
            }
        }
        // 蓝牙
        if (x > 12000 && x < 12600) {
            handHeld.gotoAndStop(10);

            bg2Text.gotoAndStop(2);
            bg2Wifi.gotoAndStop(2);
            dialog18.alpha = scrollNum(12080, 12120, x, 0, 1);
            if (x > 12120 && x < 12300) {
                handHeld.position.set(pw * 18, 0);
                handHeld.alpha = 1;
                handHeld.scale.x = scrollNum(12150, 12300, x, 0, 1);
                handHeld.scale.y = scrollNum(12150, 12300, x, 0, 1);
                handHeld.rotation = scrollNum(12150, 12300, x, -1, 0);
            }
            if (x > 12300) {
                initHandHeld();
            }
        }
        if (x > 12600) {
            handHeld.gotoAndStop(10);
        }
        bgPic.x = 2 * x;
        if (x > w) {
            bgPic.x = 2 * x;
            if (x < 12600) {
                bg2Wifi.x = 2 * x + 30;
                bg2Text.x = 2 * x + w + 190;
            }
        }
        // 音箱,电源线固定在屏幕
        if (x > 2 * w && x < 12600) {
            speaker03.x = 2 * x + 320;
            adapter03.x = 2 * x + 50;
            adapter04.x = 2 * x - 20;
            // 到要展示手势时，音箱及插线板向左移动
            if (x > 4 * w) {
                speaker03.x = scrollNum(4 * w, 4 * w + 100, x, 2 * x + 320, 2 * x + 90);
                adapter04.x = scrollNum(4 * w, 4 * w + 100, x, 2 * x - 20, 2 * x - 300);
            }
        }
        if (x > 5 * w && x < 12600) {
            handHeld.x = 2 * x + 20;
        }

        (container.position.x = -x), (container.position.y = -y);
    };

    // 滑动过快，左手无法复原，根据坐标，超过，直接复原
    function initHandHeld() {
        handHeld.rotation = 0;
        handHeld.scale.x = 1;
        handHeld.scale.y = 1;
    }
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
        touching = true;
        Ne.doTouchStart(i.touches, i.timeStamp);
    }
    // 滑动过程事件监听
    function touchMove(e) {
        // if (touching) {
        var i = e.data.originalEvent;
        Ne.doTouchMove(i.touches, i.timeStamp, i.scale);
        // }
    }
    // 滑动结束事件监听
    function touchEnd(e) {
        var i = e.data.originalEvent;
        touching = false;
        Ne.doTouchEnd(i.timeStamp);
    }
})();
