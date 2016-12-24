'use strict';
import '../assets/Shopping.css';
import * as types from '../constants/ShoppingActionTypes';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import CircularProgress from 'material-ui/lib/circular-progress';
import Paper from 'material-ui/lib/paper';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
import Dialog from 'material-ui/lib/dialog';
import Badge from 'material-ui/lib/badge';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {getProductDetail,toggleChooseView,addChooseProductQuantity,minusChooseProductQuantity,selectProductColor,selectProductType,getUserInfoByUID,getUserInfoByUIDList,getShoppingCart,addShoppingCart,addShoppingCartAndBuyNow,getLatestExpressInfo,changeChooseDegreeType,GetQueryString} from '../actions/ShoppingActions.js';
import SwipeableViews from 'react-swipeable-views';
import ShoppingChooseDegrees from '../components/ShoppingChooseDegrees.js';
class ShoppingProductDetails extends Component {
    constructor(props, content) {
        super(props, content); // this.state = { someProp: 'Default' };

        this.windowWidth=window.innerWidth;
        this.windowHeight=window.innerHeight;
    }
    componentDidMount(){
        this.refs.dialogLoading._show();
        this.props.getProductDetail(this.props.params.pid);
        var openChoose = false;

        this.windowWidth=window.innerWidth;
        this.windowHeight=window.innerHeight;
        };
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
    }
    goBack(){
        //this.props.history.replaceState(null,"/mobileShopping/ShoppingWelPage");
        var refs=this.refs;
        setTimeout(function(){refs.ShoppingWelPage.click();},400);
    };
    goToDetailPics(){
        this.refs.ShoppingProductDetailPics.click();
    }
    goToComments(){
        //this.props.history.replaceState(null,"/mobileShopping/ShoppingProductComments/"+this.props.params.pid);
        this.refs.ShoppingProductComments.click();
    };
    showTypesAndColors(){
        this.props.toggleChooseView(this.props.productDetails.openChoose);
    };
    onDialogCancel() {
        this.refs.dialog._dismiss();
    };
    handleShowDialog(){
        this.refs.dialog._show();
    };
    goToProductCart(){
        //this.props.history.replaceState(null,"/mobileShopping/ShoppingCart");
        this.refs["ShoppingCart"].click();
    };
    onAddTocart(pid,cid,tid,count){
        if(this.props.productDetails.chooseColor==undefined){
            alert('请选择颜色分类!');
        }else if(this.props.productDetails.chooseType==undefined){
            alert('请选择型号分类!');
        }else if(parseInt(this.props.productDetails.p_type)==1&&this.props.chooseDegree.checked!=true){
            alert(this.props.chooseDegree.checked);
        }else if(this.props.productDetails.chooseQuantity==undefined||this.props.productDetails.chooseQuantity==0){
            alert('请选择大于一件的物品!');
        }else{
            this.props.addShoppingCart(pid,cid,tid,count,(parseInt(this.props.productDetails.p_type)==1?this.props.chooseDegree.result:""));
            var props=this.props;
            var delay=props.browserVersion.ios?400:0;
            setTimeout(function(){props.toggleChooseView(props.productDetails.openChoose);},delay);
        }
    }
    onBuyNow(){
        if(this.props.productDetails.chooseColor==undefined){
            alert('请选择颜色分类!');
        }else if(this.props.productDetails.chooseType==undefined){
            alert('请选择型号分类!');
        }else if(parseInt(this.props.productDetails.p_type)==1&&this.props.chooseDegree.checked!=true){
            alert(this.props.chooseDegree.checked);
        }else if(this.props.productDetails.chooseQuantity==undefined||this.props.productDetails.chooseQuantity==0){
            alert('请选择大于一件的物品!');
        }else{
            let productDetails=this.props.productDetails;
            let price=0;
            let brief="";
            productDetails.colors.map(color=>{
                productDetails.types.map(type=>{
                    if(productDetails.chooseColor==color.p_cid&&productDetails.chooseType==type.p_tid){
                        price=parseFloat(productDetails.price)+parseFloat(color.p_add_price)+parseFloat(type.p_add_price);
                        brief="颜色:"+color.p_color+" 型号:"+type.p_type;
                    }
                })
            });
            this.props.addShoppingCartAndBuyNow({pid:this.props.params.pid
                ,p_kind:productDetails.p_kind
                ,cid:productDetails.chooseColor
                ,tid:productDetails.chooseType
                ,count:productDetails.chooseQuantity
                ,name:productDetails.name
                ,pic_url:productDetails.chooseColorPic
                ,price:price
                ,totalPrice:price*productDetails.chooseQuantity
                ,brief:brief
                ,attach:(parseInt(this.props.productDetails.p_type)==1?this.props.chooseDegree.result:"")});
            //this.showTypesAndColors();
            //this.props.history.replaceState(null,"/mobileShopping/ShoppingConformOrder/2");
            var ref=this.refs['ShoppingConformOrder'];
            var props=this.props;
            var delay=props.browserVersion.ios?400:0;
            setTimeout(function(){ref.click();props.toggleChooseView(props.productDetails.openChoose);},delay);
        }
    }
    onClickShare(){
        if(this.props.params.share==undefined){
            alert(JSON.stringify({alert:1,share_title:"UYU.COM-眼运动,眼健康。",share_brief:"欢迎购买:"+this.props.productDetails.name,share_image:types.URL_BASE+this.props.productDetails.banners[0].p_pic_url,share_link:window.location.href}));
        }
    }
    render() {
        const swipeViewStyle={width:"100%",height:document.body.clientWidth*2/3};
        const {productDetails,userInfoList,productCart,browserVersion,chooseDegree}=this.props;
        const windowWidth=this.windowWidth;
        const windowHeight=this.windowHeight;
        const paperHeight=350+(windowHeight-480)/2;
        const fetchData=(GetQueryString('tk').length>0);
        if(fetchData) {
            productDetails.banners == undefined || productDetails.comment == undefined || productDetails.comment == null ? "" : (userInfoList.length == 0 ? this.props.getUserInfoByUIDList(productDetails.comment.p_com_uid) : "");
        }
        let time=new Date().getTime();
        let cartTotal=0;
        productCart==undefined?"":productCart.map(cart=>cartTotal+=parseInt(cart.count));
        const styles={
            listScroll:{paddingTop:0,paddingBottom:0,zIndex:1},
            listScrollHidden:{paddingTop:0,paddingBottom:0,zIndex:1,overflow:"hidden",height:windowHeight},
            itemBanners:{paddingTop:0, padding:0, width:"100%"},
            itemNamePrice:{paddingTop:0,paddingBottom:0,padding:5},
            bannerImage:{width:"100%",height:"100%",borderRadius:"5px"},
            priceSize:{fontSize:"15px"},
            minSize:{fontSize:"12px"},
            floatRight:{float:"right"},
            itemServices:{paddingTop:0,paddingBottom:0,padding:5,fontSize:"12px",background:"#EDEDED",height:"16px"},
            itemDivide:{padding:0,background:"#E0E0E0",height:"10px"},
            itemChoose:{padding:10,fontSize:"14px",height:"18px"},
            itemComments:{padding:10,fontSize:"14px",height:"16px"},
            marginAuto:{margin:"0 auto"},
            marginLeft:{marginLeft:"20%"},
            chooseButton:{position:"absolute",height:"100%",width:"90%",textAlign:"left",top:0},
            marginToAbove:{marginTop:"5px"},
            marginColorImgToAbove:{marginTop:windowHeight-paperHeight-50,position:"absolute",width:"100%",height:"85px",background:"#ffffff",zIndex:1000},
            arrowHeight:{ height:"18px"},
            backButton:{position:"fixed",left:"10px",top:"10px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/back.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            cartButton:{position:"fixed",right:"10px",top:"10px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/cart.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            cartButtonBadge:{position:"fixed",right:"2px",top:"2px",height:"10px",width:"10px",zIndex:1},
            closeButton:{position:"absolute",right:"5px",top:"5px",zIndex:101,minWidth:"23px",height:"23px",backgroundImage:"url(/images/shopping/product/details/close.png)",color:"#ffffff",borderRadius:12,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            checkLeftImage:{float:"left",left:"10px",height:"15px",width:"15px"},
            checkRightImage:{float:"right",left:"10px",height:"15px",width:"15px"},
            commentScore:{height:"15px"},
            commentMoreImage:{height:"15px",marginTop:"30px"},
            chooseViewBGShow:{WebkitOverflowScrolling: "touch",position:"fixed",WebkitTransition:'opacity 500ms ease 0ms', opacity:1,background:"rgba(0,0,0,0.3)",width:"100%",height:windowHeight,zIndex:101},
            chooseViewBGDismiss:{WebkitOverflowScrolling: "touch",position:"fixed",WebkitTransition:'opacity 500ms ease 0ms',opacity:0,background:"rgba(0,0,0,0.3)",width:"100%",height:windowHeight,zIndex:0},
            chooseViewShow:{paddingTop:"85px",WebkitOverflowScrolling: "touch",overflowY:"auto",position:"absolute",WebkitTransform: 'translate3d(0px, 0px, 0px)',WebkitTransition:'-webkit-transform 500ms ease 0ms',background:"#ffffff",width:"100%",height:paperHeight,bottom:"50px"},
            chooseViewDismiss:{paddingTop:"85px",WebkitOverflowScrolling: "touch",overflowY:"auto",position:"absolute",WebkitTransform: 'translate3d(0px, 300px, 0px)',WebkitTransition:'-webkit-transform 500ms ease 0ms',background:"#ffffff",width:"100%",height:paperHeight,bottom:"50px"},
            chooseViewImage:{position:"absolute",background:"#ffffff",width:"70px",height:"70px",left:"20px",top:"10px",borderRadius:"5px"},
            chooseViewTitle:{marginLeft:"100px"},
            chooseViewButton:{minWidth:"20%",marginLeft:"4%",height:"25px",fontSize:"12px",marginTop:"15px"},
            chooseViewCartButton:{position:"fixed",minWidth:"50%",height:"50px",left:0,bottom:0,backgroundColor:"#FF9800",color:"#ffffff",borderRadius:0,zIndex:101},
            chooseViewBuyButton:{position:"fixed",minWidth:"50%",height:"50px",right:0,bottom:0,backgroundColor:"#FFA726",color:"#ffffff",borderRadius:0,zIndex:101},
            chooseViewAdd:{minWidth:"20px",height:"20px",float:"right",right:"10px",lineHeight:"20px",color:"#ffffff",zIndex:101},
            chooseViewQuantity:{width:"30px",height:"20px",textAlign:"center",float:"right",right:"10px",zIndex:101},
            chooseViewMinus:{minWidth:"20px",height:"20px",float:"right",right:"10px",lineHeight:"20px",color:"#ffffff",zIndex:101},
            linkToDetailButton:{minWidth:"50%",height:"35px",left:0,bottom:0,backgroundColor:"#009688",color:"#ffffff",borderRadius:0},
            linkToPropsButton:{minWidth:"50%",height:"35px",right:0,bottom:0,backgroundColor:"#4DB6AC",color:"#ffffff",borderRadius:0},
            imageDetailPicDiv:{width:"100%"},
            imageDetailPic:{width:"100%",display:"inherit"},
            chooseDegreeItems:{padding:"10px"}
        };
        const standardActions = [{ text: '关闭' , onTouchTap: this.onDialogCancel.bind(this)}];
        //计算运费
        var express_fee=0;
        express_fee=(productDetails.chooseType!=undefined&&productDetails.chooseColor!=undefined)?(productDetails.types.map((type,index)=>productDetails.chooseType==type.p_tid?(parseInt(type.express_fee)==0?"免运费":type.express_fee+"元"):"")):"未选择";

        return (
            <List style={(productDetails.openChoose!=undefined&&productDetails.openChoose)?styles.listScrollHidden:styles.listScroll}>
                <Link to={"/mobileShopping/ShoppingWelPage"}><input style={{display:"none"}} type="button" ref="ShoppingWelPage"></input></Link>
                <Link to={"/mobileShopping/ShoppingProductComments/"+this.props.params.pid}><input style={{display:"none"}} type="button" ref="ShoppingProductComments"></input></Link>
                <Link to={"/mobileShopping/ShoppingCart"}><input style={{display:"none"}} type="button" ref={"ShoppingCart"}></input></Link>
                <Link to={"/mobileShopping/ShoppingConformOrder/2"}><input style={{display:"none"}} type="button" ref={"ShoppingConformOrder"}></input></Link>
                <FlatButton label={" "} onTouchTap={this.goBack.bind(this)} style={styles.backButton}/>
                <FlatButton label={" "} onTouchTap={this.goToProductCart.bind(this)} style={styles.cartButton} />
                <Badge badgeStyle={{width:15,height:15}} badgeContent={cartTotal} primary={true} style={styles.cartButtonBadge}/>
                <div style={(productDetails.openChoose!=undefined&&productDetails.openChoose)?styles.chooseViewBGShow:styles.chooseViewBGDismiss}>
                    <div  style={styles.marginColorImgToAbove}>
                        <FlatButton label={" "} onTouchTap={this.showTypesAndColors.bind(this)} style={styles.closeButton} ></FlatButton>
                        {(productDetails.banners==undefined?"":<Paper style={styles.chooseViewImage}>
                            <img style={styles.bannerImage} src={productDetails.chooseColorPic==undefined?("/"+productDetails.banners[0].p_pic_url):("/"+productDetails.chooseColorPic)}/>
                        </Paper>)}
                        {(productDetails.banners==undefined?"":<div style={styles.chooseViewTitle}>
                            <p><font color="#4F94CD">{productDetails.name}</font></p>
                            <p style={styles.minSize}>
                                <font color="#EE7942">{productDetails.choosePriceRange==undefined?productDetails.priceRange:productDetails.choosePriceRange}&nbsp;&nbsp;&nbsp;</font>
                                <font color="#A9A9A9">{"(库存"+productDetails.stocks+"件)"}</font></p>
                        </div>)}
                        <ListDivider/>
                    </div>
                    <Paper style={(productDetails.openChoose!=undefined&&productDetails.openChoose)?styles.chooseViewShow:styles.chooseViewDismiss}>

                        {(productDetails.banners==undefined?"":<List>
                            <ListItem style={styles.itemNamePrice} disabled={true}>
                                <p style={styles.minSize}><font>颜色</font></p>
                                {(productDetails.colors.map((color,index)=>(<RaisedButton onTouchTap={this.props.selectProductColor.bind(this,color.p_cid,productDetails)} primary={productDetails.chooseColor==color.p_cid?true:false} secondary={productDetails.chooseColor==color.p_cid?false:true} style={styles.chooseViewButton} key={time+index} label={color.p_color}/>)))}
                            </ListItem>
                            <ListDivider/>
                            <ListItem style={styles.itemNamePrice} disabled={true}>
                                <p style={styles.minSize}><font>型号</font></p>
                                {(productDetails.types.map((type,index)=>(<RaisedButton onTouchTap={this.props.selectProductType.bind(this,type.p_tid,productDetails)} primary={productDetails.chooseType==type.p_tid?true:false} secondary={productDetails.chooseType==type.p_tid?false:true} style={styles.chooseViewButton} key={time+index} label={type.p_type}/>)))}
                            </ListItem>
                            {parseInt(productDetails.p_type)==1? <div><ListDivider/>
                            <ListItem style={styles.itemNamePrice} disabled={true}>
                                <p style={styles.minSize}><font>其他</font><br/><font style={{display:"none"}}>{chooseDegree.result}</font></p>
                                <div style={styles.chooseDegreeItems}><ShoppingChooseDegrees action={this.props.changeChooseDegreeType.bind(this)} params={ this.props.params }/></div>
                                </ListItem></div>:null}
                            <ListDivider/>
                            <ListItem style={styles.itemNamePrice} disabled={true}>
                                <p style={styles.minSize}><font>数量</font></p>
                                <FlatButton backgroundColor="#bfbfbf" onTouchTap={this.props.addChooseProductQuantity.bind(this,productDetails.chooseQuantity)} primary={true} style={styles.chooseViewAdd} label={"+"}/>
                                <font style={styles.chooseViewQuantity}>{productDetails.chooseQuantity==undefined?0:productDetails.chooseQuantity}</font>
                                <FlatButton backgroundColor="#bfbfbf" onTouchTap={this.props.minusChooseProductQuantity.bind(this,productDetails.chooseQuantity)} primary={true} style={styles.chooseViewMinus} label={"-"}/>
                            </ListItem>
                            <p></p>
                        </List>)}
                    </Paper>
                    {browserVersion.ios?<FlatButton onTouchTap={this.onAddTocart.bind(this,this.props.params.pid,productDetails.chooseColor,productDetails.chooseType,productDetails.chooseQuantity)} style={styles.chooseViewCartButton} label={"添加到购物车"}/>:<FlatButton onClick={this.onAddTocart.bind(this,this.props.params.pid,productDetails.chooseColor,productDetails.chooseType,productDetails.chooseQuantity)} style={styles.chooseViewCartButton} label={"添加到购物车"}/>}
                    {browserVersion.ios?<FlatButton onTouchTap={this.onBuyNow.bind(this)} style={styles.chooseViewBuyButton} label={"去购买"}/>:<FlatButton onClick={this.onBuyNow.bind(this)} style={styles.chooseViewBuyButton} label={"去购买"}/>}

                </div>
                <ListItem style={styles.itemBanners} disabled={true}>
                    <SwipeableViews>
                        {(productDetails.banners==undefined?(<div style={swipeViewStyle} key={time} ><CircularProgress mode="indeterminate"/></div>):(productDetails.banners.map((banner,index)=>(
                            <div style={swipeViewStyle} key={time+index} >
                                <img src={"/"+banner.p_pic_url} style={styles.bannerImage}/>
                            </div>))))}
                    </SwipeableViews>
                </ListItem>
                <ListItem style={styles.itemNamePrice} disabled={true}>
                    <p><font color="#4F94CD">{productDetails.name}</font>{this.props.location.state!=null?<img style={{float:"right",width:"30px",height:"30px"}} onClick={this.onClickShare.bind(this)} src="/images/shopping/share.png"></img>:""}</p>
                    <p style={styles.priceSize}><font color="#EE7942">{productDetails.priceRange}</font></p>
                    <p style={styles.minSize}><font color="#A9A9A9">快递:{express_fee}</font><font style={styles.floatRight} color="#A9A9A9">北京</font></p>
                </ListItem>
                <ListItem style={styles.itemServices} disabled={true}><p style={styles.marginAuto}><img style={styles.checkLeftImage} src="/images/shopping/product/details/right.png"></img><font color="#A9A9A9">承诺72小时内发货</font><font style={styles.floatRight} color="#A9A9A9">如实描述</font><img style={styles.checkRightImage} src="/images/shopping/product/details/right.png"></img></p></ListItem>
                <ListItem style={styles.itemDivide} disabled={true}/>
                <ListItem style={styles.itemChoose} rightIcon={<img style={styles.arrowHeight} onClick={this.showTypesAndColors.bind(this)} src="/images/shopping/product/details/arrow.png"></img>} disabled={true}>
                    <FlatButton onClick={this.showTypesAndColors.bind(this)} style={styles.chooseButton} label={productDetails.chooseRemind==undefined?"选择 颜色 型号分类":productDetails.chooseRemind}></FlatButton>
                </ListItem>

                <ListItem style={styles.itemDivide} disabled={true}/>
                <ListItem style={styles.itemComments} disabled={true}><p style={styles.marginAuto}>评价&nbsp;&nbsp;{productDetails.comment==undefined?"(0)":"("+productDetails.comment.count+")"}</p></ListItem>
                <ListDivider/>
                {productDetails.comment==undefined||productDetails.comment==null||!fetchData?"":<ListItem
                    onClick={this.goToComments.bind(this)}
                    leftAvatar={<Avatar src={userInfoList.map(userInfo=>userInfo.id==productDetails.comment.p_com_uid?userInfo.portrait_url:"").filter(pic=>pic.length>0).toString()} />}
                    primaryText={productDetails.comment==undefined?"暂无得分":productDetails.comment.p_com}
                    rightIcon={<img style={styles.commentMoreImage} src="/images/shopping/product/details/arrow.png"></img>}
                    secondaryText={<p>
                    <span style={{color:"#000000"}}>{productDetails.comment==undefined?"暂无评价":(<img style={styles.commentScore} src={"/images/shopping/product/comments/score"+productDetails.comment.p_score+".png"}></img>)}</span>
                    <br/>
                    {(userInfoList.length!=0&&userInfoList.filter(userInfo=>userInfo.id==productDetails.comment.p_com_uid).length>0)?userInfoList.filter(userInfo=>userInfo.id==productDetails.comment.p_com_uid)[0].nick_name:"加载中..."}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{productDetails.comment==undefined?"暂无评价":productDetails.comment.created_at.substring(0,10)}
                    </p>}
                    secondaryTextLines={2} />}

                <FlatButton style={styles.linkToDetailButton} onTouchTap={this.goToDetailPics.bind(this)} label={"查看详情"}/>
                <Link to={"/mobileShopping/ShoppingProductDetailPics/"+this.props.params.pid}><input style={{display:"none"}} type="button" ref={"ShoppingProductDetailPics"}></input></Link>
                <FlatButton onTouchTap={this.handleShowDialog.bind(this)} style={styles.linkToPropsButton} label={"查看参数"}/>
                <div ref="imageDiv" style={styles.imageDetailPicDiv}>
                    {productDetails.detailPics==undefined?"":productDetails.detailPics.map((pic,index)=><img key={time+index} style={styles.imageDetailPic} src={"/"+pic.p_pic_url}/>)}
                </div>
                <Dialog ref="dialog" actions={standardActions} autoDetectWindowHeight={true} autoScrollBodyContent={true} actionFocus="submit">
                    <h3>产品参数</h3>
                    <ListDivider/>
                    {productDetails.types==undefined?"":productDetails.types.map((type,index)=>(
                        <ListItem key={time+index} initiallyOpen={false} nestedItems={[
                        productDetails.props.map((prop,i)=>(
                            type.p_tid==prop.p_tid?<p style={styles.marginLeft} key={time*index+i}><font color="#A9A9A9">{prop.p_prop+":"}&nbsp;&nbsp;&nbsp;&nbsp;</font>{prop.p_prop_val}</p>:"")
                        )]}>{type.p_type+"参数"}</ListItem>
                    ))}
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
        productDetails: state.productDetails,
        userInfoList:state.userInfoList,
        productCart:state.productCart,
        browserVersion:state.browserVersion,
        chooseDegree:state.chooseDegree
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getProductDetail,toggleChooseView,addChooseProductQuantity,minusChooseProductQuantity,selectProductColor,selectProductType,getUserInfoByUID,getUserInfoByUIDList,getShoppingCart,addShoppingCart,addShoppingCartAndBuyNow,getLatestExpressInfo,changeChooseDegreeType}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingProductDetails);

