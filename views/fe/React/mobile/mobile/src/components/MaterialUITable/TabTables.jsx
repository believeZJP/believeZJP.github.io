
import React, { Component, PropTypes } from 'react';
import {List,ListItem,ListDivider,TextField,Table, TableHeader, TableBody, TableRow, TableHeaderColumn, TableRowColumn, TableFooter,Tabs,Tab,RaisedButton,Avatar,Card,CardHeader,CardActions,CardText,CircularProgress,GridList,GridTile,IconButton,Paper} from 'material-ui';
import FlatButtonDialog from '../MaterialUIDialogs/FlatButtonDialog.jsx';
import {getProductDetail,onChangeProductDetails,onAddProductDetails,onDelProductDetails} from '../../actions/ShoppingActions.js';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class TabTables extends Component {

    constructor(props, content) {
        super(props, content); // this.state = {count: props.initialCount};
    }
    componentDidUpdate(){
        this.props.cardDetails.products.map((product,index)=>{
            let expanded=false;
            if(product.isExpanded!=undefined){
                expanded=product.isExpanded;
            }
            this.refs['card'+index].state.expanded=expanded;
        });
    }
    modifyPic(id,modifyOrDelete){
        if(modifyOrDelete=="modify"){
            //修改物品图片
            this.refs['fileUpload'+id].click();
        }else if(modifyOrDelete=="delete"){
            this.refs['image'+id].src="";
        }
    }
    modifyColorPic(id,modifyOrDelete){
        if(modifyOrDelete=="modify"){
            //修改物品图片
            this.refs['fileColorUpload'+id].click();
        }else if(modifyOrDelete=="delete"){
            this.refs['imageColor'+id].src="";
        }
    }
    handleFileUpload(id){
        let reader = new FileReader();
        let file = this.refs['fileUpload'+id].files[0];
        reader.onload =upload=>{this.refs['image'+id].src=upload.target.result;this.refs.fileUpload.files=[];};
        reader.readAsDataURL(file);
    }
    handleColorFileUpload(id){
        let reader = new FileReader();
        let file = this.refs['fileColorUpload'+id].files[0];
        reader.onload =upload=>{this.refs['imageColor'+id].src=upload.target.result;this.refs.fileUpload.files=[];};
        reader.readAsDataURL(file);
    }
    render() {
        const {
            tableBanners,
            tableProducts,
            cardDetails,
            className,
            productDetails
        } = this.props;
        let time=new Date().getTime();
        return (
        <Tabs>
            <Tab label={cardDetails.headerTitle} >
                {cardDetails.products.map((product,index)=>(<Card ref={"card"+index} onExpandChange={(isExpanded)=>isExpanded?this.props.getProductDetail(product.id):()=>{}} className={className} initiallyExpanded={product.isExpanded} style={{marginTop:"20px"}} key={time+index}>
                <CardHeader
                    title={"首页展示名称:  "+product.title}
                    subtitle={"商品ID:  "+product.id}
                    avatar={<Avatar src={product.pic} style={{color:'red'}}></Avatar>}
                    actAsExpander={false}
                    showExpandableButton={true}>
                </CardHeader>
                    <List style={{border: "thin solid #D9D9D9",width:"97%",margin:"0 auto",marginTop:"20px"}} expandable={true} >
                        <ListItem disabled={true}  primaryText="物品展示图片"/>
                        <ListItem disabled={true}>
                                    {(productDetails==undefined||productDetails.length==0||!product.isExpanded)?
                                        (<CircularProgress mode="indeterminate"/>):(<GridList
                                        cellHeight={200}
                                        cols={5}>
                                        {productDetails.banners.map((banner,index) =><GridTile key={time+index}
                                                                                               title={"展示图片"+index}
                                                                                               actionIcon={<div><RaisedButton onTouchTap={this.modifyPic.bind(this,banner.id,"delete")} style={{marginRight:"10px",minWidth:"30px"}} label="删除"/><RaisedButton onTouchTap={this.modifyPic.bind(this,banner.id,"modify")} style={{marginRight:"10px",minWidth:"30px"}} label="修改"/><input ref={"fileUpload"+banner.id} type="file" style={{display : "none"}} onChange={this.handleFileUpload.bind(this,banner.id)}/></div>}
                                        ><img src={banner.p_pic_url} /></GridTile>)}
                                    </GridList>)}
                        </ListItem>
                        <ListDivider/>
                        <ListItem disabled={true}  primaryText="对应颜色图片"/>
                        <ListItem disabled={true}>
                            {(productDetails==undefined||productDetails.length==0||!product.isExpanded)?
                                (<CircularProgress mode="indeterminate"/>):(<GridList
                                cellHeight={200}
                                cols={5}>
                                {productDetails.colors.map((color,index) =><GridTile key={time+index}
                                                                                     title={"颜色:"+color.p_color}
                                                                                     actionIcon={<div><RaisedButton onTouchTap={this.modifyColorPic.bind(this,color.p_cid,"delete")} style={{marginRight:"10px",minWidth:"30px"}} label="删除"/><RaisedButton onTouchTap={this.modifyColorPic.bind(this,color.p_cid,"modify")} style={{marginRight:"10px",minWidth:"30px"}} label="修改"/><input ref={"fileColorUpload"+color.p_cid} type="file" style={{display : "none"}} onChange={this.handleColorFileUpload.bind(this,color.p_cid)}/></div>}
                                ><img src={color.p_color_pic} /></GridTile>)}
                            </GridList>)}
                        </ListItem>
                        <ListDivider/>
                        <ListItem disabled={true}  primaryText="产品型号编辑"/>
                        <ListItem disabled={true}>
                            {(productDetails==undefined||productDetails.length==0||!product.isExpanded)?
                                (<CircularProgress mode="indeterminate"/>):
                                ( <Table
                                    fixedHeader={tableProducts.fixedHeader}
                                    fixedFooter={tableProducts.fixedFooter}
                                    selectable={tableProducts.selectable}
                                    multiSelectable={tableProducts.multiSelectable}
                                    className={className}>
                                    <TableHeader style={{display:"none"}} enableSelectAll={tableProducts.enableSelectAll}>
                                        <TableRow>
                                            <TableHeaderColumn colSpan="1" tooltip='型号名称'>型号名称</TableHeaderColumn>
                                            <TableHeaderColumn colSpan="1" tooltip='浮动价格(±元)'>浮动价格(±元)</TableHeaderColumn>
                                            <TableHeaderColumn colSpan="5" tooltip='自定义属性'>自定义属性</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        deselectOnClickaway={tableProducts.deselectOnClickaway}
                                        showRowHover={tableProducts.showRowHover}
                                        stripedRows={tableProducts.stripedRows}>
                                    {(productDetails.types.map((type,i) =>(
                                    <TableRow key={time+i} style={{border: "thin solid #D9D9D9"}}>
                                        <TableRowColumn colSpan="1"><RaisedButton primary={true} onTouchTap={this.props.onDelProductDetails.bind(this,"types",i)} style={{minWidth:"30px"}} label="删除型号"/></TableRowColumn>
                                        <TableRowColumn colSpan="1"><TextField onBlur={this.props.onChangeProductDetails.bind(this,"types",i,"p_type")} hintText={type.p_type} floatingLabelText="型号名称" defaultValue={type.p_type}/></TableRowColumn>
                                        <TableRowColumn colSpan="1"><TextField onBlur={this.props.onChangeProductDetails.bind(this,"types",i,"p_add_price")} hintText={type.p_add_price} floatingLabelText="浮动价格" defaultValue={type.p_add_price}/></TableRowColumn>
                                        {(productDetails.props.map((prop,j) =>prop.p_tid==type.p_tid?(
                                        <TableRowColumn key={time+j}><TextField onBlur={this.props.onChangeProductDetails.bind(this,"props",j,"p_prop")} hintText={prop.p_prop} floatingLabelText="自定义属性" defaultValue={prop.p_prop} /><br/>
                                            <TextField onBlur={this.props.onChangeProductDetails.bind(this,"props",j,"p_prop_val")} hintText={prop.p_prop_val} floatingLabelText="自定义属性值" defaultValue={prop.p_prop_val} /><br/>
                                            <RaisedButton primary={true} onTouchTap={this.props.onDelProductDetails.bind(this,"props",j)} style={{minWidth:"30px"}} label="删除属性"/></TableRowColumn>
                                            ):""))}
                                        <TableRowColumn colSpan="1"><RaisedButton secondary={true} onTouchTap={this.props.onAddProductDetails.bind(this,"props",{'p_tid':type.p_tid,'p_prop':"",'p_prop_val':""})} style={{minWidth:"30px"}} label="添加新属性"/> </TableRowColumn>
                                    </TableRow>)))}
                                    </TableBody>
                                </Table>)}
                        </ListItem>
                        <ListItem disabled={true}  primaryText="产品数量编辑"/>
                        <ListItem disabled={true}>
                            {(productDetails==undefined||productDetails.length==0||!product.isExpanded)?
                                (<CircularProgress mode="indeterminate"/>):
                                ( <Table
                                    fixedHeader={tableProducts.fixedHeader}
                                    fixedFooter={tableProducts.fixedFooter}
                                    selectable={tableProducts.selectable}
                                    multiSelectable={tableProducts.multiSelectable}
                                    className={className}>
                                    <TableHeader style={{display:"none"}} enableSelectAll={tableProducts.enableSelectAll}>
                                        <TableRow>
                                            <TableHeaderColumn colSpan="1" tooltip='型号名称'>型号名称</TableHeaderColumn>
                                            <TableHeaderColumn colSpan="1" tooltip='颜色名称'>颜色名称</TableHeaderColumn>
                                            <TableHeaderColumn colSpan="5" tooltip='剩余数量'>剩余数量</TableHeaderColumn>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody
                                        deselectOnClickaway={tableProducts.deselectOnClickaway}
                                        showRowHover={tableProducts.showRowHover}
                                        stripedRows={tableProducts.stripedRows}>
                                        {(productDetails.types.map((type,i) =>
                                            (productDetails.colors.map((color,j)=>(<TableRow key={time+j} style={{border: "thin solid #D9D9D9"}}>
                                                <TableRowColumn colSpan="1">{type.p_type}</TableRowColumn>
                                                <TableRowColumn colSpan="1">{color.p_color}</TableRowColumn>
                                                {productDetails.quantity.map((quantity,k)=>(quantity.p_tid==type.p_tid&&quantity.p_cid==color.p_cid)?(<TableRowColumn key={time+k}><TextField onBlur={this.props.onChangeProductDetails.bind(this,"quantity",k,"p_quantity")} hintText={quantity.p_quantity.toString()} floatingLabelText="剩余数量" defaultValue={quantity.p_quantity.toString()} /></TableRowColumn>):"")}
                                            </TableRow>)))
                                        ))}
                                    </TableBody>
                                </Table>)}
                        </ListItem>
                    </List>
                <CardActions expandable={true} style={{float:"right"}}>
                    <RaisedButton label="放弃" primary={true} />
                    <RaisedButton label="确认修改" secondary={true}/>
                </CardActions>
            </Card>))}
            </Tab>
        </Tabs>
        );
    }
}

TabTables.defaultProps = {
    fixedHeader: true,
    fixedFooter: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    height: '300px'
};
function mapStateToProps(state) {
    return {
        productDetails: state.productDetails
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators({getProductDetail,onChangeProductDetails,onAddProductDetails,onDelProductDetails}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(TabTables);