'use strict';
import { combineReducers } from 'redux';
import * as types from '../constants/ShoppingActionTypes';

export function banners(state=["","","","",""],action){
    switch (action.type){
        case types.RECEIVE_WEL_BANNERS:
            return action.banners;
        case types.UPLOAD_WEL_BANNER:
            state[action.id]=action.uploadResult;
            return Object.assign([],state,state);
        case types.DELETE_WEL_BANNER:
            state[action.id]="";
            return Object.assign([],state,state);
        default :
            return state;
    }
}

export function modifyBanners(state=[],action){
    switch (action.type){
        case types.UPLOAD_WEL_BANNER:
            return action.uploadResult;
        case types.DELETE_WEL_BANNER:
            return action.uploadResult;
        default :
            return state;
    }
}
export function products(state=[{id:"",title:"",price:"",pic:""}],action){
    switch (action.type){
        case types.RECEIVE_WEL_PRODUCTS:
            return action.products;
        case types.UPLOAD_WEL_PRODUCTS:
            state.map(product=>{
                if(product.id==action.uploadResult.id){
                    product.pic=action.uploadResult.pic
                    product.title=action.uploadResult.title
                }
            });
            return Object.assign([],state,state);
        case types.RECEIVE_PRODUCT_DETAILS:
            state.map(product=>{
                if(product.id==action.productDetails.pid){
                    product.isExpanded=true;
                }else{
                    product.isExpanded=false;
                }
            });
            return Object.assign([],state,state);
        default :
            return state;
    }
}
export function productDetails(state={},action){
    switch (action.type){
        case types.RECEIVE_PRODUCT_DETAILS:
            return action.productDetails;
        case types.ON_PRODUCT_DETAILS_CHANGE:
            state[action.key][action.index][action.name]=action.event.target.value;
            return Object.assign({},state,state);
        case types.ON_PRODUCT_DETAILS_ADD:
            state[action.key].push(action.addObj);
            return Object.assign({},state,state);
        case types.ON_PRODUCT_DETAILS_DEL:
            state[action.key].splice(action.index,1);
            return Object.assign({},state,state);
        case types.TOGGLE_DETAILS_CHOOSE_VIEW:
            state.openChoose=action.openChoose;
            return Object.assign({},state,state);
        case types.ADD_CHOOSE_PRODUCT_QUANTITY:
            state.chooseQuantity=state.chooseQuantity==undefined?0:state.chooseQuantity;
            if(state.stocks>action.quantity){
                state.chooseQuantity+=1;
            }
            return Object.assign({},state,state);
        case types.MINUS_CHOOSE_PRODUCT_QUANTITY:
            state.chooseQuantity=state.chooseQuantity==undefined?0:state.chooseQuantity;
            if(action.quantity>0){
                state.chooseQuantity-=1;
            }
            return Object.assign({},state,state);
        case types.CHOOSE_PRODUCT_COLOR:
            state.chooseQuantity=0;
            state.chooseColor=action.cid;
            state.stocks=action.stocks;
            state.chooseRemind=action.chooseRemind;
            state.choosePriceRange=action.priceRange;
            state.chooseColorPic=action.colorPic;
            return Object.assign({},state,state);
        case types.CHOOSE_PRODUCT_TYPE:
            state.chooseQuantity=0;
            state.chooseType=action.tid;
            state.stocks=action.stocks;
            state.chooseRemind=action.chooseRemind;
            state.choosePriceRange=action.priceRange;
            return Object.assign({},state,state);
        case types.ADD_PRODUCT_CART:
            action.cart.name=state.name;
            action.cart.pic_url=state.banners[0].p_pic_url;
            state.colors.map(color=>state.types.map(type=>{
                if(action.cart.cid==color.p_cid&&action.cart.tid==type.p_tid){
                    action.cart.price=parseFloat(state.price)+parseFloat(color.p_add_price)+parseFloat(type.p_add_price);
                    action.cart.brief = "颜色:"+color.p_color+"  型号:"+type.p_type;
                }
            }));
            return state;
        default :
            return state;
    }
}
export function productDetailPics(state=[],action){
    switch (action.type){
        case types.URL_GET_PRODUCT_DETAIL_PICS:
            return action.pics;
            break;
        default:
            return state;
            break;
    }
}
export function productComments(state={},action){
    switch (action.type){
        case types.RECEIVE_PRODUCT_DETAILS:
            return {};
        case types.RECEIVE_PRODUCT_COMMENTS:
            return action.data;
        case types.RECEIVE_MORE_PRODUCT_COMMENTS:
            action.data.comments.map(comment=>state.comments.push(comment));
            return Object.assign({},state,state);
        default :
            return state;
    }
}

export function userInfoList(state=[],action){
    switch(action.type){
        case types.RECEIVE_PRODUCT_DETAILS:
            return [];
        case types.RECEIVE_USER_INFO:
            if(state.filter(userInfo=>userInfo.id==action.userInfo.id).length==0){
                state.push(action.userInfo);
            }
            return Object.assign([],state,state);
        case types.URL_GET_USER_INFO_LIST:
            action.userInfo.map(userInfo=>{
                if(state.filter(user=>user.id==userInfo.id).length==0){
                    state.push(userInfo);
                }
            });
            return Object.assign([],state,state);
        default:
            return state;
    }
}
export function productCart(state=[],action){
    switch(action.type){
        case types.RECEIVE_PRODUCT_CART:
            if(state.length>0){
                action.data.map(cart=>{
                    let filter=state.filter(origin=>origin.car_id==cart.car_id);
                    if(filter.length>0){
                        cart.checked=filter[0].checked;
                    }
                })
            }
            return action.data;
        case types.CHECK_CART_PRODUCT:
            state.map(cart=>cart.car_id==action.cartID?cart.checked=action.checked:"");
            return  Object.assign([],state,state);
        case types.CHECK_CART_ALL_PRODUCTS:
            state.map(cart=>cart.checked=action.checked);
            return Object.assign([],state,state);
        case types.DEL_PRODUCT_CART:
            action.cartIDS.toString().split(",").map(cartID=>{
                state=state.filter(cart=>cart.car_id!=cartID);
            });
            return Object.assign([],state,state);
        case types.ADD_PRODUCT_CART:
            var cart=state.filter(cart=>cart.car_id==action.cart.car_id);
            if(cart.length==0){
                state.push(action.cart);
            }else{
                cart[0].count=parseInt(cart[0].count)+parseInt(action.cart.count);
            }
            return Object.assign([],state,state);
        case types.RECEIVE_SUBMIT_PAY_ORDER:
            let newState=[];
            action.carts.map(cart_id=>{
                state.map(origin=>{
                    if(origin.car_id!=cart_id){
                        newState.push(origin);
                    }
                })
            })
            state=newState;
            return Object.assign([],state,state);
        default:
            return state;
    }
}
export function productTempBuy(state={},action){
    switch(action.type){
        case types.ADD_PRODUCT_CART_AND_BUY:
            return action.tempBuy;
        case types.RECEIVE_SUBMIT_PAY_ORDER_NOW:
            state.order_num=action.order_num;
            return Object.assign({},state,state);
        case types.RECEIVE_PRODUCT_CART:
            return {};
        default:
            return state;
    }
}
export function addressList(state={},action){
    switch(action.type){
        case types.RECEIVE_ADDRESS_LIST:
            if(!(!action.isNext&&state['type0']!=undefined&&state['type0'].length>0)){
                action.isNext?state['type'+parseInt(action.addressType+1)]=action.list:state['type'+action.addressType]=action.list;
                state['type'+action.addressType].selectedIndex=action.selectedIndex;
                action.isNext?state['type'+parseInt(action.addressType+2)]=undefined:state['type'+parseInt(action.addressType+1)]=undefined;
                state['type'+parseInt(action.addressType+3)]=undefined;
            }
            return Object.assign({},state,state);
        case types.SET_ADDRESS_DETAIL:
            state[action.key]=action.text;
            return Object.assign({},state,state);
        case types.TOGGLE_PAY:
            if(action.toggled){
                state['pay']=action.value;
            }else if(state['pay']==action.value){
                state['pay']=undefined;
            }
            return Object.assign({},state,state);
        case types.RECEIVE_SUBMIT_PAY_ORDER:
            state['order_num']=action.order_num;
            return Object.assign({},state,state);
        case types.TOGGLE_ADDRESS_LIST_CHOOSE_VIEW:
            state['openChoose']=action.openChoose;
            return Object.assign({},state,state);
        case types.URL_GET_LATEST_EXPRESS_INFO:
            state['type0']=action.data.province_list;
            state['type0'].selectedIndex=action.data.province_selected;
            state['type1']=action.data.city_list;
            state['type1'].selectedIndex=action.data.city_selected;
            state['type2']=action.data.county_list;
            state['type2'].selectedIndex=action.data.county_selected;
            state['type3']=action.data.town_list;
            action.data.town_list!=undefined?state['type3'].selectedIndex=action.data.town_selected:"";
            state.name=action.data.name;
            state.phone=action.data.phone;
            state.address=action.data.address;
            return Object.assign({},state,state);
        default:
            return state;
    }
}
export function orders(state={},action){
    switch(action.type){
        case types.RECEIVE_ORDER_LIST:
            if(state.orders==undefined){
                state=action.orders;
            }else{
                action.orders.orders.map(order=>{
                    if(state.orders.filter(o=>o.order_num==order.order_num).length==0){
                        state.orders.push(order);
                    }
                });
            }
            return Object.assign({},state,state);
        case types.CHANGE_ORDER_LIST_TAB:
            state.orderTab=action.index;
            return Object.assign({},state,state);
        case types.RECEIVE_DELETE_ORDER:
            let newState=[];
            state.orders.map(order=>{
                order.order_num!=action.order_num?newState.push(order):""
            });
            state.orders=newState;
            state.orderTab=1;
            return Object.assign({},state,state);
        case types.SELECT_COMMENT_SCORE:
            state.orders.map(order=>{
                order.details.map(detail=>{
                    if(detail.id==action.id){
                        detail.score=action.score;
                    }
                })
            });
            return Object.assign({},state,state);
        case types.INPUT_COMMENT_TEXT:
            state.orders.map(order=>{
                order.details.map(detail=>{
                    if(detail.id==action.id){
                        detail.comment=action.comment;
                    }
                })
            });
            return Object.assign({},state,state);
        case types.RECEIVE_UPLOAD_COMMENT_SCORE:
            state.orders.map(order=>{
                order.details.map(detail=>{
                    action.data.map(data=>{
                        if(data.detail_id==detail.id){
                            detail.comment_id=data.comment_id;
                        }
                    })
                })
            });
            return Object.assign({},state,state);
        case types.RECEIVE_ORDER_EXPRESS:
            state.orders.map(order=>{
                if(order.order_num==action.orderNum){
                    order.send_express_id=action.express.id;
                    order.send_express_name=action.express.name;
                    order.send_express_num=action.express.express_num;
                    order.send_dest_name=action.express.send_dest_name;
                    order.send_dest_phone=action.express.send_dest_phone;
                    order.send_dest_address=action.express.send_dest_address;
                }
            });
            return Object.assign({},state,state);
        default:
            return state;
    }
}
export function latestExpressInfo(state={},action){
    switch(action.type){
        case types.URL_GET_LATEST_EXPRESS_INFO:
            return action.data;
        default:
            return state;
    }
}
export function chooseDegree(state={checked:"请选择度数"},action){
    switch(action.type){
        case types.CHANGE_CHOOSE_DEGREE_TYPE:
            if(action.key=="type"){
                state={};
                switch (action.value){
                    case 2:
                        state.sphL=state.sphR=64;
                        break;
                    case 3:
                        state.sphL=state.sphR=64;
                        state.addL=state.addR=0;
                        break;
                }
            }
            state[action.key]=action.value;
            var chooseProperty=action.chooseProperty;
            var chooseDegree=state;
            var sphL=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].sphL[chooseDegree.sphL==undefined?0:chooseDegree.sphL];
            var sphR=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].sphR[chooseDegree.sphR==undefined?0:chooseDegree.sphR];
            var pd=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].pd[chooseDegree.pd==undefined?0:chooseDegree.pd];
            var cylL=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].cylL[chooseDegree.cylL==undefined?0:chooseDegree.cylL];
            var cylR=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].cylR[chooseDegree.cylR==undefined?0:chooseDegree.cylR];
            var axisL=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].axisL[chooseDegree.axisL==undefined?0:chooseDegree.axisL];
            var axisR=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].axisR[chooseDegree.axisR==undefined?0:chooseDegree.axisR];
            var add=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].add[chooseDegree.add==undefined?0:chooseDegree.add];
            var checked="请选择度数";
            if(!(parseFloat(sphL)!=0||parseFloat(sphR)!=0)){
                checked='请选择度数!';
            }else if((parseFloat(cylL)<0&&!(parseFloat(axisL)>0))){
                checked='请选择左眼轴位!';
            }else if((parseFloat(cylR)<0&&!(parseFloat(axisR)>0))){
                checked='请选择右眼轴位!';
            }else if((!(parseFloat(cylL)<0)&&parseFloat(axisL)>0)){
                checked='请选择左眼散光度数!';
            }else if((!(parseFloat(cylR)<0)&&parseFloat(axisR)>0)){
                checked='请选择右眼散光度数!';
            }else{
                checked=true;
            }
            var result=chooseProperty[chooseDegree.type==undefined?0:chooseDegree.type].name+" "+
                "左:"+sphL+"/"+cylL+"/"+axisL+" "+
                "右:"+sphR+"/"+cylR+"/"+axisR+" "+
                "瞳距:"+pd+" "+
                "下加光:"+add+";";
            state.checked=checked;
            state.result=result;
            return Object.assign({},state,state);
        default:
            return state;
    }
}
export function redPocket(state={list:[],count:0,use_max:10,confirm:[]},action){
    switch(action.type){
        case types.URL_GET_RED_POCKET_LIST:
            if(action.page==0){
                state.list=action.data.list;
            }else{
                var list=state.list;
                action.data.list.map(item=>{
                    var temp=state.list.filter(sItem=>sItem.detail_key==item.detail_key);
                    if(temp.length==0){
                        list.push(item);
                    }
                });
                state.list=list;
            }
            state.count=action.data.count;
            state.use_max=action.data.use_max;
            state.confirm.map(item=>{
                state.list.map(sItem=>{
                    if(sItem.detail_key==item.detail_key){
                        sItem.checked=true;
                    }
                });
            });
            return Object.assign({},state,state);
        case types.CHECK_RED_POCKET:
            if(action.checked==true&&state.list.filter(item=>item.checked==true).length>=state.use_max){
                alert("最多使用"+state.use_max+"个红包哦~");
            }else{
                state.list.map(item=>{
                    if(item.detail_key==action.key){
                        item.checked=action.checked;
                    }
                });
            }
            return Object.assign({},state,state);
        case types.CONFIRM_CHECK_RED_POCKET:
            state.confirm=state.list.filter(item=>item.checked==true);
            return Object.assign({},state,state);
        case types.RECEIVE_PRODUCT_DETAILS:
        case types:RECEIVE_WEL_PRODUCTS:
            state={list:[],count:0,use_max:10,confirm:[]};
            return Object.assign({},state,state);
        default:
            return state;
    }
}
export function bonusPocket(state={list:[],count:0,use_max:10,confirm:[]},action){
    switch(action.type){
        case types.URL_GET_BONUS_POCKET_LIST:
            if(action.page==0){
                state.list=action.data.list;
            }else{
                var list=state.list;
                action.data.list.map(item=>{
                    var temp=state.list.filter(sItem=>sItem.detail_key==item.detail_key);
                    if(temp.length==0){
                        list.push(item);
                    }
                });
                state.list=list;
            }
            state.count=action.data.count;
            state.use_max=action.data.use_max;
            state.confirm.map(item=>{
                state.list.map(sItem=>{
                    if(sItem.detail_key==item.detail_key){
                        sItem.checked=true;
                    }
                });
            });
            return Object.assign({},state,state);
        case types.CHECK_BONUS_POCKET:
            state.list.map(item=>{
                if(item.detail_key==action.key){
                    item.checked=action.checked;
                }else{
                    item.checked=false;
                }
            });
            return Object.assign({},state,state);
        case types.CONFIRM_CHECK_BONUS_POCKET:
            state.confirm=state.list.filter(item=>item.checked==true);
            return Object.assign({},state,state);
        case types.RECEIVE_PRODUCT_DETAILS:
        case types:RECEIVE_WEL_PRODUCTS:
            state={list:[],count:0,use_max:10,confirm:[]};
            return Object.assign({},state,state);
        default:
            return state;
    }
}
export function browserVersion(state=[],action){
    switch(action.type){
        case types.SET_BROWSER_VERSION:
            return action.version;
        default:
            return state;
    }
}
const rootReducer = combineReducers({
    banners,
    modifyBanners,
    products,
    productDetails,
    productDetailPics,
    productComments,
    userInfoList,
    productCart,
    addressList,
    orders,
    productTempBuy,
    browserVersion,
    latestExpressInfo,
    chooseDegree,
    redPocket,
    bonusPocket
})
export default rootReducer;