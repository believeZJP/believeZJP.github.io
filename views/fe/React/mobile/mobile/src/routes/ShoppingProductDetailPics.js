'use strict';
import '../assets/Shopping.css';
import * as types from '../constants/ShoppingActionTypes';
import List from 'material-ui/lib/lists/list';
import ListDivider from 'material-ui/lib/lists/list-divider';
import ListItem from 'material-ui/lib/lists/list-item';
import FlatButton from 'material-ui/lib/flat-button';
import CircularProgress from 'material-ui/lib/circular-progress';
import Dialog from 'material-ui/lib/dialog';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {getProductDetailPics} from '../actions/ShoppingActions.js';
class ShoppingProductDetailPics extends Component {
    componentDidMount(){
        this.refs.dialogLoading._show();
            this.props.getProductDetailPics(this.props.params.pid);
        };
    componentWillUpdate(){
        this.refs.dialogLoading==undefined?"":this.refs.dialogLoading._dismiss();
        this.refs.imageDiv.scrollTop=0;
    }
    goBack(){
        this.props.history.goBack();
    }
    render() {
        const {productDetailPics,browserVersion}=this.props;
        let time=new Date().getTime();
        const styles={
            list:{paddingTop:0,paddingBottom:0,overflowX:"hidden", background:"#E0E0E0"},
            productCount:{top:"10px",margin:"0 auto"},
            backButton:{position:"fixed",left:"10px",top:"5px",zIndex:2,minWidth:"35px",height:"35px",backgroundImage:"url(/images/shopping/product/details/back.png)",color:"#ffffff",borderRadius:18,backgroundRepeat:"no-repeat",backgroundSize:"contain"},
            itemProducts:{padding:10,fontSize:"14px",height:"20px",width:"100%",textAlign:"center", background:"#ffffff"},
            imageDiv:{WebkitOverflowScrolling: "touch",width:"100%"},
            image:{width:"100%",display:"inherit"}
        };
        return (
            <List style={styles.list}>
                <FlatButton label={" "} onTouchTap={this.goBack.bind(this)} style={styles.backButton}></FlatButton>
                <ListItem style={styles.itemProducts} disabled={true}><h3 style={styles.productCount}>物品详情</h3></ListItem>
                <div ref="imageDiv" style={styles.imageDiv}>
                    {productDetailPics==undefined?"":productDetailPics.map((pic,index)=><img key={time+index} style={styles.image} src={"/"+pic}/>)}
                </div>
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
        productDetailPics: state.productDetailPics,
        browserVersion:state.browserVersion
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getProductDetailPics}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingProductDetailPics);

