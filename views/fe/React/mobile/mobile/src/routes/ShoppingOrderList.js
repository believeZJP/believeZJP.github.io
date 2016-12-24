'use strict';
import '../assets/Shopping.css';
import * as types from '../constants/ShoppingActionTypes';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
import Dialog from 'material-ui/lib/dialog';
import Tabs from 'material-ui/lib/tabs/tabs';
import Tab from 'material-ui/lib/tabs/tab';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import Checkbox from 'material-ui/lib/checkbox';
import SelectField from 'material-ui/lib/select-field';
import Toggle from 'material-ui/lib/toggle';
import CircularProgress from 'material-ui/lib/circular-progress.js'
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getOrderList,handleChangeOrderListTabs,deleteOrder,getOrderExpress,GetQueryString} from '../actions/ShoppingActions.js';
import SwipeableViews from 'react-swipeable-views';
class ShoppingOrderList extends Component {
    constructor(props, content) {
        super(props, content);
        this.express_order_num = 0;
        this.pageNum=0;
    }
    componentDidMount(){
        this.refs.dialogLoading._show();
        this.props.getOrderList(this.pageNum++);
        window.document.body.style.background='rgb(255,255,255)';
        window.onscroll=(e)=>{
            if((e.target.body.scrollTop+window.innerHeight)==e.target.body.offsetHeight){
                this.props.getOrderList(this.pageNum++);
            }
        };
    };
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
    }
    _handleChangeTabs(index){
        this.props.handleChangeOrderListTabs(parseInt(index));
    }
    onDeleteOrder(orderNum){
        this.refs.dialogLoading._show();
        this.props.deleteOrder(orderNum);
    }
    onConfirmComment(orderNum){
        //this.props.history.replaceState(null,"/mobileShopping/ShoppingInputComment/"+order_num);
        this.refs['ShoppingInputComment'+orderNum].click();
    }
    onDialogCancel() {
        this.refs['dialogPay']._dismiss();
        this.refs.dialog._dismiss();
    }
    handleShowDialog(order_num){
        this.express_order_num = order_num;
        this.props.getOrderExpress(order_num);
        this.refs['dialog']._show();
    }
    goToPayOrder(order_num,pay_type){
        this.refs['dialogPay']._show();
        setTimeout("alert(JSON.stringify({alert:0,order_num:"+order_num+",pay_type:"+pay_type+"}));",500) ;
        var refs=this.refs;
        var props=this.props;
        setTimeout(function(){
            refs['dialogPay']._dismiss();
            props.getOrderList();
        },500) ;
    }
    onSendCash(link){
        alert(JSON.stringify({alert:1,share_title:"UYU.COM-眼运动,眼健康。",share_brief:"小优送您红包咯，快来领取哈~",share_image:types.URL_BASE+"/images/faHongBao/index/faHongbao_bg01.png",share_link:link}));
    }
    render() {
        const {orders,browserVersion}=this.props;
        const orderList=(orders.orders==undefined?[]:orders.orders);
        const totalCount=orders.total_count;
        const unPayedCount=orders.un_payed_count;
        const payedCount=orders.payed_count;
        const borderRadius="5px";
        let time=new Date().getTime();
        orderList.map(order=>{
            order.hasComment=true;
            order.details.map(detail=>detail.comment_id==0?order.hasComment=false:"");
        });
        const styles={
            list:{paddingTop:0,paddingBottom:0,overflowX:"hidden"},
            full:{width:"100%",height:"100%"},
            tabs:{width:"100%",color:"#000000",height:"30px",padding:0,margin:0,background:"#ffffff"},
            tabItem1:{color:((orders.orderTab==0||orders.orderTab==undefined)?"#FF4040":"#000000")},
            tabItem2:{color:(orders.orderTab==1?"#FF4040":"#000000")},
            orderNum:{textAlign:"left",fontSize:"12px"},
            itemSummary:{textAlign:"right",width:"90%",right:"10%",fontSize:"12px"},
            itemPrice:{ color:"#EE7942",fontSize:"14px" },
            itemRedButton:{minWidth:"30px",color:"#EE7942",lineHeight:"24px",height:"24px",borderRadius:5,border:"1px solid red",float:"right",marginRight:"10px",marginTop:3},
            itemBlackButton:{minWidth:"30px",color:"#000000",lineHeight:"24px",height:"24px",borderRadius:5,border:"1px solid black",float:"right",marginRight:"10px",marginTop:3},
            itemButtonWrap:{height:"30px",padding:0},
            topWhiteSpace:{width:"100%",height:"90px"},
            swipeableInkBar:{width:"100%",height:3,background:"#AAAAAA"},
            swipeableViews:{margin:"0 auto",width:"100%",height:"100%",background:"#ffffff"},
            swipeableViewPaddingTop:{margin:"0 auto",width:"100%",height:"100%",background:"#ffffff",paddingTop:"2%"},
            backButton:{position:"fixed",left:"10px",top:"5px",height:"35px",width:"35px",zIndex:2},
            itemProducts:{padding:10,fontSize:"14px",height:"20px",width:"100%",textAlign:"center"},
            productCount:{top:"10px",margin:"0 auto"},
            itemCheckBox:{width:"50px",height:"30px",margin:"0"},
            buttonDelete:{float:"right",minWidth:"30px",top:3,right:3,height:"24px",color:"#ffffff",lineHeight:"24px",fontSize:"12px"},
            floatRight:{float:"right"},
            productItem:{margin:0,width:"96%",marginLeft:"2%",marginBottom:"2%",background:"#ffffff"},
            productDivide:{width:"100%",height:"10px", background:"#E0E0E0",margin:0},
            buttonBuyAll:{minWidth:"70px",height:"100%",color:"#ffffff",borderRadius:0,float:"right",zIndex:2},
            buttonCheckAll:{width:"100px",height:"100%",float:"left",color:"#ffffff",zIndex:2},
            bottomToolBar:{position:"fixed",width:"100%",height:"43px",left:0,bottom:0,background:"#ffffff",borderRadius:0,zIndex:2},
            bottomSpace:{width:"100%",height:"50px",background:"#ffffff"},
            totalPrice:{float:"right",marginTop:"5px",marginRight:"5px",zIndex:2},
            selectField:{width:"47%",marginLeft:"2%"},
            inkBarStyle:{height:"0"},
            orderDate:{float:"right",color:"gray"},
            sendCash:{marginTop:"-10px",width:"40px",height:"40px"}
        };
        const standardActions = [
            <RaisedButton
                label="关闭"
                secondary={true}
                onTouchTap={this.onDialogCancel.bind(this)} />
        ];
        return (
            <List style={styles.list}>
                <ListItem style={styles.itemProducts} disabled={true}><h3 style={styles.productCount}>我的订单&nbsp;&nbsp;{totalCount==undefined?"(0)":"("+totalCount+")"}</h3></ListItem>
                <ListDivider/>
                <Tabs onChange={this._handleChangeTabs.bind(this)} value={(orders.orderTab==undefined?0:orders.orderTab).toString()} inkBarStyle={styles.inkBarStyle}  tabItemContainerStyle={styles.tabs}>
                    <Tab style={styles.tabItem1} label={"已付款("+(payedCount==undefined?"0":payedCount)+")"} value="0" />
                    <Tab style={styles.tabItem2} label={"未付款("+(unPayedCount==undefined?"0":unPayedCount)+")"} value="1" />
                </Tabs>
                <ListDivider/>
                <SwipeableViews onChangeIndex={this._handleChangeTabs.bind(this)} index={orders.orderTab==undefined?0:orders.orderTab} style={styles.swipeableViews}>
                    <div style={styles.swipeableViewPaddingTop}>{orderList==undefined?"":(orderList.filter(order=>order.pay_status==1).map((order,index)=>(<Paper style={styles.productItem} key={time+index}>
                        <ListItem style={styles.orderNum}>订单号:{order.order_num}<font style={styles.orderDate}>{order.created_at.substr(0 ,16)}</font></ListItem>
                        <ListDivider/>
                        {order.details.map((detail,i)=>(
                            <ListItem
                                key={time*2+i}
                                leftAvatar={<Avatar src={"/"+detail.p_pic_url.toString()}/>}
                                primaryText={<div>{detail.name}</div>}
                                disabled={true}
                                secondaryText={<p>
                                        <span style={{color:"#000000"}}><font color="#A9A9A9">{detail.brief}</font></span>
                                        <br/>
                                        <font color="#EE7942">{"￥"+detail.total_price}</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font styles={styles.floatRight} color="#A9A9A9">{"数量:"+detail.quantity}</font>
                                        </p>}
                                secondaryTextLines={2}>
                            </ListItem>
                        ))}
                        <ListDivider/>
                        <p style={styles.itemSummary}><font style={styles.itemPrice}>{order.send_express_id==0||order.send_express_id==undefined?"[未发货]":"[已发货]"}</font>&nbsp;&nbsp;&nbsp;共{order.quantity}件商品&nbsp;&nbsp;&nbsp;总价:<font style={styles.itemPrice}>￥{order.total_price}</font></p>
                        <ListItem style={styles.itemButtonWrap} disabled={true}>
                            <Link to={"/mobileShopping/ShoppingInputComment/"+order.order_num}><input style={{display:"none"}} type="button" ref={"ShoppingInputComment"+order.order_num}></input></Link>
                            {order.hasComment?"":<FlatButton style={styles.itemRedButton} onTouchTap={this.onConfirmComment.bind(this,order.order_num)} primary={true} label={"去评价"}></FlatButton>}
                            <FlatButton style={styles.itemBlackButton} onTouchTap={this.handleShowDialog.bind(this,order.order_num)} secondary={true} label={"查看详情"}></FlatButton>
                            {(order.share_url==undefined||order.share_url=="")?"":<img style={styles.sendCash} onClick={this.onSendCash.bind(this,order.share_url)} src="/images/app_resources/share_cash.png"/>}
                        </ListItem>
                    </Paper>)))}</div>
                    <div style={styles.swipeableViewPaddingTop}>{orderList==undefined?"":(orderList.filter(order=>order.pay_status==0).map((order,index)=>(<Paper style={styles.productItem} key={time*2+index}>
                        <ListItem style={styles.orderNum}>订单号:{order.order_num}<font style={styles.orderDate}>{order.created_at.substr(0 ,16)}</font></ListItem>
                        <ListDivider/>
                        {order.details.map((detail,i)=>(
                            <ListItem
                                key={time*3+i}
                                leftAvatar={<Avatar src={"/"+detail.p_pic_url.toString()}/>}
                                primaryText={<div>{detail.name}</div>}
                                disabled={true}
                                secondaryText={<p>
                                        <span style={{color:"#000000"}}><font color="#A9A9A9">{detail.brief}</font></span>
                                        <br/>
                                        <font color="#EE7942">{"￥"+detail.total_price}</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font styles={styles.floatRight} color="#A9A9A9">{"数量:"+detail.quantity}</font>
                                        </p>}
                                secondaryTextLines={2}>
                            </ListItem>
                        ))}
                        <ListDivider/>
                        <p style={styles.itemSummary}>共{order.quantity}件商品&nbsp;&nbsp;&nbsp;总价:<font style={styles.itemPrice}>￥{order.total_price}</font></p>
                        <ListItem style={styles.itemButtonWrap} disabled={true}>
                            {browserVersion.ios?<FlatButton onTouchTap={this.goToPayOrder.bind(this,order.order_num,order.pay_type)} style={styles.itemRedButton} label={"去付款"}></FlatButton>:<FlatButton onClick={this.goToPayOrder.bind(this,order.order_num,order.pay_type)} style={styles.itemRedButton} label={"去付款"}></FlatButton>}
                            {browserVersion.ios?<FlatButton style={styles.itemBlackButton} onTouchTap={this.onDeleteOrder.bind(this,order.order_num)} label={"删除订单"}></FlatButton>:<FlatButton style={styles.itemBlackButton} onClick={this.onDeleteOrder.bind(this,order.order_num)} label={"删除订单"}></FlatButton>}
                            {browserVersion.ios?<FlatButton style={styles.itemBlackButton} onTouchTap={this.handleShowDialog.bind(this,order.order_num)} label={"查看详情"}></FlatButton>:<FlatButton style={styles.itemBlackButton} onClick={this.handleShowDialog.bind(this,order.order_num)} label={"查看详情"}></FlatButton>}
                        </ListItem>
                    </Paper>)))}</div>
                </SwipeableViews>
                <Dialog
                    ref={"dialog"}
                    title="详情"
                    actions={standardActions}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    contentStyle={{width:"90%"}}>
                        {orderList.map(order=>order.order_num==this.express_order_num?<div><h3><font color="gray">收件人:</font>{order.send_dest_name}</h3><h3><font color="gray">收件人电话:</font>{order.send_dest_phone}</h3><h3><font color="gray">收件地址:</font>{order.send_dest_address}</h3>{order.send_express_name==undefined?"":<div><h3><font color="gray">快递公司:</font>{order.send_express_name}</h3><h3><font color="gray">快递单号:</font>{order.send_express_num}</h3></div>}</div>:"")}
                </Dialog>
                <Dialog
                    ref={"dialogPay"}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    contentStyle={{textAlign:"center"}}>
                    <CircularProgress mode="indeterminate" color={"red"} size={1} /><h3>支付跳转中...</h3>
                </Dialog>
                <Dialog
                    ref={"dialogLoading"}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    contentStyle={{textAlign:"center"}}>
                    <CircularProgress mode="indeterminate" color={"red"} size={1} /><h3>UYU为您加载中...</h3></Dialog>
            </List>
            );
    }
}
function mapStateToProps(state) {
    return {
        orders:state.orders,
        browserVersion:state.browserVersion
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getOrderList,handleChangeOrderListTabs,deleteOrder,getOrderExpress}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingOrderList);

