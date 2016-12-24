'use strict';
import '../assets/Shopping.css';
import * as types from '../constants/ShoppingActionTypes';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import CircularProgress from 'material-ui/lib/circular-progress';
import Paper from 'material-ui/lib/paper';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import FlatButton from 'material-ui/lib/flat-button';
import Badge from 'material-ui/lib/badge';
import Dialog from 'material-ui/lib/dialog';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ShoppingProductDetails from './ShoppingProductDetails.js';
import {getWelBannersUrl,getWelProducts,getShoppingCart,setBrowserVersion,GetQueryString,setRecommendTypeAndCode} from '../actions/ShoppingActions.js';
import SwipeableViews from 'react-swipeable-views';
class ShoppingWelPage extends Component {
    componentDidMount(){
        this.refs.dialogLoading._show();
        this.props.getWelBannersUrl();
        this.props.getWelProducts();
        if(GetQueryString('tk').length>0){
            this.props.getShoppingCart();
        }
        this.props.setBrowserVersion();
        setRecommendTypeAndCode();
        }
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
    }
    goToProductDetails(pid){
        if(this.refs!=undefined) {
            //this.props.history.replaceState(null,"/mobileShopping/ShoppingProductDetails/"+pid);
            //this.refs["ShoppingProductDetails" + pid].click();
            this.props.history.pushState({can_back:true,can_share:true},"/mobileShopping/ShoppingProductDetails/"+ pid);
        }
    }
    goToProductCart(){
        if(this.refs!=undefined){
            //this.props.history.replaceState(null,"/mobileShopping/ShoppingCart");
            this.refs["ShoppingCart"].click();
        }
    }
    render() {
        const swipeViewStyle={position:"absolute",width:"100%",height:document.body.clientWidth*9/16};
        const {banners,products,productCart,browserVersion}=this.props;
        const borderRadius="0px";
        let time=new Date().getTime();
        const styles={
            mainPage:{height:window.innerHeight,width:"100%",WebkitOverflowScrolling: "touch",overflow:"scroll",overflowX:"hidden"},
            bannerImage:{width:"100%",height:"100%"},
            imagePaper:{width:"95%",height:"95%",marginLeft:"5px",marginTop:"5px"},
            image:{borderTopLeftRadius:borderRadius,borderTopRightRadius:borderRadius,width:"100%",height:"65%"},
            fontP:{marginTop:"5px",fontSize:"12px",marginLeft:"10px"},
            cartButton:{position:"fixed",right:"10px",top:"10px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/cart.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            cartButtonBadge:{position:"fixed",right:"2px",top:"2px",height:"10px",width:"10px",zIndex:1},
            gridTop:{marginTop:"5px"}
        };
        let cartTotal=0;
        productCart==undefined?"":productCart.map(cart=>cartTotal+=parseInt(cart.count));
        return (
            <div style={styles.mainPage}>
                <FlatButton label={" "} onClick={this.goToProductCart.bind(this)} style={styles.cartButton}/>
                <Link to={"/mobileShopping/ShoppingCart"}><input style={{display:"none"}} type="button" ref={"ShoppingCart"}></input></Link>
                <Badge badgeStyle={{width:15,height:15}} badgeContent={cartTotal} primary={true} style={styles.cartButtonBadge}/>
                <Paper style={{swipeViewStyle}} zDepth={1}>
                    <SwipeableViews>
                        {(banners==undefined?<div style={swipeViewStyle} key={time} ><CircularProgress mode="indeterminate"/></div>:banners.map((banner,index)=>(<div style={swipeViewStyle} key={time+index} ><img src={"/"+banner} style={styles.bannerImage}/></div>)))}
                    </SwipeableViews>
                </Paper>


                {(products==undefined||products.length==0)?(<CircularProgress mode="indeterminate"/>):(<div
                    style={styles.gridTop}
                    cellHeight={document.body.clientWidth*9/16}
                    cols={2}
                    padding={5}>
                    {(products.map((product,index) =><div style={{float:"left",width:"50%",height:document.body.clientWidth*9/16}} onClick={this.goToProductDetails.bind(this,product.id)} key={time+index}
                                                               titleBackground={ 'rgba(0, 0, 0, 0.0)'}
                        ><Link to={"/mobileShopping/ShoppingProductDetails/"+product.id}><input style={{display:"none"}} type="button" ref={"ShoppingProductDetails"+product.id}></input></Link><Paper style={styles.imagePaper} zDepth={1}>
                        <img style={styles.image} src={types.URL_BASE+product.pic} /><p style={styles.fontP}><font color="#A9A9A9">型号:</font>{product.title}</p><p style={styles.fontP}><font color="#A9A9A9">价格:</font>{product.price+"元"}</p>
                    </Paper>
                    </div>))}
                </div>)}
                <Dialog
                    ref={"dialogLoading"}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    contentStyle={{textAlign:"center"}}>
                    <CircularProgress mode="indeterminate" color={"red"} size={1} /><h3>UYU为您加载中...</h3></Dialog>
            </div>
            );
    }
}
function mapStateToProps(state) {
    return {
        banners: state.banners,
        products: state.products,
        productCart:state.productCart,
        browserVersion:state.browserVersion
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getWelBannersUrl,getWelProducts,getShoppingCart,setBrowserVersion}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingWelPage);

