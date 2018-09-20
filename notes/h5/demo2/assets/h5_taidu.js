var shareData,scrollDirection = "left",scrollPro = 0,wrap = $('.main'),ww = window.innerWidth,wh = window.innerHeight,shayuPlay = false,loader;
var imgArr = [
    "img/part1/biao.png?v=1",
    "img/part1/talk.png",
    "img/part1/title.png",
    "img/part1/zhen1.png",
    "img/part1/zhen2.png",
    "img/part1/hand.png",

    "img/part2/hole2.png",
    "img/part2/holebg.png",
    "img/part2/t1.png?v=1",
    "img/part2/t2.png?v=1",
    "img/part2/t3.png?v=1",

    "img/part3/air1.png",
    "img/part3/air2.png",
    "img/part3/cat.png",
    "img/part3/chongzi.png",
    "img/part3/date.png",
    "img/part3/girl.png?v=1",
    "img/part3/muogu.png",
    "img/part3/shanleft.png",
    "img/part3/shanright.png",
    "img/part3/blackBg.png?v=2",
    "img/part3/cloud.png",
    "img/part3/senlin.png?v=1",
    "img/part3/wave.png",
    "img/part3/talk.png",
    "img/part3/talk2.png",
    "img/part3/tree1.png",
    "img/part3/tree2.png",
    "img/part3/y.png",
    "img/part3/y1.png",
    "img/part3/y2.png",
    "img/part3/y3.png",
    "img/part3/z.png?v=1",
    "img/part3/z1.png",
    "img/part3/z2.png",
    "img/part3/z3.png",
    "img/part3/z4.png",
    "img/part3/z5.png",
    "img/part3/z6.png",
    "img/part3/z7.png",
    "img/part3/z8.png",
    "img/part3/z9.png",

    "img/part4/bigMoonBg.png",
    "img/part4/boom.png",
    "img/part4/date.png",
    "img/part4/k0.png",
    "img/part4/k1.png",
    "img/part4/k2.png",
    "img/part4/k3.png",
    "img/part4/k4.png",
    "img/part4/k5.png",
    "img/part4/k6.png",
    "img/part4/k7.png",
    "img/part4/m0.png",
    "img/part4/m1.png",
    "img/part4/m2.png",
    "img/part4/m3.png",
    "img/part4/m4.png",
    "img/part4/m5.png",
    "img/part4/p1.png?v=1",
    "img/part4/p2.png?v=1",
    "img/part4/p3.png?v=1",
    "img/part4/p4.png",
    "img/part4/talk.png",
    "img/part4/zidan-end.png",
    "img/part4/zidan0.png",
    "img/part4/zidan1.png",
    "img/part4/zidan2.png",
    "img/part4/zidan3.png",
    "img/part4/zidan4.png",
    "img/part4/s1.png",
    "img/part4/s2.png",
    "img/part4/s3.png",
    "img/part4/liuxing.png?v=2",

    "img/part5/bg.png?v=1",
    "img/part5/date.png",
    "img/part5/stone1.png",
    "img/part5/stone2.png",
    "img/part5/talk.png",
    "img/part5/yhy.png",
    "img/part5/zidan1.png",
    "img/part5/zidan2.png",

    "img/part15/btn.png",
    "img/part15/eq.png?v=1",
    "img/part15/finger.png",
    "img/part15/logo.png",
    "img/part15/news.png",
    "img/part15/news-btn.png",
    "img/part15/talk.png?v=1",

    "img/part6/s1.png",
    "img/part6/s2.png",
    "img/part6/s3.png?v=2",
    "img/part6/s4.png?v=1",
    "img/part6/s5.png",
    "img/part6/circle.png",
    "img/part6/date.png",
    "img/part6/fish-bottom3.png",
    "img/part6/fish.png",
    "img/part6/j0.png?v=1",
    "img/part6/j1.png",
    "img/part6/j10.png",
    "img/part6/j11.png",
    "img/part6/j12.png",
    "img/part6/j13.png",
    "img/part6/j14.png",
    "img/part6/j2.png",
    "img/part6/j3.png",
    "img/part6/j4.png",
    "img/part6/j5.png",
    "img/part6/j6.png",
    "img/part6/j7.png",
    "img/part6/j8.png",
    "img/part6/j9.png",
    "img/part6/l0.png?v=1",
    "img/part6/l1.png",
    "img/part6/l10.png",
    "img/part6/l11.png",
    "img/part6/l12.png",
    "img/part6/l13.png",
    "img/part6/l14.png",
    "img/part6/l15.png",
    "img/part6/l16.png",
    "img/part6/l17.png",
    "img/part6/l18.png",
    "img/part6/l19.png",
    "img/part6/l2.png",
    "img/part6/l20.png",
    "img/part6/l21.png",
    "img/part6/l22.png",
    "img/part6/l23.png",
    "img/part6/l24.png",
    "img/part6/l25.png",
    "img/part6/l26.png",
    "img/part6/l27.png",
    "img/part6/l3.png",
    "img/part6/l4.png",
    "img/part6/l5.png",
    "img/part6/l6.png",
    "img/part6/l7.png",
    "img/part6/l8.png",
    "img/part6/l9.png",
    "img/part6/mao-bottom.png",
    "img/part6/mao-top.png",
    "img/part6/muou.png",
    "img/part6/pao1.png",
    "img/part6/pao2.png",
    "img/part6/talk.png",
    "img/part6/part7Mask.png",

    "img/part7/b1.png",
    "img/part7/b2.png",
    "img/part7/b3.png",
    "img/part7/b4.png",
    "img/part7/bg.png",
    "img/part7/bizi.png",
    "img/part7/date.png",
    "img/part7/face.png?v=1",
    "img/part7/line.png",
    "img/part7/s1.png",
    "img/part7/s2.png",
    "img/part7/s3.png",
    "img/part7/talk.png",
    "img/part7/talk2.png",

    "img/part8/b1.png",
    "img/part8/b2.png",
    "img/part8/b3.png",
    "img/part8/b4.png",
    "img/part8/b5.png",
    "img/part8/b6.png",
    "img/part8/b7.png",
    "img/part8/bg-yun.png",
    "img/part8/bird1.png",
    "img/part8/bird2.png",
    "img/part8/boat.png",
    "img/part8/long0.png",
    "img/part8/long1.png",
    "img/part8/long2.png",
    "img/part8/long3.png",
    "img/part8/long4.png",
    "img/part8/p1-bg.png",
    "img/part8/p1.png",
    "img/part8/person-bg.png",
    "img/part8/s1.png",
    "img/part8/s2.png",
    "img/part8/s3.png",
    "img/part8/s4.png",
    "img/part8/s5.png",
    "img/part8/s6.png",
    "img/part8/s7.png",
    "img/part8/stone.png",
    "img/part8/talk1.png",
    "img/part8/talk2.png",

    "img/part9/bg.png",
    "img/part9/boat-mask.png?v=1",
    "img/part9/boat.png",
    "img/part9/cat.png",
    "img/part9/date.png",
    "img/part9/date2.png",
    "img/part9/date3.png",
    "img/part9/ge1.png",
    "img/part9/ge2.png",
    "img/part9/ge3.png",
    "img/part9/ge4.png",
    "img/part9/ge5.png",
    "img/part9/hand0.png",
    "img/part9/hand1.png",
    "img/part9/hand2.png",
    "img/part9/hand3.png",
    "img/part9/hand4.png",
    "img/part9/hand5.png",
    "img/part9/hand6.png",
    "img/part9/hand7.png",
    "img/part9/house.png",
    "img/part9/luzi.png",
    "img/part9/pai.png",
    "img/part9/person.png",
    "img/part9/talk.png?v=1",
    "img/part9/talk2.png",
    "img/part9/w1.png",
    "img/part9/w2.png",
    "img/part9/w3.png",
    "img/part9/w4.png",
    "img/part9/w5.png",
    "img/part9/w6.png",
    "img/part9/w7.png",
    "img/part9/wave1.png",
    "img/part9/wave2.png?v=1",
    "img/part9/wushi1.png",
    "img/part9/wushi2.png",

    "img/part10/date.png",
    "img/part10/h0.png",
    "img/part10/h1.png",
    "img/part10/h10.png",
    "img/part10/h11.png",
    "img/part10/h12.png",
    "img/part10/h13.png",
    "img/part10/h14.png",
    "img/part10/h15.png",
    "img/part10/h16.png",
    "img/part10/h17.png",
    "img/part10/h18.png",
    "img/part10/h19.png",
    "img/part10/h2.png",
    "img/part10/h20.png",
    "img/part10/h21.png",
    "img/part10/h22.png",
    "img/part10/h23.png",
    "img/part10/h24.png",
    "img/part10/h25.png",
    "img/part10/h26.png",
    "img/part10/h27.png",
    "img/part10/h28.png",
    "img/part10/h29.png",
    "img/part10/h3.png",
    "img/part10/h30.png",
    "img/part10/h31.png",
    "img/part10/h32.png",
    "img/part10/h33.png",
    "img/part10/h34.png",
    "img/part10/h35.png",
    "img/part10/h36.png",
    "img/part10/h4.png",
    "img/part10/h5.png",
    "img/part10/h6.png",
    "img/part10/h7.png",
    "img/part10/h8.png",
    "img/part10/h9.png",
    "img/part10/haiMask.png",
    "img/part10/haiyan.png",
    "img/part10/haiyan2.png",
    "img/part10/talk.png",
    "img/part10/pao.png",
    "img/part10/stone1.png",
    "img/part10/stone2.png",
    "img/part10/tu1.png",
    "img/part10/tu2.png",
    "img/part10/tu3.png",
    "img/part10/wave1.png",
    "img/part10/wave2.png",
    "img/part10/wave3.png",
    "img/part10/z1.png",
    "img/part10/z10.png",
    "img/part10/z11.png",
    "img/part10/z12.png",
    "img/part10/z13.png",
    "img/part10/z14.png",
    "img/part10/z15.png",
    "img/part10/z16.png",
    "img/part10/z17.png",
    "img/part10/z2.png",
    "img/part10/z3.png",
    "img/part10/z4.png",
    "img/part10/z5.png",
    "img/part10/z6.png",
    "img/part10/z7.png",
    "img/part10/z8.png",
    "img/part10/z9.png",

    "img/part11/boom-bottom.png",
    "img/part11/boom-center.png?v=1",
    "img/part11/boom-fish.png",
    "img/part11/boom-left.png",
    "img/part11/boom-right.png",
    "img/part11/boom-top.png",
    "img/part11/f1.png",
    "img/part11/f10.png",
    "img/part11/f2.png",
    "img/part11/f3.png",
    "img/part11/f4.png",
    "img/part11/f5.png",
    "img/part11/f6.png",
    "img/part11/f7.png",
    "img/part11/f80.png",
    "img/part11/f81.png",
    "img/part11/f82.png",
    "img/part11/f83.png",
    "img/part11/f84.png",
    "img/part11/f85.png",
    "img/part11/f9.png",
    "img/part11/stone1.png",
    "img/part11/stone2.png",

    "img/part12/bg.png",
    "img/part12/black.png",
    "img/part12/date0.png",
    "img/part12/date1.png",
    "img/part12/date10.png",
    "img/part12/date11.png",
    "img/part12/date2.png",
    "img/part12/date3.png",
    "img/part12/date4.png",
    "img/part12/date5.png",
    "img/part12/date6.png",
    "img/part12/date7.png",
    "img/part12/date8.png",
    "img/part12/date9.png",
    "img/part12/person.png",
    "img/part12/talk.png",
    "img/part12/date.png",

    "img/part13/circle.png",
    "img/part13/circle2.png",
    "img/part13/line.png",
    "img/part13/line2.png",
    "img/part13/liuxing.png",
    "img/part13/maskmask.png",
    "img/part13/maskmask2.png",
    "img/part13/p1-bg.png",
    "img/part13/p1-girl.png",
    "img/part13/p1-top.png",
    "img/part13/p2-bg.png?v=1",
    "img/part13/p2-girl.png",
    "img/part13/p2-top.png",
    "img/part13/q0.png",
    "img/part13/q1.png",
    "img/part13/q2.png",
    "img/part13/q3.png",
    "img/part13/q4.png",
    "img/part13/q5.png",
    "img/part13/q6.png",
    "img/part13/q7.png",
    "img/part13/q8.png",
    "img/part13/q9.png",
    "img/part13/talk.png",
    "img/part13/tkbg.png",
    "img/part13/tkbg2.png",
    "img/part13/tkp1.png",
    "img/part13/xq1.png",
    "img/part13/xq2.png",
    "img/part13/xq3.png",
    "img/part13/xq4.png",
    "img/part13/xq5.png",

    "img/part14/date.png",
    "img/part14/etbg.png",
    "img/part14/etlight.png?v=1",
    "img/part14/hand0.png",
    "img/part14/hand1.png",
    "img/part14/hand2.png",
    "img/part14/hand3.png",
    "img/part14/hand4.png",
    "img/part14/m1.png",
    "img/part14/m10.png",
    "img/part14/m11.png",
    "img/part14/m12.png",
    "img/part14/m13.png",
    "img/part14/m14.png",
    "img/part14/m15.png",
    "img/part14/m16.png",
    "img/part14/m17.png",
    "img/part14/m18.png",
    "img/part14/m19.png",
    "img/part14/m2.png",
    "img/part14/m20.png",
    "img/part14/m21.png",
    "img/part14/m3.png",
    "img/part14/m4.png",
    "img/part14/m5.png",
    "img/part14/m6.png",
    "img/part14/m7.png",
    "img/part14/m8.png",
    "img/part14/m9.png",
    "img/part14/y1.png",
    "img/part14/y2.png",
    "img/part14/y3.png",
    "img/part14/y4.png",
    "img/part14/y5.png",
    "img/part14/y6.png"
    // "img/part14/y7.png"
];
var imgArr2 = [
    "img/part14/y7.png"
];
// 横屏内容长度
var lastWidth = $(window).height();
var contentLength = 47740+1400+lastWidth;
// 音乐播放
var musicOn = true;
var loadThenFlag = false;
//防止屏幕移动
$(document).bind("touchmove",function(e){
    e.preventDefault();
});

$(function(){
    // loading图片加载
    var loadingImg = new Image();
    loadingImg.src = "img/loading.png";
    loadingImg.onload = function(){
        // pixi初始化
        pixiFn();
        // 调整画布位置和大小初始化
        changeScene();
        window.onresize = function(){
            changeScene();
        };
        // 分享
        shareFn();
    }
});

function init(){
    titleHandTween.play();
    setTimeout(function(){
        $(".loading-wrap").fadeOut(600);
    },10);
    changeScene();
    scrollBegin();
    scroller.setDimensions(app.view.width, app.view.height, app.view.height, contentLength);
    $(".music").on("click",function(){
       if(!loader.resources.bgm.sound.isPlaying){
           // 播放
           musicPlay();
           loader.resources.bgm.sound.play();
           $(".music").removeClass("off");
       } else{
           // 暂停
           musicPause();
           $(".music").addClass("off");
       }
    });

    // 新闻客户端
    if(netease.ua.newsapp){
        $(".eq").fadeOut();
        $(".newsBtn").fadeIn();
    }

    // 分步加载
    loadThen();

    // 跳转按钮效果
    $(".uploadBtn").on("click",function(){
        $(".uploadBtn").addClass("ani");
        neteaseTracker(false,'//minisite.click.163.com/2018/0120/taidu/uploadBtn', '跳转上传页按钮', 'minisiteclick');
        setTimeout(function(){
            window.location.href = "//go.163.com/2018/0120/taidu-upload/index.html";
        },250);

    });
}

function loadThen(){
    loader2 = new PIXI.loaders.Loader();
    loader2.add("haoqi2","audio/2haoqi.mp3")
        .add("shuye","audio/shuye.mp3")
        .add("yexu3","audio/3yexu.mp3")
        .add("boom","audio/boom.mp3")
        .add("wulun4","audio/4wulun.mp3")
        .add("boom2","audio/boom.mp3")
        .add("wodou5","audio/5wodou.mp3")
        .add("ruguo6","audio/6ruguo.mp3")
        .add("pao","audio/pao.mp3")
        .add("fangxin7","audio/7fangxin.mp3")
        .add("nihui8","audio/8nihui.mp3")
        .add("huiyou9","audio/9huiyou.mp3")
        .add("ge1","audio/ge1.mp3")
        .add("ge2","audio/ge2.mp3")
        .add("nihui10","audio/10nihui.mp3")
        .add("wave","audio/wave.mp3?v=1")
        .add("wave2","audio/wave.mp3?v=1")
        .add("nishi11","audio/11nishi.mp3")
        .add("shui","audio/shui.mp3")
        .add("koushao","audio/koushao.mp3")
        .add("jiusuan12","audio/12jiusuan.mp3")
        .add("fenghua","audio/fenghua.mp3")
        .add("paopao","audio/paopao.mp3")
        .add("jiusuan13","audio/13jiusuan.mp3")
        .add("yihuo14","audio/14yihuo.mp3")
        .add("zao","audio/zao.mp3")
        .add("zhizhi15","audio/15zhizhi.mp3")
        .add("zaizhe16","audio/16zaizhe.mp3")
        .add("bo","audio/bo.mp3")
        .add("click0","audio/click.mp3")
        .add("liuxing1","audio/liuxing.mp3")
        .add("liuxing2","audio/liuxing.mp3")
        .add("liuxing3","audio/liuxing.mp3")
        .add("liuxing4","audio/liuxing.mp3")
        .add(imgArr2);

    loader2.load(function(loader){
        loader.resources.pao.sound.loop = true;
        loader.resources.paopao.sound.loop = true;
        loader.resources.zao.sound.loop = true;
        loader.resources.bo.sound.loop = true;
        loader.resources.wave.sound.loop = true;
        loader.resources.wave2.sound.loop = true;

        loadThenFlag = true;
    });
}

function musicPlay() {
    musicOn = true;
}

function musicPause(){
    musicOn = false;
    loader.resources.bgm.sound.pause();
    loader.resources.nishuo1.sound.pause();
    loader.resources.dida.sound.pause();
    if(loadThenFlag){
        loader2.resources.haoqi2.sound.pause();
        loader2.resources.shuye.sound.pause();
        loader2.resources.yexu3.sound.pause();
        loader2.resources.boom.sound.pause();
        loader2.resources.boom2.sound.pause();
        loader2.resources.wulun4.sound.pause();
        loader2.resources.wodou5.sound.pause();
        loader2.resources.ruguo6.sound.pause();
        loader2.resources.pao.sound.pause();
        loader2.resources.fangxin7.sound.pause();
        loader2.resources.nihui8.sound.pause();
        loader2.resources.huiyou9.sound.pause();
        loader2.resources.ge1.sound.pause();
        loader2.resources.ge2.sound.pause();
        loader2.resources.nihui10.sound.pause();
        loader2.resources.wave.sound.pause();
        loader2.resources.wave2.sound.pause();
        loader2.resources.nishi11.sound.pause();
        loader2.resources.shui.sound.pause();
        loader2.resources.koushao.sound.pause();
        loader2.resources.jiusuan12.sound.pause();
        loader2.resources.fenghua.sound.pause();
        loader2.resources.paopao.sound.pause();
        loader2.resources.jiusuan13.sound.pause();
        loader2.resources.yihuo14.sound.pause();
        loader2.resources.zao.sound.pause();
        loader2.resources.zhizhi15.sound.pause();
        loader2.resources.zaizhe16.sound.pause();
        loader2.resources.bo.sound.pause();
        loader2.resources.click0.sound.pause();
        loader2.resources.liuxing1.sound.pause();
        loader2.resources.liuxing2.sound.pause();
        loader2.resources.liuxing3.sound.pause();
        loader2.resources.liuxing4.sound.pause();
    }
}

