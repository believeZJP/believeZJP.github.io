'use strict';
import '../assets/Shopping.css';
import * as types from '../constants/ShoppingActionTypes';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import CircularProgress from 'material-ui/lib/circular-progress';
import Paper from 'material-ui/lib/paper';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
import TextField from 'material-ui/lib/text-field';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import Dialog from 'material-ui/lib/dialog';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getShoppingCart,checkCartProducts,checkCartAllProducts,delShoppingCart,selectCommentScore,inputCommentText,uploadCommentAndScore} from '../actions/ShoppingActions.js';
class ShoppingInputComment extends Component {
    componentDidMount(){
        };
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
    }
    componentDidUnMount(){
        window.onscroll=null;
    }
    selectCommentScore(score,id){
        this.props.selectCommentScore(score,id);
    }
    inputCommentText(id,e){
        this.props.inputCommentText(id,e.target.value);
        window.document.body.style.background='rgb(255,255,255)';
    }
    goBack(){
        //this.props.history.replaceState(null,"/mobileShopping/ShoppingOrderList");
        this.refs.ShoppingOrderList.click();
    };
    confirmComments(){
        let order=this.props.orders.orders.filter(order=>order.order_num==this.props.params.order_num)[0];
        let shouldUpload=true;
        order.details.map(detail=>{
            if(detail.comment==undefined||detail.comment.length==0){
                shouldUpload=false;
            }
        });
        if(shouldUpload){
            this.props.uploadCommentAndScore(order);
            //this.props.history.replaceState(null,"/mobileShopping/ShoppingOrderList");
            this.refs.ShoppingOrderList.click();
        }else{
            alert("亲,请输入您对所有物品的评价哦~!")
        }
    }
    render() {
        const {orders,browserVersion}=this.props;
        const orderList=(orders.orders==undefined?[]:orders.orders);
        const borderRadius="5px";
        let time=new Date().getTime();
        const styles={
            cardStyle:{width:"96%",marginLeft:"2%",marginTop:"2%",marginBottom:"1%"},
            cardTextStyle:{marginTop:"2%"},
            scoreImgStyle:{marginLeft:"10px",width:"30px"},
            list:{paddingTop:0,paddingBottom:0,overflowX:"hidden", background:"#ffffff"},
            full:{width:"100%",height:"100%"},
            tabs:{width:"100%",color:"#000000",height:"36px",background:"#ffffff"},
            tabItem:{color:"#000000"},
            orderNum:{textAlign:"left",fontSize:"12px"},
            itemSummary:{textAlign:"right",width:"90%",right:"10%",fontSize:"12px"},
            itemPrice:{ color:"#EE7942",fontSize:"14px" },
            itemRedButton:{minWidth:"30px",color:"#EE7942",lineHeight:"24px",height:"24px",borderRadius:5,border:"1px solid red",float:"right",marginRight:"10px",marginTop:3},
            itemBlackButton:{minWidth:"30px",color:"#000000",lineHeight:"24px",height:"24px",borderRadius:5,border:"1px solid black",float:"right",marginRight:"10px",marginTop:3},
            itemButtonWrap:{height:"30px",padding:0},
            swipeableViews:{width:"100%",height:"100%",background:"#E0E0E0"},
            backButton:{position:"fixed",left:"10px",top:"5px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/back.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            itemProducts:{padding:10,fontSize:"14px",height:"20px",width:"100%",textAlign:"center",background:"#FFFFFF"},
            productCount:{top:"10px",margin:"0 auto"},
            itemCheckBox:{width:"50px",height:"30px",margin:"0"},
            buttonDelete:{float:"right",minWidth:"30px",top:3,right:3,height:"24px",color:"#ffffff",lineHeight:"24px",fontSize:"12px"},
            floatRight:{float:"right"},
            productItem:{margin:0,background:"#ffffff"},
            productDivide:{width:"100%",height:"10px", background:"#E0E0E0",margin:0},
            buttonBuyAll:{minWidth:"70px",height:"100%",color:"#ffffff",borderRadius:0,float:"right",zIndex:2},
            buttonCheckAll:{width:"100px",height:"100%",float:"left",color:"#ffffff",zIndex:2},
            bottomToolBar:{position:"fixed",width:"100%",height:"43px",left:0,bottom:0,background:"#ffffff",borderRadius:0,zIndex:2},
            bottomSpace:{width:"100%",height:"50px",background:"#ffffff"},
            totalPrice:{float:"right",marginTop:"5px",marginRight:"5px",zIndex:2},
            selectField:{width:"47%",marginLeft:"2%"}
        };
        const details=orderList.filter(order=>order.order_num==this.props.params.order_num)[0].details;
        const scoreImgs=[1,2,3,4,5];
        return (
            <List style={styles.list}>
                <Link to={"/mobileShopping/ShoppingOrderList"}><input style={{display:"none"}} type="button" ref="ShoppingOrderList"></input></Link>
                <FlatButton label={" "} onClick={this.goBack.bind(this)} style={styles.backButton}></FlatButton>
                <ListItem style={styles.itemProducts} disabled={true}><h3 style={styles.productCount}>评价</h3></ListItem>
                <ListDivider style={{height:"2px"}}/>
                {details.map((detail,index)=>(
                    <Card style={styles.cardStyle} key={time+index}>
                        <CardHeader
                            title={detail.name}
                            subtitle={detail.brief}
                            avatar={<Avatar src={"/"+detail.p_pic_url.toString()}/>}/>
                        <CardText style={styles.cardStyle} >
                            <div>
                                {scoreImgs.map(scoreImg=><img onTouchTap={this.selectCommentScore.bind(this,scoreImg,detail.id)} style={styles.scoreImgStyle} src={detail.score<scoreImg?"/images/shopping/product/comments/scoreDislike.png":"/images/shopping/product/comments/scoreLike.png"}></img>)}
                            </div>
                            <TextField
                                onBlur={this.inputCommentText.bind(this,detail.id)}
                                hintText="输入您的评价"
                                floatingLabelText="您的评价"
                                defaultValue={detail.comment==undefined?"":detail.comment}
                                multiLine={true}
                                rowsMax={2}
                                rows={1}/>
                            <p>
                                <font color="#EE7942">{"￥"+detail.total_price}</font>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<font styles={styles.floatRight} color="#A9A9A9">{"数量:"+detail.quantity}</font>
                            </p></CardText>
                    </Card>))}
                <div style={styles.bottomSpace} ></div>
                <Paper style={styles.bottomToolBar}>
                    <FlatButton onClick={this.confirmComments.bind(this)} backgroundColor="#FF9800" style={styles.buttonBuyAll} label={"发表评价"}/>
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
        orders:state.orders,
        browserVersion:state.browserVersion
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getShoppingCart,checkCartProducts,checkCartAllProducts,delShoppingCart,selectCommentScore,inputCommentText,uploadCommentAndScore}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingInputComment);