'use strict';
import '../assets/Shopping.css';
import * as types from '../constants/ShoppingActionTypes';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import CircularProgress from 'material-ui/lib/circular-progress';
import FlatButton from 'material-ui/lib/flat-button';
import Paper from 'material-ui/lib/paper';
import Dialog from 'material-ui/lib/dialog';
import Checkbox from 'material-ui/lib/checkbox';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getShoppingRedPocketList,checkRedPocket,confirmCheckRedPocket} from '../actions/ShoppingActions.js';
class ShoppingRedPocketList extends Component {
    componentDidMount(){
        this.props.getShoppingRedPocketList(0,10);
        };
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
        window.onscroll=(e)=>{
            if((e.target.body.scrollTop+window.innerHeight)==e.target.body.offsetHeight){
                this.props.getShoppingRedPocketList(parseInt(this.props.redPocket.list.length/10),10);
            }
        };
    }
    componentDidUnMount(){
        window.onscroll=null;
    }
    goBack(){
        //this.props.history.replaceState(null,"/mobileShopping/ShoppingOrderList");
        this.refs.ShoppingConformOrder.click();
    };
    onPocketCheck(key,e,checked){
        this.props.checkRedPocket(key,checked);
    }
    onConfirmPocket(){
        this.props.confirmCheckRedPocket();
        this.refs.ShoppingConformOrder.click();
    }
    format(dateIN,format){
        var date = {
            "M+": dateIN.getMonth() + 1,
            "d+": dateIN.getDate(),
            "h+": dateIN.getHours(),
            "m+": dateIN.getMinutes(),
            "s+": dateIN.getSeconds(),
            "q+": Math.floor((dateIN.getMonth() + 3) / 3),
            "S+": dateIN.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (dateIN.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    }
    render() {
        const {redPocket,browserVersion}=this.props;
        let time=new Date().getTime();
        const styles={
            list:{paddingTop:0,paddingBottom:0,overflowX:"hidden", background:"#ffffff"},
            backButton:{position:"fixed",left:"10px",top:"5px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/back.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            itemProducts:{padding:10,fontSize:"14px",height:"20px",width:"100%",textAlign:"center",background:"#FFFFFF"},
            checkedTotal:{top:"10px",float:"right",marginRight:"10px"},
            productCount:{top:"10px",margin:"0 auto"},
            pocketBG:{width:"90%",height:"90px",marginLeft:"5%",marginTop:"10px",position:"absolute"},
            imageDiv:{WebkitOverflowScrolling: "touch",width:"100%",background:"#E0E0E0"},
            bottomToolBar:{position:"fixed",width:"100%",height:"43px",left:0,bottom:0,background:"#ffffff",borderRadius:0,zIndex:2},
            buttonBuyAll:{minWidth:"70px",height:"100%",color:"#ffffff",borderRadius:0,float:"right",zIndex:2},
            bottomSpace:{width:"100%",height:"50px",background:"#E0E0E0"},
            remindBottom:{width:"200px",height:"100%",marginTop:"20px",float:"left",fontSize:"13px",zIndex:2}
        };
        var checkedTotal=0;
        redPocket.list.map(item=>item.checked==true?checkedTotal=(parseFloat(checkedTotal)+parseFloat(item.detail_fee)):"");
        return (
            <List style={styles.list}>
                <Link to={"/mobileShopping/ShoppingConformOrder/"+this.props.params.type}><input style={{display:"none"}} type="button" ref="ShoppingConformOrder"></input></Link>
                <FlatButton label={" "} onClick={this.goBack.bind(this)} style={styles.backButton}></FlatButton>
                <ListItem style={styles.itemProducts} disabled={true}><h3 style={styles.productCount}>我的红包({redPocket.count})</h3></ListItem>
                <ListDivider style={{height:"2px"}}/>
                <div style={styles.imageDiv}>
                        {redPocket.list.map((item,index)=>
                    <div key={time*2+index} style={{position:"relative",height:"100px"}}>
                        <img key={time+index} style={styles.pocketBG} src="/images/faHongBao/index/pocket-bg.png"/>
                        <div style={styles.pocketBG}>
                            <div style={{float:"left",marginLeft:"10px",marginTop:"23px",width:"100px",display:"inline-block",borderRight:"2px solid #f90"}}>
                                <font style={{color:"red",fontSize:"18px"}}>￥</font><font style={{color:"red",fontSize:"30px"}}>{parseFloat(item.detail_fee).toFixed(2)}</font>
                            </div>
                            <div style={{float: "left",display: "inline-block",paddingLeft: "0.8em",paddingTop:".4em"}}>
                                <h4 style={{ lineHeight: "1.6em",fontSize: ".45em",color: "#fff",background: "#f90",textAlign: "center",borderRadius: "12px"}}>{item.activated>0?"全品类使用":"未激活"}</h4>
                                <p style={{height:"18px"}}>
                                    <font style={{fontSize:"12px",color:"gray"}}>有效期至&nbsp;{this.format(new Date(item.expire_date * 1000),'yyyy-MM-dd')}</font>
                                </p>
                            </div>
                            <div style={{float: "right",display: "inline-block",paddingLeft: "0.8em",paddingTop:"2.6em"}}>
                                {item.activated>0?
                                    <Checkbox name="" onCheck={this.onPocketCheck.bind(this,item.detail_key)} defaultChecked={item.checked==true} label=""/>
                                    :""}
                            </div>
                        </div>
                    </div>)}
                </div>
                <div style={styles.bottomSpace} ></div>
                <Paper style={styles.bottomToolBar}>
                    <font color="red" style={styles.remindBottom}>&nbsp;&nbsp;合计优惠:{checkedTotal}元</font>
                    <FlatButton onClick={this.onConfirmPocket.bind(this)} backgroundColor="#FF9800" style={styles.buttonBuyAll} label={"确定"}/>
                </Paper>
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
        redPocket:state.redPocket,
        browserVersion:state.browserVersion
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getShoppingRedPocketList,checkRedPocket,confirmCheckRedPocket}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingRedPocketList);