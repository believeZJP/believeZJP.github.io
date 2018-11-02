!(function() {
    // 通用设置
    (w = window.innerWidth), (_ = window.innerHeight);

    var k = _ / 750,
        S = 0,
        P = 0,
        T = (PIXI.autoDetectRenderer, PIXI.loader),
        // T = new PIXI.loaders.Loader(),
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
        // 整屏的宽度
        pw = w/k,
        // 手势消失的timeout
        imgPre = 'images/',
        // iphone中的bug，微信中所有变量都要先定义，不能直接变量名
        dialog02,card03,dialog03,adapter03,dialog04, dialog042, adapter04,dialog05,dialog06, dialog07, dialog08,dialog09, dialog10,dialog11,music12,dialog12yujian,
        item13,dialog13,item14,dialog14,item15,dialog15,dialog16,item17, dialog17, dialog18,green19, logo19, rewatch19, download19, speaker19, zaijia19,
        // 提前获取包装的x坐标
        package01X
        ;
    // a();
    
    document.body.onselectstart = function () { 
        return false; 
    };
    
    // 从这开始
    // container 是PIXI容器的实例
    container = new Container();
    (container.width = w), (container.height = _);

    //Create the renderer 创建canvas渲染器
    var W = new PIXI.CanvasRenderer(w, _);

    // 添加canvas到html
    $('.area')[0].appendChild(W.view);
    //防止屏幕移动
    // $(document).bind('touchmove', function(e) {
    //     e.preventDefault();
    // });

    //   提前加载所有图片
    T.add(imgPre + '01.png')
        .add('bgm', imgPre + 'bgm.mp3')
        .add(imgPre + '01bg.png')
        .add(imgPre + '01dialog.png')
        .add(imgPre + '01hand.png')
        .add(imgPre + '02bg-desk.png')
        .add(imgPre + '02wifi.png')
        .add(imgPre + '02text.png')
        .add(imgPre + '02text-.png')
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
        .add(imgPre + '08dialog.png')
        .add(imgPre + '08qqmusicIndex.png')
        .add(imgPre + '08adddevice.png')
        .add(imgPre + '09dialog.png')
        .add(imgPre + '09wifiinput.png')
        .add(imgPre + '10dialog.png')
        .add(imgPre + '10netting.png')
        .add(imgPre + '10end.png')
        .add(imgPre + '11dialog.png')
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
        .add(imgPre + '10-02.png')
        .add(imgPre + '18-02.png')
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
            // console.log('当前进度' + n);
            // 在微信中发现没有执行endLoad方法。这里强制执行
            if(n > 97){
                setTimeout(() => {
                    if(!dialog02){
                        // 强制执行
                        endLoad();
                    }
                }, 500);
            }
    }
    function getTexture(name) {
        return new A(T.resources[imgPre + name + '.png'].texture);
    }
    // a(), (window.onorientationchange = s);
    a(), (window.onorientationchange = ()=>{location.reload();});

    // 图片加载完回调
    function endLoad() {
        // 显示100%
        // loading移除
        setTimeout(function() {
            $('#loading').animate({opacity: 0}, 300, function() {
                $(this).hide();
            });
        }, 300),
            // 初始值设置
            a();
        if(T.resources.bgm.data){
            T.resources.bgm.data.loop = true;
            T.resources.bgm.data.autoplay = true;
            T.resources.bgm.data.play();
        }
        // 因为微信中会触发两次click，所以先解绑
        $("#music").unbind('click').on("click",function(e){
            // if(!loader.resources.bgm.sound.isPlaying){
            //     // 播放
            //     musicPlay();
            //     loader.resources.bgm.sound.play();
            //     $(".music").removeClass("off");
            // } else{
            //     // 暂停
            //     musicPause();
            //     $(".music").addClass("off");
            // }

            let bgm = T.resources.bgm.data;
            console.log(bgm.paused, Date.now())
            setTimeout(() => {
                if (bgm.paused) {
                    // 播放
                    bgm.play();
                    $("#music").removeClass("off");
                } else {
                    // 暂停
                    bgm.pause();
                    $("#music").addClass("off");
                }
            }, 100);
            e.preventDefault();

         });
        
     
        // 加载各个元素
        var bgColor = new E();
        bgColor.beginFill(4158644);
        bgColor.drawRect(0, 0, 13000, 13000);
        bgColor.endFill();

        // 每屏宽度
        pw = w / k;
        // pw为横屏整屏宽度， 如果宽度小于高度，为竖屏，设置
        w < _ ? (pw = _ / k) : (pw = w / k);
        // 将pw直接定死,还是不定死了，定死都挤到一起
        // pw = 667 * 2;
        console.log(pw, 'pw页宽', 'w:', w);
        // 开始添加背景图片
        // 1.先定义一个容器，将图片添加到容器中
        var firstCon = new Container();
        // 背景图片
        bgPic = getTexture('02bg-desk');
        bgPic.width = pw;
        bgPic.position.set(0, 0);
        //  配网成功的背景图
        wifiSuccessBg = getTexture('11bg');
        wifiSuccessBg.position.set(0, 0);
        wifiSuccessBg.width = pw;
        wifiSuccessBg.alpha = 0;
        // 对话框
        dialog = getTexture('01dialog');
        dialog.position.set(80, 100);
        package01 = getTexture('02package');
        new PIXI.extras.AnimatedSprite.fromImages([imgPre + 'blackspeaker.png', imgPre + 'orangespeaker.png']);
        package01.position.set(pw / 2 - 150, 0 - 300);
        package01X = package01.position.x;
        console.log(package01X, 'package01x');

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

        firstCon.addChild(bgPic, wifiSuccessBg, dialog, leftSlide);

        // 第二屏
        var secondCon = new Container();

        // wifi
        // bg2Wifi = new A(T.resources[imgPre + '02wifi.png'].texture);
        bg2Wifi = new PIXI.extras.AnimatedSprite.fromImages([
            imgPre + '02wifi.png',
            imgPre + '10-01.png',
            imgPre + '18-01.png'
        ]);
        bg2Wifi.position.set(pw + 30, 30);

        // 拆箱
        bg2Text = new PIXI.extras.AnimatedSprite.fromImages([
            imgPre + '02text.png',
            imgPre + '10-02.png',
            imgPre + '18-02.png',
        ]);
        bg2Text.position.set(pw * 2 - 400, 30);

        dialog02 = new A(T.resources[imgPre + '02dialog.png'].texture);
        dialog02.position.set(pw + 300, 240);
        dialog02.alpha = 0;

        // secondCon.addChild(bgPic, bg2Desk, bg2Wifi, bg2Text, dialog02);
        // package01放到这里， 因为包装要在dialog上层
        // secondCon.addChild(bg2Wifi, bg2Text, dialog02, package01);
        secondCon.addChild(bg2Wifi, bg2Text, dialog02);
        
        // 第三屏
        var thirdCon = new Container();
        card03 = new A(T.resources[imgPre + '03card.png'].texture);
        card03.position.set(pw * 2 + 650, 750);
        dialog03 = new A(T.resources[imgPre + '03dialog.png'].texture);
        dialog03.position.set(pw * 2 + 50, 80);
        dialog03.alpha = 0;
        speaker03 = new PIXI.extras.AnimatedSprite.fromImages([
            imgPre + 'blackspeaker.png',
            imgPre + 'bluespeaker.png',
            imgPre + 'orangespeaker.png'
        ]);
        speaker03.position.set(pw * 1 + 900, 175);
        speaker03.alpha = 0;
        adapter03 = getTexture('03adapter');
        adapter03.position.set(pw * 2 + 10, 560);
        adapter03.alpha = 0;
        thirdCon.addChild(adapter03, card03, dialog03);
        // 第四屏 接通电源
        var fourthCon = new Container();
        dialog04 = getTexture('04dialog');
        dialog04.position.set(pw * 3 + 800, 220);
        dialog04.alpha = 0;
        dialog042 = getTexture('04dialog2');
        dialog042.position.set(pw * 3 + 100, 220);
        dialog042.alpha = 0;
        adapter04 = getTexture('04adapter');
        adapter04.position.set(pw * 3 + 0, 560);
        adapter04.alpha = 0;

        // fourthCon.addChild(dialog04, dialog042, adapter04);
        fourthCon.addChild(dialog04, dialog042);
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
        handHeld.position.set(pw * 5 + 800, 0);
        handHeld.sourceScale = 2;
        // 扫码dialog
        dialog05 = getTexture('05dialog');
        dialog05.position.set(pw * 5 + 100, 220);
        dialog05.alpha = 0;
        // 因为要设置index，放到最外层容器
        // fifthCon.addChild(handHeld, dialog05);
        fifthCon.addChild(dialog05);
        // 第六屏
        var sixthCon = new Container();
        dialog06 = getTexture('06dialog');
        dialog06.position.set(pw * 6 + 300, 220);
        rightHand = getTexture('righthand');
        rightHand.position.set(pw * 5 + 700, 262);
        rightHand.alpha = 0;
        // 第七,八屏只有一个dialog,直接放到第六屏
        dialog07 = getTexture('07dialog');
        dialog07.position.set(pw * 7 + 300, 220);
        dialog08 = getTexture('08dialog');
        dialog08.position.set(pw * 8 + 300, 220);
        sixthCon.addChild(dialog06, dialog07, dialog08);

        // 第九屏，第十屏 wifi配网
        var ninthCon = new Container();
        dialog09 = getTexture('09dialog');
        dialog09.position.set(pw * 9 + 300, 220);
        // dialog09.alpha = 0;
        dialog10 = getTexture('10dialog');
        dialog10.position.set(pw * 10 + 300, 220);
        // dialog10.alpha = 0;
        ninthCon.addChild(dialog09, dialog10);
        // 第11屏，小熊，唤醒
        var eleventhCon = new Container();
        bg11 = getTexture('11bg');
        bg11.position.set(pw * 11, 0);
        bg11.width = pw;
        dialog11 = getTexture('11dialog');
        dialog11.position.set(pw * 11 + 400, 180);
        dialog11.alpha=0;
        // eleventhCon.addChild(banner11, bear11, dialog11);
        eleventhCon.addChild(dialog11);
        

        // 第12屏 听遇见
        var twelfthCon = new Container();
        music12 = getTexture('12music');
        music12.position.set(pw * 12 + 400, 50);
        music12.alpha = 0;
        dialog12 = getTexture('12question');
        dialog12.position.set(pw * 12 + 500, 450);
        dialog12.alpha = 0;
        dialog12yujian = getTexture('12yujian');
        dialog12yujian.position.set(pw * 12 + 900, 300);
        // dialog12.alpha = 0;
        twelfthCon.addChild(music12,
            //  dialog12,
              dialog12yujian);
        // 第13屏 闹钟⏰ 14,极客模式，15，儿童模式
        var thirteenthCon = new Container();
        dialog13 = getTexture('13dialog');
        dialog13.position.set(pw * 13 + 900, 300);
        dialog13.alpha = 0;
        dialog13ques = getTexture('13ques');
        dialog13ques.position.set(pw * 13 + 500, 450);
        dialog13ques.alpha = 0;
        item13 = getTexture('13car');
        item13.position.set(pw * 13 + 500, 50);

        dialog14 = getTexture('14dialog');
        dialog14.position.set(pw * 14 + 900, 300);
        dialog14.alpha = 0;
        dialog14ques = getTexture('14ques');
        dialog14ques.position.set(pw * 14 + 500, 450);
        dialog14ques.alpha = 0;
        item14 = getTexture('14item');
        item14.position.set(pw * 14 + 500, 50);

        dialog15 = getTexture('15dialog');
        dialog15.position.set(pw * 15 + 900, 300);
        dialog15.alpha = 0;
        dialog15ques = getTexture('15ques');
        dialog15ques.position.set(pw * 15 + 500, 450);
        dialog15ques.alpha = 0;
        item15 = getTexture('15item');
        item15.position.set(pw * 15 + 500, 100);

        thirteenthCon.addChild(
            item13,
            dialog13,
            // 把这3个单独加到总的容器里，因为单独加了desk，导致对话框被遮挡
            // dialog13ques,
            item14,
            dialog14,
            // dialog14ques,
            item15,
            dialog15,
            // dialog15ques
        );
        var sixteenthCon = new Container();
        dialog16 = getTexture('16dialog');
        dialog16.position.set(pw * 16 + 900, 300);
        dialog16.alpha = 0;
        // sixteenthCon.addChild(dialog16);
        // 第17屏
        var seventeenthCon = new Container();
        dialog17 = getTexture('17dialog');
        dialog17.position.set(pw * 17 + 900, 280);
        dialog17.alpha = 0;
        item17 = new PIXI.extras.AnimatedSprite.fromImages([imgPre + '17light.png', imgPre + '17light2.png']);
        item17.animationSpeed = 0.01;
        item17.position.set(pw * 17 + 700, 50);
        // 第18屏 蓝牙
        dialog18 = getTexture('18dialog');
        dialog18.position.set(pw * 18 + 900, 300);
        dialog18.alpha = 0;
        // seventeenthCon.addChild(item17, dialog17, dialog18);
        seventeenthCon.addChild(item17);
        // 单独添加桌面背景
        deskOnly = getTexture('02desk');
        deskOnly.width = pw;
        deskOnly.position.set(pw* 10,473);

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
            location.href = 'https://xaudio-dulife.baidu.com/app/xdv1/index.html';
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
        // 默认是暂停的
        W1Ani.pause();
        // 设置位置
        container.position.set(w, 0);
        // 总的容器添加子容器
        containerChild = new Container();
        // 添加顺序不能反，最外层的在最后
        containerChild.addChild(
            // bgColor,
            firstCon,
            secondCon,
            thirdCon,
            fourthCon,
            fifthCon,
            sixthCon,
            ninthCon,
            eleventhCon,
            twelfthCon,
            thirteenthCon,
            sixteenthCon,
            seventeenthCon,
            deskOnly,
            // 单独拎到这来
            dialog12,
            dialog13ques,
            dialog14ques,
            dialog15ques,
            dialog16
            , dialog17, dialog18,
            nineteenthCon,
            adapter04,
            speaker03,
            package01,
            handHeld,
            rightHand
        );

        container.addChild(containerChild);
        // 因为音箱的层级最高，对话框都要在音箱后面，所以要将音箱层级提高。
        // 注意层级不能超过所有元素的最大值
        // containerChild.setChildIndex(speaker03, 15);
        k = _ / 750;
        // 50%清晰，49%会模糊，所以还是同样比例吧，不单独设置x,y了
        container.scale.set(k, k);
        // container.scale.x = w/pw;
        // container.scale.y= k;
        container.position.set(w, 0);
        // 一定要设置这个才能触发鼠标事件
        container.interactive = !0;
        container.buttonMode = !0;

        // 对containerI容器绑定触摸事件
        // container.on('touchstart', touchStart).on('touchmove', touchMove).on('touchend', touchEnd);

        //   旋转屏幕处理
        s();
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
        (w = window.innerWidth), (_ = window.innerHeight);
        // 宽度小于高度，竖屏，设置loading样式
        $('#loading').css({
            width: w,
            height: _
        });
        w < _
            ? ((k = w / 750), (B = _ / k))
            : //   宽度大于高度，设置loading样式
              ((k = _ / 750), (B = w / k));
    }
    // 确定屏幕旋转角度，根据不同的角度显示不同内容
    function s() {
        console.log(window.orientation, '方向');
        let ori = window.orientation
        if(!ori){
            ori = 0;
        }
        console.log(ori,'ori')
        switch (ori) {
            case 0:
                setTimeout(function() {
                    // 计算图片比例
                    a(), (degree = Math.PI / 2), (container.rotation = degree);
                    pw = _/k;
                    console.log(k, '屏幕比例', w, _, '宽，高');
                    container.scale.set(k, k), W.resize(w, _), container.position.set(w, 0), (S = Ne.__scrollLeft);
                    setTimeout(function() {
                        console.log(container.width, '容器宽度',container._bounds.maxX, '最大宽度');

                        // Ne.setDimensions(w, _, w, 26460 + _), Ne.scrollTo(0, S, !1), (B = _ / k);
                        // Ne.setDimensions(w, _, w, pw * 20 + 100 + _), Ne.scrollTo(0, S, !1), (B = _ / k);
                        Ne.setDimensions(w, _, w, container._bounds.maxX-500), Ne.scrollTo(0, S, !1), (B = _ / k);
                    }, 200);
                }, 300);
                break;
            case -90:
                break;
            case 90:
                setTimeout(function() {
                    // 计算图片比例
                    a(), (degree = 0), (container.rotation = degree);
                    pw = w/k;
                    console.log('执行了90', pw)
                    console.log(k, '屏幕比例', w, _, '宽，高');
                    // container.scale.set(k, k);
                    W.resize(w, _), container.position.set(0, 0), (S = Ne.__scrollTop);
                    setTimeout(function() {
                        console.log(container.width, '容器宽度',container._bounds.maxX, '最大宽度');

                        // Ne.setDimensions(w, _, 26460 + w, _), Ne.scrollTo(S, 0, !1), (B = w / k);
                        // Ne.setDimensions(w, _, pw * 20 +100 + w, _), Ne.scrollTo(S, 0, !1), (B = w / k);
                        Ne.setDimensions(w, _, container._bounds.maxX-500, _), Ne.scrollTo(S, 0, !1), (B = w / k);
                        // v();
                    }, 200);
                }, 300);
                break;
            case 180:
        }
        B = w < _ ? _ / k : w / k;
    }
    // 左手动画
    function handAni(ss, ee, x) {
        handHeld.scale.x = scrollNum(ss, ee, x, 0, 1);
        handHeld.scale.y = scrollNum(ss, ee, x, 0, 1);
        handHeld.rotation = scrollNum(ss, ee, x, 1, 0);
        handHeld.y = scrollNum(ss, ee, x, 850, 30);
        handHeld.alpha = scrollNum(ss, ee, x, 0, 1);
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
        // console.log(start + (top - minNum) / (maxNum - minNum) * (end - start), 'val');
        return val;
    }

    ///////////////////////////
    // Canvas renderer 滑动渐变动作
    var render = function(left, top, zoom) {
        var x, y;
        if(!pw){return;}
        // 0为竖屏，π/2为横屏 90*/180 = π/2
        degree > 0 ? ((x = top), (y = left)) : ((x = left), (y = top));
        // console.log(`坐标：${x.toFixed(1)},${y}, pw:${pw} --  当前屏:${Math.floor(x / pw)}, 余数：${(x % pw).toFixed(1)}`);
        if (x > 0 && x < 640) {
            if (x < 451) {
                // package01.x = scrollNum(0, 450, x, pw / 2 - 150, pw + 220);
                package01.x = scrollNum(0, 450, x, pw / 2 - 150, pw - 500);
                package01.y = scrollNum(0, 450, x, -300, 140);
                package01.scale.x = scrollNum(0, 450, x, 2, 1);
                package01.scale.y = scrollNum(0, 450, x, 2, 1);
            }
            if (x > 451) {
                // package01.position.set(pw + 220, 140);
                package01.position.set(pw - 500, 140);
                package01.scale.x = 1;
                package01.scale.y = 1;
            }
        }
        // 整屏一半到滑出屏幕消失
        if (x > pw / 2 && x < pw + 1000) {
            dialog02.alpha = scrollNum(pw - 400, pw - 390, x, 0, 1);
        } else {
            if(!dialog02)return;
            dialog02.alpha = 0;
        }
        // 修改音箱移出
        // if (x > 600) {
            // pw-500 为停留位置，-250为距离左侧距离
        if (x > pw-500-250 && x< pw + 600) {
            package01.x = x + 250;
        }
        if(x>pw+600){
            dialog02.alpha=0;
        }
        // 第三屏 包装里说明书
        if (x > pw * 1 + 1000 && x < pw * 1 + 1200) {
            card03.y = scrollNum(pw * 1 + 1100, pw * 1 + 1200, x, 750, 500);
            adapter03.alpha = scrollNum(pw * 1 + 1100, pw * 1 + 1200, x, 0, 1);
            adapter03.y = scrollNum(pw * 1 + 1100, pw * 1 + 1200, x, 750, 560);
            dialog03.alpha = scrollNum(pw * 1 + 1100, pw + 1110, x, 0, 1);
        }
        if (x > pw * 2 + 900 && x < pw * 2 + 1000) {
        }

        // 第四屏 提示接通电源,指示灯亮起
        if (x < 3 * pw - 100) {
            dialog04.alpha = 0;
            dialog042.alpha = 0;
            adapter04.alpha = 0;
        }
        if (x > pw + 1200 && x < 3 * pw + 10) {
            adapter03.alpha = 1;
        }
        if (x > pw * 3 - 100 && x < pw * 3 + 200) {
            dialog042.alpha = scrollNum(pw * 3 - 100, pw * 3 - 90, x, 0, 1);

            dialog04.alpha = scrollNum(pw * 3, pw * 3 + 20, x, 0, 1);
            // 不加这个判断会跟第二个对话框一起渐变
            if (x > pw * 3 - 90) {
                dialog042.alpha = 1;
            }
            // 显示插座适配器
            if (x > 3 * pw + 10) {
                adapter04.alpha = 1;
                adapter03.alpha = 0;
            }
            // adapter04.y = scrollNum(pw * 3, pw * 3 + 50, x, 750, 560);
        } else {
        }
        // 未接通电源状态
        if (x < pw * 3 + 40) {
            speaker03.gotoAndStop(0);
        }
        // 节点：接通电源，黑灯换橙色灯。 返回去灯变黑
        if (x > pw * 3 + 40 && x < pw * 4 + 200) {
            speaker03.gotoAndStop(1);
        }

        // 第五屏 扫码下载
        if (x > pw * 4 + 200 && x < pw * 4 + 1000) {
            let ss = pw * 4 + 200,
                ee = pw * 4 + 300;

            handHeld.gotoAndStop(0);
            handAni(ss, ee, x);
            if (x < pw * 4 + 300) {
                dialog05.alpha = 0;
            }
            if (x > pw * 4 + 400 && x < pw * 4 + 720) {
                dialog05.alpha = scrollNum(pw * 4 + 400, pw * 4 + 405, x, 0, 1);
            }
            if (x > pw * 4 + 950) {
                // 下载APP
                handHeld.gotoAndStop(1);
            }
        }
        if(x>pw*4+200 && x< pw*10+900){
            // 变橙色
            speaker03.gotoAndStop(2);

        }
        if (x > pw * 4 + 300 && x< pw * 10) {
            initHandHeld();
        }
        // 扫码完成，切换画面 百度账号输入密码
        if (x > pw * 5 && x < pw * 5 + 1000) {
            dialog06.alpha = scrollNum(pw * 5 + 570, pw * 5 + 575, x, 0, 1);
            // rightHand.alpha = 1;
            // rightHand.y = scrollNum(pw * 5 + 700, pw * 5 + 780, x, 750, 272);
        }
        if (x > pw * 5 + 775 && x < pw * 6 + 700) {
            handHeld.gotoAndStop(2);
            dialog06.alpha = 1;
        }
        if (x < pw * 5 + 770 && x < pw * 6 + 700) {
            // W1Ani.pause();
            rightHand.alpha = 0;
        }
        // 手势改为一直保持在屏幕中
        if (x > pw * 5 + 775 && x < pw * 6 + 250) {
            rightHand.alpha = 1;
            rightHand.position.set(pw * 5 + 1285, 262);
            rightHand.x = x + 500;
            // if (W1Ani.paused) {
            //     W1Ani.play();
            // }
        }
        if (x > pw * 6 + 250 && x < pw * 6 + 710) {
            W1Ani.pause();
            rightHand.alpha = 0;
        }
        // 切换为QQ音乐
        if (x > pw * 6 + 700 && x < pw * 6 + 1000) {
            handHeld.gotoAndStop(3);
            dialog07.alpha = scrollNum(pw * 6 + 700, pw * 6 + 705, x, 0, 1);
        }
        if (x > pw * 6 + 710 && x < pw * 7 + 200) {
            rightHand.position.set(pw * 6 + 1220, 470);
            rightHand.alpha = 1;
            rightHand.x = x + 500;
            // if (W1Ani.paused) W1Ani.play();
        }
        if (x > pw * 7 + 200 
            // && x < pw * 7 + 750
            ) {
            W1Ani.pause();
            rightHand.alpha = 0;
            handHeld.gotoAndStop(3);
        }
        if(x > pw*7+400 && x < pw * 7 + 790){
            handHeld.gotoAndStop(4);
        }
        // QQ音乐APP首页
        if (x > pw * 7 + 720 && x < pw * 7 + 1000) {
            // handHeld.gotoAndStop(4);
            dialog08.alpha = scrollNum(pw * 7 + 720, pw * 7 + 725, x, 0, 1);
            // 设备
            if (x > pw * 7 + 750 && x < pw * 7 + 770) {
                // rightHand.position.set(pw * 8 + 20, 100);
                // rightHand.alpha = 1;
                // if (W1Ani.paused) W1Ani.play();
            }
        }
        // 中间间隙
        if (x > pw * 7 + 770 && x < pw * 7 + 790) {
            rightHand.alpha = 0;
            W1Ani.pause();
        }
        // 添加设备
        if (x > pw * 7 + 790 && x < pw * 8 + 700) {
            handHeld.gotoAndStop(5);
            // 添加设备
            if (x > pw * 7 + 790 && x < pw * 8 + 200) {
                rightHand.alpha = 1;
                rightHand.position.set(pw * 8 + 10, 140);
                rightHand.x = x + 550;
                // if (W1Ani.paused) {
                //     W1Ani.play();
                // }
            }
        }
        if (x > pw * 8 + 700) {
            handHeld.gotoAndStop(6);
        }
        // wifi输入框
        if (x > pw * 8 + 200 && x < pw * 8 + 800) {
            rightHand.alpha = 0;
            W1Ani.pause();
            dialog09.alpha = scrollNum(pw * 8 + 510, pw * 8 + 615, x, 0, 1);
        }

        // 输入框手势
        if (x > pw * 8 + 620 && x < pw * 9 + 200) {
            dialog09.alpha = 1;
            if(x> pw*8+700){
                rightHand.position.set(pw * 8 + 1300, 300);
                rightHand.x = x + 500;
                rightHand.alpha = 1;
                // if (W1Ani.paused) {
                //     W1Ani.play();
                // }
            }
            
        }
        // TODO wifi输入框手✋
        if (x > pw * 9 + 200 && x < pw * 9 + 300) {
            rightHand.alpha = 0;
            W1Ani.pause();
        }
        // 配网中
        if (x > pw * 9 + 300 && x < pw * 9 + 420) {
            handHeld.gotoAndStop(7);
        }
        if (x > pw * 9 + 400 && x < pw * 9 + 800) {
            // handHeld.gotoAndStop(8);
            dialog10.alpha = scrollNum(pw * 9 + 520, pw * 9 + 525, x, 0, 1);
        }
        if (x > pw * 9 + 420 && x < pw * 10 + 900) {
            handHeld.gotoAndStop(8);
            handHeld.alpha = 1;
            rightHand.position.set(pw*9+450,440);
            rightHand.x = x+500;
            rightHand.alpha = 1;
        }
        if (x < pw * 10 + 900) {
            wifiSuccessBg.alpha = 0;
        }
        // 配网成功，小熊
        if (x > pw * 10 + 900 && x < pw * 10 + 1300) {
            rightHand.alpha = 0;
            wifiSuccessBg.alpha = scrollNum(pw * 10 + 900, pw * 10 + 930, x, 0, 1);
            // 750是页面高度，刚开始在最底下，350是要移动到的高度
            // if (x > pw * 10 + 1200) {
            //     banner11.alpha = 1;
            // }
            // banner11.y = scrollNum(pw * 10 + 1200, pw * 10 + 1220, x, -10, 0);
            // bear11.y = scrollNum(pw * 10 + 1000, pw * 10 + 1050, x, 750, 280);
            // if (x > pw * 10 + 1220) {
            //     banner11.y = 0;
            // }
            // dialog11.alpha = scrollNum(pw * 10 + 1250, pw * 10 + 1260, x, 0, 1);
            dialog11.alpha = scrollNum(pw * 10 + 1000, pw * 10 + 1010, x, 0, 1);
            if (x > pw * 10 + 900) {
                // 隐藏左手
                handHeld.alpha = 0;
            }
        }
        // if (x > pw * 11 + 150 && x < pw * 11 + 300) {
        //     banner11.y = scrollNum(pw * 11 + 150, pw * 11 + 170, x, 0, -70);
        // }
        // 处理左上角和右上角的元素
        if (x < pw * 10 + 900) {
            bg2Wifi.gotoAndStop(0);
            bg2Text.gotoAndStop(0);
            bg2Text.alpha = 1;
            bg2Wifi.alpha = 1;
        }
        if (x > pw * 10 + 900 && x < pw * 18) {
            if (x < pw * 11 + 900 && x <pw * 11 + 900) {
                bg2Text.alpha = 0;
                bg2Wifi.alpha = 0;
            }
            // 处理左上角和右上角的元素
            bg2Wifi.gotoAndStop(1);
            bg2Text.gotoAndStop(1);
            // 音箱再变蓝色
            speaker03.gotoAndStop(1);
        }
        // 听遇见
        if (x > pw * 11 + 700 && x < pw * 13) {
            // 隐藏配网成功背景
            wifiSuccessBg.alpha = scrollNum(pw * 11 + 900, pw * 11 + 920, x, 1, 0);
            bg2Text.alpha = scrollNum(pw * 11 + 900, pw * 11 + 920, x, 0, 1);
            bg2Wifi.alpha = scrollNum(pw * 11 + 900, pw * 11 + 920, x, 0, 1);
            music12.alpha = scrollNum(pw * 11 + 900, pw * 11 + 910, x, 0, 1);
            music12.y = scrollNum(pw * 11 + 800, pw * 11 + 980, x, 750, 50);
            dialog12.alpha = scrollNum(pw * 11 + 1280, pw * 11 + 1290, x, 0, 1);
            dialog12yujian.alpha = scrollNum(pw * 11 + 1200, pw * 11 + 1210, x, 0, 1);
        }
        // ⏰闹钟
        if (x > pw * 12 && x < pw * 13 + 100) {
            item13.y = scrollNum(pw * 12 + 600, pw * 12 + 950, x, 750, 105);
            dialog13.alpha = scrollNum(pw * 13 + 30, pw * 13 + 35, x, 0, 1);
            dialog13ques.alpha = scrollNum(pw * 13 + 75, pw * 13 + 80, x, 0, 1);
        }

        // 极客模式
        if (x > pw * 13 + 100 && x < pw * 14 + 100) {
            item14.y = scrollNum(pw * 13 + 1000, pw * 13 + 1250, x, 750, 50);
            dialog14.alpha = scrollNum(pw * 14 + 10, pw * 14 + 15, x, 0, 1);
            dialog14ques.alpha = scrollNum(pw * 14 + 60, pw * 14 + 65, x, 0, 1);
        }

        // 儿童模式
        if (x > pw * 14 + 100 && x < pw * 15 + 100) {
            item15.y = scrollNum(pw * 14 + 1100, pw * 14 + 1250, x, 750, 120);
            dialog15.alpha = scrollNum(pw * 15 + 10, pw * 15 + 15, x, 0, 1);
            dialog15ques.alpha = scrollNum(pw * 15 + 60, pw * 15 + 65, x, 0, 1);
        }
        // 单独处理手持手机
        if (x > pw * 10 + 1300 && x < pw * 16 + 300) {
            handHeld.alpha = 0;
        }
        if (x > pw * 16 + 300 && x < pw * 16 + 400) {
            handAni(pw * 16 + 300, pw * 16 + 400, x);
        }
        if(x>pw * 16+400 && x < pw*16+1200){
            initHandHeld();
        }
        if (x > pw * 16 && x < pw * 17) {
            dialog16.alpha = scrollNum(pw * 16 + 180, pw * 16 + 185, x, 0, 1);
            handHeld.gotoAndStop(9);
        }
        // 台灯
        if (x > pw * 16 + 1200 && x < pw * 18) {
            handHeld.gotoAndStop(9);
            handHeld.alpha = scrollNum(pw * 16 + 1200, pw * 16 + 1300, x, 1, 0);
            item17.play();
            if (x > pw * 16 + 1220) {
                dialog17.alpha = scrollNum(pw * 17 + 50, pw * 17 + 55, x, 0, 1);
            }
        }
        // 蓝牙
        if (x > pw * 18 && x < pw * 19) {
            handHeld.gotoAndStop(10);
            bg2Text.gotoAndStop(2);
            bg2Wifi.gotoAndStop(2);
            dialog18.alpha = scrollNum(pw * 18 + 350, pw * 18 + 355, x, 0, 1);
            if (x > pw * 18 + 400 && x < pw * 18 + 500) {
                handHeld.gotoAndStop(10);
                handAni(pw * 18 + 400, pw * 18 + 500, x);
            }
            if (x > pw * 18 + 500) {
                initHandHeld();
            }
            if(x>pw*18+900){
                handHeld.alpha = scrollNum(pw * 18 + 900, pw * 18 + 950, x, 1, 0);
            }
        }
        bgPic.x = 1 * x;
        if (x > pw) {
            bgPic.x = 1 * x;
            // 到最后要一起消失
            if (x < pw * 18 + 900) {
                bg2Wifi.x = 1 * x + 30;
                bg2Text.x = 1 * x + 1 * pw - 390;
            }
        }
        if (x < pw + 600) {
            speaker03.alpha = 0;
            package01.alpha = 1;
        }
        if (x > pw + 600 && x < 4 * pw) {
            // package01.alpha = scrollNum(pw + 600, pw + 630, x, 1, 0);
            speaker03.alpha = scrollNum(pw + 600, pw + 630, x, 0, 1);
            speaker03.x = x + 320;
            adapter03.x = 1 * x + 50;
            if (x > 3 * pw - 90) {
                adapter04.x = 1 * x - 20;
            }
        }
        // 音箱,电源线固定在屏幕
        if (x > 4 * pw && x < pw * 18 + 450) {
            speaker03.x = scrollNum(4 * pw, 4 * pw + 200, x, 1 * x + 320, 1 * x + 90);
            // 到要展示手势时，音箱及插线板向左移动
            adapter04.x = scrollNum(4 * pw, 4 * pw + 200, x, 1 * x - 20, 1 * x - 300);
        }
        if (x > 4 * pw + 510) {
            handHeld.x = 1 * x - 20;
        }
        if (x > pw * 10 + 900) {
            wifiSuccessBg.x = 1 * x;
            deskOnly.x = x;
        }

        // (container.position.x = -x), (container.position.y = -y);
        (containerChild.position.x = -x), (containerChild.position.y = -y);
    };

    // 滑动过快，左手无法复原，根据坐标，超过，直接复原
    function initHandHeld() {
        handHeld.rotation = 0;
        handHeld.scale.x = 1;
        handHeld.scale.y = 1;
        // handHeld.scale.x = 4;
        // handHeld.scale.y = 4;
        handHeld.alpha = 1;
        handHeld.y = 30;
    }
    var touching = !1;
    // 初始化滚动插件
    const Ne = new Scroller(render, {
        zooming: !1,
        zooming: !0,
        bouncing: !1,
        animationDuration: 1e3
    });
    Ne.__enableScrollY = !0;

    // 事件监听~~
    
    var mousedown = false;
    document.addEventListener("touchstart", function(e) {
        Ne.doTouchStart(e.touches, e.timeStamp);
        mousedown = true;
    }, false);

    document.addEventListener("touchmove", function(e) {
        if (!mousedown) {
            return;
        }
        Ne.doTouchMove(e.touches, e.timeStamp);
        mousedown = true;
    }, false);

    document.addEventListener("touchend", function(e) {
        if (!mousedown) {
            return;
        }
        Ne.doTouchEnd(e.timeStamp);
        mousedown = false;
    }, false);


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
