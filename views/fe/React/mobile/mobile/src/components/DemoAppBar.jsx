
import React, { Component, PropTypes } from 'react';

import { AppBar } from 'material-ui';
import { MenuItem } from 'material-ui';
import { LeftNav } from 'material-ui';
import { Link } from 'react-router';
class DemoAppBar extends Component {

    constructor(props, content) {
        super(props, content);
        this.showLeftNavClick = this.showLeftNavClick.bind(this);
        this.changeURL = this.changeURL.bind(this);
    }

    showLeftNavClick() {
        this.refs.leftNav.toggle();
    }
    changeURL(event, selectedIndex, menuItem){
        switch(selectedIndex){
            case 1:
                this.refs.ShoppingManagementPage.click();
                break;
            case 2:
                this.refs.ShoppingPage.click();
                break;
        }
    }
    render() {
        let menuItems = [
            { type: MenuItem.Types.SUBHEADER, text: '后台管理' },
            { route: '', text: '工具购物管理' },
            { route: '', text: '其他管理' }
        ];
        return (
            <div>
                <AppBar {...this.props} onLeftIconButtonTouchTap={this.showLeftNavClick}/>
                <div style={{display:"none"}}>
                    <Link to="ShoppingManagementPage" params={ this.props.params }><span ref="ShoppingManagementPage" params={ this.props.params }></span></Link>
                </div>
                <LeftNav ref="leftNav" docked={false} onChange={this.changeURL} menuItems={menuItems} />
            </div>
            );
    }
}


DemoAppBar.propTypes = {
    title: PropTypes.string
};
DemoAppBar.defaultProps = {
    title: 'Brand'
};

export default DemoAppBar;