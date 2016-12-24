'use strict';
import * as types from '../constants/ShoppingActionTypes';
import fetch from 'isomorphic-fetch';
var reType='';
var reCode='';
//设置推荐人
export function setRecommendTypeAndCode(){
    if(reType==''){
        reType=GetQueryString('retype');
    }
    if(reCode==''){
        reCode=GetQueryString('recode');
    }
}
//获取首页展示banner图
export function getWelBannersUrl(){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_WEL_BANNERS.replace(types.URL_BASE_TOKEN,GetQueryString('tk')),json => receiveWelBanners(json.data));
}
function receiveWelBanners(data) {
    while(true){
        if(data.length<5){
            data.push("");
        }else {
            break;
        }
    }
    return {
        type: types.RECEIVE_WEL_BANNERS,
        banners: data
    };
}
//修改banner图
export function uploadWelBanner(id,data){
    return fetchPostWithUrlFunc(types.URL_BASE+types.URL_UPLOAD_WEL_BANNER.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace("%i",id),
        {
            method: "POST",
            body:data
        },json => uploadWelBannerResult(id,json.data));
}
function uploadWelBannerResult(id,data) {
    return {
        type: types.UPLOAD_WEL_BANNER,
        uploadResult: data,
        id:id
    };
}
//删除banner图
export function deleteWelBanner(id){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_DELETE_WEL_BANNER.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace("%i",id),json => deleteWelBannerResult(id,json.code));
}
function deleteWelBannerResult(id,code) {
    return {
        type: types.DELETE_WEL_BANNER,
        uploadResult: id,
        id:id
    };
}

