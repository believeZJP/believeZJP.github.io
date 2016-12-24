
import  React,{Component, PropTypes } from 'react';
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
import TextField from 'material-ui/lib/text-field';
import CircularProgress from 'material-ui/lib/circular-progress.js'
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getShoppingCart,checkCartProducts,checkCartAllProducts,delShoppingCart,getAddressList,setAddressDetailInfo,submitAndPayOrder,submitAndPayOrderNow,togglePay,toggleAddressChooseView,getLatestExpressInfo} from '../actions/ShoppingActions.js';
class ShoppingConformOrder extends Component {
    constructor(props, content) {
        super(props, content); // this.state = { someProp: 'Default' };
        this.detailInfo={};
        //先获取用户上次物流信息
        this.props.getLatestExpressInfo();
    }
    componentDidMount(){
        this.refs.dialogLoading._show();
        if(this.props.addressList['type0']==undefined||this.props.addressList['type0'].length==0){
            this.props.getAddressList(0,0,0,false);
        }
        this.props.toggleAddressChooseView(true);
    };
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
        if(this.props.addressList!=undefined&&this.props.addressList.order_num!=undefined){
            var refs=this.refs;
            setTimeout(function(){refs.ShoppingWelPage.click();},1000);
            //this.refs.ShoppingWelPage.click();
        }
        if(this.props.productTempBuy.order_num!=undefined){

            var refs=this.refs;
            setTimeout(function(){refs.ShoppingWelPage.click();},1000);
            //this.refs.ShoppingWelPage.click();
        }
    };
    goBack(){
        this.refs.ShoppingWelPage.click();
    }
    onConfirmOrder(){
        let phonePattern = /^1\d{10}$/;
        var detailsAddress=this.refs['detailsAddress'].refs.input.value;
        var detailsPerson=this.refs['detailsPerson'].refs.input.value;
        var detailsPhone=this.refs['detailsPhone'].refs.input.value;
        if(this.props.addressList['type0']==undefined||this.props.addressList['type1']==undefined||this.props.addressList['type2']==undefined||
            parseInt(this.props.addressList['type0'])<=0||parseInt(this.props.addressList['type1'])<=0||parseInt(this.props.addressList['type2'])<=0){
            alert("请选择地址");
        }else if(detailsAddress==undefined||detailsAddress==""){
            alert("请填写详细地址");
        }else if(detailsPerson==undefined||detailsPerson==""){
            alert("请填写详收件人姓名");
        }else if(detailsPhone==undefined||detailsPhone==""||!phonePattern.test(detailsPhone)){
            alert("请填写正确的手机号码");
        }else {
            var refs=this.refs;
            //延时 提示加载中 防止背景与物流填写背景重叠
            setTimeout(function(){
                refs['dialogPay']._show();
            },600);
            this.props.toggleAddressChooseView(this.props.addressList.openChoose);
            if(this.props.params.type==1){
                let cartIDs="";
                this.props.productCart.map(cart=>{
                    if(cart.checked){
                        cartIDs+=(cart.car_id+",");
                    }
                });
                cartIDs=cartIDs.substring(0,cartIDs.length-1);
                let addressList=this.props.addressList;
                //确认去支付订单
                this.props.submitAndPayOrder(detailsPerson,detailsPhone,detailsAddress
                    ,addressList['type0'][addressList['type0'].selectedIndex].payload
                    ,addressList['type1'][addressList['type1'].selectedIndex].payload
                    ,addressList['type2'][addressList['type2'].selectedIndex].payload
                    ,addressList['type3'][addressList['type3'].selectedIndex]==undefined?0:addressList['type3'][addressList['type3'].selectedIndex].payload
                    ,cartIDs,addressList.pay,this.props.redPocket.confirm.map(item=>item.detail_key),this.props.bonusPocket.confirm.map(item=>item.detail_key));
            }else if(this.props.params.type==2){
                let addressList=this.props.addressList;
                let productTempBuy=this.props.productTempBuy;
                //确认去支付订单
                this.props.submitAndPayOrderNow(detailsPerson,detailsPhone,detailsAddress
                    ,addressList['type0'][addressList['type0'].selectedIndex].payload
                    ,addressList['type1'][addressList['type1'].selectedIndex].payload
                    ,addressList['type2'][addressList['type2'].selectedIndex].payload
                    ,addressList['type3'][addressList['type3'].selectedIndex]==undefined?0:addressList['type3'][addressList['type3'].selectedIndex].payload
                    ,addressList.pay,productTempBuy.pid,productTempBuy.cid,productTempBuy.tid,productTempBuy.count,productTempBuy.attach
                    ,this.props.redPocket.confirm.map(item=>item.detail_key),this.props.bonusPocket.confirm.map(item=>item.detail_key));
            }
        }
    }
    onDialogCancel() {
        this.props.toggleAddressChooseView(this.props.addressList.openChoose);
    }
    handleShowDialog(){
        if(this.props.addressList.pay==undefined){
            alert("请选择支付方式");
        }else{
            var props=this.props;
            props.browserVersion.ios?setTimeout(function(){props.toggleAddressChooseView(props.addressList.openChoose);},200):this.props.toggleAddressChooseView(this.props.addressList.openChoose);
        }
    }
    onAddressListChange(type,event,selectedIndex,item){
        var props=this.props;
        var refs=this.refs;
        refs.expressDetails.style.overflowY="";
        refs['detailsAddress'].refs.input.hidden=true;
        refs['detailsPerson'].refs.input.hidden=true;
        refs['detailsPhone'].refs.input.hidden=true;
        setTimeout(function(){
            refs['detailsAddress'].refs.input.hidden=false;
            refs['detailsPerson'].refs.input.hidden=false;
            refs['detailsPhone'].refs.input.hidden=false;
        },500);
        type<4?this.props.getAddressList(item.payload,type,selectedIndex,true):"";
        event.target.blur();
    }
    handleDetailChange(key,e){
        this.props.setAddressDetailInfo(e.target.value,key);
    }
    togglePay(e,toggled){
        this.props.togglePay(e.target.value,toggled);
    }
    focusSelectField(){
        var refs=this.refs;
        setTimeout(function(){
            refs.expressDetails.style.overflowY="auto";
        },100);
    }
    blurSelectField(){
        var refs=this.refs;
        refs.expressDetails.style.overflowY="";
    }
    onChooseRedPocket(){
        this.refs.ShoppingRedPocketList.click();
    }
    onChooseBonusPocket(){
        this.refs.ShoppingBonusPocketList.click();
    }
    render() {
        const {productDetails,productCart,addressList,productTempBuy,browserVersion,latestExpressInfo,redPocket,bonusPocket}=this.props;
        const windowWidth=window.innerWidth;
        const windowHeight=window.innerHeight;
        const borderRadius="5px";
        let time=new Date().getTime();
        addressList.order_num=undefined;
        const styles={
            list:{paddingTop:0,paddingBottom:0,overflowX:"hidden"},
            full:{width:"100%",height:"100%"},
            backButton:{position:"fixed",left:"10px",top:"5px",height:"35px",width:"35px",zIndex:2,minWidth:"35px",backgroundImage:"url(/images/shopping/product/details/back.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            itemProducts:{padding:10,fontSize:"14px",height:"20px",width:"100%",textAlign:"center"},
            productCount:{top:"10px",margin:"0 auto"},
            itemCheckBox:{width:"50px",height:"30px",margin:"0"},
            buttonDelete:{float:"right",minWidth:"30px",top:3,right:3,height:"24px",color:"#ffffff",lineHeight:"24px",fontSize:"12px"},
            floatRight:{float:"right"},
            productItem:{margin:0},
            productDivide:{width:"100%",height:"10px", background:"#E0E0E0",margin:0},
            buttonBuyAll:{minWidth:"70px",height:"100%",color:"#ffffff",borderRadius:0,float:"right",zIndex:2},
            buttonCheckAll:{width:"100px",height:"100%",float:"left",color:"#ffffff",zIndex:2},
            bottomToolBar:{position:"fixed",width:"100%",height:"43px",left:0,bottom:0,background:"#ffffff",borderRadius:0,zIndex:2},
            bottomSpace:{width:"100%",height:"50px",background:"#E0E0E0"},
            totalPrice:{float:"right",marginTop:"5px",marginRight:"5px",zIndex:2},
            selectField:{width:"47%",marginLeft:"2%"},
            selectAddressDetailField:{width:"96%",marginLeft:"2%"},
            iosScrolling:{WebkitOverflowScrolling: "touch",width:"100%"},
            chooseViewBGShow:{pointerEvents:"auto",position:"fixed",bottom:0,WebkitTransition:'opacity 500ms ease 0ms', opacity:1,background:"rgba(0,0,0,0.3)",width:"100%",height:windowHeight,zIndex:3},
            chooseViewBGDismiss:{pointerEvents:"none",position:"fixed",bottom:0,WebkitTransition:'opacity 500ms ease 0ms',opacity:0,background:"rgba(0,0,0,0.3)",width:"100%",height:windowHeight,zIndex:0},
            chooseViewShow:{pointerEvents:"auto",WebkitOverflowScrolling: "touch",position:"fixed",WebkitTransform: 'translate3d(0px, 0px, 0px)',WebkitTransition:'-webkit-transform 500ms ease 0ms',background:"#ffffff",width:"100%",height:"450px",bottom:0,zIndex:3},
            chooseViewDismiss:{pointerEvents:"none",WebkitOverflowScrolling: "touch",position:"fixed",WebkitTransform: 'translate3d(0px, 300px, 0px)',WebkitTransition:'-webkit-transform 500ms ease 0ms',background:"#ffffff",width:"100%",height:"450px",bottom:0,zIndex:0},
            closeButton:{position:"fixed",right:"110px",bottom:"5px"},
            goToPayButton:{position:"fixed",right:"5px",bottom:"5px"},
            expressTitle:{width:"100%",textAlign:"center"},
            toggle:{float:"right",width:"50px"},
            noExpressFee:{color:"gray",fontSize:"12px",float:"right",marginRight:"5px"}
        };
        let cartTotal=0;
        let priceTotal=0;
        var express_fee=1000;
        if(this.props.params.type==1){
            //购物车购买运费计算
            productCart.map((cart,index)=>cart.express_fee<express_fee?express_fee=parseInt(cart.express_fee):"");
            //计算总价
            productCart==undefined?"":productCart.map(cart=>cart.checked?cartTotal+=parseInt(cart.count):"");
            productCart.map((cart,index)=>cart.checked==true?priceTotal+=parseFloat(cart.price)*parseInt(cart.count):"");
            priceTotal=(priceTotal+express_fee).toFixed(2);
        }else if(this.props.params.type==2){
            //立即购买运费计算
            express_fee=productDetails.types.filter(type=>type.p_tid==productTempBuy.tid)[0].express_fee;
            cartTotal=1;
            priceTotal=(productTempBuy.totalPrice+parseInt(express_fee)).toFixed(2);
        }
        const standardActions = [
            <RaisedButton
                key={1}
                label="取消"
                secondary={true}
                onClick={this.onDialogCancel.bind(this)} />,
            <RaisedButton
                key={2}
                label="去支付"
                primary={true}
                onClick={this.onConfirmOrder.bind(this)} />
        ];
        const addressTypeList=["省","市","区/县","镇"];
        //计算优惠总价及红包总价
        var redPocketTotal=0;
        redPocket.confirm.map(item=>redPocketTotal+=parseFloat(item.detail_fee));
        var bonusPocketTotal=0;
        bonusPocket.confirm.map(item=>bonusPocketTotal+=parseFloat(item.detail_fee));
        var payTotal=(parseFloat(priceTotal)-parseFloat(redPocketTotal)-parseFloat(bonusPocketTotal));
        return (
            <List style={styles.list}>
                <Link to={"/mobileShopping/ShoppingWelPage"}><input style={{display:"none"}} type="button" ref={"ShoppingWelPage"}></input></Link>
                <Link to={"/mobileShopping/ShoppingRedPocketList/"+this.props.params.type}><input style={{display:"none"}} type="button" ref={"ShoppingRedPocketList"}></input></Link>
                <Link to={"/mobileShopping/ShoppingBonusPocketList/"+this.props.params.type}><input style={{display:"none"}} type="button" ref={"ShoppingBonusPocketList"}></input></Link>
                <FlatButton label={" "} onTouchTap={this.goBack.bind(this)} style={styles.backButton}></FlatButton>
                <ListItem style={styles.itemProducts} disabled={true}><h3 style={styles.productCount}>确认订单&nbsp;&nbsp;{productCart==undefined?"(0)":"("+cartTotal+")"}</h3></ListItem>
                <p style={styles.productDivide}></p>
                <ListItem disabled={true} leftAvatar={<Avatar src={"/images/shopping/alipay.jpg"}/>}><font>使用支付宝支付</font><Toggle style={styles.toggle} labelPosition="right" onToggle={this.togglePay.bind(this)} value="1" label=" " toggled={addressList['pay']=="1"}/></ListItem>
                <ListDivider/>
                <ListItem disabled={true} leftAvatar={<Avatar src={"/images/shopping/wxpay.jpg"}/>}><font>使用微信支付</font><Toggle style={styles.toggle} labelPosition="right" onToggle={this.togglePay.bind(this)} value="2" label="" toggled={addressList['pay']=="2"}/></ListItem>
                <p style={styles.productDivide}></p>
                <p style={{height:"15px"}} onClick={this.onChooseRedPocket.bind(this)}><font color="black" style={{float:"left",fontSize:"15px"}}>&nbsp;&nbsp;使用我的红包</font><font color="gray" style={{float:"right",fontSize:"15px"}}>已选优惠:{redPocketTotal.toFixed(2)}元&nbsp;&nbsp;>&nbsp;&nbsp;</font></p>
                <p style={styles.productDivide}></p>
                <p style={{height:"15px"}} onClick={this.onChooseBonusPocket.bind(this)}><font color="black" style={{float:"left",fontSize:"15px"}}>&nbsp;&nbsp;使用我的优惠劵</font><font color="gray" style={{float:"right",fontSize:"15px"}}>已选优惠:{bonusPocketTotal.toFixed(2)}元&nbsp;&nbsp;>&nbsp;&nbsp;</font></p>
                {this.props.params.type==1?(productCart==undefined?"":(productCart.map((cart,index)=>cart.checked?(<div style={styles.productItem} key={time+index}>
                    <p style={styles.productDivide}></p>
                    <ListItem
                        leftAvatar={<Avatar src={"/"+cart.pic_url.toString()}/>}
                        primaryText={<div>{cart.name}</div>}
                        disabled={true}
                        secondaryText={<p>
                                        <span style={{color:"#000000"}}><font color="#A9A9A9">{cart.brief}</font></span>
                                        <br/>
                                        <font color="#EE7942">{"￥"+cart.price.toFixed(2)}</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font styles={styles.floatRight} color="#A9A9A9">{"数量:"+cart.count}</font>
                                        </p>}
                        secondaryTextLines={2} >
                        </ListItem><Link to={"/mobileShopping/ShoppingProductDetails/"+cart.pid}><input style={{display:"none"}} type="button" ref={"ShoppingProductDetails"+cart.pid}></input></Link></div>):"")))
                    :(this.props.params.type==2?(<div style={styles.productItem}>
                    <p style={styles.productDivide}></p>
                    <ListItem
                        leftAvatar={<Avatar src={"/"+productTempBuy.pic_url.toString()}/>}
                        primaryText={<div>{productTempBuy.name}</div>}
                        disabled={true}
                        secondaryText={<p>
                                        <span style={{color:"#000000"}}><font color="#A9A9A9">{productTempBuy.brief}</font></span>
                                        <br/>
                                        <font color="#EE7942">{"￥"+productTempBuy.price.toFixed(2)}</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font styles={styles.floatRight} color="#A9A9A9">{"数量:"+productTempBuy.count}</font>
                                        </p>}
                        secondaryTextLines={2} >
                    </ListItem><Link to={"/mobileShopping/ShoppingProductDetails/"+productTempBuy.pid}><input style={{display:"none"}} type="button" ref={"ShoppingProductDetails"+productTempBuy.pid}></input></Link></div>):"")}
                <div style={styles.bottomSpace} ></div>
                <div style={styles.bottomToolBar}>
                    {browserVersion.ios?<FlatButton onTouchTap={this.handleShowDialog.bind(this)} backgroundColor="#FF9800" style={styles.buttonBuyAll} label={"确认订单"}/>:<FlatButton onClick={this.handleShowDialog.bind(this)} backgroundColor="#FF9800" style={styles.buttonBuyAll} label={"确认订单"}/>}
                    <h4 style={styles.totalPrice}>实际支付:<font color="#EE7942">{"￥"+(payTotal>0?payTotal.toFixed(2):"0.01")}</font><br/><font style={styles.noExpressFee}>{express_fee==0?"免运费":"含运费:"+express_fee+"元"}</font></h4>
                </div>
                <div style={(addressList.openChoose!=undefined&&addressList.openChoose)?styles.chooseViewBGShow:styles.chooseViewBGDismiss}>
                    <div ref="expressDetails" style={(addressList.openChoose!=undefined&&addressList.openChoose)?styles.chooseViewShow:styles.chooseViewDismiss}>
                        <h3 style={styles.expressTitle}>请填写物流信息</h3>
                        {(addressTypeList.map((type,index)=>index<3||(index==3&&addressList['type3']!=undefined&&addressList['type3'].length>0)?<SelectField ref={"select"+index} key={time*3+index} onBlur={this.blurSelectField.bind(this)} onFocus={this.focusSelectField.bind(this)} value={addressList['type'+index]==undefined?-1:addressList['type'+index].selectedIndex==undefined?(-1):(addressList['type'+index][addressList['type'+index].selectedIndex].payload)} style={styles.selectField} floatingLabelText={type} onChange={this.onAddressListChange.bind(this,index)} menuItems={addressList['type'+index]==undefined?[]:addressList['type'+index].map((address,index)=>address)}/>:""))}
                        <TextField key={time*3+"详细地址"} ref="detailsAddress" hintText="详细地址" style={styles.selectAddressDetailField} defaultValue={addressList.address==undefined?"":addressList.address} floatingLabelText="详细地址" />
                        <TextField key={time*3+"收件人"} ref="detailsPerson" hintText="收件人" style={styles.selectField} defaultValue={addressList.name==undefined?"":addressList.name} floatingLabelText="收件人" />
                        <TextField key={time*3+"电话号码"} ref="detailsPhone" hintText="电话号码" style={styles.selectField} defaultValue={addressList.phone==undefined?"":addressList.phone} floatingLabelText="电话号码" />
                        {browserVersion.ios?<RaisedButton primary={true} label={"确定支付"} onTouchTap={this.onConfirmOrder.bind(this)} style={styles.goToPayButton} ></RaisedButton>:<RaisedButton primary={true} label={"确定支付"} onClick={this.onConfirmOrder.bind(this)} style={styles.goToPayButton} ></RaisedButton>}
                        <RaisedButton secondary={true} label={"取消"} onTouchTap={this.onDialogCancel.bind(this)} style={styles.closeButton} ></RaisedButton>
                    </div>
                </div>
                <Dialog
                    ref={"dialogPay"}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}
                    contentStyle={{textAlign:"center"}}>
                    <CircularProgress mode="indeterminate" color={"red"} size={1} /><h3>支付跳转中...</h3></Dialog>
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
        addressList:state.addressList,
        productTempBuy:state.productTempBuy,
        browserVersion:state.browserVersion,
        redPocket:state.redPocket,
        bonusPocket:state.bonusPocket,
        latestExpressInfo:state.latestExpressInfo
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getShoppingCart,checkCartProducts,checkCartAllProducts,delShoppingCart,getAddressList,setAddressDetailInfo,submitAndPayOrder,submitAndPayOrderNow,togglePay,toggleAddressChooseView,getLatestExpressInfo}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingConformOrder);

