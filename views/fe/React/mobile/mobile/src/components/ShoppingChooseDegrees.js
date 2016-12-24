'use strict';
import * as types from '../constants/ShoppingActionTypes';
import Paper from 'material-ui/lib/paper';
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { connect } from 'react-redux';
class ShoppingChooseDegrees extends Component {
    componentDidMount(){

    };

    render() {
        const {productDetails,userInfoList,productCart,browserVersion,chooseDegree}=this.props;
        const windowWidth=window.innerWidth;
        const windowHeight=window.innerHeight;
        let time=new Date().getTime();
        let cartTotal=0;
        const styles={
            listScroll:{paddingTop:0,paddingBottom:0,zIndex:1}
        };


        var sphPlus=["0.00"];
        var sphMinus=["0.00"];
        for(var i=1;i<65;i++){
            sphPlus.push("+"+(i*0.25).toFixed(2));
            sphMinus.push("-"+(i*0.25).toFixed(2));
        }
        var sphAll=[];
        for(var i=0;i<129;i++){
            i==64?sphAll.push("0.00"):(i<64?sphAll.push("+"+(16-i*0.25).toFixed(2)):sphAll.push((16-i*0.25).toFixed(2)));
        }
        const pd=[];
        for(var i=0;i<33;i++){
            pd.push((56+i*0.5).toFixed(1));
        }
        var cylMinus=["无"];
        for(var i=1;i<16;i++){
            cylMinus.push("-"+(i*0.25).toFixed(2));
        }
        const axis=['无'];
        for(var i=0;i<180;i++){
            axis.push(i+1);
        }
        const add=['0.00'];
        for(var i=1;i<17;i++){
            add.push((i*0.25).toFixed(2));
        }
        var chooseProperty=[{name:"近视",sphL:sphMinus,sphR:sphMinus,pd:pd,cylL:cylMinus,cylR:cylMinus,axisL:axis,axisR:axis,add:add},
            {name:"远视",sphL:sphPlus,sphR:sphPlus,pd:pd,cylL:cylMinus,cylR:cylMinus,axisL:axis,axisR:axis,add:add},
            {name:"渐进",sphL:sphAll,sphR:sphAll,pd:pd,cylL:cylMinus,cylR:cylMinus,axisL:axis,axisR:axis,add:add},
            {name:"老花",sphL:sphAll,sphR:sphAll,pd:pd,cylL:cylMinus,cylR:cylMinus,axisL:axis,axisR:axis,add:add}];
        const selectedIndex=chooseDegree.type==undefined?0:chooseDegree.type;

        //过滤条件添加
        const chooseTypeName=(productDetails.types==undefined||productDetails.chooseType==undefined?"":productDetails.types.filter(type=>type.p_tid==productDetails.chooseType)[0].p_type);
        const chooseDegreeConfigs=[{name:"依视路1.552非球",sphLow:-8,sphHigh:4,cylLow:-2,cylHigh:0,conditions:[]}
            ,{name:"依视路1.591非球",sphLow:-8,sphHigh:0,cylLow:-2,cylHigh:0,conditions:[{sphLow:-6,sphHigh:0,cylLow:-2,cylHigh:0,total:1000},{sphLow:-8,sphHigh:-6.25,cylLow:-10,cylHigh:0,total:8}]}
            ,{name:"依视路1.665非球",sphLow:-12,sphHigh:0,cylLow:-2,cylHigh:0,conditions:[{sphLow:-10,sphHigh:0,cylLow:-2,cylHigh:0,total:1000},{sphLow:-12,sphHigh:-10,cylLow:0,cylHigh:0,total:1000}]}
            ,{name:"赛蒙1.60非球",sphLow:-10,sphHigh:0,cylLow:-2,cylHigh:0,conditions:[]}
            ,{name:"赛蒙1.67非球",sphLow:-12,sphHigh:0,cylLow:-2,cylHigh:0,conditions:[]}
            ,{name:"赛蒙1.74非球",sphLow:-15,sphHigh:-4,cylLow:-2,cylHigh:0,conditions:[{sphLow:-12,sphHigh:-4,cylLow:-2,cylHigh:0,total:1000},{sphLow:-15,sphHigh:-12,cylLow:0,cylHigh:0,total:1000}]}];
        chooseDegreeConfigs.map(config=>{
            if(chooseTypeName.indexOf(config.name)>=0){
                //过滤近远视
                chooseProperty[selectedIndex].sphL=chooseProperty[selectedIndex].sphR=(chooseProperty[selectedIndex].sphL.filter(sph=>(parseFloat(sph)>=config.sphLow&&parseFloat(sph)<=config.sphHigh)||sph=="无"||parseFloat(sph)==0));
                //过滤散光
                chooseProperty[selectedIndex].cylL=chooseProperty[selectedIndex].cylR=(cylMinus.filter(cyl=>(parseFloat(cyl)>=config.cylLow&&parseFloat(cyl)<=config.cylHigh)||cyl=="无"||parseFloat(cyl)==0));

                //组合条件判断
                //过滤散光
                config.conditions.map(condition=>{
                    var left=chooseProperty[selectedIndex].sphL[chooseDegree.sphL];
                    var right=chooseProperty[selectedIndex].sphR[chooseDegree.sphR];
                    var cylFiltered=cylMinus.filter(cyl=>(parseFloat(cyl)>=condition.cylLow&&parseFloat(cyl)<=condition.cylHigh)||cyl=="无"||parseFloat(cyl)==0);
                    if(left>=condition.sphLow&&left<=condition.sphHigh){
                        chooseProperty[selectedIndex].cylL=cylFiltered.filter(cyl=>(Math.abs(left)+Math.abs(parseFloat(cyl)))<=condition.total||cyl=="无"||parseFloat(cyl)==0);
                    }
                    if(right>=condition.sphLow&&right<=condition.sphHigh){
                        chooseProperty[selectedIndex].cylR=cylFiltered.filter(cyl=>(Math.abs(right)+Math.abs(parseFloat(cyl)))<=condition.total||cyl=="无"||parseFloat(cyl)==0);
                    }
                });
            }
        });

        //远视无法选择时 转为近视
        if(chooseProperty[selectedIndex].sphL.length==1&&chooseProperty[selectedIndex].sphL.length==1&&selectedIndex==1){
            alert('当前镜片无法选择远视度数！');
            this.props.action('type',chooseDegree,chooseProperty,{target:{selectedIndex:0}});
        }
        return (
            <Paper className="optometry-grid">
                <table>
                    <tbody>
                    <tr>
                        <th><label for="select" className="select"><select onChange={this.props.action.bind(this,'type',chooseDegree,chooseProperty)} name="type">{chooseProperty.map((p,index)=>index==chooseDegree.type?<option key={index+"type"} selected>{p.name}</option>:<option key={index+"type"}>{p.name}</option>)}</select></label></th>
                        <th>左眼L</th>
                        <th>右眼R</th>
                    </tr>
                    <tr>
                        <th>度数(Sph)</th>
                        <td>
                            <label for="select" className="select"><select value={chooseDegree.sphL==undefined?0:chooseDegree.sphL} onChange={this.props.action.bind(this,'sphL',chooseDegree,chooseProperty)} name="type">{chooseProperty[selectedIndex].sphL.map((p,index)=><option value={index} key={index+"sphL"}>{p}</option>)}</select></label>
                        </td>
                        <td>
                            <label for="select" className="select"><select value={chooseDegree.sphR==undefined?0:chooseDegree.sphR} onChange={this.props.action.bind(this,'sphR',chooseDegree,chooseProperty)} name="type">{chooseProperty[selectedIndex].sphR.map((p,index)=><option value={index} key={index+"sphR"}>{p}</option>)}</select></label>
                        </td>
                    </tr>
                    <tr>
                        <th>瞳距(PD)</th>
                        <td colSpan="2">
                            <label for="select" className="select"><select value={chooseDegree.pd==undefined?0:chooseDegree.pd} onChange={this.props.action.bind(this,'pd',chooseDegree,chooseProperty)} name="type">{chooseProperty[selectedIndex].pd.map((p,index)=><option value={index} key={index+"pd"}>{p}</option>)}</select></label>
                        </td>
                    </tr>
                    <tr>
                        <th>散光(Cyl)</th>
                        <td>
                            <label for="select" className="select"><select value={chooseDegree.cylL==undefined?0:chooseDegree.cylL} onChange={this.props.action.bind(this,'cylL',chooseDegree,chooseProperty)} name="type">{chooseProperty[selectedIndex].cylL.map((p,index)=><option value={index} key={index+"cylL"}>{p}</option>)}</select></label>
                        </td>
                        <td>
                            <label for="select" className="select"><select value={chooseDegree.cylR==undefined?0:chooseDegree.cylR} onChange={this.props.action.bind(this,'cylR',chooseDegree,chooseProperty)} name="type">{chooseProperty[selectedIndex].cylR.map((p,index)=><option value={index} key={index+"cylR"}>{p}</option>)}</select></label>
                        </td>
                    </tr>
                    <tr>
                        <th>轴位(Axis)</th>
                        <td>
                            <label for="select" className="select"><select value={chooseDegree.axisL==undefined?0:chooseDegree.axisL} onChange={this.props.action.bind(this,'axisL',chooseDegree,chooseProperty)} name="type">{chooseProperty[selectedIndex].axisL.map((p,index)=><option value={index} key={index+"axisL"}>{p}</option>)}</select></label>
                        </td>
                        <td>
                            <label for="select" className="select"><select value={chooseDegree.axisR==undefined?0:chooseDegree.axisR} onChange={this.props.action.bind(this,'axisR',chooseDegree,chooseProperty)} name="type">{chooseProperty[selectedIndex].axisR.map((p,index)=><option value={index} key={index+"axisR"}>{p}</option>)}</select></label>
                        </td>
                    </tr>
                    {selectedIndex==2?<tr>
                        <th>下加光(Add)</th>
                        <td colSpan="2">
                            <label for="select" className="select"><select value={chooseDegree.add} onChange={this.props.action.bind(this,'add',chooseDegree,chooseProperty)} name="type">{chooseProperty[selectedIndex].add.map((p,index)=><option value={index} key={index+"add"}>{p}</option>)}</select></label>
                        </td>
                    </tr>:null
                    }
                    </tbody>
                </table>
            </Paper>
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
    return bindActionCreators({}, dispatch);
}
export default connect(mapStateToProps,mapDispatchToProps)(ShoppingChooseDegrees);