//获取首页物品展示列表
export function getWelProducts(){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_WEL_PRODUCTS.replace(types.URL_BASE_TOKEN,GetQueryString('tk')),json => receiveWelProducts(json.data));
}
function receiveWelProducts(data) {
    return {
        type: types.RECEIVE_WEL_PRODUCTS,
        products: data
    };
}
//提交 物品 修改信息
export function uploadWelProduct(pid,title,data){
    return fetchPostWithUrlFunc(types.URL_BASE+types.URL_UPLOAD_WEL_PRODUCTS.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace("%i",pid).replace("%t",title),
        {
            method: "POST",
            body:data
        },json => uploadWelProductResult(pid,title,json.data));
}
function uploadWelProductResult(pid,title,pic) {
    return {
        type: types.UPLOAD_WEL_PRODUCTS,
        uploadResult: {
            id:pid,
            title:title,
            pic:pic
        }
    };
}
//获取物品详细信息
export function getProductDetail(pid){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_PRODUCT_DETAILS.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace("%i",pid),json => receiveProductDetail(pid,json.data));
}
function receiveProductDetail(pid,data) {
    data.pid=pid;
    let stocks=0;
    data.quantity.map(quantity=>{
        stocks+=parseInt(quantity.p_quantity);
    });
    data.stocks=stocks;
    let pMax=parseFloat(data.price);
    let pMin=parseFloat(data.price);

    data.colors.map(color=>{
        data.types.map(type=>{
            if((parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price))>pMax){
                pMax=parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price);
            }
            if((parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price))<pMin){
                pMin=parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price);
            }
        })
    });
    data.priceRange=getPriceRangeString(pMax,pMin);
    return {
        type: types.RECEIVE_PRODUCT_DETAILS,
        productDetails:data
    };
}
//获取物品详情图片
export function getProductDetailPics(pid){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_PRODUCT_DETAIL_PICS.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace("%1",pid),json => {
            return{
                type:json.code==0?types.URL_GET_PRODUCT_DETAIL_PICS:"",
                pics:json.data
            }
        });
}
//物品详细信息修改界面
export function onChangeProductDetails(key,index,name,event){
    return {
        type:types.ON_PRODUCT_DETAILS_CHANGE,
        key:key,
        name:name,
        index:index,
        event:event
    }
}
export function onAddProductDetails(key,addObj,event){
    return {
        type:types.ON_PRODUCT_DETAILS_ADD,
        key:key,
        addObj:addObj,
        event:event
    }
}
export function onDelProductDetails(key,index,event){
    return {
        type:types.ON_PRODUCT_DETAILS_DEL,
        key:key,
        index:index,
        event:event
    }
}
//获取用户信息
export function getUserInfoByUID(uid){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_USER_INFO.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace("%u",uid),json => receiveUserInfoByUID(json.data));
}
function receiveUserInfoByUID(data) {
    return {
        type: types.RECEIVE_USER_INFO,
        userInfo:data
    };
}
//获取用户信息列表
export function getUserInfoByUIDList(uids){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_USER_INFO_LIST.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace("%u",uids),json => {return {
        type: types.URL_GET_USER_INFO_LIST,
        userInfo:json.data
    }});
}
function receiveUserInfoByUID(data) {
    return {
        type: types.RECEIVE_USER_INFO,
        userInfo:data
    };
}
//获取评论列表
export function getProductComments(pid,page){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_PRODUCT_COMMENTS.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace("%p",pid).replace("%g",page),json => receiveProductComments(json.data,page));
}
function receiveProductComments(data,page) {
    return {
        type: page==0?types.RECEIVE_PRODUCT_COMMENTS:types.RECEIVE_MORE_PRODUCT_COMMENTS,
        data:data
    };
}
//获取购物车数据
export function getShoppingCart(){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_PRODUCT_CART.replace(types.URL_BASE_TOKEN,GetQueryString('tk')),json => receiveShoppingCart(json.data));
}
function receiveShoppingCart(data) {
    return {
        type: types.RECEIVE_PRODUCT_CART,
        data:data
    };
}
export function checkCartProducts(cartID,checked){
    return {
        type: types.CHECK_CART_PRODUCT,
        cartID:cartID,
        checked:checked
    };
}
export function checkCartAllProducts(checked){
    return {
        type: types.CHECK_CART_ALL_PRODUCTS,
        checked:checked
    };
}
//删除购物车物品
export function delShoppingCart(cartIDS){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_DEL_PRODUCT_CART.replace(types.URL_BASE_TOKEN,GetQueryString('tk'))+cartIDS,json => delCartProduct(json.code,cartIDS));
}
function delCartProduct(code,cartIDS) {
    return {
        type: parseInt(code)==0?types.DEL_PRODUCT_CART:"",
        cartIDS:cartIDS
    };
}
//添加购物车物品
export function addShoppingCart(pid,cid,tid,count,attach){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_ADD_PRODUCT_CART.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace('%p',pid).replace('%c',cid).replace('%t',tid).replace('%n',count).replace('%a',attach),json => addCartProduct(json,pid,cid,tid,count));
}
function addCartProduct(json,pid,cid,tid,count) {
    return {
        type: parseInt(json.code)==0?types.ADD_PRODUCT_CART:alert(json.message),
        cart:{
            car_id:json.data.car_id,
            pid:pid,
            cid:cid,
            tid:tid,
            count:count
        }
    };
}
//立即购买
export function addShoppingCartAndBuyNow(tempBuy){
    return {
        type:types.ADD_PRODUCT_CART_AND_BUY,
        tempBuy:tempBuy
    };
}
//获取地址列表
export function getAddressList(parent_id,type,selectedIndex,isNext){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_ADDRESS_LIST.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace('%i',parent_id),json => receiveAddressList(json.table,type,selectedIndex,isNext));
}
function receiveAddressList(table,type,selectedIndex,isNext) {
    let list=[];
    if(table.length>0){
        list.push({
            payload:-1,
            text:"请选择"
        });
    }
    table.map(address=>list.push({
        payload:address.id,
        text:address.name
    }));
    return {
        type: types.RECEIVE_ADDRESS_LIST,
        list:list,
        selectedIndex:selectedIndex,
        addressType:type,
        isNext:isNext
    };
}
//输入地址详细信息
export  function setAddressDetailInfo(text,key){
    return {
        type: types.SET_ADDRESS_DETAIL,
        text:text,
        key:key
    };
}

//打开关闭 选择型号view
export function toggleChooseView(openChoose){
    if(openChoose==undefined){
        openChoose=false;
    }
    return {
        type:types.TOGGLE_DETAILS_CHOOSE_VIEW,
        openChoose:!openChoose
    }
}
//打开关闭订单物流界面
export function toggleAddressChooseView(openChoose){
    if(openChoose==undefined){
        openChoose=false;
    }
    return {
        type:types.TOGGLE_ADDRESS_LIST_CHOOSE_VIEW,
        openChoose:!openChoose
    }
}
//获取最近一次物流信息
export function getLatestExpressInfo(){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_LATEST_EXPRESS_INFO.replace(types.URL_BASE_TOKEN,GetQueryString('tk')),json => {
            if(json.code==0){
                if(json.data)
                var list=[{
                    payload:-1,
                    text:"请选择"
                }];
                json.data.province_list.map((address,index)=> {
                    address.id==json.data.province_id?json.data.province_selected=parseInt(index+1):"";
                    list.push({
                        payload:address.id,
                        text:address.name
                    })});
                json.data.province_list=list;
                list=[{
                    payload:-1,
                    text:"请选择"
                }];;
                json.data.city_list.map((address,index)=> {
                    address.id==json.data.city_id?json.data.city_selected=parseInt(index+1):"";
                    list.push({
                        payload:address.id,
                        text:address.name
                    })});
                json.data.city_list=list;
                list=[{
                    payload:-1,
                    text:"请选择"
                }];;
                json.data.county_list.map((address,index)=> {
                    address.id==json.data.county_id?json.data.county_selected=parseInt(index+1):"";
                    list.push({
                        payload:address.id,
                        text:address.name
                    })});
                json.data.county_list=list;
                json.data.town_list!=undefined?list=[{
                    payload:-1,
                    text:"请选择"
                }]:"";
                json.data.town_list!=undefined?json.data.town_list.map((address,index)=> {
                    address.id==json.data.town_id?json.data.town_selected=parseInt(index+1):"";
                    list.push({
                        payload:address.id,
                        text:address.name
                    })}):"";
                json.data.town_list!=undefined?json.data.town_list=list:json.data.town_list=[];
                return {
                    type:types.URL_GET_LATEST_EXPRESS_INFO,
                    data:json.data
                };
            }else{
                return {type:""};
            }
        });
}
//获取红包列表
export function getShoppingRedPocketList(page,count){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_RED_POCKET_LIST.replace('%1',page).replace('%2',count).replace(types.URL_BASE_TOKEN,GetQueryString('tk')),json =>{return {
            type: json.code==0?types.URL_GET_RED_POCKET_LIST:alert(json.message),
            data:json.data,
            page:page
        }});
}
//选择红包
export function checkRedPocket(key,checked){
    return {
        type: types.CHECK_RED_POCKET,
        key:key,
        checked:checked
    }
}
//确认选择红包
export function confirmCheckRedPocket(){
    return {
        type: types.CONFIRM_CHECK_RED_POCKET
    }
}
//获取优惠券列表
export function getShoppingBonusPocketList(page,count){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_BONUS_POCKET_LIST.replace('%1',page).replace('%2',count).replace(types.URL_BASE_TOKEN,GetQueryString('tk')),json =>{return {
            type: json.code==0?types.URL_GET_BONUS_POCKET_LIST:alert(json.message),
            data:json.data,
            page:page
        }});
}
//选择优惠劵
export function checkBonusPocket(key,checked){
    return {
        type: types.CHECK_BONUS_POCKET,
        key:key,
        checked:checked
    }
}
//确认选择优惠劵
export function confirmCheckBonusPocket(){
    return {
        type: types.CONFIRM_CHECK_BONUS_POCKET
    }
}
//确认支付订单
export function submitAndPayOrder(name,phone,address,province,city,county,town,carts,pay_type,redPockets,bonusPockets){
    return fetchPostWithUrlFunc(types.URL_BASE+types.URL_SUBMIT_PAY_ORDER.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace('%1',name).replace('%2',phone).replace('%3',address).replace('%4',province).replace('%5',city).replace('%6',county).replace('%7',town).replace('%8',carts).replace('%9',pay_type),
        {
            method: "POST",
            body:JSON.stringify({redPockets:redPockets,bonusPockets:bonusPockets,retype:reType,recode:reCode})
        },json => receiveSubmitAndPayOrder(json,carts,pay_type));
}
export function receiveSubmitAndPayOrder(json,carts,pay_type){
    json.code==0?alert(JSON.stringify({alert:0,order_num:json.data,pay_type:pay_type})):"";
    return {
        type: json.code==0?types.RECEIVE_SUBMIT_PAY_ORDER:alert(json.message),
        order_num:json.data,
        carts:carts.split(",")
    };
}
//立即购买订单建立
export function submitAndPayOrderNow(name,phone,address,province,city,county,town,pay_type,pid,cid,tid,count,attach,redPockets,bonusPockets){
    return fetchPostWithUrlFunc(types.URL_BASE+types.URL_SUBMIT_PAY_ORDER_NOW.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace('%1',name).replace('%2',phone).replace('%3',address).replace('%4',province).replace('%5',city).replace('%6',county).replace('%7',town).replace('%8',pay_type).replace('%9',pid).replace('%10',cid).replace('%11',tid).replace('%12',count).replace('%13',attach),
        {
            method: "POST",
            body:JSON.stringify({redPockets:redPockets,bonusPockets:bonusPockets,retype:reType,recode:reCode})
        },json => receiveSubmitAndPayOrderNow(json,pay_type));
}
export function receiveSubmitAndPayOrderNow(json,pay_type){
    json.code==0?alert(JSON.stringify({alert:0,order_num:json.data,pay_type:pay_type})):"";
    return {
        type: json.code==0?types.RECEIVE_SUBMIT_PAY_ORDER_NOW:alert(json.message),
        order_num:json.data
    };
}
//删除未支付订单
export function deleteOrder(orderNum){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_DELETE_ORDER.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace('%n',orderNum),json => receiveDeleteOrder(json,orderNum));
}
export function receiveDeleteOrder(json,orderNum){
    return {
        type: json.code==0?types.RECEIVE_DELETE_ORDER:"",
        order_num:orderNum
    };
}
//获取所有订单列表
export function getOrderList(page){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_ORDER_LIST.replace("%1",page).replace(types.URL_BASE_TOKEN,GetQueryString('tk')),json => receiveOrderList(json.data));
}
export function receiveOrderList(data){
    return {
        type: types.RECEIVE_ORDER_LIST,
        orders:data
    };
}
//获取订单物流信息
export function getOrderExpress(order_num){
    return fetchWithUrlFunc(types.URL_BASE+types.URL_GET_ORDER_EXPRESS.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace('%n',order_num),json => receiveOrderExpress(json,order_num));
}
export function receiveOrderExpress(json,order_num){
    return {
        type: json.code==0?types.RECEIVE_ORDER_EXPRESS:"",
        express:json.data,
        orderNum:order_num
    };
}
//上传评论
export function uploadCommentAndScore(order){
    let data=[];
    order.details.map(detail=>{
        data.push({id:detail.id,comment:detail.comment,score:detail.score});
    });

    return fetchPostWithUrlFunc(types.URL_BASE+types.URL_UPLOAD_COMMENT_SCORE.replace(types.URL_BASE_TOKEN,GetQueryString('tk')).replace('%n',order.id),
        {
            method: "POST",
            body:JSON.stringify(data)
        },json => receiveUploadCommentAndScore(json));
}
export function receiveUploadCommentAndScore(json){
    return {
        type: json.code==0?types.RECEIVE_UPLOAD_COMMENT_SCORE:"",
        data:json.data
    };
}



//切换支付方式
export function togglePay(value,toggled){
    return {
        type: types.TOGGLE_PAY,
        value:value,
        toggled:toggled
    };
}
//控制 订单列表tab切换
export function handleChangeOrderListTabs(index){
    return {
        type:types.CHANGE_ORDER_LIST_TAB,
        index:index
    }
}

//增加选中数量
export function addChooseProductQuantity(quantity){
    quantity=(quantity==undefined?0:quantity);
    return {
        type:types.ADD_CHOOSE_PRODUCT_QUANTITY,
        quantity:quantity
    }
}
export function minusChooseProductQuantity(quantity){
    quantity=(quantity==undefined?0:quantity);
    return {
        type:types.MINUS_CHOOSE_PRODUCT_QUANTITY,
        quantity:quantity
    }
}
//选择评分等级
export function selectCommentScore(score,id){
    return {
        type:types.SELECT_COMMENT_SCORE,
        score:score,
        id:id
    }
}
//输入评论内容
export function inputCommentText(id,comment){
    return {
        type:types.INPUT_COMMENT_TEXT,
        comment:comment,
        id:id
    }
}
//选择颜色
export function selectProductColor(cid,data){
    //库存变更
    let stocks=0;
    data.quantity.map(quantity=>{
        if(data.chooseType==undefined&&quantity.p_cid==cid) {
            stocks += parseInt(quantity.p_quantity);
        }else if(data.chooseType==quantity.p_tid&&quantity.p_cid==cid){
            stocks = parseInt(quantity.p_quantity);
        }
    });
    //价格变更
    let pMax=parseFloat(data.price);
    let pMin=parseFloat(data.price);
    let colorPic="";
    let chooseRemind;
    data.colors.map(color=>{
        if(color.p_cid==cid){
            data.types.map(type=>{
                if(data.chooseType==undefined){
                    if((parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price))>pMax){
                        pMax=parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price);
                    }
                    if((parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price))<pMin){
                        pMin=parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price);
                    }
                }else if(data.chooseType==type.p_tid){
                    pMax=pMin=parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price);
                    chooseRemind="已选择:"+color.p_color+" "+type.p_type;
                }
            })
            colorPic=color.p_color_pic;
        }
    });

    return {
        type:types.CHOOSE_PRODUCT_COLOR,
        cid:cid,
        stocks:stocks,
        chooseRemind:chooseRemind,
        priceRange:getPriceRangeString(pMax,pMin),
        colorPic:colorPic
    }
}
//选择型号
export  function selectProductType(tid,data){
    //库存变更
    let stocks=0;
    data.quantity.map(quantity=>{
        if(data.chooseColor==undefined&&quantity.p_tid==tid) {
            stocks += parseInt(quantity.p_quantity);
        }else if(data.chooseColor==quantity.p_cid&&quantity.p_tid==tid){
            stocks = parseInt(quantity.p_quantity);
        }
    });
    //价格变更
    let pMax=parseFloat(data.price);
    let pMin=parseFloat(data.price);
    let chooseRemind;
    data.colors.map(color=>{
        data.types.map(type=>{
            if(type.p_tid==tid){
                if(data.chooseColor==undefined){
                    if((parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price))>pMax){
                        pMax=parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price);
                    }
                    if((parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price))<pMin){
                        pMin=parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price);
                    }
                }else if(data.chooseColor==color.p_cid){
                    pMax=pMin=parseFloat(type.p_add_price)+parseFloat(color.p_add_price)+parseFloat(data.price);
                    chooseRemind="已选择:"+color.p_color+" "+type.p_type;
                }
            }
        })
    });
    return {
        type:types.CHOOSE_PRODUCT_TYPE,
        tid:tid,
        stocks:stocks,
        chooseRemind:chooseRemind,
        priceRange:getPriceRangeString(pMax,pMin)
    }
}
//选择 老花 近视 渐进 远视
export function changeChooseDegreeType(key,chooseDegree,chooseProperty,event){

    return {
        type:types.CHANGE_CHOOSE_DEGREE_TYPE,
        key:key,
        value:event.target.selectedIndex,
        chooseProperty:chooseProperty
    }
}


//获取访问浏览器终端类型 device
export  function setBrowserVersion(tid,data){
    var browserVersion = {
        versions: function () {
            var u = navigator.userAgent, app = navigator.appVersion;
            return { //移动终端浏览器版本信息
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1||u.indexOf('Linux') > -1, //android终端或uc浏览器
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
            };
        }(),
    }
    return {
        type:types.SET_BROWSER_VERSION,
        version:browserVersion
    }
}

function getPriceRangeString(pMax,pMin){
    let priceRange=0;
    if(pMax!=pMin){
        priceRange="￥ "+pMin.toFixed(2)+" - "+pMax.toFixed(2);
    }else{
        priceRange="￥ "+pMax.toFixed(2);
    }
    return priceRange;
}
export function getCookie(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}
export function setCookie(name,value)
{
    var exp = new Date();
    exp.setTime(exp.getTime() + 1200*1000);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=/";
}
export function setCookieWithoutExpire(name,value)
{
    document.cookie = name + "="+ escape (value)+"; path=/";
}
var token="";
export function GetQueryString(name)
{
    var temp='';
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(name=="tk") {
        if (r != null) {
            token = unescape(r[2]);
        }
        return token;
    }else {
        if (r != null) {
            temp = unescape(r[2]);
        }
        return temp;
    }
}
function fetchWithUrlFunc(url,func){
    return fetch(url+"&timestamp="+(parseInt(getCookie('tsDer'))+parseInt(new Date().getTime()/1000)))
        .then(req =>{
            if(req.ok){
                return req.json();
            }else if(req.status==401){
                setTimeout(function(){window.location.href='http://app.uyu.com/resources/download'},200);
            }
            return {code:"1",message:req.message};
        })
        .then(func);
}
function fetchPostWithUrlFunc(url,post,func){
    return fetch(url+"&timestamp="+(parseInt(getCookie('tsDer'))+parseInt(new Date().getTime()/1000)),post)
        .then(req =>{
            if(req.ok){
                return req.json();
            }else if(req.status==401){
                setTimeout(function(){window.location.href='http://app.uyu.com/resources/download'},200);
            }
            return {code:"1",message:req.message};
        })
        .then(func);
}