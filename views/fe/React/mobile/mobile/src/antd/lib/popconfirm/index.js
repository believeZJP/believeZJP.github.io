'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _rcTooltip = require('rc-tooltip');

var _rcTooltip2 = _interopRequireDefault(_rcTooltip);

var _icon = require('../icon');

var _icon2 = _interopRequireDefault(_icon);

var _button = require('../button');

var _button2 = _interopRequireDefault(_button);

var prefixCls = 'ant-popover';

exports['default'] = _react2['default'].createClass({
  displayName: 'index',

  getInitialState: function getInitialState() {
    return {
      visible: false
    };
  },
  getDefaultProps: function getDefaultProps() {
    return {
      transitionName: '',
      placement: 'top',
      trigger: 'click',
      overlayStyle: {},
      onConfirm: function onConfirm() {},
      onCancel: function onCancel() {}
    };
  },
  confirm: function confirm() {
    this.props.onConfirm.call(this);
    this.setState({
      visible: false
    });
  },
  cancel: function cancel() {
    this.props.onCancel.call(this);
    this.setState({
      visible: false
    });
  },
  onVisibleChange: function onVisibleChange(v) {
    this.setState({
      visible: v
    });
  },
  render: function render() {
    var overlay = _react2['default'].createElement(
      'div',
      null,
      _react2['default'].createElement(
        'div',
        { className: prefixCls + '-content' },
        _react2['default'].createElement(
          'p',
          { className: prefixCls + '-message' },
          _react2['default'].createElement(_icon2['default'], { type: 'exclamation-circle' }),
          this.props.title
        ),
        _react2['default'].createElement(
          'div',
          { className: prefixCls + '-buttons' },
          _react2['default'].createElement(
            _button2['default'],
            { onClick: this.cancel, type: 'ghost', size: 'small' },
            '取消'
          ),
          _react2['default'].createElement(
            _button2['default'],
            { onClick: this.confirm, type: 'primary', size: 'small' },
            '确定'
          )
        )
      )
    );

    var transitionName = ({
      top: 'zoom-down',
      bottom: 'zoom-up',
      left: 'zoom-right',
      right: 'zoom-left',
      topLeft: 'zoom-down',
      bottomLeft: 'zoom-up',
      leftTop: 'zoom-right',
      rightTop: 'zoom-left',
      topRight: 'zoom-down',
      bottomRight: 'zoom-up',
      leftBottom: 'zoom-right',
      rightBottom: 'zoom-left'
    })[this.props.placement];

    return _react2['default'].createElement(
      _rcTooltip2['default'],
      { placement: this.props.placement,
        overlayStyle: this.props.overlayStyle,
        prefixCls: prefixCls,
        onVisibleChange: this.onVisibleChange,
        transitionName: transitionName,
        visible: this.state.visible,
        trigger: this.props.trigger,
        overlay: overlay },
      this.props.children
    );
  }
});
module.exports = exports['default'];