function pixiFn(){
    app = new PIXI.Application(1040, 640, {
        backgroundColor: '0xffffff'
    });
    $(".main").append(app.view);
    // display
    app.stage.displayList = new PIXI.DisplayList();
    var index1 = new PIXI.DisplayGroup(1, false);

    // 预加载
    loader = new PIXI.loaders.Loader();
    loader.add("bgm","audio/bgm.mp3?v=1")
        .add("nishuo1","audio/1nishuo.mp3")
        .add("dida","audio/dida.mp3")
        .add(imgArr)
        .onProgress.add(function(e){
        $(".loading-num").text(Math.round(e.progress) + '%');
    });

    container = new PIXI.Container();
    container.interactive = true;

    titleContainer = new PIXI.Container();
    titleContainer.x = 0;
    titleContainer.y = 0;
    // titleContainer.interactive = true;

    titleStart = createSprite("img/part1/title.png",{
       x:($(window).height()-541)/2,
       // y:($(window).width()-281)/2
       y:276
    });

    // 手
    titleHand = createSprite("img/part1/hand.png",{
        x:($(window).height()-83)/2+65,
        y:350
    });

    titleHandTween = TweenMax.fromTo(titleHand,1.5,{x:(($(window).height()-83)/2+65)},{x:(($(window).height()-83)/2-65),ease:Linear.easeNone}).repeat(-1);
    titleHandTween.pause();

    titleContainer.addChild(titleStart,titleHand);
    $(".main").on("touchstart",function(){
        TweenMax.fromTo(titleContainer,0.4,{alpha:1},{alpha:0,onComplete:function(){
            titleContainer.visible = false;
            titleHandTween.pause();
        }});
    });

    loader.load(function(loader){

        loader.resources.bgm.sound.loop = true;
        loader.resources.bgm.sound.autoplay = true;
        loader.resources.bgm.sound.play();
        loader.resources.dida.sound.loop = true;

        // 第一部分
        part1 = new PIXI.Container();
        part1.x = 500;
        part1.y = 0;
        part1.width = 3408;
        // 怀表
        var part1BiaoCont = new PIXI.Container();
        part1BiaoCont.x = 0;
        part1BiaoCont.y = 205;
        part1BiaoBg = createSprite("img/part1/biao.png?v=1",{
            x:0,
            y:0
        });
        // 指针1
        part1Zhen1 = createSprite("img/part1/zhen1.png",{
            x:3287-9,
            y:115+59
        });
        part1Zhen1.pivot.x = -9;
        part1Zhen1.pivot.y = 59;
        // 指针2
        part1Zhen2 = createSprite("img/part1/zhen2.png",{
            x:3283-5,
            y:174
        });
        part1Zhen2.pivot.x = -5;
        part1Zhen2.pivot.y = 0;
        part1BiaoCont.addChild(part1BiaoBg,part1Zhen1,part1Zhen2);
        // 怀表遮罩
        part1BiaoMaskCont = new PIXI.Container();
        part1BiaoMaskCont.x = 0;
        part1BiaoMaskCont.y = 0;
        part1BiaoMaskCont.pivot.x = 0;
        part1BiaoMaskCont.scale.x = 0;
        var part1BiaoMask = new PIXI.Graphics();
        part1BiaoMask.beginFill("0xOFOFOF","0.5");
        part1BiaoMask.drawRect(0,0,3744,640);
        part1BiaoMask.endFill();
        part1BiaoMaskCont.addChild(part1BiaoMask);

        part1BiaoCont.mask = part1BiaoMask;
        // 跳进兔子洞里 会邂逅一段奇妙之旅吗
        part1Talk = createSprite("img/part1/talk.png",{
            x:3010+100,
            y:91
        });

        part1.addChild(part1BiaoCont,part1BiaoMaskCont,part1Talk);
        // 第二场景 时间隧道
        part2 = new PIXI.Container();
        part2.x = 3571;
        part2.y = 0;

        part2HoleCont = new PIXI.Container();
        part2HoleCont.x = 0+1072;
        part2HoleCont.y = -782+85+1014;
        part2HoleCont.pivot.x = 1072;
        part2HoleCont.pivot.y = 1014;
        part2HoleCont.scale.x = 0.4;
        part2HoleCont.scale.y = 0.4;

        var part2HoleBg = createSprite("img/part2/hole2.png",{
            x:0,
            y:0
        });
        part2HoleBg.width = 2268;
        part2HoleBg.height = 2182;

        part2HoleHole = createSprite("img/part2/holebg.png",{
            x:1072,
            y:1014
        });
        part2HoleHole.pivot.set(1072,1014);

        // 时间隧道物件 漏斗
        part1HoleThing1 = createSprite("img/part2/t1.png?v=1",{
            x:884+188,
            y:761+253
        });
        part1HoleThing1.pivot.x = 188;
        part1HoleThing1.pivot.y = 253;
        part1HoleThing1.scale.x = 0.4;
        part1HoleThing1.scale.y = 0.4;

        // 地球仪
        part1HoleThing2 = createSprite("img/part2/t2.png?v=1",{
            x:884+188,
            y:761+253
        });
        part1HoleThing2.pivot.x = 188;
        part1HoleThing2.pivot.y = 253;
        part1HoleThing2.scale.x = 0.2;
        part1HoleThing2.scale.y = 0.2;

        // 扑克
        part1HoleThing3 = createSprite("img/part2/t3.png?v=1",{
            x:884+188,
            y:761+253
        });
        part1HoleThing3.pivot.x = 188;
        part1HoleThing3.pivot.y = 253;
        part1HoleThing3.scale.x = 0.5;
        part1HoleThing3.scale.y = 0.5;
        part1HoleThing3.rotation = 2;

        part2HoleCont.addChild(part2HoleHole,part2HoleBg,part1HoleThing1,part1HoleThing2,part1HoleThing3);
        part2.addChild(part2HoleCont);
        // 第三场景
        part3 = new PIXI.Container();
        part3.x = 3571+551+10;//4132
        part3.y = 0;

        var part3Cont = new PIXI.Container();
        part3Cont.x = 0;
        part3Cont.y = 0;

        part3Bg = new PIXI.Graphics();
        part3Bg.beginFill("0xFFFFFF",1);
        part3Bg.drawRect(-100,0,1500,640);
        part3Bg.endFill();

        part3BgBlack = new PIXI.Graphics();
        part3BgBlack.beginFill("0x000000",1);
        part3BgBlack.drawRect(-100,0,1500,640);
        part3BgBlack.endFill();

        part3Bg1 = new PIXI.Graphics();
        part3Bg1.beginFill("0xFFFFFF",1);
        part3Bg1.drawRect(-100,0,1500,640);
        part3Bg1.endFill();

        part3Bg2 = new PIXI.Graphics();
        part3Bg2.beginFill("0xFFFFFF",1);
        part3Bg2.drawRect(-100,0,1500,640);
        part3Bg2.endFill();

        // 第三场景 山后的黑色背景
        part3BlackBg = createSprite("img/part3/blackBg.png?v=2",{
           x:1618,
            y:0
        });

        // 云
        part3Cloud = createSprite("img/part3/cloud.png",{
            x:1837+100,
            y:0
        });

        // 右山
        part3ShanRight = createSprite("img/part3/shanright.png",{
           x:1546+150,
            y:37
        });

        // 森林
        part3Senlin = createSprite("img/part3/senlin.png?v=1",{
            x:2167+100+150,
            y:123+10
        });

        // 波纹
        part3Wave = createSprite("img/part3/wave.png",{
           x:1737+100+50,
            y:178
        });

        // 左山
        part3ShanLeft = createSprite("img/part3/shanleft.png",{
            x:743+707+200,
            y:-124+492-50
        });
        part3ShanLeft.pivot.set(707,492);

        part3Tree1 = createSprite("img/part3/tree1.png",{
           x:351+250,
            y:75
        });

        part3Tree2 = createSprite("img/part3/tree2.png",{
            x:0,
            y:-104+217
        });

        part3Cat = createSprite("img/part3/cat.png",{
           x:293,
            y:24+217
        });

        part3Girl = createSprite("img/part3/girl.png?v=1",{
           x:327,
            y:316+92
        });

        // 第三场景 日期
        part3Date = createSprite("img/part3/date.png",{
            x:1009-80,
            y:442
        });

        // 好奇心 总是驱使着人类探索
        part3Talk = createSprite("img/part3/talk.png",{
            x:849,
            y:248
        });

        // 虫子
        part3ChongCont = new PIXI.Container();
        part3ChongCont.x = 1007;
        part3ChongCont.y = -31;

        var part3Muogu = createSprite("img/part3/muogu.png",{
            x:130,
            y:347
        });

        part3Chong = createSprite("img/part3/chongzi.png",{
           x:300,
            y:131,
            alpha:0
        });

        // 烟
        part3Yan = createSprite("img/part3/y.png",{
           x:114+280,
            y:425
        });
        part3Yan.pivot.x = 280;
        part3Yan.pivot.y = 425;
        part3Yan.scale.x = 0;
        part3Yan.scale.y = 0;

        // 左烟
        part3Yan1 = createSprite("img/part3/y1.png",{
            x:0+160,
            y:20+162,
            alpha:0.2
        });
        part3Yan1.pivot.x = 160;
        part3Yan1.pivot.y = 162;
        part3Yan1.scale.x = 0;
        part3Yan1.scale.y = 0;
        // 右烟
        part3Yan2 = createSprite("img/part3/y2.png",{
            x:459+10,
            y:197+185,
            alpha:0.2
        });
        part3Yan2.pivot.x = 10;
        part3Yan2.pivot.y = 185;
        part3Yan2.scale.x = 0;
        part3Yan2.scale.y = 0;
        // 下烟
        part3Yan3 = createSprite("img/part3/y3.png",{
            x:258+182,
            y:326+149+60,
            alpha:0.2
        });
        part3Yan3.pivot.x = 182;
        part3Yan3.pivot.y = 149;
        part3Yan3.scale.x = 0;
        part3Yan3.scale.y = 0;

        // 也许 是因为地球外的世界格外迷人
        part3Talk2 = createSprite("img/part3/talk2.png",{
           x:1897-50,
            y:428
        });

        // 子弹 2545/435
        part3ZidanCont = new PIXI.Container();
        part3ZidanCont.x = 830;
        part3ZidanCont.y = 100;
        part3ZidanCont.alpha = 0;
        part3ZidanCont.scale.x = 0.4;
        part3ZidanCont.scale.y = 0.4;

        // 子弹模板
        part3Zidan = createSprite("img/part3/z.png?v=1",{
            x:0,
            y:0
        });

        part3ZidanMaskCont = new PIXI.Container();
        part3ZidanMaskCont.position.set(0,0);
        part3ZidanMaskCont.pivot.set(0,0);
        part3ZidanMaskCont.scale.x = 0;

        var part3ZidanMask = new PIXI.Graphics();
        part3ZidanMask.beginFill("0xbc9e6d",1);
        part3ZidanMask.drawRect(0,0,215,80);
        part3ZidanMask.endFill();

        part3ZidanMaskCont.addChild(part3ZidanMask);

        part3Zidan.mask = part3ZidanMask;

        // 子弹1 5/1
        part3Z1 = createSprite("img/part3/z1.png",{
            x:0,
            y:0
        });

        // 子弹2 20/8
        part3Z2 = createSprite("img/part3/z2.png",{
            x:0,
            y:0
        });

        // 子弹3 46/15
        part3Z3 = createSprite("img/part3/z3.png",{
            x:0,
            y:0
        });

        // 子弹4 28/27
        part3Z4 = createSprite("img/part3/z4.png",{
            x:0,
            y:0
        });

        // 子弹5 16/42
        part3Z5 = createSprite("img/part3/z5.png",{
            x:0,
            y:0
        });

        // 子弹6 43/44
        part3Z6 = createSprite("img/part3/z6.png",{
            x:0,
            y:0
        });

        // 子弹7 10/31
        part3Z7 = createSprite("img/part3/z7.png",{
            x:0,
            y:0
        });

        // 子弹8 22/33
        part3Z8 = createSprite("img/part3/z8.png",{
            x:0,
            y:0
        });

        // 子弹9 0/66
        part3Z9 = createSprite("img/part3/z9.png",{
            x:0,
            y:0
        });
        part3ZidanCont.addChild(part3Zidan,part3Z1,part3Z2,part3Z3,part3Z4,part3Z5,
            part3Z6,part3Z7,part3Z8,part3Z9,part3ZidanMaskCont);

        part3ChongCont.addChild(part3Yan1,part3Yan2,part3Yan3,part3Yan,part3Chong,part3Muogu);

        // 子弹air1
        part3Air1 = createSprite("img/part3/air1.png",{
           x:2760-400,
            y:318
        });

        // 子弹air2
        part3Air2 = createSprite("img/part3/air2.png",{
            x:2923-300,
            y:297
        });

        part3Cont.addChild(part3Bg1, part3BlackBg,part3Cloud,part3ShanRight,part3Senlin,part3Wave,part3ShanLeft,part3ZidanCont,part3Tree1,part3Tree2,
            part3Cat,part3Bg2,part3Girl,part3Date,part3ChongCont,part3Talk,part3Talk2,
            part3Air1,part3Air2);

        // 第三场景遮罩
        part3MaskCont = new PIXI.Container();
        part3MaskCont.x = 519-5;
        part3MaskCont.y = 217+102;
        part3MaskCont.pivot.x = 519;
        part3MaskCont.pivot.y = 102;
        part3MaskCont.scale.x = 0.02;
        part3MaskCont.scale.y = 0.02;
        var part3Mask = new PIXI.Graphics();
        part3Mask.beginFill("0xOFOFOF",0.5);
        part3Mask.drawCircle(519,102,800);
        part3Mask.endFill();
        part3MaskCont.addChild(part3Mask);

        part3Cont.mask = part3Mask;

        part3.addChild(part3BgBlack,
            part3Cont,part3MaskCont);

        // 第五场景
        part5 = new PIXI.Container();
        part5.position.set(-38+869-250,-300+1248+150);
        part5.pivot.set(869,1248);
        part5.scale.set(0.5);
        part5.rotation = -2;
        part5.alpha = 0;

        var part5Bg = createSprite("img/part5/bg.png?v=1",{
            x:0,
            y:13
        });

        // 石头1
        var part5Stone1 = createSprite("img/part5/stone1.png",{
            x:1440,
            y:369
        });

        // 石头2
        var part5Stone2 = createSprite("img/part5/stone2.png",{
            x:1336,
            y:615
        });

        // 日期
        part5Date = createSprite("img/part5/date.png",{
            x:753-200,
            y:372
        });

        // 宇航员
        part5Yuhangyuan = createSprite("img/part5/yhy.png",{
            x:885-600,
            y:0
        });

        // 子弹 329
        part5Zidan1 = createSprite("img/part5/zidan1.png",{
            x:-434,
            y:457
        });
        part5Zidan2 = createSprite("img/part5/zidan2.png",{
            x:1286-1000,
            y:533+100
        });

        // 我都愿意跋涉那不能跋涉的泥泞
        part5Talk = createSprite("img/part5/talk.png",{
            x:1482-300,
            y:266,
            alpha:0
        });

        part5.addChild(part5Bg,part5Stone1,part5Stone2,
            part5Date,part5Yuhangyuan,part5Zidan1,part5Zidan2,part5Talk);


        // 第四场景
        part4 = new PIXI.Container();
        part4.x = 9070+120;//3117-2998=119
        part4.y = 0;

        var part4BgBoom = createSprite("img/part4/boom.png",{
            x:0,
            y:0
        });

        part4Bg = new PIXI.Graphics;
        part4Bg.beginFill("0x00000",1);
        part4Bg.drawRect(244,0,6832+6020,640);
        part4Bg.endFill();

        // 7000
        var part4StarCont = new PIXI.Container();
        part4StarCont.position.set(170,0);

        var part4Star11 = createSprite("img/part4/s1.png",{
            x:0,
            y:0
        });
        var part4Star12 = createSprite("img/part4/s1.png",{
            x:2364,
            y:0
        });
        var part4Star13 = createSprite("img/part4/s1.png",{
            x:2364*2,
            y:0
        });

        var part4Star21 = createSprite("img/part4/s2.png",{
            x:376,
            y:173
        });
        var part4Star22 = createSprite("img/part4/s2.png",{
            x:376+1820,
            y:173
        });
        var part4Star23 = createSprite("img/part4/s2.png",{
            x:(376+1820)*2,
            y:173
        });

        var part4Star31 = createSprite("img/part4/s3.png",{
            x:356,
            y:416
        });
        var part4Star32 = createSprite("img/part4/s3.png",{
            x:356+1820,
            y:416
        });

        // 流星
        part4Liuxing1 = createSprite("img/part4/liuxing.png?v=2",{
            x:1000-400,
            y:-999
        });

        part4Liuxing2 = createSprite("img/part4/liuxing.png?v=2",{
            x:1000-400+1500,
            y:-999
        });

        part4Liuxing3 = createSprite("img/part4/liuxing.png?v=2",{
            x:1000-400+3000,
            y:-999
        });

        part4StarCont.addChild(part4Star11,part4Star12,part4Star13,
            part4Star21,part4Star22,part4Star23,
            part4Star31,part4Star32,
            part4Liuxing1,part4Liuxing2,part4Liuxing3);

        TweenStar11 = TweenMax.to(part4Star11,1,{alpha:0.4}).repeat(-1).yoyo(true).repeatDelay(0.5);
        TweenStar12 = TweenMax.to(part4Star12,1,{alpha:0.4}).repeat(-1).yoyo(true).repeatDelay(0.6).delay(0.2);
        TweenStar13 = TweenMax.to(part4Star13,1,{alpha:0.4}).repeat(-1).yoyo(true).repeatDelay(0.7).delay(0.4);
        TweenStar21 = TweenMax.to(part4Star21,1,{alpha:0.4}).repeat(-1).yoyo(true).repeatDelay(0.8).delay(0.4);
        TweenStar22 = TweenMax.to(part4Star22,1,{alpha:0.4}).repeat(-1).yoyo(true).repeatDelay(0.9).delay(0.2);
        TweenStar23 = TweenMax.to(part4Star23,1,{alpha:0.4}).repeat(-1).yoyo(true).repeatDelay(0.6);
        TweenStar31 = TweenMax.to(part4Star31,1,{alpha:0.4}).repeat(-1).yoyo(true).repeatDelay(0.5).delay(0.2);
        TweenStar32 = TweenMax.to(part4Star32,1,{alpha:0.4}).repeat(-1).yoyo(true).repeatDelay(0.4).delay(0.4);

        TweenStar11.pause();
        TweenStar12.pause();
        TweenStar13.pause();
        TweenStar21.pause();
        TweenStar22.pause();
        TweenStar23.pause();
        TweenStar31.pause();
        TweenStar32.pause();


        // 日期
        part4Date = createSprite("img/part4/date.png",{
            x:-184-50-120,
            y:439
        });

        part4MoonCont = new PIXI.Container();
        part4MoonCont.position.set(372,295);
        part4MoonCont.pivot.set(372,295);


        // 月亮
        part4Moon = createAnimatedSprite("img/part4/m",6,{
           x:169,
            y:90
        });

        // 后子弹
        part4ZidanEnd = createSprite("img/part4/zidan-end.png",{
           x:321+184,
            y:166+16
        });
        part4ZidanEnd.pivot.set(184,16);

        // 子弹
        part4Zidan = createAnimatedSprite("img/part4/zidan",5,{
            x:56+244-450,
            y:248+250+31
        });
        part4Zidan.pivot.x = 244;
        part4Zidan.pivot.y = 31;
        part4Zidan.scale.set(1.4);

        // 左人
        part4P1 = createSprite("img/part4/p1.png?v=1",{
            x:423+522-50,
            y:11+937+50
        });
        part4P1.pivot.set(522,937);

        // 右人
        part4P3 = createSprite("img/part4/p3.png?v=1",{
            x:813+132,
            y:42+906
        });
        part4P3.pivot.set(132,906);

        // 两人
        part4P2 = createSprite("img/part4/p2.png?v=1",{
            x:554+391-200,
            y:128+820
        });
        part4P2.pivot.set(391,820);

        //  最右人
        part4P4 = createSprite("img/part4/p4.png",{
            x:864+78-10,
            y:11+934
        });
        part4P4.pivot.set(78,934);

        // 子弹壳
        part4ZidankeCont = new PIXI.Container();
        part4ZidankeCont.position.set(472+443,-183+1056);
        part4ZidankeCont.pivot.set(443,1056);
        part4ZidankeCont.scale.set(329/353);
        part4Zidanke = createAnimatedSprite("img/part4/k",7,{
            x:0,
            y:0
        });
        part4ZidankeCont.addChild(part4Zidanke);

        // 无论如何
        part4Talk = createSprite("img/part4/talk.png",{
            x:851,
            y:360
        });

        // 大月亮 rotation 1.95
        part4BigMoonCont = new PIXI.Container();
        part4BigMoonCont.position.set(352+945-928,211+948-860);
        part4BigMoonCont.pivot.set(945,948);
        part4BigMoonCont.scale.set(0.215);
        part4BigMoonCont.rotation = -2.4;
        part4BigMoonCont.alpha = 0;

        part4BigMoon = createSprite("img/part4/bigMoonBg.png",{
            x:945,
            y:948
        });
        part4BigMoon.pivot.set(945,948);

        part4BigMoonCont.addChild(part4BigMoon,part4ZidankeCont,part4P1,part4P4,part4P3,part4P2,
            part5);

        part4MoonCont.addChild(part4BigMoonCont,part4Moon,part4Zidan);
        part4MoonCont.displayGroup = index1;

        part4.addChild(part4Bg,part4BgBoom,part4StarCont,part4Date,part4ZidanEnd,
            part4Talk,part4MoonCont);

        // 第六场景
        part6 = new PIXI.Container();
        part6.x = 11699+4520+3051-120;
        part6.y = 0+259+20;
        part6.pivot.set(3051-120,259+20);

        part6Shan1 = createSprite("img/part6/s1.png",{
            x:0+50,
            y:16
        });

        part6Shan2 = createSprite("img/part6/s2.png",{
            x:651+80,
            y:7
        });

        part6Shan3 = createSprite("img/part6/s3.png?v=2",{
            x:396+25,
            y:13
        });

        part6Shan4 = createSprite("img/part6/s4.png?v=1",{
            x:1744+100,
            y:33
        });

        part6Shan5 = createSprite("img/part6/s5.png",{
            x:2221+50,
            y:68
        });

        // 日期
        part6Date = createSprite("img/part6/date.png",{
           x:847+50,
            y:394
        });

        // 石阶
        part6JieCont = new PIXI.Container();
        part6JieCont.x = 579;
        part6JieCont.y = 105;

        // 石阶背景
        part6JieBg = createSprite("img/part6/j0.png?v=1",{
            x:0,
            y:0
        });

        var part6J1 = createSprite("img/part6/j1.png",{
            x:84,
            y:60,
            alpha:0
        });

        var part6J2 = createSprite("img/part6/j2.png",{
            x:106,
            y:61,
            alpha:0
        });

        var part6J3 = createSprite("img/part6/j3.png",{
            x:145,
            y:67,
            alpha:0
        });

        var part6J4 = createSprite("img/part6/j4.png",{
            x:180,
            y:72,
            alpha:0
        });

        var part6J5 = createSprite("img/part6/j5.png",{
            x:220,
            y:78,
            alpha:0
        });

        var part6J6 = createSprite("img/part6/j6.png",{
            x:261,
            y:81,
            alpha:0
        });

        var part6J7 = createSprite("img/part6/j7.png",{
            x:301,
            y:102,
            alpha:0
        });

        var part6J8 = createSprite("img/part6/j8.png",{
            x:342,
            y:133,
            alpha:0
        });

        var part6J9 = createSprite("img/part6/j9.png",{
            x:403,
            y:152,
            alpha:0
        });

        var part6J10 = createSprite("img/part6/j10.png",{
            x:468,
            y:187,
            alpha:0
        });

        var part6J11 = createSprite("img/part6/j11.png",{
            x:534,
            y:232,
            alpha:0
        });

        var part6J12 = createSprite("img/part6/j12.png",{
            x:590,
            y:304,
            alpha:0
        });

        var part6J13 = createSprite("img/part6/j13.png",{
            x:651,
            y:370,
            alpha:0
        });

        var part6J14 = createSprite("img/part6/j14.png",{
            x:1192,
            y:465,
            alpha:0
        });

        part6JieCont.addChild(part6JieBg,part6J1,part6J2,part6J3,part6J4,part6J5,
            part6J6,part6J7,part6J8,part6J9,part6J10,part6J11,part6J12,part6J13,part6J14);

        // 路
        part6LuCont = new PIXI.Container();
        part6LuCont.x = 1682;
        part6LuCont.y = 0;

        var part6LuBg = createSprite("img/part6/l0.png?v=1",{
           x:84,
            y:0
        });

        var part6Lu1 = createSprite("img/part6/l1.png",{
            x:0,
            y:167,
            alpha:0
        });

        var part6Lu2 = createSprite("img/part6/l2.png",{
            x:52,
            y:188,
            alpha:0
        });

        var part6Lu3 = createSprite("img/part6/l3.png",{
            x:84,
            y:209,
            alpha:0
        });

        var part6Lu4 = createSprite("img/part6/l4.png",{
            x:126,
            y:222,
            alpha:0
        });

        var part6Lu5 = createSprite("img/part6/l5.png",{
            x:152,
            y:218,
            alpha:0
        });

        var part6Lu6 = createSprite("img/part6/l6.png",{
            x:236,
            y:213,
            alpha:0
        });

        var part6Lu7 = createSprite("img/part6/l7.png",{
            x:322,
            y:208,
            alpha:0
        });

        var part6Lu8 = createSprite("img/part6/l8.png",{
            x:416,
            y:197,
            alpha:0
        });

        var part6Lu9 = createSprite("img/part6/l9.png",{
            x:496,
            y:192,
            alpha:0
        });

        var part6Lu10 = createSprite("img/part6/l10.png",{
            x:554,
            y:185,
            alpha:0
        });

        var part6Lu11 = createSprite("img/part6/l11.png",{
            x:587,
            y:178,
            alpha:0
        });

        var part6Lu12 = createSprite("img/part6/l12.png",{
            x:621,
            y:173,
            alpha:0
        });

        var part6Lu13 = createSprite("img/part6/l13.png",{
            x:643,
            y:162,
            alpha:0
        });

        var part6Lu14 = createSprite("img/part6/l14.png",{
            x:677,
            y:157,
            alpha:0
        });

        var part6Lu15 = createSprite("img/part6/l15.png",{
            x:696,
            y:145,
            alpha:0
        });

        var part6Lu16 = createSprite("img/part6/l16.png",{
            x:728,
            y:145,
            alpha:0
        });

        var part6Lu17 = createSprite("img/part6/l17.png",{
            x:754,
            y:134,
            alpha:0
        });

        var part6Lu18 = createSprite("img/part6/l18.png",{
            x:783,
            y:123,
            alpha:0
        });

        var part6Lu19 = createSprite("img/part6/l19.png",{
            x:808,
            y:118,
            alpha:0
        });
        var part6Lu20 = createSprite("img/part6/l20.png",{
            x:823,
            y:101,
            alpha:0
        });

        var part6Lu21 = createSprite("img/part6/l21.png",{
            x:842,
            y:83,
            alpha:0
        });

        var part6Lu22 = createSprite("img/part6/l22.png",{
            x:849,
            y:64,
            alpha:0
        });

        var part6Lu23 = createSprite("img/part6/l23.png",{
            x:847,
            y:45,
            alpha:0
        });

        var part6Lu24 = createSprite("img/part6/l24.png",{
            x:840,
            y:30,
            alpha:0
        });

        var part6Lu25 = createSprite("img/part6/l25.png",{
            x:831,
            y:19,
            alpha:0
        });

        var part6Lu26 = createSprite("img/part6/l26.png",{
            x:823,
            y:9,
            alpha:0
        });

        var part6Lu27 = createSprite("img/part6/l27.png",{
            x:809,
            y:0,
            alpha:0
        });

        part6LuCont.addChild(part6LuBg,part6Lu1,part6Lu2,part6Lu3,part6Lu4,part6Lu5,part6Lu6,part6Lu7,
            part6Lu8,part6Lu9,part6Lu10,part6Lu11,part6Lu12,part6Lu13,part6Lu14,part6Lu15,part6Lu16,
            part6Lu17,part6Lu18,part6Lu19,part6Lu20,part6Lu21,part6Lu22,part6Lu23,part6Lu24,part6Lu25,
            part6Lu26,part6Lu27);

        // 木偶
        part6MuouCont = new PIXI.Container();
        part6MuouCont.x = -1484+100;
        part6MuouCont.y = 91;
        part6MuouCont.scale.set(0.8);
        // part6MuouCont.pivot.set();

        var part6MaoCont = new PIXI.Container();
        part6MaoCont.x = 164+98;
        part6MaoCont.y = 32;
        part6MaoCont.pivot.set(98,32);

        part6MaoBottom = createSprite("img/part6/mao-bottom.png",{
           x:98,
            y:31
        });
        part6MaoBottom.pivot.set(98,31);

        part6MaoTop = createSprite("img/part6/mao-top.png",{
            x:15+83,
            y:1+31
        });
        part6MaoTop.pivot.set(83,31);

        var part6Muou = createSprite("img/part6/muou.png",{
           x:-164,
            y:4
        });

        part6MaoCont.addChild(part6MaoBottom,part6Muou,part6MaoTop);
        part6MuouCont.addChild(part6MaoCont);

        // 吞鱼
        var part6FishCont = new PIXI.Container();
        part6FishCont.x = 2369;
        part6FishCont.y = 0;

        // 圆
        part6FishCircle = createSprite("img/part6/circle.png",{
           x:447,
            y:107
        });

        // 鱼
        part6FishItemCont = new PIXI.Container();
        part6FishItemCont.x = 492;
        part6FishItemCont.y = -113;

        part6FishBottom = createSprite("img/part6/fish-bottom3.png",{
            x:97-97+30,
            y:169+113-114
        });

        part6FishBottom.pivot.set(-97,-114);
        part6FishBottom.rotation = -0.2;

        // part7Mask
        part7MaskCont = new PIXI.Container();
        part7MaskCont.position.set(97-97+30,169+113-114);
        part7MaskCont.pivot.set(-97,-114);
        part7MaskCont.rotation = -0.2;
        part7Mask = createSprite("img/part6/part7Mask.png",{
            x:84,
            y:73
        });
        part7Mask.pivot.set(84,73);
        part7MaskCont.addChild(part7Mask);

        part6Fish = createSprite("img/part6/fish.png",{
            x:0+30,
            y:55+113
        });
        part6Fish.pivot.set(0,55+113);
        part6Fish.rotation = -0.2;

        var part6MiddleMask = new PIXI.Graphics();
        part6MiddleMask.beginFill("0x123456",1);
        part6MiddleMask.drawRect(1143,0,2011,640);
        part6MiddleMask.endFill();

        var part6MiddleCont = new PIXI.Container();
        part6MiddleCont.x = 0;
        part6MiddleCont.y = 113;

        // 气泡
        part6Pao1 = createSprite("img/part6/pao1.png",{
            x:-335+606,
            y:193,
            alpha:0.4
        });
        part6Pao1.pivot.set(606,0);
        part6Pao1.scale.set(0);
        part6Pao2 = createSprite("img/part6/pao2.png",{
            x:-236+507,
            y:345-152,
            alpha:0.4
        });
        part6Pao2.pivot.set(507,-152);
        part6Pao2.scale.set(0);

        part6MiddleCont.addChild(part6MuouCont,part6Pao1,part6Pao2);

        part6MiddleCont.mask = part6MiddleMask;

        part6FishItemCont.addChild(part6FishBottom,part7MaskCont,part6MiddleCont,part6Fish);


        part6FishCont.addChild(part6FishCircle,part6FishItemCont);

        // 如果你还在犹豫
        part6Talk = createSprite("img/part6/talk.png",{
           x:2026+50,
            y:413
        });

        part6.addChild(part6Shan2,part6Shan1,part6Shan5,part6Shan4,part6Shan3,
            part6JieCont,part6LuCont,part6Date,part6Talk,part6FishCont,part6MiddleMask);

        // 第七场景
        part7 = new PIXI.Container();
        part7.position.set(11699+4520+900+21000-18700,320);
        part7.pivot.set(0,320);
        part7.scale.set(0.3);
        part7.mask = part7Mask;

        var part7Bg1 = new PIXI.Graphics();
        part7Bg1.beginFill("0x000000",1);
        part7Bg1.drawRect(-578,-640,1590,640*3);
        part7Bg1.endFill();

        var part7Bg = createSprite("img/part7/bg.png",{
            x:991,
            y:0
        });

        // 放心去流浪吧
        part7Talk = createSprite("img/part7/talk.png",{
            x:0+200,
            y:77
        });

        // 线
        part7Line = createSprite("img/part7/line.png",{
           x:191,
            y:366-5
        });

        var part7BiziMask = new PIXI.Graphics();
        part7BiziMask.beginFill("0x999999",0.8);
        part7BiziMask.drawRect(270,400,650,80);
        part7BiziMask.endFill();

        // 鼻子
        part7Bizi = createSprite("img/part7/bizi.png",{
           x:276,
            y:406-5
        });

        part7Bizi.mask = part7BiziMask;

        // 脸
        var part7Face = createSprite("img/part7/face.png?v=1",{
           x:878-2,
            y:0
        });

        // 大人
        part7Rain1Cont = new PIXI.Container();
        part7Rain1Cont.position.set(1327,-640);

        // 大人1
        part7RainB1 = new PIXI.Container();
        part7RainB1.position.set(18,0+100);

        var part7RainB11 = createSprite("img/part7/b1.png",{
            x:0,
            y:0
        });
        var part7RainB12 = createSprite("img/part7/b1.png",{
            x:0,
            y:-640
        });
        var part7RainB13 = createSprite("img/part7/b1.png",{
            x:0,
            y:-640-640
        });

        part7RainB1.addChild(part7RainB11,part7RainB12,part7RainB13);

        // 大人2
        part7RainB2 = new PIXI.Container();
        part7RainB2.position.set(0,0+200);

        var part7RainB21 = createSprite("img/part7/b2.png",{
           x:0,
           y:0
        });
        var part7RainB22 = createSprite("img/part7/b2.png",{
            x:0,
            y:-640
        });
        var part7RainB23 = createSprite("img/part7/b2.png",{
            x:0,
            y:-640-640
        });
        part7RainB2.addChild(part7RainB21,part7RainB22,part7RainB23);

        // 大人3
        part7RainB3 = new PIXI.Container();
        part7RainB3.position.set(1182,0+300);

        var part7RainB31 = createSprite("img/part7/b3.png",{
           x:0,
            y:48
        });
        var part7RainB32 = createSprite("img/part7/b3.png",{
            x:0,
            y:48-640
        });
        var part7RainB33 = createSprite("img/part7/b3.png",{
            x:0,
            y:48-640-640
        });
        part7RainB3.addChild(part7RainB31,part7RainB32,part7RainB33);

        // 大人4
        part7RainB4 = new PIXI.Container();
        part7RainB4.position.set(206,0-100);

        var part7RainB41 = createSprite("img/part7/b4.png",{
            x:0,
            y:0
        });
        var part7RainB42 = createSprite("img/part7/b4.png",{
            x:0,
            y:-640
        });
        var part7RainB43 = createSprite("img/part7/b4.png",{
            x:0,
            y:-640-640
        });
        part7RainB4.addChild(part7RainB41,part7RainB42,part7RainB43);

        part7Rain1Cont.addChild(part7RainB1,part7RainB2,part7RainB3,part7RainB4);

        // 小人
        part7Rain2Cont = new PIXI.Container();
        part7Rain2Cont.position.set(1327,-540);

        part7RainS1 = new PIXI.Container();
        part7RainS1.position.set(5,0-50);

        // 小人1
        var part7RainS11 = createSprite("img/part7/s1.png",{
            x:0,
            y:0
        });
        var part7RainS12 = createSprite("img/part7/s1.png",{
            x:0,
            y:-640
        });
        var part7RainS13 = createSprite("img/part7/s1.png",{
            x:0,
            y:-640-640
        });
        part7RainS1.addChild(part7RainS11,part7RainS12,part7RainS13);

        // 小人2
        var part7RainS2 = new PIXI.Container();
        part7RainS2.position.set(0,0);

        var part7RainS21 = createSprite("img/part7/s2.png",{
            x:0,
            y:269
        });
        var part7RainS22 = createSprite("img/part7/s2.png",{
            x:0,
            y:269-640
        });
        var part7RainS23 = createSprite("img/part7/s2.png",{
            x:0,
            y:269-640-640
        });
        part7RainS2.addChild(part7RainS21,part7RainS22,part7RainS23);

        // 小人3
        part7RainS3 = new PIXI.Container();
        part7RainS3.position.set(0,50);

        var part7RainS31 = createSprite("img/part7/s3.png",{
            x:0,
            y:0
        });
        var part7RainS32 = createSprite("img/part7/s3.png",{
            x:0,
            y:-640
        });
        var part7RainS33 = createSprite("img/part7/s3.png",{
            x:0,
            y:-640-640
        });
        part7RainS3.addChild(part7RainS31,part7RainS32,part7RainS33);

        part7Rain2Cont.addChild(part7RainS1,part7RainS2,part7RainS3);

        // 你会看到 人来人往
        part7Talk2 = createSprite("img/part7/talk2.png",{
            x:2200+100,
            y:72
        });

        // 日期
        part7Date = createSprite("img/part7/date.png",{
           x:3457-40,
            y:450
        });
        part7.addChild(part7Bg1,part7Bg,part7Talk,part7Line,part7Bizi,part7BiziMask,part7Face,
            part7Date,part7Rain2Cont,part7Rain1Cont,part7Talk2);

        // 第八场景
        var part8 = new PIXI.Container();
        part8.position.set(24940,0);
        // 人影背景
        var part8PersonCont = new PIXI.Container();
        part8PersonCont.position.set(0,0);

        var part8PersonBgCont = new PIXI.Container();
        part8PersonBgCont.position.set(0,0);

        var part8PersonBg = new PIXI.Graphics();
        part8PersonBg.beginFill("0x000000",1);
        part8PersonBg.drawRect(0,0,657,640);
        part8PersonBg.endFill();
        part8PersonCloudBg = createSprite("img/part8/person-bg.png",{
           x:139,
            y:9
        });

        part8Person = new PIXI.Container();
        part8Person.position.set(50+77-50,250+375);
        part8Person.pivot.set(77,375);
        part8Person.scale.set(0.19);

        // 312-50+77 21+375 人遮罩
        part8PersonMask = createSprite("img/part8/p1.png",{
           x:0,
            y:0
        });
        // 遮罩背景
        part8PersonMaskBg = createSprite("img/part8/p1-bg.png",{
            x:0,
            y:0
        });
        part8Person.addChild(part8PersonMaskBg,part8PersonMask);

        part8PersonBgCont.addChild(part8PersonBg,part8PersonCloudBg);
        part8PersonBgCont.mask = part8PersonMask;

        part8PersonCont.addChild(part8PersonBgCont,part8Person);

        // 云背景
        part8BgYun = createSprite("img/part8/bg-yun.png",{
           x:225-200,
            y:0
        });

        // 石头
        part8Stone = createSprite("img/part8/stone.png",{
            x:377-10,
            y:350
        });

        // 鸟
        part8Bird1 = createSprite("img/part8/bird1.png",{
            x:878-94-60,
            y:25+335+30
        });
        part8Bird1.pivot.set(-94,335);
        part8Bird1.scale.set(0.5);
        part8Bird2 = createSprite("img/part8/bird2.png",{
            x:1322+216,
            y:195-210
        });

        // 小鸟
        part8B1 = createSprite("img/part8/b1.png",{
           x:1241-123-200,
            y:-203+559+50
        });
        part8B1.pivot.set(-123,559);
        part8B1.scale.set(0.6);

        part8B2 = createSprite("img/part8/b2.png",{
            x:1810-500,
            y:94
        });
        part8B3 = createSprite("img/part8/b3.png",{
            x:2188-400,
            y:64
        });
        part8B4 = createSprite("img/part8/b4.png",{
            x:2300-500,
            y:119
        });
        part8B5 = createSprite("img/part8/b5.png",{
            x:2366-450,
            y:46,
            rotation:0.6
        });
        part8B6 = createSprite("img/part8/b6.png",{
            x:2507-500,
            y:273
        });
        part8B7 = createSprite("img/part8/b7.png",{
            x:2827-400,
            y:33
        });

        // 笼子
        part8Long = createAnimatedSprite("img/part8/long",5,{
           x:572,
           y:117
        });

        // 会有人愿意停下来
        part8Talk1 = createSprite("img/part8/talk1.png",{
           x:1009-50,
            y:361
        });

        // 山水背景
        var part8SCont = new PIXI.Container();
        part8SCont.position.set(1710,0);

        // 左后山
        part8S1 = createSprite("img/part8/s1.png",{
           x:477,
            y:226
        });
        // 右后山
        part8S2 = createSprite("img/part8/s2.png",{
            x:698+100,
            y:100
        });
        // 左山
        part8S3 = createSprite("img/part8/s3.png",{
            x:56+200,
            y:233
        });
        // 右山
        part8S4 = createSprite("img/part8/s4.png",{
            x:1141+150,
            y:233
        });

        // 中水
        part8S6 = createSprite("img/part8/s6.png",{
            x:794+200,
            y:408
        });
        // 左水+左前
        part8S5 = createSprite("img/part8/s5.png",{
            x:0+250,
            y:373
        });
        // 小船
        part8Boat = createSprite("img/part8/boat.png",{
            x:1117+200+84,
            y:456+79,
            rotation: -0.3
        });
        part8Boat.pivot.set(84,79);
        part8SCont.addChild(part8S1,part8S2,part8S3,part8S4,part8S6,part8S5,part8Boat);

        // 你会看到 远洋的千帆百桨
        var part8Talk2 = createSprite("img/part8/talk2.png",{
            x:2342,
            y:97
        });

        // 第九场景背景
        var part9Bg = createSprite("img/part9/bg.png",{
            x:3015,
            y:177
        });

        part8.addChild(part8BgYun,part9Bg,part8SCont,part8PersonCont,part8Stone,
            part8B1,part8B2,part8B3,part8Talk2,part8B4,part8B5,part8B6,part8B7,
            part8Bird1,part8Bird2,part8Long,part8Talk1);

        // 第9场景
        var part9 = new PIXI.Container();
        part9.position.set(24940+3016,0);

        part9BoatMaskCont = new PIXI.Container();
        part9BoatMaskCont.position.set(-611-500,69);;
        // var part9BoatMask = new PIXI.Graphics();
        // part9BoatMask.beginFill("0x999999",1);
        // part9BoatMask.drawRect(0,0,660,503);
        // part9BoatMask.endFill();
        var part9BoatMask = createSprite("img/part9/boat-mask.png?v=1",{
            x:0,
            y:0
        });
        part9BoatMaskCont.addChild(part9BoatMask);

        // 大船
        var part9Boat = createSprite("img/part9/boat.png",{
           x:188+310,
            y:69+449
        });
        part9Boat.pivot.set(310,449);
        part9Boat.mask = part9BoatMask;

        // 小浪
        part9Wave1 = createSprite("img/part9/wave1.png",{
           x:206,
            y:79
        });

        // 大浪
        part9Wave2 = createSprite("img/part9/wave2.png?v=1",{
            x:121,
            y:122
        });
        // 日期
        part9Date = createSprite("img/part9/date.png",{
            x:848,
            y:418
        });
        // 听见儿时的旋律 还会跟着哼起来吗
        part9Talk = createSprite("img/part9/talk.png?v=1",{
            x:1480-100,
            y:368
        });
        // 黑泽明
        var part9HeZe = createSprite("img/part9/person.png",{
            x:2052,
            y:14
        });
        // 日期2
        part9Date2 = createSprite("img/part9/date2.png",{
            x:2545+50,
            y:147
        });
        // 水波
        var part9WaveCont = new PIXI.Container();
        part9WaveCont.position.set(2581,323);
        part9W1 = createSprite("img/part9/w1.png",{
            x:103,
            y:31
        });
        part9W1.pivot.set(103,31);
        var part9W2 = createSprite("img/part9/w2.png",{
            x:103,
            y:31
        });
        part9W2.pivot.set(103,31);
        var part9W3 = createSprite("img/part9/w3.png",{
            x:103,
            y:31
        });
        part9W3.pivot.set(103,31);
        var part9W4 = createSprite("img/part9/w4.png",{
            x:103,
            y:31
        });
        part9W4.pivot.set(103,31);
        var part9W5 = createSprite("img/part9/w5.png",{
            x:103,
            y:31
        });
        part9W5.pivot.set(103,31);
        var part9W6 = createSprite("img/part9/w6.png",{
            x:103,
            y:31
        });
        part9W6.pivot.set(103,31);
        var part9W7 = createSprite("img/part9/w7.png",{
            x:103,
            y:31
        });
        part9W7.pivot.set(103,31);
        part9WaveCont.addChild(part9W1,part9W2,part9W3,part9W4,part9W5,part9W6,part9W7);

        W1Ani = TweenMax.fromTo(part9W1,2,{pixi:{scale:0}},{pixi:{scale:1},onComplete:function(){
            TweenMax.fromTo(part9W1,1,{alpha:1},{alpha:0,onComplete:function(){
                    part9W1.alpha = 1;
                    W1Ani.restart();
            }});
        }});

        W2Ani = TweenMax.fromTo(part9W2,2,{pixi:{scale:0}},{pixi:{scale:1},onComplete:function(){
            TweenMax.fromTo(part9W2,1,{alpha:1},{alpha:0,onComplete:function(){
                    part9W2.alpha = 1;
                    W2Ani.restart();
            }});
        }}).delay(3/7*1);

        W3Ani = TweenMax.fromTo(part9W3,2,{pixi:{scale:0}},{pixi:{scale:1},onComplete:function(){
            TweenMax.fromTo(part9W3,1,{alpha:1},{alpha:0,onComplete:function(){
                    part9W3.alpha = 1;
                    W3Ani.restart();
            }});
        }}).delay(3/7*2);

        W4Ani = TweenMax.fromTo(part9W4,2,{pixi:{scale:0}},{pixi:{scale:1},onComplete:function(){
            TweenMax.fromTo(part9W4,1,{alpha:1},{alpha:0,onComplete:function(){
                    part9W4.alpha = 1;
                    W4Ani.restart();
            }});
        }}).delay(3/7*3);

        W5Ani = TweenMax.fromTo(part9W5,2,{pixi:{scale:0}},{pixi:{scale:1},onComplete:function(){
            TweenMax.fromTo(part9W5,1,{alpha:1},{alpha:0,onComplete:function(){
                    part9W5.alpha = 1;
                    W5Ani.restart();
            }});
        }}).delay(3/7*4);

        W6Ani = TweenMax.fromTo(part9W6,2,{pixi:{scale:0}},{pixi:{scale:1},onComplete:function(){
            TweenMax.fromTo(part9W6,1,{alpha:1},{alpha:0,onComplete:function(){
                    part9W6.alpha = 1;
                    W6Ani.restart();
            }});
        }}).delay(3/7*5);

        W7Ani = TweenMax.fromTo(part9W7,2,{pixi:{scale:0}},{pixi:{scale:1},onComplete:function(){
            TweenMax.fromTo(part9W7,1,{alpha:1},{alpha:0,onComplete:function(){
                    part9W7.alpha = 1;
                    W7Ani.restart();
            }});
        }}).delay(3/7*6);
        part9WavePause();

        // 蘑菇房
        var part9Muogu = createSprite("img/part9/house.png",{
            x:2540,
            y:0
        });
        // 巫师1
        part9Wushi1 = createSprite("img/part9/wushi1.png",{
           x:3341-50,
            y:144
        });
        // 牌子
        part9Pai = createSprite("img/part9/pai.png",{
           x:3488-50,
            y:367
        });
        // 炉子
        part9Luzi = createSprite("img/part9/luzi.png",{
            x:3548-100,
            y:190
        });
        // 猫
        part9Cat = createSprite("img/part9/cat.png",{
            x:3900-100,
            y:290
        });
        part9Cat.scale.set(0.9);
        // 巫师2
        part9Wushi2 = createSprite("img/part9/wushi2.png",{
           x:3890-250,
            y:326
        });
        // 手
        part9Hand = createAnimatedSprite("img/part9/hand",8,{
            x:3731-50,
            y:0
        });
        // 蓝精灵
        var part9LanCont = new PIXI.Container();
        part9LanCont.position.set(4605,0);
        // 格格巫
        part9Ge1 = createSprite("img/part9/ge1.png",{
            x:84-100,
            y:23
        });
        // 左上精灵
        part9Ge2 = createSprite("img/part9/ge2.png",{
            x:0+232,
            y:-5,
            rotation:0.8
        });
        part9Ge2.pivot.set(232,0);
        // 左精灵
        part9Ge3 = createSprite("img/part9/ge3.png",{
            x:18-100,
            y:245
        });
        // 右上精灵
        part9Ge4 = createSprite("img/part9/ge4.png",{
            x:519+165,
            y:-25+8,
            rotation: -1
        });
        part9Ge4.pivot.set(165,8);
        // 右下精灵
        part9Ge5 = createSprite("img/part9/ge5.png",{
           x:516,
            y:512+30
        });
        // 日期3
        part9Date3 = createSprite("img/part9/date3.png",{
           x:638,
            y:383
        });
        // 就算 你已长大成熟
        var part9Talk2 = createSprite("img/part9/talk2.png",{
            x:589,
            y:142
        });
        part9LanCont.addChild(part9Ge3,part9Ge1,part9Ge5,part9Ge2,part9Ge4,part9Date3,part9Talk2);
        part9.addChild(part9Boat,part9Wave1,part9Date,part9Wave2,part9BoatMaskCont,part9Talk,part9HeZe,
            part9Date2,part9WaveCont,part9Pai,part9Muogu,part9Wushi1,part9Hand,part9Cat,part9Luzi,part9Wushi2,
            part9LanCont);

        // 第十场景
        var part10 = new PIXI.Container();
        part10.position.set(33054,0);
        part10Z1 = createSprite("img/part10/z1.png",{
            x:0-50,
            y:0
        });
        part10Z2 = createSprite("img/part10/z2.png",{
            x:139-100,
            y:0
        });
        part10Z3 = createSprite("img/part10/z3.png",{
            x:395-150,
            y:0
        });
        part10Z4 = createSprite("img/part10/z4.png",{
            x:496-200,
            y:0
        });
        part10Z5 = createSprite("img/part10/z5.png",{
            x:622-250,
            y:0
        });
        part10Z6 = createSprite("img/part10/z6.png",{
            x:787-300,
            y:0
        });
        part10Z7 = createSprite("img/part10/z7.png",{
            x:1252-350,
            y:0
        });
        part10Z8 = createSprite("img/part10/z8.png",{
            x:1569-400,
            y:0
        });
        part10Z9 = createSprite("img/part10/z9.png",{
            x:1933-500,
            y:0
        });
        part10Z10 = createSprite("img/part10/z10.png",{
            x:2373-380,
            y:0
        });
        part10Z11 = createSprite("img/part10/z11.png",{
            x:2596-300,
            y:0
        });
        part10Z12 = createSprite("img/part10/z12.png",{
            x:2806-250,
            y:0
        });
        part10Z13 = createSprite("img/part10/z13.png",{
            x:3332-150,
            y:0
        });
        part10Z14 = createSprite("img/part10/z14.png",{
            x:3442-100,
            y:0
        });
        part10Z15 = createSprite("img/part10/z15.png",{
            x:3982-50,
            y:0
        });
        part10Z16 = createSprite("img/part10/z16.png",{
            x:4202-30,
            y:0
        });
        part10Z17 = createSprite("img/part10/z17.png",{
            x:4058,
            y:0
        });
        // 浪花1
        part10Wave1 = createSprite("img/part10/wave1.png",{
            x:1879-100,
            y:243
        });
        // 浪花2
        part10Wave2 = createSprite("img/part10/wave2.png",{
            x:2398-50,
            y:368
        });
        // 浪花3
        part10Wave3 = createSprite("img/part10/wave3.png",{
            x:2874-200,
            y:198
        });
        // 石头1
        var part10Stone1 = createSprite("img/part10/stone1.png",{
           x:3683,
            y:147
        });
        // 兔子
        part10Tu1 = createSprite("img/part10/tu1.png",{
            x:810-300,
            y:279+50
        });
        part10Tu2 = createSprite("img/part10/tu2.png",{
            x:1139-500,
            y:192,
            alpha:0
        });
        part10Tu3 = createSprite("img/part10/tu3.png",{
            x:1644-400,
            y:257-50,
            rotation: -0.2,
            alpha:0
        });
        // 日期
        part10Date = createSprite("img/part10/date.png",{
           x:4327-100,
            y:199
        });
        // 海雁
        var part10HaiyanCont = new PIXI.Container();
        part10HaiyanCont.position.set(4171,0);

        var part10HaiStone = createSprite("img/part10/stone2.png",{
           x:0,
            y:392
        });

        // 海雁
        var part10Haiyan = createSprite("img/part10/haiyan.png",{
           x:600,
            y:0
        });
        // 海雁骨骼
        part10HaiGu = createAnimatedSprite("img/part10/h",37,{
           x:522,
            y:10
        });
        // 遮罩
        var part10HaiMaskCont = new PIXI.Container();
        part10HaiMaskCont.position.set(380,0);
        part10HaiMask1 = createSprite("img/part10/haiMask.png",{
           x:0,
           y:640,
            alpha:0
        });
        part10HaiMask1.pivot.y = 640;
        part10HaiMask2 = createSprite("img/part10/haiMask.png",{
            x:0,
            y:0,
            alpha:0
        });
        part10HaiMask2.pivot.y = 0;
        // part10HaiMask2.scale.y = 0;
        part10HaiMaskCont.addChild(part10HaiMask1,part10HaiMask2);

        // part10Haiyan.mask = part10HaiMask1;
        // part10HaiGu.mask = part10HaiMask2;

        part10HaiyanCont.addChild(part10HaiStone,part10Haiyan,part10HaiGu,part10HaiMaskCont);

        // 气泡
        part10Pao = createSprite("img/part10/pao.png",{
           x:5133+169,
            y:-59+469,
            alpha:0.5
        });
        part10Pao.pivot.set(169,469);
        part10Pao.scale.set(0);

        // 水中海雁
        part10HW = new PIXI.Container();
        part10HW.position.set(5250+535,320-213);
        part10HW.rotation = 0.5;
        part10HW.pivot.set(535,-213);

        part10HWSpri = createSprite("img/part10/haiyan2.png",{
            x:0,
            y:0
        });
        part10HWSpri.scale.set(0.6);
        part10HW.addChild(part10HWSpri);

        // 就算 曾经的足迹被风沙掩埋
        part10Talk = createSprite("img/part10/talk.png",{
           x:5500-100,
            y:48
        });

        part10.addChild(part10Z16,part10Z17,part10Z15,part10Z14,part10Z13,part10Z12,
            part10Z11,part10Z10,part10Z8,part10Z9,part10Z1,part10Z2,part10Z3,part10Z4,
            part10Z5,part10Z7,part10Z6,part10Wave1,part10Wave3,part10Wave2,part10Stone1,
            part10Tu1,part10Tu2,part10Tu3,part10Date,part10Pao,part10HW,part10HaiyanCont,
            part10Talk);

        // 第十一场景
        var part11 = new PIXI.Container();
        part11.position.set(38514,0);

        part11F1 = createSprite("img/part11/f1.png",{
           x:0+51,
           y:333+518,
            rotation: -0.4
        });
        part11F1.pivot.set(51,518);
        part11F2 = createSprite("img/part11/f2.png",{
            x:180-71-250,
            y:339+511,
            rotation: -0.15
        });
        part11F2.pivot.set(-71,511);
        part11F3 = createSprite("img/part11/f3.png",{
            x:217+280,
            y:409+637,
            rotation: -0.3
        });
        part11F3.pivot.set(280,637);
        part11F4 = createSprite("img/part11/f4.png",{
            x:368+224,
            y:393+677,
            rotation: -0.4
        });
        part11F4.pivot.set(224,677);
        part11F5 = createSprite("img/part11/f5.png",{
            x:278+541,
            y:442+681,
            rotation: -0.2
        });
        part11F5.pivot.set(541,681);
        part11F6 = createSprite("img/part11/f6.png",{
            x:530-161,
            y:272+593,
            rotation: -0.3
        });
        part11F6.pivot.set(-161,593);
        part11F7 = createSprite("img/part11/f7.png",{
            x:576+157-200,
            y:383+663
            // rotation: -0.3
        });
        part11F7.pivot.set(157,663);
        part11F8 = createAnimatedSprite("img/part11/f8",6,{
            x:439+229,
            y:489+825,
            rotation: -0.5
        });
        part11F8.pivot.set(229,825);
        part11F9 = createSprite("img/part11/f9.png",{
            x:763-125,
            y:365+581,
            rotation: -0.3
        });
        part11F9.pivot.set(-125,581);
        part11F10 = createSprite("img/part11/f10.png",{
            x:763+45,
            y:476+704,
            rotation: -0.2
        });
        part11F10.pivot.set(45,704);

        // 爆炸
        var part11BoomCont = new PIXI.Container();
        part11BoomCont.position.set(1007,0);

        // 爆照底部
        var part11BoomBottom = createSprite("img/part11/boom-bottom.png",{
           x:247,
            y:327
        });
        // 爆炸左边
        part11BoomLeft = createSprite("img/part11/boom-left.png",{
            x:0+370,
            y:315+290
        });
        part11BoomLeft.pivot.set(370,290);
        part11BoomLeft.scale.set(0.7);
        // 爆照右边
        part11BoomRight = createSprite("img/part11/boom-right.png",{
           x:1032,
            y:353+330
        });
        part11BoomRight.pivot.set(0,330);
        part11BoomRight.scale.set(0.8);
        // 爆炸-鱼
        part11BoomFish = createSprite("img/part11/boom-fish.png",{
            x:590-789,
            y:456+1304,
            rotation: -1.65
        });
        part11BoomFish.pivot.set(-789,1304)
        // 爆炸中心
        part11BoomCenter = createSprite("img/part11/boom-center.png?v=1",{
            x:235+521,
            y:-40+850
        });
        part11BoomCenter.pivot.set(521,850);
        part11BoomCenter.scale.set(0);
        // 碎石
        part11Stone1 = createSprite("img/part11/stone1.png",{
           x:138+563,
            y:69+640
        });
        part11Stone1.pivot.set(563,640);
        part11Stone1.scale.set(0.6);
        // 碎石2
        part11Stone2 = createSprite("img/part11/stone2.png",{
            x:192+509,
            y:131+640
        });
        part11Stone2.pivot.set(509,640);
        part11Stone2.scale.set(0.7);
        // 爆炸 顶部
        var part11BoomTop = createSprite("img/part11/boom-top.png",{
            x:294,
            y:143
        });
        part11BoomCont.addChild(part11BoomBottom,part11BoomLeft,part11BoomRight,part11BoomFish,
            part11BoomCenter,part11Stone1,part11Stone2,part11BoomTop);

        part11.addChild(part11F1,part11F2,part11F3,part11F4,part11F9,
            part11F6,part11F10,part11F7,part11F5,part11F8,part11BoomCont);

        // 第十二场景
        part12 = new PIXI.Container();
        part12.position.set(40353+3136,271);
        part12.pivot.set(3136,271);

        var part12Bg = createSprite("img/part12/bg.png",{
            x:0,
            y:0
        });
        part12Person = createSprite("img/part12/person.png",{
            x:620-150,
            y:0
        });

        part12BlackMaskCont = new PIXI.Container();
        part12BlackMaskCont.position.set(-1993+3036,320);
        part12BlackMaskCont.pivot.set(3036,320);
        part12BlackMaskCont.scale.y = 1.2;
        part12BlackMaskCont.scale.set(0);

        var part12BlackMask = new PIXI.Graphics();
        part12BlackMask.beginFill("0x999999","0.8");
        part12BlackMask.drawCircle(3036,320,3036);
        part12BlackMask.endFill();

        part12BlackMaskCont.addChild(part12BlackMask);

        // 黑色块
        var part12Black = createSprite("img/part12/black.png",{
            x:1119,
            y:0
        });

        part12Black.mask = part12BlackMask;

        // 抑或是勇敢的冲破天际
        var part12Talk = createSprite("img/part12/talk.png",{
            x:1592,
            y:333
        });

        part12DateCont = new PIXI.Container();
        part12DateCont.position.set(2983,0);

        part12Date = createAnimatedSprite("img/part12/date",12,{
            x:0,
            y:0
        });

        part12DateCont.addChild(part12Date);

        part12Date2 = createSprite("img/part12/date.png",{
            x:666,
            y:429
        });

        var part12Bg2 = new PIXI.Graphics();
        part12Bg2.beginFill("0xffffff");
        part12Bg2.drawRect(2085,0,789,640);
        part12Bg2.endFill();

        part12.addChild(part12Bg,part12Bg2,part12Black,part12Person,part12Date2,part12BlackMaskCont,
            part12Talk,part12DateCont,part12DateCont);

        // 第十三场景
        part13 = new PIXI.Container();
        part13.position.set(42518-250,0);

        part13Bg1 = new PIXI.Graphics();
        part13Bg1.beginFill("0x000000");
        part13Bg1.drawRect(250,0,2330-250,640);
        part13Bg1.endFill();

        // 流星
        part13Liuxing = createSprite("img/part13/liuxing.png",{
           x:340,
            y:-640
        });

        // 其他部分
        var part13O2Cont = new PIXI.Container();
        part13O2Cont.position.set(1100,0);

        // 人1
        part13P1Cont = new PIXI.Container();
        part13P1Cont.position.set(0+400,124);
        // 人1背景
        var part13P1Bg = createSprite("img/part13/p1-bg.png",{
            x:0,
            y:0
        });
        // 人1 少女
        var part13P1Girl = createSprite("img/part13/p1-girl.png",{
            x:251,
            y:13
        });
        // 人1 扫描遮罩
        part13P1MaskCont = new PIXI.Container();
        part13P1MaskCont.position.set(89+219,-22+219);
        part13P1MaskCont.pivot.set(219,219);
        // TweenMax.fromTo(part13P1MaskCont,5,{rotation:0},{rotation:Math.PI*4,ease:Linear.easeNone}).repeat(-1);

        part13P1Mask1 = createSprite("img/part13/circle.png",{
            x:0,
            y:0
        });
        part13P1Mask2 = createSprite("img/part13/line.png",{
            x:0,
            y:0
        });
        part13P1MaskCont.addChild(part13P1Mask1,part13P1Mask2);
        part13P1Girl.mask = part13P1Mask1;

        // 人1脑仁
        var part13P1Top = createSprite("img/part13/p1-top.png",{
            x:135,
            y:0
        });
        var part13P1TopMask = createSprite("img/part13/maskmask.png",{
            x:135,
            y:0
        });
        part13P1Mask2.mask = part13P1TopMask;
        part13P1Cont.addChild(part13P1Bg,part13P1Girl,part13P1MaskCont,part13P1TopMask,part13P1Top);

        // 人2
        part13P2Cont = new PIXI.Container();
        part13P2Cont.position.set(446+150,0);
        part13P2Cont.alpha = 0;

        // 人2 背景
        var part13P2Bg = createSprite("img/part13/p2-bg.png?v=1",{
            x:-212,
            y:0
        });

        // 人2 少女
        var part13P2Girl = createSprite("img/part13/p2-girl.png",{
            x:110,
            y:0
        });
        // 人2 扫描遮罩
        part13P2MaskCont = new PIXI.Container();
        part13P2MaskCont.position.set(48+137,-27+137);
        part13P2MaskCont.pivot.set(137,137);
        part13P2Tween = TweenMax.fromTo(part13P2MaskCont,2.5,{rotation:0},{rotation:Math.PI*2,ease:Linear.easeNone}).repeat(-1);
        part13P2Tween.pause();

        part13P2Mask1 = createSprite("img/part13/circle2.png",{
            x:0,
            y:0
        });
        part13P2Mask2 = createSprite("img/part13/line2.png",{
            x:0,
            y:0
        });
        part13P2MaskCont.addChild(part13P2Mask1,part13P2Mask2);
        part13P2Girl.mask = part13P2Mask1;

        // 人2脑仁
        var part13P2Top = createSprite("img/part13/p2-top.png",{
            x:63,
            y:0
        });
        var part13P2TopMask = createSprite("img/part13/maskmask2.png",{
            x:63,
            y:0
        });
        part13P2Mask2.mask = part13P2TopMask;
        part13P2Cont.addChild(part13P2Bg,part13P2Girl,part13P2MaskCont,part13P2TopMask,part13P2Top);

        // 太空场景
        var part13TaikongCont = new PIXI.Container();
        part13TaikongCont.position.set(902,0);

        // 太空黑色背景
        var part13TaikongBg2 = createSprite("img/part13/tkbg2.png",{
           x:24,
            y:0
        });

        // 流星2
        part13Liuxing2 = createSprite("img/part13/liuxing.png",{
            x:-375,
            y:-640
        });

        // 星球1
        part13Xq1 = createSprite("img/part13/xq1.png",{
            x:182+100,
            y:63
        });
        // 星球2
        part13Xq2 = createSprite("img/part13/xq2.png",{
            x:223+50,
            y:68
        });
        // 星球3
        part13Xq3 = createSprite("img/part13/xq3.png",{
            x:289+150,
            y:87
        });
        // 星球4
        part13Xq4 = createSprite("img/part13/xq4.png",{
            x:338+200,
            y:104
        });
        // 星球5
        part13Xq5 = createSprite("img/part13/xq5.png",{
            x:487+50,
            y:59
        });

        // 太空背景
        var part13TaikongBg = createSprite("img/part13/tkbg.png",{
            x:0,
            y:34
        });

        // 太空人
        part13TKPerson = createSprite("img/part13/tkp1.png",{
            x:249,
            y:399
        });

        // 太空秋千
        part13Qiuqian = createAnimatedSprite("img/part13/q",10,{
            x:203-50,
            y:-79
        });

        // 直到有一天 我们在太空下重逢
        part13Talk = createSprite("img/part13/talk.png",{
            x:743-100,
            y:507
        });

        part13TaikongCont.addChild(part13TaikongBg2,part13Xq1,part13Xq2,part13Xq3,
            part13Xq4,part13Xq5,part13Liuxing2,part13TaikongBg,part13TKPerson,part13Qiuqian,part13Talk);

        part13O2Cont.addChild(part13P2Cont,part13P1Cont,part13TaikongCont);

        part13.addChild(part13Bg1,part13Liuxing,part13O2Cont);

        // 第十四场景
        part14 = new PIXI.Container();
        part14.position.set(46200,0);

        part14YinCont = new PIXI.Container();
        part14YinCont.position.set(0,0);
        var part14Yin1 = createSprite("img/part14/y1.png",{
            x:256,
            y:281,
            alpha:0
        });
        var part14Yin2 = createSprite("img/part14/y2.png",{
            x:271,
            y:275,
            alpha:0
        });
        var part14Yin3 = createSprite("img/part14/y3.png",{
            x:289,
            y:264,
            alpha:0
        });
        var part14Yin4 = createSprite("img/part14/y4.png",{
            x:312,
            y:257,
            alpha:0
        });
        var part14Yin5 = createSprite("img/part14/y5.png",{
            x:348,
            y:251,
            alpha:0
        });
        var part14Yin6 = createSprite("img/part14/y6.png",{
            x:396,
            y:205,
            alpha:0
        });
        part14Yin7 = createSprite("img/part14/y7.png",{
            x:442,
            y:0,
            alpha:0
        });
        part14YinCont.addChild(part14Yin1,part14Yin2,part14Yin3,part14Yin4,part14Yin5,part14Yin6,part14Yin7);

        // 日期
        var part14Date = createSprite("img/part14/date.png",{
            x:1292,
            y:312
        });

        // 电码1
        part14M1 = createSprite("img/part14/m1.png",{
            x:652+100,
            y:22
        });
        part14M2 = createSprite("img/part14/m2.png",{
            x:691+60,
            y:218
        });
        part14M3 = createSprite("img/part14/m3.png",{
            x:628+90,
            y:322
        });
        part14M4 = createSprite("img/part14/m4.png",{
            x:644+50,
            y:477
        });
        part14M5 = createSprite("img/part14/m5.png",{
            x:694+80,
            y:577
        });
        part14M6 = createSprite("img/part14/m6.png",{
            x:1059+100,
            y:324
        });
        part14M7 = createSprite("img/part14/m7.png",{
            x:1095+40,
            y:427
        });
        part14M8 = createSprite("img/part14/m8.png",{
            x:1261+100,
            y:531
        });
        part14M9 = createSprite("img/part14/m9.png",{
            x:1323+30,
            y:219
        });
        part14M10 = createSprite("img/part14/m10.png",{
            x:1477+50,
            y:17
        });
        part14M11 = createSprite("img/part14/m11.png",{
            x:1461+60,
            y:325
        });
        part14M12 = createSprite("img/part14/m12.png",{
            x:1542+20,
            y:111
        });
        part14M13 = createSprite("img/part14/m13.png",{
            x:1536+70,
            y:384
        });
        part14M14 = createSprite("img/part14/m14.png",{
            x:1586+50,
            y:368
        });
        part14M15 = createSprite("img/part14/m15.png",{
            x:1532+90,
            y:503
        });
        part14M16 = createSprite("img/part14/m16.png",{
            x:1771+100,
            y:130
        });
        part14M17 = createSprite("img/part14/m17.png",{
            x:1901+30,
            y:431
        });
        part14M18 = createSprite("img/part14/m18.png",{
            x:1931+90,
            y:516
        });
        part14M19 = createSprite("img/part14/m19.png",{
            x:2101+35,
            y:27
        });
        part14M20 = createSprite("img/part14/m20.png",{
            x:2108+20,
            y:222
        });
        part14M21 = createSprite("img/part14/m21.png",{
            x:2124+50,
            y:297
        });
        part14M22 = createSprite("img/part14/m6.png",{
           x:2262+100+90,
            y:152
        });
        part14M23 = createSprite("img/part14/m3.png",{
            x:2470+60,
            y:56
        });
        part14M24 = createSprite("img/part14/m2.png",{
            x:2344+40,
            y:282
        });
        part14M25 = createSprite("img/part14/m4.png",{
            x:2355+70,
            y:473
        });

        // ET
        var part14ETCont = new PIXI.Container();
        part14ETCont.position.set(1634,64);
        part14ETBg = createSprite("img/part14/etbg.png",{
            x:0,
            y:0
        });
        // ET手
        part14ETHand = createAnimatedSprite("img/part14/hand",5,{
            x:403,
            y:284
        });
        // ET 光
        part14ETLight = createSprite("img/part14/etlight.png?v=1",{
           x:-1105+1548,
            y:-1230+1548
        });
        part14ETLight.pivot.set(1548,1548);
        part14ETLight.scale.set(0);
        part14ETLight.displayGroup = index1;
        part14ETCont.addChild(part14ETBg,part14ETHand,part14ETLight);

        // 14场景背景延长
        part14BgMore = new PIXI.Graphics();
        part14BgMore.beginFill("0x000000");
        part14BgMore.drawRect(1634,0,2000,640);
        part14BgMore.endFill();

        part14.addChild(part14BgMore,part14YinCont,part14M18,part14M15,part14M17,part14M13,
            part14M21,part14M20,part14M16,part14M12,part14M8,part14M9,part14M22,part14M23,part14M24,
            part14M5,part14M25,part14M11,part14M7,part14M4,part14M6,part14M3,part14M9,part14M19,
            part14M2,part14M1,part14ETCont,part14M10,part14M14,part14Date);

        // 最后一页
        part15 = new PIXI.Container();
        part15.position.set(47680,0);

        part15Talk = createSprite("img/part15/talk.png?v=1",{
            x: ($(window).height()-261)/2,
            y: ($(window).width()-74)/2,
            alpha:0
        });
        part15Talk.displayGroup = index1;

        part15.addChild(part15Talk);

        container.addChild(part3,part2,part1,part4,part6,part7,part8,part14,part13,part12,part11,part10,part9,part15);
        app.stage.addChild(container,titleContainer);

        init();
    });
}

function part9WavePause(){
    W1Ani.pause();
    W2Ani.pause();
    W3Ani.pause();
    W4Ani.pause();
    W5Ani.pause();
    W6Ani.pause();
    W7Ani.pause();
}

function part9WavePlay(){
    W1Ani.play();
    W2Ani.play();
    W3Ani.play();
    W4Ani.play();
    W5Ani.play();
    W6Ani.play();
    W7Ani.play();
}

// 滚动
function scrollBegin(){
    scroller = new Scroller(function(left, top, zoom) {
        if(scrollDirection == "top"){
            container.x = -top;
        }
        if(scrollDirection == "left"){
            container.x = -left;
        }
        scrollPro = left > top ? left : top;
        console.log(scrollPro);

        // 第一部分 怀表线的遮罩
        if(100 < scrollPro && scrollPro < 2600){
            part1BiaoMaskCont.scale.x = scrollNum(100,2600,scrollPro,0,1);
        }
        if(0 < scrollPro && scrollPro < 100){
            part1BiaoMaskCont.scale.x = 0;
        }
        if(2600 < scrollPro){
            part1BiaoMaskCont.scale.x = 1;
        }

        // 第一部分 怀表针
        if(2080 < scrollPro && scrollPro < 3900){
            part1Zhen1.rotation = scrollNum(2080,3900,scrollPro,0,Math.PI*24);
            part1Zhen2.rotation = scrollNum(2080,3900,scrollPro,0,Math.PI*2);
            part1Zhen1.scale.x = scrollNum(2080,3900,scrollPro,1,(((1+Math.cos((scrollPro-2080)*(48*Math.PI)/(3900-2080)))/20*3)+0.7));
            part1Zhen1.scale.y = scrollNum(2080,3900,scrollPro,1,(((1+Math.cos((scrollPro-2080)*(48*Math.PI)/(3900-2080)))/20*3)+0.7));
        }

        // 跳进兔子洞里
        if(2400 < scrollPro && scrollPro < 3940){
            part1Talk.x = scrollNum(2400,3940,scrollPro,3010+100,3010-100);
        }

        // 第二场景 时间隧道
        if(4150 < scrollPro && scrollPro < 6000){
            part2.x = scrollNum(4150,6000,scrollPro,3571,3571+6000-4150);
            part3.x = scrollNum(4150,6000,scrollPro,3571+551+10,3571+551+10+6000-4150);
        }
        // 隧道旋转
        if(2600 < scrollPro && scrollPro < 6000){
            part2HoleCont.rotation = scrollNum(2600,6000,scrollPro,0,8);
            part1HoleThing1.rotation = scrollNum(2600,6000,scrollPro,0,-2);
            part1HoleThing2.rotation = scrollNum(2600,6000,scrollPro,0,-5);
            part1HoleThing3.rotation = scrollNum(2600,6000,scrollPro,2,-6);

            part1HoleThing1.scale.x = scrollNum(2600,6000,scrollPro,0.4,1.2);
            part1HoleThing1.scale.y = scrollNum(2600,6000,scrollPro,0.4,1.2);

            part1HoleThing2.scale.x = scrollNum(2600,6000,scrollPro,0.2,1);
            part1HoleThing2.scale.y = scrollNum(2600,6000,scrollPro,0.2,1);

            part1HoleThing3.scale.x = scrollNum(2600,6000,scrollPro,0.5,1);
            part1HoleThing3.scale.y = scrollNum(2600,6000,scrollPro,0.5,1);
        }
        // 隧道放大
        if(2600 < scrollPro && scrollPro < 4150){
            part2HoleCont.scale.x = scrollNum(2600,4150,scrollPro,0.4,1);
            part2HoleCont.scale.y = scrollNum(2600,4150,scrollPro,0.4,1);
        }
        if(1000 < scrollPro && scrollPro < 4150){
            part3Bg.alpha = 1;
        }
        if(4150 < scrollPro){
            part3Bg.alpha = 0;
        }
        // 隧道切换到指引猫
        if(4150 < scrollPro && scrollPro < 5050){
            part2HoleCont.scale.x = scrollNum(4150,5050,scrollPro,1,6);
            part2HoleCont.scale.y = scrollNum(4150,5050,scrollPro,1,6);
        }
        if(5000 < scrollPro && scrollPro < 5100){
            part2HoleCont.alpha = scrollNum(5000,5100,scrollPro,1,0);
        }
        if(1000 < scrollPro && scrollPro < 5000){
            part2HoleCont.alpha = 1;
        }
        if(5100 < scrollPro){
            part2HoleCont.alpha = 0;
        }

        if(3850 < scrollPro && scrollPro < 4050){
            part3Bg2.alpha = scrollNum(3850,4050,scrollPro,1,0);
        }
        if(1000 < scrollPro && scrollPro < 3850){
            part3Bg2.alpha = 1;
        }
        if(4050 < scrollPro){
            part3Bg2.alpha = 0;
        }

        // 猫上移
        if(4333 < scrollPro && scrollPro < 6950){
            part3Tree2.y = scrollNum(4333,6950,scrollPro,-104+217,-104);
            part3Cat.y = scrollNum(4333,6950,scrollPro,24+217,24);
        }

        if(2000 < scrollPro && scrollPro < 4333){
            part3Tree2.y = -104+217;
            part3Cat.y = 24+217;
        }

        if(4150 < scrollPro && scrollPro < 5100){
            part3MaskCont.scale.x = scrollNum(4150,5100,scrollPro,0.02,0.3);
            part3MaskCont.scale.y = scrollNum(4150,5100,scrollPro,0.02,0.3);

            part2HoleHole.scale.x = scrollNum(4150,5100,scrollPro,1,10);
            part2HoleHole.scale.y = scrollNum(4150,5100,scrollPro,1,10);
            part2HoleHole.x = scrollNum(4150,5100,scrollPro,1072,1072+50);
        }
        if(2000 < scrollPro && scrollPro < 4150){
            part3MaskCont.scale.x = 0.02;
            part3MaskCont.scale.y = 0.02;

            part2HoleHole.scale.x = 1;
            part2HoleHole.scale.y =1;
            part2HoleHole.x = 1072;
        }

        if(2000 < scrollPro && scrollPro < 4500){
            part2HoleHole.alpha = 1;
        }
        if(4500 < scrollPro && scrollPro < 6600){
            part2HoleHole.alpha = 0;
        }
        if(5100 < scrollPro && scrollPro < 6000){
            part3MaskCont.scale.x = scrollNum(5100,6000,scrollPro,0.3,1);
            part3MaskCont.scale.y = scrollNum(5100,6000,scrollPro,0.3,1);
        }
        if(6000 < scrollPro){
            part3MaskCont.scale.x = 4;
            part3MaskCont.scale.y = 4;
            part3Bg1.alpha = 0;
            part3BgBlack.alpha = 0;
        }
        if(1000 < scrollPro && scrollPro < 6000){
            part3Bg1.alpha = 1;
            part3BgBlack.alpha = 1;
        }

        // 第二部分 树1
        if(4500 < scrollPro && scrollPro < 7050){
            part3Tree1.x = scrollNum(4500,7050,scrollPro,351+250,351);
        }
        // 小女孩
        if(4500 < scrollPro && scrollPro < 7000){
            part3Girl.x = scrollNum(4500,7000,scrollPro,327,327+100);
            part3Girl.y = scrollNum(4500,7000,scrollPro,316+92,316-40);
        }

        // 下烟
        if(6150-100 < scrollPro && scrollPro < 6700-100){
            part3Yan3.scale.x = scrollNum(6150-100,6700-100,scrollPro,0,1);
            part3Yan3.scale.y = scrollNum(6150-100,6700-100,scrollPro,0,1);
            part3Yan3.alpha = scrollNum(6150-100,6700-100,scrollPro,0.2,1);
        }
        if(1000 < scrollPro && scrollPro < 6150-100){
            part3Yan3.scale.x = 0;
            part3Yan3.scale.y = 0;
            part3Yan3.alpha = 0.2;
        }
        // 烟
        if(6600-100 < scrollPro && scrollPro < 6900-100){
            part3Yan.scale.x = scrollNum(6600-100,6900-100,scrollPro,0,1);
            part3Yan.scale.y = scrollNum(6600-100,6900-100,scrollPro,0,1);
            part3Yan.y = scrollNum(6600-100,6900-100,scrollPro,326+149+60,326+149);
        }
        if(1000 < scrollPro && scrollPro < 6600-100){
            part3Yan.scale.x = 0;
            part3Yan.scale.y = 0;
            part3Yan.y = 326+149+60;
        }
        // 虫子
        if(6900-100 < scrollPro && scrollPro < 7100-100){
            part3Chong.alpha = scrollNum(6900-100,7100-100,scrollPro,0,1);
        }
        if(1000 < scrollPro && scrollPro < 6900-100){
            part3Chong.alpha = 0;
        }
        if(7100-100 < scrollPro){
            part3Chong.alpha = 1;
        }
        // 左右烟
        if(6900-100 < scrollPro && scrollPro < 7200-100){
            part3Yan1.scale.x = scrollNum(6900-100,7200-100,scrollPro,0,1);
            part3Yan1.scale.y = scrollNum(6900-100,7200-100,scrollPro,0,1);
            part3Yan1.alpha = scrollNum(6900-100,7200-100,scrollPro,0.2,1);

            part3Yan2.scale.x = scrollNum(6900-100,7200-100,scrollPro,0,1);
            part3Yan2.scale.y = scrollNum(6900-100,7200-100,scrollPro,0,1);
            part3Yan2.alpha = scrollNum(6900-100,7200-100,scrollPro,0.2,1);
        }
        if(1000 < scrollPro && scrollPro < 6900-100){
            part3Yan1.scale.x = 0;
            part3Yan1.scale.y = 0;
            part3Yan1.alpha = 0.2;

            part3Yan2.scale.x = 0;
            part3Yan2.scale.y = 0;
            part3Yan2.alpha = 0.2;
        }
        // 好奇心
        if(5400 < scrollPro && scrollPro < 7400){
            part3Talk.x = scrollNum(5400,7400,scrollPro,849,849+30);
        }
        if(5680 < scrollPro && scrollPro < 7200){
            part3Date.x = scrollNum(5680,7200,scrollPro,1009-80,1009+80);
        }
        // 虫子全部
        if(6100 < scrollPro && scrollPro < 7800){
            part3ChongCont.x = scrollNum(6100,7800,scrollPro,1007,1007+100);
        }
        // 子弹
        if(6610 < scrollPro && scrollPro < 6650){
            part3ZidanCont.alpha = scrollNum(6610,6650,scrollPro,0,1);
        }
        if(1000 < scrollPro && scrollPro < 6610){
            part3ZidanCont.alpha = 0;
        }
        if(6650 < scrollPro){
            part3ZidanCont.alpha = 1;
        }

        // 第三部分 背景 左山
        if(5300 < scrollPro && scrollPro < 7800){
            part3ShanLeft.x = scrollNum(5300,7800,scrollPro,743+707+300,743+707);
            part3ShanLeft.scale.x = scrollNum(5300,7800,scrollPro,1,0.5);
            part3ShanLeft.scale.y = scrollNum(5300,7800,scrollPro,1,0.5);
        }

        if(6360 < scrollPro && scrollPro < 8400){
            part3ShanRight.x = scrollNum(6360,8400,scrollPro,1546+150,1546-150);
        }

        if(6550 < scrollPro && scrollPro < 9250){
            part3Wave.x = scrollNum(6550,9250,scrollPro,1737+100+80,1737+100-80);
        }

        if(6900 < scrollPro && scrollPro < 9000){
            part3Senlin.x = scrollNum(6900,9000,scrollPro,2167+100+150,2167+100-150);
        }
        if(6400 < scrollPro && scrollPro < 9160){
            part3Cloud.x = scrollNum(6400,9160,scrollPro,1837+100,1837-100);
        }
        if(6300 < scrollPro && scrollPro < 9550){
            part3BlackBg.x = scrollNum(6300,9550,scrollPro,1618,1618+50);
        }

        if(6000 < scrollPro && scrollPro < 7170){
            part3ZidanCont.alpha = 0;
        }

        if(7170 < scrollPro && scrollPro < 7190){
            part3ZidanCont.alpha = scrollNum(7170,7190,scrollPro,0,1);
        }
        if(7190 < scrollPro&& scrollPro < 7800){
            part3ZidanCont.alpha = 1;
        }

        if(6600 < scrollPro && scrollPro < 6900){
            part3ZidanCont.x = scrollNum(6600,6900,scrollPro,830,830+100);
            part3ZidanCont.y = scrollNum(6600,6900,scrollPro,100,550);
        }
        if(6900 < scrollPro && scrollPro < 7800){
            part3ZidanCont.x = scrollNum(6900,7800,scrollPro,830+100,2480);
            part3ZidanCont.y = scrollNum(6900,7800,scrollPro,550,435);
        }
        if(6800 < scrollPro && scrollPro < 7400){
            part3ZidanCont.scale.x = scrollNum(6800,7400,scrollPro,0.4,1);
            part3ZidanCont.scale.y = scrollNum(6800,7400,scrollPro,0.4,1);
        }

        if(7800 < scrollPro && scrollPro < 7800+800){
            part3ZidanCont.x = scrollNum(7800,7800+800,scrollPro,2480,2480+800);
        }
        if(7800+800 < scrollPro){
            part3ZidanCont.x = 2480+800;
        }

        if(6200 < scrollPro && scrollPro < 7600){
            part3Z1.x = scrollNum(6200,7600,scrollPro,0,0);
            part3Z1.y = scrollNum(6200,7600,scrollPro,0,0);

            part3Z2.x = scrollNum(6200,7600,scrollPro,0,110);
            part3Z2.y = scrollNum(6200,7600,scrollPro,0,40);

            part3Z3.x = scrollNum(6200,7600,scrollPro,0,50);
            part3Z3.y = scrollNum(6200,7600,scrollPro,0,30);

            part3Z4.x = scrollNum(6200,7600,scrollPro,0,60);
            part3Z4.y = scrollNum(6200,7600,scrollPro,0,40);

            part3Z5.x = scrollNum(6200,7600,scrollPro,0,250);
            part3Z5.y = scrollNum(6200,7600,scrollPro,0,144);

            part3Z6.x = scrollNum(6200,7600,scrollPro,0,130);
            part3Z6.y = scrollNum(6200,7600,scrollPro,0,200);

            part3Z7.x = scrollNum(6200,7600,scrollPro,0,190);
            part3Z7.y = scrollNum(6200,7600,scrollPro,0,118);

            part3Z8.x = scrollNum(6200,7600,scrollPro,0,60);
            part3Z8.y = scrollNum(6200,7600,scrollPro,0,120);

            part3Z9.x = scrollNum(6200,7600,scrollPro,0,230);
            part3Z9.y = scrollNum(6200,7600,scrollPro,0,71);
        }

        if(7600 < scrollPro && scrollPro < 7900){
            part3Z1.x = scrollNum(7600,7900,scrollPro,0,5);
            part3Z1.y = scrollNum(7600,7900,scrollPro,0,1);

            part3Z2.x = scrollNum(7600,7900,scrollPro,110,20);
            part3Z2.y = scrollNum(7600,7900,scrollPro,40,8);

            part3Z3.x = scrollNum(7600,7900,scrollPro,50,46);
            part3Z3.y = scrollNum(7600,7900,scrollPro,30,15);

            part3Z4.x = scrollNum(7600,7900,scrollPro,60,28);
            part3Z4.y = scrollNum(7600,7900,scrollPro,40,27);

            part3Z5.x = scrollNum(7600,7900,scrollPro,250,16);
            part3Z5.y = scrollNum(7600,7900,scrollPro,144,42);

            part3Z6.x = scrollNum(7600,7900,scrollPro,130,43);
            part3Z6.y = scrollNum(7600,7900,scrollPro,200,44);

            part3Z7.x = scrollNum(7600,7900,scrollPro,190,10);
            part3Z7.y = scrollNum(7600,7900,scrollPro,118,31);

            part3Z8.x = scrollNum(7600,7900,scrollPro,60,22);
            part3Z8.y = scrollNum(7600,7900,scrollPro,120,33);

            part3Z9.x = scrollNum(7600,7900,scrollPro,230,0);
            part3Z9.y = scrollNum(7600,7900,scrollPro,71,66);
        }
        if(7900 < scrollPro){
            part3Z1.x = 5;
            part3Z1.y = 1;

            part3Z2.x = 20;
            part3Z2.y = 8;

            part3Z3.x = 46;
            part3Z3.y = 15;

            part3Z4.x = 28;
            part3Z4.y = 27;

            part3Z5.x = 16;
            part3Z5.y = 42;

            part3Z6.x = 43;
            part3Z6.y = 44;

            part3Z7.x = 10;
            part3Z7.y = 31;

            part3Z8.x = 22;
            part3Z8.y = 33;

            part3Z9.x = 0;
            part3Z9.y = 66;
        }

        if(7850 < scrollPro && scrollPro < 8000){
            part3ZidanMaskCont.scale.x = scrollNum(7850,8000,scrollPro,0,1);

        }
        if(1000 < scrollPro && scrollPro < 7850){
            part3ZidanMaskCont.scale.x = 0;
        }
        if(8000 < scrollPro){
            part3ZidanMaskCont.scale.x = 1;
        }

        // 也许是因为地球外的世界格外迷人
        if(6750 < scrollPro && scrollPro < 8570){
            part3Talk2.x = scrollNum(6750,8570,scrollPro,1897-50,1897+50);
        }

        // 子弹air1
        if(7200 < scrollPro && scrollPro < 7400+1150){
            part3Air1.x = scrollNum(7200,7400+1150,scrollPro,2760-400,2760+520);
        }
        if(7400+1150 < scrollPro){
            part3Air1.x = 2760+520;
        }

        // 子弹air2
        if(7500 < scrollPro && scrollPro < 7500+950){
            part3Air2.x = scrollNum(7500,7500+950,scrollPro,2923-300,2923+400);
        }
        if(7500+950 < scrollPro){
            part3Air2.x = 2923+400;
        }

        // 日期
        if(7650 < scrollPro && scrollPro < 9030){
            part4Date.x = scrollNum(7650,9030,scrollPro,-184-120-50,-184-120+50);
        }

        // 月亮前子弹
        if(7450+100 < scrollPro && scrollPro < 8620+100){
            part4Zidan.x = scrollNum(7450+100,8620+100,scrollPro,56+244-450,56+244);
            part4Zidan.y = scrollNum(7450+100,8620+100,scrollPro,248+250+31,248+31);

            part4Zidan.scale.x = scrollNum(7450+100,8620+100,scrollPro,1.4,1);
            part4Zidan.scale.y = scrollNum(7450+100,8620+100,scrollPro,1.4,1);
        }
        if(8620+100 < scrollPro){
            part4Zidan.x = 56+244;
            part4Zidan.y = 248+31;
            part4Zidan.scale.x = 1;
            part4Zidan.scale.y = 1;
        }
        if(8620-30+100 < scrollPro && scrollPro < 8920-30+100){
            for(var i = 0; i < 6; i++){
                var num1 = 8620-30+100 + (300)/6 * i;
                var num2 = 8620-30+100 + (300)/6 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part4Moon.gotoAndStop(i);
                }
            }
        }
        if(8620-30+100 < scrollPro && scrollPro < 8920+100){
            for(var i = 0; i < 5; i++){
                var num1 = 8620-30+100 + (300)/5 * i;
                var num2 = 8620-30+100 + (300)/5 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part4Zidan.gotoAndStop(i);
                }
            }
        }

        // 月亮放大位移
        if(8920+100 < scrollPro && scrollPro < 11000){
            // part4MoonCont.rotation = scrollNum(8920,11000,scrollPro,0,2);
            part4MoonCont.scale.x = scrollNum(8920+100,11000,scrollPro,1,4.65);
            part4MoonCont.scale.y = scrollNum(8920+100,11000,scrollPro,1,4.65);
            part4MoonCont.x = scrollNum(8920+100,11000,scrollPro,372,372+1000+1000);
            part4MoonCont.y = scrollNum(8920+100,11000,scrollPro,295,295+860+100);
        }
        if(11000 < scrollPro && scrollPro < 15000){
            part4MoonCont.x = scrollNum(11000,15000,scrollPro,372+1000+1000,372+1000+1000+4000);
        }
        // if(5000 < scrollPro && scrollPro < 8920){
        //     part4MoonCont.rotation = 0;
        //     part4MoonCont.scale.x = 1;
        //     part4MoonCont.scale.y = 1;
        //     part4MoonCont.x = 372;
        //     part4MoonCont.y = 295;
        // }

        // 月亮旋转
        if(8920+100 < scrollPro && scrollPro < 14000){
            part4MoonCont.rotation = scrollNum(8920+100,14000,scrollPro,0,4.408);
        }
        if(14000 < scrollPro){
            part4MoonCont.rotation = 4.408;
        }
        // 第五场景放大
        if(12500 < scrollPro && scrollPro < 15000){
            part4MoonCont.scale.x = scrollNum(12500,15000,scrollPro,4.65,4.65*2);
            part4MoonCont.scale.y = scrollNum(12500,15000,scrollPro,4.65,4.65*2);
            part4MoonCont.y = scrollNum(12500,15000,scrollPro,295+860+100,295+860+850);
        }
        if(11000 < scrollPro && scrollPro < 12500){
            part4MoonCont.scale.x = 4.65;
            part4MoonCont.scale.y = 4.65;
            part4MoonCont.y = 295+860+100;
        }
        if(15000 < scrollPro && scrollPro < 17000){
            part4MoonCont.scale.x = 4.65*2;
            part4MoonCont.scale.y = 4.65*2;
            part4MoonCont.y = 295+860+850;
        }

        // 月亮渐隐渐现
        if(9400 < scrollPro && scrollPro < 9500){
            part4BigMoonCont.alpha = scrollNum(9400,9500,scrollPro,0,1);
        }
        if(6000 < scrollPro && scrollPro < 9400){
            part4BigMoonCont.alpha = 0;
        }
        if(9500 < scrollPro){
            part4BigMoonCont.alpha =1;
        }

        if(9450 < scrollPro && scrollPro < 9700){
            part4Moon.alpha = scrollNum(9450,9700,scrollPro,1,0);
            part4Zidan.alpha = scrollNum(9450,9700,scrollPro,1,0);
        }
        if(6000 < scrollPro && scrollPro < 9450){
            part4Moon.alpha = 1;
            part4Zidan.alpha = 1;
        }
        if(9700 < scrollPro){
            part4Moon.alpha = 0;
            part4Zidan.alpha = 0;
        }

        // 内容显现
        if(6000 < scrollPro && scrollPro < 9600){
            part5.alpha = 0;
            part4P1.alpha = 0;
            part4P2.alpha = 0;
            part4P3.alpha = 0;
            part4ZidankeCont.alpha = 0;
        }
        if(9600 < scrollPro && scrollPro < 12000){
            part5.alpha = 1;
            part4P1.alpha = 1;
            part4P2.alpha = 1;
            part4P3.alpha = 1;
            part4ZidankeCont.alpha = 1;
        }

        if(8720+40 < scrollPro && scrollPro < 9420+40){
            part4ZidanEnd.x = scrollNum(8720+40,9420+40,scrollPro,321+184,941+184);
            part4ZidanEnd.y = scrollNum(8720+40,9420+40,scrollPro,166+16,-144+16);
            part4ZidanEnd.scale.x = scrollNum(8720+40,9420+40,scrollPro,1,0.4);
            part4ZidanEnd.scale.y = scrollNum(8720+40,9420+40,scrollPro,1,0.4);
        }
        if(6000 < scrollPro && scrollPro < 8720+40){
            part4ZidanEnd.x = 321+184;
            part4ZidanEnd.y = 166+16;
            part4ZidanEnd.scale.x = 1;
            part4ZidanEnd.scale.y = 1;
        }
        if(9420+40 < scrollPro){
            part4ZidanEnd.x = 941+184;
            part4ZidanEnd.y = -144+16;
            part4ZidanEnd.scale.x = 0.4;
            part4ZidanEnd.scale.y = 0.4;
        }

        // 第四场景 左人
        if(11300 < scrollPro && scrollPro < 13250){
            part4P1.rotation = scrollNum(11300,13250,scrollPro,0,-0.2);
            part4P1.x = scrollNum(11300,13250,scrollPro,423+522-50,423+522+250);
            part4P1.y = scrollNum(11300,13250,scrollPro,11+937+50,11+937-150);
        }

        // 第四场景 两人
        if(11000 < scrollPro && scrollPro < 13300){
            part4P2.rotation = scrollNum(11000,13300,scrollPro,0,-0.2);
            part4P2.x = scrollNum(11000,13300,scrollPro,554+391-200,554+391+400)
            part4P2.y = scrollNum(11000,13300,scrollPro,11+937,11+937-100)
        }

        // 第四场景 右人
        if(10300 < scrollPro && scrollPro < 13000){
            part4P3.rotation = scrollNum(10300,13000,scrollPro,-0.2,0.2);
        }

        // 第四场景 最右人
        if(10560 < scrollPro && scrollPro < 12680){
            part4P4.rotation = scrollNum(10560,12680,scrollPro,-0.2,0.2);
            part4P4.x = scrollNum(10560,12680,scrollPro,864+78-10,864+78+10);
        }

        // 流星
        if(10300 < scrollPro && scrollPro < 11300){
            part4Liuxing1.x = scrollNum(10300,11300,scrollPro,1000-500,1000+1600);
            part4Liuxing1.y = scrollNum(10300,11300,scrollPro,-999,640);
        }
        if(8000 < scrollPro && scrollPro < 10300){
            part4Liuxing1.x = 1000-500;
            part4Liuxing1.y = -999;
        }
        if(11300 < scrollPro && scrollPro < 16000){
            part4Liuxing1.x = 1000+1600;
            part4Liuxing1.y = 640;
        }

        if(10300+1500 < scrollPro && scrollPro < 11300+1500){
            part4Liuxing2.x = scrollNum(10300+1500,11300+1500,scrollPro,1000-500+1500,1000+1600+1500);
            part4Liuxing2.y = scrollNum(10300+1500,11300+1500,scrollPro,-999,640);
        }
        if(8000 < scrollPro && scrollPro < 10300+1500){
            part4Liuxing2.x = 1000-500+1500;
            part4Liuxing2.y = -999;
        }
        if(11300+1500 < scrollPro && scrollPro < 16000){
            part4Liuxing2.x = 1000+1600+1500;
            part4Liuxing2.y = 640;
        }

        if(10300+3000 < scrollPro && scrollPro < 11300+3000){
            part4Liuxing3.x = scrollNum(10300+3000,11300+3000,scrollPro,1000-500+3000,1000+1600+3000);
            part4Liuxing3.y = scrollNum(10300+3000,11300+3000,scrollPro,-999,640);
        }
        if(8000 < scrollPro && scrollPro < 10300+3000){
            part4Liuxing3.x = 1000-500+3000;
            part4Liuxing3.y = -999;
        }
        if(11300+3000 < scrollPro && scrollPro < 16000){
            part4Liuxing3.x = 1000+1600+3000;
            part4Liuxing3.y = 640;
        }

        if(8150 < scrollPro && scrollPro < 16400){
            if(TweenStar11.paused()){
                TweenStar11.play();
                TweenStar12.play();
                TweenStar13.play();
                TweenStar21.play();
                TweenStar22.play();
                TweenStar23.play();
                TweenStar31.play();
                TweenStar32.play();
            }
        }
        if(3000 < scrollPro && scrollPro < 8150){
            TweenStar11.pause();
            TweenStar12.pause();
            TweenStar13.pause();
            TweenStar21.pause();
            TweenStar22.pause();
            TweenStar23.pause();
            TweenStar31.pause();
            TweenStar32.pause();
        }
        if(16400 < scrollPro){
            TweenStar11.pause();
            TweenStar12.pause();
            TweenStar13.pause();
            TweenStar21.pause();
            TweenStar22.pause();
            TweenStar23.pause();
            TweenStar31.pause();
            TweenStar32.pause();
        }

        // 子弹壳
        if(11700 < scrollPro && scrollPro < 12100){
            for(var i = 0; i < 7; i++){
                var num1 = 11700 + (12100-11700)/7 * i;
                var num2 = 11700 + (12100-11700)/7 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part4Zidanke.gotoAndStop(i);
                }
            }
        }

        // 第五场景 子弹
        if(13400 < scrollPro && scrollPro < 16300){
            part5Zidan1.x = scrollNum(13400,16300,scrollPro,-434,329+1000);
        }

        if(12600 < scrollPro && scrollPro < 16500){
            part5Zidan2.x = scrollNum(12600,16500,scrollPro,1286-1000,1286+300);
            part5Zidan2.y = scrollNum(12600,16500,scrollPro,533+100,533);
        }
        if(12650 < scrollPro && scrollPro < 16300){
            part5Yuhangyuan.x = scrollNum(12650,16300,scrollPro,885-600,885+100);
        }

        // 第五场景 日期
        if(13100 < scrollPro && scrollPro < 15750){
            part5Date.x = scrollNum(13100,15750,scrollPro,753-200,753-100);
        }

        // 我都愿意跋涉那不能跋涉的泥泞
        if(12550 < scrollPro && scrollPro < 17100){
            part5Talk.x = scrollNum(12550,17100,scrollPro,1482-300,1482+100);
        }

        if(14910 < scrollPro && scrollPro < 14950){
            part5Talk.alpha = scrollNum(14910,14950,scrollPro,0,1);
        }
        if(12000 < scrollPro && scrollPro < 14910){
            part5Talk.alpha = 0;
        }
        if(14950 < scrollPro && scrollPro < 17000){
            part5Talk.alpha = 1;
        }

        // 背景山
        if(14980 < scrollPro && scrollPro < 17050){
            part6Shan1.x = scrollNum(14980,17050,scrollPro,50,-200);
        }
        if(15555 < scrollPro && scrollPro < 17370){
            part6Shan2.x = scrollNum(15555,17370,scrollPro,651+80,651-80);
        }
        if(15500 < scrollPro && scrollPro < 18600){
            part6Shan3.x = scrollNum(15500,18600,scrollPro,396+25,396-25);
        }
        if(16560 < scrollPro && scrollPro < 18600){
            part6Shan4.x = scrollNum(16560,18600,scrollPro,1744+100,1744-100);
        }
        if(16950 < scrollPro && scrollPro < 18800){
            part6Shan5.x = scrollNum(16950,18800,scrollPro,2221+50,2221-50);
        }

        // 石阶
        if(11550+4520 < scrollPro && scrollPro < 12700+4520){
            for(var i = 0; i < 16; i++){
                var num1 = 11550+4520 + (12700-11550)/16 * i;
                var num2 = 11550+4520 + (12700-11550)/16 * (i+1);
                if(num1 < scrollPro && scrollPro < num2){
                    for(var j = 0; j < part6JieCont.children.length;j++){
                        if(j >= i){
                            part6JieCont.children[j].alpha = 0;
                        }else{
                            part6JieCont.children[j].alpha = 1;
                        }
                        if(j == 0) part6JieCont.children[0].alpha = 1;
                    }
                }
            }
        }
        // 小路
        if(12550+4520 < scrollPro && scrollPro < 13650+4520){
            for(var i = 0; i < 29; i++){
                var num1 = 12550+4520 + (13650-12550)/29 * i;
                var num2 = 12550+4520 + (13650-12550)/29 * (i+1);
                if(num1 < scrollPro && scrollPro < num2){
                    for(var j = 0; j < part6LuCont.children.length;j++){
                        if(j >= i){
                            part6LuCont.children[j].alpha = 0;
                        }else{
                            part6LuCont.children[j].alpha = 1;
                        }
                        if(j == 0) part6LuCont.children[0].alpha = 1;
                    }
                }
            }
        }

        // 第6场景 日期
        if(11300+4520 < scrollPro && scrollPro < 12780+4520){
            part6Date.x = scrollNum(11300+4520,12780+4520,scrollPro,847+50,847-50);
        }

        // 木偶
        if(11838+4520 < scrollPro && scrollPro < 13400+4520){
            part6MuouCont.x = scrollNum(11838+4520,13400+4520,scrollPro,-1484+100,-1484-100);
            part6MuouCont.scale.x = scrollNum(11838+4520,13400+4520,scrollPro,0.8,1.4)
            part6MuouCont.scale.y = scrollNum(11838+4520,13400+4520,scrollPro,0.8,1.4)
        }

        // 帽子
        if(12700+4520 < scrollPro && scrollPro < 14000+4520){
            part6MaoBottom.x = scrollNum(12700+4520,14000+4520,scrollPro,98,98+1120);
            part6MaoTop.x = scrollNum(12700+4520,14000+4520,scrollPro,15+83,15+83+1120);
            part6MaoBottom.scale.x = scrollNum(12700+4520,14000+4520,scrollPro,1,0.1);
            part6MaoBottom.scale.y = scrollNum(12700+4520,14000+4520,scrollPro,1,0.1);
            part6MaoTop.scale.x = scrollNum(12700+4520,14000+4520,scrollPro,1,0.1);
            part6MaoTop.scale.y = scrollNum(12700+4520,14000+4520,scrollPro,1,0.1);

            part6MaoBottom.rotation = scrollNum(12700+4520,14000+4520,scrollPro,0,-1.5);
            part6MaoTop.rotation = scrollNum(12700+4520,14000+4520,scrollPro,0,-1.5);
        }
        if(10000+4520 < scrollPro && scrollPro < 12700+4520){
            part6MaoBottom.x = 98;
            part6MaoTop.x = 15+83;

            part6MaoBottom.scale.x = 1;
            part6MaoBottom.scale.y = 1;
            part6MaoTop.scale.x = 1;
            part6MaoTop.scale.y = 1;
        }
        if(14000+4520 < scrollPro){
            part6MaoBottom.x = 98+1120;
            part6MaoTop.x = 15+83+1120;
        }

        if(12700+4520 < scrollPro && scrollPro < 13400+4520){
            part6MaoBottom.y = scrollNum(12700+4520,13400+4520,scrollPro,31,31+60);
            part6MaoTop.y = scrollNum(12700+4520,13400+4520,scrollPro,32,32+60);
        }

        if(13400+4520 < scrollPro && scrollPro < 14000+4520){
            part6MaoBottom.y = scrollNum(13400+4520,14000+4520,scrollPro,31+60,31+80);
            part6MaoTop.y = scrollNum(13400+4520,14000+4520,scrollPro,32+60,32+80);
        }
        if(14000+4520 < scrollPro){
            part6MaoBottom.y = 31+30;
            part6MaoTop.y = 32+30;
        }

        // 气泡
        if(13900+4520 < scrollPro && scrollPro < 14150+4520){
            part6Pao2.scale.x = scrollNum(13900+4520,14150+4520,scrollPro,0,1);
            part6Pao2.scale.y = scrollNum(13900+4520,14150+4520,scrollPro,0,1);
            part6Pao2.alpha = scrollNum(13900+4520,14150+4520,scrollPro,0.4,1);
        }

        if(13900+4520 < scrollPro && scrollPro < 14200+4520){
            part6Pao1.scale.x = scrollNum(13900+4520,14200+4520,scrollPro,0,1);
            part6Pao1.scale.y = scrollNum(13900+4520,14200+4520,scrollPro,0,1);
            part6Pao1.alpha = scrollNum(13900+4520,14200+4520,scrollPro,0.4,1);
        }

        if(12000+4520 < scrollPro && scrollPro < 13900+4520){
            part6Pao2.scale.x = 0;
            part6Pao2.scale.y = 0;
            part6Pao2.alpha = 0.4;

            part6Pao1.scale.x = 0;
            part6Pao1.scale.y = 0;
            part6Pao1.alpha = 0.4;
        }

        // 鱼
        if(13254+4520 < scrollPro && scrollPro < 18700){
            part6FishBottom.rotation = scrollNum(13254+4520,18700,scrollPro,-0.2,0.1);
            part7MaskCont.rotation = scrollNum(13254+4520,18700,scrollPro,-0.2,0.1);
            part6Fish.rotation = scrollNum(13254+4520,18700,scrollPro,-0.2,0.1);

            part6FishBottom.x = scrollNum(13254+4520,18700,scrollPro,0+30,-20);
            part7MaskCont.x = scrollNum(13254+4520,18700,scrollPro,0+30,-20);
            part6Fish.x = scrollNum(13254+4520,18700,scrollPro,0+30,-20);
        }

        // 如果你还在犹豫
        if(12490+4520 < scrollPro && scrollPro < 14040+4520){
            part6Talk.x = scrollNum(12490+4520,14040+4520,scrollPro,2026+50,2026-50);
        }

        // 第六场景 放大
        if(18700 < scrollPro && scrollPro < 21000){
            part6.x = scrollNum(18700,18700+3000,scrollPro,11699+4520+3051-120,11699+4520+3051-120+21000-18700);
        }
        if(18700 < scrollPro && scrollPro < 21000){
            part6.scale.x = scrollNum(18700,21000,scrollPro,1,8);
            part6.scale.y = scrollNum(18700,21000,scrollPro,1,8);
        }
        if(18700-3000 < scrollPro && scrollPro < 18700){
            part6.scale.x = 1;
            part6.scale.y = 1;
        }
        if(21000 < scrollPro){
            part6.scale.x = 14;
            part6.scale.y = 14;
            part6FishCircle.alpha = 0;
            part6FishBottom.alpha = 0;
            part6Fish.alpha = 0;
            part6Pao1.alpha = 0;
            part6Pao2.alpha = 0;
            part4Bg.alpha = 0;
            part7Mask.scale.set(10);
            part6FishItemCont.x = 492-20;
        }
        if(10000 < scrollPro && scrollPro < 21000){
            part7Mask.scale.set(1);
        }
        if(20900 < scrollPro && scrollPro < 21000){
            part6.scale.x = scrollNum(20900,21000,scrollPro,8,15);
            part6.scale.y = scrollNum(20900,21000,scrollPro,8,15);
            part6FishItemCont.x = scrollNum(20900,21000,scrollPro,492,492-20);
        }
        if(21000-3000< scrollPro && scrollPro < 21000){
            part6FishCircle.alpha = 1;
            part6FishBottom.alpha = 1;
            part6Fish.alpha = 1;
            part6Pao1.alpha = 1;
            part6Pao2.alpha = 1;
            part4Bg.alpha = 1;
        }
        if(20900-3000< scrollPro && scrollPro < 20900){
            part6FishItemCont.x = 492;
        }

        // 第七场景放大
        if(18780-1000< scrollPro && scrollPro < 18780){
            part7.alpha = 0;
        }
        if(18780< scrollPro && scrollPro < 18780+3000){
            part7.alpha = 1;
        }
        if(18805 < scrollPro && scrollPro < 21000){
            part7.scale.x = scrollNum(18805,21000,scrollPro,0.3,1);
            part7.scale.y = scrollNum(18805,21000,scrollPro,0.3,1);
            part7.x = scrollNum(18805,21000,scrollPro,11699+4520+900+21000-18700,11699+4520+900+21000-18700+2000);
        }
        if(18805-3000 < scrollPro && scrollPro < 18805){
            part7.scale.x = 0.3;
            part7.scale.y = 0.3;
        }
        if(21000 < scrollPro && scrollPro < 21000+3000){
            part7.scale.x = 1;
            part7.scale.y = 1;
        }


        // 放心去流浪吧
        if(18780 < scrollPro && scrollPro < 22000){
            part7Talk.x = scrollNum(18780,22000,scrollPro,0+200,0-200);
        }
        // 鼻子
        if(21000 < scrollPro && scrollPro < 22000){
            part7Bizi.x = scrollNum(21000,22000,scrollPro,276,276+550);
            part7Line.x = scrollNum(21000,22000,scrollPro,191,191+520);
        }
        if(15000 < scrollPro && scrollPro < 21000){
            part7Bizi.x = 276;
        }
        if(22000 < scrollPro && scrollPro < 25000){
            part7Bizi.x = 276+550;
        }

        // 大人 小人
        if(21380< scrollPro && scrollPro < 25080){
            part7Rain1Cont.y = scrollNum(21380,25080,scrollPro,-640+0,-640+640+640+640);
            part7Rain2Cont.y = scrollNum(21380,25080,scrollPro,-540+0,-340+600+640);
            // 大人视差
            part7RainB1.y = scrollNum(21380,25080,scrollPro,0+100,0-100);
            part7RainB2.y = scrollNum(21380,25080,scrollPro,0+200,0-200);
            part7RainB3.y = scrollNum(21380,25080,scrollPro,0+300,0-300);
            part7RainB4.y = scrollNum(21380,25080,scrollPro,0-100,0+100);
            // 小人视差
            part7RainS1.y = scrollNum(21380,25080,scrollPro,0-50,0+50);
            part7RainS3.y = scrollNum(21380,25080,scrollPro,0+50,0-50);
        }
        if(13000 < scrollPro && scrollPro < 21380){
            part7Rain1Cont.y = -640+0;
            part7Rain2Cont.y = -540+0;
        }

        // 你会看到 人来人往
        if(22300 < scrollPro && scrollPro < 23950){
            part7Talk2.x = scrollNum(22300,23950,scrollPro,2200+100,2200-100);
        }

        // 第七部分 日期
        if(23450 < scrollPro && scrollPro < 24960){
            part7Date.x = scrollNum(23450,24960,scrollPro,3457-50,3457+110);
        }

        // 云+人
        if(23700 < scrollPro && scrollPro < 25400){
            part8Person.x = scrollNum(23700,25400,scrollPro,50+77-50,312-50+77+50);
            part8Person.y = scrollNum(23700,25400,scrollPro,250+375,21+375);
            part8Person.scale.x = scrollNum(23700,25400,scrollPro,0.19,1.2);
            part8Person.scale.y = scrollNum(23700,25400,scrollPro,0.19,1.2);
        }
        // 云
        if(24151 < scrollPro && scrollPro < 25395){
            part8PersonCloudBg.x = scrollNum(24151,25395,scrollPro,139,139-538);
        }

        // 笼子
        if(25060 < scrollPro && scrollPro < 25400){
            for(var i = 0; i < 5; i++){
                var num1 = 25060 + (25400-25060)/5 * i;
                var num2 = 25060 + (25400-25060)/5 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part8Long.gotoAndStop(i);
                }
            }
        }

        // 石头
        if(24050 < scrollPro && scrollPro < 26300){
            part8Stone.x = scrollNum(24050,26300,scrollPro,377-10,377+30);
        }

        // 第八场景背景云
        if(23888 < scrollPro && scrollPro < 27500){
            part8BgYun.x = scrollNum(23888,27500,scrollPro,225-200,225+200);
        }

        // 大鸟1
        if(25230 < scrollPro && scrollPro < 25750){
            part8Bird1.scale.x = scrollNum(25230,25750,scrollPro,0.5,1.2);
            part8Bird1.scale.y = scrollNum(25230,25750,scrollPro,0.5,1.2);
            part8Bird1.x = scrollNum(25230,25750,scrollPro,878-60-94,878-60-94+350);
            part8Bird1.y = scrollNum(25230,25750,scrollPro,25+335+30,25+335+30-400);
        }
        if(24960-3000 < scrollPro && scrollPro < 25230){
            part8Bird1.scale.x = 0.5;
            part8Bird1.scale.y = 0.5;
            part8Bird1.x = 878-94-60;
            part8Bird1.y = 25+335+30;
        }
        if(25150 < scrollPro && scrollPro < 26500){
            part8Bird2.x = scrollNum(25150,26500,scrollPro,1322+216,1322);
            part8Bird2.y = scrollNum(25150,26500,scrollPro,195-210,195);
        }
        // 小鸟
        if(24700 < scrollPro && scrollPro < 27000){
            part8B1.scale.x = scrollNum(24700,27000,scrollPro,0.6,1.2);
            part8B1.scale.y = scrollNum(24700,27000,scrollPro,0.6,1.2);
            part8B1.x = scrollNum(24700,27000,scrollPro,1241-123-200,1241-123+200);
        }
        if(25090 < scrollPro && scrollPro < 27300){
            part8B2.x = scrollNum(25090,27300,scrollPro,1810-500,1810+500);
            part8B2.rotation = scrollNum(25090,27300,scrollPro,0,0.2);
        }
        if(25370 < scrollPro && scrollPro < 27600){
            part8B3.x = scrollNum(25370,27600,scrollPro,2188-400,2188+400);
        }
        if(25490 < scrollPro && scrollPro < 27820){
            part8B4.x = scrollNum(25490,27820,scrollPro,2300-500,2300+500);
        }
        if(25568 < scrollPro && scrollPro < 28090){
            part8B5.x = scrollNum(25568,28090,scrollPro,2366-450,2366+700);
        }
        if(22380 < scrollPro && scrollPro < 27640){
            part8B6.x = scrollNum(22380,27640,scrollPro,2507-500,2507+100);
        }
        if(26100 < scrollPro && scrollPro < 28230){
            part8B7.x = scrollNum(26100,28230,scrollPro,2827-400,2827+400);
        }


        // 会有人愿意停下来
        if(24650 < scrollPro && scrollPro < 26500){
            part8Talk1.x = scrollNum(24650,26500,scrollPro,1009-50,1009+50);
        }
        // 第八部分 山水
        // 右后山
        if(26250 < scrollPro && scrollPro < 28670){
            part8S2.x = scrollNum(26250,28670,scrollPro,698+80,698-80);
        }
        // 左山
        if(25400 < scrollPro && scrollPro < 27500){
            part8S3.x = scrollNum(25400,27500,scrollPro,56+200,56-50);
        }
        // 右山
        if(26400 < scrollPro && scrollPro < 28680){
            part8S4.x = scrollNum(26400,28680,scrollPro,1141+150,1141-200);
        }
        // 中水
        if(26200 < scrollPro && scrollPro < 28176){
            part8S6.x = scrollNum(26200,28176,scrollPro,794+200,794-200);
            part8Boat.x = scrollNum(26200,28176,scrollPro,1117+200+84,1117+84-200);
        }
        if(26600 < scrollPro && scrollPro < 27800){
            part8Boat.rotation = scrollNum(26600,27800,scrollPro,-0.3,0.3);
        }
        // 左水+左前
        if(25600 < scrollPro && scrollPro < 27750){
            part8S5.x = scrollNum(25600,27750,scrollPro,250,-250);
        }

        // 第九部分 大浪
        if(27750 < scrollPro && scrollPro < 28350){
            part9Wave2.x = scrollNum(27750,28350,scrollPro,121,121+838);
        }
        if(27750-3000 < scrollPro && scrollPro < 27750){
            part9Wave2.x = 121;
        }
        if(28350 < scrollPro && scrollPro < 28350+300){
            part9Wave2.x = 121+838;
        }
        // 小浪
        if(27600 < scrollPro && scrollPro < 28300){
            part9Wave1.x = scrollNum(27600,28300,scrollPro,206,206+1120);
            part9BoatMaskCont.x = scrollNum(27600,28300,scrollPro,-611-500,-611-500+1120);
        }
        if(27600-3000 < scrollPro && scrollPro < 27600){
            part9Wave1.x = 206;
            part9BoatMaskCont.x = -611-500;
        }
        if(28300 < scrollPro && scrollPro < 28300+3000){
            part9Wave1.x = 206+1120;
            part9BoatMaskCont.x = -611-500+1120;
        }
        // 第九部分 日期
        if(28180 < scrollPro && scrollPro < 29100){
            part9Date.x = scrollNum(28180,29100,scrollPro,848,848-100);
        }
        // 听见儿时的声音
        if(27450 < scrollPro && scrollPro < 30050){
            part9Talk.x = scrollNum(27450,30050,scrollPro,1480-100,1480+100);
        }
        // 第九部分 水波
        if(29100 < scrollPro && scrollPro < 30950){
            if(W1Ani.paused()){
                part9WavePlay();
            }
        }
        if((1000 < scrollPro && scrollPro < 29100) || (30950 < scrollPro)){
            part9WavePause();
        }
        // 第九部分 日期2
        if(29250 < scrollPro && scrollPro < 30685){
            part9Date2.x = scrollNum(29250,30685,scrollPro,2545+50,2545-50);
        }
        // 巫师1
        if(30000 < scrollPro && scrollPro < 31540){
            part9Wushi1.x = scrollNum(30000,31540,scrollPro,3341-50,3341+50);
        }
        // 牌子
        if(30135 < scrollPro && scrollPro < 31700){
            part9Pai.x = scrollNum(30135,31700,scrollPro,3488-50,3488+10);
        }
        // 炉子
        if(30200 < scrollPro && scrollPro < 31950){
            part9Luzi.x = scrollNum(30200,31950,scrollPro,3548-100,3548+100);
        }
        // 巫师2
        if(30290 < scrollPro && scrollPro < 32252){
            part9Wushi2.x = scrollNum(30290,32252,scrollPro,3890-250,3890+100);
        }
        // 猫
        if(30475 < scrollPro && scrollPro < 32050){
            part9Cat.x = scrollNum(30475,32050,scrollPro,3900-100,3900+20);
            part9Cat.scale.x = scrollNum(30475,32050,scrollPro,0.9,1.1);
            part9Cat.scale.y = scrollNum(30475,32050,scrollPro,0.9,1.1);
        }
        // 手
        if(30380 < scrollPro && scrollPro < 32700){
            part9Hand.x = scrollNum(30380,32700,scrollPro,3731-50,3731+50);
        }
        if(31200 < scrollPro && scrollPro < 31600){
            for(var i = 0; i < 8; i++){
                var num1 = 31200 + (31600-31200)/8 * i;
                var num2 = 31200 + (31600-31200)/8 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part9Hand.gotoAndStop(i);
                }
            }
        }

        // 格格巫
        if(31270 < scrollPro && scrollPro < 33240){
            part9Ge1.x = scrollNum(31270,33240,scrollPro,84-100,84+100);
        }
        // 左精灵
        if(31300 < scrollPro && scrollPro < 32790){
            part9Ge3.x = scrollNum(31300,32790,scrollPro,18-100,18+150);
        }
        // 左上精灵
        if(31330 < scrollPro && scrollPro < 32880){
            part9Ge2.rotation = scrollNum(31330,32880,scrollPro,0.8,-0.8);
        }
        // 右上精灵
        if(31820 < scrollPro && scrollPro < 33280){
            part9Ge4.rotation = scrollNum(31820,33280,scrollPro,-1,0.2);
        }
        // 右下精灵
        if(31840 < scrollPro && scrollPro < 33200){
            part9Ge5.y = scrollNum(31840,33200,scrollPro,512+30,512-30);
        }
        //
        if(31860 < scrollPro && scrollPro < 33550){
            part9Date3.x = scrollNum(31860,33550,scrollPro,638,638+100);
        }

        // 第十部分  栅栏1
        if(31700 < scrollPro && scrollPro < 33333){
            part10Z1.x = scrollNum(31700,33333,scrollPro,0-50,0+50);
        }

        // 栅栏2
        if(31850 < scrollPro && scrollPro < 33555){
            part10Z2.x = scrollNum(31850,33555,scrollPro,139-100,139+100);
        }

        // 栅栏3
        if(32175-150 < scrollPro && scrollPro < 33730+150){
            part10Z3.x = scrollNum(32175-150,33730+150,scrollPro,395-150,395+150);
        }

        // 栅栏4
        if(32340-200 < scrollPro && scrollPro < 33770+200){
            part10Z4.x = scrollNum(32340-200,33770+200,scrollPro,496-200,496+200);
        }

        // 栅栏5
        if(32400-250 < scrollPro && scrollPro < 33922+250){
            part10Z5.x = scrollNum(32400-250,33922+250,scrollPro,622-250,622+250);
        }

        // 栅栏6
        if(32600-300 < scrollPro && scrollPro < 34370+300){
            part10Z6.x = scrollNum(32600-300,34370+300,scrollPro,787-300,787+300);
        }

        // 栅栏7
        if(33030-350 < scrollPro && scrollPro < 34700+350){
            part10Z7.x = scrollNum(33030-350,34700+350,scrollPro,1252-350,1252+350);
        }

        // 栅栏8
        if(33353-400 < scrollPro && scrollPro < 35000+400){
            part10Z8.x = scrollNum(33353-400,35000+400,scrollPro,1569-400,1569+400);
        }

        // 栅栏9
        if(33690-450 < scrollPro && scrollPro < 35533+450){
            part10Z9.x = scrollNum(33690-500,35533+500,scrollPro,1933-500,1933+500);
        }

        // 栅栏10
        if(34100-380 < scrollPro && scrollPro < 35800+380){
            part10Z10.x = scrollNum(34100-380,35800+380,scrollPro,2373-380,2373+380);
        }

        // 栅栏11
        if(34370-300 < scrollPro && scrollPro < 35890+300){
            part10Z11.x = scrollNum(34370-300,35890+300,scrollPro,2596-300,2596+300);
        }

        // 栅栏12
        if(34570-250 < scrollPro && scrollPro < 36490+250){
            part10Z12.x = scrollNum(34570-250,36490+250,scrollPro,2806-250,2806+250);
        }

        // 栅栏13
        if(35150-150 < scrollPro && scrollPro < 36650+150){
            part10Z13.x = scrollNum(35150-150,36650+150,scrollPro,3332-150,3332+150);
        }

        // 栅栏14
        if(35290-100 < scrollPro && scrollPro < 37150+100){
            part10Z14.x = scrollNum(35290-100,37150+100,scrollPro,3442-100,3442+100);
        }

        // 栅栏15
        if(35820-50 < scrollPro && scrollPro < 37400+50){
            part10Z15.x = scrollNum(35820-50,37400+50,scrollPro,3982-50,3982+50);
        }
        // 栅栏16
        if(36000-30 < scrollPro && scrollPro < 37333+30){
            part10Z16.x = scrollNum(36000-30,37333+30,scrollPro,4202-30,4202+30);
        }

        // 波浪1
        if(33690-100 < scrollPro && scrollPro < 35445+100){
            part10Wave1.x = scrollNum(33690-100,35445+100,scrollPro,1879-100,1879+100);
        }

        // 波浪2
        if(34710-50 < scrollPro && scrollPro < 37200+50){
            part10Wave2.x = scrollNum(34710-50,37200+50,scrollPro,2398-50,2398+50);
        }

        // 波浪3
        if(34120-200 < scrollPro && scrollPro < 37120+200){
            part10Wave3.x = scrollNum(34120-200,37120+200,scrollPro,2874-200,2874+200);
        }

        // 日期
        if(36130-100 < scrollPro && scrollPro < 37550+100){
            part10Date.x = scrollNum(34120-100,37120+100,scrollPro,4327-100,4327+100);
        }

        // 兔子
        if(32600 < scrollPro && scrollPro < 34400){
            part10Tu1.x = scrollNum(32600,34400,scrollPro,810-300,810+300);
            part10Tu1.y = scrollNum(32600,34400,scrollPro,279+50,279-100);
            part10Tu1.rotation = scrollNum(32600,34400,scrollPro,0,0.3);
        }
        if(32700 < scrollPro && scrollPro < 35100){
            part10Tu2.x = scrollNum(32700,35100,scrollPro,1139-500,1139+500);
        }
        if(33000 < scrollPro && scrollPro < 35600){
            part10Tu3.x = scrollNum(33000,35600,scrollPro,1644-400,1644+400);
            part10Tu3.y = scrollNum(33000,35600,scrollPro,257-50,257+50);
            part10Tu3.rotation = scrollNum(33000,35600,scrollPro,-0.2,0.2);
        }
        if(33333 < scrollPro && scrollPro < 33333+200){
            part10Tu1.alpha = scrollNum(33333,33333+200,scrollPro,1,0);
        }
        if(33333-3000 < scrollPro && scrollPro < 33333){
            part10Tu1.alpha = 1;
        }
        if(33333+200 < scrollPro && scrollPro < 33333+3000){
            part10Tu1.alpha = 0;
        }
        if(33333+100 < scrollPro && scrollPro < 33333+300){
            part10Tu2.alpha = scrollNum(33333+100,33333+300,scrollPro,0,1);
        }
        if(33333-3000 < scrollPro && scrollPro < 33333+100){
            part10Tu2.alpha = 0;
        }
        if(33333+300 < scrollPro && scrollPro < 34050){
            part10Tu2.alpha = 1;
        }

        if(34050 < scrollPro && scrollPro < 34050+200){
            part10Tu2.alpha = scrollNum(34050,34050+200,scrollPro,1,0);
        }
        if(33333+300 < scrollPro && scrollPro < 34050){
            part10Tu2.alpha = 1;
        }
        if(34050+200 < scrollPro && scrollPro < 34050+3000){
            part10Tu2.alpha = 0;
        }
        if(34050+100 < scrollPro && scrollPro < 34050+300){
            part10Tu3.alpha = scrollNum(34050+100,34050+300,scrollPro,0,1);
        }
        if(34050-3000 < scrollPro && scrollPro < 34050+100){
            part10Tu3.alpha = 0;
        }
        if(34050+300 < scrollPro && scrollPro < 34050+3000){
            part10Tu3.alpha = 1;
        }

        // 海雁变骨骼
        // if(37050 < scrollPro && scrollPro < 37255){
        //     part10HaiMask1.scale.y = scrollNum(37050,37255,scrollPro,1,0);
        //     part10HaiMask2.scale.y = scrollNum(37050,37255,scrollPro,0,1);
        //     part10HaiGu.x = scrollNum(37050,37255,scrollPro,522,522-190);
        // }
        // if(37050-3000 < scrollPro && scrollPro < 37050){
        //     part10HaiMask1.scale.y = 1;
        //     part10HaiMask2.scale.y = 0;
        //     part10HaiGu.x = 522;
        // }
        // if(37255 < scrollPro && scrollPro < 37255+3000){
        //     part10HaiMask1.scale.y = 0;
        //     part10HaiMask2.scale.y = 1;
        //     part10HaiGu.x = 522-190;
        // }
        if(36650 < scrollPro && scrollPro < 37800){
            part10HaiGu.x = scrollNum(36650,37800,scrollPro,522,522-550);
        }
        if(37155 < scrollPro && scrollPro < 37700){
            for(var i = 0; i < 37; i++){
                var num1 = 37155 + (37700-37155)/37 * i;
                var num2 = 37155 + (37700-37155)/37 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part10HaiGu.gotoAndStop(i);
                }
            }
        }
        // 水中海雁
        if(36970 < scrollPro && scrollPro < 38888){
            part10HW.rotation = scrollNum(36970,38888,scrollPro,0.5,-0.3);
            part10HWSpri.scale.x = scrollNum(36970,38888,scrollPro,0.6,1.2);
            part10HWSpri.scale.y = scrollNum(36970,38888,scrollPro,0.6,1.2);
        }
        if(37550 < scrollPro && scrollPro < 38100){
            part10Pao.scale.x = scrollNum(37550,38100,scrollPro,0,1);
            part10Pao.scale.y = scrollNum(37550,38100,scrollPro,0,1);
            part10Pao.alpha = scrollNum(37550,38100,scrollPro,0.5,1);
        }
        if(37550-3000 < scrollPro && scrollPro < 37550){
            part10Pao.scale.x = 0;
            part10Pao.scale.y = 0;
            part10Pao.alpha = 0.5;
        }

        // 就算 曾经的足迹被风沙掩埋
        if(37150 < scrollPro && scrollPro < 39150){
            part10Talk.x = scrollNum(37150,39150,scrollPro,5500-100,5500+50);
        }

        // 飞鱼1
        if(37090 < scrollPro && scrollPro < 38790){
            part11F1.rotation = scrollNum(37090,38790,scrollPro,-0.4,0.1);
        }
        // 飞鱼2
        if(37150 < scrollPro && scrollPro < 38950){
            // part11F2.rotation = scrollNum(37150,38950,scrollPro,-0.4,0.1);
            part11F2.x = scrollNum(37150,38950,scrollPro,180-71-250,180-71+250);
        }
        // 飞鱼3
        if(37200 < scrollPro && scrollPro < 39230){
            part11F3.rotation = scrollNum(37200,39230,scrollPro,-0.3,0.1);
        }
        // 飞鱼4
        if(37450 < scrollPro && scrollPro < 39200){
            part11F4.rotation = scrollNum(37450,39200,scrollPro,-0.4,0.15);
        }
        // 飞鱼5
        if(37470 < scrollPro && scrollPro < 39310){
            part11F5.rotation = scrollNum(37470,39310,scrollPro,-0.2,0.3);
        }
        // 飞鱼6
        if(37600 < scrollPro && scrollPro < 39350){
            part11F6.rotation = scrollNum(37600,39350,scrollPro,-0.3,0.1);
        }
        // 飞鱼7
        if(37730 < scrollPro && scrollPro < 39500){
            // part11F7.rotation = scrollNum(37730,39500,scrollPro,-0.2,0.1);
            part11F7.x = scrollNum(37730,39500,scrollPro,576+157-200,576+157+200);
        }
        // 飞鱼8
        if(37450 < scrollPro && scrollPro < 39600){
            part11F8.rotation = scrollNum(37450,39600,scrollPro,-0.5,0.4);
        }
        if(37450 < scrollPro && scrollPro < 39600){
            var num = (39600-37450)/20;
            for(var i = 0; i < num; i++){
                var num1 = 37450 + (39600-37450)/num * i;
                var num2 = 37450 + (39600-37450)/num * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part11F8.gotoAndStop(i%6);
                }
            }
        }
        // 飞鱼9
        if(37840 < scrollPro && scrollPro < 39600){
            part11F9.rotation = scrollNum(37840,39600,scrollPro,-0.3,0.1);
        }
        // 飞鱼10
        if(37900 < scrollPro && scrollPro < 39720){
            part11F10.rotation = scrollNum(37900,39720,scrollPro,-0.2,0.1);
        }
        // 爆炸左边
        if(38180 < scrollPro && scrollPro < 39840){
            part11BoomLeft.scale.x = scrollNum(38180,39840,scrollPro,0.7,1);
            part11BoomLeft.scale.y = scrollNum(38180,39840,scrollPro,0.7,1);
        }
        // 爆炸右边
        if(39290 < scrollPro && scrollPro < 41010){
            part11BoomRight.scale.x = scrollNum(39290,41010,scrollPro,0.8,1);
            part11BoomRight.scale.y = scrollNum(39290,41010,scrollPro,0.8,1);
        }
        // 爆炸飞鱼
        if(37811-1000 < scrollPro && scrollPro < 39500){
            part11BoomFish.rotation = scrollNum(37811-1000,39500,scrollPro,-1.65,0.2);
        }
        if(37811-1000-3000 < scrollPro && scrollPro < 37811-1000){
            part11BoomFish.rotation = -1.65;
        }
        if(39500 < scrollPro && scrollPro < 39500+3000){
            part11BoomFish.rotation = 0.2;
        }

        // 碎石
        if(38390 < scrollPro && scrollPro < 39850){
            part11Stone1.scale.x = scrollNum(38390,39850,scrollPro,0.6,1);
            part11Stone1.scale.y = scrollNum(38390,39850,scrollPro,0.6,1);

            part11Stone2.scale.x = scrollNum(38390,39850,scrollPro,0.7,1);
            part11Stone2.scale.y = scrollNum(38390,39850,scrollPro,0.7,1);
        }

        if(39400 < scrollPro && scrollPro < 40000){
            part11BoomCenter.scale.x = scrollNum(39400,40000,scrollPro,0,1);
            part11BoomCenter.scale.y = scrollNum(39400,40000,scrollPro,0,1);
        }
        if(39400-3000 < scrollPro && scrollPro < 39400){
            part11BoomCenter.scale.x = 0;
            part11BoomCenter.scale.y = 0;
        }
        if(40000 < scrollPro && scrollPro < 40000+3000){
            part11BoomCenter.scale.x = 1;
            part11BoomCenter.scale.y = 1;
        }

        // 第12部分 黑色遮罩放大
        if(40748 < scrollPro && scrollPro < 42900){
            part12BlackMaskCont.scale.x = scrollNum(40748,42900,scrollPro,0,1);
            part12BlackMaskCont.scale.y = scrollNum(40748,42900,scrollPro,0,1.2);
        }
        if(40748-3000 < scrollPro && scrollPro < 40748){
            part12BlackMaskCont.scale.x = 0;
            part12BlackMaskCont.scale.y = 0;
        }
        if(43030 < scrollPro && scrollPro < 43030+3000){
            part12BlackMaskCont.scale.x = 1;
            part12BlackMaskCont.scale.y = 1;
        }

        // 人
        if(39640-150 < scrollPro && scrollPro < 41830+150){
            part12Person.x = scrollNum(39640-150,41830+150,scrollPro,620-150,620+150);
        }

        // 第十二场景位移
        if(42900 < scrollPro && scrollPro < 42900+1000){
            part12.x = scrollNum(42900,42900+1000,scrollPro,40353+3136,40353+3136+1000);
            part13.x = scrollNum(42900,42900+1000,scrollPro,42518-250,42518-250+1000);
        }

        // 十二场景 日期渐现
        if(42900 < scrollPro && scrollPro < 42900+300){
            for(var i = 0; i < 12; i++){
                var num1 = 42900 + (300)/12 * i;
                var num2 = 42900 + (300)/12 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part12Date.gotoAndStop(i);
                }
            }
        }
        if(42900-3000 < scrollPro && scrollPro < 42900){
            part12Date.gotoAndStop(0);
        }

        // 十二场景放大
        if(42900+300 < scrollPro && scrollPro < 42900+1200){
            part12.scale.x = scrollNum(42900+300,42900+1200,scrollPro,1,3.2);
            part12.scale.y = scrollNum(42900+300,42900+1200,scrollPro,1,3.2);
        }
        if(42900+300-3000 < scrollPro && scrollPro < 42900+300){
            part12.scale.x = 1;
            part12.scale.y = 1;
        }
        if(42900+1200 < scrollPro && scrollPro < 42900+1200+3000){
            part12.scale.x = 3.2;
            part12.scale.y = 3.2;
        }
        // 十二场景隐藏
        if(42900+900 < scrollPro && scrollPro < 42900+1000){
            part12.alpha = scrollNum(42900+900,42900+1000,scrollPro,1,0);
        }
        if(42900+900-3000 < scrollPro && scrollPro < 42900+900){
            part12.alpha = 1;
        }
        if(42900+1000 < scrollPro && scrollPro < 42900+1000+3000){
            part12.alpha = 0;
        }

        // 日期隐藏
        if(42900+550 < scrollPro && scrollPro < 42900+800){
            for(var i = 0; i < 12; i++){
                var num1 = 42900+550 + (250)/12 * i;
                var num2 = 42900+550 + (250)/12 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part12Date.gotoAndStop(11-i);
                }
            }
        }
        if(42900+800 < scrollPro && scrollPro < 42900+800+3000){
            part12Date.gotoAndStop(12);
        }

        // 十三场景 流星
        if(43360 < scrollPro && scrollPro < 43900){
            part13Liuxing.x = scrollNum(43360,43900,scrollPro,340,340+1090);
            part13Liuxing.y = scrollNum(43360,43900,scrollPro,-640,640);
        }
        if(43360-3000 < scrollPro && scrollPro < 43360){
            part13Liuxing.x = 340;
            part13Liuxing.y = -640;
        }
        if(43900 < scrollPro && scrollPro < 43900+3000){
            part13Liuxing.x = 340+1090;
            part13Liuxing.y = 640;
        }
        // 人1
        if(43240-250 < scrollPro && scrollPro < 45530-250){
            part13P1Cont.x = scrollNum(43240-250,45530-250,scrollPro,0+400,-400);
        }
        if(43600-250 < scrollPro && scrollPro < 44980-250){
            part13P1MaskCont.rotation = scrollNum(43600-250,44980-250,scrollPro,0,Math.PI*6);
        }
        // 人2
        if(43680-250 < scrollPro && scrollPro < 45630-250){
            part13P2Cont.x = scrollNum(43680-250,45630-250,scrollPro,446+150,446-150);
            if(part13P2Tween.paused()){
                part13P2Tween.play();
            }
        }
        if(43680-250-3000 < scrollPro && scrollPro < 43680-250){
            part13P2Tween.pause();
        }
        if(45630-250 < scrollPro && scrollPro < 45630-250+3000){
            part13P2Tween.pause();
        }
        // 人2 出现
        if(44200-250 < scrollPro && scrollPro < 44500-250){
            part13P2Cont.alpha = scrollNum(44200-250,44500-250,scrollPro,0,1);
        }
        if(44200-250-3000 < scrollPro && scrollPro < 44200-250){
            part13P2Cont.alpha = 0;
        }
        if(44500-250 < scrollPro && scrollPro < 44500+3000-250){
            part13P2Cont.alpha = 1;
        }
        // 流星2
        if(45100-250 < scrollPro && scrollPro < 45500-250){
            part13Liuxing2.x = scrollNum(45100-250,45500-250,scrollPro,-375,-375+910);
            part13Liuxing2.y = scrollNum(45100-250,45500-250,scrollPro,-640,640);
        }
        if(45100-250-3000 < scrollPro && scrollPro < 45100-250){
            part13Liuxing2.x = -375;
            part13Liuxing2.y = -640;
        }
        if(45500-250 < scrollPro && scrollPro < 45500+3000-250){
            part13Liuxing2.x = -375+910;
            part13Liuxing2.y = 640;
        }

        // 星球
        if(44380-250 < scrollPro && scrollPro < 45780-250){
            part13Xq1.x = scrollNum(44380-250,45780-250,scrollPro,182+100,182-100);
        }
        if(44444-250 < scrollPro && scrollPro < 45760-250){
            part13Xq2.x = scrollNum(44444-250,45760-250,scrollPro,223+50,223-50);
        }
        if(44500-250 < scrollPro && scrollPro < 45820-250){
            part13Xq3.x = scrollNum(44500-250,45820-250,scrollPro,289+150,289-150);
        }
        if(44400-250 < scrollPro && scrollPro < 46050-250){
            part13Xq4.x = scrollNum(44400-250,46050-250,scrollPro,338+200,338-200);
        }
        if(44690-250 < scrollPro && scrollPro < 45980-250){
            part13Xq5.x = scrollNum(44690-250,45980-250,scrollPro,487+50,487-50);
        }

        // 星球人
        if(44510-250 < scrollPro && scrollPro < 46000-250){
            part13TKPerson.x = scrollNum(44510-250,46000-250,scrollPro,249,249+67);
            part13TKPerson.y = scrollNum(44510-250,46000-250,scrollPro,399,399-33);
        }

        // 太空秋千
        if(44750-250 < scrollPro && scrollPro < 46800-250){
            part13Qiuqian.x = scrollNum(44750,46800,scrollPro,203-50,203+50);

            var num = (46800-44750)/15;
            for(var i = 0; i < num; i++){
                var num1 = 44750-250 + (46800-44750)/num * i;
                var num2 = 44750-250 + (46800-44750)/num * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part13Qiuqian.gotoAndStop(i%10);
                }
            }
        }
        // 直到有一天 我们在太空下重逢
        if(44900-250 < scrollPro && scrollPro < 46870-250){
            part13Talk.x = scrollNum(44900-250,46870-250,scrollPro,743-100,743+50);
        }

        // 第十四部分 音波
        if(45750-250 < scrollPro && scrollPro < 46100-250){
            for(var i = 0; i < 8; i++){
                var num1 = 45750-250 + (46100-45750)/8 * i;
                var num2 = 45750-250 + (46100-45750)/8 * (i+1);
                if(num1 < scrollPro && scrollPro < num2){
                    for(var j = 0; j < part14YinCont.children.length;j++){
                        if(j >= i){
                            part14YinCont.children[j].alpha = 0;
                        }else{
                            part14YinCont.children[j].alpha = 1;
                        }
                    }
                }
            }
        }
        if(46100-250 < scrollPro && scrollPro < 46100+3000-250){
            part14Yin7.alpha = 1;
        }

        // 电码1
        if(46000-250 < scrollPro && scrollPro < 47950-250){
            part14M1.x = scrollNum(46000-250,47950-250,scrollPro,652+100,652-100);
        }
        // 电码2
        if(46000-250 < scrollPro && scrollPro < 47710-250){
            part14M2.x = scrollNum(46000-250,47710-250,scrollPro,691+60,691-60);
        }
        // 电码3
        if(46000-250 < scrollPro && scrollPro < 47460-250){
            part14M3.x = scrollNum(46000-250,47460-250,scrollPro,628+90,628-90);
        }
        // 电码4
        if(46000-250 < scrollPro && scrollPro < 47380-250){
            part14M4.x = scrollNum(46000-250,47380-250,scrollPro,644+50,644-50);
        }
        // 电码5
        if(46000-250 < scrollPro && scrollPro < 47490-250){
            part14M5.x = scrollNum(46000-250,47490-250,scrollPro,694+80,694-80);
        }
        // 电码6
        if(46190-250 < scrollPro && scrollPro < 47850-250){
            part14M6.x = scrollNum(46190-250,47850-250,scrollPro,1059+100,1059-100);
        }
        // 电码7
        if(46270-250 < scrollPro && scrollPro < 47800-250){
            part14M7.x = scrollNum(46270-250,47800-250,scrollPro,1095+40,1095-40);
        }
        // 电码8
        if(46450-250 < scrollPro && scrollPro < 47880-250){
            part14M8.x = scrollNum(46450-250,47880-250,scrollPro,1261+100,1261-100);
        }
        // 电码9
        if(46500-250 < scrollPro && scrollPro < 47970-250){
            part14M9.x = scrollNum(46500-250,47970-250,scrollPro,1323+30,1323-30);
        }
        // 电码10
        if(46666-250 < scrollPro && scrollPro < 48630-250){
            part14M10.x = scrollNum(46666-250,48630-250,scrollPro,1477+50,1477-50);
        }
        // 电码11
        if(46666-250 < scrollPro && scrollPro < 48050-250){
            part14M11.x = scrollNum(46666-250,48050-250,scrollPro,1477+60,1477-60);
        }
        // 电码12
        if(46780-250 < scrollPro && scrollPro < 48280-250){
            part14M12.x = scrollNum(46780-250,48280-250,scrollPro,1542+20,1542-20);
        }
        // 电码13
        if(46700-250 < scrollPro && scrollPro < 48280-250){
            part14M13.x = scrollNum(46700-250,48280-250,scrollPro,1536+70,1536-70);
            part14M15.x = scrollNum(46700-250,48280-250,scrollPro,1532+90,1532-90);
        }
        // 电码14
        if(46688-250 < scrollPro && scrollPro < 48730-250){
            part14M14.x = scrollNum(46688-250,48730-250,scrollPro,1586+50,1586-50);
        }
        // 电码16
        if(46850-250 < scrollPro && scrollPro < 48720-250){
            part14M16.x = scrollNum(46850-250,48720-250,scrollPro,1771+100,1771-100);
        }
        // 电码17
        if(47400-250 < scrollPro && scrollPro < 48800-250){
            part14M17.x = scrollNum(47400-250,48800-250,scrollPro,1901+30,1901-30);
        }
        // 电码18
        if(47315-250 < scrollPro && scrollPro < 48830-250){
            part14M18.x = scrollNum(47315-250,48830-250,scrollPro,1931+90,1931-90);
        }
        // 电码19
        if(47270-250 < scrollPro && scrollPro < 48790-250){
            part14M19.x = scrollNum(47270-250,48790-250,scrollPro,2101+35,2101-35);
        }
        // 电码20
        if(47310-250 < scrollPro && scrollPro < 48840-250){
            part14M20.x = scrollNum(47310-250,48840-250,scrollPro,2108+20,2108-20);
            part14M21.x = scrollNum(47310-250,48840-250,scrollPro,2124+50,2124-50);
        }
        // 电码22
        if(47260 < scrollPro && scrollPro < 48080){
            part14M22.x = scrollNum(47260,48080,scrollPro,2262+100+90,2262+100-90);
            part14M23.x = scrollNum(47260,48080,scrollPro,2470+60,2470-60);
            part14M24.x = scrollNum(47260,48080,scrollPro,2344+30,2344-30);
            part14M25.x = scrollNum(47260,48080,scrollPro,2355+70,2355-70);
        }

        // 第十四场景暂停
        if(47740 < scrollPro && scrollPro < 47740+2000){
            part14.x = scrollNum(47740,47740+2000,scrollPro,46200,46200+2000);
            part15.x = scrollNum(47740,47740+2000,scrollPro,47740,47740+2000);
        }
        if(47740-3000 < scrollPro && scrollPro < 47740){
            part14.x = 46200;
            part15.x = 47740;
        }

        // ET 手指
        if(47740 < scrollPro && scrollPro < 47740+100){
            for(var i = 0; i < 5; i++){
                var num1 = 47740 + (100)/5 * i;
                var num2 = 47740 + (100)/5 * (i+1);

                if(num1 < scrollPro && scrollPro < num2){
                    part14ETHand.gotoAndStop(i);
                }
            }
        }
        if(47740+120 < scrollPro && scrollPro < 47740+520){
            part14ETLight.scale.x = scrollNum(47740+120,47740+520,scrollPro,0,1.1);
            part14ETLight.scale.y = scrollNum(47740+120,47740+520,scrollPro,0,1.1);
        }
        if(47740+120-3000 < scrollPro && scrollPro < 47740+120){
            part14ETLight.scale.x = 0;
            part14ETLight.scale.y = 0;
        }
        if(47740+520 < scrollPro && scrollPro < 47740+520+3000){
            part14ETLight.scale.x = 1.1;
            part14ETLight.scale.y = 1.1;
        }

        // 最后一句话渐现
        if(47740+290 < scrollPro && scrollPro < 47740+420){
            part15Talk.alpha = scrollNum(47740+290,47740+500,scrollPro,0,1);
        }
        if(47740+290-3000 < scrollPro && scrollPro < 47740+290){
            part15Talk.alpha = 0;
        }
        if(47740+420 < scrollPro && scrollPro < 47740+500){
            part15Talk.alpha = 1;
        }
        if(47740+500 < scrollPro && scrollPro < 47740+580){
            part15Talk.alpha = scrollNum(47740+500,47740+580,scrollPro,1,0);
        }
        if(47740+580< scrollPro && scrollPro < 47740+580+3000){
            part15Talk.alpha = 0;
        }

        // 最后一页渐隐
        if(47740+580 < scrollPro && scrollPro < 47740+720){
            $(".box-wrap").css("opacity",scrollNum(47740+580,47740+720,scrollPro,0,1));
        }
        if(47740+580-3000 < scrollPro && scrollPro < 47740+580){
            $(".box-wrap").css("opacity","0");
        }
        if(47740+720< scrollPro && scrollPro < 47740+720+3000){
            $(".box-wrap").css("opacity","1");
        }
        if(30 < scrollPro && scrollPro < 47740+720){
            $(".box-wrap").css("pointer-events","none");
        }
        if(47740+720 < scrollPro){
            part15Talk.alpha = 0;
            $(".box-wrap").css("pointer-events","all");
        }

        /////////////////////////////////////////////////////////////////
        // 声音
        // 滴答声
        if(110 < scrollPro && scrollPro < 3900 ){
            if(!loader.resources.dida.sound.isPlaying && loader.resources.dida.sound.flag && musicOn){
                loader.resources.dida.sound.volume = 1;
                loader.resources.dida.sound.play();
                loader.resources.dida.sound.flag = false;
            }
        }else{
            loader.resources.dida.sound.flag = true;
        }
        // 滴答声 前渐隐
        if(50 < scrollPro && scrollPro < 110 ){
            if(loader.resources.dida.sound.isPlaying) {
                loader.resources.dida.sound.volume = (scrollPro-50)/(110-50);
            }
        }
        if(1 < scrollPro && scrollPro < 50){
            loader.resources.dida.sound.pause();
        }
        // 滴答声 后渐隐
        if(3900 < scrollPro && scrollPro < 4100 ){
            if(loader.resources.dida.sound.isPlaying) {
                loader.resources.dida.sound.volume = 1-(scrollPro-3900)/(3900-4100);
            }
        }
        if(4100 < scrollPro){
            loader.resources.dida.sound.pause();
        }

        ////////////////////////////////////////////////
        // 你说跳进兔子洞里 会邂逅一段奇妙之旅吗
        if(2900 < scrollPro && scrollPro < 3200){
            if(!loader.resources.nishuo1.sound.isPlaying && loader.resources.nishuo1.sound.flag && musicOn){
                loader.resources.nishuo1.sound.volume = 1;
                loader.resources.nishuo1.sound.play();
                loader.resources.nishuo1.sound.flag = false;
            }
        }else{
            loader.resources.nishuo1.sound.flag = true;
        }
        // 你说跳进兔子洞里 后渐隐
        if(4400 < scrollPro && scrollPro < 5200 ){
            if(loader.resources.nishuo1.sound.isPlaying) {
                loader.resources.nishuo1.sound.volume = 1-(scrollPro-4400)/(5200-4400);
            }
        }
        if(5200 < scrollPro){
            loader.resources.nishuo1.sound.pause();
        }
        // 你说跳进兔子洞里 前渐隐
        if(2200 < scrollPro && scrollPro < 2750 ){
            if(loader.resources.nishuo1.sound.isPlaying) {
                loader.resources.nishuo1.sound.volume = (scrollPro-2200)/(2750-2200);
            }
        }
        if(1 < scrollPro && scrollPro < 2200){
            loader.resources.nishuo1.sound.pause();
        }


        if(loadThenFlag){
            ///////////////////////////////////////////////////
            // 好奇心总是驱使着我们去探索 即使犯错
            if(6300 < scrollPro && scrollPro < 6600){
                if(!loader2.resources.haoqi2.sound.isPlaying && loader2.resources.haoqi2.sound.flag && musicOn){
                    loader2.resources.haoqi2.sound.volume = 1;
                    loader2.resources.haoqi2.sound.play();
                    loader2.resources.haoqi2.sound.flag = false;
                }
            }else{
                loader2.resources.haoqi2.sound.flag = true;
            }
            // 好奇心总是驱使着我们去探索 后渐隐
            if(6900 < scrollPro && scrollPro < 7200 ){
                if(loader2.resources.haoqi2.sound.isPlaying) {
                    loader2.resources.haoqi2.sound.volume = 1-(scrollPro-6900)/(7200-6900);
                }
            }
            if(7200 < scrollPro){
                loader2.resources.haoqi2.sound.pause();
            }
            // 好奇心总是驱使着我们去探索 前渐隐
            if(4800 < scrollPro && scrollPro < 5760 ){
                if(loader2.resources.haoqi2.sound.isPlaying) {
                    loader2.resources.haoqi2.sound.volume = (scrollPro-4800)/(5760-4800);
                }
            }
            if(1 < scrollPro && scrollPro < 4800){
                loader2.resources.haoqi2.sound.pause();
            }

            ////////////////////////////////
            // 树叶
            if(5500 < scrollPro && scrollPro < 6500){
                if(!loader2.resources.shuye.sound.isPlaying && loader2.resources.shuye.sound.flag && musicOn){
                    loader2.resources.shuye.sound.volume = 1;
                    loader2.resources.shuye.sound.play();
                    loader2.resources.shuye.sound.flag = false;
                }
            }else{
                loader2.resources.shuye.sound.flag = true;
            }
            // 树叶 后渐隐
            if(6600 < scrollPro && scrollPro < 7700 ){
                if(loader2.resources.shuye.sound.isPlaying) {
                    loader2.resources.shuye.sound.volume = 1-(scrollPro-6600)/(7700-6600);
                }
            }
            if(7700 < scrollPro){
                loader2.resources.shuye.sound.pause();
            }
            // 树叶 前渐隐
            if(4700 < scrollPro && scrollPro < 5500 ){
                if(loader2.resources.shuye.sound.isPlaying) {
                    loader2.resources.shuye.sound.volume = (scrollPro-4700)/(5500-4700);
                }
            }
            if(1 < scrollPro && scrollPro < 4700){
                loader2.resources.shuye.sound.pause();
            }

            ///////////////////
            // 也许 是因为地球外的世界格外迷人
            if(7270 < scrollPro && scrollPro < 7650){
                if(!loader2.resources.yexu3.sound.isPlaying && loader2.resources.yexu3.sound.flag && musicOn){
                    loader2.resources.yexu3.sound.volume = 1;
                    loader2.resources.yexu3.sound.play();
                    loader2.resources.yexu3.sound.flag = false;
                }
            }else{
                loader2.resources.yexu3.sound.flag = true;
            }
            // 也许 是因为地球外的世界格外迷人 后渐隐
            if(8250 < scrollPro && scrollPro < 8800 ){
                if(loader2.resources.yexu3.sound.isPlaying) {
                    loader2.resources.yexu3.sound.volume = 1-(scrollPro-8250)/(8800-8250);
                }
            }
            if(8800 < scrollPro){
                loader2.resources.yexu3.sound.pause();
            }
            // 也许 是因为地球外的世界格外迷人 前渐隐
            if(6700 < scrollPro && scrollPro < 6950 ){
                if(loader2.resources.yexu3.sound.isPlaying) {
                    loader2.resources.yexu3.sound.volume = (scrollPro-6700)/(6950-6700);
                }
            }
            if(1 < scrollPro && scrollPro < 6700){
                loader2.resources.yexu3.sound.pause();
            }

            ///////////////////
            // 爆炸声
            if(8550 < scrollPro && scrollPro < 8900){
                if(!loader2.resources.boom.sound.isPlaying && loader2.resources.boom.sound.flag && musicOn){
                    loader2.resources.boom.sound.volume = 1;
                    loader2.resources.boom.sound.play();
                    loader2.resources.boom.sound.flag = false;
                }
            }else{
                loader2.resources.boom.sound.flag = true;
            }
            // 爆炸声 后渐隐
            if(9300 < scrollPro && scrollPro < 9700 ){
                if(loader2.resources.boom.sound.isPlaying) {
                    loader2.resources.boom.sound.volume = 1-(scrollPro-9300)/(9700-9300);
                }
            }
            if(9700 < scrollPro && scrollPro < 9700+3000){
                loader2.resources.boom.sound.pause();
            }
            // 爆炸声 前渐隐
            if(7300 < scrollPro && scrollPro < 7850 ){
                if(loader2.resources.boom.sound.isPlaying) {
                    loader2.resources.boom.sound.volume = (scrollPro-7300)/(7850-7300);
                }
            }
            if(1 < scrollPro && scrollPro < 7300){
                loader2.resources.boom.sound.pause();
            }


            ///////////////////
            // 无论如何
            if(13800 < scrollPro && scrollPro < 14000){
                if(!loader2.resources.wulun4.sound.isPlaying && loader2.resources.wulun4.sound.flag && musicOn){
                    loader2.resources.wulun4.sound.volume = 1;
                    loader2.resources.wulun4.sound.play();
                    loader2.resources.wulun4.sound.flag = false;
                }
            }else{
                loader2.resources.wulun4.sound.flag = true;
            }
            // 无论如何 后渐隐
            if(14300 < scrollPro && scrollPro < 14600 ){
                if(loader2.resources.wulun4.sound.isPlaying) {
                    loader2.resources.wulun4.sound.volume = 1-(scrollPro-14300)/(14600-14300);
                }
            }
            if(14600 < scrollPro){
                loader2.resources.wulun4.sound.pause();
            }
            // 无论如何 前渐隐
            if(12700 < scrollPro && scrollPro < 13000 ){
                if(loader2.resources.wulun4.sound.isPlaying) {
                    loader2.resources.wulun4.sound.volume = (scrollPro-12700)/(13000-12700);
                }
            }
            if(1 < scrollPro && scrollPro < 12700){
                loader2.resources.wulun4.sound.pause();
            }

            ///////////////////
            // 我都愿意跋涉
            if(15690 < scrollPro && scrollPro < 16270){
                if(!loader2.resources.wodou5.sound.isPlaying && loader2.resources.wodou5.sound.flag && musicOn){
                    loader2.resources.wodou5.sound.volume = 1;
                    loader2.resources.wodou5.sound.play();
                    loader2.resources.wodou5.sound.flag = false;
                }
            }else{
                loader2.resources.wodou5.sound.flag = true;
            }
            // 我都愿意跋涉 后渐隐
            if(16580 < scrollPro && scrollPro < 17100 ){
                if(loader2.resources.wodou5.sound.isPlaying) {
                    loader2.resources.wodou5.sound.volume = 1-(scrollPro-16580)/(17100-16580);
                }
            }
            if(17100 < scrollPro){
                loader2.resources.wodou5.sound.pause();
            }
            // 我都愿意跋涉 前渐隐
            if(13700 < scrollPro && scrollPro < 15400 ){
                if(loader2.resources.wodou5.sound.isPlaying) {
                    loader2.resources.wodou5.sound.volume = (scrollPro-13700)/(15400-13700);
                }
            }
            if(1 < scrollPro && scrollPro < 13700){
                loader2.resources.wodou5.sound.pause();
            }

            ///////////////////
            // 如果你还在犹豫
            if(17530 < scrollPro && scrollPro < 18000){
                if(!loader2.resources.ruguo6.sound.isPlaying && loader2.resources.ruguo6.sound.flag && musicOn){
                    loader2.resources.ruguo6.sound.volume = 1;
                    loader2.resources.ruguo6.sound.play();
                    loader2.resources.ruguo6.sound.flag = false;
                }
            }else{
                loader2.resources.ruguo6.sound.flag = true;
            }
            // 如果你还在犹豫 后渐隐
            if(18400 < scrollPro && scrollPro < 18800 ){
                if(loader2.resources.ruguo6.sound.isPlaying) {
                    loader2.resources.ruguo6.sound.volume = 1-(scrollPro-18400)/(18800-18400);
                }
            }
            if(18800 < scrollPro){
                loader2.resources.ruguo6.sound.pause();
            }
            // 如果你还在犹豫 前渐隐
            if(16666 < scrollPro && scrollPro < 17250 ){
                if(loader2.resources.ruguo6.sound.isPlaying) {
                    loader2.resources.ruguo6.sound.volume = (scrollPro-16666)/(17250-16666);
                }
            }
            if(1 < scrollPro && scrollPro < 16666){
                loader2.resources.ruguo6.sound.pause();
            }

            ///////////////////
            // 匹诺曹水泡
            if(18450 < scrollPro && scrollPro < 18800){
                if(!loader2.resources.pao.sound.isPlaying && loader2.resources.pao.sound.flag && musicOn){
                    loader2.resources.pao.sound.volume = 1;
                    loader2.resources.pao.sound.play();
                    loader2.resources.pao.sound.flag = false;
                }
            }else{
                loader2.resources.pao.sound.flag = true;
            }
            // 匹诺曹水泡 后渐隐
            if(19230 < scrollPro && scrollPro < 20550 ){
                if(loader2.resources.pao.sound.isPlaying) {
                    loader2.resources.pao.sound.volume = 1-(scrollPro-19230)/(20550-19230);
                }
            }
            if(20550 < scrollPro){
                loader2.resources.pao.sound.pause();
            }
            // 匹诺曹水泡 前渐隐
            if(18300 < scrollPro && scrollPro < 18450 ){
                if(loader2.resources.pao.sound.isPlaying) {
                    loader2.resources.pao.sound.volume = (scrollPro-18300)/(18450-18300);
                }
            }
            if(1 < scrollPro && scrollPro < 18300){
                loader2.resources.pao.sound.pause();
            }

            ///////////////////
            // 放心去流浪吧
            if(19800 < scrollPro && scrollPro < 21000){
                if(!loader2.resources.fangxin7.sound.isPlaying && loader2.resources.fangxin7.sound.flag && musicOn){
                    loader2.resources.fangxin7.sound.volume = 1;
                    loader2.resources.fangxin7.sound.play();
                    loader2.resources.fangxin7.sound.flag = false;
                }
            }else{
                loader2.resources.fangxin7.sound.flag = true;
            }
            // 放心去流浪吧 后渐隐
            if(21600 < scrollPro && scrollPro < 22500 ){
                if(loader2.resources.fangxin7.sound.isPlaying) {
                    loader2.resources.fangxin7.sound.volume = 1-(scrollPro-21600)/(22500-21600);
                }
            }
            if(22500 < scrollPro){
                loader2.resources.fangxin7.sound.pause();
            }
            // 放心去流浪吧 前渐隐
            if(18700 < scrollPro && scrollPro < 19340 ){
                if(loader2.resources.fangxin7.sound.isPlaying) {
                    loader2.resources.fangxin7.sound.volume = (scrollPro-18700)/(19340-18700);
                }
            }
            if(1 < scrollPro && scrollPro < 18700){
                loader2.resources.fangxin7.sound.pause();
            }

            ///////////////////
            // 你会看到人来人往
            if(22950 < scrollPro && scrollPro < 23430){
                if(!loader2.resources.nihui8.sound.isPlaying && loader2.resources.nihui8.sound.flag && musicOn){
                    loader2.resources.nihui8.sound.volume = 1;
                    loader2.resources.nihui8.sound.play();
                    loader2.resources.nihui8.sound.flag = false;
                }
            }else{
                loader2.resources.nihui8.sound.flag = true;
            }
            // 你会看到人来人往 后渐隐
            if(23800 < scrollPro && scrollPro < 24600 ){
                if(loader2.resources.nihui8.sound.isPlaying) {
                    loader2.resources.nihui8.sound.volume = 1-(scrollPro-23800)/(24600-23800);
                }
            }
            if(24600 < scrollPro){
                loader2.resources.nihui8.sound.pause();
            }
            // 你会看到人来人往 前渐隐
            if(22100 < scrollPro && scrollPro < 22650 ){
                if(loader2.resources.nihui8.sound.isPlaying) {
                    loader2.resources.nihui8.sound.volume = (scrollPro-22100)/(22650-22100);
                }
            }
            if(1 < scrollPro && scrollPro < 22100){
                loader2.resources.nihui8.sound.pause();
            }

            ///////////////////
            // 会有人停下来
            if(25330 < scrollPro && scrollPro < 25800){
                if(!loader2.resources.huiyou9.sound.isPlaying && loader2.resources.huiyou9.sound.flag && musicOn){
                    loader2.resources.huiyou9.sound.volume = 1;
                    loader2.resources.huiyou9.sound.play();
                    loader2.resources.huiyou9.sound.flag = false;
                }
            }else{
                loader2.resources.huiyou9.sound.flag = true;
            }
            // 会有人停下来 后渐隐
            if(26170 < scrollPro && scrollPro < 26480){
                if(loader2.resources.huiyou9.sound.isPlaying) {
                    loader2.resources.huiyou9.sound.volume = 1-(scrollPro-26170)/(26480-26170);
                }
            }
            if(26480 < scrollPro){
                loader2.resources.huiyou9.sound.pause();
            }
            // 会有人停下来 前渐隐
            if(24180 < scrollPro && scrollPro < 25000){
                if(loader2.resources.huiyou9.sound.isPlaying) {
                    loader2.resources.huiyou9.sound.volume = (scrollPro-24180)/(25000-24180);
                }
            }
            if(1 < scrollPro && scrollPro < 24180){
                loader2.resources.huiyou9.sound.pause();
            }

            ///////////////////
            // 鸽子翅膀
            if(25200 < scrollPro && scrollPro < 25760){
                if(!loader2.resources.ge1.sound.isPlaying && loader2.resources.ge1.sound.flag && musicOn){
                    loader2.resources.ge1.sound.volume = 1;
                    loader2.resources.ge1.sound.play();
                    loader2.resources.ge1.sound.flag = false;
                }
            }else{
                loader2.resources.ge1.sound.flag = true;
            }
            // 鸽子翅膀 后渐隐
            if(25760 < scrollPro && scrollPro < 25980){
                if(loader2.resources.ge1.sound.isPlaying) {
                    loader2.resources.ge1.sound.volume = 1-(scrollPro-25760)/(25980-25760);
                }
            }
            if(25980 < scrollPro){
                loader2.resources.ge1.sound.pause();
            }
            // 鸽子翅膀 前渐隐
            if(25000 < scrollPro && scrollPro < 25200){
                if(loader2.resources.ge1.sound.isPlaying) {
                    loader2.resources.ge1.sound.volume = (scrollPro-25000)/(25200-25000);
                }
            }
            if(1 < scrollPro && scrollPro < 25000){
                loader2.resources.ge1.sound.pause();
            }

            ///////////////////
            // 鸽子2
            if(25555 < scrollPro && scrollPro < 26340){
                if(!loader2.resources.ge2.sound.isPlaying && loader2.resources.ge2.sound.flag && musicOn){
                    loader2.resources.ge2.sound.volume = 1;
                    loader2.resources.ge2.sound.play();
                    loader2.resources.ge2.sound.flag = false;
                }
            }else{
                loader2.resources.ge2.sound.flag = true;
            }
            // 鸽子2 后渐隐
            if(26340 < scrollPro && scrollPro < 27000){
                if(loader2.resources.ge2.sound.isPlaying) {
                    loader2.resources.ge2.sound.volume = 1-(scrollPro-26340)/(27000-26340);
                }
            }
            if(27000 < scrollPro){
                loader2.resources.ge2.sound.pause();
            }
            // 鸽子2 前渐隐
            if(26000 < scrollPro && scrollPro < 26340){
                if(loader2.resources.ge2.sound.isPlaying) {
                    loader2.resources.ge2.sound.volume = (scrollPro-26000)/(26340-26000);
                }
            }
            if(1 < scrollPro && scrollPro < 26000){
                loader2.resources.ge2.sound.pause();
            }

            ///////////////////
            // 你会看到
            if(26688 < scrollPro && scrollPro < 27200){
                if(!loader2.resources.nihui10.sound.isPlaying && loader2.resources.nihui10.sound.flag && musicOn){
                    loader2.resources.nihui10.sound.volume = 1;
                    loader2.resources.nihui10.sound.play();
                    loader2.resources.nihui10.sound.flag = false;
                }
            }else{
                loader2.resources.nihui10.sound.flag = true;
            }
            // 你会看到 后渐隐
            if(27680 < scrollPro && scrollPro < 28170){
                if(loader2.resources.nihui10.sound.isPlaying) {
                    loader2.resources.nihui10.sound.volume = 1-(scrollPro-27680)/(28170-27680);
                }
            }
            if(28170 < scrollPro){
                loader2.resources.nihui10.sound.pause();
            }
            // 你会看到 前渐隐
            if(26100 < scrollPro && scrollPro < 26400){
                if(loader2.resources.nihui10.sound.isPlaying) {
                    loader2.resources.nihui10.sound.volume = (scrollPro-26100)/(26400-26100);
                }
            }
            if(1 < scrollPro && scrollPro < 26100){
                loader2.resources.nihui10.sound.pause();
            }

            ///////////////////
            // 郑和海浪
            if(27560 < scrollPro && scrollPro < 29100){
                if(!loader2.resources.wave.sound.isPlaying && loader2.resources.wave.sound.flag && musicOn){
                    loader2.resources.wave.sound.volume = 1;
                    loader2.resources.wave.sound.play();
                    loader2.resources.wave.sound.flag = false;
                }
            }else{
                loader2.resources.wave.sound.flag = true;
            }
            // 郑和海浪 后渐隐
            if(29300 < scrollPro && scrollPro < 29570){
                if(loader2.resources.wave.sound.isPlaying) {
                    loader2.resources.wave.sound.volume = 1-(scrollPro-29300)/(29570-29300);
                }
            }
            if(29570 < scrollPro){
                loader2.resources.wave.sound.pause();
            }
            // 郑和海浪 前渐隐
            if(26600 < scrollPro && scrollPro < 27000){
                if(loader2.resources.wave.sound.isPlaying) {
                    loader2.resources.wave.sound.volume = (scrollPro-26600)/(27000-26600);
                }
            }
            if(1 < scrollPro && scrollPro < 26600){
                loader2.resources.wave.sound.pause();
            }

            ///////////////////
            // 你是否还会用镜头
            if(28760 < scrollPro && scrollPro < 29560){
                if(!loader2.resources.nishi11.sound.isPlaying && loader2.resources.nishi11.sound.flag && musicOn){
                    loader2.resources.nishi11.sound.volume = 1;
                    loader2.resources.nishi11.sound.play();
                    loader2.resources.nishi11.sound.flag = false;
                }
            }else{
                loader2.resources.nishi11.sound.flag = true;
            }
            // 你是否还会用镜头 后渐隐
            if(29700 < scrollPro && scrollPro < 30200){
                if(loader2.resources.nishi11.sound.isPlaying) {
                    loader2.resources.nishi11.sound.volume = 1-(scrollPro-29700)/(30200-29700);
                }
            }
            if(30200 < scrollPro){
                loader2.resources.nishi11.sound.pause();
            }
            // 你是否还会用镜头 前渐隐
            if(28000 < scrollPro && scrollPro < 28500){
                if(loader2.resources.nishi11.sound.isPlaying) {
                    loader2.resources.nishi11.sound.volume = (scrollPro-28000)/(28500-28000);
                }
            }
            if(1 < scrollPro && scrollPro < 28000){
                loader2.resources.nishi11.sound.pause();
            }

            ///////////////////
            // 水滴
            if(30000 < scrollPro && scrollPro < 30150){
                if(!loader2.resources.shui.sound.isPlaying && loader2.resources.shui.sound.flag && musicOn){
                    loader2.resources.shui.sound.volume = 1;
                    loader2.resources.shui.sound.play();
                    loader2.resources.shui.sound.flag = false;
                }
            }else{
                loader2.resources.shui.sound.flag = true;
            }
            // 水滴 后渐隐
            if(30400 < scrollPro && scrollPro < 30640){
                if(loader2.resources.shui.sound.isPlaying) {
                    loader2.resources.shui.sound.volume = 1-(scrollPro-30400)/(30640-30400);
                }
            }
            if(30640 < scrollPro){
                loader2.resources.shui.sound.pause();
            }
            // 水滴 前渐隐
            if(29400 < scrollPro && scrollPro < 29700){
                if(loader2.resources.shui.sound.isPlaying) {
                    loader2.resources.shui.sound.volume = (scrollPro-29400)/(29700-29400);
                }
            }
            if(1 < scrollPro && scrollPro < 29400){
                loader2.resources.shui.sound.pause();
            }

            ///////////////////
            // 口哨
            if(30400 < scrollPro && scrollPro < 31600){
                if(!loader2.resources.koushao.sound.isPlaying && loader2.resources.koushao.sound.flag && musicOn){
                    loader2.resources.koushao.sound.volume = 1;
                    loader2.resources.koushao.sound.play();
                    loader2.resources.koushao.sound.flag = false;
                }
            }else{
                loader2.resources.koushao.sound.flag = true;
            }
            // 口哨 后渐隐
            if(32680 < scrollPro && scrollPro < 33000){
                if(loader2.resources.koushao.sound.isPlaying) {
                    loader2.resources.koushao.sound.volume = 1-(scrollPro-32680)/(33000-32680);
                }
            }
            if(33000 < scrollPro){
                loader2.resources.koushao.sound.pause();
            }
            // 口哨 前渐隐
            if(29800 < scrollPro && scrollPro < 30000){
                if(loader2.resources.koushao.sound.isPlaying) {
                    loader2.resources.koushao.sound.volume = (scrollPro-29800)/(30000-29800);
                }
            }
            if(1 < scrollPro && scrollPro < 29800){
                loader2.resources.koushao.sound.pause();
            }

            ///////////////////
            // 就算你已长大成熟
            if(32500 < scrollPro && scrollPro < 33040){
                if(!loader2.resources.jiusuan12.sound.isPlaying && loader2.resources.jiusuan12.sound.flag && musicOn){
                    loader2.resources.jiusuan12.sound.volume = 1;
                    loader2.resources.jiusuan12.sound.play();
                    loader2.resources.jiusuan12.sound.flag = false;
                }
            }else{
                loader2.resources.jiusuan12.sound.flag = true;
            }
            // 就算你已长大成熟 后渐隐
            if(33400 < scrollPro && scrollPro < 34200){
                if(loader2.resources.jiusuan12.sound.isPlaying) {
                    loader2.resources.jiusuan12.sound.volume = 1-(scrollPro-33400)/(34200-33400);
                }
            }
            if(34200 < scrollPro){
                loader2.resources.jiusuan12.sound.pause();
            }
            // 就算你已长大成熟 前渐隐
            if(31500 < scrollPro && scrollPro < 32222){
                if(loader2.resources.jiusuan12.sound.isPlaying) {
                    loader2.resources.jiusuan12.sound.volume = (scrollPro-31500)/(32222-31500);
                }
            }
            if(1 < scrollPro && scrollPro < 31500){
                loader2.resources.jiusuan12.sound.pause();
            }

            ///////////////////
            // 风化
            if(37000 < scrollPro && scrollPro < 37600){
                if(!loader2.resources.fenghua.sound.isPlaying && loader2.resources.fenghua.sound.flag && musicOn){
                    loader2.resources.fenghua.sound.volume = 1;
                    loader2.resources.fenghua.sound.play();
                    loader2.resources.fenghua.sound.flag = false;
                }
            }else{
                loader2.resources.fenghua.sound.flag = true;
            }
            // 风化 后渐隐
            if(37600 < scrollPro && scrollPro < 37800){
                if(loader2.resources.fenghua.sound.isPlaying) {
                    loader2.resources.fenghua.sound.volume = 1-(scrollPro-37600)/(37800-37600);
                }
            }
            if(37800 < scrollPro){
                loader2.resources.fenghua.sound.pause();
            }
            // 风化 前渐隐
            if(36650 < scrollPro && scrollPro < 37000){
                if(loader2.resources.fenghua.sound.isPlaying) {
                    loader2.resources.fenghua.sound.volume = (scrollPro-36650)/(37000-36650);
                }
            }
            if(1 < scrollPro && scrollPro < 36650){
                loader2.resources.fenghua.sound.pause();
            }

            /////////////
            // 海雁泡泡
            if(37550 < scrollPro && scrollPro < 38400){
                if(!loader2.resources.paopao.sound.isPlaying && loader2.resources.paopao.sound.flag && musicOn){
                    loader2.resources.paopao.sound.volume = 1;
                    loader2.resources.paopao.sound.play();
                    loader2.resources.paopao.sound.flag = false;
                }
            }else{
                loader2.resources.paopao.sound.flag = true;
            }
            // 海雁泡泡 后渐隐
            if(38400 < scrollPro && scrollPro < 38430){
                if(loader2.resources.paopao.sound.isPlaying) {
                    loader2.resources.paopao.sound.volume = 1-(scrollPro-38400)/(38430-38400);
                }
            }
            if(38430 < scrollPro){
                loader2.resources.paopao.sound.pause();
            }
            // 海雁泡泡 前渐隐
            if(37250 < scrollPro && scrollPro < 37550){
                if(loader2.resources.paopao.sound.isPlaying) {
                    loader2.resources.paopao.sound.volume = (scrollPro-37250)/(37550-37250);
                }
            }
            if(1 < scrollPro && scrollPro < 37250){
                loader2.resources.paopao.sound.pause();
            }

            /////////////
            // 就算曾经的足迹
            if(37800 < scrollPro && scrollPro < 38550){
                if(!loader2.resources.jiusuan13.sound.isPlaying && loader2.resources.jiusuan13.sound.flag && musicOn){
                    loader2.resources.jiusuan13.sound.volume = 1;
                    loader2.resources.jiusuan13.sound.play();
                    loader2.resources.jiusuan13.sound.flag = false;
                }
            }else{
                loader2.resources.jiusuan13.sound.flag = true;
            }
            // 就算曾经的足迹 后渐隐
            if(38800 < scrollPro && scrollPro < 39100){
                if(loader2.resources.jiusuan13.sound.isPlaying) {
                    loader2.resources.jiusuan13.sound.volume = 1-(scrollPro-38800)/(39100-38800);
                }
            }
            if(39100 < scrollPro){
                loader2.resources.jiusuan13.sound.pause();
            }
            // 就算曾经的足迹 前渐隐
            if(37100 < scrollPro && scrollPro < 37650){
                if(loader2.resources.jiusuan13.sound.isPlaying) {
                    loader2.resources.jiusuan13.sound.volume = (scrollPro-37100)/(37650-37100);
                }
            }
            if(1 < scrollPro && scrollPro < 37100){
                loader2.resources.jiusuan13.sound.pause();
            }

            /////////////
            // 爆炸2
            if(39500 < scrollPro && scrollPro < 39800){
                if(!loader2.resources.boom2.sound.isPlaying && loader2.resources.boom2.sound.flag && musicOn){
                    loader2.resources.boom2.sound.volume = 1;
                    loader2.resources.boom2.sound.play();
                    loader2.resources.boom2.sound.flag = false;
                }
            }else{
                loader2.resources.boom2.sound.flag = true;
            }
            // 爆炸2 后渐隐
            if(40000 < scrollPro && scrollPro < 40300){
                if(loader2.resources.boom2.sound.isPlaying) {
                    loader2.resources.boom2.sound.volume = 1-(scrollPro-40000)/(40300-40000);
                }
            }
            if(40300 < scrollPro){
                loader2.resources.boom2.sound.pause();
            }
            // 爆炸2 前渐隐
            if(39200 < scrollPro && scrollPro < 39500){
                if(loader2.resources.boom2.sound.isPlaying) {
                    loader2.resources.boom2.sound.volume = (scrollPro-39200)/(39500-39200);
                }
            }
            if(1 < scrollPro && scrollPro < 39200){
                loader2.resources.boom2.sound.pause();
            }

            /////////////
            // 抑或是勇敢的突破天际
            if(41333 < scrollPro && scrollPro < 41888){
                if(!loader2.resources.yihuo14.sound.isPlaying && loader2.resources.yihuo14.sound.flag && musicOn){
                    loader2.resources.yihuo14.sound.volume = 1;
                    loader2.resources.yihuo14.sound.play();
                    loader2.resources.yihuo14.sound.flag = false;
                }
            }else{
                loader2.resources.yihuo14.sound.flag = true;
            }
            // 抑或是勇敢的突破天际 后渐隐
            if(42333 < scrollPro && scrollPro < 42850){
                if(loader2.resources.yihuo14.sound.isPlaying) {
                    loader2.resources.yihuo14.sound.volume = 1-(scrollPro-42333)/(42850-42333);
                }
            }
            if(42850 < scrollPro){
                loader2.resources.yihuo14.sound.pause();
            }
            // 抑或是勇敢的突破天际 前渐隐
            if(40700 < scrollPro && scrollPro < 41000){
                if(loader2.resources.yihuo14.sound.isPlaying) {
                    loader2.resources.yihuo14.sound.volume = (scrollPro-40700)/(41000-40700);
                }
            }
            if(1 < scrollPro && scrollPro < 40700){
                loader2.resources.yihuo14.sound.pause();
            }

            /////////////
            // 白噪音
            if(42900 < scrollPro && scrollPro < 43730){
                if(!loader2.resources.zao.sound.isPlaying && loader2.resources.zao.sound.flag && musicOn){
                    loader2.resources.zao.sound.volume = 1;
                    loader2.resources.zao.sound.play();
                    loader2.resources.zao.sound.flag = false;
                }
            }else{
                loader2.resources.zao.sound.flag = true;
            }
            // 白噪音 后渐隐
            if(43730 < scrollPro && scrollPro < 44000){
                if(loader2.resources.zao.sound.isPlaying) {
                    loader2.resources.zao.sound.volume = 1-(scrollPro-43730)/(44000-43730);
                }
            }
            if(44000 < scrollPro){
                loader2.resources.zao.sound.pause();
            }
            // 白噪音 前渐隐
            if(42650 < scrollPro && scrollPro < 42900){
                if(loader2.resources.zao.sound.isPlaying) {
                    loader2.resources.zao.sound.volume = (scrollPro-42650)/(42900-42650);
                }
            }
            if(1 < scrollPro && scrollPro < 42650){
                loader2.resources.zao.sound.pause();
            }

            /////////////
            // 直至有一天
            if(45250 < scrollPro && scrollPro < 45850){
                if(!loader2.resources.zhizhi15.sound.isPlaying && loader2.resources.zhizhi15.sound.flag && musicOn){
                    loader2.resources.zhizhi15.sound.volume = 1;
                    loader2.resources.zhizhi15.sound.play();
                    loader2.resources.zhizhi15.sound.flag = false;
                }
            }else{
                loader2.resources.zhizhi15.sound.flag = true;
            }
            // 直至有一天 后渐隐
            if(46300 < scrollPro && scrollPro < 46650){
                if(loader2.resources.zhizhi15.sound.isPlaying) {
                    loader2.resources.zhizhi15.sound.volume = 1-(scrollPro-46300)/(46650-46300);
                }
            }
            if(46650 < scrollPro){
                loader2.resources.zhizhi15.sound.pause();
            }
            // 直至有一天 前渐隐
            if(44300 < scrollPro && scrollPro < 44870){
                if(loader2.resources.zhizhi15.sound.isPlaying) {
                    loader2.resources.zhizhi15.sound.volume = (scrollPro-44300)/(44870-44300);
                }
            }
            if(1 < scrollPro && scrollPro < 44300){
                loader2.resources.zhizhi15.sound.pause();
            }

            /////////////
            // 电波
            if(45800 < scrollPro && scrollPro < 47980){
                if(!loader2.resources.bo.sound.isPlaying && loader2.resources.bo.sound.flag && musicOn){
                    loader2.resources.bo.sound.volume = 1;
                    loader2.resources.bo.sound.play();
                    loader2.resources.bo.sound.flag = false;
                }
            }else{
                loader2.resources.bo.sound.flag = true;
            }
            // 电波 后渐隐
            if(47980 < scrollPro && scrollPro < 48200){
                if(loader2.resources.bo.sound.isPlaying) {
                    loader2.resources.bo.sound.volume = 1-(scrollPro-47980)/(48200-47980);
                }
            }
            if(48200 < scrollPro){
                loader2.resources.bo.sound.pause();
            }
            // 电波 前渐隐
            if(45500 < scrollPro && scrollPro < 45800){
                if(loader2.resources.bo.sound.isPlaying) {
                    loader2.resources.bo.sound.volume = (scrollPro-45500)/(45800-45500);
                }
            }
            if(1 < scrollPro && scrollPro < 45500){
                loader2.resources.bo.sound.pause();
            }

            /////////////
            // 点击
            if(47820 < scrollPro && scrollPro < 47860){
                if(!loader2.resources.click0.sound.isPlaying && loader2.resources.click0.sound.flag && musicOn){
                    loader2.resources.click0.sound.volume = 1;
                    loader2.resources.click0.sound.play();
                    loader2.resources.click0.sound.flag = false;
                }
            }else{
                loader2.resources.click0.sound.flag = true;
            }
            // // 点击 后渐隐
            // if(47980 < scrollPro && scrollPro < 48200){
            //     if(loader2.resources.click0.sound.isPlaying) {
            //         loader2.resources.click0.sound.volume = 1-(scrollPro-47980)/(48200-47980);
            //     }
            // }
            // if(48200 < scrollPro){
            //     loader2.resources.click0.sound.pause();
            // }
            // 点击 前渐隐
            if(47600 < scrollPro && scrollPro < 47820){
                if(loader2.resources.click0.sound.isPlaying) {
                    loader2.resources.click0.sound.volume = (scrollPro-47600)/(47820-47600);
                }
            }
            if(1 < scrollPro && scrollPro < 47600){
                loader2.resources.click0.sound.pause();
            }

            /////////////
            // 在这里留下你的印迹
            if(48000 < scrollPro && scrollPro < 48300){
                if(!loader2.resources.zaizhe16.sound.isPlaying && loader2.resources.zaizhe16.sound.flag && musicOn){
                    loader2.resources.zaizhe16.sound.volume = 1;
                    loader2.resources.zaizhe16.sound.play();
                    loader2.resources.zaizhe16.sound.flag = false;
                }
            }else{
                loader2.resources.zaizhe16.sound.flag = true;
            }
            // 在这里留下你的印迹 前渐隐
            if(47700 < scrollPro && scrollPro < 48000){
                if(loader2.resources.zaizhe16.sound.isPlaying) {
                    loader2.resources.zaizhe16.sound.volume = (scrollPro-47700)/(48000-47700);
                }
            }
            if(1 < scrollPro && scrollPro < 47700){
                loader2.resources.zaizhe16.sound.pause();
            }


            /////////////
            // 流星1
            if(10300 < scrollPro && scrollPro < 11188){
                if(!loader2.resources.liuxing1.sound.isPlaying && loader2.resources.liuxing1.sound.flag && musicOn){
                    loader2.resources.liuxing1.sound.volume = 1;
                    loader2.resources.liuxing1.sound.play();
                    loader2.resources.liuxing1.sound.flag = false;
                }
            }else{
                loader2.resources.liuxing1.sound.flag = true;
            }
            // 流星1 后渐隐
            if(11188 < scrollPro && scrollPro < 11388){
                if(loader2.resources.liuxing1.sound.isPlaying) {
                    loader2.resources.liuxing1.sound.volume = 1-(scrollPro-11188)/(11388-11188);
                }
            }
            if(11388 < scrollPro){
                loader2.resources.liuxing1.sound.pause();
            }
            // 流星1 前渐隐
            if(10000 < scrollPro && scrollPro < 10300){
                if(loader2.resources.liuxing1.sound.isPlaying) {
                    loader2.resources.liuxing1.sound.volume = (scrollPro-10000)/(10300-10000);
                }
            }
            if(1 < scrollPro && scrollPro < 10000){
                loader2.resources.liuxing1.sound.pause();
            }
            /////////////
            // 流星2
            if(11800 < scrollPro && scrollPro < 12600){
                if(!loader2.resources.liuxing2.sound.isPlaying && loader2.resources.liuxing2.sound.flag && musicOn){
                    loader2.resources.liuxing2.sound.volume = 1;
                    loader2.resources.liuxing2.sound.play();
                    loader2.resources.liuxing2.sound.flag = false;
                }
            }else{
                loader2.resources.liuxing2.sound.flag = true;
            }
            // 流星2 后渐隐
            if(12600 < scrollPro && scrollPro < 12900){
                if(loader2.resources.liuxing2.sound.isPlaying) {
                    loader2.resources.liuxing2.sound.volume = 1-(scrollPro-12600)/(12900-12600);
                }
            }
            if(12900 < scrollPro){
                loader2.resources.liuxing2.sound.pause();
            }
            // 流星1 前渐隐
            if(11500 < scrollPro && scrollPro < 11800){
                if(loader2.resources.liuxing2.sound.isPlaying) {
                    loader2.resources.liuxing2.sound.volume = (scrollPro-11500)/(11800-11500);
                }
            }
            if(1 < scrollPro && scrollPro < 11500){
                loader2.resources.liuxing2.sound.pause();
            }

            /////////////
            // 流星3
            if(13280 < scrollPro && scrollPro < 14000){
                if(!loader2.resources.liuxing3.sound.isPlaying && loader2.resources.liuxing3.sound.flag && musicOn){
                    loader2.resources.liuxing3.sound.volume = 1;
                    loader2.resources.liuxing3.sound.play();
                    loader2.resources.liuxing3.sound.flag = false;
                }
            }else{
                loader2.resources.liuxing3.sound.flag = true;
            }
            // 流星3 后渐隐
            if(14000 < scrollPro && scrollPro < 14300){
                if(loader2.resources.liuxing3.sound.isPlaying) {
                    loader2.resources.liuxing3.sound.volume = 1-(scrollPro-14000)/(14300-14000);
                }
            }
            if(14300 < scrollPro){
                loader2.resources.liuxing3.sound.pause();
            }
            // 流星3 前渐隐
            if(12980 < scrollPro && scrollPro < 13280){
                if(loader2.resources.liuxing3.sound.isPlaying) {
                    loader2.resources.liuxing3.sound.volume = (scrollPro-12980)/(13280-12980);
                }
            }
            if(1 < scrollPro && scrollPro < 12980){
                loader2.resources.liuxing3.sound.pause();
            }

            /////////////
            // 流星4
            if(44800 < scrollPro && scrollPro < 45280){
                if(!loader2.resources.liuxing4.sound.isPlaying && loader2.resources.liuxing4.sound.flag && musicOn){
                    loader2.resources.liuxing4.sound.volume = 1;
                    loader2.resources.liuxing4.sound.play();
                    loader2.resources.liuxing4.sound.flag = false;
                }
            }else{
                loader2.resources.liuxing4.sound.flag = true;
            }
            // 流星4 后渐隐
            if(45280 < scrollPro && scrollPro < 45580){
                if(loader2.resources.liuxing4.sound.isPlaying) {
                    loader2.resources.liuxing4.sound.volume = 1-(scrollPro-45280)/(45580-45280);
                }
            }
            if(45580 < scrollPro){
                loader2.resources.liuxing4.sound.pause();
            }
            // 流星4 前渐隐
            if(44500 < scrollPro && scrollPro < 44800){
                if(loader2.resources.liuxing4.sound.isPlaying) {
                    loader2.resources.liuxing4.sound.volume = (scrollPro-44500)/(44800-44500);
                }
            }
            if(1 < scrollPro && scrollPro < 44500){
                loader2.resources.liuxing4.sound.pause();
            }

            /////////////
            // 海浪2
            if(34300 < scrollPro && scrollPro < 35850){
                if(!loader2.resources.wave2.sound.isPlaying && loader2.resources.wave2.sound.flag && musicOn){
                    loader2.resources.wave2.sound.volume = 1;
                    loader2.resources.wave2.sound.play();
                    loader2.resources.wave2.sound.flag = false;
                }
            }else{
                loader2.resources.wave2.sound.flag = true;
            }
            // 海浪2 后渐隐
            if(36260 < scrollPro && scrollPro < 36850){
                if(loader2.resources.wave2.sound.isPlaying) {
                    loader2.resources.wave2.sound.volume = 1-(scrollPro-36260)/(36850-36260);
                }
            }
            if(36850 < scrollPro){
                loader2.resources.wave2.sound.pause();
            }
            // 海浪2 前渐隐
            if(33500 < scrollPro && scrollPro < 33870){
                if(loader2.resources.wave2.sound.isPlaying) {
                    loader2.resources.wave2.sound.volume = (scrollPro-33500)/(33870-33500);
                }
            }
            if(1 < scrollPro && scrollPro < 33500){
                loader2.resources.wave2.sound.pause();
            }
        }

    }, {
        zooming: true,
        bouncing: false
    });
    // scroller.setDimensions(app.view.width, app.view.height, app.view.height, (part1.width+part2.width-(1040-640)));
    
    var mousedown = false;
    document.addEventListener("touchstart", function(e) {
        scroller.doTouchStart(e.touches, e.timeStamp);
        mousedown = true;
    }, false);

    document.addEventListener("touchmove", function(e) {
        if (!mousedown) {
            return;
        }
        scroller.doTouchMove(e.touches, e.timeStamp);
        mousedown = true;
    }, false);

    document.addEventListener("touchend", function(e) {
        if (!mousedown) {
            return;
        }
        scroller.doTouchEnd(e.timeStamp);
        mousedown = false;
    }, false);
}

// 横竖屏旋转
function changeScene(){
        iniW = 1040,
        iniH = 640,
        tarW = 0,
        tarH = 0;
    ww = $(window).width();
    wh = $(window).height();
    // if("onorientationchange" in window){
    if(netease.ua.weixin){
        if(window.orientation === 90 || window.orientation === -90){
            // 横屏 浏览器的宽度大于高度
            h();
        }
        if(window.orientation === 180 || window.orientation === 0){
            // 竖屏 浏览器的宽度小于高度
            v();
        }
    }else{
        if(ww < wh){
            // 竖屏
            v();
        }else{
            // 横屏
            h();
        }
    }
}

// 横屏
function h(){
    setTimeout(function(){
        ww = $(window).width();
        wh = $(window).height();
        tarW = ww;
        tarH = tarW*iniH/iniW;

        wrap.css({
            'left':"50%",
            'top':'50%',
            'width':ww + 'px',
            'height':wh + 'px',
            'transform':'translate3d(-50%,-50%,0)',
            '-webkit-transform':'translate3d(-50%,-50%,0)'
        });
        if(!(typeof scroller == "undefined")){
            app.renderer.resize(ww,wh);
            setTimeout(function(){
                scrollDirection = "left";
                lastWidth = ww;
                contentLength = 47740+1400+lastWidth;
                scroller.setDimensions(app.view.width, app.view.height, contentLength ,app.view.height);
                scroller.scrollTo(scrollPro,0,false);
                // 初始页提示
                titleStart.x = ($(window).width()-541)/2;
                titleHand.x = ($(window).width()-83)/2+65;
                titleHandTween = TweenMax.fromTo(titleHand,1.5,{x:(($(window).width()-83)/2+65)},{x:(($(window).width()-83)/2-65),ease:Linear.easeNone}).repeat(-1);
                // titleStart.y = ($(window).height()-281)/2;
                titleStart.y = 276;
                // logo位置
                // part15Logo.x = ($(window).width()-217)/2+217/2;
                // part15Logo.y = 266;
                part15Talk.x = ($(window).width()-261)/2;
                part15Talk.y = ($(window).height()-74)/2;
            },200);
        }
    },300);
}
// 竖屏
function v(){
    screenOrientation = "horizontal";
    setTimeout(function(){
        ww = $(window).width();
        wh = $(window).height();
        tarW = wh;
        tarH = tarW*iniH/iniW;

        wrap.css({
            'left':"50%",
            'top':'50%',
            'width':wh + 'px',
            'height':ww + 'px',
            'transform':'translate3d(-50%,-50%,0) rotate(90deg)',
            '-webkit-transform':'translate3d(-50%,-50%,0) rotate(90deg)'
        });
        if(!(typeof scroller == "undefined")){
            app.renderer.resize(wh,ww);
            setTimeout(function(){
                scrollDirection = "top";
                lastWidth = wh;
                contentLength = 47740+1400+lastWidth-390;
                scroller.setDimensions(app.view.width, app.view.height, app.view.height, contentLength);
                scroller.scrollTo(0,scrollPro,false);
                // 初始页提示
                titleStart.x = ($(window).height()-541)/2;
                titleHand.x = ($(window).height()-83)/2+65;
                titleHandTween = TweenMax.fromTo(titleHand,1.5,{x:(($(window).height()-83)/2+65)},{x:(($(window).height()-83)/2-65),ease:Linear.easeNone}).repeat(-1);
                // titleStart.y = ($(window).width()-281)/2;
                titleStart.y = 276;
                // logo位置
                // part15Logo.x = ($(window).height()-217)/2+217/2;
                // part15Logo.y = 266;
                part15Talk.x = ($(window).height()-261)/2;
                part15Talk.y = ($(window).width()-74)/2;
            },200);
        }
    },300);
}

// 区间最小值, 区间最大值, top, 初始位置, 终点, 速度, 方向
// 区间最小值, 区间最大值, 当前坐标, 初始位置, 终点, 速度, 方向
function scrollNum(minNum,maxNum,top,start,end){
    return start + ((top - minNum)/(maxNum - minNum)*(end-start));
}

// 创建序列帧动画
function createAnimatedSprite(name, num, opt, start) {
    // 用json 资源创建一个 AnimatedSprite 对象
    var Textures = [],
        i, AnimatedSpriteInstance;
    i = start || 0;
    for (; i < num; i++) {
        var Texture = PIXI.Texture.fromImage(name + i + '.png');
        Textures.push(Texture);
    }
    AnimatedSpriteInstance = new PIXI.extras.AnimatedSprite(Textures);
    if (opt) {
        _.forIn(opt, function(value, key) {
            AnimatedSpriteInstance[key] = value;
        });
    }
    return AnimatedSpriteInstance;
}

// 创建sprite对象
function createSprite(name,opt){
    var newSprite = new PIXI.Sprite.fromImage(name);
    if (opt) {
        _.forIn(opt, function(value, key) {
            newSprite[key] = value;
        });
    }
    return newSprite;
}

// loading
function loadingFn(imgs,callback){
    if(!imgs){return false};
    var img=[];
    var len=imgs.length;
    var loadedCount = 0;
    for(var i=0;i<len;i++){
        img[i]=new Image();
        img[i].src=imgs[i];
        img[i].onload = function(){
            loadedCount++;
            $('.loading-num').html(Math.floor(loadedCount/len*100)+"%").attr('title',Math.floor(loadedCount/len*100));
            if (loadedCount>=len){
                $('.loading-wrap').fadeOut(700,function(){
                    $(this).remove();
                });
                callback ? callback() : null;
            }
        };
    }
}

// 分享
function shareFn(){
    // share
    shareData={
        MsgImg:'http://go.163.com/2018/0120/taidu/img/share2.jpg',  //分享图片
        link:'http://go.163.com/2018/0120/taidu/index.html',    //分享链接
        title:'假如你掉进童话里会变怎样',   //分享标题
        desc:'握住一束光，名字叫做时',    //分享描述
        fText:'假如你掉进童话里会变怎样',    //分享朋友圈
        callback:function(){
            share_survey(true);
        }
    };
    NeteaseShareInit();
}
