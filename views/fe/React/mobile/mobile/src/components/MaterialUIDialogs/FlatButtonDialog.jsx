
import React, { Component, PropTypes } from 'react';

import { RaisedButton } from 'material-ui';
import { Dialog,TextField } from 'material-ui';
import {uploadWelBanner,deleteWelBanner,uploadWelProduct} from '../../actions/ShoppingActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class FlatButtonDialog extends Component {

    constructor(props, content) {
        super(props, content); // this.state = { someProp: 'Default' };
        this.onDialogSubmitPic = this.onDialogSubmitPic.bind(this);
        this.onDialogSubmitPicAndTitle = this.onDialogSubmitPicAndTitle.bind(this);
        this.onDialogCancel = this.onDialogCancel.bind(this);
        this.handleShowDialog = this.handleShowDialog.bind(this);
        this.onDialogDelete = this.onDialogDelete.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }
    componentWillUpdate(){
        //上传图片成功
        if(this.props.bannersResult!=undefined||this.props.productsResult!=undefined){
            if(this.refs.dialog.isOpen()){
                this.refs.dialog._dismiss();
            }
        }
    }
    onDialogSubmitPic(){
        if(this.props.onDialogSubmitPic){
            this.props.onDialogSubmitPic();
        }
        this.refs.fileUpload.click();
    }
    onDialogSubmitPicAndTitle(){
        //修改物品图片以及标题
        var title=this.refs.productTitle.refs.input.value==""?this.refs.productTitle.props.floatingLabelText:this.refs.productTitle.refs.input.value;
        if(this.refs.fileUpload.files.length>0){
            let reader = new FileReader();
            let file = this.refs.fileUpload.files[0];
            reader.onload =upload=>this.props.uploadWelProduct(this.refs.fileUpload.id,title,upload.target.result);
            reader.readAsDataURL(file);
        }else{
            this.props.uploadWelProduct(this.refs.fileUpload.id,title,"");
        }
    }
    onDialogCancel() {
        if(this.props.onDialogCancel){
            if(this.props.onDialogCancel()){
                this.refs.dialog._dismiss();
            }
        } else {
            this.refs.dialog._dismiss();
        }
    }
    onDialogDelete(){
        this.props.deleteWelBanner(this.props.rowID);
    }
    handleShowDialog(){
        this.refs.dialog._show();
        this.refs.fileUpload.value="";
    }
    handleFileUpload(e){
        //上传banners图片
        let reader = new FileReader();
        let file = e.target.files[0];
        if(!this.props.modifyProduct){
            reader.onload =upload=>this.props.uploadWelBanner(e.target.id,upload.target.result);
        }else{
            reader.onload =upload=>this.refs.displayImage.src=upload.target.result;
        }
        reader.readAsDataURL(file);
    };
    render() {
        const { dialogTitle ,imageUrl,rowID,bannersResult,productsResult,modifyProduct,productTitle} = this.props;
        let standardActions = [];
        if(modifyProduct){
            standardActions = [
                { text: '选择图片', onTouchTap: this.onDialogSubmitPic, ref: 'submit' },
                { text: '确认修改', onTouchTap: this.onDialogSubmitPicAndTitle, ref: 'submit' },
                { text: '取消' , onTouchTap: this.onDialogCancel}
            ];
        }else{
            standardActions = [
                { text: '删除图片', onTouchTap: this.onDialogDelete },
                { text: '选择图片', onTouchTap: this.onDialogSubmitPic, ref: 'submit' },
                { text: '取消' , onTouchTap: this.onDialogCancel}
            ];
        }
        return (
            <div style={{display: 'inline-block'}}>
                <RaisedButton label={dialogTitle} {...this.props} onTouchTap={this.handleShowDialog}/>
                <input ref="fileUpload" id={rowID} type="file" style={{display : "none"}} onChange={this.handleFileUpload}/>
                <Dialog
                    ref="dialog"
                    title={dialogTitle}
                    actions={standardActions}
                    autoDetectWindowHeight={true}>
                    <div style={{textAlign:"center"}}>
                        <p><img ref="displayImage" src={imageUrl}/></p>
                        {modifyProduct?(<TextField ref="productTitle" hintText="请输入物品标题" floatingLabelText={productTitle} />):""}
                    </div>
                </Dialog>
            </div>
        );
    }
}

FlatButtonDialog.propTypes = {
    dialogTitle: PropTypes.string,
    modal: PropTypes.bool,
    onDialogSubmitPic: PropTypes.func,
    onDialogCancel: PropTypes.func
};
FlatButtonDialog.defaultProps = {
    modal: true,
    secondary:true,
    onDialogSubmitPic: null,
    onDialogCancel: null
};

function mapStateToProps(state) {
    return {
        bannersResult: state.modifyBanners,
        productsResult: state.products
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({uploadWelBanner,deleteWelBanner,uploadWelProduct}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(FlatButtonDialog);