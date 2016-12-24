'use strict';
import '../assets/Shopping.css';
import * as types from '../constants/ShoppingActionTypes';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import Checkbox from 'material-ui/lib/checkbox';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
import Badge from 'material-ui/lib/badge';
import CircularProgress from 'material-ui/lib/circular-progress';
import Dialog from 'material-ui/lib/dialog';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getShoppingCart,checkCartProducts,checkCartAllProducts,delShoppingCart,getLatestExpressInfo} from '../actions/ShoppingActions.js';
class ShoppingCart extends Component {
    componentDidMount(){
        this.refs.dialogLoading._show();
            this.props.getShoppingCart();
        };
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
    }
    goBack(){
        this.props.history.goBack();
    }
    handleBuyAll(){
        let cartTotal=0;
        this.props.productCart==undefined?"":this.props.productCart.map(cart=>cart.checked?cartTotal+=parseInt(cart.count):"");
        if(cartTotal>0){
            //this.props.history.replaceState(null,"/mobileShopping/ShoppingConformOrder/1");
            var refs=this.refs;
            setTimeout(function (){refs['ShoppingConformOrder'].click();},300);

        }else{
            alert('请选择要购买的商品!');
        }
    }
    goToProductDetails(pid){
        if(this.refs!=undefined) {
            //this.props.history.replaceState(null,"/mobileShopping/ShoppingProductDetails/"+pid);
            this.refs["ShoppingProductDetails" + pid].click();
        }
    }
    onProductCheck(cartID,e,checked){
        this.props.checkCartProducts(cartID,checked);
    }
    onProductCheckAll(e,checked){
        this.props.checkCartAllProducts(checked);
    }
    onDeleteClick(cartID){
        this.props.delShoppingCart(cartID);
    }
    render() {
        const {productDetails,productCart,browserVersion}=this.props;
        const borderRadius="5px";
        const windowWidth=window.innerWidth;
        const windowHeight=window.innerHeight;
        let time=new Date().getTime();
        const styles={
            list:{paddingTop:0,paddingBottom:0,overflowX:"hidden", background:"#E0E0E0"},
            full:{width:"100%",height:"100%"},
            backButton:{position:"fixed",left:"10px",top:"5px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/back.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            itemProducts:{padding:10,fontSize:"14px",height:"20px",width:"100%",textAlign:"center", background:"#ffffff"},
            productCount:{top:"10px",margin:"0 auto"},
            itemCheckBox:{width:"50px",height:"30px",margin:"0"},
            buttonDelete:{float:"right",minWidth:"30px",top:3,right:3,height:"24px",color:"#ffffff",lineHeight:"24px",fontSize:"12px"},
            floatRight:{float:"right"},
            productItem:{margin:0,width:"96%",marginLeft:"2%",marginTop:"2%",marginBottom:"2%",background:"#ffffff"},
            productDivide:{width:"100%",height:"10px", background:"#E0E0E0",margin:0},
            buttonBuyAll:{minWidth:"70px",height:"100%",color:"#ffffff",borderRadius:0,float:"right",zIndex:2},
            buttonCheckAll:{width:"100px",height:"100%",float:"left",color:"#ffffff",zIndex:2},
            bottomToolBar:{position:"fixed",width:"100%",height:"43px",left:0,bottom:0,background:"#ffffff",borderRadius:0,zIndex:2},
            bottomSpace:{width:"100%",height:"50px",background:"#E0E0E0"},
            totalPrice:{float:"right",marginTop:"2px",marginRight:"5px",zIndex:2},
            noExpressFee:{color:"gray",fontSize:"12px",float:"right",marginRight:"5px"}
        };
        let cartTotal=0;
        productCart==undefined?"":productCart.map(cart=>cartTotal+=parseInt(cart.count));
        let priceTotal=0;
        productCart.map((cart,index)=>cart.checked==true?priceTotal+=cart.price*cart.count:"");
        let checkAll=(productCart.filter((cart,index)=>cart.checked!=true).length==0);

        return (
            <List ref="mainList" style={styles.list}>
                <FlatButton label={" "} onTouchTap={this.goBack.bind(this)} style={styles.backButton}></FlatButton>
                <ListItem style={styles.itemProducts} disabled={true}><h3 style={styles.productCount}>购物车&nbsp;&nbsp;{productCart==undefined?"(0)":"("+cartTotal+")"}</h3></ListItem>
                <Link to={"/mobileShopping/ShoppingConformOrder/1"}><input style={{display:"none"}} type="button" ref={"ShoppingConformOrder"}></input></Link>
                {productCart==undefined?"":(productCart.map((cart,index)=>(<Paper style={styles.productItem} key={time+index}>
                    <FlatButton onTouchTap={this.onDeleteClick.bind(this,cart.car_id)} backgroundColor="#FF9800" style={styles.buttonDelete} label={"删除"}/>
                    <Checkbox name="" style={styles.itemCheckBox} onCheck={this.onProductCheck.bind(this,cart.car_id)} defaultChecked={cart.checked==true} label=""/>
                    <ListDivider inset={true}/>
                    <ListItem
                        leftAvatar={<Avatar src={"/"+cart.pic_url.toString()}/>}
                        primaryText={<div onTouchTap={this.goToProductDetails.bind(this,cart.pid)}>{cart.name}</div>}
                        disabled={true}
                        secondaryText={<p onTouchTap={this.goToProductDetails.bind(this,cart.pid)}>
                                        <span style={{color:"#000000"}}><font color="#A9A9A9">{cart.brief}</font></span>
                                        <br/>
                                        <font color="#EE7942">{"￥"+cart.price.toFixed(2)}</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font styles={styles.floatRight} color="#A9A9A9">{"数量:"+cart.count}</font>
                                        </p>}
                        secondaryTextLines={2} >
                        </ListItem><Link to={"/mobileShopping/ShoppingProductDetails/"+cart.pid}><input style={{display:"none"}} type="button" ref={"ShoppingProductDetails"+cart.pid}></input></Link></Paper>)))}
                <div style={styles.bottomSpace} ></div>
                <Paper style={styles.bottomToolBar}><Checkbox
                    name="checkboxName1"
                    value="checkboxValue1"
                    label="全选"
                    defaultChecked={checkAll}
                    onCheck={this.onProductCheckAll.bind(this)}
                    style={styles.buttonCheckAll}/>
                    {browserVersion.ios?<FlatButton onTouchTap={this.handleBuyAll.bind(this)} backgroundColor="#FF9800" style={styles.buttonBuyAll} label={"结算"}/>:<FlatButton onClick={this.handleBuyAll.bind(this)} backgroundColor="#FF9800" style={styles.buttonBuyAll} label={"结算"}/>}
                    <h4 style={styles.totalPrice}>合计:<font color="#EE7942">{"￥"+priceTotal.toFixed(2)}</font><br/><font style={styles.noExpressFee}>不含运费</font></h4></Paper>
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
        productDetails: state.productDetails,
        productCart:state.productCart,
        browserVersion:state.browserVersion
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getShoppingCart,checkCartProducts,checkCartAllProducts,delShoppingCart,getLatestExpressInfo}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingCart);

