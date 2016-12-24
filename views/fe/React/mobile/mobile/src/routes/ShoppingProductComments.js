'use strict';
import '../assets/Shopping.css';
import * as types from '../constants/ShoppingActionTypes';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import CircularProgress from 'material-ui/lib/circular-progress';
import FlatButton from 'material-ui/lib/flat-button';
import Avatar from 'material-ui/lib/avatar';
import Dialog from 'material-ui/lib/dialog';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {getUserInfoByUID,getUserInfoByUIDList,getProductComments} from '../actions/ShoppingActions.js';

class ShoppingProductComments extends Component {
    constructor(props, content) {
        super(props, content);
        this.userListFetched = false;
        this.displayingComments=0;
        this.pageNum=0;
    }
    componentDidMount(){
        this.refs.dialogLoading._show();
        this.props.getProductComments(this.props.params.pid,this.pageNum++);
        window.onscroll=(e)=>{
                if((e.target.body.scrollTop+window.innerHeight)==e.target.body.offsetHeight){
                    this.props.getProductComments(this.props.params.pid,this.pageNum++);
                    this.userListFetched=false;
                }
            }
    }
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
    }
    goBack(){
        //this.props.history.replaceState(null,"/mobileShopping/ShoppingProductDetails/"+this.props.params.pid);
        this.refs.ShoppingProductDetails.click();
    }
    render() {
        let time=new Date().getTime();
        const {productComments,userInfoList,browserVersion}=this.props;
        const styles={
            list:{paddingTop:0,paddingBottom:0,overflowX:"hidden"},
            full:{width:"100%",height:"100%"},
            backButton:{position:"fixed",left:"10px",top:"10px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/back.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            itemComments:{padding:10,fontSize:"14px",height:"20px",width:"100%",textAlign:"center"},
            commentCount:{marginLeft:"50px",margin:"0 auto"},
            commentScore:{height:"15px"}
        };
        if(productComments.comments!=undefined&&!this.userListFetched){
            if(productComments.comments.length> this.displayingComments){
                var uidList="";
                productComments.comments.map((comment,index)=>index>this.displayingComments?(userInfoList.filter(user=>user.id==comment.p_com_uid).length>0?"":uidList+=(comment.p_com_uid+",")):"");
                if(uidList!=""){
                    this.props.getUserInfoByUIDList(uidList.substr(0,uidList.length-1));
                }
                this.displayingComments=productComments.comments.length;
                this.userListFetched=true;
            }
        }
        return (
            <List style={styles.list}>
                <Link to={"/mobileShopping/ShoppingProductDetails/"+this.props.params.pid}><input style={{display:"none"}} type="button" ref="ShoppingProductDetails"></input></Link>
                <FlatButton label={" "} onClick={this.goBack.bind(this)} style={styles.backButton}></FlatButton>
                <ListItem style={styles.itemComments} disabled={true}><p style={styles.commentCount}>评价&nbsp;&nbsp;{productComments.comments==undefined?"(0)":"("+productComments.count+")"}</p></ListItem>
                <ListDivider/>
                {productComments.comments==undefined?"":(productComments.comments.map((comment,index)=>(<div key={time+index}><ListItem
                    leftAvatar={<Avatar src={userInfoList.map(userInfo=>userInfo.id==comment.p_com_uid?userInfo.portrait_url:"").filter(pic=>pic.length>0).toString()}/>}
                    primaryText={comment.p_com}
                    disabled={true}
                    secondaryText={<p>
                    <span style={{color:"#000000"}}><img style={styles.commentScore} src={"/images/shopping/product/comments/score"+comment.p_score+".png"}></img></span>
                    <br/>
                    {userInfoList.map(userInfo=>userInfo.id==comment.p_com_uid?userInfo.nick_name:"")}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{comment.created_at.substring(0,10)}
                    </p>}
                    secondaryTextLines={2} ></ListItem><ListDivider inset={true}/></div>)))}
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
        userInfoList:state.userInfoList,
        productComments:state.productComments,
        browserVersion:state.browserVersion
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getUserInfoByUID,getUserInfoByUIDList,getProductComments}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingProductComments);

