'use strict';
import React from 'react';
import ReactDOM from 'react-dom';
require('./index.css');
require('es6-promise');
require('isomorphic-fetch');
const host='http://'+window.location.host+'/';
var TodoList = React.createClass({
    getInitialState() {
        var json=pageData;
        var init={json:json,modify:false,host:'http://'+window.location.host+'/'};
        this.setCookie('data',"");
        return init;
    },
    componentDidMount(){
        (function () {
            function o() {
                document.documentElement.style.fontSize = (document.documentElement.clientWidth > 414 ? 414 : document.documentElement.clientWidth) / 12 + "px"
            }

            var e = null;
            window.addEventListener("resize", function () {
                clearTimeout(e), e = setTimeout(o, 300)
            }, !1), o()
        })(window);
        window.document.body.style.background='#f69562';
        this.setShareConfig();
    },
    setShareConfig(){
        if(this.state.json.code==0&&this.state.json.data.my.phone_num!=undefined){
            fetch(this.state.host+'api/shopping/social/getWxRedPocketConfig?signUrl='+encodeURIComponent(location.href.split('#')[0])+'&urlKey='+(this.GetQueryString('urlKey')==""?this.getCookie('urlKey'):this.GetQueryString('urlKey')))
                .then(req => req.json())
                .then(json =>{
                    //初始化微信配置
                    wx.config({
                        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                        appId: json.data.appId, // 必填，公众号的唯一标识
                        timestamp: json.data.timestamp, // 必填，生成签名的时间戳
                        nonceStr: json.data.nonceStr, // 必填，生成签名的随机串
                        signature: json.data.signature,// 必填，签名，见附录1
                        jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                    });
                    wx.ready(function(){
                        wx.onMenuShareTimeline(json.data.share);
                        wx.onMenuShareAppMessage(json.data.share);
                        wx.onMenuShareQQ(json.data.share);
                        wx.onMenuShareQZone(json.data.share);
                    });
                    wx.error(function(res){
                        alert(res.errMsg);
                    });
                    //qq分享设置
                    setShareInfo({
                        title:   json.data.share.title, // 分享标题
                        summary:   json.data.share.desc, // 分享内容
                        pic:        json.data.share.imgUrl, // 分享图片
                        url:           json.data.share.link, // 分享链接
                        // 微信权限验证配置信息，若不在微信传播，可忽略
                        WXconfig: {
                            swapTitleInWX: true, // 是否标题内容互换（仅朋友圈，因朋友圈内只显示标题）
                            appId: json.data.appId, // 公众号的唯一标识
                            timestamp: json.data.timestamp, // 生成签名的时间戳
                            nonceStr: json.data.nonceStr, // 生成签名的随机串
                            signature: json.data.signature // 签名
                        }
                    });
                }
            );
        }
    },
    openApp(){
        window.location.href='/resources/download';
    },
    onSubmitRedPocket(){
        return fetch(this.state.host+'api/shopping/social/grabRedPocketWithPhone?urlKey='+(this.GetQueryString('urlKey')==""?this.getCookie('urlKey'):this.GetQueryString('urlKey'))+"&phone_num="+this.refs.phone_num.value+"&unique_id="+this.getCookie('unique_id'))
            .then(req => req.json())
            .then(json =>{
                if(json.code==4){
                    alert(json.message);

                }else{
                    this.setState({json:json});
                    this.setShareConfig();
                }
            }
        );
    },
    setModifyPhone(){
        this.setState({modify:true})
    },
    onModifyPhone(){
        return fetch(this.state.host+'api/shopping/social/updateRedPocket?urlKey='+(this.GetQueryString('urlKey')==""?this.getCookie('urlKey'):this.GetQueryString('urlKey'))+"&phone_num="+this.refs.modify_phone_num.value+"&origin_num="+this.state.json.data.my.phone_num+"&unique_id="+this.getCookie('unique_id'))
            .then(req => req.json())
            .then(json =>{
                if(json.code==4){
                    alert(json.message);

                }else{
                    this.setState({json:json,modify:false});
                    this.setShareConfig();
                }
            });
    },
    //共通方法
    getCookie(name)
    {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    },
    setCookie(name,value)
    {
        var exp = new Date();
        exp.setTime(exp.getTime() + 1200*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=/";
    },
    GetQueryString(name)
    {
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        var value="";
        if(r!=null){
            value=unescape(r[2]);
        }
        return value;
    },
    render() {
        let time=new Date().getTime();
        const styles={
            list:{paddingTop:0,paddingBottom:0,overflowX:"hidden"},
            full:{width:"100%",height:"100%"},
            backButton:{position:"fixed",left:"10px",top:"10px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/back.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            itemComments:{padding:10,fontSize:"14px",height:"20px",width:"100%",textAlign:"center"},
            commentCount:{marginLeft:"50px",margin:"0 auto"},
            lineImage:{height:"20px",float:"left",fontWeight:"bold",marginLeft:5,textAlign:"center",lineHeight:"20px"},
            lineText:{height:"20px",float:"left",fontWeight:"bold",marginLeft:5,textAlign:"center",lineHeight:"20px"}
        };
        return (
            <div className="wrapper">
                <div className="f-banner"><img src="/images/faHongBao/index/faHongbao_bg01.png" alt=""/></div>
                {this.state.modify==true?
                <div className="content_phone_box content_phone_box_a">
                    <div className="userName_phone_modify">
                        <p className="userName_phone_modify_one">当前手机号 <span>{this.state.json.data.my.phone_num}</span></p>
                        <p className="userName_phone_modify_two">手机号修改后将在下一次抢红包时生效</p>
                    </div>
                    <input className="content_phone_one content_phone_one_a" ref="modify_phone_num" type="text"/>
                    <input className="content_phone_two" type="submit" onClick={this.onModifyPhone} value="修改"/>
                </div>
                :(this.state.json.code==0?<section className="content_box">
                    <div className="content_money_box">
                        <div className="content_money_one">
                            {this.state.json.data.my.fee}<font style={{fontSize:"12px"}}>元</font>
                        </div>
                        <div className="content_money_two">
                            <h4>全品类</h4>
                            <p>有效期至&nbsp;{this.state.json.data.my.date.replace('+',' ')}</p>
                        </div>
                    </div>
                </section>:(this.state.json.code==1?<section className="content_box">
                    <div className="content_phone_box">
                        <input className="content_phone_one" ref="phone_num" type="text"/>
                        <input className="content_phone_two" type="submit" onClick={this.onSubmitRedPocket} value="领取优惠券"/>
                    </div>
                </section>:(this.state.json.code==2?<section className="content2">
                    <div className="result resulth5">
                        <div className="result-inner fail-over">抢光啦</div>
                    </div>
                </section>:"")))}

                <div className="content-bg">
                    {(this.state.json.code==0?
                        <div>
                            <p className="userName_phone"> 红包已放至账户 <span>{this.state.json.data.my.phone_num} <a style={{color:"blue"}} onClick={this.setModifyPhone}>修改</a></span>
                                <p className="userName_phone_land">登录App即可使用</p>
                            </p>
                            <input id="download-btn" className="combtn downloadbtn dlbtn" type="button" onClick={this.openApp} value="立即使用"/>
                        </div>
                        :(this.state.json.code==1||this.state.json.code==2?<input id="download-btn" className="combtn downloadbtn dlbtn" type="button" onClick={this.openApp} value="下载优眼户端"/>:""))}

                    {this.state.json.data==undefined?"":(<section className="friends">
                        <ul>
                            {this.state.json.data.list.map((friend,index)=><li key={time+index}>
                                <div className="friends_box">
                                    <img className="friends_pic" src={friend.head_image}/>
                                    <div>
                                        <div className="friends_tit">
                                            <h4>{friend.nick_name.replace('+',' ')}</h4><font style={{fontSize:"12px",color:"gray"}}>&nbsp;{friend.date.replace('+',' ')}</font>
                                            <br/>
                                            <p><font style={{fontSize:"12px",color:"gray"}}>小优给您送红包咯~</font></p>
                                        </div>
                                    </div>
                                    <div className="friends_money">{friend.fee}元</div>
                                </div>
                            </li>)}
                        </ul>
                    </section>)}
                    <section className="rule">
                        <h4 className="sec-sub-title">活动规则</h4>
                        <ul>
                            <li>1.红包新老用户同享。</li>
                            <li>2.红包可叠加使用。</li>
                            <li>3.红包仅限在优眼最新版客户端及UYU.COM下单且选择在线支付时使用。</li>
                            <li>4.使用红包时下单手机号码必须为抢红包时手机号码。</li>
                            <li>5.配镜成功后分享给朋友，还可以领取红包哦。</li>
                            <li>6.其他未尽事宜，请咨询客服。</li>
                        </ul>
                    </section>
                </div>
            </div>
        );
    }
});

ReactDOM.render(<TodoList />,  document.getElementById('content'));