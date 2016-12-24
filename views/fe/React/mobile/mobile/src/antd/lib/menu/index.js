'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcMenu = require('rc-menu');

var _rcMenu2 = _interopRequireDefault(_rcMenu);

var _commonOpenAnimation = require('../common/openAnimation');

var _commonOpenAnimation2 = _interopRequireDefault(_commonOpenAnimation);

function noop() {}

var AntMenu = _react2['default'].createClass({
  displayName: 'AntMenu',

  getDefaultProps: function getDefaultProps() {
    return {
      prefixCls: 'ant-menu',
      onClick: noop,
      onOpen: noop,
      onClose: noop,
      className: '',
      theme: 'light' };
  },
  // or dark
  getInitialState: function getInitialState() {
    return {
      openKeys: []
    };
  },
  handleClick: function handleClick(e) {
    this.setState({
      openKeys: []
    });
    this.props.onClick(e);
  },
  handleOpenKeys: function handleOpenKeys(e) {
    this.setState({
      openKeys: e.openKeys
    });
    this.props.onOpen();
  },
  handleCloseKeys: function handleCloseKeys(e) {
    this.setState({
      openKeys: e.openKeys
    });
    this.props.onClose();
  },
  render: function render() {
    var openAnimation = '';
    switch (this.props.mode) {
      case 'horizontal':
        openAnimation = 'slide-up';
        break;
      case 'vertical':
        openAnimation = 'zoom-big';
        break;
      case 'inline':
        openAnimation = _commonOpenAnimation2['default'];
        break;
      default:
    }

    var props = {
      openKeys: this.state.openKeys,
      onClick: this.handleClick,
      onOpen: this.handleOpenKeys,
      onClose: this.handleCloseKeys
    };
    var className = this.props.className + ' ' + this.props.prefixCls + '-' + this.props.theme;
    if (this.props.mode === 'inline') {
      return _react2['default'].createElement(_rcMenu2['default'], _extends({}, this.props, { className: className, openAnimation: openAnimation }));
    } else {
      return _react2['default'].createElement(_rcMenu2['default'], _extends({}, this.props, props, { className: className, openTransitionName: openAnimation }));
    }
  }
});

AntMenu.Divider = _rcMenu2['default'].Divider;
AntMenu.Item = _rcMenu2['default'].Item;
AntMenu.SubMenu = _rcMenu2['default'].SubMenu;

exports['default'] = AntMenu;
module.exports = exports['default'